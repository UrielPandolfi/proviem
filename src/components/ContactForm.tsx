import './Contact.css'

const FORM_SRC =
  'https://forms.monday.com/forms/embed/f259de6e2f1c57de5ee127608da865bc?r=use1'

type ContactFormProps = {
  className?: string
}

export function ContactForm({ className = '' }: ContactFormProps) {
  return (
    <>
      <div className={['contact__form', className].filter(Boolean).join(' ')}>
        <iframe
          src={FORM_SRC}
          title="Formulario de contacto de Proviem"
          loading="lazy"
        />
      </div>
      <p className="contact__disclaimer">
        Te contactaremos para confirmar disponibilidad. El envío del
        formulario no confirma automáticamente la cita, una recomendación
        clínica, ni la autorización de cobertura.
      </p>
    </>
  )
}
