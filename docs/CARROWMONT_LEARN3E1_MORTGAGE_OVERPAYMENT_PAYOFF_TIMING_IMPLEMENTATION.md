# CARROWMONT LEARN3E-1 — Mortgage Overpayment, Repayment Frequency & Payoff Timing

**Implementation baseline:** Carrowmont Source Snapshot 102  
**Snapshot generated:** 2026-10-21T16:11:41Z  
**Implementation date:** 21 October 2026  
**Scope:** Five existing Learn guides; no new public URLs.

## Purpose

LEARN3E-1 implements the first half of the approved Home, Mortgage & Property improvement programme. It deepens five established mortgage / home-loan education guides so readers can distinguish repayment-frequency labels from actual principal timing, compare equal extra cash fairly, understand why earlier principal reduction can matter, and translate a target payoff date into an affordable payment plan.

The release keeps one universal educational core while the existing Carrowmont localization system adapts housing terminology by country. Lender-specific rules, fees, prepayment limits and legal/tax treatment remain contract- or jurisdiction-dependent rather than being invented as universal rules.

## Pages materially improved

- `biweekly-fortnightly-mortgage-payments.html`
- `extra-mortgage-payments-early-vs-late.html`
- `monthly-extra-vs-annual-lump-sum-mortgage.html`
- `one-extra-mortgage-payment-a-year.html`
- `pay-off-mortgage-five-years-early.html`

## Editorial improvements

Each page keeps its existing canonical URL, title ownership, H1 and Mortgage / Home Loan Payoff Calculator journey. The existing Learn V2 depth module remains unique and is marked once with `data-cm-learn3e1="1"`; no second `data-cm-depth="1"` module is introduced.

The five guides now consistently include a clearly labelled **Worked example:** and **Checklist:** section while preserving the stronger material that was already present.

Specific improvements include:

- biweekly / fortnightly guidance now makes the 26-vs-24-payment distinction and lender application rules easier to audit, including whether extra cash is genuinely applied to principal;
- early-vs-late guidance adds a practical decision checklist around liquidity, higher-cost debt, lender limits, rate resets and the distinct prepayment-vs-investing decision;
- monthly-extra vs annual-lump-sum guidance now compares three equal-cash timing patterns: monthly extras, a year-end lump sum and a beginning-of-year lump sum;
- one-extra-payment guidance adds a principal-only checklist so a "13th payment" is not confused with merely paying a scheduled installment early;
- five-years-early guidance frames the target as adjustable and affordability-led rather than a command to force one payoff date.

## Deterministic illustration discipline

The numerical examples continue to use the same fixed-rate amortization basis as the relevant Carrowmont mortgage planning model. Permanent QA recalculates representative relationships instead of checking decorative text only:

- 25-year payment amounts at 4%, 6% and 8%;
- the 20-year target payments used by the five-years-early article;
- the 6% monthly-extra, year-end-lump-sum and beginning-of-year-lump-sum timing comparison;
- the equal-cash early-vs-late five-extra-payment comparison.

The examples are planning illustrations, not lender payoff quotes. Daily interest, settlement dates, rounding, fees and contract-specific rules can change a real lender result.

## Localization

The release keeps the existing Carrowmont housing-language localization layer. India can use home-loan / prepayment language; the US and Canada can use mortgage language; the UK can use overpayment wording; Australia and New Zealand can use home-loan / extra-repayment wording where natural.

Currency display remains illustrative proportional scaling, not live FX conversion. The underlying financial relationship does not change when the display currency changes.

## Protected Tool <-> Learn journeys

All five pages retain `/mortgage-payoff-calculator/` as the primary top CTA and shared bottom return CTA. Existing Mortgage Learn Education V1 and housing-localization tests remain authoritative.

No newer editorial recommendation silently overrides an older architectural contract. The Mortgage Decision Centre guides, Rent vs Buy journey and Home Affordability journey remain outside this implementation scope.

## Search and indexing

No canonical URL is changed and no new public URL is created. Only these five materially rewritten pages receive Article `dateModified` and sitemap `lastmod` of `2026-10-21`.

SEARCH1 remains exactly 121 public entries. Reviewed aliases and deterministic fixtures strengthen ownership for every-two-weeks / fortnightly payments, early-vs-late prepayment, monthly-extra-vs-lump-sum timing, one additional annual payment and a five-year target payoff without creating duplicate pages or storing user queries.

Search visibility is a desired outcome of better content. This release does not guarantee crawling, indexing, ranking, traffic, backlink placement or AI citation.

## Product and privacy boundaries

This release does not change calculator formulas, mortgage-tool inputs, reports, PDF engines, shared-plan-state behavior, analytics, SEARCH1 query privacy, homepage core-tool architecture or workflow files.

LEARN3E-2 property-investment foundations remain outside this release and must start from a fresh post-LEARN3E-1 Source Snapshot.

## Publisher FIX1 — runtime heading capitalization

The first Publisher run exposed three smoke-test failures on the biweekly / fortnightly, monthly-extra-vs-lump-sum and one-extra-payment guides. The raw HTML H1s were already correct, but the shared `mortgage-learn.js` localization layer rewrote those H1s after page load with a lowercase first word after the colon. That violated Carrowmont's established public-heading capitalization rule.

FIX1 corrects the runtime title templates, adds a defensive `capitalizeAfterColon()` step to localized mortgage-guide H1s, cache-busts the shared mortgage Learn script across all eight pages that use it, and adds browser/source-contract regression coverage. It does not change calculator mathematics, canonical URLs, article freshness, sitemap membership, SEARCH1 ownership, privacy, analytics or Tool ↔ Learn journeys.
