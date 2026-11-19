# Carrowmont - current project status

**Status date:** 19 November 2026. **Scope:** snapshot-verified record, not a claim about future deployments.
**Current approved baseline snapshot:** `carrowmont-source-snapshot - 2026-11-19T222256.081.zip`
**Snapshot SHA-256:** `eaf991e357122629b8ac333d475cf8914ea155f4c6f24d7f410c1ed8a91b6203`
**Source contract against this exact extracted snapshot:** **1,351 PASS / 0 FAIL** (verified locally).
**Integration/release status:** user reported all green on the preceding credit-card balance-transfer release; the snapshot is a source capture. Full browser suite has not been rerun by this continuity release. New documents/checks are not live until Publisher and human merge.

## Repository baseline - read SNAPSHOT-MANIFEST.txt if anything differs

| Repository | Exact commit (snapshot manifest) |
|---|---|
| draw004.github.io | `3b026932018733f143458807da6b319cd763642a` |
| sip-calculator | `0e718f0c5935948d11c1c4eee1a3059ba0209662` |
| goal-planner | `cfd03c8c66bf85b2f25ee916cde78e51bacfc8b0` |
| financial-independence | `1dfb029e4c4215d69b8982723a7b5dd67289d32c` |
| inflation-calculator | `89ae312ebf444e932d7545ddf67d8e1d9fd459b9` |
| retirement-calculator | `28afb6e3bdf438d304dac3eef95abb80baa3590e` |
| budget-cash-flow-planner | `36bc6a3d01f4f201d9982450c7c45017336414f1` |
| mortgage-payoff-calculator | `58a0e63cc792634e94974efb069e741838f7ce0d` |
| compound-interest-calculator | `bd85864abbff231bf54e1cc3864cb699a106fbcb` |
| loan-calculator | `7410d13df9b0014ce9ccf402af839876e7eb8fa3` |
| carrowmont-qa | `62d436cb4e18af048c7c382bebfab66abb44b1ed` |

## Product phase and exact next work

- **Batches 0-11:** completed according to existing acceptance ledgers, with 9B, 10 and 10B closed.
- **Batch 12 / 12A:** Learn/Search/UX expansion completed; seven new Learn pages and one upgraded guide, all eight Google-indexing requests/statuses confirmed by the user on 19 November 2026. These pages should not be duplicated.
- **Batch 12B-1:** credit-card balance-transfer calculation and guide link deployed under the existing credit-card payoff URL. **UI consolidation remains outstanding:** canonical country/currency/header, first-click deep link and scroll, less stacked page layout, unique methodology IDs, and return path from Compare Multiple Debts. Preserve original formula core, canonical URL and Search intent.
- **Remaining Batch 12B:** short-term savings comparison, mortgage recast/refinance/prepayment, lump-sum and goal trade-off comparison, early retirement scenarios and meaningful opportunity reviews; phases should be specified individually and not claimed finished prematurely.
- **Batch 13:** optional connected financial data, **later**, not the next feature. **Batch 14:** possible native apps, conditional on demand.

## Immediate work order

**This release:** continuity, standardized entry point, documented historical exceptions and automated pre-Publisher standards enforcement. No UI redesign or financial formula change is part of this foundation release.

**Next feature release, after this foundation is green:** focused Batch 12B-1 Credit Card UX Consolidation against a **newest post-foundation green snapshot**, and correction of its known legacy country selector. The original indexed credit-card URL stays unchanged.

## Known issues intentionally not silently rewritten

1. `budget-cash-flow-planner/credit-card-payoff-calculator.html` uses a noncanonical locale-summary control. Correct on next UX change.
2. `retirement-calculator/faq.html`, `how-it-works.html`, and `methodology.html` have older country-selector markup. Audit and correct on their next modification.
3. Credit-card user journey (balance-transfer anchor, compact workspace, multiple-debts return navigation) needs actual browser acceptance tests and correction.
4. Installed PWA's native splash is controlled by Android/browser; approved web-side Draw the C and tagline must remain unchanged unless explicitly approved.

Known exceptions are tracked in `CARROWMONT_UI_LEGACY_EXCEPTIONS.json` and do **not** justify introducing the same differences into new work.

## Verification and freshness policy

This document is an **as-of snapshot record**. If a newer all-green snapshot is provided, that snapshot's `SNAPSHOT-MANIFEST.txt` supersedes the SHAs here. Before any release, reconcile this status file with the newer snapshot and update it in the same controlled change where practical. Never promise that a previous AI account's memory or connected apps are available to another account.

**Security:** no credentials, authorization tokens, private Google account information or saved user data in public docs, snapshots, or handover packages.
