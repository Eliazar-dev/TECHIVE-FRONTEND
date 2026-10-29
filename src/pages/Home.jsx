import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import HeroCarousel from '../components/HeroCarousel'
import { Reveal, SectionHead, CTA, useSEO } from '../components/ui'
import { services, solutions, audiences, values, process } from '../data'

export default function Home() {
  useSEO('', 'Techive IT Solutions — websites, apps, custom business systems, payment integration, analytics and SEO for businesses, institutions, ministries and entrepreneurs.')
  return (
    <>
      <HeroCarousel />

      {/* Services */}
      <section className="bg-zinc-50 py-24">
        <div className="container-x">
          <SectionHead eyebrow="Our Services" title="Comprehensive IT Solutions"
            text="We provide innovative and reliable technology solutions to help businesses, organizations and individuals achieve more." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, blurb }, n) => (
              <Reveal key={title} delay={(n % 3) * 80}>
                <Link to="/services" className="card group block h-full">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-white transition group-hover:bg-brand-grad"><Icon size={22} /></span>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold">Learn more <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={160}>
              <Link to="/contact" className="flex h-full min-h-[220px] flex-col justify-between rounded-2xl bg-ink p-6 text-white transition hover:-translate-y-1">
                <h3 className="text-xl font-bold">Have something specific in mind?</h3>
                <span className="inline-flex items-center gap-2 font-semibold text-brand-cyan">Talk to us <ArrowRight size={18} /></span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="border-y border-zinc-200 bg-white py-10">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Built for</span>
          {audiences.map((a) => <span key={a} className="text-xl font-extrabold text-zinc-800">{a}</span>)}
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-zinc-100 py-24">
        <div className="container-x">
          <SectionHead eyebrow="Ready-to-deploy" title="Solutions built for real needs" text="Proven systems we tailor to your organization, so you launch faster than starting from scratch." />
          <div className="grid gap-6 md:grid-cols-2">
            {solutions.slice(0, 2).map((s) => (
              <Reveal key={s.title}>
                <div className="card h-full">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{s.tag}</span>
                  <h3 className="mt-2 text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-zinc-600">{s.blurb}</p>
                  <ul className="mt-5 space-y-2 text-sm">{s.features.map((f) => <li key={f} className="flex gap-2"><Check size={18} className="text-brand-blue" />{f}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center"><Link to="/solutions" className="btn-dark">View all solutions <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      {/* Why + process (dark) */}
      <section className="bg-ink py-24 text-white">
        <div className="container-x">
          <SectionHead dark eyebrow="Why Techive" title="Technology you can rely on" text="Creativity, technical expertise and innovation, focused on technology that addresses real needs." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, n) => (
              <Reveal key={v.title} delay={n * 80}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[.04] p-6">
                  <h3 className="text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 grid gap-8 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <Reveal key={p.n}>
                <span className="bg-brand-grad bg-clip-text text-4xl font-extrabold text-transparent">{p.n}</span>
                <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
