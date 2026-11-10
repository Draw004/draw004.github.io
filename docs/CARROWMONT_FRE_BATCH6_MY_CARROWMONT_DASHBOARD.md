# Carrowmont FRE Batch 6 — My Carrowmont Dashboard — Guest/Local First

## Purpose

Create a guest-first financial planning dashboard without login, cloud accounts, bank feeds or transaction tracking. The dashboard summarizes what matters from facts the user explicitly adds or chooses to carry forward from Ask Carrowmont.

## Product contract

- Public URL: `/my-carrowmont.html`.
- Session-only storage is the default.
- Persistent browser storage is opt-in through **Remember on this device**.
- Ask Carrowmont never saves into the dashboard automatically.
- The user can edit, remove, ignore/include and clear facts.
- No dashboard financial value is sent to a Carrowmont server.
- The dashboard does not become a bank/transaction tracker.

## Summary areas

1. Cash-flow health — Budget & Cash Flow core.
2. Emergency runway — Emergency Fund core.
3. Debt position — user-entered debt facts and existing repayment context.
4. Mortgage / loan burden — Borrowing Health core when gross income is available.
5. Retirement progress — current savings/contribution activity only; adequacy remains in Retirement Planner.
6. Goals — Goal Planner core.
7. Financial independence — Financial Independence core.
8. Money Priorities — deterministic Batch 5 priority framework when the complete priority fact set is available.

## Privacy model

`carrowmont_guest_dashboard_session_v1` is the default session key. `carrowmont_guest_dashboard_local_v1` is written only after explicit opt-in. Switching back to session-only removes the persistent copy. Clear dashboard removes both.

## Discovery

My Carrowmont is a reviewed public Carrowmont page and a first-level product destination. Desktop/laptop navigation places **My Carrowmont** directly beside Home, replacing About in the primary ribbon; About remains in the footer and mobile More. Mobile bottom navigation is **Home | My Money | Ask | Tools | More**, with Learn, Research, About, Methodology and Contact available through More. Search, the shared footer, and explicit Ask Carrowmont save/open actions remain additional discovery paths. My Carrowmont does not become a new calculator and the Tools Hub remains at 23 tools.

## Exit gate

Publisher, Automated QA, Multi-Repo Guard and a new authoritative Source Snapshot must all be green.
