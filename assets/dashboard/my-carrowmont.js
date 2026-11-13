(function(){
  'use strict';

  const FIELD_DEFS=[
    {group:'Monthly money',path:'cashFlow.takeHomeIncome',label:'Monthly income you receive',kind:'money',help:'The amount you normally receive after tax and other deductions.'},
    {group:'Saved details',path:'cashFlow.grossIncome',label:'Income before tax',kind:'money',help:'Kept for calculators that need a lender-style gross-income ratio. It is not required for the main dashboard.'},
    {group:'Monthly money',path:'cashFlow.essentialExpenses',label:'Essential monthly expenses',kind:'money',help:'Costs that must continue and cannot reasonably be reduced or skipped.'},
    {group:'Monthly money',path:'cashFlow.flexibleExpenses',label:'Other monthly spending',kind:'money',help:'Spending that could be reduced, postponed or stopped if needed.'},
    {group:'Debt & loans',path:'debt.monthlyPayments',label:'Monthly debt payments',kind:'money',help:'Required monthly payments across loans, cards and other debt.'},
    {group:'Emergency savings',path:'resilience.emergencySavings',label:'Current emergency savings',kind:'money',help:'Accessible money you keep for unexpected essential costs.'},
    {group:'Emergency savings',path:'resilience.targetMonths',label:'Emergency savings target',kind:'months',help:'Choose how many months of essential commitments you want your emergency savings to cover.'},
    {group:'Debt & loans',path:'debt.balance',label:'Debt remaining',kind:'money'},
    {group:'Debt & loans',path:'debt.highestAprPct',label:'Highest debt interest rate',kind:'pct'},
    {group:'Saved details',path:'debt.housingPayment',label:'Monthly mortgage / home-loan payment',kind:'money'},
    {group:'Saved details',path:'debt.otherLoanPayments',label:'Other monthly loan payments',kind:'money'},
    {group:'Saved details',path:'debt.creditCardMinimums',label:'Monthly credit-card minimums',kind:'money'},
    {group:'Saved details',path:'debt.otherDebtPayments',label:'Other monthly debt payments',kind:'money'},
    {group:'Saved details',path:'debt.mortgageBalance',label:'Mortgage / home-loan balance',kind:'money'},
    {group:'Saved details',path:'debt.mortgageRatePct',label:'Mortgage / home-loan rate',kind:'pct'},
    {group:'Saved details',path:'retirement.currentSavings',label:'Retirement savings',kind:'money'},
    {group:'Saved details',path:'retirement.monthlyContribution',label:'Monthly retirement contribution',kind:'money'},
    {group:'Saved details',path:'goal.targetAmount',label:'Goal target amount',kind:'money'},
    {group:'Saved details',path:'goal.currentSavings',label:'Savings already set aside for goal',kind:'money'},
    {group:'Saved details',path:'goal.yearsAway',label:'Years until goal',kind:'years'},
    {group:'Saved details',path:'goal.monthlyContribution',label:'Monthly goal contribution',kind:'money'},
    {group:'Saved details',path:'assumptions.longTermReturnPct',label:'Illustrative long-term return assumption',kind:'pct',help:'Used for planning illustrations only. It is not a forecast.'},
    {group:'Saved details',path:'fi.currentAge',label:'Current age',kind:'number'},
    {group:'Saved details',path:'fi.targetAge',label:'Target financial-independence age',kind:'number'},
    {group:'Saved details',path:'fi.monthlySpending',label:'Monthly spending for FI planning',kind:'money'},
    {group:'Saved details',path:'fi.monthlyPassiveIncome',label:'Monthly income expected after FI',kind:'money'},
    {group:'Saved details',path:'fi.withdrawalRatePct',label:'Withdrawal-rate assumption',kind:'pct'},
    {group:'Saved details',path:'fi.inflationPct',label:'Inflation assumption',kind:'pct'},
    {group:'Saved details',path:'fi.currentAssets',label:'Current invested assets',kind:'money'},
    {group:'Saved details',path:'fi.monthlyContribution',label:'Monthly investment contribution',kind:'money'},
    {group:'Saved details',path:'fi.annualReturnPct',label:'Annual return assumption',kind:'pct'},
    {group:'Saved details',path:'fi.annualStepUpPct',label:'Annual contribution increase',kind:'pct'}
  ];
  const LABELS=Object.fromEntries(FIELD_DEFS.map(x=>[x.path,x]));
  const PRIMARY_SECTIONS={
    monthly:{title:'Update monthly money',intro:'Use the amounts you normally receive and spend each month.',paths:['cashFlow.takeHomeIncome','cashFlow.essentialExpenses','cashFlow.flexibleExpenses']},
    emergency:{title:'Update emergency savings',intro:'Set how much emergency savings you have and the number of months you want it to cover.',paths:['resilience.emergencySavings','resilience.targetMonths']},
    debt:{title:'Update debt & loans',intro:'Use the combined debt figures you want My Carrowmont to show.',paths:['debt.balance','debt.monthlyPayments','debt.highestAprPct']}
  };
  const PATH_TO_SECTION=Object.fromEntries(Object.entries(PRIMARY_SECTIONS).flatMap(([key,section])=>section.paths.map(path=>[path,key])));
  const $=id=>document.getElementById(id);
  const Store=window.CarrowmontDashboardStore;
  const browserStore=Store?.createBrowserStore?.(window);
  let profile=Store.create();
  let initialized=false;
  let activeEditTarget='';
  let editOpener=null;

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
  function tone(status){return status==='ready'?'good':status==='review'?'bad':'warn';}
  function statusLabel(status){return status==='ready'?'Ready':status==='review'?'Review':'Add details';}
  function persist(render=true,saveImmediately=false){if(!initialized)return;if(browserStore)profile=browserStore.save(profile,'session');window.dispatchEvent(new CustomEvent('carrowmont:mycm-profile-change',{detail:{profile:Store.normalize(profile),saveImmediately:Boolean(saveImmediately)}}));if(render)renderAll();}
  function showBanner(text){const el=$('mycmBanner');if(!el)return;el.textContent=text;el.hidden=false;window.setTimeout(()=>{if(el.textContent===text)el.hidden=true;},4500);}
  function metric(label,val){return `<div class="mycm-metric"><span>${esc(label)}</span><strong>${esc(val)}</strong></div>`;}
  function action(label,target,primary=false){return `<button class="mycm-button${primary?' mycm-button-primary':''}" type="button" data-mycm-edit="${esc(target)}">${esc(label)}</button>`;}
  function missingList(items){return `<ul class="mycm-missing-list">${items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`;}
  function card(title,status,body,actions=''){return `<div class="mycm-card-head"><h2>${esc(title)}</h2><span class="mycm-status" data-tone="${tone(status)}">${statusLabel(status)}</span></div><div class="mycm-card-main">${body}</div>${actions?`<div class="mycm-card-actions">${actions}</div>`:''}`;}

  function debtPaymentsState(){
    return has('debt.monthlyPayments')?{known:true,value:num(value('debt.monthlyPayments'))}:{known:false,value:0};
  }
  function debtBalanceState(){
    return has('debt.balance')?{known:true,value:num(value('debt.balance')),source:'Debt remaining'}:{known:false,value:0,source:'Debt remaining'};
  }

  function renderMonthlyMoney(){
    const el=$('mycmCashFlowCard'); if(!el)return;
    const debt=debtPaymentsState();
    const required=[
      ['cashFlow.takeHomeIncome','Monthly income you receive'],
      ['cashFlow.essentialExpenses','Essential monthly expenses'],
      ['cashFlow.flexibleExpenses','Other monthly spending']
    ];
    const missing=required.filter(([path])=>!has(path)).map(([,label])=>label);
    if(!debt.known)missing.push('Monthly debt payments (enter 0 if you have none)');
    if(missing.length){
      el.innerHTML=card('Monthly money','missing',`<strong class="mycm-big">Add details to calculate</strong><p>Carrowmont needs these monthly amounts before it can show money left accurately.</p>${missingList(missing)}`,action('Update monthly money','monthly',true));
      return;
    }
    const income=num(value('cashFlow.takeHomeIncome')),essential=num(value('cashFlow.essentialExpenses')),flexible=num(value('cashFlow.flexibleExpenses'));
    const r=window.CarrowmontBudgetCore.calculate({incomes:[{amount:income,frequency:'monthly'}],essential:[{amount:essential,frequency:'monthly'},{amount:debt.value,frequency:'monthly'}],flexible:[{amount:flexible,frequency:'monthly'}],savings:[],primaryPayFrequency:'monthly'});
    const status=r.remaining<0?'review':'ready';
    el.innerHTML=card('Monthly money',status,`<span class="mycm-big-label">Money left each month</span><strong class="mycm-big">${money(r.remaining)}</strong><p>${r.remaining<0?'Your entered monthly commitments are above the income you receive.':'This is what remains after the monthly amounts currently saved below.'}</p><div class="mycm-metrics mycm-metrics-compact">${metric('Monthly income',money(income))}${metric('Essential expenses',money(essential))}${metric('Other spending',money(flexible))}${metric('Debt payments',money(debt.value))}</div>`,action('Update monthly money','monthly',true));
  }

  function renderEmergency(){
    const el=$('mycmEmergencyCard'); if(!el)return;
    const debt=debtPaymentsState();
    const missing=[];
    if(!has('cashFlow.essentialExpenses'))missing.push('Essential monthly expenses');
    if(!debt.known)missing.push('Monthly debt payments (enter 0 if you have none)');
    if(!has('resilience.emergencySavings'))missing.push('Current emergency savings');
    if(missing.length){
      el.innerHTML=card('Emergency savings','missing',`<strong class="mycm-big">Add details to calculate</strong><p>Your target is based on essential monthly expenses plus required debt payments.</p>${missingList(missing)}`,action('Update savings','emergency',true));
      return;
    }
    const selected=has('resilience.targetMonths');
    const targetMonths=selected?num(value('resilience.targetMonths')):6;
    const r=window.CarrowmontEmergencyFundCore.calculate({essentialExpenses:num(value('cashFlow.essentialExpenses')),debtPayments:debt.value,emergencySavings:num(value('resilience.emergencySavings')),targetMonths});
    const status=!selected?'missing':r.targetGap>0?'review':'ready';
    const targetText=selected?`${number(targetMonths,1)} months`:'6 months (starting suggestion)';
    const intro=selected?(r.targetGap>0?`You are ${money(r.targetGap)} below the target you selected.`:'Your current emergency savings cover the target you selected.'):'Six months is shown as a starting suggestion until you choose your own target.';
    el.innerHTML=card('Emergency savings',status,`<span class="mycm-big-label">Current emergency savings</span><strong class="mycm-big">${money(r.reserve)}</strong><p>${esc(intro)}</p><div class="mycm-metrics mycm-metrics-compact">${metric('Essential commitments',money(r.monthlyNeed))}${metric('Coverage now',r.fullLossRunwayMonths==null?'—':`${number(r.fullLossRunwayMonths,1)} months`)}${metric('Selected target',targetText)}${metric('Target amount',money(r.targetAmount))}</div>`,action('Update savings','emergency',true)+action(selected?'Change target':'Set target','emergency'));
  }

  function renderDebt(){
    const el=$('mycmDebtCard'); if(!el)return;
    const balance=debtBalanceState(),payments=debtPaymentsState(),apr=has('debt.highestAprPct')?num(value('debt.highestAprPct')):null;
    if(!balance.known&&!payments.known&&apr==null){
      el.innerHTML=card('Debt & loans','missing','<strong class="mycm-big">No debt details added</strong><p>Add your combined debt figures if you want My Carrowmont to show debt and loan context.</p>',action('Add debt details','debt',true));
      return;
    }
    const income=has('cashFlow.takeHomeIncome')?num(value('cashFlow.takeHomeIncome')):null;
    const ratio=income!=null&&income>0&&payments.known?(payments.value/income)*100:null;
    const ratioText=ratio==null?'Add monthly income to see how much of it goes toward debt payments.':`${pct(ratio)} of your monthly income goes toward debt payments.`;
    el.innerHTML=card('Debt & loans','ready',`<span class="mycm-big-label">${esc(balance.source)}</span><strong class="mycm-big">${balance.known?money(balance.value):'Not set'}</strong><p>${esc(ratioText)}</p><div class="mycm-metrics mycm-metrics-compact">${metric('Monthly debt payments',payments.known?money(payments.value):'Not set')}${metric('Highest interest rate',apr==null?'Not set':pct(apr))}</div>`,action('Update debt','debt',true)+'<a class="mycm-button" href="/budget-cash-flow-planner/debt-payoff-calculator.html">Open debt payoff calculator</a>');
  }

  function formatFact(path,f){
    const def=LABELS[path]||{kind:'number'};
    if(def.kind==='money')return money(f.value);
    if(def.kind==='pct')return pct(f.value);
    if(def.kind==='months')return `${number(f.value,1)} months`;
    if(def.kind==='years')return `${number(f.value,1)} years`;
    return number(f.value,2);
  }
  function renderFacts(){
    const wrap=$('mycmFacts');if(!wrap)return;
    const entries=Object.entries(profile.facts||{}).sort((a,b)=>a[0].localeCompare(b[0]));
    if(!entries.length){wrap.innerHTML='<div class="mycm-empty">No additional planning details are saved yet.</div>';return;}
    wrap.innerHTML=entries.map(([path,f])=>{const def=LABELS[path]||{label:path};return `<div class="mycm-fact"><div class="mycm-fact-label"><strong>${esc(def.label)}</strong><small>${f.excluded?'Ignored by recommendations':'Included where compatible'}</small></div><div class="mycm-fact-value">${esc(formatFact(path,f))}</div><div class="mycm-fact-source">${esc(f.source||f.origin||'User')}</div><div class="mycm-fact-actions"><label class="mycm-toggle"><input type="checkbox" data-mycm-influence="${esc(path)}" ${f.excluded?'':'checked'}> Use</label><button class="mycm-button" type="button" data-mycm-edit="${esc(path)}">Change</button><button class="mycm-button mycm-button-danger" type="button" data-mycm-saved-remove="${esc(path)}">Remove</button></div></div>`;}).join('');
  }
  function renderAll(){renderMonthlyMoney();renderEmergency();renderDebt();renderFacts();}

  function fieldHtml(def){
    const f=fact(def.path,true); const remove=f?`<button class="mycm-field-remove" type="button" data-mycm-remove="${esc(def.path)}">Remove</button>`:'';
    return `<div class="mycm-field"><div class="mycm-field-head"><label for="mycm-${esc(def.path)}">${esc(def.label)}</label>${remove}</div><input id="mycm-${esc(def.path)}" data-mycm-path="${esc(def.path)}" type="number" step="any" min="0" value="${f?esc(f.value):''}">${def.help?`<small>${esc(def.help)}</small>`:''}</div>`;
  }
  function emergencyTargetHtml(){
    const f=fact('resilience.targetMonths',true); const current=f?num(f.value):null; const preset=f?([2,3,6].includes(current)?String(current):'custom'):'';
    const remove=f?'<button class="mycm-field-remove" type="button" data-mycm-remove="resilience.targetMonths">Remove</button>':'';
    return `<div class="mycm-field mycm-target-field"><div class="mycm-field-head"><span class="mycm-field-label">Emergency savings target</span>${remove}</div><fieldset class="mycm-target-options"><legend>How many months of essential commitments do you want to cover? Six months is a starting suggestion, not an automatic selection.</legend>${[2,3,6].map(m=>`<label><input type="radio" name="mycmTargetMonths" value="${m}" ${preset===String(m)?'checked':''}><span>${m} months${m===6?' · starting suggestion':''}</span></label>`).join('')}<label><input type="radio" name="mycmTargetMonths" value="custom" ${preset==='custom'?'checked':''}><span>Custom</span></label></fieldset><input class="mycm-custom-target" id="mycmCustomTargetMonths" type="number" min="1" max="24" step="1" value="${preset==='custom'?esc(current):''}" placeholder="Enter months" ${preset==='custom'?'':'hidden'}><small>Target amount = essential monthly expenses + required debt payments, multiplied by the months you select. Other monthly spending is not included.</small></div>`;
  }
  function editorContext(sectionKey){
    if(sectionKey!=='emergency')return'';
    const debt=debtPaymentsState();
    if(!has('cashFlow.essentialExpenses')||!debt.known)return '<div class="mycm-editor-context"><strong>Target needs monthly commitments</strong><p>Add essential monthly expenses and monthly debt payments first. Enter 0 for debt payments if you have none.</p><button class="mycm-button" type="button" data-mycm-edit="monthly">Update monthly money</button><button class="mycm-button" type="button" data-mycm-edit="debt">Update debt</button></div>';
    const essential=num(value('cashFlow.essentialExpenses')),need=essential+debt.value;
    return `<div class="mycm-editor-context"><strong>Essential monthly commitments: ${esc(money(need))}</strong><p>${esc(money(essential))} essential expenses + ${esc(money(debt.value))} required debt payments.</p></div>`;
  }
  function buildEditor(target){
    const wrap=$('mycmEditFields'); if(!wrap)return;
    const sectionKey=PRIMARY_SECTIONS[target]?target:PATH_TO_SECTION[target];
    const title=$('mycmEditTitle'),intro=$('mycmEditIntro');
    if(sectionKey){
      const section=PRIMARY_SECTIONS[sectionKey]; title.textContent=section.title; intro.textContent=section.intro;
      const fields=section.paths.map(path=>path==='resilience.targetMonths'?emergencyTargetHtml():fieldHtml(LABELS[path])).join('');
      wrap.innerHTML=`${editorContext(sectionKey)}<section class="mycm-edit-group"><div class="mycm-edit-grid">${fields}</div></section>`;
      return;
    }
    const def=LABELS[target];
    if(def){title.textContent=`Change ${def.label.toLowerCase()}`;intro.textContent='Update this saved value, or remove it if you no longer want My Carrowmont to use it.';wrap.innerHTML=`<section class="mycm-edit-group"><div class="mycm-edit-grid">${fieldHtml(def)}</div></section>`;return;}
    title.textContent='Update saved details'; intro.textContent='Choose a section from the dashboard to make a focused update.'; wrap.innerHTML='<div class="mycm-editor-context"><p>Use Monthly money, Emergency savings or Debt & loans for the main dashboard. Additional saved values can be changed from Saved details.</p></div>';
  }
  function openEditor(target,opener){activeEditTarget=target||'';editOpener=opener||document.activeElement;buildEditor(activeEditTarget);const d=$('mycmEditDialog');if(typeof d.showModal==='function')d.showModal();else d.setAttribute('open','');const focusPath=PRIMARY_SECTIONS[activeEditTarget]?.paths?.[0]||activeEditTarget;if(focusPath)window.setTimeout(()=>document.querySelector(`[data-mycm-path="${CSS.escape(focusPath)}"]`)?.focus(),0);}
  function closeEditor(){const d=$('mycmEditDialog');if(typeof d.close==='function')d.close();else d.removeAttribute('open');const back=editOpener;editOpener=null;if(back&&typeof back.focus==='function')window.setTimeout(()=>back.focus(),0);}
  function selectedTargetMonths(){
    const selected=document.querySelector('input[name="mycmTargetMonths"]:checked');if(!selected)return null;
    if(selected.value!=='custom')return num(selected.value);
    const custom=$('mycmCustomTargetMonths');const n=custom?Number(custom.value):NaN;return Number.isFinite(n)&&n>=1&&n<=24?n:null;
  }
  function saveEditor(){
    let next=profile;
    document.querySelectorAll('#mycmEditFields [data-mycm-path]').forEach(input=>{if(input.value==='')return;const path=input.dataset.mycmPath;next=Store.setFact(next,path,num(input.value),{origin:'user',source:'My Carrowmont',unit:LABELS[path]?.kind==='money'?locale().currency:LABELS[path]?.kind||null});});
    const targetChoice=document.querySelector('input[name="mycmTargetMonths"]:checked');
    if(targetChoice){const target=selectedTargetMonths();if(target==null){showBanner('Enter a target between 1 and 24 months.');return;}next=Store.setFact(next,'resilience.targetMonths',target,{origin:'user',source:'My Carrowmont',unit:'months'});}
    profile=Store.setLocale(next,locale());persist();closeEditor();showBanner('Changes saved to My Carrowmont.');
  }
  function removePath(path){
    if(!stored(path))return;
    const def=LABELS[path]||{label:'this value'};
    if(!window.confirm(`Remove ${def.label.toLowerCase()} from My Carrowmont?`))return;
    profile=Store.removeFact(profile,path);persist(true,true);
    if($('mycmEditDialog')?.open){buildEditor(activeEditTarget);}
    showBanner(`${def.label} removed from My Carrowmont.`);
  }

  document.addEventListener('click',event=>{
    const edit=event.target.closest('[data-mycm-edit]');if(edit){openEditor(edit.dataset.mycmEdit||'',edit);return;}
    const remove=event.target.closest('[data-mycm-remove]');if(remove){removePath(remove.dataset.mycmRemove);return;}
    const savedRemove=event.target.closest('[data-mycm-saved-remove]');if(savedRemove){removePath(savedRemove.dataset.mycmSavedRemove);return;}
  });
  document.addEventListener('change',event=>{
    const toggle=event.target.closest('[data-mycm-influence]');if(toggle){profile=Store.setExcluded(profile,toggle.dataset.mycmInfluence,!toggle.checked);persist();showBanner(toggle.checked?'Value included where compatible.':'Value ignored by dashboard recommendations.');return;}
    const target=event.target.closest('input[name="mycmTargetMonths"]');if(target){const custom=$('mycmCustomTargetMonths');if(custom){custom.hidden=target.value!=='custom';if(target.value==='custom')custom.focus();}}
  });
  $('mycmEditClose')?.addEventListener('click',closeEditor);$('mycmEditCancel')?.addEventListener('click',closeEditor);$('mycmEditForm')?.addEventListener('submit',e=>{e.preventDefault();saveEditor();});
  window.addEventListener('carrowmont:localechange',()=>{if(initialized){syncLocale();renderAll();}});
  window.addEventListener('carrowmont:mycm-account-ready',event=>{
    profile=Store.normalize(event.detail?.profile||Store.create({...locale(),mode:'session'}));
    profile=Store.setMode(Store.setLocale(profile,locale()),'session');
    if(browserStore)browserStore.save(profile,'session');
    initialized=true;renderAll();
  });
})();
