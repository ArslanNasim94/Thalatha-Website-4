# SKILL: Custom Cursor, Scroll Progress Bar & Preloader

---

## CustomCursor.jsx

Build a fully custom cursor replacing the browser default.

### States
| State | Appearance |
|---|---|
| Default | Filled circle 12px, `#4F46E5` |
| Hover on interactive element | Large ring 48px, slight blur + opacity |
| `data-cursor="text"` | Thin blinking line |
| `data-cursor="view"` | Large circle with "View" label |
| `data-cursor="drag"` | Circle with "Drag" label |
| Button hover | Pill morphs with "Click" text |

### Behavior
- Trailing secondary dot follows cursor with 0.08s delay
- Magnetic snap when within 80px of `.magnetic` elements — snaps toward center
- Completely hidden on touch devices: `if ('ontouchstart' in window) return null`
- Use `mousemove` + `requestAnimationFrame` + `gsap.to` with `duration: 0.15, ease: 'power2.out'`

```jsx
"use client" // Next.js only

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorDot = useRef(null)
  const cursorRing = useRef(null)

  useEffect(() => {
    if ('ontouchstart' in window) return

    const dot = cursorDot.current
    const ring = cursorRing.current

    const moveCursor = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.25, ease: 'power2.out' })
    }

    const onEnterLink = () => gsap.to(ring, { scale: 3, opacity: 0.4, duration: 0.3 })
    const onLeaveLink = () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 })

    window.addEventListener('mousemove', moveCursor)
    document.querySelectorAll('a, button, .magnetic').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      <div ref={cursorDot} style={{
        position: 'fixed', top: 0, left: 0, width: 12, height: 12,
        borderRadius: '50%', background: 'var(--color-primary)',
        pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%, -50%)'
      }} />
      <div ref={cursorRing} style={{
        position: 'fixed', top: 0, left: 0, width: 40, height: 40,
        borderRadius: '50%', border: '2px solid var(--color-primary)',
        pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%, -50%)',
        opacity: 0.6
      }} />
    </>
  )
}
```

---

## ScrollProgress.jsx

A 3px indigo line fixed at the very top that fills left-to-right as the user scrolls.

```jsx
"use client" // Next.js only
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    gsap.to(bar.current, {
      scaleX: 1,
      ease: 'none',
      transformOrigin: 'left center',
      scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: true }
    })
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 3, zIndex: 10000, background: 'transparent'
    }}>
      <div ref={bar} style={{
        height: '100%', background: 'var(--gradient-brand)',
        transformOrigin: 'left center', scaleX: 0
      }} />
    </div>
  )
}
```

---

## Preloader

Add this to `App.jsx` — shows before page content, then dismisses.

```jsx
// In App.jsx state
const [loaded, setLoaded] = useState(false)

useEffect(() => {
  const tl = gsap.timeline()
  tl.to('.preloader-bar', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' })
    .to('.preloader-logo', { scale: 1.2, opacity: 0, duration: 0.5 })
    .to('.preloader', { opacity: 0, duration: 0.4, onComplete: () => setLoaded(true) })
}, [])

// JSX
{!loaded && (
  <div className="preloader" style={{
    position: 'fixed', inset: 0, background: '#fff',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    zIndex: 99999
  }}>
    <img className="preloader-logo" src="/assets/logo.png" alt="Thalatha" style={{ width: 160, marginBottom: 32 }} />
    <div style={{ width: 200, height: 3, background: '#E2E8F0', borderRadius: 99 }}>
      <div className="preloader-bar" style={{
        height: '100%', background: 'var(--gradient-brand)',
        borderRadius: 99, transformOrigin: 'left center', scaleX: 0
      }} />
    </div>
  </div>
)}
```
