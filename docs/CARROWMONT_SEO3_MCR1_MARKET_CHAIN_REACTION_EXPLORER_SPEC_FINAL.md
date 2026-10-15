# CARROWMONT SEO3-MCR1 — MARKET CHAIN REACTION EXPLORER

## Product, Content, SEO & Implementation Specification — FINAL

**Project:** Carrowmont  
**Workstream:** SEO3-MCR1  
**Product name:** Market Chain Reaction Explorer  
**Public-facing H1:** What Happens When Markets Change?  
**Status:** FINAL — owner-approved product direction; Batch 1 implementation authorized.  
**Implementation baseline:** Carrowmont Source Snapshot 68, generated 15 October 2026 at 05:38:31 UTC.  
**Main-site baseline commit:** `71f321a742f48da3f3e3beff14d568ad6ee306c7`  
**Central QA baseline commit:** `ad0c64b83253adcb657fd6b1e256fe2cd4d33fc0`  
**Implementation rule:** Production changes must remain hash-anchored to Snapshot 68. If any target base file changes before Publisher execution, rebuild from a fresh clean Source Snapshot rather than bypassing the guard.  

---

# 1. Purpose

SEO3-MCR1 will create a public, free, no-login Carrowmont authority product that helps a non-specialist understand how one financial or economic change can transmit into other parts of markets and the economy.

The core user question is:

> **If this happens, what could happen next — why, through which channels, and what could make the normal relationship break?**

This product is not a prediction calculator, trading signal, price target, portfolio-loss calculator, personalized recommendation, or market-timing tool.

Its job is to make cause-and-effect understandable without pretending that financial relationships are fixed.

The product should teach five ideas exceptionally well:

1. A market move is not enough information by itself; **why it happened matters**.
2. A single event can create several competing forces at the same time.
3. Some relationships are mechanical; many others are tendencies, not laws.
4. Different sectors, assets, countries and currencies can react differently to the same event.
5. The most useful answer is often not simply “up” or “down”, but **which forces are operating and what could make the opposite happen**.

---

# 2. Strategic role

SEO3-MCR1 becomes the central navigation and explanation layer for Carrowmont's **Global Macro Risk & Financial Resilience** work.

It connects existing and planned authority assets instead of replacing them.

The Explorer should connect naturally to existing Carrowmont macro assets such as:

- US Debt & Interest Cost Calculator;
- Gold Macro Stress Explorer;
- Silver Supply, Demand & Macro Stress Explorer;
- existing Gold and Silver Learn content;
- inflation content;
- later Oil Shock, Bond Yield, U.S. default, copper and stagflation content.

Existing planned workstreams are not silently deleted. Their priority may change and their future UX should integrate with the Explorer where useful.

The Explorer is an **authority/education product**, not a core personal-planning calculator. It must not displace the current homepage core-tool grid or alter its country-aware ordering without a separately approved homepage decision.

---

# 3. Controlling Carrowmont standards

Implementation is subordinate to the current versions in the authoritative source snapshot of:

- `docs/CARROWMONT_ARCHITECTURE.md`
- `docs/CARROWMONT_SHARED_UI_STANDARD.md`
- the current Learn localization standard
- the current SEO3 authority/traffic plan
- the current Gold Macro Stress Explorer specification
- the current Silver Supply, Demand & Macro Stress Explorer specification
- the current US Debt & Interest Cost Calculator specification
- the current GitHub automation / Publisher handover

Where this specification is silent, the current repository standards control.

Permanent rules include:

- one Carrowmont ecosystem / one shared shell;
- global-first financial logic;
- country and currency remain separate concepts;
- country-aware terminology where it genuinely improves understanding;
- no cloned country doorway pages;
- no fake experts or fabricated credentials;
- no mass thin AI pages;
- no silent change to existing calculator mathematics;
- no login wall for the core product;
- no client-side third-party market-data or AI dependency in V1;
- no price-prediction language;
- no weakening QA merely to obtain GREEN;
- latest clean snapshot only for production implementation.

---

# 4. Non-negotiable editorial positioning

The product must clearly separate:

- definitions and mechanical relationships;
- common economic transmission channels;
- context-dependent market tendencies;
- historical examples;
- current facts where explicitly dated;
- Carrowmont interpretation;
- uncertainty.

Never publish wording such as:

- “Stocks will fall.”
- “Gold will rise.”
- “War means gold goes up.”
- “Fed cuts always make stocks rise.”
- “Higher debt means the U.S. will default.”
- “The dollar is about to collapse.”
- “Copper is guaranteed to outperform.”
- “This is the best asset to own.”
- “Buy / sell / hold” as a recommendation.

Preferred wording includes:

- “Usually a headwind, but not always.”
- “Usually supportive, depending on the cause.”
- “This can create upward/downward pressure.”
- “The effect is mixed.”
- “There is no reliable one-way relationship.”
- “The result depends on which force dominates.”
- “This is an educational framework, not a market forecast or investment recommendation.”

---

# 5. Product identity and canonical search presentation

## 5.1 Canonical URL

`https://carrowmont.com/market-chain-reaction-explorer.html`

The canonical URL must remain stable after launch.

## 5.2 Product name

**Market Chain Reaction Explorer**

## 5.3 Recommended HTML title

**What Happens When Markets Change? | Carrowmont**

## 5.4 H1

**What Happens When Markets Change?**

## 5.5 Hero explanation

Recommended meaning:

> Understand how bond yields, interest rates, oil, inflation, the U.S. dollar, debt stress and geopolitical shocks can affect stocks, bonds, gold, silver, copper and the wider economy — and why the usual relationship can sometimes break.

## 5.6 Primary CTA

**Explore a market chain reaction**

Do not use “Calculate”, “Predict”, “Forecast”, “Signal” or “Best investment” in the primary CTA.

---

# 6. Core user model

The Explorer uses three questions.

### 1. What changed?

Example: **Bond yields rise**

### 2. Why did it happen?

Example: **Inflation concerns increased**

### 3. What do you want to understand?

Example: **Gold**

The result then provides:

1. a direct plain-English answer;
2. the causal chain;
3. the relationship type;
4. competing forces;
5. the **Chain Breaker** — what could make the opposite happen;
6. sector / economy differences where useful;
7. a historical example where appropriate;
8. sources and evidence;
9. related Carrowmont paths.

---

# 7. Relationship types — an important trust feature

Every displayed arrow must be classified internally and, where useful, visibly as one of the following.

## 7.1 Mechanical relationship

A relationship that follows directly from financial mathematics or a defined mechanism.

Example:

> For an existing fixed-rate bond, a higher required market yield means a lower bond price, all else equal.

Use only where the relationship is genuinely mechanical.

## 7.2 Economic transmission

A common causal channel that can be offset by other forces.

Example:

> Higher oil prices can increase transport and production costs and therefore add inflation pressure.

## 7.3 Market tendency

A recurring market relationship that is not guaranteed.

Example:

> Higher real yields are often a headwind for gold because they increase the opportunity cost of holding a non-yielding asset.

## 7.4 Context-dependent relationship

A relationship for which the direction can reasonably change depending on the cause or surrounding conditions.

Example:

> Rising bond yields can accompany rising stocks when strong growth and earnings are the reason yields are increasing.

This distinction must prevent the UI from presenting market tendencies as laws.

---

# 8. Approved result vocabulary

The visible verdict must come from this controlled vocabulary:

- **Usually supportive** — for an asset, sector or economic condition where the relationship is generally favorable/supportive
- **Usually a headwind** — for an asset, sector or economic condition where the relationship is generally adverse
- **Usually pushes higher** — for directional measures such as inflation pressure, borrowing costs, policy rates or yields
- **Usually pushes lower** — for directional measures such as inflation pressure, borrowing costs, policy rates or yields
- **Mixed / cause-dependent**
- **Indirect effect**
- **No reliable one-way relationship**
- **Mechanical inverse relationship** — reserved for genuine cases such as fixed-rate bond price versus yield

Do not use:

- Bullish / bearish as the primary public label;
- Buy / sell;
- Good / bad investment;
- Guaranteed protection;
- Certain rise / certain fall.

“Bullish” or “bearish” may appear only when explaining widely used market terminology, not as Carrowmont's recommendation language.

Direction-label rule:

- Do not describe higher inflation, higher borrowing costs or higher yields as merely “supportive” or “a headwind” when the visitor is asking what happens to that measure.
- Use **Usually pushes higher** or **Usually pushes lower** so the answer is immediately understandable.
- Reserve **supportive/headwind** wording primarily for assets, sectors, purchasing power, growth and financial conditions where those words have a clear ordinary-language meaning.
- If direction depends materially on why the event occurred, use **Mixed / cause-dependent** instead of forcing a directional label.


---

# 9. Terminology contract

## 9.1 Bond yield vs interest rate

Do not treat these as synonyms.

- **Policy rate**: a rate set or targeted by a central bank.
- **Government bond yield**: the market return/yield on government debt of a specified maturity.
- **Borrowing rate**: the rate paid by a household or company.

If the subject is the United States, “Treasury yield” is appropriate. For a global concept, use “government bond yield”.

## 9.2 Inflation

Distinguish when needed between:

- headline inflation;
- underlying/core inflation;
- inflation expectations.

Do not write as if an oil-price rise automatically produces the same increase in all three.

## 9.3 U.S. fiscal terminology

Never conflate:

- annual federal deficit;
- federal debt;
- debt held by the public;
- total/gross federal debt;
- debt ceiling;
- debt-limit standoff;
- missed payment/default.

These are separate concepts and must be defined before being connected.

## 9.4 U.S. dollar

On first substantive reference use **U.S. dollar**, not simply “dollar”, unless context makes ambiguity impossible.

## 9.5 Stocks / shares

Global primary wording: **stocks / stock market**.

India may use **share market** as a supporting familiar term in country-aware helper copy or FAQ/search copy where useful. Do not replace the global concept everywhere with an India-specific synonym.

## 9.6 Gold / silver / copper

Do not describe silver as “cheap gold”.

Do not describe copper as a precious metal.

Explain the different demand structures:

- gold: predominantly monetary/investment/official-sector and jewellery influences;
- silver: precious-metal plus industrial demand;
- copper: predominantly industrial/economic/infrastructure demand and physical supply.

## 9.7 War / geopolitical risk

Search-facing content may use the word **war** when that is the natural query. Editorial prose should use the more precise event type where possible: conflict, shipping disruption, sanctions, oil-supply risk, manufacturing disruption, or geopolitical stress.

Do not imply “war = stocks down, gold up”.

## 9.8 Crash / crisis

Use “crash” only when answering a genuine crash query, describing a historical crash, or labeling a hypothetical scenario. Never imply that a crash is imminent.

Use “debt crisis” only when discussing a defined fiscal/market-stress scenario; do not use it as a synonym for high debt.

---

# 10. Country and currency architecture

The existing Carrowmont rule remains:

> **Universal financial logic -> country profile -> selected currency -> localized terminology and presentation.**

For this Explorer:

- the economic mechanism remains universal unless the event is explicitly jurisdiction-specific;
- selected country may change helper terminology and approved country context;
- selected currency remains a separate user choice in the shared shell;
- changing currency does not alter the economic relationship;
- no exchange-rate conversion is implied;
- no country-specific duplicate Explorer pages are created simply for localization;
- country lists retain the shared alphabetical order with `Other / International` last;
- currency options retain the shared `ISO CODE · Currency Name` convention;
- existing shared locale UI must be reused, not redesigned.

### Jurisdiction-specific event rule

A specific event keeps its real jurisdiction even when the visitor selects another country.

Examples:

- “Federal Reserve cuts rates” remains a U.S. event.
- “U.S. Treasury yields rise” remains a U.S. market event.
- “U.S. debt stress increases” remains U.S.-specific.

Country selection may add a local **“What could this mean for your market?”** note where there is strong sourced evidence, but must not rewrite the event into something it is not.

---

# 11. Country-lens rule

V1 must not manufacture shallow country versions for every supported market.

The main explanation is global.

A country-lens module may be shown only when there is a materially different and well-sourced transmission mechanism.

Examples:

- oil importer vs oil exporter;
- reserve-currency issuer vs foreign-currency borrower;
- local central-bank response;
- local currency pass-through.

Country-lens copy must come from an explicit version-controlled profile, not generic AI generation.

If no sufficiently strong local explanation exists, show the global explanation only.

---

# 12. V1 event library

V1 should launch with a curated library rather than every imaginable event.

The initial approved events are:

1. **Government bond yields rise**
2. **Government bond yields fall**
3. **Central bank raises its policy rate**
4. **Central bank cuts its policy rate**
5. **Oil prices rise sharply**
6. **Inflation rises**
7. **U.S. dollar strengthens**
8. **Geopolitical conflict escalates**
9. **U.S. fiscal/debt stress increases**
10. **Recession risk rises**
11. **Stagflation develops**
12. **U.S. Treasury payment/default stress** — special hypothetical scenario with enhanced warnings

The event list may be expanded only when the new event adds a distinct educational mechanism and enough sourced relationship content to justify inclusion.

Do not auto-create an “opposite” event by mechanically reversing all arrows. Inverse relationships must be separately authored and reviewed.

---

# 13. Cause library

Each event has a curated “Why?” list.

Examples:

## Government bond yields rise

- stronger economic growth;
- higher inflation or inflation expectations;
- expectations of higher policy rates for longer;
- heavier government borrowing / higher term premium;
- reduced demand for safe government bonds.

## Government bond yields fall

- weaker growth / recession fear;
- lower inflation expectations;
- expectations of policy-rate cuts;
- flight to safety / stronger demand for government bonds.

## Central bank cuts policy rates

- inflation is cooling and policy is normalizing;
- growth is weakening;
- recession risk is rising;
- financial stress requires faster support.

## Oil prices rise sharply

- supply disruption;
- geopolitical / shipping risk;
- strong global demand;
- producer restraint / production cuts.

## Inflation rises

- energy or supply shock;
- strong demand;
- wage/services pressure;
- currency weakness/imported inflation.

## U.S. dollar strengthens

- higher relative U.S. interest rates/yields;
- stronger relative U.S. growth;
- safe-haven / liquidity demand;
- weakness in other major currencies.

## Geopolitical conflict escalates

- oil-producing region;
- major shipping route;
- manufacturing / supply-chain region;
- sanctions / financial-system channel.

## U.S. fiscal/debt stress increases

- persistent large deficits;
- increased Treasury issuance / supply;
- higher long-term risk or term premium;
- debt-limit brinkmanship.

## U.S. Treasury payment/default stress

This is not presented as a normal “cause” menu. It is a special hypothetical scenario and must state that market reactions could be disorderly and historically unprecedented in important respects.

---

# 14. V1 outcome library

The Explorer may expose only targets for which a reviewed relationship record exists.

Approved target concepts include:

- broad stock market;
- growth / technology stocks;
- energy companies;
- airlines / transport;
- banks / financials;
- existing fixed-rate bond prices;
- new government bond yields;
- borrowing costs / mortgages;
- gold;
- silver;
- copper;
- oil;
- U.S. dollar;
- inflation pressure;
- economic growth;
- consumer spending;
- emerging-market financial conditions.

Do not expose a target in the selector if the selected event has no reviewed relationship record for it.

---

# 15. Minimum V1 relationship coverage

V1 must launch with a meaningful curated network, not a demo with a handful of paths.

Minimum target coverage by event:

| Event | Required V1 targets |
|---|---|
| Government bond yields rise | broad stocks, growth/tech stocks, bond prices, borrowing costs, gold, U.S. dollar |
| Government bond yields fall | broad stocks, bond prices, borrowing costs, gold, U.S. dollar |
| Central bank raises policy rate | broad stocks, growth/tech stocks, bond yields/prices, borrowing costs, U.S. dollar, gold |
| Central bank cuts policy rate | broad stocks, bond yields/prices, borrowing costs, U.S. dollar, gold, economic growth |
| Oil prices rise sharply | inflation, broad stocks, energy, airlines/transport, consumer spending, bond yields/rates, gold, copper |
| Inflation rises | policy rates, bond yields/prices, broad stocks, gold, cash purchasing power, U.S. dollar |
| U.S. dollar strengthens | gold, silver, copper/commodities, emerging markets, U.S. multinational earnings, U.S. import-price pressure |
| Geopolitical conflict escalates | oil, inflation, gold, broad stocks, U.S. dollar, shipping/supply chains |
| U.S. fiscal/debt stress increases | Treasury yields, borrowing costs, broad stocks, U.S. dollar, gold |
| Recession risk rises | broad stocks, policy rates/yields, oil, copper, gold, U.S. dollar |
| Stagflation develops | broad stocks, bonds, gold, oil/commodities, borrowing costs, consumer purchasing power |
| U.S. Treasury payment/default stress | Treasury market functioning, broad stocks, U.S. dollar, gold, funding/credit conditions |

Every listed event-target pair must have manually authored, sourced content before it becomes selectable.

---

# 16. Cause-specific overrides

A relationship record has a default explanation, but the selected cause may change the verdict or emphasis.

Example:

**Government bond yields rise -> broad stocks**

Default verdict:

> **Mixed / cause-dependent**

Cause: stronger growth

> Better growth and earnings can partly or fully offset the pressure from higher discount rates.

Cause: inflation / fiscal risk

> Higher discount rates and borrowing costs can pressure valuations while the underlying cause may also hurt confidence.

The system must support cause-specific overrides for:

- verdict;
- direct answer;
- mechanism steps;
- competing force;
- Chain Breaker;
- historical example;
- source set.

No AI should generate these overrides at runtime.

---

# 17. The Chain Breaker — signature feature

Every relationship must answer:

> **What could make the opposite happen?**

This is mandatory, not optional decoration.

Examples:

### Fed cuts rates -> stocks

Normal simplified story:

> Lower rates can support valuations and borrowing.

Chain Breaker:

> Stocks can still fall if the Fed is cutting because recession risk and corporate earnings are deteriorating faster than lower rates can help.

### War -> gold

Normal simplified story:

> Higher uncertainty can increase defensive demand.

Chain Breaker:

> Gold can still struggle if the same shock drives real yields and the U.S. dollar sharply higher.

### Oil rises -> stocks

Normal simplified story:

> A supply-driven oil shock can raise costs and inflation pressure.

Chain Breaker:

> Oil and stocks can rise together when stronger economic demand is the main reason oil prices are increasing.

The Chain Breaker is one of the main reasons this product exists.

---

# 18. Competing-force display

Do not compress a relationship into one arrow when more than one channel is material.

Example:

**Oil rises -> Gold**

Possible support:

- geopolitical risk;
- persistent inflation concern.

Possible headwind:

- higher real yields;
- stronger U.S. dollar.

Final public message:

> **Mixed / cause-dependent. The result depends on which force dominates.**

The UI should visibly separate support and headwind channels rather than hiding conflict inside a paragraph.

---

# 19. Time-layer model

Where useful, distinguish:

- **Immediate market reaction** — repricing, liquidity, risk aversion;
- **Economic transmission** — costs, demand, financing, margins;
- **Policy response** — central-bank or fiscal reaction;
- **Longer-term adjustment** — investment, supply response, substitution, refinancing.

Do not imply that every effect appears at the same speed.

Avoid rigid promises such as “this always happens within X days” unless a specific historical example is being described.

---

# 20. Historical evidence module

A historical example is encouraged when it genuinely helps the relationship.

Rules:

- clearly label it **Historical example**;
- give dates/periods;
- separate observed facts from interpretation;
- do not imply the next episode must repeat the historical episode;
- use primary/authoritative datasets where practical;
- include at least one counterexample or caveat on relationships known to vary materially.

Recommended broad case library may include, where relevant:

- 1970s oil/inflation episodes;
- 1994 or 2022 rate/yield shocks;
- 2000-02 equity decline;
- 2008 financial crisis;
- 2020 pandemic shock;
- 2022 inflation/rate cycle;
- debt-limit episodes such as 2011/2023, explicitly noting that they were not U.S. sovereign payment defaults.

Current events may be used only as clearly dated examples and must not turn evergreen pages into short-lived predictions.

---

# 21. U.S. default special-scenario guardrails

The U.S. Treasury payment/default scenario requires stronger wording than ordinary events.

Mandatory statement near the result:

> **Hypothetical scenario:** The United States has not provided a normal historical precedent for the full market reaction to a modern Treasury payment default. The channels below explain plausible transmission mechanisms, not a forecast of what every asset would do.

For Treasury yields, the U.S. dollar and gold, the verdict may need to be:

> **No reliable one-way relationship**

because safe-haven, liquidity, collateral, currency and confidence effects can conflict.

Do not show a countdown to default.

Do not equate a debt-ceiling date with a guaranteed default date.

Do not state that high debt itself means default is imminent.

---

# 22. Page layout

Recommended page order:

1. canonical Carrowmont header / locale control;
2. breadcrumb;
3. product eyebrow: **Market Chain Reaction Explorer**;
4. H1: **What Happens When Markets Change?**;
5. one-paragraph plain-English explanation;
6. three-step Explorer control;
7. primary direct-answer card;
8. relationship-type label;
9. visual causal chain;
10. competing forces;
11. Chain Breaker;
12. who/what may be affected differently;
13. time layers where useful;
14. country lens where a reviewed profile exists;
15. historical example;
16. related questions / related Carrowmont assets;
17. methodology and source disclosure;
18. educational-use disclaimer;
19. canonical Carrowmont footer.

Keep the direct answer above dense detail on both desktop and mobile.

---

# 23. Direct-answer standard

The first result must be understandable without finance training.

Target style:

> **Usually a headwind, but not always.** Higher bond yields can make future company profits less valuable in today's terms and can make bonds more competitive with stocks. But if yields are rising because economic growth and earnings are improving, stocks can still rise.

Rules:

- 2-4 short sentences;
- no unexplained jargon;
- no price target;
- no personalized advice;
- no unnecessary technical caveat before the answer;
- deeper nuance immediately available below.

---

# 24. Plain-English glossary

Technical terms should have short inline explanations or a glossary.

Minimum glossary terms:

- bond yield;
- bond price;
- policy rate;
- real yield;
- inflation expectations;
- term premium;
- yield curve;
- discount rate;
- safe-haven demand;
- risk premium;
- stagflation;
- fiscal deficit;
- debt held by the public;
- debt ceiling;
- default.

A definition should explain the concept in one or two sentences before offering a technical expansion.

---

# 25. Visualization rules

The main chain should use semantic HTML/CSS components where practical rather than putting essential text inside a complex SVG.

Example:

`Oil prices rise` -> `Transport / production costs rise` -> `Inflation pressure may rise` -> `Rates may stay higher` -> `Borrowing becomes more expensive`

Requirements:

- each step is text-readable;
- arrows have accessible meaning;
- no meaning communicated by color alone;
- connectors reflow vertically on mobile;
- no clipped text at 390 px or 360 px;
- no SVG text outline/stroke artifacts;
- a text equivalent remains available to assistive technology;
- long labels wrap cleanly.

---

# 26. Static HTML / no-JavaScript SEO fallback

The Explorer may use JavaScript for interaction, but the page must not be an empty application shell.

Raw HTML should contain:

- H1 and clear product explanation;
- a substantial explanation of how cause-and-effect works;
- the distinction between mechanical relationships and market tendencies;
- summaries of the major V1 event families;
- at least one complete worked chain example;
- Chain Breaker explanation;
- methodology/source summary;
- crawlable links to the supporting Learn pages.

Provide a `<noscript>` fallback that explains the Explorer requires JavaScript for interactive selection and offers direct links to the major Learn articles.

No essential SEO content should exist only after a click.

---

# 27. Shareable Explorer state

A selected relationship may be shareable.

Recommended state example:

`#event=bond-yields-rise&cause=inflation&target=gold`

Rules:

- state fragments are an application convenience, not separate indexable content;
- the canonical URL always remains the base Explorer URL;
- no fragment state enters the sitemap;
- title/H1/structured-data identity remains the base Explorer;
- invalid state values fall back safely to the default Explorer state;
- values are allowlisted against the static event/cause/target registry.

Search discovery for specific questions should come from substantial Learn pages, not fragment states.

---

# 28. Deterministic content architecture

The Explorer must not generate explanations using an AI model at runtime.

Recommended conceptual data separation:

- event registry;
- cause registry;
- target registry;
- relationship records;
- cause-specific overrides;
- historical examples;
- source registry;
- country-lens profiles.

The UI should resolve the selected state through a pure deterministic function that returns a reviewed result object.

Conceptual result object:

```text
relationshipId
eventId
causeId
targetId
verdict
relationshipType
directAnswer
mechanismSteps[]
supportingForces[]
headwinds[]
chainBreaker
whoMayBenefit[]
whoMayBePressured[]
timeLayers[]
historicalExampleId
sourceIds[]
reviewedDate
scenarioWarning
countryLensId
```

Do not calculate a probability of an asset rising or falling.

Do not assign a fake precision score such as “72% likely”.

---

# 29. Source hierarchy

For financial/YMYL content, source quality is a product requirement.

Preferred hierarchy:

### Tier 1 — primary / official

- central banks;
- finance ministries / Treasuries;
- national statistical agencies;
- CBO / GAO or equivalent fiscal institutions;
- BIS;
- IMF;
- World Bank;
- IEA where relevant to energy/minerals;
- official market/regulatory data.

### Tier 2 — specialist industry bodies / established research

Use where they are primary for the specific market topic, for example:

- World Gold Council for gold-market research/data;
- Silver Institute / Metals Focus for silver physical-market work.

Clearly identify that these are specialist/industry sources rather than government statistics.

### Tier 3 — academic / peer-reviewed / central-bank research

Use for transmission mechanisms and historical evidence.

### Tier 4 — reputable market/institutional research

Use for interpretation or current examples when a stronger primary source is not available.

### News sources

Use mainly for dated current-event context, not as the sole foundation of an evergreen financial mechanism where primary evidence exists.

Avoid generic investment blogs as the foundation for YMYL claims.

---

# 30. Source provenance requirements

Every relationship record must contain at least one source and normally more than one for context-dependent claims.

Every source record should contain:

- publisher;
- title;
- URL;
- publication/update date where available;
- source type;
- claim(s) supported;
- reviewed date.

The page should provide a collapsed-by-default **Sources & evidence** area, with enough transparency that a reader can inspect where the explanation came from.

Do not claim a source proves more than it actually does.

---

# 31. Current-market context module

Evergreen content remains the core.

A supporting Learn page may include a clearly dated module such as:

**Current market context — reviewed [date]**

Rules:

- current context never replaces the evergreen explanation;
- claims must be sourced;
- the page title/H1 should normally remain evergreen;
- `dateModified` changes only when content changes materially;
- do not change dates merely to appear fresh;
- stale current-context material must be updated, removed or relabeled.

V1 Explorer itself should not depend on live prices.

---

# 32. SEO principle — one Explorer, focused supporting pages

Do not create one indexable URL for every event/cause/target combination.

That would create thin/near-duplicate pages and weaken quality.

The Explorer handles the combinatorial interaction.

Standalone pages are created only when:

1. the search intent is materially distinct;
2. the question can be answered comprehensively on its own;
3. the page adds substantial unique analysis;
4. there is enough reliable evidence;
5. it has a clear internal-link role;
6. it does not cannibalize an existing Carrowmont page.

There is no arbitrary word-count target.

Completeness and usefulness control page length.

---

# 33. Initial supporting Learn URL ownership map

The following pages are the recommended macro network. They should be built in controlled batches, not all at once simply to create volume.

| URL | Primary ownership |
|---|---|
| `what-happens-when-bond-yields-rise.html` | broad bond-yield rise intent |
| `why-do-stocks-fall-when-bond-yields-rise.html` | stocks-specific yield mechanism |
| `what-happens-to-gold-when-bond-yields-rise.html` | gold-specific yield mechanism |
| `how-oil-prices-affect-inflation.html` | oil -> inflation |
| `how-oil-prices-affect-stock-market.html` | oil -> stocks |
| `why-higher-oil-prices-dont-always-hurt-stocks.html` | demand-vs-supply counterexample intent |
| `how-war-and-geopolitical-risk-affect-markets.html` | broad geopolitical transmission |
| `how-war-affects-gold-and-oil.html` | gold/oil-specific geopolitical relationship |
| `how-us-debt-affects-financial-markets.html` | debt -> rates/markets overview |
| `how-us-debt-affects-bond-yields.html` | debt/issuance -> yields |
| `what-happens-if-us-defaults-on-debt.html` | hypothetical default scenario |
| `what-happens-when-fed-cuts-interest-rates.html` | Fed cut broad intent |
| `why-stocks-can-fall-after-fed-rate-cut.html` | recession/emergency-cut counterexample |
| `what-happens-when-dollar-strengthens.html` | broad dollar-strength intent |
| `gold-vs-silver-vs-copper.html` | different metal demand structures |
| `why-silver-is-different-from-gold.html` | silver dual demand identity |
| `why-copper-prices-rise-and-fall.html` | copper drivers |
| `what-happens-during-stagflation.html` | stagflation transmission |

Before creating any of these, audit the current sitemap/repository for an existing page that already owns the same intent.

Do not create a duplicate just because this specification lists a candidate slug.

---

# 34. Recommended rollout batches

## Batch 1 — foundation

- Market Chain Reaction Explorer;
- `what-happens-when-bond-yields-rise.html`;
- `how-oil-prices-affect-inflation.html`;
- `what-happens-when-fed-cuts-interest-rates.html`;
- `what-happens-when-dollar-strengthens.html`.

## Batch 2 — high-value relationship depth

- `why-do-stocks-fall-when-bond-yields-rise.html`;
- `what-happens-to-gold-when-bond-yields-rise.html`;
- `how-oil-prices-affect-stock-market.html`;
- `why-stocks-can-fall-after-fed-rate-cut.html`;
- `how-war-and-geopolitical-risk-affect-markets.html`.

## Batch 3 — fiscal stress + hard assets

- U.S. debt / yields page;
- hypothetical default page;
- gold vs silver vs copper;
- copper drivers;
- stagflation.

Later batches should be driven by Search Console query/impression evidence and genuine content gaps, not a target number of pages.

---

# 35. Supporting Learn article template

Each relationship article should answer one question exceptionally well.

Recommended structure:

1. **30-second answer** — direct response to the query;
2. **What changed?** — define the event;
3. **Why did it happen?** — explain major causes;
4. **The chain reaction** — simple visual and text path;
5. **Why the effect is not automatic**;
6. **What could make the opposite happen?** — Chain Breaker;
7. **Who/what may react differently?** — sectors/assets/countries;
8. **Historical example**;
9. **What to watch** — indicators, not trading instructions;
10. **Explore the relationship** — contextual Explorer CTA;
11. **Related Carrowmont pages/tools**;
12. **Sources & methodology**;
13. **Educational-use disclaimer**.

The article must answer the search question independently. It must not be a thin doorway whose only purpose is to send the user to the Explorer.

---

# 36. Internal-link architecture

Use contextual linking, not indiscriminate all-to-all linking.

Each supporting article should normally link to:

- the Market Chain Reaction Explorer;
- one upstream cause page;
- one or two downstream effect pages;
- the relevant existing Carrowmont authority tool where useful.

Examples:

`how-oil-prices-affect-inflation.html`

-> Market Chain Reaction Explorer  
-> Inflation Calculator / relevant inflation Learn content  
-> `how-oil-prices-affect-stock-market.html`  
-> Gold/Silver macro content when the paragraph genuinely discusses those channels

`how-us-debt-affects-bond-yields.html`

-> US Debt & Interest Cost Calculator  
-> Market Chain Reaction Explorer  
-> `what-happens-when-bond-yields-rise.html`

Anchor text should describe the destination naturally; avoid repetitive exact-match keyword stuffing.

Do not create placeholder links to unpublished pages.

---

# 37. Search and AI-search trust requirements

Finance is YMYL content. Therefore:

- claims must be accurate and sourced;
- primary/authoritative sources should be preferred;
- authorship/publisher identity must be truthful;
- no fabricated qualifications;
- methodology must be visible;
- article dates must be accurate;
- current figures must carry an `as of` or reviewed date;
- the product should add original explanatory value rather than merely summarize other sites;
- AI/automation must not be used to scale hundreds of thin pages.

The Explorer's original value should come from its structured causal model, cause-specific overrides, Chain Breaker, relationship-type classification, historical counterexamples and global/local context.

---

# 38. Structured data

## Explorer

Use the established Carrowmont authority-tool pattern, expected to include:

- `WebApplication` where consistent with current authority tools;
- `BreadcrumbList` where consistent with current site architecture;
- accurate Organization/site identity already established by Carrowmont.

Do not imply:

- live data if the Explorer is not live;
- investment advice;
- market forecasts;
- guaranteed relationships.

## Learn pages

Use:

- `Article` or `BlogPosting` as appropriate;
- `BreadcrumbList`;
- truthful author/publisher and date fields.

FAQ sections may exist for users, but do not build the SEO strategy around FAQ rich results.

Validate structured data before release.

---

# 39. Canonical / indexing rules

- Every public Learn page has one self-referencing canonical URL.
- The Explorer has one canonical base URL.
- Explorer states are not separate indexable pages.
- Only canonical public pages enter the XML sitemap.
- `lastmod` changes only when the page changes materially.
- No accidental `noindex` on launch pages.
- No search-only doorway pages.
- No country clones containing substantially the same English article.
- Existing URLs must not be changed simply to fit a new naming idea.
- Before creating a new slug, check the current repository for an existing intent owner.

---

# 40. Content language style

Write for an intelligent beginner.

Rules:

- explain jargon at first use;
- prefer short sentences for causal steps;
- use examples before formulas;
- distinguish “can”, “often”, “usually” and “must” carefully;
- avoid hype and fear language;
- avoid “Wall Street says”, “experts know”, or vague authority;
- do not overuse “could” so heavily that the answer becomes meaningless — give a clear base case, then explain the conditions;
- never hide uncertainty;
- do not write a generic 2,000-word article when 900 useful words answer the question, and do not stop at 900 if the topic genuinely needs more.

---

# 41. No personalized investment recommendation

The Explorer may explain how asset classes or sectors can react.

It must not tell a visitor:

- how much gold/silver/copper to own;
- whether to buy a specific stock;
- whether to exit the market;
- whether to time a crash;
- which asset is “best” for the visitor;
- what return the visitor should expect.

If future personalization is proposed, it requires a separate product/safety specification.

---

# 42. Educational disclaimer

Use clear, unobtrusive wording near results and in methodology/footer areas.

Recommended meaning:

> **Educational framework, not a forecast or investment recommendation. Financial relationships can change across time, countries and market conditions.**

For hypothetical default content, add the stronger scenario-specific warning in Section 21.

---

# 43. Report / share output

V1 should provide:

- **Copy explanation**;
- **Copy share link**;
- **Generate Market Chain Reaction Report** if the existing report framework can be reused cleanly.

If PDF report is implemented, use the established Carrowmont report architecture rather than creating a new report style.

Recommended report structure:

### Page 1 — Relationship summary

- selected event;
- selected cause;
- selected target;
- direct answer;
- relationship type;
- causal chain.

### Page 2 — Nuance

- supporting forces;
- headwinds;
- Chain Breaker;
- who/what may react differently;
- historical example where used.

### Page 3 — Report Guide, Methodology & Sources

- relationship definitions;
- source list;
- limitations;
- educational-use statement.

### Page 4 — Continue with Carrowmont

Use the current standard related-tool/report card architecture and the current active registry.

No invented numeric forecast should appear in the report.

CSV is not required because the product does not produce a meaningful numeric dataset in V1.

---

# 44. Accessibility

Requirements include:

- full keyboard operation;
- visible focus states;
- semantic labels for all three selectors;
- selector changes announced appropriately, for example with `aria-live="polite"` for the refreshed result summary;
- no information communicated by color alone;
- arrows/connectors have text meaning;
- no hover-only explanations;
- expanded/collapsed source and glossary controls expose correct state;
- touch targets follow current Carrowmont standards;
- screen-reader-readable chain sequence;
- reduced-motion preference respected if animation is used;
- charts/diagrams have text equivalents;
- generated PDF remains readable and correctly ordered.

---

# 45. Responsive rules

Mandatory visual/browser widths include the current staged QA widths, including:

- desktop reference width;
- 1280 px;
- 390 px;
- 360 px.

Requirements:

- no page-level horizontal overflow;
- three selectors stack cleanly on narrow screens;
- result appears immediately after controls on mobile;
- causal chain becomes vertical when horizontal layout no longer fits;
- no clipped arrows or labels;
- source tables may use an internal scrolling container, never page-level overflow;
- long terms such as “U.S. Treasury payment/default stress” wrap safely;
- shared header/footer/locale control remain unchanged and usable.

---

# 46. Performance and privacy

- no login required;
- no personal financial data required;
- no external AI request from the visitor browser;
- no third-party market-data API required for the core Explorer;
- relationship data should be same-origin static data or bundled JS;
- user selection state remains local unless the user explicitly copies a share link;
- no sensitive user state is sent to a third party;
- preserve existing analytics/privacy behavior and QA isolation rules.

The Explorer should load quickly and should not require a large visualization library for simple causal chains.

---

# 47. Recommended implementation footprint

Exact filenames may be refined against the current repository, but scope should remain explicit.

Potential main-site files:

- `market-chain-reaction-explorer.html`
- `market-chain-reaction-explorer.css`
- `market-chain-reaction-explorer-core.js`
- `market-chain-reaction-explorer.js`
- `data/market-chain-events.json`
- `data/market-chain-relations.json`
- `data/market-chain-sources.json`
- `data/market-chain-country-lenses.json` only if approved country lenses ship in V1
- PDF renderer/report helper only if report is included
- `docs/CARROWMONT_SEO3_MCR1_MARKET_CHAIN_REACTION_EXPLORER_IMPLEMENTATION.md`

Controlled main-site updates may include:

- Tools / Explore More discovery area;
- Learn hub category/discovery area;
- relevant existing Gold, Silver, Debt and inflation internal links;
- sitemap;
- IndexNow coverage through the established mechanism.

Central QA receives dedicated source-contract and browser coverage.

Do not modify unrelated calculator repositories unless a genuine shared dependency is identified and separately approved.

Do not add new workflow files merely for this product unless an approved requirement appears during implementation.

---

# 48. Source-contract QA

Central QA must enforce at minimum:

1. canonical Explorer URL exists and is unique;
2. title/meta/H1 match approved intent;
3. sitemap contains only canonical public URLs;
4. no accidental `noindex`;
5. shared header/footer/locale architecture remains compliant;
6. every event has at least one allowed target;
7. every exposed event/cause/target combination resolves to a reviewed relationship record;
8. no duplicate relationship IDs;
9. every relationship has a controlled verdict;
10. every relationship has a direct answer;
11. every relationship has at least two mechanism steps;
12. every relationship has a Chain Breaker / opposite-condition explanation;
13. every context-dependent relationship has at least one competing-force note;
14. every relationship has one or more source IDs;
15. every source ID resolves to a valid source record;
16. U.S. default relationships carry the special hypothetical-scenario warning;
17. no relationship contains an unapproved price target or probability;
18. no auto-generated inverse relationship exists without its own record;
19. no unapproved country-specific terminology leaks into global static HTML;
20. no unpublished placeholder URL appears in navigation/internal links;
21. related Carrowmont assets link contextually without keyword stuffing;
22. structured data parses and does not make misleading forecast/advice claims;
23. no unexpected third-party application-data request occurs.

---

# 49. Editorial wording scanner

Add a targeted QA scanner over Explorer and new macro Learn content.

Flag for review terms/patterns such as:

- guaranteed;
- always rises / always falls;
- will definitely;
- inevitable default;
- dollar collapse as a prediction;
- buy now;
- sell now;
- best investment;
- guaranteed safe haven;
- risk-free;
- exact future price targets.

The scanner should not blindly fail legitimate historical quotations, source titles or disclaimers. Exceptions must be narrow and documented.

---

# 50. Browser QA

Mandatory browser tests should cover:

- default Explorer state;
- each top-level event selectable;
- cause options update correctly;
- target options filter to authored relationships;
- result changes deterministically;
- invalid share-state fallback;
- copy explanation;
- copy share link;
- Chain Breaker visible;
- source disclosure opens/closes;
- glossary works by keyboard;
- locale popover remains usable;
- India and non-India terminology sample;
- 1280/390/360 layout;
- no horizontal overflow;
- no console errors;
- no broken internal links;
- PDF generation/raster inspection if PDF ships.

Representative locale QA should include India and multiple non-India profiles from the existing standard matrix.

---

# 51. Search QA

For Explorer and each launched Learn page verify:

- 200 response;
- canonical self/approved base;
- unique title;
- unique meta description;
- exactly one intended H1;
- valid heading hierarchy;
- meaningful static HTML main content;
- crawlable contextual internal links;
- structured data validation;
- sitemap inclusion;
- no duplicate intent ownership;
- no query/fragment state in sitemap;
- IndexNow inclusion through the established process;
- correct social/open-graph metadata if this is already a Carrowmont standard;
- no year in evergreen URL/title unless the page is intentionally time-specific.

---

# 52. Search Console / traffic measurement

After launch, evaluate:

- impressions and clicks by page;
- query families rather than only one exact keyword;
- country differences;
- page indexing/canonical status;
- internal traffic from Learn -> Explorer and Explorer -> related tools;
- generative-AI search visibility where Search Console provides it;
- multimodal visibility if diagrams/images later become relevant;
- Bing discovery/indexing and referral visibility through the existing process.

Do not promise ranking positions or traffic numbers.

Use Search Console evidence to decide which additional relationship deserves a standalone page.

Do not generate pages merely because an Explorer combination exists.

---

# 53. Content maintenance

## Evergreen mechanisms

Review at least when:

- a major authoritative source materially changes the accepted explanation;
- a structural market regime change makes the page misleading;
- a source link is dead or superseded;
- Search Console reveals a user intent the page is failing to answer.

## Current-context modules

Review more frequently and only keep them when they add value.

## Source-dependent statistics

Update when the underlying authoritative annual/periodic source updates, for example:

- CBO fiscal baseline;
- IEA critical-minerals outlook;
- Silver Institute / Metals Focus silver outlook;
- official central-bank/fiscal publications.

Do not change `dateModified` unless the content materially changes.

---

# 54. Evidence anchors for the initial editorial library

The V1 research base should include, among other relevant primary/authoritative sources:

- Google Search Central — people-first content / YMYL / E-E-A-T;
- Google Search Central — spam policies and scaled content abuse;
- Google Search Central — canonicalization and JavaScript SEO guidance;
- Federal Reserve — Treasury yield / term-premium research;
- Federal Reserve Banks — supply-vs-demand shock research and oil-market transmission;
- CBO — U.S. debt, deficit and interest-cost projections;
- GAO / Treasury where relevant to debt-limit/default mechanics;
- BIS — international financial transmission / dollar / safe-haven research where relevant;
- World Bank / IMF where relevant to macro transmission;
- IEA — copper / critical-mineral demand and supply;
- World Gold Council — gold driver research, clearly labeled as specialist industry research;
- Silver Institute / Metals Focus — silver supply/demand research, clearly labeled as specialist industry research.

Reference URLs should be stored centrally rather than hard-coded repeatedly across relationship records.

---

# 55. Current authoritative research notes to preserve

The specification is consistent with several important current findings:

- Google states that YMYL topics receive stronger emphasis on trust and strong E-E-A-T signals, and that useful content should be people-first and original.
- Google treats large-scale low-value content made to manipulate rankings as scaled content abuse.
- Google recommends canonicalization and crawlable, substantive page content rather than relying on many duplicate variants.
- Federal Reserve research emphasizes that long-term Treasury yields can rise for different reasons, including supply-side and fiscal risks; the reason matters for downstream effects.
- San Francisco Fed research shows that oil can rise with stocks when strong demand is the driver, while a supply squeeze can produce higher oil and weaker stocks.
- CBO projects large and rising U.S. public debt and net interest costs, but this does not itself establish an imminent default.
- World Gold Council research emphasizes that gold reacts to multiple competing forces including real rates, the U.S. dollar and geopolitical risk.
- Silver Institute research shows silver can simultaneously face physical-market deficits, industrial-demand change, thrifting/substitution and investment demand.
- IEA research shows large long-run copper demand growth and persistent potential supply gaps, while actual price behavior still depends on growth, supply, inventories and market conditions.

These findings should inform the content architecture but should not be copied as unsupported one-line rules.

---

# 56. Release sequencing

## Gate A — specification

- owner approves this specification;
- specification is committed to `/docs` under protected workflow;
- fresh Source Snapshot generated after the approved docs commit if that is the current Carrowmont release practice.

## Gate B — implementation

Build only from the latest clean Source Snapshot.

Recommended first production batch:

- Explorer;
- four Batch-1 Learn pages;
- internal linking;
- sitemap/IndexNow integration;
- central QA.

## Gate C — staged validation

Use the established disposable staging-branch + Batch PR Publisher flow.

The Publisher must validate the exact packaged bundle before PR creation.

Do not merge the staging branch itself into `main`.

## Gate D — live validation

After approved PR merges:

- live Automated QA GREEN;
- Multi-Repo Guard GREEN;
- Search/indexing smoke checks;
- fresh clean Source Snapshot.

Never weaken QA to force GREEN.

---

# 57. Definition of done

SEO3-MCR1 V1 is complete only when all applicable items are true:

- [ ] Market Chain Reaction Explorer is live at the canonical URL.
- [ ] It uses the current Carrowmont shared shell without visual drift.
- [ ] The core question is understandable to a non-specialist.
- [ ] The three-step What changed? / Why? / What does it affect? flow works.
- [ ] Only manually reviewed relationships are selectable.
- [ ] Every relationship has a direct answer, mechanism, evidence and Chain Breaker.
- [ ] Mechanical relationships and market tendencies are clearly distinguished.
- [ ] No price forecasts, trading signals or personalized recommendations appear.
- [ ] U.S. debt / debt ceiling / default terminology is precise.
- [ ] Bond yield / policy rate / borrowing-rate terminology is precise.
- [ ] Gold, silver and copper are explained according to their different demand structures.
- [ ] Country/currency architecture follows current Carrowmont standards.
- [ ] Global static HTML does not leak India-only terminology or currency examples.
- [ ] No country doorway pages are created.
- [ ] Explorer state does not create indexable thin URL variants.
- [ ] Supporting articles independently satisfy their search intent.
- [ ] No duplicate page/query ownership is introduced.
- [ ] Article/WebApplication/Breadcrumb structured data is valid where applicable.
- [ ] Primary/authoritative sourcing is visible and claim-appropriate.
- [ ] No fake authorship/expertise is introduced.
- [ ] Static HTML contains substantive crawlable content.
- [ ] Mobile 390/360 and desktop/1280 QA pass without overflow.
- [ ] Keyboard/screen-reader requirements pass.
- [ ] No unexpected client-side external API/AI requests occur.
- [ ] Sitemap and IndexNow coverage are correct.
- [ ] Staged Publisher is GREEN.
- [ ] Live Automated QA is GREEN.
- [ ] Multi-Repo Guard is GREEN.
- [ ] A fresh clean Source Snapshot is taken after release.

---

# 58. Final product principle

Carrowmont should not try to win by publishing the loudest prediction.

It should win by being the place that explains:

> **what changed, why it changed, what it can affect next, why that relationship exists, and what could make the opposite happen.**

That principle should control every relationship, article, diagram, report and future macro expansion.
