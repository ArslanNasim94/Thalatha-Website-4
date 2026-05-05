import { useEffect } from 'react'
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

const services = [
  ['🔧', 'Plumbing'],
  ['⚡', 'Electrical'],
  ['🎨', 'Painting'],
  ['🧹', 'Cleaning'],
  ['🪵', 'Carpentry'],
  ['🌿', 'Gardening'],
  ['❄️', 'AC Repair'],
  ['🚗', 'Car Wash'],
  ['📱', 'Appliance'],
  ['🔑', 'Locksmith'],
  ['📺', 'TV Mounting'],
  ['➕', 'More'],
]

function ServiceTile({ service }) {
  return (
    <article className="service-tile" data-cursor="View">
      <span>{service[0]}</span>
      <strong>{service[1]}</strong>
    </article>
  )
}

export default function Services() {
  useEffect(() => {
    const ringTween = gsap.to('.services-ring', {
      rotation: 360,
      duration: 44,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
    })
    const tileTween = gsap.to('.services-ring .service-tile', {
      rotation: -360,
      duration: 44,
      repeat: -1,
      ease: 'none',
    })

    return () => {
      ringTween.kill()
      tileTween.kill()
    }
  }, [])

  return (
    <section id="services" className="section services-section">
      <div className="section-heading">
        <p>Everyday service categories</p>
        <h2 className="reveal-text">A whole home-service marketplace orbiting one request.</h2>
      </div>

      <div className="services-desktop">
        <div className="services-ring">
          {services.map((service, index) => {
            const angle = (index / services.length) * Math.PI * 2 - Math.PI / 2
            const radius = 235
            return (
              <div
                key={service[1]}
                className="service-position"
                style={{
                  left: `calc(50% + ${Math.cos(angle) * radius}px - 54px)`,
                  top: `calc(50% + ${Math.sin(angle) * radius}px - 54px)`,
                }}
              >
                <ServiceTile service={service} />
              </div>
            )
          })}
        </div>
        <div className="service-center">
          <span className="brand-icon">T</span>
          <strong>Thalatha</strong>
          <p>Pick a category or describe anything by video</p>
        </div>
      </div>

      <div className="services-mobile">
        <Swiper slidesPerView={2.4} spaceBetween={16} loop autoplay={{ delay: 2000 }} modules={[Autoplay]}>
          {services.map((service) => (
            <SwiperSlide key={service[1]}>
              <ServiceTile service={service} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
