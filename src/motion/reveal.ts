export type RevealType = 'up' | 'left' | 'right' | 'scale' | 'fade' | 'line'

export function reveal(type: RevealType = 'up', delayMs = 0) {
  return {
    'data-reveal': type,
    ...(delayMs > 0 ? { 'data-delay': String(delayMs) } : {}),
  }
}
