import { Link } from 'react-router-dom'
import { useApi } from '../api/client'
import './PlaceholderPage.css'
import './TemplatePage.css'

/**
 * Frontend page template — copy this file when adding a new site page.
 *
 * Pair it with `backend/pages/template.py` and `backend/data/template.json`.
 * Change `pageMeta.path`, the `useApi` URL, and the JSON slug together.
 */
export const pageMeta = {
  path: '/template',
  title: 'Page template',
  order: 90,
  nav: false,
  summary: 'Copy-this frontend + API starter for new site pages.',
}

export default function TemplatePage() {
  const { data, error, loading } = useApi('/api/template')
  const pages = useApi('/api/pages')

  return (
    <section className="placeholder section">
      <div className="container placeholder__box">
        {loading ? <p className="eyebrow">Loading API…</p> : null}
        {error ? (
          <>
            <span className="eyebrow">API error</span>
            <h1>Could not load /api/template</h1>
            <p>
              Start the FastAPI app with <code>npm run dev:api</code>, then
              refresh. Open <code>/docs</code> for the live schema.
            </p>
          </>
        ) : null}
        {data ? (
          <>
            <span className="eyebrow">{data.eyebrow}</span>
            <h1>{data.title}</h1>
            <p>{data.lead}</p>
            <ol className="template-steps">
              {data.steps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <span>{step.text}</span>
                </li>
              ))}
            </ol>
            <Link className="btn" to={data.cta.href}>
              {data.cta.label}
            </Link>
          </>
        ) : null}

        {pages.data?.length ? (
          <div className="template-api-list">
            <h2>Backend pages</h2>
            <p>
              <code>GET /api/pages</code> — every FastAPI module that exports{' '}
              <code>page_meta</code>.
            </p>
            <ul>
              {pages.data.map((page) => (
                <li key={page.slug}>
                  <code>{page.api}</code>
                  <span>
                    {page.title} · {page.path}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}
