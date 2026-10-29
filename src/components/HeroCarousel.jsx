import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { slides } from '../data'

const INTERVAL = 8000 // ms per slide

export default function HeroCarousel() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [failed, setFailed] = useState({})
  const go = useCallback((n) => setI((n + slides.length) % slides.length), [])

  // auto-advance; restarts whenever the slide changes (manual or automatic)
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => go(i + 1), INTERVAL)
    return () => clearTimeout(t)
  }, [i, paused, go])

  const s = slides[i]

  return (
    <section
      className="relative isolate h-[100svh] min-h-[640px] max-h-[900px] overflow-hidden bg-ink text-white"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel" aria-label="Featured"
    >
      {/* Only the active slide's video is mounted → fast load, low bandwidth */}
      <div key={i} className="absolute inset-0 -z-10">
        {failed[i] ? (
          <div className="h-full w-full bg-gradient-to-br from-zinc-800 via-ink to-zinc-900" />
        ) : (
          <video
            key={s.video} src={s.video} autoPlay muted loop playsInline preload={i === 0 ? 'auto' : 'metadata'}
            onError={() => setFailed((f) => ({ ...f, [i]: true }))}
            className="h-full w-full object-cover animate-fade-in"
          />
        )}
      </div>

      {/* readability overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/45 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/70 via-transparent to-ink/40" />

      <div className="container-x flex h-full items-center">
        <div key={`t${i}`} className="max-w-2xl pt-24 animate-fade-up">
          <div className="mb-6 h-1 w-24 rounded bg-brand-grad" />
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {s.title[0]}<br />{s.title[1]}
          </h1>
          <p className="mt-6 text-lg text-white/90 sm:text-xl">{s.sub}</p>
          <p className="mt-4 text-base font-medium text-white/80 sm:text-xl">{s.tags}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to={s.cta.to} className="btn-grad !px-7 !py-4">{s.cta.label} <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn-ghost !px-7 !py-4">Start a Project</Link>
          </div>
        </div>
      </div>

      <button onClick={() => go(i - 1)} aria-label="Previous slide" className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/40 p-3 backdrop-blur transition hover:bg-black/70 sm:block"><ChevronLeft size={24} /></button>
      <button onClick={() => go(i + 1)} aria-label="Next slide" className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/40 p-3 backdrop-blur transition hover:bg-black/70 sm:block"><ChevronRight size={24} /></button>

      <div className="absolute inset-x-0 bottom-8 flex justify-center gap-3">
        {slides.map((_, n) => (
          <button key={n} onClick={() => go(n)} aria-label={`Go to slide ${n + 1}`} aria-current={n === i}
            className={`h-3 rounded-full transition-all ${n === i ? 'w-8 bg-brand-cyan' : 'w-3 bg-white/50 hover:bg-white'}`} />
        ))}
      </div>
    </section>
  )
}
