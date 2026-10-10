(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontUSDebtInterestCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const METHODOLOGY_VERSION = 'us-debt-interest-cost-v1.0';

  function number(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function roundInteger(value, fallback) {
    return Math.round(number(value, fallback));
  }

  function normalizeInputs(raw = {}) {
    const debtBasis = ['public', 'total', 'custom'].includes(raw.debtBasis) ? raw.debtBasis : 'public';
    return Object.freeze({
      debtBasis,
      startingDebt: Math.max(0, number(raw.startingDebt, 30000000000000)),
      existingAverageRate: clamp(number(raw.existingAverageRate, 3.4) / 100, 0, 0.20),
      refinancingRate: clamp(number(raw.refinancingRate, 4.0) / 100, 0, 0.20),
      primaryDeficit: Math.max(0, number(raw.primaryDeficit, 1000000000000)),
      refinancingWindow: clamp(roundInteger(raw.refinancingWindow, 5), 1, 30),
      projectionYears: clamp(roundInteger(raw.projectionYears, 10), 1, 15)
    });
  }

  function validateScenarioInputs(raw = {}) {
    const messages = [];
    const startingDebt = number(raw.startingDebt, NaN);
    const existingAverageRate = number(raw.existingAverageRate, NaN);
    const refinancingRate = number(raw.refinancingRate, NaN);
    const primaryDeficit = number(raw.primaryDeficit, NaN);
    const refinancingWindow = number(raw.refinancingWindow, NaN);
    const projectionYears = number(raw.projectionYears, NaN);

    if (!Number.isFinite(startingDebt) || startingDebt <= 0 || startingDebt > 100000000000000) {
      messages.push('Starting modeled debt must be greater than $0 and no more than $100 trillion.');
    }
    if (!Number.isFinite(existingAverageRate) || existingAverageRate < 0 || existingAverageRate > 20) {
      messages.push('Existing average interest rate must be between 0% and 20%.');
    }
    if (!Number.isFinite(refinancingRate) || refinancingRate < 0 || refinancingRate > 20) {
      messages.push('Rate on refinanced and new borrowing must be between 0% and 20%.');
    }
    if (!Number.isFinite(primaryDeficit) || primaryDeficit < 0 || primaryDeficit > 10000000000000) {
      messages.push('Annual primary deficit before interest must be between $0 and $10 trillion.');
    }
    if (!Number.isInteger(refinancingWindow) || refinancingWindow < 1 || refinancingWindow > 30) {
      messages.push('Refinancing window must be a whole number from 1 to 30 years.');
    }
    if (!Number.isInteger(projectionYears) || projectionYears < 1 || projectionYears > 15) {
      messages.push('Projection period must be a whole number from 1 to 15 years.');
    }
    return messages;
  }

  function runDebtInterestScenario(raw = {}) {
    const inputs = normalizeInputs(raw);
    const D0 = inputs.startingDebt;
    const r0 = inputs.existingAverageRate;
    const rN = inputs.refinancingRate;
    const P = inputs.primaryDeficit;
    const W = inputs.refinancingWindow;
    const T = inputs.projectionYears;
    const annualRefiTranche = D0 / W;

    let legacyDebt = D0;
    let newRateDebt = 0;
    let cumulativeInterest = 0;
    const openingAnnualizedInterest = D0 * r0;
    const annualRows = [];

    for (let year = 1; year <= T; year += 1) {
      const refinancedOriginalDebt = Math.min(annualRefiTranche, legacyDebt);
      legacyDebt = Math.max(0, legacyDebt - refinancedOriginalDebt);
      const newRateDebtBeforeAdditions = newRateDebt + refinancedOriginalDebt;
      const modeledInterestCost = (legacyDebt * r0) + (newRateDebtBeforeAdditions * rN);
      const debtBeforeYearEndAdditions = legacyDebt + newRateDebtBeforeAdditions;
      const closingDebt = debtBeforeYearEndAdditions + P + modeledInterestCost;
      const effectiveModeledRate = debtBeforeYearEndAdditions > 0 ? modeledInterestCost / debtBeforeYearEndAdditions : 0;
      cumulativeInterest += modeledInterestCost;

      annualRows.push(Object.freeze({
        year,
        legacyStartingDebtRemaining: legacyDebt,
        refinancedOriginalDebt,
        newRateDebtBeforeYearEndAdditions: newRateDebtBeforeAdditions,
        debtBeforeYearEndAdditions,
        modeledInterestCost,
        primaryDeficit: P,
        closingDebt,
        effectiveModeledRate
      }));

      newRateDebt = newRateDebtBeforeAdditions + P + modeledInterestCost;
    }

    const finalRow = annualRows[annualRows.length - 1];
    const finalYearInterest = finalRow ? finalRow.modeledInterestCost : openingAnnualizedInterest;
    const finalDebt = finalRow ? finalRow.closingDebt : D0;

    return Object.freeze({
      inputs,
      openingAnnualizedInterest,
      annualRefiTranche,
      annualRows: Object.freeze(annualRows),
      cumulativeInterest,
      finalYearInterest,
      finalDebt,
      changeInAnnualInterest: finalYearInterest - openingAnnualizedInterest,
      repricedShareOfStartingDebt: Math.min(T / W, 1),
      fullStartingDebtOnePpSensitivity: D0 * 0.01,
      oneAnnualRefiTrancheOnePpSensitivity: annualRefiTranche * 0.01
    });
  }

  function runRateSensitivity(raw = {}) {
    const selectedRatePercent = clamp(number(raw.refinancingRate, 4), 0, 20);
    const rates = [
      { key: 'lower', label: '1 pp lower', ratePercent: Math.max(0, selectedRatePercent - 1) },
      { key: 'selected', label: 'Selected rate', ratePercent: selectedRatePercent },
      { key: 'higher', label: '1 pp higher', ratePercent: Math.min(20, selectedRatePercent + 1) }
    ];
    const scenarios = rates.map((scenario) => Object.freeze({
      ...scenario,
      result: runDebtInterestScenario({ ...raw, refinancingRate: scenario.ratePercent })
    }));
    const selected = scenarios.find((scenario) => scenario.key === 'selected');
    return Object.freeze(scenarios.map((scenario) => Object.freeze({
      ...scenario,
      changeInFinalYearInterestVsSelected: scenario.result.finalYearInterest - selected.result.finalYearInterest
    })));
  }

  function calculate(raw = {}) {
    const selected = runDebtInterestScenario(raw);
    const sensitivity = runRateSensitivity(raw);
    return Object.freeze({
      inputs: selected.inputs,
      selected,
      sensitivity,
      generatedAt: new Date().toISOString(),
      methodologyVersion: METHODOLOGY_VERSION
    });
  }

  function formatScenarioSummary(result) {
    const selected = result && result.selected ? result.selected : result;
    if (!selected) return Object.freeze({ headline: '', refinancing: '' });
    const direction = selected.changeInAnnualInterest > 0 ? 'higher' : selected.changeInAnnualInterest < 0 ? 'lower' : 'unchanged';
    return Object.freeze({
      headline: `Under these assumptions, final-year modeled interest cost is ${direction} than the opening annualized estimate.`,
      refinancing: `${Math.round(selected.repricedShareOfStartingDebt * 100)}% of the original starting debt has been repriced by Year ${selected.inputs.projectionYears} under the simplified rollover assumption.`
    });
  }

  return Object.freeze({
    METHODOLOGY_VERSION,
    normalizeInputs,
    validateScenarioInputs,
    runDebtInterestScenario,
    runRateSensitivity,
    calculate,
    formatScenarioSummary
  });
});
