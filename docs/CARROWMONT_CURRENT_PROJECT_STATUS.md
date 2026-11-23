# Carrowmont - current project status

**Status verified:** 23 November 2026, after the Batch 12 SEO/indexing closeout and before the Batch 13A Connected Financial Data Readiness review release.  
**Authoritative green source snapshot:** `carrowmont-source-snapshot - 2026-11-22T204049.510.zip`  
**Snapshot SHA-256:** `c9453e0079a7dd54c6ea3e072fca611ca57c0ddd7b8370b510837acead4bee54`  
**Source/standards QA at this baseline:** 1,514 PASS / 0 FAIL.  
**Release status:** Batch 12 product work and its SEO/indexing closeout are deployed and captured in this all-green snapshot. Batch 13 is now explicitly resumed by the owner. The current review release is **Batch 13A Connected Financial Data Readiness**: provider-neutral consent/review/freshness/disconnect architecture with a sandbox-only adapter and the production feature flag OFF.

## Exact repository baseline

These commits are recorded in the authoritative `SNAPSHOT-MANIFEST.txt`; that manifest supersedes this file if a newer green snapshot is issued.

| Repository | Commit |
|---|---|
| `draw004.github.io` | `655eff0e351af3ebde2cf0105d05f7a152bf8135` |
| `sip-calculator` | `0e718f0c5935948d11c1c4eee1a3059ba0209662` |
| `goal-planner` | `cfd03c8c66bf85b2f25ee916cde78e51bacfc8b0` |
| `financial-independence` | `95b2c40f6396c80290abef514f6b98b241eff333` |
| `inflation-calculator` | `89ae312ebf444e932d7545ddf67d8e1d9fd459b9` |
| `retirement-calculator` | `28afb6e3bdf438d304dac3eef95abb80baa3590e` |
| `budget-cash-flow-planner` | `81524657dd9d24353ba2ee8f761be3b6c5629db7` |
| `mortgage-payoff-calculator` | `8b6650487a6c47b79f6ec6729795c00759b929df` |
| `compound-interest-calculator` | `bd85864abbff231bf54e1cc3864cb699a106fbcb` |
| `loan-calculator` | `7410d13df9b0014ce9ccf402af839876e7eb8fa3` |
| `carrowmont-qa` | `3cf2f53cb269d21666d6ed4ca2699fe34e039c8f` |

## Product state and next controlled work

- **Batches 0-11:** accepted as completed per existing acceptance ledgers, including 9B/10/10B.
- **Batch 12 Learn/Search/UX:** completed. Search and Ask separate **Tools** from **Learn & Guides**, visually distinguish actionable tools and preserve direct-intent relevance before using Tool type as a tie-breaker.
- **Batch 12B-1:** balance-transfer comparison and merged Credit Card Decisions UX are complete.
- **Credential Expiry Guard v1:** deployed. Manual health check was green on 20 November 2026 with registered expiry 22 September 2027; temporary PAT Workflows write permission was removed again after deployment.
- **Batch 12B-2 Short-Term Savings Comparison:** deployed at the existing Emergency Fund & Financial Runway URL.
- **Batch 12B-4 Lump-sum vs Goal Trade-offs:** deployed as the seventh controlled Ask Carrowmont journey. It adds no public tool or indexed URL.
- **Batch 12B-3 Mortgage Recast vs Refinance/Prepayment:** deployed and captured in the current all-green snapshot. The three-path decision comparison reuses the existing Mortgage Payoff and Refinance Break-Even engines and adds no public URL or core-tool card.
- **Batch 12B-5 Early-retirement Scenarios:** deployed and captured in the authoritative green snapshot. It extends the existing Financial Independence planner with earlier/current/one-more-year/user-adjusted comparisons using the same deterministic FI engine. No new public URL or tool card was added.
- **Batch 12B-6 Explainable Opportunities / decision prompts:** deployed and captured in the authoritative green snapshot. It upgrades the existing My Carrowmont next-moves surface with transparent prompt types, rationale, evidence, Tool/Learn routes and a presentation-only Not now control.
- **Batch 12:** product work and SEO/indexing closeout are complete and captured in the authoritative baseline. The selective Google indexing queue was submitted by the owner after closeout.
- **Batch 13A Connected Financial Data Readiness:** current review release. Build and test provider-neutral consent, scope, provenance, freshness, explicit-review and disconnect architecture using deterministic sandbox data only. Production remains disabled by default; no live bank/provider is connected.
- **Batch 13B live provider pilot:** not approved yet. A future pilot requires separate provider, jurisdiction, privacy/legal, cost and security review.
- **Batch 14:** native app decision gate remains conditional. Preserve original master-roadmap numbering.
- **Repository branch cleanup:** deferred by owner until remaining product batch work is finished. Automatic post-merge branch deletion may remain enabled, but branch backlog cleanup is not part of this release.

## Immediate approved next sequence

1. Complete the **Batch 13A Connected Financial Data Readiness** controlled release: Publisher -> human review -> merge Main -> merge QA -> deployed browser QA/Guard -> fresh all-green Source Snapshot.
2. Keep the public connected-data feature flag OFF. Sandbox preview exists only to validate the architecture; do not market live account connectivity.
3. Do not start Batch 13B automatically. First select a jurisdiction/provider and complete privacy, regulatory, security, deletion/consent and cost review.
4. Repository branch-backlog cleanup remains deferred maintenance and must not block the connected-data architecture work.

## Required guardrails

- Reuse canonical UI and locale components and tested deterministic financial engines. Never silently change current financial formulas or saved plans.
- Keep guest-first tools, optional account, manual explicit save/update, trust/source traceability, Learn/Search SEO and app startup/navigation unchanged unless explicitly approved.
- Existing QA and automated standards run before Publisher; Publisher creates PRs and never merges automatically.
- After approved merge, run deployed Chrome Desktop, Edge Desktop and Mobile Chromium QA, Multi-Repo Guard, and a fresh Source Snapshot.
- No tokens, account credentials, private financial data or recovery codes in public GitHub docs/issues, portable handovers or PR bundles.
- Connected-data releases must remain read-only, granular-consent, data-minimized and explicit-review-first. No provider credential/token may enter Carrowmont profile state or public source.
- This status file is a dated record; the newest all-green `SNAPSHOT-MANIFEST.txt` takes precedence.

## Snapshot and documentation policy

Never treat a proposed Publisher release as deployed. Update this status file only with clearly labelled baseline facts and review-release state. A feature becomes part of the authoritative baseline only after merge, deployed validation and a fresh all-green snapshot.
