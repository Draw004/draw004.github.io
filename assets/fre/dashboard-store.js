(function(root,factory){
  'use strict';
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.CarrowmontDashboardStore=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const VERSION='dashboard-store-v1.0';
  const SCHEMA_VERSION=1;
  const SESSION_KEY='carrowmont_guest_dashboard_session_v1';
  const LOCAL_KEY='carrowmont_guest_dashboard_local_v1';
  const MODES=Object.freeze(['session','local']);
  const now=()=>new Date().toISOString();
  const clean=v=>typeof v==='string'?v.trim():'';
  const clone=v=>JSON.parse(JSON.stringify(v));
  const pathOk=p=>/^[a-z][a-zA-Z0-9]*(\.[a-z][a-zA-Z0-9]*)*$/.test(clean(p));

  function create(options={}){
    const ts=clean(options.now)||now();
    return {
      schemaVersion:SCHEMA_VERSION,
      version:VERSION,
      mode:MODES.includes(options.mode)?options.mode:'session',
      createdAt:ts,
      updatedAt:ts,
      locale:{region:clean(options.region)||'OTHER',currency:clean(options.currency)||'USD'},
      facts:{},
      lastImport:null
    };
  }

  function normalizeFact(fact={}){
    return {
      value:fact.value,
      origin:clean(fact.origin)||'user',
      source:clean(fact.source)||null,
      lastUpdated:clean(fact.lastUpdated)||now(),
      excluded:Boolean(fact.excluded),
      unit:clean(fact.unit)||null,
      note:clean(fact.note)||null
    };
  }

  function normalize(profile){
    const src=profile&&typeof profile==='object'?profile:{};
    const out=create({mode:src.mode,region:src.locale?.region,currency:src.locale?.currency,now:src.createdAt});
    out.createdAt=clean(src.createdAt)||out.createdAt;
    out.updatedAt=clean(src.updatedAt)||out.updatedAt;
    out.lastImport=src.lastImport&&typeof src.lastImport==='object'?{...src.lastImport}:null;
    for(const [path,fact] of Object.entries(src.facts||{})) if(pathOk(path)) out.facts[path]=normalizeFact(fact);
    return out;
  }

  function setLocale(profile,locale={},options={}){
    const out=normalize(profile);
    out.locale={region:clean(locale.region)||out.locale.region,currency:clean(locale.currency)||out.locale.currency};
    out.updatedAt=clean(options.now)||now();
    return out;
  }

  function setFact(profile,path,value,options={}){
    if(!pathOk(path)) throw new Error('Dashboard fact path must use dot notation.');
    const out=normalize(profile);
    const ts=clean(options.now)||now();
    out.facts[path]=normalizeFact({
      value,
      origin:options.origin||'user',
      source:options.source||null,
      lastUpdated:ts,
      excluded:Boolean(options.excluded),
      unit:options.unit||null,
      note:options.note||null
    });
    out.updatedAt=ts;
    return out;
  }

  function removeFact(profile,path,options={}){
    if(!pathOk(path)) throw new Error('Dashboard fact path must use dot notation.');
    const out=normalize(profile);
    delete out.facts[path];
    out.updatedAt=clean(options.now)||now();
    return out;
  }

  function setExcluded(profile,path,excluded=true,options={}){
    if(!pathOk(path)) throw new Error('Dashboard fact path must use dot notation.');
    const out=normalize(profile);
    if(out.facts[path]) out.facts[path]={...out.facts[path],excluded:Boolean(excluded),lastUpdated:clean(options.now)||now()};
    out.updatedAt=clean(options.now)||now();
    return out;
  }

  function getFact(profile,path,options={}){
    if(!pathOk(path)) return null;
    const fact=normalize(profile).facts[path];
    if(!fact) return null;
    if(fact.excluded&&!options.includeExcluded) return null;
    return {...fact};
  }

  function hasFact(profile,path,options={}){
    const fact=getFact(profile,path,options);
    return Boolean(fact&&fact.value!==''&&fact.value!==null&&fact.value!==undefined);
  }

  function setMode(profile,mode,options={}){
    const out=normalize(profile);
    out.mode=MODES.includes(mode)?mode:'session';
    out.updatedAt=clean(options.now)||now();
    return out;
  }

  function setLastImport(profile,intent,options={}){
    const out=normalize(profile);
    out.lastImport={intent:clean(intent)||'unknown',at:clean(options.now)||now()};
    out.updatedAt=out.lastImport.at;
    return out;
  }

  const MAPS=Object.freeze({
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
    'cash-flow-shortfall':Object.freeze({
      monthlyIncome:'cashFlow.takeHomeIncome',essentialExpenses:'cashFlow.essentialExpenses',flexibleExpenses:'cashFlow.flexibleExpenses'
    }),
    'emergency-runway':Object.freeze({
      essentialExpenses:'cashFlow.essentialExpenses',emergencySavings:'resilience.emergencySavings'
    }),
    'debt-vs-savings':Object.freeze({
      debtBalance:'debt.balance',debtAprPct:'debt.highestAprPct',debtMinimumPayment:'debt.monthlyPayments',
      emergencySavings:'resilience.emergencySavings',essentialExpenses:'cashFlow.essentialExpenses',assumedSavingsReturnPct:'assumptions.longTermReturnPct'
    }),
    'car-affordability':Object.freeze({
      takeHomeMonthlyIncome:'cashFlow.takeHomeIncome',essentialMonthlyExpenses:'cashFlow.essentialExpenses',emergencySavings:'resilience.emergencySavings'
    }),
    'mortgage-prepay-vs-invest':Object.freeze({
      mortgageBalance:'debt.mortgageBalance',mortgageRatePct:'debt.mortgageRatePct',assumedInvestmentReturnPct:'assumptions.longTermReturnPct'
    })
  });

  function captureAskJourney(profile,intent,facts={},options={}){
    let out=setLocale(profile,options.locale||{});
    const mapping=MAPS[intent]||{};
    for(const [sourceKey,targetPath] of Object.entries(mapping)){
      const value=facts[sourceKey];
      if(value===undefined||value===null||value==='') continue;
      out=setFact(out,targetPath,value,{origin:'user',source:'Ask Carrowmont',unit:options.currency||out.locale.currency,note:`Saved from ${intent} after the user chose My Carrowmont.`});
    }
    return setLastImport(out,intent);
  }

  function createBrowserStore(browserRoot){
    const w=browserRoot||((typeof window!=='undefined')?window:null);
    if(!w||!w.sessionStorage||!w.localStorage) return null;
    function parse(raw){try{return raw?normalize(JSON.parse(raw)):null;}catch(_){return null;}}
    function load(){
      const session=parse(w.sessionStorage.getItem(SESSION_KEY));
      if(session) return session;
      const local=parse(w.localStorage.getItem(LOCAL_KEY));
      if(local) return local;
      return create();
    }
    function save(profile,mode){
      let out=setMode(profile,mode||profile?.mode||'session');
      const rendered=JSON.stringify(out);
      if(out.mode==='local'){
        w.localStorage.setItem(LOCAL_KEY,rendered);
        w.sessionStorage.removeItem(SESSION_KEY);
      }else{
        w.sessionStorage.setItem(SESSION_KEY,rendered);
        w.localStorage.removeItem(LOCAL_KEY);
      }
      return out;
    }
    function clear(){w.sessionStorage.removeItem(SESSION_KEY);w.localStorage.removeItem(LOCAL_KEY);}
    return Object.freeze({load,save,clear,SESSION_KEY,LOCAL_KEY});
  }

  return Object.freeze({VERSION,SCHEMA_VERSION,SESSION_KEY,LOCAL_KEY,MODES,create,normalize,setLocale,setFact,removeFact,setExcluded,getFact,hasFact,setMode,captureAskJourney,createBrowserStore});
});
