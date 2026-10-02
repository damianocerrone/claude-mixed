/*
 * Chapter 6 · Produce the render set. Plates 6-NN-*.webp, taken in the sandbox project.
 *
 *   node tools/flows/06-production.js view      # 6-01 the render set, 6-02 Render settings (Cancel, nothing saved)
 *   node tools/flows/06-production.js build     # builds Aerial · Day and Eye-level · Day for Concept A, 6-03 the result
 *   node tools/flows/06-production.js report    # 6-04 the Report builder, 6-05 the preview and audit
 */
'use strict';

const { SANDBOX, open, go, union, card, stage, plate, raw } = require('./lib');

const btn = (page, name) => page.getByRole('button', { name, exact: true }).filter({ visible: true }).first();

async function production(page) {
  await go(page, `${SANDBOX}/production`, 9000);
}

/* The tile captioned e.g. "Aerial · Day" in the first concept's row, and its Build button. */
function tile(page, caption, row = 0) {
  const t = page.getByText(caption, { exact: true }).filter({ visible: true }).nth(row);
  return { caption: t, box: t.locator('xpath=ancestor::div[.//button][1]') };
}

async function waitBuilt(page, label, before, max = 600) {
  const t0 = Date.now();
  for (;;) {
    await page.waitForTimeout(10000);
    const text = await page.evaluate(() => document.body.innerText);
    const m = text.match(/(\d+) of (\d+) renders complete/);
    const secs = Math.round((Date.now() - t0) / 1000);
    if ((m && +m[1] > before) || secs > max) { console.log(`${label}: ${m ? m[0] : 'no counter'} after ${secs}s`); return m ? +m[1] : before; }
  }
}

const stages = {
  async view(page) {
    await production(page);
    await raw(page, '6-01-raw');
    await plate(page, '6-01-render-set', {
      highlights: {
        mode: { locator: btn(page, 'Production'), label: 'Production' },
        counter: { locator: await union(page.getByText('Render set', { exact: true }), page.getByText(/renders complete/).first()), label: 'Render set' },
        latest: { locator: page.getByText(/^Concept A · I\d+$/).first().locator('xpath=ancestor::div[1]'), label: 'Latest iteration' },
        views: { locator: await union(tile(page, 'Aerial · Day').box, tile(page, 'Section · Night').box), label: 'Views × scenes' },
        tools: { locator: await union(btn(page, 'Video'), btn(page, 'Build all missing')), label: 'Production tools' },
      },
      points: { tools: { locator: btn(page, 'Settings'), click: true } },
    });
    await btn(page, 'Settings').click();
    await page.waitForTimeout(2500);
    const d = page.getByRole('dialog');
    await raw(page, '6-02-raw');
    await plate(page, '6-02-render-settings', {
      highlights: {
        views: { locator: await union(d.getByText('Aerial', { exact: true }).first(), d.getByText('Section', { exact: true }).first(), d.getByRole('button', { name: /Add custom view/ }).first()), label: 'Views' },
        scenes: { locator: await union(d.getByText('Day', { exact: true }).first(), d.getByRole('button', { name: /Add custom scene state/ }).first()), label: 'Scene states' },
        medium: { locator: await card(d.getByText('Deliverable medium', { exact: true }), { minWidth: 400 }), label: 'Deliverable medium' },
        naming: { locator: await card(d.getByText('Export file naming', { exact: true }), { minWidth: 400 }), label: 'Export file naming' },
        save: { locator: d.getByRole('button', { name: 'Save settings' }), label: 'Save settings' },
      },
      points: { save: { locator: d.getByRole('button', { name: 'Save settings' }), click: false } },
    });
    await d.getByRole('button', { name: 'Cancel', exact: true }).click();
  },

  async build(page) {
    await production(page);
    const before = +(((await page.evaluate(() => document.body.innerText)).match(/(\d+) of \d+ renders complete/) || [0, 0])[1]);
    let done = before;
    for (const caption of ['Aerial · Day', 'Eye-level · Day']) {
      const t = tile(page, caption);
      await t.box.getByRole('button', { name: 'Build', exact: true }).click();
      await page.waitForTimeout(4000);
      await raw(page, `6-03-building-${caption.replace(/\W+/g, '')}`);
      done = await waitBuilt(page, caption, done);
    }
    await stages.built(page);
  },

  /* 6-03 the two built renders (no building). */
  async built(page) {
    if (!/production$/.test(page.url())) await production(page);
    await page.waitForTimeout(3000);
    await raw(page, '6-03-raw');
    const img = (caption) => page.getByText(caption, { exact: true }).filter({ visible: true }).first().locator('xpath=ancestor::div[.//img][1]');
    await plate(page, '6-03-built', {
      highlights: {
        aerial: { locator: img('Aerial · Day'), label: 'Aerial · Day' },
        eye: { locator: img('Eye-level · Day'), label: 'Eye-level · Day' },
        regen: { locator: btn(page, 'Regenerate from master'), label: 'Regenerate from master' },
        counter: { locator: page.getByText(/renders complete/).first(), label: 'Progress' },
      },
    });
  },

  /* 6-04 the Report builder (sections and contents), 6-05 its preview and the process audit. Nothing exported. */
  async report(page) {
    await production(page);
    await btn(page, 'Report builder').click();
    await page.waitForTimeout(5000);
    await raw(page, '6-04-raw');
    await plate(page, '6-04-report-builder', {
      highlights: {
        tab: { locator: btn(page, 'Report'), label: 'Report' },
        sections: { locator: await card(page.getByText(/^sections$/i).filter({ visible: true }).first(), { minWidth: 300 }), label: 'Sections' },
        contents: { locator: await card(page.getByText(/^contents$/i).filter({ visible: true }).first(), { minWidth: 300 }), label: 'Contents' },
        exports: { locator: await union(btn(page, 'Render pack'), btn(page, 'Build PDF')), label: 'Export' },
      },
      points: { exports: { locator: btn(page, 'Build PDF'), click: false } },
    });
    const prev = page.getByText(/^report preview$/i).filter({ visible: true }).first();
    await prev.evaluate((el) => el.scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(1500);
    await raw(page, '6-05-raw');
    await plate(page, '6-05-report-preview', {
      highlights: {
        preview: { locator: await card(prev, { minWidth: 500 }), label: 'Report preview' },
        audit: { locator: await card(page.getByText(/compliance & process audit/i).filter({ visible: true }).first(), { minWidth: 500 }), label: 'Process audit' },
      },
    });
  },
};

if (require.main === module) (async () => {
  const name = process.argv[2];
  if (!stages[name]) { console.error('stages:', Object.keys(stages).join(', ')); process.exit(64); }
  const { page, close } = await open();
  try { await stages[name](page); }
  catch (e) { console.error('ERR', String(e.message).split('\n')[0]); await raw(page, `6-error-${name}`).catch(() => {}); process.exitCode = 1; }
  finally { await close(); }
})();
