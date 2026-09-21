import photoImg from '../assets/nosotros/historia.png'
import teamImg from '../assets/nosotros/historia-2.png'
import { Section } from './Section'
import { reveal } from '../motion/reveal'
import './NosotrosHistoria.css'

export function NosotrosHistoria() {
  return (
    <>
      <Section id="historia" className="historia">
        <header className="historia__intro" {...reveal('up')}>
          <p className="historia__eyebrow">Nuestra historia</p>
          <h2>Soluciones protésicas pensadas para cada persona</h2>
          <p className="historia__lead">
            Proviem nació con el propósito de ofrecer una alternativa
            especializada a personas que necesitan recuperar o fortalecer su
            movilidad. Desde nuestros inicios, buscamos que cada recomendación
            considere no solo el nivel de amputación, sino también las
            condiciones físicas, las actividades cotidianas, las aspiraciones y
            el entorno de cada paciente.
          </p>
        </header>

        <div className="historia__media">
          <img
            className="historia__photo"
            src={photoImg}
            alt="Rampa de entrenamiento en la clínica Proviem"
            draggable={false}
            {...reveal('scale')}
          />
          <article
            id="enfoque"
            className="historia__card"
            {...reveal('up', 90)}
          >
            <h3>Nuestro enfoque es escuchar antes de recomendar</h3>
            <p>
              Cada persona llega con una historia, necesidades y objetivos
              diferentes. Nuestro trabajo comienza por comprenderlos para
              orientar una solución protésica clara, funcional y adecuada para
              su caso.
            </p>
          </article>
        </div>
      </Section>

      <Section id="equipo" className="historia historia--equipo">
        <header className="historia__intro" {...reveal('up')}>
          <p className="historia__eyebrow">Nuestra historia</p>
          <h2>Las personas detrás del proceso</h2>
          <p className="historia__lead historia__lead--short">
            Un equipo que combina conocimiento técnico y acompañamiento
          </p>
        </header>

        <div className="historia__media historia__media--reverse">
          <article className="historia__card" {...reveal('up')}>
            <h3>Cada proceso requiere escuchar, evaluar, explicar y ajustar.</h3>
            <p>
              Nuestro equipo, certificado por instituciones como Ottobock en
              Alemania, trabaja para que pacientes y familias comprendan sus
              opciones, participen en las decisiones y sepan qué esperar durante
              cada etapa.
            </p>
          </article>
          <img
            className="historia__photo"
            src={teamImg}
            alt="Equipo Proviem en clínica"
            draggable={false}
            {...reveal('scale', 90)}
          />
        </div>
      </Section>
    </>
  )
}
