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
  { name: 'how to make a budget finds the budget planner', query: 'how to make a budget', region: 'US', first: '/budget-cash-flow-planner/' },
  { name: 'ETF finds the current ETF guide', query: 'etf', region: 'US', first: '/physical-gold-vs-gold-etf.html' },
  { name: 'index fund waits for the approved LEARN2A guide instead of matching emergency funds', query: 'index fund', region: 'US', count: 0 },
  { name: 'APR waits for the approved LEARN2A guide instead of matching generic rate pages', query: 'apr', region: 'US', count: 0 },
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
