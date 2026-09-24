import { Link } from 'react-router-dom'
import { RouteMap } from '../components/RouteMap'
import { Destinations } from '../components/Destinations'
import { Offers } from '../components/Offers'
import { WhyUs } from '../components/WhyUs'
import { PlanCta } from '../components/PlanCta'
import './HomePage.css'
import { useState } from 'react'
import heroImg from '../images/hero.png'

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
    if (!/^[a-zA-Zа-яА-ЯёЁ\s'-]+$/.test(v)) {
      return 'Letters only, no numbers or symbols'
    }
    return null
  },
  date: (value) => {
  const v = value.trim()
  if (!v) return 'Please choose dates'

  const datePattern = /^\d{1,2}[./]\d{1,2}[./]\d{2,4}$/

  // allow a single date or a range like "12.08.2026 - 19.08.2026"
  const parts = v.split(/\s*[-–]\s*/)
  if (parts.length > 2) return 'Use one date or a range'

  const allValid = parts.every((part) => datePattern.test(part))
  if (!allValid) return 'Use a date like 12.08.2026'

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

export function SearchBar({ fields, note, ctaLabel = 'Find route', onSubmit }) {
  const [values, setValues] = useState(
    Object.fromEntries(fields.map((f) => [f.name, f.value]))
  )
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  function validateField(field, value) {
    const validator = VALIDATORS[field.type]
    return validator ? validator(value) : null
  }

  function handleChange(field, newValue) {
    setValues((prev) => ({ ...prev, [field.name]: newValue }))
    if (touched[field.name]) {
      setErrors((prev) => ({ ...prev, [field.name]: validateField(field, newValue) }))
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
    if (hasErrors) return

    onSubmit?.(values)
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
            >
              <label className="search-bar__label" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                id={field.name}
                className="search-bar__value"
                type={field.type === 'count' ? 'number' : 'text'}
                min={field.type === 'count' ? 1 : undefined}
                max={field.type === 'count' ? 9 : undefined}
                value={values[field.name]}
                placeholder={field.placeholder}
                onChange={(e) => handleChange(field, e.target.value)}
                onBlur={() => handleBlur(field)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${field.name}-error` : undefined}
              />
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
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <img className="home-hero__media" src={heroImg} alt="Mountain lake at dusk" />
        <div className="home-hero__veil" />
        <div className="container home-hero__content">
          <p className="ur_way_to">YOUR WAY TO EVERYWHERE</p>
          <h1 className="rise rise-delay-1">
            Your route to <span>anywhere</span> in the world
          </h1>
          <p className="rise rise-delay-2">
            From Ukraine to anywhere in the world. We know the most convenient routes through European airports and can find a price that works for you.
          </p>
          <div className="home-hero__actions rise rise-delay-2">
            <Link className="btn btn--light" to="/about">
              Know the price
            </Link>
            <Link className="btn btn--ghost home-hero__ghost" to="/tours">
              Go direct
            </Link>
          </div>
          <div className='for_inputs_to_route'>
            <SearchBar
              fields={[
                { name: 'start', label: 'Start?', value: '', placeholder: 'Choose start point', type: 'city' },
                { name: 'where', label: 'Where?', value: '', placeholder: 'Choose destination', type: 'city' },
                { name: 'dates', label: 'Dates', value: '', placeholder: 'Choose dates', type: 'date' },
                { name: 'travelers', label: 'Travelers', value: '', placeholder: 'Choose number of travelers', type: 'count' },
              ]}
              note="Flights + trains + hotels — compared for you."
              onSubmit={(values) => console.log('submitted:', values)}
            />
          </div>
        </div>
      </section>

      <RouteMap />
      <Destinations />
      <Offers />
      <WhyUs />
      <PlanCta />
    </>
  )
}