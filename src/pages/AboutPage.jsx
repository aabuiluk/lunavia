import { Link } from 'react-router-dom'
import { getSiblingPages } from './sitePages'
import './AboutPage.css'

export const pageMeta = {
  path: '/about',
  title: 'About',
  order: 3,
  summary: 'Who we are, how we plan trips, and the people behind Lunavia.',
}

const HERO =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80'
const STORY =
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80'
const CTA =
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=80'

const values = [
  {
    title: 'Honest routes',
    text: 'We plan around real connections, local partners, and time you will actually enjoy — not brochure filler.',
  },
  {
    title: 'Human support',
    text: 'One travel specialist stays with your trip from the first idea to the flight home.',
  },
  {
    title: 'Less logistics',
    text: 'Transfers, timing, and tickets are handled so your days stay open for living.',
  },
]

const milestones = [
  { value: '12+', label: 'Years crafting trips' },
  { value: '48', label: 'Countries on our map' },
  { value: '9k', label: 'Travelers guided' },
  { value: '24/7', label: 'Trip-day support' },
]

const team = [
  {
    name: 'Marta Koval',
    role: 'Founder & lead planner',
    photo:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Oleh Rudenko',
    role: 'Destination specialist',
    photo:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Sofia Melnyk',
    role: 'Guest experience',
    photo:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
  },
]

export default function AboutPage() {
  const siblings = getSiblingPages('/about')

  return (
    <div className="about">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <img
          className="about-hero__media"
          src={HERO}
          alt="Turquoise coastline at sunrise"
        />
        <div className="about-hero__veil" />
        <div className="container about-hero__content">
          <p className="about-hero__brand rise">Lunavia</p>
          <h1 id="about-hero-title" className="rise rise-delay-1">
            Travel, planned around
            <span> real life</span>
          </h1>
          <p className="about-hero__lead rise rise-delay-2">
            We are a small travel agency that builds clear routes so you spend
            less time arranging and more time somewhere new.
          </p>
          <div className="about-hero__actions rise rise-delay-2">
            <a className="btn btn--light" href="#story">
              Our story
            </a>
            <a className="btn btn--ghost about-hero__ghost" href="#site-pages">
              Site pages
            </a>
          </div>
        </div>
      </section>

      <nav className="about-menu" id="site-pages" aria-label="Site pages">
        <div className="container">
          <div className="about-menu__intro">
            <span className="eyebrow">On this site</span>
            <h2>Explore other pages</h2>
            <p>
              Menu is built automatically from pages in{' '}
              <code>src/pages</code>. When students add a new page with{' '}
              <code>pageMeta</code>, it appears here.
            </p>
          </div>
          <ul className="about-menu__list">
            {siblings.map((page) => (
              <li key={page.path}>
                <Link to={page.path} className="about-menu__link">
                  <span className="about-menu__title">{page.title}</span>
                  <span className="about-menu__path">{page.path}</span>
                  {page.summary ? (
                    <span className="about-menu__summary">{page.summary}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section id="story" className="section about-story">
        <div className="container about-story__grid">
          <div className="about-story__copy">
            <span className="eyebrow">Our story</span>
            <h2>
              Born from missed connections
              <span> and better ideas</span>
            </h2>
            <p>
              Lunavia started when our founders kept fixing trips that looked
              perfect on paper and fell apart in airports. We rebuilt the
              process around transparent timing, trusted local partners, and a
              specialist who actually answers the phone.
            </p>
            <p>
              Today we design custom itineraries and curated packages for people
              who want the world without the spreadsheet.
            </p>
          </div>
          <figure className="about-story__figure">
            <img src={STORY} alt="Traveler with a backpack overlooking a city" />
          </figure>
        </div>
      </section>

      <section className="about-stats" aria-label="Lunavia in numbers">
        <div className="container about-stats__row">
          {milestones.map((item) => (
            <div key={item.label} className="about-stats__item">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section about-values">
        <div className="container">
          <div className="about-values__intro">
            <span className="eyebrow">How we work</span>
            <h2>The Lunavia way</h2>
            <p>
              Every trip follows the same promise: honest routes, human support,
              and logistics that stay out of your way.
            </p>
          </div>
          <div className="about-values__grid">
            {values.map((item, index) => (
              <article key={item.title} className="about-value">
                <span className="about-value__index">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-team">
        <div className="container">
          <div className="about-team__intro">
            <span className="eyebrow">Team</span>
            <h2>People behind your route</h2>
            <p>
              Specialists who know destinations, airports, and the quiet details
              that turn a plan into a trip.
            </p>
          </div>
          <div className="about-team__grid">
            {team.map((member) => (
              <article key={member.name} className="team-card">
                <img src={member.photo} alt={member.name} />
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta" aria-labelledby="about-cta-title">
        <img className="about-cta__media" src={CTA} alt="" aria-hidden="true" />
        <div className="about-cta__veil" />
        <div className="container about-cta__content">
          <h2 id="about-cta-title">Tell us where you want to go</h2>
          <p>
            Share a destination, a season, or just a feeling — we will sketch a
            route that fits.
          </p>
          <a className="btn" href="mailto:hello@lunavia.travel">
            Start planning
          </a>
        </div>
      </section>
    </div>
  )
}
