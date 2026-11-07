(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFreBorrowingHealthEngineAdapters = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';
  const VERSION = 1;
  function resolveCore(overrides = {}) {
    const core = overrides.borrowingHealth || root.CarrowmontBorrowingHealthCore;
    if (!core) throw new Error('Missing deterministic borrowing-health core.');
    return core;
  }
  function createDefinitions(overrides = {}) {
    const core = resolveCore(overrides);
    return Object.freeze([Object.freeze({
      id:'debt-to-income-borrowing-health',
      engineVersion:core.VERSION,
      requiredInputs:['state'],
      invoke:({ inputs, currency }) => {
        const raw = core.calculate(inputs.state);
        return {
          currency,
          inputsUsed:inputs,
          assumptions:[{ id:'no-universal-dti-cutoff', value:true, note:'The engine reports ratios and cash-flow effects but does not apply a universal lender approval threshold.' }],
          warnings:raw.warnings.map(message => ({ severity:'info', message })),
          metrics:{
            currentDebtPayments:raw.currentDebtPayments,
            proposedDebtPayments:raw.proposedDebtPayments,
            currentGrossDtiPct:raw.currentGrossDtiPct,
            proposedGrossDtiPct:raw.proposedGrossDtiPct,
            dtiIncreasePctPoints:raw.dtiIncreasePctPoints,
            currentCashRoom:raw.currentCashRoom,
            proposedCashRoom:raw.proposedCashRoom,
            stressedGrossDtiPct:raw.stressedGrossDtiPct
          },
          raw
        };
      }
    })]);
  }
  function registerAll(registry, overrides = {}) {
    if (!registry || typeof registry.register !== 'function') throw new Error('FRE adapter registry is required.');
    createDefinitions(overrides).forEach(definition => registry.register(definition));
    return registry;
  }
  return Object.freeze({ VERSION, resolveCore, createDefinitions, registerAll });
});
