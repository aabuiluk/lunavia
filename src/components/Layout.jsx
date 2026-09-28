import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { navPages } from '../pages/sitePages'
import './Layout.css'
import heroImg from '../images/logo.png'


const MOBILE_MENU = [
  { label: 'Direct', to: '/' },
  { label: 'Tours', to: '/tours' },
  { label: 'Airline tickets', to: '/tickets' },
  { label: 'Hotels', to: '/hotels' },
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'About us', to: '/about' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeBtnRef = useRef(null)
  const { pathname, hash } = useLocation()


  useEffect(() => {
    if (!hash) return
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }, [pathname, hash])


  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])


  useEffect(() => {
    const mq = window.matchMedia('(min-width: 861px)')
    const onChange = (e) => e.matches && setMenuOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="layout">
      <header className="site-header">
        <div className="container site-header__inner">
          <NavLink to="/" className="logo" aria-label="Lunavia home">
            <img className="logo__img" src={heroImg} alt="Lunavia logo" />
          </NavLink>

          <nav className="nav" aria-label="Primary">
            {navPages.map((page) => (
              <NavLink
                key={page.path}
                to={page.path}
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
                end={page.path === '/'}
              >
                {page.title}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="sign_up_and_plan">
          <NavLink to="/login" className="to_sign_up">
            SIGN UP
          </NavLink>
          <p className="site-header__currency"> UA / EN | € EUR</p>
          <NavLink to="/about" className="btn site-header__cta">
            Choose a destination
          </NavLink>
        </div>

        <button
          type="button"
          className="burger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div
        id="mobile-menu"
        className={'mobile-menu' + (menuOpen ? ' mobile-menu--open' : '')}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menuOpen}
      >
        <button
          type="button"
          className="mobile-menu__close"
          aria-label="Close menu"
          ref={closeBtnRef}
          onClick={closeMenu}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <nav className="mobile-menu__list" aria-label="Mobile">
          {MOBILE_MENU.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end
              className={({ isActive }) =>
                'mobile-menu__link' +
                (isActive && !item.to.includes('#') ? ' active' : '')
              }
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mobile-menu__foot">
          <NavLink to="/login" className="mobile-menu__signup" onClick={closeMenu}>
            Sign up
          </NavLink>
          <span className="mobile-menu__currency">UA / EN | € EUR</span>
        </div>
      </div>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p className="logo logo--footer">
            <img className="logo__img" src={heroImg} alt="Lunavia logo" />
          </p>

          <p className="site-footer__tagline">Your route to everywhere. © 2026</p>

          <div className="site-footer__links">
            <a href="#" className="social-links">Instagram</a>
            <a href="#" className="social-links">Telegram</a>
            <a href="mailto:hello@lunavia.ua" className="social-links">hello@lunavia.ua</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
