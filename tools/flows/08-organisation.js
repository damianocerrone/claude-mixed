#!/usr/bin/env node
/*
 * Studio guide, chapter 8 (organisation): "Studio for your organisation".
 *
 * Takes the chapter's plates in its own tab of the signed-in cloud browser (CDP on :9222), VIEW ONLY:
 * it navigates, scrolls, opens the two "New ..." library dialogs and closes them with Cancel, opens the audit-log
 * filter and closes it with Escape, expands one audit row's Details and one Settings PREVIEW disclosure.
 * It never clicks Delete, Save & make Active, Create planning preset, New team, Add member, Link a project,
 * Refresh, Save configuration, any row pencil / revert / trash / + Add, or anything else that changes data,
 * and it never clicks the logo inside Studio.
 *
 *   node tools/flows/08-organisation.js                  # every plate
 *   node tools/flows/08-organisation.js uploads team     # only some sections (names below)
 *
 * Plates: tutorial/studio/img/8-0N-*.webp (+ .json); debug images: explore/debug/8-0N-*.debug.png.
 *
 * Uploaded images, Team & permissions and Audit log have no URL of their own (the address bar stays on
 * /studio/projects), so the flow reaches them from the Studio menu.
 *
 * The upload cards' "View full size" / "Delete" row is hover-only (CSS: opacity 0 unless the device reports
 * hover), and this headless browser reports (hover: none). The flow therefore shows the row on the one card the
 * pointer is over with a local style, which is what a mouse user sees when hovering that card.
 */
'use strict';

const L = require('./lib');

const EMAIL = ['text=/@coplanai\\.com/'];
const MAIN_X = 360; // the Studio menu ends at x 351; page content starts at 376

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

/* The part of `r` inside `clip` (both CSS-px rects), or null. */
function intersect(r, clip) {
  if (!r || !clip) return r;
  const x = Math.max(r.x, clip.x);
  const y = Math.max(r.y, clip.y);
  const right = Math.min(r.x + r.width, clip.x + clip.width);
  const bottom = Math.min(r.y + r.height, clip.y + clip.height);
  return right > x && bottom > y ? { x, y, width: right - x, height: bottom - y } : null;
}

/* The rect of one element (the first visible match). */
async function rect(loc) {
  if (!loc) return null;
  if (typeof loc.x === 'number') return loc;
  return loc.filter({ visible: true }).first().boundingBox({ timeout: 3000 }).catch(() => null);
}

/* One literal rect around any mix of locators, rects and nulls (measured now). */
async function box(...items) {
  const rects = [];
  for (const it of items) rects.push(await rect(it));
  return rectUnion(...rects);
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

/* The first match of `loc` that sits in the page content (right of the Studio menu), optionally within [y0, y1). */
async function inMain(loc, y0 = -1e9, y1 = 1e9) {
  const n = await loc.count();
  for (let i = 0; i < n; i++) {
    const b = await loc.nth(i).boundingBox().catch(() => null);
    if (b && b.x >= MAIN_X && b.y >= y0 && b.y < y1) return loc.nth(i);
  }
  return null;
}

/* The page title and subtitle at the top of a Studio page, as one rect around their text. */
async function pageHead(page, title, subtitleRe) {
  const t = await inMain(page.getByText(title, { exact: true }), 60, 100);
  return rectUnion(await textBox(t), await textBox(page.getByText(subtitleRe)));
}

/* Scroll the nearest scrollable ancestor of `loc` so that the element's top edge sits at `y` CSS px. */
async function scrollTo(page, loc, y) {
  const h = await loc.filter({ visible: true }).first().elementHandle({ timeout: 5000 });
  await h.evaluate((el, y) => {
    let sc = el.parentElement;
    while (sc && sc !== document.body && !(/(auto|scroll)/.test(getComputedStyle(sc).overflowY) && sc.scrollHeight > sc.clientHeight + 10)) sc = sc.parentElement;
    if (!sc || sc === document.body) sc = document.scrollingElement;
    sc.scrollTop += el.getBoundingClientRect().top - y;
  }, y);
  await page.waitForTimeout(900);
}

/* Open a page from the Studio menu (for the pages that have no URL of their own). */
async function fromMenu(page, name) {
  await L.go(page, L.STUDIO);
  await page.getByRole('button', { name, exact: true }).click();
  await page.waitForTimeout(5000);
}

/* The open dialog's scrolling body: { rect, scroll(to) }. */
async function dialogBody(page) {
  const dlg = page.getByRole('dialog');
  const r = await dlg.evaluate((d) => {
    const sc = [...d.querySelectorAll('*')].find((e) => /(auto|scroll)/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 5);
    if (!sc) return null;
    sc.setAttribute('data-guide-scroll', '1');
    const b = sc.getBoundingClientRect();
    return { x: b.x, y: b.y, width: b.width, height: b.height };
  });
  return {
    rect: r,
    async scroll(to) {
      await page.evaluate((to) => {
        const sc = document.querySelector('[data-guide-scroll]');
        if (sc) sc.scrollTop = to === 'bottom' ? sc.scrollHeight : to;
      }, to);
      await page.waitForTimeout(800);
    },
  };
}

/* Blur the focused field so no focus ring or caret shows (the dialogs focus Name when they open). */
async function blur(page) {
  await page.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur());
  await page.waitForTimeout(300);
}

/* Close a dialog with its Cancel button and check it is gone. */
async function cancel(page) {
  await page.getByRole('dialog').getByRole('button', { name: 'Cancel', exact: true }).click();
  for (let i = 0; i < 20 && (await page.getByRole('dialog').count()); i++) await page.waitForTimeout(700); // ~2 s close animation
  if (await page.getByRole('dialog').count()) {
    await L.raw(page, '8-cancel-failed');
    const info = await page.evaluate(() => [...document.querySelectorAll('[role=dialog]')].map((d) => [d.getAttribute('data-state'), d.innerText.slice(0, 80)]));
    throw new Error(`dialog still open after Cancel: ${JSON.stringify(info)}`);
  }
}

/* A label and the control(s) under it, as one rect. `label` is exact text inside `scope`. */
async function field(scope, label, ...controls) {
  return box(await textBox(scope.getByText(label, { exact: true })), ...controls);
}

const sections = {
  /* 8-01 Uploaded images: filters, Used N× / Unused, and the hover actions of the Unused card. */
  async uploads(page) {
    await fromMenu(page, 'Uploaded images');
    const head = await pageHead(page, 'Uploaded images', /^Every image uploaded into this Studio/);
    const combos = page.getByRole('combobox');
    const filters = await box(
      await textBox(page.getByText('Usage', { exact: true })),
      combos.nth(0), combos.nth(1), combos.nth(2)
    );
    const sort = await box(await textBox(page.getByText('Sort', { exact: true })), combos.nth(3));
    const usage = await rect(combos.nth(0));
    const used = page.getByText(/^Used \d+×$/).first();
    const usedBox = await textBox(used);
    // The card around the "Unused" badge, and its hover-only action row.
    const unusedCard = page.locator('div.group').filter({ has: page.getByText('Unused', { exact: true }) }).last();
    if (!(await unusedCard.count())) throw new Error('no Unused upload card');
    await unusedCard.evaluate((el) => {
      const row = [...el.querySelectorAll('div')].find((d) => getComputedStyle(d).opacity === '0' && d.querySelector('button'));
      if (row) row.style.opacity = '1';
    });
    await unusedCard.hover();
    await page.waitForTimeout(800);
    const view = unusedCard.getByRole('button', { name: 'View full size' });
    const del = unusedCard.getByRole('button', { name: 'Delete' });
    const unusedBadge = await textBox(unusedCard.getByText('Unused', { exact: true }));
    await L.plate(page, '8-01-uploads', {
      highlights: {
        head: { locator: head, label: 'Uploaded images' },
        filters: { locator: rectUnion(filters, sort), label: 'Filters and sort' },
        used: { locator: usedBox, label: 'Used', pad: 9 },
        card: { locator: unusedCard, label: 'Unused' },
        view: { locator: view, label: 'View full size', shape: 'circle' },
        del: { locator: del, label: 'Delete', shape: 'circle' },
      },
      points: {
        filters: { locator: usage },
        card: { locator: unusedBadge, click: false },
        view: { locator: view },
        del: { locator: del, click: false },
      },
      mask: EMAIL,
    });
    await page.mouse.move(1000, 800);
  },

  /* 8-02 Mood boards & style refs: the New preset dialog, scrolled to its sharing choices. Closed with Cancel. */
  async moodboard(page) {
    await L.go(page, `${L.STUDIO}/library/presets`);
    await L.raw(page, '8-02-moodboards-page');
    await page.getByRole('button', { name: 'New preset' }).first().click();
    await page.waitForTimeout(2000);
    const dlg = page.getByRole('dialog');
    const body = await dialogBody(page);
    await body.scroll('bottom');
    await blur(page);
    await page.mouse.move(1700, 600);
    const clip = (r) => intersect(r, body.rect);
    const drop = dlg.getByText(/Drop images here or click to upload/);
    const library = dlg.getByRole('button', { name: 'Choose from library' });
    const genDesc = dlg.getByRole('button', { name: 'Generate description' });
    const desc = dlg.locator('textarea');
    const tags = dlg.getByText('Select a tag…', { exact: true });
    // The State and Scope choices are cards (no role=radio): take the card around each option's title.
    const option = (re) => dlg.getByText(re).first();
    const optionCard = async (re) => option(re).evaluate((el) => {
      for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
        const b = e.getBoundingClientRect();
        if (b.width > 900 && b.height > 40) return { x: b.x, y: b.y, width: b.width, height: b.height };
      }
      return null;
    });
    const rc = [
      await optionCard(/^Active — available to everyone/), await optionCard(/^Draft — visible only to me/),
      await optionCard(/^Shared$/), await optionCard(/^Project-only$/),
    ];
    const dropZone = await drop.evaluate((el) => {
      for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
        const b = e.getBoundingClientRect();
        if (b.width > 900 && b.height > 60) return { x: b.x, y: b.y, width: b.width, height: b.height };
      }
      return null;
    });
    const save = dlg.getByRole('button', { name: 'Save & make Active' });
    const footer = await box(await textBox(dlg.getByText(/^Adding as /)), save);
    await L.plate(page, '8-02-mood-board', {
      highlights: {
        images: { locator: clip(await box(dropZone, library)), label: 'Reference images' },
        desc: { locator: clip(await field(dlg, 'Description', desc, genDesc)), label: 'Description' },
        tags: { locator: clip(await field(dlg, 'Tags', await optionCard(/^Select a tag…$/))), label: 'Tags' },
        share: { locator: clip(await box(await field(dlg, 'State', rc[0], rc[1]), await field(dlg, 'Scope', rc[2], rc[3]))), label: 'State and scope' },
        save: { locator: footer, label: 'Save & make Active' },
      },
      points: {
        images: { locator: library },
        desc: { locator: genDesc, click: false },
        share: { locator: option(/^Draft — visible only to me/), click: false },
        save: { locator: save, click: false },
      },
      mask: EMAIL,
    });
    await cancel(page);
  },

  /* 8-03 Planning presets: the New planning preset dialog (top). Closed with Cancel. */
  async planning(page) {
    await L.go(page, `${L.STUDIO}/library/directions`);
    await L.raw(page, '8-03-planning-page');
    await page.getByRole('button', { name: 'New planning preset' }).first().click();
    await page.waitForTimeout(2000);
    const dlg = page.getByRole('dialog');
    const body = await dialogBody(page);
    await body.scroll(0);
    await blur(page);
    await page.mouse.move(1700, 600);
    const clip = (r) => intersect(r, body.rect);
    const inputs = dlg.locator('input[type="text"], input:not([type])');
    const textareas = dlg.locator('textarea');
    const combos = dlg.getByRole('combobox');
    const chips = ['Conceptual plans', 'Master plans', 'Focus areas'].map((n) => dlg.getByRole('button', { name: n, exact: true }));
    const pick = dlg.getByRole('button', { name: /pick from library/ });
    const gen = dlg.getByRole('button', { name: 'Generate', exact: true });
    const create = dlg.getByRole('button', { name: 'Create planning preset' });
    const footer = await box(await textBox(dlg.getByText(/^Adding as /)), create);
    const nameDesc = await box(await textBox(dlg.getByText('Name', { exact: true })), inputs.first(), textareas.nth(0));
    await L.plate(page, '8-03-planning-preset', {
      highlights: {
        name: { locator: clip(nameDesc), label: 'Name and description' },
        available: { locator: clip(await field(dlg, 'Available for', ...chips)), label: 'Available for' },
        direction: { locator: clip(await box(await textBox(dlg.getByText('Render style', { exact: true })), combos.nth(0), combos.nth(1), combos.nth(2))), label: 'Style, layout, creativity' },
        refs: { locator: clip(await field(dlg, 'Recommended references', pick)), label: 'Recommended references' },
        descriptor: { locator: clip(await field(dlg, 'Descriptor text', gen, textareas.nth(1))), label: 'Descriptor text' },
        create: { locator: footer, label: 'Create planning preset' },
      },
      points: {
        available: { locator: chips[2], click: false },
        direction: { locator: combos.nth(0) },
        refs: { locator: pick, click: false },
        descriptor: { locator: gen, click: false },
        create: { locator: create, click: false },
      },
      mask: EMAIL,
    });
    // A check image of the dialog's lower half (Card thumbnail, Visibility), for the text; not a plate.
    await body.scroll('bottom');
    await L.raw(page, '8-03-planning-preset-bottom');
    await cancel(page);
  },

  /* 8-04 Team & permissions: the rule, a team card, New team. Nothing is added, linked or removed. */
  async team(page) {
    await fromMenu(page, 'Team & permissions');
    await page.mouse.move(1000, 30);
    const head = await pageHead(page, 'Team & permissions', /^Group people into teams/);
    const ruleText = page.getByText(/^A project is editable only by its creator by default/);
    const rule = await ruleText.evaluate((el) => {
      for (let e = el; e && e !== document.body; e = e.parentElement) {
        const b = e.getBoundingClientRect();
        if (b.width > 1200 && b.height > 30) return { x: b.x, y: b.y, width: b.width, height: b.height };
      }
      return null;
    });
    const newTeam = page.getByRole('button', { name: 'New team' });
    const addMember = page.getByRole('combobox').filter({ hasText: 'Add member…' }).first();
    const linkProject = page.getByRole('combobox').filter({ hasText: 'Link a project…' }).first();
    const teamCard = await addMember.evaluate((el) => {
      for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
        const b = e.getBoundingClientRect();
        if (b.width > 1200 && e.innerText.includes('PROJECTS')) return { x: b.x, y: b.y, width: b.width, height: b.height };
      }
      return null;
    });
    const membersLabel = await textBox(await inMain(page.getByText(/^MEMBERS \(\d+\)$/i)));
    const projectsLabel = await textBox(await inMain(page.getByText(/^PROJECTS \(\d+\)$/i)));
    const members = rectUnion(membersLabel, await rect(addMember));
    const projects = rectUnion(projectsLabel, await rect(linkProject));
    // The member and project chips sit between each label and its dropdown; widen to the chips' right edge.
    const chipsRight = await page.evaluate(([m, p]) => {
      const inside = (b, r) => b.y >= r.y && b.y + b.height <= r.y + r.height + 1;
      const els = [...document.querySelectorAll('button')].map((e) => e.getBoundingClientRect()).filter((b) => b.width > 0);
      const right = (r) => Math.max(r.x + r.width, ...els.filter((b) => inside(b, r) && b.x < 1000).map((b) => b.x + b.width));
      return [right(m), right(p)];
    }, [members, projects]);
    members.width = Math.max(members.width, chipsRight[0] - members.x);
    projects.width = Math.max(projects.width, chipsRight[1] - projects.x);
    await L.plate(page, '8-04-team', {
      highlights: {
        head: { locator: head, label: 'Team & permissions' },
        rule: { locator: rule, label: 'Who can edit' },
        card: { locator: teamCard, label: 'A team' },
        members: { locator: members, label: 'Members' },
        projects: { locator: projects, label: 'Projects' },
        new: { locator: newTeam, label: 'New team' },
      },
      points: {
        members: { locator: addMember, click: false },
        projects: { locator: linkProject, click: false },
        new: { locator: newTeam, click: false },
      },
      mask: EMAIL,
    });
  },

  /* 8-05 Audit log: one row's Details expanded, then the filter opened (closed with Escape). Refresh is not clicked. */
  async audit(page) {
    await fromMenu(page, 'Audit log');
    await page.mouse.move(1000, 30);
    const head = await pageHead(page, 'Audit log', /^Every action taken across Studio/);
    const filter = page.getByRole('combobox').first();
    const refresh = page.getByRole('button', { name: 'Refresh' });
    // Expand the first row whose Details button sits below the reach of the open filter list (~y 430).
    const details = page.getByRole('button', { name: 'Details', exact: true });
    const n = await details.count();
    let target = null;
    for (let i = 0; i < n; i++) {
      const b = await details.nth(i).boundingBox();
      if (b && b.y > 440) { target = details.nth(i); break; }
    }
    if (!target) throw new Error('no Details button below the filter');
    await target.click();
    await page.waitForTimeout(1500);
    const hide = page.getByRole('button', { name: 'Hide details' }).first();
    const row = await hide.evaluate((el) => {
      for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
        const b = e.getBoundingClientRect();
        if (b.width > 1300 && b.height > 90) return { x: b.x, y: b.y, width: b.width, height: b.height };
      }
      return null;
    });
    const rowsAbove = await page.evaluate((y) => {
      const cards = [...document.querySelectorAll('div')].map((e) => ({ e, b: e.getBoundingClientRect() }))
        .filter(({ b }) => b.width > 1400 && b.width < 1500 && b.height > 50 && b.height < 80 && b.y > 190 && b.y < y);
      if (!cards.length) return null;
      // Only the row just above the expanded one: the rows higher up sit under the open filter list.
      cards.sort((a, b) => b.b.y - a.b.y);
      const b = cards[0].b;
      return { x: b.x, y: b.y, width: b.width, height: b.height };
    }, row ? row.y : 600);
    const filterBox = await rect(filter);
    const refreshBox = await rect(refresh);
    const hideBox = await rect(hide);
    await filter.click();
    await page.waitForTimeout(1200);
    const list = page.getByRole('listbox');
    const opt = page.getByRole('option', { name: 'Generations', exact: true });
    await page.mouse.move(1000, 30);
    await L.plate(page, '8-05-audit', {
      highlights: {
        head: { locator: head, label: 'Audit log' },
        rows: { locator: rowsAbove, label: 'One action' },
        filter: { locator: await box(filterBox, list), label: 'Filter' },
        refresh: { locator: refreshBox, label: 'Refresh' },
        details: { locator: row, label: 'Details' },
      },
      points: {
        filter: { locator: opt },
        refresh: { locator: refreshBox, click: false },
        details: { locator: hideBox },
      },
      mask: EMAIL,
    });
    for (let i = 0; i < 3 && (await list.count()); i++) {
      await page.keyboard.press('Escape');
      for (let j = 0; j < 6 && (await list.count()); j++) await page.waitForTimeout(500);
    }
    if (await list.count()) throw new Error('filter list still open');
  },

  /* 8-06 Settings, top: Configuration source, Save configuration, the Planning presets lists and their row controls. */
  async settings(page) {
    await L.go(page, `${L.STUDIO}/settings`);
    await page.mouse.move(1000, 30);
    const head = await pageHead(page, 'Settings', /^Override the platform default Studio configuration/);
    const sourceTitle = page.getByText('Configuration source', { exact: true });
    const source = await sourceTitle.evaluate((el) => {
      for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
        const b = e.getBoundingClientRect();
        if (b.width > 1300 && b.height > 50) return { x: b.x, y: b.y, width: b.width, height: b.height };
      }
      return null;
    });
    const inherited = await textBox(page.getByText('Inherited', { exact: true }));
    const save = page.getByRole('button', { name: 'Save configuration' });
    const sectionHead = await textBox(await inMain(page.getByText('Planning presets', { exact: true })));
    const cardOf = async (title) => {
      const t = await inMain(page.getByText(title, { exact: true }));
      return t.evaluate((el) => {
        for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
          const b = e.getBoundingClientRect();
          if (b.width > 600 && b.height > 200) return { x: b.x, y: b.y, width: b.width, height: b.height };
        }
        return null;
      });
    };
    const renderCard = await cardOf('Render styles');
    const layoutCard = await cardOf('Layout geometry');
    const lists = rectUnion(sectionHead, renderCard, layoutCard);
    // The Massing row: its three icon buttons (edit, revert, delete) have no names, so take them by order.
    const massingRow = page.locator('div').filter({ has: page.getByText('Massing', { exact: true }) }).filter({ has: page.locator('button') }).last();
    const icons = massingRow.locator('button');
    const nIcons = await icons.count();
    if (nIcons < 3) throw new Error(`Massing row has ${nIcons} buttons`);
    const pencil = icons.nth(nIcons - 3);
    const rowIcons = await box(icons.nth(nIcons - 3), icons.nth(nIcons - 2), icons.nth(nIcons - 1));
    const add = (await inMain(page.getByRole('button', { name: 'Add', exact: true }), 340, 420));
    await L.plate(page, '8-06-settings', {
      highlights: {
        source: { locator: rectUnion(head, source, inherited), label: 'Configuration source' },
        lists: { locator: lists, label: 'Planning presets options' },
        row: { locator: rowIcons, label: 'Edit, revert, delete' },
        add: { locator: add, label: '+ Add' },
        save: { locator: save, label: 'Save configuration' },
      },
      points: {
        row: { locator: pencil, click: false },
        add: { locator: add, click: false },
        save: { locator: save, click: false },
      },
      mask: EMAIL,
    });
  },

  /* 8-07 Settings, further down: descriptor guidance (PREVIEW expanded), Density bands, Canvas > Required elements. */
  async density(page) {
    await L.go(page, `${L.STUDIO}/settings`);
    await page.mouse.move(1000, 30);
    const guideTitle = page.getByText('Planning preset descriptor guidance', { exact: true });
    const preview = page.getByText(/FULL DRAFTING PROMPT/i).first();
    await preview.click(); // a read-only disclosure
    await page.waitForTimeout(1000);
    await scrollTo(page, guideTitle, 78);
    const guideCard = await guideTitle.evaluate((el) => {
      for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
        const b = e.getBoundingClientRect();
        if (b.width > 1300 && b.height > 150) return { x: b.x, y: b.y, width: b.width, height: b.height };
      }
      return null;
    });
    const textarea = await rect(page.locator('textarea').first());
    const note = page.getByText(/^Only the fields a planning preset actually fills/);
    const previewBlock = rectUnion(await textBox(preview), await textBox(note), await rect(page.getByText(/your guidance text above/).first()));
    // widen the preview block to the card's inner width (the dashed box spans it)
    if (previewBlock && textarea) { previewBlock.x = textarea.x; previewBlock.width = textarea.width; }
    const densityCards = page.getByText('Density bands', { exact: true });
    // The second "Density bands" is the card title (the first is the section heading).
    const dTitle = densityCards.nth(1);
    const densityCard = await dTitle.evaluate((el) => {
      for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
        const b = e.getBoundingClientRect();
        if (b.width > 1300 && b.height > 200) return { x: b.x, y: b.y, width: b.width, height: b.height };
      }
      return null;
    });
    const canvasHead = await textBox(await inMain(page.getByText('Canvas', { exact: true })));
    const reqTitle = page.getByText('Required elements', { exact: true });
    const reqCard = await reqTitle.evaluate((el) => {
      for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
        const b = e.getBoundingClientRect();
        if (b.width > 1300 && b.height > 200) return { x: b.x, y: b.y, width: b.width, height: b.height };
      }
      return null;
    });
    const view = { x: 0, y: 48, width: 1900, height: 902 };
    const highDesc = page.getByText(/^three- to five-storey apartment blocks/);
    await L.plate(page, '8-07-settings-density', {
      highlights: {
        guide: { locator: guideCard && textarea ? { x: guideCard.x, y: guideCard.y, width: guideCard.width, height: textarea.y + textarea.height - guideCard.y + 6 } : guideCard, label: 'Descriptor guidance' },
        preview: { locator: previewBlock, label: 'PREVIEW' },
        density: { locator: densityCard, label: 'Density bands' },
        required: { locator: intersect(rectUnion(canvasHead, reqCard), view), label: 'Required elements' },
      },
      points: {
        preview: { locator: preview, anchor: [0.05, 0.5], click: false },
        density: { locator: highDesc, anchor: [0.3, 0.5], click: false },
      },
      mask: EMAIL,
    });
  },

  /* 8-08 Settings, Ideation: Images per batch, Scene toggles, Area steppers, Additive elements, Master prompt. */
  async ideation(page) {
    await L.go(page, `${L.STUDIO}/settings`);
    await page.mouse.move(1000, 30);
    const ideationHead = await inMain(page.getByText('Ideation', { exact: true }));
    await scrollTo(page, ideationHead, 66);
    const cardOf = async (title, minW = 600) => {
      const t = await inMain(page.getByText(title, { exact: true }));
      return t.evaluate((el, minW) => {
        for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
          const b = e.getBoundingClientRect();
          if (b.width > minW && b.height > 100) return { x: b.x, y: b.y, width: b.width, height: b.height };
        }
        return null;
      }, minW);
    };
    const toggles = await cardOf('Scene toggles');
    const steppers = await cardOf('Area steppers');
    const additive = await cardOf('Additive elements');
    const masterLabel = await textBox(page.getByText('Master prompt', { exact: true }));
    const masterArea = await rect(page.getByPlaceholder(/Standing guidance for every generation/));
    const batchField = await (async () => {
      const t = await inMain(page.getByText('Images per batch', { exact: true }));
      return t.evaluate((el) => {
        for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
          const inp = e.querySelector('input');
          if (inp) { const b = inp.getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: b.height }; }
        }
        return null;
      });
    })();
    const addOption = page.getByRole('button', { name: 'Add option' });
    await L.plate(page, '8-08-settings-ideation', {
      highlights: {
        head: { locator: await textBox(ideationHead), label: 'Ideation' },
        batch: { locator: rectUnion(await textBox(await inMain(page.getByText('Images per batch', { exact: true }))), batchField), label: 'Images per batch' },
        toggles: { locator: toggles, label: 'Scene toggles' },
        steppers: { locator: rectUnion(steppers, additive), label: 'Steppers and additive elements' },
        master: { locator: rectUnion(masterLabel, masterArea), label: 'Master prompt' },
      },
      points: {
        batch: { locator: batchField, click: false },
        toggles: { locator: addOption, click: false },
        master: { locator: masterArea, anchor: [0.2, 0.3], click: false },
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
