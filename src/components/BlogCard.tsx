import { reveal } from '../motion/reveal'
import type { BlogPost } from '../data/blog'
import './BlogCard.css'

type BlogCardProps = {
  post: BlogPost
  heading?: 'h2' | 'h3'
  delay?: number
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M2.4 9.6 9.6 2.4M9.6 2.4H4.15M9.6 2.4V7.85"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BlogCard({
  post,
  heading = 'h2',
  delay = 0,
}: BlogCardProps) {
  const Title = heading

  return (
    <article className="blog-card" data-motion="lift" {...reveal('up', delay)}>
      <a className="blog-card__link" href={`#blog/${post.slug}`}>
        <div className="blog-card__media">
          <img
            className="blog-card__photo"
            src={post.cover}
            alt={post.coverAlt}
            draggable={false}
          />
        </div>
        <Title className="blog-card__title">{post.title}</Title>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <span className="blog-card__more">
          Leer más
          <ArrowIcon />
        </span>
      </a>
    </article>
  )
}
