/* Carrowmont Learn article standard v2 - 2026-09-28
   Reuses the top relevant-tool action to add one consistent action near the end
   of every Learn article. Core article content remains usable if JavaScript is disabled. */
(function () {
  'use strict';

  var body = document.body;
  if (!body || body.getAttribute('data-cm-learn-article') !== '1') return;

  var articleContent = document.querySelector('.guide-section > div');
  var topAction = articleContent && articleContent.querySelector('.guide-action-first a[href]');
  if (!articleContent || !topAction || articleContent.querySelector('.learn-tool-return')) return;

  var href = topAction.getAttribute('href') || '';
  var names = {
    '/goal-planner/': 'Goal Planner',
    '/retirement-calculator/': 'Retirement Planner',
    '/financial-independence/': 'Financial Independence tool',
    '/inflation-calculator/': 'Inflation Calculator',
    '/sip-calculator/': 'Monthly Investment Calculator'
  };
  var toolName = names[href] || 'relevant Carrowmont tool';

  var box = document.createElement('div');
  box.className = 'learn-tool-return';
  box.setAttribute('data-cm-generated', 'tool-return');

  var kicker = document.createElement('span');
  kicker.className = 'learn-tool-return-kicker';
  kicker.textContent = 'PUT THIS INTO PRACTICE';

  var link = document.createElement('a');
  link.href = href;
  link.setAttribute('aria-label', 'Continue with the ' + toolName);

  var label = document.createElement('span');
  label.textContent = 'Continue with the ' + toolName;

  var arrow = document.createElement('strong');
  arrow.className = 'action-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '→';

  var note = document.createElement('p');
  note.textContent = 'Use your own assumptions in the relevant Carrowmont planning tool.';

  link.appendChild(label);
  link.appendChild(arrow);
  box.appendChild(kicker);
  box.appendChild(link);
  box.appendChild(note);

  var sources = articleContent.querySelector('.reference-note');
  if (sources && sources.parentNode) sources.parentNode.insertBefore(box, sources);
  else articleContent.appendChild(box);
})();
