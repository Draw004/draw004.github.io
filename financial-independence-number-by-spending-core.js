(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.CarrowmontFINumberBySpendingCore = api;
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  const METHODOLOGY_VERSION = 'fi-number-by-spending-v1.0';
  const STANDARD_RATES = [0.03, 0.035, 0.04, 0.05];
  const SENSITIVITY_FACTORS = [0.8, 0.9, 1, 1.1, 1.2];

  function finite(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function normalizeInputs(raw = {}) {
    const view = raw.view === 'annual' ? 'annual' : 'monthly';
    const spending = Math.max(0, finite(raw.spending));
    const withdrawalRate = finite(raw.withdrawalRate, 4) / 100;
    const yearsUntilFi = Math.max(0, Math.round(finite(raw.yearsUntilFi, 0)));
    const inflationRate = finite(raw.inflationRate, 5) / 100;
    return { view, spending, withdrawalRate, yearsUntilFi, inflationRate };
  }

  function annualSpending(inputs) {
    const s = inputs && Number.isFinite(inputs.spending) ? inputs.spending : 0;
    return inputs && inputs.view === 'annual' ? s : s * 12;
  }

  function fiNumber(annualSpendingValue, withdrawalRate) {
    if (!Number.isFinite(annualSpendingValue) || annualSpendingValue <= 0) return 0;
    if (!Number.isFinite(withdrawalRate) || withdrawalRate <= 0) return 0;
    return annualSpendingValue / withdrawalRate;
  }

  function futureSpending(annualSpendingValue, inflationRate, yearsUntilFi) {
    const years = Math.max(0, Math.round(finite(yearsUntilFi)));
    const inflation = finite(inflationRate);
    return Math.max(0, finite(annualSpendingValue)) * Math.pow(1 + inflation, years);
  }

  function rateComparison(inputs) {
    const annualToday = annualSpending(inputs);
    const futureAnnual = futureSpending(annualToday, inputs.inflationRate, inputs.yearsUntilFi);
    const rates = [...STANDARD_RATES];
    if (inputs.withdrawalRate > 0 && !rates.some(rate => Math.abs(rate - inputs.withdrawalRate) < 1e-10)) rates.push(inputs.withdrawalRate);
    rates.sort((a, b) => a - b);
    return rates.map(rate => ({
      rate,
      isSelected: Math.abs(rate - inputs.withdrawalRate) < 1e-10,
      multiple: rate > 0 ? 1 / rate : 0,
      fiToday: fiNumber(annualToday, rate),
      fiFuture: fiNumber(futureAnnual, rate)
    }));
  }

  function spendingSensitivity(inputs) {
    const annualToday = annualSpending(inputs);
    return SENSITIVITY_FACTORS.map(factor => {
      const annual = annualToday * factor;
      const futureAnnual = futureSpending(annual, inputs.inflationRate, inputs.yearsUntilFi);
      return {
        factor,
        percentage: Math.round(factor * 100),
        isBaseline: Math.abs(factor - 1) < 1e-10,
        annualSpending: annual,
        fiToday: fiNumber(annual, inputs.withdrawalRate),
        fiFuture: fiNumber(futureAnnual, inputs.withdrawalRate)
      };
    });
  }

  function calculate(raw = {}) {
    const inputs = normalizeInputs(raw);
    const annualToday = annualSpending(inputs);
    const futureAnnual = futureSpending(annualToday, inputs.inflationRate, inputs.yearsUntilFi);
    const fiToday = fiNumber(annualToday, inputs.withdrawalRate);
    const fiFuture = fiNumber(futureAnnual, inputs.withdrawalRate);
    return {
      methodologyVersion: METHODOLOGY_VERSION,
      generatedAt: new Date().toISOString(),
      inputs,
      annualSpendingToday: annualToday,
      futureAnnualSpending: futureAnnual,
      fiToday,
      fiFuture,
      fiMultiple: inputs.withdrawalRate > 0 ? 1 / inputs.withdrawalRate : 0,
      rateComparison: rateComparison(inputs),
      spendingSensitivity: spendingSensitivity(inputs)
    };
  }

  return {
    METHODOLOGY_VERSION,
    STANDARD_RATES,
    SENSITIVITY_FACTORS,
    normalizeInputs,
    annualSpending,
    fiNumber,
    futureSpending,
    rateComparison,
    spendingSensitivity,
    calculate
  };
});
