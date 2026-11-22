# Carrowmont - current project status

**Status verified:** 22 November 2026, after Batch 12B-5 Early-retirement Scenarios closeout and before the current Explainable Opportunities review release.  
**Authoritative green source snapshot:** `carrowmont-source-snapshot - 2026-11-22T050218.133.zip`  
**Snapshot SHA-256:** `7e7212e5bbaeaa70ecb333b279bdd29d8f38911445f52e5307e4836242295e7a`  
**Source/standards QA at this baseline:** 1,490 PASS / 0 FAIL.  
**Release status:** Credential Expiry Guard v1, Search/Ask Result Hierarchy UX1.2 and Batch 12B-2 through 12B-5 are deployed and captured in this all-green snapshot. Explainable Opportunities / decision prompts is implemented only in the current review release until Publisher, merge, deployed QA, Guard and a fresh snapshot complete.

## Exact repository baseline

These commits are recorded in the authoritative `SNAPSHOT-MANIFEST.txt`; that manifest supersedes this file if a newer green snapshot is issued.

| Repository | Commit |
|---|---|
| `draw004.github.io` | `2f0b9153d0db1885c5bf8d4374675358430d23e5` |
| `sip-calculator` | `0e718f0c5935948d11c1c4eee1a3059ba0209662` |
| `goal-planner` | `cfd03c8c66bf85b2f25ee916cde78e51bacfc8b0` |
| `financial-independence` | `95b2c40f6396c80290abef514f6b98b241eff333` |
| `inflation-calculator` | `89ae312ebf444e932d7545ddf67d8e1d9fd459b9` |
| `retirement-calculator` | `28afb6e3bdf438d304dac3eef95abb80baa3590e` |
| `budget-cash-flow-planner` | `81524657dd9d24353ba2ee8f761be3b6c5629db7` |
| `mortgage-payoff-calculator` | `8b6650487a6c47b79f6ec6729795c00759b929df` |
| `compound-interest-calculator` | `bd85864abbff231bf54e1cc3864cb699a106fbcb` |
| `loan-calculator` | `7410d13df9b0014ce9ccf402af839876e7eb8fa3` |
| `carrowmont-qa` | `ac2499252cac5b58660c729b1e268286369ea576` |

## Product state and next controlled work

- **Batches 0-11:** accepted as completed per existing acceptance ledgers, including 9B/10/10B.
- **Batch 12 Learn/Search/UX:** completed. Search and Ask separate **Tools** from **Learn & Guides**, visually distinguish actionable tools and preserve direct-intent relevance before using Tool type as a tie-breaker.
- **Batch 12B-1:** balance-transfer comparison and merged Credit Card Decisions UX are complete.
- **Credential Expiry Guard v1:** deployed. Manual health check was green on 20 November 2026 with registered expiry 22 September 2027; temporary PAT Workflows write permission was removed again after deployment.
- **Batch 12B-2 Short-Term Savings Comparison:** deployed at the existing Emergency Fund & Financial Runway URL.
- **Batch 12B-4 Lump-sum vs Goal Trade-offs:** deployed as the seventh controlled Ask Carrowmont journey. It adds no public tool or indexed URL.
- **Batch 12B-3 Mortgage Recast vs Refinance/Prepayment:** deployed and captured in the current all-green snapshot. The three-path decision comparison reuses the existing Mortgage Payoff and Refinance Break-Even engines and adds no public URL or core-tool card.
- **Batch 12B-5 Early-retirement Scenarios:** deployed and captured in the authoritative green snapshot. It extends the existing Financial Independence planner with earlier/current/one-more-year/user-adjusted comparisons using the same deterministic FI engine. No new public URL or tool card was added.
- **Batch 12B-6 Explainable Opportunities / decision prompts:** current review release. It upgrades the existing My Carrowmont next-moves surface with transparent prompt types, rationale, evidence, Tool/Learn routes and a presentation-only Not now control. Do not mark complete before the full release gate finishes.
- **Batch 13:** Optional Connected Financial Data remains deferred. **Batch 14:** native app decision gate remains conditional. Preserve original master-roadmap numbering.
- **Repository branch cleanup:** deferred by owner until remaining product batch work is finished. Automatic post-merge branch deletion may remain enabled, but branch backlog cleanup is not part of this release.

## Immediate approved next sequence

1. Complete the **Explainable Opportunities / decision prompts** controlled release: Publisher -> human review -> merge Main -> merge QA -> deployed browser QA -> Multi-Repo Guard -> fresh all-green Source Snapshot.
2. Close Batch 12B only after the deployed live My Carrowmont behavior and visual experience are independently reviewed as far as the available live-browser tooling permits.
3. Run the consolidated Batch 12 SEO/indexing pass, including the intentional `search.html` noindex/sitemap check.
4. Keep Batch 13 connected data and repository branch-backlog cleanup deferred until Batch 12 closeout.

## Required guardrails

- Reuse canonical UI and locale components and tested deterministic financial engines. Never silently change current financial formulas or saved plans.
- Keep guest-first tools, optional account, manual explicit save/update, trust/source traceability, Learn/Search SEO and app startup/navigation unchanged unless explicitly approved.
- Existing QA and automated standards run before Publisher; Publisher creates PRs and never merges automatically.
- After approved merge, run deployed Chrome Desktop, Edge Desktop and Mobile Chromium QA, Multi-Repo Guard, and a fresh Source Snapshot.
- No tokens, account credentials, private financial data or recovery codes in public GitHub docs/issues, portable handovers or PR bundles.
- This status file is a dated record; the newest all-green `SNAPSHOT-MANIFEST.txt` takes precedence.

## Snapshot and documentation policy

Never treat a proposed Publisher release as deployed. Update this status file only with clearly labelled baseline facts and review-release state. A feature becomes part of the authoritative baseline only after merge, deployed validation and a fresh all-green snapshot.
