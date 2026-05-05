# SKILL: Project Setup

## Install all dependencies first

```bash
npm install gsap @gsap/react
npm install three @react-three/fiber @react-three/drei
npm install framer-motion
npm install lenis
npm install split-type
npm install animejs
npm install @studio-freight/lenis
npm install react-intersection-observer
npm install react-parallax-tilt
npm install react-countup
npm install swiper
npm install @radix-ui/react-dialog
```

## App.jsx — Wire Everything Together

```jsx
// If Next.js: "use client" at the top

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import HowItWorks from './components/sections/HowItWorks'
import Features from './components/sections/Features'
import Services from './components/sections/Services'
import AppPreview from './components/sections/AppPreview'
import Testimonials from './components/sections/Testimonials'
import Download from './components/sections/Download'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
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
      gsap.ticker.remove()
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Features />
        <Services />
        <AppPreview />
        <Testimonials />
        <Download />
      </main>
      <Footer />
    </>
  )
}
```

## global CSS — `:root` variables

Paste this into your global CSS file (e.g. `index.css` or `globals.css`):

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --color-primary:   #4F46E5;
  --color-secondary: #7C3AED;
  --color-accent:    #F59E0B;
  --color-bg:        #F8FAFC;
  --color-white:     #FFFFFF;
  --color-dark:      #0F172A;
  --color-mid:       #475569;
  --color-success:   #10B981;
  --color-lavender:  #EEF2FF;
  --color-border:    #E2E8F0;
  --gradient-brand:  linear-gradient(135deg, #4F46E5, #7C3AED);

  --font-primary: 'Plus Jakarta Sans', sans-serif;
  --font-body:    'Inter', sans-serif;

  --text-hero:  clamp(2.5rem, 6vw, 5rem);
  --text-h2:    clamp(1.8rem, 4vw, 3rem);
  --text-h3:    clamp(1.2rem, 2vw, 1.75rem);
  --text-body:  1rem;
  --text-small: 0.875rem;

  --lh-tight:   1.1;
  --lh-heading: 1.25;
  --lh-body:    1.65;
}

html { cursor: none; scroll-behavior: auto; } /* Cursor handled by CustomCursor */
body { font-family: var(--font-body); background: var(--color-bg); color: var(--color-dark); overflow-x: hidden; }
h1, h2, h3, h4, h5 { font-family: var(--font-primary); line-height: var(--lh-heading); }
section { padding: 80px 24px; }
@media (min-width: 1025px) { section { padding: 120px 80px; } }
```
