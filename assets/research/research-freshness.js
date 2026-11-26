/* RESEARCH-FRESHNESS1: dated official-source review warning, local only; not a live-data feed. */
(function(){
  'use strict';
  var box=document.getElementById('research-freshness');
  var alert=document.getElementById('research-review-alert');
  if(!box||!alert)return;
  var verified=box.getAttribute('data-research-verified');
  var due=box.getAttribute('data-research-review-due');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(verified||'')||!/^\d{4}-\d{2}-\d{2}$/.test(due||''))return;
  var now=new Date();
  if(!Number.isFinite(now.getTime()))return;
  var today=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10);
  if(today>=due){
    alert.hidden=false;
    alert.textContent='Source review due: the official observation may have changed since '+verified+'. Check the linked official sources before using these figures as current. The charts and downloads remain historical snapshots.';
  }
})();
