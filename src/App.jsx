import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import NotFoundPage from './pages/NotFoundPage'
import { sitePages } from './pages/sitePages'

// Pages listed here render full-screen, without the site header/footer.
const STANDALONE_PATHS = ['/login']

/**
 * Routes are built from `pageMeta` exports in `src/pages/*Page.jsx`.
 * Add a new page file there — it appears here automatically.
 */
export default function App() {
  const layoutPages = sitePages.filter((p) => !STANDALONE_PATHS.includes(p.path))
  const standalonePages = sitePages.filter((p) => STANDALONE_PATHS.includes(p.path))

  return (
    <BrowserRouter>
      <Routes>
        {standalonePages.map(({ path, Component }) => (
          <Route key={path} path={path.replace(/^\//, '')} element={<Component />} />
        ))}

        <Route element={<Layout />}>
          {layoutPages.map(({ path, Component }) => (
            <Route
              key={path}
              index={path === '/'}
              path={path === '/' ? undefined : path.replace(/^\//, '')}
              element={<Component />}
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
