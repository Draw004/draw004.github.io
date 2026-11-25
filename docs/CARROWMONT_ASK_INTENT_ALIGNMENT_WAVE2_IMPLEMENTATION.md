# Carrowmont Ask Intent Alignment & Coverage Wave 2

**Date:** 25 November 2026  
**Release state:** controlled review release; not deployed until Publisher -> merge -> deployed QA -> Multi-Repo Guard -> fresh all-green Source Snapshot completes.  
**Baseline authority:** newest owner-supplied all-green Source Snapshot and its root `SNAPSHOT-MANIFEST.txt`. Historical baseline evidence for this work was `carrowmont-source-snapshot - 2026-11-25T153826.707.zip`.

## Why this release exists

Real-user testing exposed an architectural inconsistency: Ask predictive suggestions and full Search could identify **SWP / Retirement Withdrawal & Drawdown** for “calculate how long will my retirement fund would last?”, while the Ask `Work through this` action opened **Retirement Readiness**. A broader end-to-end audit then found similar gaps in mortgage-prepayment wording, payday/cash-shortfall language, credit-card payoff, emergency savings, borrowing health, goals and explanation questions.

The correction is not a one-phrase regex patch. Wave 2 gives Ask and Search a shared reviewed **intent-ownership layer**, preserves deterministic calculators as numeric authority, distinguishes explanation from calculation/planning/comparison, and makes the displayed action agree with the actual destination.

## Evidence before development

`CARROWMONT_ASK_INTENT_E2E_AUDIT_2026-11-25.md` records the pre-change audit:

- 177 natural-language stress questions;
- actual Ask/Search card clicks and final CTA destinations;
- all 13 then-current guided journeys completed with representative values;
- 151 Search-index destinations checked;
- real broken deep link found: `/budget-cash-flow-planner/#debt-payoff`;
- result/action contradiction found when Debt vs Invest favored investing but still pushed Debt Payoff;
- explanation questions such as “What is DTI?” and “How does credit-card interest work?” incorrectly started questionnaires;
- Retirement Withdrawal / SWP had no controlled Ask journey even though the deterministic engine already existed.

The stress set was adversarial and is not a production-accuracy estimate.

## Shared intent ownership

`data/carrowmont-search-aliases.json` schema 2 now contains 17 reviewed owner definitions. Each owner records:

- intent id and Ask intent;
- specificity priority;
- reviewed natural-language patterns;
- default action mode;
- primary tool and guide;
- Search destination for guided/action questions;
- Search destination for explanation questions.

`search-core.js` v1.3 adds `resolveActionMode()` and `resolveOwnership()`. The recognized action modes are **explain, calculate, plan, compare, research and general/default**. Specific decisions (for example Mortgage Prepay vs Invest or Retirement Withdrawal) are evaluated before generic topics.

`search.js` exposes the same local ownership resolver to Ask. No typed financial value is sent to an external service.

## Ask journeys: 13 -> 17

Wave 2 adds four controlled journeys using **existing deterministic engines only**:

1. **Retirement Withdrawal / SWP (Systematic Withdrawal Plan)** — existing retirement withdrawal core; supports both “how long could this balance last?” and “what withdrawal could this balance support?” modes.
2. **Loan / EMI (Equated Monthly Instalment) Cost** — existing Loan calculator core.
3. **Inflation Impact** — existing Inflation calculator core.
4. **Recurring Investment / SIP (Systematic Investment Plan) Growth** — existing SIP calculator core.

No new financial formula is introduced.

## Truthful primary action

Typed Ask questions consult shared ownership before the legacy fallback classifier.

- **Explain/research** -> educational Search/Learn fallback; do not force a calculator questionnaire.
- **Supported guided owner** -> start that exact Ask journey.
- **Recognized but unsupported owner** -> open the best matching Carrowmont route rather than an unrelated questionnaire.
- Legacy fallback classification remains only for cases with no reviewed owner.

The primary button changes to **Work through this**, **Find an explanation**, **Find research**, or **Open best match** according to the recognized ownership.

## Retirement Readiness -> Drawdown handoff

Retirement Readiness keeps **Open Retirement Planner** and adds **Test how long this retirement balance may last**.

The secondary action uses the existing one-time same-session key:

`carrowmont_retirement_withdrawal_handoff_v1`

It stages projected corpus, required corpus, monthly need, retirement age, post-retirement return, inflation and locale context. The Withdrawal calculator reviews the staged values and lets the user choose projected savings or target; values are not silently committed or put into the URL.

## Contextual result actions

- Debt vs Invest: final CTA follows the modeled answer (emergency buffer, Debt Payoff, SIP/Recurring Investment, or neutral guide).
- The obsolete `/budget-cash-flow-planner/#debt-payoff` destination is removed; the real Debt Payoff calculator URL is used.
- Money Priorities: CTA follows the modeled first priority stage.
- Lump Sum: CTA can point to the most relevant practical next tool while preserving the guide.
- Home Affordability: keeps the calculator and adds the Home-Buying Upfront Costs guide.
- New Wave 2 journeys link directly to their real detailed tools.

## Plain-language abbreviation standard

The Shared UI Standard now requires financial abbreviations/jargon to be expanded at first meaningful use or explained through obvious adjacent help. Examples protected in this release include:

- APR — Annual Percentage Rate
- DTI — Debt-to-Income ratio
- SIP — Systematic Investment Plan
- SWP — Systematic Withdrawal Plan
- EMI — Equated Monthly Instalment

The rule also applies to FI/FIRE, CAGR and future abbreviations.

## Privacy and account boundary

- Deterministic engines remain numeric authority.
- Ask typed queries remain local to Carrowmont Search/ownership code.
- No financial values are placed in query strings.
- Existing sanctioned same-session handoffs use `sessionStorage` only.
- The four new scenario journeys are not automatically added to My Carrowmont saved-profile mappings; explicit dedicated persistence can be designed later if needed.

## Permanent regression corpus

`carrowmont-qa/fixtures/ask-intent-wave2-corpus.json` contains **204 reviewed questions** across all 17 owners. It includes ordinary wording, malformed grammar, India/international terminology and explain-vs-guided pairs.

Acceptance protects both:

1. shared owner/action-mode classification; and
2. Search’s actual first destination for the reviewed question.

The end-to-end browser spec also tests the real chain: displayed suggestion -> click -> guided journey/engine -> result CTA -> actual destination/handoff.

## Release boundaries

This release does not:

- create a general-purpose chatbot;
- change calculator formulas;
- add a bank/provider connection;
- alter Batch 13B ON HOLD or Batch 14 traffic-gated decisions;
- persist typed financial values into URLs;
- create new public URLs solely for Ask intent states.

## Pre-Publisher validation evidence

The finished review candidate is protected by both current and historical QA:

- 204/204 reviewed Wave 2 ownership fixtures resolve to the intended shared owner;
- 204/204 reviewed queries give Search the intended first destination;
- the historical Search fixture suite remains 87/87 PASS;
- all imported release/history contracts pass 912/912;
- all inline legacy source checks pass 733/733;
- together, the source contract set is 1,645 PASS / 0 FAIL (27 new checks above the deployed 1,618 baseline);
- 20 changed JS/MJS files pass `node --check`;
- the Search index builder accepts schema 2 only when reviewed owners, regex patterns, modes and same-origin owner destinations validate;
- Search index build/check remains deterministic at 151 reviewed public entries.

The exact combined `source-contract.mjs` Publisher gate was also rerun as one process against the finished candidate and completed successfully at **1,645 PASS / 0 FAIL (exit code 0)**. The 912 imported-contract and 733 inline-check counts above are retained only to show the two logical portions of that same gate. Publisher remains responsible for rerunning the staged source and browser gates on the packaged release.

## Deployment gate

Do not mark Wave 2 complete from source QA alone. Required sequence remains:

**Publisher -> reviewed merge -> deployed QA (Chrome/Edge/Mobile as applicable) -> Multi-Repo Guard -> fresh all-green Source Snapshot -> post-development verification.**

After the full green close, the next roadmap step is **Measurement / next-priority review**, using real Ask/Search/Learn behavior and Search Console evidence rather than adding features for volume.
