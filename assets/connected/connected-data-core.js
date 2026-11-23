(function(root,factory){
  'use strict';
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.CarrowmontConnectedDataCore=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const VERSION='connected-data-core-v1.0';
  const SCHEMA_VERSION=1;
  const ALLOWED_SCOPES=Object.freeze(['balances','cashFlowSummary']);
  const ALLOWED_FACT_PATHS=Object.freeze([
    'resilience.emergencySavings',
    'debt.balance',
    'debt.mortgageBalance',
    'cashFlow.takeHomeIncome',
    'cashFlow.essentialExpenses',
    'cashFlow.flexibleExpenses'
  ]);
  const FORBIDDEN_KEYS=/password|passcode|pin|secret|access.?token|refresh.?token|credential|oauth.?code/i;

  const clean=value=>typeof value==='string'?value.trim():'';
  const finite=value=>Number.isFinite(Number(value))?Number(value):null;
  function iso(value){
    const date=value instanceof Date?value:new Date(value||Date.now());
    if(Number.isNaN(date.getTime())) throw new Error('Connected-data time must be valid.');
    return date.toISOString();
  }
  function clone(value){return JSON.parse(JSON.stringify(value));}
  function assertNoCredentials(value,path='root'){
    if(value==null)return true;
    if(Array.isArray(value)){value.forEach((item,index)=>assertNoCredentials(item,`${path}[${index}]`));return true;}
    if(typeof value==='object'){
      for(const [key,item] of Object.entries(value)){
        if(FORBIDDEN_KEYS.test(key)) throw new Error(`Credential-like field is not allowed in connected-data state: ${path}.${key}`);
        assertNoCredentials(item,`${path}.${key}`);
      }
    }
    return true;
  }
  function normalizeScopes(scopes){
    const unique=[];
    for(const scope of Array.isArray(scopes)?scopes:[]){
      const value=clean(scope);
      if(ALLOWED_SCOPES.includes(value)&&!unique.includes(value))unique.push(value);
    }
    return unique;
  }
  function createConsent({providerId,institutionLabel,scopes,now,expiresAt}={}){
    const grantedAt=iso(now);
    const normalizedScopes=normalizeScopes(scopes);
    if(!clean(providerId))throw new Error('Connected-data provider ID is required.');
    if(!clean(institutionLabel))throw new Error('Connected-data institution label is required.');
    if(!normalizedScopes.length)throw new Error('Choose at least one connected-data scope.');
    const expiry=expiresAt?iso(expiresAt):new Date(new Date(grantedAt).getTime()+24*60*60*1000).toISOString();
    const consent={
      schemaVersion:SCHEMA_VERSION,
      consentId:`cm-consent-${clean(providerId).replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'')}-${Date.parse(grantedAt)}`,
      providerId:clean(providerId),
      institutionLabel:clean(institutionLabel),
      scopes:normalizedScopes,
      grantedAt,
      expiresAt:expiry,
      status:'active'
    };
    assertNoCredentials(consent);
    return Object.freeze(consent);
  }
  function normalizeConsent(consent={}){
    const out={
      schemaVersion:SCHEMA_VERSION,
      consentId:clean(consent.consentId),
      providerId:clean(consent.providerId),
      institutionLabel:clean(consent.institutionLabel),
      scopes:normalizeScopes(consent.scopes),
      grantedAt:iso(consent.grantedAt),
      expiresAt:iso(consent.expiresAt),
      status:['active','expired','revoked'].includes(clean(consent.status))?clean(consent.status):'active'
    };
    if(!out.consentId||!out.providerId||!out.institutionLabel||!out.scopes.length)throw new Error('Connected-data consent is incomplete.');
    assertNoCredentials(out);
    return out;
  }
  function normalizeBalance(row={},fallbackCurrency='USD'){
    const path=clean(row.targetFactPath);
    if(path&&!ALLOWED_FACT_PATHS.includes(path))throw new Error(`Unsupported connected-data fact path: ${path}`);
    const balance=finite(row.balance);
    if(balance===null)throw new Error('Connected balance must be numeric.');
    return {
      id:clean(row.id)||`balance-${Math.abs(balance)}`,
      label:clean(row.label)||'Balance',
      accountType:clean(row.accountType)||'account',
      balance,
      currency:clean(row.currency)||fallbackCurrency,
      observedAt:iso(row.observedAt),
      targetFactPath:path||null,
      reason:clean(row.reason)||null
    };
  }
  function normalizeCashFlow(summary={},fallbackCurrency='USD'){
    const out={currency:clean(summary.currency)||fallbackCurrency,observedAt:iso(summary.observedAt)};
    for(const key of ['takeHomeIncome','essentialExpenses','flexibleExpenses']){
      const value=finite(summary[key]);
      if(value!==null)out[key]=value;
    }
    return out;
  }
  function normalizeSnapshot(connection={},snapshot={}){
    const consent=normalizeConsent(connection.consent||connection);
    const currency=clean(snapshot.currency)||'USD';
    const out={
      schemaVersion:SCHEMA_VERSION,
      connectionId:clean(snapshot.connectionId)||consent.consentId,
      providerId:consent.providerId,
      institutionLabel:consent.institutionLabel,
      scopes:[...consent.scopes],
      refreshedAt:iso(snapshot.refreshedAt),
      currency,
      balances:[],
      cashFlowSummary:null
    };
    if(consent.scopes.includes('balances'))out.balances=(Array.isArray(snapshot.balances)?snapshot.balances:[]).map(row=>normalizeBalance(row,currency));
    if(consent.scopes.includes('cashFlowSummary')&&snapshot.cashFlowSummary)out.cashFlowSummary=normalizeCashFlow(snapshot.cashFlowSummary,currency);
    assertNoCredentials(out);
    return out;
  }
  function freshness({consent,snapshot,now,staleAfterHours=24}={}){
    const current=normalizeConsent(consent||{});
    if(current.status==='revoked')return {state:'disconnected',label:'Disconnected'};
    const nowMs=new Date(iso(now)).getTime();
    if(new Date(current.expiresAt).getTime()<=nowMs)return {state:'expired',label:'Consent expired'};
    if(!snapshot?.refreshedAt)return {state:'unavailable',label:'No data available'};
    const ageHours=Math.max(0,(nowMs-new Date(iso(snapshot.refreshedAt)).getTime())/(60*60*1000));
    if(ageHours>Math.max(1,Number(staleAfterHours)||24))return {state:'stale',label:'Needs refresh',ageHours};
    return {state:'current',label:'Current',ageHours};
  }
  function profileFact(profile,path){
    const fact=profile&&typeof profile==='object'?profile.facts?.[path]:null;
    if(!fact||fact.excluded)return {value:null,unit:null};
    const value=finite(fact.value);
    return {value:value===null?null:value,unit:clean(fact.unit)||null};
  }
  function reviewItem({id,label,targetPath,connectedValue,currentValue,currentUnit,unit,institutionLabel,observedAt,reason,sourceKind}){
    if(!ALLOWED_FACT_PATHS.includes(targetPath))throw new Error(`Unsupported review target: ${targetPath}`);
    const savedUnit=clean(currentUnit);
    const connectedUnit=clean(unit);
    const currencyMismatch=currentValue!==null&&Boolean(savedUnit)&&Boolean(connectedUnit)&&savedUnit.toUpperCase()!==connectedUnit.toUpperCase();
    return {
      id,
      label,
      targetPath,
      connectedValue,
      currentValue,
      currentUnit:savedUnit||null,
      unit:connectedUnit||null,
      currencyMismatch,
      institutionLabel,
      observedAt,
      reason,
      sourceKind,
      changed:currencyMismatch||currentValue===null||Number(currentValue)!==Number(connectedValue)
    };
  }
  function buildReviewItems(snapshot={},profile={}){
    const out=[];
    const institutionLabel=clean(snapshot.institutionLabel)||'Connected source';
    for(const row of Array.isArray(snapshot.balances)?snapshot.balances:[]){
      if(!row.targetFactPath)continue;
      out.push(reviewItem({
        id:`balance:${row.id}`,
        label:row.label,
        targetPath:row.targetFactPath,
        connectedValue:Number(row.balance),
        currentValue:profileFact(profile,row.targetFactPath).value,
        currentUnit:profileFact(profile,row.targetFactPath).unit,
        unit:row.currency||snapshot.currency||'USD',
        institutionLabel,
        observedAt:row.observedAt||snapshot.refreshedAt,
        reason:row.reason||'This sandbox account is mapped only for review. Carrowmont will not update the saved value unless you choose Use this value.',
        sourceKind:'balance'
      }));
    }
    const cash=snapshot.cashFlowSummary;
    if(cash){
      const mappings=[
        ['takeHomeIncome','Monthly take-home income','cashFlow.takeHomeIncome'],
        ['essentialExpenses','Monthly essential expenses','cashFlow.essentialExpenses'],
        ['flexibleExpenses','Monthly flexible expenses','cashFlow.flexibleExpenses']
      ];
      for(const [key,label,targetPath] of mappings){
        if(!Number.isFinite(Number(cash[key])))continue;
        out.push(reviewItem({
          id:`cashflow:${key}`,
          label,
          targetPath,
          connectedValue:Number(cash[key]),
          currentValue:profileFact(profile,targetPath).value,
          currentUnit:profileFact(profile,targetPath).unit,
          unit:cash.currency||snapshot.currency||'USD',
          institutionLabel,
          observedAt:cash.observedAt||snapshot.refreshedAt,
          reason:'This is a sandbox monthly summary, not a raw transaction feed. Review it before using it in My Carrowmont.',
          sourceKind:'cashFlowSummary'
        }));
      }
    }
    return out;
  }
  function applyReviewItem(profile,item,Store,{explicit=false,now}={}){
    if(explicit!==true)throw new Error('Connected data can update My Carrowmont only after an explicit Use this value action.');
    if(!Store||typeof Store.setFact!=='function')throw new Error('Dashboard store is required to apply a reviewed connected value.');
    if(!item||!ALLOWED_FACT_PATHS.includes(item.targetPath))throw new Error('Reviewed connected-data item is invalid.');
    if(item.currencyMismatch===true)throw new Error('Connected value currency must match the saved My Carrowmont currency before it can be applied.');
    const source=`${clean(item.institutionLabel)||'Connected source'} (reviewed)`;
    return Store.setFact(profile,item.targetPath,item.connectedValue,{
      origin:'connected-reviewed',
      source,
      unit:item.unit||null,
      now:iso(now),
      note:'You reviewed this connected value and chose to use it in My Carrowmont. Disconnecting the source does not silently remove a value you explicitly saved.'
    });
  }
  function sessionState({consent,snapshot}={}){
    const state={schemaVersion:SCHEMA_VERSION,consent:normalizeConsent(consent||{}),snapshot:normalizeSnapshot({consent},snapshot||{})};
    assertNoCredentials(state);
    return state;
  }

  return Object.freeze({VERSION,SCHEMA_VERSION,ALLOWED_SCOPES,ALLOWED_FACT_PATHS,createConsent,normalizeConsent,normalizeSnapshot,freshness,buildReviewItems,applyReviewItem,sessionState,assertNoCredentials});
});
