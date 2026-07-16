import { useState, useEffect } from 'react'
import { Sun, Moon, ArrowLeft } from 'lucide-react'
import logoImg from './assets/logo-removebg-preview.png'
import './App.css'

// ==========================================
// CONFIGURATION: Customize your settings here
// ==========================================
const WHATSAPP_PHONE_NUMBER = '919869840827' // Your actual WhatsApp number
const BUSINESS_NAME = 'Apex Dev'
const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzV_fTirqHUj9n2bjfoDvkP3fA1-vXWX9AUl2lsQpBUwRxgCPkld4nyrRs52csruFQ3/exec' // Add Google Sheet Apps Script URL here (optional)

// Custom WhatsApp SVG Brand Icon
const WhatsAppIcon = ({ size = 20, ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.503 4.94 1.505 5.548 0 10.064-4.512 10.068-10.066.002-2.69-1.043-5.22-2.943-7.12C16.855 1.574 14.331.528 11.64.528c-5.552 0-10.07 4.511-10.074 10.067-.001 1.802.483 3.562 1.4 5.124L1.875 22.23l6.572-1.722L6.648 19.15zM16.598 13.56c-.359-.18-2.122-1.048-2.45-1.167-.327-.119-.566-.18-.805.18-.239.36-.927 1.167-1.137 1.407-.21.24-.419.27-.778.09-1.802-.9-2.947-1.59-4.103-3.577-.304-.523.304-.486.87-1.614.097-.195.048-.364-.025-.514-.073-.15-.805-1.94-.888-2.143-.3-.724-.605-.626-.827-.636-.213-.01-.457-.012-.7-.012a1.35 1.35 0 0 0-.977.456C6.1 6.55 5.08 7.5 5.08 9.45c0 1.95 1.42 3.829 1.618 4.099.2.27 2.793 4.267 6.764 5.982.945.408 1.682.652 2.257.834.95.302 1.814.259 2.497.157.76-.113 2.122-.868 2.42-1.706.3-.837.3-1.554.21-1.706-.09-.153-.33-.243-.69-.423z"/>
  </svg>
)

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('apexTheme') || 'dark-theme')

  useEffect(() => {
    document.body.className = theme
    localStorage.setItem('apexTheme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark-theme' ? 'light-theme' : 'dark-theme')
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Clear error for that field when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const tempErrors = {}
    if (!formData.name.trim()) tempErrors.name = 'Full name is required'
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required'
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      tempErrors.phone = 'Please enter a valid phone number'
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      tempErrors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) tempErrors.message = 'Please type a message or inquiry'

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    // Format WhatsApp Message template
    const messageTemplate = `*New Lead from ${BUSINESS_NAME} QR Form* 🚀

*👤 Name:* ${formData.name.trim()}
*📞 Phone:* ${formData.phone.trim()}
*📧 Email:* ${formData.email.trim() || 'Not provided'}
*💼 Business:* ${formData.business.trim() || 'Not provided'}

*💬 Message:*
${formData.message.trim()}`

    // Generate WhatsApp Link
    const encodedMessage = encodeURIComponent(messageTemplate)
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`

    // Send to Google Sheets if configured
    if (GOOGLE_SHEET_WEBAPP_URL) {
      fetch(GOOGLE_SHEET_WEBAPP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || 'Not provided',
          business: formData.business.trim() || 'Not provided',
          message: formData.message.trim(),
          timestamp: new Date().toLocaleString()
        })
      }).catch((err) => console.error('Error sending to Google Sheet:', err))
    }

    // Simulate action latency
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Open WhatsApp web or app in new window/tab
      window.open(whatsappUrl, '_blank')

      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        business: '',
        message: ''
      })
      setErrors({})
    }, 800)
  }

  return (
    <div className="app-container">
      {/* Sleek Contact Form */}
      <div className="card" style={{ position: 'relative' }}>
        {/* Back navigation button */}
        <a 
          href="#/" 
          className="back-home-btn"
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '8px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem'
          }}
          aria-label="Back to home"
        >
          <ArrowLeft size={16} />
          <span>Home</span>
        </a>

        {/* Theme toggle button */}
        <button 
          onClick={toggleTheme}
          className="theme-toggle-btn"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Toggle Theme"
        >
          {theme === 'dark-theme' ? <Sun size={18} style={{ color: 'var(--border-focus)' }} /> : <Moon size={18} style={{ color: 'var(--border-focus)' }} />}
        </button>

        {submitSuccess ? (
          <div className="thank-you-view" style={{ textAlign: 'center', padding: '40px 0 20px 0' }}>
            <div className="success-icon-wrapper" style={{ margin: '0 auto 24px auto', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25d366' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m22 4-10 10.01-3-3" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '500', marginBottom: '12px', color: 'var(--text-primary)' }}>Thank You!</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1rem', lineHeight: '1.6' }}>
              Your inquiry has been successfully recorded. We are redirecting you to WhatsApp to complete your message.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={() => setSubmitSuccess(false)}
                className="btn btn-outline"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '12px',
                  padding: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Send Another Message
              </button>
              <a 
                href="#/"
                className="btn btn-primary"
                style={{
                  background: 'var(--accent-gradient)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'block',
                  textAlign: 'center',
                  width: '100%'
                }}
              >
                Return to Home
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="form-header" style={{ textAlign: 'center', paddingTop: '30px' }}>
              <div className="logo-wrapper">
                <img src={logoImg} alt="Logo" className="business-logo" />
              </div>
              <h2>Get in Touch</h2>
              <p>Provide your details below to send us a direct message on WhatsApp.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error-border' : ''}`}
                    placeholder="John Doe"
                    required
                  />
                </div>
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'error-border' : ''}`}
                    placeholder="+1 234 567 890"
                    required
                  />
                </div>
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error-border' : ''}`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              {/* Business Name */}
              <div className="form-group">
                <label htmlFor="business">Business Name</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <input
                    type="text"
                    id="business"
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your Company Name"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message">How can we help you? *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-input ${errors.message ? 'error-border' : ''}`}
                  placeholder="Describe your project or inquiry..."
                  required
                />
                {errors.message && <span className="error-msg">{errors.message}</span>}
              </div>

              {/* Action Buttons */}
              <div className="button-group">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <WhatsAppIcon size={20} />
                      <span>Submit</span>
                    </>
                  )}
                </button>
                <a
                  href={`tel:${CALL_PHONE_NUMBER}`}
                  className="call-btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call Us</span>
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default App
