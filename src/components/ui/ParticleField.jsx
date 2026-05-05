export default function ParticleField() {
  return (
    <div className="particle-field" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, index) => (
        <span key={index} style={{ '--i': index }} />
      ))}
    </div>
  )
}
