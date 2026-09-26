import './Offers.css'

const OFFERS = [
  {
    title: 'ANTALYA',
    discount: '−€86',
    meta: '7 nights · 4★ hotel',
    route: 'Ukraine → Chișinău → Antalya',
    price: '€429',
  },
  {
    title: 'RHODES',
    discount: '−€72',
    meta: '7 nights · 4★ hotel',
    route: 'Ukraine → Warsaw → Rhodes',
    price: '€468',
  },
  {
    title: 'MALLORCA',
    discount: '−€64',
    meta: '5 nights · boutique stay',
    route: 'Ukraine → Kraków → Palma',
    price: '€514',
  },
]

export function Offers() {
  return (
    <section className="offers container">
      <p className="offers__eyebrow">FRESH OFFERS</p>
      <h2 className="offers__title">
        Summer plans,
        <br />
        <span>better prices.</span>
      </h2>

      <div className="offers__grid">
        {OFFERS.map((o) => (
          <div className="offers__card" key={o.title}>
            <div className="offers__top">
              <span className="offers__label">CURATED ROUTE</span>
              <span className="offers__discount">{o.discount}</span>
            </div>
            <h3>{o.title}</h3>
            <p className="offers__meta">{o.meta}</p>
            <div className="offers__route">{o.route}</div>
            <div className="offers__bottom">
              <span className="offers__price">
                {o.price}
                <sub>/person</sub>
              </span>
              <button className="offers__go" aria-label={`Book ${o.title}`}>
                →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
