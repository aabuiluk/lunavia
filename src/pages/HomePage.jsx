import { Link } from 'react-router-dom'
import { RouteMap } from '../components/RouteMap'
import { Destinations } from '../components/Destinations'
import { Offers } from '../components/Offers'
import { WhyUs } from '../components/WhyUs'
import { PlanCta } from '../components/PlanCta'
import './HomePage.css'
import { useEffect, useRef, useState } from 'react'
import heroImg from '../images/hero.png'
import { apiGet, useApi } from '../api/client'

export const pageMeta = {
  path: '/',
  title: 'Home',
  order: 1,
  summary: 'Start here — Lunavia’s welcome page and travel promise.',
}

// Validators keyed by the *meaning* of a field, not its name —
// so any field with type: 'city' gets city rules, etc.
const VALIDATORS = {
  city: (value) => {
    const v = value.trim()
    if (!v) return 'Please enter a place'
    if (v.length < 2) return 'Too short'
    return null
  },
  date: (value) => {
    if (!value.trim()) return 'Choose a departure date'
    const dates = parseDates(value)
    if (!dates) return 'Choose valid dates'
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (dates[0] < today) return 'Choose a future date'
    if (dates[1] && dates[1] < dates[0]) return 'Return after departure'
    return null
  },
  count: (value) => {
    const v = value.trim()
    if (!v) return 'Please enter a number'
    if (!/^\d+$/.test(v)) return 'Numbers only'
    const n = Number(v)
    if (n < 1) return 'At least 1 traveler'
    if (n > 9) return 'Max 9 travelers'
    return null
  },
}

// Skyscanner's flight URL uses YYMMDD. Check real calendar dates before redirecting.
function parseDates(value) {
  const parts = value.trim().split(/\s*[-–]\s*/)
  if (parts.length > 2) return null
  const dates = parts.map((part) => {
    const match = /^(\d{1,2})[./](\d{1,2})[./](\d{4})$/.exec(part)
    if (!match) return null
    const [, day, month, year] = match.map(Number)
    const date = new Date(year, month - 1, day)
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null
    return date
  })
  return dates.every(Boolean) ? dates : null
}

function inputDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function displayDate(value) {
  return value.split('-').reverse().join('.')
}

function airportCode(value, options, selectedCode) {
  const input = value.trim().toLowerCase()
  if (selectedCode && options.some((airport) => airport.code === selectedCode && airport.label.toLowerCase() === input)) {
    return selectedCode
  }
  const exact = options.filter((airport) => airport.city.toLowerCase() === input || airport.code.toLowerCase() === input)
  return exact.length === 1 ? exact[0].code : null
}

function flightUrl(values, codes) {
  const dates = parseDates(values.dates)
  const format = (date) => `${String(date.getFullYear()).slice(-2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
  const path = [codes.start, codes.where, ...dates.map(format)].join('/').toLowerCase()
  const url = new URL(`/transport/flights/${path}/`, 'https://www.skyscanner.net')
  url.searchParams.set('adultsv2', values.travelers)
  url.searchParams.set('cabinclass', 'economy')
  return url.href
}

export function SearchBar({ fields, note, ctaLabel = 'Find route', onSubmit }) {
  const [values, setValues] = useState(
    Object.fromEntries(fields.map((f) => [f.name, f.value]))
  )
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [airportOptions, setAirportOptions] = useState({ start: [], where: [] })
  const [selectedCodes, setSelectedCodes] = useState({ start: null, where: null })
  const [airportError, setAirportError] = useState('')
  const [dateOpen, setDateOpen] = useState(false)
  const dateFieldRef = useRef(null)
  const today = inputDate(new Date())
  const selectedDates = parseDates(values.dates || '')
  const departure = selectedDates ? inputDate(selectedDates[0]) : ''
  const returning = selectedDates?.[1] ? inputDate(selectedDates[1]) : ''

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(() => {
      fields.filter((field) => field.type === 'city').forEach((field) => {
        const term = (values[field.name] || '').replace(/\s*\([A-Z]{3}\)$/, '').trim()
        if (term.length < 2) {
          setAirportOptions((previous) => ({ ...previous, [field.name]: [] }))
          return
        }
        apiGet(`/api/home/airports?query=${encodeURIComponent(term)}`, controller.signal)
          .then((options) => {
            setAirportOptions((previous) => ({ ...previous, [field.name]: options }))
            setAirportError('')
          })
          .catch((error) => {
            if (error.name !== 'AbortError') setAirportError('Airport suggestions are unavailable. Check the API server.')
          })
      })
    }, 200)
    return () => { clearTimeout(timer); controller.abort() }
  }, [values.start, values.where])

  useEffect(() => {
    if (!dateOpen) return
    function closeOutside(event) {
      if (!dateFieldRef.current?.contains(event.target)) setDateOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [dateOpen])

  function validateField(field, value, selectedCode = selectedCodes[field.name]) {
    const validator = VALIDATORS[field.type]
    const error = validator ? validator(value) : null
    if (error) return error
    if (field.type === 'city' && !airportCode(value, airportOptions[field.name] || [], selectedCode)) return 'Choose an airport from the suggestions'
    return null
  }

  function handleChange(field, newValue) {
    setValues((prev) => ({ ...prev, [field.name]: newValue }))
    const selectedCode = field.type === 'city'
      ? airportOptions[field.name]?.find((airport) => airport.label === newValue)?.code || null
      : null
    if (field.type === 'city') setSelectedCodes((prev) => ({ ...prev, [field.name]: selectedCode }))
    if (touched[field.name]) {
      setErrors((prev) => ({ ...prev, [field.name]: validateField(field, newValue, selectedCode) }))
    }
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field.name]: true }))
    setErrors((prev) => ({
      ...prev,
      [field.name]: validateField(field, values[field.name]),
    }))
  }

  function handleSubmit() {
    const nextErrors = {}
    fields.forEach((field) => {
      nextErrors[field.name] = validateField(field, values[field.name])
    })
    setErrors(nextErrors)
    setTouched(Object.fromEntries(fields.map((f) => [f.name, true])))

    const hasErrors = Object.values(nextErrors).some(Boolean)
    if (hasErrors) {
      if (nextErrors.dates) setDateOpen(true)
      return
    }

    onSubmit?.(values, {
      start: airportCode(values.start, airportOptions.start, selectedCodes.start),
      where: airportCode(values.where, airportOptions.where, selectedCodes.where),
    })
  }

  return (
    <div className="search-bar">
      <div className="search-bar__grid">
        {fields.map((field) => {
          const error = errors[field.name]
          return (
            <div
              className={
                'search-bar__field' + (error ? ' search-bar__field--error' : '')
              }
              key={field.name}
              ref={field.type === 'date' ? dateFieldRef : undefined}
            >
              <label className="search-bar__label" htmlFor={field.name}>
                {field.label}
              </label>
              {field.type === 'date' ? (
                <>
                  <button
                    id={field.name}
                    type="button"
                    className="search-bar__value search-bar__date-trigger"
                    aria-expanded={dateOpen}
                    aria-controls={dateOpen ? 'search-date-picker' : undefined}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${field.name}-error` : undefined}
                    onClick={() => setDateOpen((open) => !open)}
                  >
                    {values[field.name] || 'Choose dates'} <span aria-hidden="true">▾</span>
                  </button>
                  {dateOpen && (
                    <div
                      id="search-date-picker"
                      className="search-bar__date-picker"
                      role="group"
                      aria-label="Flight dates"
                      onKeyDown={(event) => { if (event.key === 'Escape') setDateOpen(false) }}
                    >
                      <label htmlFor="departure-date">Departure</label>
                      <input
                        id="departure-date"
                        type="date"
                        value={departure}
                        min={today}
                        onChange={(event) => {
                          const next = event.target.value
                          const nextReturn = returning && returning >= next ? returning : ''
                          handleChange(field, next ? `${displayDate(next)}${nextReturn ? ` - ${displayDate(nextReturn)}` : ''}` : '')
                        }}
                      />
                      <label htmlFor="return-date">Return (optional)</label>
                      <input
                        id="return-date"
                        type="date"
                        value={returning}
                        min={departure || today}
                        disabled={!departure}
                        onChange={(event) => {
                          const next = event.target.value
                          handleChange(field, `${displayDate(departure)}${next ? ` - ${displayDate(next)}` : ''}`)
                        }}
                      />
                      <button type="button" className="search-bar__date-done" onClick={() => setDateOpen(false)}>Done</button>
                    </div>
                  )}
                </>
              ) : (
                <input
                  id={field.name}
                  className="search-bar__value"
                  type={field.type === 'count' ? 'number' : 'text'}
                  min={field.type === 'count' ? 1 : undefined}
                  max={field.type === 'count' ? 9 : undefined}
                  value={values[field.name]}
                  placeholder={field.placeholder}
                  list={field.type === 'city' ? `${field.name}-airports` : undefined}
                  onChange={(e) => handleChange(field, e.target.value)}
                  onBlur={() => handleBlur(field)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${field.name}-error` : undefined}
                />
              )}
              {field.type === 'city' && (
                <datalist id={`${field.name}-airports`}>
                  {(airportOptions[field.name] || []).map((airport) => <option key={airport.code} value={airport.label} label={`${airport.airport} — ${airport.country}`} />)}
                </datalist>
              )}
              {error && (
                <span className="search-bar__error" id={`${field.name}-error`}>
                  {error}
                </span>
              )}
            </div>
          )
        })}

        <button type="button" className="search-bar__cta" onClick={handleSubmit}>
          {ctaLabel} <span>→</span>
        </button>
      </div>

      {note && <p className="search-bar__note">{note}</p>}
      {airportError && <p className="search-bar__error" role="alert">{airportError}</p>}
    </div>
  )
}

export default function HomePage() {
  const { data } = useApi('/api/home')
  const actions = data?.actions ?? [
    { label: 'Know the price', href: '/about', variant: 'light' },
    { label: 'Go direct', href: '/tours', variant: 'ghost' },
  ]

  return (
    <>
      <section className="home-hero">
        <img className="home-hero__media" src={data?.image || heroImg} alt={data?.imageAlt || 'Beach with clear water and tropical cliffs'} />
        <div className="home-hero__veil" />
        <div className="container home-hero__content">
          <p className="ur_way_to">{data?.brand || 'YOUR WAY TO EVERYWHERE'}</p>
          <h1 className="rise rise-delay-1">
            {data?.title || 'Your route to'} <span>{data?.titleHighlight || 'anywhere'}</span> {data?.titleSuffix || 'in the world'}
          </h1>
          <p className="rise rise-delay-2">
            {data?.lead || 'From Ukraine to anywhere in the world. We know the most convenient routes through European airports and can find a price that works for you.'}
          </p>
          <div className="home-hero__actions rise rise-delay-2">
            {actions.map((action) => (
              <Link
                key={`${action.href}-${action.label}`}
                className={action.variant === 'ghost' ? 'btn btn--ghost home-hero__ghost' : 'btn btn--light'}
                to={action.href}
              >
                {action.label}
              </Link>
            ))}
          </div>
          <div className='for_inputs_to_route'>
            <SearchBar
              fields={data?.search?.fields ?? [
                { name: 'start', label: 'Start?', value: '', placeholder: 'Krakow', type: 'city' },
                { name: 'where', label: 'Where?', value: '', placeholder: 'Barcelona', type: 'city' },
                { name: 'dates', label: 'Dates', value: '', placeholder: '12.10.2026 - 19.10.2026', type: 'date' },
                { name: 'travelers', label: 'Travelers', value: '', placeholder: 'Choose number of travelers', type: 'count' },
              ]}
              note={data?.search?.note ?? 'Flight results open on Skyscanner. Train and hotel connections are not included.'}
              ctaLabel={data?.search?.ctaLabel ?? 'Find route'}
              onSubmit={(values, codes) => { window.location.assign(flightUrl(values, codes)) }}
            />
          </div>
        </div>
      </section>

      <RouteMap data={data?.routeMap} />
      <Destinations data={data?.destinations} />
      <Offers />
      <WhyUs />
      <PlanCta />
    </>
  )
}
