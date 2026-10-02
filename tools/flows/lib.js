/*
 * Shared helpers for the Studio guide's capture flows (tools/flows/NN-*.js).
 *
 * Each flow drives the signed-in cloud browser (tools/cloud-browser.sh, CDP on :9222) in its own tab and takes the
 * guide's plates with tools/capture.js, so every highlight box comes from the element's measured position.
 * Plates go to tutorial/studio/img/, debug images (boxes drawn on the plate) to explore/debug/.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const capture = require('../capture');

const ROOT = path.resolve(__dirname, '..', '..');
const APP = 'https://coplanai.ikonai.app/coplanai';
const STUDIO = `${APP}/studio`;
const SANDBOX_SLUG = 'conceptual-plan-2026-10-02';            // "Downtown plan (Studio tutorial demo)"
const SANDBOX = `${STUDIO}/projects/${SANDBOX_SLUG}`;
const OUT = path.join(ROOT, 'tutorial', 'studio', 'img');
const DEBUG = path.join(ROOT, 'explore', 'debug');
const RAW = path.join(ROOT, 'explore', 'raw');

async function open() {
  const conn = await capture.connect({ cdp: process.env.CDP || 'http://127.0.0.1:9222' });
  return conn;
}

/* The app shows a dotted loader for several seconds after every navigation. */
async function go(page, url, settle = 7000) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(settle);
  // The app keeps a live connection; on a slow link it shows a blank page or "Connecting..." for a while.
  // Wait until real content is there (up to 90 s), then a little longer for images.
  const textLength = () => page.evaluate(() => document.body.innerText.trim().length).catch(() => 0);   // may run mid-navigation
  for (let i = 0; i < 45 && (await textLength()) < 200; i++) await page.waitForTimeout(2000);
  await page.waitForTimeout(1500);
}

/* A literal CSS-px rect covering several locators (for groups that have no single container). */
async function union(...locators) {
  const boxes = [];
  for (const l of locators) {
    const v = l.filter({ visible: true }).first();                 // skip hidden duplicates (the editors keep a hidden copy)
    const b = await v.boundingBox({ timeout: 3000 }).catch(() => null);
    if (b) boxes.push(b);
  }
  if (!boxes.length) return null;
  const x = Math.min(...boxes.map((b) => b.x));
  const y = Math.min(...boxes.map((b) => b.y));
  const r = Math.max(...boxes.map((b) => b.x + b.width));
  const btm = Math.max(...boxes.map((b) => b.y + b.height));
  return { x, y, width: r - x, height: btm - y };
}

/* The rect of the nearest ancestor of `loc` that is at least `minWidth` px wide and taller than the element itself
   (a section card around its heading, a tray around its label), optionally one whose text includes `mustInclude`. */
async function card(loc, { minWidth = 300, mustInclude = null } = {}) {
  return loc.filter({ visible: true }).first().evaluate((el, o) => {
    const h0 = el.getBoundingClientRect().height;
    for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
      const r = e.getBoundingClientRect();
      if (r.width >= o.minWidth && r.height > h0 + 20 && (!o.mustInclude || e.innerText.includes(o.mustInclude))) return { x: r.x, y: r.y, width: r.width, height: r.height };
    }
    return null;
  }, { minWidth, mustInclude });
}

/* The rect of the largest visible image or canvas on the page (the stage picture). */
async function stage(page) {
  return page.evaluate(() => {
    let best = null;
    for (const el of document.querySelectorAll('img, canvas')) {
      const r = el.getBoundingClientRect();
      const st = getComputedStyle(el);
      if (r.width < 200 || st.visibility === 'hidden' || st.display === 'none' || +st.opacity === 0) continue;
      if (!best || r.width * r.height > best.width * best.height) best = { x: r.x, y: r.y, width: r.width, height: r.height };
    }
    return best;
  });
}

/* Take a plate. Prints the snippet and any warnings; returns capture.shot's result. */
async function plate(page, name, opts = {}) {
  // A full reload (e.g. after Save boundary) can drop the 2x emulation; put it back before measuring.
  if ((await page.evaluate(() => window.devicePixelRatio)) !== 2) { await capture.emulateViewport(page); await page.waitForTimeout(800); }
  const res = await capture.shot(page, name, { out: OUT, debug: DEBUG, ...opts });
  console.log(`\n== ${name}\n${res.snippet || ''}`);
  if (res.warnings && res.warnings.length) console.log('WARN', res.warnings.join(' | '));
  return res;
}

/* A plain screenshot + page text for checking state (not a plate). */
async function raw(page, name) {
  fs.mkdirSync(RAW, { recursive: true });
  await page.screenshot({ path: path.join(RAW, `${name}.png`), timeout: 60000 });
  const text = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync(path.join(RAW, `${name}.txt`), `${page.url()}\n\n${text}`);
  return text;
}

module.exports = { capture, ROOT, APP, STUDIO, SANDBOX, SANDBOX_SLUG, OUT, DEBUG, RAW, open, go, union, card, stage, plate, raw };
