# Studio guide: plan

## What we know about Studio so far

From coplanai.com (`use-coplanai.html`, "The platform: one engagement, three surfaces, one record"):

> **CoPlan Studio** · Desktop · planning teams. The desktop workspace where a planning team turns a written brief
> into checked, rendered design options.
>
> 1. It starts with an image and your brief
> 2. Twenty variations from one brief
> 3. Checked against the planning documents
> 4. Favourites compared at one scale
> 5. Renders from stored cameras
> 6. Before and after, same frame

From the platform guide (captured 25 September 2026): Studio lives inside `coplanai.ikonai.app`. App Settings →
**App country** says "Studio's Focus Area map opens on this country". The guided exploration then found no other
mention of Studio in the organiser screens (platform feedback OS-8).

None of this has been checked against the live screens yet. The outline below is a working hypothesis. The real
chapters follow what Studio actually shows, in the order a planning team meets it.

## Working outline (to confirm on the live platform)

| # | Chapter | Covers |
|---|---|---|
| 1 | Get into *Studio* | Where Studio opens from, the Studio home, the Focus Area map and App country |
| 2 | Start from an *image and a brief* | New project, choosing or uploading the base image, writing the brief |
| 3 | Twenty *variations* | Generating from one brief, reading the grid, regenerating, keeping favourites |
| 4 | Check against the *planning documents* | Which documents, what the check reports, acting on it |
| 5 | Compare *favourites* | Side-by-side at one scale, choosing between options |
| 6 | Render from *stored cameras* | Saving camera views, rendering the chosen option from them |
| 7 | *Before and after* | Same-frame comparison, exporting and sharing the result |

## How it will be made

The same method as the platform guide, which gave every step a real screen and every box a measured position:

1. **Scout.** Sign in as the owner account and find every way into Studio. Save each screen with its page text and
   element boxes (`explore/`, not committed).
2. **Sandbox.** Create one clearly labelled demo project, **"Senate Square 2040 (Studio tutorial demo)"**, and do
   all generating, checking and rendering there. Every other project and setting is only viewed.
3. **Explore in passes.** One pass per chapter area, at 1900×950. Note bugs and confusing UX as we go, for a
   `docs/studio-feedback.md` like the platform guide's.
4. **Capture.** Take the final plates with `tools/capture.js` (2400×1200 WebP from 1900×950 at 2x), so every
   highlight, cursor and zoom comes from the element's measured box.
5. **Write.** One chapter file per area, in the platform guide's voice: plain, second person, British spelling, the
   button's exact label in bold.
6. **Check.** Independent reviewers check every claim in the text against the captured page text, and every box,
   cursor and zoom against the debug images. Anything they cannot confirm is rewritten or removed.
7. **Clean up.** List anything the exploration left behind on the platform. Delete the browser profile.

## Blocked on

- **Network access.** The cloud environment's network policy denies `coplanai.ikonai.app`. Add it to the
  environment's allowed domains (Network access in the environment settings). The change may only reach a new
  session.
- **Sign-in.** Email code: we type the owner account's address on the sign-in page and the code is pasted into the
  session. Nothing is stored except the browser profile in `tools/.auth/` (git-ignored), which is deleted afterwards.
