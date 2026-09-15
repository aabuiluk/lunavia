import { Link } from 'react-router-dom'
import { useApi } from '../api/client'
import './PlaceholderPage.css'

export const pageMeta = {
  path: '/tours',
  title: 'Tours',
  order: 2,
  summary: 'Tour catalog and packages — ready for a student build-out.',
}

export default function ToursPage() {
  const { data, error, loading } = useApi('/api/tours')

  return (
    <section className="placeholder section">
      <div className="container placeholder__box">
        {loading ? <span className="eyebrow">Loading…</span> : null}
        {error ? (
          <>
            <span className="eyebrow">API error</span>
            <h1>Could not load tours</h1>
            <p>Start the FastAPI app with <code>npm run dev:api</code>.</p>
          </>
        ) : null}
        {data ? (
          <>
            <span className="eyebrow">{data.eyebrow}</span>
            <h1>{data.title}</h1>
            <p>{data.lead}</p>
            <Link className="btn" to={data.cta.href}>
              {data.cta.label}
            </Link>
          </>
        ) : null}
      </div>
    </section>
  )
}
