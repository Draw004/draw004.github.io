(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFrePrimaryEngineAdapters = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const VERSION = 1;
  const CORE_KEYS = Object.freeze(['budget','goal','inflation','retirement']);

  function resolveCores(overrides = {}) {
    const cores = {
      budget: overrides.budget || root.CarrowmontBudgetCore,
      goal: overrides.goal || root.CarrowmontGoalCore,
      inflation: overrides.inflation || root.CarrowmontInflationCore,
      retirement: overrides.retirement || root.CarrowmontRetirementCore
    };
    for (const key of CORE_KEYS) {
      if (!cores[key]) throw new Error(`Missing deterministic core for ${key}.`);
    }
    return cores;
  }

  function createDefinitions(overrides = {}) {
    const cores = resolveCores(overrides);
    return Object.freeze([
      Object.freeze({
        id:'budget-cash-flow', engineVersion:cores.budget.VERSION, requiredInputs:['state'],
        invoke:({ inputs, currency }) => {
          const raw = cores.budget.calculate(inputs.state);
          return { currency, inputsUsed:inputs, assumptions:[], warnings:[], metrics:{ income:raw.income, essential:raw.essential, flexible:raw.flexible, saving:raw.saving, remaining:raw.remaining, savingsRate:raw.savingsRate, coverage:raw.coverage, emergencyGap:raw.emergencyGap, cycleRoom:raw.cycleRoom }, raw };
        }
      }),
      Object.freeze({
        id:'goal-planner', engineVersion:cores.goal.VERSION, requiredInputs:['state'],
        invoke:({ inputs, currency }) => {
          const raw = cores.goal.calculate(inputs.state);
          return { currency, inputsUsed:inputs, assumptions:[], warnings:[], metrics:{ futureCost:raw.futureCost, projected:raw.projected, gap:raw.gap, recurringRequired:raw.monthlyRequired, additionalRecurring:raw.additional, lumpToday:raw.lumpToday, funding:raw.funding }, raw };
        }
      }),
      Object.freeze({
        id:'inflation', engineVersion:cores.inflation.VERSION, requiredInputs:['amount','years','rate'],
        invoke:({ inputs, currency }) => {
          const raw = cores.inflation.calculate({ amount:inputs.amount, years:inputs.years, rate:inputs.rate });
          return { currency, inputsUsed:inputs, assumptions:[], warnings:[], metrics:{ futureValue:raw.future, presentEquivalent:raw.sameNominalToday, cumulativeIncreasePct:raw.increase, purchasingPowerRemainingPct:raw.remaining, purchasingPowerLossPct:raw.loss }, raw };
        }
      }),
      Object.freeze({
        id:'retirement', engineVersion:cores.retirement.VERSION, requiredInputs:['state'],
        invoke:({ inputs, currency }) => {
          const raw = cores.retirement.calculatePlan(inputs.state);
          const warnings = raw.errors?.length ? raw.errors.map(message => ({ severity:'critical', message })) : [];
          return { currency, inputsUsed:inputs, assumptions:[], warnings, metrics:raw.errors?.length ? {} : { requiredCorpus:raw.requiredCorpus, projectedCorpus:raw.projectedCorpus, gap:raw.gap, totalRecurringNeeded:raw.totalMonthlyNeeded, additionalRecurringNeeded:raw.extraMonthlyNeeded, fundedPct:raw.fundedPct, projectedDepletionAge:raw.projectedDepletionAge }, raw };
        }
      })
    ]);
  }

  function registerAll(registry, overrides = {}) {
    if (!registry || typeof registry.register !== 'function') throw new Error('FRE adapter registry is required.');
    createDefinitions(overrides).forEach(definition => registry.register(definition));
    return registry;
  }

  return Object.freeze({ VERSION, CORE_KEYS, resolveCores, createDefinitions, registerAll });
});
