import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useApi } from '../api/client'
import { navPages } from '../pages/sitePages'
import './Layout.css'

function fallbackItems() {
  return navPages
    .filter((page) => page.path !== '/')
    .map((page, index) => ({
      id: page.path,
      label: page.title,
      href: page.path,
      enabled: true,
      order: index + 1,
    }))
}

export default function Layout() {
  const { pathname } = useLocation()
  const { data } = useApi('/api/menu')
  const [open, setOpen] = useState(false)

  const items = (data?.items?.length ? data.items : fallbackItems())
    .filter((item) => item.enabled !== false)
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const cta = data?.cta || { label: 'Choose a destination', href: '/tours' }
  const signUp = data?.signUp || { label: 'Sign up', href: '/register' }
  const currency = data?.currency || 'UA / EN | € EUR'

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (pathname.startsWith('/admin')) {
    return <Outlet />
  }

  return (
    <div className="layout">
      <header className="site-header">
        <div className="container site-header__bar">
          <NavLink to="/" className="logo" aria-label="Lunavia home">
            <span className="logo__mark" aria-hidden="true" />
            Lunavia
          </NavLink>

          <nav className="nav nav--desktop" aria-label="Primary">
            {items.map((item) => (
              <NavLink
                key={item.id || item.href}
                to={item.href}
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
                end={item.href === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <NavLink to={signUp.href} className="to_sign_up">
              {signUp.label}
            </NavLink>
            <p className="site-header__currency">{currency}</p>
            <NavLink to={cta.href} className="btn site-header__cta">
              {cta.label}
            </NavLink>
          </div>

          <button
            type="button"
            className={`nav-toggle${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        {open ? (
          <div className="nav-drawer" id="mobile-nav">
            <button
              type="button"
              className="nav-drawer__backdrop"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <nav className="nav-drawer__panel" aria-label="Mobile">
              {items.map((item) => (
                <NavLink
                  key={item.id || item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    isActive ? 'nav__link nav__link--active' : 'nav__link'
                  }
                  end={item.href === '/'}
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink to={signUp.href} className="to_sign_up">
                {signUp.label}
              </NavLink>
              <p className="site-header__currency">{currency}</p>
              <NavLink to={cta.href} className="btn site-header__cta">
                {cta.label}
              </NavLink>
            </nav>
          </div>
        ) : null}
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p className="logo logo--footer">
            <span className="logo__mark" aria-hidden="true" />
            Lunavia
          </p>

          <p className="site-footer__tagline">Your route to everywhere. © {new Date().getFullYear()}</p>

          <div className="site-footer__links">
            {items.slice(0, 4).map((item) => (
              <NavLink key={item.id || item.href} to={item.href} className="social-links">
                {item.label}
              </NavLink>
            ))}
            <a href="mailto:hello@lunavia.ua" className="social-links">
              hello@lunavia.ua
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
