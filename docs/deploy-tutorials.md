# Deploying /tutorials/ to coplanai.com

The guides move from one address to a small section:

| Address | Before | After | Access |
|---|---|---|---|
| `/tutorials/` | forwards to `/tutorial/` | the page that lists both guides | public |
| `/tutorials/assets/` | none | the engine both guides share | public (the list page needs it) |
| `/tutorials/img/` | none | the list page's two card pictures | public |
| `/tutorials/general/` | none | the platform guide | its own password |
| `/tutorials/studio/` | none | the Studio guide | its own password |
| `/tutorial/` | the platform guide, behind the password gate | forwards to `/tutorials/general/`, keeping the `#step` | public |

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
2. Gate the two guides separately, each with its own password:
   - `/tutorials/general/` and everything under it: the platform guide's password.
   - `/tutorials/studio/` and everything under it: the Studio guide's password.
   - Everything else stays public: `/tutorials/` itself, `/tutorials/assets/`, `/tutorials/img/`, and `/tutorial/`
     (so old links forward first and the gate then asks at the new address).

   The passwords are not written in this repository, which is public. They reach the deploy session as the
   environment variables `TUTORIALS_PASSWORD_GENERAL` and `TUTORIALS_PASSWORD_STUDIO`; store them as Worker secrets
   (`wrangler secret put`), never in the Worker's code or the built files. Give each guide its own cookie, scoped to
   its folder, so one password never opens the other guide; keep the current 30-day memory. Each gate page names its
   guide: "Platform guide · for invited readers" and "Studio guide · for invited readers", with the same text and
   the info@coplanai.com line as today.
3. Change nothing else on the site.

## Access

The session needs, as environment variables: `CLOUDFLARE_API_TOKEN` (permission to edit Workers scripts on the
account; add Workers routes if a separate route is used), `CLOUDFLARE_ACCOUNT_ID`, and the two guide passwords,
`TUTORIALS_PASSWORD_GENERAL` and `TUTORIALS_PASSWORD_STUDIO`. The cloud environment already reaches
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
   `/tutorials/` opens without a password, with both card pictures; each guide asks for its own password, accepts
   it, and refuses the other guide's; both guides and their images load after the password;
   `/tutorial/#publish-and-share` lands on `/tutorials/general/#publish-and-share`; the home page and a few other
   pages still load.
4. **Deploy and check again** on coplanai.com. Note the previous version id first, so `wrangler rollback` can restore
   it.
