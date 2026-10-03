# CoPlan Studio guide

An animated, scrollable guide to **CoPlan Studio**, the desktop workspace in CoPlanAI where a planning team turns a
site plan or a street photo into design options, renders, videos and a report. It is the sibling of the platform
guide (source: `damianocerrone/coplan-tutorials`), and the two are published together: the Studio guide at
**coplanai.com/tutorials/studio/**, the platform guide at **coplanai.com/tutorials/general/**, and a page listing both
at **coplanai.com/tutorials/**.

It reuses the platform guide's engine unchanged. Each step shows a real Studio screen. As the reader scrolls through
the numbered instructions, the screenshot zooms in, spotlights the exact button and plays a small click animation on it.

## Chapters

| # | Chapter | Steps | What it covers |
|---|---|---|---|
| 1 | Find your way into Studio | 7 | The Studio card on the dashboard, Studio home, the menu, Projects, a card's menu, inside a project |
| 2 | Start a project | 11 | The three processes, scope, the site plan, Create project, Focus Area from the map or an upload, Project settings |
| 3 | Prepare the site | 11 | Drawing and saving the site boundary, painting and saving a land-use plan, the colour standard, checking the site is ready |
| 4 | Generate design options | 13 | Quick actions, the PENDING tray, the first results, iterating, a new concept, presets |
| 5 | Review and refine | 13 | Focus view, Compare, favourites, Select and Compare, Touch-up, Adjust, Prompt, Impact |
| 6 | Produce the render set | 5 | Production, render settings, building renders, the Report builder |
| 7 | Videos and upscales | 7 | A before/after video, camera moves, the result, Sequence video, upscaling to 6K |
| 8 | Studio for your organisation | 8 | Uploaded images, mood boards, planning presets, teams, the audit log, Studio settings |

75 steps and 311 animated beats in all. The example used throughout is a sandbox project, **"Downtown plan (Studio
tutorial demo)"**: a Conceptual Plan whose leading image is a downtown land-use plan.

## Open it

Serve the repository root and open `/tutorial/studio/`, for example `python3 -m http.server 8799` and then
`http://127.0.0.1:8799/tutorial/studio/`. Opening `tutorial/studio/index.html` straight from disk also works.
Every step has an anchor, e.g. `index.html#site-boundary-polygon`.

## Publish it

The guides live together at **coplanai.com/tutorials/**:

| Address | What | Source | Access |
|---|---|---|---|
| `/tutorials/` | the page that lists both guides | `tutorial/index.html` here | public |
| `/tutorials/assets/` | the shared engine, fonts and logo | `tutorial/assets/` here (the same files as in `coplan-tutorials`) | public |
| `/tutorials/img/` | the list page's two card pictures | copied from each guide by the build | public |
| `/tutorials/general/` | the platform guide, for people who run workshops | `damianocerrone/coplan-tutorials` (private) | its own password |
| `/tutorials/studio/` | this guide | `tutorial/studio/` here | its own password |
| `/tutorial/` | the platform guide's old address, forwarded to `/tutorials/general/` with its `#step` | made by the build | public |

`python3 tools/build-site.py` assembles all of it into `dist/`, which git ignores because it holds the private
platform guide. It reads the platform guide from a checkout of `coplan-tutorials` next to this one (or `--platform`),
re-points it at `../assets/` and its new address, leaves out the capture tools' `.json` files, and stops if a link
breaks. The site is served by a Cloudflare Worker, which also asks for each guide's password; how to deploy `dist/`
to it is in `docs/deploy-tutorials.md`. The passwords are never written in this repository.

## What's inside

```
tutorial/                 published as coplanai.com/tutorials/
  index.html              the page that lists both guides
  assets/                 the shared engine (guide.js, guide.css), fonts (OFL) and logo, shared with the platform guide
  studio/
    index.html            the Studio guide page; loads ../assets/
    steps.js              creates the chapter list
    chapters/NN-*.js      one file per chapter: the text, screenshots and highlight positions
    img/                  the screenshots (2400x1200 WebP), each with a .json of measured boxes
tools/
  capture.js              screenshots with exact highlight positions (writes to tutorial/studio/img by default)
  flows/NN-*.js           the capture flow behind each chapter: re-run one when Studio changes
  flows/lib.js            shared helpers for the flows (navigation, rects, plates)
  check-guide.js          static checks of every chapter: images, boxes, zooms, tags, ids and links
  build-site.py           assembles /tutorials/ (both guides, the list page, the old-address redirect) into dist/
  cloud-browser.sh        a headless Chromium that stays signed in, for captures from a cloud container
  sign-in.js              signs that browser in with an email code
  compose-phone.py        puts phone screenshots on a wide plate
docs/
  studio-outline.md       chapters, writing rules and plate rules
  capture-notes.md        what happened on each plate of chapters 3-7, including bugs found on the way
  studio-feedback.md      UX review of Studio: verified problems, quick wins and bigger changes
  review/                 the same review as a web page: build.py turns the report into index.html via page.html
  studio-plan.md          the plan written before the platform was reachable
  deploy-tutorials.md     how to put the built /tutorials/ section on the site's Cloudflare Worker
```

## Edit the text

The format is the platform guide's: see its README. In short, each beat in a chapter file is one numbered instruction:

```js
{
  html: "Click <strong>Apply to current</strong> to run the batch.",   // strong, em, a, kbd are allowed
  highlight: { box: [x, y, w, h], label: "Apply to current" },        // area to spotlight (fractions of the image)
  cursor: { at: [x, y], click: true },                                 // where the pointer lands; click = tap animation
  zoom: [x, y, w, h]                                                   // optional 2:1 area to zoom into
}
```

Run `node tools/check-guide.js` after an edit; it must print "no errors". To add a chapter, create
`tutorial/studio/chapters/NN-name.js` and add a `<script>` line for it in `tutorial/studio/index.html`, after
`steps.js` and before `../assets/guide.js`.

## Re-take screenshots

Each chapter has a flow in `tools/flows/` that drives the signed-in browser and takes its plates with `capture.js`, so
every highlight box comes from the element's measured position. Some flows change the sandbox project (chapters 3 to
7 draw a boundary, generate images, build renders, make a video and an upscale); read a flow's header before running
it. From a cloud container:

```sh
tools/cloud-browser.sh &                                  # headless Chromium on CDP port 9222, profile in tools/.auth/
node tools/sign-in.js email you@example.org               # requests the sign-in code
node tools/sign-in.js code 123456                         # finishes signing in
node tools/flows/01-studio-start.js                       # re-takes chapter 1's plates
```

Behind a TLS-inspecting proxy, add the proxy's CA to Chromium's NSS store first (see `tools/cloud-browser.sh`).
`tools/.auth/` and `explore/` are ignored by git. The profile signs you in, so delete it when the captures are done.

## How it was made

The screens were captured from the live platform on 2 October 2026 by an assistant signed in as the platform owner,
from a cloud container with a headless Chromium. Seven parallel passes first mapped Studio without changing anything
outside a sandbox project, **"Downtown plan (Studio tutorial demo)"**, created for this guide from one of the
organisation's uploaded land-use plans. Chapters 3 to 7 were then captured in that project in order, because the site
boundary and land-use plan lock once generation starts. Every chapter was written from its plates, checked by an
independent reviewer against the plates and the captured page text, fixed, and finally checked as a whole.

What the work left on the platform:

- The sandbox project, with a site boundary and land-use plan, two concepts (Concept A, 11 images; Green streets, 1
  image), three favourites, two built renders (Concept A: Aerial · Day, Eye-level · Day), one 5 s Kling 2.6 video and
  one 6K upscale. Studio also created a team for it on Team & permissions.
- About 28 new items under **Choose from existing › Drawings** (21 before, 49 after), saved by the boundary,
  land-use and mask editors during exploration and capture.
- Audit log entries for all of the above. Nothing in other projects, the library, the app settings or Studio
  settings was changed.

`docs/studio-feedback.md` lists the bugs and UX problems found along the way, with suggested fixes; `docs/review/index.html`
shows the same review as a page with screenshots and proposal sketches (rebuild it with `python3 docs/review/build.py`
after editing the report).
