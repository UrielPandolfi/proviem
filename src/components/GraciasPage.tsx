import './GraciasPage.css'

export function GraciasPage() {
  return (
    <section className="gracias" aria-labelledby="gracias-title">
      <div className="gracias__card">
        <span className="gracias__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              d="M5.2 12.4 9.6 16.8 18.8 7.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="gracias__eyebrow">Solicitud recibida</p>
        <h1 id="gracias-title">Gracias por escribirnos</h1>
        <p className="gracias__lead">
          Recibimos tu solicitud. Un especialista de Proviem te contactará para
          confirmar disponibilidad.
        </p>
        <p className="gracias__note">
          El envío del formulario no confirma automáticamente la cita, una
          recomendación clínica, ni la autorización de cobertura.
        </p>
        <a className="gracias__cta" href="#inicio">
          Volver al inicio
        </a>
      </div>
    </section>
  )
}
