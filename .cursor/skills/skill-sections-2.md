# SKILL: App Preview — `AppPreview.jsx`

## Goal
The most visually stunning section — a 3D phone showcase.

## Approach: CSS 3D (recommended for reliability)
Create 3 CSS-3D iPhone frames at different Z-depths to create parallax depth.

```css
.phones-wrapper {
  perspective: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: -40px;
}
.phone-frame {
  width: 220px;
  height: 440px;
  border-radius: 40px;
  background: #0F172A;
  border: 8px solid #1E293B;
  box-shadow: 0 40px 80px rgba(0,0,0,0.3);
  overflow: hidden;
  transition: transform 0.6s ease;
}
.phone-frame:nth-child(1) { transform: rotateY(25deg) translateZ(-60px); }
.phone-frame:nth-child(2) { transform: rotateY(0deg) translateZ(0px); z-index: 2; }
.phone-frame:nth-child(3) { transform: rotateY(-25deg) translateZ(-60px); }
```

## Screenshots
Display from `/assets/` folder. Fallback URLs:
- `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/56/a1/77/56a17766-dbef-23b5-ff9a-873cb6f7ce0f/1290_x_3190.jpg/600x1300bb.jpg`
- `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/b6/d1/24/b6d124d7-56cf-586f-0cb3-22907e9dc342/1284_x_2780.jpg/600x1300bb.jpg`
- `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/f5/49/2f/f5492fd2-a06b-d06a-f6a7-7bfd60b8a418/1290_x_3191.jpg/600x1300bb.jpg`

Screenshots cycle every 3s with smooth `opacity` + `translateY` transition.

## Entry Animation
Phones fly in from different directions on scroll:
```javascript
gsap.from('.phone-frame:nth-child(1)', { x: -200, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.app-preview', start: 'top 75%' } })
gsap.from('.phone-frame:nth-child(2)', { y: 100, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.app-preview', start: 'top 75%' } })
gsap.from('.phone-frame:nth-child(3)', { x: 200, opacity: 0, duration: 1, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.app-preview', start: 'top 75%' } })
```

## Floating UI Badges (animate with yoyo repeat)
```jsx
// Each badge uses gsap.from with repeat: -1, yoyo: true
<div className="floating-badge badge-quote">⚡ Quote received!</div>
<div className="floating-badge badge-stars">⭐⭐⭐⭐⭐</div>
<div className="floating-badge badge-whatsapp">✓ WhatsApp connected</div>
```
```javascript
gsap.from('.badge-quote',    { y: 10, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' })
gsap.from('.badge-stars',    { y: 10, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 })
gsap.from('.badge-whatsapp', { y: 10, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })
```

---

# SKILL: Testimonials — `Testimonials.jsx`

## Testimonials Data
```javascript
const testimonials = [
  { name: "Sarah Johnson", role: "Homeowner", rating: 5, text: "Thalatha completely changed how I handle home repairs. The video feature made it so easy to show exactly what I needed, and I got multiple quotes within hours. Amazing service!" },
  { name: "Mike Chen", role: "Business Owner", rating: 5, text: "As a service provider, Thalatha has given me access to quality clients who know exactly what they want. The platform is intuitive and the payment system is seamless." },
  { name: "Ahmed Al-Rashid", role: "Family Man", rating: 5, text: "The location-based matching is perfect! I found reliable electricians in my area within minutes. The WhatsApp integration makes communication so convenient." }
]
```

## Swiper.js Coverflow Carousel
```jsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

<Swiper
  effect="coverflow"
  centeredSlides
  slidesPerView="auto"
  coverflowEffect={{ rotate: 30, stretch: 0, depth: 100, modifier: 1 }}
  autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
  pagination={{ clickable: true }}
  modules={[EffectCoverflow, Autoplay, Pagination]}
>
  {testimonials.map((t) => (
    <SwiperSlide key={t.name} style={{ width: 360 }}>
      <TestimonialCard testimonial={t} />
    </SwiperSlide>
  ))}
</Swiper>
```

## Card Design
```jsx
function TestimonialCard({ testimonial }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 24, padding: 32,
      boxShadow: '0 8px 40px rgba(79,70,229,0.1)',
      border: '1px solid var(--color-border)'
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'var(--gradient-brand)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 20
        }}>{testimonial.name[0]}</div>
        <div>
          <div style={{ fontWeight: 700 }}>{testimonial.name}</div>
          <div style={{ color: 'var(--color-mid)', fontSize: 14 }}>{testimonial.role}</div>
        </div>
      </div>
      <div style={{ color: '#F59E0B', marginBottom: 12 }}>{'★'.repeat(testimonial.rating)}</div>
      <p style={{ color: 'var(--color-mid)', lineHeight: 'var(--lh-body)' }}>{testimonial.text}</p>
    </div>
  )
}
```

---

# SKILL: Download CTA — `Download.jsx`

## Background
- Full-width gradient: `linear-gradient(135deg, #4F46E5, #7C3AED)`
- Animated gradient shifts between hues continuously
- Overlay: animated dot grid pattern (CSS radial-gradient or canvas)
- Floating blurred orbs (same as hero orbs but white/lavender)

```css
.download-section {
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
  background-size: 200% 200%;
  animation: gradientShift 6s ease-in-out infinite alternate;
  position: relative;
  overflow: hidden;
}
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
.dot-grid {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

## Content
```jsx
<section className="download-section">
  <div className="dot-grid" />
  <div className="orb" style={{ background: 'rgba(255,255,255,0.1)', top: '-80px', right: '-80px', width: 320, height: 320 }} />
  
  <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
    <img src="/assets/logo-white.png" alt="Thalatha" style={{ height: 48, marginBottom: 32 }} />
    <h2 className="reveal-text" style={{ color: '#fff', fontSize: 'var(--text-h2)' }}>Ready to Transform Your Home Services?</h2>
    <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 40 }}>Join 50,000+ satisfied users. Download free today.</p>
    <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
      <a href="https://apps.apple.com/us/app/thalatha/id6755521133" className="magnetic btn-white">Download on App Store</a>
      <a href="https://play.google.com/store/apps/details?id=com.thalatha.mobile" className="magnetic btn-white-outline">Get it on Google Play</a>
    </div>
  </div>
</section>
```

## Animation
```javascript
const tl = gsap.timeline({ scrollTrigger: { trigger: '.download-section', start: 'top 75%' } })
tl.from('.download-section img', { scale: 0.7, opacity: 0, duration: 0.6, ease: 'back.out(2)' })
  .from('.download-section h2 .word', { y: '100%', opacity: 0, stagger: 0.06, duration: 0.8, ease: 'power4.out' }, '-=0.2')
  .from('.download-section p', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
  .from('.download-section .magnetic', { scale: 0.8, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(2)' }, '-=0.2')
```

## Particle Trail on this section (Canvas)
```javascript
const canvas = document.querySelector('.download-canvas')
// small white dots drift toward cursor and disperse
canvas.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 3; i++) {
    const p = document.createElement('div')
    p.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,0.8);pointer-events:none;`
    document.body.appendChild(p)
    gsap.to(p, {
      x: (Math.random()-0.5)*60, y: (Math.random()-0.5)*60,
      opacity: 0, scale: 0, duration: 1, ease: 'power2.out',
      onComplete: () => p.remove()
    })
  }
})
```

---

# SKILL: Navbar — `Navbar.jsx`

## Behavior
- Starts transparent
- On scroll past 80px → frosted glass:
  ```javascript
  ScrollTrigger.create({
    start: 80,
    onEnter: () => gsap.to('.navbar', { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', boxShadow: '0 1px 40px rgba(79,70,229,0.08)', borderBottom: '1px solid rgba(79,70,229,0.1)', duration: 0.4 }),
    onLeaveBack: () => gsap.to('.navbar', { background: 'transparent', backdropFilter: 'none', boxShadow: 'none', borderBottom: 'none', duration: 0.4 })
  })
  ```

## Entry Animation
```javascript
gsap.from('.navbar', { y: -80, opacity: 0, duration: 0.8, ease: 'power3.out' })
```

## Structure
- **Left:** Logo from `/assets/` (fallback to text "Thalatha")
- **Center (desktop):** Features | How It Works | Services | Reviews | Download
  - Hover: CSS `::after` underline slides in from left
  - Active section highlights via `IntersectionObserver`
- **Right:** "Download App" button — `var(--gradient-brand)`, `border-radius: 999px`, magnetic hover

## Mobile Menu
Hamburger icon → full-screen overlay with nav links, stagger animation:
```javascript
const menuTl = gsap.timeline({ paused: true })
menuTl.from('.mobile-nav-link', { y: 40, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' })
```

---

# SKILL: Footer — `Footer.jsx`

## Layout
Clean, minimal. White background with subtle top border.

## Content
```
Left:  Logo + "Premium Home Services Made Simple"
Links: About | Careers | Contact | Privacy | Terms | Cookie Policy | GDPR | Accessibility
App Badges: App Store + Google Play
Copyright: "© 2026 Thalatha. All rights reserved. Powered by Nizek.com"
Social: Instagram, Twitter/X, LinkedIn icons
```

## Links
```
App Store:    https://apps.apple.com/us/app/thalatha/id6755521133
Google Play:  https://play.google.com/store/apps/details?id=com.thalatha.mobile
About:        /about | Careers: /careers | Contact: /contact
Privacy:      /privacy | Terms: /terms | Cookie: /cookie-policy
GDPR:         /gdpr | Accessibility: /accessibility
Powered by:   https://nizek.com
```

## Style
```css
.footer { background: #fff; border-top: 1px solid var(--color-border); padding: 60px 80px 40px; }
.footer-links a { color: var(--color-mid); font-size: var(--text-small); text-decoration: none; transition: color 0.2s; }
.footer-links a:hover { color: var(--color-primary); }
.footer-copyright { color: var(--color-mid); font-size: var(--text-small); margin-top: 40px; border-top: 1px solid var(--color-border); padding-top: 24px; }
```
