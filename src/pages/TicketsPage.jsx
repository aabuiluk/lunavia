import { useEffect, useMemo, useState } from 'react'
import { apiGet } from '../api/client'
import heroImage from '../assets/tickets/airplane_hero.jpg'
import './TicketsPage.css'

export const pageMeta = {
  path: '/tickets',
  title: 'Airline tickets',
  order: 4,
  summary: 'Explore thoughtfully chosen flights and routes.',
}

const initialSearch = {
  departure: '',
  arrival: '',
  date: '',
  passengers: '1',
}

function airportCode(value, options, selectedCode) {
  const exact = options.filter((airport) =>
    airport.label.toLowerCase() === value.trim().toLowerCase() ||
    airport.city.toLowerCase() === value.trim().toLowerCase() ||
    airport.code.toLowerCase() === value.trim().toLowerCase()
  )
  if (selectedCode && exact.some((airport) => airport.code === selectedCode)) return selectedCode
  return exact.length === 1 ? exact[0].code : null
}

function localDate() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function flightUrl(origin, destination, date, passengers) {
  const compactDate = date.slice(2).replaceAll('-', '')
  const url = new URL(`/transport/flights/${origin.toLowerCase()}/${destination.toLowerCase()}/${compactDate}/`, 'https://www.skyscanner.net')
  url.searchParams.set('adultsv2', passengers)
  url.searchParams.set('cabinclass', 'economy')
  return url.href
}

function normalizeFlight(item) {
  const cities = item.route.split(/\s*→\s*/)
  const airline = item.airline.toLowerCase()
  const tone = airline.includes('wizz') ? 'pink' : airline.includes('austrian') ? 'coral' : 'blue'
  return {
    id: item.id,
    airline: item.airline,
    initials: item.airline.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase(),
    tone,
    caption: 'Sample fare · availability unverified',
    badge: 'SAMPLE ROUTE',
    departure: item.departure_time,
    arrival: item.arrival_time,
    duration: item.duration,
    stops: item.stops,
    from: cities[0],
    to: cities.at(-1),
    route: item.route,
    price: item.price_eur,
    departureAirport: cities.length > 2 ? cities[1] : cities[0],
    hour: Number(item.departure_time.split(':')[0]),
  }
}

function FlightCard({ flight, selected, onSelect }) {
  return (
    <article className={`flight-card${selected ? ' flight-card--selected' : ''}`}>
      <div className="flight-card__header">
        <div className={`flight-card__logo flight-card__logo--${flight.tone}`} aria-hidden="true">{flight.initials}</div>
        <div className="flight-card__airline">
          <h3>{flight.airline}</h3>
          <p>{flight.caption}</p>
        </div>
        <span className="flight-card__badge">{flight.badge}</span>
      </div>

      <div className="flight-card__body">
        <div className="flight-card__time">
          <strong>{flight.departure}</strong>
          <span>{flight.from}</span>
        </div>
        <div className="flight-card__journey">
          <span>{flight.duration} · {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops === 1 ? '' : 's'}`}</span>
          <div className="flight-card__line" aria-hidden="true"><i /></div>
        </div>
        <div className="flight-card__time">
          <strong>{flight.arrival}</strong>
          <span>{flight.to}</span>
        </div>
        <div className="flight-card__price">
          <strong>€{flight.price}</strong>
          <span>per person</span>
        </div>
      </div>

      <div className="flight-card__footer">
        <span>{flight.route}</span>
        <button type="button" onClick={() => onSelect(selected ? null : flight.id)}
          aria-expanded={selected} aria-controls={`flight-details-${flight.id}`}>
          {selected ? 'Hide details' : 'View details'} <span aria-hidden="true">↗</span>
        </button>
      </div>
      {selected && (
        <div className="flight-card__details" id={`flight-details-${flight.id}`}>
          <strong>{flight.airline} · €{flight.price} per person</strong>
          <span>Sample fare from the Lunavia API. Date, seat availability and booking are not provided by the API yet.</span>
        </div>
      )}
    </article>
  )
}

export default function TicketsPage() {
  const [search, setSearch] = useState(initialSearch)
  const [airportOptions, setAirportOptions] = useState({ departure: [], arrival: [] })
  const [selectedCodes, setSelectedCodes] = useState({ departure: null, arrival: null })
  const [searchError, setSearchError] = useState('')
  const [airportError, setAirportError] = useState('')
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({ stops: 'all', airport: 'all', time: 'all', airline: 'all' })
  const [sort, setSort] = useState('best')
  const [selectedFlight, setSelectedFlight] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(() => {
      for (const field of ['departure', 'arrival']) {
        const term = search[field].replace(/\s*\([A-Z]{3}\)$/, '').trim()
        if (term.length < 2) {
          setAirportOptions((current) => ({ ...current, [field]: [] }))
          continue
        }
        apiGet(`/api/airline-tickets/airports?query=${encodeURIComponent(term)}`, controller.signal)
          .then((options) => {
            setAirportOptions((current) => ({ ...current, [field]: options }))
            setAirportError('')
          })
          .catch((err) => {
            if (err.name !== 'AbortError') setAirportError('Airport suggestions are unavailable. Start the FastAPI server.')
          })
      }
    }, 200)
    return () => { clearTimeout(timer); controller.abort() }
  }, [search.departure, search.arrival])

  useEffect(() => {
    const controller = new AbortController()
    apiGet('/api/airline-tickets', controller.signal)
      .then((data) => {
        if (!Array.isArray(data?.flights)) throw new Error('Unexpected flight response')
        setFlights(data.flights.map(normalizeFlight))
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setFlights([])
        setError(err.message)
        setLoading(false)
      })
    return () => controller.abort()
  }, [])

  const visibleFlights = useMemo(() => {
    const filtered = flights.filter((flight) => {
      if (filters.stops !== 'all' && flight.stops !== Number(filters.stops)) return false
      if (filters.airport !== 'all' && flight.departureAirport !== filters.airport) return false
      if (filters.airline !== 'all' && flight.airline !== filters.airline) return false
      if (filters.time === 'morning' && flight.hour >= 12) return false
      if (filters.time === 'afternoon' && (flight.hour < 12 || flight.hour >= 18)) return false
      if (filters.time === 'evening' && flight.hour < 18) return false
      return true
    })
    if (sort === 'price') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'departure') return [...filtered].sort((a, b) => a.hour - b.hour)
    return filtered
  }, [flights, filters, sort])

  const airports = [...new Set(flights.map((flight) => flight.departureAirport))]
  const airlines = [...new Set(flights.map((flight) => flight.airline))]

  function submitSearch(event) {
    event.preventDefault()
    const departure = airportCode(search.departure, airportOptions.departure, selectedCodes.departure)
    const arrival = airportCode(search.arrival, airportOptions.arrival, selectedCodes.arrival)
    if (!departure || !arrival) {
      setSearchError('Choose departure and arrival airports from the suggestions.')
      return
    }
    if (departure === arrival) {
      setSearchError('Choose different departure and arrival airports.')
      return
    }
    if (!search.date || search.date < localDate()) {
      setSearchError('Choose a departure date from today onward.')
      return
    }
    setSearchError('')
    window.location.assign(flightUrl(departure, arrival, search.date, search.passengers))
  }

  function changeAirport(field, value) {
    setSearch((current) => ({ ...current, [field]: value }))
    setSelectedCodes((current) => ({
      ...current,
      [field]: airportOptions[field].find((airport) => airport.label === value)?.code ?? null,
    }))
    setSearchError('')
  }

  function updateFilter(event) {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
    setSelectedFlight(null)
  }

  return (
    <main className="tickets-page">
      <section className="tickets-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="container tickets-hero__content">
          <p className="tickets-eyebrow"><span aria-hidden="true">✦</span> FLIGHT TICKETS</p>
          <h1><span className="tickets-hero__first-line">The best ticket is</span><br /><span className="tickets-hero__accent">the one that works.</span></h1>
        </div>
      </section>

      <div className="container tickets-search-wrap">
        <form className="tickets-search" onSubmit={submitSearch} aria-label="Search flights">
          <label className="tickets-search__field">
            <span>DEPARTURE</span>
            <input name="departure" value={search.departure} placeholder="Choose an airport" required
              list="tickets-departure-airports" autoComplete="off"
              onChange={(event) => changeAirport('departure', event.target.value)} />
            <datalist id="tickets-departure-airports">
              {airportOptions.departure.map((airport) => <option key={airport.code} value={airport.label} label={`${airport.airport} — ${airport.country}`} />)}
            </datalist>
          </label>
          <label className="tickets-search__field">
            <span>ARRIVAL</span>
            <input name="arrival" value={search.arrival} placeholder="Choose an airport" required
              list="tickets-arrival-airports" autoComplete="off"
              onChange={(event) => changeAirport('arrival', event.target.value)} />
            <datalist id="tickets-arrival-airports">
              {airportOptions.arrival.map((airport) => <option key={airport.code} value={airport.label} label={`${airport.airport} — ${airport.country}`} />)}
            </datalist>
          </label>
          <label className="tickets-search__field tickets-search__field--date">
            <span>DEPARTURE DATE</span>
            <input type="date" name="date" value={search.date} min={localDate()} required
              onChange={(event) => setSearch({ ...search, date: event.target.value })} />
          </label>
          <label className="tickets-search__field tickets-search__field--passengers">
            <span>PASSENGERS</span>
            <select name="passengers" value={search.passengers}
              onChange={(event) => setSearch({ ...search, passengers: event.target.value })}>
              {[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count}</option>)}
            </select>
          </label>
          <button className="tickets-search__submit" type="submit">Search flights <span aria-hidden="true">↗</span></button>
        </form>
        <p className="tickets-search__note">Search opens flight results on Skyscanner. The cards below are sample routes from Lunavia.</p>
        {(searchError || airportError) && <p className="tickets-search__error" role="alert">{searchError || airportError}</p>}
      </div>

      <section id="tickets-results" className="container tickets-results" aria-label="Flight results">
        <aside className="tickets-filters" aria-label="Filter flights">
          <h2>FILTER FLIGHTS</h2>
          <label className="tickets-filters__item">
            <span>STOPS</span>
            <select name="stops" value={filters.stops} onChange={updateFilter}>
              <option value="all">Direct · 1 stop</option>
              <option value="0">Direct only</option>
              <option value="1">1 stop</option>
            </select>
          </label>
          <label className="tickets-filters__item">
            <span>DEPARTURE AIRPORT</span>
            <select name="airport" value={filters.airport} onChange={updateFilter}>
              <option value="all">All nearby airports</option>
              {airports.map((airport) => <option value={airport} key={airport}>{airport}</option>)}
            </select>
          </label>
          <label className="tickets-filters__item">
            <span>TIME OF DAY</span>
            <select name="time" value={filters.time} onChange={updateFilter}>
              <option value="all">Any time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </label>
          <label className="tickets-filters__item">
            <span>AIRLINE</span>
            <select name="airline" value={filters.airline} onChange={updateFilter}>
              <option value="all">All airlines</option>
              {airlines.map((airline) => <option value={airline} key={airline}>{airline}</option>)}
            </select>
          </label>
          <div className="tickets-filters__note">
            <strong>Lunavia route check</strong>
            <p>These are sample routes. The API does not check dates, passenger availability or live prices yet.</p>
          </div>
        </aside>

        <div className="tickets-results__main">
          <div className="tickets-results__heading">
            <div>
              <h2>Featured routes <span>sample fares</span></h2>
              <p role="status">{loading ? 'Loading routes…' : error ? 'Could not load routes' : `${visibleFlights.length} sample route${visibleFlights.length === 1 ? '' : 's'} found`}</p>
            </div>
            <label className="tickets-sort">
              <span>Sort</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="best">Best match</option>
                <option value="price">Lowest price</option>
                <option value="departure">Earliest departure</option>
              </select>
            </label>
          </div>
          <div className="tickets-results__list">
            {visibleFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight}
                selected={selectedFlight === flight.id} onSelect={setSelectedFlight} />
            ))}
            {!loading && error && (
              <div className="tickets-results__empty" role="alert">
                <h3>Flight search unavailable</h3>
                <p>{error}. Check that the FastAPI server is running, then reload this page.</p>
              </div>
            )}
            {!loading && !error && !visibleFlights.length && (
              <div className="tickets-results__empty">
                <h3>No sample routes found</h3>
                <p>Adjust the filters to see the available sample routes.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
