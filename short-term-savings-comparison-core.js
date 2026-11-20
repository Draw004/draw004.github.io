(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontShortTermSavingsCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = 'short-term-savings-comparison-v1.0';
  const MAX_HORIZON_MONTHS = 60;

  function finiteNumber(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function optionalNumber(value) {
    if (value === '' || value == null) return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function round(value, digits = 8) {
    if (!Number.isFinite(value)) return value;
    const f = 10 ** digits;
    return Math.round((value + Number.EPSILON) * f) / f;
  }

  function normalizeRate(value) {
    const n = optionalNumber(value);
    return n == null ? null : clamp(n, -99, 100);
  }

  function normalizeTerm(value) {
    const n = optionalNumber(value);
    if (n == null) return null;
    return clamp(Math.round(n), 1, MAX_HORIZON_MONTHS);
  }

  function normalize(input = {}) {
    const amountNow = Math.max(0, finiteNumber(input.amountNow));
    const horizonMonthsRaw = optionalNumber(input.horizonMonths);
    const horizonMonths = horizonMonthsRaw == null ? null : clamp(Math.round(horizonMonthsRaw), 1, MAX_HORIZON_MONTHS);
    const instantAccessAmount = Math.max(0, finiteNumber(input.instantAccessAmount));
    return Object.freeze({
      amountNow,
      goalAmount: Math.max(0, finiteNumber(input.goalAmount)),
      horizonMonths,
      instantAccessAmount,
      monthlyContribution: Math.max(0, finiteNumber(input.monthlyContribution)),
      goalFlexibility: input.goalFlexibility === 'flexible' ? 'flexible' : 'fixed',
      savingsRatePct: normalizeRate(input.savingsRatePct),
      termRatePct: normalizeRate(input.termRatePct),
      termMonths: normalizeTerm(input.termMonths),
      fundYieldPct: normalizeRate(input.fundYieldPct),
      governmentYieldPct: normalizeRate(input.governmentYieldPct),
      governmentTermMonths: normalizeTerm(input.governmentTermMonths)
    });
  }

  function compound(principal, annualRatePct, months) {
    if (annualRatePct == null) return null;
    const p = Math.max(0, finiteNumber(principal));
    const n = Math.max(0, Math.round(finiteNumber(months)));
    if (!n) return round(p, 8);
    const monthlyRate = annualRatePct / 1200;
    if (monthlyRate <= -1) return null;
    return round(p * ((1 + monthlyRate) ** n), 8);
  }

  function futureContributions(monthlyContribution, annualRatePct, months) {
    const payment = Math.max(0, finiteNumber(monthlyContribution));
    const n = Math.max(0, Math.round(finiteNumber(months)));
    if (!payment || !n) return 0;
    if (annualRatePct == null) return null;
    const monthlyRate = annualRatePct / 1200;
    if (monthlyRate <= -1) return null;
    if (Math.abs(monthlyRate) < 1e-12) return round(payment * n, 8);
    return round(payment * ((((1 + monthlyRate) ** n) - 1) / monthlyRate), 8);
  }

  function accessibleProjection(principal, monthlyContribution, ratePct, months) {
    if (principal <= 0 && monthlyContribution <= 0) return 0;
    const p = compound(principal, ratePct, months);
    const c = futureContributions(monthlyContribution, ratePct, months);
    if (p == null || c == null) return null;
    return round(p + c, 8);
  }

  function goalGap(goalAmount, projectedTotal) {
    if (!(goalAmount > 0) || projectedTotal == null) return null;
    return round(goalAmount - projectedTotal, 2);
  }

  function optionResult(id, status, projectedTotal, openingPrincipal, monthlyContribution, horizonMonths, details = {}) {
    const contributed = Math.max(0, openingPrincipal) + Math.max(0, monthlyContribution) * Math.max(0, horizonMonths || 0);
    return Object.freeze({
      id,
      status,
      projectedTotal: projectedTotal == null ? null : round(projectedTotal, 2),
      modeledGrowth: projectedTotal == null ? null : round(projectedTotal - contributed, 2),
      ...details
    });
  }

  function calculate(input = {}) {
    const a = normalize(input);
    const errors = [];
    const warnings = [];

    if (!(a.amountNow > 0)) errors.push('Enter the short-term savings amount you want to compare.');
    if (a.horizonMonths == null) errors.push('Enter how many months remain until you may need the money.');
    if (a.instantAccessAmount > a.amountNow) errors.push('The amount kept instantly accessible cannot exceed the savings amount being compared.');

    const ok = errors.length === 0;
    if (!ok) {
      return Object.freeze({
        ok: false,
        methodologyVersion: VERSION,
        assumptions: a,
        errors: Object.freeze(errors),
        warnings: Object.freeze(warnings),
        options: Object.freeze([])
      });
    }

    const horizon = a.horizonMonths;
    const accessReserve = Math.min(a.amountNow, a.instantAccessAmount);
    const lockableAmount = Math.max(0, a.amountNow - accessReserve);
    const accessAtGoal = accessibleProjection(accessReserve, a.monthlyContribution, a.savingsRatePct, horizon);
    const savingsTotal = accessibleProjection(a.amountNow, a.monthlyContribution, a.savingsRatePct, horizon);

    const savings = optionResult(
      'savings',
      a.savingsRatePct == null ? 'needs-input' : 'ready',
      savingsTotal,
      a.amountNow,
      a.monthlyContribution,
      horizon,
      {
        ratePct: a.savingsRatePct,
        liquidity: 'immediate',
        goalGap: goalGap(a.goalAmount, savingsTotal),
        maturityMonths: 0
      }
    );

    let termStatus = 'needs-input';
    let termTotal = null;
    let termMaturityValue = null;
    if (lockableAmount <= 0) termStatus = 'no-lockable';
    else if (a.termRatePct != null && a.termMonths != null) {
      if (a.termMonths > horizon) termStatus = 'mismatch';
      else {
        termStatus = 'ready';
        termMaturityValue = compound(lockableAmount, a.termRatePct, a.termMonths);
        if (termMaturityValue != null) {
          const remainingMonths = horizon - a.termMonths;
          const rolled = remainingMonths > 0 ? compound(termMaturityValue, a.savingsRatePct, remainingMonths) : termMaturityValue;
          if (rolled != null && accessAtGoal != null) termTotal = round(rolled + accessAtGoal, 8);
        }
      }
    }
    const term = optionResult('term-deposit', termStatus, termTotal, a.amountNow, a.monthlyContribution, horizon, {
      ratePct: a.termRatePct,
      maturityMonths: a.termMonths,
      maturityValue: termMaturityValue == null ? null : round(termMaturityValue, 2),
      liquidity: 'locked-until-maturity',
      goalGap: goalGap(a.goalAmount, termTotal),
      maturesByGoal: a.termMonths != null ? a.termMonths <= horizon : null
    });

    let fundStatus = 'needs-input';
    let fundTotal = null;
    if (lockableAmount <= 0) fundStatus = 'no-lockable';
    else if (a.fundYieldPct != null) {
      fundStatus = 'conditional';
      const fundValue = compound(lockableAmount, a.fundYieldPct, horizon);
      if (fundValue != null && accessAtGoal != null) fundTotal = round(fundValue + accessAtGoal, 8);
    }
    const fund = optionResult('money-market-fund', fundStatus, fundTotal, a.amountNow, a.monthlyContribution, horizon, {
      ratePct: a.fundYieldPct,
      maturityMonths: null,
      liquidity: 'provider-dependent',
      goalGap: goalGap(a.goalAmount, fundTotal)
    });

    let governmentStatus = 'needs-input';
    let governmentTotal = null;
    let governmentMaturityValue = null;
    if (lockableAmount <= 0) governmentStatus = 'no-lockable';
    else if (a.governmentYieldPct != null && a.governmentTermMonths != null) {
      if (a.governmentTermMonths > horizon) governmentStatus = 'mismatch';
      else {
        governmentStatus = 'ready';
        governmentMaturityValue = compound(lockableAmount, a.governmentYieldPct, a.governmentTermMonths);
        if (governmentMaturityValue != null) {
          const remainingMonths = horizon - a.governmentTermMonths;
          const rolled = remainingMonths > 0 ? compound(governmentMaturityValue, a.savingsRatePct, remainingMonths) : governmentMaturityValue;
          if (rolled != null && accessAtGoal != null) governmentTotal = round(rolled + accessAtGoal, 8);
        }
      }
    }
    const government = optionResult('government-bill', governmentStatus, governmentTotal, a.amountNow, a.monthlyContribution, horizon, {
      ratePct: a.governmentYieldPct,
      maturityMonths: a.governmentTermMonths,
      maturityValue: governmentMaturityValue == null ? null : round(governmentMaturityValue, 2),
      liquidity: 'hold-to-maturity',
      goalGap: goalGap(a.goalAmount, governmentTotal),
      maturesByGoal: a.governmentTermMonths != null ? a.governmentTermMonths <= horizon : null
    });

    const options = [savings, term, fund, government];
    const modeled = options.filter(o => o.projectedTotal != null && o.status !== 'mismatch');
    const highest = modeled.length ? modeled.reduce((best, item) => item.projectedTotal > best.projectedTotal ? item : best) : null;

    if (lockableAmount <= 0) warnings.push('All of the current savings amount is reserved for instant access, so there is no remaining amount to compare in locked or market-based options.');
    if (a.savingsRatePct == null) warnings.push('Enter the accessible savings rate to complete projected balances for money kept liquid, new monthly contributions and any proceeds that mature before the goal date.');
    if (a.termMonths != null && a.termMonths > horizon) warnings.push('The entered fixed/term deposit matures after the goal date, so its projected value is not treated as available by the deadline.');
    if (a.governmentTermMonths != null && a.governmentTermMonths > horizon) warnings.push('The entered government bill/security matures after the goal date; selling before maturity can expose the price to market-rate changes.');
    if (a.fundYieldPct != null) warnings.push('A money market or cash fund is an investment product, not the same as a protected bank deposit. The entered yield is only a scenario assumption and can change.');
    warnings.push('Rates are held constant only for this comparison. Taxes, fees, deposit-protection limits, provider eligibility, early-withdrawal penalties and reinvestment rates are not modeled.');

    return Object.freeze({
      ok: true,
      methodologyVersion: VERSION,
      assumptions: a,
      errors: Object.freeze([]),
      warnings: Object.freeze(warnings),
      accessReserve: round(accessReserve, 2),
      lockableAmount: round(lockableAmount, 2),
      horizonMonths: horizon,
      totalPlannedContributions: round(a.monthlyContribution * horizon, 2),
      goalAmount: round(a.goalAmount, 2),
      goalFlexibility: a.goalFlexibility,
      options: Object.freeze(options),
      highestModeledValueOptionId: highest?.id || null,
      highestModeledValue: highest?.projectedTotal ?? null
    });
  }

  return Object.freeze({
    VERSION,
    MAX_HORIZON_MONTHS,
    normalize,
    compound,
    futureContributions,
    calculate
  });
});
