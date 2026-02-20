# Video Editor Portfolio

A single-page portfolio site for a video editor with a dark, cinematic look.

## What’s included

- **Hero** — Headline and primary CTA
- **Work** — Grid of reel cards; click to open video in a modal (YouTube/Vimeo embed)
- **About** — Short bio and skills
- **Contact** — Email and social links
- **Responsive** — Mobile-friendly with a hamburger menu

## How to run

Open `index.html` in a browser, or serve the folder locally:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Then go to `http://localhost:8080`.

## Customize

1. **Branding** — In `index.html`, change the `.logo` text (“ReelCut”) and the `<title>`.
2. **Reels** — For each `.reel-card`, set `data-video` to your embed URL (e.g. `https://www.youtube.com/embed/VIDEO_ID`) and replace the `<img src="...">` in `.reel-thumb` with your thumbnail.
3. **About** — Update the copy and the about image `src`.
4. **Contact** — Set `href="mailto:your@email.com"` and your social links.
5. **Colors** — In `styles.css`, edit the `:root` variables (e.g. `--accent`, `--bg`).

No build step required; plain HTML, CSS, and JS.
