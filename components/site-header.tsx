"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { RotorMark } from "@/components/logo"


const nav = [
  { label: "Recursos", href: "/#recursos" },
  { label: "Harnesses", href: "/#harnesses" },
  { label: "Rotas", href: "/#rotas" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Planos", href: "/#planos" },
  { label: "FAQ", href: "/#faq" },
  { label: "Docs", href: "/docs" },
]

export function SiteHeader() {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const [scrolled, setScrolled] = useState(false)

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
          scrolled ? "border-border bg-background" : "border-transparent bg-background"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center px-4 md:px-9">
          <Link
            href="/"
            aria-label="Nylla, início"
            className="flex items-center gap-2.5 text-foreground"
          >
            <RotorMark aria-hidden="true" className="h-7 w-7 shrink-0" />
            <span className="font-[family-name:var(--font-fira-code)] text-2xl font-semibold leading-none tracking-[-0.12em]">
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

          <Link
            href="/#planos"
            className="group relative ml-auto inline-flex items-center gap-1.5 overflow-hidden border border-[#F4F3F1] bg-[#F4F3F1] px-3.5 py-1.5 font-mono text-xs text-[#090909] transition-opacity hover:opacity-90"
          >
            Começar
            <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </header>
    </>
  )
}
