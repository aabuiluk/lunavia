import './Destinations.css'

const DESTINATIONS = [
  {
    tag: 'BEACH',
    country: 'Greece',
    place: 'Greek Islands',
    price: '€299',
    image:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80',
    span: 'wide',
  },
  {
    tag: 'CITY',
    country: 'Spain',
    place: 'Barcelona',
    price: '€279',
    image:
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80',
    span: 'wide',
  },
  {
    tag: 'FAMILY',
    country: 'Türkiye',
    place: 'Antalya',
    price: '€319',
    image:
      'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?auto=format&fit=crop&w=700&q=80',
    span: 'narrow',
  },
]

export function Destinations() {
  return (
    <section className="destinations container">
      <p className="destinations__eyebrow">AUTUMN, 2026</p>
      <h2 className="destinations__title">
        Where do you
        <br />
        want to go?
      </h2>

      <div className="destinations__grid">
        {DESTINATIONS.map((d) => (
          <a
            className={`destinations__card destinations__card--${d.span}`}
            href="/tours"
            key={d.place}
          >
            <img src={d.image} alt={d.place} />
            <span className="destinations__tag">{d.tag}</span>
            <div className="destinations__info">
              <div>
                <span className="destinations__country">{d.country}</span>
                <span className="destinations__place">{d.place}</span>
              </div>
              <span className="destinations__price">
                from
                <br />
                {d.price}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

