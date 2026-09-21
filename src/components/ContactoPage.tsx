import shapeImg from '../assets/contacto/element.png'
import { ContactForm } from './ContactForm'
import { reveal } from '../motion/reveal'
import './ContactoPage.css'

export function ContactoPage() {
  return (
    <section
      id="contacto"
      className="section contacto"
      aria-label="Contacta a Proviem"
    >
      <img
        className="contacto__shape"
        src={shapeImg}
        alt=""
        draggable={false}
      />

      <div className="section__inner">
        <div className="contacto__layout">
          <div className="contacto__copy" {...reveal('up')}>
            <p className="contacto__eyebrow">Contacta a Proviem</p>
            <h1>
              <span>Estamos para </span>
              <span>orientarte</span>
            </h1>
            <p className="contacto__lead">
              Ya sea que busques una primera valoración, información sobre una
              prótesis, seguimiento o asesoría sobre pago directo, cuéntanos tu
              caso.
            </p>
            <a
              className="contacto__cta"
              href="#clinicas"
              data-motion="lift"
            >
              Encuentra tu clínica
            </a>
          </div>

          <div className="contacto__card" {...reveal('up', 80)}>
            <h2>
              El primer paso para
              <br />
              tu <span>proceso protésico</span>
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
