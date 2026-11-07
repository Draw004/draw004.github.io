(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontEmergencyFundCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = 'emergency-fund-runway-v1.0';
  const REFERENCE_RANGE = Object.freeze({ low: 3, high: 6 });

  function number(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function round(value, digits = 8) {
    if (!Number.isFinite(value)) return value;
    const factor = 10 ** digits;
    return Math.round((value + Number.EPSILON) * factor) / factor;
  }

  function normalize(input = {}) {
    return Object.freeze({
      essentialExpenses: Math.max(0, number(input.essentialExpenses)),
      debtPayments: Math.max(0, number(input.debtPayments)),
      otherCommitments: Math.max(0, number(input.otherCommitments)),
      emergencySavings: Math.max(0, number(input.emergencySavings)),
      otherLiquidCash: Math.max(0, number(input.otherLiquidCash)),
      includeOtherLiquidCash: Boolean(input.includeOtherLiquidCash),
      targetMonths: clamp(number(input.targetMonths, 6), 1, 24),
      monthlyContribution: Math.max(0, number(input.monthlyContribution)),
      disruptionIncome: Math.max(0, number(input.disruptionIncome)),
      shockCost: Math.max(0, number(input.shockCost))
    });
  }

  function runway(reserve, monthlyBurn) {
    if (monthlyBurn <= 0) return null;
    return round(Math.max(0, reserve) / monthlyBurn, 6);
  }

  function monthsToBuild(gap, monthlyContribution) {
    if (gap <= 0) return 0;
    if (monthlyContribution <= 0) return null;
    return Math.ceil(gap / monthlyContribution);
  }

  function classify(runwayMonths, targetMonths, monthlyNeed, reserve) {
    if (monthlyNeed <= 0) return 'NEEDS_EXPENSE_INPUT';
    if (reserve <= 0) return 'NO_BUFFER';
    if (runwayMonths < 1) return 'FIRST_BUFFER';
    if (runwayMonths < targetMonths) return 'BUILDING';
    return 'TARGET_COVERED';
  }

  function calculate(input = {}) {
    const assumptions = normalize(input);
    const monthlyNeed = assumptions.essentialExpenses + assumptions.debtPayments + assumptions.otherCommitments;
    const reserve = assumptions.emergencySavings + (assumptions.includeOtherLiquidCash ? assumptions.otherLiquidCash : 0);
    const postShockReserve = Math.max(0, reserve - assumptions.shockCost);
    const fullLossRunwayMonths = runway(reserve, monthlyNeed);
    const stressMonthlyBurn = Math.max(0, monthlyNeed - assumptions.disruptionIncome);
    const stressedRunwayMonths = stressMonthlyBurn > 0 ? runway(postShockReserve, stressMonthlyBurn) : null;
    const targetAmount = monthlyNeed * assumptions.targetMonths;
    const targetGap = Math.max(0, targetAmount - reserve);
    const firstStageAmount = monthlyNeed;
    const firstStageGap = Math.max(0, firstStageAmount - reserve);
    const monthsToTarget = monthsToBuild(targetGap, assumptions.monthlyContribution);
    const monthsToFirstStage = monthsToBuild(firstStageGap, assumptions.monthlyContribution);
    const referenceLowAmount = monthlyNeed * REFERENCE_RANGE.low;
    const referenceHighAmount = monthlyNeed * REFERENCE_RANGE.high;
    const targetCoveragePct = targetAmount > 0 ? Math.min(999, (reserve / targetAmount) * 100) : 0;
    const warnings = [];

    if (monthlyNeed <= 0) warnings.push('Enter at least one monthly essential or unavoidable cost to calculate runway.');
    if (assumptions.includeOtherLiquidCash && assumptions.otherLiquidCash > 0) warnings.push('Other liquid cash is counted only because you chose to include it as emergency-ready money.');
    if (assumptions.shockCost > reserve && reserve > 0) warnings.push('The one-time shock is larger than the reserve counted in this plan.');
    if (assumptions.disruptionIncome >= monthlyNeed && monthlyNeed > 0) warnings.push('Your entered disruption income covers the modeled monthly need, so the stressed runway is not limited by monthly burn in this scenario.');
    if (assumptions.monthlyContribution <= 0 && targetGap > 0) warnings.push('Add a monthly contribution if you want Carrowmont to estimate a build time.');

    return Object.freeze({
      ok: monthlyNeed > 0,
      methodologyVersion: VERSION,
      assumptions,
      monthlyNeed: round(monthlyNeed, 2),
      reserve: round(reserve, 2),
      postShockReserve: round(postShockReserve, 2),
      fullLossRunwayMonths,
      stressMonthlyBurn: round(stressMonthlyBurn, 2),
      stressedRunwayMonths,
      targetAmount: round(targetAmount, 2),
      targetGap: round(targetGap, 2),
      targetCoveragePct: round(targetCoveragePct, 2),
      firstStageAmount: round(firstStageAmount, 2),
      firstStageGap: round(firstStageGap, 2),
      monthsToTarget,
      monthsToFirstStage,
      referenceRangeMonths: REFERENCE_RANGE,
      referenceLowAmount: round(referenceLowAmount, 2),
      referenceHighAmount: round(referenceHighAmount, 2),
      classification: classify(fullLossRunwayMonths == null ? 0 : fullLossRunwayMonths, assumptions.targetMonths, monthlyNeed, reserve),
      warnings: Object.freeze([...warnings])
    });
  }

  return Object.freeze({ VERSION, REFERENCE_RANGE, normalize, calculate });
});
