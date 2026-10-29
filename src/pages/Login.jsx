import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { Mail, ArrowLeft } from 'lucide-react'
import { PageHero, useSEO } from '../components/ui'
import { api } from '../lib/api'
import { useAuth } from '../lib/auth'

const GOOGLE = import.meta.env.VITE_GOOGLE_CLIENT_ID

export default function Login() {
  useSEO('Sign in')
  const { login } = useAuth()
  const nav = useNavigate()
  const [qs] = useSearchParams()
  const next = qs.get('next')?.startsWith('/') ? qs.get('next') : '/' // only same-site paths
  const [step, setStep] = useState('email') // email | code
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [wait, setWait] = useState(0)

  useEffect(() => { if (wait > 0) { const t = setTimeout(() => setWait(wait - 1), 1000); return () => clearTimeout(t) } }, [wait])

  const run = async (fn) => { setBusy(true); setErr(''); try { await fn() } catch (e) { setErr(e.message) } finally { setBusy(false) } }
  const done = (d) => { login(d); nav(d.user.is_staff && next === '/' ? '/admin' : next, { replace: true }) }

  const sendCode = (e) => { e?.preventDefault(); run(async () => { await api('/auth/otp/request/', { method: 'POST', body: { email } }); setStep('code'); setWait(60) }) }
  const verify = (e) => { e.preventDefault(); run(async () => done(await api('/auth/otp/verify/', { method: 'POST', body: { email, code } }))) }
  const google = (r) => run(async () => done(await api('/auth/google/', { method: 'POST', body: { credential: r.credential } })))

  return (
    <>
      <PageHero eyebrow="Account" title="Sign in" />
      <section className="bg-zinc-50 py-16">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-black/5">
          {step === 'email' ? (
            <>
              <h2 className="text-xl font-extrabold">Welcome</h2>
              <p className="mt-1 text-sm text-zinc-600">Enter your email and we'll send you a 6-digit code. No password needed.</p>
              <form onSubmit={sendCode} className="mt-6 space-y-4">
                <input required type="email" autoComplete="email" placeholder="you@example.com" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button disabled={busy} className="btn-dark w-full"><Mail size={18} />{busy ? 'Sending…' : 'Email me a code'}</button>
              </form>
              {GOOGLE && (
                <>
                  <div className="my-6 flex items-center gap-3 text-xs text-zinc-400"><span className="h-px flex-1 bg-zinc-200" />OR<span className="h-px flex-1 bg-zinc-200" /></div>
                  <div className="flex justify-center"><GoogleLogin onSuccess={google} onError={() => setErr('Google sign-in failed')} shape="pill" width="320" text="continue_with" /></div>
                </>
              )}
            </>
          ) : (
            <>
              <button onClick={() => { setStep('email'); setCode(''); setErr('') }} className="mb-4 flex items-center gap-1 text-sm text-zinc-500 hover:text-ink"><ArrowLeft size={16} />Back</button>
              <h2 className="text-xl font-extrabold">Check your email</h2>
              <p className="mt-1 text-sm text-zinc-600">We sent a 6-digit code to <b>{email}</b>. It expires in 10 minutes.</p>
              <form onSubmit={verify} className="mt-6 space-y-4">
                <input required inputMode="numeric" autoComplete="one-time-code" pattern="\d{6}" maxLength={6} placeholder="000000" autoFocus
                  className="input text-center text-2xl font-bold tracking-[.5em]" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} />
                <button disabled={busy || code.length !== 6} className="btn-dark w-full">{busy ? 'Verifying…' : 'Verify & sign in'}</button>
              </form>
              <button disabled={wait > 0 || busy} onClick={sendCode} className="mt-4 w-full text-sm text-zinc-500 disabled:opacity-60 hover:text-ink">{wait > 0 ? `Resend code in ${wait}s` : 'Resend code'}</button>
            </>
          )}
          {err && <p className="mt-4 text-center text-sm text-red-600" role="alert">{err}</p>}
        </div>
        <p className="mt-6 text-center text-xs text-zinc-500">By continuing you agree to our terms. <Link to="/contact" className="underline">Need help?</Link></p>
      </section>
    </>
  )
}
