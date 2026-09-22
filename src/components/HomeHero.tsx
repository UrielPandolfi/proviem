import { useLayoutEffect, useRef } from 'react'
import piernaImg from '../assets/Pierna_Home.png'
import glowImg from '../assets/Vector 1.png'
import networkImg from '../assets/Group 2.png'
import maskImg from '../assets/Mask group.png'
import photoImg from '../assets/Group 4.png'
import { reveal } from '../motion/reveal'
import { FIRST_LEG_FRAME, useHeroLegFrames } from '../motion/useHeroLegFrames'
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

const STAT_COUNT = 1000
const STAT_DURATION_MS = 1600
const DESKTOP_QUERY = '(min-width: 900px)'

function formatStatCount(value: number) {
  return `+${Math.round(value).toLocaleString('en-US')}`
}

function StatCount() {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const desktopMq = window.matchMedia(DESKTOP_QUERY)
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0

    const showFinal = () => {
      el.textContent = formatStatCount(STAT_COUNT)
    }

    const run = () => {
      if (!desktopMq.matches || motionMq.matches) {
        showFinal()
        return
      }

      const start = performance.now()
      el.textContent = formatStatCount(0)

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / STAT_DURATION_MS)
        const eased = 1 - (1 - t) ** 3
        el.textContent = formatStatCount(STAT_COUNT * eased)
        if (t < 1) raf = requestAnimationFrame(tick)
      }

      raf = requestAnimationFrame(tick)
    }

    run()

    const onChange = () => {
      cancelAnimationFrame(raf)
      run()
    }

    desktopMq.addEventListener('change', onChange)
    motionMq.addEventListener('change', onChange)

    return () => {
      cancelAnimationFrame(raf)
      desktopMq.removeEventListener('change', onChange)
      motionMq.removeEventListener('change', onChange)
    }
  }, [])

  return <strong ref={ref}>{formatStatCount(STAT_COUNT)}</strong>
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
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useHeroLegFrames(sectionRef, canvasRef, visualRef)

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="hero"
      aria-label="Inicio Proviem"
    >
      <h1 className="hero__brand">
        <FitSize text="PROVIEM" />
      </h1>
      <p className="hero__tagline">
        <FitTrack text="Tecnología en Movilidad Integral" />
      </p>

      <div className="hero__visual" ref={visualRef}>
        <img
          className="hero__glow"
          src={glowImg}
          alt=""
          draggable={false}
        />
        <picture>
          {FIRST_LEG_FRAME ? (
            <source
              media="(min-width: 900px)"
              srcSet={FIRST_LEG_FRAME}
              type="image/webp"
            />
          ) : null}
          <img
            className="hero__leg hero__leg--static"
            src={piernaImg}
            alt="Prótesis de miembro inferior"
            draggable={false}
          />
        </picture>
        <canvas
          ref={canvasRef}
          className="hero__leg hero__leg--frames"
          width={1088}
          height={1900}
          aria-hidden="true"
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
        <div className="hero__fold">
          <div className="hero__copyblock">
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
            </div>
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
              <StatCount />
              <p>Personas atendidas recuperaron su movilidad</p>
            </a>
            <img
              className="hero__network"
              src={networkImg}
              alt=""
              draggable={false}
            />
          </div>
        </div>

        <div className="hero__needs" {...reveal('up')}>
          <h2>
            Elegir una prótesis
            <br />
            comienza por entender
            <br />
            tus necesidades
          </h2>
          <p>
            Una prótesis no debería elegirse únicamente por su apariencia o
            nivel tecnológico. Consideramos tu nivel de amputación, condición
            física, actividades, entorno y objetivos para orientarte hacia una
            solución funcional para tu caso.
          </p>
          <a className="hero__pill" href="#proceso" data-motion="lift">
            Conoce nuestro proceso
          </a>
          <div className="hero__needs-visual">
            <img
              className="hero__needs-photo"
              src={photoImg}
              alt=""
              draggable={false}
            />
            <img
              className="hero__needs-mark"
              src={maskImg}
              alt=""
              draggable={false}
            />
          </div>
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
        </div>
      </div>
    </section>
  )
}
