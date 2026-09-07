import Header from './components/Header'
import Hero from './components/Hero'
import Work from './components/Work'
import Philosophy from './components/Philosophy'
import Stack from './components/Stack'
import Contact from './components/Contact'
import AdminApp from './admin/AdminApp'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase()
  if (path === '/admin' || path.startsWith('/admin/')) {
    return <AdminApp />
  }

  return (
    <div className="min-h-screen antialiased selection:bg-[#101512] selection:text-white font-sans">
      <Header />
      <Hero />
      <Work />
      <Philosophy />
      <Stack />
      <Contact />
    </div>
  )
}
