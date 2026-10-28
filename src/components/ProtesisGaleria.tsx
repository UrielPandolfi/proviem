import { useEffect, useRef, useState } from 'react'
import foto01 from '../assets/protesis/CARRUSEL/CARRUSEL_01.jpg'
import foto02 from '../assets/protesis/CARRUSEL/CARRUSEL_02.jpg'
import foto03 from '../assets/protesis/CARRUSEL/CARRUSEL_03.jpg'
import foto04 from '../assets/protesis/CARRUSEL/CARRUSEL_04.jpg'
import foto05 from '../assets/protesis/CARRUSEL/CARRUSEL_05.jpg'
import foto06 from '../assets/protesis/CARRUSEL/CARRUSEL_06.jpg'
import { Section } from './Section'
import { reveal } from '../motion/reveal'
import './ClinicasEspacios.css'

const SLIDES = [
  {
    src: foto01,
    alt: 'Paciente practicando el alcance con una prótesis de brazo junto a una especialista',
    position: 'center',
  },
  {
    src: foto02,
    alt: 'Paciente con prótesis de pierna entrenando en las barras paralelas',
    position: 'center',
  },
  {
    src: foto03,
    alt: 'Paciente caminando entre las barras paralelas acompañado por una especialista',
    position: 'center',
  },
  {
    src: foto04,
    alt: 'Paciente caminando de espaldas entre las barras paralelas con una prótesis de pierna',
    position: 'center',
  },
  {
    src: foto05,
    alt: 'Paciente caminando con muletas y prótesis de pierna acompañado por el equipo',
    position: 'center',
  },
  {
    src: foto06,
    alt: 'Especialista ajustando el calzado de un paciente en las barras paralelas',
    position: 'center',
  },
] as const

const INTERVAL_MS = 5200

export function ProtesisGaleria() {
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
    <Section id="galeria" className="espacios">
      <header className="espacios__intro" {...reveal('up')}>
        <h2>Galería</h2>
      </header>

      <div
        className="espacios__stage"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Galería de prótesis"
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
            style={{ objectPosition: slide.position }}
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
