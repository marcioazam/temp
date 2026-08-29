import Link from "next/link"

export function StatusSiteLink() {
  return (
    <div className="flex items-stretch gap-3">
      <Link
        href="/"
        className="type-micro group inline-flex w-44 items-center justify-center gap-2 whitespace-nowrap border border-border bg-transparent px-4 py-2.5 text-foreground transition-colors hover:border-muted-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span>Ir para o Site</span>
        <span
          aria-hidden="true"
          className="text-sm leading-none transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </Link>

      <div className="flex items-stretch">
        <button
          type="button"
          className="type-micro inline-flex w-44 items-center justify-center whitespace-nowrap bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span>Obter Atualizações</span>
        </button>
      </div>
    </div>
  )
}
