(function(root,factory){
  'use strict';
  const api=factory(root);
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.CarrowmontAccount=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(root){
  'use strict';

  const VERSION='carrowmont-account-v1.0';
  const SDK_SRC='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  const PENDING_GUEST_KEY='carrowmont_pending_cloud_profile_v1';
  let clientPromise=null;

  const clean=v=>typeof v==='string'?v.trim():'';
  function config(){
    const raw=root.CarrowmontSupabaseConfig||{};
    return {
      enabled:raw.enabled===true,
      url:clean(raw.url),
      publishableKey:clean(raw.publishableKey),
      profileTable:clean(raw.profileTable)||'carrowmont_profiles',
      scenarioTable:clean(raw.scenarioTable)||'carrowmont_saved_scenarios',
      authRedirectPath:clean(raw.authRedirectPath)||'/my-carrowmont.html'
    };
  }
  function isConfigured(){
    const c=config();
    return Boolean(c.enabled&&/^https:\/\//.test(c.url)&&c.publishableKey);
  }
  function loadSdk(){
    if(root.supabase&&typeof root.supabase.createClient==='function') return Promise.resolve(root.supabase);
    if(!root.document) return Promise.reject(new Error('Supabase browser SDK is unavailable.'));
    return new Promise((resolve,reject)=>{
      const existing=root.document.querySelector('script[data-cm-supabase-sdk]');
      if(existing){
        existing.addEventListener('load',()=>resolve(root.supabase),{once:true});
        existing.addEventListener('error',()=>reject(new Error('Supabase SDK failed to load.')),{once:true});
        return;
      }
      const script=root.document.createElement('script');
      script.src=SDK_SRC;
      script.async=true;
      script.dataset.cmSupabaseSdk='1';
      script.addEventListener('load',()=>root.supabase?.createClient?resolve(root.supabase):reject(new Error('Supabase SDK loaded without createClient.')),{once:true});
      script.addEventListener('error',()=>reject(new Error('Supabase SDK failed to load.')),{once:true});
      root.document.head.appendChild(script);
    });
  }
  async function getClient(){
    if(!isConfigured()) return null;
    if(!clientPromise){
      clientPromise=loadSdk().then(sdk=>{
        const c=config();
        return sdk.createClient(c.url,c.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
      });
    }
    return clientPromise;
  }
  async function getUser(){
    const client=await getClient();
    if(!client) return null;
    const {data,error}=await client.auth.getUser();
    if(error) throw error;
    return data?.user||null;
  }
  async function sendMagicLink(email,redirectTo){
    const client=await getClient();
    if(!client) throw new Error('Carrowmont account saving is not configured yet.');
    const address=clean(email).toLowerCase();
    if(!/^\S+@\S+\.\S+$/.test(address)) throw new Error('Enter a valid email address.');
    const c=config();
    const target=redirectTo||(`${root.location?.origin||''}${c.authRedirectPath}`);
    const {error}=await client.auth.signInWithOtp({email:address,options:{emailRedirectTo:target,shouldCreateUser:true}});
    if(error) throw error;
    return true;
  }
  async function signOut(){
    const client=await getClient();
    if(!client) return;
    const {error}=await client.auth.signOut();
    if(error) throw error;
  }
  async function loadCloudProfile(){
    const client=await getClient();
    const user=await getUser();
    if(!client||!user) return null;
    const c=config();
    const {data,error}=await client.from(c.profileTable).select('user_id,profile,schema_version,region,currency,updated_at').eq('user_id',user.id).maybeSingle();
    if(error) throw error;
    return data||null;
  }
  async function saveCloudProfile(profile){
    const client=await getClient();
    const user=await getUser();
    if(!client||!user) throw new Error('Sign in before saving My Carrowmont.');
    const c=config();
    const normalized=root.CarrowmontDashboardStore?.normalize?root.CarrowmontDashboardStore.normalize(profile):profile;
    const payload={
      user_id:user.id,
      profile:normalized,
      schema_version:Number(normalized?.schemaVersion)||1,
      region:clean(normalized?.locale?.region)||null,
      currency:clean(normalized?.locale?.currency)||null,
      updated_at:new Date().toISOString()
    };
    const {data,error}=await client.from(c.profileTable).upsert(payload,{onConflict:'user_id'}).select('user_id,profile,schema_version,region,currency,updated_at').single();
    if(error) throw error;
    return data;
  }
  async function deleteCloudProfile(){
    const client=await getClient();
    const user=await getUser();
    if(!client||!user) return;
    const c=config();
    const scenarioDelete=await client.from(c.scenarioTable).delete().eq('user_id',user.id);
    if(scenarioDelete.error) throw scenarioDelete.error;
    const profileDelete=await client.from(c.profileTable).delete().eq('user_id',user.id);
    if(profileDelete.error) throw profileDelete.error;
  }
  async function listScenarios(){
    const client=await getClient();
    const user=await getUser();
    if(!client||!user) return [];
    const c=config();
    const {data,error}=await client.from(c.scenarioTable).select('id,journey,label,scenario,created_at,updated_at').eq('user_id',user.id).order('updated_at',{ascending:false});
    if(error) throw error;
    return data||[];
  }
  async function saveScenario({id,journey,label,scenario}={}){
    const client=await getClient();
    const user=await getUser();
    if(!client||!user) throw new Error('Sign in before saving a scenario.');
    const c=config();
    const payload={user_id:user.id,journey:clean(journey)||'unknown',label:clean(label)||'Saved scenario',scenario:scenario&&typeof scenario==='object'?scenario:{},updated_at:new Date().toISOString()};
    if(clean(id)) payload.id=clean(id);
    const {data,error}=await client.from(c.scenarioTable).upsert(payload).select('id,journey,label,scenario,created_at,updated_at').single();
    if(error) throw error;
    return data;
  }
  async function deleteScenario(id){
    const client=await getClient();
    const user=await getUser();
    if(!client||!user||!clean(id)) return;
    const c=config();
    const {error}=await client.from(c.scenarioTable).delete().eq('user_id',user.id).eq('id',clean(id));
    if(error) throw error;
  }
  function stageGuestProfile(profile){
    if(!root.localStorage) return false;
    const normalized=root.CarrowmontDashboardStore?.normalize?root.CarrowmontDashboardStore.normalize(profile):profile;
    root.localStorage.setItem(PENDING_GUEST_KEY,JSON.stringify({profile:normalized,stagedAt:new Date().toISOString(),explicit:true}));
    return true;
  }
  function readStagedGuestProfile(){
    try{return JSON.parse(root.localStorage?.getItem(PENDING_GUEST_KEY)||'null');}catch(_){return null;}
  }
  function clearStagedGuestProfile(){root.localStorage?.removeItem(PENDING_GUEST_KEY);}
  async function exportAccountData(){
    const user=await getUser();
    if(!user) throw new Error('Sign in before exporting account data.');
    return {
      exportedAt:new Date().toISOString(),
      account:{id:user.id,email:user.email||null},
      profile:await loadCloudProfile(),
      scenarios:await listScenarios()
    };
  }
  function onAuthStateChange(callback){
    getClient().then(client=>{if(client)client.auth.onAuthStateChange((event,session)=>callback?.(event,session));}).catch(()=>{});
  }

  return Object.freeze({VERSION,SDK_SRC,PENDING_GUEST_KEY,config,isConfigured,getClient,getUser,sendMagicLink,signOut,loadCloudProfile,saveCloudProfile,deleteCloudProfile,listScenarios,saveScenario,deleteScenario,stageGuestProfile,readStagedGuestProfile,clearStagedGuestProfile,exportAccountData,onAuthStateChange});
});
