import Link from "next/link"

export function StatusSiteLink() {
  return (
    <Link
      href="/"
      className="type-micro group inline-flex items-center gap-2 whitespace-nowrap border border-foreground bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      Ir para o Site
      <span
        aria-hidden="true"
        className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
      >
        ↑
      </span>
    </Link>
  )
}
