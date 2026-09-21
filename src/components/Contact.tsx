import photoImg from '../assets/contact-proviem.png'
import glowImg from '../assets/contact-proviem-degradado.png'
import { ContactForm } from './ContactForm'
import { reveal } from '../motion/reveal'
import './Contact.css'

type ContactProps = {
  photo?: string
  photoAlt?: string
}

export function Contact({ photo = photoImg, photoAlt = '' }: ContactProps) {
  return (
    <section id="cita" className="section contact" aria-label="Agenda una valoración">
      <div className="contact__visual" aria-hidden="true" {...reveal('fade')}>
        <div className="contact__frame">
          <img
            className="contact__glow"
            src={glowImg}
            alt=""
            draggable={false}
          />
          <img
            className="contact__photo"
            src={photo}
            alt={photoAlt}
            draggable={false}
          />
        </div>
      </div>

      <div className="section__inner">
        <div className="contact__content" {...reveal('up')}>
          <p className="contact__eyebrow">Da el primer paso</p>
          <h2>Agenda una valoración</h2>
          <p className="contact__lead">
            Cuéntanos brevemente qué necesitas. Nuestro equipo se pondrá en
            contacto contigo para conocer tu caso, resolver tus primeras dudas y
            confirmar la disponibilidad de la clínica seleccionada.
          </p>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
