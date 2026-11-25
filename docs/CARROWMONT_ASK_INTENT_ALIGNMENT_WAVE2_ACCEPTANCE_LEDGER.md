# Ask Intent Alignment & Coverage Wave 2 - acceptance ledger

**Status:** REVIEW RELEASE until the newest owner-supplied all-green post-merge Source Snapshot contains the implementation and green QA evidence.

## Product acceptance

- [x] Shared reviewed Ask/Search owner definitions exist for 17 controlled intents.
- [x] Explain vs calculate/plan/compare/research is distinguished before guided routing.
- [x] Specific owners beat generic topics (including Retirement Withdrawal before generic Retirement Readiness).
- [x] Ask expands from 13 to 17 guided journeys using existing deterministic engines.
- [x] The exact user-reported retirement-longevity wording resolves to Drawdown/SWP.
- [x] `Work through this` cannot knowingly contradict the recognized supported owner.
- [x] Explanation questions route to educational results instead of forcing a questionnaire.
- [x] Retirement Readiness exposes Planner + safe Drawdown handoff.
- [x] Debt-vs-Invest CTA follows the modeled path and the broken `#debt-payoff` fragment is removed.
- [x] Money Priorities, Lump Sum and Home Affordability expose contextual next actions.
- [x] APR, DTI, SIP, SWP, EMI and similar jargon follow the first-use plain-language standard.
- [x] No financial values are added to URLs.

## Regression acceptance

- [x] 204-query reviewed Ask/Search ownership corpus is source-controlled.
- [x] Historical Search deterministic fixture suite remains protected.
- [x] Browser QA covers real links/clicks, not merely href/text presence.
- [x] New journey result CTAs are clicked to real destination tools.
- [x] Retirement handoff is consumed on the actual withdrawal calculator.
- [x] Explain-mode result card is clicked to the actual Learn page.
- [x] Mobile Ask remains overflow-safe.
- [x] 204/204 reviewed ownership fixtures and 204/204 Search top-destination fixtures pass.
- [x] Historical Search fixtures remain 87/87 PASS.
- [x] Exact combined `source-contract.mjs` gate passes 1,645/1,645; its imported historical/release portion is 912/912 and inline legacy portion is 733/733.
- [x] Search index build/check validates schema 2 owner definitions and remains deterministic at 151 reviewed public entries.
- [x] Changed JS/MJS syntax checks pass.
- [ ] Publisher staged browser suite green.
- [ ] Human review/merge completed.
- [ ] Deployed QA green.
- [ ] Multi-Repo Guard green.
- [ ] Fresh all-green Source Snapshot verified.

## Release close rule

Only the newest owner-supplied all-green Source Snapshot plus its root `SNAPSHOT-MANIFEST.txt` can establish that this review release is deployed. Do not update documentation simply to chase a new snapshot filename/hash.
