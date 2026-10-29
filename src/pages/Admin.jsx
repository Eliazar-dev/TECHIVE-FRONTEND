import { useEffect, useState, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import { FileText, Users, GraduationCap, Inbox, ChevronLeft, ChevronRight, Copy } from 'lucide-react'
import { useSEO } from '../components/ui'
import { api } from '../lib/api'
import { useAuth } from '../lib/auth'

const STATUSES = { new: 'New', contacted: 'Contacted', in_progress: 'In progress', won: 'Won', lost: 'Lost' }
const pill = { new: 'bg-blue-100 text-blue-700', contacted: 'bg-amber-100 text-amber-700', in_progress: 'bg-violet-100 text-violet-700', won: 'bg-emerald-100 text-emerald-700', lost: 'bg-zinc-200 text-zinc-600' }
const fmt = (d) => (d ? new Date(d).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' }) : '—')

// Fetch one page of a paginated list endpoint
function useList(path, page, query = '') {
  const [d, setD] = useState({ results: [], count: 0, loading: true, error: '' })
  const load = useCallback(() => {
    setD((x) => ({ ...x, loading: true }))
    api(`${path}?page=${page}${query}`).then((r) => setD({ ...r, loading: false, error: '' })).catch((e) => setD({ results: [], count: 0, loading: false, error: e.message }))
  }, [path, page, query])
  useEffect(load, [load])
  return [d, load, setD]
}

function Pager({ page, setPage, count, size = 50 }) {
  const pages = Math.max(1, Math.ceil(count / size))
  return (
    <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-sm text-zinc-600">
      <span>{count} total</span>
      <div className="flex items-center gap-2">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-lg p-2 ring-1 ring-zinc-200 disabled:opacity-40" aria-label="Previous page"><ChevronLeft size={16} /></button>
        <span>Page {page} / {pages}</span>
        <button disabled={page >= pages} onClick={() => setPage(page + 1)} className="rounded-lg p-2 ring-1 ring-zinc-200 disabled:opacity-40" aria-label="Next page"><ChevronRight size={16} /></button>
      </div>
    </div>
  )
}

const Table = ({ head, children, empty, loading, error }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[640px] text-left text-sm">
      <thead className="bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500"><tr>{head.map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
      <tbody className="divide-y divide-zinc-100">{children}</tbody>
    </table>
    {(loading || error || empty) && <p className={`p-8 text-center text-sm ${error ? 'text-red-600' : 'text-zinc-500'}`}>{error || (loading ? 'Loading…' : 'Nothing here yet.')}</p>}
  </div>
)

function Overview() {
  const [s, setS] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => { api('/admin/stats/').then(setS).catch((e) => setErr(e.message)) }, [])
  if (err) return <p className="text-red-600">{err}</p>
  if (!s) return <p className="text-zinc-500">Loading…</p>
  const cards = [
    [Inbox, 'New quotes', s.quotes_new], [FileText, 'Quotes (7 days)', s.quotes_week], [FileText, 'All quotes', s.quotes_total],
    [Users, 'Users', s.users_total], [GraduationCap, 'Academy waitlist', s.waitlist_total],
  ]
  const max = Math.max(1, ...s.by_service.map((x) => x.n))
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(([I, l, v]) => (
          <div key={l} className="rounded-2xl border border-zinc-200 bg-white p-5">
            <I size={20} className="text-zinc-400" /><p className="mt-3 text-3xl font-extrabold">{v}</p><p className="text-sm text-zinc-500">{l}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="mb-4 font-bold">Quotes by service</h3>
          {s.by_service.length === 0 && <p className="text-sm text-zinc-500">No quotes yet.</p>}
          <div className="space-y-3">{s.by_service.map((x) => (
            <div key={x.service}><div className="mb-1 flex justify-between text-sm"><span>{x.service}</span><b>{x.n}</b></div>
              <div className="h-2 rounded bg-zinc-100"><div className="h-2 rounded bg-brand-grad" style={{ width: `${(x.n / max) * 100}%` }} /></div></div>
          ))}</div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="mb-4 font-bold">Pipeline</h3>
          <div className="flex flex-wrap gap-3">{Object.entries(STATUSES).map(([k, l]) => (
            <span key={k} className={`rounded-full px-4 py-2 text-sm font-semibold ${pill[k]}`}>{l}: {s.by_status[k] || 0}</span>
          ))}</div>
        </div>
      </div>
    </div>
  )
}

function Quotes() {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [open, setOpen] = useState(null)
  const [d, , setD] = useList('/admin/quotes/', page, status ? `&status=${status}` : '')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  const patch = async (q, body) => {
    setSaving(true)
    try {
      const r = await api(`/admin/quotes/${q.id}/`, { method: 'PATCH', body })
      setD((x) => ({ ...x, results: x.results.map((i) => (i.id === q.id ? r : i)) }))
    } catch (e) { alert(e.message) } finally { setSaving(false) }
  }
  const toggle = (q) => { setOpen(open === q.id ? null : q.id); setNotes(q.notes || '') }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200 p-4">
        <h2 className="font-bold">Quote requests</h2>
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm" aria-label="Filter by status">
          <option value="">All statuses</option>{Object.entries(STATUSES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
      </div>
      <Table head={['Client', 'Service', 'Budget', 'Received', 'Status']} loading={d.loading} error={d.error} empty={!d.loading && !d.error && d.results.length === 0}>
        {d.results.map((q) => (
          <FragmentRow key={q.id}>
            <tr className="cursor-pointer hover:bg-zinc-50" onClick={() => toggle(q)}>
              <td className="px-4 py-3"><p className="font-semibold">{q.name}</p><p className="text-xs text-zinc-500">{q.email}</p></td>
              <td className="px-4 py-3">{q.service || '—'}</td><td className="px-4 py-3">{q.budget || '—'}</td><td className="px-4 py-3 text-zinc-500">{fmt(q.created_at)}</td>
              <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                <select value={q.status} onChange={(e) => patch(q, { status: e.target.value })} className={`rounded-full px-3 py-1 text-xs font-semibold ${pill[q.status]}`} aria-label="Quote status">
                  {Object.entries(STATUSES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
              </td>
            </tr>
            {open === q.id && (
              <tr className="bg-zinc-50"><td colSpan={5} className="px-4 py-5">
                <div className="grid gap-6 md:grid-cols-2">
                  <div><p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Project details</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm">{q.message}</p>
                    <p className="mt-3 text-sm text-zinc-600">Phone: {q.phone || '—'}</p>
                    <a href={`mailto:${q.email}?subject=Your Techive quote request`} className="mt-1 inline-block text-sm font-semibold underline">Reply by email</a></div>
                  <div><label className="text-xs font-bold uppercase tracking-widest text-zinc-500" htmlFor={`n${q.id}`}>Internal notes</label>
                    <textarea id={`n${q.id}`} rows={4} className="input mt-2" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    <button disabled={saving} onClick={() => patch(q, { notes })} className="btn-dark mt-3 !py-2">{saving ? 'Saving…' : 'Save notes'}</button></div>
                </div>
              </td></tr>
            )}
          </FragmentRow>
        ))}
      </Table>
      <Pager page={page} setPage={setPage} count={d.count} />
    </div>
  )
}
const FragmentRow = ({ children }) => <>{children}</>

function Simple({ title, path, head, row, extra }) {
  const [page, setPage] = useState(1)
  const [d] = useList(path, page)
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white">
      <div className="flex items-center justify-between border-b border-zinc-200 p-4"><h2 className="font-bold">{title}</h2>{extra?.(d)}</div>
      <Table head={head} loading={d.loading} error={d.error} empty={!d.loading && !d.error && d.results.length === 0}>
        {d.results.map((r) => <tr key={r.id} className="hover:bg-zinc-50">{row(r)}</tr>)}
      </Table>
      <Pager page={page} setPage={setPage} count={d.count} />
    </div>
  )
}

const TABS = [['overview', 'Overview'], ['quotes', 'Quotes'], ['users', 'Users'], ['waitlist', 'Academy waitlist']]

export default function Admin() {
  useSEO('Admin')
  const { user, ready } = useAuth()
  const [tab, setTab] = useState('overview')
  if (!ready) return <div className="min-h-screen bg-ink" />
  if (!user) return <Navigate to="/login?next=/admin" replace />
  if (!user.is_staff) return (
    <section className="grid min-h-screen place-items-center bg-ink px-6 text-center text-white">
      <div><h1 className="text-3xl font-extrabold">Not authorized</h1><p className="mt-2 text-zinc-400">This area is for Techive staff only.</p></div>
    </section>
  )
  return (
    <>
      <section className="bg-ink pb-10 pt-36 text-white md:pt-44">
        <div className="container-x"><h1 className="text-3xl font-extrabold sm:text-4xl">Admin dashboard</h1><p className="mt-1 text-zinc-400">Signed in as {user.email}</p></div>
      </section>
      <section className="min-h-[60vh] bg-zinc-100 pb-20">
        <div className="container-x">
          <div className="-mt-5 mb-8 flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm ring-1 ring-zinc-200" role="tablist">
            {TABS.map(([k, l]) => (
              <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition ${tab === k ? 'bg-ink text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}>{l}</button>
            ))}
          </div>
          {tab === 'overview' && <Overview />}
          {tab === 'quotes' && <Quotes />}
          {tab === 'users' && <Simple title="Users" path="/admin/users/" head={['Email', 'Name', 'Role', 'Quotes', 'Joined', 'Last login']}
            row={(u) => <><td className="px-4 py-3 font-medium">{u.email}</td><td className="px-4 py-3">{`${u.first_name} ${u.last_name}`.trim() || '—'}</td><td className="px-4 py-3">{u.is_staff ? 'Staff' : 'Client'}</td><td className="px-4 py-3">{u.quotes}</td><td className="px-4 py-3 text-zinc-500">{fmt(u.date_joined)}</td><td className="px-4 py-3 text-zinc-500">{fmt(u.last_login)}</td></>} />}
          {tab === 'waitlist' && <Simple title="Academy waitlist" path="/admin/waitlist/" head={['Email', 'Name', 'Interested in', 'Joined']}
            extra={(d) => <button onClick={() => navigator.clipboard?.writeText(d.results.map((r) => r.email).join(', '))} className="flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-ink"><Copy size={16} />Copy page emails</button>}
            row={(w) => <><td className="px-4 py-3 font-medium">{w.email}</td><td className="px-4 py-3">{w.name || '—'}</td><td className="px-4 py-3">{w.course || '—'}</td><td className="px-4 py-3 text-zinc-500">{fmt(w.created_at)}</td></>} />}
        </div>
      </section>
    </>
  )
}
