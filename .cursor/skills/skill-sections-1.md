# SKILL: Stats Section — `Stats.jsx`

## Design
- Full-width section, background: `linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%)`
- Subtle wave SVG border top and bottom
- 4 stats in a row (desktop), 2×2 grid (mobile)

## Stats Data
```
50K+   Happy Users
10K+   Service Providers
100K+  Services Completed
4.9★   Average Rating
```

## Animation
- Use `react-countup` — trigger when section enters viewport (use `react-intersection-observer`)
- Each stat: large bold display number in `var(--color-primary)`, label below in `var(--color-mid)`
- Pulsing ring animation behind each stat icon (CSS `@keyframes`)
- Each stat card lifts on hover: `transform: translateY(-4px); box-shadow: 0 12px 40px rgba(79,70,229,0.12)`

## Number Scramble on Hover (anime.js)
```javascript
import anime from 'animejs'

statCard.addEventListener('mouseenter', () => {
  anime({
    targets: statEl,
    innerHTML: [0, targetValue],
    round: 1,
    duration: 800,
    easing: 'easeOutExpo'
  })
})
```

---

# SKILL: How It Works — `HowItWorks.jsx`

## Design
- Full-width section, pure white background with faint indigo dot pattern SVG overlay
- **Desktop:** sticky left panel + scrolling right content
- **Mobile:** vertical numbered timeline

## GSAP ScrollTrigger — Pin + Scrub
```javascript
gsap.timeline({
  scrollTrigger: {
    trigger: '.how-it-works',
    start: 'top top',
    end: '+=2000',
    scrub: 1,
    pin: true,
  }
})
.to('.step-1-content', { opacity: 0, y: -50, duration: 1 })
.from('.step-2-content', { opacity: 0, y: 50, duration: 1 })
.to('.step-2-content', { opacity: 0, y: -50, duration: 1 })
.from('.step-3-content', { opacity: 0, y: 50, duration: 1 })
```

## Three Steps

### Step 1 — Record Your Need
- Left visual: phone mockup with animated recording UI (red pulsing dot, waveform animation)
- Right text: headline + body

### Step 2 — Receive Quotes
- Left visual: 3 animated quote cards flying in with stagger, price counter ticking
- Right text: headline + body

### Step 3 — Connect & Complete
- Left visual: WhatsApp UI mock with chat bubbles appearing one-by-one, checkmark draws itself with SVG `strokeDashoffset`
- Right text: headline + body

## Connecting SVG Line
Draw a dashed vertical line between the 3 steps using `strokeDashoffset` trick:
```javascript
gsap.to('.connecting-line', {
  strokeDashoffset: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '.how-it-works',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: true
  }
})
```

---

# SKILL: Features Grid — `Features.jsx`

## Layout
- 3×2 masonry-style grid on desktop, single column on mobile
- Feature 1 (Video Requests) spans 2 columns — hero card

## Features Data
```
1. 🎥 Video Requests     — Describe your need visually
2. 📍 Smart Location     — Match with nearby providers
3. ⚡ Instant Quotes     — Bids arrive within minutes
4. ✅ Verified Providers — Background-checked professionals
5. 💬 Direct WhatsApp   — Communicate instantly
6. 🌍 Global Reach      — Available across regions
```

## Card Style — Glassmorphism
```css
.feature-card {
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(79, 70, 229, 0.15);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(79, 70, 229, 0.08);
  padding: 32px;
  transition: transform 0.3s, box-shadow 0.3s;
}
.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(79, 70, 229, 0.15);
}
```

## Card Hover Effect — react-parallax-tilt
```jsx
import Tilt from 'react-parallax-tilt'

<Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareColor="#4F46E5" transitionSpeed={400}>
  <div className="feature-card">...</div>
</Tilt>
```

## Icon Style
- SVG icon inside a circular gradient background (`var(--gradient-brand)`)
- Spinning ring animation on card hover: `@keyframes spin { to { transform: rotate(360deg); } }`

## Entry Animation — stagger from bottom
```javascript
gsap.from('.feature-card', {
  y: 60, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
  scrollTrigger: { trigger: '.features-grid', start: 'top 80%' }
})
```

## Feature Card 1 — Hero Card with Video Waveform
- Spans full width in first row
- Animated waveform bars inside: 20 bars animating height with `anime.js` in loop

---

# SKILL: Services Section — `Services.jsx`

## Desktop — Rotating Service Wheel
A large circular ring of 12 service tiles orbiting a central Thalatha logo.

```javascript
// Ring rotates
gsap.to('.services-ring', {
  rotation: 360, duration: 40, repeat: -1, ease: 'none',
  transformOrigin: 'center center'
})
// Tiles counter-rotate so icons stay upright
gsap.to('.service-tile', {
  rotation: -360, duration: 40, repeat: -1, ease: 'none'
})
// Pause on hover
servicesRing.addEventListener('mouseenter', () => gsap.globalTimeline.pause())
servicesRing.addEventListener('mouseleave', () => gsap.globalTimeline.resume())
```

### Position tiles on circle
```javascript
const total = 12
tiles.forEach((tile, i) => {
  const angle = (i / total) * Math.PI * 2 - Math.PI / 2
  const radius = 220 // px
  tile.style.left = `calc(50% + ${Math.cos(angle) * radius}px - 32px)`
  tile.style.top  = `calc(50% + ${Math.sin(angle) * radius}px - 32px)`
  tile.style.position = 'absolute'
})
```

## Services Data
```
🔧 Plumbing | ⚡ Electrical | 🎨 Painting | 🧹 Cleaning
🪵 Carpentry | 🌿 Gardening | ❄️ AC Repair | 🚗 Car Wash
📱 Appliance | 🔑 Locksmith | 📺 TV Mounting | ➕ More
```

## Mobile — Swiper.js Carousel
```jsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

<Swiper slidesPerView={3} spaceBetween={16} loop autoplay={{ delay: 2000 }} modules={[Autoplay]}>
  {services.map(s => <SwiperSlide key={s.name}><ServiceTile service={s} /></SwiperSlide>)}
</Swiper>
```

## Tile Style
```css
.service-tile {
  width: 64px; height: 64px;
  border-radius: 16px;
  background: var(--gradient-brand);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}
.service-tile:hover { transform: scale(1.15); box-shadow: 0 8px 24px rgba(79,70,229,0.3); }
```

## Gradient Border Rotation (CSS)
```css
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes gradient-rotate {
  from { --gradient-angle: 0deg; }
  to   { --gradient-angle: 360deg; }
}
.service-tile {
  background: conic-gradient(from var(--gradient-angle), #4F46E5, #7C3AED, #4F46E5);
  animation: gradient-rotate 4s linear infinite;
}
```
