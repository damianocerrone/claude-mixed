/* CoPlanAI Studio guide: Chapter 5: Review and refine. */
/*
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 * Every box, cursor point and zoom comes from the capture JSON written by tools/capture.js
 * (flow: tools/flows/05-refine.js), and was checked on the debug image. Where several beats of a step share
 * one zoom (so the camera holds still), it is the JSON zoom of one of the step's highlights ("parent" in
 * refine-compare) or a widened one. Widened JSON zooms keep w === h and the JSON box inside:
 * refine-views uses "both" widened to [0.37, 0.55, 0.45, 0.45] so the TOP VIEW and EYE-LEVEL pills fit,
 * refine-prompt-used uses "prompt" widened to [0.2414, 0.5, 0.5, 0.5] so the prompt strip fits, and the
 * bulk-bar beat of refine-select uses "compare" widened to [0.199, 0, 0.45, 0.45] so the whole bar fits
 * (its highlight, the JSON "bar" box, covers Send to production and Select all only). The 5-12 "summary"
 * box was clipped at the viewport edge, so refine-impact-answer keeps its zoom but not its highlight; the
 * 5-07 close point sat off the X glyph, so refine-compare-side keeps the close box but not the cursor.
 * <strong> marks labels printed on the step's own plate; <em> marks names that are only tooltips or
 * off the plate. Facts not visible on a plate come from docs/capture-notes.md, explore/raw/5-*.txt,
 * explore/raw/6-04-raw.txt (report builder) and explore/map.json (images and edit-tabs areas).
 */
window.COPLAN_TUTORIAL.chapters.push({
  id: "refine",
  title: "Review and *refine*",
  summary: "Look closely at your design options, compare them, keep the best, then refine one with Touch-up, Adjust or your own prompt, and ask about its likely impact.",
  steps: [
    {
      id: "refine-focus",
      title: "Open an image in Focus view",
      lead: "Click an image in the grid to open it in Focus view. It fills the stage, and the toolbar and the Touch-up, Adjust, Prompt and Impact tabs work on it. In our example project, <strong>Downtown plan (Studio tutorial demo)</strong>, we opened the lakeside plan from Concept A's first run.",
      image: "img/5-01-focus-view.webp",
      url: "coplanai.ikonai.app",
      alt: "Focus view on one of Concept A's variants: an illustrated top view of a lakeside downtown with a park, a marina, blocks of buildings and a copy of the plan's legend. The panel on the left is headed Concept A and shows Quick actions; a dark toolbar floats along the bottom of the image.",
      note: {
        kind: "info",
        title: "Open one image for the edit tabs",
        html: "Touch-up, Adjust, Prompt and Impact work only on the image open in Focus view. In the grid they ask you to choose one first, for example &ldquo;Choose the image you want to draw on first.&rdquo;, even if you have ticked images in Select mode. Quick actions is the only tab that also works on a selection."
      },
      beats: [
        {
          html: "The panel's header names the concept the image belongs to: <strong>Concept A</strong>. Whatever you set in the panel now applies to this image.",
          highlight: { box: [0.0032, 0.0563, 0.0544, 0.0379], label: "Concept A" },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "Along the bottom of the image runs its toolbar: hover an icon to see its name. Just left of the highlighted group is the speech bubble, <em>Prompt</em>; then come <em>Zoom out</em>, <strong>100%</strong> and <em>Zoom in</em>, then <em>Mark region</em> and <em>Show site boundary</em>, which lays your site boundary over the image.",
          highlight: { box: [0.4618, 0.9126, 0.289, 0.0463], label: "Image toolbar" },
          zoom: [0.3979, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "The middle buttons change what you see, as the next steps show. Then come <em>Mark as favorite</em> (the heart), <em>Download</em> and <em>Fullscreen</em>. <em>Regenerate</em>, at the far right, runs this image again: that's a new generation, and it uses credits.",
          highlight: { box: [0.4618, 0.9126, 0.289, 0.0463], label: "Image toolbar" },
          zoom: [0.3979, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "To step to the concept's next or previous image, click just inside the right or left edge of the stage, halfway down. The arrows there, <em>Next image</em> and <em>Previous image</em>, stay invisible until you have used one, and the keyboard's arrow keys don't move between images."
        },
        {
          html: "To go back to the grid, click <em>All images</em>, the grid icon at the top left of the panel. Escape doesn't close Focus view.",
          highlight: { box: [0.0032, 0.1074, 0.0252, 0.0505], label: "All images" },
          cursor: { at: [0.0158, 0.1326], click: false },
          zoom: [0, 0, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "refine-views",
      title: "Put the eye-level view beside it",
      lead: "In a Conceptual Plan or Master Plan, a variant normally comes with an eye-level view of the same design (our Green streets image came without one). Two toolbar buttons bring it up.",
      image: "img/5-02-top-eye-level.webp",
      url: "coplanai.ikonai.app",
      alt: "Focus view in Top & eye-level mode: on the left the top view of the lakeside plan, labelled TOP VIEW, and on the right an eye-level street view, labelled EYE-LEVEL, looking down a tree-lined street between apartment blocks towards a lake with a footbridge. The Top & eye-level button is highlighted in the toolbar.",
      note: {
        kind: "info",
        title: "Not in Focus Area projects",
        html: "A Focus Area project redesigns a single street photo, so its variants have no eye-level view and these two buttons aren't in its toolbar."
      },
      beats: [
        {
          html: "<em>Eye-level</em>, the second eye icon, swaps the top view for the eye-level view. While it's on, the same button reads <em>Top view</em>: click it to swap back.",
          highlight: { box: [0.5729, 0.9126, 0.0232, 0.0463], label: "Eye-level" },
          zoom: [0.37, 0.55, 0.45, 0.45]
        },
        {
          html: "<em>Top & eye-level</em>, next to it, shows both side by side, labelled <strong>TOP VIEW</strong> and <strong>EYE-LEVEL</strong>. Click it again to go back to the top view alone.",
          highlight: { box: [0.5908, 0.9126, 0.0231, 0.0463], label: "Top & eye-level" },
          cursor: { at: [0.6024, 0.9358], click: true },
          zoom: [0.37, 0.55, 0.45, 0.45]
        },
        {
          html: "Read the two together, and against your brief. We asked for Medium-high density, &ldquo;two- to three-storey townhouses&rdquo;, yet this street is lined with blocks of five storeys and more. A mismatch like this is worth a note before you take the option further."
        }
      ]
    },
    {
      id: "refine-compare",
      title: "Compare it with the original",
      lead: "Three more toolbar buttons show the variant against the image it came from.",
      image: "img/5-03-compare.webp",
      url: "coplanai.ikonai.app",
      alt: "Focus view in Compare mode: a vertical slider splits the stage, with the original land-use plan, a zoning map with a red dashed boundary and labels such as MU-1 and MU-2, on the left under ORIGINAL, and the generated lakeside plan on the right under VARIANT. The Compare button is highlighted in the toolbar.",
      note: {
        kind: "warning",
        title: "Don't read land uses from a variant's legend",
        html: "A generated image may copy the legend of your plan, but the model redraws it. Here the variant's legend shows Downtown as a light-blue swatch, while on the original plan Downtown is the red dashed boundary. Read land uses from your own plan and the Site tab, not from a variant."
      },
      beats: [
        {
          html: "Click <em>Compare</em>, the split-square icon. A slider divides the image: the original on the left, marked <strong>ORIGINAL</strong>, and the variant on the right, marked <strong>VARIANT</strong>.",
          highlight: { box: [0.6445, 0.9126, 0.0231, 0.0463], label: "Compare" },
          cursor: { at: [0.6561, 0.9358], click: true },
          zoom: [0.4119, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "Drag the round handle across the image to see how far the variant has moved from the plan you started from. Here the original is the downtown land-use plan, with its zoning colours and street names.",
          highlight: { box: [0.2074, 0.0789, 0.7742, 0.8927], label: "Original | Variant" }
        },
        {
          html: "<em>Original</em>, the picture icon, shows the starting image on its own. While it's on, the button reads <em>Back to variant</em>.",
          highlight: { box: [0.6266, 0.9126, 0.0231, 0.0463], label: "Original" },
          zoom: [0.4119, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "<em>Parent</em>, the branch icon, shows the image this variant was generated from: once you have iterated, the image you built on. It also reads <em>Back to variant</em> while it's on. If it is greyed out as <em>No parent image available</em> on an image you know you iterated, switch <em>Original</em> on and off, then try again.",
          highlight: { box: [0.6087, 0.9126, 0.0231, 0.0463], label: "Parent" },
          zoom: [0.4119, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "refine-prompt-used",
      title: "See the prompt behind an image",
      lead: "Every generation sends the model a prompt built from your choices. The first button in the toolbar shows the lines your choices added.",
      image: "img/5-04-prompt-used.webp",
      url: "coplanai.ikonai.app",
      alt: "Focus view with the prompt strip open above the toolbar: a speech-bubble icon, the start of the prompt, - under bright, clear daytime light with a blue sky - …, then a copy icon and a Reuse button. The Prompt button at the left end of the toolbar is highlighted.",
      note: {
        kind: "info",
        title: "Not every image has one",
        html: "The Prompt button appears on some images only; on others the toolbar starts at <em>Zoom out</em>. The Prompt tab's <em>RECENT PROMPTS</em> list also keeps the project's earlier prompts: see <a href='#refine-prompt'>Describe a change in your own words</a>."
      },
      beats: [
        {
          html: "Click <em>Prompt</em>, the speech bubble at the left end of the toolbar. A strip opens above the toolbar.",
          highlight: { box: [0.4382, 0.9126, 0.0231, 0.0463], label: "Prompt" },
          cursor: { at: [0.4497, 0.9358], click: true },
          zoom: [0.2414, 0.5, 0.5, 0.5]
        },
        {
          html: "It shows those lines, one per choice, starting with <strong>- under bright, clear daytime light with a blue sky -</strong>. Hover it to read them all. For this first-run image the lines are the Day scene, People, Medium-high density, Balanced creativity and the Illustrative render style, in the words set in Studio Settings. Your selected required elements (here Public park and Transit stop) and the standing instructions in Studio Settings are sent too, but aren't listed here.",
          zoom: [0.2414, 0.5, 0.5, 0.5]
        },
        {
          html: "The strip ends with two buttons: the copy icon, <em>Copy prompt</em>, which copies these lines, and <strong>Reuse</strong>, which we didn't try. A copied prompt is a handy note of the choices behind an option you like, and a starting point for your own prompts.",
          highlight: { box: [0.6598, 0.8642, 0.0231, 0.0463], label: "Copy prompt" },
          zoom: [0.2414, 0.5, 0.5, 0.5]
        }
      ]
    },
    {
      id: "refine-favourites",
      title: "Mark your favourites",
      lead: "Back in the grid, keep track of the options worth keeping. Here the grid is in <strong>Timeline</strong> view, so it shows every iteration.",
      image: "img/5-05-favorites.webp",
      url: "coplanai.ikonai.app",
      alt: "The image grid in Timeline view: Concept A with four images, two marked I2 and two marked I1, and Green streets with one image marked I1. Three of the tiles have a filled black heart in their top-left corner. In the toolbar at the top right: Select, Favorites, Latest and Timeline.",
      note: {
        kind: "tip",
        title: "Can't find a favourite?",
        html: "In <strong>Latest</strong> view, <strong>Favorites</strong> looks only at each concept's newest iteration. If none of those is a favourite, Studio says so and suggests switching to <strong>Timeline</strong>, where every favourite shows."
      },
      beats: [
        {
          html: "Click the heart in the top-left corner of a tile to mark the image as a favourite: the heart fills in. Click it again to unmark it. In Focus view, the toolbar's heart, <em>Mark as favorite</em>, does the same. The arrows button next to the heart, <em>Fullscreen</em>, opens the image in a fullscreen viewer with fewer tools than Focus view.",
          highlight: { box: [0.3795, 0.2295, 0.0231, 0.0463], label: "Favourite" },
          zoom: [0.1827, 0.0443, 0.4167, 0.4167]
        },
        {
          html: "Here three images are favourites: the fountain aerial from Concept A's second iteration, one of its first two plans, and the <strong>Green streets</strong> plan."
        },
        {
          html: "<strong>Favorites</strong> filters the grid down to your favourites, for a quick shortlist. Click it again to see every image. Favourites also reach the report: the Report builder offers &ldquo;Options considered · favorite runner-ups&rdquo; under Approved concepts (see <a href='#production-report'>the Report builder</a>).",
          highlight: { box: [0.8346, 0.1242, 0.0552, 0.0505], label: "Favorites" },
          cursor: { at: [0.8622, 0.1495], click: false },
          zoom: [0.5833, 0, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "refine-select",
      title: "Select several images",
      lead: "To act on several images at once, switch the grid to Select mode.",
      image: "img/5-06-select.webp",
      url: "coplanai.ikonai.app",
      alt: "The image grid in Select mode: Select is green, the header reads IMAGES 2 selected, and Concept A's two I2 tiles carry green ticks while the other tiles show a +. A bar of buttons runs above the images: Add to favorites, Remove from favorites, Compare, Download, Send to production and Select all. At the bottom of the panel the button reads Apply to 2 selected.",
      note: {
        kind: "tip",
        title: "Leaving Select mode",
        html: "Escape doesn't leave Select mode: click <strong>Select</strong> again."
      },
      beats: [
        {
          html: "Click <strong>Select</strong>. A + appears in the top-right corner of every tile, and clicking a tile now selects it instead of opening it.",
          highlight: { box: [0.7931, 0.1242, 0.0447, 0.0505], label: "Select" },
          zoom: [0.5833, 0, 0.4167, 0.4167]
        },
        {
          html: "Click the images you want: the + turns into a green tick, and the header counts them, here <strong>2 selected</strong>. We picked the two variants of Concept A's second iteration.",
          highlight: { box: [0.2079, 0.2695, 0.3347, 0.1958], label: "2 selected" },
          zoom: [0.1479, 0.1401, 0.4547, 0.4547]
        },
        {
          html: "The bar above the images acts on the selection: <strong>Add to favorites</strong>, <strong>Remove from favorites</strong>, <strong>Compare</strong> and <strong>Download</strong>, then <strong>Send to production</strong>, which passes the selected images on to the Production workspace alongside each concept's latest iteration (see <a href='#production'>Produce the render set</a>), and <strong>Select all</strong>, which picks every image and then reads <em>Deselect all</em>.",
          highlight: { box: [0.4864, 0.1811, 0.1408, 0.0505], label: "Send to production · Select all" },
          zoom: [0.199, 0, 0.45, 0.45]
        },
        {
          html: "The Quick actions panel works on a selection too: at the bottom of the panel, on the left, its button now reads <strong>Apply to 2 selected</strong>. Like any run, it starts a generation and uses credits."
        },
        {
          html: "<strong>Compare</strong> appears in the bar once two images or more are selected. Click it.",
          highlight: { box: [0.3798, 0.1811, 0.055, 0.0505], label: "Compare" },
          cursor: { at: [0.4073, 0.2063], click: true },
          zoom: [0.199, 0, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "refine-compare-side",
      title: "Compare images side by side",
      lead: "<strong>Compare</strong> opens the selected images next to each other, across the whole window.",
      image: "img/5-07-compare-side-by-side.webp",
      url: "coplanai.ikonai.app",
      alt: "The Compare window: two images side by side, an aerial view of low, flat-roofed blocks around a fountain plaza on the left and a warm-lit top view of the lakeside plan on the right, each captioned Iteration 2, with a close button in the top-right corner.",
      note: {
        kind: "tip",
        title: "Comparing concepts?",
        html: "The captions show only the iteration, not the concept, so keep a note of which image is which. Select four or six images to compare them in a grid."
      },
      beats: [
        {
          html: "Each image is captioned with its iteration, here <strong>Iteration 2</strong> for both. Side by side, the two variants of one run can be very different: here an aerial view around a fountain plaza, and a top view of the whole plan in warm evening light.",
          highlight: { box: [0.01, 0.0579, 0.98, 0.9], label: "Side by side" }
        },
        {
          html: "Close it with the X in the top-right corner, or press Escape. Your selection stays, ready for the next action.",
          highlight: { box: [0.9589, 0, 0.0316, 0.0511], label: "Close" },
          zoom: [0.5833, 0, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "refine-touchup",
      title: "Redraw part of the image with Touch-up",
      lead: "Touch-up changes only the area you mark, following your instruction. Open the image you want to change, then switch tabs.",
      image: "img/5-08-touch-up.webp",
      url: "coplanai.ikonai.app",
      alt: "The Touch-up tab with Polygon selected among the drawing tools, red (#D92D20) as the colour, and an Instruction asking for a tree-lined central square with cafés and a small market hall. On the lakeside plan, a red polygon outlines the central blocks. Apply to mask is green at the bottom of the panel.",
      note: {
        kind: "info",
        title: "Edits add images, they don't replace them",
        html: "Touch-up, Adjust and Prompt never change the image you start from. Each run adds new images to the concept as a new iteration, and you find them in the grid's <em>Timeline</em>; once a concept has many, click the last tile of its row, <em>View all</em>, to see the older ones. Our one Touch-up run came back as two iterations, I3 and I4, with two images each, so by the end of this chapter Concept A held 11 images, from I1 to I6."
      },
      beats: [
        {
          html: "Click the pencil, the fourth tab. The banner says what to do: <strong>Mask a region, then apply</strong>.",
          highlight: { box: [0.0783, 0.1621, 0.0286, 0.0463], label: "Touch-up" },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "Pick a drawing tool. The highlighted rows hold <em>Undo</em>, <em>Redo</em>, <em>Zoom out</em> and <em>Zoom in</em>, then <em>Brush</em>, <em>Eraser</em>, <em>Text</em>, <em>Arrow</em> and <em>Polygon</em>; to their right are <em>Thin stroke</em> and <em>Thick stroke</em>, and below them the colours: the current one shows as <strong>#D92D20</strong>, and clicking it opens a picker for any other. Give Studio a second after changing tool or colour before you draw.",
          highlight: { box: [0.0079, 0.2642, 0.1137, 0.1095], label: "Drawing tools", side: "above" },
          zoom: [0, 0.1106, 0.4167, 0.4167]
        },
        {
          html: "Mark the area to change. We chose <em>Polygon</em>, clicked each corner around the central blocks, and clicked the first point again to close the outline.",
          highlight: { box: [0.4899, 0.3609, 0.1178, 0.2231], label: "Marked region" },
          zoom: [0.3404, 0.2641, 0.4167, 0.4167]
        },
        {
          html: "Under <strong>Instruction</strong>, say what should happen inside it. Ours: &ldquo;Turn these blocks into a tree-lined central square with cafés and a small market hall.&rdquo; <strong>Apply to mask</strong> turns on as soon as you draw, even with no instruction, so check your instruction before you click it.",
          highlight: { box: [0.0032, 0.5032, 0.1789, 0.0968], label: "Instruction" },
          zoom: [0, 0.3432, 0.4167, 0.4167]
        },
        {
          html: "Click <strong>Apply to mask</strong>. It is a generation, so it uses credits; ours took about five minutes. Studio stays on the image you marked, clears the outline and keeps your instruction. The results are in the <em>Timeline</em>.",
          highlight: { box: [0.0032, 0.9211, 0.1789, 0.0547], label: "Apply to mask" },
          cursor: { at: [0.0926, 0.9484], click: true },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "refine-adjust",
      title: "Adjust light and colour",
      lead: "Adjust makes photo-style corrections to the open image, from brightness and warmth to ready-made looks. It changes how the image looks, not the design in it.",
      image: "img/5-09-adjust.webp",
      url: "coplanai.ikonai.app",
      alt: "The Adjust tab on its Filters view: a grid of filter thumbnails (Original, Punch, Golden, Radiate, Warm Contrast, Calm, Cool Light, Vivid Cool, Dramatic Cool, B&W, B&W Cool, B&W Warm, B&W High Contrast, Burn, Film) with Golden ticked. The lakeside plan on the stage has turned warmer. Save as new version is green at the bottom of the panel.",
      note: {
        kind: "warning",
        title: "Save before you move on",
        html: "Adjustments you haven't saved aren't kept: open the image again later and every slider is back at 0."
      },
      beats: [
        {
          html: "Click the sliders icon, the fifth tab.",
          highlight: { box: [0.1027, 0.1621, 0.0286, 0.0463], label: "Adjust" },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "<strong>Adjust</strong> holds the sliders: Brightness, Exposure, Contrast, Highlights, Shadows and Vignette for light, and Saturation, Warmth, Tint and Sharpness for colour, with <em>Undo</em>, <em>Redo</em> and <em>Reset</em> under them. <strong>Filters</strong> offers ready-made looks.",
          highlight: { box: [0.0053, 0.2168, 0.1668, 0.0411], label: "Adjust or Filters" },
          zoom: [0, 0.029, 0.4167, 0.4167]
        },
        {
          html: "Each filter tile previews the open image. We picked <strong>Golden</strong>: it gets a green tick and the plan warms up on the stage. Under the tiles, Studio adds: &ldquo;Preview is approximate — the final image is rendered on save.&rdquo;",
          highlight: { box: [0.1211, 0.2621, 0.061, 0.1316], label: "Golden" },
          cursor: { at: [0.1516, 0.3279], click: true },
          zoom: [0, 0.1195, 0.4167, 0.4167]
        },
        {
          html: "Click <strong>Save as new version</strong>. Ours was ready in a few seconds and made a single image, despite the line under the button.",
          highlight: { box: [0.0032, 0.9211, 0.1789, 0.0547], label: "Save as new version" },
          cursor: { at: [0.0926, 0.9484], click: true },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "refine-adjust-saved",
      title: "Check the new version",
      lead: "Studio opens the new version in Focus view. It is a separate image, so the plan you adjusted stays as it was.",
      image: "img/5-09b-adjust-saved.webp",
      url: "coplanai.ikonai.app",
      alt: "Focus view on the saved version: the lakeside plan in warmer, golden tones, with the caption Filter: Golden · Brightness +5 · Contrast +10 · Saturation +15 · Warmth +45 in a bar under the image.",
      beats: [
        {
          html: "The new version is a single image, added to the concept as an iteration of its own: I5 in our <em>Timeline</em>.",
          highlight: { box: [0.2074, 0.0789, 0.7742, 0.8495], label: "New version" }
        },
        {
          html: "The caption under it records what was applied: <strong>Filter: Golden · Brightness +5 · Contrast +10 · Saturation +15 · Warmth +45</strong>. A filter is a set of slider values, so you can see exactly what it did and set the same look by hand. The same line goes into the project's process audit in the Report builder.",
          highlight: { box: [0.2247, 0.9358, 0.7511, 0.0284], label: "What was applied" }
        }
      ]
    },
    {
      id: "refine-prompt",
      title: "Describe a change in your own words",
      lead: "When the change you want isn't among the Quick actions, write it. The Prompt tab works on the image open in Focus view. We went back to the lakeside plan from the first run.",
      image: "img/5-10-prompt.webp",
      url: "coplanai.ikonai.app",
      alt: "The Prompt tab: the Prompt box holds Add a light-rail line along the main avenue, with a stop on the central square. Below it come a line of advice, Save as quick action, and RECENT PROMPTS with three earlier prompts. Generate is green at the bottom of the panel.",
      beats: [
        {
          html: "Click the speech bubble, the sixth tab.",
          highlight: { box: [0.1271, 0.1621, 0.0285, 0.0463], label: "Prompt" },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "Type the change under <strong>Prompt</strong>. Ours: &ldquo;Add a light-rail line along the main avenue, with a stop on the central square.&rdquo; Studio's advice sits underneath: <strong>Start with a short baseline prompt, then iterate — small changes per generation give the most control.</strong>",
          highlight: { box: [0.0032, 0.2337, 0.1789, 0.0968], label: "Your change" },
          zoom: [0, 0.0738, 0.4167, 0.4167]
        },
        {
          html: "<strong>Save as quick action</strong> keeps the prompt so you can use it again as a quick action.",
          highlight: { box: [0.0032, 0.3868, 0.086, 0.0506], label: "Save as quick action" },
          zoom: [0, 0.2037, 0.4167, 0.4167]
        },
        {
          html: "<strong>RECENT PROMPTS</strong> lists the project's earlier prompts, newest first: here our Touch-up instruction, then the prompts Studio composed for the first two runs. Hover one to read it in full.",
          highlight: { box: [0.0137, 0.4332, 0.0662, 0.0284], label: "Recent prompts" },
          zoom: [0, 0.239, 0.4167, 0.4167]
        },
        {
          html: "Click <strong>Generate</strong>. <strong>Each run generates 2 variant(s)</strong>, and it uses credits. Ours took about three minutes; Studio then opened one of the new variants and put our prompt at the top of the list.",
          highlight: { box: [0.0032, 0.9211, 0.1789, 0.0547], label: "Generate" },
          cursor: { at: [0.0926, 0.9484], click: true },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "refine-impact",
      title: "Ask about an impact",
      lead: "Impact asks the AI how the design in the open image might affect something you care about, such as traffic or shade. We asked it about the same lakeside plan.",
      image: "img/5-11-impact.webp",
      url: "coplanai.ikonai.app",
      alt: "The Impact tab: under Ask about an impact, the question How would this design affect walkability…, the chips Traffic, Heat & shade and Walkability, the line Indicative AI assessment — not a professional or regulatory evaluation., and a green Analyse button at the bottom of the panel.",
      note: {
        kind: "info",
        title: "A reading of the picture",
        html: "Impact works from the image. Nothing on screen refers to planning documents, criteria or scores, and the answer itself lists what the picture can't show. Use it to spot questions worth a proper look."
      },
      beats: [
        {
          html: "Click the pulse icon, the last tab.",
          highlight: { box: [0.1514, 0.1621, 0.0286, 0.0463], label: "Impact" },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "Type your question under <strong>Ask about an impact</strong>.",
          highlight: { box: [0.0032, 0.2337, 0.1789, 0.0547], label: "Your question" },
          zoom: [0, 0.0527, 0.4167, 0.4167]
        },
        {
          html: "Or click a ready-made question: <strong>Traffic</strong>, <strong>Heat &amp; shade</strong> or <strong>Walkability</strong>. Each fills the box with a full question; we clicked <strong>Walkability</strong>: &ldquo;How would this design affect walkability for residents and visitors?&rdquo;",
          highlight: { box: [0.0032, 0.2884, 0.1405, 0.0379], label: "Ready-made questions" },
          cursor: { at: [0.1181, 0.3074], click: true },
          zoom: [0, 0.099, 0.4167, 0.4167]
        },
        {
          html: "Keep the line under them in mind: <strong>Indicative AI assessment — not a professional or regulatory evaluation.</strong>",
          highlight: { box: [0.0032, 0.3358, 0.1676, 0.0474], label: "Indicative only" },
          zoom: [0, 0.1511, 0.4167, 0.4167]
        },
        {
          html: "Click <strong>Analyse</strong>. Ours answered in about 15 seconds. Analysing makes no new images, despite the line under the button.",
          highlight: { box: [0.0032, 0.9211, 0.1789, 0.0547], label: "Analyse" },
          cursor: { at: [0.0926, 0.9484], click: true },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "refine-impact-answer",
      title: "Read the assessment",
      lead: "The answer appears in the panel, under the question.",
      image: "img/5-12-impact-answer.webp",
      url: "coplanai.ikonai.app",
      alt: "The Impact tab with an answer: the question How would this design affect walkability for residents and visitors?, a paragraph of summary, then factors with icons: Compact grid and Waterfront access in green with rising arrows, and Perimeter barriers in orange with a warning sign.",
      beats: [
        {
          html: "It repeats the question, then sums up. Ours found that the design &ldquo;strongly supports walkability in the central area&rdquo;, but that perimeter highways and large commercial blocks &ldquo;may create barriers for some trips&rdquo;.",
          zoom: [0, 0.2063, 0.7937, 0.7937]
        },
        {
          html: "Factors in the design's favour carry a green rising arrow, just left of their name: here <strong>Compact grid</strong> and <strong>Waterfront access</strong>, each with a line of explanation.",
          highlight: { box: [0.0226, 0.6, 0.1527, 0.0347], label: "Works for it" },
          zoom: [0, 0.409, 0.4167, 0.4167]
        },
        {
          html: "Concerns carry an orange warning sign, also left of the name: here <strong>Perimeter barriers</strong>, &ldquo;Highway and large single-use commercial blocks at edges risk interrupting pedestrian permeability.&rdquo;",
          highlight: { box: [0.0226, 0.7979, 0.1527, 0.0347], label: "Works against it" },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "Scroll down the panel for the rest. Our answer listed one more factor, then the details the picture can't show (&ldquo;sidewalk widths, curb crossings, signal timing, building entries and traffic volumes&rdquo;), and ended with an <em>Include in report</em> button, which we didn't try. In the Report builder, the Impact analysis section starts switched off: switch it on there to include it (see <a href='#production-report'>the Report builder</a>). The answer stays with the image: it was still there when we opened the image again."
        }
      ]
    }
  ]
});
