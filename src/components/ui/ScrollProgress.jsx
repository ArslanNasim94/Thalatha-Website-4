import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const tween = gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      transformOrigin: 'left center',
      scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: true },
    })

    return () => tween.kill()
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="progress-bar" />
    </div>
  )
}
