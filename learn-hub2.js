(function(){
  'use strict';

  var PAGE_SIZE=12;
  var state={topic:'all',intent:'all',query:'',situation:null,limit:PAGE_SIZE,items:[],categories:[],aliases:null,index:null};
  var el={};
  var topicSignature='';

  function q(sel,root){return (root||document).querySelector(sel);}
  function qa(sel,root){return Array.from((root||document).querySelectorAll(sel));}
  function clean(value){return String(value==null?'':value).replace(/\s+/g,' ').trim();}
  function region(){try{return window.CarrowmontLocale&&window.CarrowmontLocale.getRegion?window.CarrowmontLocale.getRegion()||'OTHER':'OTHER';}catch(_){return 'OTHER';}}
  function core(){return window.CarrowmontSearchCore||null;}
  function clear(node){while(node&&node.firstChild)node.removeChild(node.firstChild);}
  function text(tag,className,value){var n=document.createElement(tag);if(className)n.className=className;n.textContent=value;return n;}

  function semanticIds(item){return new Set((item.semantic_intents||[]).map(function(x){return x&&x.id;}).filter(Boolean));}
  function intentFlags(item){
    var ids=semanticIds(item),t=(item.title||'').toLowerCase();
    var start=ids.has('start')||/\b(beginner|beginners|starting|start investing|make a budget)\b/.test(t);
    var compare=ids.has('compare')||/\b(vs\.?|versus|compare|comparison|difference|which is|rent or buy)\b/.test(t);
    var plan=['plan','calculate','payoff','afford','timing'].some(function(id){return ids.has(id);})||/\b(how much|how long|when can|should you|should i|afford|pay off|payoff|target|planning|priorit)/.test(t);
    var explain=ids.has('explain')||/^(what|why|how does|how do|how is)/.test(t)||/\b(explained|works|meaning|basics)\b/.test(t);
    return {start:start,explain:explain,compare:compare,plan:plan};
  }
  function matchesIntent(item,key){if(key==='all')return true;return Boolean(intentFlags(item)[key]);}
  function kindLabel(item){var f=intentFlags(item);if(f.start)return 'Start here';if(f.compare)return 'Compare';if(f.plan)return 'Plan & decide';if(f.explain)return 'Explain';return 'Guide';}

  function sourceCategoryData(){
    return qa('.planning-categories .category-box').map(function(box){
      var key=box.getAttribute('data-category')||'';
      var head=q('.category-head h2',box);
      var tool=q('.category-tool-link',box);
      return {key:key,label:clean(head?head.textContent:key),tool:tool?{href:tool.getAttribute('href')||'',label:clean(tool.textContent).replace(/\s*→\s*$/,'')}:null,box:box};
    }).filter(function(c){return c.key;});
  }

  function buildLibrary(data){
    var indexEntries=(data&&data.index&&Array.isArray(data.index.entries))?data.index.entries:[];
    var indexMap=new Map(indexEntries.map(function(entry){return [entry.url,entry];}));
    var featuredRank=new Map();
    qa('.popular-guides .popular-guide').forEach(function(link,i){var href=link.getAttribute('href');if(href&&!featuredRank.has(href))featuredRank.set(href,i);});
    var categories=sourceCategoryData();
    var map=new Map();
    var sourceOrder=0;
    categories.forEach(function(category){
      qa('.category-topic',category.box).forEach(function(link){
        var url=link.getAttribute('href')||'';
        if(!url)return;
        var titleNode=q('strong',link),descNode=q('small',link);
        var title=clean(titleNode?titleNode.textContent:link.textContent);
        var description=clean(descNode?descNode.textContent:'');
        var existing=map.get(url);
        if(existing){if(!existing.categories.includes(category.key))existing.categories.push(category.key);return;}
        var meta=indexMap.get(url)||{};
        var aliases=Array.isArray(meta.aliases)?meta.aliases.slice():[];
        if(category.label&&!aliases.includes(category.label))aliases.push(category.label);
        var keywords=Array.isArray(meta.keywords)?meta.keywords.slice():[];
        keywords.push(category.label,category.key,title);
        map.set(url,{
          url:url,title:title,description:description,type:'guide',
          category:meta.category||category.label,
          primaryCategory:category.key,primaryLabel:category.label,categories:[category.key],
          aliases:aliases,locale_aliases:meta.locale_aliases||{},keywords:Array.from(new Set(keywords.filter(Boolean))),
          priority:Number(meta.priority)||50,semantic_topics:meta.semantic_topics||[],semantic_intents:meta.semantic_intents||[],topics:meta.topics||[],intents:meta.intents||[],
          featuredRank:featuredRank.has(url)?featuredRank.get(url):9999,sourceOrder:sourceOrder++
        });
      });
    });
    state.categories=categories.map(function(category){return {key:category.key,label:category.label,tool:category.tool,count:Array.from(map.values()).filter(function(item){return item.categories.includes(category.key);}).length};});
    state.items=Array.from(map.values());
    state.index=data?data.index:null;state.aliases=data?data.aliases:null;
  }

  function entryList(items){return items.map(function(item){return Object.assign({},item,{category:item.category||item.primaryLabel,type:'guide'});});}
  function browseSort(items){return items.slice().sort(function(a,b){
    if(a.featuredRank!==b.featuredRank)return a.featuredRank-b.featuredRank;
    if(b.priority!==a.priority)return b.priority-a.priority;
    return a.sourceOrder-b.sourceOrder;
  });}

  function filteredCandidates(){
    return state.items.filter(function(item){
      return (state.topic==='all'||item.categories.includes(state.topic))&&matchesIntent(item,state.intent);
    });
  }

  function effectiveQuery(){return state.situation?state.situation.query:state.query;}
  function rankedItems(candidates){
    var queryText=effectiveQuery();
    if(!queryText||queryText.length<3||!core()||!state.aliases)return {items:browseSort(candidates),correction:null};
    var entries=entryList(candidates);
    var correction=core().correctQuery(entries,state.aliases,queryText,{region:region()});
    var used=correction&&correction.corrected?correction.query:queryText;
    var ranked=core().search(entries,state.aliases,used,{region:region(),limit:30});
    var map=new Map(candidates.map(function(item){return [item.url,item];}));
    return {items:ranked.map(function(entry){return map.get(entry.url);}).filter(Boolean),correction:correction&&correction.corrected?{from:queryText,to:correction.query}:null};
  }

  function renderTopics(){
    var signature=state.items.length+'|'+state.categories.map(function(c){return c.key+':'+c.label+':'+c.count;}).join('|');
    if(signature!==topicSignature){
      topicSignature=signature;clear(el.topicRow);
      var all=document.createElement('button');all.type='button';all.className='learn2-chip';all.dataset.learnTopic='all';all.appendChild(document.createTextNode('All topics'));all.appendChild(text('span','',String(state.items.length)));el.topicRow.appendChild(all);
      state.categories.forEach(function(category){var b=document.createElement('button');b.type='button';b.className='learn2-chip';b.dataset.learnTopic=category.key;b.appendChild(document.createTextNode(category.label));b.appendChild(text('span','',String(category.count)));el.topicRow.appendChild(b);});
      qa('[data-learn-topic]',el.topicRow).forEach(function(button){button.addEventListener('click',function(){var key=button.dataset.learnTopic||'all';if(key==='all'){state.topic='all';state.situation=null;state.limit=PAGE_SIZE;syncSituationButtons();render();}else activateTopic(key,false);});});
    }
    qa('[data-learn-topic]',el.topicRow).forEach(function(button){button.setAttribute('aria-pressed',button.dataset.learnTopic===state.topic?'true':'false');});
  }

  function renderIntentButtons(){qa('[data-learn-intent]').forEach(function(button){button.setAttribute('aria-pressed',button.dataset.learnIntent===state.intent?'true':'false');});}
  function syncSituationButtons(){qa('[data-learn-situation]').forEach(function(button){button.setAttribute('aria-pressed',state.situation&&state.situation.id===button.dataset.learnSituation?'true':'false');});}

  function renderRelatedTool(){
    var category=state.categories.find(function(c){return c.key===state.topic;});
    if(!category||!category.tool||!category.tool.href){el.relatedTool.hidden=true;clear(el.relatedTool);return;}
    el.relatedTool.hidden=false;clear(el.relatedTool);el.relatedTool.appendChild(document.createTextNode('Related calculator: '));var a=document.createElement('a');a.href=category.tool.href;a.textContent=category.tool.label+' →';el.relatedTool.appendChild(a);
  }

  function renderCard(item){
    var a=document.createElement('a');a.className='learn2-card';a.href=item.url;a.dataset.learnResult='';
    var meta=document.createElement('div');meta.className='learn2-card-meta';meta.appendChild(text('span','learn2-card-topic',item.primaryLabel));meta.appendChild(text('span','learn2-card-kind',kindLabel(item)));a.appendChild(meta);
    a.appendChild(text('h4','',item.title));a.appendChild(text('p','',item.description));a.appendChild(text('span','learn2-card-action','Read guide →'));return a;
  }

  function resultTitle(resultCount,correction){
    if(state.situation)return {title:'Start here: '+state.situation.label,sub:'A focused set of guides for this situation.'};
    if(state.query.length>=3)return {title:'Results for “'+(correction?correction.to:state.query)+'”',sub:'Learn-only results ranked from Carrowmont’s local guide library.'};
    var topic=state.categories.find(function(c){return c.key===state.topic;});
    var intentLabels={start:'Start here',explain:'Explain the basics',compare:'Compare choices',plan:'Plan & decide'};
    if(topic&&state.intent!=='all')return {title:topic.label+' · '+intentLabels[state.intent],sub:'Filtered learning guides in this topic.'};
    if(topic)return {title:topic.label,sub:'Browse guides in this planning area.'};
    if(state.intent!=='all')return {title:intentLabels[state.intent],sub:'Browse guides by the kind of help you want.'};
    return {title:'Common planning questions',sub:'Editorial starting points first, followed by the wider Learn library.'};
  }

  function renderResults(){
    var candidates=filteredCandidates();var ranked=rankedItems(candidates);var items=ranked.items;var visible=items.slice(0,state.limit);var heading=resultTitle(items.length,ranked.correction);
    el.resultsTitle.textContent=heading.title;el.resultsSub.textContent=heading.sub;
    el.resultsCount.textContent=items.length===1?'1 guide':items.length+' guides';
    if(ranked.correction){el.correction.hidden=false;el.correction.textContent='Spelling help: showing “'+ranked.correction.to+'” for “'+ranked.correction.from+'”.';}else{el.correction.hidden=true;el.correction.textContent='';}
    clear(el.results);
    if(!items.length){var empty=document.createElement('div');empty.className='learn2-empty';empty.appendChild(text('strong','','No close learning guide found.'));empty.appendChild(text('p','','Try a broader phrase, choose All topics, or use Search Carrowmont for tools and research.'));el.results.appendChild(empty);}else visible.forEach(function(item){el.results.appendChild(renderCard(item));});
    el.more.hidden=items.length<=state.limit;el.more.textContent='Show more guides ('+(items.length-state.limit)+')';
    if(el.status){var shown=Math.min(items.length,state.limit);el.status.textContent=items.length?('Showing '+shown+' of '+items.length+' guides.'):'No close guides found.';}
  }

  function render(){renderTopics();renderIntentButtons();syncSituationButtons();renderRelatedTool();renderResults();}

  function topicFromHash(){
    var raw='';
    try{raw=decodeURIComponent((window.location.hash||'').replace(/^#/,''));}catch(_){raw=(window.location.hash||'').replace(/^#/,'');}
    raw=clean(raw).toLowerCase();
    if(!raw)return null;
    var legacy={
      'home-loans':'home',
      'loans-and-debt':'loans',
      'market-mechanics':'macro',
      // Older indexed editorial/homepage links must still select a useful Learn topic.
      'assets-investing':'assets',
      'financial-goals':'goals',
      'retirement-expenses':'retirement',
      'compounding':'foundation'
    };
    if(legacy[raw])raw=legacy[raw];
    else if(raw.indexOf('topic-')===0)raw=raw.slice(6);
    return state.categories.some(function(category){return category.key===raw;})?raw:null;
  }

  function scrollResultsIntoView(force){
    if(!el.resultsTitle)return;
    if(!force&&window.innerWidth>=901&&window.innerHeight>=760)return;
    var target=el.resultsTitle.closest?el.resultsTitle.closest('.learn2-results-head'):null;
    (target||el.resultsTitle).scrollIntoView({behavior:'auto',block:'start'});
  }

  function activateTopic(key,scroll){
    if(!state.categories.some(function(category){return category.key===key;}))return false;
    state.topic=key;state.situation=null;state.limit=PAGE_SIZE;syncSituationButtons();render();
    if(scroll)window.setTimeout(function(){scrollResultsIntoView(true);},0);
    return true;
  }

  function syncTopicFromHash(scroll){var key=topicFromHash();return key?activateTopic(key,scroll):false;}

  function renderSuggestions(){
    if(!el.typeahead||!el.input)return;
    var value=clean(el.input.value);clear(el.typeahead);if(value.length<2||!core()||!state.aliases){el.typeahead.hidden=true;return;}
    var candidates=filteredCandidates(),entries=entryList(candidates);var suggestions=core().suggest(entries,state.aliases,value,{region:region(),limit:5});
    if(!suggestions.length){el.typeahead.hidden=true;return;}
    el.typeahead.appendChild(text('div','learn2-typeahead-label','Suggestions'));
    suggestions.forEach(function(item){var b=document.createElement('button');b.type='button';b.className='learn2-typeahead-option';b.appendChild(text('span','',item.text));b.appendChild(text('small','',item.type==='correction'?'Spelling':'Guide'));b.addEventListener('mousedown',function(event){event.preventDefault();});b.addEventListener('click',function(){el.input.value=item.text;state.query=clean(item.text);state.situation=null;state.limit=PAGE_SIZE;el.clear.hidden=!state.query;el.typeahead.hidden=true;render();el.input.focus();});el.typeahead.appendChild(b);});
    el.typeahead.hidden=false;
  }

  function bind(){
    el.input=q('#learn2SearchInput');el.form=q('#learn2SearchForm');el.clear=q('#learn2Clear');el.typeahead=q('#learn2Typeahead');el.topicRow=q('#learn2TopicRow');el.relatedTool=q('#learn2RelatedTool');el.results=q('#learn2Results');el.resultsTitle=q('#learn2ResultsTitle');el.resultsSub=q('#learn2ResultsSub');el.resultsCount=q('#learn2ResultsCount');el.correction=q('#learn2Correction');el.more=q('#learn2More');el.status=q('#learn2Status');
    if(!el.input||!el.results||!el.topicRow)return false;
    var timer=null;
    el.input.addEventListener('input',function(){state.query=clean(el.input.value);state.situation=null;state.limit=PAGE_SIZE;el.clear.hidden=!state.query;syncSituationButtons();window.clearTimeout(timer);timer=window.setTimeout(function(){renderSuggestions();if(state.query.length===0||state.query.length>=3)render();},120);});
    el.form.addEventListener('submit',function(event){event.preventDefault();window.clearTimeout(timer);timer=null;state.query=clean(el.input.value);state.situation=null;state.limit=PAGE_SIZE;el.clear.hidden=!state.query;el.typeahead.hidden=true;render();window.setTimeout(function(){scrollResultsIntoView(false);},0);});
    el.clear.addEventListener('click',function(){window.clearTimeout(timer);timer=null;el.input.value='';state.query='';state.situation=null;state.limit=PAGE_SIZE;el.clear.hidden=true;el.typeahead.hidden=true;render();el.input.focus();});
    el.input.addEventListener('blur',function(){window.setTimeout(function(){el.typeahead.hidden=true;},120);});
    qa('[data-learn-intent]').forEach(function(button){button.addEventListener('click',function(){state.intent=button.dataset.learnIntent||'all';state.situation=null;state.limit=PAGE_SIZE;render();});});
    qa('[data-learn-situation]').forEach(function(button){button.addEventListener('click',function(){var already=state.situation&&state.situation.id===button.dataset.learnSituation;state.situation=already?null:{id:button.dataset.learnSituation,label:clean(q('strong',button)?.textContent||button.textContent),query:button.dataset.learnQuery||''};state.query='';el.input.value='';el.clear.hidden=true;state.topic='all';state.intent='all';state.limit=PAGE_SIZE;render();if(el.resultsTitle&&window.innerWidth<901)el.resultsTitle.scrollIntoView({behavior:window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});});});
    el.more.addEventListener('click',function(){state.limit+=PAGE_SIZE;renderResults();});
    document.addEventListener('click',function(event){
      var link=event.target&&event.target.closest?event.target.closest('[data-cm-learn-topic-nav] a[data-cm-learn-topic]'):null;
      if(!link)return;
      var key=link.dataset.cmLearnTopic||'';
      if(!state.categories.some(function(category){return category.key===key;}))return;
      event.preventDefault();
      var hash=link.getAttribute('href')||'';
      if(hash.charAt(0)==='#'&&window.history&&window.history.pushState)window.history.pushState(null,'',hash);
      else if(hash.charAt(0)==='#')window.location.hash=hash;
      activateTopic(key,true);
    });
    window.addEventListener('hashchange',function(){syncTopicFromHash(true);});
    return true;
  }

  function initWithData(data){buildLibrary(data);if(!bind())return;var initialTopic=topicFromHash();if(initialTopic)state.topic=initialTopic;document.body.classList.add('learn-hub2-ready');render();}
  function init(){
    if(document.body.dataset.cmPage!=='learn-hub')return;
    var ready=window.CarrowmontSearch&&typeof window.CarrowmontSearch.ready==='function'?window.CarrowmontSearch.ready():Promise.resolve({index:{entries:[]},aliases:{groups:[],topics:[],intents:[]}});
    ready.then(initWithData).catch(function(){initWithData({index:{entries:[]},aliases:{groups:[],topics:[],intents:[]}});});
    window.addEventListener('carrowmont:localechange',function(){window.setTimeout(function(){if(!document.body.classList.contains('learn-hub2-ready'))return;var data={index:state.index||{entries:[]},aliases:state.aliases||{groups:[],topics:[],intents:[]}};buildLibrary(data);render();},180);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
