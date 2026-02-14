Will you be my Valentine? — Static site scaffold

Files created
- `index.html` — main page with evasive NO, accessible toggle, and YES interaction.
- `styles.css` — responsive styling.
- `app.js` — logic for evasive NO, GIF preloading, confetti trigger.
- `assets/` — create and add your GIFs here. Two placeholders are included as inline SVG for preview.

How to preview (PowerShell)

Open the page in your default browser:

```powershell
Start-Process "c:\Users\rpjos\Desktop\Valentines\Rudra\index.html"
```

Adding GIFs
- Create a folder `assets/` next to `index.html` and add your GIFs with these names (recommended):
  - `begging-puppy.gif` (main asking GIF)
  - `celebrate.gif` (celebration GIF shown after YES)
- The scaffold will preload those GIFs and swap to `celebrate.gif` when YES is clicked.

Confetti and sound
- Confetti is included via the `canvas-confetti` CDN in `index.html`.
- To add a short cheer sound, add `cheer.mp3` to `assets/` and modify `app.js` to create and play an `Audio('assets/cheer.mp3')` after the YES click.

Accessibility notes
- The "Disable evasive NO" checkbox allows enabling/disabling the evasive behavior for keyboard and assistive tech users.
- Keyboard users can still tab to and activate the NO button.

Next steps I can take
- Replace placeholder assets with your GIFs if you upload them or provide URLs.
- Add an optional confetti animation library locally (no CDN) and a small sound file.
- Deploy to GitHub Pages and give you a link.

Let me know which next step you'd like.