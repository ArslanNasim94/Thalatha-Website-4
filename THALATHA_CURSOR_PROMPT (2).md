# 🏆 THALATHA — AWARD-WINNING ANIMATED LANDING PAGE
## Complete Cursor AI Prompt | Paste this entire file into Cursor

---

> **HOW TO USE:** Open Cursor → press `Cmd+K` or open the Composer panel → paste this entire document → press Enter. Cursor will read everything and begin building.

---

## CONTEXT & MISSION

You are a senior creative frontend developer with 15+ years of building award-winning, Awwwards-nominated, and FWA-recognized websites. Your task is to completely rebuild the Thalatha landing page from scratch — transforming the current basic design at `https://admin-dev.laravel.thalatha.cloud/` into an extraordinary, jaw-dropping, immersive experience that wins awards.

**Thalatha** is a premium home services mobile app (iOS + Android) that connects homeowners with verified service professionals. Users record a short video of what they need → local providers bid → user picks the best quote → they connect via WhatsApp. It's like Uber for home services, but smarter.

**The current site's problems:** Static layout, no meaningful animation, generic design, no emotional resonance, no storytelling, no wow factor, no 3D depth, no cursor interaction, no scroll-driven narrative, flat sections with no visual hierarchy.

**Your mission:** Build something they've never seen before.

---

## BRAND & COLOR PALETTE (DO NOT CHANGE)

Extract the exact colors from the existing site and preserve them completely:

```
Primary Brand Color:   #4F46E5  (Indigo / Electric Blue-Purple)
Secondary:             #7C3AED  (Violet Purple)  
Accent Gold:           #F59E0B  (Amber)
Light Background:      #F8FAFC  (Off-white)
White:                 #FFFFFF
Dark Text:             #0F172A  (Slate 900)
Medium Text:           #475569  (Slate 600)
Card Background:       #FFFFFF with subtle shadow
Gradient:              linear-gradient(135deg, #4F46E5, #7C3AED)
Success Green:         #10B981
Soft Lavender:         #EEF2FF  (Indigo 50 - backgrounds)
Border:                #E2E8F0
```

Use these exact values everywhere. The brand is light, clean, professional — with pops of indigo/violet that feel premium and trustworthy.

---

## TECH STACK — INSTALL & USE ALL OF THESE

Run these installs first:

```bash
npm install gsap @gsap/react
npm install three @react-three/fiber @react-three/drei
npm install framer-motion
npm install lenis
npm install split-type
npm install anime.js
npm install @studio-freight/lenis
npm install react-intersection-observer
npm install react-parallax-tilt
npm install particles.js
npm install react-countup
npm install swiper
npm install @radix-ui/react-dialog
```

If the project uses Next.js, ensure `"use client"` is added to all animation components. If it's Vite/React, proceed normally.

---

## ARCHITECTURE — FILE STRUCTURE TO CREATE

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx           ← 3D animated hero
│   │   ├── Stats.jsx          ← Animated counters
│   │   ├── HowItWorks.jsx     ← 3-step scroll story
│   │   ├── Features.jsx       ← Floating feature cards
│   │   ├── Services.jsx       ← Rotating service wheel / grid
│   │   ├── AppPreview.jsx     ← 3D phone mockup with screenshots
│   │   ├── Testimonials.jsx   ← Smooth slider
│   │   └── Download.jsx       ← CTA section
│   ├── ui/
│   │   ├── CustomCursor.jsx   ← Magnetic custom cursor
│   │   ├── ParticleField.jsx  ← Three.js particle background
│   │   ├── MagneticButton.jsx ← GSAP magnetic hover
│   │   ├── TextReveal.jsx     ← Split text animation
│   │   ├── FloatingCard.jsx   ← Tilt + hover cards
│   │   └── ScrollProgress.jsx ← Top progress bar
│   └── three/
│       ├── HomeScene.jsx      ← Three.js main scene
│       └── PhoneModel.jsx     ← 3D phone mockup
├── hooks/
│   ├── useSmoothScroll.js
│   ├── useGSAP.js
│   └── useMagnet.js
├── utils/
│   └── animations.js
├── assets/
│   └── [logo + app screenshots from /assets folder]
└── App.jsx
```

---

## SECTION-BY-SECTION SPECIFICATIONS

---

### 1. GLOBAL SETUP — App.jsx / _app.jsx

```jsx
// Initialize Lenis smooth scroll
// Register GSAP plugins: ScrollTrigger, ScrollSmoother, SplitText, MorphSVG, DrawSVG
// Add custom cursor globally
// Add scroll progress bar at top
// Wrap everything in a smooth scroll container

import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// Lenis + GSAP ticker sync:
const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)
```

---

### 2. CUSTOM CURSOR — `CustomCursor.jsx`

Build a fully custom cursor that replaces the default browser cursor:

- **Default state:** Small filled circle (12px) in brand indigo `#4F46E5`
- **Hover state:** Large ring (48px) that expands on any interactive element — the ring should have a slight blur and opacity
- **Text hover state:** Thin line / blinking cursor shape
- **Button hover state:** Cursor morphs into a pill with text like "Click" or "Tap" inside
- **Magnetic effect:** When cursor approaches buttons within 80px radius, it magnetically snaps toward the center
- **Trailing dot:** A smaller secondary dot that follows the cursor with a 0.08 delay
- Implementation uses `mousemove`, `requestAnimationFrame`, and `gsap.to` with `duration: 0.15, ease: 'power2.out'`

```jsx
// The cursor should detect:
// data-cursor="text" → line cursor
// data-cursor="view" → large circle with "View" text
// data-cursor="drag" → "Drag" text
// Default → small dot + ring
```

---

### 3. HERO SECTION — `Hero.jsx`

**This is the most important section. Make it extraordinary.**

**Layout:** Full viewport height. Split layout on desktop: text left (55%), 3D visual right (45%). On mobile: stacked, visual first then text.

**Background:** 
- Subtle animated gradient mesh using CSS `@keyframes` with multiple radial gradients in soft indigo/violet/white tones
- Very subtle noise texture overlay at 3% opacity for depth
- NO dark backgrounds — keep it light and airy

**Three.js Hero Scene (right side):**
Create a WebGL canvas with:
1. **Floating 3D House/Home icon** — built from basic Three.js geometries (BoxGeometry for walls, a rotated plane for roof) in brand indigo color with a soft emission glow. It slowly rotates and bobs up and down.
2. **Orbiting service icons** — 6 small spheres orbiting the house, each in different brand colors (plumbing blue, electrical yellow, painting purple etc.), leaving a faint trail using points geometry
3. **Particle field** — 2000 small particles in indigo/violet scattered around the scene, slowly drifting
4. **Subtle grid plane** — a perspective grid floor in very light indigo (`#EEF2FF`) that fades to transparent

```javascript
// Three.js scene setup for hero
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 100)
camera.position.set(0, 2, 8)

// House geometry
const houseGroup = new THREE.Group()
const walls = new THREE.Mesh(new THREE.BoxGeometry(2, 1.5, 2), new THREE.MeshPhongMaterial({ color: 0x4F46E5, emissive: 0x4F46E5, emissiveIntensity: 0.1 }))
const roof = new THREE.Mesh(new THREE.ConeGeometry(1.6, 1, 4), new THREE.MeshPhongMaterial({ color: 0x7C3AED }))
roof.position.y = 1.25; roof.rotation.y = Math.PI / 4
houseGroup.add(walls, roof)

// GSAP animation on house
gsap.to(houseGroup.position, { y: 0.3, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
gsap.to(houseGroup.rotation, { y: Math.PI * 2, duration: 20, repeat: -1, ease: 'none' })

// Orbiting spheres (6 service categories)
const orbitRadius = 3.5
for(let i = 0; i < 6; i++) {
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.12), new THREE.MeshPhongMaterial({ color: orbitColors[i] }))
  gsap.to(sphere.position, { /* orbit via angle */ })
}
```

**Text animations (left side):**

Use `split-type` to split every text element into chars/words/lines.

```
"Trusted by 50,000+ Users" → small badge pill in indigo, slides up with fade
"Premium Home Services" → each word reveals from bottom, staggered 0.08s
"Made Simple" → gradient text (indigo to violet), same reveal
Body text → lines reveal one by one from bottom
CTA buttons → appear with spring scale animation
App Store badges → slide in from left/right
```

**GSAP timeline for hero:**
```javascript
const tl = gsap.timeline({ delay: 0.3 })
tl.from('.hero-badge', { y: 30, opacity: 0, duration: 0.6 })
  .from('.hero-title .word', { y: '100%', opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power4.out' }, '-=0.2')
  .from('.hero-body', { y: 20, opacity: 0, stagger: 0.1, duration: 0.7 }, '-=0.4')
  .from('.hero-cta', { scale: 0.8, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(2)' }, '-=0.3')
  .from('.store-badges', { x: -40, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out' }, '-=0.4')
```

**Hero CTA Buttons:**
- "Download on App Store" — dark/black button with Apple logo SVG, magnetic hover
- "Get it on Google Play" — white button with border and Play logo, magnetic hover
- Both buttons have a subtle shimmer sweep animation on hover (CSS pseudo-element)

**Scroll indicator:** Animated bouncing arrow or mouse scroll icon at bottom center.

---

### 4. STATS BAR — `Stats.jsx`

A full-width section between Hero and Features:

**Background:** Soft indigo gradient `#EEF2FF` to `#FFFFFF`, with a very subtle wave SVG border top and bottom

**Content:** 4 stats in a row (on mobile: 2×2 grid)
- 50K+ Happy Users
- 10K+ Service Providers  
- 100K+ Services Completed
- 4.9★ Average Rating

**Animation:** Use `react-countup` — numbers count up from 0 when section enters viewport. Each number has a large bold display font with brand indigo color. Label beneath in gray. Add a subtle pulsing ring behind each number icon.

**Micro-detail:** Each stat card slightly lifts on hover with a `box-shadow` transition.

---

### 5. HOW IT WORKS — `HowItWorks.jsx`

**This section should feel like a story unfolding.**

**Design:** Full-width section with a sticky left panel (on scroll) and right content that changes. On mobile: vertical timeline.

**Background:** Pure white with a flowing abstract SVG background using brand indigo dots pattern.

**Step 1 — Record Your Need:**
- Left: Large animated phone mockup showing video recording UI
- Right: Headline + body text
- Animation: Phone floats in, recording indicator pulses red, video wave animation

**Step 2 — Receive Quotes:**
- Left: Animated cards flying in showing 3 different "quote" cards with different prices
- Right: Text content
- Animation: Cards stack-enter from right with stagger, price counter ticks up

**Step 3 — Connect & Complete:**
- Left: WhatsApp UI mockup appearing with a check animation
- Right: Text content
- Animation: Chat bubbles appear one by one, checkmark draws itself

**GSAP ScrollTrigger:** Pin the section, use `scrub: 1` to sync animations to scroll position.

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
.to('.step-1', { opacity: 0, y: -50 })
.from('.step-2', { opacity: 0, y: 50 })
// etc.
```

**Connecting line:** A dashed SVG line connecting the 3 steps that draws itself as you scroll (GSAP `DrawSVG` or `strokeDashoffset` trick).

---

### 6. FEATURES GRID — `Features.jsx`

**6 feature cards in a masonry-style grid (3×2 on desktop, 1 column on mobile).**

Features:
1. 🎥 Video Requests
2. 📍 Smart Location  
3. ⚡ Instant Quotes
4. ✅ Verified Providers
5. 💬 Direct via WhatsApp
6. 🌍 Global Reach

**Card design (Glassmorphism style):**
```css
background: rgba(255,255,255,0.8);
backdrop-filter: blur(20px);
border: 1px solid rgba(79, 70, 229, 0.15);
border-radius: 24px;
box-shadow: 0 8px 32px rgba(79, 70, 229, 0.08);
```

**Card animation on hover (react-parallax-tilt):**
- `tiltMaxAngleX={8}` `tiltMaxAngleY={8}`
- `glareEnable={true}` `glareColor="#4F46E5"`
- Custom `transitionSpeed={400}`

**Each card's icon:** SVG icon in a circular gradient background, with a subtle spinning ring animation on hover.

**Entry animation:** Cards stagger in from bottom as viewport enters, using GSAP ScrollTrigger with `stagger: 0.12`.

**Feature 1 (Video Requests) is a HERO card** — twice the width, with an animated video waveform visualization inside the card.

---

### 7. SERVICES SECTION — `Services.jsx`

**Build a dynamic rotating service wheel / carousel.**

**Desktop:** A large circular arrangement of service category icons orbiting around a central "Thalatha" logo. The circle rotates slowly. Clicking/hovering a service stops the rotation and highlights it.

**Mobile:** A horizontal swipeable Swiper.js carousel.

**Services list:**
```
🔧 Plumbing | ⚡ Electrical | 🎨 Painting | 🧹 Cleaning
🪵 Carpentry | 🌿 Gardening | ❄️ AC Repair | 🚗 Car Wash
📱 Appliance | 🔑 Locksmith | 📺 TV Mounting | ➕ More
```

**Each service tile:** Rounded square card (64×64px) with gradient icon background, service name below. On hover: card lifts, icon scales 1.15, label highlights in indigo.

**Rotation animation:**
```javascript
gsap.to('.services-ring', {
  rotation: 360,
  duration: 40,
  repeat: -1,
  ease: 'none',
  transformOrigin: 'center center'
})
// Counter-rotate individual tiles so icons stay upright
gsap.to('.service-tile', {
  rotation: -360,
  duration: 40,
  repeat: -1,
  ease: 'none',
})
```

---

### 8. APP PREVIEW SECTION — `AppPreview.jsx`

**The most visually stunning section — a 3D phone showcase.**

**Build a 3D iPhone/Android mockup using Three.js or CSS 3D transforms:**

Option A (CSS 3D — simpler but still stunning):
- Create a CSS-3D iPhone frame using border-radius, gradients, and perspective
- Display actual app screenshots from `/assets/` folder inside the screen
- Multiple phones at different Z-depths creating parallax depth

Option B (Three.js — if assets allow):
- Load a basic phone shape using Three.js BoxGeometry rounded with subdivision
- Apply app screenshot as a texture on the screen face

**Animation:**
- On scroll into view: phones fly in from different directions (left, right, center) and assemble
- Screenshots auto-cycle every 3 seconds with a smooth slide transition
- Background: gradient from `#EEF2FF` to white with abstract floating shapes

**Show these actual app screenshots from `/assets/` folder** (use the App Store URLs as fallbacks if local assets aren't found yet):
```
Fallback screenshot 1: https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/56/a1/77/56a17766-dbef-23b5-ff9a-873cb6f7ce0f/1290_x_3190.jpg/600x1300bb.jpg
Fallback screenshot 2: https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/b6/d1/24/b6d124d7-56cf-586f-0cb3-22907e9dc342/1284_x_2780.jpg/600x1300bb.jpg
Fallback screenshot 3: https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/f5/49/2f/f5492fd2-a06b-d06a-f6a7-7bfd60b8a418/1290_x_3191.jpg/600x1300bb.jpg
```

**Floating UI elements around the phones:**
- A floating "Quote received! ⚡" toast notification that animates in/out
- A floating star rating widget
- A floating "WhatsApp connected ✓" badge
All in brand colors, animated with `gsap.from` + `repeat: -1, yoyo: true`.

---

### 9. TESTIMONIALS — `Testimonials.jsx`

**Three testimonial cards in a smooth 3D carousel.**

**Design:** Cards with user avatar (letter-based), star ratings, quote text, name and role.

**Testimonials data:**
```javascript
const testimonials = [
  { name: "Sarah Johnson", role: "Homeowner", rating: 5, text: "Thalatha completely changed how I handle home repairs. The video feature made it so easy to show exactly what I needed, and I got multiple quotes within hours. Amazing service!" },
  { name: "Mike Chen", role: "Business Owner", rating: 5, text: "As a service provider, Thalatha has given me access to quality clients who know exactly what they want. The platform is intuitive and the payment system is seamless." },
  { name: "Ahmed Al-Rashid", role: "Family Man", rating: 5, text: "The location-based matching is perfect! I found reliable electricians in my area within minutes. The WhatsApp integration makes communication so convenient." }
]
```

**Animation:** Use Swiper.js with `effect: 'coverflow'`, `centeredSlides: true`, `coverflowEffect: { rotate: 30, stretch: 0, depth: 100, modifier: 1 }`. Auto-plays, pauses on hover.

**Entry animation:** Section title uses SplitText char animation. Cards fade+scale in from bottom with stagger.

---

### 10. DOWNLOAD CTA — `Download.jsx`

**The closing masterpiece.**

**Background:** A full-width section with a bold gradient background (indigo to violet: `#4F46E5 → #7C3AED`). Overlay a very subtle animated dot grid pattern (CSS or canvas). Add soft glowing orbs in the background (blurred `div` elements with `filter: blur(80px)`).

**Content (centered):**
```
[Thalatha logo — white version from /assets/]
"Ready to Transform Your Home Services?"
"Join 50,000+ satisfied users. Download free today."
[App Store button — white]  [Google Play button — white outline]
```

**Animation:**
- Background gradient slowly animates between different hues (indigo ↔ violet ↔ blue)
- Glowing orbs float and pulse
- Logo appears with a scale bounce
- Headline words reveal with stagger
- Buttons appear with spring elastic bounce
- Stars (4.9★) counter up from 0

**Particle burst on mouse move:** Canvas with small white dots that drift toward the cursor and disperse — creates a magical trailing effect.

---

### 11. NAVBAR — `Navbar.jsx`

**Sticky, transparent → frosted glass on scroll.**

```javascript
// On scroll past 80px:
// background: rgba(255,255,255,0.85)
// backdrop-filter: blur(20px)
// box-shadow: 0 1px 40px rgba(79, 70, 229, 0.08)
// border-bottom: 1px solid rgba(79, 70, 229, 0.1)
```

**Left:** Thalatha logo (from `/assets/` — use the logo file found there, fallback to text "Thalatha" in brand font)

**Center links (desktop):** Features | How It Works | Services | Reviews | Download
- Each link has an underline that slides in from left on hover (CSS `::after` pseudo-element)
- Active section link highlights in brand indigo

**Right:** "Download App" CTA button — indigo gradient, magnetic hover effect

**Mobile:** Hamburger → full-screen overlay menu with stagger animation

**Entry animation:** Navbar slides down from top on page load with `gsap.from('.navbar', { y: -80, opacity: 0, duration: 0.8, ease: 'power3.out' })`

---

### 12. FOOTER — `Footer.jsx`

**Clean, minimal footer.**
- Logo + tagline left
- Links: About, Careers, Contact, Privacy, Terms, Cookie Policy, GDPR, Accessibility
- App store badges
- Copyright: "© 2026 Thalatha. All rights reserved. Powered by Nizek.com"
- Social icons row
- Links:
  - App Store: `https://apps.apple.com/us/app/thalatha/id6755521133`
  - Google Play: `https://play.google.com/store/apps/details?id=com.thalatha.mobile`

---

## ADVANCED ANIMATION DETAILS

### Scroll-Driven Narrative (Global)

```javascript
// Section reveal pattern (apply to ALL sections):
gsap.utils.toArray('.section').forEach(section => {
  gsap.from(section, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none reverse'
    }
  })
})
```

### Text Reveal Pattern

```javascript
// Use split-type for ALL headlines:
import SplitType from 'split-type'

const text = new SplitType('.reveal-text', { types: 'lines,words,chars' })
gsap.from(text.words, {
  y: '110%',
  opacity: 0,
  rotateX: -20,
  stagger: 0.05,
  duration: 1,
  ease: 'power4.out',
  scrollTrigger: {
    trigger: '.reveal-text',
    start: 'top 85%'
  }
})
```

### Magnetic Button Effect

```javascript
// Apply to all CTA buttons:
const buttons = document.querySelectorAll('.magnetic')
buttons.forEach(btn => {
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
```

### Anime.js — Service Icons Morph

```javascript
import anime from 'animejs'

// Morph service icons on hover:
anime({
  targets: '.service-icon path',
  d: [{ value: targetPath }],
  duration: 600,
  easing: 'easeInOutQuart'
})

// Animate stat numbers:
anime({
  targets: '.stat-number',
  innerHTML: [0, targetValue],
  round: 1,
  duration: 2000,
  easing: 'easeOutExpo',
  delay: anime.stagger(200)
})
```

---

## SPECIAL EFFECTS — THE WOW FACTORS

### Effect 1: Morphing SVG Background

Between each section, add a full-width SVG wave divider that morphs shape as you scroll:

```javascript
gsap.to('#wave-path', {
  attr: { d: waveShapes[nextIndex] },
  duration: 1.5,
  ease: 'power2.inOut',
  scrollTrigger: { trigger: '.section-transition', start: 'top 60%' }
})
```

### Effect 2: Cursor Particle Trail

When the mouse moves over the hero, create small indigo particles that fade out:

```javascript
document.addEventListener('mousemove', (e) => {
  const particle = document.createElement('div')
  particle.className = 'cursor-particle'
  particle.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;background:#4F46E5`
  document.body.appendChild(particle)
  gsap.to(particle, { scale: 0, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => particle.remove() })
})
```

### Effect 3: Page Load Preloader

Build a clean preloader that shows before the page loads:

```
[Thalatha Logo] 
Loading bar fills from 0% → 100% (1.5s)
Then: logo scales up and fades → content reveals
```

### Effect 4: Floating Ambient Orbs

In the hero and CTA sections, add 3-4 large blurred divs that slowly drift:

```css
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: drift 8s ease-in-out infinite alternate;
}
.orb-1 { width: 400px; height: 400px; background: #4F46E5; top: -100px; right: -100px; }
.orb-2 { width: 300px; height: 300px; background: #7C3AED; bottom: 0; left: -80px; animation-delay: -3s; }
```

### Effect 5: Number Scramble on Hover

When hovering stats, make digits rapidly cycle through random numbers before settling on the final value — like a slot machine effect.

### Effect 6: Service Card Gradient Rotation

Each service card's gradient border slowly rotates (conic-gradient animation):

```css
@keyframes gradient-rotate {
  from { --gradient-angle: 0deg; }
  to { --gradient-angle: 360deg; }
}
```

### Effect 7: Scroll Progress Indicator

A thin 3px indigo line at the very top of the viewport that fills left-to-right as the user scrolls:

```javascript
gsap.to('.progress-bar', {
  scaleX: 1,
  ease: 'none',
  scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: true }
})
```

---

## RESPONSIVE DESIGN RULES

### Breakpoints:
```css
/* Mobile */   @media (max-width: 768px)
/* Tablet */   @media (min-width: 769px) and (max-width: 1024px)
/* Desktop */  @media (min-width: 1025px)
/* Wide */     @media (min-width: 1440px)
```

### Mobile-specific rules:
- Disable Three.js heavy scenes on mobile (use a fallback gradient animation)
- Disable custom cursor on touch devices (`'ontouchstart' in window`)
- Reduce particle count to 500 on mobile
- Stack all 2-column layouts
- Use `will-change: transform` sparingly — only on actively animating elements
- Respect `prefers-reduced-motion` — if enabled, disable all scroll animations

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReducedMotion) {
  // initialize all GSAP animations
}
```

---

## PERFORMANCE REQUIREMENTS

- Lighthouse Performance score target: **90+**
- Use `will-change: transform` only during active animations
- Lazy load all images with `loading="lazy"`
- Use `IntersectionObserver` before initializing heavy Three.js scenes
- Three.js renderer: `antialias: false` on mobile, `pixelRatio: Math.min(window.devicePixelRatio, 2)`
- Use `gsap.matchMedia()` for responsive animation configurations
- Dispose Three.js geometries and materials on component unmount

---

## ASSETS TO USE

Check the `/assets/` folder in the project root. You will find:
- Thalatha logo files (use the primary logo in the navbar, white version in the dark CTA footer)
- App screenshots (use these inside the phone mockups in the App Preview section)

If `/assets/` folder is empty or not found, use the App Store image URLs provided above as fallbacks.

---

## EXTERNAL LINKS TO PRESERVE

```
App Store:    https://apps.apple.com/us/app/thalatha/id6755521133
Google Play:  https://play.google.com/store/apps/details?id=com.thalatha.mobile
About:        /about
Careers:      /careers  
Contact:      /contact
Privacy:      /privacy
Terms:        /terms
Cookie:       /cookie-policy
GDPR:         /gdpr
Accessibility: /accessibility
Powered by:   https://nizek.com
```

---

## TYPOGRAPHY

```css
/* Import from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --font-primary: 'Plus Jakarta Sans', sans-serif;  /* Headlines */
  --font-body: 'Inter', sans-serif;                  /* Body text */
  
  /* Type scale */
  --text-hero: clamp(2.5rem, 6vw, 5rem);
  --text-h2: clamp(1.8rem, 4vw, 3rem);
  --text-h3: clamp(1.2rem, 2vw, 1.75rem);
  --text-body: 1rem;
  --text-small: 0.875rem;
  
  /* Line heights */
  --lh-tight: 1.1;
  --lh-heading: 1.25;
  --lh-body: 1.65;
}
```

---

## FINAL CHECKLIST BEFORE RUNNING

Before serving the dev server, verify:

- [ ] All npm packages installed
- [ ] GSAP ScrollTrigger registered
- [ ] Lenis smooth scroll initialized and synced with GSAP ticker
- [ ] Custom cursor initialized (hidden on touch devices)
- [ ] All images from `/assets/` folder are imported correctly
- [ ] App Store + Google Play links are correct
- [ ] No console errors from Three.js (check for missing textures)
- [ ] Mobile menu works on small screens
- [ ] All sections have proper spacing (min 80px padding top/bottom on mobile, 120px on desktop)
- [ ] Color palette matches the brand (indigo `#4F46E5`, violet `#7C3AED`)
- [ ] Page title is: `Thalatha - Premium Home Services Made Simple`
- [ ] Meta description is set
- [ ] Favicon is set (use from `/assets/`)

---

## RUN THE DEV SERVER

After building everything, run:

```bash
# For Vite/React:
npm run dev

# For Next.js:
npm run dev

# The site should be available at:
# http://localhost:3000 (Next.js)
# http://localhost:5173 (Vite)
```

Open the browser and verify all animations play correctly. Check mobile view using browser DevTools → Toggle Device Toolbar.

---

## FINAL NOTES FOR CURSOR

Build this as a **single cohesive experience** — every section should feel like it belongs to the same visual language. The transitions between sections should be seamless. The scroll experience should feel like butter on glass.

This landing page should look at home on Awwwards.com. It should make someone who visits it think: *"I've never seen a home services app presented like this."*

The animations should serve the story: **Record → Get Quotes → Get it Done.** Every visual element should reinforce trust, speed, and premium quality.

Now build it. Make it extraordinary. 🏆

---

*Prompt authored for Thalatha | Cursor AI Implementation Guide | 2026*
