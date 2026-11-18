# Carrowmont FRE Batch 12 — UX, Search and Learn Implementation

**Implementation baseline:** Source snapshot generated 17 November 2026, supplied as the 18 November 2026 snapshot package  
**Main-site reviewed base commit:** `d80afc6f5d05e44353f2cbf9a84cb8077317db3c`  
**Implementation date:** 18 November 2026

## Purpose

This batch closes several user-facing friction points before expanding Carrowmont Learn. It intentionally changes presentation, navigation, search assistance, My Carrowmont interaction, PWA launch polish, Learn content, discovery metadata and QA. It does **not** change financial formulas, calculator engines or deterministic planning methodology.

## 1. Homepage Ask rollback

The large embedded Ask form introduced on the Home hero is removed. Home again uses a compact `Not sure which tool to use? Ask Carrowmont` entry that routes into the dedicated Ask experience.

Why: Home should introduce Carrowmont and route the user. The full Ask interface belongs on the Ask page rather than competing with the hero and tool journey.

## 2. Single active navigation state

The mobile bottom navigation no longer gives Ask a permanent selected-looking treatment. The current route is the sole source of active state and `aria-current="page"` is reserved for the current destination.

Expected behavior:

- Home -> Home only
- My Carrowmont -> My Money only
- Ask -> Ask only
- Tools -> Tools only

The fix is shared rather than page-specific so the double-active appearance does not need separate patches on each route.

## 3. Ask and Search typing assistance

Search Core is upgraded to `1.2.0` with conservative local typo correction and partial-query prediction. Search and Ask now support:

- two-character predictive suggestions;
- edit-distance/fuzzy correction for common misspellings;
- browser spellcheck/autocorrect/autocapitalize hints;
- accessible autocomplete/listbox semantics;
- correction before an Ask query falls through to an unsupported result;
- no premature `No close matches` state while the user is clearly still typing.

Verified examples include:

- `retirment` -> `retirement`
- `mutal fund` -> `mutual fund`
- `mortage` -> `mortgage`
- `compound intrest` -> `compound interest`
- `re` -> useful retirement predictions

All matching remains inside Carrowmont's local search inventory. The implementation does not send each typed query to an external search provider.

## 4. My Carrowmont attention summary

The financial-plan summary now identifies the planning areas that need attention instead of showing only a count.

Each flagged area is actionable:

1. the summary names the affected area;
2. the user can tap/click it;
3. the page scrolls to the corresponding planning card;
4. accessibility focus moves to that card;
5. the destination receives a brief visual highlight;
6. reduced-motion preferences are respected.

When exactly one area needs attention, the overview itself can act as the shortcut. Existing plan/report calculations are unchanged.

## 5. PWA launch polish

The Android/browser-generated PWA splash remains a system-owned static surface. Carrowmont now adds a lightweight branded transition only after the application begins rendering.

The transition:

- appears only in installed/standalone/PWA launch contexts;
- uses the Carrowmont `C` and subtle dot motion;
- releases on render readiness with a bounded fallback;
- never deliberately holds a ready page;
- disables animation for `prefers-reduced-motion`.

This is launch-perception polish, not a substitute for performance work.

## 6. Learn editorial standard 2.3

`.github/LEARN-ARTICLE-STANDARD.md` is upgraded to version 2.3. The standard now explicitly requires:

- understanding-first education rather than thin SEO answers;
- the six-question learning test: what, how, why, outcome drivers, failure modes and decision framework;
- `concept -> worked example -> change an assumption -> explain the effect` where numbers materially matter;
- contextual tool links as the next part of the lesson rather than generic promotion;
- an existing-library/content-collision audit before a new public Learn URL is approved;
- upgrading an existing guide when it already owns the intent;
- Search Console/search evidence for prioritization without keyword-driven duplicate creation.

## 7. Learn Wave 1

A source-level review showed that some initially proposed topics already existed in substantial form. The batch therefore creates seven genuinely distinct guides and upgrades one existing guide instead of publishing eight competing URLs.

### New guides

1. `mutual-funds-explained.html`
2. `pay-off-debt-or-invest.html`
3. `balance-transfer-credit-card.html`
4. `where-to-keep-short-term-savings.html`
5. `what-to-do-with-a-lump-sum.html`
6. `early-retirement-planning.html`
7. `how-much-save-for-retirement-each-month.html`

Each guide uses the established Carrowmont Learn presentation and includes a direct answer, deeper mechanics, worked examples, decision context, risks/limitations, FAQs, authoritative sources, country-aware caveats where relevant, related guides and an appropriate Carrowmont tool journey.

### Existing guide deepened

`planning-life-goals.html` now owns the `how to prioritize multiple financial goals` intent more fully. The new material adds a funding-ladder framework, a four-stage priority model, worked multi-goal allocation, floor/target/stretch contribution levels and re-prioritization rules.

No duplicate `prioritize financial goals` URL is created.

## 8. Learn hub, internal links and discovery

The seven new guides are placed in Carrowmont's existing Learn clusters rather than creating a Batch-specific category. They are also connected through contextual inbound links from relevant existing guides.

Discovery updates include:

- `learn.html` cluster placement;
- `sitemap.xml` inclusion;
- `data/carrowmont-search-pages.json` entries;
- rebuilt `data/carrowmont-search-index.json` semantic entries;
- upgraded aliases for the existing multi-goal guide;
- canonical, Article and BreadcrumbList structured data;
- reviewed title/description metadata.

The public search inventory is now 145 unique URLs and the new Learn pages have semantic topic coverage.

## 9. QA and acceptance

### Completed source/deterministic checks

- Carrowmont source contract: **1289 PASS / 0 FAIL**
- Search deterministic fixture suite: **85 / 85 PASS**
- Changed JavaScript syntax checks: **PASS**
- Dedicated FRE Batch 12 source contract covers homepage Ask rollback, navigation active-state behavior, typo/prediction support, Ask/Search accessibility/privacy, My Carrowmont jumps, PWA transition, seven new Learn guides, the existing-guide upgrade and sitemap/search inventory parity.

### Browser acceptance

Dedicated Playwright coverage is included for the changed Home, My Carrowmont, Ask, Search and Learn journeys. The local build container did not contain the snapshot's Playwright runtime dependencies and its system Chromium could not complete a usable headless launch, so browser execution is intentionally left to Carrowmont's normal staged publisher QA, which installs the pinned browser-test runtime before running the suite.

This is an execution-environment limitation, not a waived browser gate. The Batch PR Publisher must still pass staged Chrome/browser/PDF QA before normal human merge review.

## 10. Release and rollback boundaries

Only `draw004.github.io` and `carrowmont-qa` are changed in this batch. No calculator repository requires a formula change.

Release remains:

`Fresh Source Snapshot -> reviewed release bundle -> Batch PR Publisher -> staged QA -> human PR review/merge -> Automated QA -> Multi-Repo Guard -> fresh Source Snapshot`

Normal product/content changes are not auto-merged.
