// Tiny fetch wrapper for the Django API. Tokens are kept in localStorage.
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const K = 'techive_tokens'

export const tokens = {
  get: () => { try { return JSON.parse(localStorage.getItem(K)) } catch { return null } },
  set: (t) => localStorage.setItem(K, JSON.stringify(t)),
  clear: () => localStorage.removeItem(K),
}

async function raw(path, opts = {}, access) {
  const res = await fetch(BASE + path, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(access && { Authorization: `Bearer ${access}` }) },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error(data.detail || data.error || 'Something went wrong'), { status: res.status, data })
  return data
}

export async function api(path, opts) {
  const t = tokens.get()
  try {
    return await raw(path, opts, t?.access)
  } catch (e) {
    // one silent refresh attempt on expired access token
    if (e.status === 401 && t?.refresh) {
      try {
        const r = await raw('/auth/token/refresh/', { method: 'POST', body: { refresh: t.refresh } })
        tokens.set({ ...t, access: r.access, ...(r.refresh && { refresh: r.refresh }) })
        return await raw(path, opts, r.access)
      } catch { tokens.clear() }
    }
    throw e
  }
}
