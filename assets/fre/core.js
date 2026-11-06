(function (root, factory) {
  'use strict';
  const api = factory(root.CarrowmontFinancialContext, root.CarrowmontFreIntentRouter, root.CarrowmontFrePriorityFramework, root.CarrowmontFreConfidence);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFreCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (contextApi, router, priorityFramework, confidenceApi) {
  'use strict';

  const VERSION = 1;

  function planResolution(input = {}) {
    if (!contextApi || !router || !priorityFramework || !confidenceApi) throw new Error('FRE core dependencies are not loaded.');
    const context = input.context || contextApi.create({ region:input.region, currency:input.currency });
    const resolved = router.resolve({ text:input.text, intent:input.intent });
    const route = resolved.route;
    if (route.status === 'NEEDS_CLARIFICATION') {
      return Object.freeze({ version:VERSION, status:'NEEDS_CLARIFICATION', intent:resolved.intent, route, missingFacts:[], enginePlan:[], priorityStage:null, confidence:null });
    }
    const requirements = contextApi.requirementStatus(context, route.requirements);
    const confidence = confidenceApi.evaluate({ requirementStatus:requirements, assumptions:input.assumptions || [], sensitivity:input.sensitivity || 'moderate' });
    const priorityStage = priorityFramework.get(route.priorityStage);
    const status = !requirements.complete ? 'NEEDS_INPUT' : route.status;
    return Object.freeze({
      version:VERSION,
      status,
      intent:resolved.intent,
      matchedRule:resolved.matchedRule,
      priorityStage,
      route,
      missingFacts:Object.freeze([...requirements.missing]),
      enginePlan:Object.freeze(route.engineIds.map(id => Object.freeze({ id, status:route.engineStatus.find(item => item.id === id)?.status || 'UNKNOWN_ENGINE' }))),
      confidence
    });
  }

  return Object.freeze({ VERSION, planResolution });
});
