import mtyImg from '../assets/clinicas/Mask group.png'
import cdmxImg from '../assets/clinicas/Mask group (1).png'
import { Section } from './Section'
import { reveal } from '../motion/reveal'
import './ClinicasUbicaciones.css'

const MAPS_MTY =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(
    'Plaza José Benítez 2020, Eje Metropolitano 24, Deportivo Obispado, Monterrey, Nuevo León',
  )

const MAPS_CDMX =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(
    'Mitikah, Torre de Consultorios 2, Río Churubusco 601, Xoco, Benito Juárez, Ciudad de México',
  )

function MapsLink({ href }: { href: string }) {
  return (
    <a
      className="ubicaciones__btn ubicaciones__btn--maps"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-motion="lift"
    >
      Ubicación en Maps
    </a>
  )
}

function AgendaLink() {
  return (
    <a className="ubicaciones__btn" href="#cita" data-motion="lift">
      Agenda una valoración
    </a>
  )
}

export function ClinicasUbicaciones() {
  return (
    <Section id="ubicaciones" className="ubicaciones">
      <header className="ubicaciones__intro" {...reveal('up')}>
        <p className="ubicaciones__eyebrow">Nuestras ubicaciones</p>
        <h2>Elige la clínica más conveniente</h2>
        <p className="ubicaciones__lead">
          Conoce la ubicación, datos de contacto y características de cada
          clínica antes de agendar tu valoración.
        </p>
      </header>

      <div className="ubicaciones__row">
        <div className="ubicaciones__frame" {...reveal('scale')}>
          <img
            src={mtyImg}
            alt="Clínica Proviem en Monterrey"
            draggable={false}
          />
        </div>
        <article className="ubicaciones__card" {...reveal('up', 90)}>
          <div>
            <h3>Monterrey</h3>
            <p className="ubicaciones__label">Dirección</p>
            <address>
              Plaza José Benítez 2020
              <br />
              Eje Metropolitano 24
              <br />
              Deportivo Obispado
              <br />
              Monterrey, Nuevo León
            </address>
            <p className="ubicaciones__label">Teléfonos</p>
            <p className="ubicaciones__phones">
              <a href="tel:+528127106577">81 2710 6577</a>
              <br />
              <a href="tel:+528127116224">81 2711 6224</a>
            </p>
          </div>
          <div className="ubicaciones__actions">
            <AgendaLink />
            <MapsLink href={MAPS_MTY} />
          </div>
        </article>
      </div>

      <div className="ubicaciones__row ubicaciones__row--reverse">
        <article className="ubicaciones__card" {...reveal('up')}>
          <div>
            <h3>
              Ciudad de
              <br />
              México
            </h3>
            <p className="ubicaciones__label">Dirección</p>
            <address>
              Torre de Consultorios 2,
              <br />
              Local 2
              <br />
              Río Churubusco 601
              <br />
              Xoco, Benito Juárez
              <br />
              C.P. 03330, Ciudad de México
            </address>
            <p className="ubicaciones__label">Teléfono</p>
            <p className="ubicaciones__phones">
              <a href="tel:+525573289409">55 7328 9409</a>
            </p>
          </div>
          <div className="ubicaciones__actions">
            <AgendaLink />
            <MapsLink href={MAPS_CDMX} />
          </div>
        </article>
        <div className="ubicaciones__frame" {...reveal('scale', 90)}>
          <img
            src={cdmxImg}
            alt="Clínica Proviem en Ciudad de México"
            draggable={false}
          />
        </div>
      </div>
    </Section>
  )
}
