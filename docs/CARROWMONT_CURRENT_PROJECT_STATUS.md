# Carrowmont - current project status

**Status date:** 20 November 2026. **Scope:** snapshot-verified record, not a claim about future deployments.
**Current approved baseline snapshot:** `carrowmont-source-snapshot - 2026-11-20T004453.791.zip`
**Snapshot SHA-256:** `9f9e15fcfb451063b91be3a2912527212ce110c8b5a77f3a2acc7ad118f71a20`
**Source contract against this exact extracted snapshot:** **1,357 PASS / 0 FAIL** (verified locally).
**Integration/release status:** user reported all green on the preceding credit-card balance-transfer release; the snapshot is a source capture. Full browser suite has not been rerun by this continuity release. New documents/checks are not live until Publisher and human merge.

## Repository baseline - read SNAPSHOT-MANIFEST.txt if anything differs

| Repository | Exact commit (snapshot manifest) |
|---|---|
| draw004.github.io | `eddbf4428716edb350a544bcaa562750920eef0b` |
| sip-calculator | `0e718f0c5935948d11c1c4eee1a3059ba0209662` |
| goal-planner | `cfd03c8c66bf85b2f25ee916cde78e51bacfc8b0` |
| financial-independence | `1dfb029e4c4215d69b8982723a7b5dd67289d32c` |
| inflation-calculator | `89ae312ebf444e932d7545ddf67d8e1d9fd459b9` |
| retirement-calculator | `28afb6e3bdf438d304dac3eef95abb80baa3590e` |
| budget-cash-flow-planner | `36bc6a3d01f4f201d9982450c7c45017336414f1` |
| mortgage-payoff-calculator | `58a0e63cc792634e94974efb069e741838f7ce0d` |
| compound-interest-calculator | `bd85864abbff231bf54e1cc3864cb699a106fbcb` |
| loan-calculator | `7410d13df9b0014ce9ccf402af839876e7eb8fa3` |
| carrowmont-qa | `d26a53f7161fe7140776c296abb5c8d93ccd2de2` |

## Product phase and exact next work

- **Batches 0-11:** completed according to existing acceptance ledgers, with 9B, 10 and 10B closed.
- **Batch 12 / 12A:** Learn/Search/UX expansion completed; seven new Learn pages and one upgraded guide, all eight Google-indexing requests/statuses confirmed by the user on 19 November 2026. These pages should not be duplicated.
- **Batch 12B-1:** credit-card balance-transfer calculation and guide link deployed under the existing credit-card payoff URL. **UI consolidation remains outstanding:** canonical country/currency/header, first-click deep link and scroll, less stacked page layout, unique methodology IDs, and return path from Compare Multiple Debts. Preserve original formula core, canonical URL and Search intent.
- **Remaining Batch 12B:** short-term savings comparison, mortgage recast/refinance/prepayment, lump-sum and goal trade-off comparison, early retirement scenarios and meaningful opportunity reviews; phases should be specified individually and not claimed finished prematurely.
- **Batch 13:** optional connected financial data, **later**, not the next feature. **Batch 14:** possible native apps, conditional on demand.

## Immediate work order

**This proposed release:** Batch 12B-1 Credit Card Decisions UX consolidation, with no financial formula, saved-plan ownership, public URL or app-behaviour changes. The Standards Gate established in the preceding release is now mandatory.

**After this release is fully green:** proceed to Batch 12B-2 Short-Term Savings Comparison. Do not treat an unmerged Publisher ZIP as completed product work.

## Known issues intentionally not silently rewritten

1. `budget-cash-flow-planner/credit-card-payoff-calculator.html` locale summary and double-stacked comparison are corrected **in the proposed UX release**, pending Publisher/browser/merge acceptance.
2. `retirement-calculator/faq.html`, `how-it-works.html`, and `methodology.html` have older country-selector markup. Audit and correct on their next modification.
3. Credit-card first-click anchor, compact workspace and multiple-debts return are implemented **in the proposed UX release**; browser acceptance and human review remain pending.
4. Installed PWA's native splash is controlled by Android/browser; approved web-side Draw the C and tagline must remain unchanged unless explicitly approved.

Known exceptions are tracked in `CARROWMONT_UI_LEGACY_EXCEPTIONS.json` and do **not** justify introducing the same differences into new work.

## Verification and freshness policy

This document is an **as-of snapshot record**. If a newer all-green snapshot is provided, that snapshot's `SNAPSHOT-MANIFEST.txt` supersedes the SHAs here. Before any release, reconcile this status file with the newer snapshot and update it in the same controlled change where practical. Never promise that a previous AI account's memory or connected apps are available to another account.

**Security:** no credentials, authorization tokens, private Google account information or saved user data in public docs, snapshots, or handover packages.

## Proposed change in review - source is not yet live

Batch 12B-1 consolidation implementation and tests are documented in `CARROWMONT_FRE12B1_UX_ACCEPTANCE.md`. The hash/commit table above refers to the **pre-release all-green snapshot**, not a claim that this feature release has been merged. After green merge, update this status file and take a fresh snapshot.

## Pending global header standards release

The Credit Card Decisions UX release is the baseline for this **proposed** follow-up; its live Main/QA merge state must be verified from a fresh snapshot. The proposed global header migration replaces the local Calculator/Methodology/All tools/Home toolbar with the main-site destinations, moves Methodology into a contextual link, and records 27 other legacy tool headers. Do not mark this as deployed until Publisher, Chrome/Edge/Mobile, Guard and a new snapshot are green.
