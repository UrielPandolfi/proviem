import type { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  fullWidth?: boolean
  narrow?: boolean
  className?: string
  id?: string
}

export function Section({
  children,
  fullWidth = false,
  narrow = false,
  className = '',
  id,
}: SectionProps) {
  const classes = [
    'section',
    fullWidth ? 'section--full' : '',
    narrow ? 'section--narrow' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={classes}>
      <div className="section__inner">{children}</div>
    </section>
  )
}
