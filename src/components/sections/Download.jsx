import { useEffect } from 'react'
import { gsap } from 'gsap'
import MagneticButton from '../ui/MagneticButton'
import { assets, links } from '../../utils/links'

export default function Download() {
  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: '.download-section', start: 'top 75%' },
    })

    timeline
      .from('.download-logo', { scale: 0.72, opacity: 0, duration: 0.6, ease: 'back.out(2)' })
      .from('.download-section p', { y: 20, opacity: 0, duration: 0.55 }, '-=0.25')
      .from('.download-section .btn', { scale: 0.82, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'back.out(2)' }, '-=0.2')

    const section = document.querySelector('.download-section')
    const onMove = (event) => {
      for (let index = 0; index < 3; index += 1) {
        const particle = document.createElement('div')
        particle.className = 'download-particle'
        particle.style.left = `${event.clientX}px`
        particle.style.top = `${event.clientY}px`
        document.body.appendChild(particle)
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          opacity: 0,
          scale: 0,
          duration: 1,
          ease: 'power2.out',
          onComplete: () => particle.remove(),
        })
      }
    }

    section?.addEventListener('mousemove', onMove)

    return () => {
      timeline.kill()
      section?.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <section id="download" className="section download-section">
      <div className="dot-grid" />
      <div className="download-orb download-orb-1" />
      <div className="download-orb download-orb-2" />

      <div className="download-content">
        <img className="download-logo-image download-logo" src={assets.logo} alt="Thalatha logo" loading="lazy" />
        <h2 className="reveal-text">Ready to Transform Your Home Services?</h2>
        <p>Join 50,000+ satisfied users. Download free today.</p>
        <div className="download-actions">
          <MagneticButton href={links.appStore} variant="white" ariaLabel="Download Thalatha on App Store">
            Download on App Store
          </MagneticButton>
          <MagneticButton href={links.googlePlay} variant="white-outline" ariaLabel="Get Thalatha on Google Play">
            Get it on Google Play
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
