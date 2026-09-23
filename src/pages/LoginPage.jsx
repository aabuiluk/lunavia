import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LoginPage.css'
import BGImageForLogin from '../images/back_for-login.png'

export const pageMeta = {
  path: '/login',
  title: 'Login',
  order: 6,
  summary: 'Log in to your Lunavia account.',
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [values, setValues] = useState({ email: '', password: '' })

  const [config, setConfig] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/login/config')
      .then((res) => {
        if (!res.ok) throw new Error('Config fetch failed')
        return res.json()
      })
      .then((data) => setConfig(data))
      .catch((err) => console.log('Backend config error:', err))
  }, [])

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        return
      }

      alert(`Welcome back, ${data.user.name}!`)
      console.log('Successfully logged in:', data)

    } catch (err) {
      setError('Failed to connect to the server.')
    }
  }

  return (
    <div className="login">
      <div className="login__media">
        <img src={BGImageForLogin} alt="Overwater bungalows in a lagoon" />
        <div className="login__media-veil" />

        <Link to="/" className="login__logo">
          <span className="logo__mark" aria-hidden="true" />
          Lunavia
        </Link>

        <div className="login__media-content">
          <p className="login__eyebrow login__eyebrow--light">
            YOUR ROUTE TO EVERYWHERE
          </p>
          <h1>
            {config?.bannerText ? (
              config.bannerText
            ) : (
              <>
                A little less
                <br />
                planning. <span>A lot more</span>
                <br />
                going.
              </>
            )}
          </h1>
        </div>

        <p className="login__caption">Lunavia · Ukraine to anywhere</p>
      </div>

      <div className="login__panel">
        <span className="login__blob" aria-hidden="true" />
        <span className="login__ring" aria-hidden="true" />

        <form className="login__form" onSubmit={handleSubmit}>
          <p className="login__eyebrow">WELCOME BACK</p>
          <h2>{config?.welcomeTitle || 'Ready when you are.'}</h2>
          <p className="login__subtext">
            {config?.subtext || 'Log in to pick up where your travel plans left off.'}
          </p>

          {error && (
            <div style={{ color: '#d9534f', fontSize: '13px', marginBottom: '16px', fontWeight: 'bold' }}>
              {error}
            </div>
          )}

          <label className="login__field">
            <span>EMAIL ADDRESS</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </label>

          <label className="login__field">
            <span>PASSWORD</span>
            <div className="login__field-control">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={values.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
              <button
                type="button"
                className="login__eye"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                👁
              </button>
            </div>
          </label>

          <Link to="/register" className="login__forgot">
            Forgot password? <span>Restore it</span>
          </Link>

          <button type="submit" className="btn login__submit">
            Log in <span>→</span>
          </button>

          <div className="login__divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <button type="button" className="login__google">
            <span className="login__google-g">G</span> Google
          </button>

          <p className="login__signup">
            New to Lunavia? <Link to="/register">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  )
}