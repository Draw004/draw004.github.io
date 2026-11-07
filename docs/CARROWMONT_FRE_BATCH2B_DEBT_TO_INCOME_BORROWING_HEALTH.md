# Carrowmont FRE Batch 2B — Debt-to-Income & Borrowing Health

## Purpose
Add a globally neutral borrowing-health decision engine that shows debt-to-income arithmetic, the effect of another monthly debt payment, household cash room when take-home income is supplied, and a user-controlled income-drop stress view.

## Locked product rules
- No universal DTI safe/unsafe threshold.
- No lender-approval prediction or credit score.
- Gross-income DTI stays separate from take-home cash-flow analysis.
- Existing debt payments are entered as required monthly payments, not balances.
- Proposed borrowing is compared using a proposed monthly payment; the existing Loan / EMI Calculator remains the source for converting a loan amount/rate/term into a payment.
- The stress test changes gross income only; it does not model tax, benefits, severance, rate resets, credit scoring or country-specific underwriting.
- Financial inputs stay local to the page; no login, bank connection, persistence or network transmission is added.

## Deterministic formulas
- Current debt payments = housing debt payment + other loan payments + credit-card minimums + other recurring debt payments.
- Current gross-income DTI = current debt payments / gross monthly income.
- Proposed debt payments = current debt payments + proposed new monthly debt payment.
- Proposed gross-income DTI = proposed debt payments / gross monthly income.
- Current cash room = take-home income - current debt payments - essential non-debt expenses.
- Proposed cash room = take-home income - proposed debt payments - essential non-debt expenses.
- Stressed gross income = gross income × (1 - income drop %).
- Stressed DTI = proposed debt payments / stressed gross income.

## Discovery and integration
- Standalone public tool in Tools directory, Search and sitemap.
- Contextual inbound links from five relevant Learn guides.
- FRE engine id: `debt-to-income-borrowing-health`.
- FRE intent: `borrowing-health`.
- Engine Registry V5 records 24 engines.
- Nine-card homepage core grid is unchanged.
