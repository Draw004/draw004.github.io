(function(){
  'use strict';
  const Config=window.CarrowmontConnectedDataConfig;
  const Core=window.CarrowmontConnectedDataCore;
  const Sandbox=window.CarrowmontConnectedDataSandbox;
  const Store=window.CarrowmontDashboardStore;
  if(!Config||!Core||!Sandbox||!Store)return;
  const root=document.getElementById('mycmConnectedData');
  if(!root)return;

  const previewRequested=()=>{
    try{return new URL(location.href).searchParams.get(Config.previewQueryParam)===Config.previewValue;}catch(_){return false;}
  };
  const active=Config.enabled===true||(Config.sandboxOnly===true&&previewRequested());
  if(!active){root.hidden=true;return;}

  let profile=null;
  let state=null;
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const locale=()=>({region:profile?.locale?.region||window.CarrowmontLocale?.getRegion?.()||'OTHER',currency:profile?.locale?.currency||window.CarrowmontLocale?.getCurrency?.()||'USD'});
  function formatMoney(value,currency){
    if(value===null||value===undefined||!Number.isFinite(Number(value)))return 'Not saved';
    const active=locale(),code=currency||active.currency;
    const regionalLocale=window.CarrowmontLocale?.regions?.[active.region]?.locale||window.CarrowmontLocale?.getLocale?.();
    try{
      if(window.CarrowmontLocale?.formatMoney)return window.CarrowmontLocale.formatMoney(Number(value),{currency:code,locale:regionalLocale,maximumFractionDigits:0});
      return new Intl.NumberFormat(regionalLocale||undefined,{style:'currency',currency:code,maximumFractionDigits:0}).format(Number(value));
    }catch(_){return `${code} ${Math.round(Number(value)).toLocaleString(regionalLocale||undefined)}`;}
  }
  function formatTime(value){
    try{return new Intl.DateTimeFormat(undefined,{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'}).format(new Date(value));}catch(_){return 'Recently';}
  }
  function readState(){try{return JSON.parse(sessionStorage.getItem(Config.sessionKey)||'null');}catch(_){return null;}}
  function saveState(next){state=next;sessionStorage.setItem(Config.sessionKey,JSON.stringify(next));}
  function clearState(){state=null;sessionStorage.removeItem(Config.sessionKey);}
  function dispatchProfile(next){
    profile=Store.normalize(next);
    window.dispatchEvent(new CustomEvent('carrowmont:mycm-profile-change',{detail:{profile,saveImmediately:true}}));
    window.dispatchEvent(new CustomEvent('carrowmont:mycm-account-ready',{detail:{profile,connectedReview:true}}));
  }
  function statusHtml(){
    const fresh=state?Core.freshness({consent:state.consent,snapshot:state.snapshot,now:new Date()}):null;
    if(!fresh)return '';
    return `<span class="cm-connected-status" data-state="${esc(fresh.state)}">${esc(fresh.label)}</span><span>Refreshed ${esc(formatTime(state.snapshot.refreshedAt))}</span>`;
  }
  function startMarkup(){
    return `<div class="cm-connected-head"><div><span class="mycm-kicker">Optional connected data</span><h2 id="mycmConnectedDataTitle">Review connected values before using them</h2><p>Batch 13A is a <strong>sandbox preview only</strong>. It never contacts a bank, never asks for a banking password and never moves money. My Carrowmont continues to work fully without it.</p></div><span class="cm-connected-badge">Sandbox only</span></div>
      <div class="cm-connected-trust"><strong>Choose the smallest data scope you need</strong><p>Nothing below is connected yet. Select a mock scope, review the consent summary, then decide whether any staged value should be used in My Carrowmont.</p></div>
      <form class="cm-connected-scopes" id="cmConnectedScopes">
        <label><input type="checkbox" name="scope" value="balances" checked><span><strong>Balance summary</strong><small>Mock savings and mortgage balances only.</small></span></label>
        <label><input type="checkbox" name="scope" value="cashFlowSummary"><span><strong>Monthly cash-flow summary</strong><small>Mock monthly income and expense totals. No raw transactions.</small></span></label>
        <button class="mycm-button mycm-button-primary" type="submit">Review sandbox consent</button>
      </form>
      <p class="cm-connected-footnote">Live bank/account connections are not enabled in this release. No real financial institution, provider token or account credential is stored by Carrowmont.</p>`;
  }
  function renderStart(){
    root.hidden=false;root.innerHTML=startMarkup();
    root.querySelector('#cmConnectedScopes')?.addEventListener('submit',event=>{
      event.preventDefault();
      const scopes=[...root.querySelectorAll('input[name="scope"]:checked')].map(input=>input.value);
      if(!scopes.length){root.querySelector('.cm-connected-trust').innerHTML='<strong>Choose at least one scope</strong><p>Select Balance summary and/or Monthly cash-flow summary before continuing.</p>';return;}
      renderConsent(scopes);
    });
  }
  function renderConsent(scopes){
    const labels=scopes.map(scope=>scope==='balances'?'Balance summary':'Monthly cash-flow summary');
    root.innerHTML=`<div class="cm-connected-head"><div><span class="mycm-kicker">Sandbox consent review</span><h2 id="mycmConnectedDataTitle">Know exactly what this preview will use</h2><p>This consent is for Carrowmont's local sandbox fixture only. It is not permission to access a real bank.</p></div><span class="cm-connected-badge">No live provider</span></div>
      <div class="cm-connected-consent">
        <dl><div><dt>Source</dt><dd>${esc(Sandbox.INSTITUTION)} — mock data generated inside Carrowmont</dd></div><div><dt>Requested scopes</dt><dd>${esc(labels.join(' · '))}. Monthly cash-flow scope uses summary totals only; no raw transactions are retained.</dd></div><div><dt>Purpose</dt><dd>Stage values for your review. No value changes My Carrowmont until you choose <strong>Use this value</strong>.</dd></div><div><dt>Retention</dt><dd>Sandbox connection state stays in this browser session only and is deleted when you disconnect or the browser session ends.</dd></div><div><dt>Credentials</dt><dd>None. Carrowmont does not ask for or store a bank password, PIN, access token or refresh token.</dd></div></dl>
        <label class="cm-connected-confirm"><input id="cmConnectedConsentConfirm" type="checkbox"><span>I understand this is mock data and nothing will update automatically.</span></label>
        <div class="cm-connected-actions"><button class="mycm-button" id="cmConnectedBack" type="button">Back</button><button class="mycm-button mycm-button-primary" id="cmConnectedConnect" type="button" disabled>Connect sandbox</button></div>
      </div>`;
    const confirm=root.querySelector('#cmConnectedConsentConfirm'),connect=root.querySelector('#cmConnectedConnect');
    confirm?.addEventListener('change',()=>{connect.disabled=!confirm.checked;});
    root.querySelector('#cmConnectedBack')?.addEventListener('click',renderStart);
    connect?.addEventListener('click',()=>{
      try{saveState(Sandbox.connect({scopes,currency:locale().currency,now:new Date()}));renderConnected();}
      catch(error){renderError(error);}
    });
  }
  function reviewCard(item){
    const current=formatMoney(item.currentValue,item.currentUnit||item.unit),connected=formatMoney(item.connectedValue,item.unit);
    const status=item.currencyMismatch?'Currency mismatch':item.changed?'Review change':'Matches saved value';
    const action=item.currencyMismatch
      ?'<span class="cm-connected-used">Currency mismatch — align the connected value with your My Carrowmont currency before applying.</span>'
      :item.changed?'<button class="mycm-button mycm-button-primary" type="button" data-use-connected>Use this value</button>':'<span class="cm-connected-used">No update needed</span>';
    return `<article class="cm-connected-review" data-review-id="${esc(item.id)}"><div class="cm-connected-review-head"><div><strong>${esc(item.label)}</strong><small>${esc(item.institutionLabel)} · observed ${esc(formatTime(item.observedAt))}</small></div><span class="cm-connected-diff" data-changed="${item.changed?'yes':'no'}">${status}</span></div><div class="cm-connected-values"><div><span>Current My Carrowmont</span><strong>${esc(current)}</strong></div><div><span>Sandbox value</span><strong>${esc(connected)}</strong></div></div><p>${esc(item.reason)}</p><div class="cm-connected-review-actions">${action}</div></article>`;
  }
  function renderConnected(){
    if(!state){renderStart();return;}
    let normalized;
    try{normalized=Core.sessionState(state);state=normalized;saveState(state);}catch(error){renderError(error);return;}
    const items=Core.buildReviewItems(state.snapshot,profile||Store.create(locale()));
    root.hidden=false;
    root.innerHTML=`<div class="cm-connected-head"><div><span class="mycm-kicker">Connected-data sandbox</span><h2 id="mycmConnectedDataTitle">Review before anything joins My Carrowmont</h2><p>The sandbox is connected only for this browser session. Connected values stay staged until you explicitly use them.</p></div><span class="cm-connected-badge">Sandbox connected</span></div>
      <div class="cm-connected-source"><div><strong>${esc(state.snapshot.institutionLabel)}</strong><span>${statusHtml()}</span></div><div class="cm-connected-actions"><button class="mycm-button" id="cmConnectedRefresh" type="button">Refresh sandbox</button><button class="mycm-button mycm-button-danger" id="cmConnectedDisconnect" type="button">Disconnect &amp; delete sandbox copy</button></div></div>
      <div class="cm-connected-scope-summary"><strong>Consent scopes</strong><span>${state.consent.scopes.map(scope=>scope==='balances'?'Balance summary':'Monthly cash-flow summary').join(' · ')}</span><small>Consent expires ${esc(formatTime(state.consent.expiresAt))}. This preview never expands scopes without asking again.</small></div>
      <div class="cm-connected-review-list">${items.length?items.map(reviewCard).join(''):'<p class="cm-connected-empty">No reviewable sandbox values are available for the selected scopes.</p>'}</div>
      <p class="cm-connected-footnote"><strong>Save boundary:</strong> Disconnecting removes the sandbox session copy. A value you explicitly chose to use becomes an ordinary saved My Carrowmont value with connected-review provenance and is not silently removed later.</p>`;
    root.querySelector('#cmConnectedRefresh')?.addEventListener('click',()=>{try{saveState(Sandbox.refresh(state,{currency:locale().currency,now:new Date()}));renderConnected();}catch(error){renderError(error);}});
    root.querySelector('#cmConnectedDisconnect')?.addEventListener('click',()=>{clearState();renderStart();});
    root.querySelectorAll('[data-review-id]').forEach(card=>{
      card.querySelector('[data-use-connected]')?.addEventListener('click',()=>{
        try{
          const item=items.find(candidate=>candidate.id===card.dataset.reviewId);
          if(!item)return;
          const next=Core.applyReviewItem(profile||Store.create(locale()),item,Store,{explicit:true,now:new Date()});
          dispatchProfile(next);renderConnected();
        }catch(error){renderError(error);}
      });
    });
  }
  function renderError(error){
    root.hidden=false;
    root.innerHTML=`<div class="cm-connected-head"><div><span class="mycm-kicker">Connected-data sandbox</span><h2 id="mycmConnectedDataTitle">The sandbox preview could not continue</h2><p>${esc(error?.message||'The sandbox state is invalid.')}</p></div></div><button class="mycm-button" id="cmConnectedReset" type="button">Reset sandbox</button>`;
    root.querySelector('#cmConnectedReset')?.addEventListener('click',()=>{clearState();renderStart();});
  }

  window.addEventListener('carrowmont:mycm-account-ready',event=>{
    profile=Store.normalize(event.detail?.profile||Store.create(locale()));
    state=readState();
    if(state)renderConnected();else renderStart();
  });
})();
