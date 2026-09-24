import { Link } from 'react-router-dom'
import { useApi } from '../api/client'
import { getSiblingPages } from './sitePages'
import './AboutPage.css'

export const pageMeta = {
  path: '/about',
  title: 'About',
  order: 3,
  summary: 'Who we are, how we plan trips, and the people behind Lunavia.',
}

function SitePagesMenu({ siblings }) {
  return (
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
  )
}

export default function AboutPage() {
  const siblings = getSiblingPages('/about')
  const { data, error, loading } = useApi('/api/about')

  if (loading) {
    return (
      <div className="about">
        <section className="about-status" aria-live="polite">
          <div className="container">
            <span className="eyebrow">About</span>
            <h1>Loading Lunavia…</h1>
            <p>Fetching page content from the FastAPI About endpoint.</p>
          </div>
        </section>
        <SitePagesMenu siblings={siblings} />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="about">
        <section className="about-status" aria-live="assertive">
          <div className="container">
            <span className="eyebrow">API error</span>
            <h1>Could not load About</h1>
            <p>
              Start the backend with <code>npm run dev:api</code> and open{' '}
              <code>/api/about</code>. The live schema is at <code>/docs</code>.
            </p>
          </div>
        </section>
        <SitePagesMenu siblings={siblings} />
      </div>
    )
  }

  const { hero, story, milestones, valuesIntro, values, teamIntro, team, cta } =
    data

  return (
    <div className="about">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <img
          className="about-hero__media"
          src={hero.image}
          alt={hero.imageAlt}
        />
        <div className="about-hero__veil" />
        <div className="container about-hero__content">
          <p className="about-hero__brand rise">{hero.brand}</p>
          <h1 id="about-hero-title" className="rise rise-delay-1">
            {hero.title}
            <span> {hero.titleHighlight}</span>
          </h1>
          <p className="about-hero__lead rise rise-delay-2">{hero.lead}</p>
          <div className="about-hero__actions rise rise-delay-2">
            {hero.actions.map((action) => (
              <a
                key={action.href}
                className={
                  action.variant === 'ghost'
                    ? 'btn btn--ghost about-hero__ghost'
                    : 'btn btn--light'
                }
                href={action.href}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <SitePagesMenu siblings={siblings} />

      <section id="story" className="section about-story">
        <div className="container about-story__grid">
          <div className="about-story__copy">
            <span className="eyebrow">{story.eyebrow}</span>
            <h2>
              {story.title}
              <span> {story.titleHighlight}</span>
            </h2>
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <figure className="about-story__figure">
            <img src={story.image} alt={story.imageAlt} />
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
            <span className="eyebrow">{valuesIntro.eyebrow}</span>
            <h2>{valuesIntro.title}</h2>
            <p>{valuesIntro.lead}</p>
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
            <span className="eyebrow">{teamIntro.eyebrow}</span>
            <h2>{teamIntro.title}</h2>
            <p>{teamIntro.lead}</p>
          </div>
          <div className="about-team__grid">
            {team.map((member) => (
              <article key={member.id} className="team-card">
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
        <img className="about-cta__media" src={cta.image} alt="" aria-hidden="true" />
        <div className="about-cta__veil" />
        <div className="container about-cta__content">
          <h2 id="about-cta-title">{cta.title}</h2>
          <p>{cta.text}</p>
          <a className="btn" href={`mailto:${cta.email}`}>
            {cta.buttonLabel}
          </a>
        </div>
      </section>
    </div>
  )
}
