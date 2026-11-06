(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarrowmontFreEngineCatalog = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CATALOG_VERSION = 2;
  const ENGINES = Object.freeze([
    { id:'recurring-investment', api:'CarrowmontSIPCore', status:'READY_WITH_ADAPTER', priority:'A' },
    { id:'goal-planner', api:'CarrowmontGoalCore', status:'READY_WITH_ADAPTER', priority:'A' },
    { id:'financial-independence', api:'CarrowmontFICore', status:'READY_WITH_ADAPTER', priority:'A' },
    { id:'inflation', api:'CarrowmontInflationCore', status:'READY_WITH_ADAPTER', priority:'A' },
    { id:'retirement', api:'CarrowmontRetirementCore', status:'READY_WITH_ADAPTER', priority:'A' },
    { id:'budget-cash-flow', api:'CarrowmontBudgetCore', status:'READY_WITH_ADAPTER', priority:'A' },
    { id:'mortgage-payoff', api:'CarrowmontMortgageCore', status:'READY_WITH_ADAPTER', priority:'A' },
    { id:'compound-interest', api:'CarrowmontCompoundCore', status:'READY_WITH_ADAPTER', priority:'A' },
    { id:'loan', api:'CarrowmontLoanCore', status:'READY_WITH_ADAPTER', priority:'A' },
    { id:'debt-payoff', api:'CarrowmontDebtPayoffCore', status:'READY_WITH_ADAPTER', priority:'A' },
    { id:'retirement-withdrawal', api:'CarrowmontWithdrawalCore', status:'READY_WITH_ADAPTER', priority:'B' },
    { id:'home-affordability', api:'CarrowmontHomeAffordabilityCore', status:'READY_WITH_ADAPTER', priority:'A' },
    { id:'rent-vs-buy', api:'CarrowmontRentVsBuyCore', status:'READY_WITH_ADAPTER', priority:'B' },
    { id:'mortgage-prepay-vs-invest', api:'CarrowmontMdc1aCore', status:'READY_WITH_ADAPTER_DEPENDENCY', priority:'A' },
    { id:'mortgage-refinance', api:'CarrowmontMdc1bCore', status:'READY_WITH_ADAPTER', priority:'B' },
    { id:'mortgage-rate-stress', api:'CarrowmontMdc1cCore', status:'READY_WITH_ADAPTER', priority:'B' },
    { id:'four-percent-stress', api:'CarrowmontFourPercentCore', status:'READY_WITH_ADAPTER', priority:'B' },
    { id:'fi-number-by-spending', api:'CarrowmontFINumberBySpendingCore', status:'READY_WITH_ADAPTER', priority:'B' },
    { id:'us-debt-interest', api:'CarrowmontUSDebtInterestCore', status:'CONTEXT_ONLY_READY', priority:'C' },
    { id:'gold-macro-stress', api:'CarrowmontGoldMacroCore', status:'CONTEXT_ONLY_READY', priority:'C' },
    { id:'silver-macro-stress', api:'CarrowmontSilverMacroCore', status:'CONTEXT_ONLY_READY', priority:'C' },
    { id:'market-chain-reaction', api:'CarrowmontMarketChainCore', status:'CONTEXT_ONLY_READY', priority:'C' }
  ]);
  const byId = Object.freeze(Object.fromEntries(ENGINES.map(engine => [engine.id, Object.freeze({ ...engine })])));
  const get = id => byId[id] || null;
  const list = () => ENGINES.map(engine => ({ ...engine }));
  const needsExtraction = () => list().filter(engine => engine.status === 'EXTRACT_PURE_CORE_BEFORE_FRE');

  return Object.freeze({ CATALOG_VERSION, ENGINES, get, list, needsExtraction });
});
