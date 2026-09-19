import logo from '../assets/logo.svg'
import './Header.css'

const LINKS = [
  { label: 'Inicio', active: true },
  { label: 'Prótesis' },
  { label: 'Nosotros' },
  { label: 'Proceso' },
  { label: 'Clínicas' },
  { label: 'Seguro' },
  { label: 'Blog' },
  { label: 'Contacto' },
] as const

export function Header() {
  return (
    <header className="site-header">
      <div className="section__inner site-header__inner">
        <a className="site-header__logo" href="#inicio" aria-label="Proviem">
          <img src={logo} alt="" draggable={false} />
        </a>

        <nav className="site-header__nav" aria-label="Principal">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className={
                'active' in link && link.active
                  ? 'site-header__link is-active'
                  : 'site-header__link'
              }
              {...('active' in link && link.active
                ? { 'aria-current': 'page' as const }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
