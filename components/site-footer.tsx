import Link from "next/link"
import { NyMark } from "@/components/logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-end md:justify-between md:px-6">
        <div>
          <NyMark className="h-8 w-auto text-foreground" />
          <p className="mt-4 max-w-xs font-mono text-xs leading-relaxed text-muted-foreground">
            Gateway de LLM para geração de código e agents. Um endpoint, todos os modelos.
          </p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-muted-foreground">
          <Link href="/#recursos" className="transition-colors hover:text-foreground">
            Recursos
          </Link>
          <Link href="/#harnesses" className="transition-colors hover:text-foreground">
            Harnesses
          </Link>
          <Link href="/#planos" className="transition-colors hover:text-foreground">
            Planos
          </Link>
          <Link href="/docs" className="transition-colors hover:text-foreground">
            Docs
          </Link>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <p className="font-mono text-[11px] text-muted-foreground">© {new Date().getFullYear()} nycode</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="flow-pulse absolute inline-flex h-full w-full rounded-full bg-ultra/50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ultra" />
            </span>
            gateway operacional
          </span>
        </div>
      </div>
    </footer>
  )
}
