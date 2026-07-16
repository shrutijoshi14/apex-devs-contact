import { useState } from 'react'
import './App.css'

// ==========================================
// CONFIGURATION: Customize your settings here
// ==========================================
const WHATSAPP_PHONE_NUMBER = '919869840827' // Your actual WhatsApp number
const BUSINESS_NAME = 'Apex Dev'

function App() {
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

    // Simulate database save or action latency
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

      // Reset success banner after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 800)
  }


  return (
    <div className="app-container">
      {/* Sleek Contact Form */}
      <div className="card">
        <div className="form-header" style={{ textAlign: 'center' }}>
          <div className="logo-container" style={{ marginBottom: '16px' }}>
            <h1 className="logo-text">{BUSINESS_NAME}</h1>
          </div>
          <h2>Get in Touch</h2>
          <p>Provide your details below to send us a direct message on WhatsApp.</p>
        </div>

        {submitSuccess && (
          <div className="status-banner success" style={{ marginBottom: '20px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            <span>Success! Redirecting you to WhatsApp...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
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
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
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
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <input
                type="text"
                id="business"
                name="business"
                value={formData.business}
                onChange={handleChange}
                className="form-input"
                placeholder="Your Company Ltd"
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
              placeholder="Tell us about your project or inquiry..."
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
                <span>Preparing Message...</span>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.464L0 24zm6.069-3.513c1.65.978 3.272 1.488 4.908 1.49 5.541.002 10.051-4.505 10.054-10.045.002-2.684-1.038-5.207-2.93-7.104C16.257 2.93 13.742 1.89 11.062 1.89 5.522 1.89 1.012 6.397 1.009 11.937c-.001 1.714.475 3.39 1.378 4.881l-1.005 3.673 3.744-.984zm12.38-7.904c-.272-.137-1.61-.795-1.86-.886-.25-.09-.432-.136-.613.136-.18.273-.7 1.85-.858 2.032-.158.18-.317.204-.589.068-.272-.136-1.15-.424-2.19-1.354-.808-.72-1.353-1.61-1.512-1.882-.158-.272-.017-.417.118-.553.123-.122.272-.318.408-.477.136-.16.182-.272.272-.455.09-.18.046-.339-.023-.477-.069-.136-.613-1.477-.84-2.023-.22-.53-.442-.457-.613-.466-.159-.008-.34-.01-.522-.01s-.477.068-.726.341c-.25.272-.954.932-.954 2.273s.977 2.636 1.114 2.818c.137.18 1.92 2.93 4.654 4.113.65.28 1.158.448 1.554.574.654.208 1.25.178 1.72.108.524-.078 1.61-.659 1.838-1.296.227-.636.227-1.182.159-1.295-.069-.115-.25-.18-.522-.317z"/>
                  </svg>
                  <span>WhatsApp</span>
                </>
              )}
            </button>
            <a 
              href={`tel:+${WHATSAPP_PHONE_NUMBER}`}
              className="call-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Call Us</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
