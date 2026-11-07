(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFreCarAffordabilityEngineAdapters = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';
  const VERSION = 1;
  function resolve(overrides = {}) {
    const core = overrides.carAffordability || root.CarrowmontCarAffordabilityCore;
    const loan = overrides.loan || root.CarrowmontLoanCore;
    const borrowingHealth = overrides.borrowingHealth || root.CarrowmontBorrowingHealthCore;
    const emergencyFund = overrides.emergencyFund || root.CarrowmontEmergencyFundCore;
    if (!core || !loan || !borrowingHealth || !emergencyFund) throw new Error('Missing deterministic car-affordability dependencies.');
    return { core, loan, borrowingHealth, emergencyFund };
  }
  function createDefinitions(overrides = {}) {
    const deps = resolve(overrides);
    return Object.freeze([Object.freeze({
      id:'car-affordability',
      engineVersion:deps.core.VERSION,
      requiredInputs:['state'],
      invoke:({ inputs, currency }) => {
        const raw = deps.core.calculate(inputs.state, { loan:deps.loan, borrowingHealth:deps.borrowingHealth, emergencyFund:deps.emergencyFund });
        return {
          currency,
          inputsUsed:inputs,
          assumptions:[
            { id:'no-universal-car-affordability-rule', value:true, note:'The engine does not use a universal car-price-to-income or payment-to-income cutoff.' },
            { id:'no-lender-approval-prediction', value:true, note:'The engine models household cash flow, debt ratio and emergency runway but does not predict lender approval.' }
          ],
          warnings:(raw.warnings || []).map(message => ({ severity:'info', message })),
          metrics:raw.ok ? {
            loanAmount:raw.loanAmount,
            monthlyLoanPayment:raw.monthlyLoanPayment,
            allInMonthlyCarCost:raw.allInMonthlyCarCost,
            afterCashRoom:raw.afterCashRoom,
            afterGrossDtiPct:raw.afterGrossDtiPct,
            runwayAfterMonths:raw.runwayAfterMonths,
            stressCashRoom:raw.stressCashRoom
          } : {},
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
  return Object.freeze({ VERSION, resolve, createDefinitions, registerAll });
});
