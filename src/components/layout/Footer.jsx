import MagneticButton from '../ui/MagneticButton'
import { assets, footerLinks, links } from '../../utils/links'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <a className="brand footer-brand" href="#hero" aria-label="Thalatha home">
            <img className="brand-logo" src={assets.logo} alt="Thalatha logo" loading="lazy" />
          </a>
          <p>Premium Home Services Made Simple</p>
        </div>

        <div className="footer-links">
          {footerLinks.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>

        <div className="footer-buttons">
          <MagneticButton href={links.appStore} variant="outline" ariaLabel="Download Thalatha on App Store">
            App Store
          </MagneticButton>
          <MagneticButton href={links.googlePlay} variant="outline" ariaLabel="Get Thalatha on Google Play">
            Google Play
          </MagneticButton>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Thalatha. All rights reserved.</span>
        <a href={links.poweredBy}>Powered by Nizek.com</a>
        <div className="social-links" aria-label="Social links">
          <a href="/" aria-label="Instagram">
            Instagram
          </a>
          <a href="/" aria-label="Twitter X">
            X
          </a>
          <a href="/" aria-label="LinkedIn">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
