import { useLayoutEffect, useRef, useState } from 'react'
import icon1 from '../assets/Proceso/1.svg'
import icon2 from '../assets/Proceso/2.svg'
import icon3 from '../assets/Proceso/3.svg'
import icon4 from '../assets/Proceso/4.svg'
import icon5 from '../assets/Proceso/5.svg'
import icon6 from '../assets/Proceso/6.svg'
import icon7 from '../assets/Proceso/7.svg'
import icon8 from '../assets/Proceso/8.svg'
import valoracion from '../assets/Proceso/PROCESO 8 pasos -20261020T232814Z-1-001/PROCESO 8 pasos/1.Valoracion.jpg'
import terapia from '../assets/Proceso/PROCESO 8 pasos -20261020T232814Z-1-001/PROCESO 8 pasos/2.Terapia fisica.jpg'
import recomendacion from '../assets/Proceso/PROCESO 8 pasos -20261020T232814Z-1-001/PROCESO 8 pasos/3.Recomendación protestica.jpg'
import medidas from '../assets/Proceso/PROCESO 8 pasos -20261020T232814Z-1-001/PROCESO 8 pasos/4.Medidas y fabricacion .jpg'
import fabricacion from '../assets/Proceso/PROCESO 8 pasos -20261020T232814Z-1-001/PROCESO 8 pasos/5.Fabricación.jpg'
import pruebas from '../assets/Proceso/PROCESO 8 pasos -20261020T232814Z-1-001/PROCESO 8 pasos/6.Pruebas de protesis .jpg'
import entrenamiento from '../assets/Proceso/PROCESO 8 pasos -20261020T232814Z-1-001/PROCESO 8 pasos/7.Entrenamiento protesico jpg.jpg'
import entrega from '../assets/Proceso/PROCESO 8 pasos -20261020T232814Z-1-001/PROCESO 8 pasos/8.Entrega de protesis  y seguimiento .jpg'
import { Section } from './Section'
import './ProcesoEtapas.css'

const STEPS = [
  {
    title: ['Valoración'],
    icon: icon1,
    image: valoracion,
    paragraphs: [
      'Conocemos tu condición actual y revisamos aspectos como el tejido del muñón, fuerza muscular, cicatrización y estado general de salud.',
      'También hablamos de tus actividades y objetivos.',
    ],
  },
  {
    title: ['Terapia Física'],
    icon: icon2,
    image: terapia,
    paragraphs: [
      'Para avanzar, es necesario preparar el cuerpo. Dependiendo de cada caso, se trabaja en aspectos como compresión, fortalecimiento, cicatrización, prevención de contracturas y equilibrio.',
    ],
  },
  {
    title: ['Recomendación', 'protésica'],
    icon: icon3,
    image: recomendacion,
    paragraphs: [
      'Evaluamos factores como tu nivel de amputación, fuerza, equilibrio, sensibilidad, movilidad y actividades cotidianas para elegir los componentes que mejor respondan al caso.',
    ],
  },
  {
    title: ['Medidas y', 'fabricación'],
    icon: icon4,
    image: medidas,
    paragraphs: [
      'Una vez definida la alternativa protésica, realizamos las mediciones y registros necesarios. Esta información nos permite comenzar el desarrollo de un encaje adaptado a las características físicas.',
    ],
  },
  {
    title: ['Fabricación'],
    icon: icon5,
    image: fabricacion,
    paragraphs: [
      'A partir de tus medidas, desarrollamos un encaje de prueba. Esta primera configuración permite comenzar a utilizar la prótesis y realizar modificaciones antes de desarrollar el encaje definitivo.',
    ],
  },
  {
    title: ['Prueba de la', 'prótesis'],
    icon: icon6,
    image: pruebas,
    paragraphs: [
      'Probamos la prótesis para revisar su ajuste, alineación, estabilidad y respuesta durante el movimiento. Las observaciones del paciente y del especialista permiten realizar las modificaciones necesarias.',
    ],
  },
  {
    title: ['Entrenamiento', 'protésico'],
    icon: icon7,
    image: entrenamiento,
    paragraphs: [
      'A través del entrenamiento se practican movimientos y actividades para conocer su funcionamiento e incorporarla progresivamente a la rutina de cada persona.',
    ],
  },
  {
    title: ['Entrega de', 'Prótesis y', 'Seguimiento'],
    icon: icon8,
    image: entrega,
    paragraphs: [
      'Después de las pruebas y el entrenamiento, realizamos los ajustes finales y desarrollamos el encaje definitivo. Además, continuamos en contacto para conocer cómo avanza la adaptación.',
    ],
  },
]

function stepName(title: string[]) {
  return title.join(' ')
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ProcesoEtapas() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const step = STEPS[active]

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const update = () => {
      if (prefersReducedMotion()) return
      const total = section.offsetHeight - window.innerHeight
      if (total <= 0) return
      const passed = Math.min(total, Math.max(0, -section.getBoundingClientRect().top))
      const progress = passed / total
      const next = Math.round(progress * (STEPS.length - 1))
      setActive((current) => (current === next ? current : next))
    }

    update()
    if (prefersReducedMotion()) return

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  function goTo(index: number) {
    if (prefersReducedMotion()) {
      setActive(index)
      return
    }
    const section = sectionRef.current
    if (!section) return
    const start = section.getBoundingClientRect().top + window.scrollY
    const scrollable = section.offsetHeight - window.innerHeight
    window.scrollTo({
      top: start + (index / (STEPS.length - 1)) * scrollable,
      behavior: 'smooth',
    })
  }

  return (
    <Section id="etapas" className="etapas">
      <div className="etapas__pin" ref={sectionRef}>
        <div className="etapas__sticky">
          <header className="etapas__intro">
            <p className="etapas__eyebrow">Tu proceso, paso a paso</p>
            <h2>Así es tu proceso protésico con Proviem</h2>
            <p className="etapas__lead">
              El proceso permite conocer las condiciones del paciente, preparar el
              cuerpo, evaluar alternativas, desarrollar y probar la prótesis y
              acompañar posteriormente su adaptación.
            </p>
          </header>

          <div className="etapas__stage">
            <div className="etapas__rail" role="tablist" aria-label="Pasos del proceso">
              {STEPS.map((item, index) => {
                const selected = index === active
                return (
                  <button
                    key={stepName(item.title)}
                    type="button"
                    role="tab"
                    className={selected ? 'etapas__step is-active' : 'etapas__step'}
                    aria-selected={selected}
                    aria-controls="etapas-panel"
                    id={`etapas-tab-${index + 1}`}
                    onClick={() => goTo(index)}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>

            <div className="etapas__photo">
              {STEPS.map((item, index) => (
                <img
                  key={item.image}
                  src={item.image}
                  alt={index === active ? stepName(item.title) : ''}
                  aria-hidden={index !== active}
                  className={index === active ? 'is-active' : undefined}
                  draggable={false}
                />
              ))}
            </div>

            <div
              className="etapas__copy"
              id="etapas-panel"
              role="tabpanel"
              aria-labelledby={`etapas-tab-${active + 1}`}
            >
              <div className="etapas__heading">
                <img src={step.icon} alt="" draggable={false} />
                <h3>{stepName(step.title)}</h3>
              </div>
              {step.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
