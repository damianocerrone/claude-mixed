/*
 * Chapter 4 · Generate design options. Plates 4-NN-*.webp, taken in the sandbox project.
 *
 *   node tools/flows/04-ideation.js panel    # 4-01..4-05 the Quick actions panel, choices staged (nothing generated)
 *   node tools/flows/04-ideation.js run1     # stages the same choices, Apply to current: the first generation
 *   node tools/flows/04-ideation.js results  # 4-07 the first results
 *
 * The PENDING tray lives only in the open tab, so `run1` stages the choices again before applying them.
 */
'use strict';

const { SANDBOX, open, go, union, card, plate, raw } = require('./lib');

/* The first batch: a mid-density, balanced, illustrative take with a park and a transit stop, by day, with people. */
const FIRST = { density: 'Medium-high', creativity: 'Balanced', style: 'Illustrative', required: ['Public park', 'Transit stop'], scene: 'Day', additive: ['People'] };

async function quickTab(page) {
  await go(page, `${SANDBOX}/ideation`);
  const tab = page.getByRole('button', { name: 'Quick actions', exact: true });
  await tab.click();
  await page.waitForTimeout(1500);
  return tab;
}

const chip = (page, name) => page.getByRole('button', { name, exact: true }).filter({ visible: true }).first();
/* Select a chip only if it is not selected yet (Required elements are saved to the project, so a second click would remove them). */
const pick = async (page, name) => {
  const c = chip(page, name);
  await c.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  if ((await c.getAttribute('aria-pressed')) !== 'true') { await c.click(); await page.waitForTimeout(400); }
};
const heading = (page, re) => page.getByText(re).filter({ visible: true }).first();
/* Scroll the Actions panel so an element sits in the middle (clear of the sticky header and the pending tray). */
const center = async (loc) => { await loc.evaluate((el) => el.scrollIntoView({ block: 'center' })); await loc.page().waitForTimeout(500); };

async function stage(page, choice) {
  for (const n of [choice.density, choice.creativity, choice.style, ...choice.required, choice.scene, ...choice.additive]) await pick(page, n);
}

/* Wait for a generation started in this tab: the stage shows "Composing prompt…" then "Generating variant N of 2…". */
async function waitForGeneration(page, label, { max = 600 } = {}) {
  const t0 = Date.now();
  let seenBusy = false;
  let progressShot = null;
  for (;;) {
    await page.waitForTimeout(5000);
    const text = await page.evaluate(() => document.body.innerText);
    const busy = /Composing prompt|Generating variant|Generating…|Analysing|Rendering/i.test(text);
    if (busy) seenBusy = true;
    const secs = Math.round((Date.now() - t0) / 1000);
    if (busy && !progressShot && /Generating variant/i.test(text)) progressShot = await raw(page, `${label}-progress`);
    if ((seenBusy && !busy) || secs > max) { console.log(`${label}: ${seenBusy ? 'done' : 'never saw progress'} after ${secs}s`); return { secs, seenBusy }; }
  }
}

async function allImages(page) {
  await page.getByRole('button', { name: 'All images' }).click();
  await page.waitForTimeout(2500);
}

const stages = {
  async panel(page) {
    const tab = await quickTab(page);
    await raw(page, '4-01-raw');
    await plate(page, '4-01-quick-actions', {
      highlights: {
        tab: { locator: tab, label: 'Quick actions' },
        pill: { locator: page.getByText('Use the quick actions to start ideating').filter({ visible: true }).first(), label: 'Hint' },
        scope: { locator: await union(heading(page, /^Scope$/), chip(page, 'Single building or lot')), label: 'Scope' },
        apply: { locator: page.getByRole('button', { name: 'Apply to current' }), label: 'Apply to current' },
      },
      points: { tab },
    });
    await pick(page, FIRST.density);
    await pick(page, FIRST.creativity);
    await center(heading(page, /^Density$/));
    await raw(page, '4-02-raw-a');
    await plate(page, '4-02-density-creativity', {
      highlights: {
        density: { locator: await card(heading(page, /^Density$/)), label: 'Density' },
        creativity: { locator: await card(heading(page, /^Creativity$/)), label: 'Creativity' },
      },
      points: { density: chip(page, FIRST.density), creativity: chip(page, FIRST.creativity) },
    });
    await pick(page, FIRST.style);
    await center(heading(page, /^Reference Images$/));
    await raw(page, '4-03-raw');
    await plate(page, '4-03-style-references', {
      highlights: {
        style: { locator: await card(heading(page, /^Render Style$/)), label: 'Render Style' },
        refs: { locator: await card(heading(page, /^Reference Images$/)), label: 'Reference images' },
      },
      points: { style: chip(page, FIRST.style), refs: page.getByRole('button', { name: 'Choose from uploaded images' }).filter({ visible: true }).first() },
    });
    for (const n of FIRST.required) await pick(page, n);
    await center(heading(page, /^Required elements$/));
    await raw(page, '4-04-raw');
    await plate(page, '4-04-required-elements', {
      highlights: {
        required: { locator: await card(heading(page, /^Required elements$/)), label: 'Required elements' },
        add: { locator: chip(page, 'Add other'), label: 'Add other' },
      },
      points: { required: chip(page, 'Transit stop'), add: { locator: chip(page, 'Add other'), click: false } },
    });
    await pick(page, FIRST.scene);
    for (const n of FIRST.additive) await pick(page, n);
    await center(heading(page, /^Adjust$/));
    await raw(page, '4-05-raw');
    await plate(page, '4-05-scene-adjust', {
      highlights: {
        scene: { locator: await card(chip(page, 'Day')), label: 'Scene' },
        adjust: { locator: await card(heading(page, /^Adjust$/)), label: 'Adjust' },
        additive: { locator: await card(heading(page, /^Add$/)), label: 'Add' },
      },
      points: { scene: chip(page, 'Day'), additive: chip(page, 'People') },
    });
    await center(heading(page, /^Output quality$/));
    await raw(page, '4-06-raw');
    const tray = await card(page.getByText(/^PENDING/i), { mustInclude: 'Density' });
    await plate(page, '4-06-output-pending', {
      highlights: {
        output: { locator: await union(heading(page, /^Aspect Ratio$/), page.getByRole('combobox').filter({ visible: true }).last()), label: 'Output' },
        pending: { locator: tray, label: 'Pending' },
        apply: { locator: await union(page.getByRole('button', { name: 'Apply to current' }), page.getByText(/^Each run generates/)), label: 'Apply to current' },
      },
      points: { apply: { locator: page.getByRole('button', { name: 'Apply to current' }), click: false } },
    });
  },

  /* The first generation: stage FIRST, Apply to current, follow the progress, then 4-07 progress and 4-08 results. */
  async run1(page) {
    await quickTab(page);
    await stage(page, FIRST);
    await raw(page, '4-run1-before');
    await page.getByRole('button', { name: 'Apply to current' }).click();
    const t0 = Date.now();
    let shotProgress = false;
    for (let i = 0; i < 60; i++) {
      await page.waitForTimeout(i === 0 ? 4000 : 10000);
      const text = await raw(page, `4-run1-${String(i).padStart(2, '0')}`);
      const secs = Math.round((Date.now() - t0) / 1000);
      const done = /Concept A/.test(text) && /\bI1\b/.test(text) && !/Generating|generating|Rendering|In progress|Queued/.test(text);
      console.log(`${secs}s`, done ? 'DONE' : 'working', '|', text.replace(/\s+/g, ' ').slice(0, 160));
      if (!shotProgress && !done) { await plate(page, '4-07-generating', {}); shotProgress = true; }
      if (done) break;
    }
  },

  /* 4-08 the first results in the image grid, Latest + Pair: each variant as a top view beside an eye-level view. */
  async results(page) {
    await go(page, `${SANDBOX}/ideation`);
    await page.getByRole('button', { name: 'Latest', exact: true }).click();
    await page.waitForTimeout(1500);
    const pairBtn = page.getByRole('button', { name: 'Pair', exact: true });
    if ((await pairBtn.getAttribute('aria-pressed')) === 'false') { await pairBtn.click(); await page.waitForTimeout(1500); }
    await raw(page, '4-08-raw');
    await plate(page, '4-08-first-results', {
      highlights: {
        variants: { locator: await union(page.getByRole('button', { name: 'Focus', exact: true }).first(), page.getByRole('button', { name: 'Focus eye-level' }).last()), label: 'Two variants' },
        top: { locator: page.getByRole('button', { name: 'Focus', exact: true }).first(), label: 'Top view' },
        eye: { locator: page.getByRole('button', { name: 'Focus eye-level' }).first(), label: 'Eye-level view' },
        badge: { locator: page.getByText(/^I1$/).filter({ visible: true }).first(), label: 'Iteration 1' },
        views: { locator: await union(page.getByRole('button', { name: 'Select', exact: true }), page.getByRole('button', { name: 'Timeline', exact: true })), label: 'Views' },
        fresh: { locator: page.getByRole('button', { name: /New concept/ }), label: 'New concept' },
      },
      points: { top: page.getByRole('button', { name: 'Focus', exact: true }).first() },
    });
  },

  /* A look at the Latest view (Pair / Single), not a plate. */
  async latest(page) {
    await go(page, `${SANDBOX}/ideation`);
    await page.getByRole('button', { name: 'Latest', exact: true }).click();
    await page.waitForTimeout(2500);
    await raw(page, '4-08-latest');
    await page.getByRole('button', { name: 'Timeline', exact: true }).click();     // leave the view as found
    await page.waitForTimeout(1500);
  },

  /* 4-09 a variant in focus with new choices staged; Apply to current runs iteration 2; 4-10 the timeline. */
  async iterate(page) {
    await go(page, `${SANDBOX}/ideation`);
    await page.getByRole('button', { name: 'Focus' }).first().click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Quick actions', exact: true }).click();
    await page.waitForTimeout(1200);
    await pick(page, 'Dusk');
    await pick(page, 'Water feature');
    await center(heading(page, /^Adjust$/));
    const slider = page.getByRole('slider').filter({ visible: true }).first();
    if (await slider.count()) { await slider.focus(); await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(500); }
    await raw(page, '4-09-raw');
    const tray = await card(page.getByText(/^PENDING/i), { mustInclude: 'Clear' });
    await plate(page, '4-09-iterate', {
      highlights: {
        focus: { locator: page.getByText(/^Concept A$/).filter({ visible: true }).first(), label: 'Image in focus' },
        tray: { locator: tray, label: 'Pending' },
        apply: { locator: page.getByRole('button', { name: 'Apply to current' }), label: 'Apply to current' },
      },
      points: { apply: page.getByRole('button', { name: 'Apply to current' }) },
    });
    await page.getByRole('button', { name: 'Apply to current' }).click();
    await waitForGeneration(page, '4-09-run2');
    await allImages(page);
    await page.getByRole('button', { name: 'Timeline', exact: true }).click();
    await page.waitForTimeout(2000);
    await raw(page, '4-10-raw');
  },

  /* 4-09 again without applying: the same choices staged on an I1 variant (the tab is closed, so nothing runs). */
  async iterplate(page) {
    await go(page, `${SANDBOX}/ideation`);
    await page.getByRole('button', { name: 'Timeline', exact: true }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Focus', exact: true }).nth(2).click();     // an iteration-1 variant
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Quick actions', exact: true }).click();
    await page.waitForTimeout(1200);
    await pick(page, 'Dusk');
    await pick(page, 'Water feature');
    await center(heading(page, /^Adjust$/));
    const slider = page.getByRole('slider').filter({ visible: true }).first();
    await slider.focus(); await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(500);
    await center(heading(page, /^Add$/));
    const tray = await card(page.getByText(/^PENDING/i), { mustInclude: 'Water feature' });
    await plate(page, '4-09-iterate', {
      highlights: {
        focus: { locator: page.getByText(/^Concept A$/).filter({ visible: true }).first(), label: 'Image in focus' },
        choices: { locator: await union(chip(page, 'Dusk'), chip(page, 'Water feature')), label: 'New choices' },
        tray: { locator: tray, label: 'Pending' },
        apply: { locator: page.getByRole('button', { name: 'Apply to current' }), label: 'Apply to current' },
      },
      points: { apply: { locator: page.getByRole('button', { name: 'Apply to current' }), click: true } },
    });
  },

  /* 4-10 the timeline: iteration 2 above iteration 1. */
  async timeline(page) {
    await go(page, `${SANDBOX}/ideation`);
    await page.getByRole('button', { name: 'Timeline', exact: true }).click();
    await page.waitForTimeout(2000);
    const tiles = page.getByRole('button', { name: 'Focus', exact: true });
    await plate(page, '4-10-timeline', {
      highlights: {
        i2: { locator: await union(tiles.nth(0), tiles.nth(1)), label: 'Iteration 2' },
        i1: { locator: await union(tiles.nth(2), tiles.nth(3)), label: 'Iteration 1' },
        toggle: { locator: await union(page.getByRole('button', { name: 'Latest', exact: true }), page.getByRole('button', { name: 'Timeline', exact: true })), label: 'Latest or Timeline' },
      },
      points: { toggle: page.getByRole('button', { name: 'Timeline', exact: true }) },
    });
  },

  /* Probe: what + New concept does (raw captures only). */
  async probenew(page) {
    await go(page, `${SANDBOX}/ideation`);
    await page.getByRole('button', { name: /New concept/ }).click();
    await page.waitForTimeout(3000);
    const t = await raw(page, '4-11-newconcept-probe');
    console.log(page.url(), '|', t.replace(/\s+/g, ' ').slice(0, 900));
    const d = page.getByRole('dialog');
    if (await d.count()) console.log('DIALOG:', (await d.first().innerText()).replace(/\s+/g, ' ').slice(0, 900));
  },

  /* 4-11 the New concept dialog filled in, Create concept (a generation), then 4-12 two concepts in the grid. */
  async newconcept(page) {
    await go(page, `${SANDBOX}/ideation`);
    await page.getByRole('button', { name: /New concept/ }).click();
    await page.waitForTimeout(2500);
    const d = page.getByRole('dialog');
    await d.getByRole('textbox').first().fill('Green streets');
    await d.getByRole('button', { name: 'Day', exact: true }).click();
    const sl = d.getByRole('slider').first();
    if (await sl.count()) { await sl.focus(); for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight'); }
    await d.getByRole('button', { name: 'People', exact: true }).click();
    await page.waitForTimeout(800);
    await raw(page, '4-11-raw');
    await plate(page, '4-11-new-concept', {
      highlights: {
        intro: { locator: await union(d.getByText('New concept', { exact: true }).first(), d.getByText(/^A concept is a separate timeline/).first()), label: 'New concept' },
        name: { locator: d.getByRole('textbox').first(), label: 'Concept name' },
        changes: { locator: await union(d.getByText(/^scene$/i).first(), d.getByRole('button', { name: 'People', exact: true })), label: 'What sets it apart' },
        create: { locator: d.getByRole('button', { name: 'Create concept' }), label: 'Create concept' },
      },
      points: { create: d.getByRole('button', { name: 'Create concept' }) },
    });
    await d.getByRole('button', { name: 'Create concept' }).click();
    await waitForGeneration(page, '4-11-run3');
    await go(page, `${SANDBOX}/ideation`);
    await page.getByRole('button', { name: 'Latest', exact: true }).click();
    await page.waitForTimeout(2500);
    await raw(page, '4-12-raw');
  },

  async concepts(page) {
    await go(page, `${SANDBOX}/ideation`);
    await page.getByRole('button', { name: 'Latest', exact: true }).click();
    await page.waitForTimeout(2500);
    await page.getByRole('button', { name: 'Single', exact: true }).click();     // top views only
    await page.waitForTimeout(2000);
    const chips = page.getByRole('button', { name: /^(Concept A|Green streets) \d+$/ });
    await raw(page, '4-12-raw');
    await plate(page, '4-12-two-concepts', {
      highlights: {
        chips: { locator: await union(chips.first(), chips.last()), label: 'Concepts' },
        b: { locator: await union(page.getByText(/^Green streets$/).filter({ visible: true }).last(), page.getByRole('button', { name: 'Rename concept' }).last()), label: 'Green streets' },
        single: { locator: await union(page.getByRole('button', { name: 'Pair', exact: true }), page.getByRole('button', { name: 'Single', exact: true })), label: 'Pair or Single' },
      },
      points: { chips: chips.last(), single: page.getByRole('button', { name: 'Single', exact: true }) },
    });
    await page.getByRole('button', { name: 'Pair', exact: true }).click();
    await page.waitForTimeout(1000);
  },

  /* 4-13 the Presets tab (no planning presets in this organisation yet). */
  async presets(page) {
    await go(page, `${SANDBOX}/ideation`);
    const tab = page.getByRole('button', { name: 'Presets', exact: true });
    await tab.click();
    await page.waitForTimeout(2000);
    await raw(page, '4-13-raw');
    await plate(page, '4-13-presets', {
      highlights: {
        tab: { locator: tab, label: 'Presets' },
        empty: { locator: page.getByText(/No planning presets/).filter({ visible: true }).first(), label: 'No presets yet' },
        save: { locator: page.getByRole('button', { name: 'Save as planning preset' }), label: 'Save as planning preset' },
      },
      points: { tab, save: { locator: page.getByRole('button', { name: 'Save as planning preset' }), click: false } },
    });
  },
};

if (require.main === module) (async () => {
  const name = process.argv[2];
  if (!stages[name]) { console.error('stages:', Object.keys(stages).join(', ')); process.exit(64); }
  const { page, close } = await open();
  try { await stages[name](page); }
  catch (e) { console.error('ERR', String(e.message).split('\n')[0]); await raw(page, `4-error-${name}`).catch(() => {}); process.exitCode = 1; }
  finally { await close(); }
})();

module.exports = { FIRST, quickTab, stage, chip, heading, center };
