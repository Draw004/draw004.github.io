(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontAskMvp = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const VERSION = 'ask-carrowmont-mvp-v2.0';
  const INTENTS = Object.freeze({
    DEBT_VS_SAVINGS:'debt-vs-savings',
    CAR_AFFORDABILITY:'car-affordability',
    MORTGAGE_PREPAY_VS_INVEST:'mortgage-prepay-vs-invest',
    EMERGENCY_RUNWAY:'emergency-runway',
    CASH_FLOW_SHORTFALL:'cash-flow-shortfall',
    MONEY_PRIORITIES:'money-priorities',
    LUMP_SUM_GOAL_TRADEOFFS:'lump-sum-goal-tradeoffs',
    BORROWING_HEALTH:'borrowing-health',
    HOME_AFFORDABILITY:'home-affordability',
    DEBT_PAYOFF:'debt-payoff',
    CREDIT_CARD_PAYOFF:'credit-card-payoff',
    RETIREMENT_READINESS:'retirement-readiness',
    RETIREMENT_WITHDRAWAL:'retirement-withdrawal',
    GOAL_FUNDING:'goal-funding',
    LOAN_COST:'loan-cost',
    INFLATION_IMPACT:'inflation-impact',
    RECURRING_INVESTMENT:'recurring-investment'
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
      { key:'monthlySurplus', label:'Extra money available each month' },
      { key:'emergencySavings', label:'Emergency savings available now' },
      { key:'essentialExpenses', label:'Essential monthly expenses' },
      { key:'assumedSavingsReturnPct', label:'Expected annual investment return' }
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
    ]),
    [INTENTS.LUMP_SUM_GOAL_TRADEOFFS]: Object.freeze([
      { key:'lumpSumAmount', label:'Lump sum available now' },
      { key:'essentialExpenses', label:'Essential monthly expenses' },
      { key:'emergencySavings', label:'Emergency savings available now' },
      { key:'emergencyTargetMonths', label:'Emergency-fund target in months' },
      { key:'debtBalance', label:'Debt balance you would consider paying down (enter 0 if none)' },
      { key:'debtAprPct', label:'Annual interest rate on that debt' },
      { key:'debtMonthlyPayment', label:'Required monthly payment on that debt' },
      { key:'goalTargetAmount', label:'Goal target amount (enter 0 if none)' },
      { key:'goalCurrentSavings', label:'Savings already set aside for that goal' },
      { key:'goalYearsAway', label:'Whole years until that goal' },
      { key:'goalMonthlyContribution', label:'Monthly contribution toward that goal' },
      { key:'assumedLongTermReturnPct', label:'Illustrative long-term investment return' },
      { key:'investmentHorizonYears', label:'Whole years for the long-term investment illustration' }
    ]),
    [INTENTS.BORROWING_HEALTH]: Object.freeze([
      { key:'grossMonthlyIncome', label:'Gross monthly household income' },
      { key:'takeHomeMonthlyIncome', label:'Monthly take-home household income' },
      { key:'essentialNonDebtExpenses', label:'Essential monthly costs excluding debt payments' },
      { key:'existingMonthlyDebtPayments', label:'Current required monthly debt payments' },
      { key:'proposedNewDebtPayment', label:'Proposed new monthly debt payment (enter 0 for current position only)' },
      { key:'incomeDropPct', label:'Income-drop stress test percentage' }
    ]),
    [INTENTS.HOME_AFFORDABILITY]: Object.freeze([
      { key:'takeHomeMonthlyIncome', label:'Monthly take-home household income' },
      { key:'essentialMonthlyExpenses', label:'Essential monthly household costs' },
      { key:'existingMonthlyDebtPayments', label:'Existing required monthly debt payments' },
      { key:'protectedMonthlySavings', label:'Monthly saving or investing you want to protect' },
      { key:'freeMonthlyBuffer', label:'Cash you want left free each month after housing' },
      { key:'homeDeposit', label:'Deposit or down payment available' },
      { key:'homeLoanRatePct', label:'Expected home-loan or mortgage interest rate' },
      { key:'homeLoanTermYears', label:'Expected loan term in whole years' },
      { key:'monthlyOwnershipCosts', label:'Other monthly homeownership costs' }
    ]),
    [INTENTS.DEBT_PAYOFF]: Object.freeze([
      { key:'debtBalance', label:'Debt balance' },
      { key:'debtAprPct', label:'Debt annual interest rate' },
      { key:'debtMinimumPayment', label:'Required monthly payment' },
      { key:'extraDebtPayment', label:'Extra monthly amount you could add' }
    ]),
    [INTENTS.CREDIT_CARD_PAYOFF]: Object.freeze([
      { key:'cardBalance', label:'Credit-card balance' },
      { key:'cardAprPct', label:'Credit-card annual interest rate' },
      { key:'cardMinimumPayment', label:'Current minimum monthly payment' },
      { key:'cardPlannedPayment', label:'Monthly payment you are considering' },
      { key:'cardTargetMonths', label:'Target payoff time in months (enter 0 if you do not have one)' }
    ]),
    [INTENTS.RETIREMENT_READINESS]: Object.freeze([
      { key:'retirementCurrentAge', label:'Current age' },
      { key:'retirementTargetAge', label:'Target retirement age' },
      { key:'retirementPlanningAge', label:'Age you want the plan to cover through' },
      { key:'retirementCurrentSavings', label:'Retirement savings already built' },
      { key:'retirementMonthlyContribution', label:'Current monthly retirement contribution' },
      { key:'retirementMonthlyExpense', label:'Current monthly household spending' },
      { key:'retirementSpendingPct', label:'Retirement spending as a percentage of today’s spending' },
      { key:'retirementInflationPct', label:'Annual inflation assumption' },
      { key:'retirementPreReturnPct', label:'Annual return assumption before retirement' },
      { key:'retirementPostReturnPct', label:'Annual return assumption during retirement' },
      { key:'retirementBufferPct', label:'Safety buffer percentage' }
    ]),
    [INTENTS.RETIREMENT_WITHDRAWAL]: Object.freeze([
      { key:'retirementWithdrawalBalance', label:'Retirement balance to test' },
      { key:'retirementWithdrawalMonthly', label:'Starting monthly withdrawal' },
      { key:'retirementWithdrawalReturnPct', label:'Annual return assumption during retirement' },
      { key:'retirementWithdrawalGrowthPct', label:'Annual withdrawal increase for inflation' },
      { key:'retirementWithdrawalStartAge', label:'Age when withdrawals start' }
    ]),
    [INTENTS.LOAN_COST]: Object.freeze([
      { key:'loanPrincipal', label:'Loan amount' },
      { key:'loanRatePct', label:'Annual loan interest rate' },
      { key:'loanTermMonths', label:'Loan term in months' }
    ]),
    [INTENTS.INFLATION_IMPACT]: Object.freeze([
      { key:'inflationAmount', label:'Amount to test in today’s money' },
      { key:'inflationYears', label:'Number of years' },
      { key:'inflationRatePct', label:'Annual inflation assumption' }
    ]),
    [INTENTS.RECURRING_INVESTMENT]: Object.freeze([
      { key:'recurringCurrentSavings', label:'Current amount already invested' },
      { key:'recurringContribution', label:'Monthly investment amount' },
      { key:'recurringYears', label:'Investment period in years' },
      { key:'recurringReturnPct', label:'Annual return assumption' }
    ]),
    [INTENTS.GOAL_FUNDING]: Object.freeze([
      { key:'goalTargetAmount', label:'Goal amount in today’s money' },
      { key:'goalYearsAway', label:'Whole years until the goal' },
      { key:'goalCurrentSavings', label:'Savings already set aside for the goal' },
      { key:'goalMonthlyContribution', label:'Current monthly contribution toward the goal' },
      { key:'goalReturnPct', label:'Annual return assumption for the goal' },
      { key:'goalInflationPct', label:'Annual inflation assumption for the goal cost' }
    ])
  });

  const SUPPORTED = Object.freeze([
    Object.freeze({ intent:INTENTS.DEBT_VS_SAVINGS, label:'Pay debt or invest?' }),
    Object.freeze({ intent:INTENTS.CAR_AFFORDABILITY, label:'Car affordability' }),
    Object.freeze({ intent:INTENTS.MORTGAGE_PREPAY_VS_INVEST, label:'Mortgage prepay or invest' }),
    Object.freeze({ intent:INTENTS.EMERGENCY_RUNWAY, label:'Emergency fund adequacy' }),
    Object.freeze({ intent:INTENTS.CASH_FLOW_SHORTFALL, label:'Running short before payday' }),
    Object.freeze({ intent:INTENTS.MONEY_PRIORITIES, label:'Money priorities' }),
    Object.freeze({ intent:INTENTS.LUMP_SUM_GOAL_TRADEOFFS, label:'Use a lump sum across priorities' }),
    Object.freeze({ intent:INTENTS.BORROWING_HEALTH, label:'Can I take on another payment?' }),
    Object.freeze({ intent:INTENTS.HOME_AFFORDABILITY, label:'How much home can I afford?' }),
    Object.freeze({ intent:INTENTS.DEBT_PAYOFF, label:'How fast can I pay off this debt?' }),
    Object.freeze({ intent:INTENTS.CREDIT_CARD_PAYOFF, label:'How can I pay off this credit card?' }),
    Object.freeze({ intent:INTENTS.RETIREMENT_READINESS, label:'Am I on track for retirement?' }),
    Object.freeze({ intent:INTENTS.RETIREMENT_WITHDRAWAL, label:'How long could my retirement savings last?' }),
    Object.freeze({ intent:INTENTS.GOAL_FUNDING, label:'How much should I save for a goal?' }),
    Object.freeze({ intent:INTENTS.LOAN_COST, label:'What will this loan or EMI cost?' }),
    Object.freeze({ intent:INTENTS.INFLATION_IMPACT, label:'What will inflation do to this amount?' }),
    Object.freeze({ intent:INTENTS.RECURRING_INVESTMENT, label:'How could a monthly investment grow?' })
  ]);

  const finite = value => Number.isFinite(Number(value));
  const number = (value, fallback = 0) => finite(value) ? Number(value) : fallback;
  const nonNegative = (value, fallback = 0) => Math.max(0, number(value, fallback));
  const present = value => value !== undefined && value !== null && value !== '' && (typeof value !== 'number' || Number.isFinite(value));
  const freeze = value => Object.freeze(value);

  function classify(text, router) {
    const value = typeof text === 'string' ? text.trim() : '';
    if (/\b(?:what\s+should\s+i\s+do\s+with|where\s+should\s+i\s+(?:put|use)|how\s+should\s+i\s+(?:use|allocate|split))\b.{0,45}\b(?:lump\s+sum|bonus|inheritance|windfall|extra\s+cash)\b|\b(?:bonus|inheritance|windfall|lump\s+sum|extra\s+cash)\b.{0,55}\b(?:what\s+should\s+i\s+do|pay\s+(?:down|off)\s+debt|emergency|goal|invest|allocate|split)\b/i.test(value)) {
      return freeze({ intent:INTENTS.LUMP_SUM_GOAL_TRADEOFFS, matchedRule:'lump-sum-goal-tradeoffs' });
    }
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

  function questionsFor(intent, facts = {}) {
    const questions = QUESTION_SETS[intent] || [];
    if (intent === INTENTS.RETIREMENT_WITHDRAWAL && facts.retirementWithdrawalMode === 'support') {
      return freeze([
        { key:'retirementWithdrawalBalance', label:'Retirement balance to test' },
        { key:'retirementWithdrawalTargetYears', label:'Years the balance should support withdrawals' },
        { key:'retirementWithdrawalReturnPct', label:'Annual return assumption during retirement' },
        { key:'retirementWithdrawalGrowthPct', label:'Annual withdrawal increase for inflation' },
        { key:'retirementWithdrawalTargetEndingBalance', label:'Target balance to leave at the end' },
        { key:'retirementWithdrawalStartAge', label:'Age when withdrawals start' }
      ].map(q => freeze({ ...q })));
    }
    if (intent !== INTENTS.LUMP_SUM_GOAL_TRADEOFFS) return freeze(questions.map(q => freeze({ ...q })));
    const debtKnown = present(facts.debtBalance);
    const includeDebtDetails = debtKnown && Number(facts.debtBalance) > 0;
    const goalKnown = present(facts.goalTargetAmount);
    const includeGoalDetails = goalKnown && Number(facts.goalTargetAmount) > 0;
    return freeze(questions.filter(q => {
      if (['debtAprPct','debtMonthlyPayment'].includes(q.key)) return includeDebtDetails;
      if (['goalCurrentSavings','goalYearsAway','goalMonthlyContribution'].includes(q.key)) return includeGoalDetails;
      return true;
    }).map(q => freeze({ ...q })));
  }

  function missingQuestions(intent, facts = {}, maxQuestions = 3) {
    const questions = questionsFor(intent, facts);
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
      lumpSumTradeoffs: overrides.lumpSumTradeoffs || root.CarrowmontLumpSumGoalTradeoffs,
      priorityFramework: overrides.priorityFramework || root.CarrowmontFrePriorityFramework,
      goal: overrides.goal || root.CarrowmontGoalCore,
      homeAffordability: overrides.homeAffordability || root.CarrowmontHomeAffordabilityCore,
      creditCard: overrides.creditCard || root.CarrowmontCreditCardPayoffCore,
      retirement: overrides.retirement || root.CarrowmontRetirementCore,
      withdrawal: overrides.withdrawal || root.CarrowmontWithdrawalCore,
      inflation: overrides.inflation || root.CarrowmontInflationCore,
      recurringInvestment: overrides.recurringInvestment || root.CarrowmontSIPCore
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

  function compareDebtVsInvestPaths(debt, monthlySurplus, assumedReturnPct) {
    const debtFirst = debt.avalanche;
    const investFirst = debt.zeroExtra.avalanche;
    const horizonMonths = Math.max(1, investFirst.monthly.length || investFirst.months || 1);
    const totalMonthlyOutflow = Math.max(0, debt.totalMonthlyBudget);
    const monthlyRate = number(assumedReturnPct) / 100 / 12;
    function project(strategy) {
      let investment = 0;
      let previousPaid = 0;
      for (let month = 0; month < horizonMonths; month += 1) {
        const record = strategy.monthly[month] || null;
        const cumulativePaid = record ? record.cumulativePaid : strategy.totalPaid;
        const debtPaid = Math.max(0, cumulativePaid - previousPaid);
        previousPaid = cumulativePaid;
        const contribution = Math.max(0, totalMonthlyOutflow - debtPaid);
        investment = investment * (1 + monthlyRate) + contribution;
      }
      const last = strategy.monthly[Math.min(horizonMonths, strategy.monthly.length) - 1] || null;
      const remainingDebt = last ? Math.max(0, last.closingBalance) : 0;
      return freeze({ investmentValue:investment, remainingDebt, netPosition:investment - remainingDebt });
    }
    const debtPath = project(debtFirst);
    const investPath = project(investFirst);
    return freeze({
      horizonMonths,
      monthlySurplus:nonNegative(monthlySurplus),
      totalMonthlyOutflow,
      assumedReturnPct:number(assumedReturnPct),
      debtFirst:debtPath,
      investFirst:investPath,
      pathDifference:debtPath.netPosition - investPath.netPosition
    });
  }

  function debtVsSavingsJourney(facts, deps, currency) {
    if (!deps.emergency?.calculate || !deps.debtPayoff?.comparePlans || !deps.compound?.calculate) throw new Error('Debt-versus-invest deterministic dependencies are unavailable.');
    const emergencyInput = { essentialExpenses:nonNegative(facts.essentialExpenses), debtPayments:nonNegative(facts.debtMinimumPayment), emergencySavings:nonNegative(facts.emergencySavings), targetMonths:6, monthlyContribution:0 };
    const emergency = deps.emergency.calculate(emergencyInput);
    const debts = [{ id:'focus-debt', label:'Debt', balance:nonNegative(facts.debtBalance), annualRatePct:nonNegative(facts.debtAprPct), minimumPayment:nonNegative(facts.debtMinimumPayment) }];
    const monthlySurplus = nonNegative(facts.monthlySurplus);
    const debt = deps.debtPayoff.comparePlans(debts, monthlySurplus);
    const assumedReturn = number(facts.assumedSavingsReturnPct);
    const comparison = compareDebtVsInvestPaths(debt, monthlySurplus, assumedReturn);
    const horizonYears = comparison.horizonMonths / 12;
    const investmentReferenceState = { principal:0, annualRate:assumedReturn, years:horizonYears, compounding:'monthly', contributionEnabled:true, contribution:monthlySurplus, contributionFrequency:'monthly', contributionTiming:'end', inflationEnabled:false, inflation:0 };
    const investmentReference = deps.compound.calculate(investmentReferenceState);
    const modeledInterestSaved = debt.avalanche.status==='paid_off' && debt.zeroExtra.avalanche.status==='paid_off'
      ? Math.max(0, debt.zeroExtra.avalanche.totalInterest - debt.avalanche.totalInterest) : null;
    const lowBuffer = (emergency.fullLossRunwayMonths || 0) < 1;
    const closeDifference = Math.abs(comparison.pathDifference) <= Math.max(1, Math.abs(comparison.investFirst.netPosition) * 0.005);
    let diagnosis;
    let recommendation;
    if (lowBuffer) {
      diagnosis='Your emergency savings cover less than one month of essential expenses and required debt payments. That liquidity gap matters before committing all extra money to either path.';
      recommendation=freeze({ headline:'Build a first emergency buffer before committing all extra money.', action:'Keep accessible cash for unexpected essential costs, then compare debt repayment with investing again.', rationale:'The emergency-runway calculation shows less than one month of essential commitments covered.' });
    } else if (closeDifference) {
      diagnosis='The two paths finish very close together on the same modeled horizon. Investment returns are uncertain, while debt interest avoided is more predictable.';
      recommendation=freeze({ headline:'The two paths are approximately tied under your assumptions.', action:'Let liquidity, investment risk, taxes and peace of mind guide the choice rather than a small modeled difference.', rationale:'Using the same monthly outflow and the same ending month produces no meaningful modeled advantage.' });
    } else if (comparison.pathDifference > 0) {
      diagnosis='Using the extra money to repay debt first leaves the higher modeled net position on the same ending date. After the debt is cleared, the freed monthly payment is invested for the rest of the comparison period.';
      recommendation=freeze({ headline:'Paying debt faster is the stronger modeled path.', action:'Direct the extra monthly money to debt while preserving the emergency savings you need.', rationale:'On the same cash-flow and time horizon, the debt-first path finishes ahead under the investment return assumption entered.' });
    } else {
      diagnosis='Investing the extra money while continuing the required debt payment leaves the higher modeled net position on the same ending date under the return assumption entered.';
      recommendation=freeze({ headline:'Investing is the stronger modeled path under your return assumption.', action:'Only prefer this path if you accept investment risk and the assumed return is realistic for your horizon.', rationale:'On the same cash-flow and time horizon, the invest-first path finishes ahead in the model. The return is assumed, not guaranteed.' });
    }
    return freeze({
      situation:'Pay debt or invest?', diagnosis, recommendation,
      confidence:freeze({ level:'MEDIUM', basis:'Debt payoff and interest math are deterministic; investment growth uses your return assumption and is not guaranteed.' }),
      whatCouldChangeAnswer:freeze(['A different debt interest rate or required payment.', 'A different realistic after-tax investment return assumption.', 'Taxes, fees, investment volatility or changes in emergency savings and liquidity needs.']),
      importantNumbers:freeze({ currency, emergencyRunwayMonths:emergency.fullLossRunwayMonths, debtAprPct:nonNegative(facts.debtAprPct), assumedInvestmentReturnPct:assumedReturn, comparisonHorizonMonths:comparison.horizonMonths, debtPayoffMonthsWithSurplus:debt.avalanche.months, modeledInterestSaved, debtFirstEndingInvestment:comparison.debtFirst.investmentValue, investFirstEndingInvestment:comparison.investFirst.investmentValue, debtFirstRemainingDebt:comparison.debtFirst.remainingDebt, investFirstRemainingDebt:comparison.investFirst.remainingDebt, debtFirstNetPosition:comparison.debtFirst.netPosition, investFirstNetPosition:comparison.investFirst.netPosition, modeledPathDifference:comparison.pathDifference }),
      alternatives:freeze([
        freeze({ id:'debt-first', label:'Pay debt faster', endingInvestmentValue:comparison.debtFirst.investmentValue, remainingDebt:comparison.debtFirst.remainingDebt, endingNetPosition:comparison.debtFirst.netPosition, payoffMonths:debt.avalanche.months }),
        freeze({ id:'invest-first', label:'Invest the extra money', endingInvestmentValue:comparison.investFirst.investmentValue, remainingDebt:comparison.investFirst.remainingDebt, endingNetPosition:comparison.investFirst.netPosition, payoffMonths:debt.zeroExtra.avalanche.months })
      ]),
      nextSteps:freeze(['Keep enough accessible emergency savings for essential commitments.', 'Treat the investment return as an assumption, not a forecast or guarantee.', 'Use the detailed Debt Payoff and Compound Interest tools for deeper scenario testing.']),
      assumptions:freeze([{ id:'investmentReturnPct', value:assumedReturn, note:'User-entered investment growth assumption; not a forecast.' }, { id:'comparisonHorizonMonths', value:comparison.horizonMonths, note:'Both paths use the same total monthly outflow and the same ending month. Money freed after debt payoff is invested for the remaining months.' }, { id:'emergencyBufferContext', value:6, note:'Six months is shown only as a starting reference here; My Carrowmont can store your own selected emergency-savings target.' }]),
      trace:freeze([engineTrace('emergency-fund-runway', emergencyInput, emergency), engineTrace('debt-payoff', { debts, extraMonthlyPayment:monthlySurplus }, debt), engineTrace('compound-interest', investmentReferenceState, investmentReference)])
    });
  }

  function borrowingHealthJourney(facts, deps, currency) {
    if (!deps.borrowing?.calculate) throw new Error('Borrowing Health deterministic engine is unavailable.');
    const input = {
      grossMonthlyIncome:nonNegative(facts.grossMonthlyIncome),
      takeHomeMonthlyIncome:nonNegative(facts.takeHomeMonthlyIncome),
      essentialNonDebtExpenses:nonNegative(facts.essentialNonDebtExpenses),
      housingDebtPayment:0,
      otherLoanPayments:nonNegative(facts.existingMonthlyDebtPayments),
      creditCardMinimums:0,
      otherDebtPayments:0,
      proposedNewDebtPayment:nonNegative(facts.proposedNewDebtPayment),
      incomeDropPct:nonNegative(facts.incomeDropPct)
    };
    const raw = deps.borrowing.calculate(input);
    if (!raw.ok) return freeze({
      situation:'Borrowing health',
      diagnosis:'Carrowmont needs a positive gross monthly income before it can calculate debt-to-income ratios.',
      recommendation:freeze({ headline:'Add your gross monthly income before judging another payment.', action:'Use the income before tax and deductions, then rerun the borrowing check.', rationale:'Debt-to-income cannot be calculated without gross income.' }),
      confidence:freeze({ level:'LOW', basis:'The required income input is missing or invalid.' }),
      whatCouldChangeAnswer:freeze(['A corrected gross monthly income.', 'A different set of required monthly debt payments.', 'A different proposed new monthly payment.']),
      importantNumbers:freeze({}), alternatives:freeze([]), nextSteps:freeze(raw.warnings || []), assumptions:freeze([]), trace:freeze([engineTrace('debt-to-income-borrowing-health', input, raw)])
    });
    const classification=raw.classification;
    let diagnosis='Carrowmont calculated your current debt load and monthly cash room from the values entered.';
    let recommendation=freeze({ headline:'Your current borrowing picture is measurable, but lender approval is not.', action:'Use the ratios and cash-room figures as a planning check, then compare any new payment against your real monthly buffer.', rationale:'The deterministic engine measures debt burden and cash room; it does not reproduce a lender’s underwriting rules.' });
    if (classification==='CURRENT_DEFICIT') {
      diagnosis='Your current required debt payments and essential non-debt costs are already higher than the take-home income entered.';
      recommendation=freeze({ headline:'Fix the current monthly shortfall before adding another payment.', action:'Protect essentials and required payments first, then reduce the recurring shortfall before taking on new debt.', rationale:'The borrowing-health engine shows negative current monthly cash room.' });
    } else if (classification==='PROPOSED_DEFICIT') {
      diagnosis='Your current month has some room, but the proposed new payment pushes the modeled monthly cash room below zero.';
      recommendation=freeze({ headline:'The proposed payment does not fit the modeled monthly cash room.', action:'Reduce the payment, reduce other commitments, or improve recurring cash room before proceeding.', rationale:'The new payment makes modeled take-home cash room negative.' });
    } else if (classification==='PROPOSED_TIGHTENING') {
      diagnosis='The proposed payment remains inside the modeled month, but it increases debt-to-income and reduces the cash left after essentials and required debt payments.';
      recommendation=freeze({ headline:'The proposed payment fits the modeled month, but it tightens your financial room.', action:'Check whether the remaining cash room and stressed debt ratio still leave enough flexibility for irregular costs and income changes.', rationale:'The engine remains cash-flow positive but shows a higher debt burden after the proposed payment.' });
    }
    const alternatives=[freeze({ id:'current', label:'Current position', monthlyDebtPayments:raw.currentDebtPayments, grossDtiPct:raw.currentGrossDtiPct, cashRoom:raw.currentCashRoom })];
    if (raw.proposedNewDebtPayment>0) alternatives.push(freeze({ id:'proposed', label:'With proposed payment', monthlyDebtPayments:raw.proposedDebtPayments, grossDtiPct:raw.proposedGrossDtiPct, cashRoom:raw.proposedCashRoom, stressedGrossDtiPct:raw.stressedGrossDtiPct }));
    return freeze({
      situation:'Borrowing health', diagnosis, recommendation,
      confidence:freeze({ level:'MEDIUM_HIGH', basis:'Debt ratios and entered cash-flow figures are deterministic. Lender approval, credit scoring, taxes and irregular spending are outside this model.' }),
      whatCouldChangeAnswer:freeze(['A different gross or take-home income.', 'Changes in required debt payments or essential monthly costs.', 'A different proposed payment or income-drop stress assumption.']),
      importantNumbers:freeze({ currency, currentDebtPayments:raw.currentDebtPayments, proposedDebtPayments:raw.proposedDebtPayments, currentGrossDtiPct:raw.currentGrossDtiPct, proposedGrossDtiPct:raw.proposedGrossDtiPct, stressedGrossDtiPct:raw.stressedGrossDtiPct, currentCashRoom:raw.currentCashRoom, proposedCashRoom:raw.proposedCashRoom }),
      alternatives:freeze(alternatives),
      nextSteps:freeze(['Look at both debt-to-income and actual take-home cash room; neither one alone tells the whole story.', 'Do not treat this result as lender approval or a credit decision.', 'Use the detailed Borrowing Health tool if you want to separate housing, loans and credit-card payments.']),
      assumptions:freeze([{ id:'incomeDropPct', value:input.incomeDropPct, note:'Illustrative stress test applied to gross income; this is not a forecast.' }]),
      trace:freeze([engineTrace('debt-to-income-borrowing-health', input, raw)])
    });
  }

  function homeAffordabilityJourney(facts, deps, currency) {
    if (!deps.homeAffordability?.calculate) throw new Error('Home Affordability deterministic engine is unavailable.');
    const enteredRate=nonNegative(facts.homeLoanRatePct);
    const stressRate=Math.min(40, enteredRate + 2);
    const input={
      mode:'budget',
      takeHomeIncome:nonNegative(facts.takeHomeMonthlyIncome),
      essentialSpending:nonNegative(facts.essentialMonthlyExpenses),
      existingDebt:nonNegative(facts.existingMonthlyDebtPayments),
      protectedSavings:nonNegative(facts.protectedMonthlySavings),
      freeBuffer:nonNegative(facts.freeMonthlyBuffer),
      deposit:nonNegative(facts.homeDeposit),
      annualRate:enteredRate,
      termYears:Math.max(1,Math.round(number(facts.homeLoanTermYears))),
      ownershipCosts:nonNegative(facts.monthlyOwnershipCosts),
      higherRateEnabled:true,
      higherRate:stressRate,
      grossAnnualIncome:0
    };
    const raw=deps.homeAffordability.calculate(input);
    if (!raw.ok) return freeze({
      situation:'Home affordability', diagnosis:'Carrowmont needs corrected home-affordability inputs before it can calculate a budget ceiling.',
      recommendation:freeze({ headline:'Review the home-affordability inputs.', action:'Correct the highlighted amount, rate or term in the detailed tool before relying on the result.', rationale:'The deterministic Home Affordability engine rejected one or more inputs.' }),
      confidence:freeze({ level:'LOW', basis:'The deterministic engine could not complete with the entered inputs.' }),
      whatCouldChangeAnswer:freeze(['Corrected income, spending or debt figures.', 'A valid mortgage rate and term.', 'A different deposit or monthly buffer.']),
      importantNumbers:freeze({}), alternatives:freeze([]), nextSteps:freeze((raw.errors||[]).map(x=>x.message||String(x))), assumptions:freeze([]), trace:freeze([engineTrace('home-affordability', input, raw)])
    });
    const base=raw.base;const higher=raw.higherRate;
    const noRoom=base.paymentBudget<=0||base.loanAmount<=0;
    const diagnosis=noRoom
      ? 'After the essential costs, existing debt, protected saving, ownership costs and free-cash buffer entered, the model leaves no room for a principal-and-interest home-loan payment.'
      : 'Carrowmont calculated a home-price budget ceiling from the monthly cash room you chose to preserve, then tested how that ceiling changes if the loan rate is two percentage points higher.';
    const recommendation=noRoom
      ? freeze({ headline:'Your current monthly plan does not leave room for a home-loan payment under the buffer you chose.', action:'Improve monthly cash room, reduce the target commitments, or build the deposit before setting a home-price budget.', rationale:'The Home Affordability engine has no payment budget left after the entered monthly commitments and chosen buffer.' })
      : freeze({ headline:'Use the modeled home price as a planning ceiling, not a lender approval amount.', action:'Keep purchase costs and emergency cash outside the deposit, and compare the base-rate ceiling with the higher-rate stress ceiling before setting a search budget.', rationale:'The calculation preserves the monthly savings and free-cash buffer you entered instead of maximizing borrowing from income alone.' });
    const alternatives=[freeze({ id:'base-rate', label:'Entered rate', annualRatePct:base.annualRate, homePrice:base.homePrice, loanAmount:base.loanAmount, monthlyPayment:base.payment, monthlyLeftover:base.monthlyLeftover })];
    if (higher) alternatives.push(freeze({ id:'higher-rate', label:'Rate + 2 percentage points', annualRatePct:higher.annualRate, homePrice:higher.homePrice, loanAmount:higher.loanAmount, monthlyPayment:higher.payment, monthlyLeftover:higher.monthlyLeftover }));
    return freeze({
      situation:'Home affordability', diagnosis, recommendation,
      confidence:freeze({ level:'MEDIUM_HIGH', basis:'Loan-payment and household-cash-flow math are deterministic. Property taxes, insurance, maintenance, buying costs and lender underwriting vary by household and location.' }),
      whatCouldChangeAnswer:freeze(['A different deposit or interest rate.', 'Changes in essential spending, existing debt, protected saving or the monthly buffer you want to keep.', 'Actual ownership costs, purchase costs or lender underwriting rules.']),
      importantNumbers:freeze({ currency, affordableHomePrice:base.homePrice, loanAmount:base.loanAmount, monthlyPayment:base.payment, allInHousingCost:base.allInHousingCost, monthlyLeftover:base.monthlyLeftover, chosenMonthlyBuffer:raw.cashFlow.chosenBuffer, higherRateHomePrice:higher?.homePrice??null }),
      alternatives:freeze(alternatives),
      nextSteps:freeze(['Treat the result as a household-budget ceiling, not a borrowing approval.', 'Keep emergency savings and expected buying costs separate from the deposit amount entered.', 'Use the detailed Home Affordability tool to test a specific property price and location-specific ownership costs.']),
      assumptions:freeze([{ id:'homeLoanRatePct', value:enteredRate, note:'User-entered loan-rate assumption.' }, { id:'higherRateStressPct', value:stressRate, note:'Carrowmont shows a +2 percentage-point rate stress check for planning sensitivity; it is not a forecast.' }, { id:'homeLoanTermYears', value:input.termYears, note:'User-entered loan term.' }]),
      trace:freeze([engineTrace('home-affordability', input, raw)])
    });
  }

  function debtPayoffJourney(facts, deps, currency) {
    if (!deps.debtPayoff?.comparePlans) throw new Error('Debt Payoff deterministic engine is unavailable.');
    const debt={ id:'focus-debt', label:'Debt', balance:nonNegative(facts.debtBalance), annualRatePct:nonNegative(facts.debtAprPct), minimumPayment:nonNegative(facts.debtMinimumPayment) };
    const extra=nonNegative(facts.extraDebtPayment);
    const raw=deps.debtPayoff.comparePlans([debt],extra);
    const base=raw.zeroExtra.avalanche;const faster=raw.avalanche;
    const basePaid=base.status==='paid_off';const fasterPaid=faster.status==='paid_off';
    const monthsSaved=basePaid&&fasterPaid?Math.max(0,base.months-faster.months):null;
    const interestSaved=basePaid&&fasterPaid?Math.max(0,base.totalInterest-faster.totalInterest):null;
    let diagnosis='Carrowmont compared the required payment with the same debt plus the extra monthly amount entered.';
    let recommendation;
    if (!fasterPaid) {
      diagnosis='Even with the entered extra payment, the model does not clear this debt within the 600-month calculation horizon.';
      recommendation=freeze({ headline:'The entered payment plan is not resolving the debt fast enough in the model.', action:'Increase the monthly payment or use the detailed Debt Payoff tool to review the rate and payment assumptions.', rationale:'The payoff engine remains unresolved within its 600-month guardrail.' });
    } else if (!basePaid && fasterPaid) {
      recommendation=freeze({ headline:'The extra payment changes this debt from unresolved to paid off within the model horizon.', action:'If the extra amount is sustainable, use the accelerated path as the working payoff plan and keep an emergency buffer alongside it.', rationale:'The required-payment-only path does not clear the balance inside the guardrail, while the accelerated path does.' });
    } else if (extra<=0) {
      recommendation=freeze({ headline:'This is your modeled payoff path at the required monthly payment.', action:'Add an extra monthly amount if you want Carrowmont to show the time and interest effect of accelerating repayment.', rationale:'No extra payment was entered, so the result reflects the required-payment path only.' });
    } else {
      recommendation=freeze({ headline:'The extra monthly payment shortens the modeled payoff and reduces interest.', action:'Use the accelerated payment only if it fits your recurring cash flow without draining the emergency buffer you need.', rationale:'Both paths use the same balance and rate; the difference comes only from the extra monthly payment entered.' });
    }
    return freeze({
      situation:'Debt payoff', diagnosis, recommendation,
      confidence:freeze({ level:'HIGH', basis:'The payoff schedule is deterministic from the entered balance, APR and payments. Fees, rate changes, missed payments and new borrowing are not modeled.' }),
      whatCouldChangeAnswer:freeze(['A different interest rate or minimum payment.', 'A different sustainable extra monthly payment.', 'New charges, fees, missed payments or variable-rate changes.']),
      importantNumbers:freeze({ currency, debtBalance:debt.balance, debtAprPct:debt.annualRatePct, requiredMonthlyPayment:debt.minimumPayment, acceleratedMonthlyPayment:debt.minimumPayment+extra, payoffMonthsAtMinimum:basePaid?base.months:null, payoffMonthsWithExtra:fasterPaid?faster.months:null, monthsSaved, modeledInterestSaved:interestSaved }),
      alternatives:freeze([
        freeze({ id:'minimum', label:'Required payment only', monthlyPayment:debt.minimumPayment, payoffMonths:basePaid?base.months:null, totalInterest:base.totalInterest, status:base.status }),
        freeze({ id:'accelerated', label:'Required + extra payment', monthlyPayment:debt.minimumPayment+extra, payoffMonths:fasterPaid?faster.months:null, totalInterest:faster.totalInterest, status:faster.status })
      ]),
      nextSteps:freeze(['Confirm the extra payment is sustainable in your monthly budget.', 'Keep enough accessible emergency savings so debt acceleration does not create a new cash-flow problem.', 'Use the detailed Debt Payoff Calculator when you have multiple debts and want avalanche versus snowball ordering.']),
      assumptions:freeze([]),
      trace:freeze([engineTrace('debt-payoff',{debts:[debt],extraMonthlyPayment:extra},raw)])
    });
  }

  function creditCardPayoffJourney(facts, deps, currency) {
    if (!deps.creditCard?.calculate) throw new Error('Credit Card Payoff deterministic engine is unavailable.');
    const input={ balance:nonNegative(facts.cardBalance), annualRatePct:nonNegative(facts.cardAprPct), minimumPayment:nonNegative(facts.cardMinimumPayment), plannedPayment:nonNegative(facts.cardPlannedPayment), targetMonths:Math.max(0,Math.round(number(facts.cardTargetMonths))) };
    const raw=deps.creditCard.calculate(input);
    if (raw.status!=='ok') return freeze({
      situation:'Credit-card payoff', diagnosis:'Carrowmont needs a positive card balance and minimum payment before it can model payoff paths.',
      recommendation:freeze({ headline:'Review the credit-card inputs.', action:'Enter the current balance, APR and required minimum payment, then rerun the payoff comparison.', rationale:'The deterministic credit-card payoff engine rejected one or more base inputs.' }),
      confidence:freeze({ level:'LOW', basis:'The payoff engine could not complete with the entered inputs.' }),
      whatCouldChangeAnswer:freeze(['A corrected balance.', 'A corrected annual interest rate.', 'A positive minimum monthly payment.']),
      importantNumbers:freeze({}), alternatives:freeze([]), nextSteps:freeze(raw.errors||[]), assumptions:freeze([]), trace:freeze([engineTrace('credit-card-payoff-comparison',input,raw)])
    });
    const minPaid=raw.minimum.status==='paid_off';const plannedPaid=raw.planned.status==='paid_off';
    const targetActive=input.targetMonths>0&&Number.isFinite(raw.targetPayment);
    let recommendation;
    if (raw.warning && !plannedPaid) recommendation=freeze({ headline:'The entered payment may not be high enough to make reliable payoff progress.', action:'Increase the planned payment and review the detailed payoff schedule before relying on the timeline.', rationale:raw.warning });
    else if (targetActive && raw.chosenPayment+0.01<raw.targetPayment) recommendation=freeze({ headline:'Your planned payment is below the modeled payment needed for the payoff target.', action:'Compare the planned payment with the target-payment figure and choose a timeline that fits your cash flow.', rationale:'The target solver requires a higher monthly payment than the amount entered for the selected number of months.' });
    else if (plannedPaid && raw.chosenPayment>input.minimumPayment) recommendation=freeze({ headline:'The higher monthly payment reduces both modeled payoff time and interest.', action:'Use the higher payment only if it remains sustainable alongside essentials and emergency savings.', rationale:'The comparison holds the card balance and APR constant and changes only the monthly payment.' });
    else recommendation=freeze({ headline:'This is the modeled payoff path at your current payment.', action:'Increase the planned payment or add a payoff target if you want to compare a faster path.', rationale:'The planned payment does not materially exceed the minimum payment entered.' });
    const alternatives=[
      freeze({ id:'minimum', label:'Minimum payment path', monthlyPayment:input.minimumPayment, payoffMonths:minPaid?raw.minimum.months:null, totalInterest:raw.minimum.totalInterest, status:raw.minimum.status }),
      freeze({ id:'planned', label:'Planned payment path', monthlyPayment:raw.chosenPayment, payoffMonths:plannedPaid?raw.planned.months:null, totalInterest:raw.planned.totalInterest, status:raw.planned.status })
    ];
    if(targetActive) alternatives.push(freeze({ id:'target', label:`Target: ${input.targetMonths} months`, monthlyPayment:raw.targetPayment, payoffMonths:raw.target?.months??null, totalInterest:raw.target?.totalInterest??null, status:raw.target?.status??null }));
    return freeze({
      situation:'Credit-card payoff', diagnosis:'Carrowmont compared the minimum-payment path with the monthly payment you are considering and, when supplied, the payment needed for your target payoff time.', recommendation,
      confidence:freeze({ level:'HIGH', basis:'The payoff schedule is deterministic from the entered balance, APR and payments. Promotional rates, fees, new purchases and variable-rate changes are not modeled.' }),
      whatCouldChangeAnswer:freeze(['New card purchases or fees.', 'A promotional or variable interest-rate change.', 'A different monthly payment or payoff target.']),
      importantNumbers:freeze({ currency, cardBalance:input.balance, cardAprPct:input.annualRatePct, minimumMonthlyPayment:input.minimumPayment, plannedMonthlyPayment:raw.chosenPayment, minimumPayoffMonths:minPaid?raw.minimum.months:null, plannedPayoffMonths:plannedPaid?raw.planned.months:null, monthsSaved:raw.comparison.monthsSaved, modeledInterestSaved:raw.comparison.interestSaved, targetMonthlyPayment:targetActive?raw.targetPayment:null }),
      alternatives:freeze(alternatives),
      nextSteps:freeze(['Stop adding new balance to the modeled card if you want the payoff timeline to remain meaningful.', 'Choose a payment you can sustain every month rather than relying on an occasional large payment.', 'Use the full Credit Card Payoff tool for the detailed schedule and balance-transfer comparison path.']),
      assumptions:freeze(input.targetMonths>0?[{ id:'cardTargetMonths', value:input.targetMonths, note:'User-entered payoff target; the solver estimates the monthly payment needed to meet it.' }]:[]),
      trace:freeze([engineTrace('credit-card-payoff-comparison',input,raw)])
    });
  }

  function retirementReadinessJourney(facts, deps, currency) {
    if (!deps.retirement?.calculatePlan) throw new Error('Retirement Planner deterministic engine is unavailable.');
    const state={
      mode:'quick',
      currentAge:Math.round(number(facts.retirementCurrentAge)), retirementAge:Math.round(number(facts.retirementTargetAge)), planningAge:Math.round(number(facts.retirementPlanningAge)),
      currentSavings:nonNegative(facts.retirementCurrentSavings), currentMonthlyInvestment:nonNegative(facts.retirementMonthlyContribution),
      payFrequency:'monthly', contributionFrequency:'monthly', sameAsPayCycle:true,
      preReturn:nonNegative(facts.retirementPreReturnPct), postReturn:nonNegative(facts.retirementPostReturnPct), bufferRate:nonNegative(facts.retirementBufferPct),
      quickMonthlyExpense:nonNegative(facts.retirementMonthlyExpense), quickRetirementPct:nonNegative(facts.retirementSpendingPct), quickInflation:nonNegative(facts.retirementInflationPct),
      generalInflation:nonNegative(facts.retirementInflationPct), healthInflation:nonNegative(facts.retirementInflationPct), lifestyleInflation:nonNegative(facts.retirementInflationPct), educationInflation:nonNegative(facts.retirementInflationPct),
      phase1Pct:100, phase2Pct:100, phase3Pct:100, expenses:[], incomes:[], goals:[]
    };
    const raw=deps.retirement.calculatePlan(state);
    if (raw.errors?.length) return freeze({
      situation:'Retirement readiness', diagnosis:'Carrowmont needs corrected retirement ages or spending assumptions before it can model readiness.',
      recommendation:freeze({ headline:'Review the retirement assumptions.', action:'Make sure current age, retirement age, planning age and monthly spending form a valid timeline.', rationale:'The deterministic Retirement Planner rejected one or more inputs.' }),
      confidence:freeze({ level:'LOW', basis:'The retirement engine could not complete with the entered inputs.' }),
      whatCouldChangeAnswer:freeze(['Corrected retirement ages.', 'A positive current monthly spending figure.', 'Different return, inflation or safety-buffer assumptions.']),
      importantNumbers:freeze({}), alternatives:freeze([]), nextSteps:freeze(raw.errors), assumptions:freeze([]), trace:freeze([engineTrace('retirement',state,raw)])
    });
    const funded=raw.fundedPct||0;
    let recommendation;
    if(funded>=100) recommendation=freeze({ headline:'Your current plan reaches the modeled retirement target under the assumptions entered.', action:'Keep reviewing the plan as spending, contributions, returns and retirement timing change.', rationale:'Projected retirement assets meet or exceed the modeled corpus required through the selected planning age.' });
    else if(funded>=80) recommendation=freeze({ headline:'Your current retirement plan is close to the modeled target, but a gap remains.', action:'Review the modelled extra monthly contribution and test whether a slightly later retirement age or higher sustainable contribution closes the gap.', rationale:'Projected assets cover most, but not all, of the modeled retirement target under the entered assumptions.' });
    else recommendation=freeze({ headline:'The model shows a meaningful retirement funding gap under the assumptions entered.', action:'Use the required-contribution figure as a planning signal, then test contribution, retirement-age and spending scenarios in the full Retirement Planner.', rationale:'Projected retirement assets are materially below the modeled corpus required through the selected planning age.' });
    const alternatives=[freeze({ id:'current-plan', label:'Current plan', fundedPct:raw.fundedPct, projectedCorpus:raw.projectedCorpus, requiredCorpus:raw.requiredCorpus, extraMonthlyNeeded:raw.extraMonthlyNeeded })];
    if(state.retirementAge+5<state.planningAge){
      const laterState={...state,retirementAge:state.retirementAge+5};const later=deps.retirement.calculatePlan(laterState);
      if(!later.errors?.length) alternatives.push(freeze({ id:'retire-later', label:`Retire at ${laterState.retirementAge}`, fundedPct:later.fundedPct, projectedCorpus:later.projectedCorpus, requiredCorpus:later.requiredCorpus, extraMonthlyNeeded:later.extraMonthlyNeeded }));
    }
    return freeze({
      situation:'Retirement readiness', diagnosis:'Carrowmont projected your current retirement savings and monthly contributions, then compared them with the modeled amount needed to fund the entered retirement spending through the planning age you selected.', recommendation,
      confidence:freeze({ level:'MEDIUM', basis:'The retirement mathematics are deterministic, but long-term returns, inflation, retirement spending and longevity are assumptions rather than forecasts.' }),
      whatCouldChangeAnswer:freeze(['A different retirement age or planning age.', 'Changes in monthly retirement spending or contributions.', 'Different investment-return, inflation or safety-buffer assumptions.']),
      importantNumbers:freeze({ currency, requiredRetirementCorpus:raw.requiredCorpus, projectedRetirementCorpus:raw.projectedCorpus, retirementFundingPct:raw.fundedPct, retirementGap:raw.gap, modeledMonthlyContributionNeeded:raw.totalMonthlyNeeded, additionalMonthlyContribution:raw.extraMonthlyNeeded, projectedMonthlySpendingAtRetirement:raw.retirementLifestyleFuture, projectedDepletionAge:raw.projectedDepletionAge }),
      alternatives:freeze(alternatives),
      nextSteps:freeze(['Treat return and inflation figures as assumptions, not promises.', 'Use the full Retirement Planner to add retirement income, changing expense categories and one-off goals.', 'Review the plan after major life changes and periodically as actual savings and spending change.']),
      assumptions:freeze([
        { id:'retirementPlanningAge', value:state.planningAge, note:'User-selected age through which the plan is modeled.' },
        { id:'retirementSpendingPct', value:state.quickRetirementPct, note:'Retirement spending is modeled as this percentage of today’s monthly household spending.' },
        { id:'retirementInflationPct', value:state.quickInflation, note:'User-entered inflation assumption.' },
        { id:'retirementPreReturnPct', value:state.preReturn, note:'User-entered annual return assumption before retirement.' },
        { id:'retirementPostReturnPct', value:state.postReturn, note:'User-entered annual return assumption during retirement.' },
        { id:'retirementBufferPct', value:state.bufferRate, note:'User-entered safety buffer added to the modeled corpus.' }
      ]),
      trace:freeze([engineTrace('retirement',state,raw)])
    });
  }

  function retirementWithdrawalJourney(facts, deps, currency) {
    if (!deps.withdrawal?.calculate) throw new Error('Retirement Withdrawal deterministic engine is unavailable.');
    const supportMode=facts.retirementWithdrawalMode==='support';
    const input={
      mode:supportMode?'support':'runway',
      startingBalance:nonNegative(facts.retirementWithdrawalBalance),
      startingWithdrawal:supportMode?0:nonNegative(facts.retirementWithdrawalMonthly),
      annualReturn:number(facts.retirementWithdrawalReturnPct),
      inflationLinked:true,
      withdrawalGrowth:number(facts.retirementWithdrawalGrowthPct),
      timing:'beginning',
      maxMonths:1200,
      startAge:present(facts.retirementWithdrawalStartAge)?number(facts.retirementWithdrawalStartAge):null,
      useAge:false,
      targetMonths:supportMode?Math.max(12,Math.round(number(facts.retirementWithdrawalTargetYears,30)*12)):0,
      targetEndingBalance:supportMode?nonNegative(facts.retirementWithdrawalTargetEndingBalance):0
    };
    const raw=deps.withdrawal.calculate(input);
    if(!raw.ok) return freeze({
      situation:'Retirement withdrawal and drawdown', diagnosis:'Carrowmont needs corrected withdrawal assumptions before it can model the retirement balance.',
      recommendation:freeze({ headline:'Review the retirement-withdrawal assumptions.', action:'Check the starting balance, withdrawal or target horizon, and return assumptions, then rerun the model.', rationale:'The deterministic withdrawal engine rejected one or more inputs.' }),
      confidence:freeze({ level:'LOW', basis:'The retirement-withdrawal engine could not complete with the entered inputs.' }),
      whatCouldChangeAnswer:freeze(['A corrected retirement balance.', 'A different withdrawal or target duration.', 'Different return or inflation assumptions.']),
      importantNumbers:freeze({}), alternatives:freeze([]), nextSteps:freeze(raw.errors||[]), assumptions:freeze([]), trace:freeze([engineTrace('retirement-withdrawal',input,raw)])
    });
    const r=raw.result;
    if(supportMode){
      return freeze({
        situation:'Retirement withdrawal and drawdown', diagnosis:'Carrowmont solved for the modeled starting monthly withdrawal that can support the entered retirement balance for the selected horizon and target ending balance.',
        recommendation:freeze({ headline:'This is the modeled starting withdrawal under the assumptions entered.', action:'Use it as a scenario, not a guaranteed sustainable withdrawal, and stress-test lower returns or higher inflation in the full Drawdown calculator.', rationale:'The deterministic solver finds a starting withdrawal that reaches the selected horizon while aiming for the target ending balance.' }),
        confidence:freeze({ level:'MEDIUM', basis:'The withdrawal mathematics are deterministic, while future investment returns and inflation remain assumptions rather than forecasts.' }),
        whatCouldChangeAnswer:freeze(['A different retirement horizon.', 'A different return or inflation assumption.', 'A different target ending balance or withdrawal timing.']),
        importantNumbers:freeze({ currency, retirementBalance:input.startingBalance, modeledStartingMonthlyWithdrawal:raw.startingWithdrawal, firstYearWithdrawalRate:raw.firstYearWithdrawalRate, targetYears:input.targetMonths/12, targetEndingBalance:input.targetEndingBalance, modeledEndingBalance:r.endingBalance }),
        alternatives:freeze((raw.sensitivity||[]).map(item=>freeze({ id:`return-${item.delta}`, label:`Return ${item.annualReturn.toFixed(1)}%`, startingMonthlyWithdrawal:item.startingWithdrawal, endingBalance:item.result?.endingBalance??null }))),
        nextSteps:freeze(['Review a lower-return sensitivity before relying on the central illustration.', 'Use the full SWP (Systematic Withdrawal Plan) / Drawdown calculator to change withdrawal timing, horizon and target ending balance.', 'Revisit the plan as actual spending, inflation and portfolio values change.']),
        assumptions:freeze([{id:'retirementWithdrawalReturnPct',value:input.annualReturn,note:'User-entered annual return assumption; not a forecast.'},{id:'retirementWithdrawalGrowthPct',value:input.withdrawalGrowth,note:'Annual withdrawal increase used as an inflation-linked spending assumption.'}]),
        trace:freeze([engineTrace('retirement-withdrawal',input,raw)])
      });
    }
    const months=r.depleted?r.depletionMonth:r.horizonMonths;
    const depletionAge=Number.isFinite(Number(input.startAge))?input.startAge+months/12:null;
    return freeze({
      situation:'Retirement withdrawal and drawdown', diagnosis:r.depleted?'Under the entered withdrawal, return and inflation assumptions, the modeled retirement balance eventually reaches zero.':'The modeled retirement balance remains above zero through the 100-year maximum test horizon under the assumptions entered.',
      recommendation:r.depleted
        ? freeze({ headline:'The model gives you a retirement-savings runway, not a guarantee.', action:'Compare the runway with the retirement years you want to cover and test lower-return or higher-inflation scenarios before relying on it.', rationale:'The deterministic drawdown engine applies the entered withdrawal and annual withdrawal increase month by month until depletion.' })
        : freeze({ headline:'The balance survives the model horizon under the assumptions entered.', action:'Still stress-test lower returns, higher inflation and larger withdrawals rather than treating survival through the horizon as “forever”.', rationale:'The deterministic model did not deplete the balance within its 100-year maximum horizon.' }),
      confidence:freeze({ level:'MEDIUM', basis:'The withdrawal path is deterministic from the entered assumptions. Actual market returns, inflation, taxes, fees and spending can differ.' }),
      whatCouldChangeAnswer:freeze(['A different starting monthly withdrawal.', 'A different return or inflation assumption.', 'Taxes, fees, irregular withdrawals or changes in retirement spending.']),
      importantNumbers:freeze({ currency, retirementBalance:input.startingBalance, startingMonthlyWithdrawal:input.startingWithdrawal, modeledRunwayMonths:months, modeledDepletionAge:depletionAge, firstYearWithdrawalRate:r.firstYearWithdrawalRate, totalModeledWithdrawals:r.totalWithdrawals, modeledEndingBalance:r.endingBalance }),
      alternatives:freeze((raw.sensitivity||[]).map(item=>freeze({ id:`return-${item.delta}`, label:`Return ${item.annualReturn.toFixed(1)}%`, runwayMonths:item.result?.depleted?item.result.depletionMonth:item.result?.horizonMonths??null, endingBalance:item.result?.endingBalance??null }))),
      nextSteps:freeze(['Compare the modeled runway with the retirement period you need to cover.', 'Use the full SWP (Systematic Withdrawal Plan) / Drawdown calculator for target-duration and withdrawal-support scenarios.', 'Revisit the assumptions periodically as actual spending and investment returns change.']),
      assumptions:freeze([{id:'retirementWithdrawalReturnPct',value:input.annualReturn,note:'User-entered annual return assumption; not a forecast.'},{id:'retirementWithdrawalGrowthPct',value:input.withdrawalGrowth,note:'Annual withdrawal increase used as an inflation-linked spending assumption.'}]),
      trace:freeze([engineTrace('retirement-withdrawal',input,raw)])
    });
  }

  function loanCostJourney(facts, deps, currency) {
    if (!deps.loan?.calculate) throw new Error('Loan deterministic engine is unavailable.');
    const months=Math.max(1,Math.round(number(facts.loanTermMonths)));
    const input={ mode:'payment', principal:nonNegative(facts.loanPrincipal), annualRate:nonNegative(facts.loanRatePct), termYears:Math.floor(months/12), termMonths:months%12, firstPaymentDate:'', fixedFee:0, percentageFee:0, extraMonthly:0, oneTimeExtra:0, oneTimeMonth:1 };
    const raw=deps.loan.calculate(input);
    if(!raw.ok) return freeze({ situation:'Loan / EMI (Equated Monthly Instalment) cost', diagnosis:'Carrowmont needs corrected loan amount, rate or term before it can model the repayment.', recommendation:freeze({headline:'Review the loan inputs.',action:'Enter a positive loan amount, a valid annual interest rate and a loan term between 1 and 600 months.',rationale:'The deterministic loan engine rejected one or more inputs.'}), confidence:freeze({level:'LOW',basis:'The loan engine could not complete with the entered inputs.'}), whatCouldChangeAnswer:freeze(['A corrected loan amount.','A corrected annual interest rate.','A different loan term.']), importantNumbers:freeze({}), alternatives:freeze([]), nextSteps:freeze(raw.errors||[]), assumptions:freeze([]), trace:freeze([engineTrace('loan',input,raw)]) });
    return freeze({
      situation:'Loan / EMI (Equated Monthly Instalment) cost', diagnosis:'Carrowmont amortized the entered loan amount across the selected term at the entered annual interest rate.',
      recommendation:freeze({headline:'Use the monthly payment together with total interest—not the payment alone—to judge the borrowing cost.',action:'Compare a shorter or longer term in the full Loan / EMI calculator if you want to trade monthly affordability against total interest.',rationale:'A longer term can reduce the monthly payment while increasing the number of interest-bearing months.'}),
      confidence:freeze({level:'HIGH',basis:'The amortization schedule is deterministic from the entered loan amount, interest rate and term. Fees, changing rates and lender-specific rules are not included unless modeled separately.'}),
      whatCouldChangeAnswer:freeze(['A different interest rate.','A shorter or longer loan term.','Fees, insurance or lender-specific charges not included in this Ask journey.']),
      importantNumbers:freeze({currency,loanAmount:raw.principal,monthlyPayment:raw.scheduledPayment,totalInterest:raw.totalInterest,totalRepayment:raw.totalRepayment,interestSharePct:raw.interestShare*100,payoffMonths:raw.payoffMonths}),
      alternatives:freeze([]), nextSteps:freeze(['Compare at least one shorter-term scenario if the monthly payment remains manageable.','Use the full Loan / EMI (Equated Monthly Instalment) calculator for fees, extra payments and a detailed amortization schedule.']), assumptions:freeze([]), trace:freeze([engineTrace('loan',input,raw)])
    });
  }

  function inflationImpactJourney(facts, deps, currency) {
    if (!deps.inflation?.calculate) throw new Error('Inflation deterministic engine is unavailable.');
    const input={ amount:nonNegative(facts.inflationAmount), years:Math.max(1,number(facts.inflationYears)), rate:nonNegative(facts.inflationRatePct) };
    const raw=deps.inflation.calculate(input);
    return freeze({
      situation:'Inflation impact', diagnosis:'Carrowmont compounded the entered inflation assumption over the selected period to show both future cost and purchasing-power loss.',
      recommendation:freeze({headline:'Inflation means the same nominal amount may buy less in the future.',action:'Use the future-cost figure when planning a goal stated in today’s money, and treat the inflation rate as an assumption rather than a forecast.',rationale:'The deterministic calculation applies the entered annual inflation rate consistently over the selected number of years.'}),
      confidence:freeze({level:'HIGH',basis:'The mathematics are deterministic. The future inflation rate itself is an assumption and actual inflation can vary year by year.'}),
      whatCouldChangeAnswer:freeze(['A different inflation assumption.','A different time horizon.','A different amount or expense being tested.']),
      importantNumbers:freeze({currency,amountToday:input.amount,futureCost:raw.future,presentEquivalentOfSameNominalAmount:raw.sameNominalToday,cumulativeInflationPct:raw.increase,purchasingPowerRemainingPct:raw.remaining,purchasingPowerLossPct:raw.loss}),
      alternatives:freeze([{id:'lower',label:`Inflation ${raw.lowRate.toFixed(1)}%`,futureCost:raw.lowFuture},{id:'higher',label:`Inflation ${raw.highRate.toFixed(1)}%`,futureCost:raw.highFuture}]),
      nextSteps:freeze(['Use the full Inflation calculator to test alternative rates and purchasing-power scenarios.','For a specific goal, feed the inflation-adjusted cost into the Goal Planner rather than treating today’s price as fixed.']), assumptions:freeze([{id:'inflationRatePct',value:input.rate,note:'User-entered annual inflation assumption; not a forecast.'}]), trace:freeze([engineTrace('inflation',input,raw)])
    });
  }

  function recurringInvestmentJourney(facts, deps, currency) {
    if (!deps.recurringInvestment?.result) throw new Error('Recurring Investment deterministic engine is unavailable.');
    const input={ mode:'growth', years:Math.max(1,number(facts.recurringYears)), currentSavings:nonNegative(facts.recurringCurrentSavings), monthlySIP:nonNegative(facts.recurringContribution), contributionFrequency:'monthly', annualReturn:nonNegative(facts.recurringReturnPct), annualStepUp:0, goalToday:0, goalBasis:'today', goalFuture:0, targetAmount:0, inflation:0 };
    const raw=deps.recurringInvestment.result(input);
    const p=raw.projection;
    return freeze({
      situation:'Recurring investment / SIP (Systematic Investment Plan) growth', diagnosis:'Carrowmont projected the current amount and monthly contributions over the selected period using the entered annual return assumption.',
      recommendation:freeze({headline:'This is a growth illustration, not a return forecast.',action:'Use it to understand how contribution size and time affect the projection, then test a goal-based scenario if you have a specific target.',rationale:'The deterministic recurring-investment engine compounds the entered contribution schedule under one user-chosen return assumption.'}),
      confidence:freeze({level:'MEDIUM_HIGH',basis:'The contribution mathematics are deterministic. Investment returns are uncertain and can be negative in real markets.'}),
      whatCouldChangeAnswer:freeze(['A different monthly contribution.','A different investment period.','A different return assumption or contribution frequency.']),
      importantNumbers:freeze({currency,currentAmount:input.currentSavings,monthlyInvestment:input.monthlySIP,investmentYears:input.years,projectedValue:p.portfolio,totalInvested:p.totalInvested,projectedGrowth:p.growth}),
      alternatives:freeze([]), nextSteps:freeze(['Treat the return assumption as an illustration, not a promise.','Use the full SIP (Systematic Investment Plan) / Recurring Investment calculator for contribution-frequency, step-up and goal-based scenarios.']), assumptions:freeze([{id:'recurringReturnPct',value:input.annualReturn,note:'User-entered annual return assumption; not a forecast.'}]), trace:freeze([engineTrace('recurring-investment',input,raw)])
    });
  }

  function goalFundingJourney(facts, deps, currency) {
    if (!deps.goal?.calculate) throw new Error('Goal Planner deterministic engine is unavailable.');
    const state={
      today:nonNegative(facts.goalTargetAmount),
      inflation:nonNegative(facts.goalInflationPct)/100,
      years:Math.max(1,Math.round(number(facts.goalYearsAway))),
      existing:nonNegative(facts.goalCurrentSavings),
      ret:nonNegative(facts.goalReturnPct)/100,
      monthly:nonNegative(facts.goalMonthlyContribution),
      contributionFrequency:'monthly', futureLump:0, futureLumpYear:0
    };
    const raw=deps.goal.calculate(state);
    const funded=raw.funding||0;
    const recommendation=funded>=1
      ? freeze({ headline:'Your current saving path reaches the modeled goal under the assumptions entered.', action:'Keep the contribution on track and review the goal if the target cost, timing or return assumption changes.', rationale:'Projected savings meet or exceed the inflation-adjusted future goal cost in the deterministic Goal Planner.' })
      : freeze({ headline:'Your current saving path leaves a modeled gap.', action:'Compare the modelled monthly amount required with what your budget can sustainably support, or revisit the goal amount or timeline.', rationale:'Projected savings are below the inflation-adjusted future goal cost under the entered return and inflation assumptions.' });
    return freeze({
      situation:'Goal funding', diagnosis:'Carrowmont inflated the goal amount from today’s money to the target date, projected the savings already set aside and the monthly contributions, then measured the remaining gap.', recommendation,
      confidence:freeze({ level:'MEDIUM_HIGH', basis:'The savings mathematics are deterministic. The investment return and future inflation rate are assumptions and actual outcomes can differ.' }),
      whatCouldChangeAnswer:freeze(['A different goal amount or target date.', 'A different monthly contribution or amount already saved.', 'Different inflation or investment-return assumptions.']),
      importantNumbers:freeze({ currency, goalAmountToday:state.today, futureGoalCost:raw.futureCost, projectedGoalSavings:raw.projected, goalGap:raw.gap, modeledMonthlyContributionRequired:raw.monthlyRequired, additionalMonthlyContribution:raw.additional, goalFundingPct:raw.funding*100 }),
      alternatives:freeze([
        freeze({ id:'current', label:'Current monthly contribution', monthlyContribution:state.monthly, projectedValue:raw.projected, fundingPct:raw.funding*100 }),
        freeze({ id:'required', label:'Modeled contribution to reach goal', monthlyContribution:raw.monthlyRequired, projectedValue:raw.futureCost, fundingPct:100 })
      ]),
      nextSteps:freeze(['Confirm whether the goal amount is stated in today’s money; Carrowmont adjusts it using the inflation assumption entered.', 'Choose a monthly contribution your budget can sustain rather than relying on the modelled requirement alone.', 'Use the full Goal Planner to test a future lump sum or a different contribution frequency.']),
      assumptions:freeze([{ id:'goalReturnPct', value:nonNegative(facts.goalReturnPct), note:'User-entered annual return assumption; not a forecast.' }, { id:'goalInflationPct', value:nonNegative(facts.goalInflationPct), note:'User-entered annual inflation assumption for the future goal cost.' }]),
      trace:freeze([engineTrace('goal-planner',state,raw)])
    });
  }

  function moneyPrioritiesJourney(facts, deps, currency) {
    if (!deps.moneyPriorities?.create) throw new Error('Money Priorities deterministic rule engine is unavailable.');
    const priorities = deps.moneyPriorities.create({ budget:deps.budget, emergency:deps.emergency, goal:deps.goal, priority:deps.priorityFramework });
    return priorities.evaluate(facts, { currency });
  }

  function lumpSumGoalTradeoffsJourney(facts, deps, currency) {
    if (!deps.lumpSumTradeoffs?.create) throw new Error('Lump-sum trade-off deterministic engine is unavailable.');
    const engine = deps.lumpSumTradeoffs.create({ emergency:deps.emergency, debtPayoff:deps.debtPayoff, goal:deps.goal, compound:deps.compound });
    return engine.evaluate(facts, { currency });
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
      else if (intent === INTENTS.LUMP_SUM_GOAL_TRADEOFFS) result = lumpSumGoalTradeoffsJourney(facts, deps, input.currency);
      else if (intent === INTENTS.BORROWING_HEALTH) result = borrowingHealthJourney(facts, deps, input.currency);
      else if (intent === INTENTS.HOME_AFFORDABILITY) result = homeAffordabilityJourney(facts, deps, input.currency);
      else if (intent === INTENTS.DEBT_PAYOFF) result = debtPayoffJourney(facts, deps, input.currency);
      else if (intent === INTENTS.CREDIT_CARD_PAYOFF) result = creditCardPayoffJourney(facts, deps, input.currency);
      else if (intent === INTENTS.RETIREMENT_READINESS) result = retirementReadinessJourney(facts, deps, input.currency);
      else if (intent === INTENTS.RETIREMENT_WITHDRAWAL) result = retirementWithdrawalJourney(facts, deps, input.currency);
      else if (intent === INTENTS.GOAL_FUNDING) result = goalFundingJourney(facts, deps, input.currency);
      else if (intent === INTENTS.LOAN_COST) result = loanCostJourney(facts, deps, input.currency);
      else if (intent === INTENTS.INFLATION_IMPACT) result = inflationImpactJourney(facts, deps, input.currency);
      else if (intent === INTENTS.RECURRING_INVESTMENT) result = recurringInvestmentJourney(facts, deps, input.currency);
      else result = debtVsSavingsJourney(facts, deps, input.currency);
      return freeze({ version:VERSION, status:'RESOLVED', intent, ...result });
    }
    return freeze({ VERSION, INTENTS, SUPPORTED, QUESTION_SETS, questionsFor, classify:text => classify(text, deps.router), missingQuestions, resolve });
  }

  return freeze({ VERSION, INTENTS, SUPPORTED, QUESTION_SETS, questionsFor, create, classify, missingQuestions });
});
