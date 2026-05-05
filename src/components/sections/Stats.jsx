import CountUpPackage from 'react-countup'
import { useInView } from 'react-intersection-observer'

const CountUp = CountUpPackage?.default || CountUpPackage

const stats = [
  { value: 50, suffix: 'K+', label: 'Happy Users' },
  { value: 10, suffix: 'K+', label: 'Service Providers' },
  { value: 100, suffix: 'K+', label: 'Services Completed' },
  { value: 4.9, suffix: '★', decimals: 1, label: 'Average Rating' },
]

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 })

  return (
    <section ref={ref} className="section stats-section" aria-label="Thalatha statistics">
      <div className="section-heading">
        <p>Proof at scale</p>
        <h2 className="reveal-text">Home services, moving faster.</h2>
      </div>
      <div className="stats-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <div className="stat-ring" />
            <strong className="stat-number">
              {inView ? (
                <CountUp end={stat.value} duration={2.2} decimals={stat.decimals || 0} suffix={stat.suffix} />
              ) : (
                `0${stat.suffix}`
              )}
            </strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
