# CARROWMONT RENT1 — RENT VS BUY CALCULATOR

## Product, Calculation, Plain-Language UX, Localization, Housing Integration, Learn, Reporting, QA & Release Specification

**Status:** Final V1.0 specification-only document. Owner approval is represented by merging this specification release. Production code must not begin until the spec-only release is green and a fresh post-spec Source Snapshot is taken.  
**Authoritative design baseline:** Carrowmont Source Snapshot 66  
**Snapshot generated:** 2026-10-14T19:38:18Z  
**Main-site commit:** `f7e3813c6b5fe7d8c614495a19954011d05e7131`  
**Mortgage / housing repository commit:** `60e98b457c8e1775513b8ebb5c15ddfe19d18456`  
**Goal Planner repository commit:** `8b0ab234248518fe2a0e4d2f2886a1d0a9cf95b5`  
**Central QA commit:** `8e0c93fc400eca79759dcac871848338ddc20596`

---

# 1. Why RENT1 is the next build

DEBT1 is now live and closed at Snapshot 66. The approved roadmap explicitly locks **Rent vs Buy Calculator** as the next product.

RENT1 is valuable because the user's real question is not simply whether rent is lower than a mortgage or home-loan payment. A credible comparison has to model two complete housing paths over the same period:

1. **Rent the comparable home and keep unused cash invested**; and
2. **Buy the home, build equity, pay financing and ownership costs, then account for the value and remaining loan at the end**.

The existing Carrowmont Learn guide already explains that Goal Planner is useful only for the down-payment goal and is **not** the rent-versus-buy comparison tool. RENT1 must now complete that product journey with a dedicated calculator.

RENT1 is also globally useful because the core cash-flow mathematics is universal while local purchase taxes, closing charges, property taxes, insurance rules and tax benefits vary materially. Carrowmont should therefore keep one transparent core model and ask the user to enter known local costs rather than silently applying country-specific tax rules that can become stale or wrong.

External validation used during scoping includes:

- Consumer Financial Protection Bureau — homebuying costs, mortgage costs, property taxes, insurance, maintenance and the importance of holding period: `https://www.consumerfinance.gov/ask-cfpb/what-are-some-of-the-financial-considerations-of-buying-a-home-en-119/`
- Consumer Financial Protection Bureau — closing-cost components and cash needed at purchase: `https://www.consumerfinance.gov/ask-cfpb/what-costs-come-with-taking-out-a-mortgage-en-153/`
- MoneyHelper UK — deposit, mortgage fees, conveyancing, purchase taxes, insurance, maintenance and selling costs: `https://www.moneyhelper.org.uk/en/homes/buying-a-home/estimate-your-overall-buying-and-moving-costs`
- Australian Securities and Investments Commission MoneySmart — deposit, stamp duty, insurance, council rates, utilities and maintenance: `https://moneysmart.gov.au/home-loans/buying-a-house`
- Financial Consumer Agency of Canada — one-time buying / closing costs and ongoing homeownership costs: `https://www.canada.ca/en/financial-consumer-agency/services/buying-home.html`

These sources support the categories of costs that belong in a serious comparison. They do **not** define Carrowmont's formulas or provide universal default values.

Current search-result review also confirms strong calculator intent around phrases such as `rent vs buy calculator`, `rent or buy calculator`, `rent vs own calculator`, `should I rent or buy`, and market variants such as `rent vs buy calculator India`. The product should own that calculator intent while the existing Learn article continues to own educational comparison intent.

---

# 2. Product identity

**Product family code:** `RENT1`  
**Visible product name:** `Rent vs Buy Calculator`  
**Search-facing identity:** `Rent vs Buy Calculator | Compare Renting and Buying | Carrowmont`

The calculator compares the projected financial position from two paths using the same home standard, the same starting housing cash and the same month-by-month cash commitment.

It must not tell the user that renting or buying is universally better.

The main result should use wording such as:

- `Under these assumptions, renting + investing is ahead by ... after 10 years.`
- `Under these assumptions, buying is ahead by ... after 10 years.`
- `The two paths are very close under these assumptions.`

Avoid `winner`, `best choice`, `you should buy`, `you should rent`, `guaranteed break-even`, or similar recommendation language.

## 2.1 Plain-language rule for every user-facing surface

RENT1 must remain usable for someone with little finance knowledge.

Preferred visible wording:

- `Rent vs Buy Calculator`
- `Price of the home`
- `Down payment`
- `Home loan interest rate` / `Mortgage interest rate` according to country
- `Loan term`
- `Monthly rent for a similar home`
- `How long do you expect to stay?`
- `Upfront buying costs`
- `Ongoing owner costs`
- `Expected change in home value`
- `Expected rent increase`
- `Return on money kept invested`
- `Projected wealth after ... years`
- `Home equity after ... years`
- `Remaining loan balance`
- `Cash needed upfront`
- `What could change this result?`

Search-facing phrases such as `opportunity cost` may appear in methodology or Learn content, but the primary result should explain the idea in normal language:

> `Money used for the down payment cannot be invested elsewhere at the same time.`

Avoid user-facing phrases such as `capital allocation`, `leveraged asset exposure`, `discount rate`, `terminal wealth differential`, `residual principal`, `housing consumption stream`, `utility-adjusted return`, or similar jargon when a normal phrase works.

---

# 3. Primary user questions

The tool must answer these questions in order:

1. **If I rent or buy a similar home, where could I stand after the number of years I expect to stay?**
2. **How much cash would buying require upfront compared with renting?**
3. **What is the starting monthly housing cost under each path?**
4. **How much home equity could I have if I buy?**
5. **How much could the renting path have invested if I keep the unused cash and monthly difference invested?**
6. **Does the answer change mainly because of my holding period, home-price assumption, rent growth or investment-return assumption?**
7. **Is there a stable point within my comparison period where one path moves ahead of the other?**

The calculator should help the user understand the trade-off, not collapse a life decision into one unexplained score.

---

# 4. Search-intent hierarchy and query ownership

## 4.1 Tool intent

The canonical tool owns calculator / decision-model intent around:

- rent vs buy calculator;
- rent or buy calculator;
- renting vs buying calculator;
- rent vs own calculator;
- should I rent or buy calculator;
- house rent vs buy calculator;
- home rent vs buy calculator;
- rent vs buy home calculator;
- buy house or rent calculator;
- rent vs buy calculator India / US / UK / Canada / Australia and other market variants.

**Static title:**  
`Rent vs Buy Calculator | Compare Renting and Buying | Carrowmont`

**Static meta description:**  
`Compare renting with buying a similar home. Model the down payment, loan, rent, buying costs, maintenance, home value, selling costs and money kept invested.`

**Fallback H1:**  
`Rent vs Buy Calculator`

The H1 and first paragraph should use `rent vs buy` directly. Country-specific terminology can adapt the supporting copy without changing the canonical URL.

## 4.2 Learn intent

The existing Learn page remains the educational authority page:

**Canonical Learn route:**  
`/rent-vs-buy-home.html`

The Learn page owns educational queries such as:

- rent vs buy financial trade-offs;
- is renting throwing money away;
- should I compare rent with a mortgage payment;
- how holding period affects rent vs buy;
- opportunity cost of a down payment;
- what costs should be included when buying a home.

The Learn page must gain a primary CTA to RENT1 once the calculator is live, but should not be rewritten to compete for the calculator head term more aggressively than necessary.

---

# 5. Product architecture

RENT1 should be a **housing companion calculator inside the existing `mortgage-payoff-calculator` repository**.

This is the preferred architecture because the repository already owns:

- the global country / currency catalogue for housing tools;
- country-aware Home Loan vs Mortgage terminology;
- the existing housing visual system;
- report utilities and PDF patterns;
- Mortgage / Home Loan Payoff;
- Prepayment vs Investing;
- Refinance / Balance Transfer Break-Even;
- Rate Rise / Payment Stress.

RENT1 is a **pre-purchase housing decision tool**, not a fifth core module inside the existing Mortgage / Home Loan Decision Centre. The Decision Centre remains focused on decisions about an existing loan.

The seven-core homepage architecture remains unchanged.

No new repository is created.

---

# 6. Stable canonical routes

| Purpose | Canonical path |
|---|---|
| Mortgage / Home Loan Payoff | `/mortgage-payoff-calculator/` |
| Housing Decision Centre | `/mortgage-payoff-calculator/decision-centre.html` |
| **RENT1 Rent vs Buy Calculator** | **`/mortgage-payoff-calculator/rent-vs-buy-calculator.html`** |
| Existing Rent vs Buy Learn guide | `/rent-vs-buy-home.html` |
| Goal Planner | `/goal-planner/` |
| Budget & Cash Flow Planner | `/budget-cash-flow-planner/` |
| All Tools directory | `/tools.html` |

No country-specific duplicate calculator URLs are created.

Do not create a competing top-level `/rent-vs-buy-calculator.html` page in V1.

---

# 7. Core comparison principle

RENT1 must compare **two complete paths with equal resources**, not compare rent with only the mortgage / home-loan payment.

The model follows three fairness rules.

## 7.1 Compare a similar home

The UI must tell the user:

> `Use the rent and purchase price for homes that are reasonably comparable in location, size and quality.`

Comparing a small rented apartment with a much larger purchased home produces a mathematically valid but economically meaningless result.

## 7.2 Same starting housing cash

Let:

- `buyerUpfront` = down payment + non-refundable upfront buying costs;
- `renterUpfront` = refundable rental deposit + non-refundable upfront renting costs.

Define:

`startingHousingCash = max(buyerUpfront, renterUpfront)`

Each path pays its own upfront requirement. Any unused amount is invested immediately at the user's entered alternative return.

Therefore:

`buyerInitialInvestment = startingHousingCash - buyerUpfront`

`renterInitialInvestment = startingHousingCash - renterUpfront`

Both values must be >= 0 by construction.

This rule keeps the starting resources equal without assuming that only the renter receives an investment opportunity.

## 7.3 Same month-by-month housing cash commitment

For every month:

`sharedMonthlyHousingBudget = max(buyerHousingOutflow, renterHousingOutflow)`

The path with the lower housing outflow invests the difference at the end of the month.

Therefore:

`buyerMonthlyInvestment = sharedMonthlyHousingBudget - buyerHousingOutflow`

`renterMonthlyInvestment = sharedMonthlyHousingBudget - renterHousingOutflow`

This rule is symmetrical. If buying becomes cheaper after the loan is paid off, the buying path gets to invest the later monthly difference. If renting is cheaper early on, the renting path gets to invest that difference.

The tool must not assume that the renter invests the difference while the buyer spends every saving after loan payoff.

---

# 8. Inputs

The main form should be divided into simple sections with advanced assumptions available without overwhelming the first screen.

## 8.1 Country and currency

Reuse the existing Mortgage / Home Loan repository's country and currency catalogue.

Rules:

1. country and currency remain separate controls;
2. currency changes number formatting and units only;
3. Carrowmont performs no automatic FX conversion;
4. country changes terminology and helper text but does not change the core mathematics;
5. no local tax rule is silently activated solely because a country is selected;
6. `Other / International` remains last in the alphabetized country list.

## 8.2 Core home and loan inputs

Required core inputs:

- `Price of the home`
- `Down payment`
- `Mortgage interest rate` / `Home loan interest rate`
- `Loan term`
- `Monthly rent for a similar home`
- `How long do you expect to stay?`

The down payment should support amount and percentage entry with one clearly authoritative underlying amount.

When the selected country is India, Australia or New Zealand, Home Loan terminology should be used in the main UI. United States, Canada, United Kingdom and Ireland should use Mortgage terminology. Other markets use broad `Mortgage / Home Loan` wording when a specific established term has not been approved.

## 8.3 Upfront buying costs

Advanced buying input:

`Upfront buying costs`

Helper text should explain with country-aware examples, not hard-coded rules:

- India: stamp duty, registration, legal / documentation and buyer-paid brokerage where applicable;
- United States: closing / settlement, lender, appraisal, title and government fees where applicable;
- Canada: closing costs, legal fees, inspection, title insurance and local transfer charges where applicable;
- United Kingdom / Ireland: purchase tax where applicable, legal / conveyancing, survey and mortgage fees;
- Australia / New Zealand: stamp / transfer duty where applicable, legal / conveyancing, inspection and lender costs;
- Other: local purchase, legal, lender, registration and transfer costs.

V1 should allow entry as either:

- a currency amount; or
- a percentage of the purchase price.

The UI must show the resulting currency amount so the user sees what is being included.

No jurisdiction-specific purchase tax is automatically calculated in V1.

## 8.4 Recurring owner costs

Advanced owner inputs:

- `Property tax / council rates each year`
- `Home insurance each year`
- `Maintenance and repairs each year`
- `Building / association / society / strata fees each month`
- `Mortgage / home-loan insurance each month` — optional
- `Other owner-only costs each month` — optional

A short helper should say:

> `Include costs you would pay because you own the home. Do not add utilities or other costs that would be the same under both paths.`

This prevents double-counting shared household expenses.

## 8.5 Selling cost

Input:

`Selling costs at the end`

Default entry mode should be a percentage of the future sale price, with optional amount-mode only if implementation remains simple and unambiguous.

Examples may include agent / broker, legal / conveyancing and transfer-related selling costs where applicable.

Do not automatically calculate capital-gains tax or any local tax on sale.

## 8.6 Renting inputs

Core:

- `Monthly rent for a similar home`

Advanced:

- `Refundable rental deposit`
- `Other upfront renting costs`
- `Renter-only costs each month` — optional

The rental deposit is not treated as an expense. It is treated as cash tied up for the comparison period and returned at the end at the same nominal amount in V1.

No deposit interest is assumed in V1.

## 8.7 Future assumptions

Required visible assumptions:

- `Expected change in home value (%/year)`
- `Expected rent increase (%/year)`
- `Return on money kept invested (%/year)`
- `Annual increase in other housing costs (%/year)`

Helper copy must say clearly:

> `These are assumptions, not forecasts. Small changes can materially change the result.`

The investment-return input applies symmetrically to whichever path has unused starting cash or lower monthly housing outflow.

If the user wants tax, fees or investment costs reflected in that return, helper text should suggest using an after-fee / after-tax assumption rather than Carrowmont calculating those items separately.

## 8.8 Comparison period

Visible label:

`How long do you expect to stay?`

V1 range:

- minimum: 1 year;
- maximum: 40 years;
- whole years in the visible control;
- internal model runs monthly.

The period may be shorter than, equal to or longer than the loan term.

If the comparison continues past the loan term, the loan payment becomes zero and the now-cheaper path can invest the monthly difference under the equal-budget rule.

---

# 9. Input validation

Validation must be simple, local and actionable.

Required rules:

- home price > 0;
- monthly rent >= 0;
- down payment >= 0 and <= home price;
- loan amount = home price - down payment;
- loan term >= 1 and <= 40 years if loan amount > 0;
- comparison period >= 1 and <= 40 years;
- interest rate >= 0 and within a documented engineering ceiling;
- purchase / renting / recurring costs >= 0;
- selling-cost percentage >= 0 and within a documented engineering ceiling;
- annual growth / return assumptions must be > -100%;
- fields that are blank must not silently become a misleading non-zero assumption;
- if loan amount = 0, mortgage / home-loan interest and term become informationally irrelevant and the cash-purchase path must still calculate correctly.

Do not enforce jurisdiction-specific minimum down-payment rules. RENT1 is a scenario comparison, not a mortgage eligibility checker.

Error examples:

- `Enter a home price above 0.`
- `Down payment cannot be more than the home price.`
- `Enter how long you expect to stay, from 1 to 40 years.`
- `This percentage must be greater than -100%.`

---

# 10. Calculation conventions

All core calculations must live in a deterministic standalone module with no DOM dependency.

Expected core file:

`rent-vs-buy-core.js`

Suggested version marker:

`RENT1-1.0`

## 10.1 Monthly rate conversion

For annual growth / return assumptions that are conceptually effective annual rates, convert to an equivalent monthly rate:

`monthlyRate = (1 + annualRate)^(1/12) - 1`

Apply this to:

- home-value growth;
- rent growth;
- investment return;
- recurring non-loan housing-cost growth.

The loan interest rate uses the standard nominal annual-rate / 12 convention unless the implementation explicitly documents another convention already used by the housing repository.

## 10.2 Contribution timing

For deterministic V1 results:

1. investment balances earn the monthly return for the current month;
2. that month's housing costs are paid;
3. the cheaper path invests the month-end difference.

This timing must be documented and fixture-protected.

## 10.3 Precision

- internal calculations use full JavaScript numeric precision;
- displayed currency values may round to sensible whole units;
- percentages may show up to two decimal places where helpful;
- final mortgage payment is capped to the remaining principal plus that month's interest;
- tiny floating residues below the engineering epsilon must be normalized to zero.

---

# 11. Buying-path calculation

## 11.1 Starting loan

`loanPrincipal = max(0, homePrice - downPayment)`

Upfront buying cash:

`buyerUpfront = downPayment + upfrontBuyingCosts`

Upfront buying costs are consumed costs; they do not create home equity.

## 11.2 Mortgage / home-loan payment

For positive loan principal and positive monthly loan rate:

`payment = principal * r / (1 - (1 + r)^(-n))`

For a 0% loan rate:

`payment = principal / n`

The loan amortizes monthly until either:

- balance reaches zero; or
- the comparison period ends.

The result object must separately record:

- monthly scheduled principal-and-interest payment;
- total interest paid during the comparison period;
- principal repaid;
- remaining balance at the horizon.

Principal repayment is not treated as a consumption expense in the wealth result because it becomes home equity.

## 11.3 Home value

Start with:

`homeValue_0 = homePrice`

Grow it monthly using the equivalent monthly home-value assumption.

Negative annual home-value assumptions are allowed as long as they are greater than -100%.

Carrowmont must never label the entered appreciation assumption as an expected market return or forecast.

## 11.4 Recurring owner cash outflow

For each month, buyer housing outflow includes:

- mortgage / home-loan payment while the loan exists;
- property tax / council rates allocated monthly;
- home insurance allocated monthly;
- maintenance and repairs allocated monthly;
- building / association / society / strata fees;
- mortgage / home-loan insurance where entered;
- other owner-only costs.

Non-loan recurring costs grow using the user's `Annual increase in other housing costs` assumption.

Do not include utilities or common living expenses unless they are owner-only in the user's case.

## 11.5 End-of-period sale value

At the chosen horizon:

`saleCost = endHomeValue * sellingCostRate`

`netHomeSaleProceeds = endHomeValue - saleCost - remainingLoanBalance`

Do not floor this value at zero. A negative value represents negative equity / cash needed to clear the loan in the modeled sale.

The buyer's end wealth is:

`buyerEndWealth = buyerInvestmentBalance + netHomeSaleProceeds`

---

# 12. Renting-path calculation

## 12.1 Starting rent

Month 1 uses the entered current monthly rent.

Rent grows monthly using the equivalent monthly rate derived from the entered annual rent-growth assumption.

## 12.2 Rental deposit

The refundable rental deposit:

- is paid at month 0;
- is not invested while tied up;
- is not treated as rent expense;
- is returned at the end at the same nominal amount in V1.

This is a modeling convention, not a statement about local deposit law.

## 12.3 Other renting costs

Renter housing outflow can include:

- rent;
- renter-only recurring costs.

Renter-only recurring costs grow with the user's `Annual increase in other housing costs` assumption.

Non-refundable upfront renting costs are consumed at month 0.

## 12.4 End wealth

The renter's end wealth is:

`renterEndWealth = renterInvestmentBalance + refundableRentalDeposit`

---

# 13. Equal-resource investment ledger

The investment ledger is central to a fair RENT1 comparison.

## 13.1 Initial investments

Use the same starting housing cash defined in section 7.2.

The lower-upfront-cost path invests the unused difference immediately.

## 13.2 Monthly investments

After calculating both housing outflows for a month:

`monthlyBudget = max(buyerHousingOutflow, renterHousingOutflow)`

Then:

`buyerContribution = monthlyBudget - buyerHousingOutflow`

`renterContribution = monthlyBudget - renterHousingOutflow`

Only one contribution will normally be positive in a given month, although both can be zero when costs are equal.

## 13.3 Investment return

Both investment ledgers use the same user-entered return assumption and the same contribution timing.

This prevents an asymmetric model where only the renter is allowed to invest savings.

## 13.4 0% investment-return behavior

A 0% return remains valid. In that case, unused cash and monthly differences accumulate without growth.

The model must still remain symmetrical and deterministic.

---

# 14. Wealth comparison contract

The primary economic comparison is projected net wealth at the user's selected horizon.

## 14.1 Buying wealth

`buyerEndWealth = buyerInvestmentBalance + endHomeValue - sellingCosts - remainingLoanBalance`

## 14.2 Renting wealth

`renterEndWealth = renterInvestmentBalance + refundableRentalDeposit`

## 14.3 Difference

`wealthDifference = buyerEndWealth - renterEndWealth`

Interpretation:

- positive => buying path is ahead under the entered assumptions;
- negative => renting + investing path is ahead;
- within a small display tolerance => paths are approximately even.

Do not use a hard-coded global recommendation threshold beyond a small rounding / presentation tolerance.

---

# 15. Cost and equity breakdowns

The main result must separate cash paid from wealth created.

Buying-side breakdown should include:

- cash needed upfront;
- starting mortgage / home-loan amount;
- starting monthly loan payment;
- total loan interest paid within the comparison period;
- total owner-only recurring costs;
- remaining loan balance;
- projected home value;
- selling cost at the horizon;
- net home equity / sale proceeds after debt and selling cost;
- buyer investment balance from months when buying is cheaper.

Renting-side breakdown should include:

- cash needed upfront;
- starting monthly rent;
- total rent paid;
- total renter-only recurring costs;
- refundable deposit returned;
- renter investment balance from unused starting cash and months when renting is cheaper.

Do not present the full mortgage payment as pure cost. Principal repayment creates equity.

---

# 16. Stable crossover / break-even logic

Rent-vs-buy curves can cross more than once. Carrowmont must not present a misleading single `break-even year` when the modeled paths later reverse.

For every month `m`, calculate hypothetical net wealth if the home were sold at that month:

`buyWealth_m = buyerInvestment_m + homeValue_m - saleCost_m - loanBalance_m`

`rentWealth_m = renterInvestment_m + refundableDeposit`

A **stable crossover** exists only when:

1. the leading path changes; and
2. after that month, the newly leading path remains ahead through the selected horizon, allowing only the small display tolerance.

If the paths cross more than once and neither crossover remains stable through the horizon, show:

`No single stable break-even point within this period.`

If one path is ahead from the first modeled month and remains ahead, do not invent a year-0 break-even. Say:

`This path is ahead throughout the modeled period under these assumptions.`

The stable crossover is a secondary result. The selected-horizon wealth comparison remains the primary result.

---

# 17. Main result design

## 17.1 Headline

Use one of three patterns:

**Buying ahead:**  
`Under these assumptions, buying is ahead by X after Y years.`

**Renting ahead:**  
`Under these assumptions, renting + investing is ahead by X after Y years.`

**Near parity:**  
`The two paths are very close after Y years under these assumptions.`

Immediately below:

`This is a scenario comparison, not a forecast or a recommendation.`

## 17.2 Side-by-side summary cards

### If you buy

Show:

- `Projected wealth after Y years`
- `Home equity / net sale proceeds`
- `Investment balance`
- `Remaining loan balance`

### If you rent

Show:

- `Projected wealth after Y years`
- `Investment balance`
- `Refundable deposit returned`

## 17.3 Starting affordability context

Separate from the wealth comparison, show:

- `Cash needed upfront — Buy`
- `Cash needed upfront — Rent`
- `Starting monthly housing cost — Buy`
- `Starting monthly housing cost — Rent`

This is not a formal affordability test because RENT1 does not ask for household income or debt-to-income ratios.

## 17.4 Why the result moved

Include a short explanatory panel generated from the user's result object, for example:

- `Buying used more cash upfront, so less money remained invested.`
- `Rent started lower, creating a larger early monthly amount to invest.`
- `The home-value assumption contributed X to the buying path.`
- `Selling costs reduced the buying path by X at the end.`

Do not overstate causation when several variables interact.

---

# 18. Charts and table equivalent

## 18.1 Projected-wealth chart

Primary chart:

- x-axis: years;
- line 1: buying projected net wealth if sold at that point;
- line 2: renting + investing projected net wealth;
- stable crossover marker when one exists;
- accessible legend using text as well as color.

## 18.2 Text / table equivalent

Provide a year-by-year table containing at least:

- year;
- projected home value;
- remaining loan balance;
- buying net wealth;
- renting net wealth;
- difference.

This table is required for accessibility and verification.

## 18.3 Optional cash-flow view

A secondary view may show starting / annualized housing cash outflow for each path, but it must not replace the net-wealth comparison.

---

# 19. Assumption sensitivity and uncertainty

RENT1 must make uncertainty visible without pretending to forecast markets.

The result page should include a clear section:

`What could change this result?`

It should name the biggest adjustable drivers:

- how long the user stays;
- home-value growth;
- rent growth;
- investment return;
- loan interest rate;
- maintenance / owner costs;
- buying and selling transaction costs.

V1 does not need automatic optimistic / base / pessimistic presets. The user should be able to edit the assumptions and immediately recalculate.

Avoid country-specific `typical return` or `typical appreciation` claims in the calculator unless separately researched, sourced and approved.

---

# 20. Taxes, benefits and local-rule boundary

RENT1 V1 must **not** automatically calculate individualized income-tax, capital-gains-tax, housing-benefit, subsidy or tax-deduction rules.

Excluded from automatic V1 calculation:

- mortgage-interest tax deductions;
- India home-loan tax deductions / HRA interactions;
- first-home-buyer credits or grants;
- capital-gains tax on sale;
- rental tax deductions;
- local housing subsidies;
- jurisdiction-specific transfer-tax bands;
- ownership structures, shared ownership or co-operative rules.

Direct cash costs such as purchase taxes, annual property taxes and known fees can still be entered manually in the generic cost fields.

The methodology should explain:

> `Local taxes and benefits can materially change the result. Enter known cash costs where the calculator provides a field, and treat the result as a planning scenario rather than a tax calculation.`

---

# 21. Country-aware terminology

RENT1 must reuse the housing-language principles already live in the Mortgage / Home Loan family.

## 21.1 India

Prefer:

- `Home loan`
- `EMI / home loan payment` where the payment itself is discussed
- `Stamp duty / registration and other upfront buying costs` as examples
- `Society / maintenance fees` where relevant

## 21.2 United States

Prefer:

- `Mortgage`
- `Mortgage payment`
- `Closing costs`
- `Property tax`
- `Homeowners insurance`
- `HOA fees` where relevant

## 21.3 Canada

Prefer:

- `Mortgage`
- `Closing costs`
- `Property tax`
- `Home insurance`
- `Condo / strata fees` only where appropriate to the selected copy set

## 21.4 United Kingdom / Ireland

Prefer:

- `Mortgage`
- `Deposit`
- `Legal / conveyancing costs`
- `Purchase tax where applicable`
- `Council tax / local property charges` only where accurate and not presented as universal across all jurisdictions
- `Service charges` for applicable properties

Because UK property taxes differ among England / Northern Ireland, Scotland and Wales, the tool must not auto-calculate one UK-wide stamp-duty value.

## 21.5 Australia / New Zealand

Prefer:

- `Home loan`
- `Repayment`
- `Stamp / transfer duty where applicable`
- `Council rates`
- `Strata / body corporate fees` where relevant

## 21.6 Other / International

Use broad language:

- `Mortgage / Home Loan`
- `Purchase / transfer costs`
- `Property tax / local rates`
- `Building / association fees`

Country selection changes wording and examples. It does not silently alter formulas or apply legal rules.

---

# 22. Privacy and storage

RENT1 must remain privacy-first.

V1 must not request:

- property address;
- lender name;
- mortgage account number;
- bank account information;
- tax ID;
- salary unless a future affordability module explicitly requires it;
- personally identifying information.

Scenario inputs should remain local to the browser session unless a separate user-approved save feature is introduced later.

RENT1 must **not** automatically publish its hypothetical mortgage / home-loan scenario into the existing shared Mortgage Decision Profile. That profile represents an existing or intentionally shared loan and should not be overwritten by a pre-purchase comparison.

Do not silently reuse an existing mortgage balance as the new-home purchase loan.

---

# 23. Carrowmont ecosystem connections

Connections should be clear but not automatic.

Required contextual links:

- RENT1 → existing Learn guide: `How should rent vs buy be compared?`
- Learn guide → RENT1: `Compare renting and buying`
- RENT1 → Goal Planner: `Plan the down payment`
- RENT1 → Budget & Cash Flow Planner: `Check whether this monthly housing cost fits my budget`
- RENT1 → Mortgage / Home Loan Payoff: `Already own the home? Explore payoff options`
- RENT1 → Rate Rise / Payment Stress: `Buying with a variable or resetting rate? Stress-test a rate rise`

V1 should use normal navigation links, not automatic cross-tool value handoffs, unless production implementation proves a handoff is unambiguous and explicitly user-approved.

Do not convert the existing Rent vs Buy Learn article back into a Goal Planner CTA after RENT1 is live. Goal Planner becomes a secondary `Plan the down payment` action.

---

# 24. Copy Summary

Provide a `Copy Summary` action driven directly from the deterministic result object.

Suggested plain-text structure:

`Carrowmont Rent vs Buy comparison`

`Period: 10 years`

`Buying projected wealth: X`

`Renting + investing projected wealth: Y`

`Difference: Z in favor of [buying / renting + investing] under these assumptions`

`Buy cash needed upfront: A`

`Rent cash needed upfront: B`

`Starting buy housing cost: C/month`

`Starting rent: D/month`

`Home-value assumption: E%/year`

`Rent-growth assumption: F%/year`

`Investment-return assumption: G%/year`

`Scenario estimate only; not financial, tax or property advice.`

If clipboard access is blocked, the UI must provide the same legitimate fallback behavior already accepted elsewhere in Carrowmont rather than treating browser clipboard policy as a calculation failure.

---

# 25. PDF report

Generate an actual PDF using the same validated Carrowmont report pattern.

Exact V1 requirement: **3 pages**.

## Page 1 — Rent vs Buy comparison

Include:

- country / currency;
- comparison period;
- headline result;
- buying projected wealth;
- renting projected wealth;
- difference;
- cash needed upfront for each path;
- starting monthly housing cost for each path;
- short `scenario, not recommendation` disclosure.

## Page 2 — What makes up the result

Include:

- purchase price;
- down payment;
- starting loan and payment;
- total loan interest during the period;
- owner recurring costs;
- end home value;
- remaining loan;
- selling costs;
- buying investment balance;
- total rent paid;
- renter investment balance;
- refundable deposit;
- stable crossover result if one exists;
- selected year-by-year comparison rows.

## Page 3 — Assumptions, boundaries and next steps

Include:

- home-value change assumption;
- rent-growth assumption;
- investment-return assumption;
- other-housing-cost growth;
- local-cost inputs;
- explanation of equal starting cash and equal monthly cash commitment;
- tax / benefit exclusions;
- fixed-rate V1 boundary;
- Learn link;
- Goal Planner / Budget / Rate Rise links where space permits;
- methodology / disclaimer reference.

The webpage, Copy Summary and PDF must use the same normalized input and result object.

---

# 26. Existing Learn page integration

Do **not** create a second Rent vs Buy Learn article.

Update the existing:

`/rent-vs-buy-home.html`

Required changes once RENT1 is live:

1. primary top action changes from the current future-tool wording to a direct RENT1 CTA;
2. the old statement `Carrowmont will use a dedicated Rent vs Buy Calculator` is removed because the tool now exists;
3. Goal Planner remains available as a secondary down-payment-planning link;
4. the article should explain the same fairness rule used by the tool: equal starting resources and investing monthly differences;
5. no contradictory formula or simplified `annual ownership cost rate` should be presented as if it were the calculator's actual algorithm;
6. country-language localization remains intact;
7. article structured data and modified date are updated;
8. mobile 390 / 360 layouts remain safe.

The article already contains strong educational depth. V1 production should update it rather than replacing it wholesale unless required for consistency.

---

# 27. Tools Hub and homepage

`/tools.html` should add RENT1 as a **secondary / focused housing decision calculator**.

Preferred card:

**Type:** `Housing decision`  
**Title:** `Rent vs Buy Calculator`  
**Description:** `Compare renting with buying a similar home, including upfront costs, the loan, ongoing owner costs, home value and money kept invested.`  
**CTA:** `Compare rent vs buy →`

After RENT1, the Tools Hub should contain **14 live tools** under the current architecture unless another release changes the count first.

RENT1 does **not** become an eighth homepage core card.

The seven-core homepage remains unchanged.

The permanent `Explore All Tools` gateway remains unchanged.

---

# 28. Mortgage / Home Loan Decision Centre boundary

The existing Decision Centre currently contains four live decision modules:

1. Payoff / Prepayment;
2. Prepayment vs Investing;
3. Refinance / Balance Transfer Break-Even;
4. Rate Rise / Payment Stress.

RENT1 must **not** silently become a fifth core module inside that grid.

A small contextual bridge may be added outside the four-module decision grid, for example:

`Still deciding whether to buy? Compare renting with buying first.`

This preserves the Decision Centre's clear job: decisions about an existing mortgage / home loan.

Source-contract QA must protect the four-core-module count unless a separate Decision Centre expansion is explicitly approved later.

---

# 29. Structured data, sitemap and indexing

The new tool should use:

- `WebApplication`;
- `BreadcrumbList`;
- canonical URL;
- `index,follow` robots metadata;
- shared Carrowmont `WebSite` / `Organization` entity references where used by current site conventions.

The updated Learn page continues to use:

- `Article`;
- `BreadcrumbList`;
- canonical URL;
- shared publisher references.

Add the new calculator URL to the main sitemap using the production release date as `lastmod`.

Update `lastmod` for the materially changed existing Rent vs Buy Learn page and Tools Hub where current sitemap conventions require it.

IndexNow should run through the existing automation after production merge.

After production is green, manually request Google indexing for:

1. the new RENT1 calculator URL;
2. the materially updated Rent vs Buy Learn page.

Do not mass-submit unrelated housing pages merely because RENT1 launched.

---

# 30. Accessibility and responsive behavior

Mandatory:

- keyboard-accessible controls;
- visible focus treatment;
- 1280 px desktop layout;
- 390 px mobile layout with no horizontal page overflow;
- 360 px mobile layout with no horizontal page overflow;
- readable amount / percentage input mode controls;
- accessible labels for all fields;
- inline validation associated with the relevant field;
- chart has a text / table equivalent;
- color is not the only indication of rent vs buy;
- touch targets approximately 44 px minimum where practical;
- result announcement avoids excessive live-region noise;
- large currency values wrap safely without clipping.

---

# 31. Deterministic fixture contract

Production must include independent core fixtures before DOM testing.

Minimum fixture set:

1. cash purchase, no loan;
2. positive-rate mortgage / home loan with horizon shorter than loan term;
3. horizon equal to loan term;
4. horizon longer than loan term so owner later invests the freed payment difference;
5. 0% loan interest;
6. 0% home-value growth;
7. negative home-value growth;
8. 0% rent growth;
9. negative rent growth;
10. 0% investment return;
11. positive investment return with renter cheaper every month;
12. positive investment return with buyer becoming cheaper after loan payoff;
13. equal upfront costs;
14. renter upfront cost lower than buyer upfront cost;
15. renter upfront cost higher than buyer upfront cost;
16. refundable rental deposit returned exactly at horizon;
17. selling cost reduces buyer end wealth;
18. owner recurring costs grow correctly;
19. comparison horizon shorter than 12 months is impossible through UI normalization;
20. final mortgage payment caps correctly without negative balance;
21. negative equity at horizon is preserved rather than floored;
22. buyer and renter projected wealth are identical under a deliberately constructed parity case;
23. one stable crossover exists;
24. multiple crossovers produce `no single stable break-even`;
25. currency selection does not alter math;
26. same numeric inputs under India / US terminology produce the same numerical result;
27. contribution timing matches the documented month-end investment convention;
28. extreme but allowed positive assumptions remain finite within the 40-year horizon;
29. invalid annual rate <= -100% is rejected;
30. result object reconciles headline, tables, Copy Summary and PDF inputs.

The production team should add more fixtures whenever implementation reveals a meaningful edge case.

---

# 32. Browser QA contract

Create a dedicated central QA suite, expected filename:

`26-rent-vs-buy-calculator.spec.js`

If the repository already uses that number by production time, use the next sequential number; the product identity in the test title matters more than the filename.

Mandatory browser groups:

1. page loads with no unexpected JS errors;
2. country / currency selector loads the full approved catalogue;
3. India uses Home Loan / EMI-oriented wording where appropriate;
4. US uses Mortgage wording;
5. UK wording remains generic enough not to misstate one nation's purchase tax as universal UK law;
6. Australia / New Zealand use Home Loan / repayment wording;
7. core home / loan / rent inputs calculate;
8. amount / percentage down-payment behavior reconciles;
9. upfront buying-cost amount / percentage behavior reconciles;
10. cash-purchase path works;
11. horizon shorter than loan term works;
12. horizon longer than loan term invests the later buyer cash difference correctly;
13. renter deposit is returned at horizon and not treated as rent expense;
14. same-starting-cash rule is visible in methodology and matches core output;
15. same-monthly-budget rule is visible in methodology and matches core output;
16. negative home-value scenario remains valid;
17. stable crossover case;
18. multiple-crossover case does not claim a single break-even;
19. Copy Summary reconciles with result object;
20. legitimate browser clipboard-blocked fallback is accepted;
21. generated PDF is valid and exactly 3 pages;
22. PDF headline values reconcile with webpage output;
23. existing Rent vs Buy Learn page links to tool;
24. tool links back to Learn;
25. Goal Planner appears only as down-payment planning support, not the rent-vs-buy calculator;
26. Tools Hub card exists and total live-card expectations are updated to 14;
27. sitemap contains the new canonical tool URL;
28. structured data contains WebApplication + BreadcrumbList;
29. existing Learn page retains Article + BreadcrumbList;
30. seven-core homepage remains exactly seven core tools;
31. Mortgage / Home Loan Decision Centre remains exactly four core decision modules;
32. existing Mortgage Payoff engine remains unchanged and its current tests stay green;
33. MDC1A / MDC1B / MDC1C regression suites remain green;
34. 1280 px layout and chart/table visibility;
35. 390 px layout and no horizontal overflow;
36. 360 px layout and no horizontal overflow;
37. primary fields, results, warnings, CTAs and PDF headline sections pass a plain-language audit;
38. no hypothetical RENT1 scenario silently overwrites the Mortgage Decision Profile or shared housing-plan state.

QA must test the exact staged build served in the same path structure that Publisher uses, not a simplified local path that can hide relative-URL problems.

---

# 33. Source-contract protection

The central source contract must explicitly protect:

- RENT1 canonical route;
- deterministic core version marker;
- same-starting-cash formula;
- same-monthly-budget investment rule;
- mortgage / home-loan amortization path;
- rental deposit treatment;
- selling-cost treatment;
- stable crossover semantics;
- 3-page PDF contract;
- tool ↔ Learn bidirectional links;
- Tools Hub secondary-card placement;
- Tools Hub updated live-card count;
- existing Learn article no longer says the calculator is future work;
- seven-core homepage unchanged;
- four-core Mortgage / Home Loan Decision Centre unchanged;
- no automatic Mortgage Decision Profile overwrite;
- sitemap and structured-data coverage;
- dedicated RENT1 browser QA includes desktop / 390 / 360 checks.

Production should stage the exact bundle in both the normal source-contract layout and the Multi-Repo Guard simulation before handing the release to Publisher.

---

# 34. Production release boundary

Expected production release touches exactly three repositories:

1. `mortgage-payoff-calculator`
2. `draw004.github.io`
3. `carrowmont-qa` — merge last

## 34.1 Expected housing-repository additions / changes

Expected additions include:

- `rent-vs-buy-calculator.html`
- `rent-vs-buy-core.js`
- `rent-vs-buy-calculator.js`
- `rent-vs-buy-calculator.css` or a tightly scoped shared housing extension
- `rent-vs-buy-pdf-renderer.js`
- PDF / report integration using current shared utilities where compatible
- locale terminology additions only where required
- optional small pre-purchase bridge from Decision Centre outside the four core modules

Existing Mortgage / Home Loan Payoff, MDC1A, MDC1B and MDC1C calculation engines must not be modified unless a separately justified compatibility change is required and fully regression-protected.

## 34.2 Expected main-site changes

Expected changes include:

- `/tools.html` add RENT1 secondary housing card;
- `/rent-vs-buy-home.html` update primary CTA and calculator-methodology consistency;
- `/learn.html` only if a description / CTA needs updating for the now-live tool;
- sitemap add RENT1 URL and relevant changed-page `lastmod` values;
- narrowly relevant internal links only;
- no new Learn article;
- no homepage core-card addition.

## 34.3 Expected QA changes

Expected changes include:

- dedicated RENT1 deterministic / browser / PDF QA;
- source-contract additions;
- Tools Hub count / discovery expectations updated from 13 to 14 if no intervening release changes the count;
- existing Rent vs Buy Learn hotfix expectation changed from `future dedicated calculator` to live RENT1 link;
- regression protection for the four-module Decision Centre and existing mortgage family.

No workflow file is expected to change.

---

# 35. Release process

The controlled release sequence remains:

1. merge this specification-only release;
2. run Automated QA;
3. run Multi-Repo Guard;
4. take a fresh Source Snapshot;
5. treat that fresh snapshot as the only production-code baseline;
6. build the exact three-repository production bundle;
7. verify manifest base/new SHA-256 hashes;
8. run source contract in staged normal and Guard layouts;
9. run deterministic RENT1 fixtures;
10. reproduce Publisher's staged browser path and run the full RENT1 QA there;
11. run exact browser QA at desktop / 390 / 360;
12. render and inspect the exact 3-page PDF;
13. verify existing mortgage / MDC regressions;
14. create a disposable staging branch from current main;
15. upload the exact production ZIP to that branch;
16. run Carrowmont Batch PR Publisher;
17. expected Publisher result: exactly 3 PRs;
18. merge `mortgage-payoff-calculator` first;
19. merge `draw004.github.io` second;
20. merge `carrowmont-qa` last;
21. Pages / deployment green where relevant;
22. Automated QA green;
23. Multi-Repo Guard green;
24. take a fresh Source Snapshot;
25. verify IndexNow green;
26. request Google indexing for the new calculator and materially updated Learn page;
27. delete staging and Publisher-generated branches.

The staging branch itself is never merged to `main`.

Before handing the production ZIP to the user, reproduce the exact Publisher checks that can be reproduced locally. This is especially important for Tools Hub card counts, Learn selectors, clipboard behavior, relative routes and staged browser navigation.

---

# 36. Non-goals and future extensions

Potential later RENT enhancements that are **not** part of V1:

- city / postcode / ZIP-specific home-price or rent data;
- live mortgage-rate feeds;
- automatic stamp duty / transfer-tax calculators;
- automatic tax deductions / credits;
- variable-rate mortgage schedules;
- refinance events during the comparison period;
- adjustable-rate resets;
- interest-only loans;
- offset / redraw accounts;
- rent-control modeling;
- home renovation value modeling;
- capital-gains-tax calculation;
- property-specific insurance estimates;
- landlord / tenant law modeling;
- school, commute or quality-of-life scoring;
- probabilistic Monte Carlo home-price / market-return simulations;
- purchase timing forecasts;
- property listings or lender referrals;
- recommendation engines that tell a user to buy or rent.

These should be considered only after V1 is stable and real user / search behavior supports the added complexity.

---

# 37. Acceptance criteria

RENT1 production is ready only when all of the following are true:

- [ ] Specification merged and a fresh post-spec Source Snapshot taken.
- [ ] Tool is implemented inside `mortgage-payoff-calculator`, not as a new repository.
- [ ] Primary visible identity is `Rent vs Buy Calculator`.
- [ ] Plain-language labels are used across fields, errors, results, Learn CTA and PDF.
- [ ] User is told to compare reasonably similar homes.
- [ ] Buying path models down payment, loan, owner costs, home value, selling costs and remaining loan.
- [ ] Renting path models rent, refundable deposit, renter-only costs and investment balance.
- [ ] Same-starting-cash rule is implemented exactly.
- [ ] Same-monthly-housing-budget rule is implemented exactly and symmetrically.
- [ ] Buyer can invest later savings after loan payoff.
- [ ] Mortgage principal is treated as equity building, not pure cost.
- [ ] Rental deposit is returned at horizon and not counted as rent expense.
- [ ] Selling costs reduce buyer end wealth.
- [ ] Negative equity is preserved rather than floored away.
- [ ] Stable crossover logic does not mislabel multi-crossing paths as one break-even point.
- [ ] Taxes / benefits are not silently auto-calculated.
- [ ] Country selection changes terminology, not core mathematics.
- [ ] India / US / Canada / UK-Ireland / Australia-NZ wording is protected.
- [ ] Hypothetical RENT1 inputs do not overwrite the existing Mortgage Decision Profile.
- [ ] Existing Rent vs Buy Learn page links directly to the live tool.
- [ ] Goal Planner is presented only as down-payment planning support.
- [ ] Tools Hub lists RENT1 as a secondary housing decision tool.
- [ ] Seven-core homepage remains unchanged.
- [ ] Four-core Mortgage / Home Loan Decision Centre remains unchanged.
- [ ] Existing mortgage / MDC engines and regression suites remain green.
- [ ] Copy Summary uses the same result object.
- [ ] Actual PDF is valid and exactly 3 pages.
- [ ] Deterministic core fixtures are green.
- [ ] Desktop / 390 / 360 browser QA is green.
- [ ] Source contract and Guard-layout source contract are green.
- [ ] Publisher's staged browser path has been reproduced before release handoff.
- [ ] No workflow file is included.
- [ ] Production release creates exactly 3 PRs in the expected repository order.
- [ ] Post-merge Pages, Automated QA and Multi-Repo Guard are green.
- [ ] Fresh post-production Source Snapshot is accepted before RENT1 is closed.

---

# 38. Product principle

RENT1 should answer a simple question with complete math:

> **If I use the same starting money and the same monthly housing budget, what changes if I rent a similar home instead of buying it?**

The calculator should make the answer transparent enough that the user can see what comes from:

- the down payment;
- the loan;
- rent;
- owner-only costs;
- home-value change;
- selling costs;
- the return on money kept invested;
- and the amount of time they expect to stay.

It should help the user test assumptions, not tell the user how the housing market will behave or what life choice to make.

---

**End of final specification — RENT1 Rent vs Buy Calculator**
