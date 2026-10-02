/* CoPlanAI Studio guide: Chapter 3: Prepare the site. */
/*
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 * Every box, cursor point and zoom comes from the capture JSON written by tools/capture.js
 * (flow: tools/flows/03-site.js), and was checked on the debug image. Where a section's measured box covers only its
 * heading text, the box keeps the measured top and height and takes its left edge and width from the measured
 * panel-wide button at the bottom of the panel (css x 12, width 328), so that it also covers the status on the right.
 */
window.COPLAN_TUTORIAL.chapters.push({
  id: "site",
  title: "Prepare the *site*",
  summary: "Draw the site boundary, paint a land-use plan and check what Studio recognised, so that generation knows where it may design and what belongs where. Then move on to ideation.",
  steps: [
    {
      id: "site-tab",
      title: "Start on the Site tab",
      lead: "A new Conceptual Plan or Master Plan project opens in <strong>Ideation</strong>, on the Site tab. Before any image is generated, you show Studio where the site is and what belongs where. Our example is <strong>Downtown plan (Studio tutorial demo)</strong>, started from a downtown land-use plan.",
      image: "img/3-01-site-tab.webp",
      url: "coplanai.ikonai.app",
      alt: "The Downtown plan (Studio tutorial demo) project in Ideation, on the Site tab: Site boundary Not set with a Draw boundary button, Land use plan Not set with a colour legend of nine land uses and a Plan land use button, and a green Start ideation button at the bottom. The leading image, a downtown land-use plan, carries the hint Start ideation from the Site tab when ready.",
      note: {
        kind: "info",
        title: "No Site tab in a Focus Area",
        html: "Focus Area projects have no Site tab: their Actions tabs start at Quick actions. This chapter applies to Conceptual Plan and Master Plan projects."
      },
      beats: [
        {
          html: "The Site tab is the first of the icon tabs in the <strong>ACTIONS</strong> panel. If you've moved to another tab, click it to come back.",
          highlight: { box: [0.0053, 0.1621, 0.0285, 0.0463], label: "Site" },
          cursor: { at: [0.0195, 0.1853], click: true },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "The hint on the image tells you where ideation begins: <strong>Start ideation from the Site tab when ready</strong>. Getting ready is what this chapter is about.",
          highlight: { box: [0.5244, 0.0968, 0.1507, 0.0285], label: "Hint" },
          zoom: [0.3914, 0, 0.4167, 0.4167]
        },
        {
          html: "<strong>Land use plan</strong> is <strong>Not set</strong> yet. Its <strong>COLOUR LEGEND</strong> lists the nine land uses you can paint, from <strong>Residential</strong> to <strong>Community facilities</strong>, and <strong>Plan land use</strong> opens the painting editor.",
          highlight: { box: [0.0032, 0.3, 0.1789, 0.3116], label: "Land use plan" },
          cursor: { at: [0.0448, 0.5863], click: false },
          zoom: [0, 0.24, 0.4316, 0.4316]
        },
        {
          html: "<strong>Start ideation</strong> works already, even with nothing set, and it doesn't remind you. Leave it until the end of this chapter: once generation starts, the boundary and land-use plan can't be changed.",
          highlight: { box: [0.0032, 0.9432, 0.1789, 0.0547], label: "Start ideation" },
          cursor: { at: [0.0926, 0.9705], click: false },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "Start with the boundary. <strong>Site boundary</strong> reads <strong>Not set</strong>: click <strong>Draw boundary</strong>.",
          highlight: { box: [0.0032, 0.2137, 0.1789, 0.0852], label: "Site boundary" },
          cursor: { at: [0.0485, 0.2737], click: true },
          zoom: [0, 0.0479, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "site-boundary-editor",
      title: "Get to know the boundary editor",
      lead: "<strong>Draw boundary</strong> opens the boundary editor on the leading image. Along the bottom are the drawing tools (a straight line, a freehand line, an eraser, an outline and a polygon), then two stroke widths and six line colours.",
      image: "img/3-02-boundary-editor.webp",
      url: "coplanai.ikonai.app",
      alt: "The boundary editor: the heading Set the site boundary with its instructions above the leading image, the hint Draw a closed line around the site to set its boundary, a toolbar along the bottom with undo, redo, zoom, five drawing tools, two stroke widths and six colours, a Back button at the far right, and a green Save boundary button at the bottom of the left panel.",
      note: {
        kind: "warning",
        title: "Keep the orange line",
        html: "Draw with the orange that is selected when the editor opens. Hover the red and blue swatches and they say &ldquo;Too close to Commercial&rdquo; and &ldquo;Too close to Water&rdquo;. If you do want another colour, choose it before you draw, not after: changing colour clears what you've drawn, and Undo can't bring it back."
      },
      beats: [
        {
          html: "Read the brief at the top, <strong>Set the site boundary</strong>: generations design inside your line and keep everything outside as existing context. Draw round the land that may change; its surroundings stay as they are.",
          highlight: { box: [0.1984, 0.0611, 0.7921, 0.0621], label: "Instructions" }
        },
        {
          html: "The first four buttons undo, redo, zoom out and zoom in. Zoom in when you need to place corners precisely.",
          highlight: { box: [0.3768, 0.9253, 0.0948, 0.0547], label: "Undo, redo, zoom" },
          zoom: [0.2159, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "The lasso, Outline, closes itself: drag round the site, and when you let go the line joins back to where you started. It's quick, but the line follows your hand.",
          highlight: { box: [0.5521, 0.9253, 0.0253, 0.0547], label: "Outline" },
          zoom: [0.3564, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "The pentagon, Polygon, gives you straight edges: you click each corner and close the shape on the first point. Click it: this guide draws the boundary with it.",
          highlight: { box: [0.5753, 0.9253, 0.0252, 0.0547], label: "Polygon" },
          cursor: { at: [0.5879, 0.9526], click: true },
          zoom: [0.3796, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "<strong>Back</strong>, at the far right, leaves the editor without saving, and without asking first. The land-use editor's Back works the same way.",
          highlight: { box: [0.9519, 0.9274, 0.0386, 0.0505], label: "Back" },
          cursor: { at: [0.9712, 0.9526], click: false },
          zoom: [0.5833, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "At the bottom of the panel, <strong>Save boundary</strong> has taken the place of Start ideation. You'll use it once the line is closed.",
          highlight: { box: [0.0032, 0.9432, 0.1789, 0.0547], label: "Save boundary" },
          cursor: { at: [0.0926, 0.9705], click: false },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "site-boundary-polygon",
      title: "Click round the site",
      lead: "Click the corners of your site one after another. We followed the dashed <strong>Downtown</strong> line printed on our plan, starting at its left-hand corner.",
      image: "img/3-03-boundary-polygon.webp",
      url: "coplanai.ikonai.app",
      alt: "The boundary editor with the Polygon tool selected: a thick orange line runs from the left-hand corner of the site along the top of the plan and down its right-hand side, joining the corners clicked so far. The shape is still open and Undo is greyed out.",
      beats: [
        {
          html: "The pentagon, Polygon, stays selected while you draw.",
          highlight: { box: [0.5753, 0.9253, 0.0252, 0.0547], label: "Polygon" },
          zoom: [0.3796, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "Each click adds a corner, and an orange segment joins it to the one before. Follow the edge of your site: ours runs along the top of the plan and has started down its right-hand side.",
          highlight: { box: [0.3313, 0.1398, 0.5003, 0.2771], label: "Corners so far" },
          zoom: [0.2713, 0, 0.6203, 0.6203]
        },
        {
          html: "To close the shape, you'll click the first point again. Until then Undo stays greyed out: if a corner goes wrong, press <kbd>Esc</kbd> to drop the unfinished shape and start again.",
          cursor: { at: [0.3466, 0.3124], click: false },
          zoom: [0.2713, 0, 0.6203, 0.6203]
        }
      ]
    },
    {
      id: "site-boundary-save",
      title: "Close the outline and save it",
      lead: "Click the first point again and the shape closes: one orange outline round the whole site.",
      image: "img/3-04-boundary-closed.webp",
      url: "coplanai.ikonai.app",
      alt: "The boundary editor with a closed orange outline round the downtown site, close to the plan's own dashed Downtown line. Undo is now active, and Save boundary waits at the bottom of the left panel.",
      beats: [
        {
          html: "Check that the outline follows your site all the way round. Inside it, generation may design; outside it, the plan stays as context.",
          highlight: { box: [0.3313, 0.1242, 0.5263, 0.7516], label: "Closed boundary" }
        },
        {
          html: "Undo works now. One click removes the whole outline, so you can try again.",
          highlight: { box: [0.3768, 0.9253, 0.0253, 0.0547], label: "Undo" },
          zoom: [0.1811, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "Click <strong>Save boundary</strong>. Studio shows &ldquo;Setting boundary&hellip;&rdquo;, confirms &ldquo;Boundary set&rdquo; and takes you back to the Site tab.",
          highlight: { box: [0.0032, 0.9432, 0.1789, 0.0547], label: "Save boundary" },
          cursor: { at: [0.0926, 0.9705], click: true },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "site-boundary-set",
      title: "Check the boundary you saved",
      lead: "Back on the Site tab, the <strong>Site boundary</strong> section has new buttons to change, hide and check the boundary.",
      image: "img/3-05-boundary-set.webp",
      url: "coplanai.ikonai.app",
      alt: "The Site tab after saving: Site boundary reads Set, with Redraw boundary, Clear boundary, Hide site boundary and View boundary below it. Land use plan is still Not set. The leading image shows the plan with its own red dashed outline.",
      note: {
        kind: "warning",
        title: "Check that your line was kept",
        html: "The status turns to <strong>Set</strong> whenever you click Save boundary, even with nothing drawn. When we made this guide, <strong>View boundary</strong> showed the plain plan without our orange line every time we saved, although the toast said &ldquo;Generations now stay inside the drawn site boundary.&rdquo; Open <strong>View boundary</strong> and look for your line before you start ideation, because after that the boundary can't be changed. If your line is missing, tell whoever manages Studio before you generate."
      },
      beats: [
        {
          html: "<strong>Site boundary</strong> now reads <strong>Set</strong>. <strong>Hide site boundary</strong> turns the boundary overlay on the leading image off, and the button then reads &ldquo;Show site boundary&rdquo;. Our orange line doesn't show on the image here, though: see the warning below.",
          highlight: { box: [0.0032, 0.2137, 0.1789, 0.1758], label: "Boundary set" },
          zoom: [0, 0.0932, 0.4167, 0.4167]
        },
        {
          html: "<strong>Redraw boundary</strong> reopens the editor on an empty canvas. As the editor warns, saving a new drawing replaces the boundary, so draw the whole site again, not just the part you want to change.",
          highlight: { box: [0.0032, 0.2484, 0.0993, 0.0505], label: "Redraw" },
          zoom: [0, 0.0653, 0.4167, 0.4167]
        },
        {
          html: "<strong>Clear boundary</strong> deletes the boundary straight away, without asking. Generations then use the full image again.",
          highlight: { box: [0.0994, 0.2484, 0.0782, 0.0505], label: "Clear" },
          zoom: [0, 0.0653, 0.4167, 0.4167]
        },
        {
          html: "Click <strong>View boundary</strong> to open the saved boundary full size, and check that your line is in it. Press <kbd>Esc</kbd> to close it.",
          highlight: { box: [0.0032, 0.3389, 0.0889, 0.0506], label: "View boundary" },
          cursor: { at: [0.0476, 0.3642], click: true },
          zoom: [0, 0.1558, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "site-landuse-editor",
      title: "Open the land-use editor",
      lead: "Now say what belongs where. Click <strong>Plan land use</strong>, under the colour legend. The editor asks you to <strong>Colour the site by land use on the leading image</strong>: each colour comes from the project's standard and tells generation what belongs where.",
      image: "img/3-06-landuse-editor.webp",
      url: "coplanai.ikonai.app",
      alt: "The land-use editor: the heading Plan land use with its instructions above the leading image, a toolbar along the bottom with undo, redo, zoom, Freehand, Fill outline, Fill polygon, an eraser, two stroke widths and nine land-use swatches with Residential selected, Back at the far right, and Save land-use plan at the bottom of the left panel, where Redraw boundary, Hide site boundary and Plan land use are greyed out.",
      note: {
        kind: "info",
        title: "Where the colours come from",
        html: "The land uses and their colours are the project's land-use colour standard, and a colour can clash with the boundary marker. Look at <a href='#site-colours'>Mind the colour standard</a> before you paint a real plan."
      },
      beats: [
        {
          html: "The swatches along the bottom are the nine land uses of the <strong>COLOUR LEGEND</strong>, in the same order, from <strong>Residential</strong> to <strong>Community facilities</strong>. Click one to paint with it; <strong>Residential</strong> is selected at first.",
          highlight: { box: [0.6247, 0.9274, 0.2106, 0.0505], label: "Land uses" },
          cursor: { at: [0.6374, 0.9526], click: true },
          zoom: [0.5216, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "Then choose how to paint. Freehand brushes the colour on, Fill outline fills an area you drag round, and Fill polygon fills the corners you click, closing on the first one, as with the boundary. The eraser beside them rubs paint out.",
          highlight: { box: [0.4595, 0.9253, 0.0716, 0.0547], label: "Paint tools" },
          cursor: { at: [0.5184, 0.9526], click: true },
          zoom: [0.287, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "<strong>Save land-use plan</strong> is now the button at the bottom of the panel. While you paint, Redraw boundary, Hide site boundary and Plan land use are greyed out, with the note <strong>Finish or cancel drawing to change overlay visibility.</strong>",
          highlight: { box: [0.0032, 0.9432, 0.1789, 0.0547], label: "Save land-use plan" },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "site-landuse-paint",
      title: "Paint the zones",
      lead: "Pick a land use, paint its area, then go on to the next: switching swatch keeps what you've already painted. We painted four zones with Fill polygon.",
      image: "img/3-07-landuse-painted.webp",
      url: "coplanai.ikonai.app",
      alt: "The land-use editor with four painted zones over the plan: green open space in the north-west, a brown mixed-use block in the centre, a pale yellow residential area in the north-east and a red commercial area in the east. Commercial and Fill polygon are selected, and Recalculate land uses is now active in the left panel.",
      beats: [
        {
          html: "Each zone shows in its land use's colour over the plan: green for <strong>Open space</strong>, brown for <strong>Mixed use</strong>, yellow for <strong>Residential</strong> and red for <strong>Commercial</strong>.",
          highlight: { box: [0.3417, 0.1631, 0.4951, 0.4405], label: "Painted zones" },
          zoom: [0.2817, 0.0758, 0.6151, 0.6151]
        },
        {
          html: "<strong>Recalculate land uses</strong> becomes clickable once something is painted. You don't need it to save: saving reads the colours anyway.",
          highlight: { box: [0.0032, 0.7379, 0.1155, 0.0505], label: "Recalculate" },
          zoom: [0, 0.5548, 0.4167, 0.4167]
        },
        {
          html: "When every zone is painted, click <strong>Save land-use plan</strong>.",
          highlight: { box: [0.0032, 0.9432, 0.1789, 0.0547], label: "Save land-use plan" },
          cursor: { at: [0.0926, 0.9705], click: true },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "site-landuse-review",
      title: "Review the recognised land uses",
      lead: "Saving reads the land uses from the colours and asks you to review the result before you go on.",
      image: "img/3-08-landuse-review.webp",
      url: "coplanai.ikonai.app",
      alt: "The review after saving: the heading Land-use plan recognised above the painted plan, Draw land use and Continue as land use at the bottom right, and in the left panel Site boundary folded and Land use plan already Set, then RECOGNISED LAND USES (Water 7.7%, Transport & roads 5.9%, Mixed use 2.4%, Residential 2.4%, Open space 2%) with an orange warning that many areas didn't match the standard colours.",
      note: {
        kind: "warning",
        title: "Check the list before you go on",
        html: "Generation follows the zoning that was recognised, not the one you meant. If a painted zone is missing or the warning appears, look at <a href='#site-colours'>the colour standard</a> before you start ideation."
      },
      beats: [
        {
          html: "<strong>Land-use plan recognised</strong>: Studio has read the land uses from the plan's colours. Generations follow this zoning until the plan is unmarked.",
          highlight: { box: [0.1984, 0.0611, 0.7921, 0.0621], label: "Recognised" }
        },
        {
          html: "<strong>RECOGNISED LAND USES</strong> lists what was found, with a percentage for each. Compare it with what you painted: ours lists <strong>Water</strong> and <strong>Transport &amp; roads</strong>, which we never painted, and leaves out our red Commercial zone.",
          highlight: { box: [0.0032, 0.6453, 0.1789, 0.1684], label: "Recognised land uses" },
          zoom: [0, 0.5212, 0.4167, 0.4167]
        },
        {
          html: "The warning, <strong>Many areas didn't match the standard colours — results may be unreliable.</strong>, means much of the image matched none of the standard colours closely, so the list may not reflect your zoning. Every pixel is matched to the nearest standard colour, so colours already printed on the plan count too.",
          highlight: { box: [0.0032, 0.6453, 0.1789, 0.1684], label: "Recognised land uses" },
          zoom: [0, 0.5212, 0.4167, 0.4167]
        },
        {
          html: "The plan already reads <strong>Set</strong> in the panel. We clicked <strong>Continue as land use</strong> to go on with this zoning and return to the Site tab. <strong>Draw land use</strong>, beside it, is the other way out of the review; we didn't try it.",
          highlight: { box: [0.8904, 0.9389, 0.1001, 0.0506], label: "Continue as land use" },
          cursor: { at: [0.9405, 0.9642], click: true },
          zoom: [0.5833, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "site-landuse-set",
      title: "Check the land-use plan",
      lead: "After Continue as land use you're back on the Site tab, with the plan laid over the leading image. Click a section's header to fold it away: here <strong>Site boundary</strong> is folded to make room.",
      image: "img/3-09-landuse-set.webp",
      url: "coplanai.ikonai.app",
      alt: "The Site tab with the land-use plan set: Site boundary folded to one line reading Set, Land use plan reading Set, the colour legend, Review land use, Unmark plan, Hide land use plan, RECOGNISED LAND USES with the warning, and View plan. The painted zones show as a translucent overlay on the leading image.",
      beats: [
        {
          html: "<strong>Land use plan</strong> now reads <strong>Set</strong>.",
          highlight: { box: [0.0032, 0.2537, 0.1789, 0.0379], label: "Set" },
          zoom: [0, 0.0643, 0.4167, 0.4167]
        },
        {
          html: "<strong>Review land use</strong>, <strong>Unmark plan</strong> and <strong>Hide land use plan</strong> manage the plan. Generations follow the zoning until you unmark it, but only until the first generation: after that, Review land use and Unmark plan are gone. <strong>Hide land use plan</strong> turns the coloured overlay on the image off and on.",
          highlight: { box: [0.0032, 0.5147, 0.1593, 0.0948], label: "Review, unmark, hide" },
          zoom: [0, 0.3538, 0.4167, 0.4167]
        },
        {
          html: "<strong>RECOGNISED LAND USES</strong> stays on the tab, warning and all, so you can always see the zoning that generation will follow.",
          highlight: { box: [0.0032, 0.6053, 0.1789, 0.1684], label: "Recognised land uses" },
          zoom: [0, 0.4812, 0.4167, 0.4167]
        },
        {
          html: "<strong>View plan</strong> opens the painted plan full size.",
          highlight: { box: [0.0032, 0.7695, 0.0689, 0.0505], label: "View plan" },
          cursor: { at: [0.0376, 0.7947], click: true },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "site-colours",
      title: "Mind the colour standard",
      lead: "The land uses and their colours come from the project's colour standard. To open it, click Edit colours in project settings, the small sliders icon at the right end of the COLOUR LEGEND line. <strong>Project settings</strong> opens on the <strong>Settings</strong> tab, at <strong>LAND USE</strong>.",
      image: "img/3-10-colour-standard.webp",
      url: "coplanai.ikonai.app",
      alt: "Project settings on the Settings tab, at LAND USE: the Land-use colour standard named Dubai land use, with rows for Residential (#FFF176), Commercial (#E53935), Mixed use and Industrial, each with its colour, name and prompt text. Under Commercial, an orange note reads Too close to the red boundary marker.",
      note: {
        kind: "tip",
        title: "Remember to save",
        html: "Changes here are kept only when you click Save, at the very bottom of the dialog. Studio Settings has a land-use colour standard too: see <a href='#org-settings-ideation'>Ideation options and the master prompt</a>."
      },
      beats: [
        {
          html: "<strong>Land-use colour standard</strong> holds the project's land-use colours. By default it is called <strong>Dubai land use</strong>. Hover the &#9432; beside the title for how it works: each pixel of a marked plan is matched to the nearest standard colour.",
          zoom: [0.1161, 0.1832, 0.4763, 0.4763]
        },
        {
          html: "Each land use has a colour, a name and a prompt fragment: the words that tell generation what the colour means. Check them against your place. Here <strong>Residential</strong> reads <strong>residential neighbourhoods of villas and low-rise homes</strong>, which may not describe your downtown.",
          zoom: [0.1161, 0.1832, 0.4763, 0.4763]
        },
        {
          html: "<strong>Too close to the red boundary marker</strong> flags <strong>Commercial</strong>: a colour close to the boundary marker may not be recognised as land use, which is the likely reason our red Commercial zone went missing. Water carries the same warning for the blue marker, although our list still shows Water, read from the plan's own colours. If a land use you paint goes missing from the list, change its colour to one without a warning and paint it again.",
          highlight: { box: [0.2947, 0.5695, 0.1306, 0.03], label: "Clash warning" },
          zoom: [0.1516, 0.3762, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "site-start-ideation",
      title: "Start ideation when the site is ready",
      lead: "When both sections read <strong>Set</strong> and you have checked them (your line in <strong>View boundary</strong>, your zones under <strong>RECOGNISED LAND USES</strong>), the site is ready for ideation.",
      image: "img/3-11-start-ideation.webp",
      url: "coplanai.ikonai.app",
      alt: "The Site tab with everything in place: Site boundary Set with Redraw boundary, Clear boundary, Hide site boundary and View boundary; Land use plan Set with Review land use, Unmark plan, Hide land use plan and the recognised land uses; the land-use overlay on the leading image; and the green Start ideation button at the bottom.",
      note: {
        kind: "warning",
        title: "The site is fixed once generation starts",
        html: "Start ideation runs the project's first generation straight away and doesn't ask you to confirm. Once the first generation has run, from this tab or any other, the boundary and land-use plan are fixed: Redraw boundary, Clear boundary, Review land use, Unmark plan and Plan land use disappear, leaving only Hide and View, and the tab says &ldquo;The boundary is fixed once generation has started.&rdquo; A boundary or plan you haven't added by then can't be added later."
      },
      beats: [
        {
          html: "<strong>Site boundary</strong> is <strong>Set</strong>. If you haven't yet, check your line with <strong>View boundary</strong>.",
          highlight: { box: [0.0032, 0.2137, 0.1789, 0.0379], label: "Boundary set", side: "above" },
          zoom: [0, 0.0243, 0.4167, 0.4167]
        },
        {
          html: "<strong>Land use plan</strong> is <strong>Set</strong>, and <strong>RECOGNISED LAND USES</strong> shows the zoning generation will follow.",
          highlight: { box: [0.0032, 0.3905, 0.1789, 0.0379], label: "Plan set" },
          zoom: [0, 0.2011, 0.4167, 0.4167]
        },
        {
          html: "<strong>Start ideation</strong> runs the project's first generation from the Site tab. In the next chapter we start from the Quick actions tab instead, to choose the density, creativity and style of the first run: see <a href='#ideation'>Generate design options</a>.",
          highlight: { box: [0.0032, 0.9432, 0.1789, 0.0547], label: "Start ideation" },
          cursor: { at: [0.0926, 0.9705], click: false },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    }
  ]
});
