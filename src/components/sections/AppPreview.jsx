import { useEffect } from 'react'
import { gsap } from 'gsap'
import PhoneModel from '../three/PhoneModel'
import { assets, fallbackScreenshots } from '../../utils/links'

export default function AppPreview() {
  const screenshots = assets.screenshots?.length ? assets.screenshots : fallbackScreenshots

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: '.app-preview', start: 'top 75%' },
    })

    timeline
      .from('.phone-frame:nth-child(1)', { x: -180, opacity: 0, duration: 0.9, ease: 'power3.out' })
      .from('.phone-frame:nth-child(2)', { y: 120, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.65')
      .from('.phone-frame:nth-child(3)', { x: 180, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.65')
      .from('.floating-badge', { y: 20, opacity: 0, stagger: 0.12, duration: 0.6 }, '-=0.3')

    const badges = gsap.to('.floating-badge', {
      y: -12,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.25,
    })

    return () => {
      timeline.kill()
      badges.kill()
    }
  }, [])

  return (
    <section className="section app-preview">
      <div className="section-heading">
        <p>App preview</p>
        <h2 className="reveal-text">The request, quote, and WhatsApp flow in one elegant app.</h2>
      </div>

      <div className="preview-stage">
        <div className="phones-wrapper">
          {screenshots.slice(0, 3).map((screenshot, index) => (
            <PhoneModel key={screenshot} screenshot={screenshot} label={`Thalatha app screenshot ${index + 1}`} />
          ))}
        </div>
        <div className="floating-badge badge-quote">⚡ Quote received!</div>
        <div className="floating-badge badge-stars">★★★★★ 4.9</div>
        <div className="floating-badge badge-whatsapp">WhatsApp connected ✓</div>
      </div>
    </section>
  )
}
