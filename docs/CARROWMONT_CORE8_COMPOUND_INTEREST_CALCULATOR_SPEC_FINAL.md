# CARROWMONT CORE8 — COMPOUND INTEREST CALCULATOR
## Final Product / Implementation Specification

**Status:** FINAL — approved direction, repository/bootstrap required before implementation release  
**Baseline for bootstrap:** Carrowmont Source Snapshot 71  
**Snapshot generated:** 2026-10-16T13:25:18Z  
**Controller baseline commit:** `5825d3d3745b913a1adc817d140c86ef706a2da0`  
**Central QA baseline commit:** `291b891aead83637b7904b2209884c9e74337e5c`

---

# 1. Product purpose

Create a global, no-login **Compound Interest Calculator** that answers a distinct high-intent search and planning need:

> How can an initial amount grow under a stated annual rate, compounding frequency and time horizon, with optional recurring additions?

The calculator must be educational and deterministic. It must not imply guaranteed investment returns.

The product is deliberately distinct from the existing SIP / Recurring Investment Calculator. The SIP tool is contribution-plan-first and supports goal/reverse-planning workflows. CORE8 is compounding-mechanics-first: it starts with principal, rate, time and compounding frequency, then optionally adds recurring contributions.

Search-demand rationale is directional rather than a traffic guarantee. Public datasets reviewed on 16 October 2026 consistently show strong demand for the exact compound-interest-calculator intent. Useful references include:

- https://ahrefs.com/blog/website-calculators/
- https://treendly.com/trend/compound-interest-calculator

---

# 2. Canonical product identity

Repository:

`Draw004/compound-interest-calculator`

Canonical production URL:

`https://carrowmont.com/compound-interest-calculator/`

Recommended title:

**Compound Interest Calculator | Carrowmont**

Recommended meta description:

**Calculate compound growth from a starting amount, annual rate and compounding frequency. Add optional regular contributions and compare growth over time.**

Recommended visible product label:

**Compound Interest Calculator**

Recommended H1:

**See how compounding can change your money over time.**

The page must be canonical, indexable, responsive, keyboard accessible and usable without JavaScript-dependent navigation.

---

# 3. CORE8 architecture change

After implementation is live and approved, the primary planning suite becomes eight tools:

1. Budget & Cash Flow Planner
2. SIP / Recurring Investment Calculator
3. Retirement Planner
4. Inflation Calculator
5. Goal Planner
6. Financial Independence Planner
7. Home Loan / Mortgage Prepayment & Early Payoff Calculator
8. Compound Interest Calculator

The shared **Continue planning with Carrowmont** report registry must then expand from seven to eight tools. Each core report removes the current tool and shows the other seven. The same `report-standard.js` must remain byte-identical across all eight core calculator repositories after the implementation release.

The calculator must participate in the existing same-origin plan-context contract where values are semantically compatible, while never silently overriding user-entered financial values.

---

# 4. V1 calculation scope

## 4.1 Required inputs

Simple Mode must expose only the inputs needed for the main question:

- Starting amount / principal
- Annual interest or growth rate (%)
- Time horizon (years)
- Compounding frequency

Supported compounding frequencies:

- Annually — 1/year
- Semi-annually — 2/year
- Quarterly — 4/year
- Monthly — 12/year
- Daily — 365/year

## 4.2 Optional regular contributions

A clearly optional contribution section must support:

- contribution amount
- contribution frequency
- contribution timing: end of period / beginning of period

Supported contribution frequencies should reuse the established Carrowmont frequency language where practical:

- Weekly — 52/year
- Every two weeks / fortnightly — 26/year
- Twice monthly — 24/year
- Every four weeks — 13/year
- Monthly — 12/year
- Quarterly — 4/year
- Annually — 1/year

Country terminology may say **fortnightly** or **biweekly** according to the established locale metadata. Contribution frequency is independent of compounding frequency.

## 4.3 Optional inflation context

Advanced assumptions may include an optional annual inflation rate. When present, show the ending value in today's purchasing-power terms. Do not make inflation mandatory and do not mix nominal and real values without an explicit label.

---

# 5. Calculation methodology

Let:

- `P` = starting principal
- `j` = nominal annual rate as a decimal
- `n` = compounding periods per year
- `t` = years
- `m` = contribution periods per year
- `C` = contribution per contribution period

## 5.1 Principal growth

For the initial principal:

`FV_principal = P × (1 + j/n)^(n×t)`

## 5.2 Effective annual rate

`EAR = (1 + j/n)^n - 1`

Display EAR as a derived result so users can see how the selected compounding frequency changes the effective annual growth rate.

## 5.3 Recurring-contribution growth

To keep contribution cadence independent from compounding cadence, derive the equivalent growth rate per contribution period from EAR:

`g = (1 + EAR)^(1/m) - 1`

For `N = m × t` contribution periods and end-of-period contributions:

`FV_contrib = C × ((1 + g)^N - 1) / g`

When `g = 0`, use:

`FV_contrib = C × N`

For beginning-of-period contributions:

`FV_contrib_due = FV_contrib × (1 + g)`

The methodology page/report must disclose that contributions are modeled as evenly spaced and use the periodic rate implied by the selected compounding frequency's effective annual rate.

## 5.4 Total ending value

`FV_total = FV_principal + FV_contrib`

## 5.5 Contributions and growth decomposition

Show separately:

- starting principal
- total recurring contributions
- total money contributed = principal + recurring contributions
- growth / interest earned = ending value - total money contributed

Never describe modeled investment return as guaranteed interest. UI copy should adapt between neutral **growth** language and interest-language examples where appropriate.

## 5.6 Simple-interest comparison

Provide an educational comparison, not a competing recommendation.

Initial principal under simple interest:

`P × (1 + j×t)`

For recurring contributions, calculate each scheduled contribution's remaining time and apply simple interest individually. The implementation may use a bounded deterministic loop.

Label the result **Simple-interest comparison** and explain that it is an illustration of the mathematical difference, not an alternate product quote.

## 5.7 Inflation-adjusted value

If annual inflation `i` is entered:

`real_FV = FV_total / (1 + i)^t`

Label this **Ending value in today's money** or equivalent.

---

# 6. Validation and boundaries

Recommended V1 bounds:

- principal: 0 to 1,000,000,000 in selected currency units
- annual rate: -20% to 50%
- time: 1 to 60 years
- contribution amount: 0 to 100,000,000 per contribution period
- inflation: 0% to 30%

Negative rates may be allowed because compounding mathematics can model declining balances, but values that would make `1 + j/n <= 0` must be rejected.

The UI must never display NaN, Infinity, undefined or blank result values.

---

# 7. Result hierarchy

Primary result cards:

1. Ending value
2. Total contributed
3. Growth / interest earned
4. Effective annual rate

Secondary results:

- simple-interest ending value and difference
- inflation-adjusted ending value when enabled
- recurring contribution total
- starting principal

The main answer must be understandable without reading the methodology.

---

# 8. Visualization

Provide one primary responsive chart showing the value path over time.

Required series:

- total contributed
- modeled compound value

Optional third series when inflation is enabled:

- inflation-adjusted value

Chart requirements:

- useful on desktop, 390 px and 360 px
- no clipped labels
- no hover-only information
- accessible summary text beneath or adjacent to the chart
- deterministic axis formatting using the selected currency

A year-by-year table must show at minimum:

- year
- cumulative contributed amount
- modeled ending balance
- modeled growth

For long horizons the UI may show a bounded preview while CSV/report output can contain the complete annual series.

---

# 9. Country and currency behavior

Reuse Carrowmont's existing country/currency architecture.

Country and currency remain separate concepts.

Changing country may change:

- suggested contribution cadence
- two-week terminology
- examples/helper text
- number formatting conventions

Changing currency changes units and formatting only; it does not convert entered amounts using FX.

Support the same expanded country/currency set used by the current primary planning tools unless a technical reason is documented.

---

# 10. Privacy and data behavior

V1 must remain client-side and no-login.

Do not send scenario values to third parties.

Do not add a new remote financial API.

Do not store principal/rate/contribution values in analytics.

Existing privacy and Cloudflare-RUM QA isolation rules remain unchanged.

---

# 11. Report / PDF

The standard downloadable report is required for CORE8.

Recommended report structure:

**Page 1 — Compound-growth summary**
- inputs and locale
- ending value
- contributed amount
- modeled growth
- effective annual rate

**Page 2 — Growth path**
- chart
- contribution/growth decomposition
- simple-interest comparison

**Page 3 — Annual table**
- annual values, continuing to additional pages only if necessary

**Page 4 — Guide & methodology**
- formulas and terminology
- compounding/contribution-cadence disclosure
- inflation note when used
- educational disclaimer

**Page 5 — Continue planning with Carrowmont**
- the other seven CORE8 tools

The implementation release must update the shared report registry across all eight core repositories and central QA in one protected coordinated release.

---

# 12. Cross-tool context

The calculator should consume country and currency from `carrowmont_plan_context_v1`.

Compatible incoming values may be offered rather than silently applied where semantics differ.

Potential future semantic links:

- SIP/Recurring Investment → contribution amount and rate assumptions
- Goal Planner → target/horizon context
- Inflation Calculator → inflation assumption

V1 does not need to auto-transfer all financial values.

---

# 13. Homepage and Tools directory integration

After implementation is live:

- add Compound Interest Calculator to `/tools.html` as a Primary Planning Tool and within an Investing/Savings context;
- update ItemList count/order;
- add a real homepage core card;
- expand the deterministic homepage core-tool order profiles from seven to eight live tool IDs;
- keep **Explore All Tools** fixed after the live core tools;
- use a balanced layout at wide desktop. Eight real tools plus Explore All Tools may use a 3 × 3 presentation if that best preserves the established card proportions;
- preserve mobile one-column behavior and keyboard/DOM order.

Do not remove or demote an existing core tool merely to preserve the old card count.

---

# 14. Internal linking and Learn support

At launch the calculator should receive natural contextual links from relevant existing content such as:

- `compounding-and-time.html`
- `compound-interest-monthly-contributions.html`
- `starting-investing-earlier.html`
- `lump-sum-vs-monthly-investing.html`
- `investment-time-to-target.html` where contextually appropriate
- SIP / Recurring Investment Calculator
- Goal Planner

The calculator should link back to the most relevant learning pages and to the SIP/Recurring Investment Calculator when the user wants contribution-plan-specific modeling.

Do not create doorway pages for each compounding frequency.

---

# 15. SEO contract

Required:

- one canonical URL
- one H1
- unique title and description
- WebApplication/SoftwareApplication or appropriate calculator structured data only if valid and non-misleading
- sitemap inclusion with accurate `lastmod`
- IndexNow through the existing corrected implementation
- direct crawlable links from `/tools.html` and homepage
- no country-specific duplicate URLs

Search-intent supporting copy should naturally address:

- compound interest calculator
- compound growth
- compounding frequency
- monthly contributions
- interest earned
- effective annual rate

Avoid keyword stuffing.

---

# 16. QA contract

At minimum validate:

## Mathematics
1. zero rate
2. annual compounding
3. monthly compounding
4. daily compounding
5. principal only
6. contributions only
7. principal plus contributions
8. beginning vs end contribution timing
9. negative valid rate
10. invalid rate where periodic base is non-positive
11. simple-interest comparison
12. inflation-adjusted result
13. year-by-year totals reconcile with headline result

## UI / accessibility
14. desktop layout
15. 390 px layout
16. 360 px layout
17. no horizontal overflow
18. visible focus
19. keyboard operation
20. chart accessible summary
21. no hover-only essential content
22. validation messaging

## Locale
23. country selector alphabetized with Other / International last
24. currency remains independently selectable
25. India/US/UK/AU/NZ number formatting and terminology checks
26. biweekly/fortnightly wording follows established metadata

## SEO / architecture
27. canonical URL
28. title/meta/H1
29. sitemap inclusion
30. Tools directory link
31. homepage core-card integration
32. internal Learn links
33. IndexNow parser still covers every sitemap URL

## Reports
34. PDF downloads
35. chart present and legible
36. methodology page present
37. Continue Planning page present
38. report-standard byte identity across all eight core repos
39. each report omits itself and shows the other seven core tools

## Regression
40. existing calculator math unchanged
41. source contract green
42. staged browser/PDF QA green
43. live Automated QA green
44. Multi-Repo Guard green

---

# 17. Repository/bootstrap sequence

CORE8 requires a new repository, so implementation must be split into protected stages.

## Stage A — create repository

Create `Draw004/compound-interest-calculator` with `main` as its default branch and one initial README commit. Do not publish a fake/placeholder calculator page.

## Stage B — automation bootstrap

Update the controller workflows so Repository Access Check, Source Snapshot, Multi-Repo Guard, Multi-Repo Dry Run and Batch PR Publisher know about `compound-interest-calculator`.

Run Repository Access Check.

Run a fresh Source Snapshot. That fresh snapshot — not Snapshot 71 — becomes the implementation baseline.

## Stage C — calculator implementation

Build the complete new repository plus coordinated main-site, report-standard and QA changes from the post-bootstrap snapshot.

Run exact-bundle validation, staged source contract, browser/responsive/PDF QA and Publisher.

Expected implementation PRs will include the new repository plus every existing core repository whose byte-identical `report-standard.js` changes, main site and central QA.

## Stage D — production verification

Merge in dependency-safe order with central QA last, then run:

- Pages deployment
- IndexNow
- live Automated QA
- Multi-Repo Guard
- fresh Source Snapshot

Only then is CORE8 complete.

---

# 18. Out of scope for V1

Do not add:

- bank-product recommendations
- live deposit rates
- securities recommendations
- tax calculations
- account/login
- cloud saving
- AI-generated analysis
- Monte Carlo returns
- stochastic market forecasts
- FX conversion
- separate pages for monthly/daily/quarterly calculators
- hidden assumptions about taxes or fees

---

# 19. Definition of done

CORE8 is complete only when:

- repository exists and is covered by controller automation;
- implementation is built from a fresh post-bootstrap Source Snapshot;
- deterministic fixtures pass;
- calculator is useful with principal-only inputs and with optional contributions;
- compounding frequency is explicit;
- contribution cadence is independent and disclosed;
- effective annual rate is shown;
- simple-interest comparison is correctly labeled;
- inflation-adjusted output is optional and clearly real-value labeled;
- PDF/report standard is complete;
- shared report registry is eight-tool and byte-identical across eight repos;
- homepage and `/tools.html` integrate the live tool;
- sitemap and IndexNow include the canonical URL;
- staged and live QA are green;
- Multi-Repo Guard is green;
- a fresh Source Snapshot becomes the next authoritative baseline.
