/**
 * Shared API helpers. Copy `useApi` into any site page that talks to FastAPI.
 *
 * In `npm run dev`, Vite proxies `/api` to the backend (port 8000).
 * In production the same origin serves both the SPA and `/api`.
 */
import { useEffect, useState } from 'react'

const ADMIN_TOKEN_KEY = 'lunavia.adminToken'

export function apiUrl(path) {
  const base = import.meta.env.VITE_API_BASE ?? ''
  const prefix = path.startsWith('/') ? path : `/${path}`
  return `${base}${prefix}`
}

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY)
}

export function setAdminToken(token) {
  if (token) localStorage.setItem(ADMIN_TOKEN_KEY, token)
  else localStorage.removeItem(ADMIN_TOKEN_KEY)
}

export async function apiGet(path, signal) {
  return apiSend(path, { signal })
}

export async function apiSend(
  path,
  { method = 'GET', body, token, signal } = {},
) {
  const headers = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  const auth = token ?? getAdminToken()
  if (auth) headers.Authorization = `Bearer ${auth}`

  const response = await fetch(apiUrl(path), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  })

  if (response.status === 204) return null
  if (!response.ok) {
    let detail = `${response.status} ${response.statusText}`
    try {
      const payload = await response.json()
      if (payload?.detail) {
        detail =
          typeof payload.detail === 'string'
            ? payload.detail
            : JSON.stringify(payload.detail)
      }
    } catch {
      /* keep status text */
    }
    const error = new Error(detail)
    error.status = response.status
    throw error
  }

  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) return response.json()
  return null
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
