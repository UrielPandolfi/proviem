import { useLayoutEffect } from 'react'

const STAGGER_MS = 90

export function useReveal() {
  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.add('js-reveal')

    const nodes = [
      ...document.querySelectorAll<HTMLElement>('[data-reveal]'),
    ]

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      nodes.forEach((el) => el.classList.add('is-visible'))
      return
    }

    nodes.forEach((el) => {
      const delay = el.dataset.delay
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)
    })

    document.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
      const step = Number(group.getAttribute('data-reveal-stagger')) || STAGGER_MS
      ;[...group.querySelectorAll<HTMLElement>(':scope > [data-reveal]')].forEach(
        (el, index) => {
          if (el.dataset.delay) return
          el.style.setProperty('--reveal-delay', `${index * step}ms`)
        },
      )
    })

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    )

    nodes.forEach((el) => io.observe(el))

    return () => io.disconnect()
  }, [])
}
