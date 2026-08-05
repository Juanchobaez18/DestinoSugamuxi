import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import DestinosPage from './pages/DestinosPage'
import ExperienciasPage from './pages/ExperienciasPage'
import CulturaPage from './pages/CulturaPage'
import ContactoPage from './pages/ContactoPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="destinos" element={<DestinosPage />} />
          <Route path="experiencias" element={<ExperienciasPage />} />
          <Route path="cultura" element={<CulturaPage />} />
          <Route path="contacto" element={<ContactoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
