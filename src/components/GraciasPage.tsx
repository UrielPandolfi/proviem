import bg from '../assets/gracias/bg.png'
import icon1 from '../assets/gracias/icon1.png'
import icon2 from '../assets/gracias/icon2.png'
import icon3 from '../assets/gracias/icon3.png'
import photo1 from '../assets/gracias/photo1.png'
import photo2 from '../assets/gracias/photo2.png'
import photo3 from '../assets/gracias/photo3.png'
import './GraciasPage.css'

const STEPS = [
  {
    icon: icon1,
    title: 'Revisamos tu solicitud',
    text: 'Identificaremos qué tipo de orientación necesitas y la clínica que corresponde a tu consulta.',
  },
  {
    icon: icon2,
    title: 'Nos pondremos en contacto contigo',
    text: 'Un integrante del equipo de Proviem continuará la conversación a través de los datos que proporcionaste.',
  },
  {
    icon: icon3,
    title: 'Definimos el siguiente paso',
    text: 'Un integrante del equipo de Proviem continuará la conversación a través de los datos que proporcionaste.',
  },
] as const

const LINKS = [
  {
    href: '#proceso',
    photo: photo1,
    title: 'Conoce el proceso protésico',
    alt: 'Rampa de entrenamiento de Proviem',
  },
  {
    href: '#protesis',
    photo: photo2,
    title: 'Explora nuestras prótesis',
    alt: 'Especialista de Proviem mostrando un encaje protésico',
  },
  {
    href: '#nosotros',
    photo: photo3,
    title: 'Más sobre nosotros',
    alt: 'Dos personas del equipo de Proviem saludándose',
  },
] as const

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M2.5 8h10M8.8 4.2 12.6 8l-3.8 3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function GraciasPage() {
  return (
    <section className="gracias" aria-labelledby="gracias-title">
      <img className="gracias__shape" src={bg} alt="" />
      <div className="gracias__inner">
        <header className="gracias__intro">
          <span className="gracias__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M5.2 12.4 9.6 16.8 18.8 7.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h1 id="gracias-title">
            <span>Gracias por</span>
            Contactarnos
          </h1>
          <p>Recibimos tu información correctamente.</p>
        </header>

        <h2 className="gracias__next">¿Qué sigue?</h2>
        <div className="gracias__steps">
          {STEPS.map((step) => (
            <article className="gracias__step" key={step.title}>
              <span className="gracias__step-icon">
                <img src={step.icon} alt="" />
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <h2 className="gracias__more-title">
          <span>Mientras tanto,</span>
          Conoce más de Proviem
        </h2>
        <div className="gracias__links">
          {LINKS.map((link) => (
            <a className="gracias__link" href={link.href} key={link.href}>
              <img src={link.photo} alt={link.alt} />
              <span className="gracias__link-title">{link.title}</span>
              <span className="gracias__link-more">
                Leer más
                <ArrowIcon />
              </span>
            </a>
          ))}
        </div>

        <div className="gracias__follow">
          <p>¿Necesitas agregar información a tu solicitud?</p>
          <button type="button" className="gracias__whatsapp">
            Escríbenos en WhatsApp
          </button>
        </div>
      </div>
    </section>
  )
}
