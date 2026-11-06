(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFrePriorityFramework = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = 1;
  const STAGES = Object.freeze([
    Object.freeze({ id:'stabilize', order:1, label:'Stabilize', purpose:'Meet essential expenses and restore positive cash flow.' }),
    Object.freeze({ id:'protect', order:2, label:'Protect', purpose:'Build emergency liquidity and resilience.' }),
    Object.freeze({ id:'reduce', order:3, label:'Reduce', purpose:'Reduce expensive or dangerous debt.' }),
    Object.freeze({ id:'build', order:4, label:'Build', purpose:'Fund near- and medium-term goals.' }),
    Object.freeze({ id:'grow', order:5, label:'Grow', purpose:'Build retirement and long-term investments.' }),
    Object.freeze({ id:'optimize', order:6, label:'Optimize', purpose:'Improve financing, allocation, timing and structure.' })
  ]);
  const byId = Object.freeze(Object.fromEntries(STAGES.map(stage => [stage.id, stage])));
  const get = id => byId[id] || null;
  const compare = (a, b) => (get(a)?.order || 999) - (get(b)?.order || 999);

  return Object.freeze({ VERSION, STAGES, get, compare });
});
