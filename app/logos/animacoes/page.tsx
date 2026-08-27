import type { Metadata } from "next"
import Link from "next/link"

import { SUN_VARIANTS } from "@/components/logo-animations"

import "./logo-animations.css"

export const metadata: Metadata = {
  title: "animações do sol · Nylla",
  description:
    "Vinte variações de animação para a marca solar da Nylla, todas construídas sobre o mesmo SVG.",
}

export default function LogoAnimationsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <header className="mb-14 max-w-2xl">
          <div className="flex items-center gap-6">
            <Link
              href="/logos"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {"<- estudo tipográfico"}
            </Link>
            <Link
              href="/"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {"home ->"}
            </Link>
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Animações do sol
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A mesma geometria da marca — seis braços e um núcleo — animada de vinte formas
            diferentes. Tudo roda em transform, opacity e stroke-dash, sem custo de layout.
          </p>
        </header>

        <section
          aria-label="variações de animação da marca solar"
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {SUN_VARIANTS.map((variant, index) => (
            <div
              key={variant.id}
              className="card-lift flex flex-col overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  {variant.id}
                </span>
              </div>

              <div className="flex flex-1 items-center justify-center px-4 py-10">
                {variant.render()}
              </div>

              <div className="border-t border-border px-4 py-3">
                <p className="font-mono text-xs text-foreground">{variant.name}</p>
                <p className="mt-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
                  {variant.note}
                </p>
              </div>
            </div>
          ))}
        </section>

        <footer className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-border pt-6">
          <span className="font-mono text-xs text-muted-foreground">svg: 6 braços + núcleo</span>
          <span className="font-mono text-xs text-muted-foreground">cor: currentColor</span>
          <span className="font-mono text-xs text-muted-foreground">
            respeita prefers-reduced-motion
          </span>
        </footer>
      </div>
    </main>
  )
}
