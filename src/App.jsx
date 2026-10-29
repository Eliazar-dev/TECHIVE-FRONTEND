import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home' // eager: first paint

// every other page is code-split → small initial bundle
const Services = lazy(() => import('./pages/Services'))
const Solutions = lazy(() => import('./pages/Solutions'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const About = lazy(() => import('./pages/About'))
const Academy = lazy(() => import('./pages/Academy'))
const Contact = lazy(() => import('./pages/Contact'))
const Admin = lazy(() => import('./pages/Admin'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="about" element={<About />} />
          <Route path="academy" element={<Academy />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
