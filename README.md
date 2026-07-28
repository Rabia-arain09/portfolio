# Rabia Arain — Portfolio

A premium, dark-themed personal portfolio built with plain HTML, CSS and
JavaScript — no frameworks, no build step. Open `index.html` in a browser
and it works.
Portfolio deployed with GitHub and Vercel.
## Folder structure

```
portfolio/
├── index.html          → all page content & sections
├── css/
│   └── style.css       → design tokens, layout, components, responsive rules
├── js/
│   └── main.js         → one function per feature (theme, nav, form, etc.)
├── images/              → project thumbnails (SVG placeholders — swap anytime)
└── assets/
    ├── README.txt       → where to drop your resume PDF
    └── Rabia_Arain_Resume.pdf  → (add this yourself, see assets/README.txt)
```

## How to customize

- **Colors / fonts / spacing** — all in the `:root { }` block at the top of
  `css/style.css`. Change a variable once and it updates everywhere.
- **Text content** — edit directly in `index.html`; each section is clearly
  commented (`<!-- ============ SECTION NAME ============ -->`).
- **Projects** — duplicate a `<article class="project-card">` block in the
  Projects section and swap the image, title, description, tags and links.
- **Typing animation roles** — edit the `roles` array inside
  `initTypingAnimation()` in `js/main.js`.
- **Contact form** — currently simulates a submission. To make it real, open
  `submitForm()` in `js/main.js` and replace it with a `fetch()` call to a
  form backend (Formspree, Getform, your own API, etc.).
- **Project/thumbnail images** — replace the SVGs in `/images` with real
  screenshots (any image format works; just update the `src` in `index.html`).

## Notes

- Fonts load from Google Fonts (Inter) via a CDN link in `<head>`; for fully
  offline use, download the font files and reference them locally instead.
- All social/GitHub/LinkedIn links currently use placeholder URLs (`#` or
  `github.com/`, `linkedin.com/`) — replace with your real profile links.
- The contact email shown is a placeholder (`rabia.arain@example.com`) —
  replace with your real address in `index.html` (appears twice: contact
  section and footer).
