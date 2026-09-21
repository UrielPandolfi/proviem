import { useMemo, useState } from 'react'
import { Section } from './Section'
import { BlogCard } from './BlogCard'
import { reveal } from '../motion/reveal'
import {
  BLOG_CATEGORIES,
  BLOG_PAGE_SIZE,
  BLOG_POSTS,
  type BlogCategoryId,
} from '../data/blog'
import './BlogPage.css'

type FilterId = 'todos' | BlogCategoryId

const FILTERS: { id: FilterId; label: string }[] = [
  ...BLOG_CATEGORIES,
  { id: 'todos', label: 'Todos' },
]

export function BlogPage() {
  const [filter, setFilter] = useState<FilterId>('todos')
  const [page, setPage] = useState(1)

  const filtered = useMemo(
    () =>
      filter === 'todos'
        ? BLOG_POSTS
        : BLOG_POSTS.filter((post) => post.category === filter),
    [filter],
  )

  const pageCount = Math.max(1, Math.ceil(filtered.length / BLOG_PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice(
    (currentPage - 1) * BLOG_PAGE_SIZE,
    currentPage * BLOG_PAGE_SIZE,
  )

  const selectFilter = (next: FilterId) => {
    setFilter(next)
    setPage(1)
  }

  return (
    <Section id="blog" className="blog">
      <header className="blog__intro" {...reveal('up')}>
        <h1>Blog Proviem</h1>
        <p>
          Nuestro contenido te ayudará a entender tipos de prótesis,
          componentes, tecnología, entrenamiento y las distintas etapas del
          proceso.
        </p>
      </header>

      <div className="blog__filters" role="group" aria-label="Categorías del blog">
        {FILTERS.map((item) => {
          const active = item.id === filter
          return (
            <button
              key={item.id}
              type="button"
              className={active ? 'blog__filter is-active' : 'blog__filter'}
              aria-pressed={active}
              onClick={() => selectFilter(item.id)}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {visible.length > 0 ? (
        <div className="blog__grid" data-reveal-stagger="90">
          {visible.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="blog__empty" {...reveal('up')}>
          Aún no hay notas en esta categoría. Elige otra o vuelve a Todos.
        </p>
      )}

      {pageCount > 1 ? (
        <nav className="blog__pages" aria-label="Paginación">
          {Array.from({ length: pageCount }, (_, index) => {
            const number = index + 1
            const active = number === currentPage
            return (
              <button
                key={number}
                type="button"
                className={active ? 'blog__page is-active' : 'blog__page'}
                aria-current={active ? 'page' : undefined}
                aria-label={`Página ${number}`}
                onClick={() => setPage(number)}
              >
                {number}
              </button>
            )
          })}
          <button
            type="button"
            className="blog__page blog__page--next"
            aria-label="Página siguiente"
            disabled={currentPage >= pageCount}
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          >
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path
                d="M4.2 2.4 8.1 6 4.2 9.6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </nav>
      ) : null}
    </Section>
  )
}
