# Batch 12B-1 - Credit Card Decisions UX consolidation

**Status:** implemented in review release; not merged or live until Publisher, browser QA, Guard and human acceptance are green.
**Baseline:** `carrowmont-source-snapshot - 2026-11-20T004453.791.zip` (`SNAPSHOT-MANIFEST.txt` authoritative).

## Requirements and acceptance

1. **Same canonical public page.** Preserve `/budget-cash-flow-planner/credit-card-payoff-calculator.html` and its existing `<title>`, meta description, canonical, sitemap and search intent. The `#balance-transfer` fragment selects the transfer mode, not another URL.
2. **Two modes in one workspace.** Payoff and balance transfer are explicit accessible tabs; only the selected inputs/results are visible. Desktop shows inputs beside results; phone stacks them. No second copy of the full calculator farther down the page.
3. **First-click routing.** A tap on the inline transfer link selects the form immediately, scrolls to the visible field area, and works from direct Learn/Tools deep links, reload and Back navigation.
4. **Shared input context.** Balance, current APR and monthly payment follow the currently selected mode without creating separate account state. Minimum payment and target months remain payoff-only; promotional terms remain transfer-only. Inputs transfer in memory, not account data.
5. **One canonical country/currency selector.** Use existing tested `locale.js`; selector includes SVG globe, country+currency, chevron, ARIA label and approved popover. Currency changes labels/number formats, never converts numbers.
6. **Methodology and print.** Exactly one `#methodology` target, collapsed explanatory details, unique IDs; print only the selected comparison and its important information. Existing generated payoff PDF remains unchanged.
7. **Return navigation.** `Compare multiple debts` uses a non-sensitive `?from=credit-card` route hint. Debt Payoff exposes `Back to Credit Card Payoff` for that journey; direct visits retain their normal navigation.
8. **Financial/Privacy boundaries.** No change to payoff or balance-transfer calculation cores, the payoff PDF renderer, My Carrowmont save contract, authenticated data, analytics or PWA behaviour. Transfer calculations are still browser-only what-if results.
9. **Release.** Publisher standards preflight, 11-repo source contract, balance-transfer deterministic fixtures, desktop/mobile browser QA, Multi-Repo Guard and green snapshot are required. Never claim browser QA green based only on static checks.

## QA ownership

- `carrowmont-qa/scripts/fre-batch12b1-ux-contract.mjs`: source and integration contract.
- `carrowmont-qa/tests/91-fre12b1-credit-card-ux.spec.js`: first-click deep link, reload/history, shared values, locale, unique anchors, return route, mobile overflow and print.
- Existing `tests/60-fre2d-credit-card-payoff.spec.js` and `tests/88-fre12b1-balance-transfer.spec.js` continue to guard unchanged engines and results.

## Explicitly deferred

No new calculator URL; no changes to PDF report layout; no conversion of credit-card what-if data into saved plans; no changes to the original roadmap's Batch 13 optional connected-data scope.
