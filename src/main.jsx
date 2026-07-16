import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import CompanyProfile from './CompanyProfile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<CompanyProfile />} />
        <Route path="/contact" element={<App />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
