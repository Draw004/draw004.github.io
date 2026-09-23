# CARROWMONT ARCHITECTURE

## 1. Purpose of This Document

This document explains the current Carrowmont product architecture, how the existing financial tools relate to one another, which standards should be shared across tools, and how future tools should be added.

It is intended for developers, contractors, maintainers, and technical partners who may work on Carrowmont in the future.

Before making major product, UI, localization, reporting, or infrastructure changes, a developer should read this document together with:

`docs/CARROWMONT_GITHUB_AUTOMATION_HANDOVER.md`

The handover document explains the GitHub automation, QA workflows, token setup, and repository access. This document explains the product itself.

---

# 2. Current Carrowmont Ecosystem

Carrowmont currently consists of a main website plus five primary financial planning tools.

## Main Website

Repository:

`Draw004/draw004.github.io`

Purpose:

- main Carrowmont landing site
- navigation between tools
- central brand presentation
- shared informational content
- central GitHub automation controller
- sitemap / SEO entry point
- future shared country, currency, and planning preferences

## Current Tools

### SIP Calculator

Repository:

`Draw004/sip-calculator`

Purpose:

- estimate future value of recurring investments
- support periodic investment planning
- present contribution, return, and growth projections
- provide downloadable / copyable reporting

### Goal Planner

Repository:

`Draw004/goal-planner`

Purpose:

- calculate the amount required to reach a future financial goal
- connect future goal cost with inflation assumptions
- estimate required recurring savings / investments
- produce a structured goal-planning report

### Financial Independence

Repository:

`Draw004/financial-independence`

Purpose:

- estimate the capital required to support financial independence
- model income, savings, expected returns, and future spending
- show long-term wealth trajectory
- produce a Financial Independence Report

### Inflation Calculator

Repository:

`Draw004/inflation-calculator`

Purpose:

- estimate how the purchasing power or future cost of money changes over time
- support country/currency-sensitive results
- provide simple inflation comparison without unnecessary complexity

### Retirement Calculator

Repository:

`Draw004/retirement-calculator`

Purpose:

- estimate required retirement corpus
- compare current savings with expected future retirement needs
- account for inflation and investment growth
- estimate retirement value at the user's selected retirement age
- produce a Retirement Report

---

# 3. Supporting QA Repository

Repository:

`Draw004/carrowmont-qa`

Purpose:

- central source-contract testing
- consistency checks across tools
- shared standards enforcement
- smoke tests
- future cross-tool localization / reporting / UI validation

The QA repository should be treated as an important part of the Carrowmont architecture, not merely a testing utility.

Whenever a shared product rule changes, QA should normally be updated at the same time.

---

# 4. Architectural Principle

Carrowmont should behave as one financial planning ecosystem rather than five unrelated calculators.

The desired structure is:

```text
Carrowmont
   |
   +-- SIP Calculator
   +-- Goal Planner
   +-- Financial Independence
   +-- Inflation Calculator
   +-- Retirement Calculator
   +-- Future Tools
```

Users should experience:

- consistent visual language
- consistent country/currency behavior
- consistent terminology
- consistent reporting
- consistent capitalization
- consistent methodology references
- predictable navigation
- shared cross-tool recommendations

The goal is for users to feel that every calculator is part of the same product.

---

# 5. Shared Product Standards

The following areas should be standardized across all Carrowmont tools whenever practical.

## Branding

Every tool should use consistent:

- Carrowmont naming
- page structure
- typography
- spacing
- button style
- report style
- terminology
- country selector behavior
- currency presentation
- footer / navigation behavior

Tool-specific identity is acceptable, but not at the cost of ecosystem consistency.

---

# 6. Country and Currency Architecture

Carrowmont is intended to be country-sensitive.

Country selection should influence at least:

- default currency
- currency symbol
- currency code
- number formatting
- terminology where appropriate
- pay-frequency defaults in the future
- methodology notes where regulations / conventions differ

Country selection should not unnecessarily lock the user into a single assumption.

For example:

A user choosing United States may receive a suggested biweekly pay cycle, but they should still be able to choose weekly, semi-monthly, or monthly.

A user choosing India may receive monthly as the default pay cycle, but should still be able to select weekly or fortnightly if that matches their actual employment.

Country behavior should therefore be:

```text
Country -> sensible default -> user can override
```

not:

```text
Country -> forced assumption
```

---

## 6A. Complete Country-Profile Rule

A country must be implemented as a complete product profile rather than as a dropdown label only. At minimum, the profile should account for:

- locale / number formatting
- default currency and currency sign/display
- country-sensitive terminology
- suggested frequency where the tool uses frequency
- two-week wording (`Biweekly`, `Fortnightly`, or `Every 2 Weeks`)

The UI should keep country lists alphabetized for easier scanning on small screens, with `Other / International` at the end.

---

# 7. Currency Rules

Each supported country should map to a default currency.

Examples:

```text
India -> INR
United States -> USD
United Kingdom -> GBP
Canada -> CAD
Australia -> AUD
New Zealand -> NZD
Singapore -> SGD
UAE -> AED
```

Where a country may commonly use more than one currency in practice, Carrowmont should still provide one default but allow the user to change currency where relevant.

Formatting should follow consistent rules.

Examples:

```text
₹10,00,000
$100,000
£100,000
A$100,000
C$100,000
```

Developers should avoid hard-coding currency symbols directly into calculation logic.

Currency should be treated as configuration / localization data.

---

# 8. Localization Architecture

Localization should eventually include more than currency.

Potential localization dimensions:

- currency
- number format
- date format
- pay-frequency terminology
- financial terminology
- country-specific examples
- inflation assumptions / labels
- retirement conventions
- localized report wording

Example terminology differences:

United States / Canada:

`Biweekly`

Australia / New Zealand / United Kingdom / Ireland:

`Fortnightly`

Both may represent 26 pay periods per year, but the label should feel natural to the user.

---

# 9. Planned Pay-Frequency Architecture

Carrowmont should introduce a shared pay-frequency standard before building a dedicated Pay Cycle tool.

Recommended internal standard:

| Frequency | Periods per year |
|---|---:|
| Weekly | 52 |
| Biweekly / Fortnightly | 26 |
| Semi-monthly / Twice monthly | 24 |
| Every 4 weeks | 13 |
| Monthly | 12 |
| Annually | 1 |

Important:

`Biweekly/Fortnightly` and `Semi-monthly` are not the same.

Biweekly:

```text
26 normal pay periods per year
```

Semi-monthly:

```text
24 pay periods per year
```

These should never be treated as interchangeable.

---

## 9A. Core Frequency Separation Rule

Carrowmont must not treat pay frequency and saving/investment frequency as the same data point.

```text
Pay Frequency = how often income is received
Contribution Frequency = how often money is saved or invested
```

Example:

```text
Paid: Every 2 Weeks
Invests: Monthly
```

This is valid and should be fully supported.

Where a tool needs both concepts, keep them as separate fields and separate stored preferences. They may be linked only through an explicit user choice such as `Same as my pay cycle`.

Tool implications:

- SIP Calculator: Contribution Frequency only.
- Goal Planner: Savings / Contribution Frequency; optional future `Same as my pay cycle`.
- Financial Independence: Income Frequency and Savings / Investment Frequency as independent fields.
- Retirement Planner: Pay Frequency and Retirement Contribution Frequency may both be relevant and should remain independent.
- Pay Cycle Budget Planner: Pay Frequency is a primary input; savings/investment allocations can use their own cadence.
- Inflation Calculator: no required pay-frequency field.

Country may provide sensible starting suggestions, but a country selection must never imply that a user's actual pay frequency and contribution frequency are identical.

---

# 10. Suggested Country Pay-Cycle Defaults

These are intended as product defaults, not legal or universal statements.

| Country | Suggested Carrowmont default | Important alternatives |
|---|---|---|
| India | Monthly | Weekly, Fortnightly |
| United States | Biweekly | Weekly, Semi-monthly, Monthly |
| Canada | Biweekly | Weekly, Semi-monthly, Monthly |
| Australia | Fortnightly | Weekly, Monthly |
| New Zealand | Fortnightly | Weekly, 4-weekly, Monthly |
| United Kingdom | Monthly | Weekly, Fortnightly, 4-weekly |
| Ireland | Monthly | Weekly, Fortnightly, 4-weekly, Twice monthly |
| Philippines | Twice monthly | Biweekly |
| Singapore | Monthly | Other shorter periods |
| UAE | Monthly | Contract-specific |
| Saudi Arabia | Monthly for salaried users | Weekly for some daily-rated workers |
| France | Monthly | Limited alternatives |
| Germany | Monthly | Contract-specific |
| Netherlands | Monthly | 4-weekly, Weekly |
| Switzerland | Monthly | Contract-specific |
| Spain | Monthly | Other legal arrangements |
| China | Monthly | — |
| Japan | Monthly | — |
| South Korea | Monthly | — |
| Malaysia | Monthly | Shorter periods |
| Brazil | Monthly | Employer-specific advance arrangements |
| South Africa | Monthly | Weekly, Fortnightly |

Future developers should verify current legal / payroll rules before presenting country-specific statements as legal requirements.

---

# 11. How Pay Frequency Should Affect Existing Tools

## SIP Calculator

Add:

`Contribution Frequency`

Recommended choices:

- Weekly
- Fortnightly / Biweekly
- Semi-monthly
- Every 4 weeks
- Monthly

Potential option:

`Match my pay cycle`

The internal investment model should convert contributions consistently rather than relying only on monthly assumptions.

---

## Goal Planner

Support:

`Amount saved per pay period`

The tool should be able to express results such as:

```text
You need to save $385 every two weeks.
```

instead of forcing every result into monthly terms.

---

## Financial Independence

Income frequency and investment / savings frequency should be independent fields.

Example:

```text
Income Frequency: Biweekly
Investment Frequency: Monthly
```

This matters because people may be paid every two weeks but invest once per month.

---

## Retirement Calculator

Support retirement contributions per pay cycle.

Potential future fields:

- contribution per paycheck
- employer contribution
- employer match
- annual contribution increase
- retirement contribution frequency

These should not be added until the core pay-frequency architecture is stable.

---

## Inflation Calculator

Keep the Inflation Calculator simple.

Inflation itself does not require a pay-frequency input.

Potential later enhancement:

```text
Equivalent weekly cost
Equivalent fortnightly cost
Equivalent monthly cost
```

This should be output-only unless user demand justifies more complexity.

---

# 12. Future Pay Cycle Budget Planner

Proposed tool:

`Pay Cycle Budget Planner`

Potential repository:

`Draw004/pay-cycle-planner`

Potential public path:

`/pay-cycle-planner/`

Primary purpose:

Help users budget according to how they actually receive income.

Suggested inputs:

- country
- currency
- pay frequency
- take-home pay per payday
- next payday
- recurring bills
- monthly bills
- annual / irregular bills
- spending commitments
- savings goals
- emergency fund goal
- investment allocation

Suggested outputs:

- money received this payday
- bills due before next payday
- amount reserved for future monthly / annual bills
- safe spending amount
- daily spending allowance
- emergency fund contribution
- investment contribution
- amount remaining until next payday
- next payday date

For biweekly users, it may also identify months containing three paychecks.

---

# 13. Cross-Tool Integration

Future Carrowmont tools should increasingly connect with one another.

Example:

```text
Pay Cycle Budget Planner
        |
        +-- Invest this amount -> SIP Calculator
        +-- Use for goal -> Goal Planner
        +-- Add to retirement -> Retirement Calculator
        +-- Evaluate FI impact -> Financial Independence
```

Similarly:

Goal Planner may link to SIP Calculator.

Retirement Calculator may link to Financial Independence.

Inflation Calculator may help explain future cost assumptions used elsewhere.

This should be done carefully so users are guided, not overwhelmed.

---

# 14. Shared User Preferences

Longer-term, Carrowmont should consider a shared preference layer.

Possible shared settings:

- country
- currency
- pay frequency
- preferred terminology
- inflation preference
- theme
- report language

A user should not ideally have to choose the same country and currency every time they move between tools.

This could initially be implemented using browser storage before introducing any account system.

---

# 15. Reports and PDF Standards

Reports are an important Carrowmont feature.

A report should look deliberate and professional rather than like a raw webpage printout.

Shared standards should include:

- consistent Carrowmont heading
- tool name
- date generated
- country
- currency
- user assumptions
- calculated results
- methodology summary
- disclaimers
- links / references to related Carrowmont tools
- consistent typography
- consistent margins
- consistent page alignment
- consistent footer behavior

Buttons should follow consistent capitalization.

Preferred examples:

```text
Generate Retirement Report
Generate Inflation Report
Generate Financial Independence Report
Copy Summary
```

Avoid inconsistent variants such as:

```text
generate inflation report
Copy summary
View Methodology
```

when the intended product standard uses title-style capitalization.

---

# 16. Report Ecosystem

Where appropriate, reports should introduce users to other relevant Carrowmont tools.

Example section:

```text
Continue Your Planning With Carrowmont

SIP Calculator
Goal Planner
Financial Independence
Inflation Calculator
Retirement Calculator
```

Each item may contain a short description.

This should be helpful and restrained, not promotional clutter.

---

# 17. Methodology Versioning

Each tool should have a clearly defined methodology version.

Example:

```text
Methodology Version 2.2.5
```

If a tool displays a methodology version in multiple places, those values should come from one shared source where practical.

Avoid situations where:

- page displays 2.2.5
- methodology link displays 2.2.3
- report displays another value

QA should detect mismatched methodology versions where possible.

---

# 18. Methodology Links

Links such as:

`See how the math works`

should route to the correct current methodology.

A methodology page should explain:

- formulas
- assumptions
- compounding
- inflation logic
- limitations
- methodology version
- date / revision notes where useful

The methodology should describe the calculation without exposing implementation details that are unnecessary for users.

---

# 19. UI Consistency

Shared UI behavior should include:

- consistent tool headers
- consistent back navigation
- consistent country / currency control
- consistent button sizes
- consistent capitalization
- consistent spacing
- consistent report actions
- consistent responsive behavior
- consistent mobile treatment
- consistent desktop alignment

Browser differences should be tested, especially:

- Chrome
- Edge
- Safari
- mobile browsers

If Chrome and Edge render a page differently, developers should investigate CSS / viewport behavior before assuming it is purely a browser issue.

---

# 20. Main Homepage Standards

The main Carrowmont site should act as the central discovery layer.

Each tool card should include:

- tool name
- concise description
- clear benefit
- direct link
- consistent visual treatment

The homepage should make it obvious that Carrowmont is a financial planning ecosystem.

Future tools should be added only when they create meaningful new user value.

---

# 21. SEO Architecture

Each tool should have:

- unique title
- unique meta description
- canonical URL
- structured heading hierarchy
- indexable content
- clear internal links
- sitemap inclusion

Avoid duplicate pages created solely for minor variations such as:

```text
Weekly Retirement Calculator
Monthly Retirement Calculator
Biweekly Retirement Calculator
```

where one flexible calculator can serve all three needs.

That prevents unnecessary duplication and SEO fragmentation.

---

# 22. Sitemap

The main sitemap should include all intended public/indexable Carrowmont URLs.

When a new tool is launched:

1. publish it
2. verify the production URL
3. add it to the sitemap
4. verify sitemap validity
5. confirm discovery in Google Search Console
6. confirm discovery in Bing Webmaster Tools

Discovery does not automatically mean indexing.

---

# 23. Search Engine Status

Google and Bing discovery / indexing should be treated as a parallel process.

Development does not need to stop while search engines index existing pages.

Carrowmont should continue improving the product while indexing progresses.

Developers should avoid repeatedly changing URLs or sitemap structure unnecessarily during this period.

---

# 24. QA Expectations

Shared standards should be validated through `carrowmont-qa`.

A feature should not be considered complete merely because it looks correct in one repository.

For shared changes:

```text
Change implementation
        ↓
Update QA contract
        ↓
Run tool-specific tests
        ↓
Run multi-repo dry run
        ↓
Review results
        ↓
PR / merge
        ↓
Confirm multi-repo guard remains green
```

---

# 25. Production Change Model

The preferred model for future automated updates is:

```text
Requested change
      ↓
Dedicated branch
      ↓
Implement change
      ↓
QA
      ↓
Pull Request
      ↓
Human review
      ↓
Merge
```

Avoid automatic direct changes to `main` for broad multi-tool modifications.

---

# 26. Adding a New Tool

When a new calculator or planner is created, developers should review all of the following.

## Product

- Is this genuinely a new user need?
- Can an existing tool be extended instead?
- Does it fit the Carrowmont financial planning ecosystem?

## Repository

- create repository
- use consistent naming
- configure Pages / deployment
- add README
- add required testing

## Main Website

- add tool card
- add navigation
- add internal links
- update any related tool recommendations

## Country / Currency

- implement shared country logic
- implement supported currencies
- apply shared localization conventions

## Reports

- follow shared reporting standard
- use consistent button naming
- include methodology / assumptions
- include relevant cross-tool links

## QA

- add repository to central automation if appropriate
- add tool to source-contract checking
- add smoke tests
- update access-check workflow where needed

## SEO

- create canonical URL
- metadata
- sitemap
- indexing checks

---

# 27. When NOT to Create a New Tool

Do not create a new repository / calculator solely because one input varies.

Examples:

Do not create:

```text
Weekly SIP Calculator
Biweekly SIP Calculator
Monthly SIP Calculator
```

if a single SIP Calculator can support contribution frequency.

Do not create:

```text
US Retirement Calculator
India Retirement Calculator
UK Retirement Calculator
```

unless country-specific calculations truly require materially different logic.

Prefer:

```text
one flexible tool + country configuration
```

where practical.

---

# 28. Data and Calculation Separation

Calculation logic should be separated from:

- labels
- currency symbols
- UI formatting
- country defaults
- report wording

Recommended conceptual model:

```text
User Input
   ↓
Normalization
   ↓
Calculation Engine
   ↓
Result Object
   ↓
UI / Report / Localization
```

This makes testing and future localization easier.

---

# 29. Country Configuration Layer

Longer-term, consider a shared country configuration structure.

Conceptual example:

```text
country
currency
currencySymbol
locale
defaultPayFrequency
payFrequencyLabel
dateFormat
numberFormat
supportedPayFrequencies
```

Example:

```text
US
USD
$
en-US
biweekly
Biweekly
MM/DD/YYYY
1,234.56
weekly, biweekly, semimonthly, monthly
```

This should be configuration-driven rather than duplicated across every calculator.

---

# 30. Shared Components

As Carrowmont grows, consider centralizing reusable UI / logic components.

Potential shared components:

- country selector
- currency selector
- pay-frequency selector
- report header
- report footer
- methodology link
- navigation
- tool cross-links
- disclaimer
- number formatter

Centralization should reduce duplication but must not introduce unnecessary build complexity before the product requires it.

---

# 31. Shared Calculation Utilities

Potential shared utilities:

- periodic contribution conversion
- annualization
- inflation adjustment
- compounding
- date / pay-cycle calculations
- currency formatting
- percentage formatting

Shared utilities should have independent tests.

---

# 32. Pay-Frequency Conversion Rules

Any pay-frequency implementation should explicitly define conversion behavior.

Suggested normal annual multipliers:

```text
Weekly = 52
Biweekly / Fortnightly = 26
Semi-monthly = 24
Every 4 weeks = 13
Monthly = 12
Annual = 1
```

Do not convert everything by simply multiplying monthly values by 12 and dividing.

For investment projections, contribution timing may materially affect compounding.

The calculation method should match the tool's intended methodology.

---

# 33. Special Pay-Cycle Cases

Future Pay Cycle Planner logic may need to handle:

- 53-week years
- 27-paycheck biweekly years
- leap years
- payday falling on weekends / holidays
- first / last pay period
- irregular income
- variable commission
- bonuses

These should not be introduced into existing tools until needed.

---

# 34. Financial Disclaimer

Carrowmont tools should consistently communicate that outputs are estimates for planning / educational purposes.

The site should avoid implying:

- guaranteed returns
- guaranteed investment outcomes
- individualized regulated financial advice
- guaranteed inflation projections

Disclaimers should remain concise and user-friendly.

---

# 35. Accessibility

Future development should maintain:

- keyboard usability
- readable font sizes
- sufficient contrast
- descriptive labels
- clear form validation
- responsive layouts
- understandable error messages

Accessibility should be included in QA over time.

---

# 36. Performance

As traffic grows, monitor:

- page load time
- JavaScript bundle size
- image size
- report generation time
- third-party dependencies
- deployment reliability

Financial calculators generally do not require heavy infrastructure.

Keep the site lightweight unless user demand justifies more complexity.

---

# 37. Privacy

Carrowmont should minimize collection of personal financial information unless it is necessary.

Where possible, calculations should run locally in the browser.

Future account / cloud features should clearly define:

- what is stored
- why it is stored
- how users delete it
- retention rules
- security expectations

---

# 38. Analytics

Future analytics may measure:

- calculator starts
- calculator completions
- report generation
- country distribution
- tool-to-tool navigation
- popular pay frequencies
- most-used tools

Avoid collecting unnecessary sensitive financial inputs.

Aggregated product analytics are preferable.

---

# 39. Future Product Direction

The current architecture naturally supports expansion into a broader planning ecosystem.

Potential future areas:

- Pay Cycle Budget Planner
- Emergency Fund Calculator
- Debt Payoff Planner
- Mortgage Affordability / Repayment Planner
- Education Goal Planner
- Net Worth Tracker
- Savings Rate Calculator
- Investment Contribution Planner
- Coast FI Calculator
- FIRE variants
- withdrawal / retirement income planner

Each proposed tool should be evaluated against:

- user value
- overlap with existing tools
- SEO opportunity
- complexity
- international applicability
- maintenance burden

---

# 40. Near-Term Recommended Roadmap

Recommended sequence:

## Phase 1

Keep current five tools stable.

Allow Google / Bing indexing to continue.

Maintain daily QA Guard.

## Phase 2

Introduce shared pay-frequency architecture.

Update:

- SIP Calculator
- Goal Planner
- Financial Independence
- Retirement Calculator

Keep Inflation Calculator mostly unchanged.

## Phase 3

Expand QA contracts to validate pay-frequency standards.

## Phase 4

Build Pay Cycle Budget Planner.

## Phase 5

Integrate the new tool with the existing Carrowmont ecosystem.

## Phase 6

Review analytics and real user behavior before selecting the next major calculator.

---

# 41. Developer Checklist Before a Shared Change

Before implementing a shared change:

- understand whether the requirement applies to all tools
- identify the source of truth
- avoid duplicated hard-coded values
- update tests
- test country behavior
- test currency behavior
- test mobile
- test Chrome / Edge
- verify reports
- run multi-repo QA
- use PR-based change process where practical

---

# 42. Developer Checklist After a Shared Change

After implementation:

- verify affected tools
- verify main homepage links
- verify methodology version
- verify report behavior
- verify copy / capitalization
- run smoke tests
- run multi-repo dry run
- verify daily Guard remains green
- check sitemap if URLs changed
- check Search Console / Bing if public URLs changed

---

# 43. Source-of-Truth Principle

Where possible, each shared concept should have one clear source of truth.

Examples:

```text
Methodology version -> one defined constant
Country defaults -> one configuration source
Pay-frequency definitions -> one shared standard
Report button wording -> one documented contract
Tool list -> one maintained registry where practical
```

Avoid multiple independent copies of the same information.

---

# 44. Current Architectural Status

| Area | Status |
|---|---|
| Main website | Active |
| SIP Calculator | Active |
| Goal Planner | Active |
| Financial Independence | Active |
| Inflation Calculator | Active |
| Retirement Calculator | Active |
| Central QA repository | Active |
| Multi-repo access automation | Active |
| Daily QA Guard | Active |
| PR automation capability | Tested |
| Generic automatic updater | Not yet deployed |
| Country/currency support | Active / evolving |
| Pay-frequency layer | Planned |
| Pay Cycle Budget Planner | Planned |
| Shared user preferences | Future |
| Account system | Not currently required |

---

# 45. Final Principle

Carrowmont should grow by making financial planning easier, more connected, and more locally relevant.

The architecture should favor:

```text
simple
consistent
international
testable
safe
maintainable
```

over unnecessary complexity.

A future developer should preserve the user-facing simplicity even as the internal system becomes more sophisticated.

---

## Related Documentation

GitHub automation and infrastructure:

`docs/CARROWMONT_GITHUB_AUTOMATION_HANDOVER.md`

Product / architecture:

`docs/CARROWMONT_ARCHITECTURE.md`

Both documents should be reviewed when onboarding a future developer.
