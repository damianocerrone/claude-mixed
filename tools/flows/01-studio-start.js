#!/usr/bin/env node
/*
 * Studio guide, chapter 1 (studio-start): "Find your way into Studio".
 *
 * Takes the chapter's plates in its own tab of the signed-in cloud browser (CDP on :9222), VIEW ONLY:
 * it navigates, scrolls, hovers and opens one dropdown and one card menu, and closes them with Escape.
 * It never clicks Create project, New project, Report, Duplicate, Archive, Apply or anything else that changes data,
 * and it never clicks the logo inside Studio.
 *
 * Literal rects (unions of several elements) are measured before the shot, so every section first hides the
 * scrollbars the way capture.js does during the shot: otherwise the layout widens by the scrollbar's 15 px after
 * measuring and the rects come out short on the right (they cut through Create project on Studio home).
 *
 *   node tools/flows/01-studio-start.js                 # every plate
 *   node tools/flows/01-studio-start.js home menu       # only some sections (names below)
 *
 * Plates: tutorial/studio/img/1-0N-*.webp (+ .json); debug images: explore/debug/1-0N-*.debug.png.
 */
'use strict';

const L = require('./lib');

const EXISTING = `${L.STUDIO}/projects/conceptual-plan-2026-09-28-2/ideation`; // has generated images; view only
const SANDBOX_NAME = 'Downtown plan (Studio tutorial demo)';
const EMAIL = ['text=/@coplanai\\.com/'];

/* The innermost element that matches `selector` and contains every locator in `has`. */
function innermost(page, selector, ...has) {
  let loc = page.locator(selector);
  for (const h of has) loc = loc.filter({ has: h });
  return loc.last();
}

/* The first element among `loc` whose top edge is within [y0, y1) CSS px. */
async function atY(loc, y0, y1) {
  const n = await loc.count();
  for (let i = 0; i < n; i++) {
    const b = await loc.nth(i).boundingBox().catch(() => null);
    if (b && b.y >= y0 && b.y < y1) return loc.nth(i);
  }
  return null;
}

/* The tight rect of an element's text (a block element's own box is often as wide as the page). */
async function textBox(loc) {
  if (!loc) return null;
  const h = await loc.filter({ visible: true }).first().elementHandle({ timeout: 3000 }).catch(() => null);
  if (!h) return null;
  return h.evaluate((el) => {
    const r = document.createRange();
    r.selectNodeContents(el);
    const b = r.getBoundingClientRect();
    return b.width ? { x: b.x, y: b.y, width: b.width, height: b.height } : null;
  });
}

/* A union of literal rects (skips nulls). */
function rectUnion(...rects) {
  const rs = rects.filter(Boolean);
  if (!rs.length) return null;
  const x = Math.min(...rs.map((r) => r.x));
  const y = Math.min(...rs.map((r) => r.y));
  const right = Math.max(...rs.map((r) => r.x + r.width));
  const bottom = Math.max(...rs.map((r) => r.y + r.height));
  return { x, y, width: right - x, height: bottom - y };
}

/* One literal rect around any mix of locators, rects and nulls (measured now, so call it before opening a popover). */
async function box(...items) {
  const rects = [];
  for (const it of items) {
    if (!it) continue;
    if (typeof it.x === 'number' && typeof it.width === 'number') rects.push(it);
    else rects.push(await L.union(it));
  }
  return rectUnion(...rects);
}

/* Scroll Studio's main column (the tallest scrollable element) to `to` px, or to the bottom. */
async function scrollMain(page, to = 'bottom') {
  await page.evaluate((to) => {
    const els = [...document.querySelectorAll('*')].filter((e) => {
      const s = getComputedStyle(e);
      return /(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 10;
    });
    els.sort((a, b) => b.clientWidth * b.clientHeight - a.clientWidth * a.clientHeight);
    const el = els[0];
    if (el) el.scrollTop = to === 'bottom' ? el.scrollHeight : to;
  }, to);
  await page.waitForTimeout(800);
}

/* Hide scrollbars now, with the same CSS capture.js applies during a shot, so literal rects measured before the
 * shot match the layout in the image. Lasts until the next navigation. */
async function noScrollbars(page) {
  await page.addStyleTag({ content: '*{scrollbar-width:none!important}*::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}' });
  await page.waitForTimeout(300);
}

/* Navigate, then hide the scrollbars before anything is measured. */
async function go(page, url, settle) {
  // The app may redirect once while lib.go checks for "Connecting..."; that check then loses its page context.
  await L.go(page, url, settle).catch(async (e) => {
    if (!/Execution context was destroyed|navigation/i.test(e.message)) throw e;
    await page.waitForTimeout(3000);
  });
  // On a slow link the page can still be a bare loader (no text at all) after the settle time.
  await page.waitForFunction(() => document.body.innerText.trim().length > 50, null, { timeout: 90000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await noScrollbars(page);
}

/* Close an open popover (card menu or dropdown) with Escape and wait for it to go. */
async function escape(page) {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(900);
}

const sections = {
  /* 1-01 The app dashboard: the Studio card and Open Studio. */
  async dashboard(page) {
    await go(page, L.APP);
    await page.mouse.move(5, 940);
    const open = page.getByRole('button', { name: 'Open Studio' });
    const startHead = page.getByText('Start a new project', { exact: true });
    const card = innermost(page, 'div', open, startHead);
    const drop = page.getByRole('button', { name: /Drop or add the site plan/ });
    const icons = await box(
      page.getByRole('link', { name: 'Open my gallery' }),
      page.getByRole('button', { name: 'Open app settings' }),
      page.getByRole('button', { name: 'Account menu' })
    );
    await L.plate(page, '1-01-dashboard', {
      highlights: {
        card: { locator: card, label: 'Studio card' },
        open: { locator: open, label: 'Open Studio' },
        form: { locator: await box(startHead, page.getByRole('button', { name: 'Choose from existing' }), drop), label: 'New-project form' },
        icons: { locator: icons, label: 'App icons' },
      },
      points: { open },
      mask: EMAIL,
    });
  },

  /* 1-02 Studio home, top: breadcrumb, greeting, new-project form. */
  async home(page) {
    await go(page, L.STUDIO);
    await page.mouse.move(1000, 940);
    const crumbStudio = page.getByRole('button', { name: 'Studio', exact: true });
    const crumbHome = await atY(page.getByText('Home', { exact: true }), 0, 45);
    const date = page.getByText(/(monday|tuesday|wednesday|thursday|friday|saturday|sunday),?\s+\d+\s+\w+\s+\d{4}/i);
    const hello = page.getByText(/^Good (morning|afternoon|evening|night)/);
    const ready = page.getByText('Ready to shape the next plan?', { exact: true });
    const greeting = rectUnion(await textBox(date), await textBox(hello), await textBox(ready));
    const named = page.getByText(/^The project is named for you/);
    const choose = page.getByRole('button', { name: 'Choose from existing' });
    const create = page.getByRole('button', { name: 'Create project' });
    const drop = page.getByRole('button', { name: /Drop or add the site plan/ });
    await L.plate(page, '1-02-studio-home', {
      highlights: {
        crumb: { locator: await box(crumbStudio, crumbHome), label: 'Where you are' },
        greeting: { locator: greeting, label: 'Greeting' },
        form: { locator: await box(choose, drop, create, named), pad: 10, label: 'New-project form' },
        create: { locator: create, label: 'Create project' },
      },
      points: { form: { locator: drop, click: false }, create: { locator: create, click: false } },
      mask: EMAIL,
    });
  },

  /* 1-03 The Studio menu, with the tooltip of the first header button. */
  async menu(page) {
    await go(page, L.STUDIO);
    const move = page.getByRole('button', { name: 'Move panel to the right side' });
    const collapse = page.getByRole('button', { name: 'Collapse menu' });
    const group = async (title, ...items) =>
      box(page.getByText(new RegExp(`^${title}$`, 'i')).first(), ...items.map((n) => page.getByRole('button', { name: n, exact: true })));
    const general = await group('general', 'Home', 'Projects', 'Uploaded images', 'Videos', 'Upscale');
    const library = await group('library', 'Mood boards & style refs', 'Planning presets');
    const org = await group('organisation', 'Team & permissions', 'Audit log', 'Settings');
    await move.hover();
    await page.waitForTimeout(900);
    await L.plate(page, '1-03-studio-menu', {
      highlights: {
        general: { locator: general, label: 'General' },
        library: { locator: library, label: 'Library' },
        org: { locator: org, label: 'Organisation' },
        move: { locator: move, label: 'Move panel to the right side' },
        collapse: { locator: collapse, label: 'Collapse menu' },
      },
      points: { move: { locator: move, click: false }, collapse: { locator: collapse, click: false } },
      mask: EMAIL,
    });
    await page.mouse.move(1000, 600);
  },

  /* 1-04 Studio home, scrolled: Recent projects and All projects. */
  async recent(page) {
    await go(page, L.STUDIO);
    await scrollMain(page, 'bottom');
    await page.mouse.move(1000, 30);
    const head = page.getByText('Recent projects', { exact: true });
    const all = page.getByRole('button', { name: 'All projects' });
    const cardImg = page.getByRole('button', { name: `Open ${SANDBOX_NAME}` });
    const more = page.getByRole('button', { name: `More actions for ${SANDBOX_NAME}` });
    const cards = page.getByRole('button', { name: /^Open / });
    const n = await cards.count();
    const cardList = [];
    for (let i = 0; i < n; i++) cardList.push(cards.nth(i));
    // A card = its image (role=button "Open <name>") plus the body below it: take the image's parent tile.
    const tile = innermost(page, 'div', cardImg, more);
    await L.plate(page, '1-04-recent-projects', {
      highlights: {
        recent: { locator: await box(head, all, ...cardList, tile), label: 'Recent projects' },
        card: { locator: tile, label: 'Project card' },
        all: { locator: all, label: 'All projects' },
        more: { locator: more, label: 'More actions', shape: 'circle' },
      },
      points: { card: { locator: cardImg }, all, more: { locator: more, click: false } },
      mask: EMAIL,
    });
  },

  /* 1-05 The Projects page, with the status filter open. The open dropdown hides the rest of the page from role
   * queries, so everything outside it is measured first. */
  async projects(page) {
    await go(page, `${L.STUDIO}/projects`);
    await page.mouse.move(1000, 30);
    const title = page.getByText('Projects', { exact: true });
    const heading = await atY(title, 60, 100);
    const head = await box(heading && (await textBox(heading)), await textBox(page.getByText(/^\d+ projects?$/)));
    const search = await box(page.getByPlaceholder(/Search projects/));
    const combos = page.getByRole('combobox');
    const status = await box(combos.nth(0));
    const process = await box(combos.nth(2));
    const others = await box(combos.nth(1), combos.nth(2), combos.nth(3));
    const firstImg = page.getByRole('button', { name: `Open ${SANDBOX_NAME}` });
    const firstMore = page.getByRole('button', { name: `More actions for ${SANDBOX_NAME}` });
    const tile = await box(innermost(page, 'div', firstImg, firstMore));
    await combos.nth(0).click();
    await page.waitForTimeout(1000);
    const list = page.getByRole('listbox');
    const archived = page.getByRole('option', { name: 'Archived' });
    await L.plate(page, '1-05-projects', {
      highlights: {
        head: { locator: head, label: 'Project count' },
        search: { locator: search, label: 'Search' },
        status: { locator: await box(status, list), label: 'Status' },
        others: { locator: others, label: 'Owner, process, sort' },
        card: { locator: tile, label: 'Project card' },
      },
      points: {
        search: { locator: search, anchor: [0.25, 0.5] },
        status: { locator: archived, click: false },
        others: { locator: process, click: false },
      },
      mask: EMAIL,
    });
    await escape(page);
  },

  /* 1-06 A project card's ••• menu, opened on the sandbox card and closed with Escape. Nothing in it is clicked. */
  async cardmenu(page) {
    await go(page, `${L.STUDIO}/projects`);
    await page.mouse.move(1000, 30);
    const moreBtn = page.getByRole('button', { name: `More actions for ${SANDBOX_NAME}` });
    const more = await box(moreBtn);
    const menu = page.locator('.radix-popover__content[data-state="open"]');
    await moreBtn.click();
    // The menu opens after a round trip to the server, which can take several seconds on a slow link.
    await menu.getByRole('button', { name: 'Archive', exact: true }).waitFor({ timeout: 30000 });
    await page.waitForTimeout(800);
    await page.mouse.move(1000, 30);
    const item = (name) => menu.getByRole('button', { name, exact: true });
    await L.plate(page, '1-06-card-menu', {
      highlights: {
        more: { locator: more, label: 'More actions', shape: 'circle' },
        menu: { locator: menu, label: 'Card menu' },
        open: { locator: await box(item('Open project'), item('Project setup')), label: 'Open or set up' },
        change: { locator: await box(item('Duplicate'), item('Archive')), label: 'Duplicate or archive' },
        // Not a beat of its own: its suggested zoom (button + menu) is the one zoom shared by the step's beats.
        area: { locator: await box(more, menu), label: 'Card menu area' },
      },
      points: {
        more: { locator: more },
        open: { locator: item('Project setup'), click: false },
        change: { locator: item('Archive'), click: false },
      },
      mask: EMAIL,
    });
    await escape(page);
    if (await menu.count()) await page.mouse.click(1000, 100); // empty page header area
  },

  /* 1-07 Inside a project with images (view only): breadcrumb, Ideation | Production, Actions panel, images. */
  async project(page) {
    await go(page, EXISTING, 9000);
    await page.mouse.move(1000, 800);
    const crumbStudio = page.getByRole('button', { name: 'Studio', exact: true });
    const crumbProject = page.getByRole('button', { name: 'Conceptual Plan 2026-09-28 2', exact: true });
    const ideation = page.getByRole('button', { name: 'Ideation', exact: true });
    const production = page.getByRole('button', { name: 'Production', exact: true });
    const tabNames = ['Site', 'Quick actions', 'Presets', 'Touch-up', 'Adjust', 'Prompt', 'Impact'];
    const tabs = await box(...tabNames.map((n) => page.getByRole('button', { name: n, exact: true })));
    const tools = await box(
      page.getByRole('button', { name: 'All images', exact: true }),
      page.getByRole('button', { name: 'Save as planning preset' }),
      page.getByRole('button', { name: 'Project settings' })
    );
    const layout = await box(
      page.getByRole('button', { name: 'Move panel to the right side' }),
      page.getByRole('button', { name: 'Collapse panel' })
    );
    const select = page.getByRole('button', { name: 'Select', exact: true });
    const newConcept = page.getByRole('button', { name: 'New concept' });
    const area = innermost(page, 'div', select, newConcept);
    const apply = page.getByRole('button', { name: /^Apply to/ });
    const caption = page.getByText(/^Each run generates/);
    await page.getByRole('button', { name: 'Quick actions', exact: true }).hover(); // its tooltip shows the tab's name
    await page.waitForTimeout(1000);
    await L.plate(page, '1-07-project', {
      highlights: {
        crumb: { locator: await box(crumbStudio, crumbProject), label: 'Breadcrumb' },
        switch: { locator: await box(ideation, production), label: 'Ideation | Production' },
        panel: { locator: await box(tools, tabs), label: 'Panel tabs' },
        layout: { locator: layout, label: 'Panel layout' },
        images: { locator: await box(area, page.getByRole('button', { name: /^Concept A/ })), label: 'Images' },
        apply: { locator: await box(apply, caption), label: 'Apply' },
      },
      points: {
        crumb: { locator: crumbStudio },
        switch: { locator: production, click: false },
        panel: { locator: page.getByRole('button', { name: 'Quick actions', exact: true }), click: false },
        apply: { locator: apply, click: false },
      },
      mask: EMAIL,
    });
  },
};

(async () => {
  const want = process.argv.slice(2);
  const names = want.length ? want : Object.keys(sections);
  for (const n of names) if (!sections[n]) throw new Error(`unknown section "${n}" (use: ${Object.keys(sections).join(', ')})`);
  const { page, close } = await L.open();
  try {
    for (const n of names) {
      console.log(`\n### ${n}`);
      await sections[n](page);
    }
  } finally {
    await close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
