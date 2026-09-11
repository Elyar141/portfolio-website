/* ──────────────────────────────────────────────────────────────────────────
   tuner.js — live CSS custom-property editor.

   Off by default. Add ?tune to any page URL to switch it on:

       about5.html?tune          file:///…/about5.html?tune
       pixelandprompt.com/about5?tune

   It stays on as you move between pages in the same tab (sessionStorage).
   Add ?tune=off to switch it back off. Alt+T hides/shows the panel.

   The panel is built from the page it is on: every --token declared on
   :root, in declaration order, plus any var(--x, fallback) the CSS reads
   but never declares. Colours get a swatch, plain numbers get a slider,
   everything else gets a text field. Edits apply instantly by setting the
   property on <html>, and survive a reload (localStorage, per page).

   Nothing is written to disk. When a page looks right, press "Copy
   changed" and paste the block into that file's :root.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var ROOT = document.documentElement;
  var STORE_KEY = 'tuner:' + location.pathname;
  var POS_KEY = 'tuner:pos';

  /* ── Activation ─────────────────────────────────────────────────────── */

  function isOn() {
    var q = new URLSearchParams(location.search);
    var flag = q.has('tune') ? (q.get('tune') || 'on') : null;
    try {
      if (flag === 'off') { sessionStorage.removeItem('tuner:on'); return false; }
      if (flag !== null) { sessionStorage.setItem('tuner:on', '1'); return true; }
      return sessionStorage.getItem('tuner:on') === '1';
    } catch (e) {
      // Private mode, or file:// with storage blocked — fall back to the URL alone.
      return flag !== null && flag !== 'off';
    }
  }

  if (!isOn()) return;

  /* ── Value parsing ──────────────────────────────────────────────────────
     Two shapes earn a richer control than a text box: colours and plain
     numbers. Everything else (clamp(), gradients, font stacks) stays text. */

  var NAMED = { white: '#ffffff', black: '#000000' };

  function parseColor(str) {
    if (!str) return null;
    var s = String(str).trim().toLowerCase();
    if (NAMED[s]) s = NAMED[s];

    var m = s.match(/^#([0-9a-f]{3,8})$/);
    if (m) {
      var h = m[1];
      if (h.length === 3 || h.length === 4) h = h.split('').map(function (c) { return c + c; }).join('');
      if (h.length !== 6 && h.length !== 8) return null;
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
        a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1
      };
    }

    m = s.match(/^rgba?\(([^)]+)\)$/);
    if (m) {
      var p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
      if (p.length < 3 || p.slice(0, 3).some(isNaN)) return null;
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 && !isNaN(p[3]) ? p[3] : 1 };
    }
    return null;
  }

  function toHex(c) {
    return '#' + [c.r, c.g, c.b].map(function (v) {
      return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
    }).join('');
  }

  function fromHex(hex, alpha) {
    var c = parseColor(hex);
    if (!c) return hex;
    if (alpha >= 1) return toHex(c);
    // Keep the token's original transparency — the swatch only moves the hue.
    return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + round(alpha, 3) + ')';
  }

  function parseNumber(str) {
    var m = String(str).trim().match(/^(-?\d*\.?\d+)(px|rem|em|%|vw|vh|vmin|vmax|ms|s|deg)?$/);
    if (!m) return null;
    return { n: parseFloat(m[1]), unit: m[2] || '' };
  }

  function round(n, places) {
    var f = Math.pow(10, places == null ? 2 : places);
    return Math.round(n * f) / f;
  }

  /* Slider bounds that stay useful for the value they start from: opacity-ish
     numbers get 0–1, viewport units 0–100, lengths get room to roughly triple. */
  function sliderRange(num, name) {
    var v = Math.abs(num.n), u = num.unit;

    /* A token that names itself an alpha or an opacity is a 0–1 share even
       when it currently sits at exactly 1, where the rule below would read
       it as a small factor and hand back a slider three quarters wasted. */
    if (!u && /alpha|opacity/.test(name || '')) return { min: 0, max: 1, step: 0.01 };

    /* A token already sitting at a negative value has to keep the negative
       half of its slider, or the first drag snaps it to zero and the sign
       is gone — em tracking is the usual case. */
    var neg = num.n < 0;

    if (u === '%' || u === 'vw' || u === 'vh' || u === 'vmin' || u === 'vmax') return { min: neg ? -100 : 0, max: 100, step: 0.5 };
    if (u === 'deg') return { min: -360, max: 360, step: 1 };
    /* Unitless splits in two: below 1 is a share of something (an opacity,
       or a tracking figure in em) and wants the whole slider for 0–1; from
       1 up it is a line-height or a small factor, which wants 0–4. */
    if (!u && v < 1) return { min: neg ? -1 : 0, max: 1, step: 0.01 };
    if (!u && v <= 4) return { min: neg ? -4 : 0, max: 4, step: 0.01 };
    if (u === 's') return { min: neg ? -Math.max(5, v * 3) : 0, max: Math.max(5, v * 3), step: 0.05 };
    if (u === 'ms') return { min: neg ? -Math.max(1000, v * 3) : 0, max: Math.max(1000, v * 3), step: 10 };
    var max = v === 0 ? 100 : Math.ceil(Math.max(v * 3, v + 20));
    return { min: num.n < 0 ? -max : 0, max: max, step: v <= 2 ? 0.01 : (v <= 40 ? 0.5 : 1) };
  }

  /* ── Enumerated values ──────────────────────────────────────
     A third shape worth more than a text box: a token whose value is one of
     a closed set of keywords is a choice, not a string. Sixteen blend modes
     are not something to remember and spell -- they are something to walk
     down, watching the page change, which is the whole reason this panel
     exists.

     Matched on the VALUE, not the token name, so it needs no per-page
     configuration and no naming convention: set any token to `lighten` and
     the panel knows what kind of thing it is. That also means a set has to
     be unambiguous to be worth adding here -- these keywords appear in no
     other property's vocabulary. */

  var CHOICE_SETS = [
    ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
     'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
     'exclusion', 'hue', 'saturation', 'color', 'luminosity', 'plus-lighter']
  ];

  function choicesFor(value) {
    var v = String(value).trim().toLowerCase();
    for (var i = 0; i < CHOICE_SETS.length; i++) {
      if (CHOICE_SETS[i].indexOf(v) > -1) return CHOICE_SETS[i];
    }
    return null;
  }

  /* ── Token discovery ────────────────────────────────────────────────────
     Walk every same-origin rule. Declared tokens come from :root / html
     selectors. Referenced tokens are names the CSS reads through var() but
     never sets — worth exposing too, since setting one on :root overrides
     the inline fallback baked into the rule. */

  var VAR_USE = /var\(\s*(--[\w-]+)\s*(?:,\s*([^;]*?)\s*)?\)/g;

  function collectTokens() {
    var declared = new Map();
    var referenced = new Map();

    function visitRule(rule) {
      if (rule.cssRules) {
        for (var i = 0; i < rule.cssRules.length; i++) visitRule(rule.cssRules[i]);
      }
      if (!rule.style) return;

      var sel = rule.selectorText || '';
      var isRoot = /(^|,)\s*(:root|html)\b/.test(sel);

      for (var j = 0; j < rule.style.length; j++) {
        var name = rule.style[j];
        if (name.indexOf('--') !== 0) continue;
        if (isRoot && !declared.has(name)) {
          declared.set(name, rule.style.getPropertyValue(name).trim());
        }
      }

      var text = rule.style.cssText || '';
      var m;
      VAR_USE.lastIndex = 0;
      while ((m = VAR_USE.exec(text)) !== null) {
        if (!referenced.has(m[1])) referenced.set(m[1], (m[2] || '').trim());
      }
    }

    for (var s = 0; s < document.styleSheets.length; s++) {
      var rules;
      try { rules = document.styleSheets[s].cssRules; } catch (e) { continue; } // cross-origin webfonts
      if (!rules) continue;
      for (var r = 0; r < rules.length; r++) visitRule(rules[r]);
    }

    var computed = getComputedStyle(ROOT);

    /* A fallback can hold its own parens — `var(--ghost, rgba(25,23,18,.16))`
       or `var(--label, var(--blush))`. VAR_USE stops at the first ")", so the
       capture comes back one or more ")" short: close it, then if what's left
       is itself a var(), read that name off :root for a real value. */
    function resolveFallback(raw) {
      if (!raw) return raw;
      var open = (raw.match(/\(/g) || []).length;
      var close = (raw.match(/\)/g) || []).length;
      var balanced = raw + ')'.repeat(Math.max(0, open - close));

      var inner = /^var\(\s*(--[\w-]+)/.exec(balanced);
      if (!inner) return balanced;
      return computed.getPropertyValue(inner[1]).trim() || balanced;
    }

    var tokens = [];

    declared.forEach(function (value, name) {
      tokens.push({ name: name, value: computed.getPropertyValue(name).trim() || value, group: 'declared' });
    });

    referenced.forEach(function (fallback, name) {
      if (declared.has(name)) return;
      var live = computed.getPropertyValue(name).trim();
      tokens.push({ name: name, value: live || resolveFallback(fallback), group: 'referenced' });
    });

    return tokens;
  }

  /* ── Saved overrides ────────────────────────────────────────────────── */

  function loadOverrides() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch (e) { return {}; }
  }
  function saveOverrides(o) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(o)); } catch (e) {}
  }

  var overrides = loadOverrides();

  /* ── Panel ──────────────────────────────────────────────────────────── */

  var CSS = [
    ':host { all: initial; }',
    '* { box-sizing: border-box; font-family: ui-monospace, "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace; }',
    '.panel {',
    '  position: fixed; z-index: 2147483647; top: 16px; right: 16px;',
    '  width: 332px; max-height: calc(100vh - 32px);',
    '  display: flex; flex-direction: column;',
    '  background: #101012; color: #e8e8e8;',
    '  border: 1px solid #2e2e32; border-radius: 10px;',
    '  box-shadow: 0 18px 60px rgba(0,0,0,0.55);',
    '  font-size: 11px; line-height: 1.4;',
    '}',
    '.panel.collapsed .body, .panel.collapsed .bar { display: none; }',
    '.head { display: flex; align-items: center; gap: 8px; padding: 10px 12px;',
    '  border-bottom: 1px solid #232327; cursor: grab; user-select: none; }',
    '.head:active { cursor: grabbing; }',
    '.dot { width: 7px; height: 7px; background: #c8e899; flex: none; }',
    '.title { font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; font-size: 9px; }',
    '.count { margin-left: auto; color: #6d6d74; font-size: 9px; letter-spacing: 0.08em; }',
    '.iconbtn { appearance: none; border: 0; background: none; color: #8a8a92; cursor: pointer;',
    '  padding: 2px 5px; font-size: 12px; line-height: 1; border-radius: 4px; }',
    '.iconbtn:hover { background: #232327; color: #e8e8e8; }',
    '.bar { display: flex; gap: 6px; padding: 9px 12px; border-bottom: 1px solid #232327; }',
    '.filter { flex: 1; min-width: 0; appearance: none; background: #08080a;',
    '  border: 1px solid #2e2e32; border-radius: 5px; color: #e8e8e8; padding: 5px 7px; font-size: 10px; }',
    '.filter:focus { outline: none; border-color: #4a4a52; }',
    '.btn { appearance: none; border: 1px solid #2e2e32; background: #1a1a1e; color: #cfcfd4;',
    '  border-radius: 5px; padding: 5px 8px; font-size: 9px; letter-spacing: 0.06em;',
    '  text-transform: uppercase; font-weight: 700; cursor: pointer; white-space: nowrap; }',
    '.btn:hover { background: #26262c; color: #fff; }',
    '.btn.ok { border-color: #4d6b26; color: #c8e899; }',
    '.body { overflow-y: auto; overscroll-behavior: contain; padding: 4px 0 10px; }',
    '.body::-webkit-scrollbar { width: 9px; }',
    '.body::-webkit-scrollbar-thumb { background: #2b2b31; border-radius: 5px; }',
    '.group { padding: 12px 12px 5px; color: #5e5e66; font-size: 8px;',
    '  letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; }',
    '.row { padding: 6px 12px; border-left: 2px solid transparent; }',
    '.row.changed { border-left-color: #c8e899; background: rgba(200,232,153,0.035); }',
    '.row.hidden { display: none; }',
    '.rowhead { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }',
    '.name { color: #a8a8b0; font-size: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
    '.row.changed .name { color: #c8e899; }',
    '.revert { margin-left: auto; visibility: hidden; }',
    '.row.changed .revert { visibility: visible; }',
    '.controls { display: flex; align-items: center; gap: 6px; }',
    'input[type=color] { appearance: none; -webkit-appearance: none; flex: none; width: 26px; height: 24px;',
    '  padding: 0; cursor: pointer; background: none; border: 1px solid #34343a; border-radius: 4px; }',
    'input[type=color]::-webkit-color-swatch-wrapper { padding: 2px; }',
    'input[type=color]::-webkit-color-swatch { border: 0; border-radius: 2px; }',
    'input[type=range] { flex: 1; min-width: 0; accent-color: #c8e899; height: 24px; }',
    '.text, .num { appearance: none; background: #08080a; border: 1px solid #2e2e32; border-radius: 4px;',
    '  color: #e8e8e8; padding: 4px 6px; font-size: 10px; min-width: 0; }',
    '.text { flex: 1; }',
    'select.text { cursor: pointer; }',
    '.num { flex: none; width: 62px; text-align: right; }',
    '.text:focus, .num:focus { outline: none; border-color: #4a4a52; }',
    '.unit { flex: none; color: #5e5e66; font-size: 9px; width: 20px; }',
    '.toast { position: absolute; left: 12px; right: 12px; bottom: 10px; background: #c8e899;',
    '  color: #101012; border-radius: 5px; padding: 6px 9px; font-size: 9px; font-weight: 700;',
    '  letter-spacing: 0.1em; text-transform: uppercase; text-align: center;',
    '  opacity: 0; transition: opacity 0.18s ease; pointer-events: none; }',
    '.toast.show { opacity: 1; }',
    '.empty { padding: 18px 12px; color: #5e5e66; font-size: 10px; }'
  ].join('\n');

  var host = document.createElement('div');
  host.id = 'css-tuner';
  var shadow = host.attachShadow({ mode: 'open' });
  shadow.innerHTML =
    '<style>' + CSS + '</style>' +
    '<div class="panel">' +
      '<div class="head">' +
        '<span class="dot"></span><span class="title">tuner</span>' +
        '<span class="count"></span>' +
        '<button class="iconbtn" data-act="collapse" title="Collapse (Alt+T)">–</button>' +
        '<button class="iconbtn" data-act="close" title="Close for this tab">×</button>' +
      '</div>' +
      '<div class="bar">' +
        '<input class="filter" type="text" placeholder="filter tokens" spellcheck="false">' +
        '<button class="btn ok" data-act="copy-changed">Copy changed</button>' +
        '<button class="btn" data-act="reset">Reset</button>' +
      '</div>' +
      '<div class="body"></div>' +
      '<div class="toast"></div>' +
    '</div>';

  var panel = shadow.querySelector('.panel');
  var bodyEl = shadow.querySelector('.body');
  var countEl = shadow.querySelector('.count');
  var toastEl = shadow.querySelector('.toast');
  var filterEl = shadow.querySelector('.filter');

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.classList.remove('show'); }, 1400);
  }

  /* ── Rows ───────────────────────────────────────────────────────────── */

  var tokens = collectTokens();
  var rows = [];

  function apply(token, value) {
    ROOT.style.setProperty(token.name, value);
    overrides[token.name] = value;
    saveOverrides(overrides);
  }

  function revert(row) {
    ROOT.style.removeProperty(row.token.name);
    delete overrides[row.token.name];
    saveOverrides(overrides);
    row.setValue(row.token.original);
    row.el.classList.remove('changed');
  }

  function makeRow(token) {
    var original = token.value;
    token.original = original;

    var el = document.createElement('div');
    el.className = 'row';

    var head = document.createElement('div');
    head.className = 'rowhead';

    var name = document.createElement('span');
    name.className = 'name';
    name.textContent = token.name;
    name.title = token.name + ': ' + original + (token.group === 'referenced' ? '  (var() fallback)' : '');

    var revertBtn = document.createElement('button');
    revertBtn.className = 'iconbtn revert';
    revertBtn.textContent = '⟲';
    revertBtn.title = 'Revert to ' + original;

    head.appendChild(name);
    head.appendChild(revertBtn);

    var controls = document.createElement('div');
    controls.className = 'controls';

    var color = parseColor(original);
    var num = color ? null : parseNumber(original);
    var choices = (color || num) ? null : choicesFor(original);
    var setValue;

    if (color) {
      var swatch = document.createElement('input');
      swatch.type = 'color';
      swatch.value = toHex(color);

      var ctext = document.createElement('input');
      ctext.type = 'text';
      ctext.className = 'text';
      ctext.spellcheck = false;
      ctext.value = original;

      swatch.addEventListener('input', function () {
        var v = fromHex(swatch.value, color.a);
        ctext.value = v;
        commit(v);
      });
      ctext.addEventListener('input', function () {
        var c = parseColor(ctext.value);
        if (c) { swatch.value = toHex(c); color.a = c.a; }
        commit(ctext.value);
      });

      controls.appendChild(swatch);
      controls.appendChild(ctext);
      setValue = function (v) {
        ctext.value = v;
        var c = parseColor(v);
        if (c) swatch.value = toHex(c);
      };

    } else if (num) {
      var range = sliderRange(num, token.name);
      var slider = document.createElement('input');
      slider.type = 'range';
      slider.min = range.min;
      slider.max = range.max;
      slider.step = range.step;
      slider.value = num.n;

      var box = document.createElement('input');
      box.type = 'text';
      box.className = 'num';
      box.value = num.n;

      var unit = document.createElement('span');
      unit.className = 'unit';
      unit.textContent = num.unit;

      slider.addEventListener('input', function () {
        box.value = slider.value;
        commit(slider.value + num.unit);
      });
      box.addEventListener('input', function () {
        var v = parseFloat(box.value);
        if (isNaN(v)) return;
        slider.value = v;
        commit(v + num.unit);
      });

      controls.appendChild(slider);
      controls.appendChild(box);
      controls.appendChild(unit);
      setValue = function (v) {
        var p = parseNumber(v);
        if (!p) return;
        slider.value = p.n;
        box.value = p.n;
      };

    } else if (choices) {
      var pick = document.createElement('select');
      pick.className = 'text';
      choices.forEach(function (opt) {
        var o = document.createElement('option');
        o.value = o.textContent = opt;
        pick.appendChild(o);
      });
      pick.value = String(original).trim().toLowerCase();
      pick.addEventListener('change', function () { commit(pick.value); });
      controls.appendChild(pick);
      setValue = function (v) { pick.value = String(v).trim().toLowerCase(); };

    } else {
      var free = document.createElement('input');
      free.type = 'text';
      free.className = 'text';
      free.spellcheck = false;
      free.value = original;
      free.addEventListener('input', function () { commit(free.value); });
      controls.appendChild(free);
      setValue = function (v) { free.value = v; };
    }

    function commit(value) {
      apply(token, value);
      el.classList.toggle('changed', String(value).trim() !== original.trim());
    }

    el.appendChild(head);
    el.appendChild(controls);

    var row = { token: token, el: el, setValue: setValue };
    revertBtn.addEventListener('click', function () { revert(row); });

    // Reflect an override restored from a previous visit to this page.
    if (Object.prototype.hasOwnProperty.call(overrides, token.name)) {
      ROOT.style.setProperty(token.name, overrides[token.name]);
      setValue(overrides[token.name]);
      if (overrides[token.name].trim() !== original.trim()) el.classList.add('changed');
    }

    return row;
  }

  function render() {
    [
      { key: 'declared', label: 'declared on :root' },
      { key: 'referenced', label: 'referenced via var() fallback' }
    ].forEach(function (g) {
      var members = tokens.filter(function (t) { return t.group === g.key; });
      if (!members.length) return;

      var label = document.createElement('div');
      label.className = 'group';
      label.textContent = g.label + ' · ' + members.length;
      bodyEl.appendChild(label);

      members.forEach(function (t) {
        var row = makeRow(t);
        rows.push(row);
        bodyEl.appendChild(row.el);
      });
    });

    if (!tokens.length) {
      bodyEl.innerHTML = '<div class="empty">No custom properties found on this page.</div>';
    }
    countEl.textContent = tokens.length + ' tokens';
  }

  render();

  /* ── Toolbar ────────────────────────────────────────────────────────── */

  filterEl.addEventListener('input', function () {
    var q = filterEl.value.trim().toLowerCase();
    rows.forEach(function (r) {
      r.el.classList.toggle('hidden', !!q && r.token.name.toLowerCase().indexOf(q) === -1);
    });
  });

  function changedCSS() {
    var lines = rows
      .filter(function (r) { return r.el.classList.contains('changed'); })
      .map(function (r) { return '  ' + r.token.name + ': ' + overrides[r.token.name] + ';'; });
    return lines.length ? ':root {\n' + lines.join('\n') + '\n}' : '';
  }

  function copy(text) {
    function fallback() {
      // file:// and non-secure origins block the async clipboard API.
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      ta.remove();
      toast(ok ? 'copied' : 'copy blocked — see console');
      if (!ok) console.log(text);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast('copied'); }, fallback);
    } else {
      fallback();
    }
  }

  shadow.addEventListener('click', function (e) {
    var act = e.target.getAttribute && e.target.getAttribute('data-act');
    if (!act) return;

    if (act === 'collapse') {
      panel.classList.toggle('collapsed');

    } else if (act === 'close') {
      try { sessionStorage.removeItem('tuner:on'); } catch (err) {}
      host.remove();

    } else if (act === 'copy-changed') {
      var css = changedCSS();
      if (!css) { toast('nothing changed yet'); return; }
      copy(css);

    } else if (act === 'reset') {
      rows.forEach(revert);
      overrides = {};
      saveOverrides(overrides);
      toast('reset to file values');
    }
  });

  /* ── Drag + keyboard ────────────────────────────────────────────────── */

  (function draggable() {
    var head = shadow.querySelector('.head');
    var start = null;

    try {
      var pos = JSON.parse(localStorage.getItem(POS_KEY) || 'null');
      if (pos) {
        panel.style.left = pos.x + 'px';
        panel.style.top = pos.y + 'px';
        panel.style.right = 'auto';
      }
    } catch (e) {}

    head.addEventListener('mousedown', function (e) {
      if (e.target.closest('.iconbtn')) return;
      var r = panel.getBoundingClientRect();
      start = { dx: e.clientX - r.left, dy: e.clientY - r.top };
      e.preventDefault();
    });

    window.addEventListener('mousemove', function (e) {
      if (!start) return;
      panel.style.left = Math.max(0, Math.min(window.innerWidth - 60, e.clientX - start.dx)) + 'px';
      panel.style.top = Math.max(0, Math.min(window.innerHeight - 30, e.clientY - start.dy)) + 'px';
      panel.style.right = 'auto';
    });

    window.addEventListener('mouseup', function () {
      if (!start) return;
      start = null;
      var r = panel.getBoundingClientRect();
      try { localStorage.setItem(POS_KEY, JSON.stringify({ x: r.left, y: r.top })); } catch (e) {}
    });
  })();

  window.addEventListener('keydown', function (e) {
    if (e.altKey && (e.key === 't' || e.key === 'T')) {
      e.preventDefault();
      panel.classList.toggle('collapsed');
    }
  });

  (document.body || ROOT).appendChild(host);
})();
