import type { Metadata } from "next"
import Link from "next/link"
import { NyMark, NycodeWordmark } from "@/components/logo"
import {
  GlitchGhostMark,
  SliceGlitch,
  TetrisMark,
  DiceMark,
  DissolveMark,
  TokenMark,
  GatewayMark,
  ChunkMark,
  StreamMark,
  DadosMark,
  AppIconTile,
  RouteStatic,
  LatencyStatic,
  CacheStatic,
  FallbackStatic,
  MultiplexStatic,
  CreditsStatic,
  HandshakeStatic,
  ChecksumStatic,
  ChecksumYStatic,
  ChecksumNStatic,
  CursorStatic,
  ClusterStatic,
} from "@/components/logo-variants"
import {
  CubeMark,
  CubeWireMark,
  KnotMark,
  PortalMark,
  SunburstMark,
  PixelBurstMark,
  OrbitMark,
  StrokeNMark,
  GateDotMark,
  MeshMark,
} from "@/components/logo-variants-ai"

export const metadata: Metadata = {
  title: "marca — nycode",
  description:
    "Sistema de marca do nycode: variantes pixel, glitch, tetromino e dado do logotipo.",
}

function VariantCard({
  name,
  note,
  wide = false,
  children,
}: {
  name: string
  note: string
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`card-lift flex flex-col overflow-hidden rounded-xl border border-border bg-card ${
        wide ? "md:col-span-2 lg:col-span-3" : ""
      }`}
    >
      <div className="flex min-h-48 flex-1 items-center justify-center p-10">{children}</div>
      <div className="flex items-baseline justify-between gap-4 border-t border-border px-5 py-3.5">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground">{name}</span>
        <span className="truncate font-mono text-xs text-muted-foreground">{note}</span>
      </div>
    </div>
  )
}

export default function LogoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <header className="mb-14 max-w-2xl">
          <Link
            href="/"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {"<- voltar"}
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Sistema de marca
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            O logotipo do nycode nasce do pixel — a menor unidade de renderização, a mesma célula
            que compõe um token. Cada variante explora um comportamento do pixel: corrupção,
            queda, sorte e dissolução.
          </p>
        </header>

        <section aria-label="variantes do logotipo" className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <VariantCard name="base" note="monograma ny">
            <NyMark className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="ghost" note="frame corrompido">
            <GlitchGhostMark className="h-16" />
          </VariantCard>

          <VariantCard name="slice" note="tear em 3 bandas">
            <SliceGlitch className="h-16" />
          </VariantCard>

          <VariantCard name="tetromino" note="hover remonta">
            <TetrisMark className="h-20 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="dado" note="tumble 90 graus">
            <DiceMark className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="dissolve" note="pixels soltos">
            <DissolveMark className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="token" note="emissao sequencial">
            <TokenMark className="h-16" />
          </VariantCard>

          <VariantCard name="gateway" note="pacotes atraves do gate" wide>
            <GatewayMark className="h-20 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="chunk" note="payload em blocos">
            <ChunkMark className="h-16" />
          </VariantCard>

          <VariantCard name="stream" note="bits em fluxo">
            <StreamMark className="h-16" />
          </VariantCard>

          <VariantCard name="dados" note="sinal sobre amostras">
            <DadosMark className="h-24 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="icone" note="tile macos">
            <div className="flex items-center gap-6">
              <AppIconTile className="w-24" />
              <AppIconTile inverted className="w-24" />
            </div>
          </VariantCard>

          <VariantCard name="wordmark" note="assinatura completa" wide>
            <div className="flex w-full flex-col items-center gap-12 py-6">
              <NycodeWordmark className="h-9 w-auto text-foreground" />
              <SliceGlitch wordmark className="h-9" />
            </div>
          </VariantCard>
        </section>

        <h2 className="mt-16 mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          estudos — ia minimalista
        </h2>

        <section
          aria-label="variantes de IA minimalistas"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <VariantCard name="cubo" note="volume em 3 tons">
            <CubeMark className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="cubo aberto" note="arestas + núcleo">
            <CubeWireMark className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="nó" note="3 laços entrelaçados">
            <KnotMark className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="portal" note="hexágono duplo">
            <PortalMark className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="starburst" note="raios irregulares">
            <SunburstMark className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="burst pixel" note="starburst quantizado">
            <PixelBurstMark className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="órbita" note="núcleo + contexto">
            <OrbitMark className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="traço n" note="monograma contínuo">
            <StrokeNMark className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="gate" note="token entre barras">
            <GateDotMark className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="malha" note="inferência distribuída">
            <MeshMark className="h-16 w-auto text-foreground" />
          </VariantCard>
        </section>

        <h2 className="mt-16 mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          estáticas — conceitos do produto
        </h2>

        <section
          aria-label="variantes estáticas"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <VariantCard name="rota" note="pacote atravessa o gate">
            <RouteStatic className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="latência" note="p50 em destaque">
            <LatencyStatic className="h-14 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="cache" note="camada quente no topo">
            <CacheStatic className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="fallback" note="reroteado sem perda">
            <FallbackStatic className="h-12 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="multiplex" note="n entradas, 1 saída">
            <MultiplexStatic className="h-14 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="créditos" note="usage 6/10">
            <CreditsStatic className="h-10 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="handshake" note="brackets interligados">
            <HandshakeStatic className="h-14 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="checksum" note="célula verificada">
            <ChecksumStatic className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="checksum y" note="y emerge do ruído">
            <ChecksumYStatic className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="checksum n" note="n emerge do ruído">
            <ChecksumNStatic className="h-16 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="cursor" note="prompt pronto">
            <CursorStatic className="h-14 w-auto text-foreground" />
          </VariantCard>

          <VariantCard name="cluster" note="nós na constelação">
            <ClusterStatic className="h-20 w-auto text-foreground" />
          </VariantCard>
        </section>

        <footer className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-border pt-6">
          <span className="font-mono text-xs text-muted-foreground">grid: 1px = 1 unidade</span>
          <span className="font-mono text-xs text-muted-foreground">cor: monocromatico</span>
          <span className="font-mono text-xs text-muted-foreground">
            movimento: steps() quantizado
          </span>
        </footer>
      </div>
    </main>
  )
}
