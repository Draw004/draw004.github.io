# Carrowmont Shared UI Standard

**Document:** `CARROWMONT_SHARED_UI_STANDARD.md`  
**Version:** 1.0  
**Status:** Approved baseline for implementation  
**Date:** 1 October 2026  
**Scope:** Main Carrowmont website and all active Carrowmont planning tools  
**Baseline source snapshot:** 1 October 2026, generated `2026-10-01T02:54:27Z`

## 1. Purpose

Carrowmont should feel like one connected financial-planning product, not a collection of visually separate calculators. Shared interface elements must therefore look and behave consistently across the main website and every Carrowmont tool.

This standard defines the common user-interface shell for:

- header and brand treatment;
- top navigation;
- country and currency control;
- shared buttons and interaction states;
- footer and cross-tool navigation;
- desktop and mobile responsive behavior;
- accessibility requirements;
- source-of-truth and QA rules for future tools.

Tool-specific calculator content may differ where the product need is genuinely different. Shared shell components must not drift simply because a new tool is developed separately.

---

## 2. Current Carrowmont ecosystem covered by this standard

The active ecosystem at this baseline contains:

1. SIP Calculator / Recurring Investment Calculator
2. Goal Planner
3. Financial Independence
4. Inflation Calculator
5. Retirement Planner
6. Budget & Cash Flow Planner
7. Main Carrowmont website
8. Central `carrowmont-qa` repository

The six planning tools are the current active **tool registry**. Any shared tool list used in the site header, footer, report cross-links, or shared navigation should derive from one maintained registry wherever practical.

### Baseline repository commits

| Repository | Baseline commit |
|---|---|
| `draw004.github.io` | `c824c13a9b2161cd0b6451a24e01b5c02e9f741c` |
| `sip-calculator` | `1dd9f30101b8ede4bf77f1fb877713296ce14b68` |
| `goal-planner` | `a5c780c6366a74e3b2432c63f10e3bf328853ab9` |
| `financial-independence` | `97b8ad6b56cd7440966f8ac8aba2f77d6f2ee944` |
| `inflation-calculator` | `b1014d67a52bf0c62aab985e8c3296903e59bcc9` |
| `retirement-calculator` | `e1158643127efc29a7f1d4ac7d740282fac4f6d1` |
| `budget-cash-flow-planner` | `4c1ffa474c8737384755b23853f554f05fa1b36d` |
| `carrowmont-qa` | `ccd9987994d3dc1b1b1448eaa10113723329b224` |

---

## 3. Non-negotiable UI principles

1. **One ecosystem, one shell.** Shared header, country/currency controls, footer, and navigation patterns should be visually and behaviorally consistent.
2. **Tool content can differ; shell components should not.** A Budget Planner can have a different planner layout from the SIP Calculator, but the shared country/currency control should not become a different component.
3. **Country and currency are configuration, not decoration.** Their visual treatment, ordering, copy, and interaction are part of the product contract.
4. **No duplicated hard-coded tool lists.** The active tool registry should have one maintained source wherever practical.
5. **No shared class with conflicting presentation roles.** A footer link and a call-to-action link must not share a class if one requires an arrow and the other must not.
6. **Shared UI changes require shared QA changes.** A visual standard is incomplete until central QA protects it.
7. **No formula changes in a UI-standardization release.** Shared-shell work must not modify approved calculator mathematics.

---

# 4. Shared tool-page header standard

## 4.1 Header structure

Every calculator/planner page should use the following logical structure:

```text
CARROWMONT | Product Name            Tool-specific links   Methodology   All tools   Home   [Country · Currency]
```

The exact set of tool-specific navigation links may vary. The shared shell around those links must not vary.

### Required order

1. Carrowmont wordmark
2. Divider
3. Product name
4. Flexible spacer
5. Tool-specific navigation links
6. `Methodology` when applicable
7. `All tools`
8. `Home`
9. Country/currency control as the final right-side element

The navigation must not duplicate `Home`, `All tools`, or another shared destination.

## 4.2 Canonical visual treatment

The existing established-tool shell is the visual reference for the tool header. The Budget & Cash Flow Planner must conform to this treatment rather than defining a smaller independent header style.

### Brand

- Wordmark: `CARROWMONT`
- Color: Carrowmont navy (`#102945`)
- Weight: heavy / approximately 900
- Letter spacing: approximately `.08em`
- Desktop size: approximately `23px`
- Product label: secondary muted blue-grey, approximately `16px`, bold
- Divider: 1px vertical line using the shared border color

The shared wordmark must not switch to teal on one tool while remaining navy on the others.

### Header height and behavior

- Desktop target height: approximately `76px`
- White background
- 1px lower border
- Sticky at the top where the current tool shell uses sticky behavior
- High enough `z-index` to remain above normal page content
- Shared shell width should not be unintentionally constrained by a narrower calculator body container

### Container rule

A tool may use a narrower content width for its calculator body, but shared shell components should use a dedicated shared shell container rather than inheriting a tool-specific narrow content container.

Recommended architecture:

```text
.shell-container  -> shared header/footer/navigation width
.tool-container   -> optional tool-specific working/content width
```

This prevents a future tool from making the header look compressed simply because its planner body uses a narrower layout.

## 4.3 Navigation typography

Desktop top navigation should follow the established tool treatment:

- approximately `15px` text
- bold / approximately 700-800
- muted navy-blue text
- consistent horizontal gap
- no decorative arrows in normal navigation
- hover state may deepen the text color or use the approved teal accent

Directional arrows belong to deliberate call-to-action components, not standard navigation.

---

# 5. Country & currency control standard

This component is a shared Carrowmont control and should look the same across all tools.

## 5.1 Closed-state pill

Canonical content:

```text
[globe icon] Country · ISO currency code [chevron]
```

Example:

```text
India · INR
```

### Required styling

- pill shape, not a rectangular form control;
- border radius: `999px`;
- border: light Carrowmont blue-grey;
- white background;
- minimum desktop width: approximately `170px`;
- desktop padding: approximately `12px 18px`;
- centered vertical alignment;
- gap between globe, label and chevron: approximately `9px`;
- text weight: approximately 800;
- globe: outlined icon, approximately `18px`;
- chevron: outlined icon, approximately `14px`;
- browser-native `<details>` marker must be hidden.

The Budget & Cash Flow Planner's compact rounded rectangle treatment is **not** the standard.

## 5.2 Open-state popover

Default desktop structure:

```text
Country & currency
Choose the context that makes the numbers easiest to understand.

Country / region
[select]

Currency
[select]

Important: Changing currency changes the unit and number format.
It does not convert entered amounts using an exchange rate.

[Done]
```

### Required visual treatment

- desktop width: approximately `360px`;
- white surface;
- 1px shared border;
- rounded corners in the established-tool range (`18-22px`);
- approximately `22-24px` internal padding;
- strong but soft shadow;
- positioned below and aligned to the right edge of the locale pill;
- must remain above page content;
- title and explanatory copy use the same hierarchy across tools.

### Select controls

Country and currency selects must be styled controls rather than browser-native default boxes.

Required characteristics:

- full width;
- approximately `48px` control height, or equivalent padded height;
- 1px light blue-grey border;
- approximately `12px` radius;
- white background;
- Carrowmont navy text;
- readable weight;
- consistent internal horizontal padding;
- visible keyboard focus treatment.

## 5.3 Country list contract

- All active supported countries must use the same shared catalogue across tools unless a documented tool-specific restriction exists.
- Normal countries are ordered alphabetically by user-facing country name.
- `Other / International` is always the final option.
- Country selection may suggest sensible defaults but must not unnecessarily lock the user into a currency or frequency choice.

## 5.4 Currency list contract

Canonical display format:

```text
ISO CODE · Currency Name
```

Examples:

```text
INR · Indian Rupee
USD · US Dollar
GBP · British Pound
```

Do not alternate between formats such as:

```text
Indian Rupee (INR)
INR - Indian Rupee
INR · Indian Rupee
```

The dot-separated ISO-code-first format is the shared standard.

Currency options should use one deterministic order across tools. The recommended standard is **ISO currency code order**, which is predictable internationally and keeps the same output regardless of translated currency names.

## 5.5 Behavior contract

- Summary text updates immediately after locale change.
- Country and currency remain separate user choices.
- Changing country may apply the documented default currency where that is the established behavior.
- Changing currency changes the unit and number format; it does not perform an exchange-rate conversion.
- Locale changes dispatch/use the shared Carrowmont locale-change contract.
- `Done` closes the popover without altering calculations beyond the selected locale/currency configuration.

## 5.6 Important-note wording

Default shared wording:

> **Important:** Changing currency changes the unit and number format. It does not convert entered amounts using an exchange rate.

A tool may add a short tool-specific clarification when necessary, for example that changing country does not automatically change inflation, tax, pension, or return assumptions. The base meaning must remain unchanged.

---

# 6. Footer standard

The shared footer standard dated 27 September 2026 remains the visual baseline and is extended here for the six-tool ecosystem.

## 6.1 Required structure

Desktop footer uses four logical columns:

1. Carrowmont/product identity
2. Tools
3. Carrowmont
4. Legal

Followed by a bottom row containing:

- copyright/current product identity;
- `Illustrative estimates, not financial advice.`

## 6.2 Brand/product column

Required pattern on a tool page:

```text
CARROWMONT
Current Product Name
Short product description
Educational planning tool · Carrowmont
```

Main-site pages may omit the current-product line where not applicable.

## 6.3 Canonical Tools list

The tool footer must now reflect the current six-tool registry:

1. SIP Calculator / Recurring Investment Calculator
2. Retirement Planner
3. Inflation Calculator
4. Goal Planner
5. Financial Independence
6. Budget & Cash Flow Planner
7. All tools

The investment-tool label remains country-aware:

- India -> `SIP Calculator`
- outside India -> `Recurring Investment Calculator`

### No arrows in footer navigation

Footer links are standard navigation links and **must not contain directional arrows**.

Correct:

```text
SIP Calculator
Goal Planner
Budget & Cash Flow Planner
```

Incorrect:

```text
SIP Calculator →
Goal Planner →
```

## 6.4 Arrow rule

Directional arrows may be used only where they communicate a deliberate forward action, such as a dedicated CTA card:

```text
Goal Planner →
Retirement Planner →
```

They must not be injected into footer links, top navigation, locale controls, or ordinary utility navigation.

### Implementation safeguard

Do not update both CTA links and footer links through the same selector when their presentation differs.

For example, avoid logic equivalent to:

```js
querySelectorAll('.investment-tool-link,.footer-investment-link')
  .forEach(link => link.textContent = 'SIP Calculator →');
```

Instead resolve the country-aware product name first, then apply presentation separately:

```js
const investmentName = isIndia ? 'SIP Calculator' : 'Recurring Investment Calculator';
ctaLink.textContent = `${investmentName} →`;
footerLink.textContent = investmentName;
```

This separation is mandatory for any shared component with different semantic roles.

## 6.5 Footer visual tokens

Canonical shared footer values:

- background: `#102945`;
- primary text: white / very light blue;
- secondary copy: muted light blue-grey;
- desktop padding: approximately `48px 0 20px`;
- desktop grid: `1.65fr` brand column + three flexible columns;
- desktop gap: approximately `38px`;
- wordmark: approximately `18px`, 900 weight, `.09em` letter spacing;
- product name: approximately `15px`, strong weight;
- footer navigation: approximately `13.5px`;
- divider above footer-bottom: subtle translucent white;
- footer-bottom: approximately `12.5px`.

Responsive behavior:

- below approximately `980px`: two-column structure, brand spans full width;
- below approximately `700px`: one column;
- footer-bottom becomes a vertical stack with small spacing.

---

# 7. Shared buttons and interaction standard

## Primary action

- Carrowmont teal background;
- white text;
- strong weight;
- consistent radius;
- obvious hover/focus state;
- text uses title-style capitalization where the product standard requires it.

Examples:

```text
Done
Generate Budget & Cash Flow Report
Generate Retirement Report
Copy Summary
```

## Secondary action

- white/light background;
- visible border;
- navy or teal text;
- same height/radius family as the corresponding primary action.

A new tool should not introduce materially smaller controls in shared shell areas merely to fit more content.

---

# 8. Typography and color rules for shared shell

## Core shared palette

| Purpose | Standard |
|---|---|
| Primary navy | `#102945` |
| Primary teal | approximately `#0e8b80` / approved shared teal token |
| Teal dark | approximately `#08756d` |
| Muted text | shared blue-grey token |
| Border | shared light blue-grey token |
| White | `#ffffff` |

Existing tools contain small historical token differences. Shared components should stop creating new differences. A future shared CSS component should define the canonical values once.

## Font stack

```css
Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Shared shell components must use this stack unless a future global typography decision replaces it everywhere.

---

# 9. Responsive standard

## Desktop

- Shared header/nav remains on one line where space permits.
- Locale pill remains fully visible at the right edge.
- Locale popover is right-aligned below the pill and must not be clipped by the viewport.

## Tablet / narrower desktop

- Tool-specific top navigation may collapse/hide before the locale control becomes unusable.
- Product identity and locale selection remain accessible.

## Mobile

- Product label/divider may be hidden when necessary.
- Country/currency control remains reachable and readable.
- Locale popover may become fixed/inset from the viewport edges rather than overflow horizontally.
- Minimum touch target guidance: approximately `44px` for primary interactive controls where practical.
- Footer stacks into a single readable column.

No shared component may create page-level horizontal overflow.

---

# 10. Accessibility standard

Shared components must support:

- keyboard operation;
- visible focus states;
- readable text and control sizes;
- semantic labels for country/currency controls;
- `aria-label` for the locale summary when needed;
- decorative icons hidden from assistive technology where appropriate;
- no information communicated by color alone;
- sufficient contrast;
- no reliance on flag icons as the only country identifier;
- consistent and understandable validation messages.

The globe icon is a neutral locale/context indicator; country choice remains textual.

---

# 11. Shared source-of-truth architecture

The long-term target is to stop duplicating the entire shared shell independently in every repository.

## 11.1 Shared registry

Maintain one conceptual registry containing at least:

```text
tool id
display name
country-aware display-name resolver when required
public URL
short description
active/inactive state
footer inclusion
report inclusion
```

All six active tools should derive cross-tool navigation from this registry wherever practical.

## 11.2 Shared UI assets

Recommended future structure:

```text
shared-ui.css
shared-ui.js
shared-tool-registry.js
```

or an equivalent low-complexity mechanism compatible with the current static-site architecture.

The goal is not to introduce a heavy build system. The goal is to make shared rules difficult to accidentally fork.

## 11.3 Canonical classes

Future shared shell work should converge on stable semantic classes such as:

```text
.site-header
.header-inner
.brand-cluster
.brand
.brand-divider
.product-label
.header-actions
.top-nav
.locale-menu
.locale-popover
.site-footer
.footer-grid
.footer-brand-block
.footer-wordmark
.footer-product-name
.footer-col
.footer-bottom
```

Do not repurpose these classes for tool-specific presentation that would make shared QA ambiguous.

---

# 12. Current baseline deviations identified on 1 October 2026

The source snapshot shows several items that should be corrected in the first UI-standardization implementation batch.

## 12.1 Budget & Cash Flow Planner header is visually divergent

Observed differences include:

- narrower independent header/content shell;
- teal wordmark instead of the established navy tool wordmark;
- smaller top-navigation typography and spacing;
- locale summary rendered as a compact rounded rectangle rather than the shared pill;
- smaller locale popover;
- different select-control treatment;
- different currency label format.

**Required correction:** Budget & Cash Flow Planner should adopt the shared tool-header and country/currency component without changing its planner-specific body layout.

## 12.2 Budget currency option format differs

Current Budget implementation constructs currency options as:

```text
Currency Name (CODE)
```

The established tool convention is:

```text
CODE · Currency Name
```

**Required correction:** use the shared ISO-code-first format.

## 12.3 Budget investment-link synchronization leaks CTA arrows into the footer

Current Budget logic updates both `.investment-tool-link` and `.footer-investment-link` together and assigns an arrow-bearing label.

**Required correction:** separate the semantic name from CTA presentation. Footer receives plain text; CTA may receive the arrow.

## 12.4 Existing tool footers do not all reflect the six-tool registry

The main site and Budget footer include Budget & Cash Flow Planner, while several established calculator footers still show the earlier five-tool list.

**Required correction:** all tool footers should resolve from the same six-tool registry and use the same order.

## 12.5 Shared shell values remain duplicated

The footer has a clearly marked shared-standard CSS block, but header/locale rules still exist as multiple independent implementations.

**Required correction:** the next implementation should reduce duplication or, at minimum, establish byte-identical canonical shared header/locale CSS and matching QA until a common static asset is introduced.

---

# 13. QA contract for shared UI

The central `carrowmont-qa` repository should enforce this standard.

## 13.1 Source-contract checks

Verify that:

- every active tool exposes the standard header structure;
- every active tool exposes the standard footer structure;
- the active tool registry contains all six tools;
- `Other / International` is last in every country selector;
- currency option format is `CODE · Currency Name`;
- footer tool links do not contain `→`;
- the country-aware investment name is correct;
- all tool footers include Budget & Cash Flow Planner;
- no shared shell update changes calculation-engine files unexpectedly.

## 13.2 Browser checks

For every tool at desktop and mobile widths verify:

- locale pill has the shared rounded-pill treatment;
- locale popover opens, remains in viewport, and closes with `Done`;
- country and currency controls are styled and usable;
- no page-level horizontal overflow;
- header elements do not overlap;
- footer collapses correctly;
- standard footer links navigate to the correct production URLs;
- no footer link contains a directional arrow.

## 13.3 Visual-review references

Maintain reference screenshots for at least:

- one established tool desktop header + open locale popover;
- Budget desktop header + open locale popover;
- one established tool mobile header + locale popover;
- shared desktop footer;
- shared mobile footer.

Visual QA should protect the *shared shell*, while allowing calculator-specific body layouts to evolve independently.

---

# 14. Implementation scope for UI Standardization Batch 1

The first implementation batch under this document should be deliberately limited to shared UI consistency.

## In scope

- publish this standard in `draw004.github.io/docs/`;
- make Budget header/nav/locale component match the canonical tool shell;
- standardize currency option label format;
- remove the arrow from Budget footer investment link;
- update all calculator footers to the six-tool registry;
- preserve country-aware SIP / Recurring Investment naming;
- update central QA to protect these rules;
- verify desktop and mobile layout;
- run staged browser QA before PR creation;
- after merge, run Automated QA and Multi-Repo Guard;
- generate a fresh Source Snapshot after everything is green.

## Explicitly out of scope

- calculator formula changes;
- Smart Suggestions implementation;
- Budget Intelligence Engine changes;
- report calculation changes;
- new SEO URLs;
- account/cloud-sync work;
- mobile-app development.

Smart Suggestions should begin only after this shared UI correction batch is green and a new source snapshot is taken.

---

# 15. Acceptance criteria

The UI-standardization batch is complete only when all of the following are true:

- [ ] Budget header visually matches the established Carrowmont tool header.
- [ ] Budget country/currency pill visually matches the established tool pill.
- [ ] Budget locale popover matches the shared control hierarchy and styling.
- [ ] Currency options use `CODE · Currency Name` across all tools.
- [ ] Country lists are alphabetical with `Other / International` last.
- [ ] No footer link contains a directional arrow.
- [ ] CTA arrows remain available where intentionally designed.
- [ ] Every tool footer contains the same six-tool registry plus `All tools`.
- [ ] India shows `SIP Calculator`; international contexts show `Recurring Investment Calculator` where applicable.
- [ ] Desktop header and footer remain responsive without overlap.
- [ ] Mobile locale control remains usable without horizontal overflow.
- [ ] Central source-contract QA passes.
- [ ] Central Playwright/browser QA passes.
- [ ] Multi-Repo Guard passes after merge.
- [ ] No approved calculator formula changes are introduced.

---

# 16. Rule for every future Carrowmont tool

Before a new tool is considered complete, it must adopt this shared shell **before release**, not after users notice inconsistencies.

Required onboarding checklist:

1. Register the tool in the shared tool registry.
2. Use the standard Carrowmont tool header.
3. Use the standard country/currency control if the tool supports locale/currency.
4. Use the standard footer and full active-tool registry.
5. Use country-aware investment naming.
6. Add shared UI QA coverage.
7. Verify desktop and mobile behavior.
8. Run staged QA before PR creation.

A new tool may introduce new functionality. It should not introduce a new version of an existing Carrowmont shell component without an explicit cross-product design decision.

---

# 17. Final principle

Carrowmont should be recognizable before a user reads the calculator name.

The header, country/currency selector, navigation, footer, typography, interaction language, and responsive behavior form the common product shell. New tools should inherit that shell; they should not recreate it.

**One Carrowmont ecosystem. Tool-specific functionality. Shared UI standards.**
