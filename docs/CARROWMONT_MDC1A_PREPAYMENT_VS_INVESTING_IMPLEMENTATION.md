# CARROWMONT MDC1A — Prepayment vs Investing
## Production Implementation Record

**Implementation date:** 12 October 2026  
**Approved product specification:** `docs/CARROWMONT_MDC1A_PREPAYMENT_VS_INVESTING_SPEC_FINAL.md`  
**Authoritative production baseline:** Source Snapshot 48

## 1. Baseline lock

Production coding started only after the specification-only PR was merged and Pages, Automated QA and Multi-Repo Guard were green. Source Snapshot 48 is the exact production baseline for this implementation.

| Repository | Snapshot 48 commit |
| --- | --- |
| `draw004.github.io` | `7ca7eaa3fe7bf7303a70b63f3b74612166a3296b` |
| `mortgage-payoff-calculator` | `f87041cef73bc489980c93f566191eef78cf372b` |
| `carrowmont-qa` | `a62539879b2c33df515bc7d0772c0c30529cbed9` |

The other six core-tool repositories are outside MDC1A production scope and remain unchanged.

## 2. Controlled repository scope

Expected generated release PR count: **3**.

Merge order:

1. `mortgage-payoff-calculator`
2. `draw004.github.io`
3. `carrowmont-qa` — central QA always last

No SIP, Goal, Financial Independence, Inflation, Retirement or Budget repository change is part of MDC1A.

## 3. Public routes

- Existing payoff calculator: `/mortgage-payoff-calculator/`
- Mortgage Decision Centre hub: `/mortgage-payoff-calculator/decision-centre.html`
- MDC1A Prepayment vs Investing: `/mortgage-payoff-calculator/prepayment-vs-investing.html`
- Primary Learn guide: `/mortgage-prepayment-vs-investing.html`

The homepage remains a seven-core-tool architecture. The Mortgage / Home Loan card stays the gateway; MDC1A is a companion decision module rather than a new homepage core tool.

## 4. Engine architecture

The existing `mortgage-payoff-calculator/core.js` payoff engine is not modified by MDC1A. The new `prepayment-vs-investing-core.js` consumes the existing deterministic amortization primitives and adds the decision comparison separately.

Core MDC1A rules:

- common horizon = original scheduled mortgage payoff date;
- equal planned household cash flow across the Prepay and Invest paths;
- unused lump-sum cash is never discarded;
- unused final scheduled-payment cash is never discarded;
- continuing recurring extra money is redirected into the Prepay-path investment account after early payoff;
- the user-entered prepayment / early-repayment charge is a separate Prepay-path cost;
- investment return is optional, user-controlled and never auto-filled from a market feed;
- break-even effective annual investment return is solved deterministically;
- no crossing in the supported solver range returns an explicit null/status instead of a fabricated threshold;
- zero extra money returns a deterministic no-extra / comparison-not-applicable state.

## 5. Local profile and privacy

MDC1A adds the local-only key `carrowmontMortgageDecisionV1` for stable mortgage facts only. It does not store investment-return assumptions, extra-money assumptions, charges or results.

The Payoff Calculator stages mortgage facts only when the user explicitly activates the continuation action. MDC1A displays the staged details and requires `Use these loan details` before applying them. `Start fresh` leaves the saved profile untouched; `Clear saved mortgage details` removes only this mortgage-specific key.

No login, server-side storage or external financial-data API is introduced.

## 6. Reporting and Learn integration

MDC1A provides:

- Copy Summary from the deterministic result object;
- an actual three-page PDF Decision Report from the same result object;
- a primary Learn guide explaining equal cash flow, common horizon, uncertainty, charges and liquidity;
- bidirectional Tool ↔ Learn links;
- contextual secondary links from the most relevant existing mortgage Learn guides;
- sitemap coverage for every new public URL.

## 7. Localization

The mathematics remains universal. Country selection changes terminology and explanatory context. The release includes explicit representative terminology for India, United States, United Kingdom, Canada, Australia, New Zealand and Ireland, with an international fallback.

No country-specific tax, legal, prepayment-penalty or lender-qualification rule is invented.

## 8. QA and release gate

The release candidate must pass, against the exact packaged files:

- deterministic independent MDC1A fixtures, including the equal-cash-flow invariant;
- existing Mortgage Payoff parity / regression QA;
- Decision Centre and MDC1A Playwright QA;
- Tool ↔ Learn and sitemap/source-contract QA;
- representative India, US, UK and Australia terminology states;
- desktop, 390px and 360px overflow checks;
- Copy Summary and three-page PDF generation;
- page-by-page visual inspection of an actual generated PDF;
- source contract in source, Publisher and Multi-Repo Guard-style layouts;
- ZIP integrity and release-manifest hash verification.

Do not hand over the production release merely because static checks pass.

## 9. Workflow permissions

No workflow file is changed by MDC1A. `Workflows: Read and write` is **not required**; the established no-workflow-change / No access discipline remains in force unless separately approved.

## 10. Post-merge sequence

After all three PRs are merged in order:

**Pages → Automated QA → Multi-Repo Guard → fresh Source Snapshot → indexing.**

The fresh successful snapshot supersedes Snapshot 48 for subsequent production work.
