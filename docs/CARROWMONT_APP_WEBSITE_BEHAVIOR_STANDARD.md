# Carrowmont — installed-app and website behaviour standard v1.0

Established: 2026-11-19. This document is a release contract, not an optional styling proposal.

## Common rules
- Home (`/`) is the default navigation entry for a fresh visit to carrowmont.com.
- The installed app manifest should launch Home using `/?source=pwa`. Preserve the stable manifest `id` when updating `start_url` so existing installations keep their app identity.
- App icon launch and in-app navigation are different events. Never replay the C animation on ordinary navigation, even if the site is standalone.
- A resume of an already-running installed app may preserve the current screen; do not reset users' progress by force.
- Exactly one primary navigation destination should receive the active visual treatment on known first-level routes. Use `aria-current="page"`; do not hard-code permanent teal on Ask.
- Secondary Learn/Research/tool pages should be mapped back to their parent section; Search is a separate navigation action.
- No navigation animation, timing hold, forced authentication, or silent upload may interfere with a normal route change.

## Installed mobile app (narrow/mobile viewport)
- Fresh launcher icon opening: browser/OS static splash (not web-controllable), followed by the approved Carrowmont Draw the C animation on the Home launch page.
- C drawing follows white top-right tip -> around the left curve -> lower-right tip, with fully completed C and exact text `Plan today. Build tomorrow.`
- Animation must be short, never replay on Home -> My Money, My Money -> Ask or tool navigation, and respect `prefers-reduced-motion`.
- A device's native PWA lifecycle may resume the last visible screen instead of reloading the manifest's start URL. Do not promise a reset to Home on resume.

## Installed desktop/laptop/tablet
- Fresh launch targets Home. Present useful content immediately. A very brief, non-blocking logo fade is acceptable; no full-screen splash or transition overlay.
- In-app navigation is direct, including Home -> My Carrowmont. Do not add a minimum display time.
- Navigation active-state colours follow the same route rules as the website.

## Normal website (mobile, tablet, desktop)
- Visiting the root URL shows Home. Direct links/bookmarks go directly to their requested pages.
- Do not show the PWA Draw the C animation during browser navigation, refreshes or regular page visits.
- Desktop primary navigation: inactive links navy; current link teal and underlined. Ask is NOT special unless current.
- Mobile bottom navigation: one selected tab using teal + light background; `More` for secondary content, with Search highlighted in its separate header control.
- Responsive layout is based on viewport, not hard-coded operating system/brand detection.

## Installation — locked v1.1
- Keep the persistent installation entry and device-specific guidance inside `My Carrowmont`, independent of sign-in. The Home page may show a **small, dismissible, one-time** installation invitation on the first normal-browser visit; it must not block the hero or mobile navigation.
- If Chromium supplies a real `beforeinstallprompt` event, the primary **Install Carrowmont** action calls its native `prompt()` directly from the user's click; the browser still asks for confirmation. Do not insert an extra instructional step.
- If that event is unavailable (for example, Safari/iOS, unsupported browser, private mode, or an app already installed), label the fallback **How to install** and provide device-appropriate instructions. Never show a fake Install button that does nothing.
- Preserve the existing PWA manifest ID and use a self-related webapp manifest entry to attempt same-scope installed-app detection on supporting Chromium versions. Hide install controls if the app is running in `standalone` mode or a verified installed app is detected. This detection is not universally reliable across browser profiles or devices.
- Installed-app link capture is browser/OS-controlled. Allow the platform to open eligible links in the PWA, but do **not** force redirects or claim all Chrome/Edge/Safari navigation will open an installation from another browser.
- The first-visit invitation remembers its own display/dismissal only in local browser storage. It never sends information to a server, uploads financial data, tracks the user or changes their account.
- Private browsing is not reliably detectable. Treat it as an isolated browser context; where install is unavailable, offer instructions including reopening in a normal window.
- Hide install controls when running inside the installed app. No splash or loading delay is added by installation UI.

## Mandatory QA acceptance
1. Manifest start URL points to Home while its existing `id` is unchanged.
2. Mobile installed-app icon launch shows correct C stroke direction, complete white tip and exact tagline.
3. Normal web and desktop launch do not display a full-screen intro.
4. Home -> My Money opens immediately on mobile/desktop and the boot overlay never replays.
5. Desktop Home: Home selected, Ask neutral. Desktop Ask: Ask selected, Home neutral. Similar tests for Tools, Learn, Research, My Carrowmont and Search.
6. Mobile bottom navigation has one active item for normal destinations; Search header remains distinct.
7. Installation card remains inside My Carrowmont, visible without a browser install event and not displayed as an install prompt when already installed.
8. App identity, guest-first use, authentication, financial formulas, localization and saved-plan data remain untouched.

## v6B — visual continuity and honest test isolation
- A normal website navigation may use a **very short, optional browser-native crossfade** where supported; it must not hold navigation, load an overlay, animate the installed app, or run when reduced motion is preferred. Preserve stable document width when scrollbars appear or disappear.
- On Mobile Tools, the search card must start **after** the complete introduction, not overlap the final line through a negative margin. Search remains functional and readable at 390px and 360px; avoid redundant suggestion-chip rows when a predictive search is already present.
- In My Carrowmont, supporting cards with few saved assumptions must use their natural content height rather than stretching to the height of a neighbouring, longer next-moves card. Do not invent assumptions to fill visual space.
- Installed Android starts with an OS-controlled static splash. Our web-controlled Draw the C immediately follows it, retains the approved top-right -> left curve -> bottom-right stroke and tagline, and must not wait longer than necessary after the stroke completes. We do not promise to animate the OS splash.
- QA for a first-time installation invitation must preserve localStorage over the reload that verifies dismissal. A test fixture may initialize storage **once**, but must not automatically wipe it again between the dismissal and verification.

## Startup/navigation performance guard (2026-11-19, PERF1)
- Android and other PWA platforms can display a native **static** splash from the app icon. A website cannot animate or forcibly skip that OS screen. Match its colour (`#f8fbfc`) with the web intro so the handoff is less conspicuous; preserve the actual icon and stable PWA identity.
- The approved mobile Draw the C follows upper tip to lower tip and displays `Plan today. Build tomorrow.` Keep the brief web animation only on a genuine installed mobile Home launch. Release on animation completion + document readiness, with a fail-safe; never add a second fixed waiting period.
- Do not activate cross-document root `@view-transition` on ordinary browsing: whole-page fades can create the reported jolt, especially when layouts differ.
- Render the canonical primary navigation and mobile search link in HTML for core public pages. Put responsive header geometry in base CSS before first paint; never reorder the same nav links on every load.
- Defer bottom-of-page classic scripts only as an **ordered group** and test authentication, saving, Search/Ask and tools to avoid changing dependency behavior. No third-party analytics or personal-data caching is introduced.
- Verify mobile installed-app launch (Android static splash remains native), desktop installed-app open, normal browser Home -> My Money -> Tools -> Ask, active route state, menu stability, no regression to app install CTA, reduced motion, and Search Console/SEO metadata unchanged.
- Require staged Main + QA source contracts, deterministic search fixtures and Publisher Chromium/Edge/mobile browser checks before merging. Do not label simulated renders as real device proof.
