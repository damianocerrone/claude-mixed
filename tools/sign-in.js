#!/usr/bin/env node
/*
 * tools/sign-in.js: signs the cloud browser (tools/cloud-browser.sh) in to CoPlanAI with an email code.
 *
 *   node tools/sign-in.js email <address>   opens the sign-in page, types the address and clicks Send code
 *   node tools/sign-in.js code <code>       types the code from the email and submits it
 *   node tools/sign-in.js check             reports whether the browser is signed in
 *
 * Options: --cdp <endpoint> (default http://127.0.0.1:9222), --url <app url> (default https://coplanai.ikonai.app/),
 *          --shots <dir> (default explore/sign-in) for a screenshot after every command.
 *
 * It works in the browser's first tab and leaves it open, so the session lives on in the browser's profile and
 * capture.js --cdp can use it straight away. Nothing it prints or saves contains the code.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const PLAYWRIGHT_FALLBACK = '/opt/node22/lib/node_modules/playwright';

function loadPlaywright() {
  try { return require('playwright'); } catch (e) { return require(PLAYWRIGHT_FALLBACK); }
}

function parseArgs(argv) {
  const args = { _: [], cdp: 'http://127.0.0.1:9222', url: 'https://coplanai.ikonai.app/', shots: path.join(REPO_ROOT, 'explore', 'sign-in') };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--cdp' || a === '--url' || a === '--shots') args[a.slice(2)] = argv[++i];
    else args._.push(a);
  }
  return args;
}

async function firstVisible(locators) {
  for (const loc of locators) {
    const n = await loc.count().catch(() => 0);
    for (let i = 0; i < n; i++) {
      const el = loc.nth(i);
      if (await el.isVisible().catch(() => false)) return el;
    }
  }
  return null;
}

/* What is on screen, for the log: visible inputs and buttons, never their values. */
async function describe(page) {
  return page.evaluate(() => {
    const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden'; };
    const name = (el) => (el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.innerText || el.name || el.type || '').trim().slice(0, 60);
    return {
      url: location.href,
      title: document.title,
      inputs: [...document.querySelectorAll('input')].filter(vis).map((el) => `${el.type}:${name(el)}`),
      buttons: [...document.querySelectorAll('button,[role=button]')].filter(vis).map(name).filter(Boolean).slice(0, 25),
    };
  });
}

async function snap(page, dir, label) {
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${new Date().toISOString().replace(/[:.]/g, '-')}-${label}.png`);
  await page.screenshot({ path: file });
  return file;
}

async function signedIn(page, appUrl) {
  // The sign-in card offers "Send code"; once signed in, the app shows the account avatar and the dashboard instead.
  if (new URL(page.url()).host !== new URL(appUrl).host) return false;
  const send = await firstVisible([page.getByRole('button', { name: /send code/i })]);
  return !send && !/login|sign-?in|auth/i.test(new URL(page.url()).pathname);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const [cmd, value] = args._;
  if (!/^(email|code|check)$/.test(cmd || '') || (cmd !== 'check' && !value)) {
    console.error('usage: node tools/sign-in.js email <address> | code <code> | check  [--cdp <endpoint>] [--url <app url>]');
    process.exit(64);
  }

  const { chromium } = loadPlaywright();
  const browser = await chromium.connectOverCDP(args.cdp);
  const context = browser.contexts()[0] || (await browser.newContext());
  const page = context.pages()[0] || (await context.newPage());
  await page.setViewportSize({ width: 1900, height: 950 });

  try {
    if (cmd === 'email') {
      await page.goto(args.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      const email = await firstVisible([
        page.getByRole('textbox', { name: /email/i }),
        page.getByPlaceholder(/email/i),
        page.locator('input[type=email]'),
      ]);
      if (!email) throw new Error('no email field on the sign-in page (already signed in? run: node tools/sign-in.js check)');
      await email.fill(value);
      const send = await firstVisible([page.getByRole('button', { name: /send code/i }), page.getByRole('button', { name: /send|continue/i })]);
      if (!send) throw new Error('no Send code button next to the email field');
      await send.click();
      await page.waitForTimeout(2500);
      console.log('Code requested. Now run: node tools/sign-in.js code <code from the email>');
    } else if (cmd === 'code') {
      const inputs = page.locator('input:visible');
      const n = await inputs.count();
      if (!n) throw new Error('no code field on screen; request a new code with: node tools/sign-in.js email <address>');
      const single = n === 1 || (await inputs.first().getAttribute('maxlength')) !== '1';
      if (single) await inputs.first().fill(value);
      else { await inputs.first().click(); await page.keyboard.type(value, { delay: 60 }); }   // one box per digit
      const submit = await firstVisible([page.getByRole('button', { name: /verify|sign in|log in|continue|submit|confirm/i })]);
      if (submit && (await submit.isEnabled())) await submit.click(); else await page.keyboard.press('Enter');
      await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
      await page.waitForTimeout(1500);
    } else if (new URL(page.url()).host !== new URL(args.url).host) {
      await page.goto(args.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(2000);
    }
    const state = await describe(page);
    const ok = await signedIn(page, args.url);
    console.log(JSON.stringify({ signedIn: ok, ...state, screenshot: await snap(page, args.shots, cmd) }, null, 2));
  } finally {
    await browser.close();   // over CDP this only disconnects; the browser, its tab and the session stay
  }
}

main().catch((e) => { console.error(String((e && e.message) || e).split('\n')[0]); process.exit(1); });
