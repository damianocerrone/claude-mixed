# Studio guide: outline and writing rules

Built from the exploration of 2 October 2026 (7 areas, about 260 captures in `explore/`, findings in
`explore/map.json`). Plate names are `C-NN-slug.webp`, where C is the chapter number.

## Example used throughout

The sandbox project **"Downtown plan (Studio tutorial demo)"**: a Conceptual Plan with scope Master plan. Its leading
image is a downtown land-use plan taken from the organisation's uploads. Every generation, render, video and
upscale in the guide happens in this project.

## Chapters

| # | id | Title | Steps |
|---|---|---|---|
| 1 | `studio-start` | Find your way into *Studio* | Open Studio from the dashboard · Studio home · the Studio menu · the Projects page · a project card's menu · inside a project (breadcrumb, Ideation/Production, Actions panel, stage) |
| 2 | `start-project` | Start a *project* | The three processes · scope · add the site plan (drop zone, Choose from existing: Uploads/Drawings) · Create project · Focus Area from the map · Focus Area from an upload · Project settings: Details · Settings · Site · Team |
| 3 | `site` | Prepare the *site* | The Site tab · open Draw boundary · draw a polygon · save the boundary · Plan land use · paint zones · save the land-use plan · the colour standard · Start ideation (and what locks) |
| 4 | `ideation` | Generate *design options* | Quick actions · density, creativity, render style · reference images · required elements · scenes and adjustments · output · the PENDING tray and Apply · first results · iterate on one image · a new concept · the Presets tab |
| 5 | `refine` | Review and *refine* | Grid views · Focus view · Original, Compare and Parent · favourites · Select and Compare · Touch-up · Adjust · Prompt · Impact |
| 6 | `production` | Produce the *render set* | Production · render settings · build renders · send more images · Report builder · export |
| 7 | `media` | Videos and *upscales* | Before/after video · camera moves and duration · the result · sequence video · upscale |
| 8 | `organisation` | Studio for your *organisation* | Uploaded images · mood boards & style refs · planning presets · Team & permissions · Audit log · Studio settings |

## Writing rules

The same voice as the platform guide (`damianocerrone/coplan-tutorials`, `tutorial/chapters/*.js`):

- Plain, direct, second person. British spelling (colour, organisation, favourite), except where the UI itself says
  "Favorites" or "color": UI labels are quoted exactly as shown.
- The exact on-screen label in `<strong>`, e.g. Click <strong>Open Studio</strong>.
- One beat = one instruction or one thing to notice. Usually 2 to 5 beats per step.
- Every claim must be visible in the step's own screenshot or in a capture cited in `explore/`. No marketing
  claims ("twenty variations", "checked against planning documents") unless the screen shows them.
- Say what each choice does for the planner's work, not just where it is. Studio Settings holds the prompt text
  behind Density, Creativity and Render style; use it to explain them plainly.
- Warn before anything that cannot be undone or that spends generation credits (Start ideation locks the boundary
  and land-use plan; Build all missing renders every empty tile).
- `note` kinds: `info` (background), `tip` (a shortcut or good practice), `warning` (a trap).
- Titles are short imperatives or noun phrases; put one word in `*asterisks*` only in chapter titles.
- `alt` describes the whole screenshot in one or two sentences, for someone who cannot see it.
- `url` is the address shown in the plate's browser bar: `coplanai.ikonai.app`.
- No personal data: mask e-mail addresses in plates. Names of the account owner on cards are fine.

## Plates

- Captured with `tools/capture.js` (2400×1200 WebP from 1900×950 at 2x). Highlight boxes, cursor points and zooms
  come from the capture JSON, never estimated by eye.
- Highlights hug the element; zoom regions are 2:1 and contain the highlight; omit zoom for whole-screen beats.
- Each plate's JSON stays next to it in `tutorial/studio/img/` until the chapter is checked, then is deleted.
