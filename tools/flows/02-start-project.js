/*
 * Capture flow for Studio guide chapter 2, "Start a project" (tutorial/studio/chapters/02-start-project.js).
 *
 *   node tools/flows/02-start-project.js            # all plates
 *   node tools/flows/02-start-project.js home focus # only some parts: home, dialog, create, focus, settings
 *
 * VIEW ONLY. On Studio home it only selects chips in the unsaved new-project form, picks an image in
 * "Choose from existing" and clicks "Add 1" (that only fills the unsaved form), searches the Focus Area map and
 * opens street view. It never clicks Create project, "Use this view & start" or "Use this photo & start"; leaving
 * the page discards the form. In the sandbox it opens Project settings, switches tabs and the Team dialog, and closes
 * them with Escape. It never types into Project settings (Details autosaves).
 */
'use strict';

const L = require('./lib');

const MASK = ['text=/@coplanai\\.com/'];
const HIDE = ['[role=tooltip]'];
const parts = new Set(process.argv.slice(2));
const want = (p) => parts.size === 0 || parts.has(p);

/* Studio home scrolls inside one inner container, not the window. */
async function scrollMain(page, top) {
  await page.evaluate((top) => {
    const el = [...document.querySelectorAll('div')].find(
      (e) => e.scrollHeight > e.clientHeight + 50 && ['auto', 'scroll'].includes(getComputedStyle(e).overflowY)
    );
    if (el) el.scrollTop = top;
  }, top);
  await page.waitForTimeout(600);
}

/* Scroll the inner container so that a locator's bottom sits `margin` px above the viewport's bottom. */
async function scrollBottomTo(page, locator, margin = 24) {
  const box = await locator.boundingBox();
  if (!box) return;
  const delta = box.y + box.height - (950 - margin);
  if (delta > 0) {
    await page.evaluate((d) => {
      const el = [...document.querySelectorAll('div')].find(
        (e) => e.scrollHeight > e.clientHeight + 50 && ['auto', 'scroll'].includes(getComputedStyle(e).overflowY)
      );
      if (el) el.scrollTop += d;
    }, delta);
    await page.waitForTimeout(600);
  }
}

/*
 * The tight box around a visible text (a Range over the element's contents, so a full-width line still hugs its
 * words). `texts` is a string, a RegExp, or an array of them (their boxes are joined). Returns a CSS-px rect or null.
 */
async function textRect(page, texts) {
  const list = (Array.isArray(texts) ? texts : [texts]).map((t) => (t instanceof RegExp ? { re: t.source, flags: t.flags } : { s: t }));
  return page.evaluate((list) => {
    const rects = [];
    for (const t of list) {
      const re = t.re != null ? new RegExp(t.re, t.flags) : null;
      const hit = (e) => {
        const txt = (e.innerText || '').trim();
        return re ? re.test(txt) : txt === t.s;
      };
      const els = [...document.querySelectorAll('body *')].filter((e) => {
        if (!hit(e)) return false;
        const r = e.getBoundingClientRect();
        if (r.width < 4 || r.height < 4 || r.bottom < 0 || r.top > innerHeight) return false;
        return ![...e.children].some(hit);
      });
      if (!els.length) continue;
      const range = document.createRange();
      range.selectNodeContents(els[0]);
      const r = range.getBoundingClientRect();
      rects.push(r);
    }
    if (!rects.length) return null;
    const x = Math.min(...rects.map((r) => r.left));
    const y = Math.min(...rects.map((r) => r.top));
    return { x, y, width: Math.max(...rects.map((r) => r.right)) - x, height: Math.max(...rects.map((r) => r.bottom)) - y };
  }, list);
}

/* The tight box around a substring of one visible text node (for one sentence inside a longer line). */
async function subTextRect(page, sub) {
  return page.evaluate((sub) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const i = n.data.indexOf(sub);
      if (i < 0) continue;
      const pr = n.parentElement.getBoundingClientRect();
      if (pr.width < 50 || pr.height < 8) continue; // skip visually hidden copies
      const range = document.createRange();
      range.setStart(n, i);
      range.setEnd(n, i + sub.length);
      const r = range.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) continue;
      return { x: r.left, y: r.top, width: r.width, height: r.height };
    }
    return null;
  }, sub);
}

/* L.union for a mix of Locators and CSS-px rects (from textRect). */
async function join(...items) {
  const rects = [];
  for (const it of items) {
    if (!it) continue;
    const r = typeof it.boundingBox === 'function' ? await L.union(it) : it;
    if (r) rects.push(r);
  }
  if (!rects.length) return null;
  const x = Math.min(...rects.map((b) => b.x));
  const y = Math.min(...rects.map((b) => b.y));
  return { x, y, width: Math.max(...rects.map((b) => b.x + b.width)) - x, height: Math.max(...rects.map((b) => b.y + b.height)) - y };
}

const pressed = (loc) => loc.getAttribute('aria-pressed');

async function waitFor(page, fn, timeout = 40000, step = 1000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeout) {
    if (await fn().catch(() => false)) return true;
    await page.waitForTimeout(step);
  }
  return false;
}

(async () => {
  const { page, close } = await L.open();
  const chip = (name) => page.getByRole('button', { name: new RegExp('^' + name + ' —') });
  try {
    /* ---------------------------------------------------------------- Studio home: process and scope */
    const openForm = async () => {
      await L.go(page, L.STUDIO);
      await chip('Conceptual Plan').click();
      await page.waitForTimeout(600);
      await scrollBottomTo(page, page.getByText('The project is named for you', { exact: false }));
    };
    if (want('home')) {
      await openForm();
      await L.plate(page, '2-01-process', {
        hide: HIDE,
        mask: MASK,
        highlights: {
          conceptual: { locator: chip('Conceptual Plan'), label: 'Conceptual Plan' },
          help: { locator: await textRect(page, 'Explore multiple design variations in parallel.'), label: 'What it does' },
          master: { locator: chip('Master Plan'), label: 'Master Plan' },
          focus: { locator: chip('Focus Area'), label: 'Focus Area' },
        },
        points: {
          conceptual: chip('Conceptual Plan'),
          master: { locator: chip('Master Plan'), click: false },
          focus: { locator: chip('Focus Area'), click: false },
        },
      });

      await chip('Single building or lot').click();
      await page.waitForTimeout(600);
      await L.plate(page, '2-02-scope', {
        hide: HIDE,
        mask: MASK,
        highlights: {
          masterplan: { locator: chip('Master plan'), label: 'Master plan' },
          single: { locator: chip('Single building or lot'), label: 'Single building or lot' },
          singleHelp: { locator: await textRect(page, 'Design one building or building complex on its parcel.'), label: 'What it does' },
          drop: { locator: page.getByRole('button', { name: /^Drop or add the site plan/ }), label: 'Site plan' },
          existing: { locator: page.getByRole('button', { name: 'Choose from existing' }), label: 'Choose from existing' },
        },
        points: {
          masterplan: { locator: chip('Master plan'), click: false },
          single: chip('Single building or lot'),
          drop: { locator: page.getByText('Drop or add the site plan', { exact: true }) },
          existing: page.getByRole('button', { name: 'Choose from existing' }),
        },
      });
    }

    /* ---------------------------------------------------------------- Choose from existing, then the filled form */
    if (want('dialog') || want('create')) {
      let detected = false;
      for (let attempt = 1; attempt <= 4 && !detected; attempt++) {
        await openForm();
        // Our example uses Master plan. Click it explicitly: left at its default, adding the image flips it.
        await chip('Master plan').click();
        await page.waitForTimeout(600);
        console.log(`attempt ${attempt}: scope before image: Master plan =`, await pressed(chip('Master plan')));
        await page.getByRole('button', { name: 'Choose from existing' }).click();
        const dlg = page.getByRole('dialog');
        await dlg.locator('img').first().waitFor({ timeout: 20000 });
        await page.waitForTimeout(2500);
        const thumb = dlg.locator('button').filter({ has: page.locator('img') }).nth(2); // the downtown land-use plan
        await thumb.click();
        await page.waitForTimeout(800);
        const add = dlg.getByRole('button', { name: /^Add 1$/ });
        if (want('dialog') && attempt === 1) {
          const uploads = dlg.getByRole('button', { name: /^Uploads \(\d+\)$/ });
          const drawings = dlg.getByRole('button', { name: /^Drawings \(\d+\)$/ });
          await L.plate(page, '2-03-choose-existing', {
            mask: MASK,
            highlights: {
              title: { locator: await textRect(page, ['Choose from uploaded images', 'Pick one image already uploaded to this Studio.']), label: 'Choose from uploaded images' },
              uploads: { locator: uploads, label: 'Uploads' },
              drawings: { locator: drawings, label: 'Drawings' },
              image: { locator: thumb, label: 'Selected' },
              selected: { locator: await textRect(page, '1 selected'), label: '1 selected' },
              add: { locator: add, label: 'Add 1' },
            },
            points: {
              drawings: { locator: drawings, click: false },
              image: thumb,
              add: add,
            },
          });
        }
        await add.click(); // fills the unsaved form only
        await page.waitForTimeout(1500);
        if (!want('create')) break;
        console.log('scope after image: Master plan =', await pressed(chip('Master plan')));
        await waitFor(page, async () => (await page.getByText(/Scale detected from the plan|No printed scale found/).count()) > 0, 40000);
        const msg = await page.getByText(/Scale detected from the plan|No printed scale found/).first().innerText().catch(() => '');
        const val = await page.getByTestId('studio-new-project-scale-input').inputValue().catch(() => '');
        console.log('scale detection:', msg, '| value:', val);
        detected = /Scale detected/.test(msg);
      }
    }

    if (want('create')) {
      if ((await pressed(chip('Master plan'))) !== 'true') {
        await chip('Master plan').click();
        await page.waitForTimeout(600);
      }
      // Put Replace just under the top bar so the whole form, down to the naming line, fits.
      const rep = await page.getByRole('button', { name: 'Replace' }).boundingBox();
      await page.evaluate((d) => {
        const el = [...document.querySelectorAll('div')].find(
          (e) => e.scrollHeight > e.clientHeight + 50 && ['auto', 'scroll'].includes(getComputedStyle(e).overflowY)
        );
        if (el) el.scrollTop += d;
      }, rep.y - 58);
      await page.waitForTimeout(600);
      const scaleMode = page.getByTestId('studio-new-project-scale-mode');
      const infoBtn = page.locator('button:has(.lucide-info)').filter({ visible: true }).first();
      const imgBox = await page.evaluate(() => {
        const r = [...document.querySelectorAll('img')].map((i) => i.getBoundingClientRect()).filter((r) => r.width > 600).sort((a, b) => b.width - a.width)[0];
        return r ? { x: r.x, y: Math.max(r.y, 48), width: r.width, height: Math.min(r.y + r.height, 950) - Math.max(r.y, 48) } : null;
      });
      await page.mouse.move(1600, 140);
      await page.waitForTimeout(500);
      await L.plate(page, '2-04-create', {
        mask: MASK,
        highlights: {
          image: { locator: imgBox, label: 'Leading image' },
          scale: { locator: await L.union(scaleMode, infoBtn), label: 'Scale' },
          detected: { locator: await textRect(page, /^(Scale detected from the plan|No printed scale found)/), label: 'Please verify' },
          choice: { locator: await L.union(chip('Conceptual Plan'), chip('Focus Area'), chip('Master plan'), chip('Single building or lot')), label: 'Process and scope' },
          create: { locator: page.getByRole('button', { name: 'Create project' }), label: 'Create project' },
          named: { locator: await textRect(page, /^The project is named for you/), label: 'Named for you' },
        },
        points: {
          image: { locator: page.getByRole('button', { name: 'Replace' }), click: false },
          scale: { locator: infoBtn, click: false },
          create: { locator: page.getByRole('button', { name: 'Create project' }), click: false },
        },
      });
      await page.mouse.move(10, 600);
    }

    /* ---------------------------------------------------------------- Focus Area: map, street view, upload */
    if (want('focus')) {
      await L.go(page, L.STUDIO);
      await chip('Focus Area').click();
      // The map remembers the last place searched; search Turin so the plate shows street photos.
      const search = page.getByPlaceholder(/Search address or place/).filter({ visible: true }).first();
      await search.waitFor({ timeout: 20000 });
      await page.waitForTimeout(3000);
      // The map also remembers its zoom. Zoom right out first: the search then sets its own street-level zoom.
      const zoomOut = page.getByRole('button', { name: 'Zoom out' });
      for (let i = 0; i < 24; i++) {
        await zoomOut.click();
        await page.waitForTimeout(150);
      }
      await page.waitForTimeout(1500);
      await search.click();
      await search.fill('Via Garibaldi, Torino');
      const hit = page.getByRole('button', { name: /^Via Giuseppe Garibaldi, Torino/ }).first();
      await hit.waitFor({ timeout: 15000 });
      await hit.click();
      await page.waitForTimeout(3000);
      await search.fill('');
      await page.keyboard.press('Escape').catch(() => {});
      const markers = page.locator('.maplibregl-marker');
      let ok = await waitFor(page, async () => (await markers.count()) >= 8, 45000, 1500);
      await page.waitForTimeout(6000); // marker thumbnails and tiles
      ok = await waitFor(page, async () => (await markers.count()) >= 8, 45000, 1500); // markers reload once after the map settles
      await page.waitForTimeout(4000);
      console.log('markers:', ok, await markers.count());
      // Tap the single photo marker (no count badge) nearest the middle of the map: it selects that photo.
      const pick = await page.evaluate(() => {
        const map = document.querySelector('.maplibregl-canvas').getBoundingClientRect();
        const cx = map.x + map.width * 0.55;
        const cy = map.y + map.height / 2;
        const ms = [...document.querySelectorAll('.maplibregl-marker')]
          .map((m, i) => ({ i, r: m.getBoundingClientRect(), single: (m.innerText || '').trim() === '' }))
          .filter(({ r, single }) => single && r.y > map.y + 90 && r.bottom < map.bottom - 30 && r.x > map.x + 30 && r.right < map.right - 90);
        ms.sort((a, b) => Math.hypot(a.r.x - cx, a.r.y - cy) - Math.hypot(b.r.x - cx, b.r.y - cy));
        return ms.length ? { i: ms[0].i, x: ms[0].r.x + ms[0].r.width / 2, y: ms[0].r.y + ms[0].r.height / 2 } : null;
      });
      console.log('picked marker:', pick);
      await page.mouse.click(pick.x, pick.y);
      const usePhoto = page.getByRole('button', { name: 'Use this photo & start' });
      await usePhoto.waitFor({ timeout: 20000 });
      await page.waitForTimeout(3000);
      await page.mouse.move(1600, 140);
      await scrollBottomTo(page, page.getByText('Redesign an existing place starting from a street-level photo.', { exact: true }), 16);
      const picked = page.locator('.maplibregl-marker').nth(pick.i);
      const photo = await page.evaluate(() => {
        const btn = [...document.querySelectorAll('button')].find((b) => b.innerText.trim() === 'Use this photo & start');
        let p = btn;
        while (p && !/Captured/.test(p.innerText)) p = p.parentElement;
        if (!p) return null;
        const img = p.querySelector('img');
        const rs = [img && img.getBoundingClientRect()].filter(Boolean);
        for (const e of p.querySelectorAll('*')) {
          const t = (e.innerText || '').trim();
          if (/^Captured \d/.test(t) || /Mapillary · CC BY-SA/.test(t)) {
            if ([...e.children].some((c) => /Captured|Mapillary/.test(c.innerText || ''))) continue;
            const range = document.createRange();
            range.selectNodeContents(e);
            rs.push(range.getBoundingClientRect());
          }
        }
        const x = Math.min(...rs.map((r) => r.left));
        const y = Math.min(...rs.map((r) => r.top));
        return { x, y, width: Math.max(...rs.map((r) => r.right)) - x, height: Math.max(...rs.map((r) => r.bottom)) - y };
      });
      const explore = page.getByRole('button', { name: 'Explore', exact: true });
      await L.plate(page, '2-05-focus-map', {
        hide: HIDE,
        mask: MASK,
        highlights: {
          focus: { locator: await L.union(chip('Focus Area'), page.getByText('Redesign an existing place starting from a street-level photo.', { exact: true })), label: 'Focus Area' },
          source: { locator: await L.union(page.getByRole('button', { name: 'From the map' }), page.getByRole('button', { name: 'Upload an image' })), label: 'Image source' },
          search: { locator: search, label: 'Search' },
          marker: { locator: picked, label: 'Photo marker', pad: 8 },
          photo: { locator: photo, label: 'Selected photo' },
          explore: { locator: explore, label: 'Explore' },
          start: { locator: usePhoto, label: 'Use this photo & start' },
        },
        points: {
          focus: chip('Focus Area'),
          search: { locator: search, anchor: [0.08, 0.5] },
          marker: picked,
          explore: { locator: explore, click: false },
          start: { locator: usePhoto, click: false },
        },
      });

      // Check what Explore does (view only), then go back to the map.
      await explore.click();
      await page.waitForTimeout(9000);
      await L.raw(page, '2-check-explore');
      const backBtn = page.getByRole('button', { name: 'Back to map' });
      console.log('explore opened street view:', await backBtn.isVisible().catch(() => false), '| button:', await page.getByRole('button', { name: /Use this (view|photo) & start/ }).first().innerText().catch(() => ''));
      if (await backBtn.isVisible().catch(() => false)) await backBtn.click();
      await page.waitForTimeout(4000);
      await scrollMain(page, 0);

      // Street view: double-tap a street near the middle of the map (view only).
      const canvas = await page.locator('.maplibregl-canvas').boundingBox();
      // This spot (with the map on Via Garibaldi) opens a street corner that reads well in the plate.
      await page.mouse.dblclick(canvas.x + 902, canvas.y + 246);
      const back = page.getByRole('button', { name: 'Back to map' });
      await back.waitFor({ timeout: 20000 });
      const loaded = await waitFor(page, async () => (await page.getByText('Finding the nearest street photo', { exact: false }).count()) === 0, 45000, 1500);
      await page.waitForTimeout(6000);
      console.log('street view loaded:', loaded);
      await page.mouse.move(1600, 140);
      await L.raw(page, '2-check-street-view');
      const start = page.getByRole('button', { name: 'Use this view & start' });
      await scrollBottomTo(page, start, 24);
      const viewer = await page.evaluate(() => {
        const b = [...document.querySelectorAll('button')].find((x) => x.innerText.trim() === 'Back to map');
        let p = b;
        while (p && p.getBoundingClientRect().width < 1000) p = p.parentElement;
        const r = p && p.getBoundingClientRect();
        return r ? { x: r.x, y: r.y, width: r.width, height: r.height } : null;
      });
      await L.plate(page, '2-06-focus-street-view', {
        hide: HIDE,
        mask: MASK,
        highlights: {
          viewer: { locator: viewer, label: 'Street view' },
          caption: { locator: await textRect(page, 'Drag to look around, follow the arrows to move along the street, then capture the view you want.'), label: 'How it works' },
          back: { locator: back, label: 'Back to map' },
          credit: { locator: await textRect(page, /^© Mapillary contributors/), label: 'Photo credit' },
          start: { locator: start, label: 'Use this view & start' },
        },
        points: {
          viewer: { locator: viewer && { x: viewer.x + viewer.width * 0.62, y: viewer.y + viewer.height * 0.55, width: 1, height: 1 }, click: false },
          back: { locator: back, click: false },
          start: { locator: start, click: false },
        },
      });
      await back.click();
      await page.waitForTimeout(1500);

      // Upload an image.
      await page.getByRole('button', { name: 'Upload an image' }).click();
      await page.waitForTimeout(1500);
      await scrollBottomTo(page, page.getByText('The project is named for you', { exact: false }), 24);
      const drop = page.getByRole('button', { name: /^Drop or add a photo of the place/ });
      await L.plate(page, '2-07-focus-upload', {
        hide: HIDE,
        mask: MASK,
        highlights: {
          upload: { locator: page.getByRole('button', { name: 'Upload an image' }), label: 'Upload an image' },
          drop: { locator: drop, label: 'Photo of the place' },
          existing: { locator: page.getByRole('button', { name: 'Choose from existing' }), label: 'Choose from existing' },
          status: { locator: await textRect(page, 'Add a photo of the place to begin'), label: 'Status' },
        },
        points: {
          upload: page.getByRole('button', { name: 'Upload an image' }),
          drop: page.getByText('Drop or add a photo of the place', { exact: true }),
          existing: { locator: page.getByRole('button', { name: 'Choose from existing' }), click: false },
        },
      });
    }

    /* ---------------------------------------------------------------- Sandbox: Project settings */
    if (want('settings')) {
      await L.go(page, `${L.SANDBOX}/ideation`, 9000);
      await page.getByTestId('studio-project-setup-open').click();
      const dlg = page.getByRole('dialog');
      await dlg.waitFor({ timeout: 15000 });
      await page.waitForTimeout(2000);
      const tab = (n) => page.getByTestId(`studio-setup-section-${n}`);
      const label = (t) => dlg.getByText(t, { exact: true }).first();
      const team = page.getByTestId('studio-project-team-open');

      // Details
      await tab('details').click();
      await page.mouse.move(1600, 600);
      await page.waitForTimeout(1500);
      const nameIn = dlg.getByPlaceholder('Project name');
      const slugIn = dlg.getByPlaceholder('project-slug');
      const regen = slugIn.locator('xpath=following::button[1]');
      await L.plate(page, '2-08-details', {
        hide: HIDE,
        mask: MASK,
        highlights: {
          tab: { locator: tab('details'), label: 'Details' },
          name: { locator: await L.union(label('Project name'), nameIn, slugIn, regen), label: 'Name and address' },
          process: { locator: await L.union(label('Process'), page.getByTestId('studio-setup-process-select'), page.getByTestId('studio-setup-scope-select')), label: 'Process and scope' },
          reference: { locator: await L.union(label('Location'), dlg.getByPlaceholder('Add location'), label('Target deadline'), dlg.locator('input[type=date]')), label: 'For reference' },
          output: { locator: await L.union(label('Output quality'), label('Output format'), dlg.getByRole('combobox').filter({ hasText: /^(1K|2K|4K)$/ }).first(), dlg.getByRole('combobox').filter({ hasText: /^(WebP|PNG|JPG)$/ }).first()), label: 'Output' },
          saves: { locator: await subTextRect(page, 'Detail changes save as you edit.'), label: 'Saves as you edit' },
        },
        points: {
          tab: tab('details'),
          name: { locator: regen, click: false },
        },
      });

      // Settings
      await tab('settings').click();
      await page.mouse.move(1600, 600);
      await page.waitForTimeout(1500);
      const addBtns = dlg.getByRole('button', { name: /^Add$/ });
      await L.plate(page, '2-09-settings', {
        hide: HIDE,
        mask: MASK,
        highlights: {
          tab: { locator: tab('settings'), label: 'Settings' },
          scene: { locator: await L.union(label('Scene toggles'), dlg.getByRole('button', { name: 'Add group' }), dlg.getByRole('button', { name: 'Add option' })), label: 'Scene toggles' },
          rows: { locator: await L.union(dlg.getByRole('button', { name: 'Hide in this project' }).first(), dlg.getByText('Day', { exact: true }).first().locator('xpath=ancestor::div[.//button][1]').locator('button').last()), label: 'Row actions' },
          steppers: { locator: await join(label('Area steppers'), addBtns.nth(0), label('Greenery'), await textRect(page, /^add generous lush greenery/)), label: 'Area steppers' },
          additive: { locator: await join(label('Additive elements'), addBtns.nth(1), label('Water feature'), await textRect(page, /^add a designed water feature/)), label: 'Additive elements' },
        },
        points: {
          tab: tab('settings'),
          rows: { locator: dlg.getByRole('button', { name: 'Hide in this project' }).first(), click: false },
        },
      });

      // Site
      await tab('site').click();
      await page.mouse.move(1600, 600);
      await page.waitForTimeout(1500);
      const leading = dlg.getByText('Leading', { exact: true }).first().locator('xpath=ancestor::div[.//img][1]');
      const dropAdd = dlg.getByText('Drop or add', { exact: true }).first();
      await L.plate(page, '2-10-site', {
        hide: HIDE,
        mask: MASK,
        highlights: {
          tab: { locator: tab('site'), label: 'Site' },
          context: { locator: await L.union(label('Site context'), dlg.getByText(/^\d+ files?$/).first()), label: 'Site context' },
          leading: { locator: leading, label: 'Leading image' },
          drop: { locator: dropAdd.locator('xpath=ancestor::div[1]'), label: 'Drop or add' },
          team: { locator: team, label: 'Team' },
        },
        points: {
          tab: tab('site'),
          leading: { locator: leading, click: false },
          drop: { locator: dropAdd, click: false },
          team: team,
        },
      });

      // Team (check only), then close both dialogs with Escape.
      await team.click();
      await page.waitForTimeout(1500);
      await L.raw(page, '2-check-team');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(700);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(700);
      console.log('dialogs left open:', await page.getByRole('dialog').count());
    }
  } finally {
    await close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
