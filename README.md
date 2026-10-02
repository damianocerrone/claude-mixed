# CoPlan Studio guide

An animated, scrollable guide to **CoPlan Studio**, the desktop workspace in CoPlanAI where a planning team turns a
written brief into checked, rendered design options. It is the sibling of the platform guide at
[coplanai.com/tutorial](https://coplanai.com/tutorial/) (source: `damianocerrone/coplan-tutorials`) and will be
published at **coplanai.com/tutorial/studio/**.

It reuses the platform guide's engine unchanged. Each step shows a real Studio screen. As the reader scrolls through
the numbered instructions, the screenshot zooms in, spotlights the exact button and plays a small click animation on it.

## Status

The page, engine and capture tools are in place. The chapters are not written yet: every step is captured from the
live platform, and the capture is waiting for network access to `coplanai.ikonai.app` from the cloud environment.
`docs/studio-plan.md` has the outline and the capture plan.

## What's inside

```
tutorial/
  assets/                 the shared engine (guide.js, guide.css), fonts (OFL) and logo, the same files as /tutorial/assets/
  studio/
    index.html            the Studio guide page; loads ../assets/
    steps.js              creates the (empty) chapter list
    chapters/NN-*.js      one file per chapter: the text, screenshots and highlight positions
    img/                  the screenshots (2400x1200 WebP)
tools/
  capture.js              screenshots with exact highlight positions (writes to tutorial/studio/img by default)
  cloud-browser.sh        a headless Chromium that stays signed in, for captures from a cloud container
  sign-in.js              signs that browser in with an email code
  compose-phone.py        puts phone screenshots on a wide plate
docs/
  studio-plan.md          chapter outline, exploration passes and capture conventions
```

## Open it

Serve the repository root and open `/tutorial/studio/`, for example `npx http-server -p 8799` and then
`http://127.0.0.1:8799/tutorial/studio/`. Opening `tutorial/studio/index.html` straight from disk also works.

## Publish it

Copy `tutorial/studio/` into the `tutorial/` folder of the coplanai.com site, next to the platform guide. It loads its
engine from `../assets/`, so it needs no other files. If `tutorial/assets/` here has changed, copy that too: both guides
use it.

## Edit the text

The format is the platform guide's: see its README. In short, each beat in a chapter file is one numbered instruction:

```js
{
  html: "Click <strong>Generate</strong> to make the first variations.",   // strong, em, a, kbd are allowed
  highlight: { box: [x, y, w, h], label: "Generate" },                     // area to spotlight (fractions of the image)
  cursor: { at: [x, y], click: true },                                     // where the pointer lands; click = tap animation
  zoom: [x, y, w, h]                                                       // optional 2:1 area to zoom into
}
```

To add a chapter, create `tutorial/studio/chapters/NN-name.js` and add a `<script>` line for it in
`tutorial/studio/index.html`, after `steps.js` and before `../assets/guide.js`.

## Capture from a cloud container

```sh
tools/cloud-browser.sh &                                  # headless Chromium on CDP port 9222, profile in tools/.auth/
node tools/sign-in.js email you@example.org               # requests the sign-in code
node tools/sign-in.js code 123456                         # finishes signing in
node tools/capture.js shot 1-01-open-studio --cdp http://127.0.0.1:9222 --url https://coplanai.ikonai.app/ ...
```

`tools/.auth/` and `explore/` are ignored by git. The profile signs you in, so delete it when the captures are done.
See `tools/README.md` for every `capture.js` option.
