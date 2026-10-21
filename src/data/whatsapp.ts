const WHATSAPP_TEXT =
  'Hola, quiero recibir orientación de Proviem para una valoración protésica.'

function whatsappUrl(phone: string) {
  return (
    'https://api.whatsapp.com/send?phone=' +
    phone +
    '&text=' +
    encodeURIComponent(WHATSAPP_TEXT)
  )
}

export const WHATSAPP_ZONES = [
  {
    id: 'monterrey',
    label: 'Monterrey',
    display: '81 1076 1775',
    url: whatsappUrl('528110761775'),
  },
  {
    id: 'cdmx',
    label: 'CDMX',
    display: '55 7328 9409',
    url: whatsappUrl('525573289409'),
  },
] as const

export const WHATSAPP_URL = WHATSAPP_ZONES[1].url
