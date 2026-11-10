# Carrowmont Car Affordability handoff / localized starters — Acceptance Ledger

1. **PASS** — Ask car-affordability detail link carries the exact deterministic engine input.
2. **PASS** — Handoff is same-origin session-only, expires, and is deleted on consume.
3. **PASS** — No financial input is added to the URL.
4. **PASS** — Receiving tool validates a fixed field whitelist before applying values.
5. **PASS** — Country/currency context is preserved with the scenario.
6. **PASS** — Direct tool no longer hard-codes India-scale money values into static HTML.
7. **PASS** — NZD starter vehicle example is NZ$30,000, not 1,200,000.
8. **PASS** — Starter values are explicitly described as illustrations, not FX conversion or market data.
9. **PASS** — Once the user edits a money field, locale changes do not silently convert their numbers.
10. **PASS** — Existing deterministic car, loan, borrowing-health and emergency-fund math is unchanged.
11. **PASS** — Existing six Ask resolution journeys, including Money Priorities, remain unchanged.
12. **PASS** — No URL, sitemap, Tools Hub or search-inventory change.
13. **PASS** — QA covers NZD starter values and Ask-to-tool continuity.
14. **PASS** — Full source contract remains green.

## 14-dimension change-impact matrix
Architecture: low; formulas: none; deterministic engines: none; UI: targeted; shared state: one-time session handoff only; localization: starter-example improvement; privacy: no persistent storage/network; URLs: none; SEO: none; reports: none; responsive layout: no structural change; accessibility: no regression expected; QA: expanded; rollback: isolated files only.
