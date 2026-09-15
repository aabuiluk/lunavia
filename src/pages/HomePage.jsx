import { Link } from 'react-router-dom'
import { useApi } from '../api/client'
import './HomePage.css'

export const pageMeta = {
  path: '/',
  title: 'Home',
  order: 1,
  summary: 'Start here — Lunavia’s welcome page and travel promise.',
}

export default function HomePage() {
  const { data, error, loading } = useApi('/api/home')

  if (loading || error || !data) {
    return (
      <section className="home-hero">
        <div className="container home-hero__content">
          <p className="home-hero__brand rise">Lunavia</p>
          <h1 className="rise rise-delay-1">
            {error ? 'Could not load home' : 'Loading…'}
          </h1>
          {error ? (
            <p className="rise rise-delay-2">Start the API with npm run dev:api.</p>
          ) : null}
        </div>
      </section>
    )
  }

  return (
    <section className="home-hero">
      <img className="home-hero__media" src={data.image} alt={data.imageAlt} />
      <div className="home-hero__veil" />
      <div className="container home-hero__content">
        <p className="home-hero__brand rise">{data.brand}</p>
        <h1 className="rise rise-delay-1">
          {data.title} <span>{data.titleHighlight}</span> {data.titleSuffix}
        </h1>
        <p className="rise rise-delay-2">{data.lead}</p>
        <div className="home-hero__actions rise rise-delay-2">
          {data.actions.map((action) => (
            <Link
              key={action.href}
              className={
                action.variant === 'ghost'
                  ? 'btn btn--ghost home-hero__ghost'
                  : 'btn btn--light'
              }
              to={action.href}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
