import type { CSSProperties } from 'react'
import { Section } from './Section'
import axaLogo from '../assets/LOGOS/AXA.png'
import gnpLogo from '../assets/LOGOS/GNP.png'
import mapfreLogo from '../assets/LOGOS/Mapfre.png'
import starLogo from '../assets/LOGOS/STAR MEDICA.png'
import christusLogo from '../assets/LOGOS/CHRISTUS.png'
import imssLogo from '../assets/LOGOS/IMSS.png'
import marinaLogo from '../assets/LOGOS/MArina.png'
import nlLogo from '../assets/LOGOS/SALUD NIUEVOLEON.png'
import oaxacaLogo from '../assets/LOGOS/SALUD_OXACA.png'
import { reveal } from '../motion/reveal'
import './Partners.css'

type Logo = {
  src: string
  alt: string
  /** Ancho visible del logo respecto a su alto. */
  aspect: number
  cw: number
  ch: number
  lx: number
  ty: number
  /** Ajuste óptico para marcas muy anchas. */
  fit?: number
}

const LOGOS: Logo[] = [
  { src: axaLogo, alt: 'AXA', aspect: 1, cw: 2.8902, ch: 1.4451, lx: -0.9468, ty: -0.2197 },
  { src: gnpLogo, alt: 'GNP Seguros', aspect: 2.6479, cw: 1.3966, ch: 1.8485, lx: -0.1983, ty: -0.4246 },
  { src: mapfreLogo, alt: 'Mapfre', aspect: 6.6258, cw: 1.2171, ch: 4.0323, lx: -0.1086, ty: -1.5161, fit: 0.62 },
  { src: starLogo, alt: 'Star Médica', aspect: 3.7723, cw: 1.0936, ch: 2.0627, lx: -0.0468, ty: -0.5314 },
  { src: christusLogo, alt: 'Christus Muguerza', aspect: 3.9537, cw: 1.2207, ch: 2.4131, lx: -0.1104, ty: -0.7066 },
  { src: imssLogo, alt: 'IMSS', aspect: 0.8074, cw: 3.012, ch: 1.216, lx: -1.006, ty: -0.108 },
  { src: marinaLogo, alt: 'Secretaría de Marina', aspect: 3.6389, cw: 1.2401, ch: 2.2563, lx: -0.1201, ty: -0.6282 },
  { src: nlLogo, alt: 'Salud Nuevo León', aspect: 2.5437, cw: 1.1927, ch: 1.5169, lx: -0.0964, ty: -0.2585 },
  { src: oaxacaLogo, alt: 'Servicios de Salud de Oaxaca', aspect: 1.6369, cw: 1.5843, ch: 1.2967, lx: -0.2921, ty: -0.1483 },
]

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <li
      className="partners__logo"
      style={
        {
          '--aspect': logo.aspect,
          '--cw': logo.cw,
          '--ch': logo.ch,
          '--lx': logo.lx,
          '--ty': logo.ty,
          '--fit': logo.fit ?? 1,
        } as CSSProperties
      }
    >
      <img src={logo.src} alt={logo.alt} draggable={false} />
    </li>
  )
}

export function Partners() {
  return (
    <Section id="colaboracion" className="partners">
      <header className="partners__intro" {...reveal('up')}>
        <p className="partners__eyebrow">Confianza y colaboración</p>
        <h2>
          Trabajamos con pacientes,{' '}
          <br className="partners__title-break" />
          empresas e instituciones
        </h2>
        <p className="partners__lead">
          Coordinamos casos con organizaciones públicas y privadas, aseguradoras
          y equipos de salud para construir rutas de atención más claras y
          ordenadas. También orientamos a pacientes y familias durante la
          gestión de pago directo, de acuerdo con los requisitos, condiciones y
          resolución de cada aseguradora.
        </p>
      </header>

      <div className="partners__slider" {...reveal('fade')}>
        <div className="partners__viewport">
          <div className="partners__track">
            <ul className="partners__group">
              {LOGOS.map((logo) => (
                <LogoItem key={logo.alt} logo={logo} />
              ))}
            </ul>
            <ul className="partners__group" aria-hidden="true">
              {LOGOS.map((logo) => (
                <LogoItem key={logo.alt} logo={logo} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
