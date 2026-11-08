(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFreSavingsGrowthEngineAdapters = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const VERSION = 1;

  function resolveCores(overrides = {}) {
    const recurringInvestment = overrides.recurringInvestment || root.CarrowmontSIPCore;
    const compoundInterest = overrides.compoundInterest || root.CarrowmontCompoundCore;
    if (!recurringInvestment || typeof recurringInvestment.result !== 'function') {
      throw new Error('Missing deterministic recurring-investment core.');
    }
    if (!compoundInterest || typeof compoundInterest.calculate !== 'function') {
      throw new Error('Missing deterministic compound-interest core.');
    }
    return { recurringInvestment, compoundInterest };
  }

  function recurringMetrics(raw) {
    const mode = raw?.state?.mode || 'growth';
    if (mode === 'goal') {
      return {
        mode,
        target: raw.target,
        projectedValue: raw.current?.portfolio ?? null,
        totalInvested: raw.current?.totalInvested ?? null,
        growth: raw.current?.growth ?? null,
        gap: raw.gap,
        surplus: raw.surplus,
        requiredContribution: raw.requiredContribution,
        additionalContribution: raw.additionalContribution,
        funding: raw.funding
      };
    }
    if (mode === 'target') {
      return {
        mode,
        target: raw.target,
        reached: raw.reached,
        yearsToTarget: raw.yearsToTarget,
        projectedValue: raw.portfolio,
        totalInvested: raw.totalInvested,
        growth: raw.growth,
        timeSavedMonths: raw.timeSavedMonths
      };
    }
    return {
      mode,
      projectedValue: raw.projection?.portfolio ?? null,
      totalInvested: raw.projection?.totalInvested ?? null,
      growth: raw.projection?.growth ?? null,
      fixedProjectedValue: raw.fixedProjection?.portfolio ?? null,
      stepUpBenefit: raw.stepUpBenefit ?? null
    };
  }

  function createDefinitions(overrides = {}) {
    const cores = resolveCores(overrides);
    return Object.freeze([
      Object.freeze({
        id: 'recurring-investment',
        engineVersion: 'existing-core',
        requiredInputs: ['state'],
        invoke: ({ inputs, currency }) => {
          const raw = cores.recurringInvestment.result(inputs.state);
          return {
            currency,
            inputsUsed: inputs,
            assumptions: [{ id: 'user-return-assumption', value: raw?.state?.annualReturn ?? null, note: 'Growth is a deterministic scenario based on the user-supplied return assumption, not a forecast.' }],
            warnings: [],
            metrics: recurringMetrics(raw),
            raw
          };
        }
      }),
      Object.freeze({
        id: 'compound-interest',
        engineVersion: 'existing-core',
        requiredInputs: ['state'],
        invoke: ({ inputs, currency }) => {
          const raw = cores.compoundInterest.calculate(inputs.state);
          const warnings = raw?.ok === false ? (raw.errors || []).map(message => ({ severity: 'critical', message })) : [];
          return {
            currency,
            inputsUsed: inputs,
            assumptions: [{ id: 'user-rate-assumption', value: raw?.state?.annualRate ?? null, note: 'Compound growth is an illustration based on the entered rate and compounding convention.' }],
            warnings,
            metrics: raw?.ok === false ? {} : {
              endingValue: raw.endingValue,
              startingPrincipal: raw.startingPrincipal,
              recurringContributed: raw.recurringContributed,
              totalContributed: raw.totalContributed,
              growth: raw.growth,
              effectiveAnnualRate: raw.effectiveAnnualRate,
              realEndingValue: raw.realEndingValue
            },
            raw
          };
        }
      })
    ]);
  }

  function registerAll(registry, overrides = {}) {
    if (!registry || typeof registry.register !== 'function') throw new Error('FRE adapter registry is required.');
    createDefinitions(overrides).forEach(definition => registry.register(definition));
    return registry;
  }

  return Object.freeze({ VERSION, resolveCores, createDefinitions, registerAll });
});
