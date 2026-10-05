import { useEffect, useRef, useState } from 'react'
import type { FocusEvent, PointerEvent } from 'react'
import piernaImg from '../assets/protesis/pierna1.png'
import brazoImg from '../assets/protesis/brazo1.png'
import transfemoralImg from '../assets/protesis/transfemoral.png'
import transtibialImg from '../assets/protesis/transtibial.png'
import transhumeralImg from '../assets/protesis/transhumeral.png'
import transradialImg from '../assets/protesis/transradial.png'
import linerImg from '../assets/protesis/liner.png'
import linerElementsImg from '../assets/protesis/liner-elements.png'
import pieImg from '../assets/protesis/pie.png'
import rodillaImg from '../assets/protesis/rodilla.png'
import myofacilImg from '../assets/protesis/myofacil.png'
import accesImg from '../assets/protesis/acces.png'
import mecanicoImg from '../assets/protesis/mecanico.png'
import './ProtesisTipos.css'

type Member = 'inferior' | 'superior'

type Point = {
  id: string
  title: string
  text: string
  side: 'left' | 'right'
  top: string
  left: string
}

const LIMBS: Record<
  Member,
  { panelId: string; tabId: string; src: string; alt: string; points: Point[] }
> = {
  inferior: {
    panelId: 'protesis-panel-inferior',
    tabId: 'protesis-tab-inferior',
    src: piernaImg,
    alt: 'Silueta de una pierna en perfil',
    points: [
      {
        id: 'transfemoral',
        title: 'Transfemoral',
        text: 'Opciones protésicas para amputaciones arriba de la rodilla, con configuraciones de rodilla y pie según la movilidad y necesidades de cada persona.',
        side: 'right',
        top: '28%',
        left: '76%',
      },
      {
        id: 'transtibial',
        title: 'Transtibial',
        text: 'Soluciones para amputaciones debajo de la rodilla, enfocadas en ajuste, estabilidad y respuesta durante la marcha.',
        side: 'left',
        top: '62%',
        left: '58%',
      },
    ],
  },
  superior: {
    panelId: 'protesis-panel-superior',
    tabId: 'protesis-tab-superior',
    src: brazoImg,
    alt: 'Silueta de un brazo en perfil',
    points: [
      {
        id: 'transhumeral',
        title: 'Transhumeral',
        text: 'Opciones protésicas para amputaciones arriba del codo, configuradas de acuerdo con las necesidades funcionales y el tipo de control requerido.',
        side: 'right',
        top: '34%',
        left: '75%',
      },
      {
        id: 'transradial',
        title: 'Transradial',
        text: 'Opciones protésicas para amputaciones abajo del codo, con alternativas mecánicas y mioeléctricas según la función que se requiera.',
        side: 'left',
        top: '57%',
        left: '64%',
      },
    ],
  },
}

type Part = {
  id: string
  title: string
  text?: string
  side: 'left' | 'right'
  top: string
  edge: number
}

const SOCKET_TEXT =
  'Estructura personalizada que se adapta al muñón y sirve como punto de unión entre el usuario y los componentes de la prótesis.'
const TUBO_TEXT =
  'Elemento estructural que conecta los componentes de la prótesis y permite realizar ajustes de longitud y alineación.'
const SUSPENSION_TEXT =
  'Sistema que ayuda a mantener la prótesis en su posición durante el movimiento y las actividades del usuario.'

type LimbDiagram = 'transfemoral' | 'transtibial' | 'transhumeral' | 'transradial'

const TRANSFEMORAL_PARTS: Part[] = [
  { id: 'liner', title: 'Liner', side: 'right', top: '13%', edge: 0.62 },
  {
    id: 'socket',
    title: 'Socket / Encaje',
    text: SOCKET_TEXT,
    side: 'right',
    top: '32%',
    edge: 0.78,
  },
  {
    id: 'suspension',
    title: 'Suspensión',
    text: SUSPENSION_TEXT,
    side: 'left',
    top: '43%',
    edge: 0.56,
  },
  { id: 'rodillas', title: 'Rodillas', side: 'right', top: '55%', edge: 0.87 },
  {
    id: 'tubo',
    title: 'Tubo',
    text: TUBO_TEXT,
    side: 'left',
    top: '68%',
    edge: 0.62,
  },
  { id: 'pie', title: 'Pie', side: 'left', top: '84%', edge: 0.38 },
]

const TRANSTIBIAL_PARTS: Part[] = [
  { id: 'liner', title: 'Liner', side: 'left', top: '34%', edge: 0.4 },
  {
    id: 'socket',
    title: 'Socket',
    text: SOCKET_TEXT,
    side: 'right',
    top: '46%',
    edge: 0.87,
  },
  {
    id: 'tubo',
    title: 'Tubo',
    text: TUBO_TEXT,
    side: 'right',
    top: '71%',
    edge: 0.53,
  },
  { id: 'pie', title: 'Pie', side: 'left', top: '83%', edge: 0.44 },
]

const TRANSHUMERAL_PARTS: Part[] = [
  {
    id: 'suspension',
    title: 'Suspensión',
    text: SUSPENSION_TEXT,
    side: 'left',
    top: '18%',
    edge: 0.36,
  },
  {
    id: 'socket',
    title: 'Socket',
    text: SOCKET_TEXT,
    side: 'right',
    top: '26%',
    edge: 0.71,
  },
  {
    id: 'motor',
    title: 'Motor',
    text: 'Componente eléctrico que transforma las señales de control en movimiento dentro de determinadas prótesis mioeléctricas.',
    side: 'left',
    top: '46%',
    edge: 0.57,
  },
  {
    id: 'brazo',
    title: 'Brazo',
    text: 'Estructura protésica que integra y conecta los diferentes componentes necesarios según el nivel de amputación.',
    side: 'right',
    top: '66%',
    edge: 0.57,
  },
  { id: 'mano', title: 'Mano', side: 'left', top: '82%', edge: 0.18 },
]

const TRANSRADIAL_PARTS: Part[] = [
  {
    id: 'suspension',
    title: 'Suspensión',
    text: SUSPENSION_TEXT,
    side: 'left',
    top: '26%',
    edge: 0.48,
  },
  {
    id: 'socket',
    title: 'Socket',
    text: SOCKET_TEXT,
    side: 'right',
    top: '55%',
    edge: 0.74,
  },
  { id: 'mano', title: 'Mano', side: 'left', top: '75%', edge: 0.34 },
]

const DIAGRAMS: Record<LimbDiagram, { src: string; alt: string; parts: Part[] }> = {
  transfemoral: {
    src: transfemoralImg,
    alt: 'Prótesis transfemoral con liner, encaje, rodilla, tubo y pie',
    parts: TRANSFEMORAL_PARTS,
  },
  transtibial: {
    src: transtibialImg,
    alt: 'Prótesis transtibial con liner, encaje, tubo y pie',
    parts: TRANSTIBIAL_PARTS,
  },
  transhumeral: {
    src: transhumeralImg,
    alt: 'Prótesis transhumeral con suspensión, encaje, motor, brazo y mano',
    parts: TRANSHUMERAL_PARTS,
  },
  transradial: {
    src: transradialImg,
    alt: 'Prótesis transradial con suspensión, encaje y mano',
    parts: TRANSRADIAL_PARTS,
  },
}

function isLimbDiagram(id: string): id is LimbDiagram {
  return id === 'transfemoral' || id === 'transtibial' || id === 'transhumeral' || id === 'transradial'
}

type PartView = 'liner' | 'pie' | 'rodilla' | 'rodillas' | 'mano'
type DiagramView = 'liner' | 'pie' | 'rodilla' | 'mano'

type CatalogItem = {
  id: string
  name: string
  summary: string
  mobility: string
  weight: string
  image: string
}

const FEET: CatalogItem[] = [
  {
    id: 'sach-1s49',
    name: 'SACH 1S49',
    summary: 'Baja actividad y estabilidad básica',
    mobility: '1 - 2',
    weight: '125 kg',
    image: pieImg,
  },
  {
    id: '1d10-dynamic',
    name: '1D10 Dynamic',
    summary: 'Baja a moderada actividad',
    mobility: '1 - 2',
    weight: '150 kg',
    image: pieImg,
  },
  {
    id: 'terion-1c10',
    name: 'Terion 1C10',
    summary: 'Actividad moderada y uso cotidiano',
    mobility: '2 - 3',
    weight: '125 kg',
    image: pieImg,
  },
  {
    id: 'trias-1c30-1',
    name: 'Trias 1C30-1',
    summary: 'Actividad moderada y marcha estable',
    mobility: '2 - 3',
    weight: '125 kg',
    image: pieImg,
  },
]

const KNEES: CatalogItem[] = [
  {
    id: '3r90',
    name: '3R90',
    summary: 'Rodilla mecánica monocéntrica con freno',
    mobility: '1 - 2',
    weight: '125 kg',
    image: rodillaImg,
  },
  {
    id: '3r95',
    name: '3R95',
    summary: 'Alta actividad y marcha dinámica',
    mobility: '3 - 4',
    weight: '125 kg',
    image: rodillaImg,
  },
  {
    id: '3r78',
    name: '3R78',
    summary: 'Rodilla mecánica policéntrica',
    mobility: '2 - 3',
    weight: '100 kg',
    image: rodillaImg,
  },
  {
    id: '3b1-3',
    name: '3B1-3',
    summary: 'Rodilla Genium',
    mobility: '2 - 4',
    weight: '150 kg',
    image: rodillaImg,
  },
]

function PartCatalog({
  items,
  initialId,
  label,
}: {
  items: CatalogItem[]
  initialId: string
  label: (name: string) => string
}) {
  const [itemId, setItemId] = useState(initialId)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const current = items.find((item) => item.id === itemId) ?? items[0]
  const index = Math.max(0, items.findIndex((item) => item.id === current.id))

  useEffect(() => {
    const start = Math.max(0, items.findIndex((item) => item.id === initialId))
    optionRefs.current[start]?.focus({ preventScroll: true })
  }, [initialId, items])

  function choose(nextIndex: number) {
    const next = items[nextIndex]
    if (!next) return
    setItemId(next.id)
    optionRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="protesis-pies">
      <img className="protesis-pies__photo" src={current.image} alt={label(current.name)} />
      <div className="protesis-pies__list">
        {items.map((item, itemIndex) => {
          const selected = item.id === current.id
          return (
            <button
              key={item.id}
              ref={(node) => {
                optionRefs.current[itemIndex] = node
              }}
              type="button"
              className={`protesis-pies__item${selected ? ' is-selected' : ''}`}
              aria-pressed={selected}
              onClick={() => setItemId(item.id)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  choose(Math.min(itemIndex + 1, items.length - 1))
                }
                if (event.key === 'ArrowUp') {
                  event.preventDefault()
                  choose(Math.max(itemIndex - 1, 0))
                }
              }}
            >
              <span className="protesis-pies__main">
                <span className="protesis-pies__name">{item.name}</span>
                <span className="protesis-pies__summary">{item.summary}</span>
              </span>
              <span className="protesis-pies__specs">
                <span className="protesis-pies__spec">
                  <span className="protesis-pies__label">Movilidad</span>
                  <span className="protesis-pies__value">{item.mobility}</span>
                </span>
                <span className="protesis-pies__spec">
                  <span className="protesis-pies__label">Peso corporal</span>
                  <span className="protesis-pies__value">{item.weight}</span>
                </span>
              </span>
            </button>
          )
        })}
      </div>
      <div className="protesis-pies__rail" aria-hidden="true">
        <span
          className="protesis-pies__rail-dot"
          style={{ ['--i' as string]: String(index), ['--n' as string]: String(items.length) }}
        />
      </div>
    </div>
  )
}

const HANDS = [
  {
    id: 'myofacil',
    name: 'Myofacil',
    text: 'Prótesis mioeléctrica que utiliza señales musculares para controlar el movimiento de la mano mediante electrodos integrados en el socket.',
    image: myofacilImg,
  },
  {
    id: 'acces',
    name: 'Acces',
    text: 'Solución mioeléctrica con movimiento individual de los dedos y diferentes posibilidades de agarre para actividades funcionales.',
    image: accesImg,
  },
  {
    id: 'mecanico',
    name: 'Mecánico',
    text: 'Prótesis controlada mediante un sistema de arnés y cable que permite accionar el dispositivo terminal con movimientos corporales.',
    image: mecanicoImg,
  },
]

function HandMenu() {
  const [handId, setHandId] = useState(HANDS[0].id)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const current = HANDS.find((hand) => hand.id === handId) ?? HANDS[0]

  useEffect(() => {
    optionRefs.current[0]?.focus({ preventScroll: true })
  }, [])

  function choose(nextIndex: number) {
    const next = HANDS[nextIndex]
    if (!next) return
    setHandId(next.id)
    optionRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="protesis-manos">
      <img className="protesis-manos__photo" src={current.image} alt={`Mano ${current.name}`} />
      <div className="protesis-manos__panel">
        <h3 className="protesis-manos__title">Mano</h3>
        <div className="protesis-manos__list">
          {HANDS.map((hand, handIndex) => {
            const selected = hand.id === current.id
            return (
              <button
                key={hand.id}
                ref={(node) => {
                  optionRefs.current[handIndex] = node
                }}
                type="button"
                className={`protesis-manos__item${selected ? ' is-open' : ''}`}
                aria-expanded={selected}
                onClick={() => setHandId(hand.id)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    choose(Math.min(handIndex + 1, HANDS.length - 1))
                  }
                  if (event.key === 'ArrowUp') {
                    event.preventDefault()
                    choose(Math.max(handIndex - 1, 0))
                  }
                }}
              >
                <span className="protesis-manos__name">{hand.name}</span>
                <span className="protesis-manos__detail" aria-hidden={!selected}>
                  <span>{hand.text}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function staysOnPoint(id: string, event: PointerEvent | FocusEvent) {
  const next = event.relatedTarget
  return next instanceof Element && next.closest(`[data-point="${id}"]`) !== null
}

function ProsthesisDetail({
  diagram,
  parts,
  open,
  view,
  show,
  hide,
  toggle,
  onOpenView,
  onBack,
}: {
  diagram: LimbDiagram
  parts: Part[]
  open: string | null
  view: PartView | null
  show: (id: string) => void
  hide: (id: string, event: PointerEvent | FocusEvent) => void
  toggle: (id: string) => void
  onOpenView: (view: PartView) => void
  onBack: () => void
}) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const partRefs = useRef<Partial<Record<DiagramView, HTMLButtonElement | null>>>({})
  const returnTo = useRef<DiagramView | null>(null)

  useEffect(() => {
    if (view === 'liner' || view === 'rodilla') {
      returnTo.current = view
      titleRef.current?.focus({ preventScroll: true })
      return
    }
    if (view === 'pie') {
      returnTo.current = 'pie'
      return
    }
    if (view === 'mano') {
      returnTo.current = 'mano'
      return
    }
    if (view === 'rodillas') return
    if (returnTo.current) {
      partRefs.current[returnTo.current]?.focus({ preventScroll: true })
      returnTo.current = null
    }
  }, [view])

  const liner = view === 'liner'
  const rodilla = view === 'rodilla'
  const catalog = view === 'pie' || view === 'rodillas'
  const hands = view === 'mano'
  const showingParts = !liner && !rodilla && !catalog && !hands

  return (
    <div
      className={`protesis-partes${liner || rodilla ? ' is-liner' : ''}${catalog ? ' is-pie' : ''}${hands ? ' is-mano' : ''}${rodilla ? ' is-rodilla' : ''}${showingParts && diagram === 'transfemoral' ? ' is-transfemoral' : ''}`}
    >
      <button type="button" className="protesis-partes__back" aria-label="Volver" onClick={onBack}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M14.5 6.5 9 12l5.5 5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="protesis-partes__stage">
        {hands ? (
          <HandMenu />
        ) : catalog ? (
          <PartCatalog
            key={view}
            items={view === 'pie' ? FEET : KNEES}
            initialId={view === 'pie' ? FEET[0].id : '3r95'}
            label={(name) => (view === 'pie' ? `Pie protésico ${name}` : `Rodilla protésica ${name}`)}
          />
        ) : (
        <>
        <div className="protesis-partes__figure">
          <img
            className="protesis-partes__photo"
            src={liner || rodilla ? linerImg : DIAGRAMS[diagram].src}
            alt={
              rodilla
                ? 'Prótesis transfemoral con la rodilla señalada'
                : liner
                  ? 'Prótesis transfemoral con el liner sobre el encaje'
                  : DIAGRAMS[diagram].alt
            }
          />
          {rodilla ? <span className="protesis-rodilla__pulse" aria-hidden="true" /> : null}
        </div>
        {liner ? (
          <div className="protesis-liner" role="region" aria-labelledby="protesis-liner-title">
            <div className="protesis-liner__copy">
              <h3 id="protesis-liner-title" className="protesis-liner__title" tabIndex={-1} ref={titleRef}>
                Liner
              </h3>
              <p className="protesis-liner__text">
                Interfaz que se coloca entre la piel y el encaje para ayudar a proteger el muñón,
                mejorar el ajuste y facilitar el uso de la prótesis.
              </p>
            </div>
            <img
              className="protesis-liner__products"
              src={linerElementsImg}
              alt="Liners de distintas formas y materiales"
            />
          </div>
        ) : rodilla ? (
          <div className="protesis-liner" role="region" aria-labelledby="protesis-rodilla-title">
            <div className="protesis-liner__copy">
              <h3 id="protesis-rodilla-title" className="protesis-liner__title" tabIndex={-1} ref={titleRef}>
                Rodilla
              </h3>
              <p className="protesis-liner__text">
                Componente que sustituye la función de la articulación, y ayuda a controlar
                estabilidad, flexión y movimiento durante la marcha.
              </p>
              <button type="button" className="protesis-rodilla__cta" onClick={() => onOpenView('rodillas')}>
                Ver algunos de nuestros modelos
              </button>
            </div>
          </div>
        ) : (
          parts.map((part) => {
            const viewId: DiagramView | null =
              part.id === 'liner'
                ? 'liner'
                : part.id === 'pie'
                  ? 'pie'
                  : part.id === 'rodillas'
                    ? 'rodilla'
                    : part.id === 'mano'
                      ? 'mano'
                      : null
            const interactive = Boolean(part.text)
            const active = interactive && open === part.id
            return (
              <div
                key={part.id}
                className={`protesis-partes__item protesis-partes__item--${part.side}${active ? ' is-open' : ''}${interactive ? ' is-interactive' : ''}`}
                style={{ top: part.top, ['--edge' as string]: part.edge }}
                data-point={part.id}
                onPointerEnter={(event) => {
                  if (interactive && event.pointerType === 'mouse') show(part.id)
                }}
                onPointerLeave={(event) => {
                  if (interactive) hide(part.id, event)
                }}
              >
                <span className="protesis-partes__line" aria-hidden="true" />
                <div className="protesis-partes__copy">
                  {viewId || interactive ? (
                    <button
                      ref={(node) => {
                        if (viewId) partRefs.current[viewId] = node
                      }}
                      type="button"
                      className="protesis-partes__name"
                      aria-expanded={interactive ? active : undefined}
                      aria-controls={interactive ? `${part.id}-text` : undefined}
                      onPointerUp={(event) => {
                        if (viewId || event.pointerType === 'mouse') return
                        toggle(part.id)
                      }}
                      onFocus={() => {
                        if (interactive) show(part.id)
                      }}
                      onBlur={(event) => {
                        if (interactive) hide(part.id, event)
                      }}
                      onClick={(event) => {
                        if (viewId) {
                          onOpenView(viewId)
                          return
                        }
                        if (event.detail !== 0) return
                        show(part.id)
                      }}
                    >
                      {part.title}
                    </button>
                  ) : (
                    <span className="protesis-partes__name">{part.title}</span>
                  )}
                  {part.text ? (
                    <div className="protesis-tipos__detail" id={`${part.id}-text`} aria-hidden={!active}>
                      <p>{part.text}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })
        )}
        </>
        )}
      </div>
    </div>
  )
}

export function ProtesisTipos() {
  const [member, setMember] = useState<Member>('inferior')
  const [open, setOpen] = useState<string | null>(null)
  const [diagram, setDiagram] = useState<LimbDiagram>('transfemoral')
  const [detail, setDetail] = useState<null | 'parts' | PartView>(null)
  const limb = LIMBS[member]
  const showDetail = detail !== null

  function selectMember(next: Member) {
    setMember(next)
    setOpen(null)
    setDetail(null)
  }

  function openDiagram(next: LimbDiagram) {
    setDiagram(next)
    setDetail('parts')
    setOpen(null)
  }

  function show(id: string) {
    setOpen(id)
  }

  function hide(id: string, event: PointerEvent | FocusEvent) {
    if (staysOnPoint(id, event)) return
    setOpen((current) => (current === id ? null : current))
  }

  return (
    <section className="section section--narrow protesis-tipos" aria-labelledby="protesis-tipos-title">
      <div className="section__inner">
        <div className="protesis-tipos__intro">
          <p className="protesis-tipos__eyebrow">Tecnología de punta</p>
          <h2 id="protesis-tipos-title">Conoce nuestros tipos de prótesis</h2>
          <p className="protesis-tipos__lead">
            Trabajamos con componentes de fabricantes especializados en tecnología protésica para
            construir configuraciones de acuerdo con las características y necesidades de cada
            paciente.
          </p>
        </div>

        <div className="protesis-tipos__switch" role="tablist" aria-label="Tipo de miembro">
          <button
            type="button"
            role="tab"
            id="protesis-tab-inferior"
            aria-selected={member === 'inferior'}
            aria-controls="protesis-panel-inferior"
            className={member === 'inferior' ? 'is-active' : undefined}
            onClick={() => selectMember('inferior')}
          >
            Miembro Inferior
          </button>
          <button
            type="button"
            role="tab"
            id="protesis-tab-superior"
            aria-selected={member === 'superior'}
            aria-controls="protesis-panel-superior"
            className={member === 'superior' ? 'is-active' : undefined}
            onClick={() => selectMember('superior')}
          >
            Miembro Superior
          </button>
        </div>

        {showDetail ? (
          <ProsthesisDetail
            diagram={diagram}
            parts={DIAGRAMS[diagram].parts}
            open={open}
            view={
              detail === 'liner' ||
              detail === 'pie' ||
              detail === 'rodilla' ||
              detail === 'rodillas' ||
              detail === 'mano'
                ? detail
                : null
            }
            show={show}
            hide={hide}
            toggle={(id) => setOpen((current) => (current === id ? null : id))}
            onOpenView={(next) => {
              setDetail(next)
              setOpen(null)
            }}
            onBack={() => {
              if (detail === 'rodillas') {
                setDetail('rodilla')
                return
              }
              if (detail === 'liner' || detail === 'pie' || detail === 'rodilla' || detail === 'mano') {
                setDetail('parts')
                return
              }
              setDetail(null)
              setOpen(null)
            }}
          />
        ) : (
        <div
          className={`protesis-tipos__map protesis-tipos__map--${member}`}
          id={limb.panelId}
          role="tabpanel"
          aria-labelledby={limb.tabId}
        >
            <div className="protesis-tipos__figure">
              <img className="protesis-tipos__leg" src={limb.src} alt={limb.alt} />
              {limb.points.map((point) => {
                const active = open === point.id
                return (
                  <button
                    key={point.id}
                    type="button"
                    className={active ? 'protesis-tipos__dot is-open' : 'protesis-tipos__dot'}
                    style={{ top: point.top, left: point.left }}
                    data-point={point.id}
                    aria-expanded={active}
                    aria-controls={`${point.id}-text`}
                    aria-label={point.title}
                    onPointerEnter={(event) => {
                      if (event.pointerType === 'mouse') show(point.id)
                    }}
                    onPointerLeave={(event) => hide(point.id, event)}
                    onPointerUp={(event) => {
                      if (isLimbDiagram(point.id) && event.pointerType !== 'mouse') {
                        openDiagram(point.id)
                        return
                      }
                      if (event.pointerType === 'mouse') return
                      setOpen((current) => (current === point.id ? null : point.id))
                    }}
                    onFocus={() => show(point.id)}
                    onBlur={(event) => hide(point.id, event)}
                    onClick={(event) => {
                      if (isLimbDiagram(point.id)) {
                        openDiagram(point.id)
                        return
                      }
                      if (event.detail !== 0) return
                      show(point.id)
                    }}
                  />
                )
              })}
            </div>
            {limb.points.map((point) => {
              const active = open === point.id
              return (
                <div
                  key={point.id}
                  className={`protesis-tipos__callout protesis-tipos__callout--${point.side}${active ? ' is-open' : ''}`}
                  style={{ top: point.top }}
                  data-point={point.id}
                  onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse') show(point.id)
                  }}
                  onPointerLeave={(event) => hide(point.id, event)}
                >
                  <button
                    type="button"
                    className="protesis-tipos__name"
                    aria-expanded={active}
                    aria-controls={`${point.id}-text`}
                    onPointerUp={(event) => {
                      if (isLimbDiagram(point.id) && event.pointerType !== 'mouse') {
                        openDiagram(point.id)
                        return
                      }
                      if (event.pointerType === 'mouse') return
                      setOpen((current) => (current === point.id ? null : point.id))
                    }}
                    onFocus={() => show(point.id)}
                    onBlur={(event) => hide(point.id, event)}
                    onClick={(event) => {
                      if (isLimbDiagram(point.id)) {
                        openDiagram(point.id)
                        return
                      }
                      if (event.detail !== 0) return
                      show(point.id)
                    }}
                  >
                    {point.title}
                  </button>
                  <div className="protesis-tipos__detail" id={`${point.id}-text`} aria-hidden={!active}>
                    <p>{point.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
