import { useState } from 'react'
import { Laptop, UserCheck, Award, TrendingUp, BarChart3, PenTool, Check, ArrowDown } from 'lucide-react'
import { Reveal, useSEO } from '../components/ui'
import { academy } from '../data'
import { api } from '../lib/api'

const featureIcon = { laptop: Laptop, mentor: UserCheck, cert: Award, career: TrendingUp }

function Mark({ c }) {
  const inner = c.mark === 'chart' ? <BarChart3 size={26} /> : c.mark === 'pen' ? <PenTool size={26} /> : c.mark
  return (
    <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-extrabold text-white shadow-lg shadow-black/10 transition group-hover:scale-110 group-hover:-rotate-3 ${c.bg}`}>
      {inner}
    </span>
  )
}

function Waitlist() {
  const [f, setF] = useState({ email: '', name: '', course: '' })
  const [st, setSt] = useState('idle')
  const [err, setErr] = useState('')
  async function submit(e) {
    e.preventDefault(); setSt('sending'); setErr('')
    try { await api('/academy/waitlist/', { method: 'POST', body: f }); setSt('done') }
    catch (x) { setErr(x.message); setSt('error') }
  }
  if (st === 'done')
    return (
      <div className="py-6 text-center">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-grad text-white"><Check size={28} /></span>
        <h3 className="text-xl font-extrabold">You're on the list!</h3>
        <p className="mt-1 text-sm text-zinc-400">We'll email you the moment Techive Academy opens.</p>
      </div>
    )
  return (
    <form onSubmit={submit} className="space-y-4">
      <input required type="email" placeholder="Your email" autoComplete="email" className="input !border-white/15 !bg-white/10 !text-white placeholder:text-zinc-500" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      <input placeholder="Your name (optional)" autoComplete="name" className="input !border-white/15 !bg-white/10 !text-white placeholder:text-zinc-500" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <select className="input !border-white/15 !bg-zinc-900 !text-white" value={f.course} onChange={(e) => setF({ ...f, course: e.target.value })}>
        <option value="">Course you're most interested in</option>
        {academy.courses.map((c) => <option key={c.name}>{c.name}</option>)}
      </select>
      {st === 'error' && <p className="text-sm text-red-400" role="alert">{err}</p>}
      <button disabled={st === 'sending'} className="btn-grad w-full">{st === 'sending' ? 'Joining…' : 'Notify me at launch'}</button>
    </form>
  )
}

export default function Academy() {
  useSEO('Academy', 'Techive Academy is launching soon: Python, JavaScript, Next.js, Tailwind, Ruby, C, Fullstack Engineering, Data Science and Graphic Design.')
  return (
    <>
      {/* Hero (poster style) */}
      <section className="relative overflow-hidden bg-ink pb-24 pt-40 text-white md:pt-52">
        <div className="pointer-events-none absolute inset-0 opacity-[.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="pointer-events-none absolute -right-20 top-10 h-[28rem] w-[28rem] rounded-full bg-brand-violet/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-brand-cyan/20 blur-3xl" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-up">
            <p className="text-sm font-semibold tracking-[.3em] text-zinc-300">LEARN <span className="text-brand-cyan">·</span> BUILD <span className="text-brand-cyan">·</span> GROW</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
              Academy<br /><span className="bg-brand-grad bg-clip-text text-transparent">Launch</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-300">Learn in-demand tech skills, boost your career, and build your future with Techive.</p>
            <a href="#waitlist" className="btn-grad mt-8">Join the waitlist <ArrowDown size={18} /></a>
          </div>
          <div className="relative flex min-h-[220px] items-center justify-center">
            <div className="relative -rotate-6 animate-fade-up rounded-[2rem] bg-brand-grad px-10 py-10 shadow-2xl shadow-brand-violet/30 sm:px-14 sm:py-14" style={{ clipPath: 'polygon(2% 12%,10% 0,92% 6%,100% 30%,97% 78%,88% 100%,8% 94%,0 62%)' }}>
              <p className="text-5xl font-extrabold italic leading-[1.05] sm:text-7xl" style={{ fontFamily: 'Georgia, "Brush Script MT", cursive' }}>Coming<br />Soon</p>
            </div>
            <p className="absolute -top-4 right-0 hidden rotate-[-6deg] text-xl italic text-zinc-300 sm:block" style={{ fontFamily: 'Georgia, serif' }}>Skills for a<br />brighter future</p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="bg-zinc-50 py-24">
        <div className="container-x">
          <Reveal className="mb-12 flex items-center gap-6">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Our Courses</h2>
            <span className="h-px flex-1 bg-brand-grad" />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {academy.courses.map((c, n) => (
              <Reveal key={c.name} delay={(n % 3) * 80}>
                <div className="card group flex h-full items-center gap-5">
                  <Mark c={c} />
                  <div><h3 className="text-lg font-bold leading-snug">{c.name}</h3><p className="mt-1 text-sm text-zinc-600">{c.text}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features + waitlist */}
      <section id="waitlist" className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-brand-grad" />
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <span className="eyebrow !text-zinc-400">Why Techive Academy</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Skills that lead to real work</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {academy.features.map((f) => {
                const I = featureIcon[f.icon]
                return (
                  <div key={f.title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-5">
                    <I size={30} className="shrink-0 text-brand-cyan" /><span className="font-semibold">{f.title}</span>
                  </div>
                )
              })}
            </div>
            <p className="mt-10 text-2xl italic text-zinc-300" style={{ fontFamily: 'Georgia, serif' }}>Your Skills. Our Mission.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[.05] p-8 backdrop-blur">
            <h3 className="text-2xl font-extrabold">Be first in line</h3>
            <p className="mb-6 mt-2 text-sm text-zinc-400">Join the waitlist and we'll email you launch dates, fees and early-bird offers.</p>
            <Waitlist />
          </div>
        </div>
      </section>
    </>
  )
}
