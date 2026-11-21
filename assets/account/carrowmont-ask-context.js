(function(root,factory){
  'use strict';
  const api=factory(root);
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.CarrowmontAskContext=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(root){
  'use strict';

  const VERSION='carrowmont-ask-context-v1.0';
  const DAY_MS=24*60*60*1000;
  const DEFAULT_FACT_FRESH_DAYS=180;
  const LONG_TERM_FACT_FRESH_DAYS=365;
  const PROFILE_MAPS=Object.freeze({
    'emergency-runway':Object.freeze({
      essentialExpenses:'cashFlow.essentialExpenses',
      emergencySavings:'resilience.emergencySavings'
    }),
    'cash-flow-shortfall':Object.freeze({
      monthlyIncome:'cashFlow.takeHomeIncome',
      essentialExpenses:'cashFlow.essentialExpenses',
      flexibleExpenses:'cashFlow.flexibleExpenses'
    }),
    'car-affordability':Object.freeze({
      takeHomeMonthlyIncome:'cashFlow.takeHomeIncome',
      essentialMonthlyExpenses:'cashFlow.essentialExpenses',
      emergencySavings:'resilience.emergencySavings'
    }),
    'mortgage-prepay-vs-invest':Object.freeze({
      mortgageBalance:'debt.mortgageBalance',
      mortgageRatePct:'debt.mortgageRatePct',
      assumedInvestmentReturnPct:'assumptions.longTermReturnPct'
    }),
    'debt-vs-savings':Object.freeze({
      debtBalance:'debt.balance',
      debtAprPct:'debt.highestAprPct',
      debtMinimumPayment:'debt.monthlyPayments',
      emergencySavings:'resilience.emergencySavings',
      essentialExpenses:'cashFlow.essentialExpenses',
      assumedSavingsReturnPct:'assumptions.longTermReturnPct'
    }),
    'money-priorities':Object.freeze({
      monthlyIncome:'cashFlow.takeHomeIncome',
      essentialExpenses:'cashFlow.essentialExpenses',
      flexibleExpenses:'cashFlow.flexibleExpenses',
      monthlyDebtPayments:'debt.monthlyPayments',
      emergencySavings:'resilience.emergencySavings',
      emergencyTargetMonths:'resilience.targetMonths',
      debtBalance:'debt.balance',
      highestDebtAprPct:'debt.highestAprPct',
      assumedLongTermReturnPct:'assumptions.longTermReturnPct',
      retirementSavings:'retirement.currentSavings',
      retirementMonthlyContribution:'retirement.monthlyContribution',
      goalTargetAmount:'goal.targetAmount',
      goalCurrentSavings:'goal.currentSavings',
      goalYearsAway:'goal.yearsAway',
      goalMonthlyContribution:'goal.monthlyContribution'
    }),
    'lump-sum-goal-tradeoffs':Object.freeze({
      essentialExpenses:'cashFlow.essentialExpenses',
      emergencySavings:'resilience.emergencySavings',
      emergencyTargetMonths:'resilience.targetMonths',
      assumedLongTermReturnPct:'assumptions.longTermReturnPct',
      goalTargetAmount:'goal.targetAmount',
      goalCurrentSavings:'goal.currentSavings',
      goalYearsAway:'goal.yearsAway',
      goalMonthlyContribution:'goal.monthlyContribution'
    })
  });

  const clean=v=>typeof v==='string'?v.trim():'';
  const finite=v=>v!==''&&v!==null&&v!==undefined&&Number.isFinite(Number(v));
  const clone=v=>JSON.parse(JSON.stringify(v));

  function hasPersistedAuthSession(){
    try{
      if(!root.localStorage)return false;
      for(let i=0;i<root.localStorage.length;i+=1){
        const key=root.localStorage.key(i)||'';
        if(/^sb-.*-auth-token$/.test(key)&&root.localStorage.getItem(key))return true;
      }
    }catch(_err){}
    return false;
  }

  function ageDays(value,nowValue){
    const ts=Date.parse(value||'');
    const nowTs=Date.parse(nowValue||'')||Date.now();
    if(!Number.isFinite(ts))return Infinity;
    return Math.max(0,(nowTs-ts)/DAY_MS);
  }

  function freshDaysFor(path){
    return /^(?:assumptions|retirement|goal)\./.test(path||'')?LONG_TERM_FACT_FRESH_DAYS:DEFAULT_FACT_FRESH_DAYS;
  }

  function contextItem({key,value,source,lastUpdated,kind,path,maxAgeDays,stale=false}){
    return Object.freeze({key,value:Number(value),source:clean(source)||'My Carrowmont',lastUpdated:clean(lastUpdated)||null,kind,path:path||null,maxAgeDays,stale:Boolean(stale)});
  }

  function normalizedProfile(input){
    const profile=input&&input.profile&&typeof input.profile==='object'?input.profile:input;
    if(!profile||typeof profile!=='object')return {locale:{},facts:{}};
    return {locale:profile.locale&&typeof profile.locale==='object'?{...profile.locale}:{},facts:profile.facts&&typeof profile.facts==='object'?profile.facts:{}};
  }

  function latestScenario(rows,journey){
    const items=(Array.isArray(rows)?rows:[]).filter(row=>row?.journey===journey);
    items.sort((a,b)=>Date.parse(b?.updated_at||b?.created_at||0)-Date.parse(a?.updated_at||a?.created_at||0));
    return items[0]||null;
  }

  function resolve({profile,scenarios=[],intent,locale={},now}={}){
    const p=normalizedProfile(profile);
    const currentCurrency=clean(locale.currency);
    const profileCurrency=clean(p.locale?.currency);
    const currencyMismatch=Boolean(currentCurrency&&profileCurrency&&currentCurrency!==profileCurrency);
    const items=[];
    const profileMap=PROFILE_MAPS[intent]||{};
    const nowIso=clean(now)||new Date().toISOString();

    if(!currencyMismatch){
      for(const [key,path] of Object.entries(profileMap)){
        const fact=p.facts?.[path];
        if(!fact||fact.excluded===true||!finite(fact.value))continue;
        const unit=clean(fact.unit);
        if(unit&&/^[A-Z]{3}$/.test(unit)&&currentCurrency&&unit!==currentCurrency)continue;
        const maxAgeDays=freshDaysFor(path);
        const stale=ageDays(fact.lastUpdated,nowIso)>maxAgeDays;
        items.push(contextItem({key,value:fact.value,source:fact.source||'My Carrowmont',lastUpdated:fact.lastUpdated,kind:'profile',path,maxAgeDays,stale}));
      }

      if(intent==='mortgage-prepay-vs-invest'){
        const row=latestScenario(scenarios,'mortgage-payoff');
        const input=row?.scenario?.input;
        const scenarioCurrency=clean(input?.currency);
        if(input&&finite(input.remainingYears)&&(!scenarioCurrency||!currentCurrency||scenarioCurrency===currentCurrency)){
          const maxAgeDays=DEFAULT_FACT_FRESH_DAYS;
          const updated=row.updated_at||row.created_at||row?.scenario?.capturedAt||null;
          const stale=ageDays(updated,nowIso)>maxAgeDays;
          items.push(contextItem({key:'remainingYears',value:Math.max(0,Math.round(Number(input.remainingYears))),source:row.label||'Saved mortgage plan',lastUpdated:updated,kind:'scenario',path:'mortgage-payoff.remainingYears',maxAgeDays,stale}));
        }
      }
    }

    const deduped=[];const seen=new Set();
    for(const item of items){if(seen.has(item.key))continue;seen.add(item.key);deduped.push(item);}
    const fresh=deduped.filter(item=>!item.stale);
    const stale=deduped.filter(item=>item.stale);
    return Object.freeze({
      version:VERSION,
      intent:clean(intent),
      signedIn:true,
      currencyMismatch,
      currentCurrency:currentCurrency||null,
      profileCurrency:profileCurrency||null,
      fresh:Object.freeze(fresh.map(clone)),
      stale:Object.freeze(stale.map(clone)),
      items:Object.freeze(deduped.map(clone))
    });
  }

  async function load(intent,options={}){
    if(!hasPersistedAuthSession())return Object.freeze({version:VERSION,intent:clean(intent),signedIn:false,currencyMismatch:false,currentCurrency:clean(options?.locale?.currency)||null,profileCurrency:null,fresh:Object.freeze([]),stale:Object.freeze([]),items:Object.freeze([])});
    const Account=root.CarrowmontAccount;
    if(!Account?.getUser||!Account?.loadCloudProfile||!Account?.listScenarios)return Object.freeze({version:VERSION,intent:clean(intent),signedIn:false,currencyMismatch:false,currentCurrency:clean(options?.locale?.currency)||null,profileCurrency:null,fresh:Object.freeze([]),stale:Object.freeze([])});
    try{
      const user=await Account.getUser();
      if(!user)return Object.freeze({version:VERSION,intent:clean(intent),signedIn:false,currencyMismatch:false,currentCurrency:clean(options?.locale?.currency)||null,profileCurrency:null,fresh:Object.freeze([]),stale:Object.freeze([]),items:Object.freeze([])});
      const [cloud,scenarios]=await Promise.all([Account.loadCloudProfile(),Account.listScenarios()]);
      return resolve({profile:cloud?.profile||null,scenarios,intent,locale:options.locale||{},now:options.now});
    }catch(_err){
      return Object.freeze({version:VERSION,intent:clean(intent),signedIn:true,unavailable:true,currencyMismatch:false,currentCurrency:clean(options?.locale?.currency)||null,profileCurrency:null,fresh:Object.freeze([]),stale:Object.freeze([]),items:Object.freeze([])});
    }
  }

  return Object.freeze({VERSION,DEFAULT_FACT_FRESH_DAYS,LONG_TERM_FACT_FRESH_DAYS,PROFILE_MAPS,hasPersistedAuthSession,resolve,load});
});
