(function(root,factory){
  'use strict';
  const api=factory(root.CarrowmontConnectedDataCore||(typeof require==='function'?require('./connected-data-core.js'):null));
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.CarrowmontConnectedDataSandbox=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(Core){
  'use strict';
  if(!Core)throw new Error('CarrowmontConnectedDataCore is required.');
  const VERSION='connected-data-sandbox-v1.0';
  const PROVIDER_ID='carrowmont-sandbox';
  const INSTITUTION='Carrowmont Sandbox Bank';
  const clean=value=>typeof value==='string'?value.trim():'';
  const nowIso=value=>new Date(value||Date.now()).toISOString();

  function amounts(currency){
    if(currency==='INR')return {emergency:342000,mortgage:2800000,income:82000,essential:31000,flexible:12000};
    if(currency==='GBP')return {emergency:9800,mortgage:165000,income:4100,essential:1850,flexible:800};
    if(currency==='EUR')return {emergency:11000,mortgage:190000,income:4500,essential:2050,flexible:850};
    if(currency==='AUD'||currency==='NZD'||currency==='CAD')return {emergency:16500,mortgage:285000,income:7200,essential:3100,flexible:1250};
    return {emergency:12500,mortgage:210000,income:6400,essential:2800,flexible:1100};
  }
  function createSnapshot(consent,{currency='USD',now}={}){
    const t=nowIso(now),a=amounts(clean(currency)||'USD');
    return Core.normalizeSnapshot({consent},{
      connectionId:consent.consentId,
      refreshedAt:t,
      currency:clean(currency)||'USD',
      balances:[
        {id:'sandbox-emergency',label:'Emergency savings account',accountType:'savings',balance:a.emergency,currency,observedAt:t,targetFactPath:'resilience.emergencySavings',reason:'Sandbox mapping only: this account is labelled as emergency savings so you can test explicit review before saving.'},
        {id:'sandbox-mortgage',label:'Home loan / mortgage balance',accountType:'loan',balance:a.mortgage,currency,observedAt:t,targetFactPath:'debt.mortgageBalance',reason:'Sandbox mapping only: this illustrates how a liability balance could be staged for review.'}
      ],
      cashFlowSummary:{takeHomeIncome:a.income,essentialExpenses:a.essential,flexibleExpenses:a.flexible,currency,observedAt:t},
      rawTransactions:[{description:'This must never survive normalization.'}],
      accessToken:'sandbox-forbidden-field-that-must-be-dropped-before-core-normalization'
    });
  }
  function connect({scopes,currency='USD',now}={}){
    const grantedAt=nowIso(now);
    const consent=Core.createConsent({providerId:PROVIDER_ID,institutionLabel:INSTITUTION,scopes,now:grantedAt,expiresAt:new Date(new Date(grantedAt).getTime()+24*60*60*1000).toISOString()});
    return Core.sessionState({consent,snapshot:createSnapshot(consent,{currency,now:grantedAt})});
  }
  function refresh(state,{currency,now}={}){
    const consent=Core.normalizeConsent(state?.consent||{});
    if(consent.status!=='active')throw new Error('Reconnect the sandbox before refreshing.');
    return Core.sessionState({consent,snapshot:createSnapshot(consent,{currency:currency||state?.snapshot?.currency||'USD',now})});
  }

  return Object.freeze({VERSION,PROVIDER_ID,INSTITUTION,connect,refresh});
});
