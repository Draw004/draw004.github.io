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

  function sync() {
    const profile = L.getProfile();
    if (countryLabel) countryLabel.textContent = profile.label;
    if (currencyLabel) currencyLabel.textContent = L.getCurrency();
    region.value = L.getRegion();
    currency.value = L.getCurrency();
  }

  function populate() {
    region.innerHTML = Object.entries(L.regions)
      .map(([code, profile]) => `<option value="${code}">${profile.label}</option>`)
      .join("");

    currency.innerHTML = Object.entries(L.currencies)
      .map(([code, item]) => `<option value="${code}">${code} — ${item.label}</option>`)
      .join("");

    sync();
  }

  function closeLocale() {
    menu.open = false;
  }

  region.addEventListener("change", (event) => {
    L.setRegion(event.target.value, { syncCurrency: true });
    sync();
    window.setTimeout(closeLocale, 80);
  });

  currency.addEventListener("change", (event) => {
    L.setCurrency(event.target.value);
    sync();
    window.setTimeout(closeLocale, 80);
  });

  if (done) done.addEventListener("click", closeLocale);

  window.addEventListener("carrowmont:localechange", sync);

  document.addEventListener("pointerdown", (event) => {
    if (menu.open && !menu.contains(event.target)) closeLocale();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      closeLocale();
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
