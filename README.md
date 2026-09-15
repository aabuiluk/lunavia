# Lunavia

Small online travel agency (React + FastAPI). Style: teal accents, full-bleed photography, Syne + Manrope.

## Quick start

```bash
npm install
pip install -r requirements.txt
npm run dev
```

In a second terminal:

```bash
npm run dev:api
```

Vite proxies `/api` (and `/docs`) to FastAPI on port 8000.

| Route | Page |
| --- | --- |
| `/` | Home |
| `/tours` | Tours (placeholder for students) |
| `/about` | About — content from `GET /api/about` |
| `/template` | Frontend + API page template |
| `/admin` | Admin panel (`admin` / `admin`) |
| `/docs` | FastAPI OpenAPI (with the API running) |

About URL in production: `site.com/about`.

## How students add a site page

Copy the paired templates:

1. Frontend: `src/pages/TemplatePage.jsx` → `src/pages/YourPage.jsx`
2. API: `backend/pages/template.py` → `backend/pages/yourpage.py`
3. Data: `backend/data/template.json` → `backend/data/yourpage.json`

Export `pageMeta` on the React page and `page_meta` + `router` on the FastAPI module. Keep the slug the same in the path, JSON filename, and `useApi('/api/yourpage')`.

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

The page is picked up by:

- React Router (`App.jsx`)
- Header navigation
- **About page menu** (`getSiblingPages`)
- FastAPI (`GET /api/pages` and `/api/<slug>`)

Shared styles: `.container`, `.section`, `.btn`, `.eyebrow` in `src/index.css`.

Discovery logic lives in `src/pages/sitePages.js` and `backend/registry.py`.

About is the full backend example (page payload, section GETs, team CRUD). Other existing pages have API skeletons under `/api/home`, `/api/tours`, and `/api/register`.

## Admin

Open `/admin` and sign in with `admin` / `admin`. The panel can edit every page JSON file in `backend/data/` (Home, Tours, Register, About, Template). Saves write through `PUT /api/admin/pages/{slug}` and persist to disk.

Writes (replace About, team CRUD) require the admin token. Public `GET` routes stay open.

## Scripts

- `npm run dev` — Vite frontend
- `npm run dev:api` — FastAPI backend
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
