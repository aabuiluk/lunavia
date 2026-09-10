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

export function SearchBar({ fields, note, ctaLabel = 'Find route', onSubmit }) {
  const [values, setValues] = useState(
    Object.fromEntries(fields.map((f) => [f.name, f.value]))
  )

  function handleChange(name, newValue) {
    setValues((prev) => ({ ...prev, [name]: newValue }))
  }

  return (
    <div className="search-bar">
      <div className="search-bar__grid">
        {fields.map((field) => (
          <div className="search-bar__field" key={field.name}>
            <label className="search-bar__label" htmlFor={field.name}>
              {field.label}
            </label>
            <input
              id={field.name}
              className="search-bar__value"
              type="text"
              value={values[field.name]}
              placeholder={field.placeholder}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          </div>
        ))}

        <button className="search-bar__cta" onClick={() => onSubmit?.(values)}>
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
                { name: 'start', label: 'Start?', value: '', placeholder: 'Choose start point' },
                { name: 'where', label: 'Where?', value: '', placeholder: 'Choose destination' },
                { name: 'dates', label: 'Dates', value: '', placeholder: 'Choose dates' },
                { name: 'travelers', label: 'Travelers', value: '', placeholder: 'Choose number of travelers' },
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
