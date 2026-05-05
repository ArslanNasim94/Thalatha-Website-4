import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useMagnet() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const onMove = (event) => {
      const rect = element.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2

      gsap.to(element, { x: x * 0.32, y: y * 0.32, duration: 0.35, ease: 'power2.out' })
    }

    const onLeave = () => {
      gsap.to(element, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.4)' })
    }

    element.addEventListener('mousemove', onMove)
    element.addEventListener('mouseleave', onLeave)

    return () => {
      element.removeEventListener('mousemove', onMove)
      element.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return ref
}
