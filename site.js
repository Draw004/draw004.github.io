(function(){
  "use strict";
  const L=window.CarrowmontLocale;
  if(!L) return;
  const byId=id=>document.getElementById(id);
  const menu=byId("localeMenu"), countryLabel=byId("localeCountryLabel"), currencyLabel=byId("localeCurrencyLabel"), region=byId("regionSelect"), currency=byId("currencySelect"), done=byId("localeDoneBtn");
  if(!menu || !region || !currency) return;

  function sync(){
    const p=L.getProfile();
    if(countryLabel) countryLabel.textContent=p.label;
    if(currencyLabel) currencyLabel.textContent=L.getCurrency();
    region.value=L.getRegion();
    currency.value=L.getCurrency();
  }
  function populate(){
    region.innerHTML=Object.entries(L.regions).map(([code,p])=>`<option value="${code}">${p.label}</option>`).join("");
    currency.innerHTML=Object.entries(L.currencies).map(([code,c])=>`<option value="${code}">${code} — ${c.label}</option>`).join("");
    sync();
  }
  function closeLocale(){ menu.open=false; }
  region.addEventListener("change",e=>L.setRegion(e.target.value,{syncCurrency:true}));
  currency.addEventListener("change",e=>L.setCurrency(e.target.value));
  if(done) done.addEventListener("click",closeLocale);
  window.addEventListener("carrowmont:localechange",sync);
  document.addEventListener("pointerdown",e=>{ if(menu.open && !menu.contains(e.target)) closeLocale(); });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape" && menu.open){ closeLocale(); menu.querySelector("summary")?.focus(); } });
  populate();
})();
