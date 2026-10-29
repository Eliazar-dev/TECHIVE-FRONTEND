import { Check } from 'lucide-react'
import { PageHero, Reveal, SectionHead, CTA, useSEO } from '../components/ui'
import { services, process } from '../data'

export default function Services() {
  useSEO('Services', 'Web development, application development, custom business systems, software modernization, payment integration, data analytics and SEO.')
  return (
    <>
      <PageHero eyebrow="Our Services" title="Technology that simplifies how you work" text="From a modern website to a full business system, we design, build and support the digital tools your organization needs." />
      <section className="bg-zinc-50 py-24">
        <div className="container-x space-y-6">
          {services.map(({ icon: Icon, title, blurb, points }, n) => (
            <Reveal key={title}>
              <div className={`grid items-center gap-8 rounded-3xl border border-zinc-200 p-8 md:grid-cols-5 md:p-10 ${n % 2 ? 'bg-zinc-100' : 'bg-white'}`}>
                <div className="md:col-span-3">
                  <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white"><Icon size={26} /></span>
                  <h2 className="text-2xl font-extrabold">{title}</h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-zinc-600">{blurb}</p>
                </div>
                <ul className="space-y-3 md:col-span-2">
                  {points.map((p) => <li key={p} className="flex gap-3 font-medium"><Check size={20} className="mt-0.5 shrink-0 text-brand-blue" />{p}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-ink py-24 text-white">
        <div className="container-x">
          <SectionHead dark eyebrow="How we work" title="A simple, transparent process" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <Reveal key={p.n}><span className="bg-brand-grad bg-clip-text text-5xl font-extrabold text-transparent">{p.n}</span>
                <h3 className="mt-2 text-xl font-bold">{p.title}</h3><p className="mt-2 text-zinc-400">{p.text}</p></Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  )
}
