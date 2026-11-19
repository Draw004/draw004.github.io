# Carrowmont Development Standards Gate - operational contract

**Version 1.0.** Script: `carrowmont-qa/scripts/development-standards-gate.mjs`.

## Purpose

Before running hundreds of expensive browser tests, the Batch PR Publisher checks all changed HTML for the approved shared shell and site integrity. This improves the consistency of country/currency, navigation, accessibility and SEO without rewriting financial engines or silently "fixing" history.

## Where it runs

The Publisher checks out the full 11-repository baseline, verifies every manifest base SHA256, applies the proposed release bundle in staging, and then executes:

`node staging/carrowmont-qa/scripts/development-standards-gate.mjs --root staging --manifest /tmp/carrowmont-bundle/release-manifest.json`

The standard source contract calls the same gate in baseline-audit mode, so the Multi-Repo Guard sees unexpected drift. This is additive: it does not replace browser, deterministic, privacy, PDF or device QA.

## What it checks

- Each applicable country/currency control contains the canonical globe, label and chevron and is accessible, with separate main-site and tool-header markup patterns.
- Modified HTML has unique IDs, valid static in-page anchors, title/meta/canonical where applicable, and tool header navigation to Home and All tools.
- All 11 source repositories are present, continuity docs are present and the known UI exceptions registry is accurate.
- A release touching HTML declares the eight human-reviewed acceptance dimensions in `release-manifest.json`, under `standards_review`: `shared_ui`, `country_currency`, `deep_links`, `return_routes`, `responsive`, `print`, `privacy`, `seo`. These must be booleans `true` only after an actual review. They do **not** replace automated/browser evidence.
- The source QA includes deliberately broken markup examples, proving missing globe/chevron, bad anchors and duplicate IDs fail.

## Explicit limitations

- Four known older pages have locale markup debt; the gate reports these in baseline mode and blocks any change to those pages until corrected. See `CARROWMONT_UI_LEGACY_EXCEPTIONS.json`.
- Source parsing cannot prove click-to-scroll timing, desktop/tablet/mobile geometry, correct report layout, live login or cross-tool return routes. These **must** be verified by relevant browser/real-device QA and an acceptance ledger before merge.
- A green standards gate is not a green full release; staged Publisher, Chrome/Edge/Mobile, Guard and snapshot remain mandatory.

## Updating/removing a legacy exception

Fix the actual markup, remove the corresponding registry entry in the **same release**, and test the canonical country/currency control at desktop and mobile sizes. Do not change an exception into a blanket bypass, and do not add exceptions for brand-new pages.

## For a new ChatGPT account

Read `CARROWMONT_DEVELOPMENT_START_HERE.md`, verify the newest snapshot manifest and run the gate without a release manifest first. Only after that build the next Publisher bundle. If local browser dependencies are absent, report the specific gate that was not executed; do not label it passed.

## Global header extension (20 November 2026)

Tool-specific legacy headers are now inventoried separately under `global_header_exceptions`. The changed-page gate requires `.cm-global-header` with Home, My Carrowmont, Tools, Ask, Learn, Research, Search in order, exactly one Tools current state in desktop and mobile navigations, and approved shared assets. An untouched legacy page may warn; changing it without correcting the header fails. Browser QA validates full navigation, mobile bottom bar, currency and stable geometry. See `CARROWMONT_GLOBAL_HEADER_AUDIT.md`.
