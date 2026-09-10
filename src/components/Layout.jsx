import { NavLink, Outlet } from 'react-router-dom'
import { navPages, sitePages } from '../pages/sitePages'
import './Layout.css'

export default function Layout() {
  const explorePages = sitePages.filter((page) => page.path !== '/')

  return (
    <div className="layout">
      <header className="site-header">
        <div className="container site-header__inner">
          <NavLink to="/" className="logo" aria-label="Lunavia home">
            <span className="logo__mark" aria-hidden="true" />
            Lunavia
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
          <NavLink to="/signUp" className="to_sign_up">
            SIGN UP
          </NavLink>
          <p className="site-header__currency"> UA / EN | € EUR</p>
          <NavLink to="/about" className="btn site-header__cta">
            Choose a destination
          </NavLink>
        </div>
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
