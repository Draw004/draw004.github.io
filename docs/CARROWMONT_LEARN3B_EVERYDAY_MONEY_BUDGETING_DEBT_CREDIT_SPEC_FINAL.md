# CARROWMONT LEARN3B - EVERYDAY MONEY, BUDGETING, SAVING, DEBT AND CREDIT

## Final Page-by-Page Editorial, Localization, Search, Internal Discovery, QA and Release Specification

**Status:** FINAL specification-only approval gate. This document does not change public article content.  
**Authoritative baseline:** Carrowmont Source Snapshot 92  
**Snapshot generated:** 2026-10-20T14:39:14Z  
**Main-site baseline commit:** `404fd1e80c61d8de70af79254c63b7f5561d0231`  
**Central QA baseline commit:** `92ad3b4da602bdc42bf978030f14f701222482cf`  
**Baseline source contract:** 580 PASS / 0 FAIL  
**Specification date:** 20 October 2026  

---

# 1. Executive decision

LEARN3B will materially improve twelve existing Carrowmont Learn guides that help people manage everyday money, build financial resilience, plan savings and repay debt.

The goal is not to make every article longer. The goal is to make each article clearer, more practical and more useful to a reader who may have no finance background.

Every improved page must help the reader answer a real question, understand the trade-offs, see a realistic example and know what to check next.

The programme must preserve:

- every existing canonical URL;
- Carrowmont's simple-language standard;
- country-aware words and money examples;
- one global educational core rather than cloned country pages;
- the existing privacy-first architecture;
- calculator and report mathematics;
- stable search intent ownership;
- accurate Article and Breadcrumb structured data;
- honest indexing and freshness signals;
- the established Publisher, QA, Guard and Snapshot release process.

LEARN3B must improve reader value first. Search visibility is an expected long-term benefit of stronger, clearer and better-connected content, not a reason to add filler or repeat keywords.

---

# 2. Scope

The following twelve existing pages are in scope:

1. `50-30-20-budget-rule.html`
2. `budgeting-by-pay-frequency.html`
3. `budgeting-with-irregular-income.html`
4. `cash-flow-vs-income.html`
5. `debt-snowball-vs-avalanche.html`
6. `emergency-fund-how-much.html`
7. `emergency-savings.html`
8. `lifestyle-inflation.html`
9. `pay-yourself-first-budgeting.html`
10. `savings-goal-planning.html`
11. `sinking-fund-vs-emergency-fund.html`
12. `zero-based-budgeting.html`

The four newer LEARN2A-2 credit and borrowing guides are deliberately not rewritten in this phase because their current structure is already strong:

- `credit-score-explained.html`
- `debt-consolidation-explained.html`
- `how-credit-card-interest-works.html`
- `apr-vs-interest-rate.html`

They may receive contextual links from LEARN3B pages where useful, but no change should be made merely to create activity.

---

# 3. Non-goals

LEARN3B must not:

- create new public article URLs;
- change or redirect the twelve existing canonical URLs;
- create country-specific doorway pages;
- add raw machine translations;
- change calculator formulas, inputs, outputs or reports;
- change SEARCH1 privacy or query-storage behaviour;
- add a search API, AI service or third-party content service;
- turn educational pages into product recommendations;
- provide individualized financial advice;
- invent country-specific tax, legal, credit, insolvency or welfare rules;
- refresh dates on pages that did not receive a substantive editorial change;
- rewrite all 83 Learn pages in one mass release;
- use word count as a substitute for quality;
- add keyword repetitions that make the writing unnatural;
- remove useful existing explanations solely to make every page look identical.

---

# 4. Reader outcome standard

Every improved page must leave the reader with five things:

1. **A direct answer** - the main question is answered near the top in plain language.
2. **A clear mental model** - the reader understands what the concept means and why it matters.
3. **A practical example** - numbers, a timeline or a household scenario makes the idea concrete.
4. **A decision process** - a checklist or set of questions helps the reader apply the lesson.
5. **A next step** - the reader can continue with the correct Carrowmont tool or related guide.

A page is not complete because it has an H1, 1,500 words and several keywords. It is complete when the reader can explain the idea in their own words and identify what information they need next.

---

# 5. Plain-language and house-style rules

All twelve pages must follow the current `LEARN-ARTICLE-STANDARD.md` and these additional rules.

## 5.1 Writing

- Use short, direct sentences where possible.
- Explain a technical term before relying on it.
- Prefer familiar words over specialist words.
- Keep paragraphs easy to scan on a phone.
- Use a table only when comparison is easier in rows and columns.
- Use bullets only when they genuinely improve a process or checklist.
- Explain calculations step by step.
- Label examples as illustrative.
- Avoid shame, fear, urgency and moral judgement.
- Avoid telling the reader that one method is always best.
- Avoid repeating the same idea under several headings.

## 5.2 Direct answer

The first useful answer should normally appear within the first 120 words of the article content.

The direct-answer block should:

- answer the exact H1 question;
- state the main limitation or condition;
- avoid a long preamble;
- use the same terminology as the page title and H1;
- remain understandable without the rest of the article.

## 5.3 Heading capitalization

The Carrowmont colon rule remains mandatory:

- `Cash flow vs income: Why timing matters`
- `Worked example: A stronger month does not set the baseline`
- `Checklist: Questions to ask before using the method`

The first alphabetic word after a colon is capitalized in titles, headings, card headings and standalone labels. Ordinary paragraph prose is not forced into title case.

---

# 6. Global core and local relevance

Carrowmont's established rule remains:

> **One universal educational core, with country-aware terminology, money examples and genuine local caveats.**

## 6.1 Required terminology behaviour

Where the idea is universal, use wording that works globally. Where a familiar local term improves understanding, use the existing locale system.

Examples:

| Concept | India | United States / Canada | United Kingdom / Ireland | Australia / New Zealand | International |
|---|---|---|---|---|---|
| Take-home income | take-home salary / income | take-home pay / income | take-home pay / income | take-home pay / income | take-home income |
| Pay every two weeks | every two weeks | biweekly | fortnightly | fortnightly | every two weeks |
| Loan payment | EMI / repayment | monthly payment | repayment | repayment | loan payment / repayment |
| Emergency money | emergency fund / reserve | emergency fund / reserve | emergency fund / reserve | emergency fund / reserve | emergency savings / reserve |
| Regular investing | SIP / recurring investment | recurring investment | regular investment | regular investment | recurring / regular investment |
| Instalment spelling | instalment | installment in US; instalment where natural in Canada | instalment | instalment | payment / instalment |

## 6.2 Money examples

Any new or revised money example must use the existing declarative Carrowmont money-localization system.

Do not hard-code one currency as if it were universal.

Changing the selected currency changes display formatting only. It must not claim that live exchange-rate conversion occurred.

## 6.3 Country caveats

The following must be described as country-, provider- or agreement-dependent where relevant:

- payroll timing and deductions;
- tax set-asides for self-employed or variable-income workers;
- public benefits and unemployment protection;
- deposit insurance and account access rules;
- credit-card minimum payments and hardship options;
- debt collection, restructuring and insolvency processes;
- employer retirement deductions;
- insurance deductibles, waiting periods and excesses;
- lender interest, fee and repayment rules.

Do not insert unsupported local percentages or legal claims.

## 6.4 Language versions

LEARN3B remains an English-language release with country-aware terminology.

A future translated page must have a separate reviewed URL, one language per page, human review and correct `hreflang`. LEARN3B must not auto-publish partial or raw machine translations.

---

# 7. Query ownership and cannibalization control

The twelve pages must keep distinct search and educational ownership.

| Page | Primary question owned | Must not become |
|---|---|---|
| `how-to-make-a-budget.html` | How to build a complete budget from start to finish | A duplicate of any single budgeting method |
| `50-30-20-budget-rule.html` | What the 50/30/20 rule means and when to adapt it | A general budgeting guide |
| `zero-based-budgeting.html` | How zero-based budgeting works | A second 50/30/20 comparison page |
| `pay-yourself-first-budgeting.html` | What paying yourself first means and how to use it safely | A universal savings-percentage rule |
| `budgeting-by-pay-frequency.html` | How payment dates and pay cadence affect cash flow | A guide to irregular income amounts |
| `budgeting-with-irregular-income.html` | How to budget when income amounts vary | A guide limited to weekly or monthly pay dates |
| `cash-flow-vs-income.html` | The difference between income and cash flow | A generic budget-building guide |
| `emergency-fund-how-much.html` | How to estimate an emergency-fund range | A guide about where all short-term money should be kept |
| `emergency-savings.html` | Why accessible emergency money has a different job from investing | A duplicate emergency-fund-sizing article |
| `sinking-fund-vs-emergency-fund.html` | Predictable future costs versus unexpected shocks | A general emergency-fund guide |
| `savings-goal-planning.html` | How to define and fund a named savings goal | A general investing or budgeting guide |
| `lifestyle-inflation.html` | How recurring spending can rise with income | A page that shames all lifestyle improvement |
| `debt-snowball-vs-avalanche.html` | How the two debt-ordering methods differ | A debt consolidation or credit-card-interest guide |

The existing `how-to-make-a-budget.html` page remains the broad gateway. LEARN3B pages should link to it where helpful but must retain their narrower purpose.

---

# 8. Current baseline signals

The Snapshot 92 audit records the following improvement signals.

| Page | Main words | Source links | Explicit worked example | Explicit checklist | Main improvement need |
|---|---:|---:|:---:|:---:|---|
| 50/30/20 | 1,634 | 4 | Yes | Partial | clearer fit test and local context |
| Budgeting by pay frequency | 1,185 | 4 | No | Partial | calendar example and decision checklist |
| Irregular-income budgeting | 1,296 | 4 | No | No | practical income-floor example and surplus rule |
| Cash flow vs income | 1,300 | 4 | No | No | timing example and diagnostic process |
| Debt snowball vs avalanche | 1,669 | 3 | Yes | Partial | stronger source base and method-selection checklist |
| Emergency fund: how much | 1,193 | 3 | No | No | sizing example, risk factors and checklist |
| Emergency savings | 1,160 | 4 | No | Partial | clearer ownership, layered liquidity example and checklist |
| Lifestyle inflation | 1,177 | 4 | No | No | raise example, non-judgmental framework and checklist |
| Pay yourself first | 1,158 | 4 | No | Partial | safe cash-flow waterfall example |
| Savings goal planning | 1,374 | 3 | No | Partial | worked funding example and priority checklist |
| Sinking fund vs emergency fund | 1,159 | 4 | No | No | clear scenario comparison and setup checklist |
| Zero-based budgeting | 1,419 | 4 | No | No | full worked month and rollover checklist |

These are review signals, not automatic word-count targets. Editorial review may remove repetition while adding missing explanation.

---

# 9. Implementation sequence

LEARN3B should be implemented in two controlled production releases after this specification is approved.

## 9.1 LEARN3B-1 - Budget systems, pay cycles and cash flow

1. `50-30-20-budget-rule.html`
2. `zero-based-budgeting.html`
3. `pay-yourself-first-budgeting.html`
4. `budgeting-by-pay-frequency.html`
5. `budgeting-with-irregular-income.html`
6. `cash-flow-vs-income.html`

## 9.2 LEARN3B-2 - Financial resilience, savings and debt

1. `emergency-fund-how-much.html`
2. `emergency-savings.html`
3. `sinking-fund-vs-emergency-fund.html`
4. `savings-goal-planning.html`
5. `lifestyle-inflation.html`
6. `debt-snowball-vs-avalanche.html`

This split limits editorial and browser-review risk while keeping each release thematically coherent.

A fresh Source Snapshot must be taken after LEARN3B-1 before LEARN3B-2 is packaged.

---

# 10. Page specification - 50/30/20 Budget Rule

## 10.1 Stable route

`https://carrowmont.com/50-30-20-budget-rule.html`

## 10.2 Search identity

Retain the current title, H1 and primary query ownership unless final editorial review finds a clear accuracy issue.

Current title:

`50/30/20 Budget Rule: How It Works | Carrowmont`

Current H1:

`What is the 50/30/20 budget rule, and when should you adjust it?`

## 10.3 Direct answer

Explain that the rule is a simple way to divide take-home income into needs, wants and future priorities, but the percentages are a starting framework rather than a universal requirement.

## 10.4 Required improvement

- Define take-home income before using percentages.
- Explain ambiguous categories such as minimum debt payments, insurance, childcare, family support and employer retirement deductions.
- Separate the value of classification from the exact 50/30/20 numbers.
- Explain why high housing costs, low income, variable income or urgent debt may require a different split.
- Show how the savings/debt bucket may contain several priorities.
- Remove repeated explanations of the same limitation.
- Keep the page distinct from the broad `how-to-make-a-budget.html` guide.

## 10.5 Worked example

Use a localized monthly take-home income and compare:

- the textbook 50/30/20 split;
- a household whose essential costs are above 50%;
- an adjusted plan that still protects at least one future priority.

The example must not imply that failure to reach 20% means the household has failed.

## 10.6 Checklist

Add a clearly labelled checklist covering:

- correct take-home income;
- honest needs/wants classification;
- irregular bills;
- debt minimums;
- emergency reserve;
- realistic savings target;
- review date.

## 10.7 Localization and sources

- Use localized money formatting.
- Treat payroll and retirement deductions as country/employer dependent.
- Retain or improve the current authoritative budget sources.
- Include at least four high-authority sources after final review.

## 10.8 Internal journey

Primary tool: Budget & Cash Flow Planner.

Required supporting links should include:

- How to Make a Budget;
- Zero-Based Budgeting;
- Pay Yourself First;
- Cash Flow vs Income.

---

# 11. Page specification - Budgeting by Pay Frequency

## 11.1 Stable route

`https://carrowmont.com/budgeting-by-pay-frequency.html`

## 11.2 Search identity

Retain the current title and H1.

Primary ownership: weekly, biweekly, fortnightly, twice-monthly and monthly pay timing.

## 11.3 Direct answer

Explain that pay frequency changes when cash arrives, not annual income by itself. A useful budget respects actual pay dates while converting annual obligations into per-pay-period reserves.

## 11.4 Required improvement

- Explain the difference between biweekly and twice monthly in plain language.
- Show the normal annual number of pay periods for weekly, every-two-weeks, twice-monthly and monthly pay.
- Explain why a three-paycheck or five-paycheck month is a calendar effect, not a permanent rise in income.
- Explain how bills can be assigned across paydays.
- Show how annual and quarterly costs can be reserved per paycheck.
- Explain that saving frequency can differ from pay frequency.
- Separate pay-date timing from variable income amounts.

## 11.5 Worked example

Use one annual take-home amount and compare:

- every-two-weeks pay;
- twice-monthly pay;
- monthly budgeting;
- an annual bill reserve per paycheck.

The example must label `biweekly` and `fortnightly` according to country terminology.

## 11.6 Checklist

Add a payday-budget checklist covering:

- actual pay dates;
- fixed-bill due dates;
- per-paycheck essential spending;
- irregular-cost reserves;
- automated transfers;
- stronger-pay-period rules;
- calendar review for the next 12 months.

## 11.7 Localization and sources

- US/Canada may use `biweekly` where natural.
- UK/Ireland/Australia/New Zealand should use `fortnightly` where natural.
- International wording may use `every two weeks`.
- Avoid unsupported payroll-law statements.
- Retain at least four authoritative budgeting/cash-flow sources.

## 11.8 Internal journey

Primary tool: Budget & Cash Flow Planner.

Required links:

- Budgeting With Irregular Income;
- Cash Flow vs Income;
- Sinking Fund vs Emergency Fund;
- How to Make a Budget.

---

# 12. Page specification - Budgeting With Irregular Income

## 12.1 Stable route

`https://carrowmont.com/budgeting-with-irregular-income.html`

## 12.2 Search identity

Retain the current title and H1.

Primary ownership: changing income amounts, not merely changing pay dates.

## 12.3 Direct answer

Explain that a variable-income budget starts with a conservative income floor, protects essential costs and creates a rule for stronger months before the extra money is spent.

## 12.4 Required improvement

- Explain the difference between lowest month, reliable baseline and average income.
- Show why a recent strong month should not automatically become the spending baseline.
- Separate personal spending money from tax or business obligations where applicable.
- Explain an income-smoothing buffer without assuming a specific account product.
- Show how stronger months can be divided among buffer replenishment, irregular bills, debt, goals and flexible spending.
- Explain how to review the baseline after a meaningful change in income history.
- Keep irregular-income emergencies distinct from a normal low month already included in the plan.

## 12.5 Worked example

Use six illustrative monthly income amounts.

Show:

- average income;
- conservative baseline;
- essential-cost floor;
- tax/business set-aside where relevant;
- buffer contribution;
- rule for a strong month.

The example must state that tax treatment and self-employment rules vary by country.

## 12.6 Checklist

Add a monthly review checklist covering:

- recent income range;
- essential cost floor;
- tax/business liabilities;
- income buffer;
- known annual bills;
- strong-month allocation rule;
- next review date.

## 12.7 Localization and sources

- Use localized currency examples.
- Avoid assuming that all variable-income workers are self-employed.
- Avoid country-specific tax percentages.
- Use high-authority budgeting and variable-income guidance.

## 12.8 Internal journey

Primary tool: Budget & Cash Flow Planner.

Required links:

- Budgeting by Pay Frequency;
- Sinking Fund vs Emergency Fund;
- Emergency Savings;
- How to Make a Budget.

---

# 13. Page specification - Cash Flow vs Income

## 13.1 Stable route

`https://carrowmont.com/cash-flow-vs-income.html`

## 13.2 Search identity

Retain the current title and H1.

Primary ownership: income is money received; cash flow is the timing and relationship between money in and money out.

## 13.3 Direct answer

Explain that a person can have high income but weak cash flow if spending, debt and bill timing absorb most of it. Income is one input; cash flow shows whether money remains available when obligations are due.

## 13.4 Required improvement

- Explain amount and timing as separate cash-flow dimensions.
- Separate monthly surplus from actual account timing.
- Explain fixed, variable and irregular outflows.
- Explain why available credit is not the same as cash liquidity.
- Show how annual income can look adequate while a short timing gap causes stress.
- Explain free cash flow in simple personal-finance language.
- Clarify that positive cash flow does not automatically mean strong net worth, and high net worth does not guarantee liquid cash.
- Remove repeated definitions.

## 13.5 Worked example

Compare two households with the same take-home income but different:

- fixed costs;
- debt payments;
- bill timing;
- monthly buffer.

Add a short timing example in which income arrives after a large bill is due.

## 13.6 Checklist

Add a cash-flow diagnosis checklist:

- monthly and annual income;
- due dates;
- fixed-cost ratio;
- debt minimums;
- irregular bills;
- true monthly surplus;
- lowest projected account point;
- accessible buffer.

## 13.7 Localization and sources

- Use localized money formatting.
- Avoid treating overdrafts or credit cards as income.
- Retain at least four authoritative cash-flow and budgeting sources.

## 13.8 Internal journey

Primary tool: Budget & Cash Flow Planner.

Required links:

- How to Make a Budget;
- Budgeting by Pay Frequency;
- Budgeting With Irregular Income;
- Lifestyle Inflation.

---

# 14. Page specification - Zero-Based Budgeting

## 14.1 Stable route

`https://carrowmont.com/zero-based-budgeting.html`

## 14.2 Search identity

Retain the current title and H1.

Primary ownership: assigning every unit of planned income a purpose, not forcing the bank balance to zero.

## 14.3 Direct answer

Explain that zero-based budgeting means planned income minus planned allocations equals zero. It does not mean spending every unit of money or ending with no cash.

## 14.4 Required improvement

- Explain allocation, spending and account balance as three different ideas.
- Show how savings, sinking funds, debt repayment and a cash buffer can all be valid allocations.
- Explain rollover categories and irregular expenses.
- Show how to use fewer broad categories if detailed tracking becomes burdensome.
- Explain adaptation for variable income.
- Compare briefly with 50/30/20 without turning the page into a duplicate comparison guide.
- Explain administrative cost and common failure modes.

## 14.5 Worked example

Build a complete localized monthly budget showing:

- take-home income;
- essential bills;
- flexible spending;
- irregular-cost reserves;
- emergency savings;
- debt payments;
- named goal saving;
- cash buffer;
- zero remaining unassigned amount.

Make clear that the bank account does not need to be zero.

## 14.6 Checklist

Add a month-end checklist covering:

- actual income;
- overspent and underspent categories;
- rollover decisions;
- irregular costs;
- buffer protection;
- category simplification;
- next-month changes.

## 14.7 Localization and sources

- Localize all money amounts.
- Avoid presenting one category structure as universal.
- Retain at least four authoritative budget sources.

## 14.8 Internal journey

Primary tool: Budget & Cash Flow Planner.

Required links:

- How to Make a Budget;
- 50/30/20 Budget Rule;
- Pay Yourself First;
- Sinking Fund vs Emergency Fund.

---

# 15. Page specification - Pay Yourself First

## 15.1 Stable route

`https://carrowmont.com/pay-yourself-first-budgeting.html`

## 15.2 Search identity

Retain the current title and H1.

Primary ownership: making saving or goal funding an intentional early allocation rather than relying only on whatever remains.

## 15.3 Direct answer

Explain that paying yourself first means planning a transfer to future priorities before optional spending. It does not mean ignoring rent, food, insurance, debt minimums or a required cash buffer.

## 15.4 Required improvement

- Explain the difference between priority and literal payment order.
- Show a safe cash-flow waterfall.
- Compare fixed-amount and percentage transfers.
- Explain when automation helps and when it can cause overdrafts or cash stress.
- Explain adaptation for irregular income.
- Explain that debt reduction may be part of the future-priority allocation without making one universal rule.
- Distinguish emergency saving, short-term goals and long-term investing.

## 15.5 Worked example

Show a localized monthly or per-paycheck waterfall:

1. essential obligations;
2. minimum debt payments;
3. emergency or irregular-cost reserve;
4. planned goal or investment transfer;
5. flexible spending;
6. remaining buffer.

Include a variable-income alternative using a baseline amount plus a percentage of stronger months.

## 15.6 Checklist

Add an automation checklist covering:

- pay timing;
- essential bill dates;
- minimum balance;
- transfer amount;
- destination purpose;
- failed-transfer alerts;
- annual review.

## 15.7 Localization and sources

- Use SIP terminology for India where the example refers to recurring investing.
- Use recurring/regular investment elsewhere.
- Avoid implying that an automated investment is risk-free.
- Retain at least four high-authority savings/budget sources.

## 15.8 Internal journey

Primary tools: Budget & Cash Flow Planner and SIP / Recurring Investment Calculator where relevant.

Required links:

- How Much Should I Save Each Month?;
- 50/30/20 Budget Rule;
- Zero-Based Budgeting;
- Emergency Savings.

---

# 16. Page specification - Emergency Fund: How Much

## 16.1 Stable route

`https://carrowmont.com/emergency-fund-how-much.html`

## 16.2 Search identity

Retain the current title and H1.

Primary ownership: estimating an emergency-fund range from essential costs and household risk.

## 16.3 Direct answer

Explain that there is no universal number of months. Start with essential monthly costs, then adjust for income stability, dependants, insurance gaps, health needs, access to support and how quickly expenses can be reduced.

## 16.4 Required improvement

- Define essential monthly costs clearly.
- Explain why total lifestyle spending may overstate the required core reserve.
- Explain why three or six months are reference points, not commands.
- Include job concentration, dual/single income, dependants, variable income and correlated household risks.
- Include insurance deductibles/excesses and waiting periods without inventing local rules.
- Explain staged targets such as first buffer, one month, then a wider range.
- Explain replenishment after use.
- Keep the page distinct from `emergency-savings.html`, which owns purpose and liquidity design.

## 16.5 Worked example

Use localized essential monthly costs and show how the range changes for:

- stable dual income;
- variable or concentrated income;
- dependants or a major insurance gap.

The result must be a range, not a precise recommendation.

## 16.6 Checklist

Add a sizing checklist covering:

- essential monthly costs;
- income stability;
- dependants;
- health and insurance exposure;
- debt minimums;
- available support;
- time to reduce costs;
- first-stage target;
- replenishment rule.

## 16.7 Localization and sources

- Use localized money amounts.
- Identify public benefits, insurance rules and deposit protections as country-specific.
- Prefer stable guidance over short-lived statistics.
- Include at least four high-authority sources after final review.

## 16.8 Internal journey

Primary tool: Goal Planner.

Required links:

- Emergency Savings;
- Sinking Fund vs Emergency Fund;
- Savings Goal Planning;
- How to Make a Budget.

---

# 17. Page specification - Emergency Savings and Liquidity

## 17.1 Stable route

`https://carrowmont.com/emergency-savings.html`

## 17.2 Search identity

Keep the route. Final editorial review may strengthen the title wording, but the page must continue to own the purpose and liquidity question rather than the amount question.

Primary ownership: why accessible emergency money has a different job from long-term investing.

## 17.3 Direct answer

Explain that emergency savings buys time and protects the financial plan when an unexpected cost or income interruption occurs. Its first job is access and stability, not maximum return.

## 17.4 Required improvement

- Define liquidity in simple language.
- Explain why volatile assets may be worth less when money is urgently needed.
- Explain layered access without recommending a specific bank product.
- Distinguish immediate cash access from a larger secondary reserve.
- Explain appropriate and inappropriate uses.
- Explain what to do after using the reserve.
- Explain opportunity cost honestly without implying that emergency money should chase investment returns.
- Keep emergency-fund sizing in the dedicated `emergency-fund-how-much.html` page.

## 17.5 Worked example

Show an unexpected loss of income or urgent household repair occurring during a market decline.

Compare:

- accessible emergency savings;
- selling a volatile investment;
- borrowing on expensive credit.

The example must remain illustrative and avoid naming a product as best.

## 17.6 Checklist

Add a liquidity-design checklist covering:

- speed of access;
- value stability;
- account restrictions;
- emergency definition;
- immediate and secondary layers;
- separate sinking funds;
- replenishment plan.

## 17.7 Localization and sources

- Avoid universal claims about deposit insurance or account guarantees.
- Use country-aware caveats for account access and protection.
- Retain at least four authoritative emergency-savings/cash-flow sources.

## 17.8 Internal journey

Primary tool: Goal Planner.

Required links:

- Emergency Fund: How Much;
- Sinking Fund vs Emergency Fund;
- Investing for Beginners;
- How to Make a Budget.

---

# 18. Page specification - Sinking Fund vs Emergency Fund

## 18.1 Stable route

`https://carrowmont.com/sinking-fund-vs-emergency-fund.html`

## 18.2 Search identity

Retain the current title and H1.

Primary ownership: predictable future cost versus unexpected financial shock.

## 18.3 Direct answer

Explain that a sinking fund prepares for a known or reasonably expected cost, while an emergency fund protects against an unplanned shock. Both are savings, but they solve different problems.

## 18.4 Required improvement

- Define predictability, amount uncertainty and timing uncertainty.
- Explain grey areas such as home repairs, medical costs and vehicle maintenance.
- Show why combining all reserves can create false confidence.
- Explain the simple sinking-fund formula.
- Explain named sub-goals without requiring many bank accounts.
- Show how to prioritize if the household cannot fund every category at once.
- Explain simultaneous events and reserve layering.

## 18.5 Worked example

Compare at least three situations:

- annual insurance or school fee;
- expected vehicle maintenance;
- sudden job loss or urgent repair.

Calculate a monthly sinking-fund contribution for one predictable expense using localized money.

## 18.6 Checklist

Add a classification checklist:

- Is the event expected?
- Is the date known?
- Can the cost be estimated?
- Is it part of normal ownership?
- Would using emergency money reduce resilience?
- Does the amount need its own named reserve?

## 18.7 Localization and sources

- Localize the money example.
- Avoid assuming one insurance or school-fee system.
- Retain at least four authoritative budget and emergency-savings sources.

## 18.8 Internal journey

Primary tool: Budget & Cash Flow Planner.

Required links:

- Emergency Fund: How Much;
- Emergency Savings;
- Savings Goal Planning;
- Budgeting With Irregular Income.

---

# 19. Page specification - Savings Goal Planning

## 19.1 Stable route

`https://carrowmont.com/savings-goal-planning.html`

## 19.2 Search identity

Retain the current title and H1.

Primary ownership: defining a target, date and funding path for a named goal.

## 19.3 Direct answer

Explain that a savings goal becomes actionable when the reader defines the amount, date, existing savings, expected future cost and the regular contribution required.

## 19.4 Required improvement

- Explain today's-money versus future-money targets.
- Explain existing savings and time horizon.
- Distinguish saving from investing based on goal timing and risk.
- Show how fees, taxes, inflation and uncertain returns affect long-term goals.
- Explain priority when several goals compete.
- Explain funded ratio and milestone tracking.
- Explain why one asset should not be counted against several goals unless the trade-off is explicit.
- Explain what to change if the required contribution is unrealistic.

## 19.5 Worked example

Use one localized goal with:

- current target amount;
- inflation or future-cost assumption where relevant;
- existing savings;
- target date;
- contribution required under a simple no-return case;
- explanation of how an assumed return changes uncertainty, not certainty.

The article should not reproduce the entire Goal Planner engine.

## 19.6 Checklist

Add a goal-definition checklist covering:

- goal name;
- today/future money basis;
- target date;
- existing dedicated savings;
- acceptable risk;
- required monthly amount;
- priority against other goals;
- review triggers.

## 19.7 Localization and sources

- Localize money values.
- Avoid recommending one investment vehicle globally.
- Identify tax and product rules as country-dependent.
- Increase the source base to at least four authoritative references.

## 19.8 Internal journey

Primary tool: Goal Planner.

Required links:

- Future Cost of Expenses;
- How Much Should I Invest Each Month?;
- Sinking Fund vs Emergency Fund;
- How to Make a Budget.

---

# 20. Page specification - Lifestyle Inflation

## 20.1 Stable route

`https://carrowmont.com/lifestyle-inflation.html`

## 20.2 Search identity

Retain the current title and H1.

Primary ownership: recurring spending rising as income rises.

## 20.3 Direct answer

Explain that lifestyle inflation happens when higher income is followed by higher ongoing spending. It is not automatically bad, but it can reduce flexibility and slow goals when every raise becomes a permanent commitment.

## 20.4 Required improvement

- Use non-judgmental language.
- Distinguish useful quality-of-life improvement from unexamined recurring commitments.
- Explain one-time versus permanent spending.
- Explain fixed-cost ratio and reversibility.
- Show how lifestyle inflation affects emergency-fund needs and financial-independence targets.
- Explain raise-allocation rules as optional planning tools, not universal percentages.
- Include family, health, housing and caregiving changes as legitimate reasons spending may rise.
- Remove duplicated raise-allocation sections.

## 20.5 Worked example

Show a localized pay increase divided among:

- higher essential costs;
- a chosen quality-of-life improvement;
- emergency or debt resilience;
- long-term goals;
- remaining buffer.

Compare a one-time purchase with a recurring monthly commitment over several years.

## 20.6 Checklist

Add a raise-review checklist:

- change in take-home income;
- new fixed costs;
- one-time versus recurring spending;
- emergency reserve effect;
- debt and goal effect;
- reversibility;
- chosen enjoyment allocation;
- next review date.

## 20.7 Localization and sources

- Localize money examples.
- Avoid moral labels such as good or bad spending.
- Retain at least four authoritative financial-wellbeing, budgeting or savings sources.

## 20.8 Internal journey

Primary tool: Budget & Cash Flow Planner.

Required links:

- Cash Flow vs Income;
- Financial Independence Number;
- 50/30/20 Budget Rule;
- Pay Yourself First.

---

# 21. Page specification - Debt Snowball vs Avalanche

## 21.1 Stable route

`https://carrowmont.com/debt-snowball-vs-avalanche.html`

## 21.2 Search identity

Retain the current title and H1.

Primary ownership: smallest-balance-first versus highest-interest-first debt repayment ordering.

## 21.3 Direct answer

Explain that avalanche usually prioritizes interest savings, while snowball prioritizes an earlier visible payoff. The comparison is fair only when the total monthly debt payment and other assumptions are kept the same.

## 21.4 Required improvement

- Define both methods in one short comparison.
- Explain minimum payments and rollover of the freed payment.
- Explain why the same total monthly payment is required for a fair comparison.
- Explain when interest-rate differences are small.
- Explain behavioural value without claiming one method guarantees completion.
- Explain fees, promotional rates, prepayment rules and changing interest as possible real-world differences.
- Explain when hardship support may be more important than optimization.
- Keep debt consolidation and credit-card-interest explanations in their dedicated pages.

## 21.5 Worked example

Retain or improve the existing example with at least three debts.

Show:

- balances;
- interest rates;
- minimum payments;
- fixed extra payment;
- first debt cleared;
- total interest and debt-free timing under each method.

The example must be driven by the same assumptions used by the Debt Payoff Calculator or clearly identified as an independent simplified illustration.

## 21.6 Checklist

Add a method-selection checklist covering:

- complete debt list;
- interest rates and promotional expiry dates;
- minimum payments;
- fixed extra-payment capacity;
- emergency buffer;
- fees or penalties;
- motivation and follow-through risk;
- hardship or lender-support needs.

## 21.7 Localization and sources

- Use EMI/repayment terminology where country context requires it.
- Do not present one country's insolvency or debt-relief process as universal.
- Increase the source base to at least four authoritative references.
- Avoid lender or debt-product recommendations.

## 21.8 Internal journey

Primary tool: Debt Payoff Calculator.

Required links:

- Debt Consolidation Explained;
- How Credit-Card Interest Works;
- APR vs Interest Rate;
- Emergency Savings;
- Budget & Cash Flow Planner.

---

# 22. Shared internal-link architecture

The batch must improve contextual discovery without link dumping.

## 22.1 Minimum inbound discovery

Each materially improved page should have:

- one Learn-hub link;
- one relevant tool link or tool-family link;
- at least three contextual links from closely related Carrowmont pages where natural;
- three related-guide cards where practical.

The links must be useful in context. Do not add unrelated sitewide links solely to increase an inbound-link count.

## 22.2 Required cluster gateways

- `how-to-make-a-budget.html` remains the broad budgeting gateway.
- `emergency-savings.html` and `emergency-fund-how-much.html` must link to one another while preserving different ownership.
- `sinking-fund-vs-emergency-fund.html` connects budget planning to emergency resilience.
- `cash-flow-vs-income.html` connects budgeting, pay timing and lifestyle inflation.
- `debt-snowball-vs-avalanche.html` connects the Debt Payoff Calculator with the newer debt/credit foundation guides.
- `savings-goal-planning.html` connects Budget, Goal Planner and future-cost education.

## 22.3 Anchor text

Use descriptive, natural anchor text.

Prefer:

- `compare the debt snowball and avalanche methods`
- `estimate how much emergency savings may fit your risks`
- `build a budget around your actual pay cycle`

Avoid repetitive exact-match anchors on every page.

---

# 23. Search presentation and metadata

## 23.1 Stable identity

Each page must retain:

- one self-canonical URL;
- `index,follow`;
- one H1;
- Article and BreadcrumbList structured data;
- Carrowmont author/publisher identity;
- a unique title and meta description;
- accurate visible reviewed/updated information;
- sitemap coverage;
- Learn-hub coverage.

## 23.2 Title and description changes

Do not rewrite a title merely to include more keywords.

A title or meta description may change only when it becomes clearer, more accurate or more useful to the searcher.

Current Carrowmont guardrails remain:

- title: 25-70 characters;
- meta description: 100-170 characters.

These are internal editorial guardrails, not claims about fixed search-engine limits.

## 23.3 Freshness

Because each page in the implementation batch will receive a material editorial rewrite, its visible review date, Article `dateModified` and sitemap `lastmod` may be updated to the actual release review date.

Do not update dates on unrelated pages.

Do not use a date change as a substitute for a substantive improvement.

## 23.4 SEARCH1

SEARCH1 remains a privacy-first local index.

If a title, description or search summary materially changes, update the reviewed search record for that canonical page.

Do not create a new search result URL.

The total search-index page count remains unchanged because LEARN3B changes existing pages only.

## 23.5 Indexing follow-through

After each sub-batch is released and all gates are green:

- automatic IndexNow handles Bing and participating engines;
- inspect the changed canonical URLs in Google Search Console;
- request indexing selectively for the six materially rewritten pages in that sub-batch;
- monitor crawl/index status rather than repeatedly resubmitting unchanged URLs;
- do not submit `search.html` because it intentionally remains `noindex,follow`.

No specification can guarantee indexing or ranking. The release must maximize eligibility, clarity, discovery and user value without making guarantees.

---

# 24. Evidence and sourcing

Every page must use authoritative sources for factual, regulatory or research-based claims.

Preferred source types:

- consumer-protection and financial-education regulators;
- central banks and public financial-wellbeing reports;
- recognized government consumer guidance;
- investor-education bodies;
- original research where the article relies on a named framework;
- reputable international institutions for global context.

Rules:

- retain useful current sources;
- replace broken or weak sources;
- add a source where a new factual claim requires one;
- do not copy source wording;
- do not cite a source merely to inflate the source count;
- identify country-specific evidence clearly;
- avoid unstable statistics unless they materially improve the lesson;
- prefer durable educational guidance over short-lived news articles;
- keep the `Sources and how this guide was prepared` section accurate.

Each page should normally end with at least four high-authority sources after editorial review. A page may justify fewer only if the topic is narrow and every material claim is adequately supported.

---

# 25. Accessibility and visual requirements

The current Carrowmont Learn visual system remains in place.

Every changed page must be reviewed at:

- 1280px desktop;
- 390px mobile;
- 360px mobile.

Requirements:

- no horizontal page overflow;
- tables scroll within their own container if required;
- no clipped headings or source links;
- no oversized hero that delays the direct answer;
- paragraphs remain readable on mobile;
- links have clear text;
- headings follow a logical hierarchy;
- the top and bottom tool actions remain usable;
- the page remains useful without JavaScript;
- focus and keyboard navigation remain visible and usable;
- localized currency values do not overflow cards or tables.

---

# 26. Privacy and analytics boundaries

LEARN3B must not collect or transmit personal financial values.

The release must preserve:

- no login requirement;
- no article form requesting financial details;
- no Google Analytics;
- no consent popup introduced by this work;
- Cloudflare aggregate analytics only under the current approved architecture;
- no external AI or content API in the visitor browser;
- no search query in URLs, cookies or browser storage;
- no financial values added to article URLs.

External source links are normal navigation links. The article itself must not fetch external data at runtime.

---

# 27. Production file scope

The implementation releases may change only files required for the approved content and discovery work.

Expected main-site scope may include:

- the six article HTML files in the relevant sub-batch;
- `learn.html` only if category descriptions or visible summaries need a meaningful update;
- `learn-localization.js` only if new localized terms or money examples require it;
- `search-index.json` only for materially changed page summaries/keywords;
- `sitemap.xml` for accurate `lastmod` on changed pages only;
- closely related article files where a contextual inbound link is approved;
- one implementation record in `/docs`;
- `.github/LEARN-ARTICLE-STANDARD.md` only if a genuinely new shared rule is approved.

Expected QA scope may include:

- source-contract additions for LEARN3B boundaries;
- one focused LEARN3B browser test file or a deliberate extension of the current Learn test architecture;
- fixture/config changes only where necessary.

No workflow file is expected.

Central QA merges last.

---

# 28. QA acceptance criteria

The exact implementation package must pass all of the following before PR creation.

## 28.1 Page identity and SEO

For every changed page:

- file exists at the approved stable route;
- HTTP/browser route resolves;
- one title, one meta description, one canonical and one H1;
- `index,follow` remains present;
- title and meta remain unique;
- Article JSON-LD parses;
- BreadcrumbList JSON-LD parses;
- Article URL and canonical match;
- Article date, visible review date and sitemap `lastmod` agree with the actual substantive update;
- page remains linked from Learn hub;
- sitemap contains the canonical exactly once;
- SEARCH1 contains the canonical exactly once.

## 28.2 Editorial structure

For every changed page:

- direct answer appears near the top;
- main article text remains above the existing 1,000-word regression floor unless a separately approved standard exception exists;
- at least one explicit worked example, scenario or numerical illustration appears;
- at least one explicit decision/review checklist appears;
- benefits and limitations are both present;
- common mistakes or failure modes are present;
- FAQs answer real follow-up questions;
- sources section is present;
- educational disclaimer is present;
- related guides and relevant tool action remain present;
- colon capitalization passes;
- no obvious duplicate section remains after editing.

## 28.3 Localization

- no new hard-coded one-country currency appears in universal examples;
- localized money examples render for at least India, United States, United Kingdom and Australia;
- SIP/recurring-investment terminology remains correct where used;
- biweekly/fortnightly wording is country-aware where used;
- EMI/payment/repayment wording is country-aware where used;
- currency-only changes do not change the educational meaning;
- no live exchange-rate claim appears;
- country-specific caveats are clearly labelled;
- no cloned country URLs are created.

## 28.4 Internal links

- no broken internal links;
- each page has a relevant tool path;
- each page has at least three natural contextual inbound paths beyond the hub where practical;
- no repeated unrelated link block is added sitewide;
- query ownership remains distinct from neighbouring pages.

## 28.5 Layout and accessibility

At 1280, 390 and 360px:

- no horizontal page overflow;
- tables do not widen the page;
- headings do not clip;
- direct answer is visible without excessive empty space;
- tool CTA and related guides remain usable;
- localized long values remain contained;
- keyboard focus remains visible.

## 28.6 Privacy and regression

- no external runtime data API;
- no new analytics provider;
- no financial values in URLs or storage;
- SEARCH1 query privacy remains green;
- all existing calculators and reports remain untouched unless explicitly in the manifest;
- complete source contract is green;
- staged Chrome browser QA is green;
- exact manifest file set is verified;
- JavaScript syntax and JSON/XML parsing pass;
- Publisher is green before PRs are created.

---

# 29. Release and merge process

For each implementation sub-batch:

1. Start from the latest clean Source Snapshot.
2. Prepare the exact reviewed content and QA changes.
3. Validate base and new SHA-256 hashes.
4. Run syntax, JSON-LD, sitemap, search-index and source-contract checks.
5. Run focused 1280/390/360 browser rehearsal where available.
6. Package only approved files in the release ZIP.
7. Upload the ZIP to a disposable staging branch without extracting it.
8. Run Carrowmont Batch PR Publisher with `CREATE_PRS`.
9. If Publisher is red, merge nothing.
10. Review every generated PR.
11. Merge `draw004.github.io` first and `carrowmont-qa` last.
12. Confirm Pages deployment.
13. Run live Automated QA.
14. Run Multi-Repo Guard.
15. Capture a fresh Source Snapshot.
16. Submit the materially improved URLs through the approved indexing follow-through.
17. Delete/abandon the temporary staging branch.

Automation creates review PRs only. It must not auto-merge normal content changes.

---

# 30. Definition of done for LEARN3B

LEARN3B is complete only when:

- this specification is approved and merged;
- LEARN3B-1 is implemented from a fresh post-spec snapshot;
- all six LEARN3B-1 pages receive human editorial review;
- Publisher, Pages, live QA and Guard are green;
- a fresh snapshot closes LEARN3B-1;
- LEARN3B-2 is implemented from that newer snapshot;
- all six LEARN3B-2 pages receive human editorial review;
- all twelve pages preserve stable canonical URLs;
- every page has a clear direct answer, useful example and practical checklist;
- country-aware terminology and localized money examples pass;
- no country doorway pages or keyword stuffing are introduced;
- search ownership remains distinct across the cluster;
- internal discovery improves without link dumping;
- structured data, sitemap dates and visible review dates are accurate;
- 1280/390/360 layouts pass;
- Publisher, Pages, live QA and Guard are green after both sub-batches;
- a final fresh Source Snapshot becomes the authoritative baseline;
- Google Search Console follow-through is completed for the twelve materially improved URLs across the two releases;
- Bing and participating engines receive the changes through the existing IndexNow process.

---

# 31. Final product principle

LEARN3B should help a reader move from vague financial stress to a clearer process:

> **Understand where money comes from, where it goes, what needs protection, what can be planned and which trade-off matters next.**

The reader should not leave with a slogan alone. The reader should leave with a usable way to think.
