import { Section } from './Section'
import icon1 from '../assets/iconos/1.svg'
import icon2 from '../assets/iconos/2.svg'
import icon3 from '../assets/iconos/3.svg'
import icon4 from '../assets/iconos/4.svg'
import icon5 from '../assets/iconos/5.svg'
import icon6 from '../assets/iconos/6.svg'
import icon7 from '../assets/iconos/7.svg'
import icon8 from '../assets/iconos/8.svg'
import { reveal } from '../motion/reveal'
import './ProcessSteps.css'

const STEPS = [
  { n: 1, title: 'Valoración', icon: icon1 },
  { n: 2, title: 'Terapia Física', icon: icon2 },
  { n: 3, title: 'Recomendación Protésica', icon: icon3 },
  { n: 4, title: 'Toma de medidas', icon: icon4 },
  { n: 5, title: 'Fabricación', icon: icon5 },
  { n: 6, title: 'Prueba de la prótesis', icon: icon6 },
  { n: 7, title: 'Entrenamiento Protésico', icon: icon7 },
  { n: 8, title: 'Entrega de prótesis y seguimiento', icon: icon8 },
] as const

export function ProcessSteps() {
  return (
    <Section id="proceso" className="process-steps" narrow>
      <header className="process-steps__intro" {...reveal('up')}>
        <p className="process-steps__eyebrow">De la valoración al seguimiento</p>
        <h2>Tu proceso protésico, paso a paso</h2>
        <p className="process-steps__lead">
          Cada etapa tiene un objetivo diferente. Te explicamos qué hacemos, qué
          puedes esperar
          <br />
          y cómo te acompañamos durante el proceso.
        </p>
      </header>

      <ol className="process-steps__grid" data-reveal-stagger="80">
        {STEPS.map((step) => (
          <li
            key={step.n}
            className="process-steps__card"
            data-motion="lift"
            {...reveal('up')}
          >
            <h3>{step.title}</h3>
            <img src={step.icon} alt="" className="process-steps__icon" />
            <span className="process-steps__num" aria-hidden="true">
              {step.n}
            </span>
          </li>
        ))}
      </ol>

      <a
        className="process-steps__cta"
        href="#proceso-completo"
        data-motion="lift"
        {...reveal('up', 160)}
      >
        Conoce nuestro proceso completo
      </a>
    </Section>
  )
}
