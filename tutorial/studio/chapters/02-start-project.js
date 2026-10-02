/* CoPlanAI Studio guide: Chapter 2: Start a project. */
/*
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 * Every box and cursor point comes from tools/capture.js (re-capture with tools/flows/02-start-project.js) and was
 * checked by drawing it on the screenshot.
 */
window.COPLAN_TUTORIAL.chapters.push({
  id: "start-project",
  title: "Start a *project*",
  summary: "Choose how a project works, add the site plan and create it from Studio home, or start a Focus Area from a street photo; then review the project's own settings.",
  steps: [
    {
      id: "start-process",
      title: "Choose the process",
      lead: "Studio home opens on the new-project form. Start with the row of chips under the large drop zone: the process decides how the project works and what kind of images you get back. None is selected at first, and the project can't be created until you pick one.",
      image: "img/2-01-process.webp",
      url: "coplanai.ikonai.app",
      alt: "Studio home with the new-project form: a large empty drop zone for the site plan with Choose from existing above it, and under it the process chips Conceptual Plan (selected), Master Plan and Focus Area, the SCOPE chips and a disabled Create project button.",
      note: {
        kind: "info",
        title: "Our example",
        html: "The downtown plan in this guide is a <strong>Conceptual Plan</strong> with the scope <strong>Master plan</strong>, started from the downtown land-use plan."
      },
      beats: [
        {
          html: "Choose <strong>Conceptual Plan</strong> early on, when you want to compare different directions side by side. You can run several concepts at once, and every design option comes as a pair: a top view and an eye-level view.",
          highlight: { box: [0.2058, 0.7916, 0.0796, 0.0463], label: "Conceptual Plan" },
          cursor: { at: [0.2456, 0.8147], click: true },
          zoom: [0.0373, 0.4509, 0.5491, 0.5491]
        },
        {
          html: "The line under the chips says what the chosen process is for: &ldquo;Explore multiple design variations in parallel.&rdquo;",
          highlight: { box: [0.2058, 0.8316, 0.1567, 0.0273], label: "What it does" },
          zoom: [0.0373, 0.4509, 0.5491, 0.5491]
        },
        {
          html: "Choose <strong>Master Plan</strong> when the direction is set and you want to &ldquo;work linearly towards a defined outcome&rdquo;, refining the design iteration after iteration. It also starts from a site plan, and also gives a top view and an eye-level view of each option.",
          highlight: { box: [0.2833, 0.7916, 0.0654, 0.0463], label: "Master Plan" },
          cursor: { at: [0.316, 0.8147], click: false },
          zoom: [0.0373, 0.4509, 0.5491, 0.5491]
        },
        {
          html: "Choose <strong>Focus Area</strong> to &ldquo;redesign an existing place starting from a street-level photo&rdquo;, such as a street or a square. It starts from a photo instead of a site plan, and every result is a single redesigned street-level view. More on it below.",
          highlight: { box: [0.3466, 0.7916, 0.063, 0.0463], label: "Focus Area" },
          cursor: { at: [0.3781, 0.8147], click: false },
          zoom: [0.0373, 0.4509, 0.5491, 0.5491]
        }
      ]
    },
    {
      id: "start-scope",
      title: "Choose the scope, then add the site plan",
      lead: "Conceptual Plan and Master Plan also ask for a <strong>SCOPE</strong>: how much of the site you are designing. Then the form needs the site plan the project starts from.",
      image: "img/2-02-scope.webp",
      url: "coplanai.ikonai.app",
      alt: "The new-project form with Conceptual Plan selected and, under SCOPE, Single building or lot selected with its line: Design one building or building complex on its parcel. The large drop zone above reads Drop or add the site plan.",
      note: {
        kind: "warning",
        title: "Click the scope, even if it looks selected",
        html: "In our tests, when <strong>Master plan</strong> was left as pre-selected, adding the site image switched the scope to <strong>Single building or lot</strong>. Clicking <strong>Master plan</strong> first kept it. Check the scope again before you create the project."
      },
      beats: [
        {
          html: "<strong>Master plan</strong> is the scope already selected when the form opens (here we have switched to Single building or lot to show the change). It lays out a complete site, with its streets, plots and open space: the choice for a district, a neighbourhood or a downtown like ours. For our downtown, click it anyway (see the warning below).",
          highlight: { box: [0.2058, 0.88, 0.0656, 0.0463], label: "Master plan" },
          cursor: { at: [0.2386, 0.9032], click: false },
          zoom: [0.0303, 0.5058, 0.4942, 0.4942]
        },
        {
          html: "Choose <strong>Single building or lot</strong> when you design one building or building complex on its parcel.",
          highlight: { box: [0.2693, 0.88, 0.0937, 0.0463], label: "Single building or lot" },
          cursor: { at: [0.3162, 0.9032], click: false },
          zoom: [0.0303, 0.5058, 0.4942, 0.4942]
        },
        {
          html: "The line underneath changes with your choice, so you can check what you picked.",
          highlight: { box: [0.2058, 0.92, 0.1851, 0.0274], label: "What it does" },
          zoom: [0.0303, 0.5058, 0.4942, 0.4942]
        },
        {
          html: "Now add the site plan. Drop a PNG, JPEG or WebP file on <strong>Drop or add the site plan</strong>, or click it to pick a file. This image becomes the project's leading image.",
          highlight: { box: [0.2058, 0.2021, 0.7737, 0.5853], label: "Site plan" },
          cursor: { at: [0.5926, 0.5121], click: true }
        },
        {
          html: "Already uploaded it? Click <strong>Choose from existing</strong> to reuse an image from this Studio.",
          highlight: { box: [0.2058, 0.1474, 0.1143, 0.0505], label: "Choose from existing" },
          cursor: { at: [0.2629, 0.1726], click: true },
          zoom: [0.0546, 0, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "start-choose-existing",
      title: "Reuse an image from Studio",
      lead: "Choose from existing opens a picker with the images already in this Studio. Picking one only fills in the form: nothing is created yet.",
      image: "img/2-03-choose-existing.webp",
      url: "coplanai.ikonai.app",
      alt: "The Choose from uploaded images dialog over Studio home: tabs Uploads (6) and Drawings (47), six thumbnails with the downtown land-use plan ticked, 1 selected, Cancel and Add 1.",
      beats: [
        {
          html: "<strong>Choose from uploaded images</strong>: pick one image already uploaded to this Studio.",
          highlight: { box: [0.2405, 0.2001, 0.1824, 0.0663], label: "Choose from uploaded images" },
          zoom: [0.0659, 0.0173, 0.4809, 0.4809]
        },
        {
          html: "<strong>Uploads</strong> lists the images uploaded to this Studio, with their number.",
          highlight: { box: [0.2426, 0.2569, 0.0634, 0.0506], label: "Uploads" },
          zoom: [0.0659, 0.0173, 0.4809, 0.4809]
        },
        {
          html: "<strong>Drawings</strong> holds drawings made in Studio projects, such as boundary outlines and land-use plans. It grows as teams work: here it already lists 47.",
          highlight: { box: [0.3018, 0.2569, 0.0733, 0.0506], label: "Drawings" },
          cursor: { at: [0.3385, 0.2822], click: false },
          zoom: [0.0659, 0.0173, 0.4809, 0.4809]
        },
        {
          html: "Click an image to select it: a tick appears on it. We picked the downtown land-use plan.",
          highlight: { box: [0.4473, 0.3159, 0.1054, 0.2109], label: "Selected" },
          cursor: { at: [0.5, 0.4214], click: true },
          zoom: [0.2916, 0.213, 0.4167, 0.4167]
        },
        {
          html: "The footer now reads <strong>1 selected</strong>. Click <strong>Add 1</strong> to put the image in the form.",
          highlight: { box: [0.7183, 0.7557, 0.0412, 0.0505], label: "Add 1" },
          cursor: { at: [0.7389, 0.7809], click: true },
          zoom: [0.22, 0.45, 0.55, 0.55]
        }
      ]
    },
    {
      id: "start-create",
      title: "Check the scale and create the project",
      lead: "The plan now fills the form, and a scale setting appears under it. Check the scale and your choices, then create the project.",
      image: "img/2-04-create.webp",
      url: "coplanai.ikonai.app",
      alt: "The new-project form with the downtown land-use plan as the leading image and Replace above it; under it the scale setting, Site size 4426 m with Scale detected from the plan, please verify; Conceptual Plan and Master plan selected; and an active Create project button.",
      note: {
        kind: "warning",
        title: "Always check the detected scale",
        html: "Each time we added the same plan, Studio suggested a different site size: 1,810 m, 3,219 m, 4,023 m, 4,426 m and 7,849 m. Twice it found no scale at all. Compare the value with the plan's own scale bar. You can correct it later in Project settings, on the Details tab (see <a href='#start-project-details'>Review the project details</a>)."
      },
      beats: [
        {
          html: "The plan is in place as the project's leading image. <strong>Replace</strong> swaps it for another one.",
          highlight: { box: [0.2058, 0.0547, 0.7731, 0.639], label: "Leading image" },
          cursor: { at: [0.2373, 0.08], click: false }
        },
        {
          html: "Studio needs the plan's scale. <strong>Map scale</strong> is the ratio printed on a plan drawing, such as 1:1000. For an image with no printed scale, such as an aerial view or a sketch, use <strong>Site size</strong>: how far the site spans across its longest side, in m, km or ft. The AI uses either to keep buildings, streets and open spaces proportionate. Hover the <em>i</em> icon at the end of the row to read this explanation in Studio.",
          highlight: { box: [0.2058, 0.6989, 0.252, 0.059], label: "Scale" },
          cursor: { at: [0.4483, 0.7284], click: false },
          zoom: [0.0733, 0.52, 0.48, 0.48]
        },
        {
          html: "Studio reads the plan for a printed scale and fills in a value: <strong>Scale detected from the plan — please verify.</strong> If it finds none, it asks you to enter it, and <strong>Create project</strong> waits until you do.",
          highlight: { box: [0.2163, 0.7516, 0.1572, 0.0273], label: "Please verify" },
          zoom: [0.0733, 0.52, 0.48, 0.48]
        },
        {
          html: "Check the process and the scope once more. Ours: <strong>Conceptual Plan</strong> and <strong>Master plan</strong>.",
          highlight: { box: [0.2058, 0.7842, 0.2038, 0.1347], label: "Process and scope" },
          zoom: [0.0733, 0.52, 0.48, 0.48]
        },
        {
          html: "Click <strong>Create project</strong>. The new project opens in Ideation, on the Site tab, where the next chapter starts.",
          highlight: { box: [0.9055, 0.8905, 0.074, 0.0506], label: "Create project" },
          cursor: { at: [0.9425, 0.9158], click: true },
          zoom: [0.5833, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "<strong>The project is named for you — everything stays editable in Project setup.</strong> That is the Project settings dialog, at the end of this chapter.",
          highlight: { box: [0.2058, 0.9453, 0.2528, 0.0273], label: "Named for you" },
          zoom: [0.1239, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "start-focus-map",
      title: "Start a Focus Area from the map",
      lead: "A Focus Area starts from a street-level photo instead of a site plan. You can pick one straight from the map: Studio shows where street photos have been taken.",
      image: "img/2-05-focus-map.webp",
      url: "coplanai.ikonai.app",
      alt: "The new-project form with Focus Area selected: Image source set to From the map, a map of central Turin covered in photo-thumbnail markers with one selected, and under the map the chosen street photo with its capture date and Mapillary credit, Explore and Use this photo & start.",
      beats: [
        {
          html: "Click <strong>Focus Area</strong>. The site-plan drop zone and the SCOPE chips make way for <strong>Image source</strong>.",
          highlight: { box: [0.2058, 0.9211, 0.2097, 0.0684], label: "Focus Area" },
          cursor: { at: [0.3781, 0.9442], click: true },
          zoom: [0.1023, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "<strong>From the map</strong> is selected at first. <strong>Upload an image</strong> takes your own photo instead (two steps on).",
          highlight: { box: [0.2074, 0.1505, 0.1864, 0.0548], label: "Image source" },
          zoom: [0.0922, 0, 0.4167, 0.4167]
        },
        {
          html: "Type in <strong>Search address or place…</strong> and pick a result to move the map there. We searched for Via Garibaldi in Turin.",
          highlight: { box: [0.2105, 0.2221, 0.7642, 0.0505], label: "Search" },
          cursor: { at: [0.2743, 0.2474], click: true }
        },
        {
          html: "Small photo thumbnails on the map are photo markers; a number on one shows how many photos are grouped there, and tapping it zooms in to split the group. Tap a marker without a number to select its photo.",
          highlight: { box: [0.6126, 0.5, 0.0337, 0.0674], label: "Photo marker" },
          cursor: { at: [0.6295, 0.5337], click: true },
          zoom: [0.4211, 0.3253, 0.4167, 0.4167]
        },
        {
          html: "The selected photo appears under the map, with the date it was captured and its credit: the photographer, Mapillary and the CC BY-SA 4.0 licence.",
          highlight: { box: [0.2105, 0.8274, 0.1617, 0.08], label: "Selected photo" },
          zoom: [0.083, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "<strong>Explore</strong> opens it in street view, where you can frame your own view (next step). Double-tapping a street on the map also opens street view, at the nearest photo to where you tapped.",
          highlight: { box: [0.8105, 0.8421, 0.0605, 0.0505], label: "Explore" },
          cursor: { at: [0.8407, 0.8674], click: false },
          zoom: [0.5833, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "Focus Area has no Create project button: <strong>Use this photo &amp; start</strong> creates the Focus Area project from this photo straight away.",
          highlight: { box: [0.871, 0.8421, 0.1037, 0.0505], label: "Use this photo & start" },
          cursor: { at: [0.9229, 0.8674], click: false },
          zoom: [0.5833, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "start-focus-street-view",
      title: "Frame the view in street view",
      lead: "Street view opens the nearest street photo inside the form. From here you choose exactly what the project starts from.",
      image: "img/2-06-focus-street-view.webp",
      url: "coplanai.ikonai.app",
      alt: "Street view inside the new-project form: a street-level photo of a Turin street with parked cars, flags on a facade and a forward arrow, Back to map at the top left, the line Drag to look around, the Mapillary credit, and Use this view & start at the bottom right.",
      note: {
        kind: "tip",
        title: "No photos where you work?",
        html: "Some places have few street photos or none: around downtown Georgetown, Texas, the map showed no photo markers at all. Use <strong>Upload an image</strong> with a photo of your own instead."
      },
      beats: [
        {
          html: "Drag the photo to look around, and follow the arrows to move along the street.",
          highlight: { box: [0.2058, 0.2811, 0.7737, 0.5852], label: "Street view" },
          cursor: { at: [0.685, 0.6028], click: false }
        },
        {
          html: "The line underneath sums it up: look around, move along the street, then capture the view you want.",
          highlight: { box: [0.2058, 0.8621, 0.3297, 0.0274], label: "How it works" },
          zoom: [0.1458, 0.5503, 0.4497, 0.4497]
        },
        {
          html: "<strong>Back to map</strong> takes you back to try another street.",
          highlight: { box: [0.2105, 0.2905, 0.0703, 0.0421], label: "Back to map" },
          cursor: { at: [0.2456, 0.3116], click: false },
          zoom: [0.0373, 0.1032, 0.4167, 0.4167]
        },
        {
          html: "The photos come from Mapillary's contributors, under CC BY-SA 4.0.",
          highlight: { box: [0.2058, 0.8974, 0.1367, 0.0273], label: "Photo credit" },
          zoom: [0.0658, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "When the view is right, <strong>Use this view &amp; start</strong> starts the Focus Area project from it. We stopped here.",
          highlight: { box: [0.8676, 0.8863, 0.1119, 0.0505], label: "Use this view & start" },
          cursor: { at: [0.9235, 0.9116], click: false },
          zoom: [0.5833, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "start-focus-upload",
      title: "Or start from your own photo",
      lead: "Have a photo of the place already? Upload it instead of using the map.",
      image: "img/2-07-focus-upload.webp",
      url: "coplanai.ikonai.app",
      alt: "The new-project form with Focus Area and Upload an image selected: a large drop zone reading Drop or add a photo of the place, Choose from existing at the top right, and the status Add a photo of the place to begin.",
      beats: [
        {
          html: "Under <strong>Image source</strong>, click <strong>Upload an image</strong>.",
          highlight: { box: [0.2926, 0.2189, 0.1012, 0.0548], label: "Upload an image" },
          cursor: { at: [0.3432, 0.2463], click: true },
          zoom: [0.1349, 0.038, 0.4167, 0.4167]
        },
        {
          html: "Drop your photo on <strong>Drop or add a photo of the place</strong>, or click to pick a file: PNG, JPEG or WebP. A street-level or eye-level photo works best.",
          highlight: { box: [0.2058, 0.2811, 0.7737, 0.5852], label: "Photo of the place" },
          cursor: { at: [0.5926, 0.5911], click: true }
        },
        {
          html: "<strong>Choose from existing</strong> moves to the top right. It opens the same picker as before.",
          highlight: { box: [0.8652, 0.2263, 0.1143, 0.0505], label: "Choose from existing" },
          cursor: { at: [0.9223, 0.2516], click: false },
          zoom: [0.5833, 0.0432, 0.4167, 0.4167]
        },
        {
          html: "Until a photo is in, the form says <strong>Add a photo of the place to begin</strong>. Then a Use this photo &amp; start button appears at the bottom right and starts the project.",
          highlight: { box: [0.8621, 0.9105, 0.1174, 0.0274], label: "Status" },
          zoom: [0.5833, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "start-project-details",
      title: "Review the project details",
      lead: "Everything you chose stays editable. In a project, click the sliders icon at the top right of the Actions panel (<strong>Project settings</strong>), or choose Project setup in the project card's &bull;&bull;&bull; menu. The dialog opens on <strong>Settings</strong>; start with <strong>Details</strong>.",
      image: "img/2-08-details.webp",
      url: "coplanai.ikonai.app",
      alt: "The Project settings dialog of the downtown project on the Details tab: Project name, URL slug with a regenerate button, Process Conceptual Plan, Scope Master plan, Location, Area, Project type, Section lead, Target deadline, Output quality 2K and Output format WebP.",
      beats: [
        {
          html: "Click <strong>Details</strong>.",
          highlight: { box: [0.3354, 0.1316, 0.0584, 0.0505], label: "Details" },
          cursor: { at: [0.3646, 0.1568], click: true },
          zoom: [0.1562, 0, 0.4167, 0.4167]
        },
        {
          html: "<strong>Project name</strong> is where you rename the project. The <strong>URL slug</strong> is its web address and keeps the name Studio first gave it; the button next to it regenerates the slug from the current name, which changes the link.",
          highlight: { box: [0.2832, 0.2168, 0.4315, 0.1221], label: "Name and address" },
          cursor: { at: [0.6995, 0.3116], click: false },
          zoom: [0.2232, 0.0021, 0.5515, 0.5515]
        },
        {
          html: "<strong>Process</strong> and <strong>Scope</strong> can be changed here too. Process offers only Conceptual Plan and Master Plan.",
          highlight: { box: [0.2832, 0.3495, 0.4315, 0.1105], label: "Process and scope" },
          zoom: [0.2232, 0.129, 0.5515, 0.5515]
        },
        {
          html: "<strong>Location</strong>, <strong>Area</strong>, <strong>Project type</strong>, <strong>Section lead</strong> and <strong>Target deadline</strong> are recorded for reference: they don't affect image generation.",
          highlight: { box: [0.2832, 0.4716, 0.4315, 0.3158], label: "For reference" },
          zoom: [0.2232, 0.3538, 0.5515, 0.5515]
        },
        {
          html: "<strong>Output quality</strong> (1K, 2K or 4K) and <strong>Output format</strong> (WebP, PNG or JPG) set the resolution and file type of the images. Scroll further down to find Site scale, which holds the scale you confirmed when you created the project.",
          highlight: { box: [0.2832, 0.7979, 0.4315, 0.1105], label: "Output" },
          zoom: [0.2232, 0.4485, 0.5515, 0.5515]
        },
        {
          html: "As the dialog says, <strong>Detail changes save as you edit</strong>. This tab has no Save button, so change only what you mean to.",
          highlight: { box: [0.4718, 0.1, 0.1263, 0.0295], label: "Saves as you edit" },
          zoom: [0.3266, 0, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "start-project-settings",
      title: "Tune the quick actions",
      lead: "The <strong>Settings</strong> tab holds the project's own set-up: the quick actions offered in Ideation, the touch-up legend and the land-use colour standard.",
      image: "img/2-09-settings.webp",
      url: "coplanai.ikonai.app",
      alt: "Project settings on the Settings tab: QUICK ACTIONS with Scene toggles (Group 1 with Day, Dusk and Night and their prompt lines), Area steppers (Greenery, 3 levels) and Additive elements (Water feature), each row with eye, pencil, undo and bin icons.",
      note: {
        kind: "warning",
        title: "This tab has its own Save",
        html: "Unlike Details, this tab ends with a Save button, at the very bottom, below Touch-up color prompts and the Land-use colour standard (chapter 3). Scroll down and click it to keep your changes."
      },
      beats: [
        {
          html: "Click <strong>Settings</strong>. It opens on <strong>QUICK ACTIONS</strong>.",
          highlight: { box: [0.2763, 0.1316, 0.0633, 0.0505], label: "Settings" },
          cursor: { at: [0.308, 0.1568], click: true },
          zoom: [0.0996, 0, 0.4167, 0.4167]
        },
        {
          html: "<strong>Scene toggles</strong> are groups of options where only one can be on, such as the time of day: <strong>Day</strong>, <strong>Dusk</strong> or <strong>Night</strong>. The option you select adds its line of prompt text to the generation.",
          highlight: { box: [0.2832, 0.2368, 0.4315, 0.3632], label: "Scene toggles" },
          zoom: [0.2232, 0.1427, 0.5515, 0.5515]
        },
        {
          html: "Each option has four icons. The eye (its tooltip reads Hide in this project) hides it here without deleting it; the pencil edits it, the arrow (greyed out until you change something) undoes your edit, and the bin removes it.",
          highlight: { box: [0.6063, 0.3579, 0.0948, 0.0505], label: "Row actions" },
          cursor: { at: [0.6189, 0.3832], click: false },
          zoom: [0.4453, 0.1748, 0.4167, 0.4167]
        },
        {
          html: "<strong>Area steppers</strong> become sliders with several levels in the Adjust card of Quick actions, such as <strong>Greenery</strong> with 3 levels. Each level adds its prompt text once more.",
          highlight: { box: [0.2832, 0.6537, 0.4315, 0.1116], label: "Area steppers" },
          zoom: [0.2138, 0.4377, 0.5623, 0.5623]
        },
        {
          html: "<strong>Additive elements</strong> are one-tap chips that add a single element to the scene, such as a <strong>Water feature</strong>.",
          highlight: { box: [0.2832, 0.8158, 0.4315, 0.1116], label: "Additive elements" },
          zoom: [0.2138, 0.4377, 0.5623, 0.5623]
        }
      ]
    },
    {
      id: "start-project-site-team",
      title: "Check the site material",
      lead: "The <strong>Site</strong> tab holds the material the project started from. The <strong>Team</strong> button at the top right shows who works on the project.",
      image: "img/2-10-site.webp",
      url: "coplanai.ikonai.app",
      alt: "Project settings on the Site tab: Site context with a 1 files badge, the downtown land-use plan marked Leading, a Drop or add tile, and the Team button at the top right of the dialog.",
      beats: [
        {
          html: "Click <strong>Site</strong>.",
          highlight: { box: [0.3896, 0.1316, 0.0465, 0.0505], label: "Site" },
          cursor: { at: [0.4128, 0.1568], click: true },
          zoom: [0.2045, 0, 0.4167, 0.4167]
        },
        {
          html: "<strong>Site context</strong> lists the project's site files; ours has one.",
          highlight: { box: [0.2832, 0.2042, 0.08, 0.0379], label: "Site context" },
          zoom: [0.1144, 0.0148, 0.5074, 0.5074]
        },
        {
          html: "The plan you started from carries the <strong>Leading</strong> badge: it is the project's leading image.",
          highlight: { box: [0.2832, 0.2463, 0.088, 0.1352], label: "Leading image" },
          cursor: { at: [0.3272, 0.3139], click: false },
          zoom: [0.1144, 0.0148, 0.5074, 0.5074]
        },
        {
          html: "<strong>Drop or add</strong> adds more site material to the project.",
          highlight: { box: [0.369, 0.2463, 0.088, 0.1352], label: "Drop or add" },
          cursor: { at: [0.413, 0.3244], click: false },
          zoom: [0.1144, 0.0148, 0.5074, 0.5074]
        },
        {
          html: "Click <strong>Team</strong> to see who works on the project. It opens from any tab of Project settings.",
          highlight: { box: [0.6729, 0.1316, 0.0529, 0.0505], label: "Team" },
          cursor: { at: [0.6994, 0.1568], click: true },
          zoom: [0.491, 0, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "start-project-team",
      title: "See who is on the project",
      lead: "The Team button opens a small dialog over Project settings with the project's own team.",
      image: "img/2-11-team.webp",
      url: "coplanai.ikonai.app",
      alt: "The Project team dialog over the dimmed Project settings: the line Who leads and collaborates on this project, a TEAM list with one member, Damiano Cerrone, marked lead, and an Add member button.",
      beats: [
        {
          html: "<strong>Project team</strong>: &ldquo;Who leads and collaborates on this project.&rdquo;",
          highlight: { box: [0.3921, 0.4132, 0.166, 0.0663], label: "Project team" },
          zoom: [0.2916, 0.2916, 0.4167, 0.4167]
        },
        {
          html: "Under <strong>TEAM</strong>, each person is listed with their role. Our project has one member, Damiano Cerrone, its <strong>lead</strong>.",
          highlight: { box: [0.3921, 0.4774, 0.1115, 0.06], label: "Team" },
          zoom: [0.2916, 0.2916, 0.4167, 0.4167]
        },
        {
          html: "<strong>Add member</strong> adds a colleague to this project's team.",
          highlight: { box: [0.3921, 0.5395, 0.0751, 0.0505], label: "Add member" },
          cursor: { at: [0.4297, 0.5647], click: false },
          zoom: [0.2916, 0.2916, 0.4167, 0.4167]
        },
        {
          html: "The dialog has no close button: press <kbd>Esc</kbd> to close it, and again to close Project settings.",
          highlight: { box: [0.3789, 0.3837, 0.2422, 0.2326], label: "Project team" },
          zoom: [0.2916, 0.2916, 0.4167, 0.4167]
        }
      ]
    }
  ]
});
