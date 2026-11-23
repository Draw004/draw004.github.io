# Carrowmont - current project status

**Status verified:** 23 November 2026, after the all-green Batch 13A Connected Financial Data Readiness release and before the Search + Ask Results UX2 maintenance release.  
**Authoritative green source snapshot:** `carrowmont-source-snapshot - 2026-11-23T191053.984.zip`  
**Snapshot SHA-256:** `9c69d3d5286bd9367de1f31d16dfcbca87b205f5182a1bbe2dc3f14e741f9c3d`  
**Source/standards QA at this baseline:** 1,537 PASS / 0 FAIL.  
**Release status:** Batch 12 and Batch 13A are deployed and captured in this all-green snapshot. Before any Batch 13B live-provider decision, the current approved maintenance release is **Search + Ask Results UX2**: fix the non-functional Search CTA affordance, show Tools and Learn side-by-side on desktop with separate right-edge scrollers, use mobile result-type tabs, preserve Best Match relevance, and keep Ask visually consistent without a large dual-pane layout.

## Exact repository baseline

These commits are recorded in the authoritative `SNAPSHOT-MANIFEST.txt`; that manifest supersedes this file if a newer green snapshot is issued.

| Repository | Commit |
|---|---|
| `draw004.github.io` | `0fff9bcf03b98f072077ae6c5c2d6ffc75859e29` |
| `sip-calculator` | `0e718f0c5935948d11c1c4eee1a3059ba0209662` |
| `goal-planner` | `cfd03c8c66bf85b2f25ee916cde78e51bacfc8b0` |
| `financial-independence` | `95b2c40f6396c80290abef514f6b98b241eff333` |
| `inflation-calculator` | `89ae312ebf444e932d7545ddf67d8e1d9fd459b9` |
| `retirement-calculator` | `28afb6e3bdf438d304dac3eef95abb80baa3590e` |
| `budget-cash-flow-planner` | `81524657dd9d24353ba2ee8f761be3b6c5629db7` |
| `mortgage-payoff-calculator` | `8b6650487a6c47b79f6ec6729795c00759b929df` |
| `compound-interest-calculator` | `bd85864abbff231bf54e1cc3864cb699a106fbcb` |
| `loan-calculator` | `7410d13df9b0014ce9ccf402af839876e7eb8fa3` |
| `carrowmont-qa` | `6ba508bbb4855626c8665940323b04ebe5415912` |

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
- **Batch 13A Connected Financial Data Readiness:** deployed and captured in the authoritative green snapshot. The provider-neutral sandbox/readiness architecture is live in source with the production feature flag OFF; no real bank/provider is connected.
- **Search + Ask Results UX2:** current approved maintenance release. Desktop Search must show Tools and Learn & Guides side-by-side with independent vertical scrolling and each scrollbar on the right edge of its own pane. Mobile uses Tools / Learn & Guides tabs with counts and normal page scrolling. Search result cards/CTAs must be genuinely clickable and keyboard-accessible; Best Match remains relevance-driven. Ask shares the Tool/Learn visual language and working CTAs without the large Search dual-pane layout.
- **Batch 13B live provider pilot:** not approved yet. A future pilot requires separate provider, jurisdiction, privacy/legal, cost and security review.
- **Batch 14:** native app decision gate remains conditional. Preserve original master-roadmap numbering.
- **Repository branch cleanup:** deferred by owner until remaining product batch work is finished. Automatic post-merge branch deletion may remain enabled, but branch backlog cleanup is not part of this release.

## Immediate approved next sequence

1. Complete the **Search + Ask Results UX2** controlled release from the post-13A green snapshot: Publisher -> human review -> merge Main -> merge QA -> deployed browser QA/Guard -> fresh all-green Source Snapshot.
2. After the owner supplies the all-green snapshot, independently verify the changed behavior on the deployed Carrowmont.com experience before marking UX2 CLOSED. In particular click the visible Open tool / Read article CTA areas, whole result cards, mobile tabs and Ask fallback cards, and inspect desktop/mobile layout and scrolling.
3. Keep the public connected-data feature flag OFF and do not start Batch 13B automatically. First select a jurisdiction/provider and complete privacy, regulatory, security, deletion/consent and cost review.
4. Repository branch-backlog cleanup remains deferred maintenance and must not block approved product work.

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
