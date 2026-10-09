(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFourPercentCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const METHODOLOGY_VERSION = '4-percent-stress-test-v1.0';
  const RAW_SEQUENCE = [-0.20, -0.10, 0, 0.04, 0.06, 0.08, 0.10, 0.12, 0.14, 0.16];
  const RATE_COMPARISON = [0.03, 0.035, 0.04, 0.05];

  function number(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function almostEqual(a, b, tolerance = 1e-8) {
    return Math.abs(a - b) <= tolerance;
  }

  function geometricMeanFactor(factors) {
    const product = factors.reduce((acc, factor) => acc * factor, 1);
    return Math.pow(product, 1 / factors.length);
  }

  function normalizedSequence(selectedReturn) {
    const selectedFactor = 1 + selectedReturn;
    const rawFactors = RAW_SEQUENCE.map((rate) => 1 + rate);
    const rawGeometricMean = geometricMeanFactor(rawFactors);
    const scale = selectedFactor / rawGeometricMean;
    return rawFactors.map((factor) => factor * scale - 1);
  }

  function normalizeInputs(raw = {}) {
    const startAge = Math.round(clamp(number(raw.startAge, 60), 35, 90));
    const planUntilAge = Math.round(clamp(number(raw.planUntilAge, 90), startAge + 10, 120));
    const startingPortfolio = Math.max(0, number(raw.startingPortfolio, 10000000));
    const inflationRate = clamp(number(raw.inflationRate, 4) / 100, -0.02, 0.15);
    const nominalReturn = clamp(number(raw.nominalReturn, 6) / 100, -0.10, 0.20);
    const withdrawalMode = raw.withdrawalMode === 'amount' ? 'amount' : 'rate';

    let startingWithdrawalRate = clamp(number(raw.startingWithdrawalRate, 4) / 100, 0.005, 0.10);
    let firstYearWithdrawal = Math.max(0, number(raw.firstYearWithdrawal, startingPortfolio * startingWithdrawalRate));

    if (withdrawalMode === 'amount') {
      firstYearWithdrawal = clamp(firstYearWithdrawal, 0, startingPortfolio);
      startingWithdrawalRate = startingPortfolio > 0 ? firstYearWithdrawal / startingPortfolio : 0;
    } else {
      firstYearWithdrawal = startingPortfolio * startingWithdrawalRate;
    }

    return Object.freeze({
      startAge,
      planUntilAge,
      horizonYears: planUntilAge - startAge,
      startingPortfolio,
      withdrawalMode,
      startingWithdrawalRate,
      firstYearWithdrawal,
      inflationRate,
      nominalReturn
    });
  }

  function scenarioStatus(depletionYear, horizonYears) {
    return depletionYear
      ? `Depleted during year ${depletionYear}`
      : `Portfolio lasts through the ${horizonYears}-year horizon`;
  }

  function simulateScenario(config) {
    const {
      startAge,
      horizonYears,
      startingPortfolio,
      firstYearWithdrawal,
      returnSeries,
      inflationSeries,
      key,
      title
    } = config;

    let balance = Math.max(0, startingPortfolio);
    let scheduledWithdrawal = Math.max(0, firstYearWithdrawal);
    let totalWithdrawalsNominal = 0;
    let cumulativeInflationFactor = 1;
    let depletionYear = null;
    let minimumPositiveBalance = balance > 0 ? balance : 0;
    const annualRows = [];

    for (let index = 0; index < horizonYears; index += 1) {
      const year = index + 1;
      const age = startAge + index;
      const openingBalance = balance;
      const returnRate = number(returnSeries[index], returnSeries[returnSeries.length - 1] || 0);
      const inflationRate = number(inflationSeries[index], inflationSeries[inflationSeries.length - 1] || 0);

      let withdrawal = 0;
      let investmentGrowth = 0;
      let closingBalance = openingBalance;
      let depleted = false;
      let status = 'Funded';

      if (depletionYear !== null || openingBalance <= 0) {
        closingBalance = 0;
        depleted = true;
        status = 'Already depleted';
      } else if (openingBalance + 1e-9 < scheduledWithdrawal) {
        withdrawal = openingBalance;
        totalWithdrawalsNominal += withdrawal;
        closingBalance = 0;
        balance = 0;
        depleted = true;
        depletionYear = year;
        status = 'Partial withdrawal; depleted';
      } else {
        withdrawal = scheduledWithdrawal;
        const afterWithdrawal = openingBalance - withdrawal;
        investmentGrowth = afterWithdrawal * returnRate;
        closingBalance = Math.max(0, afterWithdrawal + investmentGrowth);
        totalWithdrawalsNominal += withdrawal;
        balance = closingBalance;
        if (closingBalance > 0) minimumPositiveBalance = Math.min(minimumPositiveBalance || closingBalance, closingBalance);
        if (closingBalance <= 1e-9 && year < horizonYears) {
          depletionYear = year + 1;
          status = 'Funded; depleted before next withdrawal';
        }
      }

      annualRows.push(Object.freeze({
        year,
        age,
        openingBalance,
        scheduledWithdrawal,
        withdrawal,
        inflationRate,
        returnRate,
        investmentGrowth,
        closingBalance,
        depleted,
        status
      }));

      cumulativeInflationFactor *= 1 + inflationRate;
      scheduledWithdrawal *= 1 + inflationRate;
      balance = closingBalance;
    }

    const endingBalanceNominal = balance;
    const endingBalanceReal = cumulativeInflationFactor > 0
      ? endingBalanceNominal / cumulativeInflationFactor
      : endingBalanceNominal;
    const finalScheduledWithdrawal = annualRows.length
      ? annualRows[annualRows.length - 1].scheduledWithdrawal
      : firstYearWithdrawal;

    return Object.freeze({
      key,
      title,
      status: scenarioStatus(depletionYear, horizonYears),
      depletionYear,
      depletionAge: depletionYear ? startAge + depletionYear - 1 : null,
      endingBalanceNominal,
      endingBalanceReal,
      totalWithdrawalsNominal,
      firstYearWithdrawal,
      finalScheduledWithdrawal,
      minimumPositiveBalance,
      cumulativeInflationFactor,
      annualRows: Object.freeze(annualRows)
    });
  }

  function constantSeries(value, years) {
    return Array.from({ length: years }, () => value);
  }

  function adverseReturnSeries(selectedReturn, years, reverse = false) {
    const ten = normalizedSequence(selectedReturn);
    const ordered = reverse ? [...ten].reverse() : ten;
    return Array.from({ length: years }, (_, index) => index < ordered.length ? ordered[index] : selectedReturn);
  }

  function adverseInflationSeries(selectedInflation, years) {
    return Array.from({ length: years }, (_, index) => index < 10
      ? clamp(selectedInflation + 0.02, -0.02, 0.15)
      : selectedInflation);
  }

  function calculate(raw = {}) {
    const assumptions = normalizeInputs(raw);
    const years = assumptions.horizonYears;
    const baseReturns = constantSeries(assumptions.nominalReturn, years);
    const baseInflation = constantSeries(assumptions.inflationRate, years);
    const cautiousReturn = clamp(assumptions.nominalReturn - 0.015, -0.10, 0.20);
    const cautiousInflation = clamp(assumptions.inflationRate + 0.01, -0.02, 0.15);

    const common = {
      startAge: assumptions.startAge,
      horizonYears: years,
      startingPortfolio: assumptions.startingPortfolio,
      firstYearWithdrawal: assumptions.firstYearWithdrawal
    };

    const base = simulateScenario({
      ...common,
      key: 'base',
      title: 'Base',
      returnSeries: baseReturns,
      inflationSeries: baseInflation
    });

    const cautious = simulateScenario({
      ...common,
      key: 'cautious',
      title: 'Cautious',
      returnSeries: constantSeries(cautiousReturn, years),
      inflationSeries: constantSeries(cautiousInflation, years)
    });

    const adverse = simulateScenario({
      ...common,
      key: 'adverse',
      title: 'Adverse early sequence',
      returnSeries: adverseReturnSeries(assumptions.nominalReturn, years, false),
      inflationSeries: adverseInflationSeries(assumptions.inflationRate, years)
    });

    const weakFirst = simulateScenario({
      ...common,
      key: 'weakFirst',
      title: 'Weak-first sequence',
      returnSeries: adverseReturnSeries(assumptions.nominalReturn, years, false),
      inflationSeries: baseInflation
    });

    const strongFirst = simulateScenario({
      ...common,
      key: 'strongFirst',
      title: 'Strong-first sequence',
      returnSeries: adverseReturnSeries(assumptions.nominalReturn, years, true),
      inflationSeries: baseInflation
    });

    const rateComparison = RATE_COMPARISON.map((rate) => {
      const firstYearWithdrawal = assumptions.startingPortfolio * rate;
      const scenario = simulateScenario({
        ...common,
        firstYearWithdrawal,
        key: `rate-${rate}`,
        title: `${(rate * 100).toFixed(rate * 100 % 1 ? 1 : 0)}%`,
        returnSeries: adverseReturnSeries(assumptions.nominalReturn, years, false),
        inflationSeries: adverseInflationSeries(assumptions.inflationRate, years)
      });
      return Object.freeze({
        rate,
        firstYearWithdrawal,
        status: scenario.status,
        depletionAge: scenario.depletionAge,
        endingBalanceReal: scenario.endingBalanceReal,
        endingBalanceNominal: scenario.endingBalanceNominal
      });
    });

    return Object.freeze({
      assumptions,
      base,
      cautious,
      adverse,
      sequenceComparison: Object.freeze({
        normalizedReturns: Object.freeze(normalizedSequence(assumptions.nominalReturn)),
        weakFirst,
        strongFirst
      }),
      rateComparison: Object.freeze(rateComparison),
      generatedAt: new Date().toISOString(),
      methodologyVersion: METHODOLOGY_VERSION
    });
  }

  return Object.freeze({
    METHODOLOGY_VERSION,
    RAW_SEQUENCE: Object.freeze([...RAW_SEQUENCE]),
    RATE_COMPARISON: Object.freeze([...RATE_COMPARISON]),
    clamp,
    almostEqual,
    geometricMeanFactor,
    normalizedSequence,
    normalizeInputs,
    simulateScenario,
    calculate
  });
});
