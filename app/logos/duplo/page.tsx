import type { Metadata } from "next"
import Link from "next/link"
import { RotorMark } from "@/components/logo"
import { solDuploVariants, SolDuploLockup } from "@/components/logo-sol-duplo"

export const metadata: Metadata = {
  title: "sol duplo · Nylla",
  description:
    "15 variantes do sol da Nylla com um segundo sol: mesma geometria de braço, novas composições, posições e cores.",
}

export default function SolDuploPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <header className="mb-14 max-w-2xl">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {"<- voltar"}
            </Link>
            <Link
              href="/logo"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {"sistema de marca ->"}
            </Link>
            <Link
              href="/logos"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {"estudo tipográfico ->"}
            </Link>
            <Link
              href="/logos/animacoes"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {"animações do sol ->"}
            </Link>
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">Sol duplo</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            15 variantes que mantêm o sol atual e acrescentam um segundo. O braço, o traço e o
            núcleo são exatamente os do logo em uso: o que muda é posição, escala, espelhamento,
            contagem de braços e, em três casos, uma segunda cor.
          </p>
        </header>

        <div className="mb-4 rounded-xl border border-border bg-card">
          <div className="flex min-h-40 items-center justify-center p-10">
            <RotorMark className="h-16 w-16 text-primary" />
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-border px-5 py-3.5">
            <span className="font-mono text-xs uppercase tracking-widest text-foreground">
              referência
            </span>
            <span className="truncate font-mono text-xs text-muted-foreground">
              sol atual · 6 braços
            </span>
          </div>
        </div>

        <section
          aria-label="variantes de sol duplo"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {solDuploVariants.map(({ id, name, note, Mark }) => (
            <div
              key={id}
              className="card-lift flex flex-col overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="flex min-h-44 flex-1 items-center justify-center p-8">
                <Mark uid={`${id}-lg`} className="h-auto w-44" />
              </div>
              <div className="flex items-center justify-center border-t border-border px-5 py-4">
                <SolDuploLockup Mark={Mark} uid={`${id}-sm`} />
              </div>
              <div className="flex items-baseline justify-between gap-3 border-t border-border px-5 py-3.5">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground">
                  {name}
                </span>
                <span className="truncate font-mono text-xs text-muted-foreground">{note}</span>
              </div>
            </div>
          ))}
        </section>

        <footer className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-border pt-6">
          <span className="font-mono text-xs text-muted-foreground">braço: M32 20 Q42 14 44 6</span>
          <span className="font-mono text-xs text-muted-foreground">peso óptico: constante</span>
          <span className="font-mono text-xs text-muted-foreground">
            critério: dois sóis, um só desenho
          </span>
        </footer>
      </div>
    </main>
  )
}
