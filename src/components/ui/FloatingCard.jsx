import Tilt from 'react-parallax-tilt'

export default function FloatingCard({ children, className = '' }) {
  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      glareEnable
      glareColor="#10B981"
      glareMaxOpacity={0.12}
      transitionSpeed={400}
    >
      <div className={`floating-card ${className}`}>{children}</div>
    </Tilt>
  )
}
