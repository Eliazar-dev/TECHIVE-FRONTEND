import { Globe, Smartphone, Boxes, RefreshCw, CreditCard, BarChart3, Search } from 'lucide-react'

// ⚠️ Edit this file to change site content. Replace placeholder contact details before launch.
export const company = {
  name: 'Techive IT Solutions',
  tagline: 'Archiving Innovation. Coding the Future.',
  email: 'hello@techive.co.ke',
  phone: '+254 700 000 000',
  address: 'Upper Hill, Nairobi, Kenya',
  socials: [], // e.g. [{ label: 'LinkedIn', href: 'https://...' }]
}

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

// Videos: drop files in /public/videos or host them (Cloudinary/S3/R2) and set VITE_MEDIA_URL.
const M = import.meta.env.VITE_MEDIA_URL || '/videos'
export const slides = [
  {
    video: `${M}/aerial-city.mp4`,
    title: ['Your Trusted', 'Tech Partner'],
    sub: 'Technology that moves your business forward.',
    tags: 'Web • Apps • Systems • Data • SEO',
    cta: { label: 'Explore Our Services', to: '/services' },
  },
  {
    video: `${M}/developers-coding.mp4`,
    title: ['Code That', 'Works For You'],
    sub: 'Custom software built by engineers who care about the details.',
    tags: 'Web Apps • Business Systems • Modernization',
    cta: { label: 'See Our Solutions', to: '/solutions' },
  },
  {
    video: `${M}/payments.mp4`,
    title: ['Payments That', 'Just Work'],
    sub: 'M-Pesa, cards and bank integrations, done securely.',
    tags: 'M-Pesa • Cards • Invoicing • Reconciliation',
    cta: { label: 'Payment Integration', to: '/services' },
  },
  {
    video: `${M}/analytics.mp4`,
    title: ['Decisions Driven', 'By Data'],
    sub: 'Dashboards and analytics that show what is really happening.',
    tags: 'Analytics • Reporting • SEO • Growth',
    cta: { label: 'Start a Project', to: '/contact' },
  },
]

export const services = [
  { icon: Globe, title: 'Web Development', blurb: 'Fast, modern, SEO-ready websites and web apps that represent your brand and convert visitors.', points: ['Business & institutional sites', 'E-commerce & portals', 'Performance & accessibility first'] },
  { icon: Smartphone, title: 'Application Development', blurb: 'Cross-platform mobile and web applications designed around how your users actually work.', points: ['Android & iOS apps', 'Progressive web apps', 'API design & integration'] },
  { icon: Boxes, title: 'Custom Business Systems', blurb: 'ERP-style systems for operations, records, billing, members and staff — built to your process.', points: ['Inventory, HR & finance', 'Member & donor management', 'Role-based access & audit trails'] },
  { icon: RefreshCw, title: 'Software Modernization', blurb: 'Move ageing spreadsheets and legacy software onto reliable, maintainable, secure platforms.', points: ['Legacy rewrites & migrations', 'Cloud move & hosting', 'Data cleanup & import'] },
  { icon: CreditCard, title: 'Payment Integration', blurb: 'Seamless checkout and automated reconciliation using the payment channels your customers trust.', points: ['M-Pesa STK & C2B', 'Card & bank payments', 'Receipts & reconciliation'] },
  { icon: BarChart3, title: 'Data Analytics', blurb: 'Turn operational data into dashboards, reports and insights your team can act on.', points: ['Dashboards & KPIs', 'Automated reports', 'Data pipelines'] },
  { icon: Search, title: 'SEO & Digital Presence', blurb: 'Technical SEO, content structure and speed optimisation that help the right people find you.', points: ['Technical SEO audits', 'Page speed & Core Web Vitals', 'Analytics & tracking'] },
]

export const audiences = ['Businesses', 'Institutions', 'Ministries', 'Entrepreneurs']

export const solutions = [
  { tag: 'Billing', title: 'WiFi Hotspot & Voucher Billing', blurb: 'Captive portal, vouchers and automated M-Pesa payments for ISPs and hotspot operators.', features: ['Voucher & package management', 'Automatic M-Pesa confirmation', 'Usage and revenue reports'] },
  { tag: 'Faith & community', title: 'Church & Member Hub', blurb: 'Members, giving, events, groups and communication in one secure system for ministries.', features: ['Member records & groups', 'Tithe & offering tracking', 'SMS / email announcements'] },
  { tag: 'Education', title: 'School & Learning Portal', blurb: 'Admissions, fees, results and parent communication for schools and training institutions.', features: ['Student & fee management', 'Online results & reports', 'Parent & staff portals'] },
  { tag: 'Operations', title: 'Business Management Suite', blurb: 'Sales, stock, invoicing and staff management tailored to your workflow.', features: ['Invoices & receipts', 'Stock & supplier tracking', 'Multi-branch support'] },
]

// Placeholder case studies — replace with real projects & images.
export const projects = [
  { cat: 'Web', title: 'Corporate Website Redesign', blurb: 'A faster, mobile-first rebuild with a content workflow the team can manage themselves.', tags: ['React', 'Django', 'SEO'] },
  { cat: 'Systems', title: 'Member Management Platform', blurb: 'Replaced spreadsheets with a role-based system for records, groups and giving.', tags: ['Django', 'PostgreSQL'] },
  { cat: 'Payments', title: 'M-Pesa Billing Automation', blurb: 'Automatic payment confirmation and reconciliation, cutting manual follow-up.', tags: ['M-Pesa', 'API'] },
  { cat: 'Analytics', title: 'Operations Dashboard', blurb: 'One live view of sales, stock and performance for management.', tags: ['Analytics', 'Reports'] },
  { cat: 'Apps', title: 'Field Service Mobile App', blurb: 'Offline-friendly app for staff to log jobs and sync when back online.', tags: ['Mobile', 'API'] },
  { cat: 'Web', title: 'Institution Portal', blurb: 'Public site plus secure portal for applications, notices and downloads.', tags: ['React', 'Auth'] },
]

export const process = [
  { n: '01', title: 'Discover', text: 'We listen, map your process and define what success looks like.' },
  { n: '02', title: 'Design', text: 'Clear flows and interfaces you approve before we write code.' },
  { n: '03', title: 'Build', text: 'Iterative delivery with regular demos and tested releases.' },
  { n: '04', title: 'Support', text: 'Launch, training, monitoring and continued improvement.' },
]

export const values = [
  { title: 'Reliable', text: 'Systems that keep working on busy days, built with tested, proven tools.' },
  { title: 'Useful', text: 'We build what solves a real problem, not what merely looks impressive.' },
  { title: 'Transparent', text: 'Plain-language updates, honest timelines and fair scope.' },
  { title: 'Lasting', text: 'Clean, documented code your team can own and grow.' },
]

export const academy = {
  courses: [
    { name: 'Tailwind (CSS)', text: 'Modern, responsive web design.', mark: 'tw', bg: 'bg-cyan-600' },
    { name: 'Python Programming', text: 'Build, automate, innovate.', mark: 'py', bg: 'bg-blue-900' },
    { name: 'Ruby', text: 'Simple. Powerful. Flexible.', mark: 'rb', bg: 'bg-red-600' },
    { name: 'JavaScript', text: 'Bring websites to life.', mark: 'JS', bg: 'bg-yellow-400 !text-black' },
    { name: 'Next JS', text: 'Modern React framework for the web.', mark: 'N', bg: 'bg-black' },
    { name: 'C Language', text: 'Build the foundation of programming.', mark: 'C', bg: 'bg-blue-600' },
    { name: 'Fullstack Engineering', text: 'Mobile & Web Development.', mark: '</>', bg: 'bg-indigo-600' },
    { name: 'Data Science', text: 'Turn data into insights.', mark: 'chart', bg: 'bg-emerald-600' },
    { name: 'Graphic Design', text: 'Create. Design. Inspire.', mark: 'pen', bg: 'bg-zinc-800' },
  ],
  features: [
    { icon: 'laptop', title: 'Hands-on Projects' },
    { icon: 'mentor', title: 'Expert Mentorship' },
    { icon: 'cert', title: 'Certificates of Completion' },
    { icon: 'career', title: 'Career Support' },
  ],
}
