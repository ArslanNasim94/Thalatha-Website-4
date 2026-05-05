import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../ui/MagneticButton'
import { assets, links } from '../../utils/links'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  ['Features', '#features'],
  ['How It Works', '#how-it-works'],
  ['Services', '#services'],
  ['Reviews', '#testimonials'],
  ['Download', '#download'],
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const intro = gsap.from('.navbar', { y: -80, opacity: 0, duration: 0.8, ease: 'power3.out' })
    const trigger = ScrollTrigger.create({
      start: 80,
      onEnter: () => document.querySelector('.navbar')?.classList.add('navbar-scrolled'),
      onLeaveBack: () => document.querySelector('.navbar')?.classList.remove('navbar-scrolled'),
    })

    return () => {
      intro.kill()
      trigger.kill()
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    gsap.from('.mobile-nav-link', { y: 32, opacity: 0, stagger: 0.08, duration: 0.45, ease: 'power3.out' })
  }, [menuOpen])

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <a className="brand" href="#hero" aria-label="Thalatha home">
        <img className="brand-logo" src={assets.logo} alt="Thalatha logo" loading="lazy" />
      </a>

      <div className="nav-links">
        {navLinks.map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </div>

      <div className="nav-actions">
        <MagneticButton href={links.appStore} variant="primary" ariaLabel="Download Thalatha app">
          Download App
        </MagneticButton>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Open mobile menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(([label, href]) => (
            <a key={label} className="mobile-nav-link" href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
