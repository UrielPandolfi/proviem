import photoImg from '../assets/seguro/DSC01520 2.png'
import './SeguroFaq.css'

const FAQS = [
  {
    question: '¿Proviem trabaja con todas las aseguradoras?',
    answer:
      'Proviem es proveedor de pago directo para Seguros de Gastos Médicos Mayores. La posibilidad de gestionar un caso depende de la aseguradora, el producto contratado y las condiciones de cada póliza.',
  },
  {
    question: '¿Qué pasa si mi aseguradora no cubre el 100% del costo?',
    answer:
      'La aseguradora determina el monto cubierto de acuerdo con las condiciones de la póliza. Dependiendo del caso, el asegurado puede tener que cubrir conceptos como deducible, coaseguro o diferencias no autorizadas.',
  },
  {
    question: '¿Cuánto tarda el proceso de autorización?',
    answer:
      'No existe un tiempo único. El periodo de revisión depende de la aseguradora, las características del caso y de que la documentación solicitada se encuentre completa.',
  },
  {
    question: '¿Tener SGMM garantiza que mi prótesis estará cubierta?',
    answer:
      'La existencia de una póliza no significa automáticamente que la prótesis o el monto total sean cubiertos. La resolución depende del producto contratado, sus coberturas, exclusiones y demás condiciones de la aseguradora.',
  },
] as const

function Chevron() {
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

export function SeguroFaq() {
  return (
    <section id="faq" className="section seguro-faq" aria-labelledby="faq-title">
      <img
        className="seguro-faq__photo"
        src={photoImg}
        alt=""
        draggable={false}
      />

      <div className="section__inner">
        <header className="seguro-faq__intro">
          <p className="seguro-faq__eyebrow">FAQ</p>
          <h2 id="faq-title">
            Preguntas frecuentes sobre seguro y pago directo
          </h2>
        </header>

        <div className="seguro-faq__list">
          {FAQS.map((item) => (
            <details key={item.question} className="seguro-faq__item">
              <summary>
                <span>{item.question}</span>
                <Chevron />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
