(function () {
  "use strict";

  const CLOUDFLARE_ANALYTICS_TOKEN = "713a819bf0244b9fb4245554a6f20ee2";

  function loadCloudflareAnalytics() {
    if (document.querySelector('script[data-carrowmont-cloudflare="true"]')) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.referrerPolicy = "origin";
    script.setAttribute("data-cf-beacon", JSON.stringify({ token: CLOUDFLARE_ANALYTICS_TOKEN }));
    script.dataset.carrowmontCloudflare = "true";
    (document.body || document.head || document.documentElement).appendChild(script);
  }

  // Carrowmont does not send calculator inputs or calculated financial results to website analytics.
  // Keep a no-op compatibility surface so existing calculator UI calls do not need to know about analytics.
  window.CarrowmontAnalytics = Object.freeze({
    provider: "cloudflare-aggregate",
    track() {}
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadCloudflareAnalytics, { once: true });
  } else {
    loadCloudflareAnalytics();
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
      .sort(([codeA, a], [codeB, b]) => {
        if (codeA === "OTHER") return 1;
        if (codeB === "OTHER") return -1;
        return a.label.localeCompare(b.label, "en", { sensitivity: "base" });
      })
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

/* TOOLS-HUB1: canonical tools navigation, country-aware homepage ordering and tool terminology. */
(function () {
  "use strict";

  const TOOL_ORDER_PROFILES = Object.freeze({
    P1: Object.freeze(["investment", "compound", "loan", "housing", "retirement", "budget", "inflation", "goals", "independence"]),
    P2: Object.freeze(["housing", "loan", "retirement", "investment", "compound", "budget", "inflation", "goals", "independence"]),
    P3: Object.freeze(["retirement", "housing", "loan", "inflation", "budget", "investment", "compound", "goals", "independence"]),
    P4: Object.freeze(["retirement", "housing", "loan", "investment", "compound", "budget", "inflation", "goals", "independence"]),
    P5: Object.freeze(["investment", "compound", "loan", "housing", "retirement", "budget", "inflation", "goals", "independence"]),
    P6: Object.freeze(["budget", "loan", "housing", "investment", "compound", "inflation", "retirement", "goals", "independence"]),
    P7: Object.freeze(["budget", "housing", "loan", "investment", "compound", "retirement", "inflation", "goals", "independence"]),
    P8: Object.freeze(["investment", "compound", "loan", "housing", "inflation", "budget", "retirement", "goals", "independence"]),
    P9: Object.freeze(["budget", "housing", "loan", "retirement", "investment", "compound", "inflation", "goals", "independence"]),
    P10: Object.freeze(["inflation", "budget", "loan", "housing", "investment", "compound", "retirement", "goals", "independence"]),
    P11: Object.freeze(["retirement", "housing", "loan", "investment", "compound", "budget", "inflation", "goals", "independence"])
  });

  const REGION_ORDER_PROFILE = Object.freeze({
    IN: "P1",
    US: "P2", CA: "P2", GB: "P2", AU: "P2", NZ: "P2", IE: "P2",
    AT: "P3", BE: "P3", DE: "P3", DK: "P3", FI: "P3", FR: "P3", IT: "P3", NL: "P3", NO: "P3", PL: "P3", PT: "P3", ES: "P3", SE: "P3", CH: "P3",
    CN: "P4", JP: "P4", KR: "P4", TW: "P4",
    SG: "P5", HK: "P5", MY: "P5",
    BD: "P6", ID: "P6", TH: "P6", PH: "P6", VN: "P6",
    AE: "P7", SA: "P7", OM: "P7", QA: "P7",
    BR: "P8", MX: "P8", CL: "P8",
    ZA: "P9",
    RU: "P10", TR: "P10",
    OTHER: "P11"
  });

  function getLocaleApi() {
    return window.CarrowmontLocale || null;
  }

  function getOrderForRegion(regionCode) {
    const profile = REGION_ORDER_PROFILE[regionCode] || "P11";
    return [...TOOL_ORDER_PROFILES[profile]];
  }

  function upgradeLegacyToolsLinks() {
    document.querySelectorAll('a[href="/#tools"], a[href="#tools"]').forEach((link) => {
      const label = (link.textContent || "").trim();
      if (/tools/i.test(label)) link.setAttribute("href", "/tools.html");
    });
  }

  function applyInvestmentTerminology(regionCode) {
    const india = regionCode === "IN";
    document.querySelectorAll("[data-cm-investment-title]").forEach((node) => {
      node.textContent = india ? "SIP Calculator" : "Recurring Investment Calculator";
    });
    document.querySelectorAll("[data-cm-investment-description]").forEach((node) => {
      node.textContent = india
        ? "Calculate SIP future value, work backwards from a goal, compare step-up SIPs and estimate how long a target may take."
        : "Estimate recurring investment growth, work backwards from a goal, compare increasing contributions and estimate time to target.";
    });
    document.querySelectorAll("[data-cm-investment-cta]").forEach((node) => {
      node.textContent = india ? "Calculate SIP →" : "Calculate investments →";
    });
    document.querySelectorAll("[data-cm-investment-kicker]").forEach((node) => {
      node.textContent = india ? "SIP investing" : "Investing";
    });
    document.querySelectorAll(".footer-investment-link, [data-cm-footer-investment]").forEach((node) => {
      node.textContent = india ? "SIP Calculator" : "Recurring Investment Calculator";
    });
  }

  function housingIdentity(regionCode) {
    const map = {
      IN: { title:"Home Loan Prepayment / Foreclosure", description:"See how part-prepayments, extra EMI principal or an earlier foreclosure target could change interest and remaining tenure.", cta:"Explore home-loan prepayment →" },
      US: { title:"Mortgage Payoff", description:"See how extra principal, lump-sum payments or an earlier payoff target could change mortgage interest and time to debt-free.", cta:"Explore mortgage payoff →" },
      CA: { title:"Mortgage Prepayment & Payoff", description:"Explore extra payments and lump-sum prepayments with Canadian fixed-rate convention support.", cta:"Explore mortgage prepayment →" },
      GB: { title:"Mortgage Overpayment", description:"See how mortgage overpayments or a lump sum could reduce interest and shorten the remaining term.", cta:"Explore mortgage overpayments →" },
      AU: { title:"Home Loan Extra Repayments", description:"See how extra repayments or a lump sum could reduce home-loan interest and shorten the loan.", cta:"Explore extra repayments →" },
      NZ: { title:"Home Loan Extra Repayments", description:"See how extra repayments or a lump sum could reduce mortgage interest and shorten the remaining loan.", cta:"Explore extra repayments →" },
      IE: { title:"Mortgage Overpayment", description:"See how mortgage overpayments or an early repayment could change interest and remaining term.", cta:"Explore mortgage overpayments →" }
    };
    return map[regionCode] || { title:"Mortgage / Home Loan Payoff", description:"See how extra payments, prepayments or an earlier payoff target could change interest and time to debt-free.", cta:"Explore payoff options →" };
  }

  function applyHousingTerminology(regionCode) {
    const copy = housingIdentity(regionCode);
    document.querySelectorAll("[data-cm-housing-title]").forEach((node) => { node.textContent = copy.title; });
    document.querySelectorAll("[data-cm-housing-description]").forEach((node) => { node.textContent = copy.description; });
    document.querySelectorAll("[data-cm-housing-cta]").forEach((node) => { node.textContent = copy.cta; });
    document.querySelectorAll("[data-cm-housing-kicker]").forEach((node) => { node.textContent = regionCode === "IN" ? "Home loans" : "Home & loans"; });
    document.querySelectorAll("[data-cm-footer-housing]").forEach((node) => { node.textContent = copy.title; });
  }


  function loanIdentity(regionCode) {
    const map = {
      IN: { title:"EMI Calculator", description:"Calculate a monthly EMI, total interest and repayment for one fixed-rate reducing-balance loan, with optional extra-payment scenarios.", cta:"Calculate EMI →", kicker:"Loans & EMI" },
      US: { title:"Loan Calculator", description:"Calculate a monthly loan payment, total interest and repayment for one fixed-rate amortizing loan, with optional extra payments.", cta:"Calculate loan payment →", kicker:"Loans" },
      CA: { title:"Loan Calculator", description:"Calculate a monthly loan payment, total interest and repayment for one fixed-rate amortizing loan, with optional extra payments.", cta:"Calculate loan payment →", kicker:"Loans" },
      GB: { title:"Loan Repayment Calculator", description:"Calculate a monthly loan repayment, total interest and repayment for one fixed-rate amortizing loan, with optional extra payments.", cta:"Calculate loan repayment →", kicker:"Loans" },
      AU: { title:"Loan Repayment Calculator", description:"Calculate a monthly loan repayment, total interest and repayment for one fixed-rate amortizing loan, with optional extra repayments.", cta:"Calculate loan repayment →", kicker:"Loans" },
      NZ: { title:"Loan Repayment Calculator", description:"Calculate a monthly loan repayment, total interest and repayment for one fixed-rate amortizing loan, with optional extra repayments.", cta:"Calculate loan repayment →", kicker:"Loans" },
      IE: { title:"Loan Repayment Calculator", description:"Calculate a monthly loan repayment, total interest and repayment for one fixed-rate amortizing loan, with optional extra repayments.", cta:"Calculate loan repayment →", kicker:"Loans" }
    };
    return map[regionCode] || { title:"Loan / EMI Calculator", description:"Calculate a monthly loan payment or EMI, total interest and repayment for one fixed-rate amortizing loan, with optional extra payments.", cta:"Calculate loan payment →", kicker:"Loans" };
  }

  function applyLoanTerminology(regionCode) {
    const copy = loanIdentity(regionCode);
    document.querySelectorAll("[data-cm-loan-title]").forEach((node) => { node.textContent = copy.title; });
    document.querySelectorAll("[data-cm-loan-description]").forEach((node) => { node.textContent = copy.description; });
    document.querySelectorAll("[data-cm-loan-cta]").forEach((node) => { node.textContent = copy.cta; });
    document.querySelectorAll("[data-cm-loan-kicker]").forEach((node) => { node.textContent = copy.kicker; });
    document.querySelectorAll("[data-cm-footer-loan]").forEach((node) => { node.textContent = copy.title; });
  }

  function homeAffordabilityIdentity(regionCode) {
    const map = {
      IN: { title:"Home Loan Affordability Calculator", description:"Estimate a home price and home-loan amount that may fit your household budget, down payment, monthly costs and chosen cash-flow buffer.", cta:"Check home-loan affordability →", kicker:"Home affordability" },
      US: { title:"Home Affordability Calculator", description:"Estimate a home price and mortgage amount that may fit your household budget, down payment, monthly costs and chosen cash-flow buffer.", cta:"Check home affordability →", kicker:"Home affordability" },
      CA: { title:"Mortgage Affordability Calculator", description:"Estimate a home price and mortgage amount that may fit your household budget, down payment, monthly costs and chosen cash-flow buffer.", cta:"Check mortgage affordability →", kicker:"Home affordability" },
      GB: { title:"Mortgage Affordability Calculator — How Much Can I Borrow?", description:"Estimate a home price and mortgage amount that may fit your household budget, deposit, monthly costs and chosen cash-flow buffer.", cta:"Check mortgage affordability →", kicker:"Home affordability" },
      IE: { title:"Mortgage Affordability Calculator — How Much Can I Borrow?", description:"Estimate a home price and mortgage amount that may fit your household budget, deposit, monthly costs and chosen cash-flow buffer.", cta:"Check mortgage affordability →", kicker:"Home affordability" },
      AU: { title:"Home Loan Borrowing Power Calculator", description:"Estimate a home price and home-loan amount that may fit your household budget, deposit, monthly costs and chosen cash-flow buffer.", cta:"Check borrowing power →", kicker:"Home affordability" },
      NZ: { title:"Home Loan Borrowing Power Calculator", description:"Estimate a home price and home-loan amount that may fit your household budget, deposit, monthly costs and chosen cash-flow buffer.", cta:"Check borrowing power →", kicker:"Home affordability" }
    };
    return map[regionCode] || { title:"Home Affordability & Mortgage Calculator", description:"Estimate a home price and mortgage or home-loan amount that may fit your household budget, deposit, monthly costs and chosen cash-flow buffer.", cta:"Check home affordability →", kicker:"Home affordability" };
  }

  function applyHomeAffordabilityTerminology(regionCode) {
    const copy = homeAffordabilityIdentity(regionCode);
    document.querySelectorAll('[data-cm-home1-title]').forEach(node => { node.textContent = copy.title; });
    document.querySelectorAll('[data-cm-home1-description]').forEach(node => { node.textContent = copy.description; });
    document.querySelectorAll('[data-cm-home1-cta]').forEach(node => { node.textContent = copy.cta; });
    document.querySelectorAll('[data-cm-home1-kicker]').forEach(node => { node.textContent = copy.kicker; });
  }

  function retirementWithdrawalIdentity(regionCode) {
    if (regionCode === 'IN') return { title:'Retirement SWP / Withdrawal Calculator', kicker:'Retirement income', cta:'Model retirement withdrawals →' };
    if (regionCode === 'GB' || regionCode === 'IE') return { title:'Retirement Drawdown Calculator', kicker:'Retirement income', cta:'Model retirement drawdown →' };
    if (regionCode === 'US' || regionCode === 'CA' || regionCode === 'AU' || regionCode === 'NZ') return { title:'Retirement Withdrawal Calculator', kicker:'Retirement income', cta:'Model retirement withdrawals →' };
    return { title:'Retirement Withdrawal & Drawdown Calculator', kicker:'Retirement income', cta:'Model retirement withdrawals →' };
  }

  function applyRetirementWithdrawalTerminology(regionCode) {
    const copy = retirementWithdrawalIdentity(regionCode);
    document.querySelectorAll('[data-cm-retire1-title]').forEach(node => { node.textContent = copy.title; });
    document.querySelectorAll('[data-cm-retire1-kicker]').forEach(node => { node.textContent = copy.kicker; });
    document.querySelectorAll('[data-cm-retire1-cta]').forEach(node => { node.textContent = copy.cta; });
  }

  let lastOrderedRegion = null;
  function applyHomepageOrder(regionCode) {
    const grid = document.querySelector("[data-homepage-core-grid]");
    if (!grid || lastOrderedRegion === regionCode) return;

    const cards = new Map(
      [...grid.querySelectorAll("[data-tool-id]")].map((card) => [card.dataset.toolId, card])
    );
    const order = getOrderForRegion(regionCode);
    order.forEach((toolId) => {
      const card = cards.get(toolId);
      if (card) grid.appendChild(card);
    });
    const gateway = grid.querySelector("[data-tools-gateway]");
    if (gateway) grid.appendChild(gateway);

    grid.dataset.appliedCountry = regionCode;
    grid.dataset.appliedOrder = order.join(",");
    lastOrderedRegion = regionCode;
  }

  function applyIndiaExperience(regionCode) {
    // Keep the established class name for compatibility with existing QA and CSS;
    // country, not currency, now controls the India-specific terminology/discovery layer.
    document.body.classList.toggle("india-inr", regionCode === "IN");
  }

  function applyToolsHubExperience() {
    const locale = getLocaleApi();
    if (!locale) return;
    const regionCode = locale.getRegion();
    applyIndiaExperience(regionCode);
    applyInvestmentTerminology(regionCode);
    applyHousingTerminology(regionCode);
    applyLoanTerminology(regionCode);
    applyHomeAffordabilityTerminology(regionCode);
    applyRetirementWithdrawalTerminology(regionCode);
    applyHomepageOrder(regionCode);
    upgradeLegacyToolsLinks();
  }

  function bindToolsHubExperience() {
    upgradeLegacyToolsLinks();
    applyToolsHubExperience();
    window.addEventListener("carrowmont:localechange", applyToolsHubExperience);
    window.addEventListener("pageshow", applyToolsHubExperience);
  }

  window.CarrowmontToolsHub = Object.freeze({
    version: "core9-tools-hub2",
    profiles: TOOL_ORDER_PROFILES,
    regionProfiles: REGION_ORDER_PROFILE,
    getOrderForRegion,
    apply: applyToolsHubExperience
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindToolsHubExperience, { once: true });
  } else {
    bindToolsHubExperience();
  }
})();

/* Carrowmont Learn/content localization — integrated with site locale controller (v1.1.0-integrated1). */
(function () {
  "use strict";
  var L = null;
  function refreshLocaleApi(){ L = window.CarrowmontLocale || null; return !!L; }

  var currencyExamples = {
    INR:{target:10000000,monthly:10000}, USD:{target:1000000,monthly:500}, CAD:{target:1000000,monthly:500}, GBP:{target:1000000,monthly:500}, AUD:{target:1000000,monthly:500}, NZD:{target:1000000,monthly:500}, EUR:{target:1000000,monthly:500}, CNY:{target:1000000,monthly:3000}, JPY:{target:100000000,monthly:50000}, KRW:{target:1000000000,monthly:500000}, SGD:{target:1000000,monthly:500}, AED:{target:1000000,monthly:2000}, SAR:{target:1000000,monthly:2000}, CHF:{target:1000000,monthly:500}, BRL:{target:1000000,monthly:1000}, MXN:{target:1000000,monthly:5000}, ZAR:{target:1000000,monthly:5000}, IDR:{target:1000000000,monthly:1000000}, MYR:{target:1000000,monthly:1000}, THB:{target:10000000,monthly:10000}, PHP:{target:1000000,monthly:10000}, VND:{target:1000000000,monthly:5000000}, HKD:{target:1000000,monthly:5000}, TWD:{target:10000000,monthly:10000}, RUB:{target:1000000,monthly:20000}, TRY:{target:1000000,monthly:10000}
  };
  function text(id,v){var e=document.getElementById(id);if(e)e.textContent=v;}
  function html(id,v){var e=document.getElementById(id);if(e)e.innerHTML=v;}
  function meta(name,v,property){var q=property?'meta[property="'+name+'"]':'meta[name="'+name+'"]';var e=document.querySelector(q);if(e)e.setAttribute('content',v);}
  function decimals(v){var a=Math.abs(v);if(a>=100)return 0;if(a>=10)return 1;return 2;}
  function trim(v,d){return Number(v).toLocaleString(L.getLocale(),{maximumFractionDigits:d,minimumFractionDigits:0});}
  function exact(v){return L.formatMoney(v,{maximumFractionDigits:0});}
  function human(v){var c=L.getCurrency(),s=L.currencySymbol(c),space=['AED','SAR','CHF'].indexOf(c)>=0?' ':''; if(c==='INR'){if(Math.abs(v)>=10000000)return s+trim(v/10000000,decimals(v/10000000))+' crore';if(Math.abs(v)>=100000)return s+trim(v/100000,decimals(v/100000))+' lakh';return exact(v);} if(Math.abs(v)>=1000000000){var b=v/1000000000;return s+space+trim(b,decimals(b))+' billion';} if(Math.abs(v)>=1000000){var m=v/1000000;return s+space+trim(m,decimals(m))+' million';} return exact(v);}
  function monthlyRate(a){return Math.pow(1+a,1/12)-1;}
  function fvMonthly(m,y,a){var r=monthlyRate(a),n=y*12;return r===0?m*n:m*(Math.pow(1+r,n)-1)/r;}
  function monthlyForTarget(t,y,a){var r=monthlyRate(a),n=y*12;return r===0?t/n:t*r/(Math.pow(1+r,n)-1);}
  function fvStep(m,y,a,step){var r=monthlyRate(a),b=0;for(var i=1;i<=y*12;i++){b*=1+r;b+=m;if(i%12===0&&i<y*12)m*=1+step;}return b;}
  function yearsToTarget(start,monthly,target,a,maxYears){var r=monthlyRate(a),b=start;for(var i=1;i<=maxYears*12;i++){b*=1+r;b+=monthly;if(b>=target)return i/12;}return null;}
  function updateStructured(headline,desc){var b=document.querySelector('script[type="application/ld+json"]');if(!b)return;try{var d=JSON.parse(b.textContent);if(d&&d['@type']==='Article'){d.headline=headline;d.description=desc;b.textContent=JSON.stringify(d);}}catch(_){} }
  function state(){var region=L.getRegion(),currency=L.getCurrency(),isIndia=region==='IN',cfg=currencyExamples[currency]||currencyExamples.USD;cfg={target:cfg.target,monthly:cfg.monthly};cfg.goal=cfg.target/10;cfg.monthlyExpense=cfg.target/200;cfg.annualSpending=cfg.monthlyExpense*12;cfg.existing=cfg.target/10; return {region:region,currency:currency,isIndia:isIndia,cfg:cfg,term:isIndia?'Monthly Investment (SIP)':'Monthly Investment',fixedTerm:isIndia?'Fixed Monthly Investment (SIP)':'Fixed Monthly Investment',increasingTerm:isIndia?'Increasing Monthly Investment (Step-up SIP)':'Increasing Monthly Investment',calculator:isIndia?'SIP Calculator':'Recurring Investment Calculator',retirementTerm:isIndia?'retirement corpus':'retirement savings target'};}
  function updateFooter(s){document.querySelectorAll('.footer-col a[href="/sip-calculator/"]').forEach(function(a){a.textContent=s.calculator;});}
  function commonTerminology(s){}
  function updateLearn(s){if(document.body.dataset.cmPage!=='learn-hub')return;var target=human(s.cfg.target),monthly=exact(s.cfg.monthly);text('investmentCategoryTitle',s.isIndia?'Monthly Investment (SIP)':'Monthly Investment');text('investmentTargetTopicTitle','How much '+s.term+' is needed to build '+target+'?');text('investmentTargetTopicDesc','Work backward from a '+target+' target across different time horizons and assumptions.');text('investmentMonthlyTopicTitle',monthly+' '+s.term+': What could it grow to?');text('investmentMonthlyTopicDesc','Compare illustrative outcomes for '+monthly+' per month over 10, 15, 20 and 25 years.');text('investmentStepTopicTitle',s.increasingTerm+' vs '+s.fixedTerm+': What changes?');text('investmentStepTopicDesc','See how increasing contributions can change the contribution path and projected value.');var wrap=document.querySelector('.planning-categories');if(wrap){var order=s.isIndia?['investment','retirement','goals','fi','inflation','foundation']:['retirement','goals','investment','fi','inflation','foundation'];order.forEach(function(k){var e=wrap.querySelector('[data-category=\"'+k+'\"]');if(e)wrap.appendChild(e);});}}
  function updateInvestmentTarget(s){if(document.body.dataset.cmPage!=='investment-target-guide')return;var target=human(s.cfg.target),title='How much '+s.term+' is needed to build '+target+'?',desc='Estimate the monthly contribution for a '+target+' target across several time horizons and understand the assumptions behind the result.';document.title=title+' | Carrowmont';meta('description',desc);meta('og:title',document.title,true);meta('og:description',desc,true);updateStructured(title,desc);text('articleKicker',s.isIndia?'MONTHLY INVESTMENT (SIP) GUIDE':'MONTHLY INVESTMENT GUIDE');text('articleTitle',title);text('articleCtaText','Calculate your path to '+target);text('localeContext',s.isIndia?'In India, recurring monthly investing is commonly called a SIP. Carrowmont uses that familiar term here while keeping the underlying maths the same.':'Carrowmont uses the general term monthly investment here. The example amount changes with your selected currency, but it is a round illustration rather than an exchange-rate conversion.');text('targetIntroHeading','There is no single monthly amount for '+target+'.');text('targetIntroText','The monthly contribution depends on the time horizon, expected return assumption, contribution timing and whether contributions increase over time. The same '+target+' target can require a very different starting amount over 10 years versus 25 years.');text('targetExampleHeading','Illustrative '+s.term+' for a '+target+' target at a 12% annual return assumption');[10,15,20,25].forEach(function(y){text('target'+y,y+' years: about '+exact(monthlyForTarget(s.cfg.target,y,.12))+' per month');});text('targetNominalHeading','But '+target+' is a nominal target.');text('targetInflationText','If the goal is many years away, ask what '+target+' is intended to buy. At 5% annual inflation, something costing '+target+' today would cost about '+human(s.cfg.target*Math.pow(1.05,20))+' in 20 years. A nominal target should always be interpreted alongside purchasing power.');text('targetFaqSmall','Can a smaller monthly investment reach '+target+' with more time?');text('targetFaqInflation','Should the '+target+' target be inflation-adjusted?');text('targetFaqInflationAnswer','If '+target+' represents the cost of something in today\'s money, the future target should generally reflect expected price growth. If it is simply a nominal future target, no extra inflation adjustment is required.');}
  function updateGrowth(s){if(document.body.dataset.cmPage!=='investment-growth-guide')return;var monthly=exact(s.cfg.monthly),title=monthly+' '+s.term+' for 10, 15, 20 and 25 years: What could it grow to?',desc='See how a '+monthly+' monthly contribution could grow over 10, 15, 20 and 25 years, separating contributions from modeled growth.';document.title=title+' | Carrowmont';meta('description',desc);meta('og:title',document.title,true);meta('og:description',desc,true);updateStructured(title,desc);text('articleKicker',s.isIndia?'MONTHLY INVESTMENT (SIP) GROWTH GUIDE':'MONTHLY INVESTMENT GROWTH GUIDE');text('articleTitle',title);text('localeContext',s.isIndia?'In India, a recurring monthly investment is commonly called a SIP. The example below uses '+monthly+' per month.':'The example below uses a round '+monthly+' monthly contribution for your selected currency. It is an illustration, not an exchange-rate conversion.');text('growthIntroText','Consider a fixed '+monthly+' '+s.term+' with no existing investment and no annual increase. Using a 12% annual return assumption converted to an equivalent monthly compound rate, the projected values are:');text('growthExampleHeading',monthly+' '+s.term+' at a 12% annual assumption');[10,15,20,25].forEach(function(y){text('growth12y'+y,y+' years: about '+human(fvMonthly(s.cfg.monthly,y,.12)));});var c=[10,15,20,25].map(function(y){return human(s.cfg.monthly*12*y)});text('growthContributionText','Your own money contributed over those periods would be '+c[0]+', '+c[1]+', '+c[2]+' and '+c[3]+' respectively. The difference between contributions and projected value is the modelled investment growth.');var low=[10,15,20,25].map(function(y){return human(fvMonthly(s.cfg.monthly,y,.10))});text('growthLowerReturnText','At a 10% annual assumption, the same '+monthly+' monthly investment would project to about '+low[0]+' after 10 years, '+low[1]+' after 15 years, '+low[2]+' after 20 years and '+low[3]+' after 25 years. The monthly investment did not change; only the assumed return did.');text('growthGuaranteeHeading','Does a '+s.term+' guarantee returns?');text('growthGuaranteeText','No. '+s.term+' describes a contribution approach, not an investment return. Actual outcomes depend on the investment selected, market performance, fees, taxes and the timing of returns. Calculator outputs are illustrative, not guaranteed.');}
  function updateStep(s){if(document.body.dataset.cmPage!=='investment-stepup-guide')return;var monthly=exact(s.cfg.monthly),fixed=fvMonthly(s.cfg.monthly,20,.12),step=fvStep(s.cfg.monthly,20,.12,.10),year20=s.cfg.monthly*Math.pow(1.10,19),title=s.increasingTerm+' vs '+s.fixedTerm+': What changes?',desc='Compare fixed and increasing monthly contributions using the same horizon and return assumption, including contributions, affordability and risk.';document.title=title+' | Carrowmont';meta('description',desc);meta('og:title',document.title,true);meta('og:description',desc,true);updateStructured(title,desc);text('articleKicker',s.isIndia?'MONTHLY INVESTMENT (SIP) GUIDE':'MONTHLY INVESTMENT GUIDE');text('articleTitle',title);text('localeContext',s.isIndia?'In India, increasing a SIP periodically is commonly called a Step-up SIP. The example below starts at '+monthly+' per month.':'This guide compares an increasing monthly contribution with a fixed one. The example starts at a round '+monthly+' per month for your selected currency.');text('stepIntroHeading',s.increasingTerm+' changes the contribution path, not the return assumption.');text('stepIntroText','With a '+s.fixedTerm+', the contribution stays the same. With an '+s.increasingTerm+', it rises by a chosen percentage, typically once a year. The return assumption can be identical in both cases; the difference comes from putting more money to work later.');text('stepExampleHeading','Illustration: Starting monthly investment '+monthly+', 20 years, 12% annual return assumption');text('stepFixedValue',s.fixedTerm+' projected value: about '+human(fixed));text('stepIncreasingValue','10% annual increase projected value: about '+human(step));text('stepYear20','In year 20, the monthly investment would be about '+exact(year20)+'.');text('stepAffordabilityText','A 10% annual increase sounds modest in year one, but it compounds too. A '+monthly+' monthly investment becomes roughly '+exact(s.cfg.monthly*Math.pow(1.10,10))+' in year 11 and about '+exact(year20)+' in year 20. Before using a large annual increase in a plan, ask whether income is realistically expected to support that contribution path.');}
  function updateRetirementMain(s){if(document.body.dataset.cmPage!=='retirement-main-guide')return; var m=s.cfg.monthlyExpense; text('retirementTermIntro','There is no single '+s.retirementTerm+' that is right for everyone. Two people with the same salary can need very different amounts because their spending, retirement age, housing costs, healthcare needs, pensions, family commitments and desired safety margin may be different.');text('retirementTermProcess','A practical retirement estimate usually has four stages: estimate retirement spending in today\'s money, grow those costs for inflation until retirement, model the years after retirement, and then compare the required '+s.retirementTerm+' with the assets and income you expect to have.');text('retirementInflationExample','Suppose a household spends '+exact(m)+' per month today. At a constant 5% annual inflation assumption, the same basket would cost about '+exact(m*Math.pow(1.05,10))+' in 10 years, '+exact(m*Math.pow(1.05,20))+' in 20 years and '+exact(m*Math.pow(1.05,30))+' in 30 years. That is not a forecast; it is a scenario showing why today\'s spending and future spending should not be mixed.');text('retirementExistingSavings','What you have already saved has time to grow before retirement. A good model projects existing savings separately from new contributions, then shows the remaining gap. That is more informative than calculating a '+s.retirementTerm+' in isolation.');text('retirementFaqTerm','Is there a universal '+s.retirementTerm+'?');text('retirementFaqAnswer','No. A useful estimate depends on spending, retirement age, years in retirement, inflation, investment returns, retirement income and existing savings. A round number can be a checkpoint, but it should not replace a cash-flow model.');}
  function updateMonthlyGoal(s){if(document.body.dataset.cmPage!=='monthly-goal-guide')return;var t=s.cfg.goal,m6=monthlyForTarget(t,10,.06),m8=monthlyForTarget(t,10,.08),m5=monthlyForTarget(t,5,.06);html('monthlyGoalExample','<strong>Illustrative target: '+human(t)+' in 10 years</strong><span>At a 6% annual growth assumption, the required monthly contribution is about '+exact(m6)+'.</span><span>At an 8% annual growth assumption, it is about '+exact(m8)+'.</span><span>These figures use an equivalent monthly compound rate and end-of-month contributions.</span>');text('monthlyGoalTimeExample','Using the same '+human(t)+' target and a 6% annual assumption, a five-year horizon requires roughly '+exact(m5)+' per month. More time reduces the required monthly contribution because there are more contributions and more compounding periods.');text('monthlyGoalStepText',s.isIndia?'Some people prefer a fixed contribution. Others plan to increase the amount as income rises. A Step-up SIP can materially change the ending value, but it also means future monthly commitments become larger. Any annual increase assumption should therefore be checked against expected affordability.':'Some people prefer a fixed contribution. Others plan to increase the amount as income rises. An increasing monthly contribution can materially change the ending value, but it also means future monthly commitments become larger. Any annual increase assumption should therefore be checked against expected affordability.');}
  function updateCompound(s){if(document.body.dataset.cmPage!=='compound-guide')return;var m=s.cfg.monthly; text('compoundMonthlyExample','If you invest '+exact(m)+' a month for 20 years, your own contributions are '+exact(m*240)+'. The ending value is not found by multiplying the monthly amount by 240 and then applying one return to the whole amount, because the first contribution was invested for almost 20 years while the last was invested for only a short period.');}
  function updateInflationValue(s){if(document.body.dataset.cmPage!=='inflation-value-guide')return;var t=s.cfg.target/10; text('inflationTargetContext','If prices rise over time, the same nominal amount buys fewer goods and services. This is why a goal such as '+human(s.cfg.target)+' is incomplete unless you know whether that number is stated in today\'s purchasing power or in future currency.');text('inflationPurchasingExample','Equivalently, '+exact(t)+' of purchasing power today would correspond to only about '+exact(t/Math.pow(1.05,10))+' in today\'s purchasing-power terms after 10 years, '+exact(t/Math.pow(1.05,20))+' after 20 years and '+exact(t/Math.pow(1.05,30))+' after 30 years if prices rose at a constant 5% rate.');}
  function updateFiNumber(s){if(document.body.dataset.cmPage!=='fi-number-guide')return;var a=s.cfg.annualSpending;html('fiSpendingExample','<strong>Example with annual spending of '+exact(a)+'</strong><span>At 4%: target about '+human(a/.04)+'</span><span>At 3.5%: target about '+human(a/.035)+'</span><span>At 3%: target about '+human(a/.03)+'</span>');}
  function updateSavingsGoal(s){if(document.body.dataset.cmPage!=='savings-goal-guide')return; text('savingsGoalExample','“Save for a house” is an intention. “Build '+human(s.cfg.goal)+' for a deposit in six years” is a planning problem. Once the goal has a target amount and date, you can test inflation, existing savings and the monthly funding path.');}
  function updateNew(s){var p=document.body.dataset.cmPage,c=s.cfg;
    if(p==='retirement-income-guide'){html('retirementIncomeExample','<strong>Illustrative monthly spending</strong><span>Current monthly spending: '+exact(c.monthlyExpense)+'</span><span>After 20 years at 5% inflation: '+exact(c.monthlyExpense*Math.pow(1.05,20))+'</span>');text('retirementIncomeInflation','A monthly budget of '+exact(c.monthlyExpense)+' in today\'s currency would be about '+exact(c.monthlyExpense*Math.pow(1.05,20))+' after 20 years at a constant 5% inflation assumption. That is a scenario, not a forecast.');}
    if(p==='retirement-longevity-guide'){var spend=c.annualSpending/12;html('retirementLongevityExample','<strong>Illustrative starting point</strong><span>Starting savings: '+human(c.target)+'</span><span>First-year monthly spending from the portfolio: '+exact(spend)+'</span><span>Test more than one return and inflation assumption.</span>');}
    if(p==='retirement-inflation-guide'){var m=c.monthlyExpense;html('retirementInflationGuideExample','<strong>Illustrative monthly budget at 5% inflation</strong><span>Today: '+exact(m)+'</span><span>In 10 years: '+exact(m*Math.pow(1.05,10))+'</span><span>In 20 years: '+exact(m*Math.pow(1.05,20))+'</span><span>In 30 years: '+exact(m*Math.pow(1.05,30))+'</span>');}
    if(p==='investment-time-guide'){var y=yearsToTarget(c.existing,c.monthly,c.target,.08,50);html('investmentTimeExample','<strong>Illustrative target path</strong><span>Target: '+human(c.target)+'</span><span>Existing invested amount: '+human(c.existing)+'</span><span>Monthly investment: '+exact(c.monthly)+'</span><span>Estimated time at an 8% annual assumption: '+(y?trim(y,1)+' years':'More than 50 years')+'</span>');text('investmentTimeStepText',s.isIndia?'A Step-up SIP can shorten the modelled path by increasing the monthly contribution over time, but the later commitment also becomes larger.':'An increasing monthly investment can shorten the modelled path by increasing the contribution over time, but the later commitment also becomes larger.');}
    if(p==='starting-earlier-guide'){var m=c.monthly;html('startingEarlierExample','<strong>Illustrative '+s.term+' at an 8% annual assumption</strong><span>Monthly investment: '+exact(m)+'</span><span>10 years: '+human(fvMonthly(m,10,.08))+'</span><span>15 years: '+human(fvMonthly(m,15,.08))+'</span><span>20 years: '+human(fvMonthly(m,20,.08))+'</span>');text('startingEarlierContrib','Your own contributions would be '+human(m*120)+' over 10 years, '+human(m*180)+' over 15 years and '+human(m*240)+' over 20 years. The difference between those contributions and the projected values is modelled growth.');}
    if(p==='emergency-fund-guide'){var m=c.monthlyExpense;html('emergencyFundExample','<strong>Illustrative emergency-fund range</strong><span>Essential monthly expenses: '+exact(m)+'</span><span>3 months: '+human(m*3)+'</span><span>6 months: '+human(m*6)+'</span><span>9 months: '+human(m*9)+'</span>');}
    if(p==='lump-vs-monthly-guide'){var total=c.goal/2,monthly=total/60,r=monthlyRate(.08),lump=total*Math.pow(1+.08,5),stream=fvMonthly(monthly,5,.08);html('lumpVsMonthlyExample','<strong>Illustrative equal-total-contribution comparison</strong><span>Total contribution: '+human(total)+'</span><span>Lump sum invested for 5 years at 8%: '+human(lump)+'</span><span>Same total spread monthly across 5 years at 8%: '+human(stream)+'</span>');}
    if(p==='future-cost-guide'){var m=c.monthlyExpense;html('futureCostExample','<strong>Illustrative monthly expenses at 5% inflation</strong><span>Today: '+exact(m)+'</span><span>10 years: '+exact(m*Math.pow(1.05,10))+'</span><span>20 years: '+exact(m*Math.pow(1.05,20))+'</span><span>30 years: '+exact(m*Math.pow(1.05,30))+'</span>');}
    if(p==='inflation-savings-guide'){var b=c.goal;html('inflationSavingsExample','<strong>Illustrative fixed balance under 5% inflation</strong><span>Balance today: '+human(b)+'</span><span>Purchasing power after 10 years: '+human(b/Math.pow(1.05,10))+'</span><span>After 20 years: '+human(b/Math.pow(1.05,20))+'</span><span>After 30 years: '+human(b/Math.pow(1.05,30))+'</span>');}
    if(p==='fi-time-guide'){var annual=c.annualSpending,target=annual*25,start=c.existing,monthly=c.monthly,y=yearsToTarget(start,monthly,target,.07,50);html('fiTimeExample','<strong>Illustrative path</strong><span>Annual spending: '+exact(annual)+'</span><span>Illustrative 25× target: '+human(target)+'</span><span>Current invested assets: '+human(start)+'</span><span>Monthly contribution: '+exact(monthly)+'</span><span>Estimated time at a 7% annual assumption: '+(y?trim(y,1)+' years':'More than 50 years')+'</span>');}
  }
  function apply(){if(!refreshLocaleApi())return false;var s=state();updateFooter(s);updateLearn(s);updateInvestmentTarget(s);updateGrowth(s);updateStep(s);updateRetirementMain(s);updateMonthlyGoal(s);updateCompound(s);updateInflationValue(s);updateFiNumber(s);updateSavingsGoal(s);updateNew(s);commonTerminology(s);return true;}
  function scheduleApply(){
    if(!apply()){ window.setTimeout(scheduleApply,50); return; }
    if(window.requestAnimationFrame)window.requestAnimationFrame(apply);
    window.setTimeout(apply,0);
    window.setTimeout(apply,120);
  }
  function bindLocalization(){
    scheduleApply();
    window.addEventListener('carrowmont:localechange',scheduleApply);
    window.addEventListener('pageshow',scheduleApply);
    window.addEventListener('storage',function(e){
      if(!e||e.key==='carrowmont_region_v1'||e.key==='carrowmont_currency_v1')scheduleApply();
    });
    var done=document.getElementById('localeDoneBtn');
    if(done)done.addEventListener('click',function(){window.setTimeout(scheduleApply,0);window.setTimeout(scheduleApply,150);});
    var region=document.getElementById('regionSelect'), currency=document.getElementById('currencySelect');
    if(region)region.addEventListener('change',function(){window.setTimeout(scheduleApply,0);});
    if(currency)currency.addEventListener('change',function(){window.setTimeout(scheduleApply,0);});
    window.CarrowmontContentLocale={apply:scheduleApply,version:'v1.1.0-integrated1'};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindLocalization,{once:true});
  else bindLocalization();
})();

/* SEARCH1: add one consistent search entry to main-site desktop and mobile navigation. */
(function () {
  'use strict';

  function iconMarkup() {
    return '<span class="site-search-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4 4"></path></svg></span><span>Search</span>';
  }

  function createSearchLink(desktop) {
    var link = document.createElement('a');
    link.href = '/search.html';
    link.dataset.cmSearchLink = '';
    link.setAttribute('aria-label', 'Search Carrowmont');
    if (desktop) {
      link.className = 'site-search-link';
      link.innerHTML = iconMarkup();
    } else {
      link.textContent = 'Search';
    }
    if (window.location.pathname === '/search.html') link.setAttribute('aria-current', 'page');
    return link;
  }

  function insertSearchLinks() {
    document.querySelectorAll('.desktop-nav').forEach(function (nav) {
      if (nav.querySelector('[data-cm-search-link], a[href="/search.html"]')) return;
      var link = createSearchLink(true);
      var learn = nav.querySelector('a[href="/learn.html"]');
      if (learn && learn.nextSibling) nav.insertBefore(link, learn.nextSibling);
      else if (learn) nav.appendChild(link);
      else nav.appendChild(link);
    });

    document.querySelectorAll('.mobile-nav-panel, .mobile-nav-links').forEach(function (panel) {
      if (panel.querySelector('[data-cm-search-link], a[href="/search.html"]')) return;
      var link = createSearchLink(false);
      var learn = panel.querySelector('a[href="/learn.html"]');
      if (learn && learn.nextSibling) panel.insertBefore(link, learn.nextSibling);
      else if (learn) panel.appendChild(link);
      else panel.appendChild(link);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', insertSearchLinks, { once: true });
  else insertSearchLinks();
})();


/* TRAFFIC1A: add Research to shared main-site navigation without rewriting every public page. */
(function () {
  'use strict';

  /* TRAFFIC1A-NAV-FIT: the extra Research item must not make the shared desktop header overflow at 1440px. */
  function ensureResearchNavFit() {
    if (document.getElementById('traffic1aResearchNavFit')) return;
    var style = document.createElement('style');
    style.id = 'traffic1aResearchNavFit';
    style.textContent = '@media (min-width:1361px) and (max-width:1500px){.header-inner{gap:18px}.header-inner .brand-tagline,.header-inner .brand-rule{display:none}.desktop-nav{gap:20px}}';
    document.head.appendChild(style);
  }

  function addResearchLinks() {
    ensureResearchNavFit();
    document.querySelectorAll('.desktop-nav').forEach(function (nav) {
      if (nav.querySelector('a[href="/research.html"]')) return;
      var link=document.createElement('a'); link.href='/research.html'; link.textContent='Research'; link.dataset.cmResearchLink='';
      if (window.location.pathname==='/research.html' || window.location.pathname.indexOf('/research/')===0) link.setAttribute('aria-current','page');
      var search=nav.querySelector('a[href="/search.html"]');
      if (search) nav.insertBefore(link,search); else { var learn=nav.querySelector('a[href="/learn.html"]'); if(learn&&learn.nextSibling) nav.insertBefore(link,learn.nextSibling); else nav.appendChild(link); }
    });
    document.querySelectorAll('.mobile-nav-panel, .mobile-nav-links').forEach(function (panel) {
      if (panel.querySelector('a[href="/research.html"]')) return;
      var link=document.createElement('a'); link.href='/research.html'; link.textContent='Research'; link.dataset.cmResearchLink='';
      if (window.location.pathname==='/research.html' || window.location.pathname.indexOf('/research/')===0) link.setAttribute('aria-current','page');
      var search=panel.querySelector('a[href="/search.html"]');
      if (search) panel.insertBefore(link,search); else { var learn=panel.querySelector('a[href="/learn.html"]'); if(learn&&learn.nextSibling) panel.insertBefore(link,learn.nextSibling); else panel.appendChild(link); }
    });
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',addResearchLinks,{once:true}); else addResearchLinks();
})();


/* SOCIAL1: expose Carrowmont's official social channels in the shared site footer. */
(function () {
  'use strict';

  var CHANNELS = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/carrowmont/', icon: '<svg class="footer-social-icon footer-social-fill footer-social-linkedin" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 3.4a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.4 9H7v11.6H3.4V9Zm5.8 0h3.5v1.6h.1c.5-.9 1.7-2.1 3.6-2.1 3.9 0 4.6 2.6 4.6 6v6.1h-3.6v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.5H9.2V9Z"/></svg>' },
    { label: 'Facebook', href: 'https://www.facebook.com/carrowmont', icon: '<svg class="footer-social-icon footer-social-fill footer-social-facebook" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V10H7v3h3v8h3.7Z"/></svg>' },
    { label: 'Instagram', href: 'https://www.instagram.com/carrowmont.finance/', icon: '<svg class="footer-social-icon footer-social-instagram" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="cmInstagramGradientFooter" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#feda75"/><stop offset=".25" stop-color="#fa7e1e"/><stop offset=".5" stop-color="#d62976"/><stop offset=".75" stop-color="#962fbf"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs><rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#cmInstagramGradientFooter)"/><circle cx="12" cy="12" r="4" stroke="url(#cmInstagramGradientFooter)"/><circle cx="17.5" cy="6.5" r="1" fill="url(#cmInstagramGradientFooter)" stroke="none"/></svg>' },
    { label: 'YouTube', href: 'https://www.youtube.com/@carrowmontfinance', icon: '<svg class="footer-social-icon footer-social-fill footer-social-youtube" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 7.5a2.7 2.7 0 0 0-1.9-1.9C17.4 5 12 5 12 5s-5.4 0-7.1.6A2.7 2.7 0 0 0 3 7.5C2.5 9.1 2.5 12 2.5 12s0 2.9.5 4.5a2.7 2.7 0 0 0 1.9 1.9c1.7.6 7.1.6 7.1.6s5.4 0 7.1-.6a2.7 2.7 0 0 0 1.9-1.9c.5-1.6.5-4.5.5-4.5s0-2.9-.5-4.5Z"/><path class="footer-social-play" d="m10 15 5-3-5-3z"/></svg>' }
  ];

  function ensureSocialFooterStyles() {
    if (document.getElementById('social1FooterStyles')) return;
    var style = document.createElement('style');
    style.id = 'social1FooterStyles';
    style.textContent = '.footer-social-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.footer-social-links a{display:inline-flex;align-items:center;gap:7px;min-height:38px;padding:7px 11px;border:1px solid rgba(255,255,255,.2);border-radius:999px;color:#dce7f0!important;text-decoration:none!important;font-size:12.5px;font-weight:800;line-height:1}.footer-social-links a:hover{border-color:rgba(255,255,255,.42);color:#fff!important}.footer-social-icon{width:16px;height:16px;flex:0 0 auto;stroke:currentColor;stroke-width:1.9;fill:none}.footer-social-fill{fill:currentColor;stroke:none}.footer-social-linkedin{color:#0a66c2}.footer-social-facebook{color:#1877f2}.footer-social-youtube{color:#ff0000}.footer-social-play{fill:#fff;stroke:none}.footer-social-dot{fill:currentColor;stroke:none}.footer-social-label{display:block;margin-top:17px;color:#fff;font-size:12px;font-weight:900;letter-spacing:.07em;text-transform:uppercase}@media(max-width:700px){.footer-social-links{gap:7px}.footer-social-links a{min-height:40px;padding:8px 11px}}';
    document.head.appendChild(style);
  }

  function addFooterSocialLinks() {
    ensureSocialFooterStyles();
    document.querySelectorAll('.site-footer').forEach(function (footer) {
      if (footer.querySelector('[data-cm-footer-social]')) return;
      var brand = footer.querySelector('.footer-brand-block, .footer-brand');
      if (!brand) return;
      var label = document.createElement('span');
      label.className = 'footer-social-label';
      label.textContent = 'Follow Carrowmont';
      var nav = document.createElement('nav');
      nav.className = 'footer-social-links';
      nav.dataset.cmFooterSocial = '';
      nav.setAttribute('aria-label', 'Carrowmont social channels');
      CHANNELS.forEach(function (channel) {
        var link = document.createElement('a');
        link.href = channel.href;
        link.innerHTML = channel.icon + '<span>' + channel.label + '</span>';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', channel.label + ' - Carrowmont (opens in a new tab)');
        nav.appendChild(link);
      });
      brand.appendChild(label);
      brand.appendChild(nav);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addFooterSocialLinks, { once: true });
  else addFooterSocialLinks();
})();


/* MOBILE1: mobile app-like web UX for the main Carrowmont site. */
(function () {
  'use strict';

  var MOBILE_QUERY = '(max-width: 700px)';
  var QUICK_TOOL_PROFILES = {
    IN: ['investment', 'loan', 'retirement', 'compound', 'goals'],
    DEFAULT: ['retirement', 'housing', 'loan', 'investment', 'compound']
  };

  var ICONS = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5M9.5 20v-6h5v6"/></svg>',
    tools: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="7" height="7" rx="2"/><rect x="14" y="4" width="7" height="7" rx="2"/><rect x="3" y="15" width="7" height="6" rx="2"/><rect x="14" y="15" width="7" height="6" rx="2"/></svg>',
    learn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5c2.8-.8 5.4-.3 8 1.5v12c-2.6-1.8-5.2-2.3-8-1.5z"/><path d="M20 5.5c-2.8-.8-5.4-.3-8 1.5v12c2.6-1.8 5.2-2.3 8-1.5z"/></svg>',
    research: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5M8 13v-3m3 3V7m3 6v-2"/></svg>',
    more: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>',
    globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 4.5 6 4.5 9S15 18 12 21c-3-3-4.5-6-4.5-9S9 6 12 3z"/></svg>',
    about: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/></svg>',
    methodology: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg>',
    contact: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="9" width="3" height="10" rx=".5"/><circle cx="5.5" cy="5.5" r="1.5"/><path d="M10 19V9h3v1.7c1-1.3 2.1-2 3.8-2 2.8 0 4.2 1.8 4.2 5V19h-3v-4.8c0-1.7-.5-2.8-2-2.8-1.8 0-3 1.2-3 3V19z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h4l-.6 4H14v9h-4v-9H7V8h3V5.5C10 2.5 11.8 1 15 1h3v4h-2c-1.4 0-2 .5-2 1.8z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 7.5a2.7 2.7 0 0 0-1.9-1.9C17.4 5 12 5 12 5s-5.4 0-7.1.6A2.7 2.7 0 0 0 3 7.5C2.5 9.1 2.5 12 2.5 12s0 2.9.5 4.5a2.7 2.7 0 0 0 1.9 1.9c1.7.6 7.1.6 7.1.6s5.4 0 7.1-.6a2.7 2.7 0 0 0 1.9-1.9c.5-1.6.5-4.5.5-4.5s0-2.9-.5-4.5Z"/><path d="m10 15 5-3-5-3z"/></svg>'
  };

  function ensureStyles() {
    if (document.getElementById('mobile1Styles')) return;
    var style = document.createElement('style');
    style.id = 'mobile1Styles';
    style.textContent = [
      '.mobile1-header-search,.mobile1-bottom-nav,.mobile1-quick-tools{display:none}',
      '.mobile1-more-dialog{border:0;padding:0;background:transparent;color:var(--navy,#0f2743)}',
      '@media(max-width:700px){',
      'html.mobile1-active body{padding-bottom:calc(72px + env(safe-area-inset-bottom,0px))}',
      'html.mobile1-active .site-header{position:sticky;top:0;z-index:95;box-shadow:0 5px 18px rgba(15,39,67,.08)}',
      'html.mobile1-active .header-inner{min-height:64px!important;gap:8px!important;flex-wrap:nowrap!important}',
      'html.mobile1-active .brand{min-width:0;gap:8px}',
      'html.mobile1-active .brand-name{font-size:18px!important;letter-spacing:1.2px!important}',
      'html.mobile1-active .brand-rule,html.mobile1-active .brand-tagline{display:none!important}',
      'html.mobile1-active .mobile-nav{display:none!important}',
      '.mobile1-header-search{display:grid;width:42px;height:42px;place-items:center;border:1px solid #d2e0e8;border-radius:13px;background:#fff;color:#163a5b;margin-left:auto;flex:0 0 auto}',
      '.mobile1-header-search svg{width:21px;height:21px}',
      'html.mobile1-active .locale-menu{margin-left:0!important;flex:0 0 auto}',
      'html.mobile1-active .locale-summary{min-height:42px;padding:8px 10px!important;gap:6px!important}',
      'html.mobile1-active .locale-summary #localeCountryLabel,html.mobile1-active .locale-summary #localeCountryLabel+span{display:none!important}',
      'html.mobile1-active .locale-summary #localeCurrencyLabel{font-size:12px}',
      'html.mobile1-active .locale-summary .chevron{display:none!important}',
      'html.mobile1-active .locale-panel{top:70px!important}',
      '.mobile1-bottom-nav{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));position:fixed;left:0;right:0;bottom:0;z-index:120;background:rgba(255,255,255,.97);border-top:1px solid #d5e1e8;box-shadow:0 -7px 22px rgba(15,39,67,.09);padding:5px 6px calc(5px + env(safe-area-inset-bottom,0px));backdrop-filter:blur(12px)}',
      '.mobile1-nav-item{min-width:0;min-height:58px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:0;background:transparent;color:#667e98;font:inherit;font-size:10.5px;font-weight:800;text-decoration:none;border-radius:12px;padding:4px 2px}',
      '.mobile1-nav-item svg{width:22px;height:22px;stroke-width:2}',
      '.mobile1-nav-item[aria-current="page"]{color:#08766e;background:#eaf7f5}',
      '.mobile1-nav-item:focus-visible,.mobile1-header-search:focus-visible,.mobile1-more-link:focus-visible,.mobile1-quick-tool:focus-visible{outline:3px solid rgba(12,146,135,.28);outline-offset:2px}',
      '.mobile1-more-dialog{display:none}',
      '.mobile1-more-dialog[open]{display:block;position:fixed;inset:auto 0 0 0;width:100%;max-width:none;max-height:min(78%,650px);margin:0;border-radius:24px 24px 0 0;background:#fff;box-shadow:0 -18px 50px rgba(15,39,67,.18);overflow:auto;padding:0 0 calc(20px + env(safe-area-inset-bottom,0px));z-index:150}',
      '.mobile1-more-dialog::backdrop{background:rgba(9,28,47,.42)}',
      '.mobile1-more-head{position:sticky;top:0;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 18px;background:#fff;border-bottom:1px solid #e0e8ed;z-index:1}',
      '.mobile1-more-head strong{font-size:18px}',
      '.mobile1-more-close{width:42px;height:42px;border:1px solid #d7e3ea;border-radius:50%;background:#fff;color:#173b5e;font-size:24px;line-height:1;cursor:pointer}',
      '.mobile1-more-body{padding:14px 16px 4px}',
      '.mobile1-more-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}',
      '.mobile1-more-link{display:flex;align-items:center;gap:11px;min-height:54px;padding:10px 12px;border:1px solid #dce6eb;border-radius:14px;background:#fff;color:#173b5e;text-decoration:none;font-size:13px;font-weight:850;text-align:left}',
      '.mobile1-more-link svg{width:21px;height:21px;color:#0c9287;flex:0 0 auto}',
      '.mobile1-more-link.mobile1-locale-button{grid-column:1/-1;width:100%;font:inherit;cursor:pointer}',
      '.mobile1-more-social-title{margin:20px 2px 9px;color:#667e98;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}',
      '.mobile1-more-social{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}',
      '.mobile1-more-social .mobile1-more-link{min-height:48px}',
      '.mobile1-quick-tools{display:block;margin:2px 0 0;padding:15px 0 4px}',
      '.mobile1-quick-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:13px}',
      '.mobile1-quick-head strong{font-size:16px}',
      '.mobile1-quick-head a{color:#08766e;font-size:13px;font-weight:900}',
      '.mobile1-quick-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}',
      '.mobile1-quick-tool{min-width:0;display:flex;flex-direction:column;align-items:center;gap:7px;padding:7px 1px 5px;color:#173b5e;text-decoration:none;text-align:center;border-radius:13px}',
      '.mobile1-quick-icon{display:grid;place-items:center;width:46px;height:46px;border-radius:14px;background:#eaf7f5;color:#087e75}',
      '.mobile1-quick-icon svg{width:25px;height:25px}',
      '.mobile1-quick-tool span:last-child{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:10.5px;font-weight:850;line-height:1.15}',
      'html.mobile1-active [data-homepage-core-grid]{display:none!important}',
      'html.mobile1-active .planning-section{padding:34px 0 38px!important}',
      'html.mobile1-active .planning-section .section-heading-row{margin-bottom:6px!important}',
      'html.mobile1-active .planning-section .section-heading-row>.text-link{display:none!important}',
      'html.mobile1-active .planning-section .section-heading-row h2{font-size:31px!important}',
      'html.mobile1-active .planning-section .section-heading-row p{font-size:16px!important;line-height:1.5}',
      'html.mobile1-active body.india-inr .india-sip-spotlight{display:none!important}',
      'html.mobile1-active .authority-tools-section{padding:42px 0 46px!important}',
      'html.mobile1-active .authority-tools-grid{display:flex!important;gap:12px!important;overflow-x:auto;scroll-snap-type:x mandatory;padding:1px 14px 10px 0;margin-right:-14px;scrollbar-width:none}',
      'html.mobile1-active .authority-tools-grid::-webkit-scrollbar,html.mobile1-active .learn-grid::-webkit-scrollbar{display:none}',
      'html.mobile1-active .authority-tool-card{flex:0 0 84%;scroll-snap-align:start;min-height:0!important}',
      'html.mobile1-active .learn-section{padding:44px 0!important}',
      'html.mobile1-active .learn-grid{display:flex!important;gap:12px!important;overflow-x:auto;scroll-snap-type:x mandatory;padding:1px 14px 10px 0;margin-right:-14px;scrollbar-width:none}',
      'html.mobile1-active .learn-grid article{flex:0 0 84%;scroll-snap-align:start;min-height:205px!important}',
      'html.mobile1-active .about-preview{padding:48px 0!important}',
      'html.mobile1-active .social-follow-section{padding-bottom:40px!important}',
      '}',
      '@media(max-width:360px){.mobile1-quick-grid{gap:3px}.mobile1-quick-icon{width:42px;height:42px}.mobile1-quick-tool span:last-child{font-size:10px}.mobile1-nav-item{font-size:10px}}'
    ].join('');
    document.head.appendChild(style);
  }

  function pathKey() {
    var path = window.location.pathname || '/';
    if (path === '/' || path === '/index.html') return 'home';
    if (path === '/tools.html' || path.indexOf('/sip-calculator/') === 0 || path.indexOf('/retirement-calculator/') === 0 || path.indexOf('/goal-planner/') === 0 || path.indexOf('/financial-independence/') === 0 || path.indexOf('/inflation-calculator/') === 0 || path.indexOf('/budget-cash-flow-planner/') === 0 || path.indexOf('/mortgage-payoff-calculator/') === 0 || path.indexOf('/compound-interest-calculator/') === 0 || path.indexOf('/loan-calculator/') === 0) return 'tools';
    if (path === '/learn.html' || document.body.dataset.cmPage === 'learn-hub') return 'learn';
    if (path === '/research.html' || path.indexOf('/research/') === 0) return 'research';
    return '';
  }

  function addHeaderSearch() {
    document.querySelectorAll('.header-inner').forEach(function (header) {
      if (header.querySelector('[data-mobile1-header-search]')) return;
      var link = document.createElement('a');
      link.className = 'mobile1-header-search';
      link.dataset.mobile1HeaderSearch = '';
      link.href = '/search.html';
      link.setAttribute('aria-label', 'Search Carrowmont');
      link.innerHTML = ICONS.search;
      var locale = header.querySelector('.locale-menu');
      if (locale) header.insertBefore(link, locale);
      else header.appendChild(link);
    });
  }

  function createNavItem(item, active) {
    var node = document.createElement(item.button ? 'button' : 'a');
    node.className = 'mobile1-nav-item';
    if (item.button) node.type = 'button';
    else node.href = item.href;
    node.dataset.mobile1Nav = item.key;
    node.innerHTML = ICONS[item.key] + '<span>' + item.label + '</span>';
    if (active === item.key) node.setAttribute('aria-current', 'page');
    return node;
  }

  function buildMoreDialog() {
    var existing = document.getElementById('mobile1MoreDialog');
    if (existing) return existing;
    var dialog = document.createElement('dialog');
    dialog.id = 'mobile1MoreDialog';
    dialog.className = 'mobile1-more-dialog';
    dialog.setAttribute('aria-labelledby', 'mobile1MoreTitle');
    dialog.innerHTML = '' +
      '<div class="mobile1-more-head"><strong id="mobile1MoreTitle">More from Carrowmont</strong><button type="button" class="mobile1-more-close" aria-label="Close menu">&times;</button></div>' +
      '<div class="mobile1-more-body">' +
        '<div class="mobile1-more-grid">' +
          '<a class="mobile1-more-link" href="/search.html">' + ICONS.search + '<span>Search</span></a>' +
          '<a class="mobile1-more-link" href="/about.html">' + ICONS.about + '<span>About</span></a>' +
          '<a class="mobile1-more-link" href="/methodology.html">' + ICONS.methodology + '<span>Methodology</span></a>' +
          '<a class="mobile1-more-link" href="/contact.html">' + ICONS.contact + '<span>Contact</span></a>' +
          '<button type="button" class="mobile1-more-link mobile1-locale-button">' + ICONS.globe + '<span>Country &amp; currency</span></button>' +
        '</div>' +
        '<p class="mobile1-more-social-title">Follow Carrowmont</p>' +
        '<div class="mobile1-more-social">' +
          '<a class="mobile1-more-link" href="https://www.linkedin.com/company/carrowmont/" target="_blank" rel="noopener noreferrer">' + ICONS.linkedin + '<span>LinkedIn</span></a>' +
          '<a class="mobile1-more-link" href="https://www.facebook.com/carrowmont" target="_blank" rel="noopener noreferrer">' + ICONS.facebook + '<span>Facebook</span></a>' +
          '<a class="mobile1-more-link" href="https://www.instagram.com/carrowmont.finance/" target="_blank" rel="noopener noreferrer">' + ICONS.instagram + '<span>Instagram</span></a>' +
          '<a class="mobile1-more-link" href="https://www.youtube.com/@carrowmontfinance" target="_blank" rel="noopener noreferrer">' + ICONS.youtube + '<span>YouTube</span></a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(dialog);

    dialog.querySelector('.mobile1-more-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.querySelector('.mobile1-locale-button').addEventListener('click', function () {
      dialog.close();
      var locale = document.getElementById('localeMenu') || document.querySelector('.locale-menu');
      if (locale) {
        locale.open = true;
        var summary = locale.querySelector('summary');
        if (summary) summary.focus();
      }
    });
    return dialog;
  }

  function buildBottomNav() {
    if (document.querySelector('[data-mobile1-bottom-nav]')) return;
    var active = pathKey();
    var nav = document.createElement('nav');
    nav.className = 'mobile1-bottom-nav';
    nav.dataset.mobile1BottomNav = '';
    nav.setAttribute('aria-label', 'Mobile primary navigation');
    [
      { key: 'home', label: 'Home', href: '/' },
      { key: 'tools', label: 'Tools', href: '/tools.html' },
      { key: 'learn', label: 'Learn', href: '/learn.html' },
      { key: 'research', label: 'Research', href: '/research.html' },
      { key: 'more', label: 'More', button: true }
    ].forEach(function (item) { nav.appendChild(createNavItem(item, active)); });
    document.body.appendChild(nav);
    var dialog = buildMoreDialog();
    nav.querySelector('[data-mobile1-nav="more"]').addEventListener('click', function () {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    });
  }

  function compactLabel(toolId, regionCode) {
    var labels = {
      retirement: 'Retirement', compound: 'Compound', goals: 'Goals', budget: 'Budget', inflation: 'Inflation', independence: 'FI'
    };
    if (toolId === 'investment') return regionCode === 'IN' ? 'SIP' : 'Invest';
    if (toolId === 'loan') return regionCode === 'IN' ? 'EMI' : 'Loan';
    if (toolId === 'housing') {
      if (regionCode === 'IN') return 'Home Loan';
      if (regionCode === 'AU' || regionCode === 'NZ') return 'Home Loan';
      return 'Mortgage';
    }
    return labels[toolId] || toolId;
  }

  function currentRegion() {
    var api = window.CarrowmontLocale;
    return api && typeof api.getRegion === 'function' ? api.getRegion() : 'OTHER';
  }

  function renderQuickTools() {
    if (document.body.dataset.cmPage !== 'home') return;
    var grid = document.querySelector('[data-homepage-core-grid]');
    var heading = document.querySelector('.planning-section .section-heading-row');
    if (!grid || !heading) return;
    var host = document.querySelector('[data-mobile1-quick-tools]');
    if (!host) {
      host = document.createElement('div');
      host.className = 'mobile1-quick-tools';
      host.dataset.mobile1QuickTools = '';
      host.innerHTML = '<div class="mobile1-quick-head"><strong>Popular tools</strong><a href="/tools.html">See all</a></div><div class="mobile1-quick-grid"></div>';
      heading.insertAdjacentElement('afterend', host);
    }
    var region = currentRegion();
    var ids = (region === 'IN' ? QUICK_TOOL_PROFILES.IN : QUICK_TOOL_PROFILES.DEFAULT).slice();
    var quickGrid = host.querySelector('.mobile1-quick-grid');
    quickGrid.textContent = '';
    ids.forEach(function (toolId) {
      var card = grid.querySelector('[data-tool-id="' + toolId + '"]');
      if (!card) return;
      var destination = card.querySelector(':scope > a[href]');
      var icon = card.querySelector('.tool-icon');
      if (!destination || !icon) return;
      var link = document.createElement('a');
      link.className = 'mobile1-quick-tool';
      link.href = destination.getAttribute('href');
      link.setAttribute('aria-label', 'Open ' + (card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : compactLabel(toolId, region)));
      var iconWrap = document.createElement('span');
      iconWrap.className = 'mobile1-quick-icon';
      var svg = icon.querySelector('svg');
      if (svg) iconWrap.appendChild(svg.cloneNode(true));
      var label = document.createElement('span');
      label.textContent = compactLabel(toolId, region);
      link.appendChild(iconWrap);
      link.appendChild(label);
      quickGrid.appendChild(link);
    });
  }

  function init() {
    ensureStyles();
    addHeaderSearch();
    buildBottomNav();
    renderQuickTools();
    document.documentElement.classList.add('mobile1-active');
    window.addEventListener('carrowmont:localechange', renderQuickTools);
    window.addEventListener('pageshow', renderQuickTools);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
