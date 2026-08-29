import Link from "next/link"

export function StatusSiteLink() {
  return (
    <Link
      href="/"
      className="type-micro group inline-flex items-stretch whitespace-nowrap border border-border bg-transparent text-foreground transition-colors hover:border-muted-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="flex items-center px-4 py-2.5">Ir para o Site</span>
      <span
        aria-hidden="true"
        className="flex items-center border-l border-border px-3 text-sm leading-none transition-colors group-hover:border-muted-foreground"
      >
        ↗
      </span>
    </Link>
  )
}
