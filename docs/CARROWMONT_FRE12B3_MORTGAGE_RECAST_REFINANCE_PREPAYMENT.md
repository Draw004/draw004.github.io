# Carrowmont FRE12B-3 - Mortgage Recast vs Refinance / Prepayment

## Release position

Batch 12B-3 was explicitly reopened by the owner after branch-backlog cleanup was deferred. The authoritative production baseline is `carrowmont-source-snapshot - 2026-11-21T215344.139.zip`.

Controlled repository scope: `mortgage-payoff-calculator`, `draw004.github.io`, and `carrowmont-qa`. Expected Publisher output is **3 PRs**, merged in that order with QA last. No workflow file is changed.

## Product decision

Do not create a fifth Mortgage Decision Centre card, a new public tool, or a new indexed URL. Add one anchored comparison module to the existing Decision Centre:

`/mortgage-payoff-calculator/decision-centre.html#prepay-recast-refinance`

The comparison applies the same entered lump sum across three paths:

1. **Prepay and keep the scheduled repayment** - prioritize earlier payoff.
2. **Lower-payment / recast illustration** - mathematically re-amortize after the lump sum while keeping roughly the original payoff horizon.
3. **Refinance / balance transfer after the same lump sum** - compare a user-entered new rate, new term and switching costs against staying on the post-prepayment path.

## Engine reuse

The release does not change approved mortgage formulas.

- `core.js` remains the source of mortgage amortization, lump-sum prepayment and lower-payment/recast illustration.
- `refinance-break-even-core.js` remains the source of refinance economics and durable break-even.
- `recast-refinance-prepayment-core.js` is a thin composition layer. It calls the two existing engines and reconciles their outputs into one three-path result object.

The refinance comparison starts after the first modeled scheduled repayment and the shared lump sum. The post-lump-sum stay path uses the shortened payoff horizon from the keep-payment prepayment path, so the refinance break-even does not silently compare against a recast baseline.

## Cost framing

The side-by-side cost measure is modeled borrowing cost, not principal repaid:

- prepay: modeled interest + entered prepayment/recast charge;
- recast illustration: modeled interest + entered prepayment/recast charge;
- refinance: modeled interest from today + switching fees + exit charge - cashback, including interest on financed fees through the existing refinance engine.

The module may identify which path has the lowest modeled borrowing cost under the entered assumptions, but it explicitly states that this is **not a recommendation**. Each path optimizes a different objective: payoff speed, required-payment relief, or changed rate/term economics.

## Guardrails

- Lump sum must be above zero and below the current balance; full settlement belongs in the existing payoff calculator.
- Recast/lower-payment output is explicitly a mathematical illustration. Lender availability and rules are not assumed.
- No live rate feed, lender ranking, eligibility decision, tax/legal rule or invented country penalty.
- Refinance rate, proposed term, fees, cashback and charges are user-entered assumptions.
- Saved mortgage facts are available only through an explicit **Use in 3-path comparison** action.
- Lump sum, new offer, fees and comparison results remain scenario-only and are not added to the shared mortgage profile.
- Country selection changes familiar wording only; the engine remains universal.

## Discovery

- The existing lump-sum mode in the Mortgage Payoff calculator links to the anchored three-path comparison.
- The existing refinance Learn guide links to the same anchor and explains that recast availability must be confirmed with the lender.
- The Learn guide review date and sitemap `lastmod` are refreshed because the public article is materially updated.
- Public inventory remains **23 tool cards / 145 indexed URLs**.

## Acceptance

The release must protect:

- deterministic prepay, recast and refinance fixtures;
- same-lump-sum invariant;
- prepayment/recast charge handling;
- financed switching fees and cashback behavior;
- no-durable-break-even and lower-payment/higher-lifetime-cost warnings;
- explicit saved-profile application;
- country-aware terminology;
- existing 4-card Decision Centre architecture;
- 23-tool / 145-URL inventory;
- payoff and Learn deep links;
- desktop and mobile overflow behavior;
- all existing mortgage, refinance and central source contracts.

After merge: deployed Chrome Desktop, Edge Desktop and Mobile Chromium QA -> Multi-Repo Guard -> fresh Source Snapshot. Do not mark Batch 12B-3 complete before that closeout.
