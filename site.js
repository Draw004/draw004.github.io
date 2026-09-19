(function () {
  "use strict";

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
