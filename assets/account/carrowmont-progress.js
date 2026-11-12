(function(root,factory){
  'use strict';
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.CarrowmontProgress=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const VERSION='carrowmont-progress-v2.0';
  const MAX_HISTORY=12;
  const n=value=>{const x=Number(value);return Number.isFinite(x)?x:null;};
  const obj=value=>value&&typeof value==='object'?value:{};
  const summary=scenario=>obj(obj(scenario).summary);
  const input=scenario=>obj(obj(scenario).input);
  const pct=value=>{const x=n(value);if(x===null)return null;return Math.abs(x)<=1.5?x*100:x;};
  const first=(...values)=>{for(const value of values){const x=n(value);if(x!==null)return x;}return null;};
  const clean=value=>typeof value==='string'?value.trim():'';
  const round=(value,digits=2)=>{const x=n(value);if(x===null)return null;const p=10**digits;return Math.round(x*p)/p;};

  function snapshot(journey,scenario){
    const s=summary(scenario),i=input(scenario),j=clean(journey||scenario?.journey);
    const base={journey:j};
    switch(j){
      case 'budget-cash-flow':
        return {...base,remaining:first(s.remaining),income:first(s.income),essential:first(s.essential),flexible:first(s.flexible),saving:first(s.saving)};
      case 'emergency-runway':
        return {...base,reserve:first(s.reserve),runwayMonths:first(s.runwayMonths),targetMonths:first(s.targetMonths),targetGap:first(s.targetGap)};
      case 'debt-payoff':
        return {...base,balance:first(s.startingDebt),payoffMonths:first(s.avalancheMonths,s.snowballMonths),monthlyPayment:first(s.monthlyBudget)};
      case 'credit-card-payoff':
        return {...base,balance:first(s.balance),payoffMonths:first(s.payoffMonths),monthlyPayment:first(s.plannedPayment),aprPct:first(s.aprPct)};
      case 'loan-emi':
        return {...base,balance:first(s.principal),payoffMonths:first(s.payoffMonths,s.totalMonths),monthlyPayment:first(s.scheduledPayment),aprPct:first(s.annualRate)};
      case 'mortgage-payoff':
        return {...base,balance:first(s.balance),aprPct:first(s.annualRatePct),payoffDate:clean(s.scenarioPayoff||s.baselinePayoff)};
      case 'retirement':
        return {...base,fundedPct:pct(s.fundedPct),gap:first(s.gap),requiredCorpus:first(s.requiredCorpus),projectedCorpus:first(s.projectedCorpus),retirementAge:first(s.retirementAge),currentSavings:first(i.currentSavings)};
      case 'goal':
        return {...base,fundedPct:pct(s.funding),gap:first(s.gap),target:first(s.futureCost),projected:first(s.projected),currentSavings:first(i.existing),years:first(i.years)};
      case 'financial-independence':
        return {...base,currentAssets:first(s.currentAssets,i.currentAssets),targetAge:first(s.targetAge,i.targetAge),monthlySpending:first(s.monthlySpending,i.monthlySpending),monthlyContribution:first(i.monthlyContribution)};
      case 'recurring-investment':
        return {...base,currentSavings:first(i.currentSavings),contribution:first(i.monthlySIP),years:first(i.years),projectedValue:first(s.projectedValue),target:first(s.target),requiredContribution:first(s.requiredContribution),months:first(s.months),mode:clean(s.mode||i.mode)};
      case 'retirement-withdrawal':
        return {...base,startingBalance:first(s.startingBalance,i.startingBalance),startingWithdrawal:first(s.startingWithdrawal,i.startingWithdrawal),runwayMonths:first(s.runwayMonths),endingBalance:first(s.endingBalance),withdrawalRatePct:first(s.withdrawalRatePct)};
      case 'car-affordability':
        return {...base,vehiclePrice:first(s.vehiclePrice),loanAmount:first(s.loanAmount),monthlyPayment:first(s.monthlyLoanPayment),afterCashRoom:first(s.afterCashRoom)};
      default:
        return base;
    }
  }

  function historyEntry(row){
    if(!row||typeof row!=='object')return null;
    const snap=snapshot(row.journey,row.scenario);
    if(Object.keys(snap).length<=1)return null;
    return {savedAt:clean(row.updated_at||row.created_at)||new Date().toISOString(),snapshot:snap};
  }

  const REVIEW_MONTHS=Object.freeze({
    'budget-cash-flow':1,'emergency-runway':3,'debt-payoff':3,'credit-card-payoff':1,
    'loan-emi':6,'mortgage-payoff':6,'retirement':6,'goal':6,'financial-independence':6,
    'recurring-investment':6,'retirement-withdrawal':3
  });
  function reviewEveryMonths(journey){return REVIEW_MONTHS[clean(journey)]||6;}
  function addMonthsIso(value,monthsToAdd){
    const t=Date.parse(value||'');const m=n(monthsToAdd);if(!Number.isFinite(t)||m===null)return '';
    const d=new Date(t);d.setUTCMonth(d.getUTCMonth()+Math.round(m));return d.toISOString();
  }
  function targetFrom(journey,scenario,startedAt){
    const j=clean(journey||scenario?.journey),s=summary(scenario),i=input(scenario);
    if(j==='budget-cash-flow')return {kind:'monthly-room',value:0};
    if(j==='emergency-runway'){const v=n(s.targetMonths);return v===null?null:{kind:'runway-months',value:v};}
    if(['debt-payoff','credit-card-payoff','loan-emi'].includes(j)){const m=first(s.payoffMonths,s.avalancheMonths,s.snowballMonths,s.totalMonths);return m===null?null:{kind:'payoff-date',at:addMonthsIso(startedAt,m)};}
    if(j==='mortgage-payoff'){const at=clean(s.scenarioPayoff||s.baselinePayoff);return at?{kind:'payoff-date',at}:null;}
    if(j==='retirement'){
      const age=first(s.retirementAge,i.retirementAge),current=first(i.currentAge);
      return {kind:'funding-pct',value:100,age,at:age!==null&&current!==null?addMonthsIso(startedAt,(age-current)*12):''};
    }
    if(j==='goal'){const years=first(i.years);return {kind:'funding-pct',value:100,at:years!==null?addMonthsIso(startedAt,years*12):''};}
    if(j==='financial-independence'){
      const age=first(s.targetAge,i.targetAge),current=first(i.currentAge);
      return age===null?null:{kind:'fi-age',value:age,at:current!==null?addMonthsIso(startedAt,(age-current)*12):''};
    }
    if(j==='recurring-investment'){
      const value=first(s.target),years=first(i.years),monthsToTarget=first(s.months);
      if(value===null||value<=0)return null;
      return {kind:'investment-target',value,at:years!==null?addMonthsIso(startedAt,years*12):(monthsToTarget!==null?addMonthsIso(startedAt,monthsToTarget):'')};
    }
    if(j==='retirement-withdrawal'){
      const monthsTarget=first(s.targetMonths,i.targetMonths);
      return monthsTarget===null||monthsTarget<=0?null:{kind:'runway-months',value:monthsTarget,at:addMonthsIso(startedAt,monthsTarget)};
    }
    return null;
  }
  function planMeta(existing,nextScenario,savedAt){
    const previous=obj(existing?.scenario?.planMeta),journey=clean(existing?.journey||nextScenario?.journey);
    const startedAt=clean(previous.startedAt||existing?.created_at)||savedAt;
    const baseline=previous.baseline&&typeof previous.baseline==='object'?previous.baseline:(existing?snapshot(existing.journey,existing.scenario):snapshot(journey,nextScenario));
    const target=previous.target&&typeof previous.target==='object'?previous.target:targetFrom(journey,existing?.scenario||nextScenario,startedAt);
    return {version:1,startedAt,lastReviewedAt:savedAt,reviewEveryMonths:reviewEveryMonths(journey),baseline,target};
  }

  function scenarioWithHistory(existing,nextScenario){
    const next=obj(nextScenario),existingScenario=obj(existing?.scenario);
    const old=Array.isArray(existingScenario.progressHistory)?existingScenario.progressHistory.filter(x=>x&&typeof x==='object'&&x.snapshot):[];
    const prior=historyEntry(existing);
    let history=old.slice();
    if(prior){
      const key=`${prior.savedAt}|${JSON.stringify(prior.snapshot)}`;
      const seen=new Set(history.map(x=>`${clean(x.savedAt)}|${JSON.stringify(x.snapshot||{})}`));
      if(!seen.has(key))history.push(prior);
    }
    history=history.slice(-MAX_HISTORY);
    const savedAt=new Date().toISOString();
    return {...next,progressHistory:history,progressVersion:2,planMeta:planMeta(existing,next,savedAt)};
  }

  function money(value,currency){
    const x=n(value);if(x===null)return '—';
    try{return new Intl.NumberFormat(undefined,{style:'currency',currency:clean(currency)||'USD',maximumFractionDigits:0}).format(x);}catch(_){return `${clean(currency)||''} ${Math.round(x).toLocaleString()}`.trim();}
  }
  function number(value,digits=1){const x=n(value);return x===null?'—':new Intl.NumberFormat(undefined,{maximumFractionDigits:digits}).format(x);}
  function months(value){const x=n(value);if(x===null)return '—';return `${number(x,1)} ${Math.abs(x-1)<0.001?'month':'months'}`;}
  function dateLabel(value){const t=Date.parse(value||'');if(!Number.isFinite(t))return 'your last saved version';try{return new Intl.DateTimeFormat(undefined,{day:'numeric',month:'short',year:'numeric'}).format(new Date(t));}catch(_){return 'your last saved version';}}
  function monthDiff(a,b){const ta=Date.parse(a||''),tb=Date.parse(b||'');if(!Number.isFinite(ta)||!Number.isFinite(tb))return null;return (tb-ta)/(1000*60*60*24*30.4375);}
  function delta(current,previous){const a=n(current),b=n(previous);return a===null||b===null?null:a-b;}
  function changed(d,threshold=0.001){return d!==null&&Math.abs(d)>threshold;}
  function baseResult(row,previousAt){return {journey:clean(row?.journey),label:clean(row?.label)||'Saved plan',tone:'neutral',status:'Updated',headline:'Your saved plan was updated.',detail:'My Carrowmont is comparing this version with the one you saved before.',next:'Open the plan if you want to review or change it.',previousAt,route:clean(row?.scenario?.toolPath)||'/my-carrowmont.html'};}

  function compare(row,currency){
    const scenario=obj(row?.scenario),current=snapshot(row?.journey,scenario),history=Array.isArray(scenario.progressHistory)?scenario.progressHistory:[];
    const prior=history.length?history[history.length-1]:null;
    if(!prior?.snapshot){
      return {...baseResult(row,''),status:'Ready to track',headline:'This saved plan is your starting point.',detail:'Update it later and My Carrowmont will show what changed.',next:'Open the plan whenever you want to review or update it.',previousAt:''};
    }
    const previous=obj(prior.snapshot),result=baseResult(row,prior.savedAt),j=current.journey;
    const from=`Compared with ${dateLabel(prior.savedAt)}.`;
    if(j==='budget-cash-flow'){
      const room=n(current.remaining),d=delta(current.remaining,previous.remaining);
      if(room!==null&&room<0){result.tone='bad';result.status='Needs attention';result.headline=`Your saved budget is short by ${money(Math.abs(room),currency)} per month.`;result.detail=`${from} Review the amounts behind this shortfall.`;result.next='Open Budget & Cash Flow and review spending or saving amounts.';}
      else if(changed(d,1)&&d>0){result.tone='good';result.status='Improving';result.headline=`Monthly room increased by ${money(d,currency)}.`;result.detail=`${from} Your current saved budget leaves ${money(room,currency)} after the amounts you entered.`;}
      else if(changed(d,1)&&d<0){result.tone='warn';result.status='Needs review';result.headline=`Monthly room is ${money(Math.abs(d),currency)} lower.`;result.detail=`${from} Your current saved budget leaves ${money(room,currency)}.`;result.next='Open Budget & Cash Flow if this change was not planned.';}
      else{result.status='Steady';result.headline='Your monthly budget position is broadly unchanged.';result.detail=`${from} Current saved monthly room: ${money(room,currency)}.`;}
    }else if(j==='emergency-runway'){
      const run=n(current.runwayMonths),target=n(current.targetMonths),d=delta(current.runwayMonths,previous.runwayMonths);
      if(run!==null&&target!==null&&run>=target){result.tone='good';result.status='On track';result.headline=`Emergency runway is ${months(run)}.`;result.detail=`${from} This meets your saved ${number(target,1)}-month target.`;}
      else if(changed(d,0.05)&&d>0){result.tone='good';result.status='Improving';result.headline=`Emergency runway increased by ${months(d)}.`;result.detail=`${from} You now have ${months(run)} toward a ${number(target,1)}-month target.`;}
      else if(changed(d,0.05)&&d<0){result.tone='bad';result.status='Needs attention';result.headline=`Emergency runway fell by ${months(Math.abs(d))}.`;result.detail=`${from} You now have ${months(run)} toward a ${number(target,1)}-month target.`;result.next='Open Emergency Fund & Runway and review your current reserve and target.';}
      else{result.tone='warn';result.status='Below target';result.headline=`Emergency runway is ${months(run)}.`;result.detail=`${from} Your saved target is ${number(target,1)} months.`;result.next='Open Emergency Fund & Runway when you want to review the gap.';}
    }else if(['debt-payoff','credit-card-payoff','loan-emi'].includes(j)){
      const d=delta(current.balance,previous.balance),balance=n(current.balance),pay=n(current.payoffMonths),payDelta=delta(current.payoffMonths,previous.payoffMonths);
      if(changed(d,1)&&d<0){result.tone='good';result.status='Improving';result.headline=`Saved balance is lower by ${money(Math.abs(d),currency)}.`;result.detail=`${from}${pay!==null?` Estimated payoff: ${months(pay)}.`:''}`;}
      else if(changed(d,1)&&d>0){result.tone='bad';result.status='Needs attention';result.headline=`Saved balance is higher by ${money(d,currency)}.`;result.detail=`${from}${pay!==null?` Estimated payoff: ${months(pay)}.`:''}`;result.next=j==='credit-card-payoff'?'Open Credit Card Payoff and review the planned payment.':j==='debt-payoff'?'Open Debt Payoff and review the monthly payment plan.':'Open Loan / EMI and review the payment or term.';}
      else if(changed(payDelta,0.5)&&payDelta<0){result.tone='good';result.status='Improving';result.headline=`Estimated payoff is ${months(Math.abs(payDelta))} sooner.`;result.detail=`${from} Estimated payoff: ${months(pay)}.`;}
      else if(changed(payDelta,0.5)&&payDelta>0){result.tone='warn';result.status='Needs review';result.headline=`Estimated payoff is ${months(payDelta)} later.`;result.detail=`${from} Estimated payoff: ${months(pay)}.`;result.next='Open the plan and review what changed.';}
      else{result.status='Steady';result.headline='The saved payoff plan is broadly unchanged.';result.detail=`${from} Current saved balance: ${money(balance,currency)}.`;}
    }else if(j==='mortgage-payoff'){
      const d=delta(current.balance,previous.balance),balance=n(current.balance),dateMove=monthDiff(current.payoffDate,previous.payoffDate);
      if(changed(d,1)&&d<0){result.tone='good';result.status='Improving';result.headline=`Saved home-loan balance is lower by ${money(Math.abs(d),currency)}.`;result.detail=`${from}${clean(current.payoffDate)?` Estimated payoff: ${clean(current.payoffDate)}.`:''}`;}
      else if(changed(d,1)&&d>0){result.tone='bad';result.status='Needs attention';result.headline=`Saved home-loan balance is higher by ${money(d,currency)}.`;result.detail=from;result.next='Open the home-loan plan and review the balance, rate or repayment details.';}
      else if(dateMove!==null&&Math.abs(dateMove)>0.5){const earlier=dateMove>0;result.tone=earlier?'good':'warn';result.status=earlier?'Improving':'Needs review';result.headline=`Estimated payoff is about ${months(Math.abs(dateMove))} ${earlier?'sooner':'later'}.`;result.detail=from;result.next=earlier?'Open the plan if you want to review the new payoff path.':'Open the plan and compare an extra payment or different payoff target.';}
      else{result.status='Steady';result.headline='The saved home-loan plan is broadly unchanged.';result.detail=`${from} Current saved balance: ${money(balance,currency)}.`;}
    }else if(['retirement','goal'].includes(j)){
      const funded=n(current.fundedPct),d=delta(current.fundedPct,previous.fundedPct),gap=n(current.gap);
      if(funded!==null&&funded>=100){result.tone='good';result.status='On track';result.headline=`Your saved ${j==='retirement'?'retirement':'goal'} plan is at least 100% funded in the current model.`;result.detail=`${from}${gap!==null&&gap>0?` Remaining modeled gap: ${money(gap,currency)}.`:''}`;}
      else if(changed(d,0.5)&&d>0){result.tone='good';result.status='Improving';result.headline=`Funding improved by ${number(d,1)} percentage points.`;result.detail=`${from} Current plan funding: ${number(funded,1)}%.${gap!==null?` Remaining gap: ${money(Math.max(0,gap),currency)}.`:''}`;}
      else if(changed(d,0.5)&&d<0){result.tone='bad';result.status='Needs attention';result.headline=`Funding is ${number(Math.abs(d),1)} percentage points lower.`;result.detail=`${from} Current plan funding: ${number(funded,1)}%.`;result.next=j==='retirement'?'Open Retirement Planner and test a higher contribution or later retirement age.':'Open Goal Planner and test a higher contribution or longer timeline.';}
      else{result.tone=funded!==null&&funded<100?'warn':'neutral';result.status=funded!==null&&funded<100?'Below target':'Steady';result.headline=`Current plan funding is ${number(funded,1)}%.`;result.detail=from;result.next=funded!==null&&funded<100?(j==='retirement'?'Open Retirement Planner when you want to review the funding gap.':'Open Goal Planner when you want to review the funding gap.'):'Open the plan whenever you want to review it.';}
    }else if(j==='financial-independence'){
      const d=delta(current.currentAssets,previous.currentAssets),assets=n(current.currentAssets),target=n(current.targetAge);
      if(changed(d,1)&&d>0){result.tone='good';result.status='Improving';result.headline=`Saved invested assets increased by ${money(d,currency)}.`;result.detail=`${from} Current saved assets: ${money(assets,currency)}${target!==null?`; target age ${number(target,0)}`:''}.`;}
      else if(changed(d,1)&&d<0){result.tone='warn';result.status='Needs review';result.headline=`Saved invested assets are ${money(Math.abs(d),currency)} lower.`;result.detail=`${from} This may reflect a real change or an updated assumption.`;result.next='Open Financial Independence and review assets, contribution, spending or target age.';}
      else{result.status='Updated';result.headline='Your FI plan was updated.';result.detail=`${from} Current saved assets: ${money(assets,currency)}${target!==null?`; target age ${number(target,0)}`:''}.`;}
    }else if(j==='recurring-investment'){
      const savingsDelta=delta(current.currentSavings,previous.currentSavings),contributionDelta=delta(current.contribution,previous.contribution);
      if(changed(savingsDelta,1)&&savingsDelta>0){result.tone='good';result.status='Improving';result.headline=`Saved invested amount increased by ${money(savingsDelta,currency)}.`;result.detail=`${from} Current saved invested amount: ${money(current.currentSavings,currency)}.`;}
      else if(changed(contributionDelta,1)){result.status='Plan changed';result.headline=`Regular contribution changed by ${money(Math.abs(contributionDelta),currency)}.`;result.detail=`${from} Current saved contribution: ${money(current.contribution,currency)} each contribution period.`;result.next='Open the investment plan if you want to review the target or contribution.';}
      else{result.status='Updated';result.headline='Your recurring-investment plan was updated.';result.detail=`${from}${n(current.projectedValue)!==null?` Current estimated value: ${money(current.projectedValue,currency)}.`:''}`;}
    }else if(j==='retirement-withdrawal'){
      const d=delta(current.runwayMonths,previous.runwayMonths),run=n(current.runwayMonths);
      if(changed(d,0.5)&&d>0){result.tone='good';result.status='Improving';result.headline=`The saved withdrawal plan lasts about ${months(d)} longer.`;result.detail=`${from} Current plan lasts: ${months(run)}.`;}
      else if(changed(d,0.5)&&d<0){result.tone='warn';result.status='Needs review';result.headline=`The saved withdrawal plan lasts about ${months(Math.abs(d))} less.`;result.detail=`${from} Current plan lasts: ${months(run)}.`;result.next='Open the withdrawal plan and review the withdrawal amount, expected return or time period.';}
      else{result.status='Updated';result.headline='Your retirement-withdrawal plan was updated.';result.detail=`${from} Current plan lasts: ${months(run)}.`;}
    }else{
      result.status='Updated';result.headline='This saved plan was updated.';result.detail=from;
    }
    return result;
  }


  function frequencyWords(value){
    const key=clean(value).toLowerCase();return ({weekly:'each week',biweekly:'every 2 weeks',semimonthly:'twice a month',fourweekly:'every 4 weeks',monthly:'each month',quarterly:'each quarter',annual:'each year',yearly:'each year'})[key]||'each month';
  }
  function freshness(row,now){
    const scenario=obj(row?.scenario),meta=obj(scenario.planMeta),last=clean(meta.lastReviewedAt||row?.updated_at||row?.created_at);
    const cadence=n(meta.reviewEveryMonths)??reviewEveryMonths(row?.journey),nowIso=typeof now==='string'?now:new Date(now||Date.now()).toISOString();
    const age=monthDiff(last,nowIso),stale=age!==null&&age>cadence+0.05;
    return {lastReviewedAt:last,reviewEveryMonths:cadence,ageMonths:age,stale,label:last?`Last reviewed ${dateLabel(last)}`:'Not reviewed yet'};
  }
  function targetText(target,currency){
    if(!target||typeof target!=='object')return '';
    if(target.kind==='monthly-room')return 'Keep the monthly plan at or above break-even.';
    if(target.kind==='runway-months')return `Saved target: ${months(target.value)} of runway.`;
    if(target.kind==='payoff-date')return target.at?`Saved payoff target: ${dateLabel(target.at)}.`:'';
    if(target.kind==='funding-pct')return target.age!==null&&target.age!==undefined?`Saved target: fully fund the plan by age ${number(target.age,0)}.`:'Saved target: fully fund the plan.';
    if(target.kind==='fi-age')return `Saved target: reach financial independence by age ${number(target.value,0)}.`;
    if(target.kind==='investment-target')return `Saved target: ${money(target.value,currency)}${target.at?` by ${dateLabel(target.at)}`:''}.`;
    return '';
  }
  function currentPayoffAt(row,current){
    const reviewed=clean(row?.scenario?.planMeta?.lastReviewedAt||row?.updated_at||row?.created_at);
    return current.payoffMonths!==null&&current.payoffMonths!==undefined?addMonthsIso(reviewed,current.payoffMonths):'';
  }
  function evaluate(row,currency,now){
    const scenario=obj(row?.scenario),current=snapshot(row?.journey,scenario),trend=compare(row,currency),j=current.journey;
    const meta=obj(scenario.planMeta),target=meta.target&&typeof meta.target==='object'?meta.target:targetFrom(j,scenario,clean(meta.startedAt||row?.created_at||row?.updated_at));
    const fresh=freshness(row,now),result={journey:j,label:clean(row?.label)||'Saved plan',route:clean(scenario.toolPath)||'/my-carrowmont.html',status:'Ready to track',tone:'neutral',headline:'Your saved plan is ready to review.',target:targetText(target,currency),freshness:fresh,trend,correction:'',startedAt:clean(meta.startedAt||row?.created_at||row?.updated_at)};
    const set=(status,tone,headline,correction='')=>{result.status=status;result.tone=tone;result.headline=headline;result.correction=correction;};
    if(j==='budget-cash-flow'){
      const room=n(current.remaining);
      if(room!==null&&room<0)set('Needs attention','bad',`Your saved budget is short by ${money(Math.abs(room),currency)} per month.`,`Create about ${money(Math.abs(room),currency)} more monthly room by reducing spending, increasing income or changing the saving amount.`);
      else if(room!==null)set('On track','good',`Your saved budget leaves ${money(room,currency)} per month after the amounts entered.`);
    }else if(j==='emergency-runway'){
      const run=n(current.runwayMonths),targetMonths=n(target?.value),gap=n(current.targetGap);
      if(run!==null&&targetMonths!==null&&run>=targetMonths+1)set('Ahead','good',`Emergency runway is ${months(run)}, above the saved target.`);
      else if(run!==null&&targetMonths!==null&&run>=targetMonths)set('On track','good',`Emergency runway meets the saved ${number(targetMonths,1)}-month target.`);
      else if(run!==null&&targetMonths!==null)set('Needs attention','bad',`Emergency runway is ${months(run)} against a saved ${number(targetMonths,1)}-month target.`,gap!==null&&gap>0?`Add about ${money(gap,currency)} to emergency savings to reach the saved runway target.`:'Open Emergency Fund & Runway and calculate the amount needed for the saved target.');
    }else if(['debt-payoff','credit-card-payoff','loan-emi'].includes(j)){
      const targetAt=clean(target?.at),currentAt=currentPayoffAt(row,current),late=targetAt&&currentAt?monthDiff(targetAt,currentAt):null;
      if(late!==null&&late<-1)set('Ahead','good',`Estimated payoff is about ${months(Math.abs(late))} ahead of the saved target.`);
      else if(late!==null&&late>0.5)set('Needs attention','bad',`Estimated payoff is about ${months(late)} later than the saved target.`,`To keep the original target, open the plan and test a higher payment. If you keep the current payment, move the target by about ${months(late)}.`);
      else if(late!==null)set('On track','good','The current payoff estimate is in line with the saved target.');
    }else if(j==='mortgage-payoff'){
      const targetAt=clean(target?.at),currentAt=clean(current.payoffDate),late=targetAt&&currentAt?monthDiff(targetAt,currentAt):null;
      if(late!==null&&late<-1)set('Ahead','good',`Estimated home-loan payoff is about ${months(Math.abs(late))} ahead of the saved target.`);
      else if(late!==null&&late>0.5)set('Needs attention','bad',`Estimated home-loan payoff is about ${months(late)} later than the saved target.`,`To keep the original target, open the home-loan plan and test a higher repayment or extra payment. If you keep the current plan, move the target by about ${months(late)}.`);
      else if(late!==null)set('On track','good','The current home-loan payoff estimate is in line with the saved target.');
    }else if(['retirement','goal'].includes(j)){
      const funded=n(current.fundedPct),add=n(summary(scenario).additionalContribution);
      if(funded!==null&&funded>=110)set('Ahead','good',`The current saved model is ${number(funded,1)}% funded.`);
      else if(funded!==null&&funded>=100)set('On track','good',`The current saved model is ${number(funded,1)}% funded.`);
      else if(funded!==null)set('Needs attention','bad',`The current saved model is ${number(funded,1)}% funded.`,add!==null&&add>1?`Test about ${money(add,currency)} more ${frequencyWords(summary(scenario).contributionFrequency)} to close the modeled gap under the saved assumptions.`:`Open the ${j==='retirement'?'Retirement':'Goal'} Planner to calculate the contribution change needed for the saved target.`);
    }else if(j==='financial-independence'){
      const s=summary(scenario),age=n(s.modelledFIAge),targetAge=n(target?.value),add=n(s.additionalContribution);
      if(age!==null&&targetAge!==null&&age<targetAge-0.1)set('Ahead','good',`The current saved model reaches financial independence around age ${number(age,1)}, ahead of age ${number(targetAge,0)}.`);
      else if(age!==null&&targetAge!==null&&age<=targetAge+0.1)set('On track','good',`The current saved model reaches financial independence around the saved target age ${number(targetAge,0)}.`);
      else if(age!==null&&targetAge!==null)set('Needs attention','bad',`The current saved model reaches financial independence around age ${number(age,1)}, later than the saved age ${number(targetAge,0)}.`,add!==null&&add>1?`Test about ${money(add,currency)} more ${frequencyWords(s.investmentFrequency)} under the saved assumptions.`:'Open Financial Independence to calculate the contribution or target-age change needed.');
    }else if(j==='recurring-investment'){
      const s=summary(scenario),targetValue=n(target?.value),projected=n(current.projectedValue),add=n(s.additionalContribution);
      if(targetValue!==null&&projected!==null&&projected>=targetValue*1.1)set('Ahead','good',`The saved projection is above the target by about ${money(projected-targetValue,currency)}.`);
      else if(targetValue!==null&&projected!==null&&projected>=targetValue)set('On track','good','The saved projection meets the investment target under the current assumptions.');
      else if(targetValue!==null&&projected!==null)set('Needs attention','bad',`The saved projection is about ${money(targetValue-projected,currency)} below the target.`,add!==null&&add>1?`Test about ${money(add,currency)} more ${frequencyWords(s.contributionFrequency)} under the saved assumptions.`:'Open the investment plan to calculate the contribution change needed for the saved target.');
      else set('Ready to track','neutral','This saved investment plan does not have a target amount to measure against yet.');
    }else if(j==='retirement-withdrawal'){
      const run=n(current.runwayMonths),targetMonths=n(target?.value),short=targetMonths!==null&&run!==null?targetMonths-run:null;
      if(short!==null&&short<=-1)set('Ahead','good',`The saved withdrawal plan lasts about ${months(Math.abs(short))} beyond the saved horizon.`);
      else if(short!==null&&short<=0)set('On track','good','The saved withdrawal plan reaches the saved horizon under the current assumptions.');
      else if(short!==null)set('Needs attention','bad',`The saved withdrawal plan is about ${months(short)} short of the saved horizon.`,`Open Retirement Withdrawal and solve a lower starting withdrawal for the saved horizon.`);
    }
    if(fresh.stale&&result.tone!=='bad')set('Needs review','warn',`${fresh.label}. The plan may no longer reflect your current situation.`,result.correction||'Open the plan and confirm the saved details still reflect your situation.');
    return result;
  }
  function evaluateAll(rows,currency,now){return (Array.isArray(rows)?rows:[]).filter(row=>clean(row?.journey)!=='car-affordability').map(row=>evaluate(row,currency,now));}
  function analyze(rows,currency){return (Array.isArray(rows)?rows:[]).filter(row=>clean(row?.journey)!=='car-affordability').map(row=>compare(row,currency));}
  return Object.freeze({VERSION,MAX_HISTORY,snapshot,historyEntry,scenarioWithHistory,compare,analyze,reviewEveryMonths,targetFrom,planMeta,freshness,evaluate,evaluateAll});
});
