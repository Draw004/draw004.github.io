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
  function updateLearn(s){if(document.body.dataset.cmPage!=='learn-hub')return;var target=human(s.cfg.target),monthly=exact(s.cfg.monthly);text('investmentCategoryTitle',s.isIndia?'Monthly Investment (SIP)':'Monthly Investment');text('investmentTargetTopicTitle','How much '+s.term+' is needed to build '+target+'?');text('investmentTargetTopicDesc','Work backward from a '+target+' target across different time horizons and assumptions.');text('investmentMonthlyTopicTitle',monthly+' '+s.term+': what could it grow to?');text('investmentMonthlyTopicDesc','Compare illustrative outcomes for '+monthly+' per month over 10, 15, 20 and 25 years.');text('investmentStepTopicTitle',s.increasingTerm+' vs '+s.fixedTerm+': what changes?');text('investmentStepTopicDesc','See how increasing contributions can change the contribution path and projected value.');var wrap=document.querySelector('.planning-categories');if(wrap){var order=s.isIndia?['investment','retirement','goals','fi','inflation','foundation']:['retirement','goals','investment','fi','inflation','foundation'];order.forEach(function(k){var e=wrap.querySelector('[data-category=\"'+k+'\"]');if(e)wrap.appendChild(e);});}}
  function updateInvestmentTarget(s){if(document.body.dataset.cmPage!=='investment-target-guide')return;var target=human(s.cfg.target),title='How much '+s.term+' is needed to build '+target+'?',desc='Estimate the monthly contribution needed for a '+target+' target over 10, 15, 20 or 25 years and understand the assumptions behind the calculation.';document.title=title+' | Carrowmont';meta('description',desc);meta('og:title',document.title,true);meta('og:description',desc,true);updateStructured(title,desc);text('articleKicker',s.isIndia?'MONTHLY INVESTMENT (SIP) GUIDE':'MONTHLY INVESTMENT GUIDE');text('articleTitle',title);text('articleCtaText','Calculate your path to '+target);text('localeContext',s.isIndia?'In India, recurring monthly investing is commonly called a SIP. Carrowmont uses that familiar term here while keeping the underlying maths the same.':'Carrowmont uses the general term monthly investment here. The example amount changes with your selected currency, but it is a round illustration rather than an exchange-rate conversion.');text('targetIntroHeading','There is no single monthly amount for '+target+'.');text('targetIntroText','The monthly contribution depends on the time horizon, expected return assumption, contribution timing and whether contributions increase over time. The same '+target+' target can require a very different starting amount over 10 years versus 25 years.');text('targetExampleHeading','Illustrative '+s.term+' for a '+target+' target at a 12% annual return assumption');[10,15,20,25].forEach(function(y){text('target'+y,y+' years: about '+exact(monthlyForTarget(s.cfg.target,y,.12))+' per month');});text('targetNominalHeading','But '+target+' is a nominal target.');text('targetInflationText','If the goal is many years away, ask what '+target+' is intended to buy. At 5% annual inflation, something costing '+target+' today would cost about '+human(s.cfg.target*Math.pow(1.05,20))+' in 20 years. A nominal target should always be interpreted alongside purchasing power.');text('targetFaqSmall','Can a smaller monthly investment reach '+target+' with more time?');text('targetFaqInflation','Should the '+target+' target be inflation-adjusted?');text('targetFaqInflationAnswer','If '+target+' represents the cost of something in today\'s money, the future target should generally reflect expected price growth. If it is simply a nominal future target, no extra inflation adjustment is required.');}
  function updateGrowth(s){if(document.body.dataset.cmPage!=='investment-growth-guide')return;var monthly=exact(s.cfg.monthly),title=monthly+' '+s.term+' for 10, 15, 20 and 25 years: what could it grow to?',desc='See illustrative future values for a '+monthly+' monthly contribution over 10, 15, 20 and 25 years and understand what drives the result.';document.title=title+' | Carrowmont';meta('description',desc);meta('og:title',document.title,true);meta('og:description',desc,true);updateStructured(title,desc);text('articleKicker',s.isIndia?'MONTHLY INVESTMENT (SIP) GROWTH GUIDE':'MONTHLY INVESTMENT GROWTH GUIDE');text('articleTitle',title);text('localeContext',s.isIndia?'In India, a recurring monthly investment is commonly called a SIP. The example below uses '+monthly+' per month.':'The example below uses a round '+monthly+' monthly contribution for your selected currency. It is an illustration, not an exchange-rate conversion.');text('growthIntroText','Consider a fixed '+monthly+' '+s.term+' with no existing investment and no annual increase. Using a 12% annual return assumption converted to an equivalent monthly compound rate, the projected values are:');text('growthExampleHeading',monthly+' '+s.term+' at a 12% annual assumption');[10,15,20,25].forEach(function(y){text('growth12y'+y,y+' years: about '+human(fvMonthly(s.cfg.monthly,y,.12)));});var c=[10,15,20,25].map(function(y){return human(s.cfg.monthly*12*y)});text('growthContributionText','Your own money contributed over those periods would be '+c[0]+', '+c[1]+', '+c[2]+' and '+c[3]+' respectively. The difference between contributions and projected value is the modelled investment growth.');var low=[10,15,20,25].map(function(y){return human(fvMonthly(s.cfg.monthly,y,.10))});text('growthLowerReturnText','At a 10% annual assumption, the same '+monthly+' monthly investment would project to about '+low[0]+' after 10 years, '+low[1]+' after 15 years, '+low[2]+' after 20 years and '+low[3]+' after 25 years. The monthly investment did not change; only the assumed return did.');text('growthGuaranteeHeading','Does a '+s.term+' guarantee returns?');text('growthGuaranteeText','No. '+s.term+' describes a contribution approach, not an investment return. Actual outcomes depend on the investment selected, market performance, fees, taxes and the timing of returns. Calculator outputs are illustrative, not guaranteed.');}
  function updateStep(s){if(document.body.dataset.cmPage!=='investment-stepup-guide')return;var monthly=exact(s.cfg.monthly),fixed=fvMonthly(s.cfg.monthly,20,.12),step=fvStep(s.cfg.monthly,20,.12,.10),year20=s.cfg.monthly*Math.pow(1.10,19),title=s.increasingTerm+' vs '+s.fixedTerm+': what changes?',desc='Compare increasing and fixed monthly contributions with an illustrative 10% annual increase and see how the contribution path affects projected value.';document.title=title+' | Carrowmont';meta('description',desc);meta('og:title',document.title,true);meta('og:description',desc,true);updateStructured(title,desc);text('articleKicker',s.isIndia?'MONTHLY INVESTMENT (SIP) GUIDE':'MONTHLY INVESTMENT GUIDE');text('articleTitle',title);text('localeContext',s.isIndia?'In India, increasing a SIP periodically is commonly called a Step-up SIP. The example below starts at '+monthly+' per month.':'This guide compares an increasing monthly contribution with a fixed one. The example starts at a round '+monthly+' per month for your selected currency.');text('stepIntroHeading',s.increasingTerm+' changes the contribution path, not the return assumption.');text('stepIntroText','With a '+s.fixedTerm+', the contribution stays the same. With an '+s.increasingTerm+', it rises by a chosen percentage, typically once a year. The return assumption can be identical in both cases; the difference comes from putting more money to work later.');text('stepExampleHeading','Illustration: starting monthly investment '+monthly+', 20 years, 12% annual return assumption');text('stepFixedValue',s.fixedTerm+' projected value: about '+human(fixed));text('stepIncreasingValue','10% annual increase projected value: about '+human(step));text('stepYear20','In year 20, the monthly investment would be about '+exact(year20)+'.');text('stepAffordabilityText','A 10% annual increase sounds modest in year one, but it compounds too. A '+monthly+' monthly investment becomes roughly '+exact(s.cfg.monthly*Math.pow(1.10,10))+' in year 11 and about '+exact(year20)+' in year 20. Before using a large annual increase in a plan, ask whether income is realistically expected to support that contribution path.');}
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
