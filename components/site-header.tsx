"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { RotorMark } from "@/components/logo"
import { useLanguage } from "@/components/language-provider"


const nav = [
  { label: "Recursos", href: "/#recursos" },
  { label: "Harnesses", href: "/#harnesses" },
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
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? "border-muted-foreground/20 bg-background" : "border-transparent bg-transparent"
      }`}
    >
        <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center px-4 md:px-9">
          <Link
            href="/"
            aria-label="Nylla, início"
            className="flex items-center gap-2.5 text-foreground"
          >
            <RotorMark aria-hidden="true" className="h-7 w-7 shrink-0 text-logo" />
            <span className="font-[family-name:var(--font-fira-code)] text-2xl font-semibold leading-none tracking-[0.02em]">
              Nylla
            </span>
          </Link>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-7 font-mono text-xs text-muted-foreground md:ml-10 md:flex"
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
                className="mr-6 flex h-[30px] items-center border border-foreground/25 bg-transparent p-0.5 font-mono text-[10px]"
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
                className="inline-flex items-center border border-foreground/45 bg-transparent px-3.5 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-foreground hover:bg-foreground/5"
              >
                Ler Docs
              </Link>
              <Link
                href="/#planos"
                className="group relative inline-flex items-center gap-1.5 overflow-hidden border border-[#F4F3F1] bg-[#F4F3F1] px-3.5 py-1.5 font-mono text-xs text-[#090909] transition-opacity hover:opacity-90"
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
