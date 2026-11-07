# FRE Batch 2D — Credit Card Interest / Payoff Comparison

## Purpose
Help a household answer **“What changes if I pay more than the modeled minimum on this credit card?”** and **“What fixed payment may clear it within my target period?”**

## Deterministic architecture
Batch 2D does not create competing debt mathematics. `CarrowmontCreditCardPayoffCore` orchestrates the existing `CarrowmontDebtPayoffCore` for a single card, comparing the entered fixed minimum-payment path with a higher fixed payment and solving a target-period payment by repeatedly invoking the same payoff engine.

## Boundaries
- Fixed-rate monthly planning model; not an issuer statement replica.
- The entered minimum payment is modeled as fixed rather than a changing percentage/fee formula.
- No promotional-rate expiry, daily-interest convention, late fees, new purchases, balance transfer, credit-score or lender prediction in V1.
- No card/account number, login or bank connection.

## Discovery
Standalone tool under Budget & Cash Flow, added to Tools Hub, Search, sitemap and the credit-card interest guide. The homepage nine-card grid remains unchanged.

## Report
A three-page local PDF report covers the comparison, annual balance snapshots, assumptions and next steps.

## Release gate
Deterministic fixtures → central QA → Publisher → all green → merge generated PRs → fresh authoritative Source Snapshot.
