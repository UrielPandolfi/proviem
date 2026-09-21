import './Contact.css'

type ContactFormProps = {
  className?: string
}

export function ContactForm({ className = '' }: ContactFormProps) {
  return (
    <>
      <form
        className={['contact__form', className].filter(Boolean).join(' ')}
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="contact__field">
          <span className="visually-hidden">
            ¿En qué clínica deseas recibir atención?
          </span>
          <select defaultValue="" aria-label="¿En qué clínica deseas recibir atención?">
            <option value="" disabled>
              ¿En qué clínica deseas recibir atención?
            </option>
            <option>Ciudad de México</option>
            <option>Guadalajara</option>
            <option>Monterrey</option>
          </select>
        </label>

        <label className="contact__field">
          <span className="visually-hidden">¿Para quién buscas atención?</span>
          <select defaultValue="" aria-label="¿Para quién buscas atención?">
            <option value="" disabled>
              ¿Para quién buscas atención?
            </option>
            <option>Para mí</option>
            <option>Para un familiar</option>
          </select>
        </label>

        <label className="contact__field">
          <span className="visually-hidden">
            ¿Qué tipo de prótesis u orientación necesitas?
          </span>
          <select
            defaultValue=""
            aria-label="¿Qué tipo de prótesis u orientación necesitas?"
          >
            <option value="" disabled>
              ¿Qué tipo de prótesis u orientación necesitas?
            </option>
            <option>Prótesis de pierna</option>
            <option>Prótesis de brazo y mano</option>
            <option>Orientación / valoración</option>
          </select>
        </label>

        <label className="contact__field">
          <span className="visually-hidden">Nombre completo</span>
          <input type="text" name="nombre" placeholder="Nombre completo" />
        </label>

        <label className="contact__field">
          <span className="visually-hidden">Correo electrónico</span>
          <input type="email" name="email" placeholder="Correo electrónico" />
        </label>

        <label className="contact__field">
          <span className="visually-hidden">Teléfono o WhatsApp</span>
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono o WhatsApp"
          />
        </label>

        <button className="contact__submit" type="submit" data-motion="lift">
          Solicitar valoración
        </button>

        <label className="contact__legal">
          <input type="checkbox" name="privacidad" defaultChecked />
          <span>
            He leído y acepto el{' '}
            <a href="#aviso">Aviso de Privacidad</a> y autorizo a Proviem a
            contactarme para dar seguimiento a mi solicitud.
          </span>
        </label>
      </form>

      <p className="contact__disclaimer">
        Te contactaremos para confirmar disponibilidad. El envío del
        formulario no confirma automáticamente la cita, una recomendación
        clínica, ni la autorización de cobertura.
      </p>
    </>
  )
}
