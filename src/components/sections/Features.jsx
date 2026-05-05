import FloatingCard from '../ui/FloatingCard'

const features = [
  ['Video Requests', 'Describe your need visually and remove back-and-forth from the first message.', '🎥'],
  ['Smart Location', 'Match with nearby providers who can actually reach you quickly.', '📍'],
  ['Instant Quotes', 'Compare bids, timing, and provider details before you decide.', '⚡'],
  ['Verified Providers', 'Work with professionals who pass quality and trust checks.', '✅'],
  ['Direct WhatsApp', 'Move from quote to coordination without learning a new chat tool.', '💬'],
  ['Global Reach', 'A service marketplace designed for fast expansion across regions.', '🌍'],
]

export default function Features() {
  return (
    <section id="features" className="section features-section">
      <div className="section-heading">
        <p>Premium product details</p>
        <h2 className="reveal-text">Designed around how people really ask for help at home.</h2>
      </div>

      <div className="features-grid">
        {features.map(([title, body, icon], index) => (
          <FloatingCard key={title} className={`feature-card ${index === 0 ? 'feature-card-large' : ''}`}>
            <div className="feature-icon" aria-hidden="true">
              {icon}
            </div>
            <h3>{title}</h3>
            <p>{body}</p>
            {index === 0 && (
              <div className="waveform" aria-hidden="true">
                {Array.from({ length: 22 }).map((_, barIndex) => (
                  <span key={barIndex} style={{ '--i': barIndex }} />
                ))}
              </div>
            )}
          </FloatingCard>
        ))}
      </div>
    </section>
  )
}
