import { useEffect, type RefObject } from 'react'

const DESKTOP_QUERY = '(min-width: 900px)'
const REDUCE_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const legFrameModules = import.meta.glob('../assets/pierna-frame/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export const LEG_FRAMES = Object.keys(legFrameModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => legFrameModules[key])

export const FIRST_LEG_FRAME = LEG_FRAMES[0]

function loadImages(urls: string[]) {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image()
          image.decoding = 'async'
          image.onload = () => resolve(image)
          image.onerror = () => reject(new Error(`No se pudo cargar ${src}`))
          image.src = src
        }),
    ),
  )
}

function progressFor(section: HTMLElement, visual: HTMLElement) {
  const scrollable = Math.max(visual.offsetHeight - window.innerHeight, 1)
  return Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollable))
}

export function useHeroLegFrames(
  sectionRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  visualRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    const visual = visualRef.current
    if (!canvas || !section || !visual || LEG_FRAMES.length === 0) return

    const desktopMq = window.matchMedia(DESKTOP_QUERY)
    const motionMq = window.matchMedia(REDUCE_MOTION_QUERY)
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    let frames: HTMLImageElement[] | null = null
    let loading: Promise<HTMLImageElement[] | null> | null = null
    let frameIndex = -1
    let ticking = false
    let cancelled = false

    const draw = (index: number, images: HTMLImageElement[]) => {
      const image = images[index]
      if (!image || index === frameIndex) return
      frameIndex = index

      if (canvas.width !== image.naturalWidth || canvas.height !== image.naturalHeight) {
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, 0, 0)
    }

    const ensureFrames = () => {
      if (frames) {
        visual.classList.add('is-leg-ready')
        return Promise.resolve(frames)
      }
      if (!loading) {
        loading = loadImages(LEG_FRAMES)
          .then((images) => {
            if (cancelled) return null
            frames = images
            visual.classList.add('is-leg-ready')
            return images
          })
          .catch(() => null)
      }
      return loading
    }

    const update = () => {
      ticking = false
      if (!desktopMq.matches) {
        visual.classList.remove('is-leg-ready')
        return
      }

      void ensureFrames().then((images) => {
        if (!images || cancelled) return
        const index = motionMq.matches
          ? 0
          : Math.round(progressFor(section, visual) * (images.length - 1))
        draw(index, images)
      })
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    desktopMq.addEventListener('change', onScroll)
    motionMq.addEventListener('change', onScroll)

    return () => {
      cancelled = true
      visual.classList.remove('is-leg-ready')
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      desktopMq.removeEventListener('change', onScroll)
      motionMq.removeEventListener('change', onScroll)
    }
  }, [canvasRef, sectionRef, visualRef])
}
