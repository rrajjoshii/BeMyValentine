Mockup: "Will you be my Valentine?"

What I created
- `desktop.html` — Desktop-focused mockup with annotated notes and a lightweight preview for the evasive NO button and YES swap.
- `mobile.html` — Mobile-focused mockup with stacked controls and a wiggle preview for NO.
- `styles.css` — Shared styles and design tokens.

Where to place assets
- Add your GIFs/images into `mockup/assets/` (create the folder):
  - `begging-puppy.gif` (or `placeholder-begging.png` used in mockup)
  - `celebrate.gif` (or `placeholder-celebrate.png` used in mockup)
  - optional `cheer.mp3` if you want sound on YES

How to add GIFs and confetti

- To replace placeholders with your GIFs, create `mockup/assets/` and add files named exactly:
  - `placeholder-begging.png` (or change `src` in the HTML to `begging-puppy.gif`).
  - `placeholder-celebrate.png` (or change `src` in the HTML to `celebrate.gif`).

- If you have GIFs named `begging-puppy.gif` and `celebrate.gif`, edit the `<img>` tags in `desktop.html` and `mobile.html` to use those filenames, or simply add the GIFs with the placeholder names used in the mockup.

- Confetti is included in the mockup using the `canvas-confetti` CDN. In production you can either keep the CDN include:

  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

  or install it locally if you build with a bundler.

- The YES button triggers a small confetti burst in the mockup. You can customize the `confetti()` call parameters in the HTML (particleCount, spread, colors, origin).

Adding sound

- If you want a short cheer sound on YES, add `cheer.mp3` to `mockup/assets/` and update the YES click handler in the HTML to play it. Example (small snippet to add inside the existing script):

  const audio = new Audio('assets/cheer.mp3');
  // inside yes click handler: audio.play().catch(() => {/* user gesture required */});


How to preview (PowerShell on Windows)

Open the desktop mockup in your default browser:

```powershell
Start-Process "c:\Users\rpjos\Desktop\Valentines\Rudra\mockup\desktop.html"
```

Open the mobile mockup:

```powershell
Start-Process "c:\Users\rpjos\Desktop\Valentines\Rudra\mockup\mobile.html"
```

Design tokens / guide
- Primary color: #ff3860 (emotion: warm, playful)
- Accent 2: #ffb6c1 (softer pink)
- Border radius: 14px
- Button sizes: Desktop: 140px min width, Mobile: 120px min width
- GIF max-width: 560px desktop, 360px mobile

Interactions (annotations)
- NO button (production): will evade on pointer hover by teleporting within the controls container. For mobile, it should wiggle on first tap then require a second tap to confirm NO.
- Accessibility: keyboard users must be able to select NO using Tab and Enter/Space. Provide a toggle to disable evasive behavior.
- GIF swap: clicking YES should replace the begging GIF with the celebration GIF; preload both for a smooth swap.

Next steps (I can do any of the following):
- Scaffold the full static site with the evasive NO implementation, confetti, and accessible toggle.
- Replace placeholders with real GIFs and optimize them (compress, convert to animated WebP fallback).
- Add a deployable setup (GitHub Pages or Netlify) and a single-click deploy script.

Which would you like me to do next?
- "Scaffold" — I'll implement the evasive behavior fully, add preloading and an accessible toggle, and run a quick smoke test.
- "Add assets" — If you upload GIFs (or point to URLs), I'll add them into the mockup and optimize.
- "Design polish" — I'll tweak spacing/typography and prepare PNG mockups if you want static images for sharing.
 
Preview from PowerShell (open files)

```powershell
Start-Process "c:\Users\rpjos\Desktop\Valentines\Rudra\mockup\desktop.html"
Start-Process "c:\Users\rpjos\Desktop\Valentines\Rudra\mockup\mobile.html"
```
