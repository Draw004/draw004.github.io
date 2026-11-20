# Carrowmont Batch 12B-2 - Short-Term Savings Comparison

**Review release:** 20 November 2026  
**Baseline snapshot:** `carrowmont-source-snapshot - 2026-11-20T221343.443.zip`  
**Baseline snapshot SHA-256:** `de1e57044d1407e1767ef31b75922f946e8bd7561024c4f3921a86ed6acc25a9`  
**Baseline Main commit:** `bf5eedc8b46039b1736af95391eba390ab126817`  
**Baseline QA commit:** `955593aa6bc160e0da806c6b552f3a518b323711`

## Product decision

Batch 12B-2 is implemented as a focused comparison section inside the existing **Emergency Fund & Financial Runway Calculator** at:

`/emergency-fund-runway-calculator.html#short-term-savings-comparison`

It does **not** add a 24th public tool or a 146th indexed URL. This preserves the established Carrowmont public inventory while giving Search, Ask, Tools and Learn a direct route to the decision.

## User question

The comparison answers: **How much near-term money should remain instantly accessible, and how could the rest compare across common short-term options if I enter the rates and maturities myself?**

The user enters:

- current short-term savings amount;
- optional goal amount;
- horizon from 1 to 60 months;
- amount that must remain instantly accessible;
- optional monthly additions;
- fixed or flexible goal date;
- accessible-savings rate;
- optional fixed/term deposit rate and maturity;
- optional money-market/cash-fund yield assumption;
- optional short-government-bill yield and maturity.

No rate is fetched, inferred or silently supplied.

## Deterministic comparison method

1. The chosen instant-access reserve is separated first.
2. New monthly contributions stay in accessible savings in this model; the tool does not silently construct deposit ladders.
3. Accessible savings compounds the current balance and monthly additions at the user-entered annual rate.
4. A term/fixed deposit applies its user-entered rate to the lockable balance until maturity. If it matures before the goal date, its proceeds are modeled at the accessible-savings rate for the remaining months. If maturity is after the goal date, the option is a mismatch and no goal-date value is claimed.
5. A money-market/cash-fund scenario is always marked conditional because it is an investment-fund scenario rather than a protected bank deposit.
6. A short government bill/security is modeled on a hold-to-maturity basis. A maturity after the goal date is a mismatch because an early sale can expose value to market-rate changes.
7. The highest modeled ending value is described only as a scenario result, never as a recommendation or guarantee.
8. If a goal amount is supplied, the tool shows the modeled gap or surplus for completed, deadline-compatible scenarios.

## Country terminology

The same deterministic engine is reused globally. Labels adapt to context, including:

- India: **Fixed deposit (FD)** / liquid or money-market fund / Treasury bill;
- United States: **Certificate of deposit (CD)** / money-market or cash fund / Treasury bill;
- Canada: **Term deposit / GIC** / money-market or cash fund / Government T-bill;
- United Kingdom: **Fixed-term savings account** / money-market or cash fund / Treasury bill;
- Australia and New Zealand: **Term deposit** / money-market or cash fund / short government security;
- other regions: neutral global terminology.

Changing currency changes the display unit and number formatting only. It does not convert the user's entered amounts.

## Safety and product boundaries

The comparison does not model or claim:

- live rates or provider availability;
- taxes or fees;
- local deposit-protection limits or institution eligibility;
- early-withdrawal penalties;
- future reinvestment rates;
- guaranteed money-market-fund values or yields;
- provider recommendations;
- automatic account/profile saving.

Users are told to verify actual product terms with the provider and local regulator.

## Discovery and content integration

- The existing Emergency Fund tool card includes a direct comparison link.
- The short-term-savings Learn guide includes a direct action callout to the comparison.
- The existing Emergency Fund Search entry gains short-term-savings comparison keywords, aliases and compare intent.
- Search inventory remains **145 entries** and Tools directory remains **23 cards**.
- No new sitemap URL is introduced.

## Release acceptance

Do not call Batch 12B-2 deployed until all of the following are true:

1. deterministic source/standards checks are green;
2. Publisher creates exactly Main and QA PRs;
3. human review approves both PRs and they are merged in the normal sequence;
4. deployed Chrome Desktop, Edge Desktop and Mobile Chromium QA are green;
5. Multi-Repo Guard is green;
6. a fresh all-green Source Snapshot is generated and becomes the new baseline.

No workflow file is changed by this release, so temporary PAT **Workflows: Read and write** permission is not required.
