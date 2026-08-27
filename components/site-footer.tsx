import Link from "next/link"
import { RotorMark } from "@/components/logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-background/15 bg-foreground text-background">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-8 md:flex-row md:items-end md:justify-between md:px-9">
        <div>
          <div className="flex items-center gap-2.5 text-background">
            <RotorMark aria-hidden="true" className="h-8 w-8" />
            <span className="font-[family-name:var(--font-fira-code)] text-2xl font-semibold leading-none tracking-[0.02em]">
              Nylla
            </span>
          </div>
          <p className="mt-4 max-w-xs font-mono text-xs leading-relaxed text-background/65">
            Gateway de LLM para geração de código e agents. Um endpoint, todos os modelos.
          </p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-background/65">
          <Link href="/#sobre" className="transition-colors hover:text-background">
            Sobre
          </Link>
          <Link href="/#harnesses" className="transition-colors hover:text-background">
            Harness
          </Link>
          <Link href="/#instalar" className="transition-colors hover:text-background">
            Instalar
          </Link>
          <Link href="/#endpoint" className="transition-colors hover:text-background">
            Integração
          </Link>
          <Link href="/#recursos" className="transition-colors hover:text-background">
            Recursos
          </Link>
          <Link href="/#comparativo" className="transition-colors hover:text-background">
            Comparativo
          </Link>
          <Link href="/#planos" className="transition-colors hover:text-background">
            Planos
          </Link>
          <Link href="/#faq" className="transition-colors hover:text-background">
            FAQ
          </Link>
        </nav>
      </div>
      <div>
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 md:px-9">
          <p className="font-mono text-[11px] text-background/55">© {new Date().getFullYear()} Nylla</p>
        </div>
      </div>
    </footer>
  )
}
