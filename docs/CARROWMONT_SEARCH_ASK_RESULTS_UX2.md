# Carrowmont Search + Ask Results UX2

**Status:** review release built from the 23 November 2026 post-Batch-13A all-green snapshot.

## Locked product behavior

- Desktop Search presents **Tools** and **Learn & Guides** side-by-side when both are available.
- Each desktop pane has its own bounded vertical scroll area. The scrollbar is on the **right edge of that pane**; headings/counts remain visible above the scrolling cards.
- Result cards are more compact so users can see more of both libraries without scrolling the whole page.
- Search result cards are real anchors: the title, body and visible **Open tool / Read article** CTA are one pointer- and keyboard-accessible destination.
- **Best match** is relevance-driven and can appear on either a Tool or Learn result; Tool type does not override a decisive direct Learn/Research match.
- Research & Other remains below the primary Tools/Learn discovery area.
- Mobile Search uses **Tools / Learn & Guides** tabs with counts and normal page scrolling; it does not use two nested vertical scrollers. The default mobile tab follows the relevance-preserving group order.
- Ask Carrowmont keeps its compact fallback layout, uses the same Tool/Learn visual language, shows Best match, and keeps the whole fallback card/CTA as one real link. It does not inherit the large desktop dual-pane Search layout.

## Acceptance rule

Every visible CTA that looks actionable must actually navigate. QA must click the CTA area itself, not merely assert that matching text exists. After Publisher/Guard are green and a fresh snapshot is supplied, the deployed Carrowmont.com behavior must be checked again before the release is marked CLOSED.

## Non-goals

This release does not change Search ranking formulas, Search/Ask query ownership, public URLs, sitemap/index inventory, financial engines, My Carrowmont data, connected-data logic, or Batch 13B provider scope.
