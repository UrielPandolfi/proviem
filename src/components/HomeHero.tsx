import { useLayoutEffect, useRef } from 'react'
import piernaImg from '../assets/Pierna_Home.png'
import glowImg from '../assets/Vector 1.png'
import networkImg from '../assets/Group 2.png'
import maskImg from '../assets/Mask group.png'
import photoImg from '../assets/Group 4.png'
import { reveal } from '../motion/reveal'
import './HomeHero.css'

function useFitToWidth(mode: 'size' | 'tracking', text: string) {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return

    const fit = () => {
      const styles = getComputedStyle(parent)
      const available =
        parent.clientWidth -
        parseFloat(styles.paddingLeft) -
        parseFloat(styles.paddingRight)
      if (available <= 0) return

      if (mode === 'size') {
        el.style.fontSize = '100px'
        const first = el.getBoundingClientRect().width
        if (first <= 0) return
        const next = Math.min((100 * available) / first, available * 0.35)
        el.style.fontSize = `${next}px`
        const second = el.getBoundingClientRect().width
        if (second <= 0) return
        el.style.fontSize = `${parseFloat(el.style.fontSize) * (available / second)}px`
        return
      }

      el.style.letterSpacing = '0px'
      el.style.marginRight = '0px'
      const extra = available - el.getBoundingClientRect().width
      const gaps = Math.max(text.length - 1, 1)
      const tracking = extra / gaps
      el.style.letterSpacing = `${tracking}px`
      el.style.marginRight = `-${tracking}px`
    }

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(fit)
    })
    observer.observe(parent)
    fit()
    void document.fonts.ready.then(fit)

    return () => observer.disconnect()
  }, [mode, text])

  return ref
}

function FitSize({ text }: { text: string }) {
  const ref = useFitToWidth('size', text)
  return <span ref={ref}>{text}</span>
}

function FitTrack({ text }: { text: string }) {
  const ref = useFitToWidth('tracking', text)
  return <span ref={ref}>{text}</span>
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 11.5 11.5 2.5M5 2.5h6.5V9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HomeHero() {
  return (
    <section id="inicio" className="hero" aria-label="Inicio Proviem">
      <h1 className="hero__brand">
        <FitSize text="PROVIEM" />
      </h1>
      <p className="hero__tagline">
        <FitTrack text="Tecnología en Movilidad Integral" />
      </p>

      <div className="hero__visual">
        <img
          className="hero__glow"
          src={glowImg}
          alt=""
          draggable={false}
        />
        <img
          className="hero__leg"
          src={piernaImg}
          alt="Prótesis de miembro inferior"
          draggable={false}
        />
      </div>

      <img
        className="hero__mask"
        src={maskImg}
        alt=""
        draggable={false}
        {...reveal('scale')}
      />
      <img
        className="hero__photo"
        src={photoImg}
        alt=""
        draggable={false}
        {...reveal('scale', 120)}
      />

      <div className="hero__stage">

        <div className="hero__copy">
          <h2>
            <span className="hero__copy-lead">Prótesis</span>
            <br />
            para tu vida
            <br />
            diaria
          </h2>
          <p>
            Valoramos tu caso y te acompañamos en la selección, fabricación,
            prueba, entrenamiento y seguimiento de tu prótesis.
          </p>
          <a className="hero__link" href="#cita" data-motion="lift">
            Agenda una cita
            <ArrowIcon />
          </a>
        </div>

        <div className="hero__aside">
          <a className="hero__stat" href="#resultados">
            <span className="hero__stat-arrow">
              <ArrowIcon />
            </span>
            <p>Personas atendidas recuperaron su movilidad</p>
            <strong>+1,000</strong>
          </a>
          <img
            className="hero__network"
            src={networkImg}
            alt=""
            draggable={false}
          />
        </div>

        <div className="hero__process" {...reveal('up')}>
          <h3>
            Cada recomendación
            <br />
            parte de una valoración
          </h3>
          <p>
            Tu nivel de amputación, movilidad, condición física, actividades y
            objetivos ayudan a definir qué componentes pueden considerarse para
            tu prótesis.
          </p>
          <a className="hero__pill" href="#proceso" data-motion="lift">
            Conoce nuestro proceso
          </a>
        </div>

        <div className="hero__closing" {...reveal('up')}>
          <h2>
            Ofrecemos un <span>Servicio Integral</span>
          </h2>
          <p>
            Te incluimos terapias de rehabilitación, para que aprendas a usar tu
            nueva prótesis.
          </p>
          <a className="hero__closing-link" href="#enfoque">
            El enfoque Proviem
          </a>
        </div>
      </div>
    </section>
  )
}
