import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PlaceholderPage.css'
import './ToursPage.css'
import { SearchBar } from './HomePage'

export const pageMeta = {
  path: '/tours',
  title: 'Tours',
  order: 2,
  summary: 'Explore all our tours and packages.',
}

const TOURS_HERO = 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80'

export default function ToursPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [serverContent, setServerContent] = useState(null)

  const categories = ['All', 'Beach', 'City', 'Mountain', 'Family', 'Last-minute']

  useEffect(() => {
    fetch('/api/tours')
      .then((res) => res.json())
      .then((data) => {
        console.log('Данные туров с бэка:', data)
        setServerContent(data)
      })
      .catch((err) => console.log('Ошибка при загрузке туров с бэка:', err))
  }, [])

  const handleCardClick = () => {
    const skyscannerUrl = "https://www.skyscanner.com.ua/transport/flights/ods/bcn/261005/261006/?adultsv2=1&cabinclass=economy&childrenv2=&ref=home&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false";
    window.open(skyscannerUrl, '_blank');
  }

  const toursList = serverContent?.tours || []

  const filteredTours = toursList.filter((tour) => {
    if (activeCategory === 'All') return true
    return tour.category.toLowerCase() === activeCategory.toLowerCase()
  })

  return (
    <main className="tours-page">
      <section className="tours-hero">
        <img className="tours-hero__media" src={TOURS_HERO} alt="Ocean from above" />
        <div className="tours-hero__veil" />
        <div className="container tours-hero__content">
          <p className="tours-hero__eyebrow rise">
            {serverContent?.eyebrow || 'FIND YOUR NEXT ADVENTURE'}
          </p>
          <h1 className="rise rise-delay-1">
            {serverContent?.title || 'All our tours'} <br /><span>&</span> Packages
          </h1>
        </div>
      </section>

      <div className="container search-wrapper rise rise-delay-2">
        <SearchBar
          fields={[
            { name: 'start', label: 'START?', value: '', placeholder: 'Choose start point' },
            { name: 'where', label: 'WHERE?', value: '', placeholder: 'Choose destination' },
            { name: 'dates', label: 'DATES', value: '', placeholder: 'Choose dates' },
            {
              name: 'travelers',
              label: 'TRAVELERS',
              value: '',
              placeholder: 'Choose number of travelers',
            },
          ]}
          note="Flights + trains + hotels — compared for you."
          onSubmit={(values) => {
            const skyscannerUrl = "https://www.skyscanner.com.ua/transport/flights/ods/bcn/261005/261006/?adultsv2=1&cabinclass=economy&childrenv2=&ref=home&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false";
            window.open(skyscannerUrl, '_blank');
          }}
        />
      </div>

      <section className="container filters-section">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      <section className="container tours-grid">
        {filteredTours.length > 0 ? (
          filteredTours.map((tour) => (
            <div key={tour.id} className="tour-card">
              <div className="tour-card__image-wrap">
                <img src={tour.image} alt={tour.title} />
                <div className="tour-card__badges">
                  <span className="badge badge--white">{tour.category}</span>
                  {tour.discount && <span className="badge badge--teal">{tour.discount}</span>}
                </div>
              </div>
              <div className="tour-card__info">
                <h3>{tour.title}</h3>
                <p className="tour-card__meta">{tour.meta}</p>
                <p className="tour-card__route">{tour.route}</p>
                <div className="tour-card__bottom">
                  <p className="tour-card__price">&euro;{tour.price} <span>/person</span></p>
                  <button className="tour-card__arrow" onClick={handleCardClick}>
                      &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
            No tours found in this category.
          </p>
        )}
      </section>
    </main>
  )
}