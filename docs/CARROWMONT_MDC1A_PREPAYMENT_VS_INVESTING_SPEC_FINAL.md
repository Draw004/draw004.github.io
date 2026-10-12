# CARROWMONT MDC1A - MORTGAGE / HOME LOAN PREPAYMENT VS INVESTING

## Product, Calculation, UX, Localization, Learn, Reporting, QA & Release Specification

**Status:** Approved V1.0 - specification only; production code is not changed by this document.  
**Authoritative baseline:** Carrowmont Source Snapshot 47  
**Snapshot generated:** 2026-10-11T16:54:44Z  
**Main-site commit:** `6c0aa5a6ec5a58e7ac80e705ec814cb3667f656e`  
**Mortgage repository commit:** `f87041cef73bc489980c93f566191eef78cf372b`  
**Central QA commit:** `a62539879b2c33df515bc7d0772c0c30529cbed9`  
**Budget & Cash Flow commit:** `2b6b725bf1e3c40052d002cd16a409c279d9a2ed` - reference only; no MDC1A change expected.  

---

# 1. Owner-approved direction being formalized

MDC1A is the first controlled release of the Carrowmont Mortgage Decision Centre.

This specification formalizes the already-approved direction that:

1. Mortgage Decision Centre is prioritized ahead of SEO3E Oil Shock & Inflation.
2. Mortgage Decision Centre remains inside the existing `mortgage-payoff-calculator` repository; it is not a new repository and it does not create new homepage core-tool cards.
3. The seven-core-tool architecture remains unchanged.
4. MDC1A ships the **Decision Centre hub + Prepayment vs Investing** first.
5. MDC1B Refinance / Balance Transfer Break-Even and MDC1C Rate Shock & Budget Stress remain later controlled releases.
6. The primary Prepay-vs-Invest comparison uses a **common horizon and equal cash-flow treatment**.
7. The hero decision metric is the **break-even effective annual investment return**.
8. Carrowmont does not recommend an investment product, forecast market returns, or state that investing or prepaying is universally better.
9. Country selection controls terminology and genuine local caveats; currency controls display only. The core mathematics remains universal except where an already-supported loan-rate convention genuinely differs.
10. Country-specific tax, legal, penalty or lender-rule calculations are not invented. The user enters known charges from lender documents.
11. Mortgage-specific values remain local-first. Cross-page reuse is explicit, visible, validated and reversible.
12. Tool <-> Learn discovery is contextual and bidirectional.
13. Central QA merges last.
14. No new workflow files are expected. Workflow permission remains No access unless separately approved.
15. Exact Publisher-style staged QA at desktop, 390px and 360px is mandatory before a production bundle is handed over.

---

# 2. Release scope

MDC1A is one product release with four connected public surfaces:

1. existing Mortgage / Home Loan Payoff Calculator - receives a prominent Decision Centre continuation path after results;
2. new Mortgage Decision Centre hub;
3. new Prepayment vs Investing decision tool;
4. one new primary Learn article supporting the trade-off.

The release must not include production code for Refinance Break-Even or Rate Shock & Budget Stress.

The Decision Centre hub may display those two future modules as **Planned / Coming next** cards, but they must not have dead links, indexable placeholder pages, fake results, or disabled controls that look functional.

---

# 3. Product purpose

The tool answers one practical question:

> **I have extra money. Under the assumptions I choose, what changes if I use it to reduce my mortgage/home loan instead of investing or keeping it?**

The tool must turn that question into a transparent threshold rather than a recommendation.

The primary interpretation is:

> **What effective annual investment return would make the two paths finish approximately equal by the original scheduled mortgage payoff date?**

The tool also explains:

- modeled mortgage interest avoided by prepayment;
- modeled time saved to mortgage payoff;
- effect of user-entered prepayment / early-repayment charges;
- ending modeled value of the Prepay path at the common horizon;
- ending modeled value of the Invest path at the common horizon;
- difference between the two paths at the user's own assumed effective annual investment return;
- why mortgage savings and market investment returns have different uncertainty profiles.

---

# 4. Product boundaries

MDC1A is educational planning software. It is not:

- investment advice;
- a buy/sell/hold recommendation;
- a stock, ETF, mutual fund or pension selector;
- a lender payoff quote;
- a tax calculator;
- a legal prepayment-penalty calculator;
- a refinance recommendation;
- a lender qualification or affordability decision;
- a home-price forecast;
- a live market-return feed;
- a promise that any investment return will be achieved.

The wording **"modeled"**, **"under these assumptions"** and **"effective annual return"** must be used where needed so the interface does not imply certainty.

---

# 5. Architecture inheritance - non-negotiable

MDC1A inherits the current Carrowmont mortgage shell and standards rather than creating a second mortgage design system.

Mandatory inheritance includes:

- current shared Carrowmont header/footer;
- current mortgage typography, colors, input dimensions, card language and focus treatment;
- current country/currency selector behavior;
- current `locale.js` region and currency universe;
- current Mortgage / Home Loan rate convention behavior, including the existing Canadian fixed-rate convention where applicable;
- current report-standard and PDF-export architecture;
- current privacy-first analytics consent behavior;
- current Learn article standard;
- current same-origin/local-first planning philosophy;
- current mobile overflow discipline;
- current QA/release discipline.

The new tool must look and behave as part of the existing Mortgage / Home Loan product family.

---

# 6. Stable canonical routes

The approved routes are:

| Purpose | Canonical path |
|---|---|
| Existing Payoff / Prepayment calculator | `/mortgage-payoff-calculator/` |
| Mortgage Decision Centre hub | `/mortgage-payoff-calculator/decision-centre.html` |
| Prepayment vs Investing | `/mortgage-payoff-calculator/prepayment-vs-investing.html` |
| Supporting Learn article | `/mortgage-prepayment-vs-investing.html` |

No country-specific duplicate URLs are created.

---

# 7. Search presentation

## 7.1 Decision Centre hub

**Static title:**  
`Mortgage Decision Centre - Prepay, Refinance & Rate Stress | Carrowmont`

**Static meta description:**  
`Compare the next mortgage decisions after a payoff calculation: prepay versus invest, refinance break-even and payment stress from higher rates.`

**H1:**  
`What are you trying to decide?`

## 7.2 Prepayment vs Investing tool

**Static title:**  
`Mortgage Prepayment vs Investing Calculator | Carrowmont`

**Static meta description:**  
`Compare mortgage or home-loan prepayment with investing the same extra money using equal cash flows, a common horizon and a modeled break-even investment return.`

**H1 fallback:**  
`Should you prepay your mortgage or invest the extra money?`

## 7.3 Learn article

**Canonical URL:**  
`https://carrowmont.com/mortgage-prepayment-vs-investing.html`

**Title:**  
`Mortgage Prepayment vs Investing: How to Compare the Trade-Off | Carrowmont`

**H1:**  
`Mortgage prepayment vs investing: how to compare the trade-off`

The article must use `Article` + `BreadcrumbList` structured data consistent with the current Learn cluster.

---

# 8. Decision Centre hub experience

The hub asks one question:

> **What are you trying to decide?**

It contains four decision cards in this order:

1. **Payoff / Prepayment**  
   Question: `How much time and interest can extra payments save?`  
   State: Live.  
   Link: `/mortgage-payoff-calculator/`

2. **Prepay vs Invest**  
   Question: `Should I use this extra money against the loan or invest it?`  
   State: Live after MDC1A release.  
   Link: `/mortgage-payoff-calculator/prepayment-vs-investing.html`

3. **Refinance / Transfer**  
   Question: `Does the lower rate still save money after fees and term changes?`  
   State in MDC1A: Planned / Coming next. No clickable future URL.

4. **Rate Shock / Budget**  
   Question: `What happens to my payment and household buffer if the rate rises?`  
   State in MDC1A: Planned / Coming next. No clickable future URL.

The hub is not a new core tool. It is a family navigation surface under Mortgage / Home Loan.

---

# 9. Country-aware identity

The underlying tool remains universal. Visible identity changes by region.

| Region | Preferred product wording |
|---|---|
| India | **Home Loan Prepayment vs Investing** |
| United States | **Mortgage Prepayment vs Investing** |
| Canada | **Mortgage Prepayment vs Investing** |
| United Kingdom | **Mortgage Overpayment vs Investing** |
| Ireland | **Mortgage Overpayment vs Investing** |
| Australia | **Extra Home Loan Repayments vs Investing** |
| New Zealand | **Extra Home Loan Repayments vs Investing** |
| Other / International | **Mortgage / Home Loan Prepayment vs Investing** |

Supporting labels follow current mortgage terminology:

- India: home loan, EMI, tenure, part-prepayment, foreclosure / pre-closure where contextually correct;
- US: mortgage, payment, term, extra principal, early payoff;
- UK / Ireland: mortgage, payment, term, overpayment, early repayment charge where user-supplied;
- Canada: mortgage, payment, amortization/term as appropriate, prepayment;
- Australia / New Zealand: home loan, repayment, extra repayment, loan term;
- fallback: mortgage / home loan, extra payment, repayment term.

Country must not set or suggest an investment-return assumption.

---

# 10. Locale and currency behavior

MDC1A reuses the current mortgage `locale.js` universe rather than introducing a second list.

Rules:

1. Region selector remains alphabetized in the rendered UI, with Other / International last.
2. Currency selector remains independent from region.
3. Changing currency changes formatting and interpretation of monetary inputs only; Carrowmont performs no FX conversion.
4. If currency is changed after monetary values are entered, the values remain numerically unchanged and are interpreted in the newly selected currency. The UI must make that behavior clear.
5. Region may change terminology and genuine local explanatory notes but must not change the investment comparison mathematics.
6. Canada may continue using the current fixed-rate periodic-rate convention inherited from the existing mortgage engine.

---

# 11. Common mortgage inputs

## 11.1 Outstanding balance

Required.

Validation:

- must be greater than zero;
- must be finite;
- interpreted in selected currency;
- must never be automatically converted after currency change.

Localized labels follow the existing mortgage product.

## 11.2 Current annual mortgage/home-loan rate

Required.

Validation:

- minimum: 0%;
- maximum V1 product cap: 50%;
- step: 0.01 percentage point;
- no live-rate default.

## 11.3 Remaining term

Use years + months.

Validation:

- combined term must be greater than zero;
- maximum: 100 years, consistent with the current mortgage engine safety boundary.

## 11.4 Scheduled repayment frequency

Reuse the existing mortgage architecture:

- Monthly;
- Every 2 Weeks - visible as biweekly or fortnightly according to current terminology behavior;
- Weekly.

Country selection must not silently preselect a repayment frequency.

## 11.5 Current regular repayment - optional advanced input

Default behavior uses the modeled scheduled repayment produced by the existing mortgage formulas.

The user may optionally choose **Use my current regular repayment** and enter the lender payment actually being made.

Rules:

- optional;
- greater than zero when enabled;
- if it does not amortize the loan under the entered rate, the comparison must stop with a negative-amortization validation message;
- the value must be treated as a user-entered planning input, not as proof of lender terms.

This option exists because a fair comparison depends on the scheduled payment the user would otherwise continue making.

---

# 12. Extra-money modes

The first product choice is:

> **How is the extra money available?**

Two V1 modes:

1. **One-time lump sum**
2. **Recurring extra amount**

Switching modes must not discard common mortgage inputs.

---

# 13. One-time lump-sum inputs

Required fields:

- Lump-sum amount;
- Apply at scheduled repayment number.

Rules:

- amount must be greater than zero for a completed comparison;
- repayment number minimum: 1;
- repayment number maximum: baseline payoff period;
- the UI must reject, not silently clamp, a repayment number outside the modeled baseline schedule;
- if the lump sum is larger than the amount needed to clear the loan at that event, the unused planned cash is treated as available to the Prepay-path investment account on that same event date rather than disappearing.

---

# 14. Recurring extra inputs

Fields:

- Recurring extra amount;
- Extra-money frequency;
- First extra event / start period;
- Custom interval in months only when Custom is selected.

Reuse the current mortgage extra-frequency architecture:

- Every scheduled repayment;
- Monthly;
- Quarterly;
- Half-yearly / Every 6 months;
- Annually;
- Custom interval.

Rules:

- amount must be greater than zero for a completed comparison;
- no recurring frequency is preselected;
- the user must deliberately choose a frequency;
- start period minimum: 1;
- recurring events continue conceptually through the common horizon, including after the Prepay path has cleared the mortgage, because the comparison must preserve equal planned cash flow.

---

# 15. Investment-return assumption

Input label:

**Assumed effective annual investment return after fees/tax you choose to reflect**

This assumption is deliberately user-controlled.

Rules:

1. Carrowmont must not prefill a market return.
2. Carrowmont must not provide a historical-market-return preset in V1.
3. The field may be left blank; the tool can still calculate the break-even return and mortgage effects.
4. When entered, supported range is greater than -100% and no more than +100% for the standard UI.
5. Negative assumptions are permitted because the input represents an effective annual outcome chosen by the user.
6. The effective return is the user's after-fee / after-tax modeling assumption if they want those effects reflected. Carrowmont does not calculate investment taxes or fees automatically.
7. The report must state when no assumed return was entered.

The break-even solver may internally search above +100% as described later, but the normal user-assumption field does not need an extreme return range.

---

# 16. Prepayment / early-repayment charge

Optional input.

Localized label follows the market, for example:

- India: Prepayment / foreclosure charge;
- US: Prepayment penalty / payoff charge;
- UK: Early Repayment Charge (ERC);
- Canada: Prepayment charge;
- AU/NZ: Early repayment / break charge;
- fallback: Prepayment / early-repayment charge.

V1 models one total monetary charge entered by the user.

Rules:

- minimum 0;
- no automatic legal or lender-rule calculation;
- no percentage penalty engine;
- the user should enter the actual amount they expect from lender terms/documents;
- V1 treats the entered charge as paid **in addition to** the extra-money amount;
- the charge is applied at the first prepayment event for common-horizon opportunity-cost treatment;
- the interface must explain this treatment.

---

# 17. Fair-comparison principle

The primary comparison must not be:

> `interest saved vs future value of the extra money`

by itself.

That shortcut is incomplete because an earlier mortgage payoff releases scheduled mortgage cash flow before the original payoff date.

MDC1A uses:

- one baseline mortgage schedule;
- one planned extra-money stream;
- one common horizon;
- equal planned cash flow through that horizon;
- the same user-selected investment return assumption for all modeled investment cash flows;
- the same home asset in both paths, so no speculative home-value forecast is needed.

---

# 18. Baseline mortgage schedule - source of truth

Create the baseline using the existing Mortgage / Home Loan engine and conventions.

The baseline represents:

- current balance;
- entered annual rate;
- remaining term;
- scheduled repayment frequency;
- existing fixed-rate convention behavior;
- formula repayment unless the user explicitly supplies a valid current regular repayment.

The baseline output must include at minimum:

- scheduled repayment;
- payoff periods;
- payoff date;
- total interest;
- period-by-period ledger with date, opening balance, interest, scheduled repayment and closing balance.

The **baseline payoff date is the default common horizon**.

MDC1A must not change baseline mortgage formulas merely to make the decision tool easier to implement.

---

# 19. Planned cash-flow budget

For each baseline scheduled repayment period through the common horizon, define the user's planned decision cash budget as:

`baseline scheduled mortgage repayment for that period + planned extra money due on that period/date`

This is the cash amount that is allocated differently between the two paths.

Using the actual baseline ledger rather than a rounded regular payment protects the final partial-payment period and keeps the comparison deterministic.

---

# 20. Prepay path

The Prepay path applies planned extra money to principal as early as the user specified.

For each event before payoff:

1. make the modeled scheduled mortgage repayment;
2. apply the planned extra amount due at that event to principal, capped only by the amount needed to clear the loan;
3. if the scheduled repayment or extra amount is not fully required because the mortgage is cleared during that event, place the unused part into the Prepay-path investment account on that same date;
4. after mortgage payoff, place every baseline scheduled repayment that would otherwise have continued into the Prepay-path investment account;
5. after mortgage payoff, also place every recurring extra amount that the user planned through the common horizon into the Prepay-path investment account;
6. deduct the common-horizon opportunity cost of the user-entered prepayment charge.

The Prepay path therefore does not receive a hidden cash-flow advantage from simply stopping cash outflows after early payoff.

---

# 21. Invest path

The Invest path keeps the original baseline mortgage schedule unchanged.

For each extra-money event:

1. continue the baseline mortgage repayment;
2. invest the planned extra amount instead of applying it to principal;
3. allow that investment cash flow to compound to the common horizon at the user's modeled effective annual return.

There is no prepayment charge on the Invest path because no prepayment is being modeled.

At the common horizon, the original mortgage schedule has reached payoff, so both paths end with the same modeled mortgage balance: zero.

---

# 22. Common horizon

Default common horizon:

**Baseline scheduled mortgage payoff date.**

This is fixed for V1.

The user does not choose a different horizon in MDC1A V1 because doing so would introduce a second decision layer and could obscure the equal-cash-flow comparison.

At the horizon:

- baseline mortgage balance = 0;
- Prepay mortgage balance = 0;
- home asset is treated as identical in both paths;
- comparison reduces to the modeled financial value produced by the different cash-flow allocation, including the modeled effect of entered prepayment charges.

---

# 23. Investment compounding convention

The entered return is an **effective annual return**.

For a cash flow `C` occurring on date `d`, with common horizon `H`, and annual return in decimal form `r` where `r > -1`:

`futureValue(C, d, H, r) = C * (1 + r) ^ yearFraction(d, H)`

Use:

`yearFraction(d, H) = daysBetween(d, H) / 365.2425`

Rules:

- dates are interpreted in UTC/date-only form to avoid local-time drift;
- a cash flow on the horizon has a growth factor of 1;
- no intra-day market timing is modeled;
- no volatility path is modeled; this is a deterministic effective-return assumption;
- no fees/tax are added separately unless the user already reflected them in the entered effective return.

This convention keeps investment accumulation independent from mortgage payment cadence while respecting the timing of each modeled cash flow.

---

# 24. Prepayment-charge common-horizon treatment

Let the entered charge be `F`, paid on first prepayment date `dF`.

The modeled common-horizon burden of the charge is:

`feeFutureValue = F * (1 + r) ^ yearFraction(dF, H)`

Then:

`prepayEndingNetValue = prepayInvestmentFutureValue - feeFutureValue`

This reflects that the charge is a real cash cost unique to the Prepay path and that cash could otherwise have remained available until the common horizon.

At a 0% assumed return, the future-value burden equals the nominal entered charge.

---

# 25. Ending values

At a given investment return `r`:

**Invest path ending value**

`investEndingValue(r) = future value of all planned extra-money cash flows through H`

**Prepay path ending net value**

`prepayEndingNetValue(r) = future value of all cash released/unused by early payoff and continuing planned extra cash after payoff - future value of entered prepayment charge`

**Difference**

`pathDifference(r) = prepayEndingNetValue(r) - investEndingValue(r)`

Interpretation:

- positive: Prepay path has the higher modeled ending value under that return assumption;
- negative: Invest path has the higher modeled ending value under that return assumption;
- approximately zero: paths are modeled as approximately equal at the common horizon.

The UI must use **"higher modeled ending value"** rather than recommendation wording such as **"you should"**, **"best"** or **"winner"**.

---

# 26. Break-even investment return

The hero result is the effective annual investment return `r*` satisfying:

`pathDifference(r*) ~= 0`

## 26.1 Numerical method

Use a deterministic numerical solver.

Recommended approach:

1. evaluate a stable search grid over `-0.99` to `+1.00` decimal return (-99% to +100%);
2. locate a sign-change interval or an exact near-zero point;
3. if no sign change exists in that range, extend the search up to `+5.00` (+500%) for solver purposes only;
4. use bisection inside the located bracket;
5. stop when either:
   - return bracket width is below `1e-8` in decimal-return units; or
   - absolute path difference is within a currency tolerance of `max(0.01, outstandingBalance * 1e-8)`;
6. cap at 100 bisection iterations.

## 26.2 Multiple / absent roots

Supported V1 cash flows are expected to produce a single economically meaningful crossing in normal cases, but the engine must not assume success silently.

If:

- no crossing exists in the supported solver range; or
- numerical evaluation is non-finite;

return `breakEvenReturn = null` with a deterministic status code and display a plain-language explanation.

Do not invent or extrapolate a break-even number.

## 26.3 Display precision

Default display:

- break-even annual return: 2 decimal places;
- internal calculation keeps full precision;
- reports and Copy Summary use the same rounded display value from the result object.

---

# 27. Interest avoided and payoff time saved

These outputs come from the mortgage schedules, not from investment arithmetic.

**Interest avoided by prepayment**

`baseline total interest - Prepay mortgage total interest`

Show the amount before the separate entered prepayment charge.

**Payoff time saved**

`baseline payoff periods - Prepay payoff periods`

Convert using the existing mortgage duration-label convention.

The report must show charges separately so a user can distinguish:

- mortgage interest avoided;
- lender/prepayment charge entered;
- common-horizon path comparison.

---

# 28. Primary outputs

Required outputs:

1. **Break-even effective annual investment return** - hero result.
2. **Modeled outcome at your assumed return** - when the user entered one.
3. **Interest avoided by prepayment** - before entered prepayment charge.
4. **Estimated payoff date** under Prepay path.
5. **Time saved to payoff**.
6. **Prepayment charge entered**.
7. **Prepay path ending net value** at the common horizon.
8. **Invest path ending value** at the common horizon.
9. **Difference between paths** at the assumed return.
10. **Common horizon date**.
11. **Baseline scheduled repayment** used in the model.
12. Clear uncertainty note.
13. Emergency-fund / high-cost-debt educational caution.

---

# 29. Hero-result interpretation

Example neutral language when break-even exists:

> **Break-even investment return: 6.42% a year**  
> Under these cash-flow assumptions, the two paths finish at approximately the same modeled value at the original mortgage payoff date when the investment return is about 6.42% effective annually. Above or below that threshold, the modeled ending values change; actual investment returns are uncertain.

At the user's assumed return, use language such as:

> At your 7.00% modeled return, the Invest path finishes approximately ₹X higher at the common horizon.

or:

> At your 4.00% modeled return, the Prepay path finishes approximately £X higher at the common horizon.

Do not append:

- "therefore invest";
- "therefore prepay";
- "better choice";
- "guaranteed saving";
- investment-product suggestions.

---

# 30. Uncertainty and safety explanation

The result area must include a concise distinction:

- mortgage interest avoided is comparatively predictable once the modeled loan terms and entered charges are correct;
- investment returns are uncertain and can be lower, higher or negative;
- lender rules, taxes, investment fees, tax treatment, offset/redraw features, variable rates and product-specific restrictions can change real outcomes;
- users should preserve appropriate liquidity/emergency reserves and consider high-cost debt before treating all spare cash as available for either path.

This is educational guidance, not a hard-coded recommendation or suitability test.

---

# 31. Validation and deterministic edge cases

The engine and UI must define the following states.

## 31.1 Zero extra money

Core engine fixture must not crash.

Return a deterministic `no-extra` / comparison-not-applicable state:

- Prepay mortgage path equals baseline;
- path values are equal before any charge;
- break-even is not meaningful and should be `null`;
- UI asks the user to enter an extra amount greater than zero before presenting a completed comparison.

## 31.2 Zero mortgage rate

Supported.

Expected behavior:

- interest avoided is zero;
- with no charge, break-even may be 0% depending on timing;
- solver must remain stable.

## 31.3 Negative user investment return

Supported above -100%.

The tool may show the Prepay path with a higher modeled ending value; wording remains neutral.

## 31.4 Very high user investment return

UI supports up to +100%.

Values must remain finite. No recommendation language.

## 31.5 Large lump sum clears loan immediately

Supported.

- extra applied only up to amount needed for payoff;
- unused planned lump-sum cash is invested on that date in the Prepay path;
- no negative mortgage balance.

## 31.6 Recurring extra clears loan between planned future events

After payoff:

- future baseline scheduled payments are invested in Prepay path;
- future recurring extra events are also invested in Prepay path through common horizon.

## 31.7 Prepayment charge greater than interest avoided

Supported.

Do not force a recommendation. Show the modeled economics transparently.

## 31.8 User-entered current repayment causes negative amortization

Stop comparison and show the current mortgage validation message. Do not invent a payoff date.

## 31.9 Investment return blank

Calculate:

- baseline;
- Prepay mortgage schedule;
- interest avoided;
- time saved;
- break-even return.

Do not show an assumed-return path difference until the user supplies a return.

---

# 32. Source-of-truth result object

MDC1A must create one deterministic result object used by:

- on-screen results;
- chart/table;
- Copy Summary;
- PDF report;
- QA fixtures.

Recommended shape:

```text
{
  ok,
  version,
  input: {
    country, currency,
    balance, annualRatePct,
    remainingYears, remainingMonths,
    paymentFrequency,
    useCurrentPayment, currentPayment,
    extraMode,
    extraAmount,
    extraFrequency,
    extraStartPeriod,
    customIntervalMonths,
    lumpSumPeriod,
    prepaymentCharge,
    assumedInvestmentReturnPct
  },
  baseline: {
    payment,
    payoffPeriods,
    payoffDate,
    totalInterest,
    ledger
  },
  prepay: {
    mortgagePayment,
    payoffPeriods,
    payoffDate,
    totalInterest,
    interestAvoided,
    periodsSaved,
    mortgageLedger,
    investmentCashFlows,
    endingInvestmentValue,
    feeFutureValue,
    endingNetValue
  },
  invest: {
    investmentCashFlows,
    endingValue
  },
  comparison: {
    commonHorizonDate,
    assumedReturnPct,
    pathDifference,
    higherModeledPath,
    breakEvenReturnPct,
    breakEvenStatus
  },
  messages: []
}
```

Production code may optimize storage or omit raw ledgers from serialized summaries, but all display and export arithmetic must derive from the same calculation result.

No separate PDF arithmetic is allowed.

---

# 33. Engine isolation rule

Preferred MDC1A implementation:

- keep existing `mortgage-payoff-calculator/core.js` behavior unchanged;
- create a separate pure `prepayment-vs-investing-core.js` decision engine;
- reuse current exported mortgage primitives and outputs where possible;
- if a helper must be exposed from the existing engine, that is allowed only as a behavior-preserving refactor with explicit parity fixtures proving all current CORE7 mortgage outputs are unchanged.

No existing payoff formula may be altered merely to support MDC1A.

---

# 34. UI structure - Prepayment vs Investing

Recommended desktop layout:

1. shared header;
2. breadcrumb / family context: `Mortgage Decision Centre > Prepay vs Invest`;
3. product intro and plain-language question;
4. compact explicit saved-profile reuse banner when available;
5. two-column calculator shell:
   - left: mortgage + extra-money assumptions;
   - right: hero break-even result + current-assumption outcome;
6. comparison cards;
7. common-horizon value chart and accessible table;
8. "How this comparison works" section;
9. Learn bridge;
10. FAQ / methodology / limitations;
11. report + Copy Summary actions;
12. related Mortgage Decision Centre cards;
13. shared footer.

On mobile, inputs and results stack without horizontal overflow.

---

# 35. Required result cards

At minimum:

- Break-even return;
- At your assumed return;
- Interest avoided;
- Payoff time saved;
- Common horizon;
- Entered prepayment charge.

Then a clear two-path comparison:

| Path | Mortgage behavior | Extra cash behavior | Ending modeled value |
|---|---|---|---|
| Prepay | Extra cash reduces principal; mortgage may finish early | Freed scheduled cash and continuing planned extra cash are invested after payoff | value from result object |
| Invest | Original mortgage schedule continues | Extra cash is invested on its planned dates | value from result object |

The table is required even if a chart is also present.

---

# 36. Primary chart

Use one simple accessible chart:

**Modeled value at the common horizon**

Two permanently labeled values:

- Prepay path ending net value;
- Invest path ending value.

Rules:

- labels must show values without hover;
- color is not the only differentiator;
- text/table equivalent immediately accompanies the chart;
- chart must remain readable at 390px and 360px;
- chart uses the same result object as cards/report.

A more complex time-series wealth chart is intentionally deferred from V1 to avoid implying a market path that the deterministic return assumption does not actually model.

---

# 37. Copy Summary

Required.

Copy Summary must include:

- Carrowmont product name;
- common horizon date;
- outstanding balance;
- mortgage rate and remaining term;
- scheduled repayment cadence;
- extra-money mode and amount/frequency;
- entered prepayment charge;
- break-even effective annual return;
- assumed investment return if entered;
- Prepay ending value;
- Invest ending value;
- difference at assumed return if entered;
- interest avoided;
- payoff time saved;
- uncertainty / not-advice sentence;
- canonical tool URL.

No hidden precision differences from on-screen values.

---

# 38. PDF report

Provide a real PDF generated through the existing Carrowmont report architecture.

Recommended V1 report: **3 pages**.

## Page 1 - Decision summary

- localized product identity;
- break-even effective annual return;
- modeled outcome at user return, if entered;
- Prepay vs Invest ending-value comparison;
- common horizon;
- interest avoided;
- payoff time saved;
- prepayment charge entered.

## Page 2 - Loan and cash-flow comparison

- baseline mortgage inputs;
- extra-money plan;
- baseline payoff vs Prepay payoff;
- how equal cash flow is maintained;
- common-horizon chart/table;
- assumptions used.

## Page 3 - Methodology, uncertainty and continue planning

- common-horizon methodology;
- effective annual investment-return convention;
- charge treatment;
- uncertainty and exclusions;
- emergency-fund/high-cost-debt caution;
- related Learn article;
- Mortgage Decision Centre links;
- relevant Carrowmont tools using the existing report family style without modifying the seven-core-tool registry.

The report filename should be stable, for example:

`carrowmont-prepayment-vs-investing-decision-report.pdf`

---

# 39. No CSV requirement in MDC1A V1

CSV export is not required for the first Prepay-vs-Invest release.

Reason:

- the primary decision is a threshold and path comparison, not a user need for a full amortization ledger;
- PDF + Copy Summary are sufficient for V1;
- avoiding an unnecessary export reduces release surface.

If CSV is added later, it must use the same result object and must not introduce separate arithmetic.

---

# 40. Mortgage-specific local profile

Create one local mortgage Decision Centre profile:

`carrowmontMortgageDecisionV1`

Recommended stored fields:

- schema version;
- saved timestamp;
- country/region;
- currency;
- outstanding balance;
- annual mortgage/home-loan rate;
- remaining years;
- remaining months;
- scheduled repayment frequency;
- `useCurrentPayment` flag;
- current regular repayment only when explicitly supplied.

Do **not** store in this shared mortgage profile:

- assumed investment return;
- prepayment charge;
- extra-money amount;
- extra-money cadence;
- break-even result.

Those are decision-specific assumptions, not stable mortgage facts.

---

# 41. Explicit profile reuse behavior

No silent transfer.

## 41.1 From existing Payoff Calculator

After a valid payoff calculation, provide a prominent continuation action such as:

**Compare Prepayment vs Investing**

When the user activates that action:

1. validate the relevant mortgage inputs;
2. stage/write the mortgage profile locally;
3. navigate to the MDC1A page;
4. on destination, show a visible banner that loan details are available;
5. require the user to choose **Use these loan details** or **Start fresh** before populating fields.

## 41.2 From Decision Centre pages

When a profile exists, show a compact reuse option. Do not auto-fill invisibly on page load.

## 41.3 Clear action

Provide:

**Clear saved mortgage details**

This deletes only `carrowmontMortgageDecisionV1` and does not clear unrelated Carrowmont preferences or shared-plan state.

---

# 42. Shared plan state and cross-tool behavior

MDC1A does not require changes to Budget, FI, Goal, SIP, Inflation or Retirement repositories.

Rules:

- do not broaden the cross-tool shared-plan schema merely for this release;
- do not push investment-return assumptions into SIP / Recurring Investment;
- do not silently push a freed mortgage payment into any investment tool;
- do not overwrite Budget values;
- existing mortgage shared-plan behavior remains intact unless a separately approved compatibility need is identified.

The Mortgage Decision Centre profile is same-family local state, not a new global financial-profile system.

---

# 43. Existing Payoff Calculator integration

The existing Payoff Calculator remains focused on payoff/prepayment mechanics.

MDC1A adds a continuation path after a valid result, not new decision math inside the current screen.

Preferred result CTA:

**Have extra money available? Compare Prepayment vs Investing**

Supporting text should explain that the next tool uses equal cash flow and a common horizon.

Also add a smaller family path to:

**Mortgage Decision Centre**

Do not place the full Prepay-vs-Invest calculator inside the existing payoff page.

---

# 44. Learn article - required editorial role

New article:

`/mortgage-prepayment-vs-investing.html`

Primary question:

> Why can "interest saved vs investment future value" be a misleading comparison, and how do you compare the two choices more fairly?

Required educational modules:

1. direct answer;
2. why the simple shortcut can be biased;
3. common-horizon concept;
4. equal-cash-flow concept;
5. why an earlier payoff releases later scheduled payments;
6. why investment return is uncertain;
7. fees, tax and lender-charge caveats;
8. liquidity/emergency-fund consideration;
9. simple worked example using clearly labeled assumptions;
10. FAQ;
11. primary CTA to MDC1A tool;
12. contextual links to existing mortgage Learn pages.

The article must satisfy the current Learn Article Standard and use the existing shared localization layers rather than hard-coding India-only terminology.

---

# 45. Tool <-> Learn linking

Required paths:

## Tool to Learn

MDC1A page links prominently to:

`/mortgage-prepayment-vs-investing.html`

Recommended anchor:

**Understand how to compare prepayment and investing fairly**

## Learn to Tool

Article has:

- primary top CTA;
- shared bottom tool-return CTA;

both linking to:

`/mortgage-payoff-calculator/prepayment-vs-investing.html`

## Existing mortgage article connections

Add only contextual secondary links where useful:

- One Extra Mortgage Payment a Year -> existing Payoff Calculator primary; MDC1A secondary where trade-off discussion fits;
- Monthly Extra vs Annual Lump Sum -> existing Payoff Calculator primary; MDC1A secondary;
- Extra Payments Early vs Late -> existing Payoff Calculator primary; MDC1A secondary;
- Biweekly/Fortnightly -> primarily Payoff Calculator;
- Pay Off Five Years Early -> primarily Payoff Calculator.

Do not force every mortgage article to link to every Decision Centre module.

---

# 46. Learn hub discovery

Retain a single **Home Loans & Mortgages** category.

Add the new article contextually to that category.

Do not create a separate "Mortgage Decision Centre" Learn category in MDC1A.

The Learn hub must remain mobile-safe and preserve the existing localization contract.

---

# 47. Tools Hub / homepage discovery

Homepage:

- existing Mortgage / Home Loan core card remains unchanged as the gateway;
- do not add a new core card for MDC1A.

Tools Hub:

- may add a Mortgage Decision Centre / companion-decision entry under the Mortgage & Home Loan area;
- must not register MDC1A as an eighth core planning tool;
- report registry remains seven active core tools.

---

# 48. Sitemap and indexing

MDC1A production release must add canonical public URLs to `sitemap.xml`:

- `https://carrowmont.com/mortgage-payoff-calculator/decision-centre.html`
- `https://carrowmont.com/mortgage-payoff-calculator/prepayment-vs-investing.html`
- `https://carrowmont.com/mortgage-prepayment-vs-investing.html`

Refresh `lastmod` for materially changed discovery pages, including the existing mortgage tool and Learn hub when appropriate.

After green release:

1. Pages green;
2. Automated QA green;
3. Multi-Repo Guard green;
4. fresh Source Snapshot;
5. IndexNow / sitemap coverage;
6. Google URL Inspection / Request Indexing for the new public URLs, subject to quota.

---

# 49. Accessibility requirements

Mandatory:

- keyboard-accessible controls;
- visible focus states;
- semantic labels tied to inputs;
- mode controls expose pressed/selected state;
- touch targets around 44px;
- no information conveyed by color alone;
- chart has permanent labels and a text/table equivalent;
- validation messages use an accessible live region;
- result changes are announced appropriately without excessive interruption;
- headings remain hierarchical;
- PDF text remains legible at normal print scaling.

---

# 50. Responsive-layout gate

Every MDC1A public page must satisfy:

`document.scrollWidth <= window.innerWidth`

at:

- desktop Publisher viewport;
- 390px width;
- 360px width.

Test at minimum these locale identities because of label length and terminology variation:

- India;
- United States;
- United Kingdom;
- Australia.

Long currency symbols/codes and longest visible field labels must remain inside the viewport.

---

# 51. Privacy and analytics

MDC1A reuses Carrowmont's privacy-first analytics model.

Rules:

- no login required;
- no server-side storage of user financial inputs;
- no balance, rate, term, extra amount, investment return, fee or path result may be sent as analytics parameters;
- analytics events may record only non-sensitive product interaction metadata after consent.

Permitted event examples:

- `tool_open` with tool id `mortgage-prepayment-vs-investing`;
- Decision Centre module selection using module slug only;
- `calculator_mode_change` using `lump` or `recurring` only;
- `report_generate`;
- `copy_summary`;
- Learn-link click;
- country/currency change under the existing analytics behavior.

Do not add a new analytics vendor.

---

# 52. Expected mortgage-repository production files

Exact implementation may consolidate styles, but expected scope is approximately:

## New

- `decision-centre.html`
- `decision-centre.js` if interactive family/profile behavior requires it
- `decision-centre.css` or one shared Decision Centre stylesheet
- `prepayment-vs-investing.html`
- `prepayment-vs-investing-core.js`
- `prepayment-vs-investing.js`
- `prepayment-vs-investing-pdf-renderer.js`
- `mortgage-decision-profile.js`

## Reused

- `locale.js`
- `analytics.js`
- `pdf-export.js`
- `report-standard.js`
- existing Carrowmont shell patterns
- existing mortgage `core.js` primitives/results where possible

## Potentially modified

- `index.html` - result continuation CTA / Decision Centre path;
- `app.js` - explicit profile staging only if needed;
- `styles.css` - only if an existing-page CTA cannot use current classes;
- `README.md` - document new family routes and local profile.

Existing payoff calculations must remain parity-tested.

---

# 53. Expected main-site production files

Expected changes:

## New

- `mortgage-prepayment-vs-investing.html`

## Modified

- `learn.html`
- `mortgage-learn.js` only if new article terminology bindings require extension;
- `learn-article.js` only if shared tool-return mapping requires the new tool route;
- `sitemap.xml`
- `tools.html` only if the companion Decision Centre entry is included in MDC1A;
- relevant architecture/implementation documentation after approval.

Avoid unrelated homepage/core-tool edits.

---

# 54. Expected central-QA production files

Expected new/modified QA after implementation:

- new MDC1A Playwright spec, recommended `tests/18-mortgage-decision-centre-mdc1a.spec.js`;
- `scripts/source-contract.mjs`;
- `qa.config.js` only if the new public pages must be explicitly registered;
- link/SEO tests only where existing generic coverage does not automatically include the new routes.

Central QA merges last.

---

# 55. Deterministic calculation fixture set

The core engine must have independent fixtures that do not depend on DOM rendering.

Minimum fixtures:

1. **Zero extra** - deterministic no-extra state; no divide-by-zero or fake break-even.
2. **Simple lump sum** - known baseline, known earlier payoff, stable ending values.
3. **Recurring monthly extra** - cash-flow equality holds through common horizon.
4. **Every scheduled repayment extra** - cadence parity with mortgage frequency.
5. **Quarterly recurring extra** - event timing matches existing mortgage architecture.
6. **Annual recurring extra** - event timing stable.
7. **Custom interval** - deterministic recurrence.
8. **Prepayment fee** - fee reduces Prepay common-horizon net value using correct timing.
9. **Immediate early payoff** - unused lump-sum cash is invested, no negative mortgage balance.
10. **Final partial scheduled payment** - unused scheduled cash at early payoff is not lost.
11. **Low assumed return** - output sign/values correct.
12. **High assumed return** - output sign/values correct.
13. **Negative assumed return** - finite values and neutral wording.
14. **Break-even solve** - path difference approximately zero at returned break-even rate.
15. **Zero mortgage rate** - stable solver/result behavior.
16. **Canada fixed-rate convention** - baseline matches existing mortgage engine.
17. **Monthly cadence parity** - baseline payment/payoff matches existing mortgage tool.
18. **Biweekly cadence parity** - baseline payment/payoff matches existing mortgage tool.
19. **Weekly cadence parity** - baseline payment/payoff matches existing mortgage tool.
20. **User-entered current repayment** - valid payment matches baseline expectation.
21. **Negative amortization** - invalid current payment stops comparison.
22. **No break-even in supported solver range** - returns explicit null/status, never a fabricated number.
23. **Fee larger than modeled interest avoided** - still finite and neutrally described.
24. **Equal-cash-flow accounting identity** - for every modeled period, Prepay mortgage outflow + Prepay investment contribution equals baseline scheduled outflow + planned extra, excluding the separately identified prepayment charge.

---

# 56. Equal-cash-flow QA invariant

This is the central MDC1A correctness test.

For each comparison date through the common horizon:

`Prepay scheduled mortgage paid + Prepay extra principal paid + Prepay investment contribution = Baseline scheduled mortgage cash + Planned extra cash`

subject only to:

- rounding tolerance;
- separately modeled prepayment charge.

The total common-horizon cash-flow treatment must not silently discard:

- an unused part of a lump sum;
- the unused part of a final scheduled payment;
- recurring extra money after early payoff.

This invariant is mandatory before release.

---

# 57. Existing mortgage parity QA

Because MDC1A sits inside the existing mortgage repository, the release must prove no regression in CORE7.

All current Mortgage / Home Loan QA remains green, including:

- zero-rate mortgage fixture;
- standard mortgage fixture;
- Canada fixed-rate convention;
- neutral recurring-part-prepayment default;
- Monthly View vs Pay Cycle View parity;
- target payoff;
- negative amortization;
- country terminology;
- shared shell;
- shared browser state;
- CSV behavior;
- desktop/mobile overflow;
- Mortgage Learn bidirectional behavior.

If `core.js` is modified even to expose a helper, add explicit before/after fixture parity for the current public calculations.

---

# 58. Browser QA - MDC1A

Minimum browser checks:

1. Decision Centre hub shows four cards and only live modules are clickable.
2. No future placeholder URLs exist for MDC1B/MDC1C.
3. Payoff -> Decision Centre / Prepay-vs-Invest continuation path is visible after a valid result.
4. Explicit profile transfer requires user action.
5. User can reject staged values and start fresh.
6. Clear saved mortgage details works without clearing country/currency preferences.
7. Lump-sum mode calculates.
8. Recurring mode calculates.
9. Investment-return field starts without an invented market default.
10. Break-even hero result is displayed when solver succeeds.
11. Blank assumed return still permits break-even calculation.
12. Assumed-return comparison updates deterministically.
13. Prepayment charge is visible in outputs.
14. No recommendation language appears.
15. Tool-to-Learn link is present.
16. Learn-to-Tool top and bottom CTA are present.
17. Country terminology changes without changing canonical route.
18. Country/currency change does not change formulas except existing supported mortgage rate convention.
19. Report button generates an actual PDF.
20. Copy Summary matches displayed result.
21. Desktop layout is stable.
22. 390px layout has no horizontal overflow.
23. 360px layout has no horizontal overflow.
24. Keyboard focus can reach and operate all primary controls.
25. Chart values remain visible without hover.

---

# 59. PDF QA gate

Before production packaging:

- generate representative reports for India, United States, United Kingdom and Australia;
- visually inspect every PDF page;
- confirm no clipping, overlap, missing glyphs, cut-off currency symbols or truncated longest labels;
- confirm Page 1 break-even value equals on-screen result;
- confirm Prepay and Invest ending values reconcile exactly to the result object;
- confirm no separate PDF arithmetic exists;
- confirm the uncertainty text is visible;
- confirm report pages are actual PDF output rather than browser print instructions.

---

# 60. Source-contract expectations

After implementation, source contract should protect at minimum:

- canonical Decision Centre and MDC1A URLs;
- no new homepage core card;
- no expansion of seven-core-tool report registry;
- Decision Centre hub contains four required decisions;
- MDC1B/MDC1C cards are non-link planned states during MDC1A;
- Prepay-vs-Invest tool uses separate decision core;
- break-even result and common-horizon language exist;
- no market-return default exists;
- mortgage profile key is `carrowmontMortgageDecisionV1`;
- explicit profile apply/clear behavior exists;
- new Learn article exists and is discoverable from Learn hub;
- new article links to MDC1A and MDC1A links back;
- sitemap contains all three new MDC1A public URLs;
- no workflow file changed;
- expected repository scope is limited to mortgage repo + main site + central QA.

---

# 61. Red-prevention release gate

A production MDC1A bundle is ready for handoff only when:

1. base repository hashes match the latest approved post-spec snapshot;
2. bundle ZIP integrity passes;
3. every release-manifest hash verifies;
4. source contract passes in normal source layout;
5. source contract passes in Publisher layout;
6. Multi-Repo Guard layout passes;
7. full staged browser QA passes;
8. desktop, 390px and 360px pass;
9. calculation fixtures pass independently of DOM rendering;
10. current CORE7 mortgage parity tests pass;
11. Copy Summary and PDF reconcile with the same result object;
12. representative PDFs are visually reviewed;
13. no unexpected browser network/API dependency exists;
14. no workflow file changed unless separately approved.

A green static source contract alone is not sufficient.

---

# 62. Repository scope

Expected production repositories for MDC1A:

1. `mortgage-payoff-calculator`
2. `draw004.github.io`
3. `carrowmont-qa`

No change expected to:

- sip-calculator;
- goal-planner;
- financial-independence;
- inflation-calculator;
- retirement-calculator;
- budget-cash-flow-planner.

---

# 63. Merge order

MDC1A production merge order:

1. `mortgage-payoff-calculator`
2. `draw004.github.io`
3. `carrowmont-qa` - always last

After merge:

1. confirm Pages;
2. run Automated QA;
3. run Multi-Repo Guard;
4. take a fresh Source Snapshot;
5. perform indexing steps.

---

# 64. Specification approval and baseline rule

This document is the specification step only.

Production coding must not start from Snapshot 47 immediately after this draft.

Required sequence:

1. owner reviews/approves this MDC1A specification;
2. commit the approved specification to `draw004.github.io/docs/`;
3. confirm the spec-only release is green;
4. take a **fresh post-spec Source Snapshot**;
5. build MDC1A production code only from that newer clean snapshot.

Snapshot 47 remains the design baseline for this draft, not the eventual production-code baseline after the specification commit.

---

# 65. Out of scope for MDC1A V1

- refinance / balance-transfer calculations;
- mortgage-rate shock / budget stress;
- Budget receiver-schema change;
- live lender marketplace;
- lender product ranking;
- investment-product selection;
- live stock/fund/index return data;
- historical-return simulator;
- Monte Carlo investment returns;
- automatic country tax engine;
- automatic mortgage-interest tax-deduction engine;
- automatic lender penalty calculation;
- offset-account modeling;
- redraw-account modeling;
- variable-rate path modeling;
- home-value forecast;
- lender eligibility / DTI / approval scoring;
- user accounts or server-side financial-data storage;
- country-specific duplicate pages;
- new homepage core-tool cards;
- changes to the seven-core-tool report registry;
- SEO3E production work.

---

# 66. Definition of done - specification

This specification is ready for owner approval when it clearly defines:

- exact release scope;
- exact canonical routes;
- equal-cash-flow methodology;
- common horizon;
- break-even solver behavior;
- fee treatment;
- optional current-payment treatment;
- result object source of truth;
- profile/state/privacy behavior;
- localized terminology;
- Learn and discovery plan;
- report scope;
- QA invariants;
- repository scope;
- merge/release sequence;
- out-of-scope boundaries.

No production code is implied by approval of the specification itself.

---

# 67. Definition of done - future MDC1A implementation

MDC1A production is done only when:

1. Decision Centre hub is live and stable.
2. Prepay-vs-Invest tool is live at the approved canonical URL.
3. Equal-cash-flow invariant is proven by deterministic fixtures.
4. Break-even result is stable and never fabricated when no root exists.
5. Existing Mortgage / Home Loan calculator remains parity-clean.
6. Explicit local profile reuse works without silent overwrite.
7. New Learn article is live with bidirectional Tool <-> Learn paths.
8. All new URLs are in sitemap with correct canonical metadata.
9. Copy Summary and actual PDF report reconcile with the result object.
10. Desktop, 390px and 360px are overflow-safe.
11. Pages, Automated QA and Multi-Repo Guard are green.
12. Fresh post-release Source Snapshot is taken.
13. Indexing actions are completed.

---

# 68. Final product principle

MDC1A should not tell a user whether to invest or prepay.

It should make the trade-off mathematically fair and understandable:

> **Use the same planned cash, compare both choices to the same mortgage horizon, show the return required for the investing path to catch up, and let the user decide with full visibility into uncertainty and charges.**

That principle is the acceptance test for every product, copy and calculation choice in MDC1A.
