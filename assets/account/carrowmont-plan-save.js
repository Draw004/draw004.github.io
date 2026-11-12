(function(root){
  'use strict';
  const PENDING_KEY='carrowmont_pending_saved_plan_v1';
  const OPEN_KEY='carrowmont_open_saved_plan_v1';
  const adapters=new Map();
  const now=()=>new Date().toISOString();
  const clean=v=>typeof v==='string'?v.trim():'';
  const safeParse=raw=>{try{return raw?JSON.parse(raw):null;}catch(_){return null;}};
  const clone=v=>JSON.parse(JSON.stringify(v));
  let accountPromise=null;

  function styles(){
    if(document.getElementById('cm-mycm-save-style'))return;
    const s=document.createElement('style');s.id='cm-mycm-save-style';s.textContent=`
      .cm-mycm-save-card{margin:18px 0;padding:16px 18px;border:1px solid #bedbd7;border-radius:16px;background:#f3faf8;color:#102945;display:flex;align-items:center;justify-content:space-between;gap:18px;box-sizing:border-box}
      .cm-mycm-save-card[hidden]{display:none!important}.cm-mycm-save-copy strong{display:block;font:800 16px/1.3 Inter,ui-sans-serif,system-ui,sans-serif;margin-bottom:5px}.cm-mycm-save-copy span{display:block;color:#536b80;font:500 13px/1.5 Inter,ui-sans-serif,system-ui,sans-serif;max-width:760px}.cm-mycm-save-actions{display:flex;gap:8px;flex-wrap:wrap}.cm-mycm-save-actions button{min-height:42px;border-radius:11px;padding:0 15px;border:1px solid #b9d8d3;background:#fff;color:#0c716a;font:800 13px/1.15 Inter,ui-sans-serif,system-ui,sans-serif;cursor:pointer}.cm-mycm-save-actions button.primary{background:#103b5c;color:#fff;border-color:#103b5c}.cm-mycm-save-status{margin-top:6px;color:#0c716a;font:700 12px/1.4 Inter,ui-sans-serif,system-ui,sans-serif}
      @media(max-width:720px){.cm-mycm-save-card{flex-direction:column;align-items:stretch;margin:14px 0}.cm-mycm-save-actions{width:100%}.cm-mycm-save-actions button{flex:1;white-space:normal}}
    `;document.head.appendChild(s);
  }
  function normalizePlan(plan,adapter){
    if(!plan||typeof plan!=='object')return null;
    const journey=clean(plan.journey||adapter.journey); if(!journey)return null;
    const toolPath=clean(plan.toolPath||adapter.toolPath); if(!toolPath.startsWith('/'))return null;
    const scenario=plan.scenario&&typeof plan.scenario==='object'?plan.scenario:null; if(!scenario)return null;
    return {schemaVersion:1,journey,label:clean(plan.label)||adapter.label||'Saved plan',toolPath,scenario,profileFacts:plan.profileFacts&&typeof plan.profileFacts==='object'?plan.profileFacts:{},capturedAt:now()};
  }
  function stage(plan){
    try{localStorage.setItem(PENDING_KEY,JSON.stringify({explicit:true,stagedAt:now(),plan}));return true;}catch(_){return false;}
  }
  function hasPersistedAuthSession(){
    try{for(let i=0;i<localStorage.length;i+=1){const key=localStorage.key(i)||'';if(/^sb-.*-auth-token$/.test(key)&&localStorage.getItem(key))return true;}}catch(_){}
    return false;
  }
  function loadScript(src,key){
    return new Promise((resolve,reject)=>{
      if(document.querySelector(`script[data-cm-${key}]`)){resolve();return;}
      const s=document.createElement('script');s.src=src;s.async=true;s.dataset[`cm${key.replace(/(^|-)([a-z])/g,(_,a,b)=>b.toUpperCase())}`]='1';
      s.addEventListener('load',()=>resolve(),{once:true});s.addEventListener('error',()=>reject(new Error(`Could not load ${src}`)),{once:true});document.head.appendChild(s);
    });
  }
  async function ensureAccount(){
    if(root.CarrowmontAccount)return root.CarrowmontAccount;
    if(accountPromise)return accountPromise;
    accountPromise=(async()=>{
      if(!root.CarrowmontSupabaseConfig)await loadScript('/assets/account/supabase-config.js?v=20261108-b7b2','supabase-config');
      if(!root.CarrowmontAccount)await loadScript('/assets/account/carrowmont-account.js?v=20261112-b8b2','account-client');
      return root.CarrowmontAccount||null;
    })();
    return accountPromise;
  }
  function planInputFingerprint(plan){
    if(!plan?.scenario)return '';
    const value=plan.scenario.input??plan.scenario;
    try{return JSON.stringify(value);}catch(_){return '';}
  }
  function savedInputFingerprint(row){
    const scenario=row?.scenario&&typeof row.scenario==='object'?row.scenario:{};
    const value=scenario.input??scenario;
    try{return JSON.stringify(value);}catch(_){return '';}
  }
  async function resolveAccountState(adapter){
    if(!hasPersistedAuthSession())return {signedIn:false,existing:null};
    try{
      const Account=await ensureAccount();if(!Account?.isConfigured?.())return {signedIn:false,existing:null};
      const user=await Account.getUser();if(!user)return {signedIn:false,existing:null};
      const rows=await Account.listScenarios();
      return {signedIn:true,existing:(rows||[]).find(row=>row?.journey===adapter.journey)||null};
    }catch(_){return {signedIn:true,existing:null,unverified:true};}
  }
  function findAnchor(adapter){
    if(typeof adapter.anchor==='string'){const el=document.querySelector(adapter.anchor);if(el)return el;}
    return document.querySelector('main')||document.body;
  }
  function paintCard(adapter,plan){
    const card=adapter.card||mount(adapter);const title=card.querySelector('[data-cm-save-title]'),copy=card.querySelector('[data-cm-save-copy]'),primary=card.querySelector('[data-cm-save]'),secondary=card.querySelector('[data-cm-dismiss]');
    const signedIn=adapter.accountState?.signedIn===true,existing=adapter.accountState?.existing||null;
    if(signedIn&&existing){
      title.textContent='Update your saved plan?';
      copy.textContent='This calculation is separate from your saved My Carrowmont plan until you choose to update it.';
      primary.textContent='Update My Carrowmont with these changes';
      secondary.textContent='Keep existing plan';
    }else if(signedIn){
      title.textContent='Keep this plan in My Carrowmont';
      copy.textContent='Save this plan so you can return to it later and keep it connected with your other planning.';
      primary.textContent=adapter.signedInPrimaryLabel||'Save this plan to My Carrowmont';
      secondary.textContent='Not now';
    }else{
      title.textContent='Keep this plan for later';
      copy.textContent='Save it to My Carrowmont so you can return to it later, update it and access it across devices.';
      primary.textContent=adapter.signedOutPrimaryLabel||'Save this plan to My Carrowmont';
      secondary.textContent='Not now';
    }
    if(plan&&adapter.accountState?.existing&&planInputFingerprint(plan)===savedInputFingerprint(adapter.accountState.existing))card.hidden=true;
  }
  function mount(adapter){
    styles();
    let card=document.getElementById(`cmMycmSave-${adapter.journey}`);
    if(card){adapter.card=card;return card;}
    card=document.createElement('aside');card.id=`cmMycmSave-${adapter.journey}`;card.className='cm-mycm-save-card';card.hidden=true;card.setAttribute('aria-live','polite');
    card.innerHTML='<div class="cm-mycm-save-copy"><strong data-cm-save-title>Keep this plan for later</strong><span data-cm-save-copy>Save it to My Carrowmont so you can return to it later, update it and access it across devices.</span><div class="cm-mycm-save-status" data-cm-save-status></div></div><div class="cm-mycm-save-actions"><button type="button" class="primary" data-cm-save>Save this plan to My Carrowmont</button><button type="button" data-cm-dismiss>Not now</button></div>';
    const anchor=findAnchor(adapter);
    if(anchor.parentNode)anchor.parentNode.insertBefore(card,anchor.nextSibling);else document.body.appendChild(card);
    card.querySelector('[data-cm-save]').addEventListener('click',()=>{
      const raw=adapter.getPlan?.();const plan=normalizePlan(raw,adapter);const status=card.querySelector('[data-cm-save-status]');
      if(!plan){status.textContent='Complete the plan first, then try again.';return;}
      if(!stage(plan)){status.textContent='This browser could not prepare the plan for My Carrowmont.';return;}
      status.textContent=adapter.accountState?.signedIn?'Updating My Carrowmont…':'Opening My Carrowmont…';location.href=`/my-carrowmont.html?savePlan=${encodeURIComponent(plan.journey)}`;
    });
    card.querySelector('[data-cm-dismiss]').addEventListener('click',()=>{adapter.dismissed=true;card.hidden=true;});
    adapter.card=card;return card;
  }
  async function syncAccountState(adapter){
    if(adapter.accountSyncPromise)return adapter.accountSyncPromise;
    adapter.accountSyncPromise=resolveAccountState(adapter).then(state=>{adapter.accountState=state;adapter.accountSyncPromise=null;refresh(adapter.journey);return state;}).catch(()=>{adapter.accountSyncPromise=null;return null;});
    return adapter.accountSyncPromise;
  }
  function refresh(journey){
    const adapter=adapters.get(journey);if(!adapter)return;
    const card=mount(adapter),plan=normalizePlan(adapter.getPlan?.(),adapter);
    if(!adapter.offered||adapter.dismissed||!plan){card.hidden=true;return;}
    if(hasPersistedAuthSession()&&!adapter.accountState){card.hidden=true;syncAccountState(adapter);return;}
    paintCard(adapter,plan);
    const unchanged=Boolean(adapter.accountState?.existing)&&planInputFingerprint(plan)===savedInputFingerprint(adapter.accountState.existing);
    card.hidden=unchanged;
  }
  function offer(journey){const adapter=adapters.get(journey);if(!adapter)return;adapter.offered=true;refresh(journey);}
  function consumeOpen(adapter){
    let entry=null;try{entry=safeParse(sessionStorage.getItem(OPEN_KEY));}catch(_){return;}
    if(!entry||entry.explicit!==true||entry.plan?.journey!==adapter.journey)return;
    try{sessionStorage.removeItem(OPEN_KEY);}catch(_){}
    try{adapter.applyPlan?.(entry.plan.scenario);adapter.baselineScenario=clone(entry.plan.scenario||{});adapter.offered=false;adapter.dismissed=false;const card=mount(adapter);const st=card.querySelector('[data-cm-save-status]');if(st)st.textContent='Saved plan loaded from My Carrowmont.';card.hidden=true;}catch(err){console.error('Could not load saved My Carrowmont plan',err);}
  }
  function register(options){
    if(!options||!clean(options.journey)||typeof options.getPlan!=='function')return;
    const adapter={...options,journey:clean(options.journey),label:clean(options.label)||'Saved plan',toolPath:clean(options.toolPath)||location.pathname,offered:false,dismissed:false,card:null,accountState:null,accountSyncPromise:null,baselineScenario:null};
    adapters.set(adapter.journey,adapter);mount(adapter);consumeOpen(adapter);if(hasPersistedAuthSession())syncAccountState(adapter);refresh(adapter.journey);
  }
  root.CarrowmontPlanSave=Object.freeze({PENDING_KEY,OPEN_KEY,register,offer,refresh});
})(window);
