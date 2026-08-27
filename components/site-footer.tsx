import Link from "next/link"
import { RotorMark } from "@/components/logo"

export function SiteFooter() {
  return (
    <footer className="site-background text-foreground">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-8 md:flex-row md:items-end md:justify-between md:px-9">
        <div>
          <div className="flex items-center gap-2.5 text-foreground">
            <RotorMark aria-hidden="true" className="h-8 w-8" />
            <span className="font-[family-name:var(--font-fira-code)] text-2xl font-semibold leading-none tracking-[0.02em]">
              Nylla
            </span>
          </div>
          <p className="mt-4 max-w-xs font-mono text-xs leading-relaxed text-muted-foreground">
            Gateway de LLM para geração de código e agents. Um endpoint, todos os modelos.
          </p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-muted-foreground">
          <Link href="/#sobre" className="transition-colors hover:text-foreground">
            Sobre
          </Link>
          <Link href="/#harnesses" className="transition-colors hover:text-foreground">
            Harness
          </Link>
          <Link href="/#instalar" className="transition-colors hover:text-foreground">
            Instalar
          </Link>
          <Link href="/#endpoint" className="transition-colors hover:text-foreground">
            Integração
          </Link>
          <Link href="/#recursos" className="transition-colors hover:text-foreground">
            Recursos
          </Link>
          <Link href="/#comparativo" className="transition-colors hover:text-foreground">
            Comparativo
          </Link>
          <Link href="/#planos" className="transition-colors hover:text-foreground">
            Planos
          </Link>
          <Link href="/#faq" className="transition-colors hover:text-foreground">
            FAQ
          </Link>
        </nav>
      </div>
      <div>
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 md:px-9">
          <p className="font-mono text-[11px] text-muted-foreground">© {new Date().getFullYear()} Nylla</p>
        </div>
      </div>
    </footer>
  )
}
