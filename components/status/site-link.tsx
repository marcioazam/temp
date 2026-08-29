import Link from "next/link"

export function StatusSiteLink() {
  return (
    <Link
      href="/"
      className="type-micro group inline-flex items-stretch gap-2 whitespace-nowrap bg-transparent text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="flex items-center border border-border px-4 py-2.5 transition-colors group-hover:border-muted-foreground group-hover:bg-secondary">
        Ir para o Site
      </span>
      <span
        aria-hidden="true"
        className="w-0.5 bg-foreground transition-opacity group-hover:opacity-70"
      />
    </Link>
  )
}
