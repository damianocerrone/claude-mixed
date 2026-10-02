#!/usr/bin/env node
/*
 * tools/check-guide.js: static checks for the Studio guide's chapter files.
 *
 *   node tools/check-guide.js            # all chapters listed in tutorial/studio/index.html
 *
 * For every step and beat it checks: the image exists; boxes, cursors and zooms lie inside 0..1; zooms are 2:1
 * (w === h in normalised units) and contain their highlight; cursors sit inside or right next to their highlight;
 * beat HTML uses only the allowed tags; ids are unique; and every in-guide link (#id) points at a chapter or step.
 * Exits with 1 when it finds an error, so it can run before every commit.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const GUIDE = path.join(ROOT, 'tutorial', 'studio');
const ALLOWED = new Set(['strong', 'em', 'a', 'kbd', 'br']);
const EPS = 0.002;

const html = fs.readFileSync(path.join(GUIDE, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="(chapters\/[^"]+)"><\/script>/g)].map((m) => m[1]);
const repeated = files.filter((f, i) => files.indexOf(f) !== i);

global.window = { COPLAN_TUTORIAL: { chapters: [] } };
for (const f of files) require(path.join(GUIDE, f));
const chapters = window.COPLAN_TUTORIAL.chapters;

const errors = [];
const warnings = [];
const ids = new Map();
const links = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);
const inUnit = (v) => typeof v === 'number' && v >= -EPS && v <= 1 + EPS;
const boxOk = (b) => Array.isArray(b) && b.length === 4 && b.every(inUnit) && b[0] + b[2] <= 1 + EPS && b[1] + b[3] <= 1 + EPS && b[2] > 0 && b[3] > 0;

function tags(where, s) {
  for (const m of String(s || '').matchAll(/<\/?([a-z0-9]+)[^>]*>/gi)) if (!ALLOWED.has(m[1].toLowerCase())) err(where, `tag <${m[1]}> is not allowed`);
  for (const m of String(s || '').matchAll(/href=['"]#([^'"]+)['"]/g)) links.push([where, m[1]]);
}

function seen(id, where) {
  if (ids.has(id)) err(where, `duplicate id "${id}" (also ${ids.get(id)})`);
  ids.set(id, where);
}

let steps = 0;
let beats = 0;
for (const ch of chapters) {
  seen(ch.id, `chapter ${ch.id}`);
  tags(`chapter ${ch.id} summary`, ch.summary);
  for (const st of ch.steps) {
    steps++;
    const w = `${ch.id} › ${st.id}`;
    seen(st.id, w);
    if (!st.image || !fs.existsSync(path.join(GUIDE, st.image))) err(w, `image missing: ${st.image}`);
    if (!st.alt || st.alt.length < 40) warn(w, 'alt text is missing or very short');
    if (st.url !== 'coplanai.ikonai.app') warn(w, `url is "${st.url}"`);
    tags(`${w} lead`, st.lead);
    if (st.note) tags(`${w} note`, st.note.html);
    (st.beats || []).forEach((b, i) => {
      beats++;
      const bw = `${w} beat ${i}`;
      tags(bw, b.html);
      const hl = b.highlight && b.highlight.box;
      if (b.highlight && !boxOk(hl)) err(bw, `highlight box out of range: ${JSON.stringify(hl)}`);
      if (b.zoom) {
        const z = b.zoom;
        if (!boxOk(z)) err(bw, `zoom out of range: ${JSON.stringify(z)}`);
        else {
          if (Math.abs(z[2] - z[3]) > EPS) err(bw, `zoom is not 2:1 (w ${z[2]} vs h ${z[3]})`);
          if (hl && boxOk(hl) && (hl[0] < z[0] - EPS || hl[1] < z[1] - EPS || hl[0] + hl[2] > z[0] + z[2] + EPS || hl[1] + hl[3] > z[1] + z[3] + EPS)) err(bw, 'zoom does not contain the highlight');
        }
      }
      if (b.cursor) {
        const [x, y] = b.cursor.at || [];
        if (!inUnit(x) || !inUnit(y)) err(bw, `cursor out of range: ${JSON.stringify(b.cursor.at)}`);
        else if (hl && boxOk(hl)) {
          const m = 0.01;
          if (x < hl[0] - m || x > hl[0] + hl[2] + m || y < hl[1] - m || y > hl[1] + hl[3] + m) warn(bw, 'cursor lies outside its highlight');
        }
      }
    });
  }
}

for (const f of repeated) err('index.html', `${f} is loaded more than once`);
for (const [where, id] of links) if (!ids.has(id)) err(where, `link to #${id}, which is not a chapter or step id`);

console.log(`${chapters.length} chapters, ${steps} steps, ${beats} beats`);
for (const w of warnings) console.log('warning ', w);
for (const e of errors) console.log('ERROR   ', e);
console.log(errors.length ? `${errors.length} error(s)` : 'no errors');
process.exitCode = errors.length ? 1 : 0;
