(function(root){
  'use strict';
  if(root.CarrowmontTrust)return;
  const VERSION='carrowmont-trust-v1.0';
  const qsa=(selector,scope=document)=>Array.from(scope.querySelectorAll(selector));
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const clean=value=>String(value??'').replace(/\s+/g,' ').trim();
  const nowLabel=()=>{try{return new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(new Date());}catch(_){return 'this session';}};
  function ensureCss(){if(document.querySelector('link[data-cm-trust-style]'))return;const link=document.createElement('link');link.rel='stylesheet';link.href='/assets/trust/carrowmont-trust.css?v=20261116-fre9';link.dataset.cmTrustStyle='1';document.head.appendChild(link);}
  function labelFor(el){
    if(!el)return'';
    const byFor=el.id?document.querySelector(`label[for="${CSS.escape(el.id)}"]`):null;
    const wrap=el.closest('label');
    const node=byFor||wrap;
    if(node){const clone=node.cloneNode(true);clone.querySelectorAll('input,select,textarea,button,small').forEach(x=>x.remove());const text=clean(clone.textContent);if(text)return text;}
    return clean(el.getAttribute('aria-label')||el.name||el.id||'Value');
  }
  function displayValue(el){
    if(el.tagName==='SELECT')return clean(el.selectedOptions?.[0]?.textContent||el.value);
    if(el.type==='checkbox')return el.checked?'Yes':'No';
    if(el.type==='radio')return el.checked?clean(el.closest('label')?.textContent||el.value):'';
    const value=clean(el.value);if(!value)return'';
    const parent=el.parentElement;let suffix='';
    if(parent){const parts=qsa('span',parent).map(x=>clean(x.textContent)).filter(Boolean);suffix=parts.find(x=>x!==value&&x.length<=20)||'';}
    return suffix&&el.type==='number'?`${value} ${suffix}`:value;
  }
  function isRelevant(el){
    if(!el||el.disabled||el.type==='hidden'||['button','submit','reset','file'].includes(el.type))return false;
    if(el.type==='radio'&&!el.checked)return false;
    if(el.closest('[hidden],dialog:not([open]),.report-print,.no-print-only-hidden'))return false;
    return Boolean(displayValue(el));
  }
  function inputs(){
    const all=qsa('main input,main select,main textarea').filter(isRelevant);
    const seen=new Set();const rows=[];
    for(const el of all){const label=labelFor(el),value=displayValue(el);if(!label||!value)continue;const key=`${label}|${value}`;if(seen.has(key))continue;seen.add(key);rows.push({el,label,value});if(rows.length>=18)break;}
    return rows;
  }
  function isAssumption(row){
    const text=clean(`${row.label} ${row.el.closest('label,.field,.input-card,.car-field,.stress-field')?.textContent||''}`).toLowerCase();
    return /assumption|expected annual|expected return|inflation|price-growth|growth assumption|return assumption|step-up|withdrawal rate|future return|salary growth|income growth/.test(text);
  }
  function mountPoint(){return document.querySelector('#methodology,.methodology,.explain-section,.car-method,#how-it-works,.how')||document.querySelector('footer');}
  function render(){
    ensureCss();let host=document.getElementById('cmTrustContractTool');
    if(!host){host=document.createElement('details');host.id='cmTrustContractTool';host.className='cm-trust-contract';const anchor=mountPoint();if(anchor?.parentNode)anchor.parentNode.insertBefore(host,anchor);else(document.querySelector('main')||document.body).appendChild(host);}
    const rows=inputs();if(!rows.length){host.hidden=true;return host;}host.hidden=false;
    const assumptions=rows.filter(isAssumption);const important=(assumptions.length?assumptions:rows).slice(0,5);
    const values=rows.slice(0,12).map(row=>`<li><b>${esc(row.label)}:</b> ${esc(row.value)}</li>`).join('');
    const assumptionHtml=assumptions.length?`<ul>${assumptions.slice(0,8).map(row=>`<li><b>${esc(row.label)}:</b> ${esc(row.value)}</li>`).join('')}</ul>`:'<p>No separate forecast-style assumption is marked in the current inputs. Contractual amounts and rates remain values you entered.</p>';
    const changeText=important.map(row=>row.label).join(', ');
    host.innerHTML=`<summary><span><span class="cm-trust-contract-kicker">Carrowmont Trust Check</span><span class="cm-trust-contract-title">Why this result? See the values, assumptions and boundaries.</span><span class="cm-trust-contract-sub">Open only when you want to verify the calculation context.</span></span></summary><div class="cm-trust-contract-body"><div class="cm-trust-grid"><div class="cm-trust-item"><strong>Why am I seeing this?</strong><p>This is an illustrative result from this tool's tested calculation logic using the values currently entered on this page. It is not a separate AI calculation.</p></div><div class="cm-trust-item"><strong>What numbers were used?</strong><ul class="cm-trust-value-list">${values}</ul></div><div class="cm-trust-item"><strong>Which values are assumptions?</strong>${assumptionHtml}</div><div class="cm-trust-item"><strong>When was this updated?</strong><p>These are the current page values as of ${esc(nowLabel())}. If you change an input, recalculate where the tool has a Calculate button.</p></div><div class="cm-trust-item"><strong>What could change the result?</strong><p>Changing the entered amounts, dates or rates can change the outcome${changeText?`, especially ${esc(changeText)}`:''}. Actual real-world outcomes may also differ.</p></div><div class="cm-trust-item"><strong>What gets saved?</strong><p>This what-if stays separate from My Carrowmont. It becomes account data only when you explicitly choose Save to My Carrowmont or update an existing saved plan.</p></div></div><p class="cm-trust-note">Carrowmont shows calculations and scenarios for planning and education. Methodology and limitations remain available below where this tool provides them.</p></div>`;
    return host;
  }
  let timer=null;function schedule(){clearTimeout(timer);timer=setTimeout(render,80);}
  function attachTool(){render();document.addEventListener('input',schedule,{passive:true});document.addEventListener('change',schedule,{passive:true});document.addEventListener('click',event=>{if(event.target.closest('button'))setTimeout(schedule,120);});return true;}
  root.CarrowmontTrust=Object.freeze({VERSION,attachTool,refresh:render});
  if(document.currentScript?.dataset?.cmTrustAuto!==undefined){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',attachTool,{once:true});else setTimeout(attachTool,0);}
})(window);
