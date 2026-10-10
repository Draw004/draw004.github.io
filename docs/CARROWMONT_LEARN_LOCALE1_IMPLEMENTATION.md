# CARROWMONT LEARN-LOCALE1 — Implementation Record

**Status:** Release candidate implementation record  
**Workstream:** LEARN-LOCALE1 — Global Learn Content Localization  
**Development baseline:** Snapshot 37  
**Snapshot generated:** 10 October 2026 at 14:01:42 UTC

## Baseline commits

- `draw004.github.io`: `94c4f37756eab94b01ca1cd0455700f34f463c66`
- `carrowmont-qa`: `05a41d03d2aa3215284d5d8955b5ac77767a80c4`
- `sip-calculator`: `9309d6b6150c6f09e410b7f0b3c79a456c4c3f42`
- `goal-planner`: `bc61b12b5e1632d99892a9d72d4f11cf147afa57`
- `financial-independence`: `3b0c69be1629ae1f1cfa940d71ab6f192a395d60`
- `inflation-calculator`: `885fb1a09946632dccee1d4f2cb9a3bb686282b5`
- `retirement-calculator`: `3385406f104940f20ff4a7c3769ba34baccca93e`
- `budget-cash-flow-planner`: `b657d819c401bf7d3beeeb797ca706c3d5ac2e55`

Snapshot 37 source contract before implementation: **292 PASS / 0 FAIL**.

## Controlling standards

This implementation is subordinate to:

- `docs/CARROWMONT_SHARED_UI_STANDARD.md`
- `docs/CARROWMONT_ARCHITECTURE.md`
- `docs/CARROWMONT_LEARN_LOCALE1_GLOBAL_LEARN_CONTENT_LOCALIZATION_SPEC_FINAL_REV1.md`

No competing homepage, locale-shell or country/currency architecture was introduced.

## Implementation summary

LEARN-LOCALE1 performs one repository-wide correction rather than a series of manual article patches.

### Shared localization engine

`learn-localization.js` now:

- contains an explicit illustrative example profile for all 34 currencies supported by `locale.js`;
- preserves the existing rule that country controls country-sensitive terminology while selected currency controls monetary presentation;
- exposes reusable declarative bindings for localized Learn amounts and terms;
- supports target-scaled, monthly-investment-scaled and unit-price illustrative values;
- preserves INR lakh/crore formatting where appropriate;
- uses globally understandable million/billion presentation for non-INR compact examples;
- updates in response to the existing `carrowmont:localechange`, page-show and storage synchronization mechanisms;
- calls no FX, geolocation or third-party localization API.

Illustrative values are deliberately round educational examples. They are not exchange-rate conversions.

### Learn content migration

All 53 pages using the shared Learn-localization layer are included in the permanent scanner.

The 33 pages identified by the approved pre-release audit were corrected. Hard-coded user-facing INR examples were migrated to shared declarative amount bindings with neutral static fallbacks. General prose using India-only monetary wording was rewritten in global terms. Legacy SIP-focused pages keep their canonical URLs but now localize visible terminology at runtime.

Stable `data-cm-page` identifiers were added where required for:

- `compounding-and-time.html`
- `planning-life-goals.html`
- `todays-money-vs-future-money.html`

### Financial Independence Guide regression

`financial-independence-number.html` no longer leaves the rich first-pass table hard-coded in INR. Annual spending and all withdrawal-rate targets now follow the selected currency while preserving the deterministic relationship:

`FI target = annual portfolio-funded spending / starting withdrawal rate`

### Asset-cache and narrow-screen safety

All 53 Learn/hub pages now reference the versioned shared localization asset `learn-localization.js?v=20261010-global1`, so browsers cannot remain pinned to the pre-localization script after deployment. All 52 standardized Learn Article pages similarly reference `learn-article.css?v=20261010-global1`.

The Learn-only article stylesheet also allows long related-guide links to wrap on narrow screens. This fixes the 360 px overflow found during release-candidate visual/browser preflight without changing the global `.text-link` behavior used by the homepage or other site surfaces.

### Static fallback

The changed general Learn pages now provide global-neutral monetary examples in raw HTML. JavaScript enhances those examples according to the user's stored country and selected currency. This keeps the content readable without JavaScript and prevents a global guide from being crawled with India-only example units.

### Homepage and tools-directory protection

This release does not intentionally modify:

- homepage `index.html`;
- `/tools.html`;
- `CARROWMONT_HOMEPAGE_TOOL_DEMAND_MATRIX.md`;
- TOOLS-HUB1 country-to-order mappings;
- the six calculator repositories;
- shared header/footer/locale-pill geometry;
- any calculator formula.

Central browser QA explicitly rechecks India and non-India homepage order, investment terminology, card visuals and the fixed `Explore All Tools` gateway.

## Release-candidate validation

Before packaging, the implementation passed:

- central source contract: **304 PASS / 0 FAIL**;
- explicit Learn example profiles: **34/34 currencies**;
- all 33 initially affected pages across India/INR, US/USD, UK/GBP, Canada/CAD, Australia/AUD, EUR, BDT and OMR representative profiles;
- all 53 Learn/hub pages at both **390 px and 360 px** under India/INR and US/USD browser contexts;
- Financial Independence guide rich-table localization for all 34 supported currencies;
- country/currency independence (`US` country with `EUR` selected currency);
- TOOLS-HUB homepage India/US ordering, investment terminology, card-icon count, Explore All Tools gateway and Explore More section;
- visual inspection of Financial Independence and recurring-investment guide renders on desktop/mobile.

## QA added

`carrowmont-qa/tests/13-learn-localization.spec.js` protects:

- explicit profiles for all 34 currencies;
- representative country/currency switching;
- Financial Independence rich-table localization;
- India vs non-India SIP terminology;
- previously missing example-profile currencies;
- currency-only switching without country reset;
- TOOLS-HUB homepage non-regression;
- 390 px and 360 px overflow behavior.

The central source contract permanently scans all 53 Learn/hub pages for raw user-facing `₹`, lakh/crore, rupee and SIP leakage in main content.

## Release scope

Expected generated release PR count: **2**

1. `draw004.github.io`
2. `carrowmont-qa`

No `.github/workflows/*` file is changed. Release Automation Workflows: Read and write is **not required**.

## Release order

1. Publisher must be GREEN before merging generated PRs.
2. Merge `draw004.github.io` first.
3. Merge `carrowmont-qa` last.
4. Wait for Pages/IndexNow processing as applicable.
5. Run live Automated QA.
6. Run Multi-Repo Guard.
7. Take a fresh Source Snapshot and use it as the next authoritative baseline.

