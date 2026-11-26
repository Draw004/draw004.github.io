(function () {
  'use strict';

  var INDEX_URL = '/data/carrowmont-search-index.json?v=20261125-askwave2&live=20261126-cachefix2';
  var ALIASES_URL = '/data/carrowmont-search-aliases.json?v=20261125-askwave2&live=20261126-cachefix2&route=20261126-drawdown';
  var MIN_QUERY_LENGTH = 3;
  var MIN_SUGGEST_LENGTH = 2;
  var DEFAULT_LIMIT = 12;
  var ASK_SEARCH_HANDOFF_KEY = 'carrowmont_search_handoff_v1';
  var ASK_SEARCH_HANDOFF_MAX_AGE_MS = 5 * 60 * 1000;
  var dataPromise = null;
  var widgets = [];

  function loadData() {
    if (!dataPromise) {
      dataPromise = Promise.all([
        fetch(INDEX_URL, { credentials: 'same-origin', cache: 'default' }).then(function (response) {
          if (!response.ok) throw new Error('Search index unavailable');
          return response.json();
        }),
        fetch(ALIASES_URL, { credentials: 'same-origin', cache: 'default' }).then(function (response) {
          if (!response.ok) throw new Error('Search aliases unavailable');
          return response.json();
        })
      ]).then(function (parts) {
        var index = parts[0];
        var aliases = parts[1];
        if (!index || index.schema_version !== 1 || !Array.isArray(index.entries)) throw new Error('Unsupported search index');
        if (!aliases || ![1,2].includes(aliases.schema_version) || !Array.isArray(aliases.groups)) throw new Error('Unsupported search aliases');
        return { index: index, aliases: aliases };
      });
    }
    return dataPromise;
  }

  function regionCode() {
    try {
      if (window.CarrowmontLocale && typeof window.CarrowmontLocale.getRegion === 'function') {
        return window.CarrowmontLocale.getRegion() || 'OTHER';
      }
    } catch (_) {}
    return 'OTHER';
  }

  function textElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }

  function clearNode(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
  }

  function normalizeOwnershipText(value) {
    return String(value == null ? '' : value)
      .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, ' and ').replace(/[-_/]+/g, ' ')
      .replace(/[^a-zA-Z0-9\s]+/g, ' ').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function ownsSpecificQuery(entry, query) {
    var normalized = normalizeOwnershipText(query);
    if (!entry || !normalized) return false;
    var stop = new Set(['a','an','and','are','can','do','does','for','from','how','i','in','is','it','me','my','of','on','or','should','the','to','what','when','where','which','why','with','would']);
    var meaningful = normalized.split(' ').filter(function (token) { return token && !stop.has(token); });
    if (meaningful.length < 2) return false;
    var fields = [entry.title].concat(Array.isArray(entry.aliases) ? entry.aliases : [], Array.isArray(entry.keywords) ? entry.keywords : []);
    return fields.some(function (value) {
      var field = normalizeOwnershipText(value);
      return field && (field === normalized || field.includes(normalized));
    });
  }

  function resultTypeLabel(entry) {
    if (entry && String(entry.category || '').toLowerCase() === 'research') return 'Research';
    if (entry && entry.type === 'tool') return 'Tool';
    if (entry && entry.type === 'guide') return 'Learn';
    return 'Carrowmont';
  }

  function resultCard(entry, options) {
    var opts = options || {};
    var actionText = entry.type === 'tool' ? 'Open tool →' : entry.type === 'guide' ? 'Read article →' : 'View result →';
    var link = document.createElement('a');
    link.className = 'cm-search-result-card';
    if (entry.type === 'tool') link.classList.add('cm-search-result-card-tool');
    else if (entry.type === 'guide') link.classList.add('cm-search-result-card-learn');
    else link.classList.add('cm-search-result-card-other');
    link.href = entry.url;
    link.dataset.searchResult = '';
    link.dataset.resultType = entry.type;
    link.dataset.searchResultLink = '';
    link.setAttribute('aria-label', actionText.replace(' →', '') + ': ' + entry.title);

    var meta = document.createElement('div');
    meta.className = 'cm-search-result-meta';
    meta.appendChild(textElement('span', 'cm-search-result-type', resultTypeLabel(entry)));
    meta.appendChild(textElement('span', 'cm-search-result-category', entry.category));
    if (opts.bestMatch) meta.appendChild(textElement('span', 'cm-search-result-best-match', 'Best match'));

    link.appendChild(meta);
    link.appendChild(textElement('h3', '', entry.title));
    link.appendChild(textElement('p', '', entry.description));
    var action = textElement('span', 'cm-search-result-action', actionText);
    action.dataset.searchResultAction = '';
    link.appendChild(action);
    return link;
  }

  function resultGroupSection(group, bestEntry) {
    var section = document.createElement('section');
    section.className = 'cm-search-result-group cm-search-result-group-' + group.key;
    section.dataset.searchResultGroup = group.key;
    var groupHeading = document.createElement('div');
    groupHeading.className = 'cm-search-result-group-heading';
    groupHeading.appendChild(textElement('h2', '', group.label));
    groupHeading.appendChild(textElement('span', '', group.entries.length === 1 ? '1 result' : group.entries.length + ' results'));
    section.appendChild(groupHeading);
    var grid = document.createElement('div');
    grid.className = 'cm-search-result-group-grid';
    group.entries.forEach(function (entry) { grid.appendChild(resultCard(entry, { bestMatch: entry === bestEntry })); });
    section.appendChild(grid);
    return section;
  }

  function bindResultTabs(tabList, primary, groups, activeKey) {
    var buttons = [];
    groups.forEach(function (group) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'cm-search-result-tab';
      button.dataset.searchResultTab = group.key;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', group.key === activeKey ? 'true' : 'false');
      button.appendChild(textElement('span', '', group.label));
      button.appendChild(textElement('strong', '', String(group.entries.length)));
      button.addEventListener('click', function () {
        primary.dataset.mobileActive = group.key;
        buttons.forEach(function (item) { item.setAttribute('aria-selected', item === button ? 'true' : 'false'); });
      });
      buttons.push(button);
      tabList.appendChild(button);
    });
    tabList.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      var current = buttons.indexOf(document.activeElement);
      if (current < 0) return;
      event.preventDefault();
      var delta = event.key === 'ArrowRight' ? 1 : -1;
      var next = (current + delta + buttons.length) % buttons.length;
      buttons[next].click();
      buttons[next].focus();
    });
  }

  function setStatus(widget, message) {
    widget.status.textContent = message;
  }

  function setBusy(widget, busy) {
    widget.root.setAttribute('aria-busy', busy ? 'true' : 'false');
    widget.submit.disabled = Boolean(busy);
  }

  function showSuggestions(widget, visible) {
    if (widget.suggestions) widget.suggestions.hidden = !visible;
  }

  function resetWidget(widget) {
    clearNode(widget.results);
    setStatus(widget, 'Start with a topic or money question.');
    showSuggestions(widget, true);
    widget.root.dataset.searchState = 'start';
  }

  function showError(widget) {
    clearNode(widget.results);
    var box = textElement('div', 'cm-search-message cm-search-error', 'Search is temporarily unavailable. You can still browse all tools or learning guides.');
    var links = document.createElement('p');
    var tools = document.createElement('a');
    tools.href = '/tools.html';
    tools.textContent = 'Browse tools';
    var learn = document.createElement('a');
    learn.href = '/learn.html';
    learn.textContent = 'Browse guides';
    links.appendChild(tools);
    links.appendChild(document.createTextNode(' · '));
    links.appendChild(learn);
    box.appendChild(links);
    widget.results.appendChild(box);
    setStatus(widget, 'Search could not load.');
    showSuggestions(widget, true);
    widget.root.dataset.searchState = 'error';
  }

  function showEmpty(widget) {
    clearNode(widget.results);
    var message = document.createElement('div');
    message.className = 'cm-search-message cm-search-empty';
    message.appendChild(textElement('strong', '', 'We could not find a close match.'));
    message.appendChild(textElement('p', '', 'Try a shorter phrase or one of the topics below.'));
    widget.results.appendChild(message);
    setStatus(widget, 'No close matches found.');
    showSuggestions(widget, true);
    widget.root.dataset.searchState = 'empty';
  }

  function reducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function revealResults(widget) {
    if (!widget || !widget.results) return;
    var heading = widget.results.querySelector('[data-cm-search-results-heading]') || widget.results;
    var header = document.querySelector('.site-header');
    var offset = (header ? header.getBoundingClientRect().height : 0) + 16;
    var top = heading.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion() ? 'auto' : 'smooth' });
  }

  function renderResults(widget, results, correction) {
    clearNode(widget.results);
    var heading = document.createElement('div');
    heading.className = 'cm-search-results-heading';
    heading.dataset.cmSearchResultsHeading = '';
    var shownQuery = correction && correction.corrected ? correction.query : widget.query;
    heading.appendChild(textElement('strong', '', 'Results for "' + shownQuery + '"'));
    heading.appendChild(textElement('span', '', results.length === 1 ? '1 match' : results.length + ' matches'));
    widget.results.appendChild(heading);
    if (correction && correction.corrected) {
      var note = document.createElement('p');
      note.className = 'cm-search-correction-note';
      note.appendChild(document.createTextNode('We interpreted your search as '));
      var button = document.createElement('button'); button.type = 'button'; button.textContent = correction.query;
      button.addEventListener('click', function () { widget.input.value = correction.query; runWidgetSearch(widget, correction.query, { reveal: true }); });
      note.appendChild(button); note.appendChild(document.createTextNode('.'));
      widget.results.appendChild(note);
    }
    var grouped = {
      tool: { key: 'tool', label: 'Tools', entries: results.filter(function (entry) { return entry.type === 'tool'; }) },
      guide: { key: 'guide', label: 'Learn & Guides', entries: results.filter(function (entry) { return entry.type === 'guide'; }) },
      other: { key: 'other', label: 'Research & Other', entries: results.filter(function (entry) { return entry.type !== 'tool' && entry.type !== 'guide'; }) }
    };
    // Preserve a decisive direct/intention match in DOM order and Best Match state.
    // On desktop, CSS always places Tools left and Learn & Guides right; type never
    // overrides a decisive exact match in the ranking model.
    var first = results[0] || null;
    var bestTool = grouped.tool.entries[0] || null;
    var DIRECT_MATCH_LEAD = 200;
    var leadingKey = first && first.type === 'guide' ? 'guide' : (first && first.type === 'tool' ? 'tool' : 'other');
    var decisiveNonTool = first && leadingKey !== 'tool' && (!bestTool || ownsSpecificQuery(first, shownQuery) || ((Number(first.score) || 0) - (Number(bestTool.score) || 0) >= DIRECT_MATCH_LEAD));
    var order = decisiveNonTool ? [leadingKey, 'tool', leadingKey === 'guide' ? 'other' : 'guide'] : ['tool', 'guide', 'other'];

    var primaryGroups = order.map(function (key) { return grouped[key]; }).filter(function (group) {
      return (group.key === 'tool' || group.key === 'guide') && group.entries.length;
    });
    if (primaryGroups.length) {
      if (primaryGroups.length === 2) {
        var tabs = document.createElement('div');
        tabs.className = 'cm-search-result-tabs';
        tabs.setAttribute('role', 'tablist');
        tabs.setAttribute('aria-label', 'Search result types');
        widget.results.appendChild(tabs);
      }
      var primary = document.createElement('div');
      primary.className = 'cm-search-primary-groups ' + (primaryGroups.length === 2 ? 'cm-search-primary-groups-dual' : 'cm-search-primary-groups-single');
      primary.dataset.mobileActive = primaryGroups[0].key;
      primaryGroups.forEach(function (group) { primary.appendChild(resultGroupSection(group, first)); });
      if (primaryGroups.length === 2) {
        var tabGroups = [grouped.tool, grouped.guide].filter(function (group) { return group.entries.length; });
        bindResultTabs(widget.results.querySelector('.cm-search-result-tabs:last-of-type'), primary, tabGroups, primaryGroups[0].key);
      }
      widget.results.appendChild(primary);
    }
    if (grouped.other.entries.length) widget.results.appendChild(resultGroupSection(grouped.other, first));
    setStatus(widget, results.length === 1 ? '1 result found.' : results.length + ' results found.');
    showSuggestions(widget, false);
    hideTypeahead(widget);
    widget.root.dataset.searchState = 'results';
  }

  function hideTypeahead(widget) {
    if (!widget || !widget.typeahead) return;
    widget.typeahead.hidden = true;
    clearNode(widget.typeahead);
    widget.input.setAttribute('aria-expanded', 'false');
  }

  function renderTypeahead(widget, suggestions) {
    if (!widget.typeahead) return;
    clearNode(widget.typeahead);
    if (!suggestions || !suggestions.length) { hideTypeahead(widget); return; }
    var label = textElement('div', 'cm-search-typeahead-label', 'Suggestions');
    widget.typeahead.appendChild(label);
    suggestions.forEach(function (suggestion) {
      var button = document.createElement('button');
      button.type = 'button'; button.className = 'cm-search-typeahead-option'; button.setAttribute('role', 'option');
      var text = textElement('span', '', suggestion.text); button.appendChild(text);
      if (suggestion.type === 'correction') button.appendChild(textElement('small', '', 'Spelling suggestion'));
      else if (suggestion.type === 'page') button.appendChild(textElement('small', '', 'Carrowmont result'));
      button.addEventListener('click', function () {
        widget.input.value = suggestion.text; widget.input.focus(); hideTypeahead(widget);
        runWidgetSearch(widget, suggestion.text, { reveal: true });
      });
      widget.typeahead.appendChild(button);
    });
    widget.typeahead.hidden = false;
    widget.input.setAttribute('aria-expanded', 'true');
  }

  function updateTypeahead(widget, value) {
    var query = String(value == null ? '' : value).trim();
    var normalized = window.CarrowmontSearchCore.normalize(query);
    if (normalized.length < MIN_SUGGEST_LENGTH) { hideTypeahead(widget); return Promise.resolve([]); }
    return loadData().then(function (data) {
      if (widget.input.value.trim() !== query) return [];
      var suggestions = window.CarrowmontSearchCore.suggest(data.index.entries, data.aliases, query, { region: regionCode(), limit: 6 });
      renderTypeahead(widget, suggestions); return suggestions;
    }).catch(function () { hideTypeahead(widget); return []; });
  }

  function runWidgetSearch(widget, value, options) {
    var opts = options || {};
    var query = String(value == null ? '' : value).trim();
    widget.query = query;
    if (!query) { resetWidget(widget); hideTypeahead(widget); return Promise.resolve([]); }
    var normalized = window.CarrowmontSearchCore.normalize(query);
    if (normalized.length < MIN_QUERY_LENGTH) {
      clearNode(widget.results);
      setStatus(widget, normalized.length >= MIN_SUGGEST_LENGTH ? 'Keep typing, or choose a suggestion.' : 'Keep typing to search Carrowmont.');
      showSuggestions(widget, true); widget.root.dataset.searchState = 'short';
      updateTypeahead(widget, query);
      return Promise.resolve([]);
    }

    setBusy(widget, true); widget.root.dataset.searchState = 'loading'; setStatus(widget, 'Searching Carrowmont…');
    return loadData().then(function (data) {
      var core = window.CarrowmontSearchCore;
      var correction = typeof core.correctQuery === 'function' ? core.correctQuery(data.index.entries, data.aliases, query, { region: regionCode() }) : { query: query, corrected: false };
      var results = core.search(data.index.entries, data.aliases, query, { region: regionCode(), limit: Number(widget.root.dataset.searchLimit) || DEFAULT_LIMIT });
      if (!results.length && correction.corrected) results = core.search(data.index.entries, data.aliases, correction.query, { region: regionCode(), limit: Number(widget.root.dataset.searchLimit) || DEFAULT_LIMIT });
      if (widget.query !== query) return results;
      if (results.length) renderResults(widget, results, correction);
      else { showEmpty(widget); updateTypeahead(widget, query); }
      if (opts.reveal) requestAnimationFrame(function () { revealResults(widget); });
      return results;
    }).catch(function () {
      if (widget.query === query) { showError(widget); if (opts.reveal) requestAnimationFrame(function () { revealResults(widget); }); }
      return [];
    }).finally(function () { if (widget.query === query) setBusy(widget, false); });
  }

  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var args = arguments;
      window.clearTimeout(timer);
      timer = window.setTimeout(function () { fn.apply(null, args); }, delay);
    };
  }

  function bindWidget(root, index) {
    var form = root.querySelector('[data-cm-search-form]');
    var input = root.querySelector('[data-cm-search-input]');
    var submit = root.querySelector('[data-cm-search-submit]');
    var results = root.querySelector('[data-cm-search-results]');
    var status = root.querySelector('[data-cm-search-status]');
    var suggestions = root.querySelector('[data-cm-search-suggestions]');
    if (!form || !input || !submit || !results || !status) return null;

    if (!input.id) input.id = 'carrowmontSearchInput' + (index + 1);
    var label = root.querySelector('label[data-cm-search-label]');
    if (label) label.setAttribute('for', input.id);
    input.removeAttribute('name');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocapitalize', 'sentences');
    input.setAttribute('autocorrect', 'on');
    input.setAttribute('spellcheck', 'true');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');
    var typeahead = document.createElement('div');
    typeahead.className = 'cm-search-typeahead'; typeahead.hidden = true; typeahead.setAttribute('role', 'listbox');
    typeahead.id = input.id + 'Suggestions'; input.setAttribute('aria-controls', typeahead.id); form.insertAdjacentElement('afterend', typeahead);

    var widget = { root: root, form: form, input: input, submit: submit, results: results, status: status, suggestions: suggestions, typeahead: typeahead, query: '' };
    var runDebounced = debounce(function () { updateTypeahead(widget, input.value); runWidgetSearch(widget, input.value); }, 150);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      runWidgetSearch(widget, input.value, { reveal: true });
    });
    input.addEventListener('input', runDebounced);
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        input.value = '';
        widget.query = '';
        resetWidget(widget);
        hideTypeahead(widget);
        input.focus();
      }
    });
    if (suggestions) {
      suggestions.querySelectorAll('[data-search-suggestion]').forEach(function (button) {
        button.addEventListener('click', function () {
          var suggestion = button.getAttribute('data-search-suggestion') || button.textContent || '';
          input.value = suggestion.trim();
          input.focus();
          runWidgetSearch(widget, input.value, { reveal: true });
        });
      });
    }
    resetWidget(widget);
    try {
      var raw = sessionStorage.getItem(ASK_SEARCH_HANDOFF_KEY);
      if (raw) {
        sessionStorage.removeItem(ASK_SEARCH_HANDOFF_KEY);
        var handoff = JSON.parse(raw);
        if (handoff && handoff.query && Date.now() - Number(handoff.createdAt || 0) <= ASK_SEARCH_HANDOFF_MAX_AGE_MS) {
          input.value = String(handoff.query);
          runWidgetSearch(widget, input.value, { reveal: true });
        }
      }
    } catch (_) {}
    return widget;
  }

  function init() {
    if (!window.CarrowmontSearchCore) return;
    widgets = Array.from(document.querySelectorAll('[data-cm-search-root]')).map(bindWidget).filter(Boolean);
    loadData().catch(function () {});
  }

  function publicSearch(query, options) {
    var opts = options || {};
    return loadData().then(function (data) {
      var runner = opts.mode === 'ask' && typeof window.CarrowmontSearchCore.searchForAsk === 'function'
        ? window.CarrowmontSearchCore.searchForAsk
        : window.CarrowmontSearchCore.search;
      return runner(data.index.entries, data.aliases, query, {
        region: opts.region || regionCode(),
        limit: opts.limit || DEFAULT_LIMIT
      });
    });
  }

  window.CarrowmontSearch = Object.freeze({
    version: '1.4.0',
    search: publicSearch,
    suggest: function (query, options) { var opts = options || {}; return loadData().then(function (data) { return window.CarrowmontSearchCore.suggest(data.index.entries, data.aliases, query, { region: opts.region || regionCode(), limit: opts.limit || 6 }); }); },
    correct: function (query, options) { var opts = options || {}; return loadData().then(function (data) { return window.CarrowmontSearchCore.correctQuery(data.index.entries, data.aliases, query, { region: opts.region || regionCode() }); }); },
    ownership: function (query, options) { var opts = options || {}; return loadData().then(function (data) { return window.CarrowmontSearchCore.resolveOwnership ? window.CarrowmontSearchCore.resolveOwnership(data.aliases, query, { region: opts.region || regionCode() }) : null; }); },
    ready: loadData,
    indexUrl: INDEX_URL,
    aliasesUrl: ALIASES_URL
  });

  window.addEventListener('carrowmont:localechange', function () {
    widgets.forEach(function (widget) {
      if (widget.query) runWidgetSearch(widget, widget.query);
    });
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
