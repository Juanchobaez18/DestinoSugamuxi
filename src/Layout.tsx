import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import { LanguageProvider } from '@/context/LanguageContext'

/** Maps route paths to page titles (replicating Next.js Metadata) */
const pageTitles: Record<string, string> = {
  '/': 'Sugamuxi · Provincia de Boyacá, Colombia',
  '/destinos': 'Destinos | Sugamuxi',
  '/experiencias': 'Experiencias | Sugamuxi',
  '/cultura': 'Cultura | Sugamuxi',
  '/contacto': 'Contacto | Sugamuxi',
}

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on route change (Next.js does this automatically)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Set document title per route (replaces Next.js Metadata)
  useEffect(() => {
    document.title = pageTitles[pathname] || 'Sugamuxi · Provincia de Boyacá, Colombia'
  }, [pathname])

  return (
    <LanguageProvider>
      <LoadingScreen />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
