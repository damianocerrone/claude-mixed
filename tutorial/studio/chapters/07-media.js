/* CoPlanAI Studio guide: Chapter 7: Videos and upscales. */
/*
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 * Every box, cursor point and zoom comes from the capture JSON written by tools/capture.js
 * (flow: tools/flows/07-media.js), and was checked on the debug image, with these exceptions:
 *   - 7-02: the "presets" box was clipped at the top of the viewport (the presets card is scrolled partly out), so
 *     it is not used. Its JSON zoom [0, 0, 0.4167, 0.4167] is used without a highlight, widened (w === h, still
 *     containing the box) to [0, 0, 0.5, 0.5] for the selected Pedestal Up and Tilt Down chips and to
 *     [0, 0, 0.62, 0.62] for the whole OR CUSTOMIZE grid. The Prompt beat has no box of its own: it borrows the
 *     "duration" zoom, which contains the Prompt card, without a highlight.
 *   - 7-01: the "images" box serves two beats (Before, then After and Swap images).
 *   - 7-01: the mode box spans the Before / after and Sequence video labels, not one button (the flow measured the
 *     union of the two texts), so its pill reads "Two modes" and the beat introduces both.
 *   - media-pick: the green-tick beat has no JSON box, so it shows the whole plate.
 *   - Beats about the settings panel after a page was reopened (media-result, media-upscale-result) and the
 *     Generate sequence video beat (media-sequence) have no JSON box, so they show the whole plate.
 *   - 7-06: the "size" box is not used (with its padding it cuts through the Classic (no AI) line and runs well past
 *     the size); that beat keeps the JSON zoom without a highlight.
 *   - The icon-row beats (media-result, media-upscale-result) have no cursor: the pointer tip hid one of the icons, and
 *     the highlight's label already names them all. Label sides ("below") keep the pill off the controls the beat
 *     names (Cancel in media-pick, the author line in media-upscale-result).
 *   - 7-03 and 7-06 were taken by reopening the page from its URL (flow stages videoresult and upresult), not from
 *     Production, so their panels start empty.
 * <strong> marks labels printed on the step's own plate; <em> marks names that are only tooltips or aria labels, or
 * that are off the plate. Facts not visible on a plate come from docs/capture-notes.md (Chapter 7),
 * explore/raw/7-*.txt and 7-03-raw.png (NOW EDITING, shown straight after Generate video), explore/map.json (Video and Upscale), the ⓘ tooltips in
 * explore/production/71-, 89- and 91-*.txt and explore/media-org/21-*.txt, the sequence pickers and lists in
 * explore/media-org/23-, 24- and 25-*.txt, and the Studio-menu versions of both tools in explore/media-org/10-, 16-,
 * 30- and 32-*.txt. The guide's example video was made with Kling 2.6 (5 s, Drone View); the upscale with
 * Classic (no AI), from the Eye-level · Day render.
 */
window.COPLAN_TUTORIAL.chapters.push({
  id: "media",
  title: "Videos and *upscales*",
  summary: "Turn two images into a short video, or chain several into one, then make a 6K or 8K copy of a render, and know which engines use generation credits.",
  steps: [
    {
      id: "media-video",
      title: "Set up a before/after video",
      lead: "Two tools sit at the top right of Production: <em>Video</em> and <em>Image Upscale</em> (see <a href='#production-view'>Open Production</a>). The Studio menu has them too, as <em>Videos</em> and <em>Upscale</em> (see <a href='#studio-menu'>Move around with the Studio menu</a>). Open them from Production: the page stays inside your project, as the breadcrumb shows, and the video's Before image is already filled in with the project's leading image. Here we clicked <strong>Video</strong> in <strong>Downtown plan (Studio tutorial demo)</strong>.",
      image: "img/7-01-video-images.webp",
      url: "coplanai.ikonai.app",
      alt: "The Video page inside the example project, with the VIDEO SETTINGS panel on the left: Before / after selected over Sequence video; the Engine card with Kling 3.0, Kling 2.6 (ticked) and Classic (no AI); the Images card with the downtown land-use plan as Before (leading) and a lakeside plan as After (master), each marked Change, Swap images and a note on upload formats; the start of Camera Movement with six Quick Presets; and a green Generate video button. On the right, under the title Video, the card of a video made earlier, Drone View.",
      note: {
        kind: "tip",
        title: "Back to the project",
        html: "The Video page has no back button, and neither <strong>Ideation</strong> nor <strong>Production</strong> is highlighted in the switch at the top while you're on it. Click <strong>Production</strong> there to go back to the render set."
      },
      beats: [
        {
          html: "The page opens on <strong>Before / after</strong>: one short video that moves from one image to another, for example from the existing land-use plan to a concept. <strong>Sequence video</strong>, beside it, chains up to six images (see <a href='#media-sequence'>Make a sequence video</a>).",
          highlight: { box: [0.0258, 0.1158, 0.1374, 0.0274], label: "Two modes" },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "<strong>Engine</strong> decides how the video is made. <strong>Kling 3.0</strong>, ticked when the page opens, gives the <strong>Best quality before-to-after transitions</strong>; <strong>Kling 2.6</strong>, which we chose, is <strong>Faster and cheaper AI generation</strong>. As the info tooltip puts it, both AI engines &ldquo;generate a smooth transformation&rdquo;, so expect each video to use credits. <strong>Classic (no AI)</strong> makes a <strong>Simple transition between the two images</strong>, &ldquo;without AI and is free&rdquo;.",
          highlight: { box: [0.0032, 0.1495, 0.1784, 0.2572], label: "Engine" },
          zoom: [0, 0.0698, 0.4167, 0.4167]
        },
        {
          html: "Under <strong>Images</strong>, <strong>Before (leading)</strong> already holds the project's leading image, the downtown land-use plan. The video starts on it. Click <strong>Change</strong> on it to use another image.",
          highlight: { box: [0.0032, 0.4046, 0.1784, 0.2965], label: "Before and after" },
          zoom: [0, 0.3445, 0.4167, 0.4167]
        },
        {
          html: "<strong>After (master)</strong> is the image the video ends on. Until you choose one it reads &ldquo;Choose image&rdquo;: click it to open the picker in the next step. Here it already holds the lakeside plan we picked there. <strong>Swap images</strong> exchanges the two, so the video runs the other way. As the line under <strong>Swap images</strong> says, you can also upload an image of your own (JPG, PNG or WebP, up to 25MB).",
          highlight: { box: [0.0032, 0.4046, 0.1784, 0.2965], label: "Before and after" },
          zoom: [0, 0.3445, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "media-pick",
      title: "Pick the after image",
      lead: "Clicking <strong>After (master)</strong> opens <strong>Pick the after image</strong>: &ldquo;Choose an image from this Studio or upload a new one.&rdquo; It can take a few seconds to appear.",
      image: "img/7-01b-pick-after.webp",
      url: "coplanai.ikonai.app",
      alt: "The Pick the after image dialog over the Video page: the tabs Ideation (selected), Favorites, Renders and Uploads, an Upload image tile for JPG, PNG or WebP up to 25 MB, and a grid of the project's images, top-view lakeside plans with a legend and eye-level views of streets by the water, one top-view plan ticked green; at the bottom, After (master), Cancel and a green Use image button.",
      note: {
        kind: "info",
        title: "Opened from the Studio menu",
        html: "From <em>Videos</em> in the Studio menu, the breadcrumb reads <em>Studio / Videos</em> instead of a project's name, both image slots start empty, and the picker has just two tabs, <em>Generated</em> and <em>Uploads</em>. <em>Upscale</em> in the menu works the same way. Open the tools from Production when you want your project's images, favourites and renders to hand."
      },
      beats: [
        {
          html: "The tabs sort the project's images: <strong>Ideation</strong> (images generated in Ideation, top views and eye-level views alike), <strong>Favorites</strong>, <strong>Renders</strong> (the renders built in Production) and <strong>Uploads</strong>. The first tile, <strong>Upload image</strong>, takes a file of your own: <strong>JPG, PNG or WebP · max 25 MB</strong>.",
          highlight: { box: [0.2474, 0.1837, 0.1465, 0.0274], label: "Picker tabs" },
          zoom: [0.1123, 0, 0.4167, 0.4167]
        },
        {
          html: "Click an image to choose it: a green tick marks it. The video moves from the before image to the after image, so, as the info tooltip beside Images advises, &ldquo;Use two shots of the same scene with similar composition.&rdquo; Our before image is a top view, so we chose a top view of the lakeside plan, not one of the eye-level street views."
        },
        {
          html: "Click <strong>Use image</strong>. The image goes into the <strong>After (master)</strong> slot, as in the previous step. <strong>Cancel</strong> closes the picker without changing anything.",
          highlight: { box: [0.6998, 0.8332, 0.0597, 0.0505], label: "Use image", side: "below" },
          cursor: { at: [0.7296, 0.8584], click: true },
          zoom: [0.5213, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "media-camera",
      title: "Choose the camera move and length",
      lead: "Further down the panel, <em>Camera Movement</em> decides how the camera travels while one image turns into the other. It starts with six <em>Quick Presets</em> (<em>Walkthrough</em>, <em>Room Showcase</em>, <em>Drone View</em>, <em>Pull Back</em>, <em>Hero Shot</em> and <em>Detail Focus</em>), just above the part shown here. Start from a preset, adjust it if you like, then set the length and generate.",
      image: "img/7-02-camera-duration.webp",
      url: "coplanai.ikonai.app",
      alt: "The video settings panel scrolled down: OR CUSTOMIZE with the hint Click movements to combine (incompatible options will gray out), then the movement buttons of MOVE CAMERA, ROTATE CAMERA and ZOOM & EFFECTS, of which Pedestal Up and Tilt Down are selected in green; Prompt (optional) with its placeholder ‘Describe your building: modern architecture, daylight, beige stone facade’ and 0/2000; Duration with 5s selected and 10s; and the green Generate video button. The Drone View video card is on the right.",
      note: {
        kind: "info",
        title: "Classic (no AI) changes the options",
        html: "With the <em>Classic (no AI)</em> engine the prompt is &ldquo;Not used by the Classic engine&rdquo;, <strong>Orbit Left</strong>, <strong>Orbit Right</strong> and some presets are greyed out, and <strong>Duration</strong> offers 3s, 5s, 8s or 10s. The example video in this guide was made with <strong>Kling 2.6</strong>, at 5s with the <em>Drone View</em> preset."
      },
      beats: [
        {
          html: "Each preset is a set of movements from the grid below. As its info tooltip says, &ldquo;Presets apply a ready-made camera movement combination. Pick one, then customize it below if you like.&rdquo; <em>Walkthrough</em> is <strong>Dolly In</strong>, for example. We clicked <em>Drone View</em>, which selects <strong>Pedestal Up</strong> and <strong>Tilt Down</strong>: the camera rises and looks down, which is why we chose it for two top views.",
          zoom: [0, 0, 0.5, 0.5]
        },
        {
          html: "Under <strong>OR CUSTOMIZE</strong>, click movements to combine them. <strong>MOVE CAMERA</strong> moves the camera forward, back, sideways or up and down; <strong>ROTATE CAMERA</strong> turns it where it stands; <strong>ZOOM & EFFECTS</strong> zooms, orbits, or keeps it <strong>Static</strong>. As the hint says, movements that don't go with your choice grey out; <strong>Static</strong> greys out all the others.",
          zoom: [0, 0, 0.62, 0.62]
        },
        {
          html: "<strong>Prompt (optional)</strong> lets you describe the result in your own words, up to 2,000 characters. Its info tooltip says: &ldquo;Describe what you want the AI to generate. Be specific about materials, style, and atmosphere for best results.&rdquo; The example in the box is written for a building; for a plan, describe the place instead. We left it empty.",
          zoom: [0, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "<strong>Duration</strong> is the length of the video: <strong>5s</strong> or <strong>10s</strong>. We kept <strong>5s</strong>.",
          highlight: { box: [0.0032, 0.8224, 0.1784, 0.1116], label: "Duration" },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "With either Kling engine this is an AI generation that uses credits, and no cost is shown before you click. Click <strong>Generate video</strong>; it stays greyed out until both images are in place. Our 5-second Kling 2.6 video took several minutes. When it's ready, the green button becomes <em>Regenerate (overwrites)</em>: read the warning in the next step first.",
          highlight: { box: [0.0032, 0.9453, 0.1784, 0.0505], label: "Generate video" },
          cursor: { at: [0.0924, 0.9705], click: true },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "media-result",
      title: "Play, download or edit the video",
      lead: "As soon as the video is ready, Studio shows it large under <em>NOW EDITING</em> and adds it as a card on the Video page, where it stays: we reopened the page to take this screen.",
      image: "img/7-03-video-result.webp",
      url: "coplanai.ikonai.app",
      alt: "The Video page with the finished video's card: the first frame, the downtown land-use plan, with a play control at 0:00; the title Drone View and the tag Kling 2.6; small before and after images with an arrow between them and 5s; Damiano Cerrone · 2 Oct 2026; and download, edit and red delete icons. In the panel on the left, Kling 3.0 is ticked, both image slots read Choose image, and Generate video is greyed out above the line Pick a before and an after image to generate.",
      note: {
        kind: "warning",
        title: "The green button now overwrites",
        html: "As soon as a video is ready, the panel edits it (<em>NOW EDITING</em>: &ldquo;Adjust the settings in the panel and regenerate — the result replaces this video.&rdquo;) and the green button reads <em>Regenerate (overwrites)</em>. Clicking it replaces this video and, with a Kling engine, uses credits again. To make another video and keep this one, click <em>+ New video</em> below that button first. <em>Edit video</em> on a card is labelled for the same job; we didn't click it."
      },
      beats: [
        {
          html: "The card shows the video's first frame, here the land-use plan. Click the play button at the bottom left of the picture to watch it.",
          highlight: { box: [0.1947, 0.1189, 0.199, 0.3661], label: "Your video" },
          zoom: [0.0512, 0.0589, 0.4861, 0.4861]
        },
        {
          html: "Its title is the camera move, <strong>Drone View</strong>, and the tag beside it names the engine, <strong>Kling 2.6</strong>. Below come the before and after images, with an arrow between them, and the length, <strong>5s</strong>, then who made it and when: <strong>Damiano Cerrone · 2 Oct 2026</strong>.",
          highlight: { box: [0.2016, 0.3482, 0.1821, 0.0347], label: "Preset and engine" },
          zoom: [0.0843, 0.1572, 0.4167, 0.4167]
        },
        {
          html: "Three icons sit at the bottom right of the card: <em>Download video</em> (the arrow) saves the file for your presentation, <em>Edit video</em> (the pencil) opens it for editing, and <em>Delete video</em> (the red bin) removes it; we didn't try it, so download the video first if you might need it. Read the warning below before you edit.",
          highlight: { box: [0.3195, 0.4208, 0.0673, 0.0505], label: "Download, edit, delete" },
          zoom: [0.1448, 0.2377, 0.4167, 0.4167]
        },
        {
          html: "Look at the panel: it doesn't keep your last settings. We reopened this page from its address for this screen: <strong>Kling 3.0</strong> was ticked again, both slots read <strong>Choose image</strong> and <strong>Generate video</strong> waited for two images. Opened from Production, only the before image is filled in for you. Check the engine and the images every time before you generate."
        }
      ]
    },
    {
      id: "media-sequence",
      title: "Make a sequence video",
      lead: "<strong>Sequence video</strong> strings several images together: &ldquo;Chain up to six images into one continuous video with a camera move between each pair.&rdquo; Use it to take people through a set of images in the order you present them, for example the land-use plan, a concept and its renders. We took this screen after making our before/after video, yet the main area reads <strong>No videos yet</strong>: in <strong>Sequence video</strong> mode the page doesn't list before/after videos.",
      image: "img/7-04-sequence.webp",
      url: "coplanai.ikonai.app",
      alt: "The Video page in Sequence video mode, its subtitle reading Chain up to six images into one continuous video with a camera move between each pair. The panel shows the Engine card with Kling 3.0 ticked; the Images card with Default motion set to Walkthrough, Segment length 5s, the line ‘Applies to every transition — fine-tune each one below’, an Add image button and the line ‘Add 2 to 6 images. The video plays them in order’; Prompt (optional); and a greyed-out Generate sequence video button. The main area reads No videos yet.",
      beats: [
        {
          html: "Click <strong>Sequence video</strong> at the top of the panel. The line under the page title changes to describe the new mode.",
          highlight: { box: [0.0897, 0.1105, 0.0903, 0.0379], label: "Sequence video" },
          zoom: [0, 0, 0.4167, 0.4167]
        },
        {
          html: "In the <strong>Images</strong> card, <strong>Default motion</strong> is the camera move between each pair of images: the same presets as for a before/after video, from <strong>Walkthrough</strong> to <em>Detail Focus</em>, plus <em>Cut</em>. <strong>Segment length</strong> is how long each move takes: <strong>5s</strong> here, or 1s, 3s, 10s or a custom length. The line under them covers both: &ldquo;Applies to every transition — fine-tune each one below.&rdquo;",
          highlight: { box: [0.0032, 0.4046, 0.1784, 0.3317], label: "Two to six images" },
          zoom: [0, 0.3446, 0.4517, 0.4517]
        },
        {
          html: "Click <strong>Add image</strong> to choose the images. The picker asks you to &ldquo;Select up to 6 images in the order they should play.&rdquo; As the line below the button says, <strong>Add 2 to 6 images. The video plays them in order.</strong> The info tooltip beside Images adds that you can reorder them with the arrows.",
          highlight: { box: [0.0111, 0.6372, 0.1626, 0.059], label: "Add image" },
          cursor: { at: [0.0924, 0.6667], click: false },
          zoom: [0, 0.4583, 0.4167, 0.4167]
        },
        {
          html: "<strong>Generate sequence video</strong> stays greyed out until you have added at least two images (<strong>Add at least two images to generate.</strong>). The <strong>Engine</strong> card works as for a before/after video: see <a href='#media-video'>Set up a before/after video</a>. We didn't make a sequence for this guide."
        }
      ]
    },
    {
      id: "media-upscale",
      title: "Upscale an image",
      lead: "<strong>Image Upscale</strong>, the second button at the top of Production (or <em>Upscale</em> in the Studio menu), makes a larger copy of an image: &ldquo;Upscale an image to 6K or 8K without changing its content.&rdquo; Use it when a render must stay sharp at a large size, on a print or a presentation board. Unlike the Video page, nothing is filled in for you. We upscaled the Eye-level · Day render from <a href='#production-build'>Build renders</a>.",
      image: "img/7-05-upscale.webp",
      url: "coplanai.ikonai.app",
      alt: "The Image Upscale page inside the example project. The UPSCALE SETTINGS panel shows the Engine card, with SeedVR2, Topaz and Recraft Crisp tagged Faithful, Crystal tagged Tunable, and Classic (no AI) ticked; the Source image card with the Eye-level · Day render, a street lined with palms and tiled-roof buildings running down to the lake, and a Change label; Target size with 6K · 6144 px selected and 8K · 7680 px; and a green Upscale to 6K button. The main area reads No upscales yet.",
      note: {
        kind: "warning",
        title: "Check the engine every time",
        html: "Whenever the Upscale page opens, <strong>SeedVR2</strong> is ticked, and it is an AI engine. <strong>Classic (no AI)</strong> is the only engine Studio describes as free. Choose the engine before each <strong>Upscale to 6K</strong>, so you don't use credits by accident."
      },
      beats: [
        {
          html: "<strong>Engine</strong> offers five. Four are AI engines, which, as the info tooltip says, &ldquo;reconstruct detail as they enlarge&rdquo;. <strong>SeedVR2</strong> (ticked when the page opens), <strong>Topaz</strong> and <strong>Recraft Crisp</strong> are tagged <strong>Faithful</strong>; <strong>Crystal</strong> is <strong>Tunable</strong> and <strong>Can invent detail (tunable)</strong>. Studio doesn't call these four free, so expect them to use generation credits. <strong>Classic (no AI)</strong> &ldquo;resamples without AI and is free&rdquo;. We used <strong>Classic (no AI)</strong>.",
          highlight: { box: [0.0032, 0.1074, 0.1784, 0.3712], label: "Engine" },
          zoom: [0, 0.0474, 0.4912, 0.4912]
        },
        {
          html: "Click <strong>Source image</strong> to choose the image. The picker, <em>Pick the image to upscale</em>, has the same tabs as the video's, and its <em>Renders</em> tab holds the renders you built; as the help line says, you can also upload a new image. Only the resolution changes: &ldquo;Its content is preserved&rdquo;. <strong>Change</strong> picks another image.",
          highlight: { box: [0.0032, 0.4764, 0.1784, 0.3067], label: "Source image" },
          zoom: [0, 0.4164, 0.4267, 0.4267]
        },
        {
          html: "<strong>Target size</strong> is <strong>6K · 6144 px</strong> or <strong>8K · 7680 px</strong>. As its info tooltip says, &ldquo;The long edge is scaled to the target; the aspect ratio is preserved.&rdquo; A landscape render keeps its shape.",
          highlight: { box: [0.0032, 0.781, 0.1784, 0.1284], label: "Target size" },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        },
        {
          html: "Click <strong>Upscale to 6K</strong> (the label follows the target size). While it works, the page says &ldquo;Upscaling… this can take a moment. You can leave this page.&rdquo; Our <strong>Classic (no AI)</strong> upscale was ready in under two minutes.",
          highlight: { box: [0.0032, 0.9453, 0.1784, 0.0505], label: "Upscale" },
          cursor: { at: [0.0924, 0.9705], click: true },
          zoom: [0, 0.5833, 0.4167, 0.4167]
        }
      ]
    },
    {
      id: "media-upscale-result",
      title: "Download the upscale",
      lead: "The finished upscale appears as a card on the Image Upscale page, ready to download.",
      image: "img/7-06-upscale-result.webp",
      url: "coplanai.ikonai.app",
      alt: "The Image Upscale page with one result card: the eye-level render marked 6K, a small thumbnail with an arrow to 6144 × 4588 and Classic (no AI), Damiano Cerrone · 2 with the rest of the date cut off, and download and red delete icons. In the panel, SeedVR2 is ticked, Source image reads Choose image, and Upscale to 6K is greyed out above the line Pick a source image to upscale.",
      note: {
        kind: "tip",
        title: "Keep plans and renders faithful",
        html: "For an image that must show the design exactly as it is, such as a plan or a render for the report, choose an engine tagged <strong>Faithful</strong>, or <strong>Classic (no AI)</strong>. <strong>Crystal</strong> &ldquo;Can invent detail&rdquo;: it may add things that aren't in your design."
      },
      beats: [
        {
          html: "The card shows the upscaled image, marked <strong>6K</strong>.",
          highlight: { box: [0.1947, 0.1189, 0.1335, 0.3063], label: "Upscaled image" },
          zoom: [0.0483, 0.0589, 0.4263, 0.4263]
        },
        {
          html: "Next to a small copy of the original, the arrow points to the new size, <strong>6144 × 4588</strong>: the long edge is now 6144 px and the shape hasn't changed. Below it is the engine used: <strong>Classic (no AI)</strong>.",
          zoom: [0.07, 0.13, 0.4167, 0.4167]
        },
        {
          html: "<em>Download image</em> (the arrow) saves the large file; <em>Delete upscale</em> (the red bin) removes the card; we didn't try it, so download the file first if you might need it. On a card this narrow, the date after the author's name is cut off.",
          highlight: { box: [0.2761, 0.3631, 0.0464, 0.0505], label: "Download or delete", side: "below" },
          zoom: [0.091, 0.18, 0.4167, 0.4167]
        },
        {
          html: "The panel is ready for the next image. When we came back to take this screen, <strong>SeedVR2</strong> was ticked again and <strong>Source image</strong> read <strong>Choose image</strong>; <strong>Upscale to 6K</strong> stays greyed out (<strong>Pick a source image to upscale.</strong>) until you choose one."
        }
      ]
    }
  ]
});
