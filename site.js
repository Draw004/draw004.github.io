(function () {
  "use strict";

  const CLOUDFLARE_ANALYTICS_TOKEN = "713a819bf0244b9fb4245554a6f20ee2";
  const ANALYTICS_MEASUREMENT_ID = "G-C3D0G5C7F0";
  const ANALYTICS_CONSENT_KEY = "carrowmont_analytics_consent_v1";
  let analyticsLoaded = false;

  function loadCloudflareAnalytics() {
    if (document.querySelector('script[data-carrowmont-cloudflare="true"]')) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.setAttribute("data-cf-beacon", JSON.stringify({ token: CLOUDFLARE_ANALYTICS_TOKEN }));
    script.dataset.carrowmontCloudflare = "true";
    (document.body || document.head || document.documentElement).appendChild(script);
  }

  function getAnalyticsConsent() {
    try {
      const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
      return value === "granted" || value === "denied" ? value : null;
    } catch (_) {
      return null;
    }
  }

  function setAnalyticsConsent(value) {
    try {
      window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    } catch (_) {
      // If storage is unavailable, keep the choice for the current page only.
    }
  }

  function disableAnalytics() {
    window[`ga-disable-${ANALYTICS_MEASUREMENT_ID}`] = true;

    // Remove Google Analytics cookies that Carrowmont can access on its own domain.
    document.cookie.split(";").forEach((entry) => {
      const name = entry.split("=")[0].trim();
      if (!name.startsWith("_ga")) return;
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.carrowmont.com; SameSite=Lax`;
    });
  }

  function loadAnalytics() {
    if (analyticsLoaded || document.querySelector('script[data-carrowmont-ga4="true"]')) return;

    window[`ga-disable-${ANALYTICS_MEASUREMENT_ID}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", ANALYTICS_MEASUREMENT_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ANALYTICS_MEASUREMENT_ID)}`;
    script.dataset.carrowmontGa4 = "true";
    document.head.appendChild(script);
    analyticsLoaded = true;
  }

  function ensureAnalyticsConsentStyles() {
    if (document.getElementById("carrowmontAnalyticsConsentStyles")) return;

    const style = document.createElement("style");
    style.id = "carrowmontAnalyticsConsentStyles";
    style.textContent = `
      .cm-analytics-consent {
        position: fixed;
        left: 16px;
        right: 16px;
        bottom: 16px;
        z-index: 10000;
        max-width: 920px;
        margin: 0 auto;
        padding: 18px 20px;
        border: 1px solid #cfe1df;
        border-radius: 18px;
        background: #ffffff;
        box-shadow: 0 18px 50px rgba(10, 37, 61, 0.18);
        color: #17314f;
        font-family: inherit;
      }
      .cm-analytics-consent__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
      }
      .cm-analytics-consent__copy {
        min-width: 0;
      }
      .cm-analytics-consent__copy strong {
        display: block;
        margin-bottom: 5px;
        color: #0b2d4f;
      }
      .cm-analytics-consent__copy p {
        margin: 0;
        line-height: 1.5;
        color: #566f8f;
      }
      .cm-analytics-consent__copy a {
        color: #007d75;
        font-weight: 700;
      }
      .cm-analytics-consent__actions {
        display: flex;
        flex: 0 0 auto;
        gap: 10px;
      }
      .cm-analytics-consent__button {
        appearance: none;
        border: 1px solid #0e827a;
        border-radius: 10px;
        padding: 10px 14px;
        font: inherit;
        font-weight: 800;
        cursor: pointer;
      }
      .cm-analytics-consent__button--accept {
        background: #0e827a;
        color: #ffffff;
      }
      .cm-analytics-consent__button--decline {
        background: #ffffff;
        color: #0e827a;
      }
      @media (max-width: 700px) {
        .cm-analytics-consent {
          left: 10px;
          right: 10px;
          bottom: 10px;
          padding: 16px;
          border-radius: 14px;
        }
        .cm-analytics-consent__inner {
          display: block;
        }
        .cm-analytics-consent__actions {
          margin-top: 14px;
          width: 100%;
        }
        .cm-analytics-consent__button {
          flex: 1 1 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function hideAnalyticsConsent() {
    document.getElementById("carrowmontAnalyticsConsent")?.remove();
  }

  function showAnalyticsConsent() {
    hideAnalyticsConsent();
    ensureAnalyticsConsentStyles();

    const banner = document.createElement("section");
    banner.id = "carrowmontAnalyticsConsent";
    banner.className = "cm-analytics-consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Analytics privacy choices");
    banner.innerHTML = `
      <div class="cm-analytics-consent__inner">
        <div class="cm-analytics-consent__copy">
          <strong>Help us improve Carrowmont</strong>
          <p>Carrowmont uses privacy-first aggregate traffic measurement. Optional Google Analytics provides deeper usage insights only if you accept. We do not intentionally send your calculator inputs or financial values to Google Analytics. <a href="/privacy.html">Privacy details</a></p>
        </div>
        <div class="cm-analytics-consent__actions">
          <button type="button" class="cm-analytics-consent__button cm-analytics-consent__button--decline" data-analytics-choice="denied">Decline</button>
          <button type="button" class="cm-analytics-consent__button cm-analytics-consent__button--accept" data-analytics-choice="granted">Accept Analytics</button>
        </div>
      </div>
    `;

    banner.querySelectorAll("[data-analytics-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        const choice = button.getAttribute("data-analytics-choice");
        setAnalyticsConsent(choice);
        hideAnalyticsConsent();
        if (choice === "granted") {
          loadAnalytics();
        } else {
          disableAnalytics();
        }
      });
    });

    document.body.appendChild(banner);
  }

  function initializeAnalyticsConsent() {
    const consent = getAnalyticsConsent();
    if (consent === "granted") {
      loadAnalytics();
    } else if (consent === "denied") {
      disableAnalytics();
    } else {
      showAnalyticsConsent();
    }

    const settingsButton = document.getElementById("analyticsSettingsBtn");
    if (settingsButton) {
      settingsButton.addEventListener("click", showAnalyticsConsent);
    }
  }

  window.CarrowmontAnalytics = {
    measurementId: ANALYTICS_MEASUREMENT_ID,
    getConsent: getAnalyticsConsent,
    showSettings: showAnalyticsConsent
  };

  function initializeSiteAnalytics() {
    loadCloudflareAnalytics();
    initializeAnalyticsConsent();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSiteAnalytics, { once: true });
  } else {
    initializeSiteAnalytics();
  }

  const L = window.CarrowmontLocale;
  if (!L) return;

  const byId = (id) => document.getElementById(id);
  const menu = byId("localeMenu");
  const countryLabel = byId("localeCountryLabel");
  const currencyLabel = byId("localeCurrencyLabel");
  const region = byId("regionSelect");
  const currency = byId("currencySelect");
  const done = byId("localeDoneBtn");

  if (!menu || !region || !currency) return;

  let pendingRegion = L.getRegion();
  let pendingCurrency = L.getCurrency();

  function renderApplied() {
    const profile = L.getProfile();
    if (countryLabel) countryLabel.textContent = profile.label;
    if (currencyLabel) currencyLabel.textContent = L.getCurrency();
  }

  function resetPendingFromApplied() {
    pendingRegion = L.getRegion();
    pendingCurrency = L.getCurrency();
    region.value = pendingRegion;
    currency.value = pendingCurrency;
  }

  function populate() {
    region.innerHTML = Object.entries(L.regions)
      .map(([code, profile]) => `<option value="${code}">${profile.label}</option>`)
      .join("");
    currency.innerHTML = Object.entries(L.currencies)
      .map(([code, item]) => `<option value="${code}">${code} — ${item.label}</option>`)
      .join("");
    renderApplied();
    resetPendingFromApplied();
  }

  function closeLocale(discardPending) {
    if (discardPending) resetPendingFromApplied();
    menu.open = false;
  }

  region.addEventListener("change", (event) => {
    pendingRegion = event.target.value;
    const profile = L.regions[pendingRegion];
    if (profile && L.currencies[profile.currency]) {
      pendingCurrency = profile.currency;
      currency.value = pendingCurrency;
    }
    // Keep the panel open so the user can choose a different currency before Done.
  });

  currency.addEventListener("change", (event) => {
    pendingCurrency = event.target.value;
    // Keep the panel open until Done is pressed.
  });

  if (done) {
    done.addEventListener("click", () => {
      if (typeof L.setLocale === "function") {
        L.setLocale(pendingRegion, pendingCurrency);
      } else {
        L.setRegion(pendingRegion, { syncCurrency: false });
        L.setCurrency(pendingCurrency);
      }
      renderApplied();
      closeLocale(false);
    });
  }

  menu.addEventListener("toggle", () => {
    if (menu.open) resetPendingFromApplied();
  });

  window.addEventListener("carrowmont:localechange", () => {
    renderApplied();
    if (!menu.open) resetPendingFromApplied();
  });

  document.addEventListener("pointerdown", (event) => {
    if (menu.open && !menu.contains(event.target)) closeLocale(true);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      closeLocale(true);
      menu.querySelector("summary")?.focus();
    }
  });

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      const mobile = link.closest("details");
      if (mobile) mobile.open = false;
    });
  });

  populate();
})();
