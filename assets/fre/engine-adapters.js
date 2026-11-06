(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFreEngineAdapters = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CONTRACT_VERSION = 1;
  const clean = value => typeof value === 'string' ? value.trim() : '';
  const freezeArray = value => Object.freeze(Array.isArray(value) ? [...value] : []);

  function defineAdapter(definition = {}) {
    const id = clean(definition.id);
    if (!id) throw new Error('Engine adapter id is required.');
    if (typeof definition.invoke !== 'function') throw new Error(`Engine adapter ${id} must provide an invoke function.`);
    return Object.freeze({
      id,
      contractVersion: CONTRACT_VERSION,
      engineVersion: clean(definition.engineVersion) || 'unknown',
      requiredInputs: freezeArray(definition.requiredInputs),
      optionalInputs: freezeArray(definition.optionalInputs),
      pure: definition.pure !== false,
      invoke: definition.invoke
    });
  }

  function normalizeEnvelope(adapter, request, result) {
    const value = result && typeof result === 'object' ? result : { raw: result };
    const metrics = value.metrics && typeof value.metrics === 'object' ? value.metrics : {};
    return Object.freeze({
      adapterContractVersion: CONTRACT_VERSION,
      engineId: adapter.id,
      engineVersion: clean(value.engineVersion) || adapter.engineVersion,
      currency: clean(value.currency) || clean(request?.currency) || null,
      inputsUsed: Object.freeze({ ...(value.inputsUsed || request?.inputs || {}) }),
      assumptions: freezeArray(value.assumptions),
      warnings: freezeArray(value.warnings),
      metrics: Object.freeze({ ...metrics }),
      raw: value.raw === undefined ? null : value.raw
    });
  }

  function createRegistry(initial = []) {
    const adapters = new Map();

    function register(definition) {
      const adapter = defineAdapter(definition);
      if (adapters.has(adapter.id)) throw new Error(`Engine adapter already registered: ${adapter.id}`);
      adapters.set(adapter.id, adapter);
      return api();
    }

    function api() {
      return Object.freeze({ register, has, get, list, run });
    }

    function has(id) { return adapters.has(id); }
    function get(id) { return adapters.get(id) || null; }
    function list() { return Array.from(adapters.values()).map(adapter => ({ id: adapter.id, engineVersion: adapter.engineVersion, pure: adapter.pure })); }

    function run(id, request = {}) {
      const adapter = get(id);
      if (!adapter) throw new Error(`No FRE engine adapter registered for ${id}.`);
      const inputs = request.inputs && typeof request.inputs === 'object' ? request.inputs : {};
      const missing = adapter.requiredInputs.filter(key => inputs[key] === undefined || inputs[key] === null || inputs[key] === '');
      if (missing.length) throw new Error(`Missing required inputs for ${id}: ${missing.join(', ')}`);
      const result = adapter.invoke(Object.freeze({ ...request, inputs: Object.freeze({ ...inputs }) }));
      if (result && typeof result.then === 'function') throw new Error('FRE Batch 1A adapters must be synchronous deterministic functions.');
      return normalizeEnvelope(adapter, request, result);
    }

    initial.forEach(register);
    return api();
  }

  return Object.freeze({ CONTRACT_VERSION, defineAdapter, createRegistry });
});
