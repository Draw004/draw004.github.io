# Carrowmont - current project status

**Status verified:** 20 November 2026, after Search/Ask Result Hierarchy UX1.2 closeout.  
**Authoritative green source snapshot:** `carrowmont-source-snapshot - 2026-11-20T221343.443.zip`  
**Snapshot SHA-256:** `de1e57044d1407e1767ef31b75922f946e8bd7561024c4f3921a86ed6acc25a9`  
**Source/standards QA at this baseline:** 1,407 PASS / 0 FAIL before the current 12B-2 review release.  
**Release status:** Credential Expiry Guard v1 and Search/Ask Result Hierarchy UX1.2 are deployed and captured in this all-green snapshot. Batch 12B-2 is implemented only in the current review release until Publisher, merge, deployed QA, Guard and a fresh snapshot complete.

## Exact repository baseline

These commits are recorded in the authoritative `SNAPSHOT-MANIFEST.txt`; that manifest supersedes this file if a newer green snapshot is issued.

| Repository | Commit |
|---|---|
| `draw004.github.io` | `bf5eedc8b46039b1736af95391eba390ab126817` |
| `sip-calculator` | `0e718f0c5935948d11c1c4eee1a3059ba0209662` |
| `goal-planner` | `cfd03c8c66bf85b2f25ee916cde78e51bacfc8b0` |
| `financial-independence` | `1dfb029e4c4215d69b8982723a7b5dd67289d32c` |
| `inflation-calculator` | `89ae312ebf444e932d7545ddf67d8e1d9fd459b9` |
| `retirement-calculator` | `28afb6e3bdf438d304dac3eef95abb80baa3590e` |
| `budget-cash-flow-planner` | `81524657dd9d24353ba2ee8f761be3b6c5629db7` |
| `mortgage-payoff-calculator` | `58a0e63cc792634e94974efb069e741838f7ce0d` |
| `compound-interest-calculator` | `bd85864abbff231bf54e1cc3864cb699a106fbcb` |
| `loan-calculator` | `7410d13df9b0014ce9ccf402af839876e7eb8fa3` |
| `carrowmont-qa` | `955593aa6bc160e0da806c6b552f3a518b323711` |

## Product state and next controlled work

- **Batches 0-11:** accepted as completed per existing acceptance ledgers, including 9B/10/10B.
- **Batch 12 Learn/Search/UX:** completed. Search and Ask now separate **Tools** from **Learn & Guides**, visually distinguish actionable tools and preserve direct-intent relevance before using Tool type as a tie-breaker.
- **Batch 12B-1:** balance-transfer comparison and merged Credit Card Decisions UX are complete.
- **Credential Expiry Guard v1:** deployed. Manual health check was green on 20 November 2026 with registered expiry 22 September 2027; temporary PAT Workflows write permission was removed again after deployment.
- **Batch 12B-2 Short-Term Savings Comparison:** implemented in this review release at the existing Emergency Fund & Financial Runway URL; **not yet deployed**. Public inventory remains 23 tool cards and 145 Search URLs. See `CARROWMONT_FRE12B2_SHORT_TERM_SAVINGS_COMPARISON.md`.
- **Remaining Batch 12B after 12B-2:** mortgage recast vs refinance/prepayment; lump-sum/goal trade-offs; early-retirement scenarios; explainable opportunities. Do not mark these unbuilt features complete.
- **Batch 13:** Optional Connected Financial Data remains deferred. **Batch 14:** native app decision gate remains conditional. Preserve original master-roadmap numbering.

## Immediate approved next sequence

1. Complete the **Batch 12B-2** controlled release: Publisher -> human review -> merge -> deployed browser QA -> Multi-Repo Guard -> fresh all-green Source Snapshot.
2. Continue the remaining 12B decision-support work in roadmap order.
3. Keep Batch 13 connected data deferred until the remaining 12B scope is closed.
4. Legacy global-header migrations remain tracked separately; new or modified tool pages must use canonical shared components.

## Required guardrails

- Reuse canonical UI and locale components and tested deterministic financial engines. Never silently change current financial formulas or saved plans.
- Keep guest-first tools, optional account, manual explicit save/update, trust/source traceability, Learn/Search SEO and app startup/navigation unchanged unless explicitly approved.
- Existing QA and automated standards run before Publisher; Publisher creates PRs and never merges automatically.
- After approved merge, run deployed Chrome Desktop, Edge Desktop and Mobile Chromium QA, Multi-Repo Guard, and a fresh Source Snapshot.
- No tokens, account credentials, private financial data or recovery codes in public GitHub docs/issues, portable handovers or PR bundles.
- This status file is a dated record; the newest all-green `SNAPSHOT-MANIFEST.txt` takes precedence.

## Snapshot and documentation policy

Never treat a proposed Publisher release as deployed. Update this status file only with clearly labelled baseline facts and review-release state. A feature becomes part of the authoritative baseline only after merge, deployed validation and a fresh all-green snapshot.
