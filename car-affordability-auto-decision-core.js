(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontCarAffordabilityCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = 'car-affordability-auto-decision-v1.0';
  const num = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
  const round = (value, digits = 8) => {
    if (!Number.isFinite(value)) return value;
    const factor = 10 ** digits;
    return Math.round((value + Number.EPSILON) * factor) / factor;
  };
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function normalize(input = {}) {
    return Object.freeze({
      vehiclePrice: Math.max(0, num(input.vehiclePrice)),
      downPayment: Math.max(0, num(input.downPayment)),
      tradeInCredit: Math.max(0, num(input.tradeInCredit)),
      upfrontTaxesFees: Math.max(0, num(input.upfrontTaxesFees)),
      annualRate: clamp(num(input.annualRate, 8), 0, 60),
      termMonths: Math.trunc(clamp(num(input.termMonths, 60), 1, 600)),
      grossMonthlyIncome: Math.max(0, num(input.grossMonthlyIncome)),
      takeHomeMonthlyIncome: Math.max(0, num(input.takeHomeMonthlyIncome)),
      essentialMonthlyExpenses: Math.max(0, num(input.essentialMonthlyExpenses)),
      existingMonthlyDebtPayments: Math.max(0, num(input.existingMonthlyDebtPayments)),
      monthlyRunningCosts: Math.max(0, num(input.monthlyRunningCosts)),
      emergencySavings: Math.max(0, num(input.emergencySavings)),
      emergencySavingsUsedForPurchase: Math.max(0, num(input.emergencySavingsUsedForPurchase)),
      emergencyTargetMonths: clamp(num(input.emergencyTargetMonths, 6), 1, 24),
      rateStressIncreasePctPoints: clamp(num(input.rateStressIncreasePctPoints, 2), 0, 20),
      runningCostStressPct: clamp(num(input.runningCostStressPct, 20), 0, 200),
      alternativeVehiclePrice: Math.max(0, num(input.alternativeVehiclePrice)),
      extraDownPaymentScenario: Math.max(0, num(input.extraDownPaymentScenario)),
      longerTermMonthsScenario: Math.trunc(Math.max(0, num(input.longerTermMonthsScenario)))
    });
  }

  function resolveEngines(overrides = {}) {
    const loan = overrides.loan;
    const borrowing = overrides.borrowingHealth;
    const emergency = overrides.emergencyFund;
    if (!loan || typeof loan.paymentForPrincipal !== 'function' || typeof loan.calculate !== 'function') throw new Error('Missing deterministic Loan / EMI engine.');
    if (!borrowing || typeof borrowing.calculate !== 'function') throw new Error('Missing deterministic Borrowing Health engine.');
    if (!emergency || typeof emergency.calculate !== 'function') throw new Error('Missing deterministic Emergency Fund engine.');
    return { loan, borrowing, emergency };
  }

  function loanScenario(principal, annualRate, termMonths, loan) {
    if (principal <= 0) return Object.freeze({ principal:0, monthlyPayment:0, totalInterest:0, totalRepayment:0, termMonths, annualRate });
    const result = loan.calculate({ mode:'payment', principal, annualRate, termYears:Math.floor(termMonths / 12), termMonths:termMonths % 12, fixedFee:0, percentageFee:0, extraMonthly:0, oneTimeExtra:0 });
    if (!result?.ok) return Object.freeze({ principal, monthlyPayment:null, totalInterest:null, totalRepayment:null, termMonths, annualRate, errors:result?.errors || ['Loan calculation failed.'] });
    return Object.freeze({ principal:round(result.principal,2), monthlyPayment:round(result.scheduledPayment,2), totalInterest:round(result.totalInterest,2), totalRepayment:round(result.totalRepayment,2), termMonths, annualRate });
  }

  function makePurchaseScenario({ vehiclePrice, downPayment, tradeInCredit, annualRate, termMonths }, engines) {
    const principal = Math.max(0, vehiclePrice - downPayment - tradeInCredit);
    return loanScenario(principal, annualRate, termMonths, engines.loan);
  }

  function calculate(input = {}, overrides = {}) {
    const a = normalize(input);
    const engines = resolveEngines(overrides);
    const errors = [];
    const warnings = [];

    if (a.vehiclePrice <= 0) errors.push('Enter a vehicle price greater than zero.');
    if (a.takeHomeMonthlyIncome <= 0) errors.push('Enter take-home monthly income to calculate household cash room.');
    if (a.downPayment + a.tradeInCredit > a.vehiclePrice + 1e-8) errors.push('Down payment plus trade-in credit cannot exceed the vehicle price.');
    const upfrontCashRequired = a.downPayment + a.upfrontTaxesFees;
    if (a.emergencySavingsUsedForPurchase > upfrontCashRequired + 1e-8) errors.push('Emergency savings used for the purchase cannot exceed the modeled upfront cash requirement.');
    if (a.emergencySavingsUsedForPurchase > a.emergencySavings + 1e-8) errors.push('Emergency savings used for the purchase cannot exceed the emergency savings entered.');
    if (errors.length) return Object.freeze({ ok:false, methodologyVersion:VERSION, assumptions:a, errors:Object.freeze(errors), warnings:Object.freeze(warnings), classification:'NEEDS_INPUT' });

    const purchaseLoan = makePurchaseScenario(a, engines);
    if (purchaseLoan.monthlyPayment == null) return Object.freeze({ ok:false, methodologyVersion:VERSION, assumptions:a, errors:Object.freeze(purchaseLoan.errors || ['Loan calculation failed.']), warnings:Object.freeze(warnings), classification:'LOAN_CALCULATION_ERROR' });

    const currentBorrowing = engines.borrowing.calculate({
      grossMonthlyIncome:a.grossMonthlyIncome,
      takeHomeMonthlyIncome:a.takeHomeMonthlyIncome,
      essentialNonDebtExpenses:a.essentialMonthlyExpenses,
      otherLoanPayments:a.existingMonthlyDebtPayments,
      proposedNewDebtPayment:0,
      incomeDropPct:0
    });
    const afterBorrowing = engines.borrowing.calculate({
      grossMonthlyIncome:a.grossMonthlyIncome,
      takeHomeMonthlyIncome:a.takeHomeMonthlyIncome,
      essentialNonDebtExpenses:a.essentialMonthlyExpenses + a.monthlyRunningCosts,
      otherLoanPayments:a.existingMonthlyDebtPayments,
      proposedNewDebtPayment:purchaseLoan.monthlyPayment,
      incomeDropPct:0
    });

    const stressedRate = clamp(a.annualRate + a.rateStressIncreasePctPoints, 0, 60);
    const stressedLoan = makePurchaseScenario({ ...a, annualRate:stressedRate }, engines);
    const stressedRunningCosts = a.monthlyRunningCosts * (1 + a.runningCostStressPct / 100);
    const stressBorrowing = engines.borrowing.calculate({
      grossMonthlyIncome:a.grossMonthlyIncome,
      takeHomeMonthlyIncome:a.takeHomeMonthlyIncome,
      essentialNonDebtExpenses:a.essentialMonthlyExpenses + stressedRunningCosts,
      otherLoanPayments:a.existingMonthlyDebtPayments,
      proposedNewDebtPayment:stressedLoan.monthlyPayment || 0,
      incomeDropPct:0
    });

    const reserveAfterPurchase = Math.max(0, a.emergencySavings - a.emergencySavingsUsedForPurchase);
    const currentEmergency = engines.emergency.calculate({
      essentialExpenses:a.essentialMonthlyExpenses,
      debtPayments:a.existingMonthlyDebtPayments,
      emergencySavings:a.emergencySavings,
      targetMonths:a.emergencyTargetMonths,
      monthlyContribution:0
    });
    const afterEmergency = engines.emergency.calculate({
      essentialExpenses:a.essentialMonthlyExpenses + a.monthlyRunningCosts,
      debtPayments:a.existingMonthlyDebtPayments + purchaseLoan.monthlyPayment,
      emergencySavings:reserveAfterPurchase,
      targetMonths:a.emergencyTargetMonths,
      monthlyContribution:0
    });

    const allInMonthlyCarCost = purchaseLoan.monthlyPayment + a.monthlyRunningCosts;
    const stressedAllInMonthlyCarCost = (stressedLoan.monthlyPayment || 0) + stressedRunningCosts;
    const currentCashRoom = a.takeHomeMonthlyIncome - a.essentialMonthlyExpenses - a.existingMonthlyDebtPayments;
    const afterCashRoom = currentCashRoom - allInMonthlyCarCost;
    const stressCashRoom = currentCashRoom - stressedAllInMonthlyCarCost;
    const upfrontCashAfterTrade = upfrontCashRequired;

    if (a.grossMonthlyIncome <= 0) warnings.push('Gross income is optional, but without it Carrowmont cannot show debt-to-income ratios.');
    if (a.monthlyRunningCosts <= 0) warnings.push('Monthly running costs are zero. Add insurance, fuel/charging, maintenance, parking and other expected costs for a fuller affordability view.');
    if (a.emergencySavings <= 0) warnings.push('Emergency savings are zero, so post-purchase runway cannot show a protected cash buffer.');
    if (a.emergencySavingsUsedForPurchase > 0) warnings.push('The post-purchase runway reflects the emergency savings amount you chose to use toward upfront purchase cash.');
    if (a.tradeInCredit > 0) warnings.push('Trade-in value is treated as purchase credit only; any loan balance still owed on the traded vehicle is not modeled.');

    const comparisons = [];
    if (a.alternativeVehiclePrice > 0 && a.alternativeVehiclePrice < a.vehiclePrice) {
      const s = makePurchaseScenario({ ...a, vehiclePrice:a.alternativeVehiclePrice }, engines);
      comparisons.push(Object.freeze({ id:'lower-price', label:'Lower vehicle price', vehiclePrice:a.alternativeVehiclePrice, monthlyPayment:s.monthlyPayment, totalInterest:s.totalInterest, monthlyPaymentDifference:round(s.monthlyPayment - purchaseLoan.monthlyPayment,2), totalInterestDifference:round(s.totalInterest - purchaseLoan.totalInterest,2) }));
    }
    if (a.extraDownPaymentScenario > 0) {
      const scenarioDown = Math.min(a.vehiclePrice - a.tradeInCredit, a.downPayment + a.extraDownPaymentScenario);
      const s = makePurchaseScenario({ ...a, downPayment:scenarioDown }, engines);
      comparisons.push(Object.freeze({ id:'more-down', label:'Larger down payment', downPayment:scenarioDown, monthlyPayment:s.monthlyPayment, totalInterest:s.totalInterest, extraUpfrontCash:round(scenarioDown - a.downPayment,2), monthlyPaymentDifference:round(s.monthlyPayment - purchaseLoan.monthlyPayment,2), totalInterestDifference:round(s.totalInterest - purchaseLoan.totalInterest,2) }));
    }
    if (a.longerTermMonthsScenario > a.termMonths && a.longerTermMonthsScenario <= 600) {
      const s = makePurchaseScenario({ ...a, termMonths:a.longerTermMonthsScenario }, engines);
      comparisons.push(Object.freeze({ id:'longer-term', label:'Longer loan term', termMonths:a.longerTermMonthsScenario, monthlyPayment:s.monthlyPayment, totalInterest:s.totalInterest, monthlyPaymentDifference:round(s.monthlyPayment - purchaseLoan.monthlyPayment,2), totalInterestDifference:round(s.totalInterest - purchaseLoan.totalInterest,2) }));
    }

    let classification = 'MODELED_PURCHASE';
    if (afterCashRoom < 0) classification = 'MONTHLY_SHORTFALL';
    else if (stressCashRoom < 0) classification = 'STRESS_SHORTFALL';
    else if (afterEmergency.ok && afterEmergency.fullLossRunwayMonths < a.emergencyTargetMonths) classification = 'BELOW_CHOSEN_RUNWAY_TARGET';
    else if (a.emergencySavingsUsedForPurchase > 0) classification = 'BUFFER_REDUCED';
    else classification = 'CASH_ROOM_REMAINS';

    return Object.freeze({
      ok:true,
      methodologyVersion:VERSION,
      assumptions:a,
      vehiclePrice:round(a.vehiclePrice,2),
      upfrontCashRequired:round(upfrontCashAfterTrade,2),
      loanAmount:purchaseLoan.principal,
      monthlyLoanPayment:purchaseLoan.monthlyPayment,
      loanTotalInterest:purchaseLoan.totalInterest,
      loanTotalRepayment:purchaseLoan.totalRepayment,
      monthlyRunningCosts:round(a.monthlyRunningCosts,2),
      allInMonthlyCarCost:round(allInMonthlyCarCost,2),
      currentCashRoom:round(currentCashRoom,2),
      afterCashRoom:round(afterCashRoom,2),
      stressedRate:round(stressedRate,4),
      stressedLoanPayment:round(stressedLoan.monthlyPayment || 0,2),
      stressedRunningCosts:round(stressedRunningCosts,2),
      stressedAllInMonthlyCarCost:round(stressedAllInMonthlyCarCost,2),
      stressCashRoom:round(stressCashRoom,2),
      currentGrossDtiPct:currentBorrowing.currentGrossDtiPct,
      afterGrossDtiPct:afterBorrowing.proposedGrossDtiPct,
      reserveAfterPurchase:round(reserveAfterPurchase,2),
      runwayBeforeMonths:currentEmergency.fullLossRunwayMonths,
      runwayAfterMonths:afterEmergency.fullLossRunwayMonths,
      runwayTargetMonths:a.emergencyTargetMonths,
      runwayTargetGap:afterEmergency.targetGap,
      comparisons:Object.freeze(comparisons),
      classification,
      warnings:Object.freeze(warnings),
      dependencies:Object.freeze({ loan:purchaseLoan, currentBorrowing, afterBorrowing, stressBorrowing, currentEmergency, afterEmergency })
    });
  }

  return Object.freeze({ VERSION, normalize, resolveEngines, calculate });
});
