import Link from "next/link"
import { RotorMark } from "@/components/logo"
import { CookiePreferencesButton } from "@/components/cookie-preferences-button"

const footerLinkClass =
  'transition-colors hover:text-foreground'

const legalLinks = [
  { label: 'Privacidade', href: '/privacidade' },
  { label: 'Termos', href: '/termos' },
  { label: 'Acessibilidade', href: '/acessibilidade' },
  { label: 'Cookies', href: '/politica-de-cookies' },
  { label: 'Preferências', href: null },
]

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
          <p className="type-micro mt-2.5 text-subtle-foreground/70">
            © {new Date().getFullYear()} Nylla
          </p>
        </div>

        <div className="type-label flex flex-col gap-8 self-start text-muted-foreground sm:flex-row sm:gap-12 md:ml-auto md:self-center">
          <nav
            aria-label="Rodapé"
            className="grid grid-flow-col grid-rows-5 gap-x-12 gap-y-3"
          >
            <Link href="/login" className={footerLinkClass}>Entrar</Link>
            <Link href="/docs" className={footerLinkClass}>Docs</Link>
            <Link href="/#instalar" className={footerLinkClass}>Instalar</Link>
            <Link href="/#endpoint" className={footerLinkClass}>Integração</Link>
            <Link href="/#recursos" className={footerLinkClass}>Recursos</Link>
            <Link href="/#comparativo" className={footerLinkClass}>Comparativo</Link>
            <Link href="/#planos" className={footerLinkClass}>Planos</Link>
            <Link href="/#faq" className={footerLinkClass}>FAQ</Link>
          </nav>

          <nav aria-label="Links legais" className="grid grid-rows-5 gap-y-3">
            {legalLinks.map((item) =>
              item.href ? (
                <Link key={item.label} href={item.href} className={footerLinkClass}>
                  {item.label}
                </Link>
              ) : (
                <CookiePreferencesButton
                  key={item.label}
                  label={item.label}
                  className={`${footerLinkClass} text-left`}
                />
              ),
            )}
          </nav>
        </div>
      </div>
    </footer>
  )
}
