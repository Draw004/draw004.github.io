(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontAskMvp = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const VERSION = 'ask-carrowmont-mvp-v1.2';
  const INTENTS = Object.freeze({
    DEBT_VS_SAVINGS:'debt-vs-savings',
    CAR_AFFORDABILITY:'car-affordability',
    MORTGAGE_PREPAY_VS_INVEST:'mortgage-prepay-vs-invest',
    EMERGENCY_RUNWAY:'emergency-runway',
    CASH_FLOW_SHORTFALL:'cash-flow-shortfall',
    MONEY_PRIORITIES:'money-priorities'
  });

  const QUESTION_SETS = Object.freeze({
    [INTENTS.EMERGENCY_RUNWAY]: Object.freeze([
      { key:'essentialExpenses', label:'Essential monthly expenses' },
      { key:'emergencySavings', label:'Emergency savings available now' }
    ]),
    [INTENTS.CASH_FLOW_SHORTFALL]: Object.freeze([
      { key:'monthlyIncome', label:'Monthly take-home income' },
      { key:'essentialExpenses', label:'Essential monthly expenses' },
      { key:'flexibleExpenses', label:'Flexible monthly spending' }
    ]),
    [INTENTS.CAR_AFFORDABILITY]: Object.freeze([
      { key:'vehiclePrice', label:'Vehicle price' },
      { key:'takeHomeMonthlyIncome', label:'Monthly take-home income' },
      { key:'essentialMonthlyExpenses', label:'Essential monthly expenses' },
      { key:'annualRate', label:'Expected loan interest rate' },
      { key:'termMonths', label:'Expected loan term in months' },
      { key:'monthlyRunningCosts', label:'Expected monthly running costs' },
      { key:'emergencySavings', label:'Emergency savings available now' }
    ]),
    [INTENTS.MORTGAGE_PREPAY_VS_INVEST]: Object.freeze([
      { key:'mortgageBalance', label:'Current mortgage or home-loan balance' },
      { key:'mortgageRatePct', label:'Mortgage or home-loan interest rate' },
      { key:'remainingYears', label:'Remaining whole years on the loan' },
      { key:'extraAmount', label:'Extra amount available' },
      { key:'assumedInvestmentReturnPct', label:'Assumed annual investment return' }
    ]),
    [INTENTS.DEBT_VS_SAVINGS]: Object.freeze([
      { key:'debtBalance', label:'Debt balance' },
      { key:'debtAprPct', label:'Debt annual interest rate' },
      { key:'debtMinimumPayment', label:'Required monthly debt payment' },
      { key:'monthlySurplus', label:'Monthly amount available for debt reduction or saving' },
      { key:'emergencySavings', label:'Emergency savings available now' },
      { key:'essentialExpenses', label:'Essential monthly expenses' },
      { key:'assumedSavingsReturnPct', label:'Assumed annual savings or investment return' }
    ]),
    [INTENTS.MONEY_PRIORITIES]: Object.freeze([
      { key:'monthlyIncome', label:'Monthly take-home income' },
      { key:'essentialExpenses', label:'Essential monthly expenses' },
      { key:'flexibleExpenses', label:'Flexible monthly spending' },
      { key:'monthlyDebtPayments', label:'Required monthly debt payments' },
      { key:'emergencySavings', label:'Emergency savings available now' },
      { key:'emergencyTargetMonths', label:'Emergency-fund target in months' },
      { key:'debtBalance', label:'Interest-bearing debt balance' },
      { key:'highestDebtAprPct', label:'Highest debt annual interest rate' },
      { key:'assumedLongTermReturnPct', label:'Illustrative long-term return assumption' },
      { key:'retirementSavings', label:'Retirement savings already built' },
      { key:'retirementMonthlyContribution', label:'Monthly retirement contribution' },
      { key:'goalTargetAmount', label:'Goal target amount (enter 0 if none)' },
      { key:'goalCurrentSavings', label:'Savings already set aside for that goal' },
      { key:'goalYearsAway', label:'Years until that goal' },
      { key:'goalMonthlyContribution', label:'Monthly contribution toward that goal' }
    ])
  });

  const SUPPORTED = Object.freeze([
    Object.freeze({ intent:INTENTS.DEBT_VS_SAVINGS, label:'Debt or savings' }),
    Object.freeze({ intent:INTENTS.CAR_AFFORDABILITY, label:'Car affordability' }),
    Object.freeze({ intent:INTENTS.MORTGAGE_PREPAY_VS_INVEST, label:'Mortgage prepay or invest' }),
    Object.freeze({ intent:INTENTS.EMERGENCY_RUNWAY, label:'Emergency fund adequacy' }),
    Object.freeze({ intent:INTENTS.CASH_FLOW_SHORTFALL, label:'Running short before payday' }),
    Object.freeze({ intent:INTENTS.MONEY_PRIORITIES, label:'Money priorities' })
  ]);

  const finite = value => Number.isFinite(Number(value));
  const number = (value, fallback = 0) => finite(value) ? Number(value) : fallback;
  const nonNegative = (value, fallback = 0) => Math.max(0, number(value, fallback));
  const present = value => value !== undefined && value !== null && value !== '' && (typeof value !== 'number' || Number.isFinite(value));
  const freeze = value => Object.freeze(value);

  function classify(text, router) {
    const value = typeof text === 'string' ? text.trim() : '';
    if (/\b(money|financial)\s+priorit(?:y|ies)\b|\bwhat\s+should\s+i\s+(?:do|focus\s+on|prioriti[sz]e)\s+first\b|\bmy\s+next\s+(?:financial|money)\s+move\b|\bwhere\s+should\s+i\s+put\s+my\s+money\b/i.test(value)) {
      return freeze({ intent:INTENTS.MONEY_PRIORITIES, matchedRule:'money-priorities' });
    }
    if (/\b(run|running|ran)\s+(out|short)\b.{0,30}\b(money|cash)\b|\b(before|until)\s+(payday|pay day|salary|paycheck)\b|\bmonth\s+ends?\b.{0,25}\bmoney\b/i.test(value)) {
      return freeze({ intent:INTENTS.CASH_FLOW_SHORTFALL, matchedRule:'cash-flow-shortfall' });
    }
    const routed = router?.classifyText ? router.classifyText(value) : { intent:null, matchedRule:null };
    if (Object.values(INTENTS).includes(routed.intent)) return routed;
    return freeze({ intent:null, matchedRule:null });
  }

  function missingQuestions(intent, facts = {}, maxQuestions = 3) {
    const questions = QUESTION_SETS[intent] || [];
    return freeze(questions.filter(q => !present(facts[q.key])).slice(0, Math.max(1, maxQuestions)).map(q => freeze({ ...q })));
  }

  function resolveDependencies(overrides = {}) {
    return {
      router: overrides.router || root.CarrowmontFreIntentRouter,
      budget: overrides.budget || root.CarrowmontBudgetCore,
      emergency: overrides.emergency || root.CarrowmontEmergencyFundCore,
      car: overrides.car || root.CarrowmontCarAffordabilityCore,
      loan: overrides.loan || root.CarrowmontLoanCore,
      borrowing: overrides.borrowing || root.CarrowmontBorrowingHealthCore,
      debtPayoff: overrides.debtPayoff || root.CarrowmontDebtPayoffCore,
      compound: overrides.compound || root.CarrowmontCompoundCore,
      mortgagePrepay: overrides.mortgagePrepay || root.CarrowmontMdc1aCore,
      moneyPriorities: overrides.moneyPriorities || root.CarrowmontMoneyPriorities,
      priorityFramework: overrides.priorityFramework || root.CarrowmontFrePriorityFramework,
      goal: overrides.goal || root.CarrowmontGoalCore
    };
  }

  function engineTrace(id, input, output) {
    return freeze({ engineId:id, input:freeze({ ...input }), output });
  }

  function emergencyJourney(facts, deps, currency) {
    if (!deps.emergency?.calculate) throw new Error('Emergency Fund deterministic engine is unavailable.');
    const input = {
      essentialExpenses:nonNegative(facts.essentialExpenses),
      debtPayments:nonNegative(facts.debtPayments),
      emergencySavings:nonNegative(facts.emergencySavings),
      targetMonths:nonNegative(facts.targetMonths, 6) || 6,
      monthlyContribution:nonNegative(facts.monthlyContribution)
    };
    const raw = deps.emergency.calculate(input);
    const diagnosis = raw.classification === 'TARGET_COVERED' ? 'Your modeled reserve covers the emergency-fund target you entered.'
      : raw.classification === 'NO_BUFFER' ? 'The modeled reserve has no emergency buffer yet.'
      : raw.classification === 'FIRST_BUFFER' ? 'The modeled reserve is below one month of essential and unavoidable costs.'
      : 'The modeled reserve is building toward your chosen emergency-fund target.';
    const recommendation = raw.targetGap <= 0
      ? freeze({ headline:'Your modeled emergency fund meets the target you entered.', action:'Maintain the reserve and revisit the target when essential costs or household stability change.', rationale:'The deterministic runway calculation shows no remaining gap to your chosen target.' })
      : (raw.fullLossRunwayMonths || 0) < 1
        ? freeze({ headline:'Build a first cash buffer before taking more financial risk.', action:'Prioritize accessible emergency savings until you have at least some meaningful runway.', rationale:'The modeled reserve is below one month of unavoidable costs, so resilience is the immediate constraint.' })
        : freeze({ headline:'Keep building the reserve toward your chosen target.', action:'Use a realistic monthly contribution while preserving essential cash flow.', rationale:'You have some modeled runway, but the deterministic engine still shows a gap to the target you selected.' });
    return freeze({
      situation:'Emergency fund adequacy', diagnosis, recommendation,
      confidence:freeze({ level:'HIGH', basis:'Runway and target-gap figures come directly from the Emergency Fund deterministic engine; the target month count remains your choice.' }),
      whatCouldChangeAnswer:freeze(['A change in essential monthly expenses.', 'A different emergency-fund target.', 'A material change in income stability or access to other liquid cash.']),
      importantNumbers:freeze({ currency, monthlyNeed:raw.monthlyNeed, reserve:raw.reserve, runwayMonths:raw.fullLossRunwayMonths, targetMonths:raw.assumptions.targetMonths, targetGap:raw.targetGap, monthsToTarget:raw.monthsToTarget }),
      alternatives:freeze([
        freeze({ id:'current', label:'Current reserve', runwayMonths:raw.fullLossRunwayMonths }),
        freeze({ id:'chosen-target', label:'Chosen target', targetAmount:raw.targetAmount, targetGap:raw.targetGap })
      ]),
      nextSteps:freeze(raw.targetGap > 0 ? ['Choose a realistic monthly contribution to the reserve.', 'Keep the target user-chosen; the 3–6 month range is context, not a universal rule.'] : ['Review the target when essential costs or household stability change.']),
      assumptions:freeze([{ id:'targetMonths', value:raw.assumptions.targetMonths, note:'User-chosen target.' }]),
      trace:freeze([engineTrace('emergency-fund-runway', input, raw)])
    });
  }

  function cashFlowJourney(facts, deps, currency) {
    if (!deps.budget?.calculate) throw new Error('Budget deterministic engine is unavailable.');
    const state = {
      incomes:[{ amount:nonNegative(facts.monthlyIncome), frequency:'monthly' }],
      essential:[{ amount:nonNegative(facts.essentialExpenses), frequency:'monthly' }],
      flexible:[{ amount:nonNegative(facts.flexibleExpenses), frequency:'monthly' }],
      savings:[{ amount:nonNegative(facts.savingsContributions), frequency:'monthly' }],
      emergencyCurrent:nonNegative(facts.emergencySavings),
      emergencyTargetMonths:nonNegative(facts.targetMonths, 3) || 3,
      primaryPayFrequency:'monthly'
    };
    const raw = deps.budget.calculate(state);
    const diagnosis = raw.remaining < 0 ? 'Your modeled monthly outgo is higher than your modeled take-home income.'
      : raw.remaining === 0 ? 'Your modeled monthly cash flow has no remaining margin.'
      : 'Your modeled monthly cash flow remains positive after the costs entered.';
    const recommendation = raw.remaining < 0
      ? freeze({ headline:'Your monthly plan is running a modeled deficit.', action:'Protect essential payments first, then reduce adjustable outgo before using new debt to bridge the gap.', rationale:'Entered monthly outgo exceeds entered take-home income in the Budget & Cash Flow engine.' })
      : raw.remaining === 0
        ? freeze({ headline:'Your monthly plan has no modeled safety margin.', action:'Create some recurring headroom before adding new commitments.', rationale:'The deterministic budget leaves no remaining amount for irregular costs or surprises.' })
        : freeze({ headline:'Your monthly plan is positive on the numbers entered.', action:'Keep part of the remaining amount as a buffer for irregular costs before committing it elsewhere.', rationale:'The deterministic budget remains above zero after the entered costs and planned saving.' });
    return freeze({
      situation:'Running short before payday', diagnosis, recommendation,
      confidence:freeze({ level:'HIGH', basis:'The conclusion follows directly from entered monthly income and spending. Missing irregular expenses can materially change it.' }),
      whatCouldChangeAnswer:freeze(['Irregular or annual expenses not included in the monthly inputs.', 'Changes in take-home income.', 'Changes in flexible spending or planned savings contributions.']),
      importantNumbers:freeze({ currency, income:raw.income, essential:raw.essential, flexible:raw.flexible, plannedSaving:raw.saving, remaining:raw.remaining, weeklyRoom:raw.weekly, dailyRoom:raw.daily }),
      alternatives:freeze([
        freeze({ id:'current', label:'Current modeled month', remaining:raw.remaining }),
        freeze({ id:'without-flexible', label:'If flexible spending were temporarily reduced to zero', remaining:raw.remaining + raw.flexible })
      ]),
      nextSteps:freeze(raw.remaining < 0 ? ['Protect essential payments first.', 'Review flexible spending and voluntary saving contributions before adding new debt.', 'Use the Budget & Cash Flow Planner for category-level detail.'] : ['Keep a buffer for irregular costs so the positive monthly margin is not overstated.']),
      assumptions:freeze([]),
      trace:freeze([engineTrace('budget-cash-flow', state, raw)])
    });
  }

  function carJourney(facts, deps, currency) {
    if (!deps.car?.calculate || !deps.loan || !deps.borrowing || !deps.emergency) throw new Error('Car Affordability deterministic dependencies are unavailable.');
    const input = {
      vehiclePrice:nonNegative(facts.vehiclePrice), downPayment:nonNegative(facts.downPayment), tradeInCredit:nonNegative(facts.tradeInCredit), upfrontTaxesFees:nonNegative(facts.upfrontTaxesFees),
      annualRate:nonNegative(facts.annualRate), termMonths:Math.max(1, Math.round(number(facts.termMonths, 60))), grossMonthlyIncome:nonNegative(facts.grossMonthlyIncome), takeHomeMonthlyIncome:nonNegative(facts.takeHomeMonthlyIncome),
      essentialMonthlyExpenses:nonNegative(facts.essentialMonthlyExpenses), existingMonthlyDebtPayments:nonNegative(facts.existingMonthlyDebtPayments), monthlyRunningCosts:nonNegative(facts.monthlyRunningCosts),
      emergencySavings:nonNegative(facts.emergencySavings), emergencySavingsUsedForPurchase:nonNegative(facts.emergencySavingsUsedForPurchase), emergencyTargetMonths:nonNegative(facts.emergencyTargetMonths, 6) || 6,
      alternativeVehiclePrice:nonNegative(facts.alternativeVehiclePrice), extraDownPaymentScenario:nonNegative(facts.extraDownPaymentScenario), longerTermMonthsScenario:nonNegative(facts.longerTermMonthsScenario)
    };
    const raw = deps.car.calculate(input, { loan:deps.loan, borrowingHealth:deps.borrowing, emergencyFund:deps.emergency });
    if (!raw.ok) return freeze({ situation:'Car affordability', diagnosis:'Carrowmont needs corrected inputs before it can model this purchase.', importantNumbers:freeze({}), alternatives:freeze([]), nextSteps:freeze(raw.errors || []), assumptions:freeze([]), trace:freeze([engineTrace('car-affordability', input, raw)]) });
    const map = {
      MONTHLY_SHORTFALL:'The modeled purchase creates a monthly cash-flow shortfall.',
      STRESS_SHORTFALL:'The purchase fits the base case but creates a shortfall in the modeled stress case.',
      BELOW_CHOSEN_RUNWAY_TARGET:'The modeled purchase leaves emergency runway below your chosen target.',
      BUFFER_REDUCED:'The purchase remains cash-flow positive but uses some emergency savings.',
      CASH_ROOM_REMAINS:'The modeled purchase keeps monthly cash room positive and does not breach the chosen runway target.'
    };
    const carRec = raw.classification === 'CASH_ROOM_REMAINS'
      ? freeze({ headline:'This car is within the modeled affordability guardrails you entered.', action:'Treat it as affordable only if the remaining cash room and emergency runway also feel comfortable to you.', rationale:'The deterministic model keeps cash room positive without breaching the chosen emergency-runway target.' })
      : raw.classification === 'BUFFER_REDUCED'
        ? freeze({ headline:'The purchase is possible, but it weakens your cash buffer.', action:'Consider a lower vehicle price or delaying the purchase rather than consuming emergency savings.', rationale:'The model remains cash-flow positive, but the purchase uses part of the emergency reserve.' })
        : freeze({ headline:'Carrowmont would not treat this purchase as comfortably affordable on the current inputs.', action:'Reduce the price, increase the down payment without harming emergency savings, or improve monthly cash room before proceeding.', rationale:'The model shows a base/stress shortfall or emergency runway below your chosen target.' });
    return freeze({
      situation:'Car affordability', diagnosis:map[raw.classification] || 'Carrowmont modeled the purchase using household cash room, debt load and emergency runway.', recommendation:carRec,
      confidence:freeze({ level:'MEDIUM_HIGH', basis:'Loan payment, cash-room, borrowing-health and runway figures are deterministic; real insurance, maintenance and future income can differ.' }),
      whatCouldChangeAnswer:freeze(['A different vehicle price or down payment.', 'A different loan rate or term.', 'Changes in running costs, household expenses, existing debt, income or emergency savings.']),
      importantNumbers:freeze({ currency, loanAmount:raw.loanAmount, monthlyLoanPayment:raw.monthlyLoanPayment, allInMonthlyCarCost:raw.allInMonthlyCarCost, afterCashRoom:raw.afterCashRoom, stressCashRoom:raw.stressCashRoom, runwayAfterMonths:raw.runwayAfterMonths, afterGrossDtiPct:raw.afterGrossDtiPct }),
      alternatives:freeze(raw.comparisons || []),
      nextSteps:freeze(['Review the all-in monthly car cost, not only the loan payment.', 'Check whether the remaining emergency runway matches your own target.', 'Use lower price or higher down-payment scenarios when available.']),
      assumptions:freeze([{ id:'loanRate', value:input.annualRate }, { id:'loanTermMonths', value:input.termMonths }]),
      trace:freeze([engineTrace('car-affordability', input, raw)])
    });
  }

  function mortgageJourney(facts, deps, currency, country, startDate) {
    if (!deps.mortgagePrepay?.calculate) throw new Error('Mortgage Prepay vs Invest deterministic engine is unavailable.');
    const input = {
      country:country || 'OTHER', currency:currency || 'USD', balance:nonNegative(facts.mortgageBalance), annualRatePct:nonNegative(facts.mortgageRatePct), remainingYears:Math.max(0, Math.round(number(facts.remainingYears))), remainingMonths:0,
      paymentFrequency:'monthly', useCurrentPayment:Boolean(facts.currentPayment), currentPayment:nonNegative(facts.currentPayment), extraMode:'lump', extraAmount:nonNegative(facts.extraAmount), lumpSumPeriod:1,
      prepaymentCharge:nonNegative(facts.prepaymentCharge), assumedInvestmentReturnPct:number(facts.assumedInvestmentReturnPct), startDate:startDate || '2026-01-01'
    };
    const raw = deps.mortgagePrepay.calculate(input);
    if (!raw.ok) return freeze({ situation:'Mortgage prepay or invest', diagnosis:'Carrowmont needs corrected mortgage inputs before it can compare the paths.', importantNumbers:freeze({}), alternatives:freeze([]), nextSteps:freeze([`Review the ${raw.error || 'mortgage'} input.`]), assumptions:freeze([]), trace:freeze([engineTrace('mortgage-prepay-vs-invest', input, raw)]) });
    const higher = raw.comparison.higherModeledPath;
    const diagnosis = higher === 'prepay' ? 'Under the return assumption entered, the modeled prepayment path finishes with the higher ending net value.'
      : higher === 'invest' ? 'Under the return assumption entered, the modeled investing path finishes with the higher ending value.'
      : 'Under the return assumption entered, the two modeled paths are approximately equal.';
    const mortgageRec = higher === 'prepay'
      ? freeze({ headline:'Prepaying is the stronger modeled path under the return assumption entered.', action:'Favor prepayment if you value the contractual interest saving and can preserve adequate liquidity.', rationale:'The deterministic comparison ends with the prepay path ahead on the common modeled horizon.' })
      : higher === 'invest'
        ? freeze({ headline:'Investing is the stronger modeled path under the return assumption entered.', action:'Only favor investing if you accept market risk and the assumed return is realistic for your horizon.', rationale:'The deterministic comparison ends with the investment path ahead on the common modeled horizon.' })
        : freeze({ headline:'The two paths are approximately tied in the current model.', action:'Let liquidity, risk tolerance, taxes and peace of mind drive the choice rather than a small modeled difference.', rationale:'Neither path has a meaningful modeled advantage under the entered assumptions.' });
    return freeze({
      situation:'Mortgage prepay or invest', diagnosis, recommendation:mortgageRec,
      confidence:freeze({ level:'MEDIUM', basis:'Mortgage interest savings are contractual-model outputs; investment returns are assumptions rather than forecasts.' }),
      whatCouldChangeAnswer:freeze(['A different expected investment return.', 'Taxes or fees that change the net investment outcome.', 'Prepayment charges, refinancing plans, liquidity needs or a different remaining loan horizon.']),
      importantNumbers:freeze({ currency, interestAvoided:raw.prepay.interestAvoided, periodsSaved:raw.prepay.periodsSaved, pathDifference:raw.comparison.pathDifference, assumedReturnPct:raw.comparison.assumedReturnPct, breakEvenReturnPct:raw.comparison.breakEvenReturnPct }),
      alternatives:freeze([
        freeze({ id:'prepay', label:'Prepay', endingNetValue:raw.prepay.endingNetValue, payoffDate:raw.prepay.payoffDate }),
        freeze({ id:'invest', label:'Invest', endingValue:raw.invest.endingValue, horizonDate:raw.comparison.commonHorizonDate })
      ]),
      nextSteps:freeze(['Treat the investment return as an assumption, not a forecast.', 'Include any real prepayment charge before acting.', 'Review taxes, liquidity needs and risk outside this deterministic comparison.']),
      assumptions:freeze([{ id:'investmentReturnPct', value:raw.comparison.assumedReturnPct, note:'User-entered return assumption.' }]),
      trace:freeze([engineTrace('mortgage-prepay-vs-invest', input, raw)])
    });
  }

  function debtVsSavingsJourney(facts, deps, currency) {
    if (!deps.emergency?.calculate || !deps.debtPayoff?.comparePlans || !deps.compound?.calculate) throw new Error('Debt-versus-savings deterministic dependencies are unavailable.');
    const emergencyInput = { essentialExpenses:nonNegative(facts.essentialExpenses), debtPayments:nonNegative(facts.debtMinimumPayment), emergencySavings:nonNegative(facts.emergencySavings), targetMonths:nonNegative(facts.targetMonths, 3) || 3, monthlyContribution:0 };
    const emergency = deps.emergency.calculate(emergencyInput);
    const debts = [{ id:'focus-debt', label:'Debt', balance:nonNegative(facts.debtBalance), annualRatePct:nonNegative(facts.debtAprPct), minimumPayment:nonNegative(facts.debtMinimumPayment) }];
    const debt = deps.debtPayoff.comparePlans(debts, nonNegative(facts.monthlySurplus));
    const baselineMonths = debt.zeroExtra.avalanche.status === 'paid_off' ? debt.zeroExtra.avalanche.months : 60;
    const horizonYears = Math.max(1, Math.min(60, Math.ceil(baselineMonths / 12)));
    const savingsState = { principal:0, annualRate:number(facts.assumedSavingsReturnPct), years:horizonYears, compounding:'monthly', contributionEnabled:true, contribution:nonNegative(facts.monthlySurplus), contributionFrequency:'monthly', contributionTiming:'end', inflationEnabled:false, inflation:0 };
    const savings = deps.compound.calculate(savingsState);
    const debtApr = nonNegative(facts.debtAprPct);
    const assumedReturn = number(facts.assumedSavingsReturnPct);
    let diagnosis;
    if ((emergency.fullLossRunwayMonths || 0) < 1) diagnosis = 'Your modeled emergency reserve is below one month of unavoidable costs, so keeping a first cash buffer is the immediate resilience issue before directing all surplus elsewhere.';
    else if (debtApr > assumedReturn) diagnosis = 'The debt rate entered is higher than the savings or investment return assumption. Debt reduction therefore removes a higher contractual rate than the modeled return assumption, while liquidity still matters.';
    else diagnosis = 'The savings or investment return assumption is at least as high as the debt rate entered, so the modeled trade-off is sensitive to risk, taxes and liquidity rather than a simple rate comparison.';
    let debtRec;
    if ((emergency.fullLossRunwayMonths || 0) < 1) debtRec = freeze({ headline:'Keep a first emergency buffer before sending all surplus to debt or investing.', action:'Build accessible cash resilience first, then revisit the debt-versus-invest decision.', rationale:'The emergency-runway engine shows less than one month of unavoidable costs covered.' });
    else if (debtApr > assumedReturn) debtRec = freeze({ headline:'Directing the surplus to debt is the stronger modeled starting point.', action:'Prioritize the high-cost debt while preserving the emergency buffer you need.', rationale:'The contractual debt rate is above the return assumption entered, and the debt-payoff engine shows measurable interest savings.' });
    else debtRec = freeze({ headline:'The rate comparison alone does not give debt repayment a clear modeled advantage.', action:'Keep adequate liquidity and compare risk-adjusted, after-tax investment expectations before choosing where the surplus goes.', rationale:'The entered return assumption is at least as high as the debt rate, so uncertainty and liquidity become more important.' });
    return freeze({
      situation:'Debt or savings', diagnosis, recommendation:debtRec,
      confidence:freeze({ level:'MEDIUM', basis:'Debt cost and payoff math are deterministic; savings/investment growth is based on your return assumption and is not guaranteed.' }),
      whatCouldChangeAnswer:freeze(['A lower or higher debt APR.', 'A different realistic after-tax investment return assumption.', 'A change in emergency savings, essential expenses, liquidity needs or debt-payment terms.']),
      importantNumbers:freeze({ currency, emergencyRunwayMonths:emergency.fullLossRunwayMonths, debtAprPct:debtApr, assumedSavingsReturnPct:assumedReturn, debtPayoffMonthsWithSurplus:debt.avalanche.months, debtInterestWithSurplus:debt.avalanche.totalInterest, debtInterestWithoutSurplus:debt.zeroExtra.avalanche.totalInterest, modeledInterestSaved:Math.max(0, debt.zeroExtra.avalanche.totalInterest - debt.avalanche.totalInterest), savingsProjectionYears:horizonYears, savingsProjectedValue:savings.ok ? savings.endingValue : null, savingsProjectedGrowth:savings.ok ? savings.growth : null }),
      alternatives:freeze([
        freeze({ id:'debt-first', label:'Direct monthly surplus to debt', payoffMonths:debt.avalanche.months, totalInterest:debt.avalanche.totalInterest }),
        freeze({ id:'save-first', label:'Direct monthly surplus to savings/investment', horizonYears, projectedValue:savings.ok ? savings.endingValue : null, projectedGrowth:savings.ok ? savings.growth : null })
      ]),
      nextSteps:freeze(['Protect a first emergency buffer before sacrificing all liquidity.', 'Compare contractual debt cost with a realistic—not guaranteed—return assumption.', 'Use the detailed Debt Payoff and Compound Interest tools for deeper scenario testing.']),
      assumptions:freeze([{ id:'savingsReturnPct', value:assumedReturn, note:'User-entered growth assumption; not a forecast.' }, { id:'projectionHorizonYears', value:horizonYears, note:'Rounded up from the minimum-payment debt payoff horizon for a simple common planning window.' }]),
      trace:freeze([engineTrace('emergency-fund-runway', emergencyInput, emergency), engineTrace('debt-payoff', { debts, extraMonthlyPayment:nonNegative(facts.monthlySurplus) }, debt), engineTrace('compound-interest', savingsState, savings)])
    });
  }

  function moneyPrioritiesJourney(facts, deps, currency) {
    if (!deps.moneyPriorities?.create) throw new Error('Money Priorities deterministic rule engine is unavailable.');
    const priorities = deps.moneyPriorities.create({ budget:deps.budget, emergency:deps.emergency, goal:deps.goal, priority:deps.priorityFramework });
    return priorities.evaluate(facts, { currency });
  }

  function create(overrides = {}) {
    const deps = resolveDependencies(overrides);
    function resolve(input = {}) {
      const intent = input.intent || classify(input.text, deps.router).intent;
      if (!intent || !SUPPORTED.some(item => item.intent === intent)) {
        return freeze({ version:VERSION, status:'NEEDS_CLARIFICATION', intent:null, supportedJourneys:SUPPORTED, questions:freeze([]) });
      }
      const facts = input.facts && typeof input.facts === 'object' ? input.facts : {};
      const questions = missingQuestions(intent, facts, input.maxQuestions || 3);
      if (questions.length) return freeze({ version:VERSION, status:'NEEDS_INPUT', intent, questions, supportedJourneys:SUPPORTED });
      let result;
      if (intent === INTENTS.EMERGENCY_RUNWAY) result = emergencyJourney(facts, deps, input.currency);
      else if (intent === INTENTS.CASH_FLOW_SHORTFALL) result = cashFlowJourney(facts, deps, input.currency);
      else if (intent === INTENTS.CAR_AFFORDABILITY) result = carJourney(facts, deps, input.currency);
      else if (intent === INTENTS.MORTGAGE_PREPAY_VS_INVEST) result = mortgageJourney(facts, deps, input.currency, input.country, input.startDate);
      else if (intent === INTENTS.MONEY_PRIORITIES) result = moneyPrioritiesJourney(facts, deps, input.currency);
      else result = debtVsSavingsJourney(facts, deps, input.currency);
      return freeze({ version:VERSION, status:'RESOLVED', intent, ...result });
    }
    return freeze({ VERSION, INTENTS, SUPPORTED, QUESTION_SETS, classify:text => classify(text, deps.router), missingQuestions, resolve });
  }

  return freeze({ VERSION, INTENTS, SUPPORTED, QUESTION_SETS, create, classify, missingQuestions });
});
