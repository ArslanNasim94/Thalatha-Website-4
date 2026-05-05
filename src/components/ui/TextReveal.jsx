export default function TextReveal({ as: Component = 'h2', className = '', children }) {
  return <Component className={`reveal-text ${className}`}>{children}</Component>
}
