# Site pages

Put site pages here as `*Page.jsx` files and export `pageMeta`.

They are discovered by `sitePages.js` and appear in:

- routes
- header nav
- the menu on `/about`

`NotFoundPage.jsx` has no `pageMeta` on purpose — it stays a catch-all only.

<<<<<<< HEAD
## Page template (frontend + API)

Copy these together:

1. `src/pages/TemplatePage.jsx` → `YourPage.jsx`
2. `backend/pages/template.py` → `backend/pages/yourpage.py`
3. `backend/data/template.json` → `backend/data/yourpage.json`

Keep the same slug in `pageMeta.path`, `page_meta.slug`, the JSON filename, and `useApi('/api/yourpage')`.

About is the full example: `AboutPage.jsx` reads `GET /api/about`. Team CRUD lives under `/api/about/team`.

Content for every API page can be edited at `/admin` (`admin` / `admin`).
=======
12345
>>>>>>> origin/csc-38
