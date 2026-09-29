import './SeguroDudas.css'

const WHATSAPP_URL = 'https://wa.me/525573289409'

export function SeguroDudas() {
  return (
    <section className="section seguro-dudas" aria-labelledby="seguro-dudas-title">
      <div className="section__inner">
        <h2 id="seguro-dudas-title">¿Tienes más dudas?</h2>
        <p>Contáctanos y te asesoramos sobre tu seguro</p>
        <div className="seguro-dudas__actions">
          <a className="seguro-dudas__cita" href="#cita" data-motion="lift">
            Agenda una cita
          </a>
          <a
            className="seguro-dudas__whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-motion="lift"
          >
            Escríbenos en WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
