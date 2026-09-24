import { useState } from 'react'
import './PlanCta.css'
import BGImage from '../images/_ 1.png'

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
    const parts = v.split(/\s*[-–]\s*/)
    if (parts.length > 2) return 'Use one date or a range'

    const allValid = parts.every((part) => datePattern.test(part))
    if (!allValid) return 'Use a date like 12.08.2026'

    return null
  },
  budget: (value) => {
    const v = value.trim()
    if (!v) return 'Please enter a budget'

    const cleaned = v.replace(/[$€\s]/g, '')
    if (!/^\d+$/.test(cleaned)) return 'Numbers only, e.g. 300'

    const n = Number(cleaned)
    if (n < 50) return 'Minimum 50'
    if (n > 100000) return 'That seems too high'

    return null
  },
}

const FIELDS = [
  { name: 'from', label: 'STARTING FROM', placeholder: 'Enter your departure city', type: 'city' },
  { name: 'to', label: 'WHERE TO?', placeholder: 'Enter your destination', type: 'city' },
  { name: 'when', label: 'WHEN?', placeholder: 'Enter your travel dates', type: 'date' },
  { name: 'budget', label: 'BUDGET', placeholder: '300$', type: 'budget' },
]

export function PlanCta() {
  const [values, setValues] = useState({ from: '', to: '', when: '', budget: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  function validateField(field, value) {
    const validator = VALIDATORS[field.type]
    return validator ? validator(value) : null
  }

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field.name]: value }))
    if (touched[field.name]) {
      setErrors((prev) => ({ ...prev, [field.name]: validateField(field, value) }))
    }
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field.name]: true }))
    setErrors((prev) => ({
      ...prev,
      [field.name]: validateField(field, values[field.name]),
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const nextErrors = {}
    FIELDS.forEach((field) => {
      nextErrors[field.name] = validateField(field, values[field.name])
    })
    setErrors(nextErrors)
    setTouched({ from: true, to: true, when: true, budget: true })

    const hasErrors = Object.values(nextErrors).some(Boolean)
    if (hasErrors) return

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

        <form className="plan__form" onSubmit={handleSubmit} noValidate>
          {FIELDS.slice(0, 2).map((field) => {
            const error = errors[field.name]
            return (
              <label
                key={field.name}
                className={'plan__field' + (error ? ' plan__field--error' : '')}
              >
                <span>{field.label}</span>
                <input
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  onBlur={() => handleBlur(field)}
                  aria-invalid={Boolean(error)}
                />
                {error && <span className="plan__error">{error}</span>}
              </label>
            )
          })}

          <div className="plan__row">
            {FIELDS.slice(2).map((field) => {
              const error = errors[field.name]
              return (
                <label
                  key={field.name}
                  className={'plan__field' + (error ? ' plan__field--error' : '')}
                >
                  <span>{field.label}</span>
                  <input
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    onBlur={() => handleBlur(field)}
                    aria-invalid={Boolean(error)}
                  />
                  {error && <span className="plan__error">{error}</span>}
                </label>
              )
            })}
          </div>

          <button type="submit" className="plan__submit">
            Find my route <span>→</span>
          </button>
        </form>
      </div>
    </section>
  )
}