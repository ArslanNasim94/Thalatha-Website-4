# SKILL: Animation Utilities & Special Effects

This file contains all reusable animation patterns and global wow-factor effects.
Import from `src/utils/animations.js`.

---

## `utils/animations.js` — Reusable Patterns

```javascript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

/** Apply to ALL section headlines */
export function initTextReveal(selector) {
  const elements = document.querySelectorAll(selector)
  elements.forEach(el => {
    const split = new SplitType(el, { types: 'lines,words,chars' })
    gsap.from(split.words, {
      y: '110%', opacity: 0, rotateX: -20,
      stagger: 0.05, duration: 1, ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    })
  })
}

/** Apply to ALL sections for entry reveal */
export function initSectionReveals() {
  gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%', end: 'top 50%',
        toggleActions: 'play none none reverse'
      }
    })
  })
}

/** Apply to ALL .magnetic elements */
export function initMagneticButtons() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: 'power2.out' })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    })
  })
}

/** Call once in App.jsx after mount */
export function initAllAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  initTextReveal('.reveal-text')
  initSectionReveals()
  initMagneticButtons()
  initScrollProgress()
  initMorphingWaves()
}

/** Scroll progress bar (top of page) */
export function initScrollProgress() {
  gsap.to('.progress-bar', {
    scaleX: 1,
    ease: 'none',
    transformOrigin: 'left center',
    scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: true }
  })
}
```

---

## Effect 1: Morphing SVG Wave Dividers

Place between each section. The SVG path morphs on scroll.

```javascript
const waveShapes = [
  'M0,50 C200,0 400,100 600,50 C800,0 1000,100 1200,50 L1200,100 L0,100 Z',
  'M0,30 C200,80 400,0 600,60 C800,20 1000,80 1200,30 L1200,100 L0,100 Z',
  'M0,70 C200,20 400,90 600,40 C800,80 1000,20 1200,70 L1200,100 L0,100 Z'
]

let waveIndex = 0
gsap.to('#wave-path', {
  attr: { d: waveShapes[(waveIndex + 1) % waveShapes.length] },
  duration: 1.5, ease: 'power2.inOut',
  scrollTrigger: {
    trigger: '.section-transition',
    start: 'top 60%',
    onEnter: () => { waveIndex = (waveIndex + 1) % waveShapes.length }
  }
})
```

SVG markup:
```jsx
<svg className="wave-divider" viewBox="0 0 1200 100" preserveAspectRatio="none" style={{ width: '100%', height: 80 }}>
  <path id="wave-path" d={waveShapes[0]} fill="var(--color-lavender)" />
</svg>
```

---

## Effect 2: Cursor Particle Trail (Hero section only)

```javascript
document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
  const particle = document.createElement('div')
  Object.assign(particle.style, {
    position: 'fixed', left: e.clientX + 'px', top: e.clientY + 'px',
    width: '6px', height: '6px', borderRadius: '50%',
    background: '#4F46E5', pointerEvents: 'none', zIndex: '9997',
    transform: 'translate(-50%,-50%)'
  })
  document.body.appendChild(particle)
  gsap.to(particle, { scale: 0, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => particle.remove() })
})
```

---

## Effect 3: Floating Ambient Orbs (Hero + Download)

```css
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: drift 8s ease-in-out infinite alternate;
  pointer-events: none;
}
.orb-1 { width: 400px; height: 400px; background: #4F46E5; top: -100px; right: -100px; }
.orb-2 { width: 300px; height: 300px; background: #7C3AED; bottom: 0; left: -80px; animation-delay: -3s; }
@keyframes drift {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(40px, -40px) scale(1.05); }
}
```

---

## Effect 4: Number Scramble on Stat Hover

```javascript
import anime from 'animejs'

function numberScramble(element, finalValue) {
  const obj = { val: 0 }
  anime({
    targets: obj,
    val: finalValue,
    round: 1,
    duration: 800,
    easing: 'easeOutExpo',
    update: () => { element.textContent = obj.val.toLocaleString() }
  })
}

document.querySelectorAll('.stat-card').forEach(card => {
  const numEl = card.querySelector('.stat-number')
  const finalVal = parseInt(numEl.dataset.value)
  card.addEventListener('mouseenter', () => numberScramble(numEl, finalVal))
})
```

---

## Effect 5: Service Card Gradient Border Rotation

```css
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.service-tile {
  animation: gradient-rotate 4s linear infinite;
  background: conic-gradient(from var(--gradient-angle), #4F46E5, #7C3AED, #F59E0B, #4F46E5);
}

@keyframes gradient-rotate {
  from { --gradient-angle: 0deg; }
  to   { --gradient-angle: 360deg; }
}
```

---

## Effect 6: Anime.js — Service Icon SVG Morph on Hover

```javascript
import anime from 'animejs'

document.querySelectorAll('.service-tile').forEach(tile => {
  const path = tile.querySelector('path')
  const originalD = path.getAttribute('d')
  const hoverD = path.dataset.hoverPath

  tile.addEventListener('mouseenter', () => {
    if (hoverD) anime({ targets: path, d: [{ value: hoverD }], duration: 600, easing: 'easeInOutQuart' })
  })
  tile.addEventListener('mouseleave', () => {
    if (hoverD) anime({ targets: path, d: [{ value: originalD }], duration: 600, easing: 'easeInOutQuart' })
  })
})
```

---

## hooks/useMagnet.js

```javascript
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useMagnet() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: 'power2.out' })
    }
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return ref
}
```

---

## hooks/useSmoothScroll.js

```javascript
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])
}
```

---

## Final Checklist — Run Before `npm run dev`

- [ ] All npm packages installed (run `npm install`)
- [ ] GSAP ScrollTrigger registered in App.jsx
- [ ] Lenis initialized and synced with GSAP ticker
- [ ] Custom cursor hidden on touch devices
- [ ] `/assets/` folder checked for logo + screenshots
- [ ] App Store + Google Play links confirmed correct
- [ ] No Three.js console errors (check missing textures)
- [ ] Mobile menu functional on small screens
- [ ] Section padding: 80px mobile / 120px desktop
- [ ] Brand colors: `#4F46E5` + `#7C3AED` only
- [ ] Page `<title>`: `Thalatha - Premium Home Services Made Simple`
- [ ] Meta description set
- [ ] Favicon from `/assets/`
- [ ] `prefers-reduced-motion` respected
- [ ] Three.js scenes dispose on unmount
