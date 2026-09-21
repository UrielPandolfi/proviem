import photoImg from '../assets/nosotros/hero-element.png'
import markImg from '../assets/nosotros/hero-izquierda.png'
import './NosotrosHero.css'

export function NosotrosHero() {
  return (
    <section
      id="nosotros"
      className="section nosotros-hero"
      aria-label="Conoce Proviem"
    >
      <svg className="nosotros-hero__filters" aria-hidden="true" focusable="false">
        <filter
          id="nosotros-alpha-mark"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2.6 0"
          />
        </filter>
      </svg>

      <img
        className="nosotros-hero__mark"
        src={markImg}
        alt=""
        draggable={false}
      />

      <div className="nosotros-hero__visual">
        <div className="nosotros-hero__stack">
          <div className="nosotros-hero__glow" aria-hidden="true" />
          <img
            className="nosotros-hero__photo"
            src={photoImg}
            alt="Equipo Proviem acompañando a un paciente en clínica"
            draggable={false}
          />
        </div>
      </div>

      <div className="section__inner">
        <div className="nosotros-hero__copy">
          <p className="nosotros-hero__eyebrow">Conoce Proviem</p>
          <h1>
            <span>Especialistas</span>
            <span className="nosotros-hero__lead">en prótesis</span>
            <span>y movilidad</span>
            <span>integral</span>
          </h1>
          <p>
            En Proviem acompañamos a cada persona para encontrar una solución
            protésica acorde con su cuerpo, sus actividades y sus objetivos.
          </p>
          <p>
            Combinamos valoración, tecnología, fabricación, entrenamiento y
            seguimiento para construir un proceso claro y personalizado.
          </p>
          <a
            className="nosotros-hero__cta"
            href="#enfoque"
            data-motion="lift"
          >
            Conoce más nuestro enfoque
          </a>
        </div>
      </div>
    </section>
  )
}
