import poster from '../assets/Proceso/image 16.png'
import { reveal } from '../motion/reveal'
import './ProcesoVideo.css'

export function ProcesoVideo() {
  return (
    <section className="proceso-video" aria-labelledby="proceso-video-title">
      <div className="section__inner">
        <header className="proceso-video__intro" {...reveal('up')}>
          <p className="proceso-video__eyebrow">Cada proceso es único</p>
          <h2 id="proceso-video-title">
            Tu prótesis debe responder a tu vida diaria
          </h2>
          <p>
            El nivel de amputación, las condiciones físicas, la evolución del
            muñón, las actividades y los objetivos personales pueden modificar
            las etapas, tiempos y componentes de cada proceso.
          </p>
          <p>
            Por eso, nuestros expertos pueden orientarte de la mejor manera
            para definir los siguientes pasos.
          </p>
        </header>
      </div>

      <figure className="proceso-video__frame" {...reveal('fade')}>
        <img
          src={poster}
          alt="Especialista de Proviem en la clínica, junto a las barras paralelas"
          draggable={false}
        />
        <span className="proceso-video__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M8.2 5.7c0-.9 1-1.5 1.8-.9l9.2 6.3c.7.5.7 1.5 0 1.9l-9.2 6.3c-.8.5-1.8 0-1.8-.9V5.7Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </figure>
    </section>
  )
}
