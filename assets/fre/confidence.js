(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFreConfidence = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = 1;
  const LEVELS = Object.freeze(['High','Moderate','Low']);

  function assumption(input = {}) {
    return Object.freeze({
      id: String(input.id || '').trim(),
      label: String(input.label || '').trim(),
      value: input.value,
      source: String(input.source || 'carrowmont-default').trim(),
      materiality: ['low','moderate','high'].includes(input.materiality) ? input.materiality : 'moderate'
    });
  }

  function evaluate(input = {}) {
    const requirementStatus = input.requirementStatus || { missing:[], estimated:[], excluded:[] };
    const assumptions = (Array.isArray(input.assumptions) ? input.assumptions : []).map(assumption);
    const warnings = Array.isArray(input.engineWarnings) ? input.engineWarnings : [];
    const sensitivity = ['low','moderate','high'].includes(input.sensitivity) ? input.sensitivity : 'moderate';
    const reasons = [];
    let level = 'High';

    if ((requirementStatus.missing || []).length || (requirementStatus.excluded || []).length) {
      level = 'Low';
      reasons.push('One or more required financial facts are missing or excluded.');
    }
    if (warnings.some(warning => String(warning?.severity || warning).toLowerCase() === 'critical')) {
      level = 'Low';
      reasons.push('A calculation engine reported a critical limitation.');
    }
    if (level !== 'Low' && ((requirementStatus.estimated || []).length || assumptions.some(item => item.materiality === 'high') || sensitivity === 'high')) {
      level = 'Moderate';
      reasons.push('The result depends on estimates, a material assumption, or a highly sensitive input.');
    }
    if (!reasons.length) reasons.push('Required inputs are present and no material limitation has been identified.');

    return Object.freeze({ version:VERSION, level, reasons:Object.freeze(reasons), assumptions:Object.freeze(assumptions), sensitivity });
  }

  return Object.freeze({ VERSION, LEVELS, assumption, evaluate });
});
