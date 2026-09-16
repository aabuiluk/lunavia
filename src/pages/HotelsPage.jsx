import { useMemo, useState } from 'react'
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

const hotelsData = [
  {
    id: 1,
    title: 'White Pearl',
    subtitle: 'Paphos, Cyclades • Villa',
    rating: '4.9',
    reviewsCount: '128',
    amenities: 'Wi-Fi • Outdoor Pool • All Inclusive.',
    oldPrice: '350',
    price: '289',
    category: 'VILLAS',
    image: 'Hotels1.png',
  },
  {
    id: 2,
    title: 'M1 Club Hotel',
    subtitle: 'Odesa, Ukraine • Beachfront',
    rating: '4.8',
    reviewsCount: '448',
    amenities: 'Private Beach • Pool • Sea View',
    oldPrice: '220',
    price: '189',
    category: 'RESORT',
    image: 'Hotels2.png',
  },
  {
    id: 3,
    title: 'Ayana Estate',
    subtitle: 'Bali, Indonesia • Villa',
    rating: '4.8',
    reviewsCount: '68',
    amenities: 'Private Pool • Breakfast • Jungle View',
    oldPrice: '400',
    price: '315',
    category: 'VILLAS',
    image: 'Hotels3.png',
  },
  {
    id: 4,
    title: 'Le Meurice',
    subtitle: 'Paris, France • Hotel',
    rating: '4.8',
    reviewsCount: '530',
    amenities: 'Eiffel View • Michelin Dining • Gym',
    oldPrice: '600',
    price: '489',
    category: 'CITY',
    image: 'Hotels4.png',
  },
  {
    id: 5,
    title: 'Rixos Premium',
    subtitle: 'Antalya, Turkey • Resort',
    rating: '4.6',
    reviewsCount: '1,204',
    amenities: 'All inclusive • Aquapark • Kids Club',
    oldPrice: '289',
    price: '219',
    category: 'ALL INCL',
    image: 'Hotels5.png',
  },
  {
    id: 6,
    title: 'The Plaza',
    subtitle: 'New York, USA • Central Park',
    rating: '4.7',
    reviewsCount: '2,200',
    amenities: 'Iconic • Afternoon Tea • Fitness Center',
    oldPrice: '3100',
    price: '2289',
    category: 'ICONIC',
    image: 'Hotels6.png',
  },
  {
    id: 7,
    title: 'Aman Tokyo',
    subtitle: 'Tokyo, Japan • Skyline View',
    rating: '5.0',
    reviewsCount: '340',
    amenities: 'Zen Garden • Pool • Fine Dining',
    oldPrice: '2300',
    price: '1679',
    category: '5 STARS',
    image: 'Hotels7.png',
  },
  {
    id: 8,
    title: 'Zermatt Peak',
    subtitle: 'Zermatt, Switzerland • Chalet',
    rating: '5.0',
    reviewsCount: '124',
    amenities: 'Matterhorn View • Spa • Chef',
    oldPrice: '2500',
    price: '2099',
    category: 'CHALET',
    image: 'Hotels8.png',
  },
  {
    id: 9,
    title: 'Aurelio Lech',
    subtitle: 'Lech, Austria • Chalet',
    rating: '4.9',
    reviewsCount: '128',
    amenities: 'Ski-in/Ski-out • Pool • Spa',
    oldPrice: '1550',
    price: '1289',
    category: 'CHALET',
    image: 'Hotels9.png',
  },
  {
    id: 10,
    title: 'Cheval Quays',
    subtitle: 'London, UK • Apartment',
    rating: '4.8',
    reviewsCount: '532',
    amenities: 'Thames View • Kitchen • Gym',
    oldPrice: '450',
    price: '389',
    category: 'FLATS',
    image: 'Hotels10.png',
  },
  {
    id: 11,
    title: 'Soneva Fushi',
    subtitle: 'Baa Atoll, Maldives • Resort',
    rating: '5.0',
    reviewsCount: '610',
    amenities: 'Private Beach • Villas • Spa',
    oldPrice: '2290',
    price: '1889',
    category: 'VILLAS',
    image: 'Hotels11.png',
  },
  {
    id: 12,
    title: 'Burj Al Arab',
    subtitle: 'Dubai, UAE • 5-Star',
    rating: '4.9',
    reviewsCount: '3,200',
    amenities: 'Butler • Private Beach • Spa',
    oldPrice: '2399',
    price: '1649',
    category: 'VILLAS',
    image: 'Hotels12.png',
  },
];

export default function HotelsPage() {
  const [filter, setFilter] = useState('all')
  const active = FILTERS.find((item) => item.id === filter) || FILTERS[0]
  const hotels = useMemo(
    () =>
      hotelsData.filter((hotel) => {
        if (active.id === 'all') return true
        if (active.match && active.match.includes(hotel.category)) return true
        if (active.amenity && hotel.amenities.includes(active.amenity)) return true
        return false
      }),
    [active],
  )

  return (
    <main className="hotels-main-container">
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

      <div className="hotels-grid">
        {hotels.map((hotel) => (
          <article key={hotel.id} className="hotel-card">
            <div className="hotel-image-wrapper">
              <img src={`/${hotel.image}`} alt={hotel.title} />
              <span className="hotel-badge-category">{hotel.category}</span>
              <button type="button" className="hotel-like-btn" aria-label={`Save ${hotel.title}`}>
                <img src="/Favorite.png" alt="" className="hotel-like-icon" />
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
                  →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {hotels.length === 0 ? (
        <p className="hotels-empty">No stays in this category yet.</p>
      ) : null}
    </main>
  )
}


