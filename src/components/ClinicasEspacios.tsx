import { useEffect, useRef, useState } from 'react'
import barrasImg from '../assets/clinicas/amg1445.webp'
import consultaImg from '../assets/clinicas/amg1498.webp'
import rampaImg from '../assets/clinicas/amg1419.webp'
import escaleraImg from '../assets/clinicas/amg1420.webp'
import protesisImg from '../assets/clinicas/amg1439.webp'
import salaImg from '../assets/clinicas/amg1520.webp'
import { Section } from './Section'
import { reveal } from '../motion/reveal'
import './ClinicasEspacios.css'

const SLIDES = [
  {
    src: barrasImg,
    alt: 'Paciente entrenando en las barras paralelas con un especialista de Proviem',
  },
  {
    src: consultaImg,
    alt: 'Especialistas conversando con un paciente junto a la rampa de entrenamiento',
  },
  {
    src: rampaImg,
    alt: 'Paciente con prótesis subiendo la rampa acompañado por un especialista',
  },
  {
    src: escaleraImg,
    alt: 'Entrenamiento en la escalera y la rampa de la clínica',
  },
  {
    src: protesisImg,
    alt: 'Especialista mostrando una prótesis de pierna en la clínica',
  },
  {
    src: salaImg,
    alt: 'Rampa de entrenamiento y barras paralelas en la clínica Proviem',
  },
] as const

const INTERVAL_MS = 5200

export function ClinicasEspacios() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const drag = useRef({ x: 0, y: 0, active: false })
  const count = SLIDES.length

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches || paused) return

    const id = window.setInterval(() => {
      if (document.hidden) return
      setIndex((current) => (current + 1) % count)
    }, INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [count, paused, index])

  const go = (next: number) => {
    setIndex((next + count) % count)
  }

  return (
    <Section id="instalaciones" className="espacios">
      <header className="espacios__intro" {...reveal('up')}>
        <p className="espacios__eyebrow">Nuestras instalaciones</p>
        <h2>Espacios preparados para acompañar tu proceso</h2>
        <p className="espacios__lead">
          Nuestras clínicas cuentan con espacios para valoración, pruebas y
          entrenamiento protésico, pensados para facilitar cada etapa de tu
          visita.
        </p>
      </header>

      <div
        className="espacios__stage"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Fotos de las clínicas"
        {...reveal('scale')}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          const next = event.relatedTarget
          if (next instanceof Node && event.currentTarget.contains(next)) return
          setPaused(false)
        }}
        onPointerDown={(event) => {
          if (event.pointerType === 'mouse' && event.button !== 0) return
          drag.current = { x: event.clientX, y: event.clientY, active: true }
        }}
        onPointerUp={(event) => {
          if (!drag.current.active) return
          const dx = event.clientX - drag.current.x
          const dy = event.clientY - drag.current.y
          drag.current.active = false
          if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return
          go(index + (dx < 0 ? 1 : -1))
        }}
        onPointerCancel={() => {
          drag.current.active = false
        }}
      >
        {SLIDES.map((slide, slideIndex) => (
          <img
            key={slide.src}
            className={
              slideIndex === index
                ? 'espacios__photo is-active'
                : 'espacios__photo'
            }
            src={slide.src}
            alt={slideIndex === index ? slide.alt : ''}
            aria-hidden={slideIndex === index ? undefined : true}
            draggable={false}
            decoding="async"
          />
        ))}

        <div className="espacios__dots" role="group" aria-label="Seleccionar foto">
          {SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              className={
                slideIndex === index
                  ? 'espacios__dot is-active'
                  : 'espacios__dot'
              }
              aria-label={`Foto ${slideIndex + 1} de ${count}`}
              aria-current={slideIndex === index ? 'true' : undefined}
              onClick={() => go(slideIndex)}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
