# Carrowmont Learn Final Consistency Closeout Implementation

**Baseline:** Carrowmont Source Snapshot 107 (`2026-10-22T15:40:01Z`)  
**Main-site commit:** `9e554aebc610808e764c14cc9f5a4afd2a71f7cf`  
**Central-QA commit:** `8b9aa337ed2011652a2d1400e1bacad8044fac0e`

## Purpose

This is the controlled whole-library closeout promised after LEARN3F-2. It addresses repeated presentation defects observed during manual review without reopening the completed topic-led rewrite programme. It preserves stable URLs, search intent ownership, calculation engines, privacy, analytics and release discipline.

## Implemented

- Standardized the visible direct-answer label across all **90** current Learn articles to **30-second answer**.
- Fixed the shared `.guide-steps` conflict: the legacy two-column grid no longer separates inline emphasis from the sentence around it. This resolves the detached-word / excessive-spacing pattern across retirement, budgeting, mortgage and other Learn cards.
- Activated the already-loaded macro component stylesheet on all seven LEARN3F-1/2 pages; this fixes the unstyled Real Yields watch/checklist modules and the same latent issue across the macro authority cluster.
- Added scoped presentation for the Market Chain Reaction Explorer end-of-page next-step CTA, which previously used a Learn CTA class without the Learn stylesheet.
- Replaced irrelevant country/currency selectors on **14** macro/reserve guides that contain no locale-dependent monetary values with fixed truthful context pills such as `Global Macro · Rates` or `U.S. Fiscal · Debt Interest`.
- Standardized the Market Chain Reaction Explorer to `Global Macro · Markets`, matching the fixed-context principle already used by the Gold and Silver macro explorers.
- Removed the reader-facing internal codename `HOME1` from the mortgage affordability-vs-approval guide.
- Reframed the SWP guide as a global-first scheduled-withdrawal concept while preserving the stable SWP search identity and explaining product-specific rules as market-dependent.
- Preserved the existing colon-capitalization rule and added closeout QA rather than inventing a second rule.

## Whole-library audit results

- Current Learn inventory remains **90** indexable guide pages with distinct titles and H1s; no exact duplicate title or H1 ownership was introduced.
- SEARCH1 inventory remains **128 reviewed public pages**. No search index title, alias or intent ownership is changed in this release.
- Existing Tool <-> Learn journeys are unchanged.
- LEARN3F-2 research charts/CSV/PNG assets and evidence wording are unchanged.
- Canonical URLs remain stable.
- Only the materially revised SWP page receives a new `dateModified`/sitemap `lastmod` of 22 October 2026. Presentation-only label, context and spacing fixes do not manufacture freshness dates.

## QA added

Central QA now protects:

1. one `30-second answer` label across the Learn library, with all 90 served guide documents checked concurrently rather than by 90 serial browser navigations;
2. fixed macro context on the reviewed global/U.S.-macro pages and MCR1;
3. non-grid step-card flow on representative spacing-defect pages;
4. global-first SWP language and absence of public `HOME1` leakage;
5. 1280 / 390 / 360 responsive overflow safety on closeout samples.

Publisher remains the authoritative browser/layout gate. FIX1 keeps the exhaustive 90-guide browser check but fetches the served guide documents concurrently from the Learn hub, avoiding the 60-second timeout caused by serial page navigation. Local browser success is not claimed unless it completes in the execution environment.

## Deliberately unchanged

- calculator formulas or deterministic engines;
- PDF/report engines;
- SEARCH1 privacy/no-external-search behavior;
- analytics behavior;
- homepage CORE9 architecture;
- canonical URLs except no URL changes are made;
- LEARN3F evidence values or research assets;
- workflow files.

## Release discipline

Use the normal disposable staging-branch flow: upload the release ZIP without extracting it, run Batch PR Publisher with `CREATE_PRS`, merge `draw004.github.io` first and `carrowmont-qa` last only after Publisher is green, then run deployment, Automated QA, Multi-Repo Guard and take a fresh Source Snapshot.
