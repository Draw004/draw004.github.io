(function(){
  "use strict";
  const L=window.CarrowmontLocale;if(!L)return;
  const $=id=>document.getElementById(id),menu=$("localeMenu"),summary=$("localeSummary"),region=$("regionSelect"),currency=$("currencySelect"),done=$("localeDoneBtn");
  function sync(){const p=L.getProfile();region.value=L.getRegion();currency.value=L.getCurrency();summary.textContent=`${p.label} · ${L.getCurrency()}`}
  function populate(){region.innerHTML=Object.entries(L.regions).map(([code,p])=>`<option value="${code}">${p.label}</option>`).join("");currency.innerHTML=Object.entries(L.currencies).map(([code,c])=>`<option value="${code}">${code} — ${c.label}</option>`).join("");sync()}
  function close(){if(menu)menu.open=false}
  region.addEventListener("change",e=>L.setRegion(e.target.value,{syncCurrency:true}));
  currency.addEventListener("change",e=>L.setCurrency(e.target.value));
  done.addEventListener("click",close);window.addEventListener("carrowmont:localechange",sync);
  document.addEventListener("pointerdown",e=>{if(menu&&menu.open&&!menu.contains(e.target))close()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&menu&&menu.open){close();summary.focus()}});
  populate();
})();
