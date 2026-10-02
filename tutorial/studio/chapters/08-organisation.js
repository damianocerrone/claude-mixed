/* CoPlanAI Studio guide: Chapter 8: Studio for your organisation. */
/*
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 * Every box, cursor point and zoom comes from the capture JSON written by tools/capture.js
 * (flow: tools/flows/08-organisation.js), and was checked on the debug image.
 * Everything here was captured VIEW ONLY: the two "New …" dialogs were closed with Cancel, nothing was deleted,
 * added, linked or saved. img/8-01-uploads.webp: the card's hover buttons are shown as a mouse user sees them
 * (the capture browser reports no hover, so they were revealed with a local style on that one card).
 */
window.COPLAN_TUTORIAL.chapters.push({
  id: "organisation",
  title: "Studio for your *organisation*",
  summary: "Keep your Studio's images in order, build shared mood boards and planning presets, decide who can edit each project, follow every action in the audit log, and tailor the settings behind every generation.",
  steps: [
    {
      id: "org-uploads",
      title: "Tidy up uploaded images",
      lead: "<strong>Uploaded images</strong>, under <strong>General</strong> in the Studio menu, collects every image uploaded into this Studio: the site plans, photos and other pictures your team has added.",
      image: "img/8-01-uploads.webp",
      url: "coplanai.ikonai.app",
      alt: "The Uploaded images page: Usage, Uploaded by, Type and Sort filters above a grid of six image cards, each labelled Used with a count or Unused, with its upload date, time and uploader. The pointer rests on the Unused card, which shows a View full size button and a red Delete button.",
      note: {
        kind: "tip",
        title: "Reloading takes you to Projects",
        html: "<strong>Uploaded images</strong>, <strong>Team &amp; permissions</strong> and <strong>Audit log</strong> have no web address of their own: the browser keeps showing the Projects address. If you reload one of these pages, Studio shows Projects instead, so open it again from the Studio menu."
      },
      beats: [
        {
          html: "The page lists <strong>every image uploaded into this Studio</strong>, newest first, with the date and time of the upload and the name of the person who uploaded it.",
          highlight: { box: [0.1947, 0.0705, 0.3633, 0.059], label: "Uploaded images" },
          zoom: [0.1347, 0, 0.4833, 0.4833]
        },
        {
          html: "Narrow the list with <strong>Usage</strong> (<strong>All</strong>, <strong>Used</strong> or <strong>Unused</strong>), <strong>Uploaded by</strong> (anyone, or only you) and <strong>Type</strong> (<strong>Uploads</strong> or <strong>Drawings</strong>). <strong>Sort</strong>, on the right, orders the cards by date or by how often they're used.",
          highlight: { box: [0.1947, 0.1368, 0.7958, 0.0664], label: "Filters and sort" },
          cursor: { at: [0.2374, 0.18], click: true }
        },
        {
          html: "The label on each card says how often the image has been used: <strong>Used 6×</strong> on this one. It gives a count only; the page doesn't say which projects use the image.",
          highlight: { box: [0.2021, 0.409, 0.0366, 0.0337], label: "Used" },
          zoom: [0.0121, 0.2175, 0.4167, 0.4167]
        },
        {
          html: "Hover a card to show its buttons. <strong>View full size</strong> opens the image across the whole screen; press <kbd>Esc</kbd> to close it again.",
          highlight: { box: [0.9455, 0.2343, 0.0215, 0.043], shape: "circle", label: "View full size" },
          cursor: { at: [0.9563, 0.2558], click: true },
          zoom: [0.5833, 0.0475, 0.4167, 0.4167]
        },
        {
          html: "An image nothing uses is marked <strong>Unused</strong>, and only those cards offer the red <strong>Delete</strong>. Look at the image full size before you remove it.",
          highlight: { box: [0.9635, 0.2343, 0.0215, 0.043], shape: "circle", label: "Delete" },
          cursor: { at: [0.9743, 0.2558], click: false },
          zoom: [0.5833, 0.0475, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "org-mood-boards",
      title: "Build a shared mood board",
      lead: "Under <strong>Library</strong>, <strong>Mood boards &amp; style refs</strong> holds sets of reference images that steer the look of your planners' designs. Studio calls each set a <strong>preset</strong>. The library starts empty, with <strong>No presets yet</strong>: click <strong>+ New preset</strong> to make the first one.",
      image: "img/8-02-mood-board.webp",
      url: "coplanai.ikonai.app",
      alt: "The New preset dialog, scrolled down: the reference-image drop zone (0 of 5 used) with Choose from library, Description with a greyed-out Generate description button, Tags, State with Active selected and Draft, Scope with Shared selected and Project-only, and Cancel and a greyed-out Save & make Active at the bottom.",
      note: {
        kind: "info",
        title: "Where mood boards are used",
        html: "A planning preset can recommend mood boards. When a planner picks that preset, its mood boards load into the project's references automatically. The next step shows how."
      },
      beats: [
        {
          html: "Give the preset a <strong>Name</strong> at the top of the dialog, then add its <strong>Reference images</strong>: at least one, at most five. Drop them here, or click <strong>Choose from library</strong> to reuse images already in this Studio.",
          highlight: { box: [0.21, 0.0913, 0.5721, 0.1537], label: "Reference images" },
          cursor: { at: [0.259, 0.2197], click: true },
          zoom: [0.15, 0, 0.6921, 0.6921]
        },
        {
          html: "The <strong>Description</strong> steers the look at generation time. Write it yourself, or click <strong>Generate description</strong> to have it drafted from your images, then edit the draft as you like. The button stays grey until you add an image.",
          highlight: { box: [0.21, 0.2534, 0.5721, 0.1411], label: "Description" },
          cursor: { at: [0.7393, 0.2787], click: false },
          zoom: [0.15, 0, 0.6921, 0.6921]
        },
        {
          html: "<strong>Tags</strong> drive the library's quick filter, so planners can find the preset later. Pick an existing tag or a new one.",
          highlight: { box: [0.21, 0.4029, 0.5721, 0.0947], label: "Tags" },
          zoom: [0.15, 0.1042, 0.6921, 0.6921]
        },
        {
          html: "<strong>State</strong> decides who sees it: <strong>Active</strong> publishes it to the shared library for every planner, <strong>Draft</strong> keeps it to yourself while you work on it. <strong>Scope</strong> decides where it can be used: <strong>Shared</strong> across the Studio and all projects, or <strong>Project-only</strong> for references that belong to a single project.",
          highlight: { box: [0.21, 0.5061, 0.5721, 0.3642], label: "State and scope" },
          cursor: { at: [0.374, 0.635], click: false },
          zoom: [0.15, 0.3079, 0.6921, 0.6921]
        },
        {
          html: "<strong>Save &amp; make Active</strong> adds the preset to the library; it is greyed out while the form is empty. <strong>Cancel</strong> closes the dialog without saving anything.",
          highlight: { box: [0.21, 0.9045, 0.58, 0.0505], label: "Save & make Active" },
          cursor: { at: [0.7419, 0.9297], click: false },
          zoom: [0.15, 0.3, 0.7, 0.7]
        }
      ]
    },
    {
      id: "org-planning-presets",
      title: "Bundle a planning preset",
      lead: "A <strong>planning preset</strong> bundles render style, layout and recommended references, so a planner can apply a tested direction all at once. Under <strong>Library</strong>, open <strong>Planning presets</strong> and click <strong>+ New planning preset</strong>. Start with a <strong>Name</strong> and a short <strong>Description</strong>; the description shows in the info tooltip on the preset's card.",
      image: "img/8-03-planning-preset.webp",
      url: "coplanai.ikonai.app",
      alt: "The New planning preset dialog: Name and Description fields, Available for with Conceptual plans, Master plans and Focus areas switched on, Render style set to Massing, Layout geometry to Linear, Creativity to Balanced, Recommended references with a pick from library button, Descriptor text with a Generate button, and Cancel and a greyed-out Create planning preset at the bottom.",
      note: {
        kind: "info",
        title: "Where planners find it",
        html: "A planning preset appears in the <strong>Presets</strong> tab, the third tab of a project's Actions panel, in every type of project it is available for. Clicking it stages the whole bundle in the <strong>PENDING</strong> tray, where the planner can review or adjust it before generating. Until there is one, the tab says <strong>No planning presets for this plan type yet</strong>. See <a href='#ideation'>Generate design options</a>."
      },
      beats: [
        {
          html: "<strong>Available for</strong> sets the types of project that offer the preset: <strong>Conceptual plans</strong>, <strong>Master plans</strong> and <strong>Focus areas</strong>. All three start switched on, and at least one stays on.",
          highlight: { box: [0.21, 0.3497, 0.2124, 0.0879], label: "Available for" },
          cursor: { at: [0.3901, 0.4124], click: false },
          zoom: [0.1078, 0.1853, 0.4167, 0.4167]
        },
        {
          html: "Choose the <strong>Render style</strong> (Massing, Sketch, Illustrative or Photoreal), the <strong>Layout geometry</strong> (Linear, Organic or Hybrid) and the <strong>Creativity</strong> (Conservative, Balanced or Exploratory). Layout geometry has no quick action of its own: a planning preset is the way to set it.",
          highlight: { box: [0.21, 0.4613, 0.5721, 0.1869], label: "Style, layout, creativity" },
          cursor: { at: [0.3545, 0.5197], click: true },
          zoom: [0.15, 0.2087, 0.6921, 0.6921]
        },
        {
          html: "Click <strong>+ pick from library</strong> to add mood boards from the previous step as <strong>Recommended references</strong>. When a planner picks the preset, they load into the project's references automatically: a starting point, not a lock.",
          highlight: { box: [0.21, 0.6676, 0.0927, 0.0732], label: "Recommended references" },
          cursor: { at: [0.2486, 0.7208], click: false },
          zoom: [0.048, 0.4958, 0.4167, 0.4167]
        },
        {
          html: "The <strong>Descriptor text</strong> is the prompt fragment sent at generation. Studio drafts it from the description, options and references above; edit it, or click <strong>Generate</strong> to have it written with AI. Fill in the fields above first: <strong>Generate</strong> can be clicked even while the form is empty.",
          highlight: { box: [0.21, 0.7492, 0.5721, 0.1411], label: "Descriptor text" },
          cursor: { at: [0.7588, 0.7745], click: false },
          zoom: [0.15, 0.3079, 0.6921, 0.6921]
        },
        {
          html: "Further down, add an optional <strong>Card thumbnail</strong> and set the <strong>Visibility</strong>: <strong>Public</strong> for everyone, as the footer says here, or <strong>Private</strong> for you alone. Then click <strong>Create planning preset</strong>.",
          highlight: { box: [0.21, 0.9045, 0.58, 0.0505], label: "Create planning preset" },
          cursor: { at: [0.7363, 0.9297], click: false },
          zoom: [0.15, 0.3, 0.7, 0.7]
        }
      ]
    },
    {
      id: "org-teams",
      title: "Decide who can edit a project",
      lead: "Under <strong>Organisation</strong>, <strong>Team &amp; permissions</strong> groups people into teams and links each team to projects. <strong>Studio access is separate from a person's app role</strong>, so this page is where you give colleagues the right to edit in Studio.",
      image: "img/8-04-team.webp",
      url: "coplanai.ikonai.app",
      alt: "The Team & permissions page: a green New team button, an information banner explaining who can edit a project, and the card of the Conceptual Plan 2026-09-28 2 team, with Damiano Cerrone under Members, an Add member dropdown, the project Conceptual Plan 2026-09-28 2 under Projects and a Link a project dropdown.",
      note: {
        kind: "tip",
        title: "Renamed a project?",
        html: "Its team keeps the project's first name. The team of <strong>Downtown plan (Studio tutorial demo)</strong>, for example, is still called <strong>Conceptual Plan 2026-10-02 team</strong>. Look under <strong>PROJECTS</strong> on each card to find the right one."
      },
      beats: [
        {
          html: "The rule: <strong>a project is editable only by its creator by default</strong>. Add a person to a team and link the team to a project, and every member of that team can edit it. Everyone else keeps read-only access.",
          highlight: { box: [0.1947, 0.1368, 0.7879, 0.059], label: "Who can edit" }
        },
        {
          html: "Every project has a team like this one, named after the project, with its creator as the first member.",
          highlight: { box: [0.1947, 0.2179, 0.7879, 0.3505], label: "A team" }
        },
        {
          html: "Under <strong>MEMBERS</strong>, open <strong>Add member…</strong> and pick a colleague. The list holds everyone in your app in alphabetical order, with no search box.",
          highlight: { box: [0.2037, 0.2863, 0.1326, 0.1253], label: "Members" },
          cursor: { at: [0.27, 0.3863], click: false },
          zoom: [0.0617, 0.1406, 0.4167, 0.4167]
        },
        {
          html: "Under <strong>PROJECTS</strong>, <strong>Link a project…</strong> lets the team edit another project too, and clicking a project's name opens it. The <strong>×</strong> on a name removes that person or unlinks that project; the bin at the card's top right deletes the team.",
          highlight: { box: [0.2037, 0.4253, 0.1326, 0.1252], label: "Projects" },
          cursor: { at: [0.27, 0.5253], click: false },
          zoom: [0.0617, 0.2795, 0.4167, 0.4167]
        },
        {
          html: "<strong>+ New team</strong> adds a team of your own, for a group of colleagues who work on several projects together.",
          highlight: { box: [0.9199, 0.0695, 0.0706, 0.0505], label: "New team" },
          cursor: { at: [0.9552, 0.0947], click: false },
          zoom: [0.5833, 0, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "org-audit-log",
      title: "See who did what in the audit log",
      lead: "<strong>Audit log</strong>, under <strong>Organisation</strong>, records <strong>every action taken across Studio in this app</strong>: who did what, and when. The newest actions come first.",
      image: "img/8-05-audit.webp",
      url: "coplanai.ikonai.app",
      alt: "The Audit log page: the activity filter open on All activity, Projects, Presets, Planning presets, Generations, Teams and Configuration, a Refresh button, and a list of actions by Damiano Cerrone with dates and times. One Generate row is expanded to show what changed: Model, Concept and Action type.",
      note: {
        kind: "info",
        title: "Reading the rows",
        html: "Some rows use Studio's internal names: <strong>BoundarySet project</strong> means a site boundary was saved, and <strong>LandUsePlanSet project</strong> that a land-use plan was saved. Concepts and images show as <strong>(unnamed)</strong> in the details."
      },
      beats: [
        {
          html: "Each row is one action: a label for its kind (here <strong>Generate</strong>), what happened, who did it and when.",
          highlight: { box: [0.1953, 0.4316, 0.7868, 0.0779], label: "One action" }
        },
        {
          html: "Open <strong>All activity</strong> to show one kind of action only: <strong>Projects</strong>, <strong>Presets</strong> (the mood boards), <strong>Planning presets</strong>, <strong>Generations</strong>, <strong>Teams</strong> or <strong>Configuration</strong>.",
          highlight: { box: [0.1947, 0.1368, 0.099, 0.2949], label: "Filter" },
          cursor: { at: [0.2417, 0.3421], click: true },
          zoom: [0.0359, 0.0759, 0.4167, 0.4167]
        },
        {
          html: "<strong>Refresh</strong> loads the latest actions.",
          highlight: { box: [0.2916, 0.1368, 0.0617, 0.0506], label: "Refresh" },
          cursor: { at: [0.3225, 0.1621], click: false },
          zoom: [0.1141, 0, 0.4167, 0.4167]
        },
        {
          html: "Click <strong>Details</strong> on a row to see <strong>WHAT CHANGED</strong>. For a generated image, that's the image model (<strong>Gemini3ProImage</strong>), the concept and the kind of action (<strong>QuickAction</strong>). <strong>Hide details</strong> folds it away again.",
          highlight: { box: [0.1947, 0.5042, 0.7879, 0.2505], label: "Details" },
          cursor: { at: [0.9419, 0.5442], click: true }
        }
      ]
    },
    {
      id: "org-settings",
      title: "Tailor Studio's settings",
      lead: "<strong>Settings</strong>, the last item under <strong>Organisation</strong>, holds the configuration behind every Studio generation in your app: the options planners choose from, and the prompt text each option sends to the image model.",
      image: "img/8-06-settings.webp",
      url: "coplanai.ikonai.app",
      alt: "The Studio Settings page: a Configuration source card marked Inherited, a greyed-out Save configuration button, and the Planning presets section with the Render styles list (Massing, Sketch, Illustrative, Photoreal) and the Layout geometry list (Linear, Organic, Hybrid), each row with edit, revert and delete buttons, and the start of the Creativity list below.",
      note: {
        kind: "warning",
        title: "These settings are for everyone",
        html: "Settings apply to the whole app, not to one project. Saving creates an app-specific override of the platform default, and every planner in your app then generates with it. Change one thing at a time, and tell your planners what you changed."
      },
      beats: [
        {
          html: "<strong>Configuration source</strong> tells you where the settings come from. <strong>Inherited</strong> means your app still uses the platform default configuration.",
          highlight: { box: [0.1947, 0.0705, 0.7879, 0.1821], label: "Configuration source" }
        },
        {
          html: "Under <strong>Planning presets</strong>, <strong>Render styles</strong>, <strong>Layout geometry</strong> and, below them, <strong>Creativity</strong> hold the choices planners pick from. The grey line under each name is the prompt fragment sent to the model: <strong>Massing</strong>, for example, asks for a clean conceptual massing model of simple volumetric blocks.",
          highlight: { box: [0.1947, 0.3253, 0.7879, 0.4105], label: "Planning presets options" }
        },
        {
          html: "Each row has three buttons: the pencil edits it, the curved arrow undoes your changes to it, and the red bin removes it.",
          highlight: { box: [0.5003, 0.4421, 0.0715, 0.0505], label: "Edit, revert, delete" },
          cursor: { at: [0.5168, 0.4674], click: false },
          zoom: [0.3277, 0.259, 0.4167, 0.4167]
        },
        {
          html: "<strong>+ Add</strong> adds an option to its list, such as a render style in your own house style.",
          highlight: { box: [0.5352, 0.3811, 0.0474, 0.0505], label: "+ Add" },
          cursor: { at: [0.5589, 0.4063], click: false },
          zoom: [0.3505, 0.198, 0.4167, 0.4167]
        },
        {
          html: "Nothing changes until you click <strong>Save configuration</strong>. It is the only Save button on this long page, here at the top, and it stays grey until you change something.",
          highlight: { box: [0.899, 0.2568, 0.0915, 0.0506], label: "Save configuration" },
          cursor: { at: [0.9447, 0.2821], click: false },
          zoom: [0.5833, 0.0737, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "org-settings-density",
      title: "Descriptors, density and required elements",
      lead: "Scroll down Settings for the guidance that drafts planning-preset descriptors, the density bands and the facilities a brief can require.",
      image: "img/8-07-settings-density.webp",
      url: "coplanai.ikonai.app",
      alt: "Studio Settings scrolled down: the Planning preset descriptor guidance text with its Full drafting prompt preview opened, the Density bands list (Low, Medium, Medium-high, High) with a prompt fragment under each, and the start of the Canvas section with Required elements.",
      beats: [
        {
          html: "<strong>Planning preset descriptor guidance</strong> is the instruction Studio follows to draft a planning preset's <strong>Descriptor text</strong>. By default it describes only the street pattern, the open spaces, where the centre sits and the overall character; density, building types and style are set separately.",
          highlight: { box: [0.1947, 0.0516, 0.7879, 0.1716], label: "Descriptor guidance" }
        },
        {
          html: "Click <strong>FULL DRAFTING PROMPT — PREVIEW</strong> to see what is sent: your guidance, then the preset's description and reference presets. It is for reading only: values can't be edited there.",
          highlight: { box: [0.2037, 0.2158, 0.77, 0.1379], label: "PREVIEW" },
          cursor: { at: [0.2266, 0.23], click: false }
        },
        {
          html: "<strong>Density bands</strong> are the choices behind Density in Quick actions. Each one sends a building-type clause: <strong>High</strong>, for example, asks for three- to five-storey apartment blocks with structured or podium parking.",
          highlight: { box: [0.1947, 0.4284, 0.7879, 0.3727], label: "Density bands" },
          cursor: { at: [0.4202, 0.7595], click: false }
        },
        {
          html: "<strong>Required elements</strong>, under <strong>Canvas</strong>, are the facilities a brief can require, from <strong>Community mosque</strong> to <strong>Transit stop</strong>. The ones a planner selects go into every generation as one instruction, whatever planning preset is used.",
          highlight: { box: [0.1947, 0.8189, 0.7879, 0.1811], label: "Required elements" }
        }
      ]
    },
    {
      id: "org-settings-ideation",
      title: "Ideation options and the master prompt",
      lead: "Further down, the <strong>Ideation</strong> section sets how many images each run produces, the building blocks of the Quick actions panel and the prompts every generation starts from.",
      image: "img/8-08-settings-ideation.webp",
      url: "coplanai.ikonai.app",
      alt: "The Ideation section of Studio Settings: Images per batch set to 2, Scene toggles with Day, Dusk and Night and an Add option button, Area steppers with Greenery at 3 levels, Additive elements with Water feature and People, and the Master prompt describing a development parcel in Dubai.",
      note: {
        kind: "info",
        title: "Further down the page",
        html: "<strong>FULL GENERATION PROMPT — PREVIEW</strong> shows the order in which a prompt is put together, from the master prompt to the change being applied. Then come <strong>Dynamic prompt composition</strong> (an AI rewrite of the whole prompt before each generation, which adds time and cost), <strong>Touch-up color prompts</strong>, the <strong>Land-use colour standard</strong> (see <a href='#site'>Prepare the site</a>) and <strong>Production</strong>: views, scene states, output quality, export file names and report sections."
      },
      beats: [
        {
          html: "<strong>Images per batch</strong> is how many images each ideation run produces, from 1 to 8; here, 2. Every extra image is one more generation.",
          highlight: { box: [0.2037, 0.1284, 0.0802, 0.0905], label: "Images per batch" },
          cursor: { at: [0.2405, 0.1916], click: false },
          zoom: [0.0354, 0, 0.4167, 0.4167]
        },
        {
          html: "<strong>Scene toggles</strong> are the either-or choices in Quick actions, here <strong>Day</strong>, <strong>Dusk</strong> and <strong>Night</strong>. <strong>Add option</strong> adds a choice to the group; <strong>Add group</strong> starts a new set.",
          highlight: { box: [0.5897, 0.1021, 0.3929, 0.4126], label: "Scene toggles" },
          cursor: { at: [0.6432, 0.4579], click: false },
          zoom: [0.4674, 0.0421, 0.5326, 0.5326]
        },
        {
          html: "<strong>Area steppers</strong> add a ± control with several levels, like <strong>Greenery</strong>. <strong>Additive elements</strong> are one-tap chips that add a single element, such as a <strong>Water feature</strong> or <strong>People</strong>.",
          highlight: { box: [0.1947, 0.5189, 0.7879, 0.2295], label: "Steppers and additive elements" }
        },
        {
          html: "The <strong>Master prompt</strong> comes first in every generation. The default describes a parcel <strong>in Dubai</strong>, in a hot-arid desert setting with desert and palm planting. If your projects are elsewhere, rewrite it for your region, and check the <strong>Focus prompt</strong> and <strong>Single-building prompt</strong> below it too.",
          highlight: { box: [0.2037, 0.7747, 0.77, 0.139], label: "Master prompt" },
          cursor: { at: [0.3596, 0.844], click: false }
        }
      ]
    }
  ]
});
