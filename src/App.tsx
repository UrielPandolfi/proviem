import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { HomeHero } from './components/HomeHero'
import { Solutions } from './components/Solutions'
import { ProcessSteps } from './components/ProcessSteps'
import { Partners } from './components/Partners'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { NosotrosHero } from './components/NosotrosHero'
import { NosotrosHistoria } from './components/NosotrosHistoria'
import { ContactoPage } from './components/ContactoPage'
import { BlogPage } from './components/BlogPage'
import { BlogMissing, BlogPostPage } from './components/BlogPost'
import { getBlogPostBySlug } from './data/blog'
import contactNosotrosImg from './assets/nosotros/contact-nosotros.png'
import contactBlogImg from './assets/blog/contact-blog.png'
import { useReveal } from './motion/useReveal'

type Page = 'home' | 'nosotros' | 'contacto' | 'blog'

const NOSOTROS_HASHES = new Set(['#nosotros', '#enfoque', '#historia', '#equipo'])
const CONTACTO_HASHES = new Set(['#contacto'])
const SHARED_HASHES = new Set(['#cita', '#colaboracion'])

function isBlogHash(hash: string) {
  return hash === '#blog' || hash.startsWith('#blog/')
}

function getBlogSlug(hash: string) {
  if (!hash.startsWith('#blog/')) return null
  const slug = decodeURIComponent(hash.slice('#blog/'.length)).replace(/\/+$/, '')
  return slug || null
}

function resolvePage(hash: string, fallback: Page): Page {
  if (NOSOTROS_HASHES.has(hash)) return 'nosotros'
  if (CONTACTO_HASHES.has(hash)) return 'contacto'
  if (isBlogHash(hash)) return 'blog'
  if (hash === '#cita') return fallback === 'contacto' ? 'home' : fallback
  if (SHARED_HASHES.has(hash)) {
    return fallback === 'contacto' || fallback === 'blog' ? 'home' : fallback
  }
  return 'home'
}

function App() {
  const [hash, setHash] = useState(() => window.location.hash)
  const [page, setPage] = useState<Page>(() => resolvePage(hash, 'home'))
  const blogSlug = getBlogSlug(hash)
  const blogPost = blogSlug ? getBlogPostBySlug(blogSlug) : undefined
  useReveal(page === 'blog' ? `${page}:${blogSlug ?? ''}` : page)

  useEffect(() => {
    const onHash = () => {
      const next = window.location.hash
      setHash(next)
      setPage((current) => resolvePage(next, current))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const id = hash.slice(1)

    if (
      !id ||
      id === 'inicio' ||
      id === 'nosotros' ||
      id === 'contacto' ||
      id === 'blog' ||
      id.startsWith('blog/')
    ) {
      root.scrollTop = 0
      return
    }

    const scrollToTarget = () => {
      const target = document.getElementById(id)
      if (target) target.scrollIntoView()
      else root.scrollTop = 0
    }

    requestAnimationFrame(scrollToTarget)
  }, [page, hash])

  return (
    <>
      <Header page={page} />
      <main>
        {page === 'nosotros' ? (
          <>
            <NosotrosHero />
            <NosotrosHistoria />
            <Partners />
            <Contact
              photo={contactNosotrosImg}
              photoAlt="Especialista Proviem con equipo de entrenamiento"
            />
          </>
        ) : page === 'contacto' ? (
          <ContactoPage />
        ) : page === 'blog' ? (
          <>
            {blogSlug ? (
              blogPost ? (
                <BlogPostPage post={blogPost} />
              ) : (
                <BlogMissing />
              )
            ) : (
              <BlogPage />
            )}
            <Contact
              photo={contactBlogImg}
              photoAlt="Especialista Proviem sosteniendo una prótesis de pierna"
            />
          </>
        ) : (
          <>
            <HomeHero />
            <Solutions />
            <ProcessSteps />
            <Partners />
            <Contact />
          </>
        )}
      </main>
      <Footer squareTop={page === 'contacto'} />
    </>
  )
}

export default App
