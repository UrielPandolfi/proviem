// Contenido temporal del blog. Más adelante se sustituye por el headless de WordPress.
import coverValoracion from '../assets/nosotros/historia.png'
import coverTecnologia from '../assets/nosotros/historia-2.png'
import coverSeguros from '../assets/nosotros/historia.png'
import coverRehab from '../assets/nosotros/historia-2.png'

export const BLOG_CATEGORIES = [
  { id: 'proceso', label: 'Proceso protésico' },
  { id: 'seguros', label: 'Seguros y pagos' },
  { id: 'tecnologia', label: 'Tecnología y Prótesis' },
  { id: 'rehabilitacion', label: 'Rehabilitación' },
  { id: 'testimonios', label: 'Testimonios' },
] as const

export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number]['id']

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: BlogCategoryId
  date: string
  cover: string
  coverAlt: string
  blocks: BlogBlock[]
}

export const BLOG_PAGE_SIZE = 3

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'valoracion-protesica',
    title: '¿Qué sucede durante una valoración protésica?',
    excerpt:
      'Explica en términos simples qué factores se evalúan en la valoración inicial (estado del muñón, salud general, etc.) sin entrar en tecnicismos médicos.',
    category: 'proceso',
    date: '2026-08-12',
    cover: coverValoracion,
    coverAlt: 'Espacio de entrenamiento y valoración en una clínica Proviem',
    blocks: [
      {
        type: 'p',
        text: 'La valoración es el primer encuentro con el equipo clínico. No se trata de elegir una prótesis en ese momento, sino de entender tu historia, cómo te mueves hoy y qué quieres recuperar en los próximos meses: caminar con más seguridad, volver al trabajo, cuidar a tu familia o retomar una actividad concreta.',
      },
      {
        type: 'p',
        text: 'Durante la cita se revisan, con calma y en lenguaje claro, el nivel de amputación, el estado del muñón, la piel, la fuerza, el equilibrio y tu salud general. También se habla de tu entorno: si hay escaleras en casa, cuánto caminas, si manejas o si pasas muchas horas sentado. Esa información pesa tanto como cualquier medición.',
      },
      {
        type: 'h2',
        text: 'Qué se observa y por qué importa',
      },
      {
        type: 'p',
        text: 'El especialista necesita conocer si hay dolor, sensibilidad, cambios de volumen o heridas que todavía están cicatrizando. Esos detalles definen tiempos, tipo de encaje y el ritmo del entrenamiento. No es una lista de requisitos para “calificar”: es un mapa para recomendar con responsabilidad.',
      },
      {
        type: 'p',
        text: 'También se exploran expectativas realistas. Una prótesis no es un recambio instantáneo; es un proceso de adaptación. Por eso la valoración incluye espacio para dudas sobre tiempos, pruebas, seguimiento y, cuando aplica, alternativas de financiamiento o pago directo.',
      },
      {
        type: 'quote',
        text: 'Escuchar antes de recomendar no es un eslogan: es la única forma de que la solución se ajuste a la persona, y no al revés.',
      },
      {
        type: 'h2',
        text: 'Qué ocurre después de la cita',
      },
      {
        type: 'p',
        text: 'Al cierre suele haber una orientación preliminar: posibles caminos, estudios o valoraciones complementarias, y los siguientes pasos si decides continuar. Nada de eso sustituye una receta genérica. El plan se construye contigo, con tus tiempos y con el acompañamiento del equipo clínico.',
      },
    ],
  },
  {
    slug: 'protesis-mecanica-mioelectrica',
    title: 'Prótesis mecánica y mioeléctrica: diferencias que debes conocer',
    excerpt:
      'Una guía sencilla para entender cómo se controlan, qué actividades favorece cada una y por qué la recomendación siempre parte de tu caso.',
    category: 'tecnologia',
    date: '2026-07-28',
    cover: coverTecnologia,
    coverAlt: 'Equipo clínico de Proviem en un espacio de atención',
    blocks: [
      {
        type: 'p',
        text: 'Cuando se habla de prótesis de miembro superior, dos caminos aparecen con frecuencia: la solución mecánica y la mioeléctrica. No es una carrera de “cuál es mejor”. Cada una resuelve actividades distintas y pide un tipo de entrenamiento distinto.',
      },
      {
        type: 'p',
        text: 'La prótesis mecánica suele aprovechar el movimiento del cuerpo —por ejemplo del hombro o del brazo residual— para abrir, cerrar o posicionar el dispositivo. Es robusta, predecible y, para muchas personas, una vía clara para tareas cotidianas con un aprendizaje más directo.',
      },
      {
        type: 'h2',
        text: 'Qué cambia con una prótesis mioeléctrica',
      },
      {
        type: 'p',
        text: 'La opción mioeléctrica lee señales musculares muy pequeñas y las convierte en movimiento de la mano o de la muñeca. Puede ofrecer un control más fino para ciertas prensiones, pero pide práctica, seguimiento y un muñón con señales suficientes. El “wow” tecnológico no sustituye la valoración.',
      },
      {
        type: 'quote',
        text: 'La tecnología sirve cuando se traduce en independencia real: vestirse, preparar alimentos, trabajar o sostener a alguien. Eso se decide en clínica, no en un catálogo.',
      },
      {
        type: 'h2',
        text: 'Cómo se elige en Proviem',
      },
      {
        type: 'p',
        text: 'Se consideran tu nivel de amputación, la calidad de las señales, tu oficio, tu entorno y cuánto tiempo puedes dedicar al entrenamiento. En algunos casos el camino empieza con una solución y, más adelante, se evalúa otra. El objetivo no es acumular componentes: es recuperar movilidad con un plan que puedas sostener.',
      },
    ],
  },
  {
    slug: 'pago-directo-protesis',
    title: 'Pago directo para una prótesis: qué es y qué no es',
    excerpt:
      'Aclara cómo funciona el pago directo, qué cubre y qué conviene preguntar antes de iniciar un proceso protésico con o sin seguro.',
    category: 'seguros',
    date: '2026-06-18',
    cover: coverSeguros,
    coverAlt: 'Área de entrenamiento protésico en una clínica Proviem',
    blocks: [
      {
        type: 'p',
        text: 'El pago directo significa que la persona —o su familia— cubre el proceso sin pasar por un dictamen de aseguradora o institución. No es un atajo improvisado: es una vía formal, con valoración, plan de tratamiento, fabricación, entrenamiento y seguimiento, igual que cualquier otro paciente.',
      },
      {
        type: 'p',
        text: 'Lo que sí cambia es la conversación administrativa. Sin un tercero que autorice cada etapa, los tiempos pueden ser más ágiles. A cambio, conviene tener claro desde el inicio qué incluye la propuesta: componentes, número de ajustes, terapia, garantía y qué queda fuera.',
      },
      {
        type: 'h2',
        text: 'Qué preguntar antes de decidir',
      },
      {
        type: 'p',
        text: 'Pide un desglose comprensible. ¿La cotización contempla el encaje, las pruebas y las citas de control? ¿Hay un plan si el muñón cambia de volumen? ¿El entrenamiento está incluido? Esas preguntas evitan sorpresas y te permiten comparar con otras alternativas, incluido el camino con seguro cuando existe cobertura.',
      },
      {
        type: 'quote',
        text: 'Pago directo no significa “comprar una prótesis y listo”. Significa asumir el proceso completo, con la misma exigencia clínica y con reglas económicas transparentes.',
      },
      {
        type: 'h2',
        text: 'Seguro, institución o particular',
      },
      {
        type: 'p',
        text: 'En Proviem orientamos las tres vías. Si tienes póliza, conviene revisar preexistencias, topes y documentación. Si vienes de una institución, el expediente y los tiempos de autorización marcan el ritmo. Si eliges pago directo, armamos un plan claro para que sepas en qué etapa estás y qué sigue. En todos los casos, la recomendación clínica va primero.',
      },
    ],
  },
  {
    slug: 'entrenamiento-primera-protesis',
    title: 'Cómo es el entrenamiento con tu primera prótesis',
    excerpt:
      'Del primer encaje a caminar con más confianza: qué esperar del entrenamiento, cuánto dura y cómo se acompaña cada avance.',
    category: 'rehabilitacion',
    date: '2026-05-09',
    cover: coverRehab,
    coverAlt: 'Equipo Proviem durante una sesión de acompañamiento',
    blocks: [
      {
        type: 'p',
        text: 'Recibir la prótesis no es el final del proceso: es el inicio de un entrenamiento. Los primeros días sirven para que el encaje se sienta estable, para aprender a ponértela y quitártela, y para que la piel se vaya adaptando sin prisas. El equipo está para calibrar, no para pedirte un rendimiento inmediato.',
      },
      {
        type: 'p',
        text: 'En miembro inferior, el trabajo suele empezar en paralelo: control de tronco, apoyo progresivo, cambios de peso y, después, pasos cortos. En miembro superior, se practican prensiones simples —sostener, soltar, acercar objetos— antes de tareas más finas. Cada sesión se ajusta a tu energía y a tu muñón.',
      },
      {
        type: 'h2',
        text: 'Ritmo, ajustes y seguimiento',
      },
      {
        type: 'p',
        text: 'Es normal que el volumen del muñón cambie. Por eso hay citas de control: un encaje que hoy está cómodo puede necesitar un ajuste en dos semanas. El entrenamiento también enseña señales de alarma —enrojecimiento persistente, puntos de presión, dolor distinto— para actuar a tiempo y no “aguantar” en silencio.',
      },
      {
        type: 'quote',
        text: 'La meta no es usarla más horas a como dé lugar. Es usarla bien, con confianza, y construir una rutina que puedas sostener en casa y en la calle.',
      },
      {
        type: 'h2',
        text: 'Cuando el entrenamiento se siente lento',
      },
      {
        type: 'p',
        text: 'Compararse con otros pacientes casi nunca ayuda: edades, niveles de amputación y condiciones de salud son distintos. Lo que sí acelera el proceso es la constancia, pedir ajustes cuando algo no cierra y mantener el diálogo con el equipo. Si algo duele o inseguridad te frena, esa información es parte del tratamiento.',
      },
    ],
  },
]

export function getBlogCategoryLabel(id: BlogCategoryId) {
  return BLOG_CATEGORIES.find((item) => item.id === id)?.label ?? id
}

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  return BLOG_POSTS.filter((post) => post.slug !== slug).slice(0, limit)
}

export function formatBlogDate(isoDate: string) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
