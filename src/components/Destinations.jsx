import './Destinations.css'

//something

const DESTINATIONS = [
  {
    tag: 'BEACH',
    country: 'Greece',
    place: 'Greek Islands',
    price: '€299',
    image:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80',
    span: 'wide',
    href: 'https://www.skyscanner.net/flights-to/gr/cheap-flights-to-greece.html',
  },
  {
    tag: 'CITY',
    country: 'Spain',
    place: 'Barcelona',
    price: '€279',
    image:
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80',
    span: 'wide',
    href: 'https://www.skyscanner.net/flights-to/bcn/cheap-flights-to-barcelona-airport.html',
  },
  {
    tag: 'FAMILY',
    country: 'Türkiye',
    place: 'Antalya',
    price: '€319',
    image:
      'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?auto=format&fit=crop&w=700&q=80',
    span: 'narrow',
    href: 'https://www.skyscanner.net/flights-to/ayt/cheap-flights-to-antalya-airport.html',
  },
]

export function Destinations({ data }) {
  const items = data?.items ?? DESTINATIONS
  const titleLines = data?.titleLines ?? ['Where do you', 'want to go?']

  return (
    <section className="destinations container">
      <p className="destinations__eyebrow">{data?.eyebrow ?? 'AUTUMN, 2026'}</p>
      <h2 className="destinations__title">
        {titleLines[0]}
        <br />
        {titleLines[1]}
      </h2>

      <div className="destinations__grid">
        {items.map((d) => (
          <a
            className={`destinations__card destinations__card--${d.span}`}
            href={d.href}
            target="_blank"
            rel="noopener noreferrer"
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
