import type { FormEvent } from 'react'
import './Contact.css'

type ContactFormProps = {
  className?: string
}

export function ContactForm({ className = '' }: ContactFormProps) {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    for (const field of form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]')) {
      if (field instanceof HTMLInputElement) field.value = field.value.trim()
    }
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    window.location.hash = '#gracias'
  }

  return (
    <>
      <form
        className={['contact__form', className].filter(Boolean).join(' ')}
        onSubmit={onSubmit}
      >
        <label className="contact__field">
          <span className="visually-hidden">
            ¿En qué clínica deseas recibir atención?
          </span>
          <select
            name="clinica"
            defaultValue=""
            required
            aria-label="¿En qué clínica deseas recibir atención?"
          >
            <option value="" disabled>
              ¿En qué clínica deseas recibir atención?
            </option>
            <option>Ciudad de México</option>
            <option>Monterrey</option>
          </select>
        </label>

        <label className="contact__field">
          <span className="visually-hidden">¿Para quién buscas atención?</span>
          <select
            name="para"
            defaultValue=""
            required
            aria-label="¿Para quién buscas atención?"
          >
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
            name="tipo"
            defaultValue=""
            required
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
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            required
            autoComplete="name"
          />
        </label>

        <label className="contact__field">
          <span className="visually-hidden">Correo electrónico</span>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
            autoComplete="email"
          />
        </label>

        <label className="contact__field">
          <span className="visually-hidden">Teléfono o WhatsApp</span>
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono o WhatsApp"
            required
            autoComplete="tel"
          />
        </label>

        <button className="contact__submit" type="submit" data-motion="lift">
          Solicitar valoración
        </button>

        <label className="contact__legal">
          <input type="checkbox" name="privacidad" defaultChecked required />
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
