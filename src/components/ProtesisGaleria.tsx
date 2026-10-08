import { useEffect, useRef, useState } from 'react'
import fotoBarras from '../assets/protesis/amg1452.webp'
import fotoEncaje from '../assets/protesis/amg1456.webp'
import fotoEntreno from '../assets/protesis/amg1470.webp'
import { Section } from './Section'
import { reveal } from '../motion/reveal'
import './ClinicasEspacios.css'

const SLIDES = [
  {
    src: fotoBarras,
    alt: 'Paciente con prótesis entrenando en las barras paralelas junto a un especialista',
    position: 'center 22%',
  },
  {
    src: fotoEncaje,
    alt: 'Especialista mostrando un encaje protésico a un paciente',
    position: 'center 42%',
  },
  {
    src: fotoEntreno,
    alt: 'Especialista acompañando el entrenamiento de un paciente en las barras paralelas',
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
