import photoImg from '../assets/seguro/hero-bg.png'
import shapeImg from '../assets/seguro/hero-element.png'
import './SeguroHero.css'

export function SeguroHero() {
  return (
    <section id="seguro" className="section seguro-hero" aria-label="Seguro y pago directo">
      <div className="seguro-hero__wash" aria-hidden="true" />
      <img
        className="seguro-hero__shape"
        src={shapeImg}
        alt=""
        draggable={false}
      />
      <img
        className="seguro-hero__photo"
        src={photoImg}
        alt="Especialista de Proviem sosteniendo una prótesis de pierna sobre las barras de entrenamiento"
        draggable={false}
      />

      <div className="section__inner">
        <div className="seguro-hero__copy">
          <p className="seguro-hero__eyebrow">Seguro y pago directo</p>
          <h1>
            <span>Asesoría con tu</span>
            <span>seguro de gastos</span>
            <span>médicos mayores</span>
          </h1>
          <p>
            Si cuentas con SGMM, Proviem puede orientarte sobre el proceso para
            solicitar pago directo y ayudarte a identificar los requisitos que
            debes presentar ante tu aseguradora.
          </p>
          <a className="seguro-hero__cta" href="#pago-directo" data-motion="lift">
            Consulta cómo
            <br />
            iniciar tu trámite
          </a>
        </div>
      </div>
    </section>
  )
}
