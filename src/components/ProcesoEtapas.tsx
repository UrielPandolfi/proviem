import { useLayoutEffect, useRef } from 'react'
import icon1 from '../assets/Proceso/1.svg'
import icon2 from '../assets/Proceso/2.svg'
import icon3 from '../assets/Proceso/3.svg'
import icon4 from '../assets/Proceso/4.svg'
import icon5 from '../assets/Proceso/5.svg'
import icon6 from '../assets/Proceso/6.svg'
import icon7 from '../assets/Proceso/7.svg'
import icon8 from '../assets/Proceso/8.svg'
import linea1 from '../assets/Proceso/linea1.svg'
import linea2 from '../assets/Proceso/linea2.svg'
import { Section } from './Section'
import { reveal } from '../motion/reveal'
import './ProcesoEtapas.css'

const FABRICACION_INDEX = 4

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

const STEPS = [
  {
    title: ['Valoración'],
    icon: icon1,
    paragraphs: [
      'Conocemos tu condición actual y revisamos aspectos como el tejido del muñón, fuerza muscular, cicatrización y estado general de salud.',
      'También hablamos de tus actividades y objetivos.',
    ],
  },
  {
    title: ['Terapia Física'],
    icon: icon2,
    paragraphs: [
      'Para avanzar, es necesario preparar el cuerpo. Dependiendo de cada caso, se trabaja en aspectos como compresión, fortalecimiento, cicatrización, prevención de contracturas y equilibrio.',
    ],
  },
  {
    title: ['Recomendación', 'protésica'],
    icon: icon3,
    paragraphs: [
      'Evaluamos factores como tu nivel de amputación, fuerza, equilibrio, sensibilidad, movilidad y actividades cotidianas para elegir los componentes que mejor respondan al caso.',
    ],
  },
  {
    title: ['Medidas y', 'fabricación'],
    icon: icon4,
    paragraphs: [
      'Una vez definida la alternativa protésica, realizamos las mediciones y registros necesarios. Esta información nos permite comenzar el desarrollo de un encaje adaptado a las características físicas.',
    ],
  },
  {
    title: ['Fabricación'],
    icon: icon5,
    paragraphs: [
      'A partir de tus medidas, desarrollamos un encaje de prueba. Esta primera configuración permite comenzar a utilizar la prótesis y realizar modificaciones antes de desarrollar el encaje definitivo.',
    ],
  },
  {
    title: ['Prueba de la', 'prótesis'],
    icon: icon6,
    paragraphs: [
      'Probamos la prótesis para revisar su ajuste, alineación, estabilidad y respuesta durante el movimiento. Las observaciones del paciente y del especialista permiten realizar las modificaciones necesarias.',
    ],
  },
  {
    title: ['Entrenamiento', 'protésico'],
    icon: icon7,
    paragraphs: [
      'A través del entrenamiento se practican movimientos y actividades para conocer su funcionamiento e incorporarla progresivamente a la rutina de cada persona.',
    ],
  },
  {
    title: ['Entrega de', 'Prótesis y', 'Seguimiento'],
    icon: icon8,
    paragraphs: [
      'Después de las pruebas y el entrenamiento, realizamos los ajustes finales y desarrollamos el encaje definitivo. Además, continuamos en contacto para conocer cómo avanza la adaptación.',
    ],
  },
]

export function ProcesoEtapas() {
  const trackRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLImageElement>(null)
  const line2Ref = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    const line1 = line1Ref.current
    const line2 = line2Ref.current
    if (!track || !line1 || !line2) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 900px)')

    const paintLine = (line: HTMLImageElement, value: number) => {
      line.style.setProperty('--line-draw', String(value))
      line.style.setProperty('--line-fade', value >= 0.995 ? '0px' : '4.5rem')
    }

    const paint = (first: number, second: number) => {
      paintLine(line1, first)
      paintLine(line2, second)
    }

    const update = () => {
      if (!desktop.matches || reduce.matches) {
        paint(1, 1)
        return
      }

      const rows = track.querySelectorAll<HTMLElement>('.etapas__row')
      const start = rows[0]
      const fabricacion = rows[FABRICACION_INDEX]
      const end = rows[rows.length - 1]
      if (!start || !fabricacion || !end) return

      const trackBox = track.getBoundingClientRect()
      const firstBox = start.getBoundingClientRect()
      const fabricacionBox = fabricacion.getBoundingClientRect()
      const endBox = end.getBoundingClientRect()
      const join = fabricacionBox.top + fabricacionBox.height * 0.5 - trackBox.top
      const line1Top = Math.max(0, firstBox.top - trackBox.top)
      line1.style.top = `${line1Top}px`
      line1.style.height = `${Math.max(join - line1Top, 0)}px`
      line2.style.top = `${join}px`
      line2.style.height = `${Math.max(endBox.bottom - trackBox.top - join, 0)}px`

      const head = window.innerHeight * 0.62
      const through = (from: HTMLElement, to: HTMLElement) => {
        const top = from.getBoundingClientRect().top
        const bottom = to.getBoundingClientRect().bottom
        const span = bottom - top
        if (span <= 0) return 1
        return clamp01((head - top) / span)
      }

      paint(through(start, fabricacion), through(fabricacion, end))
    }

    update()
    if (reduce.matches) return

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
    desktop.addEventListener('change', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      desktop.removeEventListener('change', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <Section id="etapas" className="etapas">
      <header className="etapas__intro" {...reveal('up')}>
        <p className="etapas__eyebrow">Tu proceso, paso a paso</p>
        <h2>Así es tu proceso protésico con Proviem</h2>
        <p className="etapas__lead">
          El proceso permite conocer las condiciones del paciente, preparar el
          cuerpo, evaluar alternativas, desarrollar y probar la prótesis y
          acompañar posteriormente su adaptación.
        </p>
      </header>

      <div className="etapas__track" ref={trackRef}>
        <div className="etapas__lines" aria-hidden="true">
          <img
            ref={line1Ref}
            className="etapas__line etapas__line--1"
            src={linea1}
            alt=""
          />
          <img
            ref={line2Ref}
            className="etapas__line etapas__line--2"
            src={linea2}
            alt=""
          />
        </div>
        <div className="etapas__list">
        {STEPS.map((step, index) => {
          const fromLeft = index % 2 === 0
          const light = Math.floor(index / 2) % 2 === 1

          return (
            <article
              key={step.title.join(' ')}
              className={
                fromLeft ? 'etapas__row' : 'etapas__row etapas__row--reverse'
              }
              {...reveal(fromLeft ? 'left' : 'right')}
            >
              <div
                className={
                  light ? 'etapas__title etapas__title--light' : 'etapas__title'
                }
              >
                <h3>
                  {step.title.map((line, lineIndex) => (
                    <span key={line}>
                      {lineIndex > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </h3>
                <img src={step.icon} alt="" draggable={false} />
              </div>
              <div className="etapas__copy">
                {step.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          )
        })}
        </div>
      </div>
    </Section>
  )
}
