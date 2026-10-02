/*
 * Chapter 3 · Prepare the site. Plates 3-NN-*.webp, taken in the sandbox project.
 * The Site tab's editors lock once the first generation has run, so these plates are taken before chapter 4's.
 *
 *   node tools/flows/03-site.js tab        # 3-01 the Site tab, 3-02 the boundary editor (nothing saved)
 *   node tools/flows/03-site.js polygon    # 3-03 a polygon in progress, 3-04 closed (nothing saved)
 *   node tools/flows/03-site.js save       # draws the polygon again and saves it, 3-05 the boundary set
 *   node tools/flows/03-site.js landuse    # 3-06 the land-use editor, 3-07 painted zones (nothing saved)
 *   node tools/flows/03-site.js landsave   # paints and saves the plan, 3-08 the plan set
 *   node tools/flows/03-site.js ready      # 3-09 the colour standard, 3-10 ready to start ideation
 */
'use strict';

const { SANDBOX, open, go, union, plate, raw } = require('./lib');

/* The site outline along the dashed "Downtown" line of the leading image, as fractions of the image. */
const SITE = [
  [0.0233, 0.2338], [0.1462, 0.2578], [0.2673, 0.2254], [0.4466, 0.0839], [0.5991, 0.0468], [0.6888, 0.054],
  [0.8861, 0.0815], [0.8789, 0.1571], [0.9291, 0.199], [0.9327, 0.2878], [0.8502, 0.3357], [0.8466, 0.4197],
  [0.5184, 0.5647], [0.3749, 0.6811], [0.2045, 0.9233],
];

/* Land-use zones to paint, as [swatch name, polygon in image fractions]. */
const ZONES = [
  ['Open space', [[0.04, 0.24], [0.27, 0.235], [0.33, 0.29], [0.13, 0.33], [0.06, 0.31]]],
  ['Mixed use', [[0.3588, 0.4005], [0.4803, 0.3667], [0.5208, 0.4682], [0.4904, 0.5359], [0.3689, 0.5629], [0.3537, 0.4817]]],
  ['Residential', [[0.70, 0.09], [0.88, 0.10], [0.87, 0.19], [0.71, 0.21]]],
  ['Commercial', [[0.7586, 0.272], [0.8902, 0.2382], [0.9306, 0.2855], [0.8496, 0.3396], [0.8446, 0.4141], [0.8193, 0.4141], [0.8143, 0.3532], [0.7738, 0.3599]]],
];

async function siteTab(page) {
  await go(page, `${SANDBOX}/ideation`);
  const tab = page.getByRole('button', { name: 'Site', exact: true });
  await tab.click();
  await page.waitForTimeout(1500);
  return tab;
}

/* The visible drawing canvas and a mapper from image fractions to page px. */
async function canvasMapper(page) {
  const canvases = page.locator('canvas');
  const n = await canvases.count();
  let best = null;
  for (let i = 0; i < n; i++) {
    const b = await canvases.nth(i).boundingBox();
    if (b && b.width > 200 && (!best || b.width * b.height > best.width * best.height)) best = b;
  }
  if (!best) throw new Error('no visible canvas');
  return { box: best, at: ([fx, fy]) => [best.x + fx * best.width, best.y + fy * best.height] };
}

async function clickPolygon(page, pts, { close = true, upto = pts.length } = {}) {
  const map = await canvasMapper(page);
  for (let i = 0; i < upto; i++) {
    const [x, y] = map.at(pts[i]);
    await page.mouse.click(x, y);
    await page.waitForTimeout(250);
  }
  if (close) {
    const [x, y] = map.at(pts[0]);
    await page.mouse.move(x, y);
    await page.waitForTimeout(300);
    await page.mouse.click(x, y);
    await page.waitForTimeout(600);
  }
  return map;
}

async function openEditor(page) {
  await siteTab(page);
  const draw = page.getByRole('button', { name: /^(Draw|Redraw) boundary$/ });
  await draw.click();
  await page.waitForTimeout(3500);
  await page.getByRole('button', { name: /^Polygon/ }).click();
  await page.waitForTimeout(800);
}

const stages = {
  async tab(page) {
    const tab = await siteTab(page);
    await plate(page, '3-01-site-tab', {
      highlights: {
        tab: { locator: tab, label: 'Site' },
        boundary: { locator: await union(page.getByText('Site boundary', { exact: true }), page.getByRole('button', { name: 'Draw boundary' })), label: 'Site boundary' },
        landuse: { locator: await union(page.getByText('Land use plan', { exact: true }), page.getByRole('button', { name: 'Plan land use' })), label: 'Land use plan' },
        legend: { locator: await union(page.getByText(/^colour legend$/i), page.getByText('Community facilities', { exact: true })), label: 'Colour legend' },
        pill: { locator: page.getByText('Start ideation from the Site tab when ready').filter({ visible: true }).first(), label: 'Hint' },
        start: { locator: page.getByRole('button', { name: 'Start ideation' }), label: 'Start ideation' },
      },
      points: {
        tab,
        boundary: page.getByRole('button', { name: 'Draw boundary' }),
        landuse: page.getByRole('button', { name: 'Plan land use' }),
        start: { locator: page.getByRole('button', { name: 'Start ideation' }), click: false },
      },
    });
    await page.getByRole('button', { name: 'Draw boundary' }).click();
    await page.waitForTimeout(3500);
    const map = await canvasMapper(page);
    console.log('canvas', JSON.stringify(map.box));
    await plate(page, '3-02-boundary-editor', {
      highlights: {
        header: { locator: await union(page.getByText('Set the site boundary', { exact: true }), page.getByText(/^Draw a closed line around the site on the leading image/)), label: 'Instructions' },
        polygon: { locator: page.getByRole('button', { name: /^Polygon/ }), label: 'Polygon' },
        outline: { locator: page.getByRole('button', { name: /^Outline/ }), label: 'Outline' },
        history: { locator: await union(page.getByRole('button', { name: 'Undo' }), page.getByRole('button', { name: 'Zoom in' })), label: 'Undo, redo, zoom' },
        back: { locator: page.getByRole('button', { name: 'Back', exact: true }), label: 'Back' },
        save: { locator: page.getByRole('button', { name: 'Save boundary' }), label: 'Save boundary' },
      },
      points: {
        polygon: page.getByRole('button', { name: /^Polygon/ }),
        back: { locator: page.getByRole('button', { name: 'Back', exact: true }), click: false },
        save: { locator: page.getByRole('button', { name: 'Save boundary' }), click: false },
      },
    });
    await raw(page, '3-02-editor-raw');
    await page.getByRole('button', { name: 'Back', exact: true }).click();     // nothing drawn, nothing saved
    await page.waitForTimeout(2000);
  },

  /* 3-03 polygon in progress, 3-04 closed, then Save boundary, 3-05 boundary set; checks View boundary. */
  async polygon(page) {
    await openEditor(page);
    const map = await clickPolygon(page, SITE, { close: false, upto: 9 });
    const first = map.at(SITE[0]);
    const last = map.at(SITE[8]);
    await page.mouse.move(last[0] + 40, last[1] + 60);
    await page.waitForTimeout(500);
    await plate(page, '3-03-boundary-polygon', {
      highlights: {
        tool: { locator: page.getByRole('button', { name: /^Polygon/ }), label: 'Polygon' },
        corners: { locator: { x: map.box.x + 0.0 * map.box.width, y: map.box.y + 0.02 * map.box.height, width: 0.95 * map.box.width, height: 0.34 * map.box.height }, label: 'Corners so far' },
      },
      points: { next: { locator: { x: first[0] - 6, y: first[1] - 6, width: 12, height: 12 }, click: false } },
    });
    for (let i = 9; i < SITE.length; i++) { const [x, y] = map.at(SITE[i]); await page.mouse.click(x, y); await page.waitForTimeout(250); }
    await page.mouse.move(first[0], first[1]);
    await page.waitForTimeout(400);
    await page.mouse.click(first[0], first[1]);
    await page.waitForTimeout(800);
    await plate(page, '3-04-boundary-closed', {
      highlights: {
        site: { locator: { x: map.box.x, y: map.box.y, width: map.box.width, height: 0.95 * map.box.height }, label: 'Closed boundary' },
        undo: { locator: page.getByRole('button', { name: 'Undo' }), label: 'Undo' },
        save: { locator: page.getByRole('button', { name: 'Save boundary' }), label: 'Save boundary' },
      },
      points: { save: page.getByRole('button', { name: 'Save boundary' }) },
    });
    await page.getByRole('button', { name: 'Save boundary' }).click();
    await page.waitForTimeout(1200);
    await raw(page, '3-04b-setting-boundary');
    await page.waitForTimeout(8000);
    const text = await raw(page, '3-05-after-save');
    console.log('after save:', /Boundary set/.test(text) ? 'toast seen' : 'no toast', '| status:', (text.match(/Site boundary\s*\n\s*(\S[^\n]*)/) || [])[1]);
    await plate(page, '3-05-boundary-set', {
      highlights: {
        status: { locator: await union(page.getByText('Site boundary', { exact: true }).filter({ visible: true }), page.getByRole('button', { name: 'View boundary' })), label: 'Boundary set' },
        redraw: { locator: page.getByRole('button', { name: 'Redraw boundary' }), label: 'Redraw' },
        clear: { locator: page.getByRole('button', { name: 'Clear boundary' }), label: 'Clear' },
        hide: { locator: page.getByRole('button', { name: /site boundary$/ }).filter({ hasText: /Hide|Show/ }).first(), label: 'Hide or show' },
        view: { locator: page.getByRole('button', { name: 'View boundary' }), label: 'View boundary' },
      },
      points: { view: { locator: page.getByRole('button', { name: 'View boundary' }), click: true } },
    });
    await page.getByRole('button', { name: 'View boundary' }).click();
    await page.waitForTimeout(2500);
    await raw(page, '3-05b-view-boundary');
    await page.keyboard.press('Escape');
  },

  /* 3-05 again on its own (the boundary is already set). */
  async set(page) {
    await siteTab(page);
    await plate(page, '3-05-boundary-set', {
      highlights: {
        status: { locator: await union(page.getByText('Site boundary', { exact: true }), page.getByRole('button', { name: 'View boundary' })), label: 'Boundary set' },
        redraw: { locator: page.getByRole('button', { name: 'Redraw boundary' }), label: 'Redraw' },
        clear: { locator: page.getByRole('button', { name: 'Clear boundary' }), label: 'Clear' },
        view: { locator: page.getByRole('button', { name: 'View boundary' }), label: 'View boundary' },
      },
      points: { view: { locator: page.getByRole('button', { name: 'View boundary' }), click: true } },
    });
  },

  /* 3-06 the land-use editor, 3-07 painted zones, then Save land-use plan and 3-08 the plan set. */
  async landuse(page) {
    await siteTab(page);
    await page.getByRole('button', { name: 'Plan land use' }).click();
    await page.waitForTimeout(3500);
    const swatch = (name) => page.locator(`button[title="${name}"]`).filter({ visible: true }).first();
    const fill = page.getByRole('button', { name: /^Fill polygon/ }).filter({ visible: true }).first();
    await raw(page, '3-06-landuse-raw');
    await plate(page, '3-06-landuse-editor', {
      highlights: {
        header: { locator: await union(page.getByText('Plan land use', { exact: true }), page.getByText(/^Colour the site by land use/)), label: 'Instructions' },
        swatches: { locator: await union(swatch('Residential'), swatch('Community facilities')), label: 'Land uses' },
        tools: { locator: await union(page.getByRole('button', { name: /^Freehand/ }), fill), label: 'Paint tools' },
        save: { locator: page.getByRole('button', { name: 'Save land-use plan' }), label: 'Save land-use plan' },
      },
      points: { tools: fill, swatches: swatch('Residential') },
    });
    for (const [name, poly] of ZONES) {
      await swatch(name).click();
      await page.waitForTimeout(500);
      await fill.click();
      await page.waitForTimeout(500);
      await clickPolygon(page, poly);
      await page.waitForTimeout(500);
    }
    await page.mouse.move(1880, 600);
    const map = await canvasMapper(page);
    await plate(page, '3-07-landuse-painted', {
      highlights: {
        zones: { locator: { x: map.box.x + 0.02 * map.box.width, y: map.box.y + 0.05 * map.box.height, width: 0.94 * map.box.width, height: 0.55 * map.box.height }, label: 'Painted zones' },
        recalc: { locator: page.getByRole('button', { name: 'Recalculate land uses' }), label: 'Recalculate' },
        save: { locator: page.getByRole('button', { name: 'Save land-use plan' }), label: 'Save land-use plan' },
      },
      points: { save: page.getByRole('button', { name: 'Save land-use plan' }) },
    });
    await page.getByRole('button', { name: 'Save land-use plan' }).click();
    await page.waitForTimeout(12000);
    const text = await raw(page, '3-08-after-save');
    console.log('after land-use save:', (text.match(/Land use plan[\s\S]{0,400}/) || [''])[0].replace(/\n+/g, ' | '));
  },

  /* 3-08 the recognition review that follows Save land-use plan, then Continue as land use. */
  async review(page) {
    await go(page, `${SANDBOX}/ideation/land-use`);
    const sb = page.getByText('Site boundary', { exact: true }).filter({ visible: true }).first();
    await sb.click();                                   // collapse the boundary section so the recognised list fits
    await page.waitForTimeout(800);
    await raw(page, '3-08-review-raw');
    await plate(page, '3-08-landuse-review', {
      highlights: {
        header: { locator: await union(page.getByText('Land-use plan recognised', { exact: true }), page.getByText(/^Review the land uses read from/)), label: 'Recognised' },
        uses: { locator: await union(page.getByText(/^recognised land uses$/i), page.getByText(/^Many areas didn.t match/)), label: 'Recognised land uses' },
        draw: { locator: page.getByRole('button', { name: 'Draw land use' }), label: 'Draw land use' },
        cont: { locator: page.getByRole('button', { name: 'Continue as land use' }), label: 'Continue as land use' },
      },
      points: { cont: page.getByRole('button', { name: 'Continue as land use' }) },
    });
    await page.getByRole('button', { name: 'Continue as land use' }).click();
    await page.waitForTimeout(6000);
    const t = await raw(page, '3-09-after-continue');
    console.log('after continue:', page.url(), '|', (t.match(/Land use plan[\s\S]{0,500}/) || [''])[0].replace(/\n+/g, ' | '));
  },

  /* 3-09 the plan set on the Site tab. */
  async landset(page) {
    await siteTab(page);
    await page.getByText('Site boundary', { exact: true }).filter({ visible: true }).first().click();   // collapse: room for the list
    await page.waitForTimeout(800);
    await plate(page, '3-09-landuse-set', {
      highlights: {
        status: { locator: page.getByText('Land use plan', { exact: true }).filter({ visible: true }).first(), label: 'Set' },
        actions: { locator: await union(page.getByRole('button', { name: 'Review land use' }), page.getByRole('button', { name: 'Unmark plan' }), page.getByRole('button', { name: 'Hide land use plan' })), label: 'Review, unmark, hide' },
        uses: { locator: await union(page.getByText(/^recognised land uses$/i), page.getByText(/^Many areas didn.t match/)), label: 'Recognised land uses' },
        view: { locator: page.getByRole('button', { name: 'View plan' }), label: 'View plan' },
      },
      points: { view: page.getByRole('button', { name: 'View plan' }) },
    });
  },

  /* 3-10 the project's land-use colour standard, opened from the legend's icon (view only). */
  async colours(page) {
    await siteTab(page);
    await page.getByRole('button', { name: 'Edit colours in project settings' }).click();
    await page.waitForTimeout(2500);
    const dlg = page.getByRole('dialog');
    await dlg.getByText(/land-use colour standard/i).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await raw(page, '3-10-colours-raw');
    await plate(page, '3-10-colour-standard', {
      highlights: {
        standard: { locator: await union(dlg.getByText(/land-use colour standard/i).first(), dlg.getByText('Too close to the red boundary marker').first()), label: 'Colour standard' },
        warn: { locator: dlg.getByText('Too close to the red boundary marker').first(), label: 'Clash warning' },
        save: { locator: dlg.getByRole('button', { name: 'Save', exact: true }), label: 'Save' },
      },
      points: { save: { locator: dlg.getByRole('button', { name: 'Save', exact: true }), click: false } },
    });
    await page.keyboard.press('Escape');
  },

  /* 3-11 everything in place: Start ideation (not clicked here; chapter 4 does it). */
  async ready(page) {
    await siteTab(page);
    await plate(page, '3-11-start-ideation', {
      highlights: {
        boundary: { locator: page.getByText('Site boundary', { exact: true }).filter({ visible: true }).first(), label: 'Boundary set' },
        landuse: { locator: page.getByText('Land use plan', { exact: true }).filter({ visible: true }).first(), label: 'Plan set' },
        start: { locator: page.getByRole('button', { name: 'Start ideation' }), label: 'Start ideation' },
      },
      points: { start: { locator: page.getByRole('button', { name: 'Start ideation' }), click: true } },
    });
  },
};

if (require.main === module) (async () => {
  const stage = process.argv[2];
  if (!stages[stage]) { console.error('stages:', Object.keys(stages).join(', ')); process.exit(64); }
  const { page, close } = await open();
  try { await stages[stage](page); }
  catch (e) { console.error('ERR', String(e.message).split('\n')[0]); await raw(page, `3-error-${stage}`).catch(() => {}); process.exitCode = 1; }
  finally { await close(); }
})();

module.exports = { SITE, ZONES, clickPolygon, canvasMapper, siteTab };
