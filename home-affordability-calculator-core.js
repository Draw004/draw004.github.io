(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontHomeAffordabilityCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const METHODOLOGY_VERSION = 'home-affordability-v1.0';

  function num(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function nearlyZero(value) { return Math.abs(value) < 1e-12; }

  function monthlyRate(annualPercent) {
    return num(annualPercent, 0) / 100 / 12;
  }

  function paymentForPrincipal(principal, annualPercent, months) {
    const p = Math.max(0, num(principal, 0));
    const n = Math.max(1, Math.round(num(months, 1)));
    const r = monthlyRate(annualPercent);
    if (p === 0) return 0;
    if (nearlyZero(r)) return p / n;
    return p * r / (1 - Math.pow(1 + r, -n));
  }

  function principalForPayment(payment, annualPercent, months) {
    const m = Math.max(0, num(payment, 0));
    const n = Math.max(1, Math.round(num(months, 1)));
    const r = monthlyRate(annualPercent);
    if (m === 0) return 0;
    if (nearlyZero(r)) return m * n;
    return m * (1 - Math.pow(1 + r, -n)) / r;
  }

  function validate(raw = {}) {
    const errors = [];
    const mode = raw.mode === 'target' ? 'target' : 'budget';
    const requiredPositive = [
      ['takeHomeIncome', 'Monthly take-home household income must be greater than 0.'],
      ['termYears', 'Loan term must be greater than 0.']
    ];
    requiredPositive.forEach(([key, message]) => {
      if (!(num(raw[key], NaN) > 0)) errors.push({ field:key, message });
    });
    const nonNegative = [
      ['essentialSpending','Essential monthly spending cannot be negative.'],
      ['existingDebt','Existing monthly debt repayments cannot be negative.'],
      ['protectedSavings','Monthly savings or investing cannot be negative.'],
      ['freeBuffer','Money left free each month cannot be negative.'],
      ['deposit','Deposit or down payment cannot be negative.'],
      ['ownershipCosts','Other monthly homeownership costs cannot be negative.'],
      ['grossAnnualIncome','Gross annual household income cannot be negative.']
    ];
    nonNegative.forEach(([key, message]) => {
      if (raw[key] !== '' && raw[key] != null && num(raw[key], NaN) < 0) errors.push({ field:key, message });
    });
    const rate = num(raw.annualRate, NaN);
    if (!Number.isFinite(rate) || rate < 0 || rate > 40) errors.push({ field:'annualRate', message:'Interest rate must be between 0% and 40%.' });
    if (mode === 'target') {
      const price = num(raw.targetHomePrice, NaN);
      if (!(price > 0)) errors.push({ field:'targetHomePrice', message:'Target home price must be greater than 0.' });
      if (num(raw.deposit, 0) > price) errors.push({ field:'deposit', message:'Deposit or down payment cannot be more than the target home price.' });
    }
    if (raw.higherRateEnabled) {
      const higher = num(raw.higherRate, NaN);
      if (!Number.isFinite(higher) || higher < 0 || higher > 40) errors.push({ field:'higherRate', message:'Higher-rate check must be between 0% and 40%.' });
      if (Number.isFinite(rate) && Number.isFinite(higher) && higher < rate) errors.push({ field:'higherRate', message:'For a higher-rate check, use a rate at least as high as the entered rate.' });
    }
    return errors;
  }

  function normalize(raw = {}) {
    const mode = raw.mode === 'target' ? 'target' : 'budget';
    const termYears = num(raw.termYears, 25);
    return Object.freeze({
      mode,
      takeHomeIncome: num(raw.takeHomeIncome, 0),
      essentialSpending: num(raw.essentialSpending, 0),
      existingDebt: num(raw.existingDebt, 0),
      protectedSavings: num(raw.protectedSavings, 0),
      freeBuffer: num(raw.freeBuffer, 0),
      deposit: num(raw.deposit, 0),
      annualRate: num(raw.annualRate, 0),
      termYears,
      months: Math.max(1, Math.round(termYears * 12)),
      ownershipCosts: num(raw.ownershipCosts, 0),
      targetHomePrice: mode === 'target' ? num(raw.targetHomePrice, 0) : 0,
      higherRateEnabled: Boolean(raw.higherRateEnabled),
      higherRate: num(raw.higherRate, num(raw.annualRate, 0) + 2),
      grossAnnualIncome: Math.max(0, num(raw.grossAnnualIncome, 0))
    });
  }

  function baseCashFlow(a) {
    return a.takeHomeIncome - a.essentialSpending - a.existingDebt - a.protectedSavings;
  }

  function scenarioBudget(a, annualRate) {
    const paymentBudget = Math.max(0, baseCashFlow(a) - a.freeBuffer - a.ownershipCosts);
    const loanAmount = principalForPayment(paymentBudget, annualRate, a.months);
    const payment = paymentForPrincipal(loanAmount, annualRate, a.months);
    const allInHousingCost = payment + a.ownershipCosts;
    const monthlyLeftover = baseCashFlow(a) - allInHousingCost;
    const homePrice = loanAmount + a.deposit;
    return Object.freeze({
      annualRate,
      paymentBudget,
      loanAmount,
      payment,
      allInHousingCost,
      monthlyLeftover,
      bufferDifference: monthlyLeftover - a.freeBuffer,
      homePrice,
      targetHomePrice: 0,
      fitsBuffer: monthlyLeftover + 1e-8 >= a.freeBuffer,
      incomeMultiple: a.grossAnnualIncome > 0 ? loanAmount / a.grossAnnualIncome : null
    });
  }

  function scenarioTarget(a, annualRate) {
    const loanAmount = Math.max(0, a.targetHomePrice - a.deposit);
    const payment = paymentForPrincipal(loanAmount, annualRate, a.months);
    const allInHousingCost = payment + a.ownershipCosts;
    const monthlyLeftover = baseCashFlow(a) - allInHousingCost;
    return Object.freeze({
      annualRate,
      paymentBudget: Math.max(0, baseCashFlow(a) - a.freeBuffer - a.ownershipCosts),
      loanAmount,
      payment,
      allInHousingCost,
      monthlyLeftover,
      bufferDifference: monthlyLeftover - a.freeBuffer,
      homePrice: a.targetHomePrice,
      targetHomePrice: a.targetHomePrice,
      fitsBuffer: monthlyLeftover + 1e-8 >= a.freeBuffer,
      incomeMultiple: a.grossAnnualIncome > 0 ? loanAmount / a.grossAnnualIncome : null
    });
  }

  function warningList(a, base) {
    const warnings = [];
    if (a.ownershipCosts === 0) warnings.push('You have not included other ownership costs. That can make the affordable price look higher than it may feel in your monthly budget.');
    warnings.push('Buying costs are not calculated automatically. The deposit or down payment should be the amount left after any cash you want to keep aside and purchase costs you expect to pay.');
    if (a.mode === 'budget' && base.paymentBudget <= 0) warnings.push('Under the amounts entered, there is no monthly room left for a principal-and-interest home-loan payment while keeping your chosen savings and free-cash buffer.');
    return Object.freeze(warnings);
  }

  function cashFlow(a, scenario) {
    const leftover = scenario.monthlyLeftover;
    return Object.freeze({
      income: a.takeHomeIncome,
      essentials: a.essentialSpending,
      debt: a.existingDebt,
      protectedSavings: a.protectedSavings,
      housing: scenario.allInHousingCost,
      leftover,
      chosenBuffer: a.freeBuffer,
      shortfall: Math.max(0, -leftover),
      extraBeyondBuffer: Math.max(0, leftover - a.freeBuffer)
    });
  }

  function calculate(raw = {}) {
    const errors = validate(raw);
    if (errors.length) return Object.freeze({ ok:false, errors:Object.freeze(errors) });
    const assumptions = normalize(raw);
    const make = assumptions.mode === 'target' ? scenarioTarget : scenarioBudget;
    const base = make(assumptions, assumptions.annualRate);
    const higherRate = assumptions.higherRateEnabled ? make(assumptions, assumptions.higherRate) : null;
    const warnings = warningList(assumptions, base);
    return Object.freeze({
      ok:true,
      methodologyVersion:METHODOLOGY_VERSION,
      assumptions,
      base,
      higherRate,
      warnings,
      cashFlow:cashFlow(assumptions, base),
      lenderApproval:'Not estimated by Carrowmont'
    });
  }

  return Object.freeze({
    METHODOLOGY_VERSION,
    monthlyRate,
    paymentForPrincipal,
    principalForPayment,
    validate,
    normalize,
    calculate
  });
});
