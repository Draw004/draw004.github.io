# Carrowmont - current project status

**Status verified:** 21 November 2026, after Batch 12B-2 closeout and before the current Batch 12B-4 review release.  
**Authoritative green source snapshot:** `carrowmont-source-snapshot - 2026-11-21T015030.732.zip`  
**Snapshot SHA-256:** `49cc09549c707bcf77d34909118db8544b845718994973cdc53a4cd54be519cc`  
**Source/standards QA at this baseline:** 1,427 PASS / 0 FAIL.  
**Release status:** Credential Expiry Guard v1, Search/Ask Result Hierarchy UX1.2 and Batch 12B-2 Short-Term Savings Comparison are deployed and captured in this all-green snapshot. Batch 12B-3 mortgage comparison is parked/open. Batch 12B-4 Lump-sum vs Goal Trade-offs is implemented only in the current review release until Publisher, merge, deployed QA, Guard and a fresh snapshot complete.

## Exact repository baseline

These commits are recorded in the authoritative `SNAPSHOT-MANIFEST.txt`; that manifest supersedes this file if a newer green snapshot is issued.

| Repository | Commit |
|---|---|
| `draw004.github.io` | `da875604cfa0fb580a55260e93cedf0ea231a71e` |
| `sip-calculator` | `0e718f0c5935948d11c1c4eee1a3059ba0209662` |
| `goal-planner` | `cfd03c8c66bf85b2f25ee916cde78e51bacfc8b0` |
| `financial-independence` | `1dfb029e4c4215d69b8982723a7b5dd67289d32c` |
| `inflation-calculator` | `89ae312ebf444e932d7545ddf67d8e1d9fd459b9` |
| `retirement-calculator` | `28afb6e3bdf438d304dac3eef95abb80baa3590e` |
| `budget-cash-flow-planner` | `81524657dd9d24353ba2ee8f761be3b6c5629db7` |
| `mortgage-payoff-calculator` | `58a0e63cc792634e94974efb069e741838f7ce0d` |
| `compound-interest-calculator` | `bd85864abbff231bf54e1cc3864cb699a106fbcb` |
| `loan-calculator` | `7410d13df9b0014ce9ccf402af839876e7eb8fa3` |
| `carrowmont-qa` | `c97903eb3954ce192b9eda834eb168b1607cec6e` |

## Product state and next controlled work

- **Batches 0-11:** accepted as completed per existing acceptance ledgers, including 9B/10/10B.
- **Batch 12 Learn/Search/UX:** completed. Search and Ask separate **Tools** from **Learn & Guides**, visually distinguish actionable tools and preserve direct-intent relevance before using Tool type as a tie-breaker.
- **Batch 12B-1:** balance-transfer comparison and merged Credit Card Decisions UX are complete.
- **Credential Expiry Guard v1:** deployed. Manual health check was green on 20 November 2026 with registered expiry 22 September 2027; temporary PAT Workflows write permission was removed again after deployment.
- **Batch 12B-2 Short-Term Savings Comparison:** deployed and captured in the authoritative green snapshot at the existing Emergency Fund & Financial Runway URL. Public inventory remains 23 tool cards and 145 Search URLs. See `CARROWMONT_FRE12B2_SHORT_TERM_SAVINGS_COMPARISON.md`.
- **Batch 12B-3 Mortgage Recast vs Refinance/Prepayment:** still open and deliberately parked at the owner's direction; do not mark complete.
- **Batch 12B-4 Lump-sum vs Goal Trade-offs:** implemented in the current review release as a seventh controlled Ask Carrowmont journey using existing deterministic engines. It does not add a public tool or indexed URL. See `CARROWMONT_FRE12B4_LUMP_SUM_GOAL_TRADEOFFS.md`.
- **Remaining Batch 12B after this review:** parked 12B-3; early-retirement scenarios; explainable opportunities/decision prompts. Do not mark unbuilt features complete.
- **Batch 13:** Optional Connected Financial Data remains deferred. **Batch 14:** native app decision gate remains conditional. Preserve original master-roadmap numbering.
- **Repository branch cleanup:** deferred by owner until remaining product batch work is finished. Automatic post-merge branch deletion may remain enabled, but branch backlog cleanup is not part of this release.

## Immediate approved next sequence

1. Complete the **Batch 12B-4** controlled release: Publisher -> human review -> merge -> deployed browser QA -> Multi-Repo Guard -> fresh all-green Source Snapshot.
2. Continue remaining Batch 12B decision-support work while keeping 12B-3 parked unless the owner reopens it.
3. Keep Batch 13 connected data deferred until the remaining 12B scope is closed.
4. Legacy global-header migrations and branch-backlog cleanup remain separate maintenance work; do not let them block the approved product sequence.

## Required guardrails

- Reuse canonical UI and locale components and tested deterministic financial engines. Never silently change current financial formulas or saved plans.
- Keep guest-first tools, optional account, manual explicit save/update, trust/source traceability, Learn/Search SEO and app startup/navigation unchanged unless explicitly approved.
- Existing QA and automated standards run before Publisher; Publisher creates PRs and never merges automatically.
- After approved merge, run deployed Chrome Desktop, Edge Desktop and Mobile Chromium QA, Multi-Repo Guard, and a fresh Source Snapshot.
- No tokens, account credentials, private financial data or recovery codes in public GitHub docs/issues, portable handovers or PR bundles.
- This status file is a dated record; the newest all-green `SNAPSHOT-MANIFEST.txt` takes precedence.

## Snapshot and documentation policy

Never treat a proposed Publisher release as deployed. Update this status file only with clearly labelled baseline facts and review-release state. A feature becomes part of the authoritative baseline only after merge, deployed validation and a fresh all-green snapshot.
