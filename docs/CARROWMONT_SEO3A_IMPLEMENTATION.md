# Carrowmont SEO3A — 4% Rule Stress Test Implementation Record

**Implementation date:** 9 October 2026  
**Source baseline:** Carrowmont Source Snapshot 23  
**Public route:** `https://carrowmont.com/4-percent-rule-stress-test.html`

## Purpose

SEO3A adds Carrowmont's first interactive authority asset for the SEO3 program: a transparent, deterministic 4% Rule Stress Test. It helps users explore how inflation, retirement length and the order of returns can affect a fixed inflation-adjusted withdrawal plan.

The implementation does not change the approved Retirement Planner calculation engine.

## Source baseline commits

- `draw004.github.io` — `06778cbae184a225ffee3c45415a702751739fde`
- `retirement-calculator` — `cc204fd06e21039ed153c956e1b24d29280524d3`
- `carrowmont-qa` — `18a2735f86074fcacdb21722c3477d6f68ec31a9`

## New public asset

The new page provides:

- Base, Cautious and Adverse deterministic scenarios;
- weak-first versus strong-first comparison using the same ten normalized annual returns in reverse order;
- 3%, 3.5%, 4% and 5% sensitivity comparison;
- annual calculation table;
- Copy Summary;
- CSV export;
- standardized PDF report;
- methodology, FAQ, sources, privacy and educational-use disclosures;
- shared Carrowmont country/currency controls and footer.

## Calculation convention

For each retirement year:

1. record opening balance;
2. take the inflation-adjusted withdrawal at the start of the year;
3. apply the scenario return to the remaining balance;
4. record investment growth/loss and closing balance;
5. increase the next withdrawal using the scenario inflation rate.

The model never shows a negative portfolio balance. If the full scheduled withdrawal cannot be funded, it marks depletion during that year.

## Scenario architecture

### Base

Uses the user-entered nominal return and inflation every year.

### Cautious

Uses the entered return minus 1.5 percentage points and inflation plus 1 percentage point, within the documented input limits.

### Adverse early sequence

Uses a disclosed synthetic ten-year weak-first return template, normalized so its geometric average matches the entered long-run nominal return. Inflation is two percentage points higher for the first ten years.

### Sequence comparison

Uses the same normalized ten annual returns in weak-first and strong-first order. Base inflation is used so the difference is attributable to return order.

## Integration

- The existing 4% Rule guide now links prominently to the Stress Test.
- Sequence-of-returns and longevity guides link to the Stress Test.
- The Learn hub features the interactive asset in retirement content.
- The Retirement Planner includes a contextual link without changing any formula.
- The main sitemap includes the new URL with an accurate `lastmod`.
- The existing IndexNow workflow will submit the new/changed URL after deployment.

## Privacy and data handling

- All calculations run locally in the browser.
- No account or cloud storage is required.
- Financial inputs are not added to URLs.
- Financial inputs are not intentionally sent in analytics events.
- No backend or API key is used.

## Report architecture

The PDF uses the same immutable result object as the webpage and CSV. It includes scenario summaries, charts, sequence comparison, rate comparison, annual values, Report Guide & Methodology, and Continue Planning with Carrowmont.

## QA protection

Central QA covers:

- source/SEO contracts;
- independent calculation fixtures;
- sequence normalization and reverse-order parity;
- browser loading, layout, accessibility and chart geometry;
- Copy Summary, CSV and PDF parity;
- internal-link health;
- privacy and no-secret checks;
- sitemap and IndexNow continuity.

## Calculation safety

No existing SIP, Goal, Financial Independence, Inflation, Retirement or Budget calculation engine is modified by this release.


## Post-release presentation refinements

After live visual review, SEO3A received a presentation-only hardening pass. Chart callouts now measure their rendered text, remain inside the plotting rectangle, avoid their anchor markers and avoid overlapping other callouts. The Annual Values table uses the same collapsed native disclosure pattern established in other Carrowmont tools, while retaining all year-by-year rows in the page. The PDF summary explanation card now sizes from the actual wrapped text instead of reserving an oversized fixed block. These refinements do not change any withdrawal, inflation, return, depletion, CSV or report calculation.
