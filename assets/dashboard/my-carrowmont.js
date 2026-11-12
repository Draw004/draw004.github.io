(function(){
  'use strict';

  const FIELD_DEFS=[
    {group:'Cash flow',path:'cashFlow.takeHomeIncome',label:'Monthly take-home income',kind:'money'},
    {group:'Cash flow',path:'cashFlow.grossIncome',label:'Gross monthly income',kind:'money',help:'Used only for debt-to-income context.'},
    {group:'Cash flow',path:'cashFlow.essentialExpenses',label:'Essential monthly expenses',kind:'money'},
    {group:'Cash flow',path:'cashFlow.flexibleExpenses',label:'Flexible monthly spending',kind:'money'},
    {group:'Protection & debt',path:'debt.monthlyPayments',label:'Required monthly debt payments',kind:'money'},
    {group:'Protection & debt',path:'resilience.emergencySavings',label:'Emergency savings',kind:'money'},
    {group:'Protection & debt',path:'resilience.targetMonths',label:'Emergency-fund target (months)',kind:'months'},
    {group:'Protection & debt',path:'debt.balance',label:'Interest-bearing debt balance',kind:'money'},
    {group:'Protection & debt',path:'debt.highestAprPct',label:'Highest debt APR',kind:'pct'},
    {group:'Mortgage & loans',path:'debt.housingPayment',label:'Monthly mortgage / home-loan payment',kind:'money'},
    {group:'Mortgage & loans',path:'debt.otherLoanPayments',label:'Other monthly loan payments',kind:'money'},
    {group:'Mortgage & loans',path:'debt.creditCardMinimums',label:'Monthly credit-card minimums',kind:'money'},
    {group:'Mortgage & loans',path:'debt.otherDebtPayments',label:'Other monthly debt payments',kind:'money'},
    {group:'Mortgage & loans',path:'debt.mortgageBalance',label:'Mortgage / home-loan balance',kind:'money'},
    {group:'Mortgage & loans',path:'debt.mortgageRatePct',label:'Mortgage / home-loan rate',kind:'pct'},
    {group:'Retirement',path:'retirement.currentSavings',label:'Retirement savings',kind:'money'},
    {group:'Retirement',path:'retirement.monthlyContribution',label:'Monthly retirement contribution',kind:'money'},
    {group:'Goal',path:'goal.targetAmount',label:'Goal target amount',kind:'money'},
    {group:'Goal',path:'goal.currentSavings',label:'Savings already set aside for goal',kind:'money'},
    {group:'Goal',path:'goal.yearsAway',label:'Years until goal',kind:'years'},
    {group:'Goal',path:'goal.monthlyContribution',label:'Monthly goal contribution',kind:'money'},
    {group:'Goal',path:'assumptions.longTermReturnPct',label:'Illustrative long-term return assumption',kind:'pct',help:'Used for goal and priority illustrations only. Not a forecast.'},
    {group:'Financial independence',path:'fi.currentAge',label:'Current age',kind:'number'},
    {group:'Financial independence',path:'fi.targetAge',label:'Target financial-independence age',kind:'number'},
    {group:'Financial independence',path:'fi.monthlySpending',label:'Monthly spending for FI planning',kind:'money'},
    {group:'Financial independence',path:'fi.monthlyPassiveIncome',label:'Monthly income expected after FI',kind:'money'},
    {group:'Financial independence',path:'fi.withdrawalRatePct',label:'Withdrawal-rate assumption',kind:'pct'},
    {group:'Financial independence',path:'fi.inflationPct',label:'Inflation assumption',kind:'pct'},
    {group:'Financial independence',path:'fi.currentAssets',label:'Current invested assets',kind:'money'},
    {group:'Financial independence',path:'fi.monthlyContribution',label:'Monthly investment contribution',kind:'money'},
    {group:'Financial independence',path:'fi.annualReturnPct',label:'Annual return assumption',kind:'pct'},
    {group:'Financial independence',path:'fi.annualStepUpPct',label:'Annual contribution increase',kind:'pct'}
  ];
  const LABELS=Object.fromEntries(FIELD_DEFS.map(x=>[x.path,x]));
  const $=id=>document.getElementById(id);
  const Store=window.CarrowmontDashboardStore;
  const browserStore=Store?.createBrowserStore?.(window);
  let profile=Store.create();
  let initialized=false;

  function locale(){const L=window.CarrowmontLocale;return{region:L?.getRegion?.()||'OTHER',currency:L?.getCurrency?.()||profile.locale.currency||'USD'};}
  function syncLocale(){if(!initialized)return;profile=Store.setLocale(profile,locale());persist(false);}
  function fact(path,includeExcluded=false){return Store.getFact(profile,path,{includeExcluded});}
  function value(path,fallback=null){const f=fact(path);return f?f.value:fallback;}
  function has(path){return Store.hasFact(profile,path);}
  function stored(path){return Store.hasFact(profile,path,{includeExcluded:true});}
  function num(v,fallback=0){const n=Number(v);return Number.isFinite(n)?n:fallback;}
  function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function money(v){const L=window.CarrowmontLocale;return L?.formatMoney?L.formatMoney(num(v),{maximumFractionDigits:0}):new Intl.NumberFormat(undefined,{style:'currency',currency:locale().currency,maximumFractionDigits:0}).format(num(v));}
  function pct(v){return `${new Intl.NumberFormat(undefined,{maximumFractionDigits:1}).format(num(v))}%`;}
  function number(v,d=1){return new Intl.NumberFormat(undefined,{maximumFractionDigits:d}).format(num(v));}
  function tone(status){return status==='good'?'good':status==='bad'?'bad':'warn';}
  function statusLabel(status){return status==='good'?'On track':status==='bad'?'Needs attention':'Needs details';}
  function persist(render=true){if(!initialized)return;if(browserStore) profile=browserStore.save(profile,'session');window.dispatchEvent(new CustomEvent('carrowmont:mycm-profile-change',{detail:{profile:Store.normalize(profile)}}));if(render)renderAll();}
  function showBanner(text){const el=$('mycmBanner');el.textContent=text;el.hidden=false;window.setTimeout(()=>{if(el.textContent===text)el.hidden=true;},4500);}
  function derivedDebtPayments(){
    if(has('debt.monthlyPayments')) return num(value('debt.monthlyPayments'));
    return ['debt.housingPayment','debt.otherLoanPayments','debt.creditCardMinimums','debt.otherDebtPayments'].reduce((s,p)=>s+(has(p)?num(value(p)):0),0);
  }
  function card(title,status,body,actions=''){
    return `<div class="mycm-card-head"><h2>${esc(title)}</h2><span class="mycm-status" data-tone="${tone(status)}">${statusLabel(status)}</span></div><div class="mycm-card-main">${body}</div>${actions?`<div class="mycm-card-actions">${actions}</div>`:''}`;
  }
  function metric(label,val){return `<div class="mycm-metric"><span>${esc(label)}</span><strong>${esc(val)}</strong></div>`;}
  function addAction(label,focus){return `<button class="mycm-button" type="button" data-mycm-edit="${esc(focus||'')}">${esc(label)}</button>`;}

  function renderCashFlow(){
    const el=$('mycmCashFlowCard');
    if(!has('cashFlow.takeHomeIncome')||!has('cashFlow.essentialExpenses')){el.innerHTML=card('Cash-flow health','missing','<p>Add take-home income and essential expenses to see monthly breathing room.</p>',addAction('Add cash-flow details','cashFlow.takeHomeIncome'));return;}
    const debt=derivedDebtPayments(), retirement=has('retirement.monthlyContribution')?num(value('retirement.monthlyContribution')):0, goal=has('goal.monthlyContribution')?num(value('goal.monthlyContribution')):0;
    const r=window.CarrowmontBudgetCore.calculate({incomes:[{amount:num(value('cashFlow.takeHomeIncome')),frequency:'monthly'}],essential:[{amount:num(value('cashFlow.essentialExpenses')),frequency:'monthly'},{amount:debt,frequency:'monthly'}],flexible:[{amount:has('cashFlow.flexibleExpenses')?num(value('cashFlow.flexibleExpenses')):0,frequency:'monthly'}],savings:[{amount:retirement+goal,frequency:'monthly'}],primaryPayFrequency:'monthly'});
    const st=r.remaining<0?'bad':'good';
    el.innerHTML=card('Cash-flow health',st,`<strong class="mycm-big">${money(r.remaining)} / month</strong><p>${r.remaining<0?'Entered monthly commitments are above entered take-home income.':'Modeled monthly room remains after the costs and planned contributions currently included.'}</p><div class="mycm-metrics">${metric('Take-home income',money(r.income))}${metric('Modeled outgo',money(r.essential+r.flexible+r.saving))}</div>`,addAction('Edit cash flow','cashFlow.takeHomeIncome'));
  }

  function renderEmergency(){
    const el=$('mycmEmergencyCard');
    if(!has('cashFlow.essentialExpenses')||!has('resilience.emergencySavings')){el.innerHTML=card('Emergency runway','missing','<p>Add essential expenses and emergency savings to estimate how many months of unavoidable costs your reserve covers.</p>',addAction('Add emergency details','resilience.emergencySavings'));return;}
    const r=window.CarrowmontEmergencyFundCore.calculate({essentialExpenses:num(value('cashFlow.essentialExpenses')),debtPayments:derivedDebtPayments(),emergencySavings:num(value('resilience.emergencySavings')),targetMonths:has('resilience.targetMonths')?num(value('resilience.targetMonths')):6});
    const st=r.targetGap>0?'bad':'good';
    el.innerHTML=card('Emergency runway',st,`<strong class="mycm-big">${number(r.fullLossRunwayMonths,1)} months</strong><p>${r.targetGap>0?`There is a modeled gap of ${money(r.targetGap)} to the target currently used.`:'The entered reserve covers the current target in this model.'}</p><div class="mycm-metrics">${metric('Reserve',money(r.reserve))}${metric('Monthly need',money(r.monthlyNeed))}</div>`,addAction('Edit protection','resilience.emergencySavings')+'<a class="mycm-button" href="/emergency-fund-runway-calculator.html">Open full tool</a>');
  }

  function renderDebt(){
    const el=$('mycmDebtCard');
    if(!has('debt.balance')&&!has('debt.monthlyPayments')){el.innerHTML=card('Debt position','missing','<p>No current debt position has been added to My Carrowmont yet.</p>',addAction('Add debt details','debt.balance'));return;}
    const bal=has('debt.balance')?num(value('debt.balance')):0, apr=has('debt.highestAprPct')?num(value('debt.highestAprPct')):null, pay=derivedDebtPayments();
    const st=bal>0&&apr!=null&&apr>=10?'bad':'good';
    el.innerHTML=card('Debt position',st,`<strong class="mycm-big">${money(bal)}</strong><p>${apr==null?'Add the highest debt rate to improve prioritization.':`Highest entered APR: ${pct(apr)}.`}</p><div class="mycm-metrics">${metric('Monthly debt payments',money(pay))}${metric('Highest APR',apr==null?'Not added':pct(apr))}</div>`,addAction('Edit debt','debt.balance')+'<a class="mycm-button" href="/budget-cash-flow-planner/debt-payoff-calculator.html">Open payoff tool</a>');
  }

  function renderBorrowing(){
    const el=$('mycmBorrowingCard');
    const payments=derivedDebtPayments();
    if(!has('cashFlow.grossIncome')||payments<=0){el.innerHTML=card('Mortgage & loan burden','missing','<p>Add gross monthly income and your current required debt payments to calculate borrowing-health context.</p>',addAction('Add borrowing details','cashFlow.grossIncome'));return;}
    const r=window.CarrowmontBorrowingHealthCore.calculate({grossMonthlyIncome:num(value('cashFlow.grossIncome')),takeHomeMonthlyIncome:has('cashFlow.takeHomeIncome')?num(value('cashFlow.takeHomeIncome')):0,essentialNonDebtExpenses:has('cashFlow.essentialExpenses')?num(value('cashFlow.essentialExpenses')):0,housingDebtPayment:has('debt.housingPayment')?num(value('debt.housingPayment')):0,otherLoanPayments:has('debt.otherLoanPayments')?num(value('debt.otherLoanPayments')):0,creditCardMinimums:has('debt.creditCardMinimums')?num(value('debt.creditCardMinimums')):0,otherDebtPayments:has('debt.otherDebtPayments')?num(value('debt.otherDebtPayments')):((has('debt.housingPayment')||has('debt.otherLoanPayments')||has('debt.creditCardMinimums'))?0:(has('debt.monthlyPayments')?num(value('debt.monthlyPayments')):0)),proposedNewDebtPayment:0,incomeDropPct:10});
    const ratio=r.currentGrossDtiPct;
    const st=r.currentCashRoom!=null&&r.currentCashRoom<0?'bad':'good';
    el.innerHTML=card('Mortgage & loan burden',st,`<strong class="mycm-big">${ratio==null?'—':pct(ratio)}</strong><p>${ratio==null?'Gross DTI could not be calculated.':'Current gross debt-to-income context from the debt payments entered.'}</p><div class="mycm-metrics">${metric('Debt payments',money(r.currentDebtPayments))}${metric('Cash room',r.currentCashRoom==null?'Not available':money(r.currentCashRoom))}</div>`,addAction('Edit borrowing details','debt.housingPayment')+'<a class="mycm-button" href="/debt-to-income-borrowing-health-calculator.html">Open full tool</a>');
  }

  function renderRetirement(){
    const el=$('mycmRetirementCard');
    if(!has('retirement.currentSavings')&&!has('retirement.monthlyContribution')){el.innerHTML=card('Retirement progress','missing','<p>Add retirement savings or a current monthly contribution. My Carrowmont will not claim adequacy from these two numbers alone.</p>',addAction('Add retirement details','retirement.currentSavings')+'<a class="mycm-button" href="/retirement-calculator/">Open Retirement Planner</a>');return;}
    const savings=has('retirement.currentSavings')?num(value('retirement.currentSavings')):0, contrib=has('retirement.monthlyContribution')?num(value('retirement.monthlyContribution')):0;
    const st=contrib>0?'good':'bad';
    el.innerHTML=card('Retirement progress',st,`<strong class="mycm-big">${money(savings)}</strong><p>${contrib>0?'Retirement saving is active in the details entered. Full readiness still belongs in the Retirement Planner.':'No current monthly retirement contribution is entered. This is not the same as saying retirement is off track.'}</p><div class="mycm-metrics">${metric('Monthly contribution',money(contrib))}${metric('Adequacy','Use full planner')}</div>`,addAction('Edit retirement','retirement.currentSavings')+'<a class="mycm-button" href="/retirement-calculator/">Open Retirement Planner</a>');
  }

  function renderGoal(){
    const el=$('mycmGoalCard');
    if(!has('goal.targetAmount')||num(value('goal.targetAmount'))<=0||!has('goal.yearsAway')||num(value('goal.yearsAway'))<=0){el.innerHTML=card('Goals','missing','<p>Add a target amount and time horizon to see whether the entered goal is currently funded on the modeled path.</p>',addAction('Add a goal','goal.targetAmount')+'<a class="mycm-button" href="/goal-planner/">Open Goal Planner</a>');return;}
    const assumed=has('assumptions.longTermReturnPct')?num(value('assumptions.longTermReturnPct')):5;
    const r=window.CarrowmontGoalCore.calculate({today:num(value('goal.targetAmount')),inflation:0,years:num(value('goal.yearsAway')),existing:has('goal.currentSavings')?num(value('goal.currentSavings')):0,ret:assumed/100,monthly:has('goal.monthlyContribution')?num(value('goal.monthlyContribution')):0,contributionFrequency:'monthly',futureLump:0,futureLumpYear:0});
    const funding=Math.max(0,r.funding*100),st=funding>=100?'good':'bad';
    el.innerHTML=card('Goals',st,`<strong class="mycm-big">${number(funding,0)}% modeled funding</strong><p>${funding>=100?'The entered path reaches the target under the current illustration.':`The model shows a remaining gap of ${money(r.gap)}.`}</p><div class="mycm-metrics">${metric('Goal target',money(r.futureCost))}${metric('Return illustration',pct(assumed))}</div>`,addAction('Edit goal','goal.targetAmount')+'<a class="mycm-button" href="/goal-planner/">Open Goal Planner</a>');
  }

  function renderFi(){
    const el=$('mycmFiCard');
    const req=['fi.currentAge','fi.targetAge','fi.monthlySpending','fi.currentAssets','fi.monthlyContribution'];
    if(!req.every(has)){el.innerHTML=card('Financial independence','missing','<p>Add a small FI snapshot to compare your current invested assets with an illustrative independence target.</p>',addAction('Add FI details','fi.currentAge')+'<a class="mycm-button" href="/financial-independence/">Open FI Planner</a>');return;}
    const raw={currentAge:num(value('fi.currentAge')),targetAge:num(value('fi.targetAge')),planningMode:'sustainable',planUntilAge:95,monthlySpending:num(value('fi.monthlySpending')),spendingPct:100,monthlyIncome:has('fi.monthlyPassiveIncome')?num(value('fi.monthlyPassiveIncome')):0,withdrawalRate:has('fi.withdrawalRatePct')?num(value('fi.withdrawalRatePct')):4,inflation:has('fi.inflationPct')?num(value('fi.inflationPct')):3,currentAssets:num(value('fi.currentAssets')),monthlyContribution:num(value('fi.monthlyContribution')),investmentFrequency:'monthly',payFrequency:'monthly',annualReturn:has('fi.annualReturnPct')?num(value('fi.annualReturnPct')):5,annualStepUp:has('fi.annualStepUpPct')?num(value('fi.annualStepUpPct')):0};
    const r=window.CarrowmontFICore.result(raw),target=r.fiToday,assets=r.state.currentAssets,funding=target>0?assets/target*100:100,st=funding>=100?'good':'bad';
    el.innerHTML=card('Financial independence',st,`<strong class="mycm-big">${number(funding,0)}% of today’s modeled target</strong><p>${r.modelledFI.reached?`The current model reaches the target around age ${number(r.modelledFI.age,1)}.`:'The current modeled path has not yet reached the selected target within the planner horizon.'}</p><div class="mycm-metrics">${metric('Current assets',money(assets))}${metric('Modeled target today',money(target))}</div>`,addAction('Edit FI details','fi.currentAge')+'<a class="mycm-button" href="/financial-independence/">Open FI Planner</a>');
  }

  const PRIORITY_PATHS=['cashFlow.takeHomeIncome','cashFlow.essentialExpenses','cashFlow.flexibleExpenses','debt.monthlyPayments','resilience.emergencySavings','resilience.targetMonths','debt.balance','debt.highestAprPct','assumptions.longTermReturnPct','retirement.currentSavings','retirement.monthlyContribution','goal.targetAmount','goal.currentSavings','goal.yearsAway','goal.monthlyContribution'];
  function renderPriorities(){
    const el=$('mycmPrioritiesCard');
    if(!PRIORITY_PATHS.every(p=>stored(p)&&!fact(p,true).excluded)){el.innerHTML=card('Money Priorities','missing','<p>Complete the Money Priorities journey or add all priority facts here to generate a ranked next-three-moves summary.</p>','<a class="mycm-button" href="/ask-carrowmont.html">Open Ask Carrowmont</a>');return;}
    const facts={monthlyIncome:num(value('cashFlow.takeHomeIncome')),essentialExpenses:num(value('cashFlow.essentialExpenses')),flexibleExpenses:num(value('cashFlow.flexibleExpenses')),monthlyDebtPayments:num(value('debt.monthlyPayments')),emergencySavings:num(value('resilience.emergencySavings')),emergencyTargetMonths:num(value('resilience.targetMonths')),debtBalance:num(value('debt.balance')),highestDebtAprPct:num(value('debt.highestAprPct')),assumedLongTermReturnPct:num(value('assumptions.longTermReturnPct')),retirementSavings:num(value('retirement.currentSavings')),retirementMonthlyContribution:num(value('retirement.monthlyContribution')),goalTargetAmount:num(value('goal.targetAmount')),goalCurrentSavings:num(value('goal.currentSavings')),goalYearsAway:num(value('goal.yearsAway')),goalMonthlyContribution:num(value('goal.monthlyContribution'))};
    const r=window.CarrowmontMoneyPriorities.create().evaluate(facts,{currency:locale().currency});
    const items=r.priorityMoves.slice(0,3).map((m,i)=>`<div class="mycm-priority"><strong>${i+1}. ${esc(m.stageLabel)} — ${esc(m.headline)}</strong><small>${esc(m.action)}</small></div>`).join('');
    el.innerHTML=card('Money Priorities','good',`<p>${esc(r.diagnosis)}</p><div class="mycm-priority-list">${items}</div>`,'<a class="mycm-button" href="/ask-carrowmont.html">Review in Ask Carrowmont</a>');
  }

  function formatFact(path,f){
    const def=LABELS[path]||{kind:'number'};
    if(def.kind==='money') return money(f.value);
    if(def.kind==='pct') return pct(f.value);
    if(def.kind==='months') return `${number(f.value,1)} months`;
    if(def.kind==='years') return `${number(f.value,1)} years`;
    return number(f.value,2);
  }
  function renderFacts(){
    const wrap=$('mycmFacts'),entries=Object.entries(profile.facts||{}).sort((a,b)=>a[0].localeCompare(b[0]));
    if(!entries.length){wrap.innerHTML='<div class="mycm-empty">No planning values are saved yet. Use “Add or edit details” here, or save a supported Carrowmont plan to My Carrowmont.</div>';return;}
    wrap.innerHTML=entries.map(([path,f])=>{const def=LABELS[path]||{label:path};return `<div class="mycm-fact"><div class="mycm-fact-label"><strong>${esc(def.label)}</strong><small>${f.excluded?'Ignored by recommendations':'Included in dashboard calculations'}</small></div><div class="mycm-fact-value">${esc(formatFact(path,f))}</div><div class="mycm-fact-source">${esc(f.source||f.origin||'User')}</div><div class="mycm-fact-actions"><label class="mycm-toggle"><input type="checkbox" data-mycm-influence="${esc(path)}" ${f.excluded?'':'checked'}> Use</label><button class="mycm-button" type="button" data-mycm-edit="${esc(path)}">Edit</button><button class="mycm-button mycm-button-danger" type="button" data-mycm-remove="${esc(path)}">Remove</button></div></div>`;}).join('');
  }

  function renderAll(){renderCashFlow();renderEmergency();renderDebt();renderBorrowing();renderRetirement();renderGoal();renderFi();renderPriorities();renderFacts();}

  function buildEditor(){
    const wrap=$('mycmEditFields'),groups=[...new Set(FIELD_DEFS.map(x=>x.group))];
    wrap.innerHTML=groups.map(group=>`<section class="mycm-edit-group"><h3>${esc(group)}</h3><div class="mycm-edit-grid">${FIELD_DEFS.filter(x=>x.group===group).map(def=>{const f=fact(def.path,true);return `<div class="mycm-field"><label for="mycm-${esc(def.path)}">${esc(def.label)}</label><input id="mycm-${esc(def.path)}" data-mycm-path="${esc(def.path)}" type="number" step="any" min="0" value="${f?esc(f.value):''}">${def.help?`<small>${esc(def.help)}</small>`:''}</div>`;}).join('')}</div></section>`).join('');
  }
  function openEditor(path){buildEditor();const d=$('mycmEditDialog');if(typeof d.showModal==='function')d.showModal();else d.setAttribute('open','');if(path){window.setTimeout(()=>document.querySelector(`[data-mycm-path="${CSS.escape(path)}"]`)?.focus(),0);}}
  function closeEditor(){const d=$('mycmEditDialog');if(typeof d.close==='function')d.close();else d.removeAttribute('open');}
  function saveEditor(){
    let next=profile;
    document.querySelectorAll('[data-mycm-path]').forEach(input=>{if(input.value==='')return;const path=input.dataset.mycmPath;next=Store.setFact(next,path,num(input.value),{origin:'user',source:'My Carrowmont',unit:LABELS[path]?.kind==='money'?locale().currency:LABELS[path]?.kind||null});});
    profile=Store.setLocale(next,locale());persist();closeEditor();showBanner('Changes saved to My Carrowmont.');
  }

  document.addEventListener('click',event=>{
    const edit=event.target.closest('[data-mycm-edit]'); if(edit){openEditor(edit.dataset.mycmEdit||'');return;}
    const remove=event.target.closest('[data-mycm-remove]'); if(remove){profile=Store.removeFact(profile,remove.dataset.mycmRemove);persist();showBanner('Value removed from My Carrowmont.');return;}
  });
  document.addEventListener('change',event=>{
    const toggle=event.target.closest('[data-mycm-influence]'); if(toggle){profile=Store.setExcluded(profile,toggle.dataset.mycmInfluence,!toggle.checked);persist();showBanner(toggle.checked?'Value included in dashboard recommendations.':'Value ignored by dashboard recommendations.');}
  });
  $('mycmEditAll').addEventListener('click',()=>openEditor(''));
  $('mycmKnowBtn').addEventListener('click',()=>{$('mycmKnows').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});});
  $('mycmEditClose').addEventListener('click',closeEditor);$('mycmEditCancel').addEventListener('click',closeEditor);$('mycmEditForm').addEventListener('submit',e=>{e.preventDefault();saveEditor();});
  window.addEventListener('carrowmont:localechange',()=>{if(initialized){syncLocale();renderAll();}});
  window.addEventListener('carrowmont:mycm-account-ready',event=>{
    profile=Store.normalize(event.detail?.profile||Store.create({...locale(),mode:'session'}));
    profile=Store.setMode(Store.setLocale(profile,locale()),'session');
    if(browserStore)browserStore.save(profile,'session');
    initialized=true;
    renderAll();
  });
})();
