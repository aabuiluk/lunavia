/**
 * Shared API helpers. Copy `useApi` into any site page that talks to FastAPI.
 *
 * In `npm run dev`, Vite proxies `/api` to the backend (port 8000).
 * In production the same origin serves both the SPA and `/api`.
 */
import { useEffect, useState } from 'react'

export function apiUrl(path) {
  const base = import.meta.env.VITE_API_BASE ?? ''
  const prefix = path.startsWith('/') ? path : `/${path}`
  return `${base}${prefix}`
}

export async function apiGet(path, signal) {
  const response = await fetch(apiUrl(path), { signal })
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }
  return response.json()
}

export function useApi(path) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    apiGet(path, controller.signal)
      .then((payload) => {
        setData(payload)
        setError(null)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err)
        setLoading(false)
      })

    return () => controller.abort()
  }, [path])

  return { data, error, loading }
}
