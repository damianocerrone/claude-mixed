# Deploying /tutorials/ to coplanai.com

The guides move from one address to a small section:

| Address | Before | After |
|---|---|---|
| `/tutorials/` | forwards to `/tutorial/` | the page that lists both guides |
| `/tutorials/general/` | none | the platform guide |
| `/tutorials/studio/` | none | the Studio guide |
| `/tutorials/assets/` | none | the engine both guides share |
| `/tutorial/` | the platform guide, behind the password gate | forwards to `/tutorials/general/`, keeping the `#step` |

Build the section first: `python3 tools/build-site.py --platform <checkout of damianocerrone/coplan-tutorials>`. It
writes `dist/tutorials/` and `dist/tutorial/index.html` (see the README, "Publish it").

## What is live today

Checked on 3 October 2026, from outside the gate:

- coplanai.com is served by Cloudflare, by the Worker **`site-coplanai-com`** (also reachable at
  `site-coplanai-com.coplanai.workers.dev`).
- `/tutorial/` answers 401 with a password page: "Platform guide · for invited readers … Enter the password you
  received from us to open it. Your browser will remember it for 30 days." The form posts to `/_pw`.
- `/tutorials/` is a small page that forwards to `/tutorial/` (with the `#step`).
- The Worker's code and gate are not in any repository we have. `damianocerrone/coplanai.com` holds an older copy of
  the site's files with the platform guide at `tutorial/`, and no Worker code. `damianocerrone/transition-coplanai-com`
  is a temporary GitHub Pages copy ("delete after 2026-09-30") whose `/tutorial` and `/tutorials` forward to the
  Worker's workers.dev address.

## What has to change on the Worker

1. Serve `dist/tutorials/` at `/tutorials/`, and `dist/tutorial/index.html` at `/tutorial/` in place of the guide.
2. Move the gate from `/tutorial/` to `/tutorials/` and everything under it. Keep the same password and the same cookie,
   so readers who already entered it are not asked again. Leave `/tutorial/` itself ungated, so old links forward
   first and the gate then asks at the new address. Reword the gate's eyebrow from "Platform guide · for invited
   readers" to "CoPlanAI guides · for invited readers".
3. Change nothing else on the site.

## Access

The session needs `CLOUDFLARE_API_TOKEN` (permission to edit Workers scripts on the account; add Workers routes if a
separate route is used) and `CLOUDFLARE_ACCOUNT_ID` as environment variables. The cloud environment already reaches
`api.cloudflare.com` and npm, so `npx wrangler` works.

## Steps

1. **Look before changing anything.**
   - Download the current script and its settings: `GET /accounts/{account}/workers/scripts/site-coplanai-com/content`
     and `…/settings` (bindings, compatibility date; secrets show by name only).
   - Find how the Worker is attached to coplanai.com: a Custom Domain (`GET /accounts/{account}/workers/domains`) or
     routes on the zone.
   - Find how it serves files: Workers static assets (an assets binding), Workers Sites (a `__STATIC_CONTENT` KV
     namespace) or inline.
   - Read the gate: which paths it protects, where the password lives (a secret or a hash in the code), and the
     cookie's name and path.
2. **Choose how to deploy.**
   - If the site's files can be fetched in full (Workers Sites keeps them in KV, which can be listed and
     downloaded), redeploy the same Worker with those files plus `dist/`, and with the gate moved.
   - If the Worker uses static assets, which cannot be downloaded, do not redeploy it from a partial set of files:
     anything missing would disappear from the live site. Either deploy a separate Worker for
     `coplanai.com/tutorials*` and `coplanai.com/tutorial*` with the gate copied over (first confirm that such a route
     wins over the main Worker's Custom Domain on the same hostname), or rebuild the full site from a verified copy.
3. **Test before switching.** Upload a preview version (`wrangler versions upload`) or use the workers.dev address:
   `/tutorials/` asks for the password and accepts it; the list page, both guides and their images load;
   `/tutorial/#publish-and-share` lands on `/tutorials/general/#publish-and-share`; the home page and a few other
   pages still load.
4. **Deploy and check again** on coplanai.com. Note the previous version id first, so `wrangler rollback` can restore
   it.
