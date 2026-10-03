# CoPlan Studio feedback

Notes for the CoPlanAI product team, collected while we built the CoPlan Studio guide.

## How this was gathered

- **When and where:** 2 October 2026, on the live platform (`coplanai.ikonai.app`, app "CoPlanAI"), in Studio.
- **Who:** we were signed in as the owner account. We worked in a sandbox project, **"Downtown plan (Studio tutorial
  demo)"**, a Conceptual Plan started from a US downtown zoning plan. We only viewed other projects and the
  Studio-wide settings.
- **Method:** an automated Chromium browser (Playwright) at 1900×950 explored Studio in seven parallel passes:
  starting a project and the project list; site setup; Quick actions and presets; the image grid and Focus view; the
  edit tabs; Production, video and upscale; and the Studio menu pages (uploads, library, team, audit log, settings).
  We then captured the guide's chapters in the sandbox. That meant real AI runs: 12 ideation images in two concepts, a
  Touch-up, an Adjust version, a prompt edit, an Impact answer, 2 production renders, 1 video and 1 upscale. Every
  screen was saved as a screenshot, its page text and its element positions.
- **Editing:** the passes and the capture notes produced about 260 raw observations (142 from the exploration passes,
  the rest from notes taken while capturing and writing the guide). We checked each one against the captures, merged
  duplicates across the passes, and removed anything that came from our own test setup or was only a matter of taste.
  The removed items are listed in [Appendix A](#appendix-a--excluded-observations). Where we could not tell the cause,
  we say so.
- **Evidence:** paths are relative to the root of our guide repository. `explore/<area>/…` and `explore/raw/…` are
  screenshots (`.png`) with matching page text (`.txt`) and, for most, element boxes (`.json`).
  `tutorial/studio/img/…` are the guide's plates (`.webp`), and `tutorial/studio/chapters/…` is the guide's text. We
  can share any of them on request.

**Severity**

- **High:** misleads planners or their clients, or produces a wrong planning output that looks right.
- **Medium:** gives wrong or missing results, loses work, or is a step where many users will get stuck.
- **Low:** polish, clarity or consistency.

Within each severity level, privacy and security items come first.

**Effort** is our rough guess from the outside: **S** is copy, a label, a default or a confirmation; **M** is a change
to one screen or flow; **L** touches the data model or several screens.

## Summary

In its first hour, Studio steers planners towards results they did not ask for and cannot easily correct. The platform
default configuration, which every app inherits until an admin saves its own, is written for Dubai: its master prompt
asks for "a hot-arid desert setting" with palm planting, and its land-use colour standard is "Dubai land use", so
every run on our US downtown plan came back as a desert city with a lake. The site boundary a planner draws is not
saved, although the Site tab says "Set", and the first run from any tab then locks the boundary and the land-use plan
for good without asking. Land-use recognition reads the colours printed on the plan instead of the planner's paint,
and Production renders whichever iteration is newest rather than the one the team chose. No run shows what it costs or
how long it will take, and the report counts approvals and generations that don't add up.

| ID | Area | Severity | Issue |
|---|---|---|---|
| SS-1 | Site setup | High | The saved site boundary does not contain the drawn line, although the Site tab says "Set" |
| SS-2 | Site setup | High | Land-use recognition reads the printed plan, not the paint: it adds Water, drops Commercial, and the plans then show a lake |
| SS-3 | Site setup | High | Site setup can be skipped, and the first run from any tab locks it for good without asking |
| SS-4 | Site setup | High | "Save boundary" accepts an empty canvas or an open line and still says "Boundary set" |
| ID-1 | Ideation controls & defaults | High | The inherited default prompts, required elements, density bands and colour standard are written for Dubai |
| ID-2 | Ideation controls & defaults | High | The brief is not kept between runs: chips reset, required elements drop out, and the image in focus doesn't show its settings |
| RE-1 | Reviewing & editing images | High | Generated plans copy the plan's legend with the wrong colours |
| PR-1 | Production & report | High | Production renders whichever iteration is newest, and built renders disappear when a newer one arrives |
| PR-2 | Production & report | High | The report's figures and event labels contradict each other |
| PR-3 | Production & report | High | "Approved concepts", "locked" and "master" appear everywhere, but nothing lets a team approve or lock a concept |
| NA-1 | Navigation & organisation | High | Adding a site image silently switches the scope, and the detected scale varies more than fourfold |
| CC-1 | Whole journey | High | coplanai.com promises Studio features that are missing or only partly there |
| NA-2 | Organisation · privacy | Medium | "Add member…" lists 449 accounts with no search, repeated first names, a raw ID and an email address |
| NA-3 | Organisation · privacy | Medium | Studio never says who "everyone" is: other people can read every project, and new presets are shared by default |
| SS-5 | Site setup | Medium | Picking a colour in the boundary editor erases the drawing, and Undo can't bring it back |
| SS-6 | Site setup | Medium | Back discards unsaved drawing and painting without asking, and Clear boundary deletes at once |
| SS-7 | Site setup | Medium | A misplaced polygon corner can't be undone, and Redraw boundary starts from an empty canvas |
| SS-8 | Site setup | Medium | The land-use review screen says "Set" too early and doesn't show what to fix |
| SS-9 | Site setup | Medium | Two default land-use colours clash with the boundary markers, and the standard is hidden from the Site tab |
| ID-3 | Ideation controls & defaults | Medium | The PENDING tray mixes staged, saved and instant choices, and its count leaves some out |
| ID-4 | Ideation controls & defaults | Medium | New concept can vary only time of day, greenery, water and people, and has no Cancel |
| ID-5 | Ideation controls & defaults | Medium | The Presets tab is a dead end while the library is empty, and layout geometry needs a preset |
| ID-6 | Ideation controls & defaults | Medium | Chips don't say what they ask for: "High" density means five storeys at most |
| RE-2 | Reviewing & editing images | Medium | Before the first run, Touch-up and Adjust look ready but do nothing |
| RE-3 | Reviewing & editing images | Medium | Tiles, Focus view and Compare don't say which image it is or how it was made |
| RE-4 | Reviewing & editing images | Medium | The edit tabs ignore ticked images, and their hint doesn't say what to do |
| RE-5 | Reviewing & editing images | Medium | Moving between images is hidden: invisible arrows, no arrow keys, and Escape doesn't go back |
| RE-6 | Reviewing & editing images | Medium | One Apply to mask click produced two iterations (four images) |
| RE-7 | Reviewing & editing images | Medium | Parent says "No parent image available" on first open, and toolbar buttons come and go |
| RE-8 | Reviewing & editing images | Medium | The prompt strip shows only part of what was sent, so Copy prompt can't reproduce an image |
| RE-9 | Reviewing & editing images | Medium | Touch-up keeps the previous tool or colour for 1–2 s after a switch, and colours have no stated meaning |
| PR-4 | Production & report | Medium | The Report builder's "Report preview" never shows the report |
| PR-5 | Production & report | Medium | A render in progress can look idle, which invites a second paid click |
| PR-6 | Production & report | Medium | Renders can't be opened or acted on from the render set |
| PR-7 | Production & report | Medium | Moving between Production, Video, Upscale and Report is inconsistent |
| PR-8 | Production & report | Medium | The client-facing audit prints internal identifiers instead of plain names |
| NA-4 | Navigation & organisation | Medium | Nothing leads back to the CoPlanAI dashboard, and the unlabelled logo opened the platform admin panel |
| NA-5 | Navigation & organisation | Medium | Uploaded images, Team & permissions and Audit log have no address of their own |
| NA-6 | Navigation & organisation | Medium | Nothing in Studio is a link, and the project-name breadcrumb opens settings |
| NA-7 | Navigation & organisation | Medium | "8 projects" over 7 cards, and a "Completed" status that can't be set anywhere |
| NA-8 | Navigation & organisation | Medium | Machine-made project and team names that drift apart |
| NA-9 | Navigation & organisation | Medium | Save buttons sit at the far end of long pages, and Project settings mixes autosave with Save |
| NA-10 | Navigation & organisation | Medium | Studio Settings and each project's settings edit the same lists, with no sign of which applies |
| NA-11 | Navigation & organisation | Medium | Six image pickers with different names, tabs and contents, and every project's drawings pile up Studio-wide |
| NA-12 | Navigation & organisation | Medium | The Audit log can't answer "what happened on this project?" |
| CC-2 | Whole journey | Medium | No run shows what it costs or how long it takes, and the one output caption is often wrong |
| CC-3 | Whole journey | Medium | Long runs end without saying so, and results land out of sight |
| CC-4 | Whole journey | Medium | Nothing shows the order of work or the next step, and an empty project offers five ways to start |
| CC-5 | Whole journey | Medium | Concept, iteration, variant, version, master: the model's words are never defined |
| SS-10 | Site setup | Low | Editor toolbars are unlabelled icons, and the two editors name the same tools differently |
| SS-11 | Site setup | Low | Two styles of "Set", and a hidden boundary comes back after a reload |
| SS-12 | Site setup | Low | Focus Area projects have no way to mark the part of the photo that may change |
| ID-7 | Ideation controls & defaults | Low | The "+ your own" buttons and their dialogs behave differently from card to card |
| ID-8 | Ideation controls & defaults | Low | Tray chips and "selected" styles are inconsistent |
| ID-9 | Ideation controls & defaults | Low | In the grid the whole panel is locked, including controls that don't need an image |
| ID-10 | Ideation controls & defaults | Low | "Choose from uploaded images" offers only the project's own site plan, and has no Cancel |
| RE-10 | Reviewing & editing images | Low | The Focus toolbar is 15 unlabelled icons over the image, with look-alikes and an AI action mixed in |
| RE-11 | Reviewing & editing images | Low | Compare drops eye-level views from pairs, and Focus view compares only against the Original |
| RE-12 | Reviewing & editing images | Low | Grid filters, counts and headings disagree with what is shown |
| RE-13 | Reviewing & editing images | Low | Adjust drops unsaved changes without warning, and every arrow-key nudge is its own undo step |
| RE-14 | Reviewing & editing images | Low | Touch-up tools have no tooltips, and Apply to mask runs with an empty instruction |
| RE-15 | Reviewing & editing images | Low | Impact's answer pushes "Include in report" and the disclaimer out of view |
| RE-16 | Reviewing & editing images | Low | RECENT PROMPTS mixes Studio's composed prompts with the user's own and hides the full text |
| RE-17 | Reviewing & editing images | Low | The fullscreen viewer is a cut-down Focus view with no navigation |
| RE-18 | Reviewing & editing images | Low | The collapsed panel rail drops three tabs, and its icons have no tooltips |
| RE-19 | Reviewing & editing images | Low | In Top & eye-level, the boundary toggle stays on but no boundary is drawn |
| PR-9 | Production & report | Low | Video slots "Before (leading)" and "After (master)" use internal terms, and the pre-fill comes and goes |
| PR-10 | Production & report | Low | Sequence video keeps the before/after wording |
| PR-11 | Production & report | Low | Camera presets, durations and the prompt placeholder are unexplained or written for buildings |
| PR-12 | Production & report | Low | Upscale's Crystal engine "can invent detail", against the page's "without changing its content" |
| PR-13 | Production & report | Low | A failed video gives no reason, and the error banner comes back on later visits |
| PR-14 | Production & report | Low | Impact answers marked "Include in report" stay out of the report by default |
| PR-15 | Production & report | Low | An empty Production page hides Upscale, the Report builder and Render settings |
| PR-16 | Production & report | Low | Accessibility: 24 identical "Build" buttons, hidden reorder buttons, unnamed handles and info icons |
| NA-13 | Navigation & organisation | Low | One dialog has two names; three things are called "Settings" and two are called "Site" |
| NA-14 | Navigation & organisation | Low | Studio Settings uses different names from the controls it sets up |
| NA-15 | Navigation & organisation | Low | Uploaded images shows a use count, not where each image is used |
| NA-16 | Navigation & organisation | Low | Two places manage who works on a project, and they disagree |
| NA-17 | Navigation & organisation | Low | Many icon buttons have no name or tooltip |
| NA-18 | Navigation & organisation | Low | Some actions appear only on hover, and several dialogs have no close button |
| NA-19 | Navigation & organisation | Low | The library uses four names for two kinds of thing |
| NA-20 | Navigation & organisation | Low | The new-project form works differently for each planning process |
| NA-21 | Navigation & organisation | Low | Studio home opens on a large upload box, and recent projects are below the fold |
| NA-22 | Navigation & organisation | Low | Mixed British and American spelling, broken plurals and three date formats |

**Totals:** 84 items: 12 high, 37 medium, 35 low.

## Quick wins

Fixes we rate as effort S that would remove the most friction. Some are the first step of a larger item; the item says
what the full fix involves.

| Fix | Item | What it removes |
|---|---|---|
| Ask before the first run locks the site: one sheet that shows what is set and says it can't be changed afterwards | SS-3 | The costliest trap of the first hour; today the only way back is a new project |
| Keep Save boundary disabled until there is one closed outline, and open the editor on Polygon | SS-4 | A "Set" status that means nothing |
| Replace the Dubai wording in the platform default prompts, required elements and colour standard with region-neutral text | ID-1 | Desert schemes for every app that has not written its own configuration |
| Move the default Commercial and Water colours away from the boundary markers, and flag clashing swatches in the editor | SS-9 | The likely reason painted commercial zones go missing (SS-2) |
| Write a correct output line under each run button, and put a count and a confirmation on Build all missing | CC-2 | Clicks whose output and spend nobody can predict |
| Ask before Back throws a drawing away, and offer Undo after Clear boundary | SS-6 | One click losing a painted land-use plan |
| Show the storeys on each density chip and the prompt fragment in each ⓘ | ID-6 | Downtown teams choosing "High" and getting five storeys at most |
| Show the previous/next arrows, map the arrow keys, and make Escape go back to the grid | RE-5 | Opening and closing every image from the grid to compare options |
| Point the logo to the CoPlanAI dashboard and add "CoPlanAI" to the breadcrumb | NA-4 | No way out of Studio, and accidental trips into the admin panel |
| Count what is listed ("7 projects · 1 archived") and fix the status filter's wording | NA-7 | A wrong first number and archived work that quietly disappears |
| Add a sticky "Unsaved changes · Save" bar to Project settings and Studio Settings | NA-9 | Settings changes lost because the only Save is 2,800 or 7,000 px away |
| Load an image's lineage before drawing the toolbar, so Parent is right on first open | RE-7 | Planners being told an iteration has no parent |
| Print names instead of raw IDs and model codes in the client-facing audit | PR-8 | An audit that reads like a system dump in front of a client |
| Bring the Studio card on coplanai.com in line with what Studio does today | CC-1 | Buyers looking for planning-document checks and stored cameras that aren't there |

## Bigger changes

The theme reviews proposed 28 structural changes. Many overlap, so we merged them into six.

### A · A site step you can trust, ending in an explicit lock

- **Problem:** Site setup is optional, gives no proof that it worked, and is locked by any first run without warning
  (SS-1 to SS-4). The boundary editor is a general paint canvas (five tools, six colours, an eraser, open strokes)
  used for a task that needs exactly one closed shape, and most of its failures follow from that (SS-4, SS-5, SS-7).
  Teams that already have a zoning plan are asked to paint over it in a second colour scheme, and Studio then reads
  every pixel, printed colours included (SS-2, SS-8). Chapter 3 of our guide needs 7 notes for 11 steps, 4 of them
  warnings, to get readers through this.
- **Proposal:**
  - Present the Site tab as an ordered checklist: ① Site boundary, ② Land use (optional), ③ Check and lock. Each step
    shows a thumbnail of exactly what generation will receive, taken from the stored image rather than the canvas, so
    a missing line is obvious at once.
  - Model the boundary as one editable polygon. The editor opens on Polygon. While drawing, Backspace or Undo removes
    the last corner. After closing, corners can be dragged, added by clicking an edge, or deleted. Edit boundary loads
    the saved outline. Save stays disabled until the shape is closed. Line colour is a display setting that never
    touches the shape.
  - Start Plan land use with one question: "Does the image already show zoning?" If yes, the planner maps the plan's
    own legend colours to land uses (MU-2 → Mixed use, C-1 → Commercial, PUD → Ignore). If no, paint goes on its own
    layer and only that layer is read. In both cases a live "Recognised so far" list and a "Show what Studio read"
    overlay replace today's separate review screen. Studio already has a "Mark as land-use plan" action, hidden on a
    thumbnail in Project settings > Site, which could be the starting point.
  - Every first-run button opens the same review, "Lock the site and start ideation?". After it, the Site tab becomes
    a read-only summary.
- **On screen:** In the left panel, row "① Site boundary ✓ Set" with a 64 px preview of the stored outline and the
  links "Edit boundary · Clear". Row "② Land use · Not set (optional)" with [Plan land use] and "Standard: Generic
  land use · Edit colours". Row "③ Ready to start" with a green [Start ideation…]. The lock dialog, about 640 px wide,
  repeats both previews, lists the recognised land uses and the scale, flags each missing input with its consequence
  ("No land-use plan: generations will ignore zoning, and you can't add one later"), states the first run's output and
  time, and ends with "After this, the boundary and land-use plan can't be changed in this project." Buttons: [Back to
  Site] (focused) and [Lock site and generate]. In the boundary editor the toolbar shrinks to Undo, Redo, zoom,
  [Polygon] [Outline], "Line: Orange", and Cancel; after closing, white corner handles appear with a chip such as
  "Site ≈ 41 ha" taken from the project scale. After locking, the tab shows a padlock, "Site locked on 2 Oct", the two
  previews and the recognised list, and no dead colour legend.
- **Covers:** SS-1 to SS-8, SS-10, SS-11, part of CC-4.
- **Effort:** L. The lock dialog alone is S (SS-3).

### B · A brief that holds from run to run

- **Problem:** Quick actions puts project-level constraints (scope, density, required programme, style) and one-off
  changes (time of day, greenery, water, people) side by side as identical chips, with four different save rules
  (ID-3). After each run the panel forgets the brief, required elements drop out, and the image in focus shows no
  settings (ID-2, RE-8). The project's location does not reach generation, while the defaults that do are written for
  Dubai and can only be changed by an admin (ID-1). New concept cannot change the brief at all (ID-4), and street
  geometry can only be set through a preset (ID-5).
- **Proposal:** Give each concept a **Brief**: scope, density, layout geometry, render style, creativity, required
  elements and references, plus the project's written brief and its location and climate. The brief is kept for every
  run of that concept until someone changes it. Below it sits **Change this run**: scene, adjust, add and free text,
  staged for the next run only. One rule then holds: what is in the brief is saved; what is under "This run only" is
  staged and survives a reload as a draft. Focus view preselects everything from the image in focus. Ship
  region-neutral platform defaults, offer regional packs in Studio Settings, and let a project override the base
  prompt, required elements and density bands. New concept becomes a side sheet that starts from a chosen source and
  shows the full brief.
- **On screen:** Under the panel header "Concept A", a collapsed card: "BRIEF · kept for every run — Master plan ·
  Medium-high (2–3-storey townhouses) · Organic · Illustrative · Balanced · Requires: Public park, Transit stop [Edit
  brief]". Below it the cards under "CHANGE THIS RUN". The tray reads "NEXT RUN · brief + 3 changes", with a "This run
  only" row and a "Clear this run" link. In Focus view, a strip under the header: "Made with: Medium-high · Balanced ·
  Illustrative · Day · People · Public park, Transit stop [Use these settings]". The new-project form gains "Brief
  (optional)", a three-line text area, and "Location & climate", and the report's PROJECT BRIEF prints both. A card at
  the top of the Ideation panel, "What steers this project", names the base prompt, the land-use standard and the
  required elements, with an Edit link. The New concept sheet offers "Start from: Project defaults / Concept A's brief
  / Image I2 of Concept A", the brief cards, a "What sets it apart" text field, and Cancel.
- **Covers:** ID-1 to ID-6, ID-8, RE-8, part of CC-1.
- **Effort:** L.

### C · Every run accounted for

- **Problem:** No run states its output, time or cost. The only caption, "Each run generates 2 variant(s)", is wrong
  under Adjust and Impact, and Build all missing shows no count (CC-2). Progress appears in three different ways,
  Focus view opens mid-run, and Touch-up results land out of sight (CC-3). One Touch-up produced two iterations
  (RE-6), and a render that is building can look idle (PR-5).
- **Proposal:** Work out each run's real output, typical duration and cost, and print them under its button. Ask for
  confirmation above a threshold, for example more than four generations. Keep one run queue on the server, visible to
  everyone on the project. Show each run in place as a new iteration row with one placeholder per expected image, and
  don't open Focus view by itself. End every run with a notice that says where the results went and reports anything
  missing, with Retry. Disable a run button from its first click until the run ends.
- **On screen:** Under the bottom buttons: Quick actions and Prompt "2 images · about 2 min · 2 credits"; Touch-up "2
  images · about 5 min · 2 credits"; Adjust "1 image · a few seconds · no credits"; Impact "Text answer · about 15 s".
  On click the button turns into "Running… Cancel". A chip "Runs · 1" appears left of the account avatar and opens a
  tray: "Concept A · Touch-up · image 1 of 2 · about 3 min left". In the grid: "I3 · generating — Variant 1 of 2 ·
  about 2 min left" above two placeholder tiles. When it ends, a toast: "Touch-up finished: 2 new images in Concept A
  · I3 · View", or "1 of 2 images couldn't be made · Retry". Build all missing opens "Build 22 renders?" with one row
  per concept ("Concept A · from I2 · 10 renders"), a total ("about 25 min · 22 credits") and the buttons [Build 2 to
  check first] and [Build all 22]. If the app meters usage, a "Credits" chip sits next to the avatar.
- **Covers:** CC-2, CC-3, RE-6, PR-5.
- **Effort:** M.

### D · From shortlist to approved master, renders and report

- **Problem:** Favourites lead nowhere. Compare is a bare dialog that shows favourites at mismatched framings (RE-11).
  Production renders whichever iteration is newest and hides renders built from earlier ones (PR-1). "Approved",
  "locked", "master" and "final" appear in Production, Video and the report, but no control sets them (PR-3). The
  Report builder previews none of the report, and its figures disagree (PR-2, PR-4). Production views are prompt
  sentences rather than stored cameras, although coplanai.com promises "Renders from stored cameras" (CC-1).
- **Proposal:** Turn Favourites into a shortlist compared at the leading image's crop and scale. Let the team mark one
  image per concept "Use for production"; that is the master. Production renders from it, keeps every built render
  with its source, and says when Ideation has moved on. Store each production view as a camera set once per project,
  so concepts and before/after pairs share a frame. Make the Report builder a paged preview with a status on each
  section and a check before export, and write the audit in plain words.
- **On screen:** In the grid, Favourites gains "Compare shortlist": all favourites as top views at the leading image's
  crop, with the stored boundary and a scale bar ("0 — 250 m"), captioned "Concept A · I2 · image 1 · Dusk, Greenery 2
  of 3, Water feature", each with a heart, "★ Use for production" and "Open". The Production row header reads "Concept
  A · uses I2 · chosen by <name>, 2 Oct · Change". Built tiles keep a tag "from I2". An amber strip appears when
  Ideation moves on: "Concept A has newer iterations (I3–I6). Your renders stay on I2. [Compare] [Rebuild from I6…]".
  Tiles show one of six states (Empty, Queued, Building, Built, Final, Outdated), and a built tile opens a viewer with
  Download, "Regenerate with note…", "Mark as final", "Upscale" and "Use in video". Render settings > Views shows each
  view as a camera pin on the site plan, labelled "Stored camera · used for all concepts". Video's Before and After
  default to the site image and the chosen image, seen from the same stored camera. In the Report builder, each
  SECTIONS row carries a status ("Render set · 2 of 24 renders", "Approved concepts · none approved" with an amber
  dot), page thumbnails replace today's "Report preview", and a bar above Build PDF lists warnings ("Approved concepts
  is empty · 22 renders missing [Fix]") and blocks only on errors such as totals that disagree. The audit names people
  and models and writes the lineage in words, with entry IDs and the hash in a "Technical details" expander.
- **Covers:** PR-1 to PR-4, PR-6, PR-8, PR-9, RE-11, part of CC-1.
- **Effort:** L.

### E · Images that explain themselves

- **Problem:** The edit tabs act on a target the user can't see: always the image open in Focus view, never a ticked
  one, and before the first run Touch-up and Adjust look ready but don't work (RE-2, RE-4). Iterations can be told
  apart only by I-numbers (RE-3). Parent sometimes claims there is no parent, the navigation arrows are invisible, and
  the toolbar is 15 unlabelled icons over the image (RE-5, RE-7, RE-10). Four grid controls interact in ways nobody
  can predict (RE-12).
- **Proposal:** Show the edit panel's target in a card. Caption every image with how it was made, using what the
  Report builder already logs. Add a lineage filmstrip to Focus view. Dock a labelled toolbar under the image. Replace
  the grid's four controls with one "Show" control and a views switch, remembered per project.
- **On screen:** At the top of the Actions panel, a card about 64 px tall: thumbnail, "Working on: Concept A · I3 ·
  image 1 of 2", "Change". With several tiles ticked it reads "Quick actions: 3 images · Touch-up, Adjust, Prompt and
  Impact: pick one"; with nothing chosen, "Pick an image" above the four newest thumbnails. Each tile gets a caption
  such as "I3 · Touch-up · Turn these blocks into a tree-l…". Under the Focus stage, a 72 px filmstrip in lineage
  order, grouped I1 | I2 | I3, with the parent tagged and a counter "3 / 11"; arrow keys move along it. The toolbar
  below the image reads "View: Top · Eye-level · Side by side", "Boundary" (disabled when nothing can be drawn),
  "Compare: Original · Parent", then heart, download, fullscreen and zoom. "Prompt used" becomes an Info button that
  opens the full prompt, lineage and Impact answers; Regenerate moves to the panel with its output line. The grid
  shows "Show: Latest · All iterations · Favourites" and an "Eye-level views" switch, and headings count what is on
  screen ("Concept A · 2 of 4 images").
- **Covers:** RE-2 to RE-5, RE-7, RE-10, RE-12, RE-19, ID-9, part of CC-5.
- **Effort:** L.

### F · A workspace that behaves like a website, with one settings page and clear access

- **Problem:** The logo has no name and sent the owner to the admin panel; three menu pages have no address; nothing
  in Studio is a link; Video and Upscale hang off Production with no way back (NA-4 to NA-6, PR-7). Project
  configuration lives in a dialog with two names, a Save button 2,800 px down, and lists copied from Studio Settings
  with no sign of which applies (NA-9, NA-10, NA-13). People are managed in two places that disagree, and "everyone"
  is never defined (NA-2, NA-3, NA-16). Six pickers show the same images under different names (NA-11). The same idea
  goes by several names, and one name covers several ideas (CC-5, NA-14, NA-19).
- **Proposal:**
  - Replace the Ideation | Production switch with a project stepper: ① Site · ② Ideation · ③ Production · ④ Report,
    each with its state and the single next action. Video and Upscale open as sub-pages of Production.
  - Give every page an address and make everything that navigates a real link.
  - Make Project settings a full page with tabs General (name, address, process, scope, scale, visibility), Site
    files, People and Generation options. Every row in Generation options says whether it is the Studio default or
    changed in this project. Use one save model throughout.
  - Use one picker everywhere, titled after the slot it fills, with the same tabs in the same order.
  - Show each project's visibility, name the audience in one phrase with a head count, and add people with a search
    that shows their email.
  - Write a one-page glossary and apply it to the interface, tooltips, audit events, report and addresses in one
    release.
- **On screen:** Top bar: logo (tooltip "CoPlanAI home"), breadcrumb "CoPlanAI / Studio / Projects / Downtown plan
  (Studio tutorial demo)", and in the centre "① Site ✓ · ② Ideation · 2 concepts · 11 images · ③ Production · 2 of 24
  renders · ④ Report". A locked step shows a padlock with the tooltip "The boundary and land-use plan are fixed for
  this project." On a new project, one hint line under the stepper: "Next: draw the site boundary · 1 of 3". The
  card's ••• menu gains "Open in new tab" and "Copy link". Project settings opens at
  `/studio/projects/<slug>/settings` with a close × back to the project; each generation row carries a grey "Studio
  default" or green "Changed here" tag, with "Reset to Studio default" in its menu. The project header carries a
  badge: a lock with "Members only", or "Studio-wide · read-only". The People tab has "Add a person by name or email…"
  and rows like "Alex Rossi · alex.rossi@… · Editor ▾ · Remove". The picker reads "Choose the site plan", with tabs
  "This project | Uploads | All projects", a search box, captions on every tile and a "Show drawings" switch that is
  off by default.
- **Covers:** NA-2 to NA-6, NA-9 to NA-11, NA-13, NA-14, NA-16, NA-19, PR-7, CC-4, CC-5.
- **Effort:** L. The glossary and renaming pass alone is S.

---

## Site setup

Chapter 3 of our guide, on the Site tab, needs 7 notes for 11 steps, 4 of them warnings. Many of its 41 numbered beats
explain a workaround: Back doesn't ask, press Esc because Undo is greyed out, check that the line was kept, Redraw
starts empty, Clear doesn't ask, check the recognised list, everything locks after the first run. The guide is mostly
working around the Site tab instead of teaching it.

### SS-1 · The saved site boundary does not contain the drawn line, though the tab says "Set" (High)

- **Where:** Ideation > Site tab > Draw boundary or Redraw boundary > Save boundary; afterwards Site tab > View
  boundary and Hide site boundary. In the sandbox, the land-use editor, Quick actions and Focus view's Original and
  Compare show no boundary either.
- **What happens:** The user closes a polygon or outline and clicks Save boundary. The panel shows "Setting
  boundary…", then "● Set", and the toast says "Boundary set — Generations now stay inside the drawn site boundary."
  But View boundary opens the plain leading image with no orange line. The "Site boundary" overlay holds nothing but a
  few compression dots, and Hide site boundary changes nothing. The upload capture shows why: Save boundary sends two
  images about 1 s apart. The first has the line. The second comes from a hidden second canvas on the editor page, has
  no line, and is the one that is kept. It happened on every save: five explorer saves and the guide's own run, at
  1900×950 and at narrower widths. In an older project ("Conceptual Plan 2026-09-28 2") View boundary does show the
  orange line, so the feature has worked before.
- **Why it matters:** The boundary tells generation where it may design and what to keep as existing context. Planners
  believe it is set because the interface says so twice. After the first run it can't be changed (SS-3), so a team
  only finds out when outputs ignore the site. The guide has to tell readers to open View boundary and report a
  missing line before they generate.
- **Evidence:** `explore/site/97-save-upload-analysis.txt`, `explore/site/97b-save-upload-1-with-stroke.png` (line
  present) and `97c-save-upload-2-without-stroke.png` (no line), `97d-editor-canvas0-visible-with-stroke.png`,
  `97e-editor-canvas1-hidden-no-stroke.png`, `explore/site/49-after-save-boundary.png` ("● Set" and the toast, no line
  on the image), `explore/site/53-view-boundary.png`, `explore/raw/3-05b-view-boundary.png`,
  `explore/site/55-overlay-only-local-debug.png` (overlay empty), `explore/site/61-cp-view-boundary.png` (older
  project, line present), `tutorial/studio/img/3-07-landuse-painted.webp` and `3-11-start-ideation.webp` (no
  boundary), `explore/site/06b-boundary-swatch-colours-and-canvas-layout.txt` (hidden canvas at widths 1024 to 1900)
- **Suggestion:** Upload only the canvas the user drew on, and check that the saved image contains strokes before
  showing "Set". Then show the result where the user already is: a small preview of the stored boundary under "Site
  boundary" in place of the bare View boundary button, and the outline drawn over the leading image by default. If the
  stored image comes back empty, show "Boundary not saved — draw it again" in red instead of "● Set".
- **Effort:** M

### SS-2 · Land-use recognition reads the printed plan instead of the planner's paint (High)

- **Where:** Site tab > Plan land use > Save land-use plan > the "Land-use plan recognised" review; Site tab >
  RECOGNISED LAND USES; the first generations afterwards.
- **What happens:** In the sandbox we painted four zones: Open space, Mixed use, Residential and a red Commercial
  block. RECOGNISED LAND USES then listed Water 7.7%, Transport & roads 5.9%, Mixed use 2.4%, Residential 2.4% and
  Open space 2%. Water and Transport were never painted, and Commercial is missing although it is plainly visible in
  the overlay. An earlier Master Plan on the same downtown plan shows the same pattern: its painted red area is
  missing, and it lists Water 6.9%, Transport & roads 6% and Residential 3.1%. Studio's own tooltip explains why:
  "each pixel is matched to the nearest standard colour". The plan's printed zoning colours (aqua MU-2 and MU-L, the
  grey base map) are matched along with the paint. The default standard flags Commercial #E53935 as "Too close to the
  red boundary marker" (SS-9), the likely reason red paint is dropped. Every generated plan in both projects contains
  a lake or canals, although the source plan shows no water, and the Water fragment the model receives is "water
  bodies". The Dubai-oriented prompts (ID-1) may add to the water, so the link is strong but not proven.
- **Why it matters:** Zoning is the main brief for a master plan. Studio silently replaces the planner's zoning with a
  misreading of the base map, then generates from it. A client can be shown a lakeside scheme for a downtown that has
  no water. A planner would read that as Studio ignoring the brief, and would be right.
- **Evidence:** `tutorial/studio/img/3-07-landuse-painted.webp` (four painted zones, including red Commercial),
  `tutorial/studio/img/3-08-landuse-review.webp` and `3-11-start-ideation.webp` (list without Commercial, with Water
  and Transport), `explore/raw/3-08-after-save.txt`, `explore/site/80-mp-view-plan.png` and
  `explore/site/60-mp-site-tab.png` (second project, same pattern),
  `explore/site/89-hover-land-use-colour-standard-info.txt`, `explore/site/88-edit-colours-in-project-settings.txt`,
  `explore/site/90b-project-settings-land-use-standard-values.txt` (Water = "water bodies"),
  `tutorial/studio/img/4-08-first-results.webp` (lake in the first run)
- **Suggestion:** Read land uses only from what the user painted, never from the composited image; Studio already
  holds the painted zones and their swatch names. Make sure Commercial paint can never be confused with the boundary
  marker. On the review screen, colour the recognised result over the plan ("Show what Studio read") and split the
  list into "Painted by you" and "Read from the image (not used)". Until this is fixed, show a blocking notice
  whenever a painted land use is missing from the result: "Commercial was painted but not recognised — change its
  colour in the standard or repaint."
- **Effort:** M

### SS-3 · The first run from any tab locks the site for good, without asking (High)

- **Where:** Site tab > Start ideation (enabled from the start); Quick actions > Apply to current; Prompt > Generate;
  Presets > Start ideation; Touch-up > Apply to mask (see RE-2). Afterwards, the Site tab of a generated project.
- **What happens:** The green Start ideation button is enabled while Site boundary and Land use plan both read "Not
  set". It gives no reminder and asks for no confirmation. Apply to current on Quick actions also starts the first run
  straight away, with no mention of the site. After the first run, Draw, Redraw and Clear boundary, Review land use,
  Unmark plan and Plan land use all disappear. The boundary at least gets a line: "The boundary is fixed once
  generation has started." The land-use plan only gets "Generations run without a land-use plan.", while the full
  COLOUR LEGEND stays on the tab with no action attached. The pill "Start ideation from the Site tab when ready" never
  says what "ready" means.
- **Why it matters:** The step can't be undone and costs a generation. A team that starts from Quick actions, where
  density and style are chosen, or that forgot the zoning, ends up with a project that can never get a land-use plan
  or a corrected boundary. The only way back is a new project: upload again, check the scale again (NA-1), set it up
  again. With SS-1 and SS-4, a team can lock in a boundary that was never stored. The guide needs two warnings about
  this one lock ("The site is fixed once generation starts" in chapter 3, "The first run fixes the site" in chapter 4)
  and a third, "Check that your line was kept".
- **Evidence:** `explore/site/01-sandbox-ideation-open.png` and `.txt` (Start ideation enabled, nothing set),
  `tutorial/studio/img/3-01-site-tab.webp`, `tutorial/studio/img/4-06-output-pending.webp` → `4-07-generating.webp`
  (Apply to current starts the first run), `explore/site/60-cp-site-tab.png` and `.txt` (locked: only Hide and View
  boundary; "Generations run without a land-use plan."; legend still shown), `explore/site/60-mp-site-tab.txt`
  ("Generations run without a site boundary."), `docs/capture-notes.md` (chapter 3),
  `tutorial/studio/chapters/03-site.js` and `04-ideation.js` (the warnings)
- **Suggestion:** Make the first generation from any tab open one sheet, "Lock the site and start ideation?". It lists
  "Site boundary: Set [thumbnail]" or "Not set" and "Land-use plan: Set (5 land uses)" or "Not set", flags each
  missing input with its consequence, and says "After this, the boundary and land-use plan can't be changed." Buttons:
  [Back to Site tab] (focused) and [Lock and generate]. Change the pill to "Set the boundary and land use, then start
  ideation". After the lock, replace the removed buttons with "Site locked by the first generation on 2 Oct", and hide
  the colour legend when no plan was set. Give teams a way out: let a land-use plan be added later for new concepts,
  or offer "Start a new project from this site" that copies the image, scale and settings. Bigger change A describes
  the full step.
- **Effort:** S for the confirmation sheet; M with previews of the stored images and a recovery path.

### SS-4 · "Save boundary" accepts an empty canvas or an open line and still says "Boundary set" (High)

- **Where:** Site tab > Draw boundary > Save boundary.
- **What happens:** Save boundary is enabled as soon as the editor opens. Clicking it with nothing drawn still shows
  "Boundary set — Generations now stay inside the drawn site boundary." and "● Set". The editor asks for "a closed
  line around the site", but it opens with Straight line selected, which draws one open segment, and Freehand line
  doesn't close either. Only Outline and Polygon close, and nothing checks that the saved line is closed.
- **Why it matters:** "Set" is the only signal a planner has, and here it means nothing. Together with SS-1, a project
  can be locked with no boundary at all while every screen says there is one.
- **Evidence:** `explore/site/94-save-boundary-empty-canvas.txt` and `95-save-boundary-empty-canvas-after.txt` (empty
  save → "Boundary set", "Set"), `explore/site/04-draw-boundary-open.txt` ("Straight line (on)", Save boundary
  enabled, Undo disabled), `explore/site/07-straight-line-drag.png` (one open segment),
  `tutorial/studio/chapters/03-site.js` (step site-boundary-set)
- **Suggestion:** Keep Save boundary disabled until there is one closed shape, with the reason under it: "Close the
  outline to save". Open the editor on Polygon (or Outline), and move Straight line and Freehand line into a secondary
  group or remove them. If several shapes or open strokes exist, say "Save uses one closed outline — remove the extra
  lines".
- **Effort:** S

### SS-5 · Picking a colour in the boundary editor erases the drawing, and Undo can't bring it back (Medium)

- **Where:** Site tab > Draw boundary > the six colour swatches and the Eraser in the bottom toolbar.
- **What happens:** After tracing the site, clicking any of the six colour swatches clears the canvas. This happened
  with Purple, Green and Yellow. Undo stays enabled but does nothing, even after three clicks. Changing the stroke
  width keeps the line, and the land-use editor keeps its paint when you switch swatch, so the boundary editor behaves
  differently from its twin. Separately, in one sequence an Eraser drag across a purple line left a new purple line;
  in other sequences it cut gaps correctly.
- **Why it matters:** Tracing a site precisely takes minutes. Picking a colour afterwards is a natural move,
  especially as Red and Blue show warnings that invite you to choose another, and it destroys the work with no way
  back. The guide has to warn readers to pick the colour before drawing ("Keep the orange line").
- **Evidence:** `explore/site/27-outline-A.png` → `28-after-thin-click.png` (kept) → `29-after-purple-click.png`
  (wiped), `explore/site/38-two-orange-lines.png` → `39-after-yellow-click.png`,
  `explore/site/40-undo-after-yellow.txt` (Undo enabled, no effect), `explore/site/36-click-green-swatch.png`,
  `37-undo-after-colour-click.png`, `explore/site/71-landuse-after-switching-colour.png` (land-use editor keeps its
  paint), `explore/site/21-freehand-thin-purple.png` and `22-eraser.png` (eraser left a line),
  `34-eraser-drag-across.png` and `45-repro-thin-purple-eraser.png` (eraser works)
- **Suggestion:** Make colour a display setting of the outline: a swatch recolours the existing line and never clears
  it. Put every canvas change on the Undo stack. Since the boundary is one shape, replace the six-colour row with two
  contrast options ("Line colour: Orange / Purple"), chosen to stay clear of the land-use colours. Make sure the
  Eraser can never paint.
- **Effort:** M

### SS-6 · Back discards unsaved drawing and painting without asking, and Clear boundary deletes at once (Medium)

- **Where:** Boundary editor and land-use editor > Back (far right of the toolbar); Site tab > Clear boundary.
- **What happens:** Back leaves either editor and discards every stroke or painted zone, with no "discard changes?"
  prompt. Draw boundary then reopens on an empty canvas. Clear boundary deletes the saved boundary at once, with only
  an after-the-fact toast, "Boundary cleared — Generations use the full image again.", and no undo.
- **Why it matters:** Painting a land-use plan with several zones takes real effort. Back sits in the toolbar and
  reads like "close panel", so one click loses all of it. The guide spends two beats warning about this.
- **Evidence:** `explore/site/25-back-with-unsaved-drawing.png`, `26-reenter-after-back.png` (empty on return),
  `explore/site/74-landuse-back-unsaved.png` (painting gone), `explore/site/64-clear-boundary-clicked.png` (immediate,
  toast only), `tutorial/studio/chapters/03-site.js`
- **Suggestion:** Rename Back to "Cancel". When there are unsaved changes, ask "Discard your drawing? [Keep drawing]
  [Discard]". Better still, keep the draft for the session, so Draw boundary and Plan land use reopen where the user
  left off. Give the Clear boundary toast an "Undo" action for 10 s, or ask first: "Remove the site boundary?
  Generations will use the whole image."
- **Effort:** S

### SS-7 · A misplaced polygon corner can't be undone, and Redraw boundary starts from an empty canvas (Medium)

- **Where:** Boundary editor > Polygon tool; Site tab > Redraw boundary.
- **What happens:** While a polygon is open, Undo and Redo stay disabled. The only escape is Esc, which drops the
  whole unfinished shape and isn't mentioned anywhere on screen. Once the shape is closed, a single Undo removes the
  whole outline. Redraw boundary opens the editor on an empty canvas with the note "A boundary is already set — saving
  a new drawing replaces it." The current boundary is not loaded for editing.
- **Why it matters:** Site boundaries have many corners and are traced at map scale, so a misplaced click is common.
  Every slip costs the whole outline, and adjusting one edge after saving means retracing the entire site.
- **Evidence:** `explore/site/12-polygon-3-points.txt`, `13-polygon-all-points-hover-first.png` and `.txt` (Undo
  disabled mid-polygon), `explore/site/17-polygon-in-progress-escape.png` (Esc drops the shape),
  `explore/site/15-polygon-closed-undo.txt`, `explore/site/56-redraw-boundary-open.png` (empty canvas and replace
  note), `tutorial/studio/img/3-03-boundary-polygon.webp` (Undo greyed)
- **Suggestion:** Let Undo and Backspace remove the last corner while drawing. Put a hint in the on-canvas pill:
  "Click to add corners · Backspace removes the last · click the first point to close · Esc cancels". Rename Redraw
  boundary to "Edit boundary" and open the saved outline with draggable corners: click an edge to add a corner, select
  one and press Delete to remove it. Keep "Start over" as a secondary button.
- **Effort:** M

### SS-8 · The land-use review screen says "Set" too early and doesn't show what to fix (Medium)

- **Where:** Plan land use > Save land-use plan > "Land-use plan recognised" (route `/ideation/land-use`); the left
  panel during the review; Recalculate land uses in the editor.
- **What happens:** After Save land-use plan, the left panel already shows Land use plan "Set" and Start ideation is
  active, before the user has chosen anything. Review land use, Unmark plan and Hide land use plan are greyed out,
  with "Finish or cancel drawing to change overlay visibility." although nobody is drawing. The two buttons, "Draw
  land use" and "Continue as land use", don't say that one goes back to painting and the other accepts the result. The
  warning "Many areas didn't match the standard colours — results may be unreliable." doesn't show which areas. The
  percentages don't say what they are a share of: Residential reads 2.4% for a large painted block, so it is
  presumably a share of the whole image. In the editor, "Recalculate land uses" has no tooltip and no visible effect,
  and the list only appears after saving.
- **Why it matters:** This is the one moment where a planner could catch SS-2, and the screen gives them no way to act
  on it.
- **Evidence:** `tutorial/studio/img/3-08-landuse-review.webp` ("Set" before Continue; greyed controls),
  `explore/raw/3-08-after-save.txt`, `tutorial/studio/img/3-07-landuse-painted.webp` (Recalculate land uses),
  `explore/site/68-tooltips-landuse-toolbar.txt`, `tutorial/studio/chapters/03-site.js` (warning "Check the list
  before you go on")
- **Suggestion:** Keep the status "Not set" until the user accepts, and hide Start ideation during the review. Rename
  the buttons "← Edit painting" and "Use this zoning". Head the list "Share of site (inside boundary)" and compute it
  inside the boundary. Replace the warning with a count and a map toggle: "41% of the site matches no land use — [Show
  unmatched areas]", which hatches those pixels on the plan. Make the editor's left panel a live "Recognised so far"
  list, so Recalculate land uses is no longer needed.
- **Effort:** M

### SS-9 · Two default land-use colours clash with the boundary markers, and the standard is hidden from the Site tab (Medium)

- **Where:** Site tab > COLOUR LEGEND > the sliders icon ("Edit colours in project settings") > Project settings >
  Settings > LAND USE > Land-use colour standard; the swatches in both editors.
- **What happens:** Out of the box, the standard flags two of its own colours: Commercial #E53935 "Too close to the
  red boundary marker" and Water #81D4FA "Too close to the blue boundary marker". Yet the land-use editor offers the
  Commercial swatch with no warning; its tooltip only says "Commercial". The default boundary colour, Orange #F38744,
  is not flagged against Community facilities #FB8C00, although that pair is about as close as the flagged Blue and
  Water. The Site tab names neither the standard ("Dubai land use", see ID-1) nor the fact that its fragments steer
  generation. The way in is an unlabelled sliders icon, and edits are kept only after Save at the bottom of a long
  dialog (NA-9).
- **Why it matters:** The shipped Commercial colour clashes with the boundary marker, which is the likely reason
  commercial zones go missing (SS-2). Planners can't find, or trust, a setting that shapes every output.
- **Evidence:** `tutorial/studio/img/3-10-colour-standard.webp`,
  `explore/site/88-edit-colours-in-project-settings.txt` (Commercial and Water warnings),
  `explore/site/66-land-use-editor-direct-url.txt` (Commercial swatch without a warning),
  `explore/site/06b-boundary-swatch-colours-and-canvas-layout.txt` (Orange against Community facilities),
  `explore/entry/61-settings-tab-settings-scroll4.png` (the same at project set-up)
- **Suggestion:** Change the default Commercial and Water colours so they clear the boundary markers, and check Orange
  against Community facilities with the same rule. Mark any clashing swatch in the editor with a warning icon and a
  tooltip. Show the standard under the legend: "Standard: Generic land use · Edit colours".
- **Effort:** S

### SS-10 · Editor toolbars are unlabelled icons, and the two editors name the same tools differently (Low)

- **Where:** The bottom toolbars of the boundary editor and the land-use editor.
- **What happens:** No toolbar button in either editor has a hover tooltip: Undo, Redo, zoom, the drawing tools, the
  strokes and Back. The only exceptions are the Red and Blue swatches, which show "Too close to…". The two editors
  also name their tools differently: "Freehand line" and "Freehand", "Outline (closes itself)" and "Fill outline
  (closes itself)", "Polygon (click corners, close on the first point)" and "Fill polygon". Straight line exists only
  in the boundary editor, the Thin and Thick icons differ, and only the boundary editor has an on-canvas hint pill.
- **Why it matters:** New users guess at icons; the guide calls them "the lasso" and "the pentagon". Each editor has
  to be learned separately.
- **Evidence:** `explore/site/06-tooltips-boundary-toolbar.txt`, `explore/site/68-tooltips-landuse-toolbar.txt`,
  `explore/site/04-draw-boundary-open.txt` and `explore/site/66-land-use-editor-direct-url.txt` (tool names),
  `tutorial/studio/img/3-02-boundary-editor.webp` and `3-06-landuse-editor.webp`
- **Suggestion:** Add tooltips from the accessible names, with a shortcut where there is one ("Polygon — click
  corners, close on the first point (P)"). Use one tool set and one set of names in both editors, with the same icons
  and stroke controls. Give the land-use editor a hint pill too: "Pick a land use, then paint its area".
- **Effort:** S

### SS-11 · Two styles of "Set", and a hidden boundary comes back after a reload (Low)

- **Where:** The section headers on the Site tab; Site tab > Hide site boundary.
- **What happens:** A set Site boundary shows an orange dot and "Set". A set Land use plan shows a green "Set" with no
  dot. Switching Hide site boundary to "Show site boundary" is lost on reload: the button reads "Hide site boundary"
  again, with the overlay on.
- **Why it matters:** Status should read the same way at a glance, and a view choice that resets itself makes people
  doubt what they saw.
- **Evidence:** `tutorial/studio/img/3-11-start-ideation.webp` (both badges),
  `explore/site/49-after-save-boundary.png`, `explore/site/51-hide-site-boundary-toggled.txt`,
  `explore/site/06b-boundary-swatch-colours-and-canvas-layout.txt` (reset after reload)
- **Suggestion:** Use one badge style: a green dot and "Set", grey "Not set", and a red "Check" when the SS-1 or SS-2
  conditions are detected. Remember the Hide/Show choice per project.
- **Effort:** S

### SS-12 · Focus Area projects have no way to mark the part of the photo that may change (Low)

- **Where:** A Focus Area project > Ideation > Actions panel (Quick actions, Presets, Touch-up, Adjust, Prompt,
  Impact; no Site tab).
- **What happens:** Focus Area projects open on Quick actions, and the panel has six tabs with no Site tab. Nothing
  says why, and nothing lets the user fence the part of the street photo that should change. The only way to limit
  change is Touch-up's mask, after a first generation has already redesigned the view. The tab positions shift too:
  Touch-up is the third tab here and the fourth elsewhere.
- **Why it matters:** Street-level work is usually about one frontage, plot or crossing, not the whole view. Without a
  way to say so up front, the first runs spend credits redesigning context the team wanted kept.
- **Evidence:** `explore/site/82-fa-ideation-default.png` and `.txt` (no Site tab),
  `explore/images/71-fa-03-focus-first.png` (whole street view regenerated), `tutorial/studio/chapters/03-site.js`
  (note "No Site tab in a Focus Area")
- **Suggestion:** Add an optional card at the top of Quick actions in Focus Area: "Area to change (optional) — [Mark
  area]". It opens the boundary editor on the photo and is stored like a site boundary. When none is set, show "The
  whole view may change". Alternatively, keep a Site tab in Focus Area with only this optional area, so the tab order
  is the same in every project.
- **Effort:** M

## Ideation controls & defaults

### ID-1 · The inherited default configuration is written for Dubai (High)

- **Where:** Studio Settings > the three master prompts (master plan, Focus Area, single building), Density bands,
  Canvas > Required elements, Land use > Land-use colour standard. Quick actions > Density and Required elements.
  Project settings > Details > Location, and the project's Settings tab.
- **What happens:** Studio Settings says "This app inherits the platform default configuration." That default master
  prompt, which is put in front of every generation, reads: "A near-orthographic top-down aerial view of a single
  development parcel in Dubai … in a hot-arid desert setting … generous native desert and palm planting … a warm
  sand-and-limestone material palette". The Focus Area prompt repeats the desert and palm planting, and the
  single-building prompt names Dubai again. Community mosque is the first required element, and Majlis ("a low,
  colonnaded single-storey pavilion") is also on the list. The density bands run from "large detached villas" to
  "three- to five-storey apartment blocks", with nothing taller. The land-use standard is named "Dubai land use", and
  its Residential fragment asks for "residential neighbourhoods of villas and low-rise homes". Inside a project
  nothing names these defaults. The master prompt is visible only to admins, on a Studio Settings page about 7,000 px
  tall. The project's Location field carries the tooltip "Recorded for reference — does not affect image generation",
  although the Settings preview lists a "site anchor from the brief — location, area, project type". The project's
  Settings tab can't override the master prompt, the density bands or the required elements. Every run on our US
  downtown zoning plan came back as a sand-coloured desert city with a lake, palms and sand-and-limestone blocks, and
  the production renders have palms too.
- **Why it matters:** Any app that has not saved its own configuration starts every generation from this desert brief.
  A team outside the Gulf gets options in the wrong climate and building culture from the first click, and nothing in
  Quick actions says why. A client can be shown palm planting and a desert palette for a temperate city. The guide has
  to open chapter 4 with a warning ("Check the defaults for your region first") and add a tip for density ("Need
  taller buildings?"). Even then, a project team can't fix it without an admin.
- **Evidence:** `explore/quick/62-settings-field-values.txt` (the three prompts, "Dubai land use"),
  `explore/quick/60-settings-top.txt` ("This app inherits the platform default configuration."),
  `explore/media-org/100-settings-top.txt` (density bands, majlis), `explore/quick/01-quick-top.txt` (Community mosque
  first), `explore/quick/65-settings-preview-generation-prompt.txt` (site anchor),
  `explore/entry/69d-title-attributes.json` (Location tooltip), `explore/entry/60-settings-tab-settings.txt` (project
  Settings tab), `explore/site/90b-project-settings-land-use-standard-values.txt`,
  `tutorial/studio/img/4-08-first-results.webp`, `4-09-iterate.webp`, `4-10-timeline.webp`, `6-03-built.webp`,
  `tutorial/studio/chapters/04-ideation.js` (warning and tip)
- **Suggestion:**
  - Make the platform default region-neutral: start the master prompt with "…a single development parcel at the
    location given in the project brief…", and remove "Dubai", "hot-arid desert", "palm" and "sand-and-limestone" from
    all three prompts. Ship Required elements empty, with today's list offered as suggestions. Rename the standard
    "Generic land use" and change Residential to "residential neighbourhoods".
  - Make Location, and a new "Climate / region" choice, feed the site anchor, and drop the "does not affect image
    generation" tooltip from those fields.
  - In Studio Settings, offer "Start from a regional pack" (Gulf, Europe, North America …) that fills the prompts,
    required elements, density bands and colour standard in one step.
  - In Project settings > Settings, allow per-project overrides: "Base prompt (this project)", a "Hide in this
    project" eye on each required element (as the land-use rows already have), and density bands.
  - Until then, show a notice at the top of Quick actions whenever the app's master prompt names a place: "Generations
    follow this app's master prompt, written for Dubai. Change it in Studio Settings."
- **Effort:** S for the region-neutral default text; M for location, regional packs and per-project overrides.

### ID-2 · The brief is not kept between runs (High)

- **Where:** Quick actions after Apply to current; Focus view with an image in focus; the toolbar's Prompt bubble.
- **What happens:** After Apply to current, the chips reset. While run 1 was going, and after it finished, Day,
  People, Medium-high, Balanced and Illustrative were no longer selected. When an image is open in Focus view,
  Density, Creativity and Render Style show nothing selected, although that image's prompt strip shows it was made
  with Medium-high, Balanced and Illustrative. The required elements Public park and Transit stop are saved to the
  project and survive a reload, and they were in the tray for run 1. Before run 2, the tray listed only Dusk, Greenery
  ↑↑ and + Water feature. Studio Settings says the opposite of all this: its tooltip says required elements are "held
  constant across every planning preset", and its prompt preview files density and required elements under PERSISTENT
  CONSTRAINTS. Yet the prompt strip shows density sent as a one-off change ("Adjust the residential density to
  medium-high density …") and does not list the required elements (RE-8). Iteration 2 was staged on an Illustrative
  top view with only Dusk, Greenery and Water feature. It came back as two photoreal oblique aerials, one of them a
  close-up of a fountain plaza.
- **Why it matters:** Planners iterate on the assumption that the brief holds: the density, the mandated school, park
  or transit stop, the style. Instead, mandated facilities can drop out of later iterations without notice, and the
  style and viewpoint drift. Because the panel never shows what the image in focus was made with, nobody can stage the
  same settings again. These outputs end up in client decks.
- **Evidence:** `tutorial/studio/img/4-07-generating.webp`, `explore/raw/4-run1-before.txt`,
  `explore/raw/4-run1-09.png`, `explore/raw/4-09-raw.txt` and `tutorial/studio/img/4-09-iterate.webp` (tray without
  the required elements), `explore/raw/5-04-raw.png` and `.txt`, `explore/quick/54-existing-focus-image-quick.png`,
  `tutorial/studio/img/4-10-timeline.webp` (I2 as oblique aerials), `explore/quick/62-settings-field-values.txt`,
  `explore/quick/65-settings-preview-generation-prompt.txt`
- **Suggestion:** Treat Density, Required elements, Render Style, Creativity and (once added, ID-5) Layout geometry as
  the concept's brief. Keep them selected after a run and for every iteration of that concept, and preselect the chips
  from the image in focus. Under the panel header, add a one-line strip: "Made with: Medium-high · Balanced ·
  Illustrative · Day · People · Public park, Transit stop", with "Use these settings". Once this works, change the
  Required elements header from "· applied to the next generation" to "· kept for every run of this concept". Bigger
  change B describes the full model.
- **Effort:** M

### ID-3 · The PENDING tray mixes staged, saved and instant choices, and its count leaves some out (Medium)

- **Where:** Quick actions > the PENDING tray above Apply to current (also shown on the Presets tab).
- **What happens:** The count doesn't match the chips: "PENDING · 3" with 5 chips, "PENDING · 5" with 7. With only
  required elements, or only a reference image ("Reference images: 1"), the header shows no number at all, yet Apply
  to current is enabled. Required elements are written to the project on click and survive a reload, but look exactly
  like the staged chips. Everything else in the tray disappears on reload. Scope and Aspect Ratio save instantly and
  never appear in the tray. Clear also unticks the saved required elements for good. Nothing on screen says which kind
  of choice is which. The guide needs a tip ("The tray lives in this browser tab") and two beats of explanation.
- **Why it matters:** The tray exists to show what the next run will do, and it can't be trusted for that. A reload
  loses a carefully staged run, and Clear deletes saved project settings without saying so.
- **Evidence:** `tutorial/studio/img/4-04-required-elements.webp`, `4-06-output-pending.webp`,
  `explore/quick/10-required-elements-selected.txt`, `explore/quick/91-refs-card-one-selected.txt`,
  `explore/quick/33-pending-tray-4-items.txt`, `explore/quick/logs/s13.log`, `s14.log`, `s7.log`
- **Suggestion:** Count every chip. Split the tray into two labelled rows: "Kept for this project: Public park ×
  Transit stop ×" and "This run only: Day × + People × Density: Medium-high × …". Rename Clear to "Clear this run" and
  make it clear only the second row. Keep staged chips as a project draft so a reload brings them back, or warn before
  leaving: "You have 5 staged changes." When Scope or Aspect Ratio changes, show a brief "Saved to project" tick.
- **Effort:** M

### ID-4 · New concept can vary only time of day, greenery, water and people, and has no Cancel (Medium)

- **Where:** Ideation grid > + New concept.
- **What happens:** The dialog says "A concept is a separate timeline for testing another approach". It offers only
  SCENE (Day, Dusk, Night), AREAS (Greenery as an on/off chip, where Quick actions has a three-step slider) and ADD
  (Water feature, People). It has no density, render style, creativity, layout geometry, required elements, references
  or text. It says "Without changes, the first image starts from the project defaults", but Studio never shows what
  the project defaults are. There is no Cancel or close button, only Create concept. The concept's name is only a
  label: "Green streets", created with Day and People, came back as another lakeside top view.
- **Why it matters:** Planners compare alternatives by density, street layout and programme, and none of these can be
  set here. The name suggests a direction that generation never receives. With no Cancel, users fear that closing the
  dialog will create a concept and spend a run.
- **Evidence:** `tutorial/studio/img/4-11-new-concept.webp`, `explore/raw/4-11-newconcept-probe.txt`,
  `tutorial/studio/img/4-12-two-concepts.webp`
- **Suggestion:** Start the dialog with "Start from: Project defaults / Concept A's brief / Image I2 of Concept A".
  Below it, show the same cards as Quick actions: Density, Render Style, Layout geometry, Required elements, Scene, a
  Greenery slider and Add. Add a "What sets it apart" field that is sent as the concept's direction. Give it Cancel
  and a close ×, and state the output under Create concept (CC-2).
- **Effort:** M

### ID-5 · The Presets tab is a dead end while the library is empty, and layout geometry needs a preset (Medium)

- **Where:** Actions panel > Presets tab (compass icon); Quick actions; Studio Settings > Layout geometry.
- **What happens:** In an empty project the pill on the image says "Start ideation from the Presets tab when ready".
  The tab shows only "No planning presets for this plan type yet." and New planning preset. Start ideation stays
  disabled even with a change pending ("Select a preset above to enable Start ideation."), while Apply to current in
  Quick actions accepts the same change. Layout geometry (Linear, Organic, Hybrid) is set up in Studio Settings and
  listed in the generation prompt under DIRECTION SETTINGS, but Quick actions has no card for it, so without a preset
  it can't be set at all. The "+" in the Presets header and New planning preset have no tooltip.
- **Why it matters:** The image sends new users to a tab where they can do nothing. Street geometry, a core planning
  choice, is out of reach for every team that has not built presets yet.
- **Evidence:** `explore/quick/40-presets-tab-sandbox.png`,
  `explore/quick/44-presets-sandbox-start-ideation-disabled.png`, `explore/quick/45-presets-tab-with-pending.png`,
  `tutorial/studio/img/4-13-presets.webp`, `explore/quick/65-settings-preview-generation-prompt.txt`,
  `explore/quick/43-presets-sandbox-hover-plus.txt`
- **Suggestion:** Add a "Layout geometry" card to Quick actions between Density and Creativity, with the fragment in
  its tooltip. Replace the empty state with "No planning presets yet. A preset bundles density, style, geometry and
  required elements. [Save current Quick actions as a preset] [Open Library]", and let Start ideation run the pending
  tray. While no preset exists, point the pill to Quick actions. Add the tooltip "New planning preset" to the "+".
- **Effort:** M

### ID-6 · Chips don't say what they ask for: "High" density means five storeys at most (Medium)

- **Where:** The Quick actions cards; the custom-option dialogs.
- **What happens:** The Density chips read Low, Medium, Medium-high and High. The building types behind them ("Low:
  large detached villas of one to two storeys…", "High: three- to five-storey apartment blocks with structured or
  podium parking") appear only in Studio Settings. Only Scope, Density, Creativity and Render Style have an info icon.
  Reference Images, Required elements, the scene group, Adjust, Add, Aspect Ratio and the Output selects have none,
  and no card shows the prompt fragment it sends. The Density, Creativity and Render Style tooltips say "Stages a …
  change for the image in focus", even in an empty project. The circle-slash button beside Greenery ("Remove all
  Greenery") has no tooltip and stages "Greenery ✕". The custom-option dialogs ask planners for a "Prompt fragment …
  the model-facing phrasing".
- **Why it matters:** Planners pick a density without knowing the storeys. A downtown team that chooses High gets
  three to five storeys at most. The guide has to quote the fragments and add a tip ("Need taller buildings?").
- **Evidence:** `tutorial/studio/img/4-01-quick-actions.webp`, `explore/quick/05-tooltip-density.txt`,
  `explore/quick/logs/s2.log`, `explore/quick/15-hover-remove-all-greenery.txt`,
  `explore/quick/61-settings-scroll-02.png`, `explore/quick/17-required-add-other-open.txt`
- **Suggestion:** Give each density chip a second line or a hover card ("High · 3–5-storey apartment blocks"). Add an
  ⓘ to every card that shows what it sends ("Sends: 'a public park and open landscaped green'"). In an empty project,
  reword the tooltips to "Sets the density for the first generation". Give the circle-slash button the tooltip "Remove
  all greenery". In the dialogs, rename "Prompt fragment" to "What to ask the AI for" and add an example placeholder.
- **Effort:** S

### ID-7 · The "+ your own" buttons and their dialogs behave differently from card to card (Low)

- **Where:** Quick actions > the Adjust, Add, scene group and Required elements cards.
- **What happens:** Adjust > + your own opens a dialog titled "Edit adjust option" for a new option, with Discard
  changes and Save and a "Levels" field. Required elements > Add other opens "Add required element" with Cancel and
  Add. + your own scene group opens "Add scene group" with Cancel and Save, and its option Name input is drawn at
  about half height. Add > + your own opens no dialog at all: it switches to the Prompt tab, which hides the PENDING
  tray and turns the button into Generate, disabled until text is typed.
- **Why it matters:** Four look-alike buttons do four different things. The jump to the Prompt tab hides the staged
  choices and changes the run button without warning.
- **Evidence:** `explore/quick/19-adjust-own-open.png`, `explore/quick/17-required-add-other-open.txt`,
  `explore/quick/18-scene-own-group-open.png`, `explore/quick/25-add-own-click-result.png`,
  `explore/quick/46-prompt-tab-with-pending.png`
- **Suggestion:** Give Add its own "Add element" dialog (Name, What to ask the AI for, "Saves to this project only").
  Title every dialog "Add … option" with Cancel and Add, and fix the squashed Name input. If the jump to the Prompt
  tab is intended, label the button "Describe your own →" and keep the tray visible on the Prompt tab.
- **Effort:** S

### ID-8 · Tray chips and "selected" styles are inconsistent (Low)

- **Where:** Quick actions > the PENDING tray and the Required elements card.
- **What happens:** Some chips carry a prefix ("Density: Medium-high", "Render style: Illustrative", "Reference
  images: 1") and others don't ("Day", "+ People"). Greenery shows arrows and a cross that nobody explains ("Greenery
  ↑↑", "Greenery ✕"). The card is titled "Render Style" but its chip says "Render style". A selected required element
  shows a light-green tick, while every other selected chip fills dark green. "Required elements" wraps onto two
  lines, with "· applied to the next generation" squeezed beside it in small grey type.
- **Why it matters:** The tray is meant to be read through before a run. Mixed labels make it slower to check, and two
  selected styles make required elements look half-selected.
- **Evidence:** `tutorial/studio/img/4-04-required-elements.webp`, `4-06-output-pending.webp`, `4-09-iterate.webp`,
  `explore/quick/logs/s7.log`
- **Suggestion:** Use "Card: value" for every chip: "Scene: Day", "Add: People", "Greenery: 2 of 3", "Greenery: remove
  all", "Required: Public park". Use one selected style, the dark fill. Put the Required elements subtitle on its own
  line under the title. (The unnamed "Scene group 1" is covered in NA-14.)
- **Effort:** S

### ID-9 · In the grid the whole panel is locked, including controls that don't need an image (Low)

- **Where:** Quick actions while the grid shows images and none is open or selected.
- **What happens:** The panel shows "Choose or select the images you want to edit first." and an invisible overlay
  greys out every card, including Scope, Aspect Ratio and the Output selects, which don't depend on an image. The info
  tooltips can't be hovered. The locked chips are not marked disabled, so assistive technology reports them as active.
- **Why it matters:** Users can't check the scope or read the help until they open an image, and screen-reader users
  get controls that do nothing.
- **Evidence:** `tutorial/studio/img/4-08-first-results.webp`, `explore/quick/50-existing-quick-top.png`,
  `explore/quick/51-existing-quick-hover-scope-info.txt`
- **Suggestion:** Lock only the image-dependent cards; keep Scope, Aspect Ratio, Output and every ⓘ usable. Set
  `aria-disabled` on locked chips. Turn the hint into a button, "Open latest image", that puts the newest variant in
  focus. See also RE-4 for the edit tabs.
- **Effort:** S

### ID-10 · "Choose from uploaded images" offers only the project's own site plan, and has no Cancel (Low)

- **Where:** Quick actions > Reference Images > Choose from uploaded images.
- **What happens:** In both projects we tried, the "Choose reference images" dialog listed only the project's own
  leading image (here, the zoning plan itself), although Uploaded images holds at least 6 uploads. The dialog has only
  a Done button. A chosen reference shows as "Reference images: 1" in the tray but is not counted in PENDING.
- **Why it matters:** References are the main way to steer materials and atmosphere, but the picker never shows the
  Studio's mood images, and offering the site plan as its own reference is confusing.
- **Evidence:** `explore/quick/31-refs-choose-from-uploaded-dialog.png`,
  `explore/quick/57-existing-choose-reference-images-dialog.png`, `explore/scout/11-menu-uploaded-images.txt`,
  `explore/quick/91-refs-card-one-selected.txt`
- **Suggestion:** Give the picker the tabs "This project · All uploads · Mood boards & style references". Leave out
  the leading image, or label it "Site image (already sent)". Add Cancel next to Done, and count references in
  PENDING. NA-11 proposes one picker for all of Studio.
- **Effort:** M

## Reviewing & editing images

Chapter 5 of our guide, on reviewing and editing, needs 10 notes for 13 steps, more than any other chapter. Most of
them exist to work around behaviour listed below: "Open one image for the edit tabs", "Leaving Select mode",
"Comparing concepts?", "Can't find a favourite?", "Edits add images, they don't replace them" and "Save before you
move on".

### RE-1 · Generated plans copy the plan's legend with the wrong colours (High)

- **Where:** Generated top views in Conceptual Plan projects whose leading image is a plan with a legend. Seen in
  Focus view, Compare and the grid thumbnails, and therefore in downloads.
- **What happens:** Our leading image is a zoning plan with a legend box. Every lakeside variant reproduces that
  legend box with the same labels, but the colours no longer match. On the plan, "Downtown" is the red dashed
  boundary; on the variant it is a light-blue swatch, and light blue on the variant is the lake. The MU-2 and Open
  Space swatches are recoloured too. Nothing on screen points this out.
- **Why it matters:** Variants are shown to colleagues and clients. A legend that looks official but assigns the
  colours wrongly misstates the land uses in a planning deliverable. The guide has to warn readers: "Don't read land
  uses from a variant's legend".
- **Evidence:** `explore/edit-tabs/12-sandbox-touchup-brush-stroke.png` (original plan: Downtown is a red dashed
  line), `tutorial/studio/img/5-01-focus-view.webp` (variant: Downtown is a light-blue swatch), `5-03-compare.webp`,
  `explore/raw/5-13-timeline.png` (every lakeside tile carries the copied legend),
  `tutorial/studio/chapters/05-refine.js`
- **Suggestion:** Add a "Mark legend" rectangle tool next to Draw boundary on the Site tab, and pre-detect legend
  boxes on uploaded plans. Keep that area out of what the model may redraw, and paste the original legend back onto
  every variant or leave the area blank. As a stopgap, add "do not reproduce legends, scale bars, north arrows or
  title blocks" to the default prompt, and show a notice on variants whose source plan has a legend: "Legend copied by
  the model; colours may not match your plan".
- **Effort:** M

### RE-2 · Before the first run, Touch-up and Adjust look ready but do nothing (Medium)

- **Where:** Ideation > Actions panel > Touch-up and Adjust, in a new project before its first generation (pills
  "Touch up the photo to start ideating" and "Adjust the photo and save it as a new version").
- **What happens:** In the sandbox before its first run, the Touch-up tab looked ready under its pill. Brush strokes,
  text and polygons left no mark on the site image. Apply to mask stayed off ("Draw on the image to enable Apply to
  mask.") and the panel header still read ACTIONS. One route did work: collapse the panel, then click the Touch-up
  icon on the rail. That opened the image as "Concept A" with a working canvas. In Adjust, Brightness +20, Saturation
  −30 or −80, or the B&W filter turned on Save as new version, but the site image did not change at all. The Impact
  tab, by contrast, says plainly "Impact analysis becomes available after the first generation". The pills also call a
  land-use plan "the photo".
- **Why it matters:** Marking up the site and asking for a change is the first thing many planners will try. The tool
  looks ready, does nothing and gives no reason, so people conclude Touch-up is broken. Adjust would let them save a
  "new version" they never saw.
- **Evidence:** `explore/edit-tabs/02-sandbox-touch-up.png`, `12-sandbox-touchup-brush-stroke.png` (brush selected, no
  stroke, Apply to mask off), `21-sandbox-touchup-text-enter.png`, `57-sandbox-repro-impact-collapse-rail-touchup.txt`
  and `58-sandbox-concept-a-touchup-brush-attempt.png` (canvas works through the collapsed rail),
  `60-sandbox-concept-a-adjust-saturation-minus80.png` (image unchanged, Save as new version on),
  `22-sandbox-adjust-sliders-moved.png`, `29-sandbox-filters-bw-clicked.png`, `05-sandbox-impact.txt`
- **Suggestion:** Make the panel's Touch-up tab behave like the rail icon: open the leading image with the drawing
  canvas, so that Apply to mask starts ideation from the marked-up site as the pill promises. Show the Adjust preview
  on the leading image, as it already does on generated images. If editing the leading image isn't meant to be
  supported, follow Impact: disable the tools and say "Touch-up becomes available after the first generation". Either
  way, say "site image" instead of "photo" in the pills.
- **Effort:** M

### RE-3 · Tiles, Focus view and Compare don't say which image it is or how it was made (Medium)

- **Where:** The image grid (Latest and Timeline), the Focus view panel header, the Compare dialog.
- **What happens:** Each tile carries only a badge such as "I2", with no tooltip, label or legend; its meaning, the
  iteration, only shows in Compare's "Iteration 2" captions. After the refine chapter, Concept A's row held seven
  nearly identical lakeside plans badged I6, I6, I5, I4, I4, I3, I3, then "View all 11 images". Nothing said which was
  the Touch-up, the Golden filter or the light-rail prompt. Focus view's header says only "Concept A", not which
  iteration or image is open. Compare captions give only the iteration: "Iteration 2" under both images in plate 5-07,
  and a Concept A against Concept B comparison read "Iteration 2" and "Iteration 1", with no concept names.
- **Why it matters:** Teams choose options by what changed. If they can't tell I3 from I4, or Concept A from B side by
  side, they may present the wrong image or send it to production. The guide has to tell readers to "keep a note of
  which image is which".
- **Evidence:** `explore/images/03-cp-hover-badge-i2.txt` and `03-cp-hover-log.txt` (no tooltip on the badge),
  `explore/images/12-cp-compare-open.txt`, `explore/images/19-cp-compare-pairs.png`, `explore/raw/5-13-timeline.png`,
  `tutorial/studio/img/5-01-focus-view.webp`, `5-07-compare-side-by-side.webp`, `explore/raw/6-04-raw.txt` (the Report
  builder already logs what produced each iteration)
- **Suggestion:** Give every tile a one-line caption from the data the Report builder already logs: "I3 · Touch-up:
  Turn these blocks into…", "I5 · Filter: Golden", "I1 · Quick actions: Day, People, Medium-high". Give the badge the
  tooltip "Iteration 3: the third run in this concept". In Focus view, show "Concept A · I3 · image 1 of 2" under the
  header. In Compare, caption each image "Concept A · I2 · image 1". CC-5 covers the vocabulary itself.
- **Effort:** M

### RE-4 · The edit tabs ignore ticked images, and their hint doesn't say what to do (Medium)

- **Where:** The image grid with Select on; the Touch-up, Adjust, Prompt and Impact tabs.
- **What happens:** With one or two images ticked in Select mode, the four edit tabs keep showing "Choose the image
  you want to draw on first." (or "…adjust / change / analyse first."). They only work on an image opened into Focus
  view by clicking its tile. Quick actions does accept the selection: its button becomes "Apply to 2 selected". In the
  grid the edit tools are drawn faded but are not disabled: you can click them and type an instruction or a prompt
  while the hint says to choose an image first.
- **Why it matters:** "Choose" and "select" read as the same thing, and Select is the obvious way to choose. Users
  tick an image, see the same hint, and get stuck. The guide needs a note just to explain this.
- **Evidence:** `explore/edit-tabs/106-existing-select-one-touchup.png` (1 selected, hint unchanged),
  `110-existing-select-two-impact.png`, `112-existing-select-two-quick-actions.png` ("Apply to 2 selected"),
  `75-existing-grid-control-states.json` (Brush not disabled under the hint), `70-existing-grid-touch-up.png`,
  `tutorial/studio/chapters/05-refine.js` (note "Open one image for the edit tabs")
- **Suggestion:** When exactly one image is ticked, let the edit tabs work on it, or open it in Focus view. When none
  or several are ticked, say "Touch-up works on one image at a time: click a tile to open it", and keep the tiles
  clickable under the hint. Disable the faded controls properly, so nothing a user types is lost.
- **Effort:** M

### RE-5 · Moving between images is hidden: invisible arrows, no arrow keys, and Escape doesn't go back (Medium)

- **Where:** Focus view: the stage edges, the "All images" grid icon at the top left of the panel, the keyboard.
- **What happens:** The Previous image and Next image buttons at the stage edges are fully transparent, even with the
  pointer on them; they only appear after one of them has been clicked. The arrow keys do nothing. Escape closes the
  fullscreen viewer and the Compare dialog, but leaves Focus view open and Select mode on. The only way back to the
  grid is the unlabelled "All images" icon. Next image also steps into older iterations (I1) that the grid's Latest
  view hides.
- **Why it matters:** Reviewing options is mostly flicking between images. Users who can't find the arrows open and
  close each image from the grid, and their keyboard habits don't work here.
- **Evidence:** `explore/images/52-cp-focus-hover-next-arrow.png` and `.txt` (opacity 0 under the pointer),
  `95-cp-focus-hover-edge-slow.txt`, `50-cp-focus-escape.png`, `94-cp-focus-arrowright-key.txt` (address unchanged
  after ArrowRight), `30-cp-fs-after-escape.png` and `14-cp-compare-after-escape.png` (Escape works there),
  `49b-cp-focus-next-image-2.txt`, `explore/edit-tabs/113-existing-select-after-escape.txt`
- **Suggestion:** Show the edge arrows at all times (for example at 60% opacity, full on hover), with a counter such
  as "3 / 11" by the panel header. Map the left and right arrow keys to Previous and Next. Make Escape go back to All
  images and leave Select mode. Replace the grid icon with a labelled "← All images". Later, make Next follow what the
  grid is showing.
- **Effort:** S

### RE-6 · One Apply to mask click produced two iterations (four images) (Medium)

- **Where:** Touch-up > Apply to mask; the results in grid > Timeline and in Report builder > Ideation log.
- **What happens:** Our flow clicked Apply to mask once; the script has no retry and only reads the page text while it
  waits. Afterwards the Report builder's log listed a Touch-up entry for iteration v3 at 20:29 and two for v4 at
  20:31. The lineage shows four touch-up nodes (#05 to #08), and the grid shows I4, I4, I3, I3. We saw this once.
- **Why it matters:** It doubles the cost and the number of near-identical images to sort through, and contradicts the
  "2 variant(s)" caption (CC-2).
- **Evidence:** `explore/raw/6-04-raw.txt` (Touch-up v3 at 20:29, v4 twice at 20:31; lineage #05 to #08),
  `explore/raw/5-13-timeline.png` and `.txt`, `tools/flows/05-refine.js` (one click on Apply to mask)
- **Suggestion:** Disable Apply to mask from the first click until the run ends, and show the running state at once.
  Reject a second identical Touch-up (same image, mask and instruction) while one is running. Check the logs for other
  duplicate Touch-up runs.
- **Effort:** M

### RE-7 · Parent says "No parent image available" on first open, and toolbar buttons come and go (Medium)

- **Where:** The Focus view toolbar and the fullscreen viewer.
- **What happens:** When Concept A's I2 images were opened, Parent was disabled with "No parent image available", in
  both Focus view and the fullscreen viewer. After toggling any other control (Show site boundary, Original), it
  became an enabled "Parent" and showed the parent image. The Prompt button appears on some images only, and the saved
  Adjust version had neither Prompt nor Regenerate. So the toolbar changes length between images and buttons move
  under the pointer.
- **Why it matters:** Parent is how a planner checks what an iteration changed, and a button that claims there is no
  parent hides that lineage. A toolbar whose buttons move breaks muscle memory.
- **Evidence:** `explore/images/39-cp-focus-open.txt` (disabled) and `43-cp-focus-site-boundary.txt` (enabled),
  `explore/images/21-cp-fullscreen-open.png`, `63-cp-fs-parent-enabled-after-original.txt`,
  `63b-cp-fs-parent-clicked.png`, `explore/edit-tabs/77-existing-image-chosen-touchup.txt` and
  `84-existing-image-chosen-control-states.json`, `explore/images/53-cp-focus-i1-direct.txt` (Prompt present) and
  `59-cp-single-focus-conceptB.txt` (absent), `tutorial/studio/img/5-09b-adjust-saved.webp`
- **Suggestion:** Load the image's lineage before drawing the toolbar, so Parent is right the first time. Keep every
  button in a fixed place. When an image has no prompt or can't be regenerated, show the button disabled with the
  reason ("Adjusted version: made with Filter: Golden, no prompt").
- **Effort:** S

### RE-8 · The prompt strip shows only part of what was sent, so Copy prompt can't reproduce an image (Medium)

- **Where:** Focus view > Prompt (speech bubble) > the prompt strip with Copy prompt and Reuse.
- **What happens:** The strip is a single cut-off line ("- under bright, clear daytime light with a blue sky - …").
  Its full text covers light, people, density, creativity and render style. It does not include the required elements
  Public park and Transit stop, which were chosen for that first run, and it does not include the master prompt. Reuse
  has no tooltip, and nothing says what it does.
- **Why it matters:** Teams use the prompt to record an option they like, repeat it and explain it in the report. A
  partial prompt is a false record, and nobody can tell whether the required elements were sent at all (ID-2).
- **Evidence:** `tutorial/studio/img/5-04-prompt-used.webp`, `explore/raw/5-04-raw.txt`, `docs/capture-notes.md`
  (chapter 4: the first run's choices), `explore/images/57-cp-focus-prompt-strip-hover-reuse.txt`
- **Suggestion:** Let the strip expand into a panel with labelled parts: "Your choices", "Project prompt" and
  "Constraints". Make Copy prompt copy everything that was sent. Give Reuse a tooltip that says what it does ("Load
  these choices into Quick actions"). If required elements are sent separately, list them anyway.
- **Effort:** M

### RE-9 · Touch-up keeps the previous tool or colour for 1–2 s after a switch, and colours have no stated meaning (Medium)

- **Where:** The Touch-up tool card: Brush, Eraser, Text, Arrow, Polygon, Thin and Thick stroke, the colour swatches
  and the custom hex field.
- **What happens:** Drawing straight after picking a tool or colour used the previous one. We got a thin red line
  instead of a thick yellow one, a red line instead of a green arrow, and a black polygon instead of a blue one. A
  Text click added a polygon corner, and a quick eraser drag removed only part of a stroke. With a 1–2 s wait after
  each switch, every tool came out right. Separately, Studio Settings has "Touch-up color prompts": "Map touch-up
  drawing colors to prompts (e.g. red = remove, green = add greenery)… each color's prompt is appended to the
  instruction sent to the model." None were set, and the tab shows seven swatches and a hex field with no legend and
  no hint that colour can matter.
- **Why it matters:** A mask drawn with the wrong tool sends the wrong area for regeneration. In a Studio that has
  colour prompts set, a stroke in the lagging colour silently adds the wrong instruction.
- **Evidence:** `explore/edit-tabs/88-sandbox-single-touchup-all-tools.png` (fast switching),
  `95-sandbox-single-touchup-slow-thick-yellow.png`, `96-sandbox-single-touchup-slow-arrow.png`,
  `98-sandbox-single-touchup-slow-polygon-closed.png` (correct after waiting),
  `102-sandbox-single-touchup-slow-eraser.png`, `explore/media-org/103-settings-info-tooltips.txt` and
  `101-settings-scroll-03.png` (colour prompts), `tutorial/studio/img/5-08-touch-up.webp`
- **Suggestion:** Apply tool and colour changes on the canvas at once, and sync them to the server in the background.
  When the Studio has colour prompts, show the legend under the swatches ("Red = remove"). When it has none, offer one
  mask colour with the note "Describe the change in Instruction: colours carry no meaning in this Studio".
- **Effort:** M

### RE-10 · The Focus toolbar is 15 unlabelled icons over the image, with look-alikes and an AI action mixed in (Low)

- **Where:** The floating Focus view toolbar; the Top & eye-level labels; tile and grid toolbar buttons.
- **What happens:** The toolbar holds Prompt, Zoom out, 100%, Zoom in, Mark region, Show site boundary, Eye-level, Top
  & eye-level, Parent, Original, Compare, Mark as favorite, Download, Fullscreen and Regenerate, all as icons whose
  tooltips only repeat the names. Show site boundary and Eye-level sit side by side and both use an eye. "Prompt"
  names both this button (show the prompt used) and a panel tab (write a new prompt), with the same speech-bubble
  icon. "Mark region" sits beside Touch-up's "Mask a region" with nothing to tell them apart. Regenerate, an AI run,
  sits at the far right with no label or output line. The bar floats over the bottom of the image and covers part of
  the plan's legend. In Top & eye-level, the TOP VIEW and EYE-LEVEL tags sit at the bottom beside the toolbar, far
  from their images. The tile buttons (heart, fullscreen, rename pencil) show no tooltip at all.
- **Why it matters:** A row of similar unlabelled icons is hard to learn. Users click the wrong eye, confuse seeing a
  prompt with writing one, and may start a paid run with Regenerate while looking for a view control.
- **Evidence:** `tutorial/studio/img/5-01-focus-view.webp`, `5-02-top-eye-level.webp`, `5-10-prompt.webp`,
  `explore/images/41-cp-focus-toolbar-tooltips.txt`, `explore/images/03-cp-hover-log.txt`,
  `explore/edit-tabs/124-icon-names-and-testids.txt`
- **Suggestion:** Dock the bar below the image. Group the controls with text labels: "Top | Eye-level | Side by side",
  "Boundary" (with a polygon icon, not an eye), "Original | Parent | Compare", then heart, download and fullscreen.
  Rename the toolbar button "Prompt used". Move Regenerate to the panel as a labelled button with its output line. Put
  the TOP VIEW and EYE-LEVEL tags on the images' top-left corners. Add tooltips to the tile buttons.
- **Effort:** M

### RE-11 · Compare drops eye-level views from pairs, and Focus view compares only against the Original (Low)

- **Where:** Grid > Select > Compare; Focus view > Compare slider.
- **What happens:** Compare started from Pair view showed only the top views of the selected pairs, without saying so.
  The title reads "Compare" for two images but "Compare 4 images" for four. The dialog has no actions (favourite, send
  to production) and no linked zoom. In Focus view, Compare slides the variant against "‹ ORIGINAL", the site image,
  only. There is no way to slide against the Parent, which is what would show what a Touch-up changed.
- **Why it matters:** Shortlisting means comparing the views the client will see and acting on the winner. Checking an
  edit means seeing it against the image it came from.
- **Evidence:** `explore/images/18-cp-select-two-pairs.png` and `19-cp-compare-pairs.png`,
  `explore/images/12-cp-compare-open.png`, `13-cp-compare-four.png`, `tutorial/studio/img/5-03-compare.webp`,
  `5-07-compare-side-by-side.webp`
- **Suggestion:** When pairs are selected, add a "Top views | Eye-level views" switch. Title the dialog "Compare 2
  images". Put a heart and "Send to production" under each image. In Focus view, add "Compare with: Original |
  Parent", with Parent as the default from I2 on.
- **Effort:** M

### RE-12 · Grid filters, counts and headings disagree with what is shown (Low)

- **Where:** The image grid toolbar (Favorites, Latest/Timeline, Pair/Single), the concept chips and headings.
- **What happens:** In Latest view, Favorites looks only at each concept's newest iteration. Our favourites
  disappeared behind "No favorites in the latest iterations…", while the headings above still said "Concept A 4
  images" and "Concept B 2 images". In Timeline, the same filter said "0 images" and "No favorites yet" under each
  heading. Chips show a bare number ("Concept A 4") that counts all images, even when Latest shows two. With one chip
  on, the concept headings disappear, with their image count and rename pencil. Clicking a chip also makes one heading
  bold, with no explanation. The Latest/Timeline and Pair/Single choice is stored per user and applies to every
  project.
- **Why it matters:** Favourites seem to vanish, and the counts contradict the tiles. The guide needs a "Can't find a
  favourite?" tip.
- **Evidence:** `explore/images/35-cp-favorites-filter.png`, `36-cp-favorites-filter-timeline.txt`,
  `32-cp-chip-a-clicked.txt`, `33-cp-chip-b-clicked.txt` (bold heading), `61-mp-01-default.txt` (another project
  opened in Latest), `tutorial/studio/img/5-05-favorites.webp`
- **Suggestion:** Make Favorites show favourites from every iteration whatever the view, with headings such as
  "Concept A · 2 favourites". Label chips "Concept A · 4 images" and count what is shown. Keep the heading when one
  chip is on. Mark the current concept with a "Current" tag instead of bold, and remember the view per project.
- **Effort:** M

### RE-13 · Adjust drops unsaved changes without warning, and every arrow-key nudge is its own undo step (Low)

- **Where:** The Adjust tab (Adjust and Filters).
- **What happens:** We left Brightness +20 and Saturation −29 unsaved and opened a new tab: every slider was back at 0
  and Save as new version was off. Nothing warns before the changes are lost. Each arrow-key step on a slider is its
  own undo step (Undo moved −30 to −29). Filter names are cut off ("Warm Contr…", "B&W High C…") and have no tooltip.
- **Why it matters:** Fine-tuning a render for a presentation is lost without notice, and undo becomes tedious. The
  guide has to warn "Save before you move on".
- **Evidence:** `explore/edit-tabs/25-sandbox-adjust-reopened-new-tab.txt`, `24-sandbox-adjust-after-undo.txt`,
  `26-sandbox-adjust-filters.png`, `28-sandbox-filters-hover-warm.txt`, `tutorial/studio/img/5-09-adjust.webp`
- **Suggestion:** When someone leaves the image or the tab with unsaved adjustments, ask "Discard adjustments?" with
  "Save as new version" as the main button. Merge slider changes made within about half a second into one undo step.
  Show full filter names on two lines or in a tooltip.
- **Effort:** S

### RE-14 · Touch-up tools have no tooltips, and Apply to mask runs with an empty instruction (Low)

- **Where:** The Touch-up tool card and Instruction field; Adjust's Undo, Redo and Reset.
- **What happens:** The Touch-up tool icons (Brush, Eraser, Text, Arrow, Polygon, Thin and Thick stroke, the swatches)
  show no tooltip, and nor do Adjust's Undo, Redo and Reset; other panel icons do. Apply to mask turns on as soon as
  something is drawn, even with an empty Instruction, and nothing says what Studio does without one. Nothing explains
  whether Text and Arrow marks are read by the model or are only notes.
- **Why it matters:** Without names, users guess which tool makes a closed mask. A run with no instruction spends a
  generation on an unknown result.
- **Evidence:** `explore/edit-tabs/10-sandbox-tooltips.json`, `86-sandbox-single-touchup-brush-hover-apply.png` (Apply
  on, Instruction empty), `58-sandbox-concept-a-touchup-brush-attempt.png`, `tutorial/studio/img/5-08-touch-up.webp`
- **Suggestion:** Add tooltips with a one-line use ("Polygon: click the corners, then the first point to close";
  "Text: write a label on the image"), and say whether the model reads it. Keep Apply to mask off until the
  Instruction has text, with the hint "Describe the change in the marked area".
- **Effort:** S

### RE-15 · Impact's answer pushes "Include in report" and the disclaimer out of view (Low)

- **Where:** The Impact tab: question field, chips, answer, Include in report.
- **What happens:** After Analyse, the answer fills the panel, and "Include in report" and the disclaimer "Indicative
  AI assessment — not a professional or regulatory evaluation." move below it, out of view. The one-line question box
  cuts off both the typed question ("How would this design affect walkability f…") and the placeholder ("e.g. How
  would this affect afternoon traff"). The Traffic, Heat & shade and Walkability chips replace whatever was typed.
- **Why it matters:** The answer is meant for the report, but the button that sends it there is hidden, and the
  disclaimer that frames it as indicative is only seen by those who scroll.
- **Evidence:** `tutorial/studio/img/5-11-impact.webp`, `5-12-impact-answer.webp`, `explore/raw/5-12-raw.txt`,
  `explore/edit-tabs/05-sandbox-impact.png`, `38-sandbox-impact-chip-values.txt`
- **Suggestion:** Pin "Include in report" and the disclaimer under the question, above the answer. Use a three-line
  text area. Make the chips add to the question, or ask before replacing it. Mark tiles that have a saved answer.
- **Effort:** S

### RE-16 · RECENT PROMPTS mixes Studio's composed prompts with the user's own and hides the full text (Low)

- **Where:** The Prompt tab: placeholder, Save as quick action, RECENT PROMPTS.
- **What happens:** RECENT PROMPTS lists the long prompts Studio composed for Quick actions ("- under bright, clear
  daytime light…", "- at golden-hour dusk…") next to the user's own prompt and a Touch-up instruction. Each entry is
  cut to two lines, the full text is only in a native browser tooltip, and nothing says whether clicking fills the box
  or starts a run. The placeholder "Describe a change or a new concept…" suggests the tab can create a concept, yet
  our prompt became iteration I6 of Concept A. "Save as quick action" uses the same bookmark-plus icon as "Save as
  planning preset" at the top of the panel.
- **Why it matters:** The list is hard to scan and reuse, and two different save actions look identical.
- **Evidence:** `tutorial/studio/img/5-10-prompt.webp`, `explore/raw/5-10-after.txt`,
  `explore/edit-tabs/72-existing-grid-prompt.png`, `119-existing-prompt-recent-and-misc.json`,
  `124-icon-names-and-testids.txt` (both bookmark-plus)
- **Suggestion:** Tag each entry by source ("Your prompt", "Touch-up", "Quick actions"), and show Quick actions
  entries as their choices ("Day · People · Medium-high"). Expand an entry on click and offer an explicit "Use"
  button. Change the placeholder to "Describe a change to this image…". Give Save as quick action its own icon.
- **Effort:** S

### RE-17 · The fullscreen viewer is a cut-down Focus view with no navigation (Low)

- **Where:** Tile > Fullscreen (expand-arrows button).
- **What happens:** The tile's Fullscreen button opens a dark framed window with Eye-level, Original, Parent (disabled
  at first) and a close ×. It has no previous/next, favourite or download, and the arrow keys do nothing. It is a
  modal window, not the browser's full screen.
- **Why it matters:** Two viewers with different tools make users learn both, and the one meant for presenting can't
  step through options.
- **Evidence:** `explore/images/21-cp-fullscreen-open.png`, `21-cp-fullscreen-dom.json`, `29b-cp-fs-arrowright.png`
- **Suggestion:** Give it Focus view's arrow keys, heart and download and use the browser's real full screen, or
  remove the tile button and keep one Fullscreen in Focus view.
- **Effort:** S

### RE-18 · The collapsed panel rail drops three tabs, and its icons have no tooltips (Low)

- **Where:** The Actions panel header: Collapse panel, Expand panel and the icon rail; Move panel to the left/right
  side.
- **What happens:** Collapse panel shrinks the panel to a rail with only Expand panel, Quick actions, Touch-up, Adjust
  and Prompt, so Site, Presets and Impact can't be reached without expanding. Collapse panel, Expand panel and the
  rail icons show no tooltip. Before the first run, the rail's Touch-up icon behaves differently from the panel's
  Touch-up tab (RE-2). With the panel on the right, the "Move panel to the left side" tooltip runs into the account
  avatar.
- **Why it matters:** Users who collapse the panel to see the image larger lose tabs, and can't identify the rail
  icons.
- **Evidence:** `explore/edit-tabs/44-sandbox-panel-collapsed.png`, `120-existing-image-panel-collapsed.txt`,
  `09-sandbox-hover-collapse-panel.png`, `46-sandbox-panel-collapsed-hover-expand.txt`,
  `42-sandbox-panel-right-hover-toggle.png`
- **Suggestion:** Put all seven tab icons on the rail with the same tooltips as the panel tabs. Add the tooltips
  "Collapse panel" and "Expand panel". Make a tab behave the same from the rail and from the panel.
- **Effort:** S

### RE-19 · In Top & eye-level, the boundary toggle stays on but no boundary is drawn (Low)

- **Where:** Focus view toolbar: Show/Hide site boundary together with Top & eye-level.
- **What happens:** With the boundary toggle on (green, labelled "Hide site boundary"), switching to Top & eye-level
  shows both views with no boundary on the top view, while the toggle stays on.
- **Why it matters:** The toggle no longer matches the screen, so users can't trust it when checking whether a design
  stays inside the site.
- **Evidence:** `explore/images/45-cp-focus-top-and-eyelevel.png` and `.txt`,
  `explore/images/43-cp-focus-site-boundary.png` (boundary drawn in the single view)
- **Suggestion:** Draw the boundary on the top-view half, or grey the toggle out in side-by-side view with the tooltip
  "Boundary shows in single view".
- **Effort:** S

## Production & report

Chapter 6 of our guide, on Production and the report, has only 5 steps but needs 5 notes and four caveats inside the
steps: "Studio gives no warning", "the page shows no cost before you click", "We found no control … to approve or lock
a concept" and "Check these figures before you rely on them". Video and upscale issues are in this section too.

### PR-1 · Production renders whichever iteration is newest, and built renders disappear when a newer one arrives (High)

- **Where:** Production > Render set (each concept's leading "Latest" tile, the render tiles, Build, Regenerate from
  master); compare Report builder > audit ⑤ Production decisions and the Renders tab of the Video and Upscale picker.
- **What happens:** Each concept's newest iteration goes to Production by itself. In the sandbox, the team favourited
  the fountain aerial (Concept A, I2) and the Green streets plan; the audit's lineage marks both "★ shortlisted". The
  team then tried more ideas: a Touch-up (I3, I4), a Golden adjustment (I5) and a light-rail prompt (I6). Production's
  leading tile reads "Concept A · I6", the last experiment rather than a favourite, and every Build renders from it.
  In an older project, "Conceptual Plan 2026-09-28 2", the render set reads "2 concepts · 0 of 24 renders complete"
  and every tile shows a Build button. Yet 7 built renders of Concept A exist: the picker's Renders tab shows aerials
  and eye-level views at day, dusk and night, and the audit lists them as Production decisions at 09:17–09:19 on 28
  Sep, including "View selected · Eye-level · chosen as final". The audit logs a Touch-up that made iteration v2 at
  09:27, after the renders, and the Latest tile now reads "Concept A · I2". No banner, badge or link says that renders
  exist, and Production offers no way to see or restore them.
- **Why it matters:** Renders are paid AI outputs, and the "chosen as final" view is the deliverable. Iterating after
  a first round of renders is normal planning practice. When a team does, Production looks empty, the team may pay to
  rebuild, and the next Build silently renders an experiment instead of the chosen design. The report's Render set
  then stops matching its own decision log. The guide has to tell readers to "settle the design before you build".
- **Evidence:** `tutorial/studio/img/6-01-render-set.webp` ("Concept A · I6"), `docs/capture-notes.md` (chapter 5: the
  favourites), `explore/raw/6-05-raw.txt` ("★ shortlisted"), `explore/production/01-cp-production-top.png` and `.txt`
  ("0 of 24 renders complete", Latest "Concept A · I2"), `explore/production/31-cp-video-after-picker-renders.png` (7
  built renders), `explore/production/24-cp-report-more-production-decisions.png` ("Eye-level · chosen as final"),
  `explore/production/20-cp-report-builder-open.txt` (renders 09:17–09:19, Touch-up 09:27, "Final views 1"),
  `tutorial/studio/chapters/06-production.js`
- **Suggestion:** Let the team choose each concept's render source (see PR-3), and keep renders tied to the iteration
  they were built from. When a newer iteration appears, leave the built tiles in place with an amber corner badge
  "From I1", and show a strip above the row: "Concept A has a newer iteration (I2). 7 renders were built from I1.
  [Keep I1 as render source] [Use I2 and rebuild]". Add "Show earlier renders (7)" under each row. A render marked
  final must never drop out of the set.
- **Effort:** M to keep renders visible with their source; L with a chosen render source (bigger change D).

### PR-2 · The report's figures and event labels contradict each other (High)

- **Where:** Report builder > Report preview > PROCESS SUMMARY; Compliance & process audit > ② Inputs & sources, ③
  Ideation log, ⑤ Production decisions, ⑥ System & reproducibility.
- **What happens:** In the sandbox, the summary says "25 Total generations" and "12 / 13 Ideation / production", while
  System & reproducibility says "25 (12 ideation, 2 production)". Only 2 renders were built, and 12 plus 2 is not
  25. The other projects show the same kind of mismatch: the older Conceptual Plan "6 / 13" against "19 (6 ideation, 7
  production)", and a Master Plan "4 / 4" against "8 (4 ideation, 0 production)". The first build of each tile is
  logged as "Production adjust · Aerial · Day regenerated", although nothing was rebuilt. "Site inputs" reads "1
  initial massing" both for the sandbox, whose input is a land-use plan, and for a Focus Area project, whose input is
  a street photo. The Ideation log shows only the first concept: in the sandbox, "Ideation log — Concept A (excerpt of
  11 entries) … 12 ideation entries in total", with the Green streets entry nowhere; in the older Conceptual Plan,
  Concept B's entries are missing in the same way.
- **Why it matters:** The audit describes itself as a structured trace of how the deliverable was produced and carries
  a "tamper-evident audit signature". Teams hand it to clients and authorities. Figures that disagree and events that
  are mislabelled undermine the one part of the report meant to prove how the work was done. The guide has to tell
  readers to "check these figures before you rely on them".
- **Evidence:** `explore/raw/6-05-raw.txt` (sandbox figures, "regenerated", "1 initial massing", Concept A only),
  `tutorial/studio/img/6-05-report-preview.webp`, `explore/production/20-cp-report-builder-open.txt`,
  `explore/production/62-mp-report-builder.txt`, `explore/production/62-fa-report-builder.txt` (street photo: "1
  initial massing"), `tutorial/studio/chapters/06-production.js`
- **Suggestion:** Compute both totals from the same records, and show a split that adds up ("Total images 25 =
  Ideation 12 + Production renders 2 + Edits 11"). Label a first build "Render built · Aerial · Day" and keep
  "regenerated" for real re-runs. Derive Site inputs from the input type ("1 land-use plan", "1 street photo"). Show
  the Ideation log per concept, each with a "Show all" expander. Before Build PDF, check consistency and warn when
  totals disagree.
- **Effort:** M

### PR-3 · "Approved concepts", "locked" and "master" appear everywhere, but nothing lets a team approve or lock a concept (High)

- **Where:** Report builder > SECTIONS (Approved concepts, on by default) and PROCESS SUMMARY (Concepts locked, Final
  views); audit ④ Lineage diagrams; Production ("Regenerate from master" under the Latest tile); Video ("After
  (master)").
- **What happens:** We found no control in Production, the Ideation tools or the Report builder that approves or locks
  a concept, and every project counts "0 Concepts locked". Even so, "Approved concepts", with its sub-option "↳
  Options considered · favorite runner-ups", is switched on by default in every report. The Lineage diagrams are
  introduced as "Per locked master … the master node is highlighted", but no node is ever highlighted. After the first
  build, "Regenerate from master" appears under the Latest tile, and nothing says what the master is or what it
  rebuilds. The video's second slot is "After (master)". The older Conceptual Plan's "Final views 1" shows that a
  "chosen as final" action exists somewhere, but we could not find where.
- **Why it matters:** A client will read "Approved concepts" as the options the team signed off. Here the section is
  filled without anyone approving anything. Teams can't tell which image is the "master" that rendering, regeneration
  and video rely on.
- **Evidence:** `tutorial/studio/img/6-04-report-builder.webp` (Approved concepts on by default; "0 Concepts locked",
  "0 Final views"), `explore/raw/6-05-raw.txt` (Lineage "Per locked master"),
  `explore/production/23-cp-report-scroll-2.png` (no node highlighted), `tutorial/studio/img/6-03-built.webp`
  ("Regenerate from master"), `explore/production/70-sandbox-video-open.png` ("After (master)"),
  `explore/production/120-production-testids-and-keyword-scan.txt` (no approve or lock control),
  `tutorial/studio/chapters/06-production.js`
- **Suggestion:** Add an explicit approval: "Approve as master" next to Mark as favorite in Focus view, and on the
  Production Latest tile. Once a concept is approved, show "Master · I2 · approved 2 Oct by <name>". Rename
  "Regenerate from master" to "Rebuild 12 renders from master (I2)" and give it a tooltip. While nothing is approved,
  the Report builder row should read "Approved concepts · none approved yet [Approve in Production]" and default to
  off. Rename the video slot "After (proposal)", and highlight the master node in the lineage.
- **Effort:** L

### PR-4 · The Report builder's "Report preview" never shows the report (Medium)

- **Where:** Project > Report builder > Report preview.
- **What happens:** The page says "Drag to reorder, toggle to omit. Preview updates live." In the sandbox we switched
  Impact analysis on and moved Render set up. Only CONTENTS changed: it renumbered and showed "6 sections included".
  The block called "Report preview" kept the same PROJECT BRIEF (output quality, output format, aspect ratio) and
  PROCESS SUMMARY tiles. No part of Cover, Executive summary, Site context, Approved concepts or Render set appears
  anywhere on the page. The only way to see them is Build PDF.
- **Why it matters:** The team can't check the text, images or empty sections of a client document before exporting
  it, for example an "Approved concepts" section when nothing was approved (PR-3). Every check costs a full PDF build.
- **Evidence:** `explore/production/110-sandbox-report.txt` and `112-sandbox-report-render-set-moved-up.txt` (only
  SECTIONS and CONTENTS differ), `112-sandbox-report-render-set-moved-up.png`,
  `tutorial/studio/img/6-04-report-builder.webp`
- **Suggestion:** Replace the block with page thumbnails of the PDF, grouped by section, refreshed on every toggle or
  reorder and enlarged on click. Add a status line to each SECTIONS row ("Render set · 2 of 24 renders", "Approved
  concepts · 0 items") and an amber dot on empty sections. Rename the current block "Project brief & summary".
- **Effort:** M

### PR-5 · A render in progress can look idle, which invites a second paid click (Medium)

- **Where:** Production > render tiles (Build → building).
- **What happens:** When we built Aerial · Day, the tile switched to "building" with a spinner, and Build all missing
  showed a spinner too. When we built Eye-level · Day, the tile still showed the green Build button 4 s after the
  click, with no spinner, and the counter stayed at "1 of 24". Production opened again about 40 s later showed the
  same. The render was logged at 20:51 and appeared later ("2 of 24") without a second click. While Aerial · Day was
  building, every other tile's Build stayed active. We observed only two builds, so this is likely rather than proven.
- **Why it matters:** A tile that looks idle invites a second paid click, and teammates who open the project can't see
  that a render is under way.
- **Evidence:** `explore/raw/6-03-building-AerialDay.png`, `explore/raw/6-03-building-EyelevelDay.png`,
  `explore/raw/7-error-sequence.png` (about 40 s later: still Build, "1 of 24"), `explore/raw/6-05-raw.txt` (logged
  20:51), `explore/raw/6-prod-check.txt` ("2 of 24")
- **Suggestion:** Switch the tile to "Queued…" the moment it is clicked, then "Building · about 1 min". Keep that
  state on the server so a reload or a teammate sees it, and disable the tile's Build while it is queued. Add "2 of 24
  complete · 1 building" next to the counter, and a toast with "View" when a render finishes.
- **Effort:** M

### PR-6 · Renders can't be opened or acted on from the render set (Medium)

- **Where:** Production > the Latest tile; built render tiles.
- **What happens:** The Latest tile ("Concept A · I6") has no click action and no hover menu, so the image the renders
  are built from can't be inspected from Production. Built tiles show only the image and its caption, with no visible
  View, Download, Regenerate or Mark as final. We have no hover capture of a built tile, so icon actions on hover
  can't be ruled out. The older project's audit shows these actions exist somewhere: "Production adjust" with the
  prompt "add a bike lane and a playground in the green area", and "chosen as final". To see a render full size we had
  to use "View full size" in the audit.
- **Why it matters:** Reviewing a render set means opening renders, comparing them with their source, re-running one
  with a note and marking finals. When these actions can't be found, users get stuck or fall back on Ideation.
- **Evidence:** `explore/production/03-cp-hover-latest-tile.png`, `tutorial/studio/img/6-03-built.webp`,
  `explore/raw/6-03-raw.txt` (built tiles expose no buttons),
  `explore/production/25-cp-report-production-show-prompt.txt`,
  `explore/production/26-cp-report-view-full-size-render.png`
- **Suggestion:** Make every tile clickable. A click opens a viewer that steps through the concept's set, with
  Download, "Regenerate with note…", "Mark as final", "Upscale", "Use in video" and "Open source (Concept A · I6)". On
  hover, show labelled icons for the same actions. Mark final renders with a green "Final" badge.
- **Effort:** M

### PR-7 · Moving between Production, Video, Upscale and Report is inconsistent (Medium)

- **Where:** The header switch (Ideation | Production); the project's Video and Image Upscale pages; the Studio menu's
  Videos and Upscale pages.
- **What happens:** Opening the Report builder adds a third, highlighted header tab, "Report". Video and Image
  Upscale, opened from Production, highlight neither Ideation nor Production and have no back control, so the only way
  back is to click Production. The Studio-level Videos and Upscale pages have a "Back to menu" arrow that always lands
  on Projects (NA-5). Video and Upscale exist twice, once per project and once in the Studio menu, with different
  pickers (NA-11) and no link between the two.
- **Why it matters:** Users lose track of where they are and how to get back to the render set. Our own flow notes had
  to spell out "return with the Production switch; there is no back button".
- **Evidence:** `explore/production/121-header-switch-states.txt`, `121-header-switch-video.png`,
  `explore/production/70-sandbox-video-open.png` (no back control), `explore/media-org/28-videos-back-to-menu.png`,
  `explore/media-org/10-videos-before-after-top.txt`
- **Suggestion:** First, keep Production highlighted on the Video and Upscale pages and add "← Render set" at the top
  of their panels (S). Then give Production sub-tabs, "Render set | Video | Upscale | Report", and drop the separate
  Report tab. On the Studio-level pages, list outputs by project with "Open in project" links.
- **Effort:** M (the first step is S).

### PR-8 · The client-facing audit prints internal identifiers instead of plain names (Medium)

- **Where:** Report builder > Compliance & process audit (also exported with Download PDF + JSON).
- **What happens:** In the new sandbox, before any generation, ① Project metadata showed "Section lead
  69c933ae029766b1f6606f8f" and "Team 69c933ae029766b1f6606f8f"; later the same project showed the name. Every report
  prints "Model Gemini3ProImage" and "… · model: Gemini3ProImage". Lineage nodes read "◇ initial (quickaction) · entry
  #01". Production entries read "Concept A concept · Eye-level · Day", and the summary says "1 final views". The
  Refresh button uses an eye icon.
- **Why it matters:** This section goes to clients and reviewers. Raw IDs and code names read like a system dump and
  make an otherwise careful audit look unfinished.
- **Evidence:** `explore/production/110-sandbox-report.txt` (raw ID), `tutorial/studio/img/6-05-report-preview.webp`
  (name shown later), `explore/production/24-cp-report-more-production-decisions.png`,
  `explore/production/23-cp-report-scroll-2.png`, `explore/production/20-cp-report-builder-open.txt`
- **Suggestion:** Always resolve user names, falling back to "Unknown user", never an ID. Map model IDs to display
  names ("Gemini 3 Pro Image"). Write lineage in words ("Quick action · Day, Medium-high → Touch-up 'Turn these
  blocks…'"). Change "Concept A concept" to "Concept A", fix "1 final views", and give Refresh a circular-arrow icon.
  Keep raw IDs for the JSON export.
- **Effort:** S

### PR-9 · Video slots "Before (leading)" and "After (master)" use internal terms, and the pre-fill comes and goes (Low)

- **Where:** Video > Images card (project Video page and the Studio-level Videos page).
- **What happens:** The slots are labelled "Before (leading)" and "After (master)", even on the Studio-level page,
  where there is no project, leading image or master. Opened from Production, Before is pre-filled with the project's
  leading image, in the sandbox the coloured land-use plan. Opened from its address, both slots read "Choose image".
  On later visits in our sessions both slots were empty again. The card says "Upload your architectural image, sketch,
  or 3D model render. Supported formats: JPG, PNG, WebP. Max file size: 25MB." but has no upload control; uploading is
  only possible inside the picker.
- **Why it matters:** The terms mean nothing to a new user, a pre-fill that only sometimes appears makes the tool feel
  unpredictable, and the upload sentence points to a control that isn't there.
- **Evidence:** `explore/production/70-sandbox-video-open.png`, `explore/production/72-sandbox-video-direct-url.txt`,
  `explore/raw/7-video-state.txt`, `explore/raw/7-video-peek.txt`, `explore/media-org/10-videos-before-after-top.png`
- **Suggestion:** Rename the slots "Before (existing site)" and "After (proposal)". Always pre-fill Before with the
  site image and After with the approved master or the concept's latest image, whichever route opened the page, with
  "Pre-filled from Concept A · I6 · Change". Replace the upload sentence with an "Upload image" link that opens the
  picker on Uploads.
- **Effort:** S

### PR-10 · Sequence video keeps the before/after wording (Low)

- **Where:** Video > Sequence video.
- **What happens:** The subtitle changes correctly to "Chain up to six images into one continuous video with a camera
  move between each pair." Everything else keeps the before/after wording. The empty state still says "Pick a before
  and after image in the panel and generate your first video.", and the engines still read "Best quality
  before-to-after transitions" and "Simple transition between the two images", although this mode chains 2 to 6
  images.
- **Why it matters:** The empty state asks for something this mode doesn't need.
- **Evidence:** `explore/production/73-sandbox-video-sequence-tab.png`, `explore/media-org/20-videos-sequence-top.png`
- **Suggestion:** Write copy for each mode. Empty state: "Add 2–6 images in the panel and generate your first
  sequence." Kling 3.0: "Best quality camera moves between images". Classic: "Simple cross-fade between images, free".
- **Effort:** S

### PR-11 · Camera presets, durations and the prompt placeholder are unexplained or written for buildings (Low)

- **Where:** Video > Camera Movement (Quick Presets, OR CUSTOMIZE), Duration, Sequence > Default motion and Segment
  length, Prompt (optional).
- **What happens:** The six Quick Presets (Walkthrough, Room Showcase, Drone View, Pull Back, Hero Shot, Detail Focus)
  have no tooltip saying which moves they apply; the moves only show after a click (Drone View = Pedestal Up + Tilt
  Down). "Room Showcase" is an interior term. "Orbit Left" reads "Circle counterclockwise" but "Orbit Right" reads
  "Circle around", and "counterclockwise" runs past the card edge. Duration is 5s or 10s with the Kling engines and
  3s, 5s, 8s or 10s with Classic, while Sequence offers 1s, 3s, 5s, 10s or Custom…, with no explanation. The prompt
  placeholder is "Describe your building: modern architecture, daylight, beige stone facade".
- **Why it matters:** Each point is small, but there are many on a long panel (6 presets and 19 movement cards before
  Prompt and Duration), and the wording doesn't speak to planning teams.
- **Evidence:** `explore/media-org/12-videos-scroll-0.png`,
  `explore/production/89-sandbox-video-camera-tooltips-and-presets.txt`,
  `explore/production/86-sandbox-video-engine-classic-scrolled.png`,
  `explore/media-org/24-videos-sequence-segment-length-open.png`
- **Suggestion:** Give each preset a tooltip naming its moves ("Drone View: rise up + tilt down"). Replace "Room
  Showcase" with "Site reveal", or hide it in planning projects. Change Orbit Right to "Circle clockwise" and let the
  descriptions wrap. Add a line under Duration: "Kling: 5 or 10 s · Classic: 3–10 s". Use a planning placeholder:
  "Describe the scene: tree-lined avenue at dusk, people walking, warm street lighting".
- **Effort:** S

### PR-12 · Upscale's Crystal engine "can invent detail", against the page's "without changing its content" (Low)

- **Where:** Image Upscale > Engine.
- **What happens:** The page subtitle says "Upscale an image to 6K or 8K without changing its content.", and the
  Source image tooltip says "Its content is preserved — only the resolution changes." The Crystal engine, however, is
  described as "Can invent detail (tunable)" with a "Tunable" badge, and selecting it shows no tuning control (checked
  before a source was picked). Topaz says "Faithful, up to 4×, optional face enhancement", while the only targets are
  6K and 8K and no face option appears.
- **Why it matters:** In a planning image, invented detail can add buildings or trees that are not in the design.
  Nothing warns against using Crystal for approval material, and the page promises the opposite.
- **Evidence:** `explore/production/92-sandbox-upscale-engine-crystal.png`, `explore/media-org/30-upscale-panel.png`,
  `explore/production/91-sandbox-upscale-tooltips-and-engines.txt`
- **Suggestion:** Add a warning under Crystal: "May add details that aren't in the design · not for approval
  drawings". Show its tuning slider as soon as it is selected, disabled until a source is picked. State the scale in
  real terms once a source is chosen ("2048 px → 6144 px · 3×"). Remove "face enhancement" or show its toggle.
- **Effort:** S

### PR-13 · A failed video gives no reason, and the error banner comes back on later visits (Low)

- **Where:** Video > results area.
- **What happens:** A Classic (no AI) run failed in our headless capture browser; the failure itself probably comes
  from that browser and is not reported here (Appendix A). Studio showed a red banner, "Couldn't generate the video.
  Please try again.", above "No videos yet", with no reason, no word on whether credits were used, and no record of
  the attempt. The banner was still there when Video was opened again later from Production with fresh slots, and it
  shows behind the picker on guide plate 7-01b.
- **Why it matters:** Users can't tell what to change, so they may retry a paid engine blind. A stale banner with no
  date suggests the last thing they did failed.
- **Evidence:** `explore/raw/7-03-raw.png`, `explore/raw/7-01-open.png` (banner on a later visit),
  `explore/raw/7-video-peek.txt`, `tutorial/studio/img/7-01b-pick-after.webp`
- **Suggestion:** Say what failed and what to try ("The Classic engine couldn't render in this browser · try Kling 2.6
  · no credits used"). Show each failed attempt in the results as a card with the time, engine and images, plus Retry
  and Dismiss. Once dismissed, the banner should not come back.
- **Effort:** S

### PR-14 · Impact answers marked "Include in report" stay out of the report by default (Low)

- **Where:** Ideation > Impact > Include in report; Report builder > Impact analysis; Studio Settings > Production >
  Report sections.
- **What happens:** The Impact tab offers "Include in report" on each answer. In the Report builder, the Impact
  analysis section is off by default, so an included answer stays out of the report until someone also switches the
  section on. Studio Settings' Report sections lists Cover, Executive summary, Site context, Approved concepts, Render
  set and Process audit, but not Impact analysis, so the default can't be changed there.
- **Why it matters:** An analysis a user deliberately included can be missing from the client report.
- **Evidence:** `explore/raw/5-12-raw.txt` ("Include in report"), `explore/raw/6-04-raw.txt` (Impact analysis
  omitted), `explore/scout/18-menu-settings.txt` (Report sections)
- **Suggestion:** Switch the section on automatically once any answer is marked "Include in report", and show the
  count ("Impact analysis · 1 included"). Add Impact analysis to Studio Settings > Report sections.
- **Effort:** S

### PR-15 · An empty Production page hides Upscale, the Report builder and Render settings (Low)

- **Where:** Production in a project with no generated images yet.
- **What happens:** Under "Nothing to render yet" the page shows "Go to Ideation" and a lone "Video" button. Image
  Upscale, Report builder and Settings are hidden with no explanation, although `/upscale` and `/report` open by
  address. Render settings (views, scene states, medium) can't be set up before the first concept exists.
- **Why it matters:** New users can't see what Production will offer, and teams can't decide the render set at the
  start of a project, when deciding it is cheapest.
- **Evidence:** `explore/production/50-sandbox-production.png`,
  `explore/production/90-sandbox-upscale-direct-url.png`, `explore/production/110-sandbox-report.png`
- **Suggestion:** Show the full toolbar greyed out with the tooltip "Available once a concept reaches Production", and
  allow Render settings from the empty state: "Choose your views and scene states now; tiles appear when concepts
  arrive."
- **Effort:** S

### PR-16 · Accessibility: 24 identical "Build" buttons, hidden reorder buttons, unnamed handles and info icons (Low)

- **Where:** The Production render set; the Report builder's SECTIONS; the ⓘ buttons in Video and Upscale.
- **What happens:** The render set exposes 24 buttons all named "Build", with no tile context. The SECTIONS rows
  contain "Move up" and "Move down" buttons that are not visible, so the only visible way to reorder is dragging an
  unnamed handle. The ⓘ buttons have no name. The on/off state of the view, scene and format chips in Render settings
  is shown only by a tick or + icon.
- **Why it matters:** Keyboard and screen-reader users can't tell which render a Build button starts, or reorder the
  report.
- **Evidence:** `explore/production/10-cp-render-settings-open.txt` (24 × "Build"),
  `explore/production/20-cp-report-builder-open.txt` (Move up and Move down; unnamed handles),
  `tutorial/studio/img/6-04-report-builder.webp`, `explore/production/40-cp-upscale-open.txt` (unnamed ⓘ)
- **Suggestion:** Name each Build button after its tile ("Build Concept A · Aerial · Day"). Show ↑ ↓ on row hover and
  keyboard focus, and name the handle ("Drag to reorder Cover"). Name the ⓘ buttons ("About Engine"), and expose chip
  state with `aria-pressed`.
- **Effort:** S

## Navigation & organisation

### NA-1 · Adding a site image silently switches the scope, and the detected scale varies more than fourfold (High)

- **Where:** Studio home and the dashboard's Studio card > the new-project form: the SCOPE chips, and the Map scale /
  Site size field under the image.
- **What happens:** With SCOPE left on its pre-selected "Master plan", adding the downtown land-use plan switched
  SCOPE to "Single building or lot" in 4 of 4 tries, and nothing on screen said it had changed. Clicking Master plan
  before adding the image kept it (3 of 3). For that same file, the automatic scale check gave 1,810.5 m, 3,219 m,
  4,023.4 m, 4,426 m and 7,849.2 m on different runs, and twice said "No printed scale found on the plan — please
  enter it." The sandbox made from that plan ended up at 4,828 m. The only caution is the grey line "Scale detected
  from the plan — please verify." The plan's own scale bar reads 0 / 0.25 / 0.5 Miles.
- **Why it matters:** Scope and scale both feed generation. Details says of the scale: "The AI uses it to keep
  buildings, streets and open spaces proportionate." A downtown plan created as a single building, or at a fraction of
  its real size, gives wrong designs from the first run, and nothing makes the user doubt the form. Scope and scale
  are also what a team has to redo if the site lock forces a new project (SS-3). The guide needed two warnings at this
  step ("Click the scope, even if it looks selected" and "Always check the detected scale").
- **Evidence:** `explore/raw/2-check-scale-runs.txt`, `explore/raw/2-probe-form-filled-scrolled.png` (Single building
  or lot selected right after adding the plan), `explore/raw/2-probe-detected.png`,
  `tutorial/studio/img/2-04-create.webp`, `explore/entry/62-settings-tab-details-scroll1.txt` (Site scale help),
  `tutorial/studio/chapters/02-start-project.js`
- **Suggestion:** Never change a visible choice without saying so. If Studio wants to suggest a scope from the image,
  show it under SCOPE: "This looks like a single building. Switch to Single building or lot? [Switch] [Keep Master
  plan]". Show the detected scale as a pre-filled field that still needs confirming, with its source ("Read from the
  scale bar: 0.5 mi. Site width ≈ 4.0 km"), and keep Create project disabled until the user ticks "Scale checked". The
  same file should always give the same value.
- **Effort:** M

### NA-2 · "Add member…" lists 449 accounts with no search, repeated first names, a raw ID and an email address (Medium)

- **Where:** Studio > Team & permissions > any team card > Add member…
- **What happens:** The dropdown is a plain alphabetical list of 449 entries with no search box. It begins ":)", a
  24-character raw ID, "A" and "Abby". Several first names appear twice with nothing to tell the two people apart
  ("Alex", "Asal", "Barbara"). Most entries are a first name only, and one shows a person's municipal work email in
  place of a name.
- **Why it matters:** Adding someone here gives them edit rights on every project linked to that team. With two "Alex"
  entries and no email shown, it is easy to pick the wrong person and hand a client project to a stranger. The list
  also shows every account in the app, including an outside email address, to whoever manages teams.
- **Evidence:** `explore/media-org/83-team-add-member-open.png`, `83-team-add-member-open.txt` (449 options),
  `explore/media-org/80-team-top.txt`
- **Suggestion:** Replace the dropdown with a search field, "Add a person by name or email…", that shows matches only
  after two characters, each with name, email and app role. Show accounts without a display name by email, never by a
  raw ID. After adding, confirm with a toast: "Alex Rossi can now edit 1 project — Undo".
- **Effort:** M

### NA-3 · Studio never says who "everyone" is: other people can read every project, and new presets are shared by default (Medium)

- **Where:** Team & permissions (the note at the top); New preset (State and Scope); New planning preset (Visibility);
  Projects page (the Anyone filter).
- **What happens:** Team & permissions says: "A project is editable only by its creator by default… Everyone else
  keeps read-only access." No control anywhere makes a project private. New preset pre-selects "Active — available to
  everyone in the org" and "Shared — Usable across the studio and all projects", and its button reads "Save & make
  Active". New planning preset pre-selects "Public — Visible and usable by everyone." That is three phrases ("everyone
  in the org", "across the studio", "everyone") for what may be the same group of people. The Add member list on the
  same page holds 449 accounts, some of which don't look like staff (NA-2).
- **Why it matters:** Planning teams work with confidential sites and client material. If they can't tell who
  "everyone" is, they can't judge whether a draft masterplan, or a mood board of client photos, is visible outside the
  office. Pre-selecting the most open option makes over-sharing the default.
- **Evidence:** `explore/media-org/80-team-top.txt`, `explore/media-org/65-new-preset-dialog-bottom.png`,
  `explore/media-org/74-new-planning-preset-scroll-1.png`, `explore/media-org/83-team-add-member-open.txt`,
  `explore/entry/43-projects-filter-anyone.png`
- **Suggestion:** Name the audience in one phrase everywhere, for example "Everyone with Studio access in CoPlanAI (N
  people)", linked to the list of those people. Give each project a Visibility setting, shown as a badge on its card:
  "Members only" or "Everyone with Studio access (read-only)". When a preset is created from inside a project, default
  it to "Draft — only me" and "Project-only". Rename the planning-preset option "Public" to "Everyone with Studio
  access".
- **Effort:** M

### NA-4 · Nothing leads back to the CoPlanAI dashboard, and the unlabelled logo opened the platform admin panel (Medium)

- **Where:** The top bar on every Studio page: the logo at the far left, the breadcrumb and the account menu.
- **What happens:** On the app dashboard the logo is a button named "Home". Inside Studio the same logo is a button
  with no name and no tooltip. Clicked on Studio home, it took this owner account to `/admin/apps`, a page headed
  "ADMIN PANEL" that lists every client app, instead of the CoPlanAI dashboard. The breadcrumb starts at "Studio". The
  account menu holds only Profile, Language, Theme and Log out. So no visible control leads back to the dashboard, or
  to the gallery and app settings that the dashboard's top bar offers.
- **Why it matters:** People who open Studio from the dashboard can only leave with the browser's Back button or by
  typing the address; the guide had to add a tip ("Back to the CoPlanAI dashboard"). Landing in a platform admin area
  from the logo is confusing, and puts platform-wide controls one accidental click away.
- **Evidence:** `explore/entry/59b-logo-click-from-studio-home.txt`,
  `explore/entry/10-studio-home-after-open-studio.txt` (unnamed button), `explore/entry/01-dashboard-top.txt` (button
  "Home"; links "Open my gallery" and "Open app settings"), `explore/entry/57-account-menu-open.png`,
  `tutorial/studio/chapters/01-studio-start.js`
- **Suggestion:** Make the logo a link to the app dashboard (`/coplanai`), never to `/admin`, named and tooltipped
  "CoPlanAI home". Add "CoPlanAI" as the first breadcrumb ("CoPlanAI / Studio / Projects"), and "Back to CoPlanAI
  dashboard" at the top of the account menu. If admins need the admin panel, give it its own labelled entry there.
- **Effort:** S

### NA-5 · Uploaded images, Team & permissions and Audit log have no address of their own (Medium)

- **Where:** Studio menu > Uploaded images, Team & permissions, Audit log; the Videos and Upscale panels > Back to
  menu.
- **What happens:** On all three pages the address bar stays at `/coplanai/studio/projects`, while the breadcrumb
  reads "Studio / Uploaded images" and so on. Reloading, bookmarking, sharing the link or pressing Back brings up
  Projects instead. The other menu pages do have their own addresses (`/studio/videos`, `/studio/upscales`,
  `/studio/library/presets`, `/studio/settings`). On the Videos and Upscale panels, "Back to menu" always opens
  Projects, whichever page you came from.
- **Why it matters:** An admin reviewing the audit log or cleaning up uploads loses their place on every reload, and
  can't send a colleague a link to the page. The guide needed a warning ("Reloading takes you to Projects").
- **Evidence:** `explore/media-org/40-uploads-page.txt`, `80-team-top.txt`, `90-audit-log-top.txt` (all at
  `/studio/projects`), `explore/media-org/28-videos-back-to-menu.png`, `10b-videos-direct-url.txt`,
  `30b-upscale-direct-url.txt`, `tutorial/studio/chapters/08-organisation.js`
- **Suggestion:** Give each page its own address (`/studio/uploads`, `/studio/team`, `/studio/audit`), and keep
  filters in the address too (`/studio/audit?type=generations`). Make the back arrow on Videos and Upscale return to
  the previous Studio page and name it in its tooltip ("Back to Uploaded images").
- **Effort:** M

### NA-6 · Nothing in Studio is a link, and the project-name breadcrumb opens settings (Medium)

- **Where:** Project cards on Studio home and on Projects, the breadcrumb and the left menu, on every Studio page.
- **What happens:** Studio pages contain no links (`<a href>`). Project cards and the "Studio" and project-name
  breadcrumbs are `div` elements marked as buttons, and the menu items are buttons. Middle-click, Ctrl- or Cmd-click,
  "Open in new tab" and "Copy link address" therefore do nothing useful. The dashboard, by contrast, uses a real link
  for the gallery. From Production, clicking the project-name breadcrumb opened the Project settings dialog instead of
  going to the project.
- **Why it matters:** Planners compare two projects side by side, keep a report open while editing, and paste project
  links into email and chat. None of this works, and a breadcrumb that opens a settings dialog breaks the most basic
  expectation of navigation.
- **Evidence:** `explore/entry/11-studio-home-hover-logo.txt`, `40-projects-page-from-all-projects.txt`,
  `50-sandbox-opened-from-card.txt` (no links; `div[button]` for "Studio" and the cards),
  `explore/entry/58b-breadcrumb-project-click-from-production.png` (Project settings open after the click),
  `explore/entry/01-dashboard-top.txt`
- **Suggestion:** Make project cards, breadcrumbs and menu items real links (for example
  `href="/coplanai/studio/projects/<slug>/ideation"`). Send the project-name breadcrumb to the project's Ideation page
  and leave Project settings on its sliders icon. Add "Open in new tab" and "Copy link" to the card's ••• menu.
- **Effort:** M

### NA-7 · "8 projects" over 7 cards, and a "Completed" status that can't be set anywhere (Medium)

- **Where:** Studio > Projects (count, status filter, empty state, card ••• menu); Team & permissions > Link a
  project…
- **What happens:** The header says "8 projects" but 7 cards show: "All statuses" leaves archived projects out, while
  the count includes them. The count stays at 8 under every search and filter (Archived shows 1 card; Completed and
  the search "zzzz" show none). Filtering to Completed shows "No matching projects / Try a different search." although
  nothing was typed. The filter offers Completed, but neither the card menu (Open project, Project setup, Report,
  Duplicate, Archive) nor Project settings > Details can set a status. Restore only appears after switching the filter
  to Archived. The archived "Master Plan 2026-09-28 2" is still offered, unmarked, in Link a project…, and still has
  its team card.
- **Why it matters:** The first number a team sees is wrong, and archived work quietly disappears from the default
  view. A status you can filter by but never set makes the whole status system look broken. The guide needed a warning
  ("All statuses isn't quite all") and a tip.
- **Evidence:** `explore/entry/40-projects-page-from-all-projects.png`, `48-projects-filter-archived-selected.txt`,
  `48b-projects-filter-completed-selected.txt`, `49b-projects-search-no-results.txt`,
  `tutorial/studio/img/1-06-card-menu.webp`, `explore/entry/62-settings-tab-details-scroll1.txt` (no status field),
  `explore/media-org/84-team-link-project-open.txt`, `tutorial/studio/chapters/01-studio-start.js`
- **Suggestion:** Count what is listed: "7 projects · 1 archived", with "1 archived" switching the filter, and "2 of 8
  projects" while filtered. Rename "All statuses" to "Active and completed", or add "All, including archived". Change
  the empty state to "No projects match these filters [Clear filters]". Add "Mark as completed" and "Reopen" to the
  card menu, or remove Completed from the filter until it exists. In Link a project…, hide archived projects or mark
  them "(archived)".
- **Effort:** S

### NA-8 · Machine-made project and team names that drift apart (Medium)

- **Where:** The Projects page and Recent projects cards; Team & permissions; Project settings > Details (Project
  name, URL slug).
- **What happens:** Studio names each new project "<Process> <date>" plus a counter ("The project is named for you"),
  so the Projects page shows "Conceptual Plan 2026-09-28", "… 2" and "… 3", and "Master Plan 2026-09-28", "… 2" and "…
  3", side by side, told apart only by their thumbnails. Renaming is only possible in Project settings > Details,
  where the field is too narrow to show the name ("Downtown plan (Studio tutorial"). After the sandbox was renamed,
  its team was still "Conceptual Plan 2026-10-02 team", and its slug and address still read
  `conceptual-plan-2026-10-02`. Owner names on the cards are cut off ("Damiano Ce…").
- **Why it matters:** Finding the right project or team starts every session. With near-identical names, people open
  the wrong project or link the wrong team. The guide tells readers to check the PROJECTS list on each team card to
  find the right one.
- **Evidence:** `explore/entry/40-projects-page-from-all-projects.png`,
  `explore/media-org/86-team-sandbox-auto-team.png`, `explore/media-org/80-team-top.txt`,
  `tutorial/studio/img/2-08-details.webp`, `explore/entry/50-sandbox-opened-from-card.txt` (address unchanged),
  `tutorial/studio/chapters/08-organisation.js` (tip "Renamed a project?")
- **Suggestion:** Add a "Project name" field to the new-project form, pre-filled with the suggested name and selected
  so typing replaces it. Allow renaming in place on the card title or the breadcrumb. Name the automatic team after
  the project and update it on rename, or show the linked project's name as the team card title. Widen the name field
  in Details, and on rename ask "Also update the web address?".
- **Effort:** M

### NA-9 · Save buttons sit at the far end of long pages, and Project settings mixes autosave with Save (Medium)

- **Where:** The Project settings dialog (its subtitle; Save on the Settings tab); Studio > Settings (Save
  configuration).
- **What happens:** Project settings says "Detail changes save as you edit." That is true on the Details tab. The
  Settings tab (Scene toggles, Area steppers, Additive elements, Touch-up color prompts, Land-use colour standard)
  needs a Save button that sits only at the very bottom of a scroll about 2,800 px long. Studio Settings is one page
  about 7,000 px tall, with a single "Save configuration" button at the top and no way to jump between sections.
  Someone editing Report sections at the bottom has to scroll all the way back up to save.
- **Why it matters:** Someone who changes a colour and closes the dialog will reasonably think the change was saved,
  because the subtitle says so. The guide needed a warning ("This tab has its own Save"). On a 7,000 px page, admins
  lose their place and can't tell what is unsaved.
- **Evidence:** `explore/entry/60-settings-tab-settings.txt` (Save at y = 2813),
  `explore/entry/61-settings-tab-settings-scroll4.png`, `explore/media-org/100-settings-top.png`,
  `explore/media-org/101-settings-scroll-08.png` (bottom of the page, no Save),
  `tutorial/studio/chapters/02-start-project.js`
- **Suggestion:** Add a sticky footer to both that appears as soon as something changes: "Unsaved changes · Discard ·
  Save". Ask "Discard unsaved changes?" when the dialog is closed. Until both tabs work the same way, change the
  subtitle to "Details save as you edit. Changes on the Settings tab need Save." Later, give Studio Settings a section
  list on the left.
- **Effort:** S

### NA-10 · Studio Settings and each project's settings edit the same lists, with no sign of which applies (Medium)

- **Where:** Studio > Settings, and Project settings > Settings (Scene toggles, Area steppers, Additive elements,
  Touch-up color prompts, Land-use colour standard).
- **What happens:** Studio Settings says "Override the platform default Studio configuration for this app" and "Saving
  below creates an app-specific override". Project settings > Settings shows the same five editors with the same rows,
  plus an eye button "Hide in this project". Neither page says whether a project's lists come from Studio Settings,
  whether a later Studio change reaches existing projects, or which rows a project has changed. The project report
  shows "Library snapshot — pinned at project creation (2026-10-02)", which suggests that existing projects keep their
  own copy, but no settings page says so.
- **Why it matters:** An admin who corrects a prompt or a land-use colour in Studio Settings can't predict whether
  running projects will change. A planner editing a project's lists can't see how they differ from the office
  standard. Three levels (platform, app, project) with identical editors and no labels invite the question "why did
  this generation come out differently?". The guide warns "These settings apply to the whole app".
- **Evidence:** `explore/media-org/100-settings-top.png` and `.txt`, `explore/entry/60-settings-tab-settings.txt`,
  `tutorial/studio/img/2-09-settings.webp`, `explore/raw/6-05-raw.txt` ("Library snapshot — pinned at project
  creation"), `tutorial/studio/chapters/08-organisation.js`
- **Suggestion:** Show where each row comes from. In Project settings, tag each row "Studio default" or "Changed in
  this project", with "Reset to Studio default" in its menu, and add at the top: "These lists start from Studio
  Settings (as saved on 2 Oct 2026). Changes here affect only this project." In Studio Settings, state the reach next
  to Save configuration: "Applies to new projects. Existing projects keep their own copy. [Apply to existing
  projects…]".
- **Effort:** M

### NA-11 · Six image pickers with different names, tabs and contents, and every project's drawings pile up Studio-wide (Medium)

- **Where:** New-project form (Choose from existing); the Studio-level Videos and Upscale pages; the project's Video
  and Upscale pickers (from Production); New preset (Choose from library); New planning preset (+ pick from library);
  Uploaded images (Type filter).
- **What happens:**
  - The new-project picker is titled "Choose from uploaded images", with tabs Uploads (6) and Drawings (21). Its
    subtitle says "Pick one image" while its footer reads "0 selected" and "Add 0".
  - On the Studio-level Videos and Upscale pages the tabs are Generated and Uploads. "Generated" shows only 2 images,
    and "Uploads" mixes the 6 uploads with boundary strokes and blank white tiles, 47 tiles in all.
  - Opened from Production, the tabs are Ideation, Favorites, Renders and Uploads, and Uploads still includes other
    projects' drawings. Empty Favorites and Renders tabs say "No images here yet. Upload one to get started.",
    although those images come from Ideation and Production. The Upscale help says "Pick from your production images,
    favorites, renders or uploads"; no tab is called production images.
  - The library pickers split the images into Uploads (6) and Drawings (41).
  - Drawings holds every project's boundary lines, touch-up masks and land-use paint, and grew from 21 to 41 to 47
    while we worked, mostly from our own test boundaries. The blank tiles are probably the strokeless boundary images
    from SS-1.
  - No tile carries a label: no project, concept, view, date or file name.
- **Why it matters:** Choosing the right site plan, reference or render is a core step in every flow. Unlabelled
  tiles, blank tiles and other projects' drawings make it slow and easy to get wrong, and a wrong pick for a video or
  upscale wastes a paid generation.
- **Evidence:** `explore/entry/30-choose-existing-uploads.txt`, `explore/entry/33-choose-existing-drawings.png`,
  `explore/media-org/16-videos-choose-before-dialog.png`, `17-videos-choose-after-dialog-generated.png`,
  `18-videos-choose-after-dialog-uploads.png`, `explore/production/31-cp-video-after-picker-uploads.png`,
  `explore/production/31-cp-video-after-picker-favorites.txt`,
  `explore/production/95-sandbox-upscale-source-picker-renders.txt`, `explore/production/40-cp-upscale-open.txt`,
  `explore/media-org/66-new-preset-choose-from-library.txt`, `explore/media-org/41-uploads-filter-type-open.txt`,
  `tutorial/studio/img/7-01b-pick-after.webp`
- **Suggestion:** Use one picker everywhere. Title it after the slot being filled ("Choose the site plan", "Choose the
  after image") and always show the same tabs in the same order: "This project" (concepts, favourites, renders),
  "Uploads", "All projects". Leave drawings out by default, behind a "Show drawings & masks" switch, and limit them to
  the current project. Caption every tile ("downtown-landuse.png", "Concept A · I2 · top view", "Aerial · Dusk") and
  show transparent files on a checkerboard. Give each tab its own empty state ("No renders yet · build them in
  Production"). Use "Use image" when only one image can be picked.
- **Effort:** M

### NA-12 · The Audit log can't answer "what happened on this project?" (Medium)

- **Where:** Studio > Audit log.
- **What happens:** Rows read "BoundarySet project", "BoundaryCleared project", "LandUsePlanSet project",
  "QuickActionsUpdate project", "ImpactAnalysis project" and "Created studioconcept". The details show "(unnamed)" for
  concepts and images, the model ID "Gemini3ProImage", "1 items → 2 items", and "Aspect ratio 16:9 →" with no new
  value. Generate, Touch-up and boundary rows carry no project chip, so with several projects you can't tell which one
  changed, and the chips that do appear are cut short ("Downtown plan (Studio tutorial …"). Every boundary save is
  listed twice within the same minute. The only filter is activity type. There is no filter by project, person or
  date, no search and no export.
- **Why it matters:** The page promises who did what, and when, across Studio. A lead checking what a colleague did on
  a client project, or which generations were run, has to guess. The guide had to translate the internal names.
- **Evidence:** `tutorial/studio/img/8-05-audit.webp`, `explore/media-org/90-audit-log-top.txt` (boundary rows in
  pairs), `92-audit-update-details.png`, `92-audit-quickactionsupdate-details.txt`, `92-audit-create-details.txt`,
  `92-audit-landuseplanset-details.txt`, `91-audit-filter-open.txt`, `tutorial/studio/chapters/08-organisation.js`
- **Suggestion:** Write each row as a sentence that names the project: "<name> saved the site boundary · Downtown plan
  (Studio tutorial demo)". Replace the codes ("Saved site boundary", "Set land-use plan", "Changed quick actions",
  "Ran impact analysis", "Created concept"). Show concept names with a thumbnail instead of "(unnamed)", display names
  for models, and "(empty)" when a value was cleared. Add Project, Person and Date filters and "Export CSV", and merge
  duplicate events.
- **Effort:** M

### NA-13 · One dialog has two names; three things are called "Settings" and two are called "Site" (Low)

- **Where:** The card ••• menu, the Studio home hint, the Actions panel's sliders icon, "Edit colours in project
  settings", the project-name breadcrumb; the Studio menu's "Settings"; Production's "Settings"; the Project settings
  tabs.
- **What happens:** One dialog is "Project setup" in the card menu and in the home hint ("everything stays editable in
  Project setup"), but "Project settings" in its title, in the sliders icon's tooltip and in "Edit colours in project
  settings". It also opens from the project-name breadcrumb (NA-6). "Settings" is the Studio menu page, a tab inside
  Project settings, and a Production button that opens a dialog titled "Render settings". "Site" is both the Ideation
  tab (boundary and land use) and the Project settings tab that holds the site context files ("Site context · 1
  files").
- **Why it matters:** Someone looking for "Project setup" won't recognise a dialog titled Project settings. A
  "Settings" tab inside "Project settings", plus a Production "Settings" that is really render options, makes it hard
  to know which settings affect what.
- **Evidence:** `tutorial/studio/img/1-06-card-menu.webp`, `explore/entry/15-studio-home-form-bottom.txt`,
  `explore/entry/54-sandbox-hover-project-settings.txt`,
  `explore/entry/58b-breadcrumb-project-click-from-production.png`, `explore/raw/6-01-raw.txt`,
  `tutorial/studio/img/2-10-site.webp`
- **Suggestion:** Use "Project settings" everywhere. Rename the dialog's tabs "Generation options" (now Settings),
  "Details", "Site files" (now Site) and "Team". Rename the Production button "Render settings", to match its dialog,
  and the Studio menu item "Studio settings".
- **Effort:** S

### NA-14 · Studio Settings uses different names from the controls it sets up (Low)

- **Where:** Studio > Settings; Quick actions in a project; Project settings > Details; Production > Render settings.
- **What happens:** "Scene toggles", "Area steppers" and "Additive elements" in Settings appear in Quick actions as
  "Scene group 1", "Adjust" and "Add". The Area steppers tooltip talks of "± stepper actions" and "Max", while the
  panel shows a three-step slider ("2 of 3", "Levels"). The default scene group has no name, only the placeholder
  "Group 1", so planners see "Scene group 1". Output quality is "Standard / High / Print" in Studio Settings but "1K /
  2K / 4K" in Details, Quick actions and Render settings. The batch size is "Images per batch", "variant(s)" or
  "images" depending on the screen. A section headed "Planning presets" holds Render styles, Layout geometry and
  Creativity, while "Planning presets" is also a library page. "Density bands" appears twice, and the section "Canvas"
  contains only Required elements. Tooltips use developer language: "The prompt fragment is the model-facing phrase…",
  "'Value' is the internal quality key", "an LLM rewrites the assembled prompt".
- **Why it matters:** Admins who adapt the defaults (ID-1) can't match a setting to what planners see, and planners
  see placeholder labels.
- **Evidence:** `explore/media-org/100-settings-top.txt`, `101-settings-scroll-01.png`, `101-settings-scroll-03.png`,
  `101-settings-scroll-08.png`, `103-settings-info-tooltips.txt`, `107-settings-field-values.txt` (placeholder "Group
  1"), `explore/quick/62-settings-field-values.txt`, `explore/quick/27-dropdown-output-quality.txt`,
  `explore/scout/18-menu-settings.txt`, `explore/production/12-cp-render-settings-quality-dropdown.png`,
  `tutorial/studio/img/4-05-scene-adjust.webp`
- **Suggestion:** In Settings, use the names planners see and keep the technical term as help: "Scene groups (Quick
  actions › Scene)", "Adjust sliders", "Add elements". Name the default scene group "Time of day". Use one quality
  scale everywhere ("2K · High"). Rename the section "Planning preset options", remove the duplicate Density bands
  heading and rename "Canvas" to "Required elements". Rewrite tooltips for admins ("Text added to the image prompt
  when a planner picks this option").
- **Effort:** S

### NA-15 · Uploaded images shows a use count, not where each image is used (Low)

- **Where:** Studio > Uploaded images.
- **What happens:** The subtitle reads "Every image uploaded into this Studio. See where each is used and remove the
  ones that aren't." Each card shows only "Used 6×", "Used 16×" or "Unused", the date and time, and the uploader. The
  badge has no tooltip and no link. One downtown plan upload went from "Used 4×" to "Used 11×" as the sandbox ran
  generations, so the number counts uses, not projects. Cards show no file name, and the white date text sits on top
  of light plan legends. Delete is offered only on unused uploads, which is good.
- **Why it matters:** To clean up uploads, or to answer "which projects use this plan?", people need the list of
  projects, not a count.
- **Evidence:** `explore/media-org/40-uploads-page.png` (Used 4×), `tutorial/studio/img/8-01-uploads.webp` (the same
  card later: Used 11×), `explore/media-org/50-uploads-hover-used-badge.txt`, `49-uploads-card-actions-revealed.txt`
- **Suggestion:** Replace the badge with "Used in 2 projects", opening a list of project links with the generation
  count as secondary text. Show the file name under each thumbnail, and put the date on a solid strip.
- **Effort:** M

### NA-16 · Two places manage who works on a project, and they disagree (Low)

- **Where:** Project settings > Team (the "Project team" dialog); Studio > Team & permissions; Project settings >
  Details > Section lead.
- **What happens:** Project settings > Team opens "Project team — Who leads and collaborates on this project", with
  the owner as "lead" and "+ Add member". Team & permissions shows the same people as one automatically created team
  per project ("Conceptual Plan 2026-10-02 team", MEMBERS (1), PROJECTS (1)): eight one-person teams for eight
  projects. Details > Section lead is empty, although its only option is the owner, marked "(lead)". On the team card,
  the project chip's × sits on top of the project name ("tutorial d×emo)"), so clicking the name can unlink the
  project. The team's bin and × icons have no name and no tooltip.
- **Why it matters:** A project lead can't tell where to add a colleague, or which list counts. The overlapping ×
  invites accidental unlinking.
- **Evidence:** `tutorial/studio/img/2-11-team.webp`, `explore/entry/66-settings-team.txt`,
  `explore/media-org/80-team-top.txt`, `explore/media-org/86-team-sandbox-auto-team.png`,
  `explore/entry/69b-settings-tooltips-details-site.json`
- **Suggestion:** Manage membership on the project itself (Project settings > Team, with Lead, Editor and Viewer).
  Turn Team & permissions into reusable groups only ("Urban design", "Landscape") that can be added to a project in
  one step, and stop creating a team per project. Fill Section lead from the project lead, or remove the field. Pad
  the chips so the × never covers text, and name the icons ("Remove from team", "Unlink project", "Delete team").
- **Effort:** L

### NA-17 · Many icon buttons have no name or tooltip (Low)

- **Where:** Studio Settings, Team & permissions, Project settings, the left menu and panel headers.
- **What happens:** Many buttons have no accessible name: 175 of 231 on Studio Settings, 25 of 64 on Team &
  permissions and 24 of 84 on the Project settings Settings tab. The pencil, revert and bin icons on each settings row
  have no tooltip; only the eye has one ("Hide in this project"). Collapse menu, Collapse panel and Back to menu show
  no tooltip, while their neighbour "Move panel to the right side" does. The Details tab's info icons use browser
  `title` attributes (invisible on touch screens), and every one of them says "Recorded for reference — does not
  affect image generation." The card ••• menu is announced as a dialog, not a menu. The drawing editors and image
  tiles have the same gaps (SS-10, RE-10, RE-14).
- **Why it matters:** Planners guess what icons do, and screen-reader users hear "button" 175 times on one page. Our
  capture scripts had to pick these buttons by their position on screen.
- **Evidence:** `explore/media-org/100-settings-top.txt`, `explore/media-org/80-team-top.txt`,
  `explore/entry/60-settings-tab-settings.txt`, `explore/media-org/104-settings-hover-edit-row.txt`,
  `explore/entry/69b-settings-tooltips-details-site.json`, `explore/entry/69d-title-attributes.json`,
  `explore/raw/1-probe-card-menu.txt`
- **Suggestion:** Give every icon button an accessible name and the same text as a tooltip ("Edit", "Revert to
  default", "Delete", "Collapse menu", "Collapse panel", "Back to Projects", "Remove member", "Delete team"). Replace
  the `title` attributes with the styled tooltip, and write help that fits each field ("Section lead: the person
  accountable for this project; shown in the report"). Mark up the card menu as a menu.
- **Effort:** S

### NA-18 · Some actions appear only on hover, and several dialogs have no close button (Low)

- **Where:** Uploaded images cards; the Project settings, Project team and full-size viewer dialogs.
- **What happens:** On upload cards, "View full size" and "Delete" are hidden by CSS (opacity 0 at widths of 64rem and
  up) unless the device reports a pointer that can hover, so on a tablet in landscape they never appear. The Project
  settings dialog, the Project team dialog and the full-size image viewer have no close button. The viewer also has no
  title or file name and is announced only as "Dialog". All three close only with Escape or a click outside.
- **Why it matters:** Touch users can't delete an unused upload. People who don't think of pressing Escape feel stuck.
- **Evidence:** `explore/media-org/44-uploads-unused-card-hover-crop.png`, `49-uploads-card-actions-revealed.txt`,
  `46-uploads-view-full-size.png` and `.txt`, `tutorial/studio/img/2-10-site.webp` and `2-11-team.webp` (no close
  button)
- **Suggestion:** On devices without hover, and on keyboard focus, show the card actions all the time or behind a
  visible ••• button. Add a top-right × labelled "Close" to Project settings, Project team and the viewer, and show
  the file name and date in the viewer's header.
- **Effort:** S

### NA-19 · The library uses four names for two kinds of thing (Low)

- **Where:** Studio menu > LIBRARY; the Mood boards & style references page; the Planning presets page; the Audit log
  filter; the project's Presets tab.
- **What happens:** The menu says "Mood boards & style refs"; the page title says "Mood boards & style references".
  Its items are called "presets" ("0 presets", "New preset"), at `/library/presets`. The other library is "Planning
  presets", at `/library/directions`. The audit filter lists both "Presets" and "Planning presets", and a project's
  "Presets" tab shows planning presets only. Mood boards use State (Active/Draft) plus Scope (Shared/Project-only);
  planning presets use Visibility (Public/Private), yet their list filters by State. The mood-board empty state
  doesn't say what a mood board does or where it appears. "Generate" for the descriptor works on an empty New planning
  preset form, while "Generate description" in New preset waits until images are added.
- **Why it matters:** Two concepts with overlapping names make the library hard to learn, and planners can't tell
  which one feeds the Presets tab.
- **Evidence:** `explore/media-org/60-moodboards-empty.png` and `.txt`, `70-planning-presets-empty.txt`,
  `71-planning-presets-filter-state-open.txt`, `65-new-preset-dialog-bottom.png`,
  `74-new-planning-preset-scroll-1.png`, `77-new-planning-preset-hover-generate.txt`, `91-audit-filter-open.txt`
- **Suggestion:** Call the first type "Mood boards" everywhere (menu, title, items, `/library/mood-boards`) and keep
  "Planning presets" for the second (`/library/planning-presets`). Give both the same sharing control and filters (see
  NA-3). Explain mood boards in their empty state: "Sets of reference images that steer the look of generations.
  Planners use them under Quick actions > Reference Images, or through a planning preset." Keep "Generate" disabled
  until there is a name, a description or a reference.
- **Effort:** S

### NA-20 · The new-project form works differently for each planning process (Low)

- **Where:** The new-project form on Studio home and on the dashboard; Project settings > Details > Process.
- **What happens:** No process is pre-selected, yet a scope is. After an image is added, the only hint is "Pick a
  planning process", next to a disabled Create project button. Conceptual Plan and Master Plan end with Create
  project. Focus Area has neither a scope nor a Create project button: "Use this photo & start" or "Use this view &
  start" creates the project at once, with no review step. Project settings > Details > Process offers only Conceptual
  Plan and Master Plan, with no explanation.
- **Why it matters:** Users can't see where creation happens or what they are committing to, and Focus Area users can
  create a project before they have finished choosing a view.
- **Evidence:** `explore/entry/15-studio-home-form-bottom.png`, `20-home-type-conceptual.png`,
  `27-home-focus-top.png`, `29-home-focus-upload-an-image.png`, `explore/raw/2-check-no-process.png`,
  `tutorial/studio/img/2-05-focus-map.webp`, `2-06-focus-street-view.webp`, `2-07-focus-upload.webp`,
  `explore/entry/65-details-dropdown-process.png`
- **Suggestion:** Pre-select Conceptual Plan, or make the process the form's first step. Use one Create project button
  for all three processes; in Focus Area, rename "Use this photo & start" to "Use this photo", then enable Create
  project with a summary line ("Focus Area · street photo · <address>"). If Process can't be changed to Focus Area
  later, say so next to the field.
- **Effort:** M

### NA-21 · Studio home opens on a large upload box, and recent projects are below the fold (Low)

- **Where:** Studio home; the dashboard's Studio card.
- **What happens:** At 1900×950, the greeting and the new-project drop zone (1,443×544 px) fill the first screen, and
  Recent projects starts below the fold. The dashboard's Studio card repeats the form with different wording: it has
  the heading "Start a new project / Choose how the project starts, then add its site material." but not the naming
  hint, while Studio home has the hint "The project is named for you — everything stays editable in Project setup."
  but not the heading.
- **Why it matters:** Most visits are to carry on with a project, not to start one.
- **Evidence:** `explore/entry/10-studio-home-after-open-studio.png`, `explore/entry/11-studio-home-hover-logo.txt`
  (drop zone size; All projects at y = 986), `explore/entry/03-dashboard-studio-form-and-recent.txt`,
  `explore/entry/15-studio-home-form-bottom.txt`, `tutorial/studio/img/1-04-recent-projects.webp`
- **Suggestion:** Put Recent projects at the top of Studio home (one row of four cards and "All projects →"), and
  shrink the form to a strip: "Drop a site plan or photo to start a new project", with "+ New project". Use one form
  component, with the same heading and hint, in both places.
- **Effort:** S

### NA-22 · Mixed British and American spelling, broken plurals and three date formats (Low)

- **Where:** Across Studio: Project settings, Studio Settings, the Site tab, Touch-up and Adjust, the Audit log,
  Production, Videos.
- **What happens:** British "colour" (Land-use colour standard, COLOUR LEGEND, Edit colours in project settings) sits
  next to American "color" (Touch-up color prompts, Pick a color), and the audit calls the same feature "Color
  meanings". "ORGANISATION", "neighbourhood", "recognised" and "Analyse" appear alongside "Mark as favorite",
  "Favorites" and "visualization". Plurals break: "1 files", "1 items", "1 concepts", "1 images", "1 final views",
  "Each run generates 2 variant(s)". Dates appear as "2026-10-02" on cards, "FRIDAY, 2 OCTOBER 2026" on home and "02
  Oct 2026" in the report. The menu says "Videos" while the page is titled "Video", and the menu's "Upscale" is "Image
  Upscale" in Production.
- **Why it matters:** Small slips add up to an unfinished feel in a tool whose outputs go to clients.
- **Evidence:** `explore/entry/60-settings-tab-settings.txt`, `explore/entry/64-settings-tab-site.png` ("1 files"),
  `explore/media-org/92-audit-quickactionsupdate-details.txt` ("Color meanings", "1 items"),
  `explore/production/60-mp-production.txt` ("1 concepts"), `explore/entry/10-studio-home-after-open-studio.txt`
  ("FRIDAY, 2 OCTOBER 2026", "Edited 2026-10-02"), `explore/raw/6-05-raw.txt` ("02 Oct"),
  `tutorial/studio/img/4-05-scene-adjust.webp` ("variant(s)"), `explore/raw/6-01-raw.txt` ("Image Upscale"),
  `explore/media-org/10-videos-before-after-top.png`
- **Suggestion:** Use British English throughout, since the interface already says ORGANISATION, colour and Analyse:
  "Touch-up colour prompts", "Pick a colour", "Mark as favourite", "Favourites". Apply plural rules ("1 file", "2
  variants"). Use one date format ("2 Oct 2026"; with a time, "2 Oct 2026, 17:59"). Make menu labels match page
  titles.
- **Effort:** S

## Whole journey

These items cut across the screens above: what the product promises, what a run costs, how a run ends, where to start
and what the words mean. One measure of the load: our finished guide has 8 chapters, 75 steps, 309 numbered beats and
about 14,500 words, plus 50 notes (17 warnings, 15 tips, 18 info boxes). Most of the warnings steer readers around
product behaviour ("Click the scope, even if it looks selected", "Check that your line was kept", "The first run fixes
the site") rather than explain planning.

### CC-1 · coplanai.com promises Studio features that are missing or only partly there (High)

- **Where:** coplanai.com, page "Use CoPlanAI", the "CoPlan Studio" card, compared with Studio home, Quick actions,
  Impact, Compare, Production and Video.
- **What happens:** The card says Studio "turns a written brief into checked, rendered design options" and lists six
  lines. Against what we saw:
  - **"It starts with an image and your brief":** the new-project form takes an image, a process and a scope, with no
    brief field. The report's PROJECT BRIEF lists only output quality, output format and aspect ratio.
  - **"Twenty variations from one brief":** each run makes 2 images ("Images per batch" is 2, admin-only, range 1–8),
    and a new concept made 1. Twenty means about ten separate runs of 1.5 to 3 minutes each.
  - **"Checked against the planning documents":** there is nowhere to add a planning document. Impact says "Indicative
    AI assessment — not a professional or regulatory evaluation." and works from the picture.
  - **"Favourites compared at one scale":** Compare shows each image in its own framing. In plate 5-07 a close oblique
    aerial of a few blocks sits next to a whole-site plan, both captioned only "Iteration 2", with no scale bar.
  - **"Renders from stored cameras":** we found no camera feature. Production views are prompt sentences in Studio
    Settings (Aerial = "a high aerial bird's-eye view looking down over the whole site at an oblique angle"), and a
    scan of Production found no "camera" or "stored" text.
  - **"Before and after, same frame":** Focus view's Compare slider exists, but iterating on a top-view plan returned
    oblique aerials from a different camera (ID-2), and Video leaves the framing to the user: "Use two shots of the
    same scene with similar composition."
- **Why it matters:** Clients buy Studio on these six lines. A team that looks for planning-document checks or stored
  cameras in its first hour finds nothing, and reads the product as broken or unfinished.
- **Evidence:** coplanai.com "Use CoPlanAI" page source (the CoPlan Studio card),
  `tutorial/studio/img/2-01-process.webp` and `2-04-create.webp` (no brief field),
  `tutorial/studio/img/6-05-report-preview.webp` (PROJECT BRIEF), `explore/quick/62-settings-field-values.txt` (Images
  per batch), `tutorial/studio/img/5-11-impact.webp` and `5-12-impact-answer.webp`,
  `tutorial/studio/img/5-07-compare-side-by-side.webp`,
  `explore/production/120-production-testids-and-keyword-scan.txt`, `explore/scout/18-menu-settings.txt` (views as
  prompt text), `tutorial/studio/img/4-09-iterate.webp` → `4-12-two-concepts.webp`,
  `explore/production/89-sandbox-video-camera-tooltips-and-presets.txt`
- **Suggestion:** Close the gap from both ends. Now, bring the card in line with today's product, for example "Two
  options per run, as many runs as you need", "An indicative impact reading beside each option", "Options side by
  side", "Renders in a fixed set of views", "Before and after, as a video". Then build towards the promise: a brief
  and location that feed the prompt (bigger change B), "Images per run" in Quick actions instead of admin-only, a
  "Planning documents" list in Project settings with an Impact mode that names what it checked, a shortlist compared
  at one frame, and stored cameras (bigger change D).
- **Effort:** S for the copy; L for the product changes.

### CC-2 · No run shows what it costs or how long it takes, and the one output caption is often wrong (Medium)

- **Where:** Every bottom run button in Ideation (Apply to current, Start ideation, Generate, Apply to mask, Save as
  new version, Analyse); New concept > Create concept; Production > Build, Build all missing and Regenerate from
  master; Video > Generate video; Image Upscale.
- **What happens:**
  - No credit balance, price or estimate appears anywhere in Studio; the word "credit" does not occur in any page text
    we captured. The only cost hints are "Faster and cheaper AI generation" (Kling 2.6), "free" on the Classic
    engines, and "Adds latency and cost" on an admin setting.
  - Every bottom button carries "Each run generates 2 variant(s)". It also sits under Adjust's Save as new version,
    which made one image in seconds, and under Impact's Analyse, which returns text. Create concept made one image,
    and one Apply to mask made four (RE-6).
  - The Build buttons have no tooltip. Build all missing would fill every empty tile of every concept, 22 in the
    sandbox after our two builds, with no count on the button and no cost on the page. We did not click it, so we
    don't know whether a confirmation follows.
  - Run times we saw: first run 75–100 s, an iteration about 2.5 min, a Touch-up about 5 min, a prompt run about 3
    min, Impact about 15 s, a video several minutes. None was announced before the run, and Apply to current has no
    tooltip.
- **Why it matters:** A team can't plan a session or a budget, or tell which actions are free. People either avoid
  exploring or overspend. The guide has to tell readers that "the page shows no cost before you click" and to "build a
  tile or two first".
- **Evidence:** `tutorial/studio/img/6-01-render-set.webp` and `6-03-built.webp` (Build all missing, no count),
  `explore/production/04-cp-hover-build-aerial-day.png` (no tooltip), `tutorial/studio/img/5-09-adjust.webp` and
  `5-12-impact-answer.webp` (caption under Save as new version and Analyse),
  `tutorial/studio/img/4-12-two-concepts.webp` ("Green streets 1 images"),
  `explore/quick/06-hover-apply-to-current.txt`, `explore/quick/62-settings-field-values.txt`,
  `explore/production/70-sandbox-video-open.png` and `explore/media-org/30-upscale-panel.png` (engine copy),
  `docs/capture-notes.md` (run times), `tutorial/studio/chapters/06-production.js`
- **Suggestion:** Replace the caption with a line worked out for each button: Quick actions and Prompt "2 images ·
  about 2 min · 2 credits"; Touch-up "2 images · about 5 min"; Adjust "1 image · a few seconds · no credits"; Impact
  "Text answer · about 15 s"; Create concept with its real count. Label Build all missing with its count ("Build 22
  missing renders") and open a confirmation that lists concepts × views × scene states, with Cancel focused and "Build
  2 to check first" offered. Give each Build a tooltip ("Render Concept A · Aerial · Day"). Put the price beside each
  video and upscale engine, and if the app meters usage, show the balance next to the account avatar.
- **Effort:** S to correct the captions and add the count and confirmation; M for estimates and a credit balance.

### CC-3 · Long runs end without saying so, and results land out of sight (Medium)

- **Where:** The Ideation stage during and after runs (Quick actions, Touch-up, Adjust, Prompt, New concept); Focus
  view; the image grid.
- **What happens:**
  - The first run showed "Composing prompt…" and then "Generating variant 1 of 2…" over the blurred plan. About a
    minute in, Studio switched to Focus view on an empty white stage with a spinner. At about 110 s it showed the
    first variant, while "Generating variant 2 of 2…" was drawn underneath the floating toolbar and could barely be
    read; in one capture it was in the page text but not visible at all. The second variant arrived about 3 min after
    the click, with no notice. There is no time estimate.
  - After a Touch-up of about 5 minutes, Studio stayed on the source image: the outline cleared, the instruction still
    in the box, Apply to mask greyed. Nothing said that new images existed. They appeared only in the Timeline, as I3
    and I4 tiles that look almost the same as their neighbours.
  - Prompt's Generate ended on the new light-rail image, and Adjust's Save as new version jumped to the new version,
    so the next edit lands on a different image unless the user goes back. Three tabs, three landing rules.
  - The New concept run showed clear placeholders, then returned "Green streets 1 images" instead of 2, with no error,
    and its eye-level slot stayed an empty tile that is not a button.
  - Upscale, by contrast, says "Upscaling… this can take a moment. You can leave this page."
- **Why it matters:** Someone who waits five minutes and then sees the same image will think the run failed and start
  it again, paying for another generation. Others take a run as finished and stage the next one on an incomplete set.
  With three landing rules, users never learn where to look.
- **Evidence:** `tutorial/studio/img/4-07-generating.webp`, `explore/raw/4-run1-05.png`, `4-run1-09.png`,
  `4-run1-12.png` and `.txt`, `explore/raw/4-run1-15.txt`, `explore/raw/5-08-after.png` and `.txt` (source image,
  instruction still filled), `explore/raw/5-10-after.png` (new image), `explore/raw/5-09-after.txt` (new version),
  `explore/raw/5-13-timeline.png`, `explore/raw/4-11-run3-progress.png`, `explore/raw/4-12-hover-empty.txt`,
  `tutorial/studio/img/4-13-presets.webp`, `docs/capture-notes.md` (chapters 5 and 7)
- **Suggestion:** Use one rule for every run: stay on the source image, and keep a visible progress card on the stage
  until the whole run ends ("Touch-up · image 2 of 2 · about 2 min left · you can keep working"). Show the new tiles
  in the grid as placeholders from the start, and don't open Focus view by itself. When the run ends, show a toast
  that says where the results went ("Touch-up finished: 2 new images in Concept A · I3 · View"), or what is missing
  ("1 of 2 images couldn't be made · Retry"). Give an empty eye-level slot a "Generate eye-level view" button. After a
  run, clear the mask and relabel the button "Run again". Bigger change C adds a runs tray.
- **Effort:** M

### CC-4 · Nothing shows the order of work or the next step, and an empty project offers five ways to start (Medium)

- **Where:** The Studio home form; the project top bar (Ideation | Production); Ideation's seven icon tabs and their
  pills; Production's Video, Image Upscale and Report builder.
- **What happens:** Studio home presents the form without a word about what happens after Create project. Inside a
  project, the top bar shows only Ideation | Production; a "Report" tab appears there only after the Report builder
  has been opened, and Video and Upscale leave neither tab highlighted (PR-7). The site step is the first of seven
  unlabelled icon tabs inside Ideation. An empty project offers five ways to start, each with its own label and pill:
  - Site: "Start ideation".
  - Quick actions: "Apply to current", although there is no current image.
  - Presets: "Start ideation", disabled under "No planning presets for this plan type yet." while the pill says "Start
    ideation from the Presets tab when ready" (ID-5).
  - Touch-up: "Touch up the photo to start ideating", with tools that look live but draw nothing (RE-2).
  - Prompt: "Generate".

  After the first run the panel greys out ("Choose or select the images you want to edit first."), and nothing points
  to the next steps: shortlist, choose for production, build renders, put the report together.
- **Why it matters:** New users have to work out the order of work themselves, and several of the visible doors are
  dead ends. Our guide needs 75 steps to fill that gap.
- **Evidence:** `tutorial/studio/img/2-01-process.webp`, `tutorial/studio/img/3-01-site-tab.webp`,
  `tutorial/studio/img/4-01-quick-actions.webp`, `explore/quick/44-presets-sandbox-start-ideation-disabled.png`,
  `explore/edit-tabs/12-sandbox-touchup-brush-stroke.png`, `explore/quick/25-add-own-click-result.png` (Prompt tab:
  Generate), `explore/production/121-header-switch-states.txt`, `tutorial/studio/img/4-08-first-results.webp`
- **Suggestion:** Short term: use one label, "Start ideation", for the first run on every tab, and send it through the
  lock sheet in SS-3. Hide or disable Touch-up, Adjust and Impact until the first image exists, with the reason in the
  tab tooltip. Replace the dead Presets pill with "No presets yet. Use Quick actions to start." Longer term: a project
  stepper in the top bar (bigger change F).
- **Effort:** M (the label and pill changes are S).

### CC-5 · Concept, iteration, variant, version, master: the model's words are never defined (Medium)

- **Where:** The image grid (I1 and I2 badges, "4 images", concept chips), the Focus toolbar (Parent, Original, the
  Compare label "VARIANT"), Adjust ("Save as new version"), Compare captions, Production ("Latest", "Regenerate from
  master"), Video ("Before (leading)", "After (master)"), the audit ("iteration v6"), the report ("Concepts locked",
  "Approved concepts", "Final views"), the new-project form (process "Master Plan", scope "Master plan"), Studio
  Settings ("Master prompt").
- **What happens:** The same objects carry different names. One run is an "iteration": badges I1 and I2 have no
  tooltip or legend, Compare says "Iteration 2", and the audit says "iteration v6". Its outputs are "variants"
  ("Generating variant 2 of 2…"), "images" ("4 images", "1 images", "Images per batch") or a "version" ("Save as new
  version"). Concept chips show a bare number ("Concept A 4"). "Master" has five meanings: the process "Master Plan —
  Work linearly towards a defined outcome." sits directly above the scope "Master plan — Lay out a complete site" on
  the new-project form, so our sandbox is "a Conceptual Plan with the scope Master plan"; "Master prompt" is the text
  in front of every generation; "After (master)" is a video slot; "Regenerate from master" appears under the leading
  render image; and the audit draws lineage "Per locked master". "Master", "locked", "approved" and "final" name
  things no control sets (PR-3). The process chips promise that Conceptual Plan explores "multiple design variations
  in parallel" and Master Plan works "linearly", but inside a project nothing shows what the choice changed.
- **Why it matters:** People can't tell where an edit will land, which image is "the" design, or what Production and
  the report are counting. Each misunderstanding costs runs and time. The guide has to explain that "Edits add images,
  they don't replace them".
- **Evidence:** `explore/images/03-cp-hover-badge-i2.txt`, `explore/images/12-cp-compare-open.txt`,
  `explore/raw/6-04-raw.txt` ("iteration v6"), `tutorial/studio/img/5-09b-adjust-saved.webp`,
  `tutorial/studio/img/4-12-two-concepts.webp` ("Concept A 4", "1 images"),
  `tutorial/studio/img/7-01-video-images.webp`, `tutorial/studio/img/6-05-report-preview.webp`,
  `explore/entry/10-studio-home-after-open-studio.png` (process and scope), `explore/media-org/100-settings-top.txt`
  ("Master prompt"), `explore/entry/65-details-dropdown-process.png`, `tutorial/studio/chapters/05-refine.js`
- **Suggestion:** Choose one model and name it on screen: Project → Concept (a timeline) → Iteration (one run: I1,
  I2…) → Images. Rename "Save as new version" to "Save as new image (I5)", and use "I" in the audit too. Give the
  badge a tooltip ("Iteration 2 of Concept A · Quick actions: Dusk, Greenery 2 of 3, Water feature · 2 Oct 20:12") and
  label chips "Concept A · 4 images". Rename the scope chips "Whole site" and "Single building or lot", and the master
  prompt "Base prompt". Keep "master" only for the image a team approves (PR-3). Add a "?" beside IMAGES that opens a
  short glossary with a small diagram.
- **Effort:** S

---

## Appendix A — Excluded observations

We removed these because they came from our test setup, the captures did not support them, they could not be checked
without clicking something we chose not to click, or they were a matter of taste.

**Caused by our test environment**

- **Silent stalls and late clicks:** for about 15 minutes card menus didn't open and search didn't filter; one tab
  showed "You've been inactive for a while. Tap to reconnect." right after loading; dialogs and dropdowns stayed in
  the page 1–2 s after Cancel or Escape; Escape sometimes needed several presses; the Details tab took over 4 s to
  fill; the Video button was ignored up to four times and the image picker took 5–8 s to open. All of this happened
  while several automated sessions shared one account over a proxy that was dropping connections, and an earlier run
  saw normal behaviour.
- **Tooltips lingering or showing two texts at once** (Studio Settings info icons, Upscale's Target size, "Move panel
  to the right side" staying up over Collapse menu): seen only when our scripts hovered in quick succession. The
  single-tooltip captures (`explore/quick/63-settings-info-05` to `07`) show one tooltip each.
- **The Classic (no AI) video engine failing twice within 8 s:** probably our headless browser, which may lack the
  codecs Classic needs. The Kling 2.6 run worked. The error messaging is kept as PR-13.
- **The panel position syncing live across windows, and grid views changing for "other users":** we saw this only
  because several of our agents were signed in to one account at once. The part that affects one user (the grid view
  carries across projects) is kept in RE-12.
- **Site thumbnail actions in Project settings > Site staying invisible on hover:** seen only in our headless browser.
  The upload-card case is kept in NA-18 because the CSS hides those actions on devices without hover.
- **Land-use swatches without tooltips:** they have native `title` attributes, which headless capture doesn't show.
- **The sticky top bar covering headings in the Report builder:** only when our script scrolled headings into view.
- **The Compare window's close × off-centre, and the panel narrowing by about 15 px when its scrollbar appears:**
  found by our capture tool's box measurements, with no visible effect in use.
- **The Target deadline field asking for "mm/dd/yyyy":** a native date field, which follows the browser's locale; our
  test browser was set to en-US.

**Not supported by the evidence, or not checked**

- **"Clicking the logo from a project page does nothing":** the click landed on the backdrop of a dialog the previous
  step had opened. The verified click from Studio home is kept in NA-4.
- **"Clicking the project-name breadcrumb from Production does nothing":** the capture shows it opens Project
  settings. That is reported in NA-6.
- **Favorites in Timeline view changing nothing:** probably a click that didn't register; the dedicated captures show
  the filter working.
- **Generation with an empty saved boundary behaving as if no boundary were set:** this would need a controlled AI
  test. SS-1 reports only what we saw.
- **An older project pairing a European aerial (I1) with desert variants (I2):** we did not make that project and
  can't see what changed between its runs.
- **The eye-level view showing five storeys and more for "two- to three-storey townhouses":** one generation. Model
  variance can't be judged from a single sample. The interface side, density chips that hide their storeys, is kept in
  ID-6.
- **The Master Plan report dated 2 October while its library snapshot says 28 September:** the project is a numbered
  copy and may really have been created on 2 October.
- **Deleting an upload can't be undone:** Delete was never clicked. Delete is offered only on unused uploads.
- **The Map scale info icon not reachable by keyboard, and Focus Area photo markers without names:** no capture
  records the first, and the second is only indirectly evidenced (no markers appeared in the area we tried).
- **Other projects' drawings in a project's picker crossing permission boundaries:** we had only the owner account,
  and the picker says "Choose an image from this Studio". The clutter is kept in NA-11.
- **RECENT PROMPTS having no entry for the Green streets concept:** we don't know whether New concept is meant to
  record a prompt.
- **Where finished videos and upscales appear across Studio:** inside a project they appear as cards on the Video and
  Upscale pages (plates 7-03 and 7-06). Whether they also appear on the Studio-level pages we did not check.

**Not tested, because we did not click**

- Whether Build all missing, Build PDF, Render pack or Refresh ask for confirmation or spend credits, and what the
  PDF's Approved concepts section contains. CC-2 and PR-3 claim only what the page shows before the click.
- Whether Save land-use plan or Recalculate land uses spends credits.
- What Duplicate, New project, the card's Report, Send to production and Regenerate from master do or cost.
- Whether staged chips go with the run when Add > "+ your own" jumps to the Prompt tab; whether Output quality and
  Output format are saved to the project; what Save as planning preset bundles.
- What happens when Clear boundary or View boundary is clicked while an editor is open.

**A matter of taste or design choice**

- One Undo removing a whole closed polygon: treating the closed shape as one step is reasonable. The real problem, a
  single corner that can't be corrected, is SS-7.
- Video panel choices (engine, preset, prompt) resetting after a reload: an unsent form; nothing was lost.
- "Regenerate (overwrites)" replacing an edited video: the button says so.
- No stored-camera feature in Production, judged on its own: nothing in the interface promises it. The website does,
  which is CC-1.
- The Actions panel reading "Land use plan: Not set" when the leading image is a land-use plan: a plan is not set
  until someone marks it. The hidden "Mark as land-use plan" action is used in bigger change A.
- Long project names wrapping, so Recent projects cards differ in height.
- The mood board name placeholder "e.g. Industrial loft".
