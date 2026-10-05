import figureImg from '../assets/protesis/hero-element.png'
import shapeImg from '../assets/protesis/hero-bg-element.png'
import './ProtesisHero.css'

export function ProtesisHero() {
  return (
    <section id="protesis" className="section protesis-hero" aria-label="Prótesis Proviem">
      <img
        className="protesis-hero__shape"
        src={shapeImg}
        alt=""
        draggable={false}
      />
      <img
        className="protesis-hero__figure"
        src={figureImg}
        alt="Prótesis de miembro superior y de pierna con calzado"
        draggable={false}
      />

      <div className="section__inner">
        <div className="protesis-hero__copy">
          <p className="protesis-hero__eyebrow">Soluciones Proviem</p>
          <h1>
            <span>Prótesis de</span>
            <span>miembro superior</span>
            <span>e inferior</span>
          </h1>
          <p>
            En Proviem trabajamos con soluciones para pierna, pie, brazo y
            mano, combinando valoración, componentes especializados, fabricación
            y entrenamiento protésico.
          </p>
          <a className="protesis-hero__cta" href="#cita" data-motion="lift">
            Agenda una valoración
          </a>
        </div>
      </div>
    </section>
  )
}
