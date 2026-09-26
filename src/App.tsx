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
import { ClinicasHero } from './components/ClinicasHero'
import { ClinicasUbicaciones } from './components/ClinicasUbicaciones'
import { ClinicasEspacios } from './components/ClinicasEspacios'
import { ProcesoHero } from './components/ProcesoHero'
import { ProcesoEtapas } from './components/ProcesoEtapas'
import { ProcesoVideo } from './components/ProcesoVideo'
import { getBlogPostBySlug } from './data/blog'
import contactNosotrosImg from './assets/nosotros/contact-nosotros.png'
import contactBlogImg from './assets/blog/contact-blog.png'
import contactClinicasImg from './assets/clinicas/contacto.png'
import contactProcesoImg from './assets/Proceso/contacto.png'
import { useReveal } from './motion/useReveal'

type Page = 'home' | 'nosotros' | 'contacto' | 'blog' | 'clinicas' | 'proceso'

const NOSOTROS_HASHES = new Set(['#nosotros', '#enfoque', '#historia', '#equipo'])
const CONTACTO_HASHES = new Set(['#contacto'])
const CLINICAS_HASHES = new Set([
  '#clinicas',
  '#ubicaciones',
  '#instalaciones',
])
const PROCESO_HASHES = new Set(['#proceso', '#etapas'])
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
  if (CLINICAS_HASHES.has(hash)) return 'clinicas'
  if (PROCESO_HASHES.has(hash)) return 'proceso'
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
      id === 'clinicas' ||
      id === 'proceso' ||
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
        ) : page === 'clinicas' ? (
          <>
            <ClinicasHero />
            <ClinicasUbicaciones />
            <ClinicasEspacios />
            <Contact
              photo={contactClinicasImg}
              photoAlt="Especialistas de Proviem, uno de ellos con una prótesis de brazo"
            />
          </>
        ) : page === 'proceso' ? (
          <>
            <ProcesoHero />
            <ProcesoEtapas />
            <ProcesoVideo />
            <Contact
              photo={contactProcesoImg}
              photoAlt="Especialista de Proviem junto a las barras paralelas"
            />
          </>
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
