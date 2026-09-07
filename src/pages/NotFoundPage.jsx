import { Link } from 'react-router-dom'
import './PlaceholderPage.css'

export default function NotFoundPage() {
  return (
    <section className="placeholder section">
      <div className="container placeholder__box">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>This route does not exist yet. Check the URL or return home.</p>
        <Link className="btn" to="/">
          Back to home
        </Link>
      </div>
    </section>
  )
}
