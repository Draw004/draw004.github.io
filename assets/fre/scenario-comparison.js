(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFreScenarioComparison = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = 1;
  const finite = value => Number.isFinite(Number(value)) ? Number(value) : null;

  function compareMetric(aValue, bValue, metric) {
    const a = finite(aValue);
    const b = finite(bValue);
    if (a === null || b === null) return { winner:'unavailable', difference:null };
    const tolerance = Math.max(0, finite(metric.tolerance) || 0);
    const difference = b - a;
    if (Math.abs(difference) <= tolerance) return { winner:'tie', difference };
    if (metric.preference === 'higher') return { winner:b > a ? 'b' : 'a', difference };
    if (metric.preference === 'target') {
      const target = finite(metric.target);
      if (target === null) return { winner:'unavailable', difference };
      const aDistance = Math.abs(a - target);
      const bDistance = Math.abs(b - target);
      return { winner:Math.abs(aDistance - bDistance) <= tolerance ? 'tie' : (bDistance < aDistance ? 'b' : 'a'), difference };
    }
    return { winner:b < a ? 'b' : 'a', difference };
  }

  function compare(input = {}) {
    const a = input.a || {};
    const b = input.b || {};
    const currencyA = a.currency || null;
    const currencyB = b.currency || null;
    if (currencyA && currencyB && currencyA !== currencyB) throw new Error('Scenario comparison requires the same currency.');
    const metrics = Array.isArray(input.metrics) ? input.metrics : [];
    const results = metrics.map(metric => {
      const key = metric.key;
      const comparison = compareMetric(a.metrics?.[key], b.metrics?.[key], metric);
      return Object.freeze({ key, label:metric.label || key, preference:metric.preference || 'lower', a:a.metrics?.[key] ?? null, b:b.metrics?.[key] ?? null, ...comparison });
    });
    return Object.freeze({ version:VERSION, aId:a.id || 'a', bId:b.id || 'b', currency:currencyA || currencyB, metrics:results });
  }

  return Object.freeze({ VERSION, compare });
});
