# FRE Batch 10B — Requirements & Acceptance Ledger

Status: Implemented for Publisher validation.

| Requirement | Implementation outcome |
|---|---|
| Signed-in Ask may use relevant saved My Carrowmont context | Implemented through a dedicated read-only account-context adapter. |
| Guest Ask remains fully usable without an account | Preserved; signed-out journeys use the existing Ask flow. |
| Guest Ask does not load account SDK merely to check context | Implemented; persisted auth is checked before account access. |
| Ask only reuses facts relevant to the selected controlled journey | Implemented with explicit per-intent mappings. |
| Current saved facts reduce repeated questions | Implemented; fresh compatible facts are inserted before `missingQuestions` is evaluated. |
| Missing facts are still requested | Preserved by the existing Ask resolver. |
| Older saved facts are not silently accepted | Implemented; stale saved facts are prefilled but remain unanswered until confirmed or replaced. |
| User can override one saved value for one scenario | Implemented with `Change for this question`. |
| User can ignore all saved context for one scenario | Implemented with `Ignore saved details for this question`. |
| Temporary overrides do not change My Carrowmont | Implemented; no account write API is called by context read/override behavior. |
| Ask read behavior does not create a new account persistence path | PASS by design; the existing explicit Save action remains authoritative. |
| Saved facts, Ask-session facts and temporary what-if values remain distinguishable | Implemented in Ask state metadata and Trust Check copy. |
| Saved context freshness is visible | Implemented with source/update dates and confirmation handling. |
| Currency mismatch does not cause silent FX conversion | Implemented; incompatible saved financial context is blocked and explained. |
| Saved mortgage term can be reused from a compatible saved mortgage scenario | Implemented for the controlled mortgage-prepay-vs-invest journey. |
| Old car purchase / new extra-payment scenario values are not silently reused | Preserved; decision-specific values remain questions unless represented by approved stable fact mappings. |
| Deterministic engines remain authoritative | No engine or formula change. |
| Ask remains limited to its existing six controlled journeys | No intent/router expansion in Batch 10B. |
| No Supabase schema / RLS / OAuth change | No schema, policy or authentication change. |
| Privacy and Terms explain signed-in Ask reuse and temporary override boundary | Updated. |
| No new public URL / sitemap / indexing change | None. |
| Responsive signed-in context UI | Added with mobile one-column behavior. |
| Browser regression coverage | Added for guest, fresh, partial, stale, override, ignore, currency mismatch, saved mortgage term and 390px geometry. |
| Source-contract coverage | Added; final pass count pending Publisher reconstruction. |
| Publisher / Automated QA / Multi-Repo Guard | PENDING release gates. |
| Authoritative Source Snapshot | PENDING all-green release snapshot. |

## 14-dimension Change-Impact Matrix

| Dimension | Batch 10B impact |
|---|---|
| Formulas | None. Existing Ask deterministic engine inputs/outputs remain unchanged. |
| Inputs | Some existing Ask inputs may be prefilled or skipped when current compatible saved facts exist; stale facts require confirmation. |
| Outputs | Financial result structures are unchanged; Trust/source presentation gains saved/session/override provenance. |
| State | Adds temporary in-memory Ask provenance/context metadata only; no persisted schema change. |
| Account | Read-only use of existing profile/scenario APIs; explicit Save remains the only Ask write path. |
| Privacy | Signed-in Ask may read relevant saved values; no guest account read, no advertising use, no connected financial data. |
| Localization | Active Carrowmont currency remains authoritative; incompatible saved currency is blocked rather than converted. |
| Reports | No PDF/report change. |
| Mobile | Adds responsive My Carrowmont context panel and per-value controls. |
| Accessibility | Context uses semantic aside/details/list/button controls, status messaging and keyboard-accessible actions. |
| Performance | One small local JS adapter; no additional network request for signed-out users; signed-in Ask reads existing profile/scenario rows once per journey start. |
| SEO | No new public URL, sitemap entry or indexable content surface. |
| QA | Adds pure context unit checks, source contract and browser tests while retaining existing Ask regressions. |
| Architecture | Extends Ask with a read-only account-context adapter; controlled intent router, deterministic engines, dashboard store and account persistence contracts remain authoritative. |
