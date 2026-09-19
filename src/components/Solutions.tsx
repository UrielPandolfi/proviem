import { Section } from './Section'
import bgLeft from '../assets/bloque-izq.png'
import bgRight from '../assets/bloque-der.png'
import legImg from '../assets/pierna.png'
import armImg from '../assets/brazo.png'
import { reveal } from '../motion/reveal'
import './Solutions.css'

export function Solutions() {
  return (
    <Section id="soluciones" className="solutions" narrow>
      <header className="solutions__intro" {...reveal('up')}>
          <p className="solutions__eyebrow">Soluciones protésicas</p>
          <h2>¿Qué tipo de prótesis necesitas?</h2>
          <p className="solutions__lead">
            Explora nuestras alternativas para miembro inferior y superior.
            <br />
            La recomendación final se determina después de conocer las
            condiciones y objetivos de cada persona.
          </p>
        </header>

        <div className="solutions__grid" data-reveal-stagger="140">
          <a
            className="solutions__card solutions__card--leg"
            href="#protesis-pierna"
            {...reveal('scale')}
          >
            <img className="solutions__bg" src={bgLeft} alt="" draggable={false} />
            <img
              className="solutions__figure solutions__figure--leg"
              src={legImg}
              alt="Prótesis de pierna"
              draggable={false}
            />
            <div className="solutions__label">
              <span>Explorar</span>
              <strong>
                Prótesis
                <br />
                de pierna
              </strong>
            </div>
          </a>

          <a
            className="solutions__card solutions__card--arm"
            href="#protesis-brazo"
            {...reveal('scale')}
          >
            <img className="solutions__bg" src={bgRight} alt="" draggable={false} />
            <img
              className="solutions__figure solutions__figure--arm"
              src={armImg}
              alt="Prótesis de brazo y mano"
              draggable={false}
            />
            <div className="solutions__label">
              <span>Explorar</span>
              <strong>
                Prótesis
                <br />
                de brazo
                <br />
                y mano
              </strong>
            </div>
          </a>
        </div>
    </Section>
  )
}
