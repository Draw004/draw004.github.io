(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFreResilienceEngineAdapters = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const VERSION = 1;

  function resolveCore(overrides = {}) {
    const core = overrides.emergencyFund || root.CarrowmontEmergencyFundCore;
    if (!core) throw new Error('Missing deterministic emergency-fund core.');
    return core;
  }

  function createDefinitions(overrides = {}) {
    const core = resolveCore(overrides);
    return Object.freeze([
      Object.freeze({
        id:'emergency-fund-runway',
        engineVersion:core.VERSION,
        requiredInputs:['state'],
        invoke:({ inputs, currency }) => {
          const raw = core.calculate(inputs.state);
          const warnings = raw.warnings.map(message => ({ severity:'info', message }));
          return {
            currency,
            inputsUsed:inputs,
            assumptions:[{ id:'target-months', value:raw.assumptions.targetMonths, note:'User-chosen planning target; not a universal recommendation.' }],
            warnings,
            metrics:{
              monthlyNeed:raw.monthlyNeed,
              reserve:raw.reserve,
              runwayMonths:raw.fullLossRunwayMonths,
              targetAmount:raw.targetAmount,
              targetGap:raw.targetGap,
              targetCoveragePct:raw.targetCoveragePct,
              firstStageGap:raw.firstStageGap,
              monthsToTarget:raw.monthsToTarget,
              stressedRunwayMonths:raw.stressedRunwayMonths,
              stressMonthlyBurn:raw.stressMonthlyBurn
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

  return Object.freeze({ VERSION, resolveCore, createDefinitions, registerAll });
});
