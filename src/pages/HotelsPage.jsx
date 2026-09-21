import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApi } from '../api/client'
import './Hotels.css'

export const pageMeta = {
  path: '/hotels',
  title: 'Hotels',
  order: 3,
  summary: 'Stay options that pair with Lunavia routes.',
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'resorts', label: 'Resorts', match: ['RESORT', 'ALL INCL'] },
  { id: 'apartments', label: 'Apartments', match: ['FLATS', 'CITY'] },
  { id: 'villas', label: 'Villas', match: ['VILLAS'] },
  { id: 'spa', label: 'Spa & Wellness', amenity: 'Spa' },
  { id: 'inclusive', label: 'All inclusive', match: ['ALL INCL'] },
]

export default function HotelsPage() {
  const { data, error, loading } = useApi('/api/hotels')
  const [filter, setFilter] = useState('all')
  const active = FILTERS.find((item) => item.id === filter) || FILTERS[0]

  const hotelsData = data?.hotels ?? []

  const hotels = useMemo(
    () =>
      hotelsData.filter((hotel) => {
        if (active.id === 'all') return true
        if (active.match && active.match.includes(hotel.category)) return true
        if (active.amenity && hotel.amenities.includes(active.amenity)) return true
        return false
      }),
    [active, hotelsData],
  )

  return (
    <div>
      {/* HEADER / HERO */}
      <header className="hotels-header">
        <section className="tours-hero">
          <img className="tours-hero__media" src="/HeaderHotels.png" alt="Header Hotels" />
          <div className="tours-hero__veil" />
          <div className="container tours-hero__content">
            <p className="tours-hero__eyebrow rise">BOOK YOUR ROOM</p>
            <h1 className="rise rise-delay-1">
              All our hotels <br />
              <span>&</span> resorts
            </h1>
          </div>
        </section>

        {/* SEARCH BAR FROM HOME PAGE */}
        <div className="container search-wrapper rise rise-delay-2">
          <div className="for_inputs_to_route">
            <SearchBar
              fields={[
                { name: 'start', label: 'Start?', value: '', placeholder: 'Choose start point' },
                { name: 'where', label: 'Where?', value: '', placeholder: 'Choose destination' },
                { name: 'dates', label: 'Dates', value: '', placeholder: 'Choose dates' },
                {
                  name: 'travelers',
                  label: 'Travelers',
                  value: '',
                  placeholder: 'Choose number of travelers',
                },
              ]}
              note="Flights + trains + hotels — compared for you."
              onSubmit={(values) => console.log('submitted:', values)}
            />
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="hotels-main-container">
        {/* CATEGORY TABS */}
        <div className="hotels-categories" role="tablist" aria-label="Hotel types">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              className={filter === item.id ? 'hotels-tab-btn active' : 'hotels-tab-btn'}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* HOTELS GRID */}
        {loading ? (
          <p className="hotels-empty" style={{ textAlign: 'center', margin: '40px 0' }}>
            Loading hotels…
          </p>
        ) : error ? (
          <p className="hotels-empty" style={{ textAlign: 'center', margin: '40px 0' }}>
            Couldn't load hotels: {error.message}
          </p>
        ) : (
          <>
            <div className="hotels-grid">
              {hotels.map((hotel) => (
                <article key={hotel.id} className="hotel-card">
                  <div className="hotel-image-wrapper">
                    <img src={hotel.image} alt={hotel.title} />
                    <span className="hotel-badge-category">{hotel.category}</span>
                    <button type="button" className="hotel-like-btn" aria-label={`Save ${hotel.title}`}>
                      <img src="/Favorite.png" alt="Like" className="hotel-like-icon" />
                    </button>
                  </div>

                  <div className="hotel-card-info">
                    <h3 className="hotel-title">{hotel.title}</h3>
                    <p className="hotel-subtitle">{hotel.subtitle}</p>

                    <div className="hotel-rating">
                      ★ {hotel.rating} <span>({hotel.reviewsCount} reviews)</span>
                    </div>

                    <div className="hotel-divider" />

                    <p className="hotel-description">{hotel.amenities}</p>

                    <div className="hotel-card-footer">
                      <div className="hotel-price-block">
                        {hotel.oldPrice ? (
                          <span className="hotel-old-price">€{hotel.oldPrice}/night</span>
                        ) : null}
                        <div className="hotel-price">
                          €{hotel.price}
                          <span className="hotel-night-label">/night</span>
                        </div>
                      </div>
                      <button type="button" className="hotel-btn-arrow" aria-label={`View ${hotel.title}`}>
                        &rarr;
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {hotels.length === 0 ? (
              <p className="hotels-empty" style={{ textAlign: 'center', margin: '40px 0' }}>
                No stays in this category yet.
              </p>
            ) : null}
          </>
        )}

        {/* PAGINATION */}
        <div className="hotels-pagination">
          <button type="button" className="hotels-page-btn arrow" aria-label="Previous page">
            <img src="/HotelsLeft.png" alt="Previous" className="pagination-arrow-icon" />
          </button>
          <button type="button" className="hotels-page-btn active">1</button>
          <button type="button" className="hotels-page-btn">2</button>
          <button type="button" className="hotels-page-btn">3</button>
          <button type="button" className="hotels-page-btn">4</button>
          <button type="button" className="hotels-page-btn">5</button>
          <button type="button" className="hotels-page-btn arrow" aria-label="Next page">
            <img src="/HotelsRight.png" alt="Next" className="pagination-arrow-icon" />
          </button>
        </div>
      </main>
    </div>
  )
}