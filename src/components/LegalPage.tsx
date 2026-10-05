import './LegalPage.css'

export type LegalBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }

type LegalPageProps = {
  id: string
  title: string
  blocks: LegalBlock[]
}

export function LegalPage({ id, title, blocks }: LegalPageProps) {
  return (
    <article className="legal-page" id={id} aria-labelledby={`${id}-title`}>
      <div className="section__inner">
        <h1 id={`${id}-title`}>{title}</h1>
        {blocks.map((block, index) => {
          if (block.kind === 'heading') {
            return <h2 key={index}>{block.text}</h2>
          }

          if (block.kind === 'list') {
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          }

          return <p key={index}>{block.text}</p>
        })}
      </div>
    </article>
  )
}
