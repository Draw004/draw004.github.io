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
    goalMonthlyContribution:'Enter the monthly amount currently directed to the goal. Enter 0 if none.',
    lumpSumAmount:'Enter the one-off amount available now. This amount stays in this Ask session unless a separate save flow explicitly supports the scenario.',
    debtMonthlyPayment:'Enter the required monthly payment for the specific debt you are comparing.',
    investmentHorizonYears:'Enter a whole-number long-term horizon for the investment illustration.'
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
    goalMonthlyContribution:{why:'The current contribution lets the Goal Planner project whether the entered goal is on track under the stated assumption.'},
    lumpSumAmount:{why:'Carrowmont compares the same one-off amount across emergency savings, debt, a defined goal and long-term investing.'},
    debtMonthlyPayment:{why:'The required payment lets the existing Debt Payoff engine model how a one-off balance reduction may change payoff time and interest.'},
    investmentHorizonYears:{why:'Long-term investment growth depends on how long the money can remain invested. Carrowmont will not invent this horizon for you.'}
  };
  const INTENT_COPY={
    'debt-vs-savings':'Pay debt or invest?',
    'car-affordability':'Car affordability',
    'mortgage-prepay-vs-invest':'Mortgage prepay or invest',
    'emergency-runway':'Emergency fund adequacy',
    'cash-flow-shortfall':'Monthly cash-flow shortfall',
    'money-priorities':'Money priorities',
    'lump-sum-goal-tradeoffs':'Lump-sum priorities'
  };
  const DETAIL_LINKS={
    'debt-vs-savings':['Explore the detailed Debt Payoff tools','/budget-cash-flow-planner/#debt-payoff'],
    'car-affordability':['Open the full Car Affordability tool','/car-affordability-auto-decision-calculator.html'],
    'mortgage-prepay-vs-invest':['Open Mortgage Prepay vs Investing','/mortgage-payoff-calculator/prepayment-vs-investing.html'],
    'emergency-runway':['Open the Emergency Fund & Runway tool','/emergency-fund-runway-calculator.html'],
    'cash-flow-shortfall':['Open the Budget & Cash Flow Planner','/budget-cash-flow-planner/'],
    'money-priorities':['Explore the detailed Carrowmont tools','/tools.html'],
    'lump-sum-goal-tradeoffs':['Read the lump-sum decision guide','/what-to-do-with-a-lump-sum.html']
  };
  const CAR_AFFORDABILITY_HANDOFF_KEY='carrowmont_handoff_car_affordability_v1';
  const SEARCH_HANDOFF_KEY='carrowmont_search_handoff_v1';
  const HOME_ASK_HANDOFF_KEY='carrowmont_home_ask_handoff_v1';
  const HOME_ASK_HANDOFF_MAX_AGE_MS=15*60*1000;
  const CAR_AFFORDABILITY_HANDOFF_MAX_AGE_MS=15*60*1000;
  const MONEY_KEY=/amount|balance|income|expense|saving|reserve|price|payment|cost|value|interestSaved|targetGap|goalGap|monthlyNeed|cashRoom|loanAmount|endingValue|growth|remaining|outgo|weeklyRoom|dailyRoom|projectedValue|projectedGrowth/i;
  const PCT_KEY=/Pct$|RatePct$|AprPct$|annualRate|assumedReturn/i;
  const MONTH_KEY=/months|runway/i;
  const YEAR_KEY=/years/i;

  let api=null;
  let lastResult=null;
  function emptyContext(){return {signedIn:false,loaded:false,unavailable:false,currencyMismatch:false,profileCurrency:null,currentCurrency:null,ignored:false,items:[]};}
  function newState(intent=null,questionText=''){return {intent,facts:{},questionText,estimatedFacts:{},history:[],answerCache:{},estimatedCache:{},factMeta:{},context:emptyContext()};}
  let state=newState();
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
  function formatSavedDate(value){
    if(!value) return 'date not available';
    try{return new Intl.DateTimeFormat(undefined,{day:'numeric',month:'short',year:'numeric'}).format(new Date(value));}catch(_err){return 'date not available';}
  }
  function contextItem(key){return (state.context?.items||[]).find(item=>item.key===key)||null;}
  function sourceSuffix(key){
    const meta=state.factMeta?.[key]||{};
    if(meta.kind==='saved') return ' — My Carrowmont saved value';
    if(meta.kind==='saved-confirmed') return ' — My Carrowmont value confirmed in this Ask session';
    if(meta.kind==='temporary-override') return ' — temporary what-if override for this Ask only';
    if(meta.kind==='session') return ' — entered in this Ask session';
    return '';
  }
  function renderAccountContext(){
    const box=$('askAccountContext');if(!box)return;
    const title=$('askAccountContextTitle'),summary=$('askAccountContextSummary'),details=$('askAccountContextDetails'),detailsSummary=$('askAccountContextDetailsSummary'),list=$('askAccountContextList'),actions=$('askAccountContextActions');
    box.classList.remove('is-warning','is-muted');
    if(!state.context?.loaded||!state.context?.signedIn){box.hidden=true;return;}
    box.hidden=false;
    if(state.context.unavailable){
      box.classList.add('is-muted');if(title)title.textContent='My Carrowmont details are temporarily unavailable';if(summary)summary.textContent='Continue with this Ask question normally. No saved account values will be used.';if(details)details.hidden=true;if(actions)actions.hidden=true;return;
    }
    if(state.context.currencyMismatch){
      box.classList.add('is-warning');if(title)title.textContent='Saved amounts were not reused';if(summary)summary.textContent=`My Carrowmont is saved in ${state.context.profileCurrency||'another currency'} while this Ask question is using ${state.context.currentCurrency||'the selected currency'}. Carrowmont does not automatically convert saved financial amounts.`;if(details)details.hidden=true;if(actions)actions.hidden=true;return;
    }
    if(state.context.ignored){
      box.classList.add('is-muted');if(title)title.textContent='Saved details ignored for this question';if(summary)summary.textContent='This Ask journey will use only the values you enter here. My Carrowmont has not been changed.';if(details)details.hidden=true;if(actions)actions.hidden=true;return;
    }
    const items=state.context.items||[];const fresh=items.filter(item=>!item.stale);const stale=items.filter(item=>item.stale);
    if(!items.length){box.hidden=true;return;}
    if(title)title.textContent=fresh.length?'Using relevant saved details':'Saved details need confirmation';
    if(summary){
      const parts=[];if(fresh.length)parts.push(`${fresh.length} current saved detail${fresh.length===1?'':'s'} can be reused`);if(stale.length)parts.push(`${stale.length} older saved detail${stale.length===1?' needs':'s need'} confirmation`);summary.textContent=`${parts.join(' · ')}. You can change or ignore them for this question without changing My Carrowmont.`;
    }
    if(details){details.hidden=false;details.open=false;}if(actions)actions.hidden=false;if(detailsSummary)detailsSummary.textContent=`Review saved details (${items.length})`;
    if(list){
      list.innerHTML='';for(const item of items){
        const li=document.createElement('li');const copy=document.createElement('div');copy.className='ask-account-context-item-copy';const strong=document.createElement('strong');strong.textContent=`${labelize(item.key)}: ${formatValue(item.key,item.value)}`;const meta=document.createElement('span');meta.textContent=`${item.source||'My Carrowmont'} · updated ${formatSavedDate(item.lastUpdated)}`;copy.append(strong,meta);
        if(item.stale){const staleNote=document.createElement('em');staleNote.textContent='Older saved value — Carrowmont will ask you to confirm it.';copy.appendChild(staleNote);}
        li.appendChild(copy);
        if(!item.stale){const edit=document.createElement('button');edit.type='button';edit.className='ask-account-context-edit';edit.dataset.askContextEdit=item.key;edit.textContent='Change for this question';edit.addEventListener('click',()=>editContextKey(item.key));li.appendChild(edit);}
        list.appendChild(li);
      }
    }
  }
  function editContextKey(key){
    const item=contextItem(key);if(!item)return;
    delete state.facts[key];state.answerCache[key]=item.value;state.factMeta[key]={kind:'saved-review',savedValue:item.value,source:item.source,lastUpdated:item.lastUpdated,stale:item.stale};
    continueJourney();
  }
  function ignoreAccountContext(){
    if(!state.context?.signedIn)return;
    for(const item of state.context.items||[]){
      const meta=state.factMeta[item.key];
      if(meta?.kind==='temporary-override'||meta?.kind==='session')continue;
      if(meta?.kind==='saved'||meta?.kind==='saved-confirmed'||meta?.kind==='saved-review'||meta?.kind==='stale-saved'){delete state.facts[item.key];delete state.answerCache[item.key];delete state.factMeta[item.key];}
    }
    state.context.ignored=true;renderAccountContext();continueJourney();
  }
  function applyAccountContext(context){
    const c=context||{};state.context={...emptyContext(),...c,loaded:true,items:Array.isArray(c.items)?c.items.map(item=>({...item})):[]};
    if(!c.signedIn||c.unavailable||c.currencyMismatch)return;
    for(const item of c.fresh||[]){state.facts[item.key]=item.value;state.answerCache[item.key]=item.value;state.factMeta[item.key]={kind:'saved',savedValue:item.value,source:item.source,lastUpdated:item.lastUpdated,stale:false};}
    for(const item of c.stale||[]){if(Object.prototype.hasOwnProperty.call(state.facts,item.key))continue;state.answerCache[item.key]=item.value;state.factMeta[item.key]={kind:'stale-saved',savedValue:item.value,source:item.source,lastUpdated:item.lastUpdated,stale:true};}
  }
  async function loadAccountContext(){
    const loader=window.CarrowmontAskContext;if(!loader?.load)return;
    const expectedIntent=state.intent;
    const context=await loader.load(expectedIntent,{locale:getLocale()});
    if(state.intent!==expectedIntent)return;
    applyAccountContext(context);renderAccountContext();
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
  function normalizeOwnershipText(value){return String(value==null?'':value).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,' and ').replace(/[-_/]+/g,' ').replace(/[^a-zA-Z0-9\s]+/g,' ').toLowerCase().replace(/\s+/g,' ').trim();}
  function ownsSpecificQuery(entry,query){const normalized=normalizeOwnershipText(query);if(!entry||!normalized)return false;const stop=new Set(['a','an','and','are','can','do','does','for','from','how','i','in','is','it','me','my','of','on','or','should','the','to','what','when','where','which','why','with','would']);const meaningful=normalized.split(' ').filter(token=>token&&!stop.has(token));if(meaningful.length<2)return false;const fields=[entry.title,...(Array.isArray(entry.aliases)?entry.aliases:[]),...(Array.isArray(entry.keywords)?entry.keywords:[])];return fields.some(value=>{const field=normalizeOwnershipText(value);return field&&(field===normalized||field.includes(normalized));});}
  function renderRouteMatches(text,results){
    const box=$('askUnsupported'); if(!box) return;
    const title=$('askUnsupportedTitle'); const detail=$('askUnsupportedText'); const wrap=$('askUnsupportedMatches');
    if(title) title.textContent=results.length?'Start here':'Search Carrowmont for a close match';
    if(detail) detail.textContent=results.length?`These are the strongest Carrowmont matches for “${text}”, based on the topic and what you appear to be trying to do.`:`Carrowmont did not find a close direct match for “${text}”. Try the wider search or browse Learn and Tools.`;
    if(wrap){
      wrap.innerHTML='';
      const visible=results.slice(0,3);
      const grouped={
        tool:{key:'tool',label:'Tools',entries:visible.filter(entry=>entry.type==='tool')},
        guide:{key:'guide',label:'Learn & Guides',entries:visible.filter(entry=>entry.type==='guide')},
        other:{key:'other',label:'Other matches',entries:visible.filter(entry=>entry.type!=='tool'&&entry.type!=='guide')}
      };
      // Relevance remains authoritative. Tool-first is used only when the best Tool
      // is broadly comparable with the leading result, never over a decisive direct match.
      const first=visible[0]||null;
      const bestTool=grouped.tool.entries[0]||null;
      const DIRECT_MATCH_LEAD=200;
      const leadingKey=first?.type==='guide'?'guide':first?.type==='tool'?'tool':'other';
      const decisiveNonTool=Boolean(first&&leadingKey!=='tool'&&(!bestTool||ownsSpecificQuery(first,text)||((Number(first.score)||0)-(Number(bestTool.score)||0)>=DIRECT_MATCH_LEAD)));
      const order=decisiveNonTool?[leadingKey,'tool',leadingKey==='guide'?'other':'guide']:['tool','guide','other'];
      const groups=order.map(key=>grouped[key]);
      groups.forEach(group=>{
        if(!group.entries.length)return;
        const section=document.createElement('section');section.className=`ask-route-group ask-route-group-${group.key}`;section.dataset.askRouteGroup=group.key;
        const headingRow=document.createElement('div');headingRow.className='ask-route-group-heading-row';
        const heading=document.createElement('h3');heading.className='ask-route-group-heading';heading.textContent=group.label;
        const count=document.createElement('span');count.className='ask-route-group-count';count.textContent=group.entries.length===1?'1 result':`${group.entries.length} results`;
        headingRow.append(heading,count);section.appendChild(headingRow);
        group.entries.forEach(entry=>{
          const actionText=entry.type==='tool'?'Open tool →':entry.type==='guide'?'Read article →':'View result →';
          const a=document.createElement('a'); a.className='ask-route-result'; if(entry.type==='tool')a.classList.add('ask-route-result-tool');else if(entry.type==='guide')a.classList.add('ask-route-result-learn');else a.classList.add('ask-route-result-other'); a.href=entry.url;a.dataset.askRouteResultLink='';a.setAttribute('aria-label',`${actionText.replace(' →','')}: ${entry.title}`);
          const metaRow=document.createElement('span');metaRow.className='ask-route-meta';
          const meta=document.createElement('span'); meta.className='ask-route-type'; meta.textContent=resultType(entry);metaRow.appendChild(meta);
          if(entry===visible[0]){const best=document.createElement('span');best.className='ask-route-best-match';best.textContent='Best match';metaRow.appendChild(best);}
          const strong=document.createElement('strong'); strong.textContent=entry.title;
          const small=document.createElement('small'); small.textContent=entry.description||entry.category||'';
          const action=document.createElement('span');action.className='ask-route-action';action.dataset.askRouteAction='';action.textContent=actionText;
          a.append(metaRow,strong,small,action); section.appendChild(a);
        });
        wrap.appendChild(section);
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
  let askPredictTimer=null;
  function hideAskPredictive(){const box=$('askPredictive');if(!box)return;box.hidden=true;box.innerHTML='';$('askQuestion')?.setAttribute('aria-expanded','false');}
  function renderAskPredictive(items){const box=$('askPredictive');if(!box)return;box.innerHTML='';if(!items?.length){hideAskPredictive();return;}const label=document.createElement('span');label.className='ask-predictive-label';label.textContent='Suggestions';box.appendChild(label);items.slice(0,5).forEach(item=>{const button=document.createElement('button');button.type='button';button.className='ask-predictive-option';button.setAttribute('role','option');const text=document.createElement('span');text.textContent=item.text;button.appendChild(text);if(item.type==='correction'){const small=document.createElement('small');small.textContent='Spelling suggestion';button.appendChild(small);}button.addEventListener('click',()=>{$('askQuestion').value=item.text;hideAskPredictive();$('askQuestion').focus();});box.appendChild(button);});box.hidden=false;$('askQuestion')?.setAttribute('aria-expanded','true');}
  function updateAskPredictive(){const input=$('askQuestion');const query=String(input?.value||'').trim();window.clearTimeout(askPredictTimer);if(query.length<2||!window.CarrowmontSearch?.suggest){hideAskPredictive();return;}askPredictTimer=window.setTimeout(()=>{window.CarrowmontSearch.suggest(query,{limit:5}).then(items=>{if(String(input.value||'').trim()===query)renderAskPredictive(items||[]);}).catch(()=>hideAskPredictive());},150);}
  function showUnsupported(text){
    $('askStartMessage').textContent='';
    const query=String(text||'').trim();
    if(window.CarrowmontSearch?.search && query){
      window.CarrowmontSearch.search(query,{limit:6,mode:'ask'}).then(results=>renderRouteMatches(query,results||[])).catch(()=>renderRouteMatches(query,[]));
      return;
    }
    renderRouteMatches(query,[]);
  }
  function reset(){
    lastResult=null;
    const dashWrap=$('askDashboardSaveWrap'); if(dashWrap) dashWrap.hidden=true;
    const dashStatus=$('askDashboardSaveStatus'); if(dashStatus) dashStatus.textContent='';
    state=newState();
    $('askQuestion').value=''; hideAskPredictive(); $('askStartMessage').textContent=''; $('askQuestionMessage').textContent=''; hideUnsupported();renderAccountContext();
    stage('start'); updateBackControls(); reveal($('askStart'),$('askQuestion'));
  }
  function requiredInputType(key){ return PCT_KEY.test(key)||MONEY_KEY.test(key)||MONTH_KEY.test(key)||YEAR_KEY.test(key)||/termMonths/i.test(key)?'number':'text'; }
  function fieldStep(key){ return /termMonths|remainingYears|goalYearsAway|investmentHorizonYears/i.test(key)?'1':PCT_KEY.test(key)?'0.01':'0.01'; }
  async function startIntent(intent,text=''){
    hideUnsupported();
    if(!api?.SUPPORTED?.some(x=>x.intent===intent)){ showUnsupported(text); return; }
    state=newState(intent,text);renderAccountContext();
    const contextApi=window.CarrowmontAskContext;
    if(contextApi?.hasPersistedAuthSession?.())$('askStartMessage').textContent='Checking My Carrowmont for relevant saved details…';
    await loadAccountContext();
    if(state.intent!==intent)return;
    $('askStartMessage').textContent='';
    continueJourney();
  }

  function readHomeAskHandoff(){
    try{
      const raw=sessionStorage.getItem(HOME_ASK_HANDOFF_KEY);
      if(!raw)return null;
      sessionStorage.removeItem(HOME_ASK_HANDOFF_KEY);
      const payload=JSON.parse(raw);
      const query=String(payload?.query||'').trim();
      const createdAt=Number(payload?.createdAt||0);
      const expiresAt=Number(payload?.expiresAt||0);
      if(!query||!createdAt)return null;
      const now=Date.now();
      if(now-createdAt>HOME_ASK_HANDOFF_MAX_AGE_MS)return null;
      if(expiresAt&&now>expiresAt)return null;
      return {query,source:'home'};
    }catch(_err){
      try{sessionStorage.removeItem(HOME_ASK_HANDOFF_KEY);}catch(_ignore){}
      return null;
    }
  }
  async function startFromText(){
    const input=$('askQuestion');const text=input.value.trim();
    hideUnsupported();hideAskPredictive();
    if(!text){ $('askStartMessage').textContent='Tell Carrowmont what you are trying to solve, or choose one of the suggested questions.'; return; }
    $('askStartMessage').textContent='';
    let understood=text;let classified=api.classify(understood);
    if(!classified?.intent&&window.CarrowmontSearch?.correct){
      try{const correction=await window.CarrowmontSearch.correct(text);if(correction?.corrected&&correction.query){understood=correction.query;classified=api.classify(understood);if(classified?.intent){input.value=understood;$('askStartMessage').textContent=`I understood that as “${understood}”.`;}}}catch(_err){}
    }
    if(!classified?.intent){ showUnsupported(understood); return; }
    startIntent(classified.intent,understood);
  }
  function updateProgress(){
    const all=api?.questionsFor?.(state.intent,state.facts)||api?.QUESTION_SETS?.[state.intent]||[];
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
    const guardedQuestions=api.missingQuestions(state.intent,state.facts,3);if(Array.isArray(questions)&&questions.length>3)questions=guardedQuestions;
    stage('questions');renderAccountContext();
    updateProgress(); updateBackControls();
    $('askQuestionsTitle').textContent=INTENT_COPY[state.intent]||'A few details';
    const reused=Object.values(state.factMeta||{}).filter(meta=>meta?.kind==='saved').length;
    const contextLead=reused?`${reused} current My Carrowmont detail${reused===1?' is':'s are'} already being reused. `:'';
    $('askQuestionsIntro').textContent=`${contextLead}Carrowmont needs ${questions.length===1?'one more detail':`${questions.length} details`} for this step. Amounts use ${getLocale().currency}; changing currency does not convert values.`;
    const wrap=$('askQuestionFields'); wrap.innerHTML='';
    for(const q of questions){
      const group=document.createElement('div'); group.className='ask-field';
      const label=document.createElement('label'); label.htmlFor=`ask-field-${q.key}`; label.textContent=q.label;
      const input=document.createElement('input'); input.id=`ask-field-${q.key}`; input.name=q.key; input.type=requiredInputType(q.key); input.step=fieldStep(q.key); input.min=/^(?:emergencyTargetMonths|goalYearsAway|investmentHorizonYears)$/.test(q.key)?'1':'0'; input.inputMode='decimal'; input.autocomplete='off'; input.required=true;
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
      const savedMeta=state.factMeta?.[q.key];
      if(savedMeta&&['stale-saved','saved-review'].includes(savedMeta.kind)){
        group.classList.add(savedMeta.stale?'ask-field-stale':'ask-field-saved');
        const note=document.createElement('span');note.className=`ask-saved-note${savedMeta.stale?' is-stale':''}`;
        note.textContent=savedMeta.stale?`Saved in My Carrowmont by ${savedMeta.source||'a saved plan'} and last updated ${formatSavedDate(savedMeta.lastUpdated)}. Please confirm or replace it for this Ask question.`:`Saved in My Carrowmont by ${savedMeta.source||'a saved plan'} and updated ${formatSavedDate(savedMeta.lastUpdated)}. Change it here only for this Ask question.`;
        group.appendChild(note);
      }
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
        const meta=state.factMeta?.[q.key];
        if(meta&&['stale-saved','saved-review'].includes(meta.kind)&&Number(input.value)!==Number(meta.savedValue)){
          group.classList.remove('ask-field-saved','ask-field-stale');
          let note=group.querySelector('.ask-saved-note');if(!note){note=document.createElement('span');note.className='ask-saved-note';group.appendChild(note);}
          note.className='ask-saved-note is-override';note.textContent='Temporary what-if override for this Ask question. My Carrowmont will not be changed unless you explicitly save or update.';
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
      if(/^(?:emergencyTargetMonths|goalYearsAway|investmentHorizonYears)$/.test(input.name)&&(value<1||!Number.isInteger(value))){
        const field=input.closest('.ask-field'); const label=field?.querySelector('label')?.textContent||'this field';
        $('askQuestionMessage').textContent=`Enter a whole number of at least 1 for ${label.toLowerCase()}.`;
        field?.classList.add('ask-field-invalid'); input.setAttribute('aria-invalid','true');
        reveal(field,input); return;
      }
      pending[input.name]=value;
    }
    state.history.push({facts:{...state.facts},estimatedFacts:{...state.estimatedFacts},factMeta:JSON.parse(JSON.stringify(state.factMeta||{}))});
    for(const input of inputs){
      const value=pending[input.name]; clearFieldError(input); state.answerCache[input.name]=value;
      const estimate=state.estimatedFacts[input.name];
      if(estimate && Number(value)!==Number(estimate.value)){ delete state.estimatedFacts[input.name]; delete state.estimatedCache[input.name]; }
      const prior=state.factMeta?.[input.name];
      if(prior&&['stale-saved','saved-review'].includes(prior.kind)){
        state.factMeta[input.name]={...prior,kind:Number(value)===Number(prior.savedValue)?'saved-confirmed':'temporary-override'};
      }else if(estimate&&Number(value)===Number(estimate.value)){
        state.factMeta[input.name]={kind:'estimate'};
      }else{
        state.factMeta[input.name]={kind:'session'};
      }
      state.facts[input.name]=value;
    }
    $('askQuestionMessage').textContent=''; continueJourney();
  }
  function goBack(){
    if(!state.history.length) return;
    const previous=state.history.pop(); state.facts={...previous.facts}; state.estimatedFacts={...previous.estimatedFacts};state.factMeta=JSON.parse(JSON.stringify(previous.factMeta||{}));
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
    stage('result');renderAccountContext();
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
      const altLimit=state.intent==='lump-sum-goal-tradeoffs'?5:4;
      for(const alt of altItems.slice(0,altLimit)){
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
    const trustWhy=$('askTrustWhy'); if(trustWhy) trustWhy.textContent=rec.rationale||result.diagnosis||'This result follows from the values entered in this Ask Carrowmont journey and the tested calculation path selected for the question.';
    const trustValues=$('askTrustValues'); if(trustValues){trustValues.innerHTML='';const factRows=Object.entries(state.facts||{}).filter(([,value])=>value!==null&&value!==undefined&&typeof value!=='object').slice(0,12);if(!factRows.length){const li=document.createElement('li');li.textContent='No additional entered values were required for this result.';trustValues.appendChild(li);}else{for(const [key,value] of factRows){const li=document.createElement('li');li.textContent=`${labelize(key)}: ${formatValue(key,value)}${sourceSuffix(key)}`;trustValues.appendChild(li);}}}
    const trustFreshness=$('askTrustFreshness'); if(trustFreshness){
      let when='this session';try{when=new Intl.DateTimeFormat(undefined,{day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit'}).format(new Date());}catch(_err){}
      const used=Object.entries(state.factMeta||{}).filter(([key,meta])=>Object.prototype.hasOwnProperty.call(state.facts,key)&&['saved','saved-confirmed'].includes(meta?.kind));
      const confirmedOlder=used.filter(([,meta])=>meta?.stale).length;const overrides=Object.values(state.factMeta||{}).filter(meta=>meta?.kind==='temporary-override').length;
      const dates=used.map(([,meta])=>meta.lastUpdated).filter(Boolean).sort((a,b)=>Date.parse(a)-Date.parse(b));
      const savedText=used.length?` ${used.length} saved My Carrowmont detail${used.length===1?' was':'s were'} reused${dates.length?`, last updated ${formatSavedDate(dates[0])}${dates.length>1?` to ${formatSavedDate(dates[dates.length-1])}`:''}`:''}.`:' No saved My Carrowmont value was used in this result.';
      const staleText=confirmedOlder?` ${confirmedOlder} older saved detail${confirmedOlder===1?' was':'s were'} explicitly confirmed in this Ask session.`:'';
      const overrideText=overrides?` ${overrides} saved detail${overrides===1?' has':'s have'} a temporary what-if override for this result.`:'';
      trustFreshness.textContent=`Calculated from the values in this Ask session on ${when}.${savedText}${staleText}${overrideText}`;
    }
    const trustChange=$('askTrustChange'); if(trustChange) trustChange.textContent=changeItems.length?changeItems.join(' '):'Changing an entered value, assumption or scenario can change the modeled result.';
    const trustBoundary=$('askTrustBoundary'); if(trustBoundary) trustBoundary.innerHTML='<strong>Save boundary:</strong> this Ask result does not change My Carrowmont by itself. Saved details are read-only here, and temporary what-if overrides stay in this Ask session unless you explicitly choose Save this plan to My Carrowmont or update an existing saved plan.';
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
  async function refreshContextForLocale(){
    if(!state.intent)return;
    for(const [key,meta] of Object.entries(state.factMeta||{})){
      if(['saved','saved-confirmed','saved-review','stale-saved'].includes(meta?.kind)){delete state.facts[key];delete state.answerCache[key];delete state.factMeta[key];}
    }
    state.context=emptyContext();renderAccountContext();
    await loadAccountContext();
    if(state.intent)continueJourney();
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
    $('askQuestion').addEventListener('input',updateAskPredictive);
    $('askQuestion').addEventListener('keydown',event=>{ if(event.key==='Escape')hideAskPredictive(); if((event.ctrlKey||event.metaKey)&&event.key==='Enter') startFromText(); });
    $('askQuestionsForm').addEventListener('submit',submitQuestions);
    $('askDashboardSaveBtn')?.addEventListener('click',saveToDashboard);
    $('askContextIgnoreBtn')?.addEventListener('click',ignoreAccountContext);
    document.querySelectorAll('[data-ask-back]').forEach(btn=>btn.addEventListener('click',goBack));
    document.querySelectorAll('[data-ask-reset]').forEach(btn=>btn.addEventListener('click',reset));
    document.querySelectorAll('[data-ask-intent]').forEach(btn=>btn.addEventListener('click',()=>startIntent(btn.dataset.askIntent,btn.textContent.trim())));
    const decision=new URL(window.location.href).searchParams.get('decision');
    if(decision && INTENT_COPY[decision]) startIntent(decision,INTENT_COPY[decision]);
    else {
      const homeHandoff=readHomeAskHandoff();
      if(homeHandoff){
        $('askQuestion').value=homeHandoff.query;
        startFromText();
      }
    }
    window.addEventListener('carrowmont:localechange',()=>{void refreshContextForLocale();});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
