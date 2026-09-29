import photoImg from '../assets/seguro/claridad.png'
import './SeguroPago.css'

const STEPS = [
  {
    n: '1',
    lead: 'Cuéntanos qué ',
    emphasis: 'tipo de atención protésica',
    rest: ' necesitas',
  },
  {
    n: '2',
    lead: 'Identificamos contigo ',
    emphasis: 'los requisitos',
    rest: '',
  },
  {
    n: '3',
    lead: 'Integras tu solicitud y ',
    emphasis: 'preparas la documentación',
    rest: '',
  },
  {
    n: '4',
    lead: 'Tu aseguradora revisa el caso y ',
    emphasis: 'determina cómo procede la cobertura',
    rest: '',
  },
] as const

export function SeguroPago() {
  return (
    <section
      id="pago-directo"
      className="section seguro-pago"
      aria-labelledby="pago-directo-title"
    >
      <img
        className="seguro-pago__photo"
        src={photoImg}
        alt=""
        draggable={false}
      />

      <div className="section__inner">
        <header className="seguro-pago__intro">
          <p className="seguro-pago__eyebrow">Claridad en el proceso</p>
          <h2 id="pago-directo-title">¿Qué significa el pago directo?</h2>
          <p>
            Cuando una solicitud es autorizada y las condiciones de tu póliza lo
            permiten, la aseguradora puede pagar directamente a Proviem el monto
            que haya aprobado para tu caso. Esto puede reducir el aporte
            monetario que tendrías que realizar por la parte cubierta, aunque
            pueden existir deducible, coaseguro o conceptos no cubiertos, según
            tu póliza.
          </p>
        </header>

        <div className="seguro-pago__panel">
          <h3>¿Cómo iniciar una solicitud?</h3>
          <ol className="seguro-pago__steps">
            {STEPS.map((step) => (
              <li key={step.n} className="seguro-pago__step">
                <p>
                  {step.lead}
                  <span className="seguro-pago__em">{step.emphasis}</span>
                  {step.rest}
                </p>
                <span className="seguro-pago__num" aria-hidden="true">
                  {step.n}
                </span>
              </li>
            ))}
          </ol>
          <p className="seguro-pago__note">
            *Cada aseguradora establece sus propios formatos y requisitos. La
            documentación necesaria puede cambiar de acuerdo con la compañía, el
            producto contratado y las condiciones de la póliza.
          </p>
          <a className="seguro-pago__cta" href="#cita" data-motion="lift">
            Conoce los requisitos completos
          </a>
        </div>
      </div>
    </section>
  )
}
