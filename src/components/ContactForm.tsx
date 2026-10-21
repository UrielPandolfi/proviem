import { useState, type FormEvent } from 'react'
import './Contact.css'

const FORM_TOKEN = 'f259de6e2f1c57de5ee127608da865bc'

const CLINICAS = [
  ['0', 'Ciudad de México'],
  ['1', 'Monterrey'],
] as const

const PARA_QUIEN = [
  ['0', 'Para mí'],
  ['1', 'Para un familiar'],
] as const

const TIPOS = [
  ['0', 'Prótesis de pierna transtibial (por debajo de la rodilla)'],
  ['1', 'Prótesis de pierna transfemoral (por arriba de la rodilla)'],
  ['2', 'Prótesis de brazo transradial (por debajo del codo)'],
  ['3', 'Prótesis de brazo transhumeral (por arriba del codo)'],
  ['4', 'Orientación / valoración'],
] as const

type ContactFormProps = {
  className?: string
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setStatus('sending')

    try {
      const response = await fetch('https://forms.monday.com/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formToken: FORM_TOKEN,
          answers: {
            single_selecthqzlpof: data.get('clinica'),
            single_selectijciud2: data.get('paraQuien'),
            single_selectng6930b: data.get('tipo'),
            name: data.get('nombre'),
            emailk1m3r2ay: data.get('correo'),
            phonevtpl1dk9: {
              countryShortName: 'MX',
              phone: String(data.get('telefono') ?? ''),
            },
          },
        }),
      })
      if (!response.ok) throw new Error('submit')
      window.location.hash = '#gracias'
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <form
        className={['contact__form', className].filter(Boolean).join(' ')}
        onSubmit={onSubmit}
      >
        <Select
          name="clinica"
          label="¿En qué clínica deseas recibir atención?"
          options={CLINICAS}
        />
        <Select
          name="paraQuien"
          label="¿Para quién buscas atención?"
          options={PARA_QUIEN}
        />
        <Select
          name="tipo"
          label="¿Qué tipo de prótesis u orientación necesitas?"
          options={TIPOS}
        />
        <input
          className="contact__field"
          name="nombre"
          type="text"
          required
          maxLength={255}
          autoComplete="name"
          placeholder="Nombre completo"
        />
        <input
          className="contact__field"
          name="correo"
          type="email"
          required
          autoComplete="email"
          placeholder="Correo electrónico"
        />
        <input
          className="contact__field"
          name="telefono"
          type="tel"
          required
          autoComplete="tel"
          placeholder="Teléfono o WhatsApp"
        />
        <button className="contact__submit" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : 'Solicitar valoración'}
        </button>
        <label className="contact__consent">
          <input type="checkbox" name="privacidad" required />
          <span>
            He leído y acepto el <a href="#aviso">Aviso de Privacidad</a> y
            autorizo a Proviem a contactarme para dar seguimiento a mi
            solicitud.
          </span>
        </label>
        {status === 'error' ? (
          <p className="contact__error" role="alert">
            No pudimos enviar el formulario. Inténtalo de nuevo.
          </p>
        ) : null}
      </form>
      <p className="contact__disclaimer">
        Te contactaremos para confirmar disponibilidad. El envío del
        formulario no confirma automáticamente la cita, una recomendación
        clínica, ni la autorización de cobertura.
      </p>
    </>
  )
}

function Select({
  name,
  label,
  options,
}: {
  name: string
  label: string
  options: readonly (readonly [string, string])[]
}) {
  return (
    <select className="contact__field contact__field--select" name={name} required defaultValue="">
      <option value="" disabled>
        {label}
      </option>
      {options.map(([value, text]) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  )
}
