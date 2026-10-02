/* CoPlanAI Studio guide: Chapter 6: Produce the render set. */
/*
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 * Every box, cursor point and zoom comes from the capture JSON written by tools/capture.js
 * (flow: tools/flows/06-production.js), and was checked on the debug image, with these exceptions, all worked out
 * from JSON numbers (no plate was re-taken):
 *   - Boxes measured with union() or card() (6-01 tools, 6-04 sections, contents and exports, 6-05 preview and audit)
 *     were measured while the page still showed its 15 px scrollbar; the plate is taken with scrollbars hidden, so
 *     right-aligned content sits 15 css px further right and the two 6-04 columns each grow by 7.5 px. The raw
 *     screenshots (explore/raw/6-01-raw.png, 6-04-raw.png, with scrollbar) put Build all missing and Build PDF at
 *     css 1860, the plates at 1875.5. These boxes are the JSON css rect moved/widened by that offset, then normalised
 *     like tools/capture.js does (pad 6).
 *   - 6-01 latest: the JSON box covered only the caption strip. The box used here takes x, width and bottom from that
 *     box and the top from the views box (0.14, the top of the Aerial · Day tile in the same row).
 *   - 6-02 scene states: the JSON box starts inside the Day chip; its left edge here is the dialog's content column
 *     (css 719, the left of the views, medium and naming boxes, where the Day chip starts). Output quality has no
 *     JSON box: its box is the band between the medium box (bottom 0.5332) and the naming box (top 0.6942), with
 *     their x and width.
 *   - 6-05 preview: the card's top runs under the sticky header, so the box starts below the header's bottom border
 *     (css 48, pixel scan of the plate) instead of at the JSON top (0.0263).
 * The cursor on Production (production-view) is the JSON centre of that highlight.
 * Prompt text quoted for the views and scene states is the default Studio Settings text
 * (explore/scout/18-menu-settings.txt); the Deliverable medium and Output quality options come from
 * explore/production/11- and 12-cp-render-settings-*.png; the audit parts from explore/raw/6-05-raw.txt.
 */
window.COPLAN_TUTORIAL.chapters.push({
  id: "production",
  title: "Produce the *render set*",
  summary: "Turn each concept's latest iteration into a set of renders: choose the views, scene states and output, build the renders, then put the report together and check its process audit.",
  steps: [
    {
      id: "production-view",
      title: "Open Production",
      lead: "Once your concepts are ready in Ideation, <strong>Production</strong> turns them into a render set: the same set of views and lighting for every concept, ready for the report. Here it is in our example project, <strong>Downtown plan (Studio tutorial demo)</strong>, with its two concepts.",
      image: "img/6-01-render-set.webp",
      url: "coplanai.ikonai.app",
      alt: "The Production workspace of the example project, with the breadcrumb Studio / Downtown plan (Studio tutorial demo) and the Ideation | Production switch at the top: the title Render set with 2 concepts · 0 of 24 renders complete, the buttons Video, Image Upscale, Report builder, Settings and a green Build all missing at the top right, and a row per concept. Concept A's row starts with its plan image tagged Latest and captioned Concept A · I6, followed by twelve empty tiles from Aerial · Day to Section · Night, each with a green Build button; the Green streets row begins below.",
      note: {
        kind: "tip",
        title: "Want other images in Production?",
        html: "As Studio puts it when Production is still empty, each concept's latest iteration &ldquo;lands here automatically, and you can send more images from the grid&rdquo;. In Ideation, click <em>Select</em>, click the + on each image you want and click <em>Send to production</em> in the bar above the grid. <a href='#refine-select'>Select several images</a> shows that bar."
      },
      beats: [
        {
          html: "Click <strong>Production</strong> in the switch at the top of the project. It opens on the <strong>Render set</strong>.",
          highlight: { box: [0.4928, 0.0011, 0.0697, 0.0473], label: "Production", side: "below" },
          cursor: { at: [0.5276, 0.0247], click: true },
          zoom: [0.3193, 0, 0.4167, 0.4167]
        },
        {
          html: "Under the title, Studio keeps count: <strong>2 concepts · 0 of 24 renders complete</strong>. Every concept gets one render for each view and scene state, so two concepts with twelve tiles each make 24.",
          highlight: { box: [0.0095, 0.0611, 0.1325, 0.0557], label: "Render set" },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "Each row starts with the concept's latest iteration, tagged <strong>Latest</strong>. Its caption names the concept and the iteration: <strong>Concept A · I6</strong>. The renders are built from this image. When a newer iteration arrives in Ideation it takes this place, and renders built from the old one may no longer show in the set (Studio gives no warning), so settle the design before you build.",
          highlight: { box: [0.0105, 0.14, 0.1727, 0.1989], label: "Latest iteration" },
          zoom: [0, 0.1058, 0.4167, 0.4167]
        },
        {
          html: "Next to it come twelve tiles, one for each view (aerial, eye-level, plan and section) in each light (day, dusk and night), from <strong>Aerial · Day</strong> to <strong>Section · Night</strong>. Each tile's <strong>Build</strong> button renders just that one. The <strong>Green streets · I1</strong> row follows below.",
          highlight: { box: [0.1847, 0.14, 0.6916, 0.5986], label: "Views × scenes" },
          zoom: [0.1247, 0.0335, 0.8116, 0.8116]
        },
        {
          html: "The tools sit at the top right. <strong>Video</strong> and <strong>Image Upscale</strong> make a short video or a 6K or 8K copy of an image (see <a href='#media'>Videos and upscales</a>). <strong>Report builder</strong> puts the report together, <strong>Build all missing</strong> renders every empty tile at once (24 AI renders here, so read <a href='#production-build'>Build renders</a> first), and <strong>Settings</strong> decides what the set contains. Start with <strong>Settings</strong>.",
          highlight: { box: [0.6084, 0.0637, 0.3821, 0.0505], label: "Production tools" },
          cursor: { at: [0.8657, 0.0889], click: true },
          zoom: [0.4979, 0, 0.5021, 0.5021]
        }
      ]
    },
    {
      id: "production-settings",
      title: "Choose views, scenes and output",
      lead: "Settings opens <strong>Render settings</strong>: &ldquo;Pick which views to render, output quality and the export naming pattern.&rdquo; Set it up before you build anything.",
      image: "img/6-02-render-settings.webp",
      url: "coplanai.ikonai.app",
      alt: "The Render settings dialog over the render set: Views with Aerial, Eye-level, Plan and Section ticked and Add custom view; Scene states with Day, Dusk and Night ticked and Add custom scene state; Deliverable medium set to Photoreal with a line of help text; Output quality 2K with Resolution 2048px · Auto; Format with PNG, WebP (ticked) and JPG; Export file naming {project}_{concept}_{view}_{state} with its tokens; and the Cancel and Save settings buttons.",
      note: {
        kind: "tip",
        title: "Every tile is a render",
        html: "Each view you keep adds one tile per scene state to every concept: 4 views &times; 3 scene states &times; 2 concepts make the 24 renders in the count. Switch off what your deliverable doesn't need before you build. The starting views and scene states are set for the whole Studio in Studio Settings: see <a href='#org-settings-ideation'>Ideation options and the master prompt</a>."
      },
      beats: [
        {
          html: "Under <strong>Views</strong>, a tick means the view is rendered: click a chip to switch it off or on. As Studio describes them to the AI, <strong>Aerial</strong> looks down over the whole site at an oblique angle, <strong>Eye-level</strong> is a street view from within the development, <strong>Plan</strong> a straight top-down site plan and <strong>Section</strong> a vertical cut showing building heights and the street profile. <strong>Add custom view</strong> adds one of your own.",
          highlight: { box: [0.3753, 0.2742, 0.186, 0.0737], label: "Views" },
          zoom: [0.26, 0.1027, 0.4167, 0.4167]
        },
        {
          html: "<strong>Scene states</strong> set the light: <strong>Day</strong> is bright clear daytime, <strong>Dusk</strong> a warm golden hour with facades beginning to glow, and <strong>Night</strong> warm artificial lighting. <strong>Add custom scene state</strong> adds another.",
          highlight: { box: [0.3753, 0.3742, 0.2308, 0.0442], label: "Scene states" },
          zoom: [0.2907, 0.1879, 0.4167, 0.4167]
        },
        {
          html: "<strong>Deliverable medium</strong> is the look of the finished renders: Massing, Sketch, Illustrative or <strong>Photoreal</strong>. Your concepts can be in another style: as the help text says, &ldquo;Concepts drawn in another medium are realized into this medium once before rendering.&rdquo; Concept A was first generated in the Illustrative render style, and its renders come out photoreal.",
          highlight: { box: [0.3753, 0.4226, 0.2494, 0.1106], label: "Deliverable medium" },
          zoom: [0.2916, 0.2695, 0.4167, 0.4167]
        },
        {
          html: "<strong>Output quality</strong> is 1K, <strong>2K</strong> or 4K, and the line below shows what you get: <strong>2048px · Auto</strong>, where Auto keeps the shape of the leading image. Under <strong>Format</strong>, a tick marks the file types you get, here <strong>WebP</strong>; a + means <strong>PNG</strong> and <strong>JPG</strong> are off.",
          highlight: { box: [0.3753, 0.5332, 0.2494, 0.161], label: "Output quality" },
          zoom: [0.2916, 0.5327, 0.4167, 0.4167]
        },
        {
          html: "<strong>Export file naming</strong> sets the name of every render file. The tokens in braces are replaced by the project, concept, view and scene state, so each file name says what the render shows. Edit the pattern in the field to suit how your team files images.",
          highlight: { box: [0.3753, 0.6942, 0.2494, 0.0937], label: "Export file naming" },
          zoom: [0.2916, 0.5327, 0.4167, 0.4167]
        },
        {
          html: "Click <strong>Save settings</strong> to keep your choices for this project, or <strong>Cancel</strong> to close the dialog without changing anything.",
          highlight: { box: [0.5536, 0.7921, 0.0711, 0.0505], label: "Save settings" },
          cursor: { at: [0.5892, 0.8174], click: false },
          zoom: [0.3808, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "production-build",
      title: "Build renders",
      lead: "Each <strong>Build</strong> is an AI render from the concept's latest image, so it uses generation credits. Start with one or two tiles and check them before you build more.",
      image: "img/6-03-built.webp",
      url: "coplanai.ikonai.app",
      alt: "The render set after two renders: the counter reads 2 concepts · 2 of 24 renders complete. In Concept A's row, the Aerial · Day tile shows the whole site from the air and the Eye-level · Day tile a photoreal view of the lakeside between buildings, while the other tiles still have their Build buttons. A Regenerate from master button sits under Concept A's leading image.",
      note: {
        kind: "warning",
        title: "Build all missing fills every empty tile",
        html: "<strong>Build all missing</strong> renders every empty tile of every concept in one go: here, 22 renders. Each one is an AI generation that uses credits, and the page shows no cost before you click. Build a tile or two first, check the result and your Render settings, then fill the rest."
      },
      beats: [
        {
          html: "Click <strong>Build</strong> on a tile to render just that view and light. While it works, the tile reads &ldquo;building&rdquo;; when it's done, the render fills the tile and its Build button goes. Here, <strong>Aerial · Day</strong> shows the whole site from the air.",
          highlight: { box: [0.1847, 0.14, 0.1737, 0.2009], label: "Aerial · Day" },
          zoom: [0.0632, 0.0321, 0.4167, 0.4167]
        },
        {
          html: "<strong>Eye-level · Day</strong> shows the same concept from within the development: the lakeside, between the buildings, in daylight and in the photoreal medium chosen in Render settings.",
          highlight: { box: [0.7026, 0.14, 0.1737, 0.2009], label: "Eye-level · Day" },
          zoom: [0.5811, 0.0321, 0.4167, 0.4167]
        },
        {
          html: "The count keeps up as you go: <strong>2 concepts · 2 of 24 renders complete</strong>.",
          highlight: { box: [0.0095, 0.0884, 0.1325, 0.0284], label: "Progress" },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "Once a concept has renders, <strong>Regenerate from master</strong> appears under its leading image. We didn't use it: as its name says, it generates again, so expect it to use credits like <strong>Build</strong>.",
          highlight: { box: [0.0095, 0.3368, 0.1747, 0.0506], label: "Regenerate from master" },
          zoom: [0, 0.1537, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "production-report",
      title: "Put the report together",
      lead: "<strong>Report builder</strong>, at the top of Production, opens the project's report: &ldquo;Drag to reorder, toggle to omit.&rdquo; You choose its sections and their order, then export.",
      image: "img/6-04-report-builder.webp",
      url: "coplanai.ikonai.app",
      alt: "The Report builder: a third tab, Report, in the switch at the top; the SECTIONS card with Cover, Executive summary, Site context, Approved concepts with Options considered · favorite runner-ups below it, and Render set ticked, and Impact analysis and Process audit switched off; the CONTENTS card numbering the five included sections, with the two others struck through and marked omitted; Render pack and Build PDF at the top right; and the start of the Report preview below.",
      note: {
        kind: "info",
        title: "Where the default sections come from",
        html: "The <em>Report sections</em> list in Studio Settings sets which of Cover, Executive summary, Site context, Approved concepts, Render set and Process audit start switched on for the whole Studio (Impact analysis isn't listed there): see <a href='#org-settings-ideation'>Ideation options and the master prompt</a>. Change them there if every report in your organisation needs the same sections."
      },
      beats: [
        {
          html: "While you're in the Report builder, a third tab, <strong>Report</strong>, joins <strong>Ideation</strong> and <strong>Production</strong> at the top. Click <strong>Production</strong> to go back to the render set.",
          highlight: { box: [0.5324, 0.0011, 0.055, 0.0473], label: "Report", side: "below" },
          zoom: [0.3515, 0, 0.4167, 0.4167]
        },
        {
          html: "<strong>SECTIONS</strong> lists the parts of the report, from <strong>Cover</strong> to <strong>Process audit</strong>. Click the square on the right to include a section (a tick) or leave it out (&minus;), and drag a row by the handle on its left to move it. <strong>Approved concepts</strong> has its own option, <strong>↳ Options considered · favorite runner-ups</strong>, for the runner-ups you marked as favourites. We found no control in Production to approve or lock a concept, and the preview below counts 0 concepts locked, so open the PDF you build and check what <strong>Approved concepts</strong> contains before you send it.",
          highlight: { box: [0.0095, 0.1495, 0.4894, 0.5252], label: "Sections" },
          zoom: [0, 0.0895, 0.6452, 0.6452]
        },
        {
          html: "<strong>CONTENTS</strong> numbers the sections in the order they'll appear and follows every change at once. Sections you leave out are struck through and marked <strong>omitted</strong>, and the last line counts the rest: <strong>5 sections included</strong>.",
          highlight: { box: [0.5011, 0.1495, 0.4894, 0.341], label: "Contents" },
          zoom: [0.3945, 0.0172, 0.6055, 0.6055]
        },
        {
          html: "Two exports sit at the top right. <strong>Build PDF</strong> makes the report itself; <strong>Render pack</strong> is the set of render files, which Studio Settings arranges as a folder per concept. Check the contents and the preview below before you export.",
          highlight: { box: [0.8434, 0.0695, 0.1471, 0.0505], label: "Export" },
          cursor: { at: [0.9563, 0.0947], click: false },
          zoom: [0.5833, 0, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "production-audit",
      title: "Check the preview and the audit",
      lead: "Scroll down the Report builder for the <strong>Report preview</strong> and, below it, the <strong>Compliance & process audit</strong>: a record of how the work was produced.",
      image: "img/6-05-report-preview.webp",
      url: "coplanai.ikonai.app",
      alt: "The Report builder scrolled down: the Report preview with PROJECT BRIEF (Output quality 2K, Output format WebP, Aspect ratio Auto) and PROCESS SUMMARY tiles such as Total generations 25 and Adjustment edits 2, then the Compliance & process audit card with Refresh and Download PDF + JSON buttons, its Project metadata and the start of Inputs & sources.",
      note: {
        kind: "info",
        title: "What the audit records",
        html: "Below <strong>Project metadata</strong> and <strong>Inputs & sources</strong> come the Ideation log (each change with its time, tool, prompt, iteration, model and who made it), the Lineage diagrams (which image came from which), the Production decisions (each render, logged here as &ldquo;Production adjust &hellip; regenerated&rdquo;) and System & reproducibility, which ends with a hash, a &ldquo;tamper-evident audit signature&rdquo;. It is written from the project's log, so read it through before you send it: here, for example, the process summary counts 12 / 13 ideation / production generations, while System &amp; reproducibility says &ldquo;25 (12 ideation, 2 production)&rdquo;."
      },
      beats: [
        {
          html: "The <strong>Report preview</strong> opens with the <strong>PROJECT BRIEF</strong> (the output settings) and a <strong>PROCESS SUMMARY</strong> that counts the work behind the report, from <strong>Concepts locked</strong> to <strong>Discarded (logged)</strong>. Check these figures before you rely on them: here <strong>Ideation / production</strong> reads <strong>12 / 13</strong>, although only two renders were built. As its last line says, the full lineage and decisions of every image are in the separate audit.",
          highlight: { box: [0.0095, 0.0516, 0.981, 0.4663], label: "Report preview" }
        },
        {
          html: "<strong>Compliance & process audit</strong> is that &ldquo;structured trace of how this deliverable was produced&rdquo;, in numbered parts. <strong>Refresh</strong> updates it, and <strong>Download PDF + JSON</strong> downloads it as a PDF and as a JSON file.",
          highlight: { box: [0.0095, 0.5221, 0.981, 0.4779], label: "Process audit" }
        }
      ]
    }
  ]
});
