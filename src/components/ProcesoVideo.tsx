import { useRef, useState } from 'react'
import poster from '../assets/Proceso/image 16.png'
import videoSrc from '../assets/Proceso/VideoSiteProviem.mp4'
import { reveal } from '../motion/reveal'
import './ProcesoVideo.css'

export function ProcesoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  function play() {
    const video = videoRef.current
    if (!video) return
    void video.play()
  }

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
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          controls={started}
          playsInline
          preload="metadata"
          aria-label="Especialista de Proviem en la clínica, junto a las barras paralelas"
          onPlay={() => setStarted(true)}
        />
        {started ? null : (
          <button
            type="button"
            className="proceso-video__play"
            aria-label="Reproducir video"
            onClick={play}
          >
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <polygon
                points="34,30 66,50 34,70"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </figure>
    </section>
  )
}
