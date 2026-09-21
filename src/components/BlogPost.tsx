import { Section } from './Section'
import { BlogCard } from './BlogCard'
import { reveal } from '../motion/reveal'
import {
  formatBlogDate,
  getBlogCategoryLabel,
  getRelatedBlogPosts,
  type BlogPost,
} from '../data/blog'
import './BlogPost.css'

type BlogPostPageProps = {
  post: BlogPost
}

export function BlogPostPage({ post }: BlogPostPageProps) {
  const related = getRelatedBlogPosts(post.slug)

  return (
    <>
      <Section className="blog-post">
        <a className="blog-post__back" href="#blog">
          Volver al blog
        </a>

        <header className="blog-post__intro" {...reveal('up')}>
          <div className="blog-post__meta">
            <span className="blog-post__category">
              {getBlogCategoryLabel(post.category)}
            </span>
            <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
          </div>
          <h1>{post.title}</h1>
          <p className="blog-post__lead">{post.excerpt}</p>
        </header>

        <div className="blog-post__cover-wrap" {...reveal('scale')}>
          <img
            className="blog-post__cover"
            src={post.cover}
            alt={post.coverAlt}
            draggable={false}
          />
        </div>

        <div className="blog-post__body" {...reveal('up', 80)}>
          {post.blocks.map((block, index) => {
            if (block.type === 'h2') {
              return <h2 key={index}>{block.text}</h2>
            }
            if (block.type === 'quote') {
              return <blockquote key={index}>{block.text}</blockquote>
            }
            return <p key={index}>{block.text}</p>
          })}
        </div>

        <aside className="blog-post__cta" {...reveal('up', 60)}>
          <p className="blog-post__cta-eyebrow">Da el primer paso</p>
          <h2>Agenda una valoración</h2>
          <p>
            Si esta nota abre dudas sobre tu caso, el siguiente paso es una
            conversación clínica. Cuéntanos qué necesitas y te orientamos.
          </p>
          <a className="blog-post__cta-btn" href="#cita" data-motion="lift">
            Quiero una valoración
          </a>
        </aside>
      </Section>

      {related.length > 0 ? (
        <Section className="blog-related">
          <header className="blog-related__intro" {...reveal('up')}>
            <p>Sigue leyendo</p>
            <h2>Otras notas</h2>
          </header>
          <div className="blog-related__grid" data-reveal-stagger="90">
            {related.map((item) => (
              <BlogCard key={item.slug} post={item} heading="h3" />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  )
}

export function BlogMissing() {
  return (
    <Section className="blog-post blog-post--missing">
      <div className="blog-post__intro" {...reveal('up')}>
        <h1>No encontramos esta nota</h1>
        <p className="blog-post__lead">
          Puede que el enlace haya cambiado. Vuelve al blog para ver las notas
          disponibles.
        </p>
        <a className="blog-post__cta-btn" href="#blog" data-motion="lift">
          Ir al blog
        </a>
      </div>
    </Section>
  )
}
