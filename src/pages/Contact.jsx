import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Check, Lock } from 'lucide-react'
import { PageHero, useSEO } from '../components/ui'
import { company, services } from '../data'
import { api } from '../lib/api'
import { useAuth } from '../lib/auth'

const budgets = ['Under KSh 50,000', 'KSh 50,000 – 150,000', 'KSh 150,000 – 500,000', 'Above KSh 500,000', 'Not sure yet']

export default function Contact() {
  useSEO('Get a Quote', 'Request a quote from the Techive team for your website, app or business system.')
  const { user, ready } = useAuth()
  const [f, setF] = useState({ name: '', phone: '', service: '', budget: '', message: '' })
  const [state, setState] = useState('idle') // idle | sending | done | error
  const [err, setErr] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setState('sending'); setErr('')
    try { await api('/quotes/', { method: 'POST', body: f }); setState('done') }
    catch (x) { setErr(x.message); setState('error') }
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Get a quote" text="Tell us about your project. A senior member of the team will reply within one business day." />
      <section className="bg-zinc-50 py-20">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 lg:col-span-2">
            {!ready ? <div className="h-64" /> : !user ? (
              <div className="py-12 text-center">
                <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-ink text-white"><Lock size={28} /></span>
                <h2 className="text-2xl font-extrabold">Sign in to request a quote</h2>
                <p className="mx-auto mt-2 max-w-md text-zinc-600">It takes less than a minute: we email you a 6-digit code, or you can continue with Google. This lets us reply to a verified address and keep your requests in one place.</p>
                <Link to="/login?next=/contact" className="btn-dark mt-8">Sign in to continue</Link>
              </div>
            ) : state === 'done' ? (
              <div className="py-16 text-center">
                <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-ink text-white"><Check size={32} /></span>
                <h2 className="text-2xl font-extrabold">Thank you, we got your request</h2>
                <p className="mt-2 text-zinc-600">We'll get back to you at {user.email} shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                <h2 className="text-2xl font-extrabold sm:col-span-2">Request a quote <span className="block text-sm font-normal text-zinc-500">Signed in as {user.email}</span></h2>
                <label className="text-sm font-medium">Name<input className="input mt-1" value={f.name} onChange={set('name')} autoComplete="name" placeholder={user.first_name || 'Your name'} /></label>
                <label className="text-sm font-medium">Phone / WhatsApp<input className="input mt-1" value={f.phone} onChange={set('phone')} autoComplete="tel" /></label>
                <label className="text-sm font-medium">Service
                  <select className="input mt-1" value={f.service} onChange={set('service')}>
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s.title}>{s.title}</option>)}<option>Other</option>
                  </select></label>
                <label className="text-sm font-medium sm:col-span-2">Budget
                  <select className="input mt-1" value={f.budget} onChange={set('budget')}><option value="">Select a range</option>{budgets.map((b) => <option key={b}>{b}</option>)}</select></label>
                <label className="text-sm font-medium sm:col-span-2">Project details<textarea required rows={5} className="input mt-1" value={f.message} onChange={set('message')} placeholder="What do you want to build or fix?" /></label>
                {state === 'error' && <p className="text-sm text-red-600 sm:col-span-2" role="alert">{err}</p>}
                <button disabled={state === 'sending'} className="btn-dark sm:col-span-2">{state === 'sending' ? 'Sending…' : 'Send request'}</button>
              </form>
            )}
          </div>
          <aside className="space-y-4">
            {[[Mail, 'Email', company.email, `mailto:${company.email}`], [Phone, 'Phone / WhatsApp', company.phone, `tel:${company.phone.replace(/\s/g, '')}`], [MapPin, 'Office', company.address]].map(([I, t, v, h]) => (
              <div key={t} className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-white"><I size={20} /></span>
                <div><p className="text-xs font-bold uppercase tracking-widest text-zinc-500">{t}</p>
                  {h ? <a href={h} className="font-semibold hover:underline">{v}</a> : <p className="font-semibold">{v}</p>}</div>
              </div>
            ))}
            <div className="rounded-2xl bg-ink p-6 text-white"><p className="font-bold">Response time</p><p className="mt-1 text-sm text-zinc-400">Within one business day, Monday to Friday.</p></div>
          </aside>
        </div>
      </section>
    </>
  )
}
