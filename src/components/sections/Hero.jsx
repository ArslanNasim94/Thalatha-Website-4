import { useEffect } from 'react'
import { gsap } from 'gsap'
import SplitType from 'split-type'
import HomeScene from '../three/HomeScene'
import MagneticButton from '../ui/MagneticButton'
import ParticleField from '../ui/ParticleField'
import { links } from '../../utils/links'

export default function Hero() {
  useEffect(() => {
    const split = new SplitType('.hero-title', { types: 'words' })
    const timeline = gsap.timeline({ delay: 0.25 })

    timeline
      .from('.hero-badge', { y: 30, opacity: 0, duration: 0.6 })
      .from(split.words, { y: '100%', opacity: 0, stagger: 0.07, duration: 0.85, ease: 'power4.out' }, '-=0.15')
      .from('.hero-body', { y: 20, opacity: 0, duration: 0.7 }, '-=0.35')
      .from('.hero-cta .btn', { scale: 0.85, opacity: 0, stagger: 0.1, duration: 0.55, ease: 'back.out(2)' }, '-=0.25')
      .from('.hero-proof-card', { y: 30, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out' }, '-=0.25')

    const hero = document.querySelector('.hero')
    const onMouseMove = (event) => {
      if ('ontouchstart' in window) return
      const particle = document.createElement('div')
      particle.className = 'cursor-particle'
      particle.style.left = `${event.clientX}px`
      particle.style.top = `${event.clientY}px`
      document.body.appendChild(particle)
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => particle.remove(),
      })
    }

    hero?.addEventListener('mousemove', onMouseMove)

    return () => {
      split.revert()
      timeline.kill()
      hero?.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <ParticleField />

      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-badge">Trusted by 50,000+ Users</div>
          <h1 className="hero-title" data-cursor="text">
            Premium Home Services <span>Made Simple</span>
          </h1>
          <p className="hero-body">
            Record a short video of what you need. Local verified professionals bid. You pick the best quote and
            connect instantly via WhatsApp.
          </p>
          <div className="hero-cta">
            <MagneticButton href={links.appStore} variant="dark" ariaLabel="Download on App Store">
              Download on App Store
            </MagneticButton>
            <MagneticButton href={links.googlePlay} variant="outline" ariaLabel="Get it on Google Play">
              Get it on Google Play
            </MagneticButton>
          </div>
          <div className="hero-proof">
            <article className="hero-proof-card">
              <strong>4.9★</strong>
              <span>Average rating</span>
            </article>
            <article className="hero-proof-card">
              <strong>100K+</strong>
              <span>Services completed</span>
            </article>
          </div>
        </div>

        <div className="hero-canvas">
          <HomeScene />
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
