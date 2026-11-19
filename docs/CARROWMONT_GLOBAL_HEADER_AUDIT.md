# Carrowmont global header audit and migration plan

**Date:** 20 November 2026. **Scope:** All 11 source repositories, based on the latest all-green 20 Nov 00:44 snapshot plus the subsequently supplied Credit Card UX v2 files.

## Finding

- Main website: **126** HTML pages use the full global header (Home, My Carrowmont, Tools, Ask, Learn, Research, Search).
- Tool repositories: **28** HTML pages originally used a tool-specific header (Calculator, Methodology, All tools, Home). The Credit Card Decisions page is the first migrated page, leaving **27** documented legacy tool headers.
- This is why the globe/chevron correction alone did not match the main navigation visually.

## Locked new/modified tool-page contract

1. Use the exact seven primary destinations in the canonical order, with only Tools active on a tool page (`aria-current="page"`).
2. Use the shared CSS/JS assets and reviewed static header markup so first paint does not rebuild the nav.
3. Show mobile Home, My Money, Ask, Tools and More, with the selected state unique and an accessible Search entry; preserve the single country/currency state.
4. Keep calculator-specific links, breadcrumb, and methodology inside the page, not in the global header.
5. Verify at desktop, tablet, 360px phone and print sizes; no scroll-jumps or horizontal overflow.
6. Modify no financial formulas or saved-plan ownership during UI-shell migration.

## Controlled migration

The source-of-truth inventory is `CARROWMONT_UI_LEGACY_EXCEPTIONS.json` -> `global_header_exceptions`. A historical exception is **not an approved template**. A new or modified tool page must correct its global header before Publisher passes. Plan remaining tools in separate reviewed releases; do not rewrite all calculator pages in one batch.

## Gate verification

`node carrowmont-qa/scripts/development-standards-gate.mjs --root <combined-source> --manifest <bundle-manifest>`

The gate now fails a changed page missing the canonical global header, missing required nav destinations, missing selected-state correctness, or missing shared assets; source QA contains deliberate negative cases and browser QA checks responsive behavior.
