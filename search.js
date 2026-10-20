(function () {
  'use strict';

  var INDEX_URL = '/data/carrowmont-search-index.json';
  var ALIASES_URL = '/data/carrowmont-search-aliases.json';
  var MIN_QUERY_LENGTH = 2;
  var DEFAULT_LIMIT = 12;
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
        if (!aliases || aliases.schema_version !== 1 || !Array.isArray(aliases.groups)) throw new Error('Unsupported search aliases');
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

  function resultTypeLabel(type) {
    if (type === 'tool') return 'Tool';
    if (type === 'guide') return 'Guide';
    return 'Carrowmont';
  }

  function resultCard(entry) {
    var article = document.createElement('article');
    article.className = 'cm-search-result-card';
    article.dataset.searchResult = '';
    article.dataset.resultType = entry.type;

    var meta = document.createElement('div');
    meta.className = 'cm-search-result-meta';
    meta.appendChild(textElement('span', 'cm-search-result-type', resultTypeLabel(entry.type)));
    meta.appendChild(textElement('span', 'cm-search-result-category', entry.category));

    var heading = document.createElement('h3');
    var link = document.createElement('a');
    link.href = entry.url;
    link.textContent = entry.title;
    link.dataset.searchResultLink = '';
    heading.appendChild(link);

    article.appendChild(meta);
    article.appendChild(heading);
    article.appendChild(textElement('p', '', entry.description));
    return article;
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

  function renderResults(widget, results) {
    clearNode(widget.results);
    var fragment = document.createDocumentFragment();
    results.forEach(function (entry) { fragment.appendChild(resultCard(entry)); });
    widget.results.appendChild(fragment);
    setStatus(widget, results.length === 1 ? '1 result found.' : results.length + ' results found.');
    showSuggestions(widget, false);
    widget.root.dataset.searchState = 'results';
  }

  function runWidgetSearch(widget, value) {
    var query = String(value == null ? '' : value).trim();
    widget.query = query;
    if (!query) {
      resetWidget(widget);
      return Promise.resolve([]);
    }
    if (window.CarrowmontSearchCore.normalize(query).length < MIN_QUERY_LENGTH) {
      clearNode(widget.results);
      setStatus(widget, 'Type at least two meaningful characters.');
      showSuggestions(widget, true);
      widget.root.dataset.searchState = 'short';
      return Promise.resolve([]);
    }

    setBusy(widget, true);
    widget.root.dataset.searchState = 'loading';
    setStatus(widget, 'Searching Carrowmont…');
    return loadData().then(function (data) {
      var results = window.CarrowmontSearchCore.search(data.index.entries, data.aliases, query, {
        region: regionCode(),
        limit: Number(widget.root.dataset.searchLimit) || DEFAULT_LIMIT
      });
      if (widget.query !== query) return results;
      if (results.length) renderResults(widget, results);
      else showEmpty(widget);
      return results;
    }).catch(function () {
      if (widget.query === query) showError(widget);
      return [];
    }).finally(function () {
      if (widget.query === query) setBusy(widget, false);
    });
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
    input.setAttribute('autocapitalize', 'none');
    input.setAttribute('spellcheck', 'false');

    var widget = { root: root, form: form, input: input, submit: submit, results: results, status: status, suggestions: suggestions, query: '' };
    var runDebounced = debounce(function () { runWidgetSearch(widget, input.value); }, 130);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      runWidgetSearch(widget, input.value);
    });
    input.addEventListener('input', runDebounced);
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        input.value = '';
        widget.query = '';
        resetWidget(widget);
        input.focus();
      }
    });
    if (suggestions) {
      suggestions.querySelectorAll('[data-search-suggestion]').forEach(function (button) {
        button.addEventListener('click', function () {
          var suggestion = button.getAttribute('data-search-suggestion') || button.textContent || '';
          input.value = suggestion.trim();
          input.focus();
          runWidgetSearch(widget, input.value);
        });
      });
    }
    resetWidget(widget);
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
      return window.CarrowmontSearchCore.search(data.index.entries, data.aliases, query, {
        region: opts.region || regionCode(),
        limit: opts.limit || DEFAULT_LIMIT
      });
    });
  }

  window.CarrowmontSearch = Object.freeze({
    version: '1.0.0',
    search: publicSearch,
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
