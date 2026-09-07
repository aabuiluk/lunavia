import { Link } from 'react-router-dom'
import './HomePage.css'

export const pageMeta = {
  path: '/',
  title: 'Home',
  order: 1,
  summary: 'Start here — Lunavia’s welcome page and travel promise.',
}

const HERO =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80'

export default function HomePage() {
  return (
    <section className="home-hero">
      <img className="home-hero__media" src={HERO} alt="Mountain lake at dusk" />
      <div className="home-hero__veil" />
      <div className="container home-hero__content">
        <p className="home-hero__brand rise">Lunavia</p>
        <h1 className="rise rise-delay-1">
          Your route to <span>anywhere</span> in the world
        </h1>
        <p className="rise rise-delay-2">
          A small travel agency for clear itineraries, trusted partners, and
          trips that feel like living — not logistics.
        </p>
        <div className="home-hero__actions rise rise-delay-2">
          <Link className="btn btn--light" to="/about">
            About us
          </Link>
          <Link className="btn btn--ghost home-hero__ghost" to="/tours">
            See tours
          </Link>
        </div>
      </div>
    </section>
  )
}
