(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.CarrowmontSearchCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var QUESTION_STOP_WORDS = new Set([
    'a','an','and','are','can','could','do','does','for','from','how','i','in','is','it','me','my','of','on','or','should','the','to','what','when','where','which','why','with','work','works','would'
  ]);

  function normalize(value) {
    return String(value == null ? '' : value)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, ' and ')
      .replace(/[%]/g, ' percent ')
      .replace(/[’'`]/g, '')
      .replace(/[-_/]+/g, ' ')
      .replace(/[^a-zA-Z0-9\s]+/g, ' ')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokenForms(token) {
    var forms = new Set([token]);
    if (token.length > 4 && token.endsWith('ies')) forms.add(token.slice(0, -3) + 'y');
    if (token.length > 4 && token.endsWith('s') && !token.endsWith('ss')) forms.add(token.slice(0, -1));
    return Array.from(forms);
  }

  function tokenize(value, options) {
    var opts = options || {};
    var tokens = normalize(value).split(' ').filter(Boolean);
    if (opts.meaningful !== false) tokens = tokens.filter(function (token) { return !QUESTION_STOP_WORDS.has(token); });
    return Array.from(new Set(tokens));
  }

  function phraseIn(text, phrase) {
    if (!text || !phrase) return false;
    return (' ' + text + ' ').includes(' ' + phrase + ' ');
  }

  function safeDerivedToken(shorter, longer) {
    if (shorter.length < 4 || !longer.startsWith(shorter)) return false;
    var suffix = longer.slice(shorter.length);
    return ['ed','er','ers','ing','ment','ments','ion','ions','al','ally','able','ability','ible','ity','ities','or','ors'].includes(suffix);
  }

  function tokenMatch(token, haystackTokens) {
    var forms = tokenForms(token);
    for (var i = 0; i < forms.length; i += 1) {
      var form = forms[i];
      for (var j = 0; j < haystackTokens.length; j += 1) {
        var candidateForms = tokenForms(haystackTokens[j]);
        for (var k = 0; k < candidateForms.length; k += 1) {
          var candidate = candidateForms[k];
          if (candidate === form) return 2;
          if (safeDerivedToken(form, candidate) || safeDerivedToken(candidate, form)) return 1;
        }
      }
    }
    return 0;
  }

  function list(value) {
    return Array.isArray(value) ? value : [];
  }

  function localeAliasList(entry, region) {
    var map = entry && entry.locale_aliases && typeof entry.locale_aliases === 'object' ? entry.locale_aliases : {};
    return list(map[region]).concat(region === 'OTHER' ? [] : list(map.OTHER));
  }

  function matchingAliasExpansions(aliasLibrary, queryNormalized, region) {
    var groups = aliasLibrary && Array.isArray(aliasLibrary.groups) ? aliasLibrary.groups : [];
    var expansions = [];
    groups.forEach(function (group) {
      var terms = list(group.terms);
      var localeMap = group.locale_terms && typeof group.locale_terms === 'object' ? group.locale_terms : {};
      var localTerms = list(localeMap[region]).concat(region === 'OTHER' ? [] : list(localeMap.OTHER));
      var allReviewedTerms = Array.from(new Set(terms.concat(localTerms).map(normalize).filter(Boolean)));
      var matched = allReviewedTerms.some(function (term) {
        return queryNormalized === term || phraseIn(queryNormalized, term);
      });
      if (matched) expansions.push.apply(expansions, allReviewedTerms);
    });
    return Array.from(new Set(expansions));
  }

  function preparedEntry(entry, region) {
    var aliases = list(entry.aliases).concat(localeAliasList(entry, region));
    return {
      entry: entry,
      title: normalize(entry.title),
      description: normalize(entry.description),
      category: normalize(entry.category),
      aliases: aliases.map(normalize).filter(Boolean),
      keywords: list(entry.keywords).map(normalize).filter(Boolean),
      titleTokens: tokenize(entry.title, { meaningful: false }),
      aliasTokens: tokenize(aliases.join(' '), { meaningful: false }),
      keywordTokens: tokenize(list(entry.keywords).join(' '), { meaningful: false }),
      descriptionTokens: tokenize(entry.description, { meaningful: false }),
      categoryTokens: tokenize(entry.category, { meaningful: false })
    };
  }

  function scoreEntry(entry, aliasLibrary, query, options) {
    var opts = options || {};
    var region = opts.region || 'OTHER';
    var queryNormalized = normalize(query);
    if (queryNormalized.length < 2) return 0;
    var queryTokens = tokenize(queryNormalized);
    if (!queryTokens.length) queryTokens = tokenize(queryNormalized, { meaningful: false });
    if (!queryTokens.length) return 0;

    var prepared = preparedEntry(entry, region);
    var expandedPhrases = matchingAliasExpansions(aliasLibrary, queryNormalized, region);
    var score = 0;

    if (prepared.title === queryNormalized) score += 1200;
    if (prepared.aliases.includes(queryNormalized)) score += 1160;
    if (prepared.keywords.includes(queryNormalized)) score += 900;
    if (phraseIn(prepared.title, queryNormalized)) score += 840;
    if (prepared.aliases.some(function (alias) {
      return phraseIn(alias, queryNormalized) || (tokenize(alias).length > 1 && phraseIn(queryNormalized, alias));
    })) score += 800;
    if (prepared.keywords.some(function (keyword) {
      return phraseIn(keyword, queryNormalized) || (tokenize(keyword).length > 1 && phraseIn(queryNormalized, keyword));
    })) score += 520;
    if (phraseIn(prepared.description, queryNormalized)) score += 300;
    if (phraseIn(prepared.category, queryNormalized)) score += 140;

    var matchedAll = true;
    var matchedQueryTokens = 0;
    queryTokens.forEach(function (token) {
      var titleMatch = tokenMatch(token, prepared.titleTokens);
      var aliasMatch = tokenMatch(token, prepared.aliasTokens);
      var keywordMatch = tokenMatch(token, prepared.keywordTokens);
      var descriptionMatch = tokenMatch(token, prepared.descriptionTokens);
      var categoryMatch = tokenMatch(token, prepared.categoryTokens);
      var best = Math.max(titleMatch, aliasMatch, keywordMatch, descriptionMatch, categoryMatch);
      if (!best) matchedAll = false;
      else matchedQueryTokens += 1;
      if (titleMatch === 2) score += 95; else if (titleMatch === 1) score += 62;
      if (aliasMatch === 2) score += 85; else if (aliasMatch === 1) score += 55;
      if (keywordMatch === 2) score += 48; else if (keywordMatch === 1) score += 30;
      if (descriptionMatch === 2) score += 22; else if (descriptionMatch === 1) score += 12;
      if (categoryMatch === 2) score += 18; else if (categoryMatch === 1) score += 9;
    });
    if (matchedAll) score += 260;
    if (queryTokens.length > 1 && matchedQueryTokens / queryTokens.length <= 0.5) return 0;

    expandedPhrases.forEach(function (phrase) {
      if (prepared.aliases.includes(phrase)) score += 115;
      else if (phraseIn(prepared.title, phrase)) score += 90;
      else if (prepared.keywords.some(function (keyword) { return keyword === phrase || phraseIn(keyword, phrase); })) score += 60;
      else if (phraseIn(prepared.description, phrase)) score += 25;
    });

    var asksForTool = /\b(calculator|planner|tool|explorer|stress test)\b/.test(queryNormalized);
    var asksQuestion = /^(what|how|why|when|where|which)\b/.test(queryNormalized) || /\b(explained|meaning|guide|understand)\b/.test(queryNormalized);
    if (asksForTool && entry.type === 'tool') score += 190;
    if (asksQuestion && entry.type === 'guide') score += 75;
    if (asksQuestion && entry.type === 'carrowmont') score += 10;

    score += Math.max(0, Math.min(100, Number(entry.priority) || 0)) / 10;
    var minimumScore = queryTokens.length > 1 ? 150 : 80;
    return score >= minimumScore ? score : 0;
  }

  function search(entries, aliasLibrary, query, options) {
    var opts = options || {};
    var limit = Math.max(1, Math.min(30, Number(opts.limit) || 12));
    var region = opts.region || 'OTHER';
    return list(entries)
      .map(function (entry) {
        return { entry: entry, score: scoreEntry(entry, aliasLibrary, query, { region: region }) };
      })
      .filter(function (item) { return item.score > 0; })
      .sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        var priorityDifference = (Number(b.entry.priority) || 0) - (Number(a.entry.priority) || 0);
        if (priorityDifference) return priorityDifference;
        return String(a.entry.title).localeCompare(String(b.entry.title), 'en', { sensitivity: 'base' });
      })
      .slice(0, limit)
      .map(function (item) {
        return Object.assign({}, item.entry, { score: Math.round(item.score * 100) / 100 });
      });
  }

  return Object.freeze({
    version: '1.0.0',
    normalize: normalize,
    tokenize: tokenize,
    scoreEntry: scoreEntry,
    search: search
  });
});
