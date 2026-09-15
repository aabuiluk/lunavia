# Backend page modules

Put API pages here as Python modules and export `page_meta` + `router`.

They are discovered by `backend/registry.py` and appear in:

- FastAPI routes under `/api/<slug>`
- OpenAPI at `/docs`
- `GET /api/pages`

Start from `template.py` + `backend/data/template.json` + `src/pages/TemplatePage.jsx`.

About (`about.py`) is the full example: page payload, section GETs, and team CRUD.
