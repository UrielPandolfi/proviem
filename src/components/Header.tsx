import logo from '../assets/logo.svg'
import './Header.css'

type Page = 'home' | 'nosotros' | 'contacto' | 'blog'

const PAGE_LINKS = new Set(['Inicio', 'Nosotros', 'Blog', 'Contacto'])

const LINKS = [
  { label: 'Inicio', href: '#inicio', page: 'home' },
  { label: 'Prótesis', href: '#soluciones', page: 'home' },
  { label: 'Nosotros', href: '#nosotros', page: 'nosotros' },
  { label: 'Proceso', href: '#proceso', page: 'home' },
  { label: 'Clínicas', href: '#' },
  { label: 'Seguro', href: '#colaboracion', page: 'home' },
  { label: 'Blog', href: '#blog', page: 'blog' },
  { label: 'Contacto', href: '#contacto', page: 'contacto' },
] as const

type HeaderProps = {
  page?: Page
}

export function Header({ page = 'home' }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="section__inner site-header__inner">
        <a className="site-header__logo" href="#inicio" aria-label="Proviem">
          <img src={logo} alt="" draggable={false} />
        </a>

        <nav className="site-header__nav" aria-label="Principal">
          {LINKS.map((link) => {
            const active =
              PAGE_LINKS.has(link.label) &&
              'page' in link &&
              link.page === page

            return (
              <a
                key={link.label}
                href={link.href}
                className={
                  active ? 'site-header__link is-active' : 'site-header__link'
                }
                {...(active ? { 'aria-current': 'page' as const } : {})}
              >
                {link.label}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
