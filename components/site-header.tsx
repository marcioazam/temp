"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { RotorMark } from "@/components/logo"
import { useLanguage } from "@/components/language-provider"


const nav = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Harness", href: "/#harnesses" },
  { label: "Instalar", href: "/#instalar" },
  { label: "Integração", href: "/#endpoint" },
  { label: "Recursos", href: "/#recursos" },
  { label: "Comparativo", href: "/#comparativo" },
  { label: "Planos", href: "/#planos" },
  { label: "FAQ", href: "/#faq" },
]

export function SiteHeader() {
  const { locale, setLocale, enabled: languageEnabled } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 0)
    updateHeader()
    window.addEventListener("scroll", updateHeader, { passive: true })
    return () => window.removeEventListener("scroll", updateHeader)
  }, [])

  return (
    <header
      className={`site-background sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? "border-border/35" : "border-transparent"
      }`}
    >
        <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center px-4 md:px-9">
          <Link
            href="/"
            aria-label="Nylla, início"
            className="flex shrink-0 items-center gap-2 text-foreground sm:gap-2.5"
          >
            <RotorMark aria-hidden="true" className="h-6 w-6 shrink-0 text-logo sm:h-7 sm:w-7" />
            <span className="type-wordmark text-[1.1875rem] sm:text-[1.375rem]">Nylla</span>
          </Link>

          <nav
            aria-label="Navegação principal"
            className="type-label hidden items-center gap-7 text-muted-foreground md:ml-10 md:flex"
          >
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative py-1 transition-colors hover:text-foreground"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center">
            {languageEnabled && (
              <div
                className="type-micro mr-3 hidden h-[30px] items-center border border-foreground/25 bg-transparent p-0.5 text-[10px] tracking-[0.1em] sm:flex md:mr-6"
                role="group"
                aria-label={locale === "pt" ? "Selecionar idioma" : "Select language"}
                data-no-translate
              >
                {(["pt", "en"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLocale(option)}
                    aria-pressed={locale === option}
                    aria-label={option === "pt" ? "Português" : "English"}
                    className={`grid h-6 min-w-7 place-items-center px-1 transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-foreground ${
                      locale === option
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {option.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Link
                href="/docs"
                className="type-micro hidden items-center whitespace-nowrap border border-foreground/45 bg-background px-3.5 py-2 text-foreground transition-colors hover:border-foreground hover:bg-background sm:inline-flex"
              >
                Ler Docs
              </Link>
              <Link
                href="/#planos"
                className="type-micro group relative inline-flex items-center gap-1.5 overflow-hidden whitespace-nowrap border border-canvas-paper bg-canvas-paper px-3.5 py-2 text-background transition-opacity hover:opacity-90"
              >
                Começar
                <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
    </header>
  )
}
