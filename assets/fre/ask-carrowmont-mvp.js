(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontAskMvp = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const VERSION = 'ask-carrowmont-mvp-v1.0';
  const INTENTS = Object.freeze({
    DEBT_VS_SAVINGS:'debt-vs-savings',
    CAR_AFFORDABILITY:'car-affordability',
    MORTGAGE_PREPAY_VS_INVEST:'mortgage-prepay-vs-invest',
    EMERGENCY_RUNWAY:'emergency-runway',
    CASH_FLOW_SHORTFALL:'cash-flow-shortfall'
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
    ])
  });

  const SUPPORTED = Object.freeze([
    Object.freeze({ intent:INTENTS.DEBT_VS_SAVINGS, label:'Debt or savings' }),
    Object.freeze({ intent:INTENTS.CAR_AFFORDABILITY, label:'Car affordability' }),
    Object.freeze({ intent:INTENTS.MORTGAGE_PREPAY_VS_INVEST, label:'Mortgage prepay or invest' }),
    Object.freeze({ intent:INTENTS.EMERGENCY_RUNWAY, label:'Emergency fund adequacy' }),
    Object.freeze({ intent:INTENTS.CASH_FLOW_SHORTFALL, label:'Running short before payday' })
  ]);

  const finite = value => Number.isFinite(Number(value));
  const number = (value, fallback = 0) => finite(value) ? Number(value) : fallback;
  const nonNegative = (value, fallback = 0) => Math.max(0, number(value, fallback));
  const present = value => value !== undefined && value !== null && value !== '' && (typeof value !== 'number' || Number.isFinite(value));
  const freeze = value => Object.freeze(value);

  function classify(text, router) {
    const value = typeof text === 'string' ? text.trim() : '';
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
      mortgagePrepay: overrides.mortgagePrepay || root.CarrowmontMdc1aCore
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
    return freeze({
      situation:'Emergency fund adequacy', diagnosis,
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
    return freeze({
      situation:'Running short before payday', diagnosis,
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
    return freeze({
      situation:'Car affordability', diagnosis:map[raw.classification] || 'Carrowmont modeled the purchase using household cash room, debt load and emergency runway.',
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
    return freeze({
      situation:'Mortgage prepay or invest', diagnosis,
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
    return freeze({
      situation:'Debt or savings', diagnosis,
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
      else result = debtVsSavingsJourney(facts, deps, input.currency);
      return freeze({ version:VERSION, status:'RESOLVED', intent, ...result });
    }
    return freeze({ VERSION, INTENTS, SUPPORTED, QUESTION_SETS, classify:text => classify(text, deps.router), missingQuestions, resolve });
  }

  return freeze({ VERSION, INTENTS, SUPPORTED, QUESTION_SETS, create, classify, missingQuestions });
});
