/*
 * Chapter 7 · Videos and upscales. Plates 7-NN-*.webp, taken in the sandbox project's Video and Upscale tools
 * (opened from Production, so the project's images are offered first).
 *
 *   node tools/flows/07-media.js video      # 7-01 before/after set-up, 7-02 camera and duration, Generate (Classic, no AI), 7-03 result
 *   node tools/flows/07-media.js sequence   # 7-04 the Sequence video mode (nothing generated)
 *   node tools/flows/07-media.js upscale    # 7-05 upscale set-up, Upscale (Classic, free), 7-06 result
 */
'use strict';

const { SANDBOX, open, go, union, card, stage, plate, raw } = require('./lib');

const btn = (page, name) => page.getByRole('button', { name, exact: true }).filter({ visible: true }).first();

async function fromProduction(page, tool) {
  await go(page, `${SANDBOX}/production`, 9000);
  const target = tool === 'Video' ? /\/video$/ : /\/upscale$/;
  for (let i = 0; i < 4 && !target.test(page.url()); i++) {          // an early click is sometimes ignored
    await btn(page, tool).click();
    await page.waitForURL(target, { timeout: 15000 }).catch(() => {});
  }
  await page.waitForTimeout(6000);
}

/* Open an image slot and pick an image: the picker ("Pick the … image") takes several seconds to appear. */
async function openSlot(page, slot) {
  const use = page.getByRole('button', { name: 'Use image' }).filter({ visible: true }).first();
  for (let i = 0; i < 4; i++) {                                   // the picker is slow and an early click can be lost
    const b = await page.getByRole('button', { name: slot }).filter({ visible: true }).first().boundingBox();
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
    if (await use.waitFor({ timeout: 15000 }).then(() => true, () => false)) { await page.waitForTimeout(1500); return; }
    console.log(`picker not open yet (try ${i + 1})`);
  }
  throw new Error(`the ${slot} picker did not open`);
}
async function pickImage(page, tab, n = 0) {
  const title = page.getByText(/^Pick the (before |after )?image/).filter({ visible: true }).first();
  const box = await card(title, { minWidth: 900 });                 // the whole picker
  if (tab !== 'Ideation') {                                          // Ideation is the tab it opens on
    const tabs = page.getByText(tab, { exact: true }).filter({ visible: true });
    await tabs.last().click();
    await page.waitForTimeout(3000);
  }
  const thumbs = await page.locator('img').evaluateAll((els, bx) => els.map((e) => e.getBoundingClientRect())
    .filter((r) => r.width > 100 && r.x >= bx.x && r.right <= bx.x + bx.width && r.y >= bx.y && r.bottom <= bx.y + bx.height)
    .sort((a, b) => (a.y - b.y) || (a.x - b.x))
    .map((r) => ({ x: r.x + r.width / 2, y: r.y + r.height / 2 })), box);
  console.log(`${tab}: ${thumbs.length} thumbnails in view`);
  await page.mouse.click(thumbs[n].x, thumbs[n].y);
  await page.waitForTimeout(1000);
  await raw(page, `7-pick-${tab}`);
  return page.getByRole('button', { name: 'Use image' }).filter({ visible: true }).first();
}

/* The rect of the nearest ancestor of `loc` that contains media (a <video>, or an <img> wider than 150 px): a result card. */
async function mediaCard(loc) {
  return loc.first().evaluate((el) => {
    for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
      const hasMedia = e.querySelector('video') || [...e.querySelectorAll('img')].some((i) => i.getBoundingClientRect().width > 150);
      if (hasMedia) { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }
    }
    return null;
  });
}

async function waitDone(page, label, re, max = 600) {
  const t0 = Date.now();
  for (;;) {
    await page.waitForTimeout(8000);
    const text = await page.evaluate(() => document.body.innerText);
    const secs = Math.round((Date.now() - t0) / 1000);
    if (re.test(text) || secs > max) { console.log(`${label}: ${re.test(text) ? 'done' : 'timeout'} after ${secs}s`); return; }
  }
}

const stages = {
  async video(page) {
    await fromProduction(page, 'Video');
    await raw(page, '7-01-open');
    const engine = process.env.ENGINE || 'Classic (no AI)';            // Classic failed in this headless browser; ENGINE='Kling 2.6' runs on the server
    console.log('step: engine', engine); await page.getByRole('button', { name: new RegExp('^' + engine.replace(/[()]/g, '\\$&')) }).filter({ visible: true }).first().click();
    await page.waitForTimeout(800);
    console.log('step: after slot'); await openSlot(page, 'After (master)');
    const useAfter = await pickImage(page, 'Ideation', 1);
    await plate(page, '7-01b-pick-after', {
      highlights: {
        tabs: { locator: await union(page.getByText('Ideation', { exact: true }).filter({ visible: true }).last(), page.getByText('Uploads', { exact: true }).filter({ visible: true }).last()), label: 'Ideation, Favorites, Renders, Uploads' },
        use: { locator: useAfter, label: 'Use image' },
      },
      points: { use: useAfter },
    });
    await useAfter.click();
    await page.waitForTimeout(2500);
    await raw(page, '7-01-raw');
    await plate(page, '7-01-video-images', {
      highlights: {
        mode: { locator: await union(page.getByText('Before / after', { exact: true }).first(), page.getByText('Sequence video', { exact: true }).first()), label: 'Before / after' },
        engine: { locator: await card(page.getByText(/^Engine$/).filter({ visible: true }).first(), { minWidth: 280 }), label: 'Engine' },
        images: { locator: await card(page.getByText(/^Images$/).filter({ visible: true }).first(), { minWidth: 280 }), label: 'Before and after' },
      },
    });
    console.log('step: preset');
    { const dv = page.getByText('Drone View', { exact: true }).filter({ visible: true }).first(); await dv.scrollIntoViewIfNeeded(); const b = await dv.boundingBox(); await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); }
    await page.waitForTimeout(1000);
    await page.getByText(/^Duration$/).filter({ visible: true }).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await raw(page, '7-02-raw');
    await plate(page, '7-02-camera-duration', {
      highlights: {
        presets: { locator: await card(page.getByText(/^Quick Presets$/i).filter({ visible: true }).first(), { minWidth: 280 }), label: 'Camera movement' },
        duration: { locator: await card(page.getByText(/^Duration$/).filter({ visible: true }).first(), { minWidth: 280 }), label: 'Duration' },
        go: { locator: page.getByRole('button', { name: /^Generate video/ }), label: 'Generate video' },
      },
      points: { go: page.getByRole('button', { name: /^Generate video/ }) },
    });
    if (process.env.NOGEN) return;                    // re-take the set-up plates without generating
    console.log('step: generate');
    await page.getByRole('button', { name: /^Generate video/ }).click();
    await waitDone(page, 'video', /\d+:\d\d|Download|Delete video|\.mp4|Couldn.t generate/i);     // also ends on the failure message
    await page.waitForTimeout(4000);
    await raw(page, '7-03-raw');
    await plate(page, '7-03-video-result', { highlights: { video: { locator: await stage(page), label: 'Your video' } } });
  },

  /* 7-03 the finished video as a card on the Video page (title, engine, before → after, length, actions). */
  async videoresult(page) {
    await go(page, `${SANDBOX}/video`, 8000);
    await page.locator('video').filter({ visible: true }).first().waitFor({ timeout: 30000 });
    await page.waitForTimeout(1500);
    await raw(page, '7-03-raw2');
    const dl = page.getByRole('button', { name: 'Download video' }).first();
    await plate(page, '7-03-video-result', {
      highlights: {
        card: { locator: await mediaCard(dl), label: 'Your video' },
        meta: { locator: await union(page.getByText('Drone View', { exact: true }).filter({ visible: true }).last(), page.getByText('Kling 2.6', { exact: true }).filter({ visible: true }).last()), label: 'Preset and engine' },
        actions: { locator: await union(dl, page.getByRole('button', { name: 'Delete video' }).first()), label: 'Download, edit, delete' },
      },
      points: { actions: { locator: page.getByRole('button', { name: 'Edit video' }).first(), click: false } },
    });
  },

  /* 7-06 the finished upscale as a card on the Upscale page. */
  async upresult(page) {
    await go(page, `${SANDBOX}/upscale`, 8000);
    const dl = page.getByRole('button', { name: 'Download image' }).first();
    await dl.waitFor({ timeout: 30000 });
    await page.waitForTimeout(1500);
    await raw(page, '7-06-raw2');
    await plate(page, '7-06-upscale-result', {
      highlights: {
        card: { locator: await mediaCard(dl), label: 'Upscaled image' },
        size: { locator: page.getByText(/^6144 × \d+$/).filter({ visible: true }).first(), label: 'Size' },
        actions: { locator: await union(dl, page.getByRole('button', { name: 'Delete upscale' }).first()), label: 'Download or delete' },
      },
      points: { actions: { locator: dl, click: false } },
    });
  },

  async sequence(page) {
    await fromProduction(page, 'Video');
    await btn(page, 'Sequence video').click();
    await page.waitForTimeout(2000);
    await raw(page, '7-04-raw');
    await plate(page, '7-04-sequence', {
      highlights: {
        mode: { locator: btn(page, 'Sequence video'), label: 'Sequence video' },
        images: { locator: await card(page.getByText(/^Images$/).filter({ visible: true }).first(), { minWidth: 280 }), label: 'Two to six images' },
        add: { locator: page.getByRole('button', { name: /Add image/ }).filter({ visible: true }).first(), label: 'Add image' },
      },
      points: { add: { locator: page.getByRole('button', { name: /Add image/ }).filter({ visible: true }).first(), click: false } },
    });
  },

  async upscale(page) {
    await fromProduction(page, 'Image Upscale');
    await raw(page, '7-05-open');
    const engine = process.env.UPSCALE_ENGINE || 'Classic (no AI)';
    console.log('step: engine', engine); await page.getByRole('button', { name: new RegExp('^' + engine.replace(/[()]/g, '\\$&')) }).filter({ visible: true }).first().click();
    await page.waitForTimeout(800);
    await openSlot(page, /Choose image|Source image/);
    await (await pickImage(page, 'Renders', 0)).click();
    await page.waitForTimeout(2500);
    await raw(page, '7-05-raw');
    await plate(page, '7-05-upscale', {
      highlights: {
        engine: { locator: await card(page.getByText(/^Engine$/).filter({ visible: true }).first(), { minWidth: 280 }), label: 'Engine' },
        source: { locator: await card(page.getByText(/^Source image$/).filter({ visible: true }).first(), { minWidth: 280 }), label: 'Source image' },
        size: { locator: await card(page.getByText(/^Target size$/).filter({ visible: true }).first(), { minWidth: 280 }), label: 'Target size' },
        go: { locator: page.getByRole('button', { name: /^Upscale to/ }), label: 'Upscale' },
      },
      points: { go: page.getByRole('button', { name: /^Upscale to/ }) },
    });
    if (process.env.NOGEN) return;
    await page.getByRole('button', { name: /^Upscale to/ }).click();
    await page.getByRole('button', { name: 'Download image' }).first().waitFor({ timeout: 300000 }).catch(() => {});
    await raw(page, '7-06-raw');                      // the result card: plate it with `upresult`
  },
};

if (require.main === module) (async () => {
  const name = process.argv[2];
  if (!stages[name]) { console.error('stages:', Object.keys(stages).join(', ')); process.exit(64); }
  const { page, close } = await open();
  try { await stages[name](page); }
  catch (e) { console.error('ERR', String(e.message).split('\n')[0]); await raw(page, `7-error-${name}`).catch(() => {}); process.exitCode = 1; }
  finally { await close(); }
})();
