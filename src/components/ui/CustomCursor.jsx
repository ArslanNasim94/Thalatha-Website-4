import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouch(touchDevice)
    if (touchDevice) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current

    const moveCursor = (event) => {
      gsap.to(dot, { x: event.clientX, y: event.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(ring, { x: event.clientX, y: event.clientY, duration: 0.24, ease: 'power2.out' })
    }

    const enterInteractive = (event) => {
      const type = event.currentTarget.dataset.cursor || 'Click'
      label.textContent = type === 'button' ? 'Click' : type
      gsap.to(ring, {
        scale: type === 'text' ? 0.7 : 1.85,
        width: type === 'text' ? 8 : type === 'button' ? 64 : 48,
        borderRadius: type === 'button' ? 999 : 999,
        opacity: 0.7,
        duration: 0.25,
      })
      gsap.to(label, { opacity: type === 'text' ? 0 : 1, duration: 0.2 })
    }

    const leaveInteractive = () => {
      gsap.to(ring, { scale: 1, width: 40, opacity: 0.55, duration: 0.25 })
      gsap.to(label, { opacity: 0, duration: 0.2 })
    }

    const selector = 'a, button, [data-cursor], .magnetic'
    const interactiveElements = Array.from(document.querySelectorAll(selector))

    window.addEventListener('mousemove', moveCursor)
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', enterInteractive)
      element.addEventListener('mouseleave', leaveInteractive)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', enterInteractive)
        element.removeEventListener('mouseleave', leaveInteractive)
      })
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} />
      </div>
    </>
  )
}
