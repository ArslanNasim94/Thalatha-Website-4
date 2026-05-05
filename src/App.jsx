import { useEffect, useState } from 'react'
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
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { initMagneticButtons, initSectionReveals, initTextReveal } from './utils/animations'
import { assets } from './utils/links'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useSmoothScroll()

  useEffect(() => {
    const preloader = gsap.timeline({
      onComplete: () => setLoaded(true),
    })

    preloader
      .to('.preloader-bar', { scaleX: 1, duration: 1.2, ease: 'power2.inOut' })
      .to('.preloader-logo', { scale: 1.12, opacity: 0, duration: 0.45, ease: 'power2.out' })
      .to('.preloader', { opacity: 0, duration: 0.35, ease: 'power2.out' })

    return () => preloader.kill()
  }, [])

  useEffect(() => {
    if (!loaded) return undefined

    const splits = initTextReveal()
    const revealTweens = initSectionReveals()
    const cleanupMagnet = initMagneticButtons()

    return () => {
      splits.forEach((split) => split.revert())
      revealTweens.forEach((tween) => tween.kill())
      cleanupMagnet()
    }
  }, [loaded])

  return (
    <>
      {!loaded && (
        <div className="preloader">
          <img className="preloader-logo-image preloader-logo" src={assets.logo} alt="Thalatha logo" loading="lazy" />
          <div className="preloader-track">
            <div className="preloader-bar" />
          </div>
        </div>
      )}
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
