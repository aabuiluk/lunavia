import { useState } from 'react'
import './PlanCta.css'
import BGImage from '../images/_ 1.png'

const BG =
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=80'

export function PlanCta() {
  const [values, setValues] = useState({
    from: '',
    to: '',
    when: '',
    budget: '',
  })

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('search', values)
  }

  return (
    <section className="plan_container">
      <div className="plan__panel">
        <img className="plan__bg" src={BGImage} alt="Palm trees over turquoise ocean" />
        <div className="plan__veil" />

        <div className="plan__content">
          <p className="plan__eyebrow">PLAN YOUR ESCAPE</p>
          <h2 className="plan__title">
            Tell us where
            <br />
            you want to go.
          </h2>
          <p className="plan__text">We'll find the smartest way to get you there.</p>
        </div>

        <form className="plan__form" onSubmit={handleSubmit}>
          <label className="plan__field">
            <span>STARTING FROM</span>
            <input
            placeholder="Enter your departure city"
              value={values.from}
              onChange={(e) => handleChange('from', e.target.value)}
            />
          </label>

          <label className="plan__field">
            <span>WHERE TO?</span>
            <input
            placeholder="Enter your destination"
              value={values.to}
              onChange={(e) => handleChange('to', e.target.value)}
            />
          </label>

          <div className="plan__row">
            <label className="plan__field">
              <span>WHEN?</span>
              <input
              placeholder="Enter your travel dates"
                value={values.when}
                onChange={(e) => handleChange('when', e.target.value)}
              />
            </label>
            <label className="plan__field">
              <span>BUDGET</span>
              <input
                placeholder="300$"
                value={values.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
              />
            </label>
          </div>

          <button type="submit" className="plan__submit">
            Find my route <span>→</span>
          </button>
        </form>
      </div>
    </section>
  )
}
