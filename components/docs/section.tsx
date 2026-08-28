import type { ReactNode } from "react"

/** Divisor de grupo : régua editorial que abre cada bloco da documentação. */
export function GroupDivider({ label, index }: { label: string; index: string }) {
  return (
    <div className="flex items-center gap-4 pt-4">
      <span className="type-micro text-subtle-foreground">{index}</span>
      <span className="type-eyebrow text-foreground">{label}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-border/60" />
    </div>
  )
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  as: As = "h2",
  children,
}: {
  id: string
  eyebrow?: string
  title: string
  lead?: ReactNode
  as?: "h1" | "h2"
  children?: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      {eyebrow && (
        <div className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
          <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{eyebrow}</span>
        </div>
      )}

      {As === "h1" ? (
        <h1 className={`type-title text-balance text-foreground ${eyebrow ? "mt-5" : ""}`}>{title}</h1>
      ) : (
        <h2 className={`type-heading text-balance text-foreground ${eyebrow ? "mt-5" : ""}`}>
          <a href={`#${id}`} className="group inline-flex items-baseline gap-2">
            {title}
            <span
              aria-hidden="true"
              className="type-label text-primary opacity-0 transition-opacity group-hover:opacity-100"
            >
              #
            </span>
          </a>
        </h2>
      )}

      {lead && <p className="type-lead mt-4 max-w-2xl text-pretty text-muted-foreground">{lead}</p>}
      {children}
    </section>
  )
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="type-subheading mt-10 text-foreground">{children}</h3>
}

export function Body({ children }: { children: ReactNode }) {
  return <p className="type-body mt-4 max-w-2xl text-pretty text-muted-foreground">{children}</p>
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="type-caption mt-3 max-w-2xl text-pretty text-subtle-foreground">{children}</p>
}

export function C({ children }: { children: ReactNode }) {
  return <code className="type-code bg-muted px-1.5 py-0.5 text-foreground">{children}</code>
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 border-l-2 border-primary/50 pl-4">
      <p className="type-caption max-w-2xl text-pretty text-muted-foreground">{children}</p>
    </div>
  )
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="type-body mt-4 max-w-2xl space-y-2.5 text-muted-foreground">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 bg-primary" />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  )
}
