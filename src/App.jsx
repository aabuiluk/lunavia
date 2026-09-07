import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import NotFoundPage from './pages/NotFoundPage'
import { sitePages } from './pages/sitePages'

/**
 * Routes are built from `pageMeta` exports in `src/pages/*Page.jsx`.
 * Add a new page file there — it appears here automatically.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {sitePages.map(({ path, Component }) => (
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
