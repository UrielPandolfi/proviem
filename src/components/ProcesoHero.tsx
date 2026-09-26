import photoImg from '../assets/Proceso/Group 4.png'
import markImg from '../assets/nosotros/hero-izquierda.png'
import './ProcesoHero.css'

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M2.5 5 7 9.5 11.5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ProcesoHero() {
  return (
    <section
      id="proceso"
      className="section proceso-hero"
      aria-label="Proceso protésico"
    >
      <svg className="proceso-hero__filters" aria-hidden="true" focusable="false">
        <filter id="proceso-alpha-mark" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2.6 0"
          />
        </filter>
      </svg>

      <img
        className="proceso-hero__mark"
        src={markImg}
        alt=""
        draggable={false}
      />

      <div className="proceso-hero__visual">
        <div className="proceso-hero__stack">
          <div className="proceso-hero__glow" aria-hidden="true" />
          <img
            className="proceso-hero__photo"
            src={photoImg}
            alt="Especialista de Proviem mostrando un socket protésico a un paciente"
            draggable={false}
          />
        </div>
      </div>

      <div className="section__inner">
        <div className="proceso-hero__copy">
          <p className="proceso-hero__eyebrow">Proceso protésico</p>
          <h1>
            <span>De la valoración al</span>
            <span className="proceso-hero__lead">seguimiento</span>
          </h1>
          <p>
            Conoce las etapas que pueden formar parte del desarrollo de una
            prótesis.
          </p>
          <p>
            Cada proceso se adapta a las condiciones, necesidades y evolución de
            cada persona.
          </p>
          <a className="proceso-hero__cta" href="#cita" data-motion="lift">
            Agenda una valoración
          </a>
          <a className="proceso-hero__more" href="#etapas">
            Conoce las etapas
            <ChevronDown />
          </a>
        </div>
      </div>
    </section>
  )
}
