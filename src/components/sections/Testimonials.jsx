import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    text: 'Thalatha completely changed how I handle home repairs. The video feature made it so easy to show exactly what I needed, and I got multiple quotes within hours.',
  },
  {
    name: 'Mike Chen',
    role: 'Business Owner',
    text: 'As a service provider, Thalatha gives me access to quality clients who know exactly what they want. The platform is intuitive and fast.',
  },
  {
    name: 'Ahmed Al-Rashid',
    role: 'Family Man',
    text: 'The location-based matching is perfect. I found reliable electricians nearby within minutes, and WhatsApp made communication convenient.',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="section-heading">
        <p>Reviews</p>
        <h2 className="reveal-text">Trusted by homeowners and professionals.</h2>
      </div>

      <Swiper
        className="testimonial-swiper"
        effect="coverflow"
        centeredSlides
        slidesPerView="auto"
        coverflowEffect={{ rotate: 30, stretch: 0, depth: 120, modifier: 1 }}
        autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Autoplay, Pagination]}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.name} className="testimonial-slide">
            <article className="testimonial-card">
              <div className="testimonial-person">
                <div className="avatar">{testimonial.name[0]}</div>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
              <div className="stars" aria-label="5 star review">
                ★★★★★
              </div>
              <p>{testimonial.text}</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
