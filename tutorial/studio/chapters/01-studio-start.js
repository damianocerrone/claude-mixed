/* CoPlanAI Studio guide: Chapter 1: Find your way into Studio. */
/*
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 * Every box, cursor point and zoom comes from the capture JSON written by tools/capture.js
 * (flow: tools/flows/01-studio-start.js), and was checked on the debug image. Where several beats of a step share
 * one zoom (so the camera holds still), it is the JSON zoom of one of the step's highlights: the card's zoom in
 * studio-recent, and the "area" highlight (button + menu) that the flow writes for studio-card-menu.
 */
window.COPLAN_TUTORIAL.chapters.push({
  id: "studio-start",
  title: "Find your way into *Studio*",
  summary: "Open Studio from your CoPlanAI dashboard, find your way round Studio home, its menu and the Projects page, and learn the layout of a project.",
  steps: [
    {
      id: "studio-open",
      title: "Open Studio from your dashboard",
      lead: "Studio is part of CoPlanAI. On your app dashboard, under <strong>Choose your experience</strong>, the <strong>Studio</strong> card comes first.",
      image: "img/1-01-dashboard.webp",
      url: "coplanai.ikonai.app",
      alt: "The CoPlanAI app dashboard: the heading Choose your experience and, below it, the Studio card with a green Open Studio button, a Start a new project form with a Choose from existing button and a large drop zone for the site plan. Three icons sit in the top-right corner.",
      note: {
        kind: "info",
        title: "Further down the card",
        html: "Scroll down the Studio card for the rest of the form and <strong>Create project</strong>, then your <strong>Recent projects</strong> with an <strong>All projects</strong> link. They work as on Studio home, shown in the next steps."
      },
      beats: [
        {
          html: "The <strong>Studio</strong> card is your way into CoPlan Studio, the workspace for your planning projects.",
          highlight: { box: [0.1768, 0.2674, 0.6464, 0.7326], label: "Studio" }
        },
        {
          html: "Click <strong>Open Studio</strong> to go to Studio home, where the rest of this guide begins.",
          highlight: { box: [0.7272, 0.3011, 0.0791, 0.0505], label: "Open Studio" },
          cursor: { at: [0.7668, 0.3263], click: true },
          zoom: [0.5584, 0.118, 0.4167, 0.4167]
        },
        {
          html: "You can also start a project right here: <strong>Start a new project</strong> offers the same choices as the form on Studio home. <a href='#start-project'>Start a project</a> walks you through it.",
          highlight: { box: [0.1937, 0.3642, 0.6126, 0.6358], label: "Form" }
        },
        {
          html: "The icons in the top-right corner (your gallery, app settings and your account) belong to the wider CoPlanAI app. The <a href='../'>platform guide</a> covers them.",
          highlight: { box: [0.9084, 0, 0.0821, 0.0516], label: "App icons" },
          zoom: [0.5833, 0, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "studio-home",
      title: "Get your bearings on Studio home",
      lead: "<strong>Open Studio</strong> brings you to Studio home, the place to start new projects, with the Studio menu on the left.",
      image: "img/1-02-studio-home.webp",
      url: "coplanai.ikonai.app",
      alt: "Studio home: the breadcrumb Studio / Home at the top, the menu on the left with its General, Library and Organisation groups, a greeting with today's date, and a large new-project form with Choose from existing, a drop zone for the site plan, three process chips, Scope, and a greyed-out Create project button.",
      beats: [
        {
          html: "The breadcrumb at the top tells you where you are: here, <strong>Studio</strong> / <strong>Home</strong>. Wherever you are in Studio, click <strong>Studio</strong> to come back to this page.",
          highlight: { box: [0.033, 0.0074, 0.0625, 0.0347], label: "Where you are" },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "Studio greets you with today's date and your name, and asks: <strong>Ready to shape the next plan?</strong>",
          highlight: { box: [0.1947, 0.0695, 0.174, 0.0947], label: "Greeting" },
          zoom: [0.0734, 0, 0.4167, 0.4167]
        },
        {
          html: "Most of the page is the new-project form: you add the site plan, choose how the project starts and pick its scope. <a href='#start-project'>Start a project</a> explains each choice.",
          highlight: { box: [0.2037, 0.1895, 0.7779, 0.8105], label: "New-project form" },
          cursor: { at: [0.5926, 0.5411], click: false }
        },
        {
          html: "<strong>Create project</strong> stays grey until the form is complete. The text beside it tells you what is missing: <strong>Add a site image to begin</strong>, then <strong>Pick a planning process</strong>. Studio names the project for you, and everything stays editable later in <strong>Project setup</strong>, the Project settings dialog (see <a href='#start-project-details'>Review the project details</a>).",
          highlight: { box: [0.9055, 0.9221, 0.074, 0.0505], label: "Create project", side: "above" },
          cursor: { at: [0.9425, 0.9474], click: false },
          zoom: [0.5833, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "studio-menu",
      title: "Move around with the Studio menu",
      lead: "The menu on the left of Studio's own pages takes you to every part of Studio. It has three groups, and two buttons at the top.",
      image: "img/1-03-studio-menu.webp",
      url: "coplanai.ikonai.app",
      alt: "Studio home with the menu on the left: General (Home, Projects, Uploaded images, Videos, Upscale), Library (Mood boards & style refs, Planning presets) and Organisation (Team & permissions, Audit log, Settings). Below the first of the two buttons beside MENU, a tooltip reads Move panel to the right side.",
      beats: [
        {
          html: "<strong>GENERAL</strong> is your everyday work: <strong>Home</strong>, <strong>Projects</strong>, the <strong>Uploaded images</strong> of your Studio, and the <strong>Videos</strong> and <strong>Upscale</strong> tools. The arrow on those two means the menu makes way for the tool's own settings panel. <a href='#media'>Videos and upscales</a> covers both tools.",
          highlight: { box: [0.0011, 0.1032, 0.1826, 0.2392], label: "General" },
          zoom: [0, 0.0144, 0.4167, 0.4167]
        },
        {
          html: "<strong>LIBRARY</strong> keeps what your team reuses from project to project: <strong>Mood boards & style refs</strong> holds sets of reference images, and <strong>Planning presets</strong> bundle a render style, a layout and recommended references.",
          highlight: { box: [0.0011, 0.3466, 0.1826, 0.1152], label: "Library" },
          zoom: [0, 0.1959, 0.4167, 0.4167]
        },
        {
          html: "<strong>ORGANISATION</strong> covers Studio as a whole: <strong>Team & permissions</strong> decides who can edit which project, <strong>Audit log</strong> records who did what and when, and <strong>Settings</strong> holds your Studio's configuration. See <a href='#organisation'>Studio for your organisation</a>.",
          highlight: { box: [0.0011, 0.4661, 0.1826, 0.1565], label: "Organisation" },
          zoom: [0, 0.336, 0.4167, 0.4167]
        },
        {
          html: "The first button beside <strong>MENU</strong>, <strong>Move panel to the right side</strong>, puts the menu on the right of the screen, if you prefer it there.",
          highlight: { box: [0.1384, 0.05, 0.0253, 0.0505], label: "Move panel", side: "below" },
          cursor: { at: [0.1511, 0.0753], click: false },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "The tooltip in the picture still belongs to the first button. The second, <strong>Collapse menu</strong>, shows no name of its own when you hover it. It folds the menu into a narrow strip of icons to give the page more room: hover an icon to see its page, and click <strong>Expand menu</strong> at the top of the strip to bring the full menu back.",
          highlight: { box: [0.1584, 0.05, 0.0253, 0.0505], label: "Collapse menu", side: "below" },
          cursor: { at: [0.1711, 0.0753], click: false },
          zoom: [0, 0, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "studio-recent",
      title: "Pick up a recent project",
      lead: "Scroll down Studio home to get back to the work in progress.",
      image: "img/1-04-recent-projects.webp",
      url: "coplanai.ikonai.app",
      alt: "Studio home scrolled down: the bottom of the new-project form with the process chips, Scope and Create project, then Recent projects with three project cards and an All projects link on the right.",
      beats: [
        {
          html: "<strong>Recent projects</strong> shows the three projects edited most recently, the latest first.",
          highlight: { box: [0.1947, 0.5568, 0.7958, 0.4243], label: "Recent projects" }
        },
        {
          html: "Each card shows the project's image, its status, its process and how many people are on its team, then its name, who owns it and when it was last edited. Click the card to open the project.",
          highlight: { box: [0.1947, 0.6074, 0.2011, 0.3737], label: "Project card" },
          cursor: { at: [0.2953, 0.7274], click: true },
          zoom: [0.0484, 0.5063, 0.4937, 0.4937]
        },
        {
          html: "The <strong>&bull;&bull;&bull;</strong> button opens the card's menu: see <a href='#studio-card-menu'>Use a project card's menu</a>.",
          highlight: { box: [0.3574, 0.8421, 0.0252, 0.0505], shape: "circle", label: "More actions", side: "above" },
          cursor: { at: [0.37, 0.8674], click: false },
          zoom: [0.0484, 0.5063, 0.4937, 0.4937]
        },
        {
          html: "Looking for an older project? Click <strong>All projects</strong> for the full list.",
          highlight: { box: [0.9273, 0.5568, 0.0632, 0.0506], label: "All projects" },
          cursor: { at: [0.9589, 0.5821], click: true },
          zoom: [0.5833, 0.3737, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "studio-projects",
      title: "Find any project",
      lead: "<strong>Projects</strong> in the menu, or <strong>All projects</strong> on Studio home, lists your Studio's projects, with tools to narrow the list down.",
      image: "img/1-05-projects.webp",
      url: "coplanai.ikonai.app",
      alt: "The Projects page: the title Projects with 8 projects underneath, a green New project button, a search box, four dropdowns with the status dropdown open on All statuses, Active, Completed and Archived, and a grid of seven project cards.",
      note: {
        kind: "warning",
        title: "All statuses isn't quite all",
        html: "<strong>All statuses</strong> leaves archived projects out, but the count above includes them. That is why this page says 8 projects and shows seven cards. Choose <strong>Archived</strong> to see the missing one."
      },
      beats: [
        {
          html: "Under the title, Studio counts its projects. The number includes archived projects, and it doesn't change when you search or filter.",
          highlight: { box: [0.1947, 0.0705, 0.0428, 0.059], label: "Project count" },
          zoom: [0.0078, 0, 0.4167, 0.4167]
        },
        {
          html: "Type part of a name into <strong>Search projects…</strong>: the cards narrow down as you type.",
          highlight: { box: [0.1947, 0.1368, 0.1748, 0.0548], label: "Search" },
          cursor: { at: [0.24, 0.1642], click: true },
          zoom: [0.0738, 0, 0.4167, 0.4167]
        },
        {
          html: "The first dropdown filters by status: <strong>Active</strong>, <strong>Completed</strong> or <strong>Archived</strong>. Archived projects show up only when you choose <strong>Archived</strong>.",
          highlight: { box: [0.3674, 0.1389, 0.0821, 0.1998], label: "Status" },
          cursor: { at: [0.4049, 0.3105], click: false },
          zoom: [0.2001, 0.0305, 0.4167, 0.4167]
        },
        {
          html: "The other three narrow the list to your own projects (<strong>Anyone</strong> is the default) or to one process (<strong>All processes</strong> by default, or <strong>Conceptual Plan</strong>, <strong>Master Plan</strong> or <strong>Focus Area</strong>), and sort the cards by <strong>Newest</strong>, <strong>Oldest</strong> or <strong>Name</strong>.",
          highlight: { box: [0.4474, 0.1389, 0.2421, 0.0506], label: "Owner, process, sort" },
          cursor: { at: [0.5684, 0.1642], click: false },
          zoom: [0.3601, 0, 0.4167, 0.4167]
        },
        {
          html: "The cards are the same as on Studio home: click one to open the project.",
          highlight: { box: [0.1947, 0.2137, 0.1911, 0.3624], label: "Project card" },
          zoom: [0.0491, 0.1537, 0.4824, 0.4824]
        }
      ]
    },
    {
      id: "studio-card-menu",
      title: "Use a project card's menu",
      lead: "Every project card has a <strong>&bull;&bull;&bull;</strong> menu. It is the same on your dashboard, on Studio home and on the Projects page.",
      image: "img/1-06-card-menu.webp",
      url: "coplanai.ikonai.app",
      alt: "The Projects page with the menu of the Downtown plan (Studio tutorial demo) card open: Open project, Project setup, Report, Duplicate and Archive.",
      note: {
        kind: "tip",
        title: "Archived a project by mistake?",
        html: "Set the status filter to <strong>Archived</strong> and open the project's <strong>&bull;&bull;&bull;</strong> menu: on an archived project, <strong>Restore</strong> takes the place of <strong>Archive</strong>."
      },
      beats: [
        {
          html: "Click <strong>&bull;&bull;&bull;</strong> on a card to open its menu.",
          highlight: { box: [0.3474, 0.4372, 0.0252, 0.0505], shape: "circle", label: "More actions", side: "above" },
          cursor: { at: [0.36, 0.4624], click: true },
          zoom: [0.1228, 0.3473, 0.4167, 0.4167]
        },
        {
          html: "It has five items: <strong>Open project</strong>, <strong>Project setup</strong>, <strong>Report</strong>, <strong>Duplicate</strong> and <strong>Archive</strong>. The project's report is put together in Production's Report builder: see <a href='#production-report'>Put the report together</a>.",
          highlight: { box: [0.2897, 0.4826, 0.0829, 0.1916], label: "Card menu" },
          zoom: [0.1228, 0.3473, 0.4167, 0.4167]
        },
        {
          html: "<strong>Open project</strong> does the same as clicking the card. <strong>Project setup</strong> opens the project with its <strong>Project settings</strong> already open, ready to change its details, settings or site material.",
          highlight: { box: [0.2924, 0.4879, 0.0776, 0.08], label: "Open or set up" },
          cursor: { at: [0.3312, 0.5447], click: false },
          zoom: [0.1228, 0.3473, 0.4167, 0.4167]
        },
        {
          html: "<strong>Duplicate</strong> copies the project. <strong>Archive</strong> asks you to confirm first, then makes the project read-only: it stays viewable, you can still build reports from it, and from then on it appears only under the <strong>Archived</strong> status. Both change your Studio's project list, so use them with care.",
          highlight: { box: [0.2924, 0.5889, 0.0776, 0.08], label: "Duplicate or archive" },
          cursor: { at: [0.3312, 0.6458], click: false },
          zoom: [0.1228, 0.3473, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "studio-inside-project",
      title: "Find your way round a project",
      lead: "Click a card and the project opens in <strong>Ideation</strong>. This one, an earlier Conceptual Plan, already has images in two concepts.",
      image: "img/1-07-project.webp",
      url: "coplanai.ikonai.app",
      alt: "Inside the project Conceptual Plan 2026-09-28 2: the breadcrumb Studio / Conceptual Plan 2026-09-28 2, the Ideation and Production switch at the top, the Actions panel on the left with its icon tabs, a tooltip reading Quick actions and option cards for Scope, Density, Creativity and Render Style above a greyed-out Apply to current button, and the image area with Concept A (4 images) and Concept B (2 images).",
      note: {
        kind: "tip",
        title: "Back to the CoPlanAI dashboard",
        html: "Studio has no labelled link back to your app dashboard: the breadcrumb starts at <strong>Studio</strong>, and the account menu holds only <strong>Profile</strong>, <strong>Language</strong>, <strong>Theme</strong> and <strong>Log out</strong>. Use your browser's Back button, or go back to the address where you opened CoPlanAI (here coplanai.ikonai.app/coplanai)."
      },
      beats: [
        {
          html: "The breadcrumb now reads <strong>Studio</strong> / and the project's name. Click <strong>Studio</strong> to go back to Studio home, where the menu takes you anywhere else.",
          highlight: { box: [0.033, 0.0074, 0.1526, 0.0347], label: "Breadcrumb" },
          cursor: { at: [0.0479, 0.0247], click: true },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "A project has two workspaces. In <strong>Ideation</strong> you generate and refine design options; <strong>Production</strong> turns the latest of each concept into a render set. Switch between them here.",
          highlight: { box: [0.4375, 0.0011, 0.125, 0.0473], label: "Ideation | Production" },
          cursor: { at: [0.5276, 0.0247], click: false },
          zoom: [0.2916, 0, 0.4167, 0.4167]
        },
        {
          html: "The <strong>ACTIONS</strong> panel on the left holds the tools. Its icon tabs are, from left to right, <strong>Site</strong>, <strong>Quick actions</strong>, <strong>Presets</strong>, <strong>Touch-up</strong>, <strong>Adjust</strong>, <strong>Prompt</strong> and <strong>Impact</strong>: hover one to see its name. Above them sit <strong>All images</strong>, <strong>Save as planning preset</strong> and <strong>Project settings</strong>.",
          highlight: { box: [0.0032, 0.1074, 0.1789, 0.101], label: "Panel tabs" },
          cursor: { at: [0.0439, 0.1853], click: false },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "The two buttons beside <strong>ACTIONS</strong> work like the Studio menu's: <strong>Move panel to the right side</strong> puts the panel on the other side of the screen, and <strong>Collapse panel</strong> folds it into a narrow strip of icons to give the images more room.",
          highlight: { box: [0.1368, 0.05, 0.0453, 0.0505], label: "Panel layout" },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "The rest of the screen shows the project's images, grouped by concept. <a href='#refine'>Review and refine</a> shows how to look through them.",
          highlight: { box: [0.1989, 0.0747, 0.7911, 0.9137], label: "Images" }
        },
        {
          html: "<strong>Apply to current</strong> runs what you set in the panel. As the blue hint says, first choose or select the images to work on; the button turns solid green once a change is waiting. Each click starts an AI generation and uses generation credits (<strong>Each run generates 2 variant(s)</strong>), so click it only when you mean to. <a href='#ideation'>Generate design options</a> explains it.",
          highlight: { box: [0.0032, 0.9211, 0.1789, 0.0768], label: "Apply" },
          cursor: { at: [0.0926, 0.9484], click: false },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    }
  ]
});
