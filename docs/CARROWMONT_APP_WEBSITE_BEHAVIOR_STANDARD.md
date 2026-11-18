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

## Installation
- Keep the install entry and guidance inside `My Carrowmont` as previously approved; do not move to Home or require sign-in.
- On supported browsers show the native install prompt through the optional event. On other browsers show device-appropriate installation steps rather than hiding the entire feature.
- Hide install guidance inside standalone app mode after installation; do not change account/saved-plan semantics.

## Mandatory QA acceptance
1. Manifest start URL points to Home while its existing `id` is unchanged.
2. Mobile installed-app icon launch shows correct C stroke direction, complete white tip and exact tagline.
3. Normal web and desktop launch do not display a full-screen intro.
4. Home -> My Money opens immediately on mobile/desktop and the boot overlay never replays.
5. Desktop Home: Home selected, Ask neutral. Desktop Ask: Ask selected, Home neutral. Similar tests for Tools, Learn, Research, My Carrowmont and Search.
6. Mobile bottom navigation has one active item for normal destinations; Search header remains distinct.
7. Installation card remains inside My Carrowmont, visible without a browser install event and not displayed as an install prompt when already installed.
8. App identity, guest-first use, authentication, financial formulas, localization and saved-plan data remain untouched.
