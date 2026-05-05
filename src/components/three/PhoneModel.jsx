export default function PhoneModel({ screenshot, label, className = '' }) {
  return (
    <div className={`phone-frame ${className}`} aria-label={label}>
      <div className="phone-speaker" />
      <img src={screenshot} alt={label} loading="lazy" />
    </div>
  )
}
