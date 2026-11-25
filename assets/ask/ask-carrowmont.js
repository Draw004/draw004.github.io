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
    investmentHorizonYears:'Enter a whole-number long-term horizon for the investment illustration.',
    grossMonthlyIncome:'Use gross household income before tax and deductions. Carrowmont uses this only for a debt-to-income planning view, not lender approval.',
    essentialNonDebtExpenses:'Include essential monthly living costs but exclude debt payments so they are not counted twice.',
    existingMonthlyDebtPayments:'Add required monthly payments across loans, cards and other debts.',
    proposedNewDebtPayment:'Enter the monthly payment you are considering. Use 0 to review your current position only.',
    incomeDropPct:'Choose a percentage for a simple income-drop stress test. It is an illustration, not a forecast.',
    protectedMonthlySavings:'Enter saving or investing you want the housing budget to leave untouched each month.',
    freeMonthlyBuffer:'Enter the cash cushion you want left after essentials, debt, protected savings and housing costs.',
    homeDeposit:'Enter the deposit or down payment left after any cash you want to keep aside and expected buying costs.',
    homeLoanRatePct:'Enter the annual mortgage or home-loan rate you want to model.',
    homeLoanTermYears:'Enter the loan term in whole years.',
    monthlyOwnershipCosts:'Estimate recurring ownership costs not included in the loan payment, such as property tax, insurance, service charges or maintenance.',
    extraDebtPayment:'Enter the extra monthly amount you could add on top of the required payment.',
    cardBalance:'Enter the current credit-card balance you want to model.',
    cardAprPct:'Enter the annual percentage rate shown for the card balance.',
    cardMinimumPayment:'Enter the current minimum monthly payment.',
    cardPlannedPayment:'Enter the monthly amount you are considering paying.',
    cardTargetMonths:'Enter a whole-number payoff target in months, or 0 if you do not have one.',
    retirementCurrentAge:'Enter your current age in whole years.',
    retirementTargetAge:'Enter the age when you would like retirement to start.',
    retirementPlanningAge:'Enter the age through which you want the retirement plan to provide for spending.',
    retirementCurrentSavings:'Enter savings and investments already set aside for retirement.',
    retirementMonthlyExpense:'Enter your current monthly household spending as a starting point for retirement lifestyle needs.',
    retirementSpendingPct:'Estimate retirement spending as a percentage of today’s spending, for example 80.',
    retirementInflationPct:'Enter an annual inflation assumption. This is an assumption, not a forecast.',
    retirementPreReturnPct:'Enter an annual return assumption before retirement. This is not a forecast.',
    retirementPostReturnPct:'Enter an annual return assumption during retirement. This is not a forecast.',
    retirementBufferPct:'Enter an extra safety buffer percentage you want added to the modeled retirement need.',
    goalReturnPct:'Enter an annual return assumption for the goal. This is not a forecast.',
    goalInflationPct:'Enter an annual inflation assumption for how the goal cost may change.',
    retirementWithdrawalBalance:'Enter the retirement savings or portfolio balance you want to test.',
    retirementWithdrawalMonthly:'Enter the starting monthly amount you expect to withdraw.',
    retirementWithdrawalReturnPct:'Enter an annual return assumption during retirement. This is an illustration, not a forecast.',
    retirementWithdrawalGrowthPct:'Enter the annual percentage increase in withdrawals you want to model for inflation or spending growth.',
    retirementWithdrawalStartAge:'Enter the age when withdrawals would start. This is used only to show a modeled depletion age.',
    retirementWithdrawalTargetYears:'Enter how many years you want the retirement balance to support withdrawals.',
    retirementWithdrawalTargetEndingBalance:'Enter the amount you would like to leave at the end of the selected period. Use 0 if no ending balance is required.',
    loanPrincipal:'Enter the amount you plan to borrow.',
    loanRatePct:'Enter the annual loan interest rate. If a lender quotes APR, APR means Annual Percentage Rate and may also include certain fees.',
    loanTermMonths:'Enter the full repayment term in months, for example 60 for five years.',
    inflationAmount:'Enter the amount or expense stated in today’s money.',
    inflationYears:'Enter how many years into the future you want to test.',
    inflationRatePct:'Enter an annual inflation assumption. This is an illustration, not a forecast.',
    recurringCurrentSavings:'Enter any amount already invested for this projection. Use 0 if you are starting from zero.',
    recurringContribution:'Enter the amount you plan to invest each month.',
    recurringYears:'Enter how many years you plan to keep contributing.',
    recurringReturnPct:'Enter an annual investment-return assumption. This is an illustration, not a forecast.'
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
    investmentHorizonYears:{why:'Long-term investment growth depends on how long the money can remain invested. Carrowmont will not invent this horizon for you.'},
    grossMonthlyIncome:{why:'Debt-to-income uses gross income to show how required debt payments compare with income before deductions. It is a planning measure, not a lender rule.'},
    essentialNonDebtExpenses:{why:'Separating essential living costs from debt payments lets Carrowmont test whether a new payment fits the cash you actually have left.'},
    existingMonthlyDebtPayments:{why:'Current required debt payments establish the starting debt load before a proposed new payment is added.'},
    proposedNewDebtPayment:{why:'The proposed payment is added to your current debt commitments so Carrowmont can show both the before and after position.'},
    incomeDropPct:{why:'A simple stress test shows how the debt-to-income picture would change if gross income were lower. It is not a prediction.'},
    protectedMonthlySavings:{why:'A home budget should not quietly assume that every spare pound, dollar or rupee can be redirected away from saving and investing.'},
    freeMonthlyBuffer:{why:'This is the monthly cash cushion you want the housing plan to preserve after the modeled costs are paid.'},
    homeDeposit:{why:'The deposit changes the amount that needs to be borrowed. Carrowmont does not calculate one-off buying costs automatically.'},
    homeLoanRatePct:{why:'The interest-rate assumption drives the modeled loan payment and affordability ceiling.'},
    homeLoanTermYears:{why:'The loan term changes the monthly payment and total borrowing period.'},
    monthlyOwnershipCosts:{why:'Housing affordability is wider than the mortgage payment alone, so recurring ownership costs are included in the monthly test.'},
    extraDebtPayment:{why:'Carrowmont compares the required-payment path with the same debt receiving this additional amount each month.'},
    cardBalance:{why:'The outstanding balance is the amount on which future card interest and payoff time are modeled.'},
    cardAprPct:{why:'The card APR determines the contractual interest cost in the payoff model.'},
    cardMinimumPayment:{why:'The minimum-payment path is the baseline against which a larger planned payment is compared.'},
    cardPlannedPayment:{why:'This lets Carrowmont show how a payment above the minimum could change payoff time and modeled interest.'},
    cardTargetMonths:{why:'A payoff target lets Carrowmont calculate the approximate monthly payment needed to reach that timeline. Use 0 if you only want to compare payments.'},
    retirementCurrentAge:{why:'Your current age establishes how many years are available to build retirement savings.'},
    retirementTargetAge:{why:'The target retirement age determines the accumulation period and when withdrawals begin in the model.'},
    retirementPlanningAge:{why:'The planning age sets how long the modeled retirement spending needs to last.'},
    retirementCurrentSavings:{why:'Existing retirement assets are part of the starting point for the projection.'},
    retirementMonthlyExpense:{why:'Current household spending provides a plain starting point for estimating a retirement lifestyle instead of inventing a universal target.'},
    retirementSpendingPct:{why:'Retirement spending may differ from today. This explicit percentage lets you control that assumption.'},
    retirementInflationPct:{why:'Inflation changes the future cost of the lifestyle being modeled. This is an assumption, not a forecast.'},
    retirementPreReturnPct:{why:'The pre-retirement return assumption affects how current savings and future contributions may grow. It is not a forecast.',unknownDefault:5,unknownLabel:'I don’t know — use a 5% illustration'},
    retirementPostReturnPct:{why:'The retirement-period return assumption affects how long the modeled portfolio may last. It is not a forecast.',unknownDefault:4,unknownLabel:'I don’t know — use a 4% illustration'},
    retirementBufferPct:{why:'A safety buffer increases the modeled retirement need rather than assuming the central estimate will be exact.'},
    goalReturnPct:{why:'The return assumption affects how current savings and monthly contributions may grow. It is not a forecast.',unknownDefault:5,unknownLabel:'I don’t know — use a 5% illustration'},
    goalInflationPct:{why:'Inflation changes what a goal stated in today’s money may cost in the future. It is an assumption, not a forecast.'},
    retirementWithdrawalBalance:{why:'The starting retirement balance is the pool from which the drawdown model funds withdrawals.'},
    retirementWithdrawalMonthly:{why:'The starting monthly withdrawal determines how quickly the retirement balance is drawn down.'},
    retirementWithdrawalReturnPct:{why:'The return assumption affects how the remaining balance may grow during retirement. It is not a forecast.',unknownDefault:4,unknownLabel:'I don’t know — use a 4% illustration'},
    retirementWithdrawalGrowthPct:{why:'Increasing withdrawals over time can model inflation-linked spending. It is an assumption, not a forecast.',unknownDefault:3,unknownLabel:'I don’t know — use a 3% illustration'},
    retirementWithdrawalStartAge:{why:'The starting age lets Carrowmont translate a modeled runway into an approximate depletion age.'},
    retirementWithdrawalTargetYears:{why:'This is the period you want the retirement balance to support withdrawals in the target-duration scenario.'},
    retirementWithdrawalTargetEndingBalance:{why:'A target ending balance lets you model leaving money at the end rather than spending the portfolio down to zero.'},
    loanPrincipal:{why:'The amount borrowed determines the balance on which the repayment schedule is calculated.'},
    loanRatePct:{why:'The annual interest rate drives the modeled monthly payment and total interest. APR means Annual Percentage Rate and can differ from a simple interest rate when fees are included.'},
    loanTermMonths:{why:'The repayment term changes both the monthly payment and the total number of interest-bearing months.'},
    inflationAmount:{why:'This is the present-day amount Carrowmont projects forward under the inflation assumption.'},
    inflationYears:{why:'The time horizon determines how many years inflation compounds in the illustration.'},
    inflationRatePct:{why:'The annual inflation assumption determines the modeled future cost and purchasing-power change. It is not a forecast.'},
    recurringCurrentSavings:{why:'Starting savings are included so the projection can show growth of both existing money and future monthly contributions.'},
    recurringContribution:{why:'The monthly contribution is the recurring amount Carrowmont adds to the investment projection.'},
    recurringYears:{why:'The investment period determines how long contributions and modeled compounding continue.'},
    recurringReturnPct:{why:'The return assumption is used only for the growth illustration. It is not a forecast or guaranteed return.',unknownDefault:5,unknownLabel:'I don’t know — use a 5% illustration'}
  };
  const INTENT_COPY={
    'debt-vs-savings':'Pay debt or invest?',
    'car-affordability':'Car affordability',
    'mortgage-prepay-vs-invest':'Mortgage prepay or invest',
    'emergency-runway':'Emergency fund adequacy',
    'cash-flow-shortfall':'Monthly cash-flow shortfall',
    'money-priorities':'Money priorities',
    'lump-sum-goal-tradeoffs':'Lump-sum priorities',
    'borrowing-health':'Borrowing health / DTI (Debt-to-Income ratio)',
    'home-affordability':'Home affordability',
    'debt-payoff':'Debt payoff',
    'credit-card-payoff':'Credit-card payoff',
    'retirement-readiness':'Retirement readiness',
    'retirement-withdrawal':'Retirement withdrawal / SWP (Systematic Withdrawal Plan) and drawdown',
    'goal-funding':'Goal funding',
    'loan-cost':'Loan / EMI (Equated Monthly Instalment) cost',
    'inflation-impact':'Inflation impact',
    'recurring-investment':'Recurring investment / SIP (Systematic Investment Plan) growth'
  };
  const RETIREMENT_WITHDRAWAL_HANDOFF_KEY='carrowmont_retirement_withdrawal_handoff_v1';
  const CAR_AFFORDABILITY_HANDOFF_KEY='carrowmont_handoff_car_affordability_v1';
  const SEARCH_HANDOFF_KEY='carrowmont_search_handoff_v1';
  const HOME_ASK_HANDOFF_KEY='carrowmont_home_ask_handoff_v1';
  const HOME_ASK_HANDOFF_MAX_AGE_MS=15*60*1000;
  const CAR_AFFORDABILITY_HANDOFF_MAX_AGE_MS=15*60*1000;
  const MONEY_KEY=/amount|balance|income|expense|saving|reserve|price|payment|cost|value|interestSaved|targetGap|goalGap|monthlyNeed|cashRoom|loanAmount|endingValue|growth|remaining|outgo|weeklyRoom|dailyRoom|projectedValue|projectedGrowth|contribution|deposit|buffer|surplus/i;
  const PCT_KEY=/Pct$|RatePct$|AprPct$|annualRate|assumedReturn/i;
  const MONTH_KEY=/months|runway/i;
  const YEAR_KEY=/years/i;
  const AGE_KEY=/Age$/i;
  const DISPLAY_LABELS=Object.freeze({
    debtAprPct:'Debt APR (Annual Percentage Rate)',
    highestDebtAprPct:'Highest debt APR (Annual Percentage Rate)',
    cardAprPct:'Credit-card APR (Annual Percentage Rate)',
    currentGrossDtiPct:'Current gross DTI (Debt-to-Income ratio)',
    proposedGrossDtiPct:'Proposed gross DTI (Debt-to-Income ratio)',
    stressedGrossDtiPct:'Stressed gross DTI (Debt-to-Income ratio)',
    loanRatePct:'Annual loan interest rate',
    retirementWithdrawalReturnPct:'Retirement annual return assumption',
    retirementWithdrawalGrowthPct:'Annual withdrawal increase',
    modeledRunwayMonths:'Modeled retirement-savings runway',
    modeledDepletionAge:'Modeled depletion age',
    firstYearWithdrawalRate:'First-year withdrawal rate',
    modeledStartingMonthlyWithdrawal:'Modeled starting monthly withdrawal',
    recurringContribution:'Monthly recurring investment',
    recurringReturnPct:'Annual investment-return assumption',
    interestSharePct:'Interest share of total repayment'
  });
  const DASHBOARD_SAVE_INTENTS=new Set(['debt-vs-savings','car-affordability','mortgage-prepay-vs-invest','emergency-runway','cash-flow-shortfall','money-priorities','lump-sum-goal-tradeoffs','borrowing-health','home-affordability','debt-payoff','credit-card-payoff','retirement-readiness','goal-funding']);

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
  function labelize(key){ return DISPLAY_LABELS[key]||String(key).replace(/([a-z])([A-Z])/g,'$1 $2').replace(/[_-]/g,' ').replace(/^./,c=>c.toUpperCase()); }
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
  let askActionSeq=0;
  async function updateStartAction(query){
    const button=$('askStartBtn');if(!button)return;
    const text=String(query||'').trim();const seq=++askActionSeq;
    if(text.length<2){button.innerHTML='Work through this <span class="button-arrow">&rarr;</span>';return;}
    const owner=await ownershipFor(text);if(seq!==askActionSeq)return;
    const label=owner?.mode==='explain'?'Find an explanation':owner?.ask_intent&&api?.SUPPORTED?.some(item=>item.intent===owner.ask_intent)?'Work through this':owner?'Open best match':'Work through this';
    button.innerHTML=`${label} <span class="button-arrow">&rarr;</span>`;
  }
  function hideAskPredictive(){const box=$('askPredictive');if(!box)return;box.hidden=true;box.innerHTML='';$('askQuestion')?.setAttribute('aria-expanded','false');}
  function renderAskPredictive(items){const box=$('askPredictive');if(!box)return;box.innerHTML='';if(!items?.length){hideAskPredictive();return;}const label=document.createElement('span');label.className='ask-predictive-label';label.textContent='Suggestions';box.appendChild(label);items.slice(0,5).forEach(item=>{const button=document.createElement('button');button.type='button';button.className='ask-predictive-option';button.setAttribute('role','option');const text=document.createElement('span');text.textContent=item.text;button.appendChild(text);if(item.type==='correction'){const small=document.createElement('small');small.textContent='Spelling suggestion';button.appendChild(small);}button.addEventListener('click',()=>{$('askQuestion').value=item.text;hideAskPredictive();$('askQuestion').focus();updateStartAction(item.text);});box.appendChild(button);});box.hidden=false;$('askQuestion')?.setAttribute('aria-expanded','true');}
  function updateAskPredictive(){const input=$('askQuestion');const query=String(input?.value||'').trim();updateStartAction(query);window.clearTimeout(askPredictTimer);if(query.length<2||!window.CarrowmontSearch?.suggest){hideAskPredictive();return;}askPredictTimer=window.setTimeout(()=>{window.CarrowmontSearch.suggest(query,{limit:5}).then(items=>{if(String(input.value||'').trim()===query)renderAskPredictive(items||[]);}).catch(()=>hideAskPredictive());},150);}
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
    $('askQuestion').value=''; updateStartAction(''); hideAskPredictive(); $('askStartMessage').textContent=''; $('askQuestionMessage').textContent=''; hideUnsupported();renderAccountContext();
    stage('start'); updateBackControls(); reveal($('askStart'),$('askQuestion'));
  }
  function requiredInputType(key){ return PCT_KEY.test(key)||MONEY_KEY.test(key)||MONTH_KEY.test(key)||YEAR_KEY.test(key)||AGE_KEY.test(key)||/termMonths/i.test(key)?'number':'text'; }
  function fieldStep(key){ return /termMonths|loanTermMonths|remainingYears|goalYearsAway|investmentHorizonYears|homeLoanTermYears|cardTargetMonths|retirementWithdrawalTargetYears|inflationYears|recurringYears/i.test(key)||AGE_KEY.test(key)?'1':PCT_KEY.test(key)?'0.01':'0.01'; }
  function fieldMinimum(key){
    if(/^(?:emergencyTargetMonths|goalYearsAway|investmentHorizonYears|homeLoanTermYears|retirementWithdrawalTargetYears|inflationYears|recurringYears|loanTermMonths)$/.test(key))return 1;
    if(/^retirementCurrentAge$/.test(key))return 18;
    if(/^(?:retirementTargetAge|retirementPlanningAge)$/.test(key))return 19;
    return 0;
  }
  function questionHint(key){
    if(state.intent==='goal-funding'&&key==='goalTargetAmount') return 'Enter the goal cost in today’s money. Ask Carrowmont will model inflation separately rather than asking you to guess a future price.';
    if(state.intent==='goal-funding'&&key==='goalYearsAway') return 'Enter the whole number of years until you expect to need the money. Use at least 1 year.';
    return QUESTION_HINTS[key]||'';
  }
  function journeyValidationIssue(facts){
    const value=key=>Number(facts?.[key]);
    const known=key=>Number.isFinite(value(key));
    const positive=(key,message)=>known(key)&&value(key)<=0?{key,message}:null;
    let issue=null;
    switch(state.intent){
      case 'borrowing-health':
        issue=positive('grossMonthlyIncome','Enter gross monthly household income greater than 0 so Carrowmont can calculate debt-to-income health.')
          ||positive('takeHomeMonthlyIncome','Enter monthly take-home household income greater than 0 so Carrowmont can test cash room.');
        break;
      case 'home-affordability':
        issue=positive('takeHomeMonthlyIncome','Enter monthly take-home household income greater than 0 so Carrowmont can calculate a meaningful housing budget.');
        break;
      case 'debt-payoff':
        issue=positive('debtBalance','Enter a debt balance greater than 0 for the debt-payoff journey.')
          ||positive('debtMinimumPayment','Enter the required monthly payment greater than 0 so Carrowmont can model a payoff schedule.');
        break;
      case 'credit-card-payoff':
        issue=positive('cardBalance','Enter a credit-card balance greater than 0 for the payoff journey.')
          ||positive('cardMinimumPayment','Enter the current minimum payment greater than 0 so Carrowmont can model the baseline payoff.')
          ||positive('cardPlannedPayment','Enter a planned monthly payment greater than 0 so Carrowmont can compare a payoff path.');
        break;
      case 'retirement-readiness':
        if(known('retirementCurrentAge')&&value('retirementCurrentAge')<18) issue={key:'retirementCurrentAge',message:'Enter a current age of at least 18.'};
        else if(known('retirementTargetAge')&&known('retirementCurrentAge')&&value('retirementTargetAge')<=value('retirementCurrentAge')) issue={key:'retirementTargetAge',message:'Target retirement age must be greater than current age.'};
        else if(known('retirementPlanningAge')&&known('retirementTargetAge')&&value('retirementPlanningAge')<=value('retirementTargetAge')) issue={key:'retirementPlanningAge',message:'The plan-through age must be greater than the target retirement age.'};
        else if(known('retirementPlanningAge')&&value('retirementPlanningAge')>110) issue={key:'retirementPlanningAge',message:'Enter a plan-through age of 110 or less, matching the Retirement Planner range.'};
        else issue=positive('retirementMonthlyExpense','Enter current monthly household spending greater than 0 so Carrowmont can model retirement needs.')
          ||positive('retirementSpendingPct','Enter retirement spending greater than 0% of today’s spending.');
        break;
      case 'retirement-withdrawal':
        issue=positive('retirementWithdrawalBalance','Enter a retirement balance greater than 0 for the withdrawal journey.');
        if(!issue&&facts.retirementWithdrawalMode==='support') issue=positive('retirementWithdrawalTargetYears','Enter a target period greater than 0 years.');
        if(!issue&&facts.retirementWithdrawalMode!=='support') issue=positive('retirementWithdrawalMonthly','Enter a starting monthly withdrawal greater than 0.');
        if(!issue&&known('retirementWithdrawalStartAge')&&(value('retirementWithdrawalStartAge')<18||value('retirementWithdrawalStartAge')>100)) issue={key:'retirementWithdrawalStartAge',message:'Enter a withdrawal starting age between 18 and 100.'};
        break;
      case 'loan-cost':
        issue=positive('loanPrincipal','Enter a loan amount greater than 0.')||positive('loanTermMonths','Enter a loan term greater than 0 months.');
        if(!issue&&known('loanTermMonths')&&value('loanTermMonths')>600) issue={key:'loanTermMonths',message:'Enter a loan term of 600 months or less.'};
        break;
      case 'inflation-impact':
        issue=positive('inflationAmount','Enter an amount greater than 0 for the inflation illustration.')||positive('inflationYears','Enter a time horizon greater than 0 years.');
        break;
      case 'recurring-investment':
        issue=positive('recurringContribution','Enter a monthly investment amount greater than 0.')||positive('recurringYears','Enter an investment period greater than 0 years.');
        break;
      case 'goal-funding':
        issue=positive('goalTargetAmount','Enter a goal amount greater than 0 for the Goal Funding journey.');
        break;
      default:
        break;
    }
    return issue;
  }
  async function startIntent(intent,text='',seedFacts={}){
    hideUnsupported();
    if(!api?.SUPPORTED?.some(x=>x.intent===intent)){ showUnsupported(text); return; }
    state=newState(intent,text);Object.assign(state.facts,seedFacts||{});renderAccountContext();
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
  function retirementWithdrawalSeed(query){
    const normalized=normalizeOwnershipText(query);
    const support=/\b(?:how much|what amount|what monthly|monthly income|can i withdraw|could i withdraw|support|sustainable withdrawal|safe withdrawal)\b/.test(normalized);
    return {retirementWithdrawalMode:support?'support':'runway'};
  }
  async function ownershipFor(text){
    if(!window.CarrowmontSearch?.ownership)return null;
    try{return await window.CarrowmontSearch.ownership(text,{mode:'ask'});}catch(_err){return null;}
  }
  async function startFromText(){
    const input=$('askQuestion');const text=input.value.trim();
    hideUnsupported();hideAskPredictive();
    if(!text){ $('askStartMessage').textContent='Tell Carrowmont what you are trying to solve, or choose one of the suggested questions.'; return; }
    $('askStartMessage').textContent='';
    let understood=text;
    let ownership=await ownershipFor(understood);
    if(!ownership&&window.CarrowmontSearch?.correct){
      try{
        const correction=await window.CarrowmontSearch.correct(text);
        if(correction?.corrected&&correction.query){
          understood=correction.query;ownership=await ownershipFor(understood);input.value=understood;$('askStartMessage').textContent=`I understood that as “${understood}”.`;
        }
      }catch(_err){}
    }
    if(ownership){
      if(ownership.mode==='explain'||ownership.mode==='research'){showUnsupported(understood);return;}
      if(ownership.ask_intent&&api?.SUPPORTED?.some(item=>item.intent===ownership.ask_intent)){
        const seed=ownership.ask_intent==='retirement-withdrawal'?retirementWithdrawalSeed(understood):{};
        startIntent(ownership.ask_intent,understood,seed);return;
      }
      showUnsupported(understood);return;
    }
    const classified=api.classify(understood);
    if(!classified?.intent){showUnsupported(understood);return;}
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
      const input=document.createElement('input'); input.id=`ask-field-${q.key}`; input.name=q.key; input.type=requiredInputType(q.key); input.step=fieldStep(q.key); input.min=String(fieldMinimum(q.key)); input.inputMode='decimal'; input.autocomplete='off'; input.required=true;
      if(PCT_KEY.test(q.key)) input.placeholder='e.g. 7.5'; else if(/termMonths|cardTargetMonths/i.test(q.key)) input.placeholder='e.g. 60'; else if(AGE_KEY.test(q.key)) input.placeholder='e.g. 40'; else input.placeholder=`Enter ${q.label.toLowerCase()}`;
      const described=[];
      group.append(label,input);
      const hint=questionHint(q.key); if(hint){ const small=document.createElement('span'); small.className='ask-field-hint'; small.id=`ask-hint-${q.key}`; small.textContent=hint; described.push(small.id); group.appendChild(small); }
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
      if(/^(?:emergencyTargetMonths|goalYearsAway|investmentHorizonYears|homeLoanTermYears)$/.test(input.name)&&(value<1||!Number.isInteger(value))){
        const field=input.closest('.ask-field'); const label=field?.querySelector('label')?.textContent||'this field';
        $('askQuestionMessage').textContent=`Enter a whole number of at least 1 for ${label.toLowerCase()}.`;
        field?.classList.add('ask-field-invalid'); input.setAttribute('aria-invalid','true');
        reveal(field,input); return;
      }
      if(/^cardTargetMonths$/.test(input.name)&&!Number.isInteger(value)){
        const field=input.closest('.ask-field');
        $('askQuestionMessage').textContent='Enter a whole number of months for the payoff target, or 0 if you do not have one.';
        field?.classList.add('ask-field-invalid'); input.setAttribute('aria-invalid','true'); reveal(field,input); return;
      }
      if(AGE_KEY.test(input.name)&&!Number.isInteger(value)){
        const field=input.closest('.ask-field');
        $('askQuestionMessage').textContent='Enter age in whole years.';
        field?.classList.add('ask-field-invalid'); input.setAttribute('aria-invalid','true'); reveal(field,input); return;
      }
      pending[input.name]=value;
    }
    const validationIssue=journeyValidationIssue({...state.facts,...pending});
    if(validationIssue){
      const input=inputs.find(item=>item.name===validationIssue.key)||null;
      const field=input?.closest('.ask-field')||null;
      $('askQuestionMessage').textContent=validationIssue.message;
      if(input){
        field?.classList.add('ask-field-invalid'); input.setAttribute('aria-invalid','true');
        const desc=(input.getAttribute('aria-describedby')||'').split(/\s+/).filter(Boolean); if(!desc.includes('askQuestionMessage')) desc.push('askQuestionMessage'); input.setAttribute('aria-describedby',desc.join(' '));
        reveal(field,input);
      }else{
        reveal($('askQuestionsStage'),$('askQuestionFields').querySelector('input'));
      }
      return;
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

  function writeRetirementWithdrawalHandoff(result){
    try{
      const nums=result?.importantNumbers||{};const locale=getLocale();
      const payload={version:1,projectedCorpus:Number(nums.projectedRetirementCorpus)||0,requiredCorpus:Number(nums.requiredRetirementCorpus)||0,monthlyNeed:Number(nums.projectedMonthlySpendingAtRetirement)||0,retirementAge:Number(state.facts.retirementTargetAge)||0,postReturn:Number(state.facts.retirementPostReturnPct)||0,inflation:Number(state.facts.retirementInflationPct)||0,region:locale.country,currency:locale.currency,regionLabel:locale.country,createdAt:Date.now()};
      sessionStorage.setItem(RETIREMENT_WITHDRAWAL_HANDOFF_KEY,JSON.stringify(payload));return true;
    }catch(_err){return false;}
  }
  function practicalLinkForStage(stage){
    const map={stabilize:['Open the Budget & Cash Flow Planner','/budget-cash-flow-planner/'],protect:['Open the Emergency Fund & Runway tool','/emergency-fund-runway-calculator.html'],reduce:['Open the Debt Payoff planner','/budget-cash-flow-planner/debt-payoff-calculator.html'],build:['Open the Goal Planner','/goal-planner/'],grow:['Open the SIP / Recurring Investment calculator','/sip-calculator/'],optimize:['Browse Carrowmont tools','/tools.html']};
    return map[String(stage||'').toLowerCase()]||map.optimize;
  }
  function detailLinksFor(result){
    const nums=result?.importantNumbers||{};const links=[];
    switch(result.intent){
      case 'debt-vs-savings':{
        const runway=Number(nums.emergencyRunwayMonths);const diff=Number(nums.modeledPathDifference);
        if(Number.isFinite(runway)&&runway<1)links.push(['Build emergency runway first','/emergency-fund-runway-calculator.html']);
        else if(Number.isFinite(diff)&&diff>0)links.push(['Open the Debt Payoff planner','/budget-cash-flow-planner/debt-payoff-calculator.html']);
        else if(Number.isFinite(diff)&&diff<0)links.push(['Open the SIP / Recurring Investment calculator','/sip-calculator/']);
        else links.push(['Read Pay Off Debt or Invest?','/pay-off-debt-or-invest.html']);
        break;
      }
      case 'car-affordability':links.push(['Open the full Car Affordability tool','/car-affordability-auto-decision-calculator.html']);break;
      case 'mortgage-prepay-vs-invest':links.push(['Open Mortgage Prepay vs Investing','/mortgage-payoff-calculator/prepayment-vs-investing.html']);break;
      case 'emergency-runway':links.push(['Open the Emergency Fund & Runway tool','/emergency-fund-runway-calculator.html']);break;
      case 'cash-flow-shortfall':links.push(['Open the Budget & Cash Flow Planner','/budget-cash-flow-planner/']);break;
      case 'money-priorities':{
        const first=(result.priorityMoves||result.alternatives||[])[0];links.push(practicalLinkForStage(first?.stage));links.push(['Browse all Carrowmont tools','/tools.html']);break;
      }
      case 'lump-sum-goal-tradeoffs':{
        const candidates=[['protect',Number(nums.priorityEmergencyAllocation)||0],['reduce',Number(nums.priorityDebtAllocation)||0],['build',Number(nums.priorityGoalAllocation)||0],['grow',Number(nums.priorityInvestmentAllocation)||0]].sort((a,b)=>b[1]-a[1]);
        if(candidates[0][1]>0)links.push(practicalLinkForStage(candidates[0][0]));links.push(['Read the lump-sum decision guide','/what-to-do-with-a-lump-sum.html']);break;
      }
      case 'borrowing-health':links.push(['Open Borrowing Health','/debt-to-income-borrowing-health-calculator.html']);break;
      case 'home-affordability':links.push(['Open Home Affordability','/home-affordability-calculator.html'],['Read home-buying costs beyond the deposit','/home-buying-upfront-costs.html']);break;
      case 'debt-payoff':links.push(['Open the Debt Payoff planner','/budget-cash-flow-planner/debt-payoff-calculator.html']);break;
      case 'credit-card-payoff':links.push(['Open Credit Card Payoff','/budget-cash-flow-planner/credit-card-payoff-calculator.html']);break;
      case 'retirement-readiness':links.push(['Open the Retirement Planner','/retirement-calculator/'],['Test how long this retirement balance may last','/retirement-calculator/withdrawal-calculator.html','retirement-handoff']);break;
      case 'retirement-withdrawal':links.push(['Open the SWP (Systematic Withdrawal Plan) / Drawdown Calculator','/retirement-calculator/withdrawal-calculator.html']);break;
      case 'goal-funding':links.push(['Open the Goal Planner','/goal-planner/']);break;
      case 'loan-cost':links.push(['Open the Loan / EMI (Equated Monthly Instalment) Calculator','/loan-calculator/']);break;
      case 'inflation-impact':links.push(['Open the Inflation Calculator','/inflation-calculator/']);break;
      case 'recurring-investment':links.push(['Open the SIP (Systematic Investment Plan) / Recurring Investment Calculator','/sip-calculator/']);break;
      default:break;
    }
    return links;
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
    const wrap=$('askDetailLinkWrap'); wrap.innerHTML='';
    detailLinksFor(result).forEach((link,index)=>{
      const a=document.createElement('a');a.href=link[1];a.textContent=`${link[0]} →`;a.dataset.askDetailLink=String(index+1);
      if(result.intent==='car-affordability'&&index===0){a.dataset.askCarAffordabilityHandoff='1';a.addEventListener('click',()=>writeCarAffordabilityHandoff(result));}
      if(link[2]==='retirement-handoff'){a.dataset.askRetirementWithdrawalHandoff='1';a.addEventListener('click',()=>writeRetirementWithdrawalHandoff(result));}
      wrap.appendChild(a);
    });
    const dashWrap=$('askDashboardSaveWrap'); if(dashWrap) dashWrap.hidden=!DASHBOARD_SAVE_INTENTS.has(result.intent);
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
