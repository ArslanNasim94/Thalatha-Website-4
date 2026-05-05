import { links } from '../../utils/links'

export default function MagneticButton({
  href = links.appStore,
  children,
  variant = 'primary',
  className = '',
  ariaLabel,
}) {
  return (
    <a
      className={`magnetic btn btn-${variant} ${className}`}
      href={href}
      aria-label={ariaLabel || (typeof children === 'string' ? children : 'Open Thalatha link')}
      data-cursor="button"
    >
      {children}
    </a>
  )
}
