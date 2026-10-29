import { Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero, Reveal, CTA, useSEO } from '../components/ui'
import { solutions } from '../data'

export default function Solutions() {
  useSEO('Solutions', 'Ready-to-deploy platforms for billing, ministries, schools and business management — tailored to your organization.')
  return (
    <>
      <PageHero eyebrow="Solutions" title="Ready-to-deploy platforms, tailored to you" text="Proven systems that get you live faster, customised to your branding, process and budget." />
      <section className="bg-zinc-50 py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {solutions.map((s, n) => (
            <Reveal key={s.title} delay={(n % 2) * 100}>
              <article className="card flex h-full flex-col">
                <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-zinc-600">{s.tag}</span>
                <h2 className="mt-4 text-2xl font-extrabold">{s.title}</h2>
                <p className="mt-3 text-zinc-600">{s.blurb}</p>
                <ul className="my-6 space-y-2 text-sm">{s.features.map((f) => <li key={f} className="flex gap-2"><Check size={18} className="text-brand-blue" />{f}</li>)}</ul>
                <Link to="/contact" className="mt-auto inline-flex items-center gap-2 font-semibold">Request a demo <ArrowRight size={16} /></Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA title="Need something that isn't listed?" text="Most of our work is custom. Describe your process and we will propose the right system." />
    </>
  )
}
