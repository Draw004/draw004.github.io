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
    monthlySurplus:'Enter the extra monthly amount you could direct to debt repayment or investing.',
    assumedSavingsReturnPct:'Enter an expected annual investment return. This is an assumption, not a forecast.',
    monthlyDebtPayments:'Include required monthly payments across loans and cards. Enter 0 if you have none.',
    emergencyTargetMonths:'Choose the number of months of unavoidable costs you want your reserve to cover.',
    highestDebtAprPct:'Enter the highest annual interest rate among the debts included. Enter 0 if you have no debt.',
    assumedLongTermReturnPct:'Use a long-term return assumption only for comparison. This is not a forecast.',
    retirementSavings:'Enter retirement savings already accumulated. Enter 0 if none.',
    retirementMonthlyContribution:'Enter the amount you currently contribute each month. Enter 0 if none or not applicable.',
    goalTargetAmount:'Enter one current financial goal target. Use 0 if you do not want to assess a goal in this screen.',
    goalCurrentSavings:'Enter savings already set aside specifically for that goal. Enter 0 if none.',
    goalYearsAway:'Enter the number of years until the goal. Use 0 when no goal is being assessed.',
    goalMonthlyContribution:'Enter the monthly amount currently directed to the goal. Enter 0 if none.'
  };
  const FIELD_META={
    essentialExpenses:{why:'This sets the unavoidable monthly cost Carrowmont uses to measure emergency runway and cash resilience.'},
    emergencySavings:{why:'Accessible emergency savings show how much financial shock you can absorb without new debt.'},
    monthlyIncome:{why:'Take-home income is the starting point for measuring whether monthly spending fits inside available cash.'},
    flexibleExpenses:{why:'Flexible spending shows how much of the monthly shortfall may be adjustable rather than unavoidable.'},
    vehiclePrice:{why:'The vehicle price determines the amount that may need to be financed and the size of the affordability test.'},
    takeHomeMonthlyIncome:{why:'Take-home income is used to test the car cost against the cash actually available each month.'},
    essentialMonthlyExpenses:{why:'Essential household costs protect the affordability result from treating necessary spending as spare cash.'},
    annualRate:{why:'The loan rate determines the modeled monthly payment and total borrowing cost.'},
    termMonths:{why:'The loan term changes both the monthly payment and how long the borrowing lasts.'},
    monthlyRunningCosts:{why:'Insurance, fuel or charging, maintenance and similar costs can make an affordable loan payment unaffordable in practice.'},
    mortgageBalance:{why:'The outstanding balance is the amount on which future mortgage interest and prepayment savings are modeled.'},
    mortgageRatePct:{why:'The contractual mortgage rate determines the interest saving created by prepayment.'},
    remainingYears:{why:'The remaining term sets the common time horizon for comparing prepayment with investing.'},
    extraAmount:{why:'This is the same money Carrowmont compares between mortgage prepayment and investing.'},
    assumedInvestmentReturnPct:{why:'A return assumption is needed only to model the investment path. It is not a forecast.',unknownDefault:5,unknownLabel:'I don’t know — use a 5% illustration'},
    debtBalance:{why:'The outstanding debt balance determines how much debt remains to be repaid.'},
    debtAprPct:{why:'The debt rate drives the contractual interest cost used in the comparison.'},
    debtMinimumPayment:{why:'The required payment is needed to model the debt payoff schedule before adding any extra amount.'},
    monthlySurplus:{why:'This is the same extra monthly money Carrowmont compares between faster debt repayment and investing.'},
    assumedSavingsReturnPct:{why:'A return assumption is needed to model the investment path. It is not a forecast or guarantee.',unknownDefault:5,unknownLabel:'I don’t know — use a 5% illustration'},
    monthlyDebtPayments:{why:'Required debt payments affect both monthly cash flow and the emergency reserve needed to cover unavoidable commitments.'},
    emergencyTargetMonths:{why:'Money Priorities uses your chosen reserve target rather than imposing a universal emergency-fund rule.'},
    highestDebtAprPct:{why:'The highest contractual debt rate is compared with the explicit long-term return assumption to decide whether debt reduction should outrank growth.'},
    assumedLongTermReturnPct:{why:'This assumption is used only to screen debt-versus-growth and goal funding. It is not a forecast or guaranteed return.',unknownDefault:5,unknownLabel:'I don’t know — use a 5% illustration'},
    retirementSavings:{why:'Existing retirement savings show whether long-term accumulation has already started, without claiming that the amount is sufficient.'},
    retirementMonthlyContribution:{why:'Money Priorities checks whether retirement saving is active. Full retirement adequacy remains the job of the Retirement Planner.'},
    goalTargetAmount:{why:'A defined target lets Carrowmont decide whether a near- or medium-term goal should appear ahead of long-term growth.'},
    goalCurrentSavings:{why:'Savings already earmarked for the goal reduce the amount that still needs to be funded.'},
    goalYearsAway:{why:'The time remaining affects how strongly a goal should compete for current cash flow.'},
    goalMonthlyContribution:{why:'The current contribution lets the Goal Planner project whether the entered goal is on track under the stated assumption.'}
  };
  const INTENT_COPY={
    'debt-vs-savings':'Pay debt or invest?',
    'car-affordability':'Car affordability',
    'mortgage-prepay-vs-invest':'Mortgage prepay or invest',
    'emergency-runway':'Emergency fund adequacy',
    'cash-flow-shortfall':'Monthly cash-flow shortfall',
    'money-priorities':'Money priorities'
  };
  const DETAIL_LINKS={
    'debt-vs-savings':['Explore the detailed Debt Payoff tools','/budget-cash-flow-planner/#debt-payoff'],
    'car-affordability':['Open the full Car Affordability tool','/car-affordability-auto-decision-calculator.html'],
    'mortgage-prepay-vs-invest':['Open Mortgage Prepay vs Investing','/mortgage-payoff-calculator/prepayment-vs-investing.html'],
    'emergency-runway':['Open the Emergency Fund & Runway tool','/emergency-fund-runway-calculator.html'],
    'cash-flow-shortfall':['Open the Budget & Cash Flow Planner','/budget-cash-flow-planner/'],
    'money-priorities':['Explore the detailed Carrowmont tools','/tools.html']
  };
  const CAR_AFFORDABILITY_HANDOFF_KEY='carrowmont_handoff_car_affordability_v1';
  const SEARCH_HANDOFF_KEY='carrowmont_search_handoff_v1';
  const CAR_AFFORDABILITY_HANDOFF_MAX_AGE_MS=15*60*1000;
  const MONEY_KEY=/amount|balance|income|expense|saving|reserve|price|payment|cost|value|interestSaved|targetGap|goalGap|monthlyNeed|cashRoom|loanAmount|endingValue|growth|remaining|outgo|weeklyRoom|dailyRoom|projectedValue|projectedGrowth/i;
  const PCT_KEY=/Pct$|RatePct$|AprPct$|annualRate|assumedReturn/i;
  const MONTH_KEY=/months|runway/i;
  const YEAR_KEY=/years/i;

  let api=null;
  let lastResult=null;
  let state={intent:null,facts:{},questionText:'',estimatedFacts:{},history:[],answerCache:{},estimatedCache:{}};
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
  function reducedMotion(){ return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches===true; }
  function reveal(target,focusTarget){
    if(!target) return;
    if(focusTarget && typeof focusTarget.focus==='function'){
      try{ focusTarget.focus({preventScroll:true}); }catch(_err){ focusTarget.focus(); }
    }
    requestAnimationFrame(()=>{
      target.scrollIntoView({behavior:reducedMotion()?'auto':'smooth',block:'start'});
    });
  }
  function clearFieldError(input){
    if(!input) return;
    input.removeAttribute('aria-invalid');
    input.closest('.ask-field')?.classList.remove('ask-field-invalid');
  }
  function updateBackControls(){
    document.querySelectorAll('[data-ask-back]').forEach(btn=>{ btn.hidden=state.history.length===0; btn.disabled=state.history.length===0; });
  }

  function hideUnsupported(){ const box=$('askUnsupported'); if(box) box.hidden=true; }
  function resultType(entry){
    if(String(entry?.category||'').toLowerCase()==='research') return 'Research';
    if(entry?.type==='tool') return 'Tool';
    if(entry?.type==='guide') return 'Learn';
    return 'Carrowmont';
  }
  function writeSearchHandoff(text){
    try{ sessionStorage.setItem(SEARCH_HANDOFF_KEY,JSON.stringify({query:text,createdAt:Date.now(),source:'ask'})); return true; }catch(_err){ return false; }
  }
  function renderRouteMatches(text,results){
    const box=$('askUnsupported'); if(!box) return;
    const title=$('askUnsupportedTitle'); const detail=$('askUnsupportedText'); const wrap=$('askUnsupportedMatches');
    if(title) title.textContent=results.length?'Here is a good place to start':'Search Carrowmont for a close match';
    if(detail) detail.textContent=results.length?`These Carrowmont pages are the closest matches for “${text}”.`:`Carrowmont did not find a close direct match for “${text}”. Try the wider search or browse Learn and Tools.`;
    if(wrap){
      wrap.innerHTML='';
      results.slice(0,3).forEach(entry=>{
        const a=document.createElement('a'); a.className='ask-route-result'; a.href=entry.url;
        const meta=document.createElement('span'); meta.className='ask-route-type'; meta.textContent=resultType(entry);
        const strong=document.createElement('strong'); strong.textContent=entry.title;
        const small=document.createElement('small'); small.textContent=entry.description||entry.category||'';
        a.append(meta,strong,small); wrap.appendChild(a);
      });
    }
    const all=$('askSearchAll');
    if(all){
      all.onclick=(event)=>{
        writeSearchHandoff(text);
        if(event && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button===0){
          event.preventDefault();
          window.location.assign(all.getAttribute('href')||'/search.html');
        }
      };
    }
    box.hidden=false; requestAnimationFrame(()=>box.scrollIntoView({behavior:reducedMotion()?'auto':'smooth',block:'nearest'}));
  }
  function showUnsupported(text){
    $('askStartMessage').textContent='';
    const query=String(text||'').trim();
    if(window.CarrowmontSearch?.search && query){
      window.CarrowmontSearch.search(query,{limit:4}).then(results=>renderRouteMatches(query,results||[])).catch(()=>renderRouteMatches(query,[]));
      return;
    }
    renderRouteMatches(query,[]);
  }
  function reset(){
    lastResult=null;
    const dashWrap=$('askDashboardSaveWrap'); if(dashWrap) dashWrap.hidden=true;
    const dashStatus=$('askDashboardSaveStatus'); if(dashStatus) dashStatus.textContent='';
    state={intent:null,facts:{},questionText:'',estimatedFacts:{},history:[],answerCache:{},estimatedCache:{}};
    $('askQuestion').value=''; $('askStartMessage').textContent=''; $('askQuestionMessage').textContent=''; hideUnsupported();
    stage('start'); updateBackControls(); reveal($('askStart'),$('askQuestion'));
  }
  function requiredInputType(key){ return PCT_KEY.test(key)||MONEY_KEY.test(key)||MONTH_KEY.test(key)||YEAR_KEY.test(key)||/termMonths/i.test(key)?'number':'text'; }
  function fieldStep(key){ return /termMonths|remainingYears/i.test(key)?'1':PCT_KEY.test(key)?'0.01':'0.01'; }
  function startIntent(intent,text=''){
    hideUnsupported();
    if(!api?.SUPPORTED?.some(x=>x.intent===intent)){ showUnsupported(text); return; }
    state={intent,facts:{},questionText:text,estimatedFacts:{},history:[],answerCache:{},estimatedCache:{}};
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
  function updateProgress(){
    const all=api?.QUESTION_SETS?.[state.intent]||[];
    const answered=all.filter(q=>Object.prototype.hasOwnProperty.call(state.facts,q.key)).length;
    const total=Math.max(1,all.length);
    const step=Math.min(Math.floor(answered/3)+1,Math.ceil(total/3));
    const steps=Math.max(1,Math.ceil(total/3));
    const pct=Math.max(6,Math.min(100,Math.round((answered/total)*100)));
    const text=$('askProgressText'); const bar=$('askProgressBar'); const shell=$('askProgress');
    if(shell) shell.hidden=false;
    if(text) text.textContent=`Step ${step} of ${steps} · ${answered} of ${total} details completed`;
    if(bar){ bar.style.width=`${pct}%`; bar.parentElement?.setAttribute('aria-valuenow',String(Math.round((answered/total)*100))); }
  }
  function continueJourney(){
    const locale=getLocale();
    let result;
    try{ result=api.resolve({intent:state.intent,facts:state.facts,maxQuestions:3,currency:locale.currency,country:locale.country,startDate:new Date().toISOString().slice(0,10)}); }
    catch(err){ $('askQuestionMessage').textContent='Carrowmont could not run this calculation. Please review the numbers and try again.'; stage('questions'); return; }
    if(result.status==='NEEDS_INPUT'){ renderQuestions(result.questions); return; }
    if(result.status==='RESOLVED'){ renderResult(result); return; }
    showUnsupported(state.questionText||'this money question'); stage('start');
  }
  function renderQuestions(questions){
    stage('questions');
    updateProgress(); updateBackControls();
    $('askQuestionsTitle').textContent=INTENT_COPY[state.intent]||'A few details';
    $('askQuestionsIntro').textContent=`Carrowmont needs ${questions.length===1?'one more detail':`${questions.length} details`} for this step. Amounts use ${getLocale().currency}; changing currency does not convert values.`;
    const wrap=$('askQuestionFields'); wrap.innerHTML='';
    for(const q of questions){
      const group=document.createElement('div'); group.className='ask-field';
      const label=document.createElement('label'); label.htmlFor=`ask-field-${q.key}`; label.textContent=q.label;
      const input=document.createElement('input'); input.id=`ask-field-${q.key}`; input.name=q.key; input.type=requiredInputType(q.key); input.step=fieldStep(q.key); input.min=q.key==='emergencyTargetMonths'?'1':'0'; input.inputMode='decimal'; input.autocomplete='off'; input.required=true;
      if(PCT_KEY.test(q.key)) input.placeholder='e.g. 7.5'; else if(/termMonths/i.test(q.key)) input.placeholder='e.g. 60'; else input.placeholder=`Enter ${q.label.toLowerCase()}`;
      const described=[];
      group.append(label,input);
      const hint=QUESTION_HINTS[q.key]; if(hint){ const small=document.createElement('span'); small.className='ask-field-hint'; small.id=`ask-hint-${q.key}`; small.textContent=hint; described.push(small.id); group.appendChild(small); }
      const meta=FIELD_META[q.key]||{};
      if(meta.why){
        const why=document.createElement('details'); why.className='ask-why';
        const summary=document.createElement('summary'); summary.textContent='Why we ask';
        const body=document.createElement('p'); body.textContent=meta.why;
        why.append(summary,body); group.appendChild(why);
      }
      if(described.length) input.setAttribute('aria-describedby',described.join(' '));
      const cached=state.answerCache[q.key]; if(cached!==undefined&&cached!==null) input.value=String(cached);
      const cachedEstimate=state.estimatedCache[q.key];
      if(cachedEstimate && Number(input.value)===Number(cachedEstimate.value)){
        state.estimatedFacts[q.key]={...cachedEstimate}; group.classList.add('ask-field-estimated');
        const note=document.createElement('span'); note.className='ask-estimate-note'; note.textContent=`Using ${cachedEstimate.value}% as an illustration. You can replace it with your own assumption.`; group.appendChild(note);
      }
      input.addEventListener('input',()=>{
        clearFieldError(input);
        if($('askQuestionMessage').textContent) $('askQuestionMessage').textContent='';
        const estimate=state.estimatedCache[q.key];
        if(estimate && Number(input.value)!==Number(estimate.value)){
          delete state.estimatedFacts[q.key]; delete state.estimatedCache[q.key];
          group.classList.remove('ask-field-estimated'); group.querySelector('.ask-estimate-note')?.remove();
        }
      });
      if(Number.isFinite(meta.unknownDefault)){
        const unknown=document.createElement('button'); unknown.type='button'; unknown.className='ask-unknown-button'; unknown.dataset.askUnknown=q.key; unknown.textContent=meta.unknownLabel||'I don’t know';
        unknown.addEventListener('click',()=>{
          input.value=String(meta.unknownDefault);
          const estimate={value:meta.unknownDefault,label:q.label}; state.estimatedFacts[q.key]=estimate; state.estimatedCache[q.key]={...estimate}; state.answerCache[q.key]=meta.unknownDefault;
          clearFieldError(input); group.classList.add('ask-field-estimated');
          let note=group.querySelector('.ask-estimate-note');
          if(!note){ note=document.createElement('span'); note.className='ask-estimate-note'; group.appendChild(note); }
          note.textContent=`Using ${meta.unknownDefault}% as an illustration. You can replace it with your own assumption.`;
          input.focus();
        });
        group.appendChild(unknown);
      }
      wrap.appendChild(group);
    }
    $('askQuestionMessage').textContent='';
    reveal($('askQuestionsStage'),wrap.querySelector('input'));
  }
  function parseInput(input){
    const raw=input.value.trim().replace(/,/g,''); const n=Number(raw);
    return raw!==''&&Number.isFinite(n)?n:null;
  }
  function submitQuestions(event){
    event.preventDefault();
    const inputs=[...$('askQuestionFields').querySelectorAll('input')];
    const pending={};
    for(const input of inputs){
      const value=parseInput(input);
      if(value===null||value<0){
        const field=input.closest('.ask-field'); const label=field?.querySelector('label')?.textContent||'this field';
        $('askQuestionMessage').textContent=`Enter a valid non-negative number for ${label.toLowerCase()}. Use 0 only when the amount is genuinely zero.`;
        field?.classList.add('ask-field-invalid'); input.setAttribute('aria-invalid','true');
        const desc=(input.getAttribute('aria-describedby')||'').split(/\s+/).filter(Boolean); if(!desc.includes('askQuestionMessage')) desc.push('askQuestionMessage'); input.setAttribute('aria-describedby',desc.join(' '));
        reveal(field,input); return;
      }
      pending[input.name]=value;
    }
    state.history.push({facts:{...state.facts},estimatedFacts:{...state.estimatedFacts}});
    for(const input of inputs){
      const value=pending[input.name]; clearFieldError(input); state.answerCache[input.name]=value;
      const estimate=state.estimatedFacts[input.name];
      if(estimate && Number(value)!==Number(estimate.value)){ delete state.estimatedFacts[input.name]; delete state.estimatedCache[input.name]; }
      state.facts[input.name]=value;
    }
    $('askQuestionMessage').textContent=''; continueJourney();
  }
  function goBack(){
    if(!state.history.length) return;
    const previous=state.history.pop(); state.facts={...previous.facts}; state.estimatedFacts={...previous.estimatedFacts};
    $('askQuestionMessage').textContent=''; continueJourney();
  }
  function writeCarAffordabilityHandoff(result){
    if(result?.intent!=='car-affordability') return false;
    const trace=(result.trace||[]).find(item=>item?.engineId==='car-affordability');
    if(!trace?.input) return false;
    const locale=getLocale();
    const payload={version:1,createdAt:Date.now(),expiresAt:Date.now()+CAR_AFFORDABILITY_HANDOFF_MAX_AGE_MS,country:locale.country,currency:locale.currency,input:{...trace.input}};
    try{ sessionStorage.setItem(CAR_AFFORDABILITY_HANDOFF_KEY,JSON.stringify(payload)); return true; }catch(_err){ return false; }
  }

  function renderResult(result){
    lastResult=result;
    stage('result');
    $('askResultSituation').textContent=result.situation||INTENT_COPY[result.intent]||'Your result';
    const rec=result.recommendation||{};
    $('askRecommendationHeadline').textContent=rec.headline||'Review the modeled result below.';
    $('askRecommendationAction').textContent=rec.action||'';
    $('askRecommendationRationale').textContent=rec.rationale?`Why: ${rec.rationale}`:'';
    const confidence=result.confidence||{};
    $('askConfidence').textContent=confidence.level?`Confidence: ${String(confidence.level).replace('_',' ').toLowerCase()} — ${confidence.basis||''}`:'';
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
    const priorityMoves=Array.isArray(result.priorityMoves)?result.priorityMoves:[];
    const altItems=Array.isArray(result.alternatives)?result.alternatives:[];
    const altHeading=$('askAlternativesHeading');
    if(altHeading) altHeading.textContent=priorityMoves.length?'Your next three moves':'Paths compared';
    $('askAlternativesSection').hidden=priorityMoves.length===0&&altItems.length===0;
    if(priorityMoves.length){
      priorityMoves.slice(0,3).forEach((move,index)=>{
        const card=document.createElement('div'); card.className='ask-alternative ask-priority-move';
        const title=document.createElement('h4'); title.textContent=`${index+1}. ${move.stageLabel}: ${move.headline}`; card.appendChild(title);
        const action=document.createElement('p'); action.className='ask-priority-action'; action.textContent=move.action; card.appendChild(action);
        const meta=document.createElement('div'); meta.className='ask-priority-meta'; meta.textContent=`Impact: ${move.impact}`; card.appendChild(meta);
        const rationale=document.createElement('p'); rationale.className='ask-priority-rationale'; rationale.textContent=`Why: ${move.rationale}`; card.appendChild(rationale);
        const numbers=Object.entries(move.numbersUsed||{}).filter(([,value])=>value!==null&&value!==undefined&&typeof value!=='object');
        if(numbers.length){
          const box=document.createElement('div'); box.className='ask-priority-numbers';
          const label=document.createElement('strong'); label.textContent='Numbers used'; box.appendChild(label);
          for(const [key,value] of numbers){ const row=document.createElement('div'); row.className='ask-alt-row'; const name=document.createElement('span'); name.textContent=labelize(key); const val=document.createElement('strong'); val.textContent=formatValue(key,value); row.append(name,val); box.appendChild(row); }
          card.appendChild(box);
        }
        if(move.assumptions?.length){ const note=document.createElement('p'); note.className='ask-priority-note'; note.textContent=`Assumption: ${move.assumptions.map(item=>`${labelize(item.id)} ${formatValue(item.id,item.value)}`).join('; ')}`; card.appendChild(note); }
        if(move.whatCouldChange?.length){ const detail=document.createElement('details'); detail.className='ask-why ask-priority-change'; const summary=document.createElement('summary'); summary.textContent='What could change this move'; const list=document.createElement('ul'); move.whatCouldChange.forEach(text=>{ const li=document.createElement('li'); li.textContent=text; list.appendChild(li); }); detail.append(summary,list); card.appendChild(detail); }
        alternatives.appendChild(card);
      });
    }else{
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
    }
    const changes=$('askWhatCouldChange'); changes.innerHTML='';
    const changeItems=Array.isArray(result.whatCouldChangeAnswer)?result.whatCouldChangeAnswer:[];
    $('askChangeSection').hidden=changeItems.length===0;
    for(const change of changeItems){ const li=document.createElement('li'); li.textContent=change; changes.appendChild(li); }
    const steps=$('askNextSteps'); steps.innerHTML='';
    for(const step of result.nextSteps||[]){ const li=document.createElement('li'); li.textContent=step; steps.appendChild(li); }
    const trace=$('askEngineTrace'); trace.innerHTML='';
    for(const item of result.trace||[]){ const li=document.createElement('li'); li.textContent=labelize(item.engineId); trace.appendChild(li); }
    const assumptions=$('askAssumptions'); assumptions.innerHTML='';
    const asum=Array.isArray(result.assumptions)?result.assumptions:[];
    $('askAssumptionsWrap').hidden=asum.length===0;
    for(const item of asum){ const li=document.createElement('li'); li.textContent=`${labelize(item.id)}: ${formatValue(item.id,item.value)}${item.note?` — ${item.note}`:''}`; assumptions.appendChild(li); }
    for(const [key,item] of Object.entries(state.estimatedFacts||{})){
      if(!Object.prototype.hasOwnProperty.call(state.facts,key)) continue;
      const li=document.createElement('li'); li.className='ask-estimated-assumption'; li.textContent=`${item.label}: ${formatValue(key,item.value)} — Illustrative default used because you selected “I don’t know”.`; assumptions.appendChild(li); $('askAssumptionsWrap').hidden=false;
    }
    const wrap=$('askDetailLinkWrap'); wrap.innerHTML=''; const link=DETAIL_LINKS[result.intent];
    if(link){
      const a=document.createElement('a'); a.href=link[1]; a.textContent=`${link[0]} →`;
      if(result.intent==='car-affordability'){
        a.dataset.askCarAffordabilityHandoff='1';
        a.addEventListener('click',()=>writeCarAffordabilityHandoff(result));
      }
      wrap.appendChild(a);
    }
    const dashWrap=$('askDashboardSaveWrap'); if(dashWrap) dashWrap.hidden=false;
    const dashStatus=$('askDashboardSaveStatus'); if(dashStatus) dashStatus.textContent='';
    updateBackControls(); reveal($('askResultStage'),$('askResultSituation'));
  }
  function saveToDashboard(){
    const Store=window.CarrowmontDashboardStore;
    const Account=window.CarrowmontAccount;
    const status=$('askDashboardSaveStatus');
    if(!Store||!Account||!lastResult){if(status)status.textContent='My Carrowmont is temporarily unavailable.';return;}
    try{
      const locale=getLocale();
      const next=Store.captureAskJourney(Store.create({region:locale.country,currency:locale.currency}),lastResult.intent,state.facts,{locale:{region:locale.country,currency:locale.currency},currency:locale.currency});
      Account.stageGuestProfile(next);
      if(status)status.textContent='Opening My Carrowmont…';
      location.href='/my-carrowmont.html?save=ask';
    }catch(_err){if(status)status.textContent='Carrowmont could not prepare this plan for My Carrowmont.';}
  }
  function init(){
    if(!window.CarrowmontAskMvp?.create){ $('askStartMessage').textContent='Ask Carrowmont is temporarily unavailable.'; return; }
    api=window.CarrowmontAskMvp.create();
    $('askStartBtn').addEventListener('click',startFromText);
    $('askQuestion').addEventListener('keydown',event=>{ if((event.ctrlKey||event.metaKey)&&event.key==='Enter') startFromText(); });
    $('askQuestionsForm').addEventListener('submit',submitQuestions);
    $('askDashboardSaveBtn')?.addEventListener('click',saveToDashboard);
    document.querySelectorAll('[data-ask-back]').forEach(btn=>btn.addEventListener('click',goBack));
    document.querySelectorAll('[data-ask-reset]').forEach(btn=>btn.addEventListener('click',reset));
    document.querySelectorAll('[data-ask-intent]').forEach(btn=>btn.addEventListener('click',()=>startIntent(btn.dataset.askIntent,btn.textContent.trim())));
    const decision=new URL(window.location.href).searchParams.get('decision');
    if(decision && INTENT_COPY[decision]) startIntent(decision,INTENT_COPY[decision]);
    window.addEventListener('carrowmont:localechange',()=>{ if(!$('askQuestionsStage').hidden) renderQuestions(api.missingQuestions(state.intent,state.facts,3)); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
