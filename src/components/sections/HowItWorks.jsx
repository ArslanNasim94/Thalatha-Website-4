import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Record Your Need',
    body: 'Show the problem in seconds with a short video request. Providers understand the scope before they bid.',
    visual: 'record',
  },
  {
    number: '02',
    title: 'Receive Quotes',
    body: 'Nearby verified professionals send competitive quotes, timelines, and service details straight to your phone.',
    visual: 'quotes',
  },
  {
    number: '03',
    title: 'Connect & Complete',
    body: 'Pick the best quote and move the conversation into WhatsApp for fast coordination and completion.',
    visual: 'chat',
  },
]

function StepVisual({ type }) {
  if (type === 'record') {
    return (
      <div className="mock-phone record-phone">
        <div className="record-dot" />
        <div className="video-frame">
          {Array.from({ length: 12 }).map((_, index) => (
            <span key={index} style={{ '--i': index }} />
          ))}
        </div>
        <p>Video request recording</p>
      </div>
    )
  }

  if (type === 'quotes') {
    return (
      <div className="quote-stack">
        {['$45', '$58', '$62'].map((price, index) => (
          <div key={price} className="quote-card" style={{ '--i': index }}>
            <strong>{price}</strong>
            <span>Verified provider</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="chat-mock">
      <div>Hi, I can arrive at 4 PM.</div>
      <div>Great, please confirm.</div>
      <div className="success-bubble">WhatsApp connected ✓</div>
    </div>
  )
}

export default function HowItWorks() {
  useEffect(() => {
    const matchMedia = gsap.matchMedia()
    matchMedia.add('(min-width: 1025px)', () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.how-it-works',
          start: 'top top',
          end: '+=1600',
          scrub: 1,
          pin: true,
        },
      })

      timeline
        .to('.step-card:nth-child(1)', { opacity: 0.28, scale: 0.96 })
        .from('.step-card:nth-child(2)', { opacity: 0.28, scale: 0.96 }, '<')
        .to('.step-card:nth-child(2)', { opacity: 0.28, scale: 0.96 })
        .from('.step-card:nth-child(3)', { opacity: 0.28, scale: 0.96 }, '<')

      return () => timeline.kill()
    })

    return () => matchMedia.revert()
  }, [])

  return (
    <section id="how-it-works" className="section how-it-works">
      <div className="section-heading">
        <p>The story</p>
        <h2 className="reveal-text">Record. Compare. Get it done.</h2>
      </div>

      <div className="how-grid">
        <div className="how-sticky">
          <svg viewBox="0 0 80 380" className="connecting-line" aria-hidden="true">
            <path d="M40 20 V360" />
          </svg>
          <div className="story-orb">
            <span>3</span>
            <p>simple steps</p>
          </div>
        </div>

        <div className="steps-list">
          {steps.map((step) => (
            <article key={step.title} className="step-card">
              <div className="step-copy">
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
              <StepVisual type={step.visual} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
