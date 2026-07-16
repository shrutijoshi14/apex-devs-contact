import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { 
  Globe, Code, Cpu, Database, Cloud, Shield, Settings, Users, Briefcase, Award, Clock,
  ArrowRight, Phone, MessageSquare, ArrowUp, Mail, Download, FileText, ChevronDown, 
  MapPin, CheckCircle, ExternalLink, Menu, X, Play, Zap, RefreshCw, BarChart2, Sun, Moon
} from 'lucide-react'
import logoImg from './assets/logo-removebg-preview.png'
import './CompanyProfile.css'

// Configuration constants matching the business settings
const WHATSAPP_PHONE_NUMBER = '919869840827'
const CALL_PHONE_NUMBER = '+919869840827'
const BUSINESS_EMAIL = 'shrutijoshi1481995@gmail.com'
const BUSINESS_NAME = 'Apex Dev'

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

// Custom count animation component for Section 2 counters
function Counter({ value, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = parseInt(value)
      if (start === end) return

      let totalDuration = 2000
      let incrementTime = Math.abs(Math.floor(totalDuration / end))
      
      let timer = setInterval(() => {
        start += 1
        setCount(start)
        if (start === end) clearInterval(timer)
      }, Math.max(incrementTime, 20))

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="profile-counter-value">
      {count}{suffix}
    </span>
  )
}

export default function CompanyProfile() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeTimeline, setActiveTimeline] = useState(3) // Default active step
  const [activePortfolioCategory, setActivePortfolioCategory] = useState('All')

  const [theme, setTheme] = useState(localStorage.getItem('apexTheme') || 'dark-theme')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.body.className = theme
    localStorage.setItem('apexTheme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark-theme' ? 'light-theme' : 'dark-theme')
  }
  
  const scrollToSection = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      
      // Programmatically collapse the Bootstrap navbar on mobile
      const navbarCollapse = document.getElementById('profileNavbar')
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const toggler = document.querySelector('.navbar-toggler')
        if (toggler) {
          toggler.click()
        }
      }
    }
  }

  // Track scroll position for floating back-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-sliding Testimonials Index
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const testimonials = [
    {
      name: 'Aditya Ranade',
      role: 'CEO, TechNexus',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5,
      review: 'Apex Dev built our entire inventory management software. The layout is extremely clean and responsive. Their timeline adherence was stellar!'
    },
    {
      name: 'Pooja Sharma',
      role: 'Founder, EduGrow',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5,
      review: 'The workflow automation and WhatsApp integration they set up saved us at least 15 hours of manual administration work every single week.'
    },
    {
      name: 'Rajesh Patel',
      role: 'Director, Prime Insurance',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5,
      review: 'Their custom CRM solution is top-notch. Secure, fast, and extremely customizable. The support team is always available to assist us.'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  // Development process steps
  const processSteps = [
    { name: 'Discovery', icon: <Globe size={18} /> },
    { name: 'Planning', icon: <FileText size={18} /> },
    { name: 'UI Design', icon: <Briefcase size={18} /> },
    { name: 'Development', icon: <Code size={18} /> },
    { name: 'Testing', icon: <Cpu size={18} /> },
    { name: 'Deployment', icon: <Cloud size={18} /> },
    { name: 'Support', icon: <Settings size={18} /> }
  ]

  // Services list mapping
  const services = [
    {
      title: 'Website Development',
      icon: <Globe size={24} />,
      items: ['Corporate Websites', 'Portfolio Websites', 'Restaurant Websites', 'School & Hospital Sites', 'Real Estate Listings', 'Sleek Landing Pages']
    },
    {
      title: 'Ecommerce Solutions',
      icon: <Zap size={24} />,
      items: ['Custom Shop Builders', 'Payment Gateway Sync', 'Cart & Billing Panels', 'Inventory Synchronization']
    },
    {
      title: 'CRM Development',
      icon: <Users size={24} />,
      items: ['Custom Lead Panels', 'Pipeline Management', 'Customer Tracking', 'Insurance CRM Panels']
    },
    {
      title: 'ERP & Admin Software',
      icon: <Database size={24} />,
      items: ['Institute Administration', 'HRMS Portals', 'Billing & Invoicing Suite', 'Inventory Tracking Panels']
    },
    {
      title: 'AI & Automations',
      icon: <Cpu size={24} />,
      items: ['WhatsApp Automated API', 'Email Funnel Automations', 'SaaS Smart Chatbots', 'Workflow Automation Scripts']
    },
    {
      title: 'Cloud & Optimizations',
      icon: <Cloud size={24} />,
      items: ['Cloud VPS Deployments', 'Secure Hosting Panels', 'SEO Optimization Audit', 'SLA Technical Maintenance']
    }
  ]

  // Industries list mapping
  const industries = [
    { name: 'Restaurant', icon: <Zap size={24} /> },
    { name: 'Education', icon: <Award size={24} /> },
    { name: 'Healthcare', icon: <Cpu size={24} /> },
    { name: 'Insurance', icon: <Shield size={24} /> },
    { name: 'Construction', icon: <Settings size={24} /> },
    { name: 'Travel', icon: <Globe size={24} /> },
    { name: 'Finance', icon: <BarChart2 size={24} /> },
    { name: 'Retail', icon: <Briefcase size={24} /> },
    { name: 'Manufacturing', icon: <Settings size={24} /> },
    { name: 'NGO', icon: <Users size={24} /> },
    { name: 'Real Estate', icon: <MapPin size={24} /> },
    { name: 'Logistics', icon: <RefreshCw size={24} /> }
  ]

  // Technology Stack definition
  const techStack = [
    'React', 'Next.js', 'Node.js', 'Express', 'MySQL', 'MongoDB', 
    'Redis', 'Docker', 'Vercel', 'Firebase', 'Bootstrap', 'Tailwind', 
    'Git', 'GitHub', 'REST API', 'AI Integrations'
  ]

  // Portfolio items
  const portfolioItems = [
    {
      title: 'Apex E-learning Admin Portal',
      category: 'ERP',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&h=300&q=80',
      tech: ['React', 'Node.js', 'MySQL'],
      desc: 'Complete student administration, course registration, attendance tracking, and fee invoice generation panel.'
    },
    {
      title: 'Prime Insurance CRM',
      category: 'CRM',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&h=300&q=80',
      tech: ['Next.js', 'Express', 'MongoDB'],
      desc: 'Integrated lead scoring pipeline, client policies registry, renewal notification scripts, and claims status panel.'
    },
    {
      title: 'Bite & Sip Ordering Hub',
      category: 'Website',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&h=300&q=80',
      tech: ['React', 'Tailwind', 'Node.js'],
      desc: 'Ultra-modern responsive corporate website for a restaurant chain with live table reservation and interactive menus.'
    },
    {
      title: 'StoreFront Ecommerce Platform',
      category: 'Ecommerce',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=500&h=300&q=80',
      tech: ['React', 'Next.js', 'Firebase'],
      desc: 'Sleek dark-themed online store with real-time stock sync, user shopping cart, Stripe payment gateway, and admin panel.'
    }
  ]

  const filteredPortfolio = activePortfolioCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activePortfolioCategory)

  // FAQ Items
  const faqItems = [
    {
      q: 'What technologies does Apex Dev specialize in?',
      a: 'We specialize in React, Next.js, Node.js, Express, MySQL, MongoDB, and Cloud architecture (Google Cloud/Firebase). We build modern, highly secure, and extremely fast web applications.'
    },
    {
      q: 'Do you offer post-deployment maintenance?',
      a: 'Yes, we offer ongoing SLA maintenance packages. This includes security patches, database backups, performance audits, and content updates.'
    },
    {
      q: 'How does the WhatsApp automation work?',
      a: 'We integrate official API solutions that allow your systems to automatically send booking alerts, order notifications, invoices, and promotional follow-up templates directly to clients.'
    },
    {
      q: 'What is the typical timeline for a custom CRM project?',
      a: 'Depending on complexity, a custom CRM or ERP system typically takes 4 to 8 weeks from discovery to final staging and testing.'
    }
  ]

  return (
    <div className="profile-page">
      {/* Background neon grid lines and radial glowing circles */}
      <div className="profile-grid-bg"></div>
      <div className="profile-glow-orb-1"></div>
      <div className="profile-glow-orb-2"></div>

      {/* Navigation header */}
      <nav className="navbar navbar-expand-lg navbar-dark profile-navbar py-3">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2" href="#">
            <img src={logoImg} alt="Apex Dev Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontWeight: '700', letterSpacing: '-0.02em', background: 'var(--profile-gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{BUSINESS_NAME}</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#profileNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="profileNavbar">
            <ul className="navbar-nav gap-2 mt-3 mt-lg-0 align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')}>Portfolio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#process" onClick={(e) => scrollToSection(e, 'process')}>Process</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link profile-hero-btn-primary py-2 px-3 ms-lg-3" href="#book" onClick={(e) => scrollToSection(e, 'book')}>Book Meeting</a>
              </li>
              <li className="nav-item ms-lg-2">
                <button 
                  onClick={toggleTheme} 
                  className="btn border-0 p-2 d-flex align-items-center justify-content-center"
                  aria-label="Toggle Theme"
                  style={{ background: 'transparent', color: 'var(--profile-text-secondary)' }}
                >
                  {theme === 'dark-theme' ? <Sun size={20} style={{ color: 'var(--profile-neon-blue)' }} /> : <Moon size={20} style={{ color: 'var(--profile-neon-purple)' }} />}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* SECTION 1: Hero */}
      <section className="profile-hero" id="home">
        <div className="container">
          <div className="row align-items-center g-5">
            <motion.div 
              className="col-lg-6 text-start"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >

              <h1 className="profile-hero-title">
                Building Modern<br />
                <span>Digital Solutions</span>
              </h1>
              
              <div className="profile-hero-badges">
                <span className="profile-hero-badge">Custom Websites</span>
                <span className="profile-hero-badge">Web Applications</span>
                <span className="profile-hero-badge">CRM Systems</span>
                <span className="profile-hero-badge">ERP Software</span>
                <span className="profile-hero-badge">AI Automation</span>
                <span className="profile-hero-badge">WhatsApp API</span>
                <span className="profile-hero-badge">Cloud Deploy</span>
              </div>

              <div className="d-flex flex-wrap gap-3">
                <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="btn profile-hero-btn-primary d-inline-flex align-items-center gap-2">
                  <span>View Services</span>
                  <ArrowRight size={18} />
                </a>
                <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="btn profile-hero-btn-outline">View Portfolio</a>
                <a href="#book" onClick={(e) => scrollToSection(e, 'book')} className="btn profile-hero-btn-outline" style={{ borderColor: 'rgba(0,242,254,0.3)' }}>Book Consultation</a>
              </div>
            </motion.div>

            <motion.div 
              className="col-lg-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="profile-illustration-box">
                <div className="profile-tech-hex-bg"></div>
                <div className="profile-illustration-core">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--profile-text-muted)', marginLeft: 'auto' }}>main.js</span>
                  </div>
                  <code style={{ fontSize: '0.85rem', color: '#38bdf8', display: 'block', lineHeight: '1.6' }}>
                    <span style={{ color: '#c084fc' }}>const</span> business = &#123;<br />
                    &nbsp;&nbsp;name: <span style={{ color: '#a855f7' }}>"{BUSINESS_NAME}"</span>,<br />
                    &nbsp;&nbsp;focus: <span style={{ color: '#a855f7' }}>"High Performance"</span>,<br />
                    &nbsp;&nbsp;stack: [<span style={{ color: '#a855f7' }}>"React", "Node", "MySQL"</span>],<br />
                    &nbsp;&nbsp;deploy: <span style={{ color: '#a855f7' }}>"Cloud Server"</span><br />
                    &#125;;<br /><br />
                    <span style={{ color: '#c084fc' }}>function</span> buildSuccess() &#123;<br />
                    &nbsp;&nbsp;console.log(<span style={{ color: '#a855f7' }}>"System optimized! 🚀"</span>);<br />
                    &#125;
                  </code>
                </div>
                <div className="profile-floating-circle" style={{ top: '15%', right: '15%' }}></div>
                <div className="profile-floating-circle" style={{ bottom: '20%', left: '15%', animationDelay: '2s' }}></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Who We Are & Counters */}
      <section className="py-5 position-relative z-index-1" id="who-we-are">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="profile-glass-card">
                <div className="row g-4 align-items-center">
                  <div className="col-md-7 text-start">
                    <h2 className="profile-section-title text-start mb-3" style={{ fontSize: '2rem' }}>Who We Are</h2>
                    <p className="lead" style={{ fontSize: '1.05rem', color: 'var(--profile-text-secondary)', lineHeight: '1.6' }}>
                      At {BUSINESS_NAME}, we are a dedicated group of elite engineering and product design experts. We bridge the gap between creative visual conceptualization and high-performance server-side web development.
                    </p>
                    <div className="row mt-4 g-3">
                      <div className="col-6">
                        <h5 className="text-white font-weight-bold">Our Mission</h5>
                        <p style={{ fontSize: '0.85rem', color: 'var(--profile-text-secondary)' }}>Deliver state-of-the-art scalable systems that drive operations and customer conversions.</p>
                      </div>
                      <div className="col-6">
                        <h5 className="text-white font-weight-bold">Our Vision</h5>
                        <p style={{ fontSize: '0.85rem', color: 'var(--profile-text-secondary)' }}>Shape the future of enterprise operations through automated workflows and smart CRM structures.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="row g-3">
                      <div className="col-6 text-center">
                        <div className="p-3" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--profile-border)' }}>
                          <Counter value="50" suffix="+" />
                          <div className="profile-counter-label">Projects Completed</div>
                        </div>
                      </div>
                      <div className="col-6 text-center">
                        <div className="p-3" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--profile-border)' }}>
                          <Counter value="35" suffix="+" />
                          <div className="profile-counter-label">Happy Clients</div>
                        </div>
                      </div>
                      <div className="col-6 text-center">
                        <div className="p-3" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--profile-border)' }}>
                          <Counter value="5" suffix="+" />
                          <div className="profile-counter-label">Years Experience</div>
                        </div>
                      </div>
                      <div className="col-6 text-center">
                        <div className="p-3" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--profile-border)' }}>
                          <Counter value="24" suffix="/7" />
                          <div className="profile-counter-label">Technical Support</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Our Services */}
      <section className="py-5 position-relative z-index-1" id="services">
        <div className="container">
          <h2 className="profile-section-title">Our Specialized Services</h2>
          <p className="profile-section-subtitle">We design and architect complete operational panels that solve specific administrative challenges for modern firms.</p>

          <div className="row g-4">
            {services.map((service, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="profile-glass-card text-start">
                  <div className="profile-service-icon">
                    {service.icon}
                  </div>
                  <h4 style={{ fontWeight: '600', marginBottom: '16px' }}>{service.title}</h4>
                  <div className="d-flex flex-column gap-2">
                    {service.items.map((item, idy) => (
                      <span className="profile-service-item" key={idy}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Industries We Serve */}
      <section className="py-5 position-relative z-index-1" id="industries">
        <div className="container">
          <h2 className="profile-section-title">Industries We Serve</h2>
          <p className="profile-section-subtitle">We specialize in delivering customized portals built for the unique transactional compliance rules of major industries.</p>

          <div className="profile-industry-grid">
            {industries.map((ind, idx) => (
              <div className="profile-industry-card" key={idx}>
                {ind.icon}
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{ind.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Development Process */}
      <section className="py-5 position-relative z-index-1" id="process">
        <div className="container">
          <h2 className="profile-section-title">Our Development Process</h2>
          <p className="profile-section-subtitle">A systematic, multi-phase roadmap designed to translate conceptual business briefs into tested production applications.</p>

          <div className="profile-timeline">
            <div className="profile-timeline-track">
              <div className="profile-timeline-progress" style={{ width: `${(activeTimeline / (processSteps.length - 1)) * 100}%` }}></div>
            </div>
            {processSteps.map((step, idx) => (
              <div 
                className={`profile-timeline-node ${idx <= activeTimeline ? 'active' : ''}`} 
                key={idx}
                onClick={() => setActiveTimeline(idx)}
                style={{ cursor: 'pointer' }}
              >
                <div className="profile-timeline-dot">
                  {step.icon}
                </div>
                <div className="profile-timeline-title">{step.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Technology Stack */}
      <section className="py-5 position-relative z-index-1" id="tech-stack">
        <div className="container">
          <h2 className="profile-section-title">Our Tech Stack</h2>
          <p className="profile-section-subtitle">We leverage only robust, enterprise-grade frameworks to ensure your panels are fast, modern, and easily maintainable.</p>

          <div className="profile-tech-grid">
            {techStack.map((tech, idx) => (
              <div className="profile-tech-badge" key={idx}>
                <CheckCircle size={14} style={{ color: 'var(--profile-neon-blue)' }} />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Portfolio Showcase */}
      <section className="py-5 position-relative z-index-1" id="portfolio">
        <div className="container">
          <h2 className="profile-section-title">Portfolio Showcase</h2>
          <p className="profile-section-subtitle">Explore some of our recent custom CRM, ERP, and responsive corporate web portal deployments.</p>

          {/* Category Filter */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            {['All', 'Website', 'CRM', 'ERP', 'Ecommerce'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActivePortfolioCategory(cat)}
                className={`btn py-2 px-4 rounded-pill ${activePortfolioCategory === cat ? 'profile-hero-btn-primary' : 'profile-hero-btn-outline'}`}
                style={{ fontSize: '0.85rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="row g-4">
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((item, idx) => (
                <motion.div 
                  className="col-md-6 col-lg-6 text-start"
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="profile-portfolio-card">
                    <img src={item.image} alt={item.title} className="profile-portfolio-img" loading="lazy" />
                    <div className="profile-portfolio-content">
                      <span className="profile-portfolio-category">{item.category}</span>
                      <h4 className="font-weight-bold mt-1" style={{ fontSize: '1.25rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--profile-text-secondary)', marginTop: '8px' }}>{item.desc}</p>
                      
                      <div className="profile-portfolio-tech">
                        {item.tech.map((t, i) => (
                          <span className="profile-portfolio-tech-badge" key={i}>{t}</span>
                        ))}
                      </div>
                      
                      <a href="#book" className="btn profile-hero-btn-outline py-2 px-3" style={{ fontSize: '0.85rem' }}>View Project Details</a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 8: Why Choose Apex Dev */}
      <section className="py-5 position-relative z-index-1" id="why-us">
        <div className="container">
          <h2 className="profile-section-title">Why Choose Apex Dev</h2>
          <p className="profile-section-subtitle">We design specifically to eliminate operational errors and automate customer acquisition workflows.</p>

          <div className="row g-4">
            {[
              { title: 'Fast & Reliable Delivery', desc: 'System development roadmap broken into milestones with real-time staging previews.' },
              { title: 'Responsive Design Guarantee', desc: 'Tested across 25+ viewports to ensure seamless visual formatting on all devices.' },
              { title: 'Modern Clean Architecture', desc: 'Optimized schemas, documented APIs, and maintainable MVC folders for future updates.' },
              { title: 'Advanced Workflow Automation', desc: 'Direct WhatsApp templates, email funnels, and webhook scripting to optimize labor time.' }
            ].map((card, idx) => (
              <div className="col-md-6" key={idx}>
                <div className="profile-glass-card text-start">
                  <div className="profile-why-num">0{idx + 1}</div>
                  <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>{card.title}</h4>
                  <p style={{ color: 'var(--profile-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Testimonials */}
      <section className="py-5 position-relative z-index-1" id="testimonials">
        <div className="container">
          <h2 className="profile-section-title">Client Testimonials</h2>
          <p className="profile-section-subtitle">See how we have helped other corporate teams optimize their customer management systems.</p>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="profile-glass-card profile-testimonial-card position-relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonialIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={testimonials[testimonialIndex].photo} 
                      alt={testimonials[testimonialIndex].name} 
                      className="profile-testimonial-avatar" 
                    />
                    <div style={{ color: '#ffb703', marginBottom: '16px', fontSize: '1.2rem' }}>
                      {'★'.repeat(testimonials[testimonialIndex].rating)}
                    </div>
                    <p className="lead italic" style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.6', color: 'var(--profile-text-secondary)' }}>
                      "{testimonials[testimonialIndex].review}"
                    </p>
                    <h5 className="font-weight-bold mt-4" style={{ marginBottom: '2px' }}>{testimonials[testimonialIndex].name}</h5>
                    <span style={{ fontSize: '0.85rem', color: 'var(--profile-text-muted)' }}>{testimonials[testimonialIndex].role}</span>
                  </motion.div>
                </AnimatePresence>
                
                {/* Testimonial slider indicators */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                  {testimonials.map((_, i) => (
                    <div 
                      key={i} 
                      onClick={() => setTestimonialIndex(i)} 
                      style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: testimonialIndex === i ? 'var(--profile-neon-blue)' : 'rgba(255,255,255,0.1)',
                        cursor: 'pointer',
                        transition: 'background 0.3s'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: Frequently Asked Questions */}
      <section className="py-5 position-relative z-index-1" id="faq">
        <div className="container">
          <h2 className="profile-section-title">Frequently Asked Questions</h2>
          <p className="profile-section-subtitle">Answers to common inquiries regarding our custom platform development workflow.</p>

          <div className="row justify-content-center">
            <div className="col-lg-8 text-start">
              <div className="profile-accordion">
                {faqItems.map((item, idx) => (
                  <div className="profile-accordion-item" key={idx}>
                    <div 
                      className="profile-accordion-header" 
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    >
                      <h4>{item.q}</h4>
                      <motion.div
                        animate={{ rotate: activeFaq === idx ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={20} style={{ color: 'var(--profile-neon-blue)' }} />
                      </motion.div>
                    </div>
                    
                    <AnimatePresence initial={false}>
                      {activeFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="profile-accordion-content">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: Free Resources */}
      <section className="py-5 position-relative z-index-1" id="resources">
        <div className="container">
          <h2 className="profile-section-title">Free Business Resources</h2>
          <p className="profile-section-subtitle">Download templates, service lists, and pricing estimates for your reference.</p>

          <div className="row g-4 justify-content-center">
            {[
              { name: 'Company Profile PDF', type: 'PDF', icon: <FileText size={20} /> },
              { name: 'Our Technology Portfolio', type: 'ZIP', icon: <Briefcase size={20} /> },
              { name: 'Services & SLA Brochure', type: 'PDF', icon: <Download size={20} /> },
              { name: 'Pricing & Packages Guide', type: 'Web', icon: <ExternalLink size={20} /> }
            ].map((res, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <a href="#book" className="profile-resource-card text-start">
                  <div>
                    <h5 className="mb-1" style={{ fontSize: '0.95rem', fontWeight: '600' }}>{res.name}</h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--profile-text-muted)' }}>Format: {res.type}</span>
                  </div>
                  <div className="profile-resource-icon">
                    {res.icon}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: Book Meeting CTA */}
      <section className="py-5 position-relative z-index-1" id="book">
        <div className="container">
          <div className="profile-cta-section">
            <h2 className="font-weight-bold mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              Let's Build Something Amazing Together
            </h2>
            <p className="mx-auto mb-4" style={{ maxWidth: '580px', color: 'var(--profile-text-secondary)' }}>
              Discuss your custom database, automation, or responsive web requirements directly with our technical lead.
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-3">
              <a 
                href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent('Hello Apex Dev, I would like to schedule a free project consultation.')}`}
                className="btn profile-hero-btn-primary d-inline-flex align-items-center gap-2"
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon size={18} />
                <span>Schedule on WhatsApp</span>
              </a>
              <a 
                href={`tel:${CALL_PHONE_NUMBER}`}
                className="btn profile-hero-btn-outline d-inline-flex align-items-center gap-2"
              >
                <Phone size={18} />
                <span>Call Us Now</span>
              </a>
              <a 
                href={`mailto:${BUSINESS_EMAIL}`}
                className="btn profile-hero-btn-outline d-inline-flex align-items-center gap-2"
              >
                <Mail size={18} />
                <span>Email Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: Floating Action Buttons */}
      <div className="profile-floating-actions">
        <a 
          href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
          className="profile-float-btn profile-float-whatsapp"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Us"
        >
          <WhatsAppIcon size={24} />
        </a>
        <a 
          href={`tel:${CALL_PHONE_NUMBER}`}
          className="profile-float-btn profile-float-call"
          aria-label="Call Us"
        >
          <Phone size={22} fill="white" />
        </a>
        <AnimatePresence>
          {showScrollTop && (
            <motion.button 
              className="profile-float-btn profile-float-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={22} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* SECTION 14: Footer */}
      <footer className="profile-footer">
        <div className="container">
          <div className="row g-4 text-start">
            <div className="col-lg-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <img src={logoImg} alt="Apex Dev Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
                <h4 className="font-weight-bold m-0" style={{ fontSize: '1.25rem' }}>{BUSINESS_NAME}</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--profile-text-secondary)', lineHeight: '1.6' }}>
                Engineering futuristic, high-performance web systems and automation integrations for scaling corporate teams.
              </p>
              <div className="profile-social-icons">
                <a href="#" className="profile-social-icon" aria-label="Github"><Code size={18} /></a>
                <a href="#" className="profile-social-icon" aria-label="Mail"><Mail size={18} /></a>
                <a href="#" className="profile-social-icon" aria-label="Globe"><Globe size={18} /></a>
              </div>
            </div>
            
            <div className="col-6 col-lg-3 offset-lg-1">
              <h5 className="font-weight-bold mb-3" style={{ fontSize: '1rem' }}>Quick Links</h5>
              <ul className="profile-footer-links">
                <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a></li>
                <li><a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')}>Our Work</a></li>
                <li><a href="#process" onClick={(e) => scrollToSection(e, 'process')}>Roadmap</a></li>
                <li><a href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className="col-6 col-lg-4">
              <h5 className="font-weight-bold mb-3" style={{ fontSize: '1rem' }}>Operational Focus</h5>
              <ul className="profile-footer-links">
                <li><a href="#services">CRM Platform Engineering</a></li>
                <li><a href="#services">ERP Invoicing Structures</a></li>
                <li><a href="#services">API WhatsApp Funnel Automations</a></li>
                <li><a href="#services">Modern Next.js Architecture</a></li>
              </ul>
            </div>
          </div>
          
          <div className="row mt-5 pt-3 border-top" style={{ borderColor: 'var(--profile-border)', fontSize: '0.85rem', color: 'var(--profile-text-muted)' }}>
            <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
              © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
            </div>
            <div className="col-md-6 text-center text-md-end">
              <a href="#home" className="text-decoration-none me-3" style={{ color: 'var(--profile-text-muted)' }}>Terms of Service</a>
              <a href="#home" className="text-decoration-none" style={{ color: 'var(--profile-text-muted)' }}>Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Actions Bar */}
      <div className="profile-mobile-sticky-bar">
        <a 
          href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
          className="profile-mobile-sticky-btn profile-mobile-whatsapp"
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon size={18} />
          <span>WhatsApp Us</span>
        </a>
        <a 
          href={`tel:${CALL_PHONE_NUMBER}`}
          className="profile-mobile-sticky-btn profile-mobile-call"
        >
          <Phone size={18} fill="white" />
          <span>Call Us Now</span>
        </a>
      </div>
    </div>
  )
}
