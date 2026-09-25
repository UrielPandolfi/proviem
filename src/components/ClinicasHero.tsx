import rampImg from '../assets/clinicas/RampaEscalera 1.png'
import markImg from '../assets/clinicas/image 3.png'
import './ClinicasHero.css'

export function ClinicasHero() {
  return (
    <section
      id="clinicas"
      className="section clinicas-hero"
      aria-label="Clínicas Proviem"
    >
      <svg className="clinicas-hero__filters" aria-hidden="true" focusable="false">
        <filter id="clinicas-mark" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2.5 0"
          />
        </filter>
      </svg>

      <img
        className="clinicas-hero__mark"
        src={markImg}
        alt=""
        draggable={false}
      />

      <div className="clinicas-hero__visual">
        <img
          className="clinicas-hero__ramp"
          src={rampImg}
          alt="Rampa y escalera de entrenamiento en la clínica Proviem"
          draggable={false}
        />
      </div>

      <div className="section__inner">
        <div className="clinicas-hero__copy">
          <p className="clinicas-hero__eyebrow">Clínicas Proviem</p>
          <h1>
            <span>Movilidad</span>
            <span>integral</span>
            <span>en CDMX y Monterrey</span>
          </h1>
          <p>
            Encuentra atención especializada para procesos de prótesis. Te
            acompañamos desde la valoración y selección de la solución hasta las
            pruebas, entrenamiento protésico y seguimiento.
          </p>
          <a className="clinicas-hero__cta" href="#cita" data-motion="lift">
            Agenda una valoración
          </a>
        </div>
      </div>
    </section>
  )
}
