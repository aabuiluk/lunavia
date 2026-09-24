import { useState } from 'react'
import { Link } from 'react-router-dom'
import content from './ticketsContent.json'
import heroImage from '../assets/tickets/tickets_bus_img.jpg'
import greeceImg from '../assets/tickets/greece.jpg'
import barcelonaImg from '../assets/tickets/barcelona.jpg'
import antalyaImg from '../assets/tickets/turkey.jpg'
import './TicketsPage.css'

export const pageMeta = {
  path: '/tickets',
  title: 'Airline tickets',
  order: 4,
  summary: 'Discover routes and travel offers across Europe.',
}

const images = { greece: greeceImg, barcelona: barcelonaImg, antalya: antalyaImg }

const initialFilters = {
  origin: 'Ukraine',
  vehicle: 'Any vehicle',
  destination: '',
  season: 'Autumn 2026',
  budget: 'Any budget',
}

function matchesOffer(offer, filters) {
  const origin = filters.origin.trim().toLowerCase()
  const destination = filters.destination.trim().toLowerCase()
  return (
    (!origin || offer.origin.toLowerCase().includes(origin)) &&
    (filters.vehicle === 'Any vehicle' || offer.vehicle === filters.vehicle) &&
    (!destination || `${offer.title} ${offer.route}`.toLowerCase().includes(destination)) &&
    (filters.season === 'Any time' || offer.season === filters.season) &&
    (filters.budget === 'Any budget' ||
      (filters.budget === 'Up to €300' && offer.price <= 300) ||
      (filters.budget === '€300+' && offer.price >= 300))
  )
}

export default function TicketsPage() {
  const [filters, setFilters] = useState(initialFilters)
  const [submitted, setSubmitted] = useState(null)
  const visibleOffers = submitted
    ? content.offers.filter((offer) => matchesOffer(offer, submitted))
    : content.offers

  function changeFilter(event) {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  function findOffers(event) {
    event.preventDefault()
    setSubmitted({ ...filters })
    document.getElementById('tickets-offers')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className="tickets-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="container tickets-hero__inner">
          <div className="tickets-hero__title">
            <h1>{content.title}</h1>
            <p>{content.lead}</p>
          </div>

          <form className="tickets-search" onSubmit={findOffers} aria-label="Find routes">
            <label className="tickets-search__field">
              <span>STARTING FROM</span>
              <input name="origin" value={filters.origin} onChange={changeFilter} placeholder="Ukraine" />
            </label>
            <label className="tickets-search__field">
              <span>TYPE OF VEHICLE</span>
              <select name="vehicle" value={filters.vehicle} onChange={changeFilter}>
                <option>Any vehicle</option>
                <option>Flight</option>
                <option>Intercity bus</option>
              </select>
            </label>
            <label className="tickets-search__field">
              <span>WHERE TO?</span>
              <input name="destination" value={filters.destination} onChange={changeFilter} placeholder="In Europe" />
            </label>
            <div className="tickets-search__row">
              <label className="tickets-search__field">
                <span>WHEN?</span>
                <select name="season" value={filters.season} onChange={changeFilter}>
                  <option>Autumn 2026</option>
                  <option>Any time</option>
                </select>
              </label>
              <label className="tickets-search__field">
                <span>BUDGET</span>
                <select name="budget" value={filters.budget} onChange={changeFilter}>
                  <option>Any budget</option>
                  <option>Up to €300</option>
                  <option>€300+</option>
                </select>
              </label>
            </div>
            <button type="submit" className="tickets-search__button">Find →</button>
          </form>
        </div>
      </section>

      <section className="tickets-destinations">
        <div className="container">
          <p className="tickets-destinations__season">{content.season}</p>
          <h2 className="tickets-destinations__title">{content.destinations_title}</h2>

          <div className="tickets-destinations__photos">
            {content.destinations.map((destination, index) => (
              <div
                key={destination.name}
                className={`tickets-photo tickets-photo--${index < 2 ? 'large' : 'small'}`}
                style={{ backgroundImage: `url(${images[destination.image]})` }}
              >
                <span className="tickets-photo__tag">{destination.tag}</span>
                <div className="tickets-photo__bottom">
                  <span>{destination.name}</span>
                  <strong>€{destination.price}</strong>
                </div>
              </div>
            ))}
          </div>

          <div id="tickets-offers" className="tickets-offers-section">
            {submitted && (
              <p className="tickets-offers__status" role="status">
                {visibleOffers.length
                  ? `${visibleOffers.length} curated route${visibleOffers.length === 1 ? '' : 's'} found`
                  : 'No matching curated routes. Try another destination or budget.'}
              </p>
            )}
            <div className="tickets-offers">
              {visibleOffers.map((offer) => (
                <article className="tickets-offer" key={offer.title}>
                  <div className="tickets-offer__top">
                    <span>CURATED ROUTE</span>
                    <span className="tickets-offer__sale">{offer.discount}</span>
                  </div>
                  <h3>{offer.title}</h3>
                  <p>{offer.meta}</p>
                  <div className="tickets-offer__route">{offer.route}</div>
                  <div className="tickets-offer__bottom">
                    <strong>€{offer.price}</strong>
                    <Link to={offer.href} aria-label={`Explore tours to ${offer.title}`}>→</Link>
                  </div>
                </article>
              ))}
            </div>
            {submitted && !visibleOffers.length && (
              <Link className="tickets-offers__all" to="/tours">Explore all tours →</Link>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
