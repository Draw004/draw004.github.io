# Carrowmont - current project status

**Status verified:** 20 November 2026, after GH1 closure.  
**Authoritative green source snapshot:** `carrowmont-source-snapshot - 2026-11-20T144537.083.zip`  
**Snapshot SHA-256:** `3187e4db5a14445c7f1223df172b9316fb4f32c8c91c449d72989594a9f325f8`  
**Source/standards QA against this snapshot:** 1,373 PASS / 0 FAIL (reported and source-verified in prior closeout).  
**Release status:** GH1 global header and Mobile Chromium QA correction completed; user reported Publisher, desktop/mobile QA and Multi-Repo Guard green. This document does not claim the proposed Credential Expiry Guard is deployed.

## Exact repository baseline

These are the verified commits inside `SNAPSHOT-MANIFEST.txt`; that manifest supersedes this file if a newer green snapshot is issued.

| Repository | Commit |
|---|---|
| `draw004.github.io` | `894f3fbef249661312cd3b85edab8fd5d08ac7f0` |
| `sip-calculator` | `0e718f0c5935948d11c1c4eee1a3059ba0209662` |
| `goal-planner` | `cfd03c8c66bf85b2f25ee916cde78e51bacfc8b0` |
| `financial-independence` | `1dfb029e4c4215d69b8982723a7b5dd67289d32c` |
| `inflation-calculator` | `89ae312ebf444e932d7545ddf67d8e1d9fd459b9` |
| `retirement-calculator` | `28afb6e3bdf438d304dac3eef95abb80baa3590e` |
| `budget-cash-flow-planner` | `81524657dd9d24353ba2ee8f761be3b6c5629db7` |
| `mortgage-payoff-calculator` | `58a0e63cc792634e94974efb069e741838f7ce0d` |
| `compound-interest-calculator` | `bd85864abbff231bf54e1cc3864cb699a106fbcb` |
| `loan-calculator` | `7410d13df9b0014ce9ccf402af839876e7eb8fa3` |
| `carrowmont-qa` | `7fb0107fa4738a9ed550f3109a8eb9e3c440e407` |

## Product state and next controlled work

- **Batches 0-11:** accepted as completed per existing acceptance ledgers, including 9B/10/10B.
- **Batch 12 Learn/Search/UX:** completed; seven new Learn guides and one upgraded guide; user confirmed all eight URLs indexed.
- **Batch 12B-1:** balance-transfer calculations, merged Credit Card Decisions UX (Payoff/Balance Transfer modes, first-click deep links, standard currency control, print and return routes), and **GH1 canonical global navigation** are complete at this snapshot. Mobile header assertions were corrected and the latest QA/Guard are green.
- **Remaining Batch 12B:** 12B-2 Short-Term Savings Comparison; mortgage recast vs refinance/prepayment, lump-sum/goal trade-offs, early-retirement scenarios and explainable opportunities. Do not mark these unbuilt features complete.
- **Batch 13:** Optional Connected Financial Data (later). **Batch 14:** native app decision gate (conditional). Maintain the original master-roadmap numbering.

## Immediate approved next sequence

1. **Credential Expiry Guard v1** (this is the **proposed** security/governance release; not live until Publisher, human merge, QA, Guard and fresh snapshot). Registered release PAT expiry: **22 September 2027**; do not store its value. It must use independent `GITHUB_TOKEN` for GitHub issue alerts, warning stages 90/60/30/14/7 days and explicit renewal guidance; see `CARROWMONT_CREDENTIAL_EXPIRY_GUARD.md`.
2. **Responsive QA Preflight** (planned): require newly written Playwright tests to check browser-specific visible controls in Chrome Desktop, Edge Desktop and Mobile Chromium before long suites; don't repeat desktop-only selectors on mobile.
3. **Batch 12B-2 Short-Term Savings Comparison** after this foundation's all-green closeout.
4. **Legacy global-header migrations** remain tracked separately; 27 older tool pages use the previous header pattern. New or modified tool pages must use canonical shared components.

## Required guardrails

- Reuse canonical UI and locale components and tested deterministic financial engines. Never silently change current financial formulas or saved plans.
- Keep guest-first tools, optional account, manual explicit save/update, trust/source traceability, Learn/Search SEO and app startup/navigation unchanged unless explicitly approved.
- Existing QA and automated standards must run **before Publisher**; Publisher creates PRs, never merges automatically.
- After approved merge, run deployed Chrome Desktop, Edge Desktop and Mobile Chromium QA, Multi-Repo Guard, and latest green Source Snapshot.
- **No tokens, account credentials, private financial data or recovery codes** in public GitHub docs/issues, portable handovers or PR bundles.
- This status file is always a dated record; the newest all-green `SNAPSHOT-MANIFEST.txt` takes precedence. Update status and handover at each controlled milestone.

## Snapshot and documentation policy

Never treat a proposed Publisher release as deployed. The Credential Expiry Guard workflow and its expiry registry become active only after the Main PR is merged. Verify a manual workflow run and issue permissions after deployment; add an independent 24 June 2027 calendar reminder because scheduled Actions may stop in inactive public repos.
