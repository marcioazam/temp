"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { RotorMark } from "@/components/logo"
import { useLanguage } from "@/components/language-provider"


const nav = [
  { label: "Recursos", href: "/#recursos" },
  { label: "Harnesses", href: "/#harnesses" },
  { label: "Rotas", href: "/#rotas" },
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Planos", href: "/#planos" },
  { label: "FAQ", href: "/#faq" },
]

export function SiteHeader() {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { locale, setLocale, enabled: languageEnabled } = useLanguage()

  // A 1px sentinel above the header reports the scroll state through the
  // observer, so there is no scroll handler running on the main thread and
  // nothing to recompute per frame while the user scrolls.
  useEffect(() => {
    const node = sentinelRef.current
    if (!node || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 1,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 h-3 w-px" />
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "border-background/15 bg-foreground text-background"
            : "border-transparent bg-background text-foreground"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center px-4 md:px-9">
          <Link
            href="/"
            aria-label="Nylla, início"
            className={`flex items-center gap-2.5 transition-colors duration-300 ${
              scrolled ? "text-background" : "text-foreground"
            }`}
          >
            <RotorMark aria-hidden="true" className="h-7 w-7 shrink-0" />
            <span className="font-[family-name:var(--font-fira-code)] text-2xl font-semibold leading-none tracking-[0.02em]">
              Nylla
            </span>
          </Link>

          <nav
            aria-label="Navegação principal"
            className={`hidden items-center gap-7 font-mono text-xs transition-colors duration-300 md:ml-10 md:flex ${
              scrolled ? "text-background/65" : "text-muted-foreground"
            }`}
          >
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative py-1 transition-colors ${
                  scrolled ? "hover:text-background" : "hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    scrolled ? "bg-background" : "bg-foreground"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center">
            {languageEnabled && (
              <div
                className={`mr-6 flex h-[30px] items-center border bg-transparent p-0.5 font-mono text-[10px] transition-colors duration-300 ${
                  scrolled ? "border-background/30" : "border-foreground/25"
                }`}
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
                    className={`grid h-6 min-w-7 place-items-center px-1 transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 ${
                      scrolled
                        ? locale === option
                          ? "bg-background text-foreground focus-visible:outline-background"
                          : "text-background/55 hover:text-background focus-visible:outline-background"
                        : locale === option
                          ? "bg-foreground text-background focus-visible:outline-foreground"
                          : "text-muted-foreground hover:text-foreground focus-visible:outline-foreground"
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
                className={`inline-flex items-center border bg-transparent px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  scrolled
                    ? "border-background/45 text-background hover:border-background hover:bg-background/5"
                    : "border-foreground/45 text-foreground hover:border-foreground hover:bg-foreground/5"
                }`}
              >
                Ler Docs
              </Link>
              <Link
                href="/#planos"
                className={`group relative inline-flex items-center gap-1.5 overflow-hidden border px-3.5 py-1.5 font-mono text-xs transition-opacity hover:opacity-90 ${
                  scrolled
                    ? "border-background bg-background text-foreground"
                    : "border-foreground bg-foreground text-background"
                }`}
              >
                Começar
                <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
