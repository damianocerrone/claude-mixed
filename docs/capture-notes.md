# Capture notes: what happened in the sandbox

Observed on 2 October 2026 while taking the plates for chapters 3 to 7 in **"Downtown plan (Studio tutorial demo)"**
(Conceptual Plan, scope Master plan). Raw screenshots and page text for every step are in `explore/raw/`; the plates
and their measured boxes are in `tutorial/studio/img/` (`.webp` + `.json`); boxes drawn on each plate are in
`explore/debug/`. Flow scripts: `tools/flows/03-site.js` … `07-media.js`.

These are facts for the chapter writers and for the UX review. Anything marked **bug** or **quirk** goes to the
review, not into the guide's instructions (the guide may add a tip that helps people around it).

## Chapter 3 · Site

- A new project opens in Ideation on the **Site** tab. Pill on the image: "Start ideation from the Site tab when ready".
- **Draw boundary** opens "Set the site boundary — Draw a closed line around the site on the leading image —
  generations design inside it and keep everything outside as existing context." Pill: "Draw a closed line around the
  site to set its boundary". Tools along the bottom: Undo, Redo, Zoom out, Zoom in, Straight line, Freehand line,
  Eraser, Outline (closes itself), Polygon (click corners, close on the first point), Thin/Thick stroke, six colours,
  and **Back** at the far right. **Save boundary** replaces Start ideation at the bottom of the panel. (3-02)
- Polygon: click each corner; orange segments join them; click the first point to close. (3-03, 3-04)
- After **Save boundary** the Site tab shows "● Set" with Redraw boundary, Clear boundary, Hide site boundary,
  View boundary. (3-05)
- **Bug:** View boundary showed the plain leading image without the drawn line, although the status said Set (see
  `explore/raw/3-05b-view-boundary.png` vs the closed polygon in 3-04). The site explorer saw the same five times;
  the saved image is the hidden second canvas without strokes. The guide can tell people to check their line with
  View boundary.
- **Plan land use** opens "Plan land use — Colour the site by land use on the leading image — each colour comes from
  the standard and tells generation what belongs where." Swatches: Residential, Commercial, Mixed use, Industrial,
  Public facilities, Open space, Water, Transport & roads, Community facilities. Tools: Freehand, Fill outline, Fill
  polygon, Eraser, strokes. (3-06) Painting enables **Recalculate land uses**. (3-07)
- **Save land-use plan** leads to a review screen: "Land-use plan recognised — Review the land uses read from the
  plan's colours. Generations follow this zoning until the plan is unmarked." Buttons **Draw land use** and
  **Continue as land use**. RECOGNISED LAND USES with percentages, and the warning "Many areas didn't match the standard
  colours — results may be unreliable." (3-08)
- After **Continue as land use** the Site tab shows Land use plan "Set", Review land use, Unmark plan, Hide land use
  plan, RECOGNISED LAND USES and View plan. (3-09)
- **Quirk:** recognition read colours already printed on the leading image (it listed Water 7.7% and Transport &
  roads 5.9%, neither painted) and left out the painted Commercial zone. The default colour standard flags Commercial
  (#E53935) "Too close to the red boundary marker" (3-10), which is the likely reason.
- The icon beside COLOUR LEGEND ("Edit colours in project settings") opens Project settings at the Land-use colour
  standard, named "Dubai land use" by default; its Save button is at the bottom of the dialog. (3-10)
- Once the first generation has run, the boundary and land-use plan are fixed (Draw/Redraw/Clear and Plan land use
  disappear; "The boundary is fixed once generation has started."). Start ideation gives no warning about this.

## Chapter 4 · Ideation

- Quick actions tab (lightning). In an empty project the pill reads "Use the quick actions to start ideating". (4-01)
- Density, Creativity and Render Style chips each add a chip to the **PENDING · N** tray above the bottom button
  (e.g. "Density: Medium-high"). (4-02, 4-03)
- Reference Images: "Use for next generation" switch, "0 selected · up to 5 used", Drop or add, Choose from uploaded
  images. (4-03)
- **Required elements** ("· applied to the next generation") are saved to the project as soon as you click them; a
  second click removes them. Defaults include Community mosque, Majlis, School, Health clinic, Local retail, Public
  park, Sports & recreation, Children's play area, Transit stop, plus Add other. (4-04)
- Scene group 1 (Day, Dusk, Night; one at a time), Adjust > Greenery (a 3-step slider, "2 of 3"), Add > Water
  feature, People; Aspect Ratio "4:3 · Auto", Output quality "2K", Output format "WebP". (4-05, 4-06)
- **Apply to current** turns green once something is pending; "Each run generates 2 variant(s)". **Clear** in the tray
  also removes the saved required elements. The tray is lost if the page is reloaded.
- First run (Medium-high, Balanced, Illustrative, Public park, Transit stop, Day, People): "Composing prompt…" then
  "Generating variant 1 of 2…" over the blurred site image, about 75–100 s. It ends in Focus view on the first variant.
  (4-07 shows the progress overlay)
- Grid, **Latest + Pair**: each variant is a top view next to an eye-level view, badge "I1". With one concept there
  are no concept chips or headings. (4-08)
- To iterate: open a variant (it becomes the image in focus; the panel header reads "Concept A"), stage changes
  (Dusk, Water feature, Greenery 2 of 3), **Apply to current**: iteration 2, two variants, about 2.5 min. (4-09)
- **Timeline** shows every iteration newest first (I2 above I1), top views only. (4-10)
- **+ New concept** opens "New concept — A concept is a separate timeline for testing another approach. Pick the
  changes that set it apart — they generate its first image." Concept name, SCENE, AREAS (Greenery), ADD (Water
  feature, People); "Without changes, the first image starts from the project defaults."; **Create concept**. (4-11)
- **Quirk/bug:** the new concept "Green streets" got 1 image ("1 images") and no eye-level view (empty slot, not a
  button). 4-12 is therefore taken in **Single** view; concept chips "Concept A 4" / "Green streets 1" filter the grid.
- Presets tab: "No planning presets for this plan type yet." + New planning preset; the bookmark icon at the top of
  the panel is "Save as planning preset". (4-13)
- The generated plans look like a desert city with a lake, for a US-style downtown: the default configuration is
  Dubai-oriented (colour standard "Dubai land use", required elements Community mosque, Majlis).

## Chapter 5 · Refine (all on Concept A's lakeside plan, iteration 1)

- Focus view: panel header "Concept A", **All images** (grid icon) to go back, the floating toolbar: Prompt, Zoom
  out, 100%, Zoom in, Mark region, Show site boundary, Eye-level, Top & eye-level, Parent, Original, Compare, Mark as
  favorite, Download, Fullscreen, Regenerate. (5-01)
- **Top & eye-level** shows TOP VIEW and EYE-LEVEL side by side. (5-02)
- **Compare**: a slider with ‹ ORIGINAL on the left and VARIANT › on the right. (5-03)
- The toolbar's **Prompt** bubble shows the prompt strip (the composed prompt text, a copy icon and a reuse icon). (5-04)
- Favourites: the heart on a tile ("Mark as favorite" → "Unmark from favorites"); **Favorites** filters the grid.
  Favourites made here: the fountain aerial (Concept A, I2) and the Green streets plan. (5-05)
- **Select**: a "+" on each tile, "N selected", bulk bar Add to favorites, Remove from favorites, Compare, Download,
  Send to production, Select all; the panel button becomes "Apply to 2 selected". (5-06) **Compare** opens the two
  images side by side, captioned "Iteration 2". (5-07)
- **Touch-up**: "Mask a region, then apply"; Polygon tool; red outline over the central blocks; Instruction "Turn
  these blocks into a tree-lined central square with cafés and a small market hall."; **Apply to mask** (2 variants;
  the run took about 5 min). (5-08)
- **Adjust**: Adjust | Filters; the **Golden** filter; "Preview is approximate — the final image is rendered on save.";
  **Save as new version** finished in seconds and opened the new version captioned "Filter: Golden · Brightness +5 ·
  Contrast +10 · Saturation +15 · Warmth +45" (one image, iteration 5). (5-09, 5-09b)
- **Prompt** tab: "Describe a change or a new concept…" with "Add a light-rail line along the main avenue, with a stop
  on the central square."; help "Start with a short baseline prompt, then iterate — small changes per generation give
  the most control."; Save as quick action; RECENT PROMPTS; **Generate** (2 variants, about 3 min). (5-10)
- **Impact**: "Ask about an impact", chips Traffic, Heat & shade, Walkability, "Indicative AI assessment — not a
  professional or regulatory evaluation.", **Analyse** (about 15 s). (5-11) The answer repeats the question, gives a
  summary, then factors marked as positive (Compact grid, Waterfront access) or as concerns (Perimeter barriers). The
  answer was still there when the image was reopened. (5-12) **Quirk:** the caption under Analyse still says "Each
  run generates 2 variant(s)".
- After these runs Concept A has 11 images: I1 (2), I2 (2), I3 (2), I4 (2), I5 (1, Golden), I6 (2, light rail).
  **Open question:** I3 and I4 both appeared during the single Touch-up run (check the Audit log).

## Chapter 6 · Production

- Production → "Render set", "2 concepts · 0 of 24 renders complete"; each concept's latest iteration as the leading
  tile tagged "Latest" ("Concept A · I6"), then 12 tiles per concept (Aerial, Eye-level, Plan, Section × Day, Dusk,
  Night), each with **Build**; top buttons Video, Image Upscale, Report builder, Settings, Build all missing. (6-01)
- Render settings: "Pick which views to render, output quality and the export naming pattern." Views, Scene states,
  Deliverable medium (Photoreal; "Concepts drawn in another medium are realized into this medium once before
  rendering."), Output quality 2K (Resolution 2048px · Auto), Format PNG/WebP/JPG, Export file naming
  "{project}_{concept}_{view}_{state}"; Cancel / Save settings. (6-02, cancelled)
- Built Aerial · Day and Eye-level · Day for Concept A (see 6-03). A built tile offers "Regenerate from master".
