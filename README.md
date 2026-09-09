# Lunavia

Small online travel agency (React). Style: teal accents, full-bleed photography, Syne + Manrope.

## Quick start

```bash
npm install
npm run dev
```


| Route | Page |
| --- | --- |
| `/` | Home |
| `/tours` | Tours (placeholder for students) |
| `/about` | About + auto menu of site pages |

About URL in production: `site.com/about`.

## How students add a site page

1. Create `src/pages/YourPage.jsx` (name must end with `Page.jsx`)
2. Export `pageMeta` and a default component:

```jsx
export const pageMeta = {
  path: '/contact',
  title: 'Contact',
  order: 4,
  summary: 'Short description shown on the About menu.',
}

export default function ContactPage() {
  return <section className="section"><div className="container">…</div></section>
}
```

3. That’s it — the page is picked up by:
   - React Router (`App.jsx`)
   - Header navigation
   - **About page menu** (`getSiblingPages`)

Shared styles: `.container`, `.section`, `.btn`, `.eyebrow` in `src/index.css`.

Discovery logic lives in `src/pages/sitePages.js`.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`

## Deploy

Push or merge to `main` triggers GitHub Actions → build → upload to PythonAnywhere → reload.

Manual deploy:

```bash
npm run build
PYTHONANYWHERE_API_TOKEN=… python deploy/upload_pa.py
```

Required GitHub secret: `PYTHONANYWHERE_API_TOKEN`.

1234