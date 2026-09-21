import logo from '../assets/LogoProviem_Logo 1.svg'
import './Footer.css'

const NAV = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#soluciones', label: 'Prótesis' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#clinicas', label: 'Clínicas' },
  { href: '#colaboracion', label: 'Seguro' },
  { href: '#blog', label: 'Blog' },
  { href: '#contacto', label: 'Contacto' },
] as const

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.5 8.1h3.2V4.6H14.3C11.2 4.6 9.3 6.6 9.3 10v2.2H6.8v3.6h2.5V22h3.8v-6.2h3.1l.6-3.6h-3.7V10.3c0-1.1.5-2.2 1.4-2.2Z"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 1.7H8A3.3 3.3 0 0 0 4.7 8v8A3.3 3.3 0 0 0 8 19.3h8A3.3 3.3 0 0 0 19.3 16V8A3.3 3.3 0 0 0 16 4.7ZM12 7.6A4.4 4.4 0 1 1 7.6 12 4.4 4.4 0 0 1 12 7.6Zm0 1.7A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Zm4.55-3.15a1.15 1.15 0 1 1-1.15 1.15 1.15 1.15 0 0 1 1.15-1.15Z"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.7 9.1H3.8V20h2.9V9.1ZM5.25 3.4A1.7 1.7 0 1 0 6.95 5.1 1.7 1.7 0 0 0 5.25 3.4ZM20.6 20h-2.9v-5.9c0-1.8-.6-3-2.2-3s-2.2 1.3-2.2 3V20H10.4V9.1h2.8v1.5a3.5 3.5 0 0 1 3.1-1.7c2.3 0 4.3 1.5 4.3 4.7V20Z"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.7 3.4c.5-.6 1.3-.7 1.9-.4l2.4 1.5c.6.3.8 1 .6 1.7l-.7 2.4c-.2.6 0 1.2.5 1.6 1.1 1 2.4 2.2 3.6 3.2.5.3 1.1.3 1.6 0l2.4-1.6c.6-.4 1.4-.2 1.8.4l1.6 2.2c.4.6.4 1.4-.2 1.9l-1.5 1.4c-.7.7-1.6 1-2.6.9-2.4-.3-5.7-1.9-9-5.2S3.8 8.5 3.5 6.1c-.1-1 .3-1.9.9-2.5Z"
      />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="section__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <img
              className="site-footer__logo"
              src={logo}
              alt="Proviem. Tecnología en Movilidad Integral"
              draggable={false}
            />
            <p>
              Tecnología en movilidad integral. Valoración, fabricación,
              entrenamiento y seguimiento de soluciones protésicas
              personalizadas.
            </p>
            <div className="site-footer__social">
              <a href="#" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          <address className="site-footer__city">
            <p className="site-footer__city-name">CDMX</p>
            <p>
              Mitikah, Torre de Consultorios{' '}
              <br />
              2, Local 2, Río Churubusco 601,{' '}
              <br />
              Xoco, Benito Juárez, C.P.{' '}
              <br />
              03330, CDMX.
            </p>
            <a className="site-footer__phone" href="tel:+525573289409">
              <PhoneIcon />
              55 7328 9409
            </a>
          </address>

          <address className="site-footer__city">
            <p className="site-footer__city-name">MONTERREY</p>
            <p>
              Plaza José Benítez 2020,{' '}
              <br />
              Eje Metropolitano 24,{' '}
              <br />
              Deportivo Obispado,{' '}
              <br />
              Monterrey, N.L.
            </p>
            <div className="site-footer__phones">
              <a className="site-footer__phone" href="tel:+528127106577">
                <PhoneIcon />
                81 2710 6577
              </a>
              <a className="site-footer__phone" href="tel:+528127116224">
                81 2711 6224
              </a>
            </div>
          </address>

          <nav className="site-footer__nav" aria-label="Pie de página">
            {NAV.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>© 2026 Proviem. Todos los derechos reservados.</p>
          <p>
            <a href="#terminos">Términos y Condiciones</a>
            <span aria-hidden="true"> | </span>
            <a href="#aviso">Política de Privacidad</a>
            <span aria-hidden="true"> | </span>
            <a href="#cookies">Cookies</a>
          </p>
        </div>
      </div>
      <div className="site-footer__bar" aria-hidden="true" />
    </footer>
  )
}
