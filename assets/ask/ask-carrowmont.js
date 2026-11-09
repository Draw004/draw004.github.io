(function(){
  'use strict';

  const QUESTION_HINTS={
    essentialExpenses:'Include essential living costs you would still need to cover.',
    emergencySavings:'Use liquid savings you could realistically access for an emergency.',
    monthlyIncome:'Use monthly take-home income.',
    flexibleExpenses:'Include non-essential or adjustable monthly spending.',
    vehiclePrice:'Enter the purchase price before any optional scenarios.',
    takeHomeMonthlyIncome:'Use monthly take-home income.',
    essentialMonthlyExpenses:'Include essential monthly household costs.',
    annualRate:'Enter the expected annual loan rate as a percentage, for example 7.5.',
    termMonths:'Enter the expected loan term in months, for example 60.',
    monthlyRunningCosts:'Estimate insurance, fuel/charging, maintenance and other regular running costs.',
    mortgageBalance:'Enter the current outstanding mortgage or home-loan balance.',
    mortgageRatePct:'Enter the current annual loan rate as a percentage.',
    remainingYears:'Enter the remaining whole years on the loan.',
    extraAmount:'Enter the lump sum you are considering allocating.',
    assumedInvestmentReturnPct:'Enter an annual return assumption for comparison. This is not a forecast.',
    debtBalance:'Enter the debt balance you are deciding whether to pay down.',
    debtAprPct:'Enter the debt annual percentage rate.',
    debtMinimumPayment:'Enter the required monthly payment on this debt.',
    monthlySurplus:'Enter the monthly amount you could direct to debt reduction or saving.',
    assumedSavingsReturnPct:'Enter an annual savings/investment return assumption. This is not a forecast.'
  };
  const INTENT_COPY={
    'debt-vs-savings':'Debt or savings',
    'car-affordability':'Car affordability',
    'mortgage-prepay-vs-invest':'Mortgage prepay or invest',
    'emergency-runway':'Emergency fund adequacy',
    'cash-flow-shortfall':'Monthly cash-flow shortfall'
  };
  const DETAIL_LINKS={
    'debt-vs-savings':['Explore the detailed Debt Payoff tools','/budget-cash-flow-planner/#debt-payoff'],
    'car-affordability':['Open the full Car Affordability tool','/car-affordability-auto-decision-calculator.html'],
    'mortgage-prepay-vs-invest':['Open Mortgage Prepay vs Investing','/mortgage-payoff-calculator/prepayment-vs-investing.html'],
    'emergency-runway':['Open the Emergency Fund & Runway tool','/emergency-fund-runway-calculator.html'],
    'cash-flow-shortfall':['Open the Budget & Cash Flow Planner','/budget-cash-flow-planner/']
  };
  const MONEY_KEY=/amount|balance|income|expense|saving|reserve|price|payment|cost|value|interestSaved|targetGap|monthlyNeed|cashRoom|loanAmount|endingValue|growth|remaining|weeklyRoom|dailyRoom|projectedValue|projectedGrowth/i;
  const PCT_KEY=/Pct$|RatePct$|AprPct$|annualRate|assumedReturn/i;
  const MONTH_KEY=/months|runway/i;
  const YEAR_KEY=/years/i;

  let api=null;
  let state={intent:null,facts:{},questionText:''};
  const $=id=>document.getElementById(id);

  function getLocale(){
    const L=window.CarrowmontLocale;
    return { currency:L?.getCurrency?.()||'USD', country:L?.getRegion?.()||'OTHER' };
  }
  function money(value){
    const L=window.CarrowmontLocale;
    return L?.formatMoney ? L.formatMoney(value,{maximumFractionDigits:0}) : String(Math.round(Number(value)||0));
  }
  function number(value,digits=1){
    const n=Number(value); if(!Number.isFinite(n)) return '—';
    return new Intl.NumberFormat(window.CarrowmontLocale?.getLocale?.()||'en-US',{maximumFractionDigits:digits}).format(n);
  }
  function labelize(key){ return String(key).replace(/([a-z])([A-Z])/g,'$1 $2').replace(/[_-]/g,' ').replace(/^./,c=>c.toUpperCase()); }
  function formatValue(key,value){
    if(value===null||value===undefined||value==='') return '—';
    if(typeof value==='boolean') return value?'Yes':'No';
    if(typeof value!=='number') return String(value);
    if(PCT_KEY.test(key)) return `${number(value,2)}%`;
    if(MONTH_KEY.test(key)) return `${number(value,1)} months`;
    if(YEAR_KEY.test(key)) return `${number(value,1)} years`;
    if(MONEY_KEY.test(key)) return money(value);
    return number(value,2);
  }
  function stage(name){
    $('askStart').hidden=name!=='start'; $('askQuestionsStage').hidden=name!=='questions'; $('askResultStage').hidden=name!=='result';
  }
  function hideUnsupported(){ const box=$('askUnsupported'); if(box) box.hidden=true; }
  function showUnsupported(text){
    $('askStartMessage').textContent='';
    const box=$('askUnsupported');
    if(!box) return;
    const title=$('askUnsupportedTitle');
    const detail=$('askUnsupportedText');
    if(title) title.textContent='This guided resolution is not available yet';
    if(detail) detail.textContent=`I can understand your question${text?` — “${text}”`:''}, but this guided resolution has not been built yet. Ask Carrowmont currently works through five controlled money decisions while we develop the fuller resolution experience.`;
    box.hidden=false;
    requestAnimationFrame(()=>box.scrollIntoView({behavior:'smooth',block:'nearest'}));
  }
  function reset(){
    state={intent:null,facts:{},questionText:''};
    $('askQuestion').value=''; $('askStartMessage').textContent=''; $('askQuestionMessage').textContent=''; hideUnsupported();
    stage('start'); $('askQuestion').focus();
  }
  function requiredInputType(key){ return PCT_KEY.test(key)||MONEY_KEY.test(key)||MONTH_KEY.test(key)||YEAR_KEY.test(key)||/termMonths/i.test(key)?'number':'text'; }
  function fieldStep(key){ return /termMonths|remainingYears/i.test(key)?'1':PCT_KEY.test(key)?'0.01':'0.01'; }
  function startIntent(intent,text=''){
    hideUnsupported();
    if(!api?.SUPPORTED?.some(x=>x.intent===intent)){ showUnsupported(text); return; }
    state={intent,facts:{},questionText:text};
    continueJourney();
  }
  function startFromText(){
    const text=$('askQuestion').value.trim();
    hideUnsupported();
    if(!text){ $('askStartMessage').textContent='Tell Carrowmont what you are trying to solve, or choose one of the suggested questions.'; return; }
    $('askStartMessage').textContent='';
    const classified=api.classify(text);
    if(!classified?.intent){ showUnsupported(text); return; }
    startIntent(classified.intent,text);
  }
  function continueJourney(){
    const locale=getLocale();
    let result;
    try{ result=api.resolve({intent:state.intent,facts:state.facts,maxQuestions:3,currency:locale.currency,country:locale.country,startDate:new Date().toISOString().slice(0,10)}); }
    catch(err){ $('askQuestionMessage').textContent='Carrowmont could not run this calculation. Please review the numbers and try again.'; stage('questions'); return; }
    if(result.status==='NEEDS_INPUT'){ renderQuestions(result.questions); return; }
    if(result.status==='RESOLVED'){ renderResult(result); return; }
    $('askStartMessage').textContent='Choose one of the five supported journeys to continue.'; stage('start');
  }
  function renderQuestions(questions){
    stage('questions');
    $('askQuestionsTitle').textContent=INTENT_COPY[state.intent]||'A few details';
    $('askQuestionsIntro').textContent=`Carrowmont needs ${questions.length===1?'one more detail':`${questions.length} details`} before it can run the next step. Amounts use ${getLocale().currency}; changing currency does not convert values.`;
    const wrap=$('askQuestionFields'); wrap.innerHTML='';
    for(const q of questions){
      const group=document.createElement('div'); group.className='ask-field';
      const label=document.createElement('label'); label.htmlFor=`ask-field-${q.key}`; label.textContent=q.label;
      const input=document.createElement('input'); input.id=`ask-field-${q.key}`; input.name=q.key; input.type=requiredInputType(q.key); input.step=fieldStep(q.key); input.min='0'; input.inputMode='decimal'; input.autocomplete='off'; input.required=true;
      if(PCT_KEY.test(q.key)) input.placeholder='e.g. 7.5'; else if(/termMonths/i.test(q.key)) input.placeholder='e.g. 60'; else input.placeholder=`Enter ${q.label.toLowerCase()}`;
      group.append(label,input);
      const hint=QUESTION_HINTS[q.key]; if(hint){ const small=document.createElement('span'); small.className='ask-field-hint'; small.textContent=hint; group.appendChild(small); }
      wrap.appendChild(group);
    }
    $('askQuestionMessage').textContent='';
    requestAnimationFrame(()=>wrap.querySelector('input')?.focus());
  }
  function parseInput(input){
    const raw=input.value.trim().replace(/,/g,''); const n=Number(raw);
    return raw!==''&&Number.isFinite(n)?n:null;
  }
  function submitQuestions(event){
    event.preventDefault();
    const inputs=[...$('askQuestionFields').querySelectorAll('input')];
    for(const input of inputs){
      const value=parseInput(input);
      if(value===null||value<0){ $('askQuestionMessage').textContent='Please enter a valid non-negative number for each field.'; input.focus(); return; }
      state.facts[input.name]=value;
    }
    $('askQuestionMessage').textContent=''; continueJourney();
  }
  function renderResult(result){
    stage('result');
    $('askResultSituation').textContent=result.situation||INTENT_COPY[result.intent]||'Your result';
    $('askDiagnosis').textContent=result.diagnosis||'';
    const metrics=$('askMetrics'); metrics.innerHTML='';
    for(const [key,value] of Object.entries(result.importantNumbers||{})){
      if(key==='currency'||value===null||typeof value==='object') continue;
      const item=document.createElement('div'); item.className='ask-metric';
      const label=document.createElement('span'); label.textContent=labelize(key);
      const strong=document.createElement('strong'); strong.textContent=formatValue(key,value);
      item.append(label,strong); metrics.appendChild(item);
    }
    const alternatives=$('askAlternatives'); alternatives.innerHTML='';
    const altItems=Array.isArray(result.alternatives)?result.alternatives:[];
    $('askAlternativesSection').hidden=altItems.length===0;
    for(const alt of altItems.slice(0,4)){
      const card=document.createElement('div'); card.className='ask-alternative';
      const title=document.createElement('h4'); title.textContent=alt.label||labelize(alt.id||'Option'); card.appendChild(title);
      for(const [key,value] of Object.entries(alt)){
        if(['id','label'].includes(key)||value===null||typeof value==='object') continue;
        const row=document.createElement('div'); row.className='ask-alt-row';
        const name=document.createElement('span'); name.textContent=labelize(key);
        const val=document.createElement('strong'); val.textContent=formatValue(key,value);
        row.append(name,val); card.appendChild(row);
      }
      alternatives.appendChild(card);
    }
    const steps=$('askNextSteps'); steps.innerHTML='';
    for(const step of result.nextSteps||[]){ const li=document.createElement('li'); li.textContent=step; steps.appendChild(li); }
    const trace=$('askEngineTrace'); trace.innerHTML='';
    for(const item of result.trace||[]){ const li=document.createElement('li'); li.textContent=labelize(item.engineId); trace.appendChild(li); }
    const assumptions=$('askAssumptions'); assumptions.innerHTML='';
    const asum=Array.isArray(result.assumptions)?result.assumptions:[];
    $('askAssumptionsWrap').hidden=asum.length===0;
    for(const item of asum){ const li=document.createElement('li'); li.textContent=`${labelize(item.id)}: ${formatValue(item.id,item.value)}${item.note?` — ${item.note}`:''}`; assumptions.appendChild(li); }
    const wrap=$('askDetailLinkWrap'); wrap.innerHTML=''; const link=DETAIL_LINKS[result.intent];
    if(link){ const a=document.createElement('a'); a.href=link[1]; a.textContent=`${link[0]} →`; wrap.appendChild(a); }
    window.scrollTo({top:$('askWorkspace').getBoundingClientRect().top+window.scrollY-90,behavior:'smooth'});
  }
  function init(){
    if(!window.CarrowmontAskMvp?.create){ $('askStartMessage').textContent='Ask Carrowmont is temporarily unavailable.'; return; }
    api=window.CarrowmontAskMvp.create();
    $('askStartBtn').addEventListener('click',startFromText);
    $('askQuestion').addEventListener('keydown',event=>{ if((event.ctrlKey||event.metaKey)&&event.key==='Enter') startFromText(); });
    $('askQuestionsForm').addEventListener('submit',submitQuestions);
    document.querySelectorAll('[data-ask-reset]').forEach(btn=>btn.addEventListener('click',reset));
    document.querySelectorAll('[data-ask-intent]').forEach(btn=>btn.addEventListener('click',()=>startIntent(btn.dataset.askIntent,btn.textContent.trim())));
    window.addEventListener('carrowmont:localechange',()=>{ if(!$('askQuestionsStage').hidden) renderQuestions(api.missingQuestions(state.intent,state.facts,3)); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
