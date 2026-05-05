import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function initTextReveal(selector = '.reveal-text') {
  if (prefersReducedMotion()) return []

  return Array.from(document.querySelectorAll(selector)).map((element) => {
    const split = new SplitType(element, { types: 'lines,words' })

    gsap.from(split.words, {
      y: '110%',
      opacity: 0,
      rotateX: -20,
      immediateRender: false,
      stagger: 0.04,
      duration: 0.9,
      ease: 'power4.out',
      scrollTrigger: { trigger: element, start: 'top 85%' },
    })

    return split
  })
}

export function initSectionReveals() {
  if (prefersReducedMotion()) return []

  return gsap.utils.toArray('.section').map((section) =>
    gsap.from(section, {
      y: 56,
      opacity: 0,
      immediateRender: false,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 82%',
        end: 'top 52%',
        toggleActions: 'play none none none',
      },
    }),
  )
}

export function initMagneticButtons() {
  const cleanups = []

  document.querySelectorAll('.magnetic').forEach((button) => {
    const onMove = (event) => {
      const rect = button.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2

      gsap.to(button, { x: x * 0.28, y: y * 0.28, duration: 0.35, ease: 'power2.out' })
    }

    const onLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
    }

    button.addEventListener('mousemove', onMove)
    button.addEventListener('mouseleave', onLeave)
    cleanups.push(() => {
      button.removeEventListener('mousemove', onMove)
      button.removeEventListener('mouseleave', onLeave)
    })
  })

  return () => cleanups.forEach((cleanup) => cleanup())
}
