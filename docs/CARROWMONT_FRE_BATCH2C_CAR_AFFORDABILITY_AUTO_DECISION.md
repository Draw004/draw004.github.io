# FRE Batch 2C — Car Affordability & Auto Decision

## Purpose
Help a household answer **“What would this car purchase do to my finances?”** without reducing affordability to one payment-to-income rule.

## Deterministic architecture
Batch 2C does not create competing loan, DTI or emergency-fund mathematics. The new decision core orchestrates:

1. **Loan / EMI Core** — financed amount, monthly payment, total repayment and interest.
2. **Debt-to-Income & Borrowing Health Core** — current/post-purchase DTI context and cash room.
3. **Emergency Fund & Financial Runway Core** — runway before and after the purchase using the user's chosen runway target.
4. **Car Decision Core** — combines those outputs with user-entered running costs, upfront cash, stress inputs and optional comparisons.

The rule remains: **Carrowmont reasoning combines; deterministic engines calculate.**

## Inputs
Vehicle price, down payment, trade-in credit, upfront cash taxes/fees, rate, term, gross/take-home income, essential expenses, existing monthly debt, car running costs, emergency savings, emergency savings used for the purchase, user-selected runway target, rate/running-cost stress assumptions, and optional alternative scenarios.

## Outputs
Loan amount/payment/interest, all-in monthly car cost, cash room before/after the car, DTI before/after the new loan when gross income is supplied, runway before/after purchase, stress cash room, and comparison deltas for a lower price, more down payment and a longer term.

## Decision boundaries
- No universal 20/4/10 or similar rule.
- No universal price-to-income or payment-to-income threshold.
- No lender-approval or credit-score prediction.
- No depreciation, resale-value, investment-opportunity-cost, insurance-quote or trade-in-loan-balance model in v1.
- Taxes/registration are included only when the user enters an upfront amount.
- A longer term is shown as a trade-off: it can reduce the monthly payment while increasing total interest.

## Privacy and platform boundaries
Guest-first, local calculation only. No new account, storage, bank connection, financial-input analytics payload or external finance API is introduced.

## Discovery
The tool is added to the full Tools directory, Carrowmont Search, sitemap and selected relevant Learn journeys. The nine-card homepage remains unchanged.

## Release gate
Publisher browser/mobile/PDF QA → merge in generated order → Automated QA → Multi-Repo Guard → fresh authoritative Source Snapshot.
