# CARROWMONT PAY-FREQUENCY STANDARD

## Status

Planned shared product standard for Carrowmont.

This document defines how weekly, fortnightly/biweekly, semi-monthly, four-weekly, monthly, and annual frequencies should behave across Carrowmont.

It should be read together with:

- `docs/CARROWMONT_ARCHITECTURE.md`
- `docs/CARROWMONT_GITHUB_AUTOMATION_HANDOVER.md`

---

## 1. Objective

Carrowmont should not assume that every user is paid or saves monthly.

The product should support common global pay and contribution cycles while keeping one consistent calculation and UX standard across all tools.

The initial rollout should affect:

- SIP Calculator
- Goal Planner
- Financial Independence
- Retirement Calculator

The Inflation Calculator should remain simple and should not gain a required pay-frequency input.

---

## 1A. Core Separation Rule — Pay Frequency vs Contribution Frequency

Carrowmont must treat these as two separate concepts:

- **Pay Frequency** = how often income is received.
- **Contribution Frequency** = how often money is saved or invested.

They may be the same, but the product must never assume that they are the same.

Example:

```text
Pay Frequency: Biweekly (Every 2 Weeks)
Contribution Frequency: Monthly
```

Where both fields are relevant, they should remain independent by default. A tool may offer an explicit convenience option such as:

`Same as my pay cycle`

Only that explicit user choice should link the two frequencies.

Changing one frequency must not silently change the other unless the user has chosen that link.

For the SIP Calculator, only **Contribution Frequency** is required because the tool models investments rather than salary receipts. Future income/cash-flow tools may use **Pay Frequency** separately.

---

## 2. Canonical Frequency IDs

Use stable internal IDs. Do not use translated or country-specific labels as calculation keys.

| Internal ID | Standard meaning | Normal periods/year |
|---|---|---:|
| `weekly` | Once every week | 52 |
| `biweekly` | Once every 2 weeks / fortnightly | 26 |
| `semimonthly` | Twice per calendar month | 24 |
| `fourweekly` | Once every 4 weeks | 13 |
| `monthly` | Once per month | 12 |
| `annual` | Once per year | 1 |

Important:

`biweekly` and `semimonthly` are different and must never be treated as the same frequency.

---

## 3. User-Facing Labels

The internal ID remains the same, but the label may vary by country.

### United States / Canada

- Weekly
- Biweekly (Every 2 Weeks)
- Twice Monthly / Semi-monthly
- Every 4 Weeks
- Monthly

### United Kingdom / Ireland / Australia / New Zealand

- Weekly
- Fortnightly (Every 2 Weeks)
- Twice Monthly
- Every 4 Weeks
- Monthly

### Other markets

Use internationally understandable wording:

- Weekly
- Every 2 Weeks
- Twice Monthly
- Every 4 Weeks
- Monthly

Do not create separate mathematical definitions for "Biweekly" and "Fortnightly". They are two labels for the same canonical `biweekly` frequency.

---

## 4. Country Defaults

Country should suggest a frequency, not force one.

Recommended product defaults:

| Country | Suggested default |
|---|---|
| India | Monthly |
| United States | Biweekly |
| Canada | Biweekly |
| Australia | Fortnightly / `biweekly` |
| New Zealand | Fortnightly / `biweekly` |
| United Kingdom | Monthly |
| Ireland | Monthly |
| Philippines | Twice Monthly / `semimonthly` |
| Singapore | Monthly |
| UAE | Monthly |
| Saudi Arabia | Monthly |
| France | Monthly |
| Germany | Monthly |
| Netherlands | Monthly |
| Switzerland | Monthly |
| Spain | Monthly |
| China | Monthly |
| Japan | Monthly |
| South Korea | Monthly |
| Malaysia | Monthly |
| Brazil | Monthly |
| South Africa | Monthly |

These are Carrowmont UX defaults, not statements that every worker in that country is paid that way.

Country-specific payroll practices should be reviewed periodically before expanding the list.

---

## 4A. Complete Country Profile Rule

When a country is added to a Carrowmont tool, do not add only the country name. The profile should define together:

- country / region code
- user-facing country name
- locale used for number and currency formatting
- default currency code
- currency symbol or unambiguous currency display
- suggested contribution frequency for investment tools, where applicable
- user-facing two-week terminology (`Biweekly`, `Fortnightly`, or neutral `Every 2 Weeks`)
- international vs country-specific investment terminology

Currency formatting should use locale-aware formatting rather than assuming one global symbol placement or thousands separator. Ambiguous symbols should always remain clear from the selected country/currency context.

The first SIP expansion batch includes Austria, Bangladesh, Belgium, Chile, Denmark, Finland, Ireland, Netherlands, Norway, Oman, Poland, Portugal, Qatar, and Sweden.

---

## 5. Country Change Behaviour

When the user first enters a tool:

1. Resolve country.
2. Suggest the country's default pay/contribution frequency.
3. Show the selected value clearly.
4. Allow the user to change it.

If the user manually changes frequency, that choice becomes the user's preference.

After a manual override, changing country should not silently overwrite the user's frequency unless the user explicitly asks to reset to country defaults.

Recommended logic:

```text
No user override:
Country change -> update suggested frequency

User has manually selected frequency:
Country change -> preserve selected frequency
```

---

## 6. Shared Preference Behaviour

Longer term, Carrowmont should remember:

- country
- currency
- preferred pay frequency

Recommended conceptual preference object:

```json
{
  "country": "US",
  "currency": "USD",
  "payFrequency": "biweekly",
  "payFrequencyUserOverride": true
}
```

Use one versioned storage key where technically practical, for example:

`carrowmont.preferences.v1`

Before implementing cross-tool browser storage, confirm that all production tools share a compatible origin/domain.

---

## 7. Calculation Principle

The frequency selector must affect calculations, not merely wording.

However, existing monthly results must not unexpectedly change when pay-frequency support is introduced.

Therefore:

1. Establish regression tests for current monthly results before modifying the calculation engine.
2. Preserve current monthly results within the accepted rounding tolerance.
3. Add non-monthly frequency calculations using the same annual-return convention used by the existing tool methodology.
4. Document any methodology change and increment the methodology version when required.
5. Do not silently substitute a different compounding convention.

The exact periodic-rate formula must be chosen after inspecting each tool's current methodology and calculation code.

---

## 8. SIP Calculator

### Input

Add:

`Contribution Frequency`

Supported values:

- Weekly
- Biweekly / Fortnightly
- Twice Monthly / Semi-monthly
- Every 4 Weeks
- Monthly

Optional UX shortcut:

`Match My Pay Cycle`

### Behaviour

The user's recurring contribution should be applied at the selected frequency.

The result/report should state both:

- contribution amount
- contribution frequency

Example:

`Contribution: $250 every 2 weeks`

### Regression requirement

Existing monthly SIP calculations must continue to produce the same result within the existing rounding rules.

---

## 9. Goal Planner

### Input / Result

Allow a goal contribution to be expressed per selected savings frequency.

Examples:

- `₹12,000 per month`
- `$385 every 2 weeks`
- `£180 per week`

### Behaviour

The planner should calculate the recurring amount required at the selected frequency to reach the goal.

The report should not convert everything back to monthly unless monthly is the user's selected frequency.

---

## 10. Financial Independence

Financial Independence may need two separate concepts:

### Income Frequency

How often income is received.

### Savings / Investment Frequency

How often the user contributes toward investments.

These must be allowed to differ.

Example:

```text
Income Frequency: Biweekly
Investment Frequency: Monthly
```

Do not assume that a user invests every time they are paid.

---

## 11. Retirement Calculator

Add:

`Contribution Frequency`

Potential later enhancements:

- contribution per paycheck
- employer contribution
- employer match
- contribution increase over time

Do not add employer matching during the first pay-frequency rollout unless it is separately specified and tested.

---

## 12. Inflation Calculator

Do not add a required pay-frequency field.

Inflation is not inherently dependent on payroll frequency.

A later optional result section may show:

- equivalent weekly cost
- equivalent fortnightly cost
- equivalent monthly cost

This should remain output-only unless user demand supports more complexity.

---

## 13. Report Standard

Where frequency affects the calculation, the generated report must include it.

Example:

```text
Country: United States
Currency: USD
Contribution Frequency: Biweekly (Every 2 Weeks)
Contribution: $250 per pay period
```

Reports should use the same country-sensitive label shown in the calculator UI.

---

## 14. Copy Summary Standard

`Copy Summary` should include frequency whenever it materially affects the result.

Example:

```text
Planned contribution: $250 every 2 weeks
Expected annual contribution: $6,500
```

Do not display a monthly equivalent as the primary amount unless the user selected monthly.

---

## 15. Annualization

For display and comparison, normal annual contribution values may use:

```text
weekly      amount × 52
biweekly    amount × 26
semimonthly amount × 24
fourweekly  amount × 13
monthly     amount × 12
annual      amount × 1
```

This does not automatically define the investment-compounding formula.

Contribution timing and investment growth must follow the tool methodology.

---

## 16. Terminology Rules

Use:

`Biweekly (Every 2 Weeks)` in markets where "biweekly" is familiar.

Use:

`Fortnightly (Every 2 Weeks)` in markets where "fortnightly" is familiar.

Avoid displaying only:

`Biweekly`

internationally because the term can be misunderstood.

Always make the meaning clear at least once in the selector/help text.

---

## 17. Accessibility

The frequency field must have:

- a visible label
- keyboard access
- meaningful option text
- programmatic form labeling
- no reliance on flag icons alone
- a clear explanation of "Twice Monthly" versus "Every 2 Weeks"

Recommended helper text:

`Every 2 weeks normally means 26 contributions a year; twice monthly means 24.`

---

## 18. QA Contract Requirements

The central QA suite should eventually verify:

1. All supported tools use the same canonical IDs.
2. `weekly = 52`.
3. `biweekly = 26`.
4. `semimonthly = 24`.
5. `fourweekly = 13`.
6. `monthly = 12`.
7. `Biweekly` and `Fortnightly` map to the same internal frequency.
8. `Biweekly` and `Semi-monthly` do not map to the same frequency.
9. Existing monthly calculation regression fixtures still pass.
10. Country defaults resolve correctly.
11. Manual user overrides are not unexpectedly replaced.
12. Reports include frequency where it affects calculations.
13. Copy Summary includes frequency where applicable.
14. Inflation Calculator does not gain an unnecessary required frequency field.

---

## 19. Test Fixtures

At minimum, create fixed examples for:

### Monthly regression

A known current monthly input/result combination from each affected tool.

### Weekly

A fixed contribution and annual return.

### Biweekly / Fortnightly

Same mathematical fixture under both labels; results must match.

### Semi-monthly

Must produce a different contribution count from biweekly.

### Country default

Examples:

```text
India -> monthly
United States -> biweekly
Australia -> biweekly, displayed as Fortnightly
Philippines -> semimonthly
```

---

## 20. Rollout Order

Do not change all tools simultaneously on the first implementation.

Recommended rollout:

### Pilot 1 — SIP Calculator

Implement the shared standard in SIP first.

Validate:

- UI
- country default
- calculation
- report
- Copy Summary
- monthly regression
- mobile layout
- QA

### Pilot 2 — Goal Planner

Reuse the validated standard.

### Pilot 3 — Financial Independence

Add separate income and investment frequency only if required by the design.

### Pilot 4 — Retirement Calculator

Add contribution frequency.

### Final

Update central QA to enforce the completed standard across all affected tools.

---

## 21. Pull Request Rule

Each rollout should use:

```text
feature branch
-> tests
-> pull request
-> review
-> merge
```

Do not automatically push multi-tool pay-frequency changes directly to `main`.

---

## 22. Methodology Versioning

If the frequency implementation changes calculation timing, compounding, or the interpretation of annual return, update the tool's methodology version.

The displayed methodology version, methodology page, and generated report must remain synchronized.

---

## 23. Future Pay Cycle Budget Planner

Only after the shared frequency layer is proven should Carrowmont build:

`Pay Cycle Budget Planner`

That future tool can reuse:

- country defaults
- frequency IDs
- localized frequency labels
- payday logic
- shared preferences
- currency formatting

The shared standard should therefore be treated as infrastructure for the future tool, not a one-off SIP feature.

---

## 24. Definition of Done

The pay-frequency foundation is considered ready when:

- SIP pilot is implemented and reviewed
- current monthly output remains regression-safe
- weekly calculations work
- biweekly/fortnightly calculations work
- semi-monthly calculations work
- four-weekly calculations work
- country defaults work
- user override behaviour works
- reports and Copy Summary use the correct frequency
- QA is green
- production deployment is verified on desktop and mobile

Only then should the same pattern be rolled out broadly.

---

## 25. Guiding Principle

Carrowmont should adapt to the user's real financial rhythm.

Country should provide a sensible starting point.

The user should remain in control.

The calculation engine should remain consistent, testable, and transparent.
