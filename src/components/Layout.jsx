import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X, Mail, Phone, MapPin, LogOut } from 'lucide-react'
import { nav, company, services } from '../data'
import { useAuth } from '../lib/auth'

// NOT sticky: absolute, sits on top of the hero / page banner and scrolls away.
function Header() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  const link = ({ isActive }) =>
    `relative py-2 text-[15px] font-medium transition ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="container-x flex items-center justify-between py-5 lg:py-7">
        <Link to="/" aria-label="Techive IT Solutions home" className="shrink-0">
          <img src="/logo-light.png" alt="Techive IT Solutions" width="900" height="300" className="h-14 w-auto drop-shadow-lg sm:h-[72px] lg:h-24" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={link}>
              {({ isActive }) => (<>{n.label}{isActive && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded bg-brand-grad" />}</>)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          {user?.is_staff && <Link to="/admin" className="text-sm font-semibold text-brand-cyan hover:text-white">Admin</Link>}
          {user ? (
            <button onClick={logout} className="flex items-center gap-2 text-sm text-white/80 hover:text-white"><LogOut size={16} />{user.first_name || user.email.split('@')[0]}</button>
          ) : (
            <Link to="/login" className="text-sm font-medium text-white/80 hover:text-white">Sign in</Link>
          )}
          <Link to="/contact" className="btn-grad">Get a Quote <ArrowRight size={18} /></Link>
        </div>

        <button className="rounded-full bg-white/15 p-3 text-white backdrop-blur lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink/95 p-6 text-white backdrop-blur lg:hidden">
          <div className="flex items-center justify-between">
            <img src="/logo-light.png" alt="Techive" className="h-14 w-auto" />
            <button className="rounded-full bg-white/10 p-3" onClick={() => setOpen(false)} aria-label="Close menu"><X size={22} /></button>
          </div>
          <nav className="mt-10 flex flex-1 flex-col gap-1">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => `border-b border-white/10 py-4 text-2xl font-bold ${isActive ? 'text-brand-cyan' : ''}`}>{n.label}</NavLink>
            ))}
            {user?.is_staff && <Link to="/admin" className="py-4 text-lg text-brand-cyan">Admin dashboard</Link>}
            {user
              ? <button onClick={logout} className="py-4 text-left text-lg text-zinc-400">Sign out ({user.email})</button>
              : <Link to="/login" className="py-4 text-lg text-zinc-400">Sign in</Link>}
          </nav>
          <Link to="/contact" className="btn-grad w-full">Get a Quote <ArrowRight size={18} /></Link>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-zinc-400">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <img src="/logo-light.png" alt="Techive IT Solutions" loading="lazy" className="h-20 w-auto" />
          <p className="mt-5 text-sm leading-relaxed">{company.tagline} Practical, reliable and scalable digital solutions for businesses, institutions, ministries and entrepreneurs.</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Services</h3>
          <ul className="space-y-2 text-sm">{services.slice(0, 6).map((s) => <li key={s.title}><Link to="/services" className="hover:text-white">{s.title}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            {[['/about', 'About Us'], ['/solutions', 'Solutions'], ['/portfolio', 'Portfolio'], ['/academy', 'Academy'], ['/contact', 'Contact']].map(([to, l]) => <li key={to}><Link to={to} className="hover:text-white">{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Get in touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0" />{company.address}</li>
            <li className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0" /><a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-white">{company.phone}</a></li>
            <li className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0" /><a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs">© {new Date().getFullYear()} {company.name}. All rights reserved.</div>
    </footer>
  )
}

export default function Layout() {
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}
