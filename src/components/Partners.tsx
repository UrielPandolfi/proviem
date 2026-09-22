import { Section } from './Section'
import gnpLogo from '../assets/pacientes/GNP.png'
import axaLogo from '../assets/pacientes/AXXA.png'
import imssLogo from '../assets/pacientes/IMSS.png'
import nlLogo from '../assets/pacientes/NL.png'
import christusLogo from '../assets/pacientes/CHRISTUS.png'
import oaxacaLogo from '../assets/pacientes/oaxaca.png'
import { reveal } from '../motion/reveal'
import './Partners.css'

const LOGOS = [
  { src: gnpLogo, alt: 'GNP' },
  { src: axaLogo, alt: 'AXA' },
  { src: imssLogo, alt: 'IMSS' },
  { src: nlLogo, alt: 'NL Salud' },
  { src: christusLogo, alt: 'Christus Muguerza' },
  { src: oaxacaLogo, alt: 'Oaxaca Salud' },
] as const

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

      <div className="partners__logos" data-reveal-stagger="70">
        {LOGOS.map((logo) => (
          <img
            key={logo.alt}
            className="partners__logo"
            src={logo.src}
            alt={logo.alt}
            draggable={false}
            {...reveal('scale')}
          />
        ))}
      </div>
    </Section>
  )
}
