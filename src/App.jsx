import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import NotFoundPage from './pages/NotFoundPage'
import { sitePages } from './pages/sitePages'

// Full-screen pages without the public header/footer.
const STANDALONE_PATHS = ['/login', '/admin']

/**
 * Routes are built from `pageMeta` exports in `src/pages/*Page.jsx`.
 * Add a new page file there — it appears here automatically.
 */
export default function App() {
  const layoutPages = sitePages.filter((page) => !STANDALONE_PATHS.includes(page.path))
  const standalonePages = sitePages.filter((page) => STANDALONE_PATHS.includes(page.path))

  return (
    <BrowserRouter>
      <Routes>
        {standalonePages.map(({ path, Component }) => (
          <Route
            key={path}
            path={path.replace(/^\//, '')}
            element={<Component />}
          />
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
