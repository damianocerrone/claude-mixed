/*
 * Chapter 5 · Review and refine. Plates 5-NN-*.webp, taken in the sandbox project on Concept A's lakeside plan
 * (iteration 1, second variant).
 *
 *   node tools/flows/05-refine.js focus     # 5-01 Focus view, 5-02 top & eye-level, 5-03 Compare, 5-04 the prompt used
 *   node tools/flows/05-refine.js favs      # marks two favourites, 5-05 the Favorites filter
 *   node tools/flows/05-refine.js select    # 5-06 Select mode with two images, 5-07 Compare side by side
 *   node tools/flows/05-refine.js touchup   # 5-08 a marked region + instruction, Apply to mask (generation)
 *   node tools/flows/05-refine.js adjust    # 5-09 sliders/filter, Save as new version
 *   node tools/flows/05-refine.js prompt    # 5-10 a written change, Generate (generation)
 *   node tools/flows/05-refine.js impact    # 5-11 an impact question, Analyse, 5-12 the answer
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { SANDBOX, RAW, open, go, union, card, stage, plate, raw } = require('./lib');
const { canvasMapper } = require('./03-site');

const btn = (page, name) => page.getByRole('button', { name, exact: true }).filter({ visible: true }).first();

/* Open the lakeside plan (Timeline view, 4th tile: iteration 1, variant 2) in Focus view. */
const PIN = path.join(RAW, 'lakeside-url.txt');      // the image's own address, so new iterations don't shift it
async function openLakeside(page) {
  if (fs.existsSync(PIN)) { await go(page, fs.readFileSync(PIN, 'utf8').trim(), 9000); return; }
  await go(page, `${SANDBOX}/ideation`);
  await btn(page, 'Timeline').click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Focus', exact: true }).nth(3).click();
  await page.waitForTimeout(3500);
  fs.writeFileSync(PIN, page.url());
}

async function waitForRun(page, label, max = 600) {
  const t0 = Date.now();
  let seenBusy = false;
  for (;;) {
    await page.waitForTimeout(5000);
    const text = await page.evaluate(() => document.body.innerText);
    const busy = /Composing prompt|Generating variant|Generating…|Analysing|Analyzing|Rendering|Saving/i.test(text);
    if (busy) seenBusy = true;
    const secs = Math.round((Date.now() - t0) / 1000);
    if ((seenBusy && !busy) || secs > max) { console.log(`${label}: ${seenBusy ? 'done' : 'no progress seen'} after ${secs}s`); return; }
  }
}

const toolbar = async (page) => union(btn(page, 'Zoom out'), btn(page, 'Regenerate'));

const stages = {
  async focus(page) {
    await openLakeside(page);
    await raw(page, '5-01-raw');
    await plate(page, '5-01-focus-view', {
      highlights: {
        header: { locator: page.getByText(/^Concept A$/).filter({ visible: true }).first(), label: 'Concept A' },
        bar: { locator: await toolbar(page), label: 'Image toolbar' },
        back: { locator: btn(page, 'All images'), label: 'All images' },
      },
      points: { back: { locator: btn(page, 'All images'), click: false } },
    });
    await btn(page, 'Top & eye-level').click();
    await page.waitForTimeout(2500);
    await plate(page, '5-02-top-eye-level', {
      highlights: {
        both: { locator: btn(page, 'Top & eye-level'), label: 'Top & eye-level' },
        eye: { locator: btn(page, 'Eye-level').or(btn(page, 'Top view')).first(), label: 'Eye-level' },
      },
      points: { both: btn(page, 'Top & eye-level') },
    });
    await btn(page, 'Top & eye-level').click();
    await page.waitForTimeout(1500);
    await btn(page, 'Compare').click();
    await page.waitForTimeout(2500);
    await raw(page, '5-03-raw');
    await plate(page, '5-03-compare', {
      highlights: {
        compare: { locator: btn(page, 'Compare'), label: 'Compare' },
        slider: { locator: await stage(page), label: 'Original | Variant' },
        original: { locator: btn(page, 'Original'), label: 'Original' },
        parent: { locator: page.getByRole('button', { name: /^(Parent|No parent image available)$/ }).filter({ visible: true }).first(), label: 'Parent' },
      },
      points: { compare: btn(page, 'Compare') },
    });
    await btn(page, 'Compare').click();
    await page.waitForTimeout(1500);
    const promptBtn = page.getByRole('button', { name: 'Prompt', exact: true }).last();     // the toolbar's, not the panel tab
    if (await promptBtn.count()) {
      await promptBtn.click();
      await page.waitForTimeout(2000);
      await raw(page, '5-04-raw');
      await plate(page, '5-04-prompt-used', {
        highlights: {
          prompt: { locator: promptBtn, label: 'Prompt' },
          copy: { locator: page.getByRole('button', { name: 'Copy prompt' }), label: 'Copy prompt' },
          reuse: { locator: page.getByRole('button', { name: 'Reuse' }), label: 'Reuse' },
        },
        points: { prompt: promptBtn },
      });
    } else console.log('no Prompt button on this image');
  },

  /* Marks two favourites (Timeline tiles 2 and 4), then 5-05 the Favorites filter. */
  async favs(page) {
    await go(page, `${SANDBOX}/ideation`);
    await btn(page, 'Timeline').click();
    await page.waitForTimeout(1500);
    // Two favourites: the fountain aerial (Concept A, iteration 2) and the Green streets plan. Skipped when already set.
    if ((await page.getByRole('button', { name: 'Unmark from favorites' }).filter({ visible: true }).count()) < 2) {
      for (const i of [1, 3]) { await page.getByRole('button', { name: /favorite/ }).filter({ visible: true }).nth(i).click(); await page.waitForTimeout(1200); }
    }
    await raw(page, '5-05-hearts');
    await btn(page, 'Favorites').click();
    await page.waitForTimeout(2000);
    await raw(page, '5-05-favorites');
    await plate(page, '5-05-favorites', {
      highlights: {
        filter: { locator: btn(page, 'Favorites'), label: 'Favorites' },
        shortlist: { locator: await union(page.getByRole('button', { name: 'Focus', exact: true }).first(), page.getByRole('button', { name: 'Focus', exact: true }).last()), label: 'Your favourites' },
        heart: { locator: page.getByRole('button', { name: 'Unmark from favorites' }).filter({ visible: true }).first(), label: 'Favourite' },
      },
      points: { filter: btn(page, 'Favorites') },
    });
    await btn(page, 'Favorites').click();                 // filter off again
    await page.waitForTimeout(1000);
  },

  /* 5-06 Select mode with the two favourites ticked, 5-07 Compare. */
  async select(page) {
    await go(page, `${SANDBOX}/ideation`);
    await btn(page, 'Timeline').click();
    await page.waitForTimeout(1500);
    await btn(page, 'Select').click();
    await page.waitForTimeout(1500);
    const picks = page.getByRole('button', { name: 'Select image' });
    await picks.nth(3).click(); await page.waitForTimeout(600);
    await picks.nth(1).click(); await page.waitForTimeout(800);
    await raw(page, '5-06-raw');
    await plate(page, '5-06-select', {
      highlights: {
        mode: { locator: btn(page, 'Select'), label: 'Select' },
        ticks: { locator: await union(page.getByRole('button', { name: 'Deselect image' }).first(), page.getByRole('button', { name: 'Deselect image' }).last()), label: '2 selected' },
        bar: { locator: await union(page.getByRole('button', { name: /^(Select all|Deselect all)$/ }).first(), page.getByRole('button', { name: /Send to production/ }).first()), label: 'Bulk actions' },
        compare: { locator: btn(page, 'Compare'), label: 'Compare' },
      },
      points: { compare: btn(page, 'Compare') },
    });
    await btn(page, 'Compare').click();
    await page.waitForTimeout(3000);
    const dlg = page.getByRole('dialog');
    await raw(page, '5-07-raw');
    const { both, closeBox } = await page.evaluate(() => {
      const top = (el) => { const r = el.getBoundingClientRect(); const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return hit === el || el.contains(hit) || (hit && hit.contains(el)); };
      const imgs = [...document.querySelectorAll('img')].filter((e) => e.getBoundingClientRect().width > 500 && top(e)).map((e) => e.getBoundingClientRect());
      const both = imgs.length ? { x: Math.min(...imgs.map((r) => r.x)), y: Math.min(...imgs.map((r) => r.y)), width: Math.max(...imgs.map((r) => r.right)) - Math.min(...imgs.map((r) => r.x)), height: Math.max(...imgs.map((r) => r.bottom)) - Math.min(...imgs.map((r) => r.y)) } : null;
      const c = [...document.querySelectorAll('button')].map((b) => b.getBoundingClientRect()).filter((r) => r.width > 0 && r.width < 60 && r.x > 1750 && r.y < 120 && top(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)))[0];
      return { both, closeBox: c ? { x: c.x, y: c.y, width: c.width, height: c.height } : null };
    });
    console.log('compare boxes', JSON.stringify({ both, closeBox }));
    await plate(page, '5-07-compare-side-by-side', {
      highlights: {
        pair: { locator: both, label: 'Side by side' },
        close: { locator: closeBox, label: 'Close' },
      },
      points: { close: { locator: closeBox, click: false } },
    });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(800);
    await btn(page, 'Select').click();
  },

  /* 5-08 Touch-up: a polygon over the central blocks and an instruction, then Apply to mask (a generation). */
  async touchup(page) {
    await openLakeside(page);
    const tab = page.getByRole('button', { name: 'Touch-up', exact: true }).first();
    await tab.click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Polygon', exact: true }).filter({ visible: true }).first().click();
    await page.waitForTimeout(1500);
    const map = await canvasMapper(page);
    const poly = [[0.335, 0.37], [0.47, 0.33], [0.51, 0.47], [0.40, 0.55], [0.34, 0.50]];
    for (const p of poly) { const [x, y] = map.at(p); await page.mouse.click(x, y); await page.waitForTimeout(300); }
    const [fx, fy] = map.at(poly[0]); await page.mouse.move(fx, fy); await page.waitForTimeout(300); await page.mouse.click(fx, fy);
    await page.waitForTimeout(800);
    const box = await page.getByPlaceholder(/Describe the change in the masked area/).filter({ visible: true }).first();
    await box.fill('Turn these blocks into a tree-lined central square with cafés and a small market hall.');
    await page.waitForTimeout(800);
    await raw(page, '5-08-raw');
    const xs = poly.map(([x]) => map.box.x + x * map.box.width), ys = poly.map(([, y]) => map.box.y + y * map.box.height);
    await plate(page, '5-08-touch-up', {
      highlights: {
        tab: { locator: tab, label: 'Touch-up' },
        tools: { locator: await union(page.getByRole('button', { name: 'Undo', exact: true }).filter({ visible: true }).first(), page.getByRole('button', { name: 'Polygon', exact: true }).filter({ visible: true }).first()), label: 'Drawing tools' },
        mask: { locator: { x: Math.min(...xs) - 8, y: Math.min(...ys) - 8, width: Math.max(...xs) - Math.min(...xs) + 16, height: Math.max(...ys) - Math.min(...ys) + 16 }, label: 'Marked region' },
        instruction: { locator: box, label: 'Instruction' },
        apply: { locator: page.getByRole('button', { name: 'Apply to mask' }), label: 'Apply to mask' },
      },
      points: { apply: page.getByRole('button', { name: 'Apply to mask' }) },
    });
    await page.getByRole('button', { name: 'Apply to mask' }).click();
    await waitForRun(page, '5-08-touchup');
    await page.waitForTimeout(3000);
    await raw(page, '5-08-after');
  },

  /* 5-09 Adjust: the Golden filter, then Save as new version. */
  async adjust(page) {
    await openLakeside(page);
    const tab = page.getByRole('button', { name: 'Adjust', exact: true }).first();
    await tab.click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Filters', exact: true }).or(page.getByRole('tab', { name: 'Filters', exact: true })).filter({ visible: true }).first().click();
    await page.waitForTimeout(2000);
    const golden = page.getByRole('button', { name: /^Golden/ }).filter({ visible: true }).first();
    await golden.click();
    await page.waitForTimeout(2500);
    await raw(page, '5-09-raw');
    await plate(page, '5-09-adjust', {
      highlights: {
        tab: { locator: tab, label: 'Adjust' },
        sub: { locator: await union(page.getByRole('button', { name: 'Adjust', exact: true }).filter({ visible: true }).nth(1), page.getByRole('button', { name: 'Filters', exact: true }).filter({ visible: true }).first()), label: 'Adjust or Filters' },
        filter: { locator: golden, label: 'Golden' },
        save: { locator: page.getByRole('button', { name: 'Save as new version' }), label: 'Save as new version' },
      },
      points: { filter: golden, save: { locator: page.getByRole('button', { name: 'Save as new version' }), click: false } },
    });
    if (process.env.NOSAVE) return;                  // re-take the plate without saving another version
    await page.getByRole('button', { name: 'Save as new version' }).click();
    await waitForRun(page, '5-09-adjust', 300);
    await page.waitForTimeout(3000);
    await raw(page, '5-09-after');
  },

  /* 5-09b the saved version, with its recipe captioned under the image. */
  async saved(page) {
    await go(page, `${SANDBOX}/ideation/04cb1986-d4a5-4d17-9329-c29e5ab76caf`, 9000);
    await raw(page, '5-09b-raw');
    await plate(page, '5-09b-adjust-saved', {
      highlights: {
        image: { locator: await stage(page), label: 'New version' },
        recipe: { locator: page.getByText(/^Filter: Golden/).filter({ visible: true }).first(), label: 'What was applied' },
      },
    });
  },

  /* 5-10 Prompt: a written change, then Generate (a generation). */
  async prompt(page) {
    await openLakeside(page);
    const tab = page.getByRole('button', { name: 'Prompt', exact: true }).first();     // the panel tab
    await tab.click();
    await page.waitForTimeout(2000);
    const ta = page.getByPlaceholder(/Describe a change or a new concept/).filter({ visible: true }).first();
    await ta.fill('Add a light-rail line along the main avenue, with a stop on the central square.');
    await page.waitForTimeout(800);
    await raw(page, '5-10-raw');
    await plate(page, '5-10-prompt', {
      highlights: {
        tab: { locator: tab, label: 'Prompt' },
        text: { locator: ta, label: 'Your change' },
        save: { locator: page.getByRole('button', { name: 'Save as quick action' }), label: 'Save as quick action' },
        recent: { locator: await union(page.getByText(/^recent prompts$/i).filter({ visible: true }).first(), page.getByText(/^recent prompts$/i).filter({ visible: true }).first()), label: 'Recent prompts' },
        generate: { locator: page.getByRole('button', { name: 'Generate', exact: true }), label: 'Generate' },
      },
      points: { generate: page.getByRole('button', { name: 'Generate', exact: true }) },
    });
    await page.getByRole('button', { name: 'Generate', exact: true }).click();
    await waitForRun(page, '5-10-prompt');
    await page.waitForTimeout(3000);
    await raw(page, '5-10-after');
  },

  /* 5-11 Impact: the Walkability question, then Analyse; 5-12 the answer. */
  async impact(page) {
    await openLakeside(page);
    const tab = page.getByRole('button', { name: 'Impact', exact: true }).first();
    await tab.click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Walkability', exact: true }).filter({ visible: true }).first().click();
    await page.waitForTimeout(800);
    await raw(page, '5-11-raw');
    await plate(page, '5-11-impact', {
      highlights: {
        tab: { locator: tab, label: 'Impact' },
        question: { locator: page.getByPlaceholder(/How would this affect/).filter({ visible: true }).first(), label: 'Your question' },
        chips: { locator: await union(page.getByRole('button', { name: 'Traffic', exact: true }), page.getByRole('button', { name: 'Walkability', exact: true })), label: 'Ready-made questions' },
        note: { locator: page.getByText(/^Indicative AI assessment/).filter({ visible: true }).first(), label: 'Indicative only' },
        analyse: { locator: page.getByRole('button', { name: 'Analyse', exact: true }), label: 'Analyse' },
      },
      points: { chips: page.getByRole('button', { name: 'Walkability', exact: true }), analyse: page.getByRole('button', { name: 'Analyse', exact: true }) },
    });
    await page.getByRole('button', { name: 'Analyse', exact: true }).click();
    await waitForRun(page, '5-11-impact', 300);
    await page.waitForTimeout(3000);
    await raw(page, '5-12-raw');
  },

  /* 5-12 the impact answer (asked again if this tab has none: a short AI call). */
  async answer(page) {
    await openLakeside(page);
    await page.getByRole('button', { name: 'Impact', exact: true }).first().click();
    await page.waitForTimeout(2000);
    if (!(await page.getByText('Compact grid').count())) {
      await page.getByRole('button', { name: 'Walkability', exact: true }).filter({ visible: true }).first().click();
      await page.getByRole('button', { name: 'Analyse', exact: true }).click();
      await waitForRun(page, '5-12-impact', 300);
      await page.waitForTimeout(2000);
    }
    await raw(page, '5-12-raw2');
    const q = page.getByText(/^How would this design affect walkability/).filter({ visible: true }).last();
    await plate(page, '5-12-impact-answer', {
      highlights: {
        summary: { locator: await card(q, { minWidth: 280 }), label: 'The assessment' },
        plus: { locator: page.getByText(/^Compact grid$/).filter({ visible: true }).first(), label: 'Works for it' },
        minus: { locator: page.getByText(/^Perimeter barriers$/).filter({ visible: true }).first(), label: 'Works against it' },
      },
    });
  },
};

if (require.main === module) (async () => {
  const name = process.argv[2];
  if (!stages[name]) { console.error('stages:', Object.keys(stages).join(', ')); process.exit(64); }
  const { page, close } = await open();
  try { await stages[name](page); }
  catch (e) { console.error('ERR', String(e.message).split('\n')[0]); await raw(page, `5-error-${name}`).catch(() => {}); process.exitCode = 1; }
  finally { await close(); }
})();

module.exports = { openLakeside, waitForRun, btn };
