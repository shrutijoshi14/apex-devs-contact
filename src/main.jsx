import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App.jsx'
import CompanyProfile from './CompanyProfile.jsx'

const basename = '/apex-devs-contact'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<CompanyProfile />} />
        <Route path="/contact" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
