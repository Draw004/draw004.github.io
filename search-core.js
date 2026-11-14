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


  function taxonomyDefinitions(aliasLibrary, key) {
    var defs = aliasLibrary && Array.isArray(aliasLibrary[key]) ? aliasLibrary[key] : [];
    return defs.filter(function (def) { return def && typeof def.id === 'string' && def.id.trim(); });
  }

  function taxonomyTerms(def, region) {
    var terms = list(def && def.terms);
    var localeMap = def && def.locale_terms && typeof def.locale_terms === 'object' ? def.locale_terms : {};
    var localTerms = list(localeMap[region]).concat(region === 'OTHER' ? [] : list(localeMap.OTHER));
    return Array.from(new Set(terms.concat(localTerms).map(normalize).filter(Boolean)));
  }

  function termStrengthInField(term, normalizedText, fieldTokens) {
    if (!term || !normalizedText) return 0;
    var termTokens = tokenize(term, { meaningful: false });
    if (!termTokens.length) return 0;
    if (termTokens.length > 1) return phraseIn(normalizedText, term) ? 2 : 0;
    return tokenMatch(termTokens[0], fieldTokens);
  }

  function querySignalStrength(def, queryNormalized, queryTokens, region) {
    var best = 0;
    taxonomyTerms(def, region).forEach(function (term) {
      var termTokens = tokenize(term, { meaningful: false });
      if (!termTokens.length) return;
      if (termTokens.length > 1) {
        if (phraseIn(queryNormalized, term)) best = Math.max(best, 3);
        return;
      }
      var match = tokenMatch(termTokens[0], queryTokens);
      if (match === 2) best = Math.max(best, 3);
      else if (match === 1) best = Math.max(best, 2);
    });
    return best;
  }

  function entrySignalStrength(prepared, def, kind, region) {
    var semanticKey = kind === 'topics' ? 'semantic_topics' : 'semantic_intents';
    var precomputed = list(prepared.entry && prepared.entry[semanticKey]).find(function (signal) { return signal && signal.id === def.id; });
    if (precomputed && Number(precomputed.strength) > 0) return Math.max(1, Math.min(6, Number(precomputed.strength)));
    var explicit = list(prepared.entry && prepared.entry[kind]);
    if (explicit.includes(def.id)) return 6;
    var categories = list(def && def.categories).map(normalize);
    if (categories.includes(prepared.category)) return 3;
    var best = 0;
    taxonomyTerms(def, region).forEach(function (term) {
      if (termStrengthInField(term, prepared.title, prepared.titleTokens)) best = Math.max(best, 5);
      if (prepared.aliases.some(function (alias) { return termStrengthInField(term, alias, tokenize(alias, { meaningful: false })); })) best = Math.max(best, 5);
      if (prepared.keywords.some(function (keyword) { return termStrengthInField(term, keyword, tokenize(keyword, { meaningful: false })); })) best = Math.max(best, 4);
      if (termStrengthInField(term, prepared.category, prepared.categoryTokens)) best = Math.max(best, 3);
      if (termStrengthInField(term, prepared.description, prepared.descriptionTokens)) best = Math.max(best, 1);
    });
    return best;
  }

  function analyzeQuery(aliasLibrary, query, options) {
    var opts = options || {};
    var region = opts.region || 'OTHER';
    var normalized = normalize(query);
    var tokens = tokenize(normalized, { meaningful: false });
    var topics = taxonomyDefinitions(aliasLibrary, 'topics').map(function (def) {
      return {
        id: def.id,
        label: def.label || def.id,
        specificity: Math.max(1, Math.min(3, Number(def.specificity) || 1)),
        strength: querySignalStrength(def, normalized, tokens, region)
      };
    }).filter(function (signal) { return signal.strength > 0; });
    var intents = taxonomyDefinitions(aliasLibrary, 'intents').map(function (def) {
      return { id: def.id, label: def.label || def.id, strength: querySignalStrength(def, normalized, tokens, region) };
    }).filter(function (signal) { return signal.strength > 0; });
    topics.sort(function (a, b) {
      if (b.specificity !== a.specificity) return b.specificity - a.specificity;
      return b.strength - a.strength;
    });
    intents.sort(function (a, b) { return b.strength - a.strength; });
    return { normalized: normalized, tokens: tokens, topics: topics, intents: intents };
  }

  function inferEntrySignals(entry, aliasLibrary, options) {
    var opts = options || {};
    var region = opts.region || 'OTHER';
    var prepared = preparedEntry(entry, region);
    var topics = taxonomyDefinitions(aliasLibrary, 'topics').map(function (def) {
      return { id: def.id, strength: entrySignalStrength(prepared, def, 'topics', region) };
    }).filter(function (signal) { return signal.strength > 0; }).sort(function (a, b) { return b.strength - a.strength || a.id.localeCompare(b.id); });
    var intents = taxonomyDefinitions(aliasLibrary, 'intents').map(function (def) {
      return { id: def.id, strength: entrySignalStrength(prepared, def, 'intents', region) };
    }).filter(function (signal) { return signal.strength > 0; }).sort(function (a, b) { return b.strength - a.strength || a.id.localeCompare(b.id); });
    return { topics: topics, intents: intents };
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
    var queryAnalysis = opts.queryAnalysis || analyzeQuery(aliasLibrary, query, { region: region });
    var queryNormalized = queryAnalysis.normalized;
    if (queryNormalized.length < 2) return 0;
    var queryTokens = tokenize(queryNormalized);
    if (!queryTokens.length) queryTokens = tokenize(queryNormalized, { meaningful: false });
    if (!queryTokens.length) return 0;

    var prepared = preparedEntry(entry, region);
    var expandedPhrases = opts.expandedPhrases || matchingAliasExpansions(aliasLibrary, queryNormalized, region);
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

    expandedPhrases.forEach(function (phrase) {
      if (prepared.aliases.includes(phrase)) score += 115;
      else if (phraseIn(prepared.title, phrase)) score += 90;
      else if (prepared.keywords.some(function (keyword) { return keyword === phrase || phraseIn(keyword, phrase); })) score += 60;
      else if (phraseIn(prepared.description, phrase)) score += 25;
    });

    var topicDefs = taxonomyDefinitions(aliasLibrary, 'topics');
    var topicDefById = {};
    topicDefs.forEach(function (def) { topicDefById[def.id] = def; });
    var topicMatches = queryAnalysis.topics.map(function (signal) {
      var def = topicDefById[signal.id];
      return { signal: signal, strength: def ? entrySignalStrength(prepared, def, 'topics', region) : 0 };
    });
    var dominantTopic = queryAnalysis.topics.length ? queryAnalysis.topics[0] : null;
    topicMatches.forEach(function (match) {
      var specificity = match.signal.specificity;
      if (match.strength > 0) {
        var perStrength = specificity >= 3 ? 160 : (specificity === 2 ? 120 : 80);
        score += match.strength * perStrength;
        if (match.strength >= 4) score += specificity >= 3 ? 140 : 70;
      } else if (specificity >= 3) {
        score -= 550;
      } else if (specificity === 2 && queryAnalysis.topics.length === 1) {
        score -= 120;
      }
    });
    if (dominantTopic && dominantTopic.specificity >= 3) {
      var dominantMatch = topicMatches.find(function (item) { return item.signal.id === dominantTopic.id; });
      if (dominantMatch && dominantMatch.strength >= 4) score += 300;
    }
    if (topicMatches.length > 1 && topicMatches.every(function (item) { return item.strength >= 3; })) score += 180;

    var intentDefs = taxonomyDefinitions(aliasLibrary, 'intents');
    var intentDefById = {};
    intentDefs.forEach(function (def) { intentDefById[def.id] = def; });
    queryAnalysis.intents.forEach(function (signal) {
      var def = intentDefById[signal.id];
      if (!def) return;
      var strength = entrySignalStrength(prepared, def, 'intents', region);
      if (strength > 0) score += strength * 55 + (strength >= 4 ? 80 : 0);
    });

    var semanticCoverage = topicMatches.some(function (item) { return item.strength > 0; }) || queryAnalysis.intents.some(function (signal) {
      var def = intentDefById[signal.id];
      return def && entrySignalStrength(prepared, def, 'intents', region) > 0;
    });
    if (queryTokens.length > 1 && matchedQueryTokens / queryTokens.length <= 0.5 && !semanticCoverage) return 0;

    var asksForTool = /\b(calculator|planner|tool|explorer|stress test)\b/.test(queryNormalized);
    var asksQuestion = /^(what|how|why|when|where|which)\b/.test(queryNormalized) || /\b(explained|meaning|guide|understand)\b/.test(queryNormalized);
    var intentIds = new Set(queryAnalysis.intents.map(function (signal) { return signal.id; }));
    if (asksForTool && entry.type === 'tool') score += 190;
    if (asksQuestion && entry.type === 'guide') score += 75;
    if (asksQuestion && entry.type === 'carrowmont') score += 10;
    if (intentIds.has('calculate')) {
      if (entry.type === 'tool') score += 420;
      else if (entry.type === 'carrowmont') score -= 220;
    }
    if (intentIds.has('start') && entry.type === 'carrowmont') score -= 120;
    if (intentIds.has('plan')) {
      if (entry.type === 'tool') score += 220;
      else if (entry.type === 'guide') score += 90;
      else if (entry.type === 'carrowmont') score -= 80;
    }
    if (intentIds.has('payoff') || intentIds.has('afford')) {
      if (entry.type === 'tool') score += 320;
      else if (entry.type === 'guide') score += 90;
      else if (entry.type === 'carrowmont') score -= 180;
    }
    if (intentIds.has('compare')) {
      if (entry.type === 'tool' || entry.type === 'guide') score += 120;
    }
    if (intentIds.has('explain') && entry.type === 'guide') score += 160;
    if (intentIds.has('research') && String(entry.category || '').toLowerCase() === 'research') score += 420;
    if (queryAnalysis.topics.length && entry.type === 'carrowmont' && !/\bcarrowmont\b/.test(queryNormalized)) score -= 180;

    score += Math.max(0, Math.min(100, Number(entry.priority) || 0)) / 10;
    var minimumScore = queryTokens.length > 1 ? 150 : 80;
    return score >= minimumScore ? score : 0;
  }

  function search(entries, aliasLibrary, query, options) {
    var opts = options || {};
    var limit = Math.max(1, Math.min(30, Number(opts.limit) || 12));
    var region = opts.region || 'OTHER';
    var queryAnalysis = analyzeQuery(aliasLibrary, query, { region: region });
    var expandedPhrases = matchingAliasExpansions(aliasLibrary, queryAnalysis.normalized, region);
    return list(entries)
      .map(function (entry) {
        return { entry: entry, score: scoreEntry(entry, aliasLibrary, query, { region: region, queryAnalysis: queryAnalysis, expandedPhrases: expandedPhrases }) };
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

  function searchForAsk(entries, aliasLibrary, query, options) {
    var opts = options || {};
    var limit = Math.max(1, Math.min(12, Number(opts.limit) || 4));
    var region = opts.region || 'OTHER';
    var analysis = analyzeQuery(aliasLibrary, query, { region: region });
    var broad = search(entries, aliasLibrary, query, { region: region, limit: Math.max(18, limit * 4) });
    if (broad.length <= 1) return broad.slice(0, limit);
    var chosen = [];
    var used = new Set();
    function add(entry) {
      if (!entry || used.has(entry.url) || chosen.length >= limit) return false;
      used.add(entry.url); chosen.push(entry); return true;
    }
    function signals(entry) { return inferEntrySignals(entry, aliasLibrary, { region: region }); }
    function topicStrength(entry, topicId) {
      var signal = signals(entry).topics.find(function (item) { return item.id === topicId; });
      return signal ? signal.strength : 0;
    }
    function hasTopicOverlap(entry, minimum) {
      if (!analysis.topics.length) return true;
      var entryTopics = signals(entry).topics;
      return analysis.topics.some(function (queryTopic) {
        var found = entryTopics.find(function (item) { return item.id === queryTopic.id; });
        return found && found.strength >= (minimum || 1);
      });
    }
    function intentStrength(entry, intentId) {
      var signal = signals(entry).intents.find(function (item) { return item.id === intentId; });
      return signal ? signal.strength : 0;
    }
    var intentIds = analysis.intents.map(function (item) { return item.id; });
    var dominant = analysis.topics.length ? analysis.topics[0] : null;

    if (dominant && dominant.specificity >= 3) {
      add(broad.find(function (entry) { return !used.has(entry.url) && topicStrength(entry, dominant.id) >= 4; }) || broad[0]);
    } else if (intentIds.some(function (id) { return ['calculate','plan','payoff','afford'].includes(id); })) {
      var actionIntent = intentIds.find(function (id) { return ['calculate','plan','payoff','afford'].includes(id); });
      add(broad.find(function (entry) { return entry.type === 'tool' && hasTopicOverlap(entry, 2) && intentStrength(entry, actionIntent) >= 2; }) ||
          broad.find(function (entry) { return entry.type === 'tool' && hasTopicOverlap(entry, 2); }) || broad[0]);
    } else {
      add(broad[0]);
    }

    if (intentIds.includes('start')) {
      add(broad.find(function (entry) { return !used.has(entry.url) && intentStrength(entry, 'start') >= 4 && hasTopicOverlap(entry, 2); }));
    }
    if (intentIds.includes('compare')) {
      add(broad.find(function (entry) { return !used.has(entry.url) && intentStrength(entry, 'compare') >= 3 && hasTopicOverlap(entry, 2); }));
    }
    if (intentIds.includes('explain')) {
      add(broad.find(function (entry) { return !used.has(entry.url) && entry.type === 'guide' && intentStrength(entry, 'explain') >= 3 && hasTopicOverlap(entry, 2); }));
    }
    if (intentIds.includes('research')) {
      add(broad.find(function (entry) { return !used.has(entry.url) && String(entry.category || '').toLowerCase() === 'research' && hasTopicOverlap(entry, 2); }));
    }
    if (dominant && dominant.specificity >= 3) {
      add(broad.find(function (entry) { return !used.has(entry.url) && topicStrength(entry, dominant.id) >= 4; }));
    }
    broad.forEach(add);
    return chosen.slice(0, limit);
  }

  return Object.freeze({
    version: '1.1.0',
    normalize: normalize,
    tokenize: tokenize,
    analyzeQuery: analyzeQuery,
    inferEntrySignals: inferEntrySignals,
    scoreEntry: scoreEntry,
    search: search,
    searchForAsk: searchForAsk
  });
});
