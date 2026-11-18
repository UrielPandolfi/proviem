import { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import './Header.css'

type Page =
  | 'home'
  | 'nosotros'
  | 'contacto'
  | 'blog'
  | 'clinicas'
  | 'proceso'
  | 'seguro'
  | 'aviso'
  | 'terminos'
  | 'cookies'
  | 'protesis'
  | 'gracias'

const PAGE_LINKS = new Set([
  'Prótesis',
  'Nosotros',
  'Blog',
  'Clínicas',
  'Proceso',
  'Seguro',
])

const LINKS = [
  { label: 'Prótesis', href: '#protesis', page: 'protesis' },
  { label: 'Nosotros', href: '#nosotros', page: 'nosotros' },
  { label: 'Proceso', href: '#proceso', page: 'proceso' },
  { label: 'Clínicas', href: '#clinicas', page: 'clinicas' },
  { label: 'Seguro', href: '#seguro', page: 'seguro' },
  { label: 'Blog', href: '#blog', page: 'blog' },
] as const

type HeaderProps = {
  page?: Page
}

export function Header({ page = 'home' }: HeaderProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [page])

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const desktop = window.matchMedia('(min-width: 900px)')
    const onDesktop = () => {
      if (desktop.matches) setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onDesktop)
    const previousBodyOverflow = document.body.style.overflow
    const previousRootOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onDesktop)
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousRootOverflow
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={open ? 'site-header is-open' : 'site-header'}>
      <div className="section__inner site-header__inner">
        <a
          className="site-header__logo"
          href="#inicio"
          aria-label="Proviem"
          onClick={close}
        >
          <span
            className="site-header__mark"
            style={{
              maskImage: `url("${logo}")`,
              WebkitMaskImage: `url("${logo}")`,
            }}
          />
        </a>

        <button
          type="button"
          className={
            open ? 'site-header__toggle is-open' : 'site-header__toggle'
          }
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="site-header__toggle-box" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="site-header__toggle-label">
            {open ? 'Cerrar menú' : 'Abrir menú'}
          </span>
        </button>

        <div className="site-header__actions" id="site-menu">
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
                  onClick={close}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>
          <a className="site-header__cta" href="#formulario" onClick={close}>
            Agenda una valoración
          </a>
        </div>
      </div>
    </header>
  )
}
