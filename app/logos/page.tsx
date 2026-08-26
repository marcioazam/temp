import type { Metadata } from "next"
import Link from "next/link"
import {
  Silkscreen,
  Press_Start_2P,
  VT323,
  Space_Grotesk,
  Space_Mono,
  JetBrains_Mono,
  IBM_Plex_Mono,
  Chakra_Petch,
  Orbitron,
  Major_Mono_Display,
} from "next/font/google"
import { NyllaWordmark } from "@/components/logo"

const silkscreen = Silkscreen({ weight: "400", subsets: ["latin"] })
const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"] })
const vt323 = VT323({ weight: "400", subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({ weight: "500", subsets: ["latin"] })
const spaceMono = Space_Mono({ weight: "700", subsets: ["latin"] })
const jetbrains = JetBrains_Mono({ weight: "600", subsets: ["latin"] })
const plexMono = IBM_Plex_Mono({ weight: "500", subsets: ["latin"] })
const chakra = Chakra_Petch({ weight: "600", subsets: ["latin"] })
const orbitron = Orbitron({ weight: "600", subsets: ["latin"] })
const majorMono = Major_Mono_Display({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "logos · Nylla",
  description:
    "Estudo tipográfico da marca Nylla: a palavra desenhada em 10 fontes que dialogam com o wordmark pixel.",
}

const studies = [
  {
    name: "silkscreen",
    note: "pixel nativo · irmã direta do wordmark",
    className: silkscreen.className,
    size: "text-4xl md:text-5xl",
    tracking: "tracking-tight",
  },
  {
    name: "press start 2p",
    note: "pixel 8-bit · peso máximo",
    className: pressStart.className,
    size: "text-2xl md:text-3xl",
    tracking: "tracking-tight",
  },
  {
    name: "vt323",
    note: "terminal crt · fósforo verde",
    className: vt323.className,
    size: "text-6xl md:text-7xl",
    tracking: "tracking-normal",
  },
  {
    name: "space grotesk",
    note: "grotesca técnica · uso editorial",
    className: spaceGrotesk.className,
    size: "text-5xl md:text-6xl",
    tracking: "tracking-tight",
  },
  {
    name: "space mono",
    note: "mono retrô · serifa de máquina",
    className: spaceMono.className,
    size: "text-4xl md:text-5xl",
    tracking: "tracking-tight",
  },
  {
    name: "jetbrains mono",
    note: "mono de editor · onde a nylla vive",
    className: jetbrains.className,
    size: "text-4xl md:text-5xl",
    tracking: "tracking-tight",
  },
  {
    name: "ibm plex mono",
    note: "mono corporativa · neutra e firme",
    className: plexMono.className,
    size: "text-4xl md:text-5xl",
    tracking: "tracking-tight",
  },
  {
    name: "chakra petch",
    note: "cantos chanfrados · hardware",
    className: chakra.className,
    size: "text-5xl md:text-6xl",
    tracking: "tracking-tight",
  },
  {
    name: "orbitron",
    note: "geométrica sci-fi · displays",
    className: orbitron.className,
    size: "text-4xl md:text-5xl",
    tracking: "tracking-tight",
  },
  {
    name: "major mono display",
    note: "mono experimental · caixa mista",
    className: majorMono.className,
    size: "text-4xl md:text-5xl",
    tracking: "tracking-tight",
  },
]

export default function LogosPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <header className="mb-14 max-w-2xl">
          <div className="flex items-center gap-6">
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
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Estudo tipográfico
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A palavra &quot;nylla&quot; desenhada em 10 fontes que dialogam com o wordmark pixel:
            das irmãs bitmap diretas às monospace de editor, passando por grotescas técnicas.
          </p>
        </header>

        <div className="mb-4 rounded-xl border border-border bg-card">
          <div className="flex min-h-40 items-center justify-center p-10">
            <NyllaWordmark className="h-8 w-auto text-foreground md:h-9" />
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-border px-5 py-3.5">
            <span className="font-mono text-xs uppercase tracking-widest text-foreground">
              referência
            </span>
            <span className="truncate font-mono text-xs text-muted-foreground">
              wordmark pixel atual
            </span>
          </div>
        </div>

        <section
          aria-label="estudos tipográficos da marca"
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {studies.map((study) => (
            <div
              key={study.name}
              className="card-lift flex flex-col overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="flex min-h-44 flex-1 items-center justify-center p-10">
                <span
                  className={`${study.className} ${study.size} ${study.tracking} lowercase leading-none text-foreground`}
                >
                  nylla
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-border px-5 py-3.5">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground">
                  {study.name}
                </span>
                <span className="truncate font-mono text-xs text-muted-foreground">
                  {study.note}
                </span>
              </div>
            </div>
          ))}
        </section>

        <footer className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-border pt-6">
          <span className="font-mono text-xs text-muted-foreground">caixa: sempre minúscula</span>
          <span className="font-mono text-xs text-muted-foreground">cor: monocromatico</span>
          <span className="font-mono text-xs text-muted-foreground">
            critério: harmonia com o grid pixel
          </span>
        </footer>
      </div>
    </main>
  )
}
