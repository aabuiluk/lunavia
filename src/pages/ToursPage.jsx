import { Link } from 'react-router-dom'
import './PlaceholderPage.css'

export const pageMeta = {
  path: '/tours',
  title: 'Tours',
  order: 2,
  summary: 'Tour catalog and packages — ready for a student build-out.',
}

export default function ToursPage() {
  return (
    <section className="placeholder section">
      <div className="container placeholder__box">
        <span className="eyebrow">Coming soon</span>
        <h1>Tours & packages</h1>
        <p>
          This route is reserved for the tour catalog. Students can extend it or
          build their own pages under <code>/students/…</code>.
        </p>
        <Link className="btn" to="/about">
          Read about Lunavia
        </Link>
      </div>
    </section>
  )
}
