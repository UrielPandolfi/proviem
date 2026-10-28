import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { FocusEvent, PointerEvent } from 'react'
import piernaImg from '../assets/protesis/pierna1.png'
import brazoImg from '../assets/protesis/brazo1.png'
import transfemoralImg from '../assets/protesis/transfemoral.png'
import transtibialImg from '../assets/protesis/transtibial.png'
import transhumeralImg from '../assets/protesis/transhumeral.png'
import transradialImg from '../assets/protesis/transradial.png'
import desarticulacionCaderaImg from '../assets/protesis/desarticulacion-cadera.png'
import desarticulacionHombroImg from '../assets/protesis/desarticulacion-hombro.png'
import linerImg from '../assets/protesis/liner.png'
import rodillaImg from '../assets/protesis/rodilla.png'
import bolsaColocacionImg from '../assets/protesis/bolsa-colocacion.png'
import skeoSealingImg from '../assets/protesis/liners/skeo-sealing.png'
import skeoSkinguardImg from '../assets/protesis/liners/skeo-skinguard.png'
import myolinoWristImg from '../assets/protesis/COPLE/MyolinoWrist 2000.png'
import myoWristTranscarpalImg from '../assets/protesis/COPLE/MyoWrist Transcarpal.png'
import electricWristImg from '../assets/protesis/COPLE/Electric wrist rotator.png'
import disconnectAdapterImg from '../assets/protesis/COPLE/O.B. Disconnect Adapter.png'
import ergoArmImg from '../assets/protesis/codos/ ErgoArm.png'
import elbowSetupImg from '../assets/protesis/codos/Elbow Set-Up .png'
import ergoArmHybridImg from '../assets/protesis/codos/ErgoArm Hybrid plus.png'
import dynamicArmImg from '../assets/protesis/codos/DynamicArm.png'
import linerElementsImg from '../assets/protesis/liner-elements.png'
import pieSach from '../assets/protesis/PROTESIS/PIE-20261020T214524Z-1-001/PIE/SACH 1549.png'
import pie1d10 from '../assets/protesis/PROTESIS/PIE-20261020T214524Z-1-001/PIE/1D10 Dynamic.png'
import pieTerion from '../assets/protesis/PROTESIS/PIE-20261020T214524Z-1-001/PIE/Terion 1D10.png'
import pieTrias from '../assets/protesis/PROTESIS/PIE-20261020T214524Z-1-001/PIE/Trias 1C30-1.png'
import pieTaleo from '../assets/protesis/PROTESIS/PIE-20261020T214524Z-1-001/PIE/TALEO 1c50.png'
import pieTriton from '../assets/protesis/PROTESIS/PIE-20261020T214524Z-1-001/PIE/TRITON 1C60.png'
import pieTritonHeavy from '../assets/protesis/PROTESIS/PIE-20261020T214524Z-1-001/PIE/TROTON HEAVY DUTY 1C64.png'
import pieTritonHarmony from '../assets/protesis/PROTESIS/PIE-20261020T214524Z-1-001/PIE/TRITON HARMONY 1C62.png'
import rodillaF01 from '../assets/protesis/rodillas/f01.png'
import rodilla3r20 from '../assets/protesis/rodillas/3r20.png'
import rodillaF05 from '../assets/protesis/rodillas/f05.png'
import rodilla6h23 from '../assets/protesis/rodillas/6h23.png'
import rodilla3r78 from '../assets/protesis/rodillas/3r78.png'
import rodilla3r106 from '../assets/protesis/rodillas/3r106.png'
import rodilla3r60 from '../assets/protesis/rodillas/3r60.png'
import rodilla6h30 from '../assets/protesis/rodillas/6h30.png'
import rodilla3r80 from '../assets/protesis/rodillas/3r80.png'
import rodillaRheo from '../assets/protesis/rodillas/rheo.png'
import rodillaCleg from '../assets/protesis/rodillas/c-leg-4.png'
import rodillaNavii from '../assets/protesis/rodillas/navii.png'
import rodillaGenium from '../assets/protesis/rodillas/genium.png'
import rodillaGeniumX4 from '../assets/protesis/rodillas/genium-x4.png'
import rodillaPowerKnee from '../assets/protesis/rodillas/power-knee.png'
import myofacilImg from '../assets/protesis/myofacil.png'
import accesImg from '../assets/protesis/acces.png'
import mecanicoImg from '../assets/protesis/mecanico.png'
import './ProtesisTipos.css'

const IMAGE_SIZE: Record<string, { width: number; height: number }> = {
  [piernaImg]: { width: 322, height: 670 },
  [brazoImg]: { width: 331, height: 640 },
  [transfemoralImg]: { width: 336, height: 698 },
  [transtibialImg]: { width: 335, height: 697 },
  [transhumeralImg]: { width: 337, height: 634 },
  [transradialImg]: { width: 379, height: 659 },
  [desarticulacionCaderaImg]: { width: 475, height: 661 },
  [desarticulacionHombroImg]: { width: 1024, height: 1536 },
  [linerImg]: { width: 336, height: 698 },
  [rodillaImg]: { width: 336, height: 698 },
  [linerElementsImg]: { width: 642, height: 329 },
}

const readyImages = new Set<string>()
const inflightImages = new Map<string, Promise<void>>()

function whenImageReady(src: string): Promise<void> {
  if (readyImages.has(src)) return Promise.resolve()
  const pending = inflightImages.get(src)
  if (pending) return pending
  const promise = new Promise<void>((resolve) => {
    const img = new Image()
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      readyImages.add(src)
      resolve()
    }
    img.onload = () => {
      if (typeof img.decode === 'function') void img.decode().then(finish, finish)
      else finish()
    }
    img.onerror = finish
    img.src = src
  })
  inflightImages.set(src, promise)
  void promise.then(() => {
    inflightImages.delete(src)
  })
  return promise
}

function whenImagesReady(srcs: string[]): Promise<void> {
  return new Promise((resolve) => {
    const finish = () => resolve()
    const timeout = window.setTimeout(finish, 5000)
    void Promise.all(srcs.map(whenImageReady)).then(() => {
      window.clearTimeout(timeout)
      finish()
    })
  })
}

function useHeldImage(src?: string) {
  const [shown, setShown] = useState(src)

  useEffect(() => {
    if (!src) {
      setShown(undefined)
      return
    }
    let active = true
    void whenImageReady(src).then(() => {
      if (active) setShown(src)
    })
    return () => {
      active = false
    }
  }, [src])

  return shown
}

type Member = 'inferior' | 'superior'

type Point = {
  id: string
  title: string
  text: string
  placement: 'top-left' | 'bottom-left' | 'right'
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
        id: 'desarticulacion-cadera',
        title: 'Desarticulación de cadera',
        text: 'Amputación realizada a nivel de la articulación de la cadera. En este nivel, la pelvis participa en el control de la prótesis.',
        placement: 'top-left',
        top: '13%',
        left: '24%',
      },
      {
        id: 'transfemoral',
        title: 'Transfemoral',
        text: 'Opciones protésicas para amputaciones arriba de la rodilla, con configuraciones de rodilla y pie según la movilidad y necesidades de cada persona.',
        placement: 'right',
        top: '28%',
        left: '76%',
      },
      {
        id: 'transtibial',
        title: 'Transtibial',
        text: 'Soluciones para amputaciones debajo de la rodilla, enfocadas en ajuste, estabilidad y respuesta durante la marcha.',
        placement: 'bottom-left',
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
        id: 'desarticulacion-hombro',
        title: 'Desarticulación de hombro',
        text: 'En este caso, la amputación se realiza en la zona donde el húmero se une con la clavícula y la escápula.',
        placement: 'top-left',
        top: '16%',
        left: '38%',
      },
      {
        id: 'transhumeral',
        title: 'Transhumeral',
        text: 'Opciones protésicas para amputaciones arriba del codo, configuradas de acuerdo con las necesidades funcionales y el tipo de control requerido.',
        placement: 'right',
        top: '34%',
        left: '75%',
      },
      {
        id: 'transradial',
        title: 'Transradial',
        text: 'Opciones protésicas para amputaciones abajo del codo, con alternativas mecánicas y mioeléctricas según la función que se requiera.',
        placement: 'bottom-left',
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
  asButton?: boolean
  linkView?: 'codos'
  more?: boolean
  moreView?: 'coples'
}

const SOCKET_TEXT =
  'Estructura personalizada que se adapta al muñón y sirve como punto de unión entre el usuario y los componentes de la prótesis.'

type LimbDiagram =
  | 'transfemoral'
  | 'transtibial'
  | 'transhumeral'
  | 'transradial'
  | 'desarticulacion-cadera'
  | 'desarticulacion-hombro'

const TRANSFEMORAL_PARTS: Part[] = [
  {
    id: 'socket',
    title: 'Socket / Encaje',
    text: SOCKET_TEXT,
    side: 'right',
    top: '32%',
    edge: 0.78,
  },
  { id: 'rodillas', title: 'Rodillas', side: 'right', top: '55%', edge: 0.87 },
  { id: 'pie', title: 'Pie', side: 'right', top: '81%', edge: 0.56 },
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
  { id: 'pie', title: 'Pie', side: 'left', top: '83%', edge: 0.44 },
]

const TRANSHUMERAL_PARTS: Part[] = [
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
    title: 'Codo',
    asButton: true,
    linkView: 'codos',
    side: 'left',
    top: '46%',
    edge: 0.57,
  },
  {
    id: 'brazo',
    title: 'Cople',
    text: 'Componente que une y asegura las partes de la prótesis de brazo, proporcionando estabilidad y alineación durante su uso.',
    more: true,
    moreView: 'coples',
    side: 'right',
    top: '66%',
    edge: 0.57,
  },
  { id: 'mano', title: 'Mano', side: 'left', top: '82%', edge: 0.18 },
]

const TRANSRADIAL_PARTS: Part[] = [
  {
    id: 'socket',
    title: 'Socket',
    text: SOCKET_TEXT,
    side: 'right',
    top: '61%',
    edge: 0.68,
  },
  { id: 'mano', title: 'Mano', side: 'left', top: '75%', edge: 0.34 },
]

const SHOULDER_PARTS: Part[] = [
  {
    id: 'socket',
    title: 'Socket',
    text: 'Estructura personalizada que se adapta a la zona del hombro y torso, y sirve como punto de unión entre el usuario y los componentes de la prótesis.',
    side: 'left',
    top: '12%',
    edge: 0.43,
  },
  {
    id: 'codo',
    title: 'Codo',
    asButton: true,
    linkView: 'codos',
    side: 'right',
    top: '46%',
    edge: 0.78,
  },
  {
    id: 'cople',
    title: 'Cople',
    text: 'Componente que une y asegura las partes de la prótesis de brazo, proporcionando estabilidad y alineación durante su uso.',
    more: true,
    moreView: 'coples',
    side: 'left',
    top: '68%',
    edge: 0.36,
  },
  { id: 'mano', title: 'Mano', side: 'right', top: '82%', edge: 0.28 },
]

const HIP_DISARTICULATION_PARTS: Part[] = [
  {
    id: 'socket',
    title: 'Socket / Encaje',
    text: 'Integra la zona pélvica y conecta la prótesis al cuerpo.',
    side: 'right',
    top: '12%',
    edge: 0.7,
  },
  {
    id: 'articulacion-cadera',
    title: 'Articulación de cadera',
    text: 'Permite el movimiento y ayuda durante la marcha.',
    side: 'right',
    top: '31%',
    edge: 0.7,
  },
  { id: 'rodillas', title: 'Rodillas', side: 'right', top: '53%', edge: 0.7 },
  { id: 'pie', title: 'Pie', side: 'left', top: '89%', edge: 0.62 },
]

const DIAGRAMS: Record<LimbDiagram, { src: string; alt: string; parts: Part[] }> = {
  'desarticulacion-cadera': {
    src: desarticulacionCaderaImg,
    alt: 'Prótesis para desarticulación de cadera con encaje, articulación de cadera, rodilla y pie',
    parts: HIP_DISARTICULATION_PARTS,
  },
  'desarticulacion-hombro': {
    src: desarticulacionHombroImg,
    alt: 'Prótesis para desarticulación de hombro con encaje, codo, cople y mano',
    parts: SHOULDER_PARTS,
  },
  transfemoral: {
    src: transfemoralImg,
    alt: 'Prótesis transfemoral con encaje, rodilla y pie',
    parts: TRANSFEMORAL_PARTS,
  },
  transtibial: {
    src: transtibialImg,
    alt: 'Prótesis transtibial con liner, encaje y pie',
    parts: TRANSTIBIAL_PARTS,
  },
  transhumeral: {
    src: transhumeralImg,
    alt: 'Prótesis transhumeral con encaje, codo, cople y mano',
    parts: TRANSHUMERAL_PARTS,
  },
  transradial: {
    src: transradialImg,
    alt: 'Prótesis transradial con encaje y mano',
    parts: TRANSRADIAL_PARTS,
  },
}

function isLimbDiagram(id: string): id is LimbDiagram {
  return Object.prototype.hasOwnProperty.call(DIAGRAMS, id)
}

type PartView = 'liner' | 'pie' | 'rodilla' | 'rodillas' | 'mano' | 'bolsa' | 'liners' | 'coples' | 'codos'
type DiagramView = 'liner' | 'pie' | 'rodilla' | 'mano'

type CatalogSpec = {
  label: string
  value: string
}

type CatalogItem = {
  id: string
  name: string
  summary: string
  activity?: string
  mobility: string
  weight: string
  specs?: CatalogSpec[]
  aside?: string
  image?: string
}

const FEET: CatalogItem[] = [
  {
    id: 'sach-1s49',
    name: 'SACH 1S49',
    summary: 'Pie protésico SACH',
    activity: 'Baja actividad y estabilidad básica',
    mobility: '1 - 2',
    weight: '125 kg',
    image: pieSach,
  },
  {
    id: '1d10-dynamic',
    name: '1D10 Dynamic',
    summary: 'Pie protésico dinámico',
    activity: 'Baja a moderada actividad',
    mobility: '1 - 2',
    weight: '150 kg',
    image: pie1d10,
  },
  {
    id: 'terion-1c10',
    name: 'Terion 1C10',
    summary: 'Pie protésico de material compuesto',
    activity: 'Actividad moderada y uso cotidiano',
    mobility: '2 - 3',
    weight: '125 kg',
    image: pieTerion,
  },
  {
    id: 'trias-1c30-1',
    name: 'Trias 1C30 1',
    summary: 'Pie protésico de material compuesto',
    activity: 'Actividad moderada y marcha estable',
    mobility: '2 - 3',
    weight: '125 kg',
    image: pieTrias,
  },
  {
    id: 'taleo-1c50',
    name: 'Taleo 1C50',
    summary: 'Pie protésico de material compuesto',
    activity: 'Actividad alta y terrenos variados',
    mobility: '2 - 4',
    weight: '150 kg',
    image: pieTaleo,
  },
  {
    id: 'triton-1c60',
    name: 'Triton 1C60',
    summary: 'Pie protésico de material compuesto',
    activity: 'Alta actividad y mayor dinamismo',
    mobility: '3 - 4',
    weight: 'Hasta 150 kg*',
    image: pieTriton,
  },
  {
    id: 'triton-1c64',
    name: 'Triton Heavy Duty 1C64',
    summary: 'Pie protésico de material compuesto',
    activity: 'Alta actividad y uso exigente',
    mobility: '3 - 4',
    weight: '150 kg',
    image: pieTritonHeavy,
  },
  {
    id: 'triton-1c62',
    name: 'Triton Harmony 1C62',
    summary: 'Pie protésico con sistema de vacío',
    activity: 'Alta actividad y sujeción dinámica',
    mobility: '3 - 4',
    weight: 'Hasta 150 kg*',
    image: pieTritonHarmony,
  },
]

const LINERS: CatalogItem[] = [
  {
    id: 'skeo-sealing',
    name: 'SKEO Sealing',
    summary: 'Amputación transfemoral y suspensión por sellado/vacío',
    mobility: '',
    weight: '',
    specs: [
      { label: 'Material', value: 'Silicon' },
      { label: 'Peso corporal', value: '125 kg' },
    ],
    image: skeoSealingImg,
  },
  {
    id: 'skeo-skinguard',
    name: 'Liner SKEO Skinguard',
    summary: 'Amputación transfemoral con conexión distal y matriz continua',
    mobility: '',
    weight: '',
    specs: [{ label: 'Liner de silicona', value: 'con bloqueo' }],
    image: skeoSkinguardImg,
  },
]

const WRISTS: CatalogItem[] = [
  {
    id: 'myolino-wrist-2000',
    name: 'MyolinoWrist 2000',
    summary: '',
    aside: 'Muñeca mecánica pediátrica',
    activity: 'Hasta 30° de flexión en combinación con rotación · 50 g · longitud 40 mm',
    mobility: '',
    weight: '',
    image: myolinoWristImg,
  },
  {
    id: 'myowrist-transcarpal',
    name: 'MyoWrist Transcarpal',
    summary: '',
    aside: 'Muñeca transcarpal',
    activity: '5 posiciones de –40° a +40° · pronación/supinación pasiva · 85–89 g',
    mobility: '',
    weight: '',
    image: myoWristTranscarpalImg,
  },
  {
    id: 'electric-wrist-rotator',
    name: 'Electric wrist rotator',
    summary: '',
    aside: 'Rotador eléctrico de muñeca',
    activity: 'Rotación >360° · 13.5 rpm · 96 g',
    mobility: '',
    weight: '',
    image: electricWristImg,
  },
  {
    id: 'ob-disconnect-adapter',
    name: 'O.B. Disconnect Adapter',
    summary: '',
    aside: 'Adaptador de desconexión',
    activity: 'Diámetro exterior 44 mm · vástago estándar Ø13 mm',
    mobility: '',
    weight: '',
    image: disconnectAdapterImg,
  },
]

const ELBOWS: CatalogItem[] = [
  {
    id: 'ergoarm-12k41',
    name: 'ErgoArm 12K41',
    summary: '',
    aside: 'Codo mecánico',
    activity: 'Bloqueo continuo bajo carga hasta 230 N con antebrazo de 305 mm',
    mobility: '',
    weight: '',
    image: ergoArmImg,
  },
  {
    id: 'elbow-set-up',
    name: 'Elbow Set-Up',
    summary: '',
    aside: 'Codo mecánico',
    activity: '13 posiciones de bloqueo en incrementos aprox. de 8°',
    mobility: '',
    weight: '',
    image: elbowSetupImg,
  },
  {
    id: 'ergoarm-hybrid-plus',
    name: 'ErgoArm Hybrid plus',
    summary: '',
    aside: 'Codo híbrido',
    activity: 'AFB + Easy Plug · bloqueo mecánico mediante correaje de tracción',
    mobility: '',
    weight: '',
    image: ergoArmHybridImg,
  },
  {
    id: 'dynamicarm-12k100n',
    name: 'DynamicArm 12K100N',
    summary: '',
    aside: 'Codo motorizado',
    activity: 'Fuerza máx. de elevación 6 kg · flexión aprox. 15°–145°',
    mobility: '',
    weight: '',
    image: dynamicArmImg,
  },
]

const KNEES: CatalogItem[] = [
  {
    id: 'f01',
    name: 'F01',
    summary: 'Fénix · Mecánica policéntrica',
    activity: 'Gama económica',
    mobility: '1 - 2',
    weight: '100 kg',
    image: rodillaF01,
  },
  {
    id: '3r20',
    name: '3R20',
    summary: 'Ottobock · Mecánica',
    activity: 'Gama básica',
    mobility: '1 - 2',
    weight: '100 kg',
    image: rodilla3r20,
  },
  {
    id: 'f05',
    name: 'F05',
    summary: 'Fénix · Policéntrica neumática',
    activity: 'Gama accesible',
    mobility: '3 - 4',
    weight: '100 kg',
    image: rodillaF05,
  },
  {
    id: '6h23',
    name: '6H23',
    summary: 'Metiz · Policéntrica neumática',
    activity: 'Gama intermedia',
    mobility: '2 - 3',
    weight: '100 kg',
    image: rodilla6h23,
  },
  {
    id: '3r78',
    name: '3R78',
    summary: 'Ottobock · Policéntrica neumática',
    activity: 'Gama intermedia · flexión 150°',
    mobility: '2 - 3',
    weight: '100 kg',
    image: rodilla3r78,
  },
  {
    id: '3r106',
    name: '3R106',
    summary: 'Ottobock · Policéntrica neumática',
    activity: 'Gama intermedia · flexión 172°',
    mobility: '2 - 3',
    weight: '100 kg',
    image: rodilla3r106,
  },
  {
    id: '3r60',
    name: '3R60',
    summary: 'Ottobock · Policéntrica hidráulica',
    activity: 'Gama intermedia alta',
    mobility: '2 - 3',
    weight: '125 kg',
    image: rodilla3r60,
  },
  {
    id: '6h30',
    name: '6H30',
    summary: 'Metiz · Monocéntrica hidráulica',
    activity: 'Gama intermedia alta · resistente al agua',
    mobility: '3 - 4',
    weight: '150 kg',
    image: rodilla6h30,
  },
  {
    id: '3r80',
    name: '3R80',
    summary: 'Ottobock · Hidráulica',
    activity: 'Gama intermedia alta · flexión 150°',
    mobility: '3 - 4',
    weight: '150 kg',
    image: rodilla3r80,
  },
  {
    id: 'rheo',
    name: 'Rheo',
    summary: 'Össur · Control por microprocesador',
    activity: 'Gama alta · IP34',
    mobility: 'K2 - K3',
    weight: '136 kg',
    image: rodillaRheo,
  },
  {
    id: 'c-leg-4',
    name: 'C-Leg 4',
    summary: 'Ottobock · Hidráulica con microprocesador',
    activity: 'Gama alta · IP68',
    mobility: '2 - 4',
    weight: '136 kg',
    image: rodillaCleg,
  },
  {
    id: 'navii',
    name: 'Navii',
    summary: 'Össur · Control por microprocesador',
    activity: 'Gama premium · IP68',
    mobility: 'K2 - K4',
    weight: '136 kg',
    image: rodillaNavii,
  },
  {
    id: 'genium',
    name: 'Genium',
    summary: 'Ottobock · Control por microprocesador',
    activity: 'Gama premium · IP67',
    mobility: '2 - 4',
    weight: '150 kg',
    image: rodillaGenium,
  },
  {
    id: 'genium-x4',
    name: 'Genium X4',
    summary: 'Ottobock · Control por microprocesador',
    activity: 'Gama premium · IP68',
    mobility: '2 - 4',
    weight: '150 kg',
    image: rodillaGeniumX4,
  },
  {
    id: 'power-knee',
    name: 'Power Knee',
    summary: 'Össur · Motorizada con microprocesador',
    activity: 'Gama premium motorizada · IP54',
    mobility: 'K3',
    weight: '116 kg',
    image: rodillaPowerKnee,
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
  const listRef = useRef<HTMLDivElement>(null)
  const [windowHeight, setWindowHeight] = useState<number>()
  const [progress, setProgress] = useState(0)
  const current = items.find((item) => item.id === itemId) ?? items[0]
  const index = Math.max(0, items.findIndex((item) => item.id === current.id))
  const heldImage = useHeldImage(current.image)
  const heldName = items.find((item) => item.image === heldImage)?.name ?? current.name

  useLayoutEffect(() => {
    const measure = () => {
      const buttons = optionRefs.current.filter((button): button is HTMLButtonElement => button !== null)
      const height = buttons.slice(0, 4).reduce((sum, button) => sum + button.offsetHeight, 0)
      setWindowHeight(height > 0 ? height : undefined)
    }
    measure()
    const observer = new ResizeObserver(measure)
    optionRefs.current.forEach((button) => {
      if (button) observer.observe(button)
    })
    return () => observer.disconnect()
  }, [items])

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const sync = () => {
      const max = list.scrollHeight - list.clientHeight
      if (max <= 1) {
        setProgress((index + 0.5) / Math.max(items.length, 1))
        return
      }
      setProgress(list.scrollTop / max)
    }
    sync()
    list.addEventListener('scroll', sync, { passive: true })
    return () => list.removeEventListener('scroll', sync)
  }, [index, items.length, windowHeight])

  useEffect(() => {
    const list = listRef.current
    const button = optionRefs.current[index]
    if (!list || !button) return
    const top = button.offsetTop
    const bottom = top + button.offsetHeight
    if (top < list.scrollTop) list.scrollTop = top
    else if (bottom > list.scrollTop + list.clientHeight + 1) {
      list.scrollTop = bottom - list.clientHeight
    }
  }, [index, windowHeight])

  useEffect(() => {
    const start = Math.max(0, items.findIndex((item) => item.id === initialId))
    optionRefs.current[start]?.focus({ preventScroll: true })
  }, [initialId, items])

  function choose(nextIndex: number) {
    const next = items[nextIndex]
    if (!next) return
    setItemId(next.id)
    optionRefs.current[nextIndex]?.focus({ preventScroll: true })
  }

  function scrollRail(clientY: number, rail: HTMLDivElement) {
    const list = listRef.current
    if (!list) return
    const rect = rail.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientY - rect.top) / Math.max(rect.height, 1)))
    list.scrollTop = ratio * (list.scrollHeight - list.clientHeight)
  }

  function onRailPointerDown(event: PointerEvent<HTMLDivElement>) {
    scrollRail(event.clientY, event.currentTarget)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onRailPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    scrollRail(event.clientY, event.currentTarget)
  }

  return (
    <div className="protesis-pies">
      <div className={`protesis-pies__photo${heldImage ? '' : ' is-empty'}`}>
        {heldImage ? <img src={heldImage} alt={label(heldName)} decoding="sync" /> : null}
      </div>
      <div className="protesis-pies__panel">
      <div className="protesis-pies__list" ref={listRef} style={windowHeight ? { maxHeight: windowHeight } : undefined}>
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
                {item.summary ? <span className="protesis-pies__summary">{item.summary}</span> : null}
                {item.activity ? <span className="protesis-pies__activity">{item.activity}</span> : null}
              </span>
              {item.aside ? (
                <span className="protesis-pies__aside">{item.aside}</span>
              ) : (
                <span className="protesis-pies__specs">
                  {(item.specs ?? [
                    { label: 'Movilidad', value: item.mobility },
                    { label: 'Peso corporal', value: item.weight },
                  ]).map((spec) => (
                    <span className="protesis-pies__spec" key={`${spec.label}-${spec.value}`}>
                      {spec.label ? <span className="protesis-pies__label">{spec.label}</span> : null}
                      <span className="protesis-pies__value">{spec.value}</span>
                    </span>
                  ))}
                </span>
              )}
            </button>
          )
        })}
      </div>
      <div
        className="protesis-pies__rail"
        aria-hidden="true"
        onPointerDown={onRailPointerDown}
        onPointerMove={onRailPointerMove}
      >
        <span className="protesis-pies__rail-dot" style={{ ['--p' as string]: String(progress) }} />
      </div>
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
  const heldImage = useHeldImage(current.image) ?? current.image
  const heldName = HANDS.find((hand) => hand.image === heldImage)?.name ?? current.name

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
      <div className="protesis-manos__frame">
        <img className="protesis-manos__photo" src={heldImage} alt={`Mano ${heldName}`} decoding="sync" />
      </div>
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
                <span className="protesis-manos__name">
                  {hand.name}
                  <ChevronIcon />
                </span>
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
    if (view === 'rodillas' || view === 'bolsa' || view === 'liners' || view === 'coples' || view === 'codos') return
    if (returnTo.current) {
      partRefs.current[returnTo.current]?.focus({ preventScroll: true })
      returnTo.current = null
    }
  }, [view])

  const liner = view === 'liner'
  const rodilla = view === 'rodilla'
  const catalog = view === 'pie' || view === 'rodillas' || view === 'liners' || view === 'coples' || view === 'codos'
  const hands = view === 'mano'
  const bolsa = view === 'bolsa'
  const showingParts = !liner && !rodilla && !catalog && !hands && !bolsa
  const photoSrc = rodilla ? rodillaImg : liner ? linerImg : DIAGRAMS[diagram].src
  const photoSize = IMAGE_SIZE[photoSrc]

  return (
    <div
      className={`protesis-partes${liner || rodilla ? ' is-liner' : ''}${catalog ? ' is-pie' : ''}${view === 'rodillas' ? ' is-rodillas' : ''}${view === 'liners' ? ' is-liners' : ''}${view === 'coples' ? ' is-coples' : ''}${view === 'codos' ? ' is-codos' : ''}${hands ? ' is-mano' : ''}${bolsa ? ' is-bolsa' : ''}${rodilla ? ' is-rodilla' : ''}${showingParts ? ` is-${diagram}` : ''}`}
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
            items={
              view === 'pie' ? FEET : view === 'liners' ? LINERS : view === 'coples' ? WRISTS : view === 'codos' ? ELBOWS : KNEES
            }
            initialId={
              view === 'pie'
                ? FEET[0].id
                : view === 'liners'
                  ? LINERS[0].id
                  : view === 'coples'
                    ? WRISTS[0].id
                    : view === 'codos'
                      ? ELBOWS[0].id
                      : KNEES[0].id
            }
            label={(name) =>
              view === 'pie'
                ? `Pie protésico ${name}`
                : view === 'liners' || view === 'coples' || view === 'codos'
                  ? name
                  : `Rodilla protésica ${name}`
            }
          />
        ) : bolsa ? (
          <BagProduct />
        ) : (
        <>
        <div className="protesis-partes__figure">
          <img
            className="protesis-partes__photo"
            src={photoSrc}
            width={photoSize.width}
            height={photoSize.height}
            decoding="sync"
            alt={
              rodilla
                ? 'Prótesis transfemoral con la rodilla señalada'
                : liner
                  ? 'Prótesis transfemoral con el liner sobre el encaje'
                  : DIAGRAMS[diagram].alt
            }
          />
          {rodilla || liner ? (
            <span className={`protesis-rodilla__pulse${liner ? ' is-liner' : ''}`} aria-hidden="true" />
          ) : null}
        </div>
        {diagram === 'transfemoral' && showingParts ? (
          <TransfemoralNotes
            onOpenLiners={() => onOpenView('liners')}
            onOpenBag={() => onOpenView('bolsa')}
          />
        ) : null}
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
              width={IMAGE_SIZE[linerElementsImg].width}
              height={IMAGE_SIZE[linerElementsImg].height}
              decoding="sync"
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
                <ChevronIcon />
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
            const asButton = Boolean(part.asButton) || Boolean(viewId)
            const pinned = Boolean(part.more)
            const interactive = Boolean(part.text) && !pinned
            const active = pinned || (interactive && open === part.id)
            return (
              <div
                key={part.id}
                className={`protesis-partes__item protesis-partes__item--${part.side}${active ? ' is-open' : ''}${pinned ? ' is-pinned' : ''}${interactive ? ' is-interactive' : ''}`}
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
                  {part.more ? (
                    <span className="protesis-partes__name">{part.title}</span>
                  ) : viewId || interactive || part.asButton ? (
                    <button
                      ref={(node) => {
                        if (viewId) partRefs.current[viewId] = node
                      }}
                      type="button"
                      className={`protesis-partes__name ${asButton ? 'protesis-partes__name--link' : 'protesis-partes__name--info'}`}
                      aria-expanded={interactive ? active : undefined}
                      aria-controls={interactive ? `${part.id}-text` : undefined}
                      onPointerUp={(event) => {
                        if (asButton || pinned || event.pointerType === 'mouse') return
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
                        if (part.linkView) {
                          onOpenView(part.linkView)
                          return
                        }
                        if (part.asButton || pinned) return
                        if (event.detail !== 0) return
                        show(part.id)
                      }}
                    >
                      <span>{part.title}</span>
                      {asButton ? <ChevronIcon /> : <InfoIcon />}
                    </button>
                  ) : (
                    <span className="protesis-partes__name">{part.title}</span>
                  )}
                  {part.text ? (
                    <div className="protesis-tipos__detail" id={`${part.id}-text`} aria-hidden={!active}>
                      <p>{part.text}</p>
                    </div>
                  ) : null}
                  {part.more ? (
                    <button
                      type="button"
                      className="protesis-partes__more"
                      onClick={() => {
                        if (part.moreView) onOpenView(part.moreView)
                      }}
                    >
                      Ver más
                      <ChevronIcon />
                    </button>
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

function memberFromHash(hash: string): Member {
  return hash === '#protesis-brazo' ? 'superior' : 'inferior'
}

function BagProduct() {
  return (
    <div className="protesis-bolsa">
      <div className="protesis-bolsa__photo">
        <img src={bolsaColocacionImg} alt="Bolsas de colocación de distintos colores" decoding="sync" />
      </div>
      <div className="protesis-bolsa__panel">
        <div className="protesis-bolsa__copy">
          <h3 className="protesis-bolsa__title">Bolsa de colocación</h3>
          <p>
            Accesorio textil diseñado para facilitar la entrada del muñón en prótesis de
            miembro inferior con sistema de succión o vacío
          </p>
        </div>
        <div className="protesis-bolsa__specs">
          <span className="protesis-bolsa__spec">
            <span className="protesis-bolsa__label">Tamaño</span>
            <span className="protesis-bolsa__value">XL, XXL</span>
          </span>
          <span className="protesis-bolsa__spec">
            <span className="protesis-bolsa__label">Textil</span>
            <span className="protesis-bolsa__value">Resistente al jalón y rasgado</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function TransfemoralNotes({
  onOpenLiners,
  onOpenBag,
}: {
  onOpenLiners: () => void
  onOpenBag: () => void
}) {
  return (
    <aside className="protesis-partes__notes">
      <article className="protesis-partes__note">
        <h3>
          <span>¿Qué es un liner?</span>
          <InfoIcon />
        </h3>
        <p>
          Interfaz que se coloca entre la piel y el encaje para ayudar a proteger el
          muñón, mejorar el ajuste y facilitar el uso de la prótesis.
        </p>
        <button type="button" className="protesis-partes__more" onClick={onOpenLiners}>
          Ver más
          <ChevronIcon />
        </button>
      </article>
      <article className="protesis-partes__note">
        <h3>
          <span>
            ¿Qué es una bolsa
            <br />
            de colocación?
          </span>
          <InfoIcon />
        </h3>
        <p>
          Accesorio que facilita la introducción del muñón en el encaje, reduciendo
          la fricción y mejorando el ajuste.
        </p>
        <button type="button" className="protesis-partes__more" onClick={onOpenBag}>
          Ver más
          <ChevronIcon />
        </button>
      </article>
    </aside>
  )
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 9 7 7 7-7" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="7.5" r="1.1" fill="currentColor" />
    </svg>
  )
}

function LimbMap({
  member,
  onOpenDiagram,
}: {
  member: Member
  onOpenDiagram: (diagram: LimbDiagram) => void
}) {
  const limb = LIMBS[member]
  const limbSize = IMAGE_SIZE[limb.src]
  const [expanded, setExpanded] = useState(() => limb.points.map((point) => point.id))

  function toggle(id: string) {
    setExpanded((current) =>
      current.includes(id) ? current.filter((pointId) => pointId !== id) : [...current, id],
    )
  }

  return (
    <div
      className="protesis-miembro"
      id={limb.panelId}
      role="tabpanel"
      aria-labelledby={limb.tabId}
    >
      <div className="protesis-miembro__figure">
        <img
          className="protesis-tipos__leg"
          src={limb.src}
          alt={limb.alt}
          width={limbSize.width}
          height={limbSize.height}
          decoding="sync"
        />
        {limb.points.map((point) => (
          <button
            key={point.id}
            type="button"
            className="protesis-tipos__dot protesis-miembro__dot"
            data-point={point.id}
            style={{ top: point.top, left: point.left }}
            aria-label={point.title}
            aria-expanded={expanded.includes(point.id)}
            aria-controls={`${point.id}-text`}
            onClick={() => toggle(point.id)}
          />
        ))}
      </div>
      {limb.points.map((point) => {
        const active = expanded.includes(point.id)
        const available = isLimbDiagram(point.id)
        return (
          <div
            key={point.id}
            className={`protesis-miembro__item protesis-miembro__item--${point.placement}`}
          >
            <h3 className="protesis-miembro__heading">
              <button
                type="button"
                className="protesis-miembro__toggle"
                id={`${point.id}-title`}
                aria-expanded={active}
                aria-controls={`${point.id}-text`}
                onClick={() => toggle(point.id)}
              >
                <span>
                  {point.title.startsWith('Desarticulación ') ? (
                    <>Desarticulación<br />{point.title.slice('Desarticulación '.length)}</>
                  ) : point.title}
                </span>
                <ChevronIcon />
              </button>
            </h3>
            <div
              className="protesis-miembro__detail"
              id={`${point.id}-text`}
              role="region"
              aria-labelledby={`${point.id}-title`}
              hidden={!active}
            >
              <p>{point.text}</p>
              <button
                type="button"
                className="protesis-miembro__more"
                aria-label={`Ver más sobre ${point.title}`}
                disabled={!available}
                title={available ? undefined : 'Información próximamente'}
                onClick={() => {
                  if (isLimbDiagram(point.id)) onOpenDiagram(point.id)
                }}
              >
                Ver más
                <ChevronIcon />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

type Shown = {
  member: Member
  diagram: LimbDiagram
  detail: null | 'parts' | PartView
}

function sameScene(a: Shown, b: Shown) {
  return a.member === b.member && a.diagram === b.diagram && a.detail === b.detail
}

function sceneImages(scene: Shown): string[] {
  if (scene.detail == null) return [LIMBS[scene.member].src]
  if (scene.detail === 'parts') return [DIAGRAMS[scene.diagram].src]
  if (scene.detail === 'liner') return [linerImg, linerElementsImg]
  if (scene.detail === 'rodilla') return [rodillaImg]
  if (scene.detail === 'mano') return [HANDS[0].image]
  if (scene.detail === 'rodillas') {
    const image = KNEES[0]?.image
    return image ? [image] : []
  }
  if (scene.detail === 'bolsa') return [bolsaColocacionImg]
  if (scene.detail === 'liners') {
    const image = LINERS[0]?.image
    return image ? [image] : []
  }
  if (scene.detail === 'coples') {
    const image = WRISTS[0]?.image
    return image ? [image] : []
  }
  if (scene.detail === 'codos') {
    const image = ELBOWS[0]?.image
    return image ? [image] : []
  }
  if (scene.detail === 'pie') {
    const image = FEET[0]?.image
    return image ? [image] : []
  }
  return []
}

function detailView(detail: Shown['detail']): PartView | null {
  if (
    detail === 'liner' ||
    detail === 'pie' ||
    detail === 'rodilla' ||
    detail === 'rodillas' ||
    detail === 'mano' ||
    detail === 'bolsa' ||
    detail === 'liners' ||
    detail === 'coples' ||
    detail === 'codos'
  ) {
    return detail
  }
  return null
}

export function ProtesisTipos() {
  const initialMember = memberFromHash(window.location.hash)
  const [tab, setTab] = useState<Member>(initialMember)
  const [shown, setShown] = useState<Shown>({
    member: initialMember,
    diagram: 'transfemoral',
    detail: null,
  })
  const [open, setOpen] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const shownRef = useRef(shown)
  const requestRef = useRef(0)
  shownRef.current = shown

  useEffect(() => {
    const srcs = [
      piernaImg,
      brazoImg,
      transfemoralImg,
      transtibialImg,
      transhumeralImg,
      transradialImg,
      desarticulacionCaderaImg,
      desarticulacionHombroImg,
      linerImg,
      linerElementsImg,
      rodillaImg,
      bolsaColocacionImg,
      skeoSealingImg,
      skeoSkinguardImg,
      ...WRISTS.flatMap((item) => (item.image ? [item.image] : [])),
      ...ELBOWS.flatMap((item) => (item.image ? [item.image] : [])),
      myofacilImg,
      accesImg,
      mecanicoImg,
      ...FEET.flatMap((item) => (item.image ? [item.image] : [])),
      ...KNEES.flatMap((item) => (item.image ? [item.image] : [])),
    ]
    srcs.forEach((src) => {
      void whenImageReady(src)
    })
  }, [])

  function go(next: Shown) {
    if (sameScene(shownRef.current, next)) {
      requestRef.current += 1
      setBusy(false)
      return
    }
    const request = ++requestRef.current
    const apply = () => {
      if (requestRef.current !== request) return
      shownRef.current = next
      setShown(next)
      setOpen(null)
      setBusy(false)
    }
    const images = sceneImages(next)
    if (images.every((src) => readyImages.has(src))) {
      apply()
      return
    }
    setBusy(true)
    void whenImagesReady(images).then(apply)
  }

  function selectMember(next: Member) {
    setTab(next)
    go({ member: next, diagram: shownRef.current.diagram, detail: null })
  }

  const selectMemberRef = useRef(selectMember)
  selectMemberRef.current = selectMember

  useEffect(() => {
    function syncMember() {
      const hash = window.location.hash
      if (hash !== '#protesis' && hash !== '#protesis-pierna' && hash !== '#protesis-brazo') return
      selectMemberRef.current(memberFromHash(hash))
    }
    window.addEventListener('hashchange', syncMember)
    return () => window.removeEventListener('hashchange', syncMember)
  }, [])

  function openDiagram(next: LimbDiagram) {
    setTab(shownRef.current.member)
    go({ member: shownRef.current.member, diagram: next, detail: 'parts' })
  }

  function show(id: string) {
    setOpen(id)
  }

  function hide(id: string, event: PointerEvent | FocusEvent) {
    if (staysOnPoint(id, event)) return
    setOpen((current) => (current === id ? null : current))
  }

  function openView(next: PartView) {
    go({ ...shownRef.current, detail: next })
  }

  function goBack() {
    const current = shownRef.current
    if (current.detail === 'rodillas') {
      go({ ...current, detail: 'rodilla' })
      return
    }
    if (
      current.detail === 'liner' ||
      current.detail === 'pie' ||
      current.detail === 'rodilla' ||
      current.detail === 'mano' ||
      current.detail === 'bolsa' ||
      current.detail === 'liners' ||
      current.detail === 'coples' ||
      current.detail === 'codos'
    ) {
      go({ ...current, detail: 'parts' })
      return
    }
    go({ ...current, detail: null })
  }

  const showDetail = shown.detail !== null

  return (
    <section id="protesis-tipos" className="section section--narrow protesis-tipos" aria-labelledby="protesis-tipos-title">
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

        <div
          className={
            tab === 'superior'
              ? 'protesis-tipos__switch is-superior'
              : 'protesis-tipos__switch'
          }
          role="tablist"
          aria-label="Tipo de miembro"
        >
          <span className="protesis-tipos__switch-thumb" aria-hidden="true" />
          <button
            type="button"
            role="tab"
            id="protesis-tab-inferior"
            aria-selected={tab === 'inferior'}
            aria-controls="protesis-panel-inferior"
            className={tab === 'inferior' ? 'is-active' : undefined}
            onClick={() => selectMember('inferior')}
          >
            Miembro Inferior
          </button>
          <button
            type="button"
            role="tab"
            id="protesis-tab-superior"
            aria-selected={tab === 'superior'}
            aria-controls="protesis-panel-superior"
            className={tab === 'superior' ? 'is-active' : undefined}
            onClick={() => selectMember('superior')}
          >
            Miembro Superior
          </button>
        </div>

        <div aria-busy={busy || undefined}>
          {showDetail ? (
            <ProsthesisDetail
              diagram={shown.diagram}
              parts={DIAGRAMS[shown.diagram].parts}
              open={open}
              view={detailView(shown.detail)}
              show={show}
              hide={hide}
              toggle={(id) => setOpen((current) => (current === id ? null : id))}
              onOpenView={openView}
              onBack={goBack}
            />
          ) : (
            <LimbMap key={shown.member} member={shown.member} onOpenDiagram={openDiagram} />
          )}
        </div>
      </div>
    </section>
  )
}
