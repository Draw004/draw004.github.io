# Carrowmont - development start here

**Status:** mandatory first-read entry point for all developers, AI assistants and new ChatGPT accounts.
**Last reviewed:** 24 November 2026.
**Project:** https://carrowmont.com | **GitHub owner:** Draw004.

## First five minutes in a new account

1. Obtain the **latest completed all-green Source Snapshot ZIP**. Extract it without modifying files. Inspect `SNAPSHOT-MANIFEST.txt` for all 11 repositories and their precise commit hashes. A ZIP from an earlier chat is not automatically current.
2. Read `docs/CARROWMONT_CURRENT_PROJECT_STATUS.md` and `docs/CARROWMONT_STANDARDS_INDEX.md` in the extracted `draw004.github.io` repository. The status file intentionally does not pin the newest snapshot filename/hash. Use `SNAPSHOT-MANIFEST.txt` for exact current commits, and reconcile only genuine product/release-state conflicts before editing anything.
3. Read the relevant canonical standards referenced in the index, plus existing implementation code and acceptance ledgers for the feature being changed. Do **not** recreate a header, locale picker, navigator, calculator, report, or save routine without checking its current approved implementation.
4. Summarize the repository baseline, product stage, unfinished requirements, proposed file changes, risk/QA matrix and expected review PRs to the user **before** coding. Do not infer work completed merely from a previous release title.
5. Implement against the latest source, run local standards/source/browser checks, package a manifest-hashed release for Batch PR Publisher, and require its staged QA and human approval before merging.

## Authority and conflicts

- **Live code authority:** newest completed verified all-green Source Snapshot supplied by the owner + its root `SNAPSHOT-MANIFEST.txt` + checked source/current QA, with newer repository commits explicitly verified if they exist. Status/handbook files must not be used as a substitute for the manifest or forced to mirror its filename/hash.
- **Product intent authority:** current status + original master roadmap + approved, specific standards/acceptance ledgers. The original roadmap reserves **Batch 13** for optional connected financial data. Batch 12B, Batch 13A and **Quality Audit & Hardening Release 1** are complete. **Batch 13B is ON HOLD pending an explicit future owner decision**; production live-provider work must not start automatically. Batch 14 native-app work is traffic/usage-gated and deferred. Ask Carrowmont Expansion Wave 1 and Learn Hub 2.0 are complete/deployed. The active path is **Evergreen Learn Expansion Wave 1 + Automation Fallback Hardening 2 (controlled review) -> measurement / next-priority review**. Treat the six new guide URLs and catch-up-only workflow semantics as deployed only if their implementation/QA records are present in the newest completed all-green post-merge Source Snapshot; otherwise continue the Publisher/QA/Guard/snapshot cycle.
- **Technical control authority:** deterministic engines, source-contract, automated standards gate, Publisher and Multi-Repo Guard; no assistant can override them by assertion.
- **Historical documents:** informative, not necessarily current. When an old architecture/handbook passage conflicts with current source or a later approved amendment, identify the conflict and use the latest confirmed rule. Ask about genuine unresolved product decisions rather than inventing an answer.

## Non-negotiables

- Guest-first and privacy-first; saved profile changes only after explicit user Save/Update.
- Deterministic tested calculators produce numbers. AI may explain or route but may not invent local regulations, rates or calculations.
- Approved universal core + country-specific labels (e.g. SIP in India, recurring investment elsewhere), no unauthorized currency conversion.
- Preserve product nav, active tab, selected locale, apps/PWA start, account auth, reports, link journeys, existing URLs, Learn intent and SEO unless intentionally changed.
- Reuse the approved global seven-link header and one-current-tab rule from `CARROWMONT_SHARED_UI_STANDARD.md` v1.2. Tool-specific Calculator/Methodology links belong in the page, not in place of the main navigation. Use `/assets/ui/carrowmont-global-header.css` and its paired JS for migrated tool pages. Preserve the approved locale control, footer, mobile navigation and accessibility.
- Every changed calculator page must pass the new UI standards gate. Known older exceptions, including 27 unmigrated tool headers, are inventoried and must be corrected if that page is modified.
- Never publish credentials, actual account finance data, API keys or tokens in public GitHub or handover packages.
- Batch 13A connected-data work remains provider-neutral, read-only, data-minimized and explicit-review-first. Production live connectivity stays disabled; **Batch 13B is ON HOLD** until the owner explicitly reopens it and approves a provider/jurisdiction review.
- Batch 14 native iOS/Android work is deferred until real traffic, repeat usage and PWA capability gaps justify it.
- Repository documentation is the durable memory. Every release must update current status, roadmap/handover, QA evidence, known limitations and the next safe step so a new ChatGPT account can continue without prior-chat context.
- A source-test pass does **not** equal a green Publisher/browser suite or live-device acceptance.

## Release procedure

Latest green snapshot -> requirements ledger + change-impact matrix -> coding -> automated development standards gate -> deterministic source QA -> responsive browser/PDF/SEO/privacy QA as applicable -> reviewed Publisher ZIP (`release-manifest.json` with SHA256) -> **CREATE_PRS** -> staged Publisher QA green -> human review/merge -> deployed QA Chrome/Edge/Mobile -> Multi-Repo Guard -> newest green snapshot -> update current status/handover **for substantive release state/evidence, without pinning the new snapshot filename/hash as current authority**.

Never merge the disposable Publisher staging branch; merge only the generated reviewed PRs. If any gate is red, inspect its exact artifact and fix the root cause. Do not weaken a valid assertion or silently edit formulas to make a test green.

## Files to read next

- `docs/CARROWMONT_CURRENT_PROJECT_STATUS.md` - current batch, baseline hashes, outstanding work.
- `docs/CARROWMONT_STANDARDS_INDEX.md` - definitive map of canonical standards.
- `docs/CARROWMONT_MASTER_CONTINUITY_HANDBOOK.md` - detailed product history and recovery practices.
- `docs/CARROWMONT_NEW_CHAT_START_HERE.txt` - a plain-language copy/paste bootstrap message.
- `docs/CARROWMONT_UI_LEGACY_EXCEPTIONS.json` - unresolved UI differences, not permission to reproduce them.
- `carrowmont-qa/scripts/development-standards-gate.mjs` - automated release preflight.

## Self-check before continuing

A new assistant should be able to state: the 11 repo names and exact snapshot SHAs; what the product does; the completed Batch 12B/13A/Quality-Hardening-1 state, Batch 13B ON HOLD decision and traffic-gated Batch 14 state; current open issues; the canonical locale/header pattern; how to inspect/edit safely; who approves merges; and which green checks are still required. If it cannot, it is **not ready to change the project**.

## Credential-expiry protection (v1 security release)

Before changing GitHub workflow files or rotating the release PAT, read `CARROWMONT_CREDENTIAL_EXPIRY_GUARD.md`. The public registry contains only the manually reviewed expiration date; the secret must remain in GitHub Actions. Use the built-in `GITHUB_TOKEN` for alert issues, not the release PAT. A new ChatGPT account must never assume the guard is live from documentation alone: confirm the workflow exists on `main`, its manual run is green, notifications are configured and the backup calendar reminder exists. Temporarily grant the fine-grained PAT Workflows: read/write **only** when a release actually changes `.github/workflows/`, and remove it after that release.
