/* CoPlanAI Studio guide: Chapter 4: Generate design options. */
/*
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 * Every box, cursor point and zoom comes from the capture JSON written by tools/capture.js
 * (flow: tools/flows/04-ideation.js), and was checked on the debug image. Two composites, both
 * built only from JSON values: the panel cards on 4-02 to 4-06 measured about 15 px narrower than
 * they appear on the plates, so their highlights take x/w from the tray and Apply to current boxes
 * measured in the same panel column (x 0.0032, w 0.1789; 4-01, 4-06, 4-09) and keep the card's own
 * y/h; the Apply boxes on 4-01 and 4-09 are the Apply-plus-caption union measured on 4-06 (same panel
 * layout, same button position).
 * Prompt text quoted for Density, Creativity, Render Style, Scene, Greenery, Add and Required
 * elements is the default Studio Settings text (explore/quick/60-settings-top.txt).
 */
window.COPLAN_TUTORIAL.chapters.push({
  id: "ideation",
  title: "Generate *design options*",
  summary: "Set up a generation in Quick actions, from density and render style to the facilities the plan must include, run it, read the results, build on one image and start a second concept.",
  steps: [
    {
      id: "ideation-quick",
      title: "Open Quick actions",
      lead: "With the site ready (see <a href='#site'>Prepare the site</a>), you set up your first generation in the Ideation workspace. Our example is <strong>Downtown plan (Studio tutorial demo)</strong>, a Conceptual Plan with the scope <strong>Master plan</strong>, started from a downtown land-use plan.",
      image: "img/4-01-quick-actions.webp",
      url: "coplanai.ikonai.app",
      alt: "The example project in Ideation with the Quick actions tab open: the Scope card with Master plan selected, then the Density, Creativity and Render Style cards, and a greyed-out Apply to current button. On the right, the downtown land-use plan with the pill Use the quick actions to start ideating.",
      note: {
        kind: "warning",
        title: "Check the defaults for your region first",
        html: "Studio's default configuration is written for the Gulf. The master prompt that opens every generation describes a parcel in Dubai, in a hot-arid desert setting, and the default required elements include a Community mosque and a Majlis. Our US-style downtown came out as a desert city with a lake, as you'll see in the results. If your projects are elsewhere, ask whoever manages Studio Settings to adapt them before you generate: see <a href='#org-settings-ideation'>Ideation options and the master prompt</a>."
      },
      beats: [
        {
          html: "Click the lightning icon, the second of the icon tabs, to open Quick actions. Hover any tab to see its name.",
          highlight: { box: [0.0296, 0.1621, 0.0286, 0.0463], label: "Quick actions" },
          cursor: { at: [0.0439, 0.1853], click: true },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "In a project without images, the pill on the plan reads <strong>Use the quick actions to start ideating</strong>. The cards in this tab set up the first generation.",
          highlight: { box: [0.5332, 0.0968, 0.1331, 0.0285], label: "Hint" },
          zoom: [0.3914, 0, 0.4167, 0.4167]
        },
        {
          html: "<strong>Scope</strong> decides whether generations lay out the whole site (<strong>Master plan</strong>) or a single building on its parcel (<strong>Single building or lot</strong>). It applies to every following generation and is saved to the project as soon as you click. <strong>Single building or lot</strong> also removes the <strong>Density</strong> and Required elements cards.",
          highlight: { box: [0.0111, 0.2347, 0.1394, 0.0969], label: "Scope" },
          zoom: [0, 0.0748, 0.4167, 0.4167]
        },
        {
          html: "Most other cards only stage a change: nothing is generated until you click <strong>Apply to current</strong>, which stays grey until something is staged. <strong>Each run generates 2 variant(s)</strong>.",
          highlight: { box: [0.0032, 0.9211, 0.1789, 0.0768], label: "Apply to current" },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "ideation-density",
      title: "Set density and creativity",
      lead: "Each option in Quick actions adds a phrase to the brief that Studio turns into the prompt for the image model. The phrases quoted below are Studio's defaults, set in Studio Settings.",
      image: "img/4-02-density-creativity.webp",
      url: "coplanai.ikonai.app",
      alt: "Quick actions with the Scope card, Master plan selected, at the top, then Medium-high selected under Density, Balanced under Creativity and the start of the Render Style card. At the bottom of the panel, the PENDING tray lists Density: Medium-high and Creativity: Balanced above a green Apply to current button. The land-use plan, with the pill Use the quick actions to start ideating, fills the right of the screen.",
      note: {
        kind: "tip",
        title: "Need taller buildings?",
        html: "The bands stop at five storeys. The building types behind them are set in Studio Settings and can be rewritten for your context: see <a href='#org-settings-density'>Descriptors, density and required elements</a>."
      },
      beats: [
        {
          html: "<strong>Density</strong> tells the model what kind of buildings to fill the site with. <strong>Low</strong> asks for &ldquo;large detached villas of one to two storeys on wide, generously spaced plots&rdquo;, <strong>Medium</strong> for two-storey detached and semi-detached villas, and <strong>High</strong> for &ldquo;three- to five-storey apartment blocks with structured or podium parking&rdquo;. We chose <strong>Medium-high</strong>: &ldquo;two- to three-storey townhouses in continuous terraced rows on compact plots, narrow setbacks and higher coverage&rdquo;.",
          highlight: { box: [0.0032, 0.3453, 0.1789, 0.1831], label: "Density" },
          cursor: { at: [0.1131, 0.4368], click: true },
          zoom: [0, 0.2285, 0.4167, 0.4167]
        },
        {
          html: "<strong>Creativity</strong> sets how freely the model interprets the brief. <strong>Conservative</strong> stays &ldquo;close to conventional solutions&rdquo;; <strong>Exploratory</strong> favours &ldquo;bold unconventional ideas within the constraints&rdquo;. We chose <strong>Balanced</strong>: &ldquo;recognisable logic plus a few distinctive moves&rdquo;.",
          cursor: { at: [0.094, 0.6395], click: true },
          zoom: [0, 0.4204, 0.4167, 0.4167]
        },
        {
          html: "Each choice lands as a chip in the <strong>PENDING</strong> tray above the button, here <strong>Density: Medium-high</strong> and <strong>Creativity: Balanced</strong>, and <strong>Apply to current</strong> turns green."
        }
      ]
    },
    {
      id: "ideation-style",
      title: "Choose a render style and references",
      lead: "Next, decide how the images should look, and whether to show the model some pictures of the materials and atmosphere you have in mind.",
      image: "img/4-03-style-references.webp",
      url: "coplanai.ikonai.app",
      alt: "Quick actions scrolled down: the Render Style card with Illustrative selected, and the Reference Images card with the Use for next generation switch on, 0 selected · up to 5 used, a Drop or add area and a Choose from uploaded images button. The PENDING tray now lists three chips.",
      beats: [
        {
          html: "<strong>Render Style</strong> sets the look of the images. <strong>Massing</strong> gives &ldquo;a clean conceptual massing model&rdquo; of simple blocks, <strong>Sketch</strong> &ldquo;a loose hand-drawn concept sketch&rdquo; and <strong>Photoreal</strong> &ldquo;a photorealistic architectural visualization&rdquo;. We chose <strong>Illustrative</strong>: &ldquo;a polished architectural illustration — stylised but clear, flat clean colour and crisp edges&rdquo;. Pick another style and it replaces the chip in the tray.",
          highlight: { box: [0.0032, 0.2426, 0.1789, 0.2048], label: "Render Style" },
          cursor: { at: [0.1184, 0.3558], click: true },
          zoom: [0, 0.1367, 0.4167, 0.4167]
        },
        {
          html: "<strong>Reference Images</strong> guide materials, palette and atmosphere. With <strong>Use for next generation</strong> switched on, the images you select go with the next run, as the counter says: <strong>0 selected · up to 5 used</strong>.",
          highlight: { box: [0.0032, 0.4453, 0.1789, 0.2689], label: "Reference Images" },
          zoom: [0, 0.3714, 0.4167, 0.4167]
        },
        {
          html: "Upload your own with <strong>Drop or add</strong>, or click <strong>Choose from uploaded images</strong> to reuse an image already uploaded to the project. We left references out of this example.",
          cursor: { at: [0.0926, 0.6732], click: false },
          zoom: [0, 0.3714, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "ideation-required",
      title: "Require facilities",
      lead: "<strong>Required elements</strong> are the facilities the plan must include, such as a school, a clinic or a park.",
      image: "img/4-04-required-elements.webp",
      url: "coplanai.ikonai.app",
      alt: "Quick actions scrolled to the Required elements card, headed applied to the next generation, below the end of the Reference Images card (Use for next generation, Drop or add, Choose from uploaded images): Public park and Transit stop are ticked among Community mosque, School, Health clinic, Local retail, Majlis, Sports & recreation and Children's play area, with Add other at the end, and both also appear in the PENDING tray. The land-use plan fills the right of the screen.",
      beats: [
        {
          html: "Click an element to require it: its + turns into a tick. We required <strong>Public park</strong> and <strong>Transit stop</strong>, which ask for &ldquo;a public park and open landscaped green&rdquo; and &ldquo;a public-transport stop with a shelter canopy&rdquo;.",
          highlight: { box: [0.0032, 0.4132, 0.1789, 0.3073], label: "Required elements" },
          cursor: { at: [0.1295, 0.6489], click: true },
          zoom: [0, 0.3532, 0.4273, 0.4273]
        },
        {
          html: "Unlike the cards above, these are saved to the project as soon as you click them, so they survive a reload, and a second click removes them. They are listed in the tray too, after the staged choices. As the card's header says, they are applied to the next generation: after the run they are cleared, so tick them again whenever a later run needs them.",
          highlight: { box: [0.0032, 0.4132, 0.1789, 0.3073], label: "Saved to the project" },
          zoom: [0, 0.405, 0.53, 0.53]
        },
        {
          html: "Missing something? <strong>Add other</strong> opens a small form for a one-off element for this project: a name, and the prompt fragment that describes it to the model.",
          highlight: { box: [0.0121, 0.6626, 0.0574, 0.04], label: "Add other" },
          cursor: { at: [0.0408, 0.6826], click: false },
          zoom: [0, 0.4742, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "ideation-scene",
      title: "Set the scene and add details",
      lead: "The next three cards set the time of day, turn areas such as greenery up or down, and add single elements to the scene.",
      image: "img/4-05-scene-adjust.webp",
      url: "coplanai.ikonai.app",
      alt: "Quick actions further down: Scene group 1 with Day selected, the Adjust card with a Greenery slider at its start, and the Add card with Water feature and People, People selected. The PENDING tray lists Day, + People, the density, creativity and render style chips, Public park and Transit stop.",
      note: {
        kind: "tip",
        title: "The tray lives in this browser tab",
        html: "Staged choices are lost when you reload the page. Scope and the aspect ratio stay saved to the project; required elements also survive a reload, until the next run uses them. Stage your choices and run them in one sitting."
      },
      beats: [
        {
          html: "<strong>Scene group 1</strong> sets the time of day, one option at a time. <strong>Day</strong> asks for &ldquo;bright, clear daytime light with a blue sky&rdquo;, <strong>Dusk</strong> for &ldquo;golden-hour dusk, warm low sun and long soft shadows&rdquo;, and <strong>Night</strong> for &ldquo;warm artificial lighting and illuminated facades and streets&rdquo;. We chose <strong>Day</strong>. <strong>+ your own scene group</strong> adds a set of options of your own to this project.",
          highlight: { box: [0.0032, 0.2479, 0.1789, 0.1221], label: "Scene" },
          cursor: { at: [0.0273, 0.3268], click: true },
          zoom: [0, 0.1006, 0.4167, 0.4167]
        },
        {
          html: "<strong>Adjust</strong> holds sliders. <strong>Greenery</strong> asks for &ldquo;generous lush greenery — street trees, planting and landscaped open space&rdquo;, at one of three levels of intensity; the round button on its right is Remove all Greenery. Left at its start, as here, the slider stages nothing. <strong>+ your own</strong> adds a slider of your own to this project.",
          highlight: { box: [0.0032, 0.41, 0.1789, 0.1389], label: "Adjust" },
          zoom: [0, 0.2711, 0.4167, 0.4167]
        },
        {
          html: "<strong>Add</strong> puts a single element into the scene: a <strong>Water feature</strong>, &ldquo;a designed water feature as a landscape focal point&rdquo;, or <strong>People</strong>, &ldquo;at plausible scale to convey liveliness and human scale&rdquo;. We added <strong>People</strong>. Its <strong>+ your own</strong> doesn't open a form: it takes you to the Prompt tab, where you describe the change in your own words (see <a href='#refine-prompt'>Describe a change in your own words</a>).",
          highlight: { box: [0.0032, 0.5489, 0.1789, 0.1243], label: "Add" },
          cursor: { at: [0.1077, 0.63], click: true },
          zoom: [0, 0.4027, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "ideation-run",
      title: "Check the tray, then run it",
      lead: "At the bottom of the tab are the output settings. Then read the tray through once more before you run it.",
      image: "img/4-06-output-pending.webp",
      url: "coplanai.ikonai.app",
      alt: "The bottom of Quick actions: Aspect Ratio set to 4:3 · Auto, Output quality 2K and Output format WebP, then the PENDING tray with seven chips (Day, + People, Density: Medium-high, Creativity: Balanced, Render style: Illustrative, Public park, Transit stop) and a Clear link, above the green Apply to current button and the line Each run generates 2 variant(s).",
      note: {
        kind: "warning",
        title: "The first run fixes the site",
        html: "Your first run fixes the boundary and the land-use plan for good, without asking. Check both on the Site tab first: see <a href='#site'>Prepare the site</a>."
      },
      beats: [
        {
          html: "Set the <strong>Aspect Ratio</strong> (here <strong>4:3 · Auto</strong>; the list runs from 21:9 to 9:16), the <strong>Output quality</strong> (1K, <strong>2K</strong> or 4K) and the <strong>Output format</strong> (<strong>WebP</strong>, PNG or JPG). Like Scope, the aspect ratio is saved to the project and doesn't go into the tray.",
          highlight: { box: [0.0032, 0.4216, 0.1789, 0.2489], label: "Output" },
          zoom: [0, 0.3377, 0.4167, 0.4167]
        },
        {
          html: "The <strong>PENDING</strong> tray lists what the next run will apply: the scene, People, the density, creativity and render style, and the two required elements. The number beside PENDING counts only the staged choices, not the required elements. Click &times; on a chip to drop it. <strong>Clear</strong> empties the tray, and also removes the required elements saved to the project.",
          highlight: { box: [0.0032, 0.6895, 0.1789, 0.2379], label: "PENDING" },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "When the tray says what you want, click <strong>Apply to current</strong>. It is a generation, so it uses credits: <strong>Each run generates 2 variant(s)</strong>, and every click starts a new run.",
          highlight: { box: [0.0032, 0.9211, 0.1789, 0.0768], label: "Apply to current" },
          cursor: { at: [0.0926, 0.9484], click: true },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "ideation-generating",
      title: "Wait for the run",
      lead: "The run starts straight away. You don't need to do anything while it runs.",
      image: "img/4-07-generating.webp",
      url: "coplanai.ikonai.app",
      alt: "The run in progress: the land-use plan is blurred, with a spinner and the words Composing prompt… in the middle. The panel's header reads Concept A, the PENDING tray has gone and Apply to current is greyed out.",
      beats: [
        {
          html: "The plan blurs and Studio shows <strong>Composing prompt…</strong> while it puts your choices together into one prompt for the image model."
        },
        {
          html: "Then it shows &ldquo;Generating variant 1 of 2…&rdquo;."
        },
        {
          html: "The panel's header now reads <strong>Concept A</strong>, your first concept. The tray is empty again and <strong>Apply to current</strong> is grey."
        },
        {
          html: "After about a minute Studio opens the first variant in Focus view, which <a href='#refine'>Review and refine</a> explains, while the second variant is still being generated: our first run took about three minutes in all. To see both variants, go back to the grid with All images, the grid icon at the top left of the panel; a variant still on its way shows a spinner there."
        }
      ]
    },
    {
      id: "ideation-results",
      title: "Read the first results",
      lead: "The grid shows the run's results. Here it is set to <strong>Latest</strong>, with <strong>Pair</strong> on.",
      image: "img/4-08-first-results.webp",
      url: "coplanai.ikonai.app",
      alt: "The image grid after the first run: two variants, each a wide tile with a top view of a desert city plan beside an eye-level street view, both marked I1. Above them, the buttons Select, Favorites, Pair, Single, Latest and Timeline; below, + New concept. The Actions panel is greyed out under the hint Choose or select the images you want to edit first.",
      note: {
        kind: "info",
        title: "Why the panel is greyed out",
        html: "In the grid, nothing is chosen to work on, so the panel says <strong>Choose or select the images you want to edit first.</strong> Open a variant, or select images, to use it again."
      },
      beats: [
        {
          html: "The run made two variants: two different designs from the same choices.",
          highlight: { box: [0.2079, 0.1474, 0.6674, 0.1958], label: "Two variants" },
          zoom: [0.1479, 0, 0.7874, 0.7874]
        },
        {
          html: "Each variant is a pair. On the left is the top view of the plan: click it to open the variant.",
          highlight: { box: [0.2079, 0.1474, 0.1705, 0.1958], label: "Top view" },
          cursor: { at: [0.2932, 0.2453], click: true },
          zoom: [0.0848, 0.037, 0.4167, 0.4167]
        },
        {
          html: "On the right is an eye-level view of the same design. It belongs to the variant and isn't counted as a separate image.",
          highlight: { box: [0.3726, 0.1474, 0.17, 0.1958], label: "Eye-level view" },
          zoom: [0.2493, 0.037, 0.4167, 0.4167]
        },
        {
          html: "The badge <strong>I1</strong> is the iteration number: both variants come from the first run.",
          highlight: { box: [0.5228, 0.3063, 0.0122, 0.0232], label: "Iteration 1" },
          zoom: [0.3206, 0.1096, 0.4167, 0.4167]
        },
        {
          html: "<strong>Latest</strong> shows each concept's newest iteration and <strong>Timeline</strong> all of them. <strong>Pair</strong> shows the eye-level views beside the top views; <strong>Single</strong> shows top views only. <strong>Select</strong> and <strong>Favorites</strong> are covered in <a href='#refine'>Review and refine</a>.",
          highlight: { box: [0.7162, 0.0811, 0.2643, 0.0505], label: "Views" },
          zoom: [0.5833, 0, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "ideation-iterate",
      title: "Build on one image",
      lead: "To develop a variant further, click it. It opens in Focus view as the image in focus, and whatever you stage now applies to it. We opened one of the two variants and went back to Quick actions.",
      image: "img/4-09-iterate.webp",
      url: "coplanai.ikonai.app",
      alt: "Focus view on the second variant of the first run, an illustrated top view of the desert city plan with a river and a park, with a toolbar along its bottom edge. In the panel headed Concept A, Dusk is selected, Greenery is at 2 of 3 and Water feature is selected; the PENDING tray lists Dusk, Greenery ↑↑ and + Water feature above a green Apply to current button.",
      note: {
        kind: "tip",
        title: "Change a little at a time",
        html: "Studio's own advice, in the Prompt tab, holds here too: &ldquo;small changes per generation give the most control.&rdquo; If a run goes wrong, you'll know which change caused it."
      },
      beats: [
        {
          html: "The panel's header names the concept the image belongs to: <strong>Concept A</strong>.",
          highlight: { box: [0.0032, 0.0563, 0.0544, 0.0379], label: "Image in focus" },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "Stage only what should change. We switched the scene to <strong>Dusk</strong>, moved <strong>Greenery</strong> to <strong>2 of 3</strong> and added a <strong>Water feature</strong>.",
          zoom: [0, 0.1511, 0.4778, 0.4778]
        },
        {
          html: "The tray holds just these three changes: <strong>Dusk</strong>, <strong>Greenery ↑↑</strong> and <strong>+ Water feature</strong>.",
          highlight: { box: [0.0032, 0.7905, 0.1789, 0.1369], label: "PENDING" },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "Click <strong>Apply to current</strong> to make the next iteration from the image in focus: two new variants, marked I2. Like the first run, it uses credits. We ran these three changes on the lakeside variant, the first of the pair, rather than the one shown here; ours took about two and a half minutes.",
          highlight: { box: [0.0032, 0.9211, 0.1789, 0.0768], label: "Apply to current" },
          cursor: { at: [0.0926, 0.9484], click: true },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "ideation-timeline",
      title: "Follow the Timeline",
      lead: "Back in the grid, switch from <strong>Latest</strong> to <strong>Timeline</strong> to see how the concept has developed, run by run.",
      image: "img/4-10-timeline.webp",
      url: "coplanai.ikonai.app",
      alt: "The image grid in Timeline view: four images in a row, the two on the left marked I2 (a lakeside plan at dusk and a close aerial of a fountain plaza), the two on the right marked I1. The toolbar shows Select, Favorites, Latest and Timeline, with Timeline selected.",
      beats: [
        {
          html: "Click <strong>Timeline</strong>.",
          highlight: { box: [0.8877, 0.0811, 0.0928, 0.0505], label: "Latest or Timeline" },
          cursor: { at: [0.9544, 0.1063], click: true },
          zoom: [0.5833, 0, 0.4167, 0.4167]
        },
        {
          html: "The newest iteration comes first: <strong>I2</strong>, the two variants made from the changes we staged, a lakeside plan at dusk and a close aerial of a fountain plaza.",
          highlight: { box: [0.2079, 0.1474, 0.3379, 0.1958], label: "Iteration 2" },
          zoom: [0.1479, 0.0164, 0.4579, 0.4579]
        },
        {
          html: "Then <strong>I1</strong>, the first run. Timeline shows top views only: the Pair and Single switch is offered in <strong>Latest</strong> alone.",
          highlight: { box: [0.5447, 0.1474, 0.3379, 0.1958], label: "Iteration 1" },
          zoom: [0.4847, 0.0164, 0.4579, 0.4579]
        }
      ]
    },
    {
      id: "ideation-new-concept",
      title: "Start a new concept",
      lead: "Iterations refine one idea. To try another approach alongside it, click <strong>New concept</strong> under the images. As the dialog puts it, &ldquo;A concept is a separate timeline for testing another approach.&rdquo;",
      image: "img/4-11-new-concept.webp",
      url: "coplanai.ikonai.app",
      alt: "The New concept dialog over the dimmed grid: a short explanation, Concept name filled in with Green streets, SCENE with Day selected, AREAS with Greenery, ADD with Water feature and People, People selected, the line The first image generates with these changes, and a green Create concept button.",
      beats: [
        {
          html: "Give it a <strong>Concept name</strong> that says what sets it apart. Ours is <strong>Green streets</strong>.",
          highlight: { box: [0.3332, 0.3926, 0.3315, 0.0348], label: "Concept name" },
          zoom: [0.2732, 0.1843, 0.4515, 0.4515]
        },
        {
          html: "Pick the changes it starts from, under <strong>SCENE</strong>, <strong>AREAS</strong> and <strong>ADD</strong>. We chose <strong>Day</strong> and <strong>People</strong>. With nothing picked, the dialog says instead: &ldquo;Without changes, the first image starts from the project defaults.&rdquo;",
          highlight: { box: [0.3332, 0.4316, 0.3315, 0.2263], label: "What sets it apart" },
          zoom: [0.2732, 0.319, 0.4515, 0.4515]
        },
        {
          html: "Click <strong>Create concept</strong>. It starts generating the concept's first image straight away and uses credits like any other run.",
          highlight: { box: [0.5849, 0.6621, 0.0819, 0.0547], label: "Create concept" },
          cursor: { at: [0.6259, 0.6895], click: true },
          zoom: [0.4175, 0.4811, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "ideation-concepts",
      title: "Compare your concepts",
      lead: "Each concept has its own timeline under its own heading. Here the grid is in <strong>Latest</strong> with <strong>Single</strong> on, so you see the newest top views of each concept.",
      image: "img/4-12-two-concepts.webp",
      url: "coplanai.ikonai.app",
      alt: "The image grid with two concepts: chips Concept A 4 and Green streets 1 at the top, then the heading Concept A 4 images with two top views marked I2, and the heading Green streets 1 images with one top view marked I1. In the toolbar, Single and Latest are selected.",
      beats: [
        {
          html: "A chip for each concept shows its name and how many images it holds: <strong>Concept A 4</strong> and <strong>Green streets 1</strong>. Click a chip to show only that concept.",
          highlight: { box: [0.2074, 0.0747, 0.1303, 0.0432], label: "Concepts" },
          cursor: { at: [0.3016, 0.0963], click: false },
          zoom: [0.0642, 0, 0.4167, 0.4167]
        },
        {
          html: "<strong>Green streets</strong> starts with its first image, <strong>I1</strong>. The pencil beside a concept's heading renames it, so you can give Concept A a name that says what it is too.",
          highlight: { box: [0.2074, 0.42, 0.1045, 0.0368], label: "Green streets" },
          zoom: [0.0513, 0.2301, 0.4167, 0.4167]
        },
        {
          html: "<strong>Single</strong> shows only the top views, as here; <strong>Pair</strong> adds the eye-level views beside them. Our Green streets came back with a top view only, so in Pair its eye-level slot stays empty, as the next screenshot shows.",
          highlight: { box: [0.8118, 0.1242, 0.077, 0.0505], label: "Pair or Single" },
          cursor: { at: [0.8665, 0.1495], click: false },
          zoom: [0.5833, 0, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "ideation-presets",
      title: "Start from a planning preset",
      lead: "The third tab lists your organisation's <strong>Planning presets</strong>, which its info tooltip describes as &ldquo;a bundle of settings and quick actions applied all at once&rdquo;; <a href='#org-planning-presets'>Bundle a planning preset</a> shows what goes into one, including the layout geometry that Quick actions can't set.",
      image: "img/4-13-presets.webp",
      url: "coplanai.ikonai.app",
      alt: "The Presets tab of the Actions panel: the heading Planning presets with an info icon and a +, the message No planning presets for this plan type yet. and a New planning preset button. On the right, the grid in Latest and Pair view: Concept A's two I2 variants, and Green streets' one top view beside an empty eye-level slot.",
      beats: [
        {
          html: "Click the compass icon, the third tab.",
          highlight: { box: [0.054, 0.1621, 0.0285, 0.0463], label: "Presets" },
          cursor: { at: [0.0683, 0.1853], click: true },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "Until your organisation has a preset for this kind of project, the tab says <strong>No planning presets for this plan type yet.</strong> and offers a <strong>New planning preset</strong> button.",
          highlight: { box: [0.0194, 0.3063, 0.1465, 0.0284], label: "No presets yet" },
          zoom: [0, 0.1122, 0.4167, 0.4167]
        },
        {
          html: "The bookmark icon at the top of the panel is Save as planning preset: hover it to see its name.",
          highlight: { box: [0.1358, 0.1074, 0.0253, 0.0505], label: "Save as planning preset" },
          cursor: { at: [0.1484, 0.1326], click: false },
          zoom: [0, 0, 0.4167, 0.4167]
        }
      ]
    }
  ]
});
