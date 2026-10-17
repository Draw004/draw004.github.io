# CARROWMONT HOME1 - HOME AFFORDABILITY / MORTGAGE BORROWING POWER CALCULATOR

## Final Product, Calculation, Plain-Language UX, Localization, Learn, SEO, Privacy, Reporting, QA & Release Specification

**Status:** FINAL - specification-only approval gate; production code must not be changed by this document  
**Authoritative baseline:** Carrowmont Source Snapshot 81  
**Snapshot generated:** 2026-10-17T17:58:13Z  
**Main-site baseline commit:** `407f9aa053ce83c159e8f5ff78cb17e6c22219c1`  
**Mortgage / Home Loan baseline commit:** `fd3d9771a66b3cfa54081d9726b36b78c9cdb8b8`  
**Budget & Cash Flow baseline commit:** `7aa37f462565f524a50a8c7fd77bab72b1c8eaf2`  
**Loan / EMI baseline commit:** `bc688a6b9901c3cd686b6d39ccd1c8002dd7e5d4`  
**Central QA baseline commit:** `bf6a1025da9ea038ee3e6e7276fa8e7b27d1f986`  
**Baseline source contract:** 534 PASS / 0 FAIL  
**Specification date:** 18 October 2026  

---

# 1. Executive decision

Build the next Carrowmont decision tool as a public, free, no-login **Home Affordability / Mortgage Borrowing Power Calculator**.

The tool should answer the question that comes before Rent vs Buy and before taking a mortgage or home loan:

> **What home price and loan size may fit my actual household cash flow without using up the monthly room I want to keep for normal life, savings and surprises?**

It must also answer the forward-check question:

> **If I am considering a home at this price, what would the monthly housing cost look like and how much money could remain after my other commitments?**

HOME1 is a household planning tool. It is **not** a lender eligibility calculator, credit decision, mortgage pre-approval, regulatory affordability test or guarantee that a lender will approve any amount.

The product must deliberately separate:

1. what may fit the user's own household budget;
2. what the mathematical loan payment would be under entered assumptions; and
3. what a lender may approve, which Carrowmont does not determine.

This distinction is a non-negotiable trust rule.

---

# 2. Why HOME1 is useful now

Carrowmont already covers many decisions after a user has chosen or taken housing debt:

- Rent vs Buy;
- Mortgage / Home Loan Payoff;
- Prepayment vs Investing;
- Refinance / Balance Transfer Break-Even;
- Mortgage Rate Rise & Budget Stress;
- Loan / EMI Calculator;
- Budget & Cash Flow Planner;
- Goal Planner for a future deposit / down payment.

The missing earlier decision is affordability before commitment.

A user may know that a lender could offer a certain amount and still not know whether that amount leaves enough room for food, transport, childcare, insurance, savings, emergencies, travel, irregular bills or future goals.

HOME1 should therefore be built around **household cash-flow fit first**, not around a single industry multiple or a claim that one ratio is universally safe.

---

# 3. Product identity and canonical route

## 3.1 Internal identity

Internal codename:

`HOME1`

Internal neutral name:

**Home Affordability / Mortgage Borrowing Power Calculator**

## 3.2 Canonical production route

Canonical URL:

`https://carrowmont.com/home-affordability-calculator.html`

The calculator should live in the main Carrowmont site repository as a secondary **Home & Loans** decision tool.

Do not create a new GitHub repository for HOME1 V1.

Do not create country-cloned routes such as `/india/home-loan-affordability/`, `/uk/mortgage-affordability/` or `/au/borrowing-power/` merely for rankings.

One universal engine and one canonical URL must serve every market.

## 3.3 Search-facing static identity

Recommended HTML title:

**Home Affordability Calculator | Carrowmont**

Recommended meta description:

**Estimate a home price and mortgage or home-loan amount that may fit your household budget, deposit, monthly costs and chosen cash-flow buffer.**

Recommended static H1 fallback:

**See what home price may fit your budget without squeezing everything else.**

The runtime visible product label may localize by country, but the canonical URL and core calculation logic remain stable.

---

# 4. Country-aware terminology

HOME1 must follow Carrowmont's established rule:

**Universal calculation engine + country-relevant terminology + no invented local legal or lender rules.**

Recommended visible product labels:

- **India:** `Home Loan Affordability Calculator`
- **United States:** `Home Affordability Calculator`
- **Canada:** `Mortgage Affordability Calculator`
- **United Kingdom:** `Mortgage Affordability Calculator`
- **Ireland:** `Mortgage Affordability Calculator`
- **Australia:** `Home Loan Borrowing Power Calculator`
- **New Zealand:** `Home Loan Borrowing Power Calculator`
- **Other / International:** `Home Affordability & Mortgage Calculator`

Recommended field terminology:

| Concept | India | US | Canada | UK / Ireland | Australia / New Zealand | International |
|---|---|---|---|---|---|---|
| Upfront contribution | Down payment | Down payment | Down payment | Deposit | Deposit | Deposit / down payment |
| Loan payment | EMI / repayment | Mortgage payment | Mortgage payment | Mortgage repayment | Home-loan repayment | Mortgage / home-loan repayment |
| Loan duration | Tenure | Loan term | Amortization | Mortgage term | Loan term | Loan term |
| Housing loan | Home loan | Mortgage | Mortgage | Mortgage | Home loan | Mortgage / home loan |
| Net income | Monthly take-home household income | Monthly take-home household income | Monthly take-home household income | Monthly net household income | Monthly after-tax household income | Monthly take-home household income |

The India UI may use **EMI** where natural, but do not replace all occurrences of repayment or payment with EMI outside India.

Canada may use **amortization** for the repayment horizon where appropriate, but HOME1 V1 does not model mortgage contract renewal rules or qualification stress tests.

Australia / New Zealand may use **borrowing power** as a familiar discovery term, but the result must still be described as Carrowmont's household planning estimate, not a lender's borrowing-power decision.

---

# 5. Plain-language rule - locked product standard

HOME1 must be understandable to a person who does not work in finance.

Every user-facing screen, result, report and Learn page must follow these rules:

1. Use short sentences and familiar words before technical terms.
2. If a technical term is necessary, explain it immediately in plain language.
3. Put the decision meaning next to the number rather than hiding it in methodology.
4. Explain what could make the answer move up or down.
5. Avoid language that sounds like approval, advice or certainty.
6. Show trade-offs, not just a maximum.
7. Use examples that reflect normal household choices rather than idealized perfect budgets.
8. Never use shame, urgency or pressure language around buying a home.
9. Do not imply that the highest mathematically possible price is the right price.
10. Every important result should help answer: **What does this mean for my monthly life?**

Examples of preferred copy:

- `This price fits the monthly buffer you chose under the assumptions entered.`
- `A higher rate would reduce the price that fits the same monthly budget.`
- `This home would leave less monthly room than you said you want to keep free.`
- `Only a lender can decide whether you qualify for a loan.`

Avoid:

- `You can definitely afford this home.`
- `You qualify for X.`
- `Safe maximum loan.`
- `Guaranteed borrowing power.`
- `Recommended property price.`

---

# 6. Product boundary: affordability vs lender approval

The distinction between **affordable to the household** and **approved by a lender** must be visible throughout HOME1.

HOME1 estimates household fit using user-entered cash flow, deposit / down payment, costs, interest rate and term.

A lender may separately consider:

- verified income;
- employment and income stability;
- credit history / credit score;
- current debts;
- loan-to-value rules;
- interest-rate stress rules;
- product-specific policy;
- property type and valuation;
- local regulation;
- documentation and underwriting criteria.

HOME1 must not attempt to reproduce all of those rules globally.

Required visible statement near the result:

> **Household planning estimate, not lender approval. A lender may offer more, less or nothing depending on its criteria and your circumstances.**

---

# 7. V1 solve modes

HOME1 V1 should expose two clear modes.

## 7.1 Mode A - What home price may fit my budget?

Primary question:

> **Given my monthly household cash flow, deposit / down payment, rate and term, what home price fits the monthly buffer I want to keep?**

Main outputs:

- planning home-price estimate;
- estimated loan / mortgage / home-loan amount;
- modeled principal-and-interest repayment;
- estimated all-in monthly housing cost;
- monthly amount left after entered commitments and housing;
- available deposit / down payment;
- optional higher-rate result;
- lender approval: `Not estimated by Carrowmont`.

## 7.2 Mode B - Check a home price

Primary question:

> **If I buy a home at this price, what would the monthly housing cost look like and would it preserve the monthly buffer I chose?**

Main outputs:

- required modeled loan amount;
- modeled principal-and-interest repayment;
- estimated all-in housing cost;
- monthly amount left after entered commitments and housing;
- difference versus the user's chosen monthly buffer;
- upfront cash required versus available deposit / down payment;
- optional higher-rate check;
- lender approval: `Not estimated by Carrowmont`.

The two modes must use the same deterministic engine and the same definitions.

---

# 8. Simple Mode inputs

Simple Mode should be decision-complete without asking for dozens of fields.

## 8.1 Household take-home income

Required.

Label should localize as defined in Section 4.

This is the household cash actually available after tax and payroll deductions. HOME1 must **not** convert gross salary to take-home pay because that would require a maintained country tax engine.

Helper copy:

`Use the regular amount your household actually receives after tax and payroll deductions.`

## 8.2 Essential monthly spending excluding future housing

Required.

This should cover normal non-housing household spending such as food, utilities not included in housing costs, transport, childcare, healthcare, insurance and other ongoing essentials.

The user should not include the future mortgage / home-loan repayment here.

## 8.3 Existing monthly debt repayments

Required, default `0`.

Examples:

- car / auto loan;
- personal loan;
- education loan;
- credit-card repayment commitment;
- other fixed debt repayments.

Do not infer debts from account data in V1.

## 8.4 Monthly savings / investing the user wants to protect

Required, default `0`.

This is intentionally separate from expenses.

Carrowmont should not make a home look affordable by silently consuming the user's retirement, emergency-fund or other important savings plan.

Helper copy:

`Enter the amount you want to keep saving or investing each month even after buying the home.`

## 8.5 Monthly free-cash buffer

Required.

Label:

**Money I want left free each month**

Helper copy:

`Choose an amount you would still like to have left after essentials, debt, planned savings and housing. This is your own comfort buffer - Carrowmont does not choose it for you.`

Do not default this field to an arbitrary percentage of income.

## 8.6 Deposit / down payment available

Required.

This should mean the amount genuinely available for the home purchase **after** the user has decided what cash to keep aside for emergencies and other goals.

Simple Mode must say this explicitly.

## 8.7 Interest rate

Required.

- user-entered;
- no live-rate API;
- no market-rate prediction;
- validation cap should be generous but bounded;
- helper text should encourage use of a realistic quoted or researched rate.

## 8.8 Loan term / tenure / amortization

Required.

Recommended V1 input: years, with an optional months field if consistent with the final UI.

## 8.9 Other monthly homeownership costs

Visible in Simple Mode and allowed to be zero, but zero must carry a warning.

This consolidated amount can include, where relevant:

- property tax / council tax / rates attributable to ownership;
- home / homeowners insurance;
- mortgage insurance if the user knows it;
- HOA / strata / body corporate / service charges;
- recurring maintenance allowance;
- ground rent or similar recurring property costs;
- other regular housing costs not included in principal and interest.

Required warning when zero:

`You have not included other ownership costs. That can make the affordable price look higher than it really feels in your monthly budget.`

Carrowmont must not auto-invent these costs from country rules in V1.

---

# 9. Advanced inputs

Advanced mode may add detail without changing the universal core.

## 9.1 Upfront cash breakdown

Optional fields:

- total cash available for purchase;
- emergency / other cash to keep untouched;
- estimated legal, transfer, inspection, lender and other buying costs;
- resulting available deposit / down payment.

If used, the available deposit / down payment should be derived visibly:

`Cash available - cash kept aside - estimated buying costs`

Do not assume a universal closing-cost percentage.

## 9.2 Gross annual household income - context only

Optional.

If provided, HOME1 may show the modeled loan as an **income multiple for context only**.

Example:

`Modeled loan = 3.8x the gross annual household income you entered.`

It must not label the number as an eligibility ratio or approval ratio.

No country-specific maximum income multiple is applied automatically.

## 9.3 Higher-rate check

Optional but recommended.

User enters either:

- a higher test rate directly; or
- a percentage-point increase from the selected rate.

The default UI may suggest trying a higher rate, but must make clear that the chosen stress is an illustration, not a forecast and not a regulatory lender stress test.

The result should show how the same monthly budget changes:

- maximum modeled loan amount;
- planning home-price estimate;
- repayment;
- monthly leftover.

## 9.4 Detailed monthly ownership costs

Advanced mode may break the consolidated ownership-cost input into user-entered lines, then sum them:

- property tax / rates;
- insurance;
- strata / HOA / body corporate / service charge;
- maintenance reserve;
- mortgage insurance or lender insurance if known;
- other.

No line receives an invented country default.

---

# 10. Core cash-flow affordability equation

Let monthly values be:

- `I` = take-home household income;
- `E` = essential non-housing spending;
- `D` = existing debt repayments;
- `S` = savings / investing the user wants to protect;
- `B` = free-cash buffer the user wants left;
- `O` = other monthly homeownership costs;
- `M` = maximum principal-and-interest mortgage / home-loan payment that fits the selected buffer.

Then:

`M = I - E - D - S - B - O`

If `M <= 0`, HOME1 must not produce a positive affordable loan amount.

Instead show a plain-language explanation such as:

`Under the amounts entered, there is no monthly room left for a principal-and-interest home-loan payment while keeping your chosen savings and buffer.`

This is a household cash-flow equation, not a lending rule.

---

# 11. Reverse loan calculation for Mode A

For a standard fixed-rate principal-and-interest loan with monthly repayment convention:

Let:

- `r` = monthly interest rate;
- `n` = number of monthly payments;
- `M` = affordable monthly principal-and-interest payment;
- `P` = modeled maximum loan principal.

For `r > 0`:

`P = M * (1 - (1 + r)^(-n)) / r`

For `r = 0`:

`P = M * n`

HOME1 must use the same rate-conversion convention across the screen, report, QA fixtures and any shared loan utilities.

Do not mix nominal and effective annual-rate conventions silently.

---

# 12. Planning home-price calculation

Let:

- `P` = modeled loan principal from Section 11;
- `DP` = available deposit / down payment after any reserved cash and buying costs the user has chosen to reflect.

Then:

`Planning home price = P + DP`

This is a planning estimate under the entered assumptions.

Do not label it `Maximum lender-approved home price`.

If the user has not entered buying costs or other ownership costs, the result must surface that omission near the headline.

---

# 13. Forward calculation for Mode B

Let:

- `H` = target home price;
- `DP` = available deposit / down payment;
- `L` = modeled loan amount.

`L = max(H - DP, 0)`

The monthly principal-and-interest repayment uses the standard amortizing payment formula.

For `r > 0`:

`Payment = L * r / (1 - (1 + r)^(-n))`

For `r = 0`:

`Payment = L / n`

Then:

`All-in housing cost = Payment + O`

`Monthly leftover = I - E - D - S - All-in housing cost`

`Buffer difference = Monthly leftover - B`

Interpretation:

- `Buffer difference >= 0` -> the target home preserves the buffer the user chose under the entered assumptions.
- `Buffer difference < 0` -> the target home uses more monthly cash than the user said they want to commit.

Do not introduce a separate Carrowmont threshold.

---

# 14. Upfront affordability check

If Advanced Mode uses a cash breakdown, HOME1 should also answer:

> **Do I have enough upfront cash for the deposit / down payment and estimated buying costs while keeping the reserve I chose?**

Show:

- cash available;
- amount kept aside;
- estimated buying costs;
- deposit / down payment available;
- upfront cash gap, if any.

Do not treat monthly affordability as sufficient when the upfront cash requirement is not met.

---

# 15. Result hierarchy - Mode A

The result should be readable in this order.

## 15.1 Headline

**Planning home price based on your chosen monthly buffer**

Primary number:

- modeled home price.

Supporting line:

`This is the price produced by the income, spending, savings, buffer, deposit, rate and costs you entered. It is not lender approval.`

## 15.2 Key numbers

Show:

- estimated loan amount;
- modeled principal-and-interest repayment;
- estimated all-in monthly housing cost;
- monthly amount left after entered commitments;
- deposit / down payment;
- monthly buffer chosen by the user.

## 15.3 Missing-cost warnings

If other ownership costs are zero, surface that clearly.

If buying costs are not modeled, say so.

## 15.4 Higher-rate check

If enabled, show the same key numbers at the user's higher test rate.

## 15.5 Lender approval panel

Always show:

**Lender approval: not estimated**

With a short explanation that underwriting criteria differ by lender, product, country and borrower.

---

# 16. Result hierarchy - Mode B

## 16.1 Headline verdict

Use only the user's own selected buffer as the decision boundary.

Examples:

- **Fits the monthly buffer you chose**
- **Would use part of the buffer you said you want to keep**

Do not use traffic-light labels such as `safe`, `risky` or `approved`.

## 16.2 Key numbers

Show:

- target home price;
- deposit / down payment;
- modeled loan amount;
- principal-and-interest repayment;
- all-in monthly housing cost;
- monthly amount left;
- chosen monthly buffer;
- difference versus that buffer.

## 16.3 Upfront cash check

If detailed cash inputs are present, show whether the purchase leaves the cash reserve the user chose.

## 16.4 Higher-rate check

Show whether the same target home still preserves the selected buffer at the higher test rate.

---

# 17. No fake precision

HOME1 should round results for readability while retaining full precision internally.

Recommended display principles:

- home price / loan amount: currency rounded sensibly for the magnitude;
- monthly payments: currency with whole-unit or two-decimal precision based on existing Carrowmont rules;
- rates: up to two decimals;
- income multiple: one or two decimals;
- no statement such as `you can afford exactly 437,284` when the model depends on estimated household costs.

Copy should repeatedly frame the result as a planning estimate.

---

# 18. Sensitivity and decision support

HOME1 should teach the user **why** affordability changes.

Required explanation panel:

**What moves this number?**

Plain-language points:

- a larger deposit / down payment usually reduces the loan needed;
- a higher interest rate increases the payment for the same loan;
- a longer term can reduce the monthly payment but usually increases total interest and keeps debt for longer;
- higher existing debt repayments reduce monthly room for housing;
- higher ownership costs reduce the price that fits the same monthly budget;
- protecting more monthly savings or a larger free-cash buffer lowers the modeled home price but preserves more room for other priorities.

Do not frame any one of these as universally better.

---

# 19. Country-specific rule boundary

HOME1 V1 must **not** automatically calculate or enforce:

- lender-specific eligibility rules;
- credit-score requirements;
- statutory debt-to-income caps;
- regulatory stress-test rates;
- mortgage insurance eligibility thresholds;
- minimum deposit rules;
- local stamp duty / transfer tax;
- first-home-buyer grants;
- tax deductions or credits;
- pension or retirement-account withdrawal rules for a deposit;
- local legal conveyancing charges;
- property-tax rates;
- insurance premiums;
- HOA / strata / service-charge assumptions.

Where a local rule materially matters, Carrowmont may provide sourced educational context in Learn content, but the calculator must either ask the user for the actual number or leave it out transparently.

---

# 20. Canada-specific boundary

Canadian sources commonly discuss Gross Debt Service and Total Debt Service ratios for particular insured-mortgage contexts.

HOME1 V1 must not silently apply those ratios globally or present them as a universal affordability rule.

If Canada-specific educational context is shown later, it must:

- cite an authoritative current source;
- state exactly what program or qualification context the ratio belongs to;
- keep Carrowmont's household-budget estimate separate from lender / insurer qualification.

---

# 21. Australia / New Zealand borrowing-power boundary

The visible term **borrowing power** may be used because it is familiar in those markets.

The calculator result must still say that Carrowmont is estimating household fit from user-entered assumptions.

Do not claim to reproduce a bank serviceability assessment.

A higher-rate scenario may be encouraged as a personal stress check, but it must not be described as the lender's official serviceability buffer.

---

# 22. India home-loan boundary

India may use:

- Home Loan;
- EMI;
- tenure;
- down payment.

Do not use `eligibility` as the primary result label.

If a user arrives from a `home loan eligibility calculator` search, the page may explain:

`Carrowmont estimates what may fit your household budget. It does not predict bank eligibility or approval.`

Do not auto-apply a bank FOIR, income multiple or loan-to-value rule unless a later explicitly approved country module is built from authoritative maintained sources.

---

# 23. Relationship to existing Carrowmont tools

HOME1 should fit into this user journey:

**Budget & Cash Flow -> Home Affordability -> Rent vs Buy -> Mortgage / Home Loan -> Prepayment / Refinance / Rate Stress**

Additional connections:

- Goal Planner can help build a deposit / down-payment goal;
- Loan / EMI Calculator can model non-housing loan repayments;
- Debt Payoff can help users test whether reducing other debt creates more monthly room;
- Mortgage Rate Rise & Budget Stress can provide a deeper post-borrowing stress test.

HOME1 must not duplicate those tools.

---

# 24. Shared state and cross-tool handoff

Privacy-first local browser state remains the architectural rule.

HOME1 V1 should **not require** a financial-data handoff to be useful.

If a production implementation adds a handoff from Budget or another tool, it must satisfy all established Carrowmont rules:

- same-origin local state only;
- no financial values in the URL;
- receiving fields validate semantics and currency;
- no silent overwrite;
- imported values are visibly staged for review;
- the user confirms before values become active;
- one-time handoff data is consumed and cleared;
- analytics do not receive the financial values.

Do not expand cross-tool state merely for convenience.

A simple contextual link is preferred over a fragile or semantically ambiguous handoff.

---

# 25. Privacy and analytics

HOME1 must inherit Privacy & Analytics Trust V2.

Requirements:

- no login required;
- no server-side storage of financial inputs in V1;
- no financial values in query strings or URL fragments;
- Google Analytics remains opt-in only under the shared consent architecture;
- only approved non-financial event names / dimensions may be emitted;
- `page_location` and `page_referrer` remain path-only under the shared analytics sanitization rule;
- no calculator values are sent as analytics event fields;
- no third-party affordability API;
- no lender lead-generation API in V1.

---

# 26. Learn architecture - three focused decision pages

HOME1 should launch with a small Learn cluster because the calculator serves a major household decision and the surrounding informational searches are distinct.

Do **not** create generic filler articles merely to increase page count.

Every article must independently answer its question before asking the user to open the calculator.

## 26.1 Learn page A - How much home can I afford?

Canonical route:

`https://carrowmont.com/how-much-home-can-i-afford.html`

Primary intent:

- how much home can I afford;
- how much house can I afford;
- what home price fits my budget.

Recommended title:

**How Much Home Can I Afford? A Practical Budget Guide | Carrowmont**

Core teaching points:

- start with monthly life, not a property price;
- separate take-home income from gross income;
- protect essential spending and important savings;
- include ownership costs beyond the loan repayment;
- keep a cash buffer the household chooses;
- consider a higher-rate scenario;
- lender approval and comfortable affordability are different questions.

Primary CTA:

**Open Home Affordability Calculator**

## 26.2 Learn page B - Mortgage affordability vs lender approval

Canonical route:

`https://carrowmont.com/mortgage-affordability-vs-lender-approval.html`

Primary intent:

- mortgage affordability vs approval;
- how much can I borrow vs how much can I afford;
- lender offer vs household budget.

Recommended title:

**Mortgage Affordability vs Lender Approval: What Is the Difference? | Carrowmont**

Core teaching points:

- approval asks what a lender is willing to lend;
- affordability asks what still leaves room for the household's other priorities;
- lenders use criteria Carrowmont does not reproduce;
- a larger approved amount is not automatically a better household decision;
- users should compare the payment with actual spending and future goals.

Primary CTA:

**Check What Fits Your Household Budget**

## 26.3 Learn page C - Deposit / down payment and interest-rate effect

Canonical route:

`https://carrowmont.com/how-deposit-and-interest-rates-affect-home-affordability.html`

Primary intent:

- how deposit affects mortgage affordability;
- how down payment affects home affordability;
- how interest rates affect how much house / home you can afford.

Recommended title:

**How Do Deposits, Down Payments and Interest Rates Affect Home Affordability? | Carrowmont**

Core teaching points:

- a larger deposit reduces the loan needed;
- keeping all cash as a deposit can weaken the emergency reserve;
- higher rates increase payments and reduce the loan that fits the same monthly budget;
- a longer loan term can lower the payment but extend debt and increase total interest;
- ownership costs still matter even with a large deposit.

Primary CTA:

**Model Your Home Budget**

---

# 27. Learn writing standard - simple language with deep meaning

Each HOME1 Learn page must follow this structure unless a clearly better editorial structure is approved:

1. **30-second answer** - direct answer in plain English.
2. **The decision behind the question** - why the number matters to daily life.
3. **What actually changes the answer** - 3 to 6 meaningful drivers.
4. **Simple worked example** - realistic household example with transparent assumptions.
5. **What can go wrong if you only look at the headline number** - e.g. ignored ownership costs, no savings buffer, rate change.
6. **What this does not tell you** - lender approval, future rates, taxes or property-price direction.
7. **Questions to ask before deciding** - concise checklist.
8. **Primary calculator CTA**.
9. **Related Carrowmont links** only where genuinely relevant.
10. **Sources and methodology note**.

The article must not become a wall of jargon.

A user who reads only the article should still be better equipped to make a decision.

---

# 28. Existing Learn connections

Add contextual links without link dumping.

Recommended existing pages:

- `/rent-vs-buy-home.html` -> secondary link to HOME1 when discussing the starting budget / home price;
- `/mortgage-rate-rise-payment-stress.html` -> secondary link to HOME1 for users who have not borrowed yet;
- `/planning-life-goals.html` or relevant deposit-saving content -> contextual link where a home deposit is discussed;
- `/budgeting-with-irregular-income.html` -> only if the copy genuinely discusses housing affordability and irregular income.

Do not add HOME1 mechanically to every mortgage article.

---

# 29. Query ownership contract

## 29.1 HOME1 calculator owns

Primary:

- home affordability calculator;
- mortgage affordability calculator;
- home loan affordability calculator;
- borrowing power calculator;
- how much home can I afford calculator;
- how much house can I afford calculator.

Regional synonyms may be visible in static crawlable content, but all point to the one canonical calculator.

## 29.2 Learn page A owns

- how much home can I afford;
- how much house can I afford;
- how much should I spend on a home.

## 29.3 Learn page B owns

- mortgage affordability vs lender approval;
- how much can I borrow vs how much can I afford;
- lender mortgage offer vs household budget.

## 29.4 Learn page C owns

- how deposit / down payment affects affordability;
- how interest rates affect home affordability;
- why a higher mortgage rate reduces borrowing room.

## 29.5 Cannibalization rule

The calculator owns interactive / calculator intent.

The Learn pages own explanatory question intent.

Titles, H1s and internal anchor text should reinforce this division rather than making every page target `home affordability calculator`.

---

# 30. Tools Hub integration

Add HOME1 under the existing **Home & Loans** family in `/tools.html`.

It should be discoverable with country-aware visible terminology.

Do not add a placeholder before the calculator is live.

Do not remove or demote existing tools merely to fit HOME1.

HOME1 remains a secondary decision tool, not a new tenth homepage core card.

---

# 31. Homepage and footer rule

## 31.1 Homepage

Do not add HOME1 to the primary core-tool grid in V1.

If a future homepage `Explore more` or contextual housing surface is updated, HOME1 may be included only if the layout remains intentionally curated.

## 31.2 Footer

The permanent compact-footer architecture remains locked.

**Do not add HOME1 as another footer item.**

New calculators should be discovered through:

- All Tools;
- relevant Learn pages;
- contextual tool links;
- search;
- product-family journeys.

The footer must not grow with each new calculator.

---

# 32. On-page educational explanation

Below the calculator, include a concise static explanation that remains useful without JavaScript.

Required topics:

- what HOME1 estimates;
- why take-home income matters for household cash flow;
- why other ownership costs matter;
- why deposit / down payment and interest rate change the result;
- why monthly savings and a free-cash buffer are protected separately;
- why lender approval may differ;
- link to methodology and the three Learn pages.

This section should improve search usefulness without duplicating the full Learn articles.

---

# 33. Chart and comparison design

HOME1 does not need a decorative chart merely because other calculators have one.

A chart is justified only if it helps a decision.

Recommended V1 visual:

**Monthly household cash-flow bar / bridge**

Show the entered monthly take-home income allocated across:

- essential spending;
- existing debt;
- protected savings / investing;
- estimated housing cost;
- chosen free-cash buffer;
- any remaining amount beyond the selected buffer.

The visual must:

- have permanent labels or an accessible text equivalent;
- not depend on hover;
- not use color as the only meaning;
- remain readable at 390 px and 360 px;
- use the same result object as the text outputs.

A second compact rate-sensitivity table may be more useful than a second chart.

---

# 34. Scenario table

When higher-rate check is enabled, show a compact table:

| Scenario | Rate | Modeled payment | Home price / target fit | Monthly leftover |
|---|---:|---:|---:|---:|
| Entered assumptions | user rate | result | result | result |
| Higher-rate check | user stress rate | result | result | result |

Do not label the second row `future rate` or `forecast`.

---

# 35. Copy Summary

Copy Summary must be plain-language and privacy-safe.

Suggested structure:

- Carrowmont Home Affordability result;
- mode used;
- planning home price or target home price;
- deposit / down payment;
- modeled loan amount;
- interest rate and term;
- principal-and-interest payment;
- other monthly ownership costs entered;
- all-in housing cost;
- monthly leftover;
- chosen monthly buffer;
- higher-rate check if enabled;
- missing-cost warnings;
- `Household planning estimate, not lender approval.`

No tracking parameters or financial values should be placed into a shareable URL.

---

# 36. CSV export

CSV is useful if HOME1 includes the entered-rate and higher-rate scenario table.

Recommended columns:

- Scenario;
- Interest rate;
- Home price;
- Deposit / down payment;
- Loan amount;
- Principal and interest payment;
- Other monthly ownership costs;
- All-in monthly housing cost;
- Monthly leftover;
- Chosen monthly buffer;
- Difference vs buffer.

CSV must consume the same result object as the screen.

---

# 37. PDF report

HOME1 should produce an actual PDF using the established Carrowmont report architecture.

Recommended four-page structure:

## Page 1 - Home affordability summary

- user-facing localized product name;
- planning home price or target-home verdict;
- key monthly numbers;
- deposit / down payment;
- chosen buffer;
- household-planning-not-approval statement.

## Page 2 - Monthly cash-flow picture

- accessible cash-flow visual;
- plain-language explanation of what is using the household income;
- missing-cost warnings.

## Page 3 - Rate sensitivity and assumptions

- entered-rate versus higher-rate table;
- key assumptions;
- upfront cash check if used;
- gross-income multiple only if the user supplied gross income.

## Page 4 - Methodology, boundaries and next steps

- calculation explanation;
- no lender-approval claim;
- no tax / legal / lender-rule engine;
- related Carrowmont tools and Learn pages;
- methodology, privacy and contact links.

The PDF must use the same result object as the screen and must not reimplement the math.

---

# 38. Structured data and SEO

HOME1 calculator should use accurate structured data such as:

- `WebApplication`;
- `BreadcrumbList`.

The three Learn pages should use:

- `Article`;
- `BreadcrumbList`.

Do not use review ratings, financial-product schema or advice claims that Carrowmont cannot support.

Every new page must have:

- unique title;
- unique meta description;
- one clear H1;
- canonical URL;
- `index,follow` unless a deliberate approved exception exists;
- Open Graph metadata;
- Twitter metadata consistent with Carrowmont standards;
- sitemap entry;
- contextual internal links;
- no duplicate country routes.

---

# 39. Sitemap and indexing

Production release must add these four new canonical URLs to the main sitemap:

1. `https://carrowmont.com/home-affordability-calculator.html`
2. `https://carrowmont.com/how-much-home-can-i-afford.html`
3. `https://carrowmont.com/mortgage-affordability-vs-lender-approval.html`
4. `https://carrowmont.com/how-deposit-and-interest-rates-affect-home-affordability.html`

After production is fully green:

1. confirm Pages;
2. run Automated QA;
3. run Multi-Repo Guard;
4. take a fresh Source Snapshot;
5. verify canonical, robots and sitemap entries;
6. inspect and request indexing for the four new canonical URLs in Google Search Console;
7. allow the existing IndexNow automation to notify Bing and other participating engines.

Google submission is separate from IndexNow and does not guarantee indexing.

---

# 40. Accessibility and responsive behavior

HOME1 must satisfy existing Carrowmont standards.

Required:

- keyboard-operable form and mode controls;
- visible focus states;
- proper labels and descriptions;
- useful errors announced accessibly;
- touch targets around 44 px;
- no result meaning conveyed by color alone;
- chart has text / table equivalent;
- no hover-only explanation;
- no page-level horizontal overflow at 1280 px, 390 px or 360 px;
- usable at 200% zoom;
- large currency values wrap rather than overflow;
- tables use local horizontal scrolling only when necessary.

---

# 41. Validation rules

The UI must reject or explain invalid states rather than displaying NaN, Infinity or misleading positive results.

Protect at minimum:

- take-home income <= 0;
- negative expenses or debt;
- negative protected savings;
- negative chosen buffer;
- deposit / down payment < 0;
- interest rate outside product validation range;
- term <= 0;
- negative ownership costs;
- target home price <= 0 in Mode B;
- deposit / down payment greater than target home price;
- no monthly room for principal and interest;
- higher stress rate lower than zero;
- cash breakdown producing a negative available deposit.

Do not silently clamp a materially invalid user input into a plausible-looking answer.

---

# 42. Deterministic fixture contract

Before release, create a dedicated deterministic HOME1 fixture suite.

Required fixture families:

1. 0% interest reverse-loan case;
2. positive-rate reverse-loan case independently verified against the amortization formula;
3. forward target-home payment case;
4. zero monthly room -> zero modeled loan;
5. protected-savings change reduces modeled home price;
6. larger chosen buffer reduces modeled home price;
7. higher other ownership costs reduce modeled home price;
8. larger deposit raises the modeled home price for the same monthly loan budget;
9. higher interest rate reduces the modeled loan amount for the same payment budget;
10. higher-rate scenario does not mutate the base scenario;
11. Mode B buffer difference exactly matches monthly leftover minus chosen buffer;
12. 0% loan-rate case avoids division by zero;
13. gross-income context does not alter affordability math;
14. missing optional cost inputs are surfaced as warnings rather than invented values;
15. report / CSV values match the screen result object.

The fixture set should contain enough exact cases to lock the engine, not only UI snapshots.

---

# 43. Browser QA contract

Dedicated Playwright coverage should protect:

## 43.1 Identity / SEO

- canonical route;
- indexability;
- title / H1 contract;
- WebApplication schema;
- all four new sitemap entries;
- Tools Hub placement;
- Learn hub placement.

## 43.2 Calculation workflow

- Mode A complete calculation;
- Mode B complete calculation;
- zero monthly room;
- 0% rate;
- higher-rate check;
- missing other-cost warning;
- upfront cash breakdown if implemented;
- result interpretation based only on the user's chosen buffer.

## 43.3 Localization

At minimum explicitly exercise:

- India;
- United States;
- United Kingdom;
- Australia;
- Canada;
- Other / International.

Protect Home Loan / Mortgage / borrowing power / deposit / down payment / EMI terminology without changing the universal engine.

## 43.4 Privacy

- financial values never enter the URL;
- calculator works with analytics declined;
- GA remains opt-in;
- no unapproved financial analytics event fields;
- any local handoff is reviewable and one-time.

## 43.5 Reports / exports

- Copy Summary;
- CSV if enabled;
- PDF generation;
- minimum page / content checks;
- report values match result object;
- no clipped tables or headings.

## 43.6 Responsive

Explicit browser checks at:

- desktop 1280 px;
- 390 px;
- 360 px.

Also protect no horizontal overflow and readable action controls.

---

# 44. Publisher red-prevention gate

Recent Carrowmont releases showed that a green source contract alone is not sufficient.

HOME1 implementation must not be handed to the user until the **exact packaged release** has been rehearsed against the same assumptions Publisher uses.

Mandatory pre-handoff checks:

1. base hashes match the latest clean Source Snapshot;
2. release manifest is complete and exact;
3. staged source contract passes on the extracted package layout;
4. Multi-Repo Guard-layout reconstruction passes;
5. HOME1 deterministic fixtures pass;
6. all changed JS / MJS syntax checks pass;
7. all JSON-LD parses;
8. sitemap XML parses;
9. exact package file set matches manifest;
10. no workflow files unless explicitly approved;
11. targeted Playwright HOME1 tests run against the exact staged site if the environment permits browser navigation;
12. test locators target unique semantic controls rather than broad duplicated text;
13. cross-tool tests create valid preconditions before expecting a handoff or result;
14. at least one clean default browser locale and one explicitly selected locale are exercised;
15. report / PDF test uses a valid calculated result, not an uninitialized state.

If local browser execution is administratively blocked, state that clearly. Do not claim a browser pass that was not run. Publisher remains the authoritative staged browser gate.

---

# 45. Source-contract protection

Central source contract should lock at minimum:

- approved HOME1 spec exists;
- one canonical calculator route only;
- four new URLs are indexable and in sitemap after implementation;
- tool title / canonical / structured-data identity;
- no homepage core-card expansion;
- no footer expansion;
- three Learn pages and query-ownership separation;
- no lender-approval language;
- no country-specific ratio auto-application;
- no live rate API;
- no financial values in URLs;
- no analytics financial-value leakage;
- country-aware terminology;
- deterministic core shared by screen / CSV / report;
- QA file protecting HOME1 browser behavior.

---

# 46. Expected production repository scope

HOME1 V1 should aim for a narrow release.

Expected repositories:

1. `draw004.github.io`
2. `carrowmont-qa`

Do **not** modify SIP, Goal, FI, Inflation, Retirement, Compound Interest or unrelated calculators simply to advertise HOME1.

Modify Budget, Mortgage or Loan repositories only if a separately reviewed contextual-link or handoff change provides clear user value and does not broaden shared-state risk unnecessarily.

Central QA merges last.

---

# 47. Expected main-site additions / changes

Expected production files include, subject to implementation design:

- `home-affordability-calculator.html`
- `home-affordability-calculator.css`
- `home-affordability-calculator-core.js`
- `home-affordability-calculator.js`
- report / PDF files following existing main-site patterns;
- the three new Learn HTML pages;
- `tools.html`;
- `learn.html`;
- `sitemap.xml`;
- shared locale / discovery data only where necessary;
- `docs/CARROWMONT_HOME1_HOME_AFFORDABILITY_BORROWING_POWER_CALCULATOR_IMPLEMENTATION.md` after production build.

Do not change unrelated calculator formulas.

---

# 48. Release sequence

HOME1 follows the established protected flow.

## 48.1 Specification release

1. Start from clean Snapshot 81.
2. Add this specification only to `draw004.github.io/docs/`.
3. Package a specification-only release ZIP.
4. Upload the ZIP to a disposable staging branch from current `main`.
5. Run Batch PR Publisher against the exact ZIP.
6. Expect one `draw004.github.io` PR only.
7. Merge after Publisher is green.
8. Run Automated QA and Multi-Repo Guard.
9. Take a fresh post-spec Source Snapshot.

## 48.2 Production release

1. Build only from the fresh post-spec snapshot.
2. Implement the exact approved scope.
3. Rehearse the exact package using Section 44.
4. Upload the production ZIP to a disposable staging branch.
5. Run Batch PR Publisher.
6. Inspect and merge generated PRs in dependency order; central QA last.
7. Confirm Pages where applicable.
8. Run Automated QA.
9. Run Multi-Repo Guard.
10. Take a fresh Source Snapshot.
11. Perform Google indexing checks for the four new URLs.
12. Let existing IndexNow automation handle participating engines.
13. Delete / abandon disposable staging and completed release branches when safe.

Never merge the staging branch itself into `main`.

---

# 49. Specification-only release scope

The specification release must contain only:

`draw004.github.io/docs/CARROWMONT_HOME1_HOME_AFFORDABILITY_BORROWING_POWER_CALCULATOR_SPEC_FINAL.md`

It must not contain:

- production calculator code;
- Learn pages;
- sitemap changes;
- homepage changes;
- footer changes;
- QA changes;
- workflow changes;
- repository bootstrap changes.

---

# 50. Out of scope for HOME1 V1

Do not include:

- live mortgage / home-loan rate feeds;
- lender marketplace or lender ranking;
- pre-approval or approval probability;
- credit-score model;
- bank eligibility rules;
- automatic tax / stamp-duty / transfer-tax engine;
- first-home-buyer grant engine;
- automatic property-tax lookup;
- automatic insurance estimate;
- automatic HOA / strata / service-charge estimate;
- dynamic local legal rules;
- property-search listings;
- home-price forecast;
- real-estate investment recommendation;
- AI advice;
- server-side saved financial data;
- account requirement;
- country-cloned SEO pages;
- a new homepage core card;
- a new footer link.

Future extensions may add sourced regional modules only after separate approval and maintenance planning.

---

# 51. Acceptance criteria

HOME1 is ready for production only when all of the following are true:

- one canonical global calculator exists;
- visible terminology adapts by country under established Carrowmont rules;
- household cash-flow affordability is clearly separated from lender approval;
- Mode A derives a planning home price from the user's own cash-flow and buffer choices;
- Mode B checks a target home price against the same cash-flow model;
- other ownership costs are visible and omission is warned;
- deposit / down payment is handled without inventing local minimums;
- no gross-to-net tax conversion is attempted;
- no local lender ratio is silently applied;
- higher-rate check is user-controlled and clearly not a forecast or regulatory stress test;
- all screen / chart / CSV / PDF outputs use the same result object;
- three high-value Learn pages are present with clear query ownership;
- Learn language is simple, decision-focused and genuinely useful;
- Tools Hub discovery is present;
- homepage core grid and compact footer remain unchanged;
- privacy / analytics V2 rules are preserved;
- no financial values are placed in URLs;
- source contract passes;
- deterministic fixtures pass;
- targeted browser QA passes in Publisher;
- 1280 / 390 / 360 layouts pass;
- report checks pass;
- Pages, Automated QA and Multi-Repo Guard are green;
- fresh Source Snapshot is taken;
- four new canonical URLs are inspected / submitted in Google Search Console as appropriate.

---

# 52. Product principle

HOME1 should help a person make a better housing decision, not merely produce a bigger number.

The best result is not the highest property price.

The best result is a transparent view of how a housing commitment would fit alongside the user's ordinary life, existing debts, important savings goals and chosen room for uncertainty.

Carrowmont should make the trade-off easy to understand without pretending to know what a lender will approve or what the future will bring.

---

# 53. External research notes used for product direction

The following sources were reviewed on 18 October 2026 to validate the product boundary and plain-language decision model. They are research inputs, not auto-applied calculation rules.

## 53.1 U.S. Consumer Financial Protection Bureau (CFPB)

Reviewed guidance emphasizes that the amount a lender is willing to lend can differ from the amount a household can comfortably afford, and that affordability should consider income, expenses, savings priorities and possible future payment changes.

Sources:

- `https://www.consumerfinance.gov/ask-cfpb/how-can-i-figure-out-if-i-can-afford-to-buy-a-home-and-take-out-a-mortgage-en-118/`
- `https://www.consumerfinance.gov/owning-a-home/prepare/figure-out-how-much-you-want-to-spend/`
- `https://www.consumerfinance.gov/owning-a-home/prepare/determine-your-down-payment/`

Product implication:

- HOME1 separates household affordability from qualification;
- includes non-mortgage housing costs;
- protects a user-chosen cash reserve / monthly buffer;
- does not treat all available savings as deposit money.

## 53.2 UK MoneyHelper

Reviewed Mortgage Affordability guidance uses income and monthly expenses, shows money left over and states that lender criteria differ.

Source:

- `https://www.moneyhelper.org.uk/en/homes/buying-a-home/mortgage-affordability-calculator`

Product implication:

- household outgoings and money left over belong in the main result;
- a Carrowmont affordability estimate must not be called lender approval.

## 53.3 Australia Moneysmart

Reviewed home-buying guidance says the amount a lender is willing to lend is not always the amount a user will feel comfortable borrowing, recommends budgeting for ownership costs, and encourages testing higher interest-rate repayments.

Sources:

- `https://moneysmart.gov.au/home-loans/buying-a-house`
- `https://moneysmart.gov.au/home-loans/mortgage-calculator`

Product implication:

- HOME1 includes a user-controlled higher-rate check;
- ownership costs and household breathing room stay visible;
- visible Australian terminology may use Home Loan / borrowing power without claiming bank serviceability.

## 53.4 Canada CMHC

Reviewed CMHC material demonstrates that formal debt-service ratios exist in specific Canadian qualification contexts.

Source:

- `https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers/what-are-the-general-requirements-to-qualify-for-homeowner-mortgage-loan-insurance`

Product implication:

- such ratios must not be treated as a universal Carrowmont rule;
- any later Canada-specific qualification context must be clearly sourced and separated from household affordability.

---

# 54. Locked implementation reminder

Do not build production HOME1 code from Snapshot 81 after this specification PR is merged.

After the specification release is green, take a **fresh post-spec Source Snapshot** and use that newer snapshot as the only production implementation baseline.
