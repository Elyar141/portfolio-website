const src = require('fs').readFileSync('E:/portfolio website/tuner.js','utf8');
// Pull the pure helpers out of the IIFE and eval them in isolation.
const grab = (name) => {
  const i = src.indexOf('function ' + name + '(');
  if (i < 0) throw new Error('missing ' + name);
  let d = 0, j = src.indexOf('{', i);
  for (let k = j; k < src.length; k++) {
    if (src[k] === '{') d++;
    else if (src[k] === '}') { d--; if (!d) return src.slice(i, k + 1); }
  }
};
const NAMED = { white:'#ffffff', black:'#000000' };
eval([grab('parseColor'),grab('toHex'),grab('round'),grab('fromHex'),grab('parseNumber'),grab('sliderRange')].join('\n'));

const cases = [
  '#c8e899','#0a0a0a','#fff','#191712','rgba(25,23,18,.48)','rgba(200,232,153,0.7)',
  '#ede6ca','rgba(106,111,75,.55)','15px','64px','3px','480','0.9','-.073em','1.4',
  'clamp(20px, 4vw, 56px)','repeating-linear-gradient(90deg, red 0 3px, transparent 3px 9px)',
  'Geist,Arial,sans-serif','0.42s','100ms','56vw'
];
for (const c of cases) {
  const col = parseColor(c), num = col ? null : parseNumber(c);
  let kind = 'text', detail = '';
  if (col) { kind='color'; detail = toHex(col) + ' a=' + col.a + ' -> swatch#ff0000 gives ' + fromHex('#ff0000', col.a); }
  else if (num) { const r = sliderRange(num); kind='slider'; detail = `${num.n}${num.unit||'(none)'} range ${r.min}..${r.max} step ${r.step}`; }
  console.log(kind.padEnd(7), JSON.stringify(c).padEnd(62), detail);
}

// var() discovery regex, run over about5.html's real minified CSS
const VAR_USE = /var\(\s*(--[\w-]+)\s*(?:,\s*([^;]*?)\s*)?\)/g;
const html = require('fs').readFileSync('E:/portfolio website/about5.html','utf8');
const found = new Map(); let m;
while ((m = VAR_USE.exec(html)) !== null) if (!found.has(m[1])) found.set(m[1], m[2] || '');
console.log('\nvar() names found in about5.html:');
for (const [k,v] of found) console.log('  ' + k.padEnd(12) + (v ? 'fallback: ' + v : ''));
