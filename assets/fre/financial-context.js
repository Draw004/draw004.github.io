(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFinancialContext = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const SCHEMA_VERSION = 1;
  const ORIGINS = Object.freeze(['user', 'calculated', 'inferred', 'imported']);
  const PERSISTENCE = 'none';

  const cleanString = value => typeof value === 'string' ? value.trim() : '';
  const isoNow = () => new Date().toISOString();

  function normalizePath(path) {
    const value = cleanString(path);
    if (!/^[a-z][a-zA-Z0-9]*(\.[a-z][a-zA-Z0-9]*)*$/.test(value)) {
      throw new Error('Financial fact path must use dot notation such as cashFlow.monthlyIncome.');
    }
    return value;
  }

  function create(options = {}) {
    const now = cleanString(options.now) || isoNow();
    return {
      schemaVersion: SCHEMA_VERSION,
      persistence: PERSISTENCE,
      createdAt: now,
      updatedAt: now,
      locale: {
        region: cleanString(options.region) || 'OTHER',
        currency: cleanString(options.currency) || 'USD'
      },
      facts: {}
    };
  }

  function cloneContext(context) {
    const source = context && typeof context === 'object' ? context : create();
    return {
      schemaVersion: SCHEMA_VERSION,
      persistence: PERSISTENCE,
      createdAt: source.createdAt || isoNow(),
      updatedAt: source.updatedAt || source.createdAt || isoNow(),
      locale: {
        region: cleanString(source.locale?.region) || 'OTHER',
        currency: cleanString(source.locale?.currency) || 'USD'
      },
      facts: Object.fromEntries(Object.entries(source.facts || {}).map(([key, fact]) => [key, { ...fact }]))
    };
  }

  function normalizeOrigin(value) {
    const origin = cleanString(value).toLowerCase();
    return ORIGINS.includes(origin) ? origin : 'user';
  }

  function setLocale(context, locale = {}, options = {}) {
    const next = cloneContext(context);
    next.locale = {
      region: cleanString(locale.region) || next.locale.region,
      currency: cleanString(locale.currency) || next.locale.currency
    };
    next.updatedAt = cleanString(options.now) || isoNow();
    return next;
  }

  function setFact(context, path, value, options = {}) {
    const key = normalizePath(path);
    const next = cloneContext(context);
    const now = cleanString(options.now) || isoNow();
    next.facts[key] = {
      value,
      origin: normalizeOrigin(options.origin),
      lastUpdated: cleanString(options.lastUpdated) || now,
      estimated: Boolean(options.estimated),
      excluded: Boolean(options.excluded),
      unit: cleanString(options.unit) || null,
      sourceEngine: cleanString(options.sourceEngine) || null,
      note: cleanString(options.note) || null
    };
    next.updatedAt = now;
    return next;
  }

  function removeFact(context, path, options = {}) {
    const key = normalizePath(path);
    const next = cloneContext(context);
    delete next.facts[key];
    next.updatedAt = cleanString(options.now) || isoNow();
    return next;
  }

  function setExcluded(context, path, excluded = true, options = {}) {
    const key = normalizePath(path);
    const next = cloneContext(context);
    if (!next.facts[key]) return next;
    next.facts[key] = { ...next.facts[key], excluded: Boolean(excluded) };
    next.updatedAt = cleanString(options.now) || isoNow();
    return next;
  }

  function getFact(context, path, options = {}) {
    const key = normalizePath(path);
    const fact = context?.facts?.[key];
    if (!fact) return null;
    if (fact.excluded && !options.includeExcluded) return null;
    return { ...fact };
  }

  function hasUsableFact(context, path) {
    const fact = getFact(context, path);
    return Boolean(fact && fact.value !== null && fact.value !== undefined && fact.value !== '');
  }

  function collect(context, paths = []) {
    return Object.fromEntries(paths.map(path => [path, getFact(context, path)]));
  }

  function requirementStatus(context, requirements = []) {
    const items = requirements.map(requirement => {
      const item = typeof requirement === 'string' ? { path: requirement } : { ...requirement };
      const path = normalizePath(item.path);
      const stored = context?.facts?.[path] || null;
      const usable = hasUsableFact(context, path);
      const estimated = Boolean(stored?.estimated || stored?.origin === 'inferred');
      return {
        path,
        label: cleanString(item.label) || path,
        required: item.required !== false,
        usable,
        excluded: Boolean(stored?.excluded),
        estimated,
        origin: stored?.origin || null,
        allowEstimate: item.allowEstimate !== false
      };
    });
    return {
      items,
      missing: items.filter(item => item.required && !item.usable).map(item => item.path),
      estimated: items.filter(item => item.usable && item.estimated).map(item => item.path),
      excluded: items.filter(item => item.required && item.excluded).map(item => item.path),
      complete: items.every(item => !item.required || item.usable)
    };
  }

  return Object.freeze({
    SCHEMA_VERSION,
    ORIGINS,
    PERSISTENCE,
    create,
    setLocale,
    setFact,
    removeFact,
    setExcluded,
    getFact,
    hasUsableFact,
    collect,
    requirementStatus
  });
});
