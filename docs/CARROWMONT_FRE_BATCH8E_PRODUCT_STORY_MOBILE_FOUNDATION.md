# Carrowmont FRE Batch 8E — Product Story & Mobile-First Foundation

## Purpose
Batch 8E changes how Carrowmont presents the product without changing the financial engines. The public site should explain what Carrowmont helps people do before asking them to browse a long list of calculators. My Carrowmont should also be easier to use from a phone and ready to be installed as a web app.

## Product story
The homepage now explains a simple journey: **Plan → Keep → Track → Understand**.

- **Plan:** use Carrowmont tools to work through a real financial decision.
- **Keep:** save only the plans that matter in My Carrowmont.
- **Track:** see whether saved plans are improving, on track or ready for review.
- **Understand:** see why something needs attention and return to the right planner to test a change.

The existing calculators remain fully visible and usable. Batch 8E does not perform the later Batch 11 Ask-first homepage transformation.

## Product demonstration
A new illustrative My Carrowmont preview shows the type of information the account-backed product can provide: saved-plan status, change since the previous saved version and a clear next review step. The preview is explicitly labelled as an example.

## Mobile-first foundation
My Carrowmont adds a compact phone quick-access area for Progress, Saved plans, Financial picture and Saved details. It also explains how Carrowmont can be added to a device home screen for quicker access.

## Installable web app
Carrowmont now includes a standards-based web app manifest with 192 px and 512 px brand icons, standalone display mode and shortcuts to My Carrowmont, Ask Carrowmont and Tools. No service worker or offline financial-data cache is introduced in this batch. Installation improves access only; it does not change what account data is saved.

## Protected architecture
- No calculator formula changes.
- No new financial data collection.
- No bank connection.
- No offline financial-data caching.
- No new public content URL requiring search indexing.
- Existing guest-first tools and optional My Carrowmont account model remain.
- The major Ask-first homepage transformation remains reserved for Batch 11.
