# SKILL: Hero Section — `Hero.jsx`

This is the most important section. Build it to Awwwards standard.

---

## Layout

- **Full viewport height** (`100vh`)
- **Desktop:** split — text left 55%, Three.js canvas right 45%
- **Mobile:** stacked — 3D visual first, text below
- **Background:** Animated gradient mesh using `@keyframes` with radial gradients in soft indigo/violet/white. Add 3% opacity noise texture overlay. **No dark backgrounds.**

---

## Background CSS

```css
.hero {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: var(--color-bg);
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(79,70,229,0.12) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.10) 0%, transparent 60%),
    radial-gradient(ellipse at 60% 80%, rgba(79,70,229,0.08) 0%, transparent 50%);
  animation: meshMove 8s ease-in-out infinite alternate;
}

@keyframes meshMove {
  0%   { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
```

---

## Floating Ambient Orbs

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
@keyframes drift { 0% { transform: translate(0,0); } 100% { transform: translate(40px, -40px); } }
```

---

## Three.js Hero Scene (right panel)

Only initialize when `!('ontouchstart' in window)`. On mobile, show a gradient animation fallback instead.

```javascript
import * as THREE from 'three'
import { gsap } from 'gsap'

// Scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
camera.position.set(0, 2, 8)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: window.innerWidth > 768 })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.6))
const dirLight = new THREE.DirectionalLight(0x4F46E5, 1.2)
dirLight.position.set(5, 10, 7)
scene.add(dirLight)

// House
const houseGroup = new THREE.Group()
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1.5, 2),
  new THREE.MeshPhongMaterial({ color: 0x4F46E5, emissive: 0x4F46E5, emissiveIntensity: 0.1 })
)
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(1.6, 1, 4),
  new THREE.MeshPhongMaterial({ color: 0x7C3AED })
)
roof.position.y = 1.25
roof.rotation.y = Math.PI / 4
houseGroup.add(walls, roof)
scene.add(houseGroup)

// GSAP: bob + slow rotate
gsap.to(houseGroup.position, { y: 0.3, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
gsap.to(houseGroup.rotation, { y: Math.PI * 2, duration: 20, repeat: -1, ease: 'none' })

// Orbiting spheres (6 service categories)
const orbitColors = [0x3B82F6, 0xF59E0B, 0x10B981, 0xEF4444, 0x8B5CF6, 0xF97316]
const orbitRadius = 3.5
const orbiters = []
for (let i = 0; i < 6; i++) {
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.12),
    new THREE.MeshPhongMaterial({ color: orbitColors[i] })
  )
  scene.add(sphere)
  orbiters.push({ mesh: sphere, angle: (i / 6) * Math.PI * 2, speed: 0.4 + i * 0.05 })
}

// Particle field (2000 on desktop)
const count = window.innerWidth > 768 ? 2000 : 500
const positions = new Float32Array(count * 3)
for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 20
const particleGeo = new THREE.BufferGeometry()
particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
const particles = new THREE.Points(
  particleGeo,
  new THREE.PointsMaterial({ color: 0x4F46E5, size: 0.04, transparent: true, opacity: 0.6 })
)
scene.add(particles)

// Animation loop
function animate() {
  requestAnimationFrame(animate)
  const t = Date.now() * 0.001
  orbiters.forEach((o) => {
    o.angle += 0.005
    o.mesh.position.x = Math.cos(o.angle) * orbitRadius
    o.mesh.position.z = Math.sin(o.angle) * orbitRadius
    o.mesh.position.y = Math.sin(o.angle * 2) * 0.5
  })
  particles.rotation.y += 0.0005
  renderer.render(scene, camera)
}
animate()

// Cleanup
return () => {
  renderer.dispose()
  particleGeo.dispose()
}
```

---

## Text Animations (left panel)

Use `split-type` on all headlines. GSAP timeline:

```javascript
import SplitType from 'split-type'

useEffect(() => {
  const titleSplit = new SplitType('.hero-title', { types: 'words' })

  const tl = gsap.timeline({ delay: 0.3 })
  tl.from('.hero-badge',     { y: 30, opacity: 0, duration: 0.6 })
    .from(titleSplit.words,  { y: '100%', opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power4.out' }, '-=0.2')
    .from('.hero-body',      { y: 20, opacity: 0, stagger: 0.1, duration: 0.7 }, '-=0.4')
    .from('.hero-cta',       { scale: 0.8, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(2)' }, '-=0.3')
    .from('.store-badges',   { x: -40, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out' }, '-=0.4')

  return () => titleSplit.revert()
}, [])
```

---

## Hero Content JSX Structure

```jsx
<section className="hero">
  <div className="orb orb-1" />
  <div className="orb orb-2" />

  <div className="hero-inner"> {/* display: flex, gap: 60px */}

    {/* LEFT — Text */}
    <div className="hero-text"> {/* flex: 0 0 55% */}
      <div className="hero-badge">✦ Trusted by 50,000+ Users</div>
      <h1 className="hero-title" style={{ fontSize: 'var(--text-hero)', fontFamily: 'var(--font-primary)' }}>
        Premium Home Services <span style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Made Simple</span>
      </h1>
      <p className="hero-body">Record a short video of what you need. Local verified professionals bid. You pick the best quote and connect instantly via WhatsApp.</p>
      <div className="hero-cta"> {/* display: flex, gap: 16px */}
        <a href="https://apps.apple.com/us/app/thalatha/id6755521133" className="magnetic btn-dark">Download on App Store</a>
        <a href="https://play.google.com/store/apps/details?id=com.thalatha.mobile" className="magnetic btn-outline">Get it on Google Play</a>
      </div>
      <div className="store-badges"> {/* App Store + Play Store SVG badges */}</div>
    </div>

    {/* RIGHT — Three.js Canvas */}
    <div className="hero-canvas"> {/* flex: 0 0 45%, min-height: 500px */}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>

  </div>

  {/* Scroll indicator */}
  <div className="scroll-indicator" style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}>
    ↓ {/* animated bounce */}
  </div>
</section>
```

---

## CTA Button Styles

```css
.btn-dark {
  padding: 14px 28px;
  background: #0F172A;
  color: #fff;
  border-radius: 999px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}

.btn-dark::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  transition: left 0.5s;
}

.btn-dark:hover::after { left: 100%; }

.btn-outline {
  padding: 14px 28px;
  background: transparent;
  color: var(--color-dark);
  border: 2px solid var(--color-border);
  border-radius: 999px;
  font-weight: 600;
}
```

---

## Cursor Particle Trail on Hero

```javascript
document.querySelector('.hero').addEventListener('mousemove', (e) => {
  const particle = document.createElement('div')
  particle.style.cssText = `
    position:fixed; left:${e.clientX}px; top:${e.clientY}px;
    width:6px; height:6px; border-radius:50%;
    background:#4F46E5; pointer-events:none; z-index:9997;
    transform:translate(-50%,-50%);
  `
  document.body.appendChild(particle)
  gsap.to(particle, {
    scale: 0, opacity: 0, duration: 0.8, ease: 'power2.out',
    onComplete: () => particle.remove()
  })
})
```
