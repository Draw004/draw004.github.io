#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const coreSource = fs.readFileSync(path.join(root, 'search-core.js'), 'utf8');
const index = JSON.parse(fs.readFileSync(path.join(root, 'data', 'carrowmont-search-index.json'), 'utf8'));
const aliases = JSON.parse(fs.readFileSync(path.join(root, 'data', 'carrowmont-search-aliases.json'), 'utf8'));
const sandbox = {};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(coreSource, sandbox, { filename: 'search-core.js' });
const core = sandbox.CarrowmontSearchCore;
if (!core || typeof core.search !== 'function') throw new Error('SEARCH1 core did not expose a deterministic search function.');

const fixtures = [
  { name: 'SIP finds the recurring-investment tool', query: 'sip', region: 'IN', first: '/sip-calculator/' },
  { name: 'recurring investment finds the same tool', query: 'recurring investment', region: 'US', first: '/sip-calculator/' },
  { name: 'EMI finds the loan calculator', query: 'emi', region: 'IN', first: '/loan-calculator/' },
  { name: 'remortgage finds refinance break-even', query: 'remortgage', region: 'GB', first: '/mortgage-payoff-calculator/refinance-break-even.html' },
  { name: 'SWP finds retirement withdrawals', query: 'swp', region: 'IN', first: '/retirement-calculator/withdrawal-calculator.html' },
  { name: 'home loan finds home-loan tools', query: 'home loan', region: 'IN', includes: ['/mortgage-payoff-calculator/', '/home-affordability-calculator.html'] },
  { name: 'how to make a budget finds the evergreen guide', query: 'how to make a budget', region: 'US', first: '/how-to-make-a-budget.html' },
  { name: 'ETF finds the general ETF foundation guide', query: 'etf', region: 'US', first: '/what-is-an-etf.html' },
  { name: 'index fund finds the approved LEARN2A guide', query: 'index fund', region: 'US', first: '/index-funds-explained.html' },
  { name: 'investing for beginners finds the foundation guide', query: 'investing for beginners', region: 'US', first: '/investing-for-beginners.html' },
  { name: 'APR finds the approved borrowing-cost guide', query: 'apr', region: 'US', first: '/apr-vs-interest-rate.html' },
  { name: 'credit score finds the credit foundation guide', query: 'credit score', region: 'US', first: '/credit-score-explained.html' },
  { name: 'credit rating finds the same guide in Australia', query: 'credit rating', region: 'AU', first: '/credit-score-explained.html' },
  { name: 'debt consolidation finds the total-cost guide', query: 'debt consolidation', region: 'CA', first: '/debt-consolidation-explained.html' },
  { name: 'credit card interest finds the revolving-debt guide', query: 'credit card interest', region: 'GB', first: '/how-credit-card-interest-works.html' },
  { name: '50 30 20 budget finds the focused framework guide', query: '50 30 20 budget', region: 'US', first: '/50-30-20-budget-rule.html' },
  { name: 'payday budget finds pay-frequency planning', query: 'payday budget', region: 'US', first: '/budgeting-by-pay-frequency.html' },
  { name: 'variable income budget finds the irregular-income guide', query: 'variable income budget', region: 'CA', first: '/budgeting-with-irregular-income.html' },
  { name: 'cash flow vs income finds the focused explanation', query: 'cash flow vs income', region: 'OTHER', first: '/cash-flow-vs-income.html' },
  { name: 'every dollar budget finds zero-based budgeting', query: 'every dollar budget', region: 'US', first: '/zero-based-budgeting.html' },
  { name: 'pay yourself first finds the focused saving-priority guide', query: 'pay yourself first', region: 'AU', first: '/pay-yourself-first-budgeting.html' },
  { name: 'how much emergency fund finds the sizing guide', query: 'how much emergency fund', region: 'CA', first: '/emergency-fund-how-much.html' },
  { name: 'emergency liquidity finds the purpose guide', query: 'emergency liquidity', region: 'GB', first: '/emergency-savings.html' },
  { name: 'sinking fund finds the expected-cost guide', query: 'sinking fund', region: 'AU', first: '/sinking-fund-vs-emergency-fund.html' },
  { name: 'savings goal finds the planning guide', query: 'savings goal', region: 'OTHER', first: '/savings-goal-planning.html' },
  { name: 'lifestyle creep finds lifestyle inflation', query: 'lifestyle creep', region: 'US', first: '/lifestyle-inflation.html' },
  { name: 'debt snowball vs avalanche finds the method comparison', query: 'debt snowball vs avalanche', region: 'IN', first: '/debt-snowball-vs-avalanche.html' },
  { name: 'monthly investment growth finds the fixed-contribution guide', query: 'monthly investment growth', region: 'US', first: '/10000-sip-returns.html' },
  { name: 'investment needed for target finds the target-funding guide', query: 'investment needed for target', region: 'OTHER', first: '/sip-for-1-crore.html' },
  { name: 'step up SIP finds the fixed-vs-increasing guide', query: 'step up sip vs regular sip', region: 'IN', first: '/step-up-sip-vs-regular-sip.html' },
  { name: 'compound interest monthly contributions finds the mechanics guide', query: 'compound interest monthly contributions', region: 'US', first: '/compound-interest-monthly-contributions.html' },
  { name: 'time to investment target finds the timing guide', query: 'time to investment target', region: 'CA', first: '/investment-time-to-target.html' },
  { name: 'start investing early finds the early-start guide', query: 'start investing early', region: 'AU', first: '/starting-investing-earlier.html' },
  { name: 'investing during downturn finds the market-fall guide', query: 'investing during downturn', region: 'GB', first: '/sip-during-market-fall.html' },
  { name: 'lump sum vs staged investing finds the timing guide', query: 'lump sum vs staged investing', region: 'US', first: '/lump-sum-vs-monthly-investing.html' },
  { name: 'compound interest over time finds the compounding foundation', query: 'compound interest over time', region: 'CA', first: '/compounding-and-time.html' },
  { name: 'portfolio allocation finds the asset-allocation guide', query: 'portfolio allocation', region: 'AU', first: '/asset-allocation-explained.html' },
  { name: 'portfolio diversification finds the diversification guide', query: 'portfolio diversification', region: 'GB', first: '/diversification-across-asset-classes.html' },
  { name: 'stocks vs fixed income finds the stocks-and-bonds guide', query: 'stocks vs fixed income', region: 'US', first: '/stocks-vs-bonds.html' },
  { name: 'how much to invest monthly finds the goal-funding guide', query: 'how much to invest monthly', region: 'OTHER', first: '/how-much-should-i-invest-each-month.html' },
  { name: 'retirement savings benchmark by age finds the benchmark guide', query: 'retirement savings benchmark by age', region: 'US', first: '/retirement-savings-by-age.html' },
  { name: 'retirement monthly income finds the income-needs guide', query: 'retirement monthly income', region: 'CA', first: '/retirement-monthly-income-needed.html' },
  { name: 'retirement expense checklist finds the expense guide', query: 'retirement expense checklist', region: 'GB', first: '/retirement-expenses.html' },
  { name: 'retirement inflation finds the two-stage inflation guide', query: 'retirement inflation', region: 'AU', first: '/inflation-and-retirement-planning.html' },
  { name: 'retirement money runway finds the savings-longevity guide', query: 'how long will my retirement money last', region: 'OTHER', first: '/how-long-will-retirement-savings-last.html' },
  { name: 'retirement 4 percent rule finds the explanatory guide', query: 'retirement 4 percent rule', region: 'US', first: '/4-percent-rule-retirement.html' },
  { name: 'retirement sequence risk finds the sequence guide', query: 'retirement sequence risk', region: 'US', first: '/sequence-of-returns-risk.html' },
  { name: 'retirement longevity risk finds the longevity guide', query: 'retirement longevity risk', region: 'GB', first: '/longevity-risk-retirement.html' },
  { name: 'FI number query finds the target-definition guide', query: 'fi number', region: 'US', first: '/financial-independence-number.html' },
  { name: 'FI timeline query finds the timing guide', query: 'financial independence timeline', region: 'CA', first: '/when-can-i-reach-financial-independence.html' },
  { name: 'Coast FI number finds the Coast FIRE guide', query: 'coast fi number', region: 'AU', first: '/coast-fire-explained.html' },
  { name: 'future purchasing power finds the value-over-time guide', query: 'future purchasing power', region: 'GB', first: '/inflation-value-of-money-over-time.html' },
  { name: 'future expense cost finds the future-cost guide', query: 'future expense cost', region: 'OTHER', first: '/future-cost-of-expenses.html' },
  { name: 'purchasing power of savings finds the savings-specific guide', query: 'purchasing power of savings', region: 'US', first: '/inflation-purchasing-power-savings.html' },
  { name: 'price level vs inflation finds the inflation foundation', query: 'price level vs inflation', region: 'GB', first: '/inflation-purchasing-power.html' },
  { name: 'real terms vs nominal terms finds the money-basis guide', query: 'real terms vs nominal terms', region: 'AU', first: '/todays-money-vs-future-money.html' },
  { name: 'every two weeks mortgage finds the cadence guide', query: 'every two weeks mortgage', region: 'US', first: '/biweekly-fortnightly-mortgage-payments.html' },
  { name: 'mortgage prepayment early vs late finds the timing guide', query: 'mortgage prepayment early vs late', region: 'GB', first: '/extra-mortgage-payments-early-vs-late.html' },
  { name: 'monthly extra payment vs lump sum finds the fair timing comparison', query: 'monthly extra payment vs lump sum mortgage', region: 'CA', first: '/monthly-extra-vs-annual-lump-sum-mortgage.html' },
  { name: '13th mortgage payment finds the annual extra-payment guide', query: '13th mortgage payment', region: 'US', first: '/one-extra-mortgage-payment-a-year.html' },
  { name: 'mortgage payoff target five years finds the target-payoff guide', query: 'mortgage payoff target five years', region: 'AU', first: '/pay-off-mortgage-five-years-early.html' },
  { name: 'gross rental yield finds the yield guide', query: 'gross rental yield', region: 'AU', first: '/rental-yield-explained.html' },
  { name: 'REIT vs rental property finds the structure comparison', query: 'reit vs rental property', region: 'US', first: '/reit-vs-direct-property.html' },
  { name: 'REIT meaning finds the REIT foundation guide', query: 'reit meaning', region: 'GB', first: '/what-is-a-reit.html' },
  { name: 'property vs shares finds the property-equity comparison', query: 'property vs shares', region: 'IN', first: '/real-estate-vs-stocks.html' },
  { name: 'real yield finds the real-yield foundation guide', query: 'real yield', region: 'US', first: '/real-yields-explained.html' },
  { name: 'US debt interest expense finds the debt-cost mechanics guide', query: 'us debt interest expense', region: 'US', first: '/why-us-debt-interest-costs-matter.html' },
  { name: 'Treasury bills notes bonds finds the maturity guide', query: 'treasury bills notes bonds', region: 'US', first: '/treasury-bills-vs-notes-vs-bonds.html' },
  { name: 'reserve currency finds the reserve-currency foundation guide', query: 'reserve currency', region: 'OTHER', first: '/what-makes-a-global-reserve-currency.html' },
  { name: 'central bank gold buying finds the official-demand guide', query: 'central bank gold buying', region: 'OTHER', first: '/why-central-banks-buy-gold.html' },
  { name: 'dedollarization finds the de-dollarisation guide', query: 'dedollarization', region: 'US', first: '/de-dollarisation-explained.html' },
  { name: 'gold vs Treasuries reserves finds the reserve-asset comparison', query: 'gold vs treasuries reserves', region: 'US', first: '/gold-vs-government-bonds-reserve-assets.html' },
  { name: 'mortgage affordability monitor finds the Research study', query: 'mortgage affordability monitor', region: 'US', first: '/research/mortgage-affordability-monitor.html' },
  { name: 'mortgage affordability calculator stays owned by the tool', query: 'mortgage affordability calculator', region: 'US', first: '/home-affordability-calculator.html' },
  { name: 'nonsense returns no misleading match', query: 'zzzzxyqnotatopic', region: 'OTHER', count: 0 }
];

let passed = 0;
for (const fixture of fixtures) {
  const results = core.search(index.entries, aliases, fixture.query, { region: fixture.region, limit: 12 });
  if (fixture.first && results[0]?.url !== fixture.first) {
    throw new Error(`${fixture.name}: expected first ${fixture.first}, received ${results[0]?.url || 'no result'}`);
  }
  if (fixture.includes) {
    const urls = new Set(results.map(result => result.url));
    for (const expected of fixture.includes) {
      if (!urls.has(expected)) throw new Error(`${fixture.name}: missing ${expected}`);
    }
  }
  if (Number.isInteger(fixture.count) && results.length !== fixture.count) {
    throw new Error(`${fixture.name}: expected ${fixture.count} results, received ${results.length}`);
  }
  passed += 1;
  console.log(`PASS  ${fixture.name}`);
}
console.log(`\n${passed} SEARCH1 deterministic fixtures PASS`);
