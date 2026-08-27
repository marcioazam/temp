import Link from "next/link"
import { RotorMark } from "@/components/logo"
import { CookiePreferencesButton } from "@/components/cookie-preferences-button"

export function SiteFooter() {
  return (
    <footer className="site-background text-foreground">
      <div className="mx-auto flex min-h-56 w-full max-w-screen-2xl flex-col gap-8 px-4 py-8 md:flex-row md:items-stretch md:justify-between md:px-9">
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5 text-foreground">
            <RotorMark aria-hidden="true" className="h-8 w-8 text-primary" />
            <span className="type-wordmark text-[1.375rem]">Nylla</span>
          </div>
          <p className="type-caption mt-5 max-w-xs text-muted-foreground">
            Gateway de LLM para geração de código e agents. Um endpoint, todos os modelos.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 md:mt-auto">
            <p className="type-micro text-subtle-foreground">© {new Date().getFullYear()} Nylla</p>
            <Link
              href="/privacidade"
              className="type-micro text-subtle-foreground transition-colors hover:text-foreground"
            >
              Privacidade
            </Link>
            <CookiePreferencesButton className="type-micro text-subtle-foreground transition-colors hover:text-foreground" />
          </div>
        </div>
        <nav
          aria-label="Rodapé"
          className="type-label grid grid-flow-col grid-rows-4 gap-x-12 gap-y-3 self-center text-muted-foreground md:ml-auto"
        >
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
    </footer>
  )
}
