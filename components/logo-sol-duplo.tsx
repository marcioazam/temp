import type { SVGProps } from "react"

/* ==========================================================================
   Sol duplo : 15 variantes construídas sobre o sol atual da Nylla.

   Toda variante reusa a geometria exata do RotorMark:
     braço  "M32 20 Q42 14 44 6"  ·  6 braços a 60°  ·  stroke 5 round
     núcleo circle r=5 em (32,32)  ·  grid base 64x64

   Nenhuma curva é redesenhada. O que muda entre variantes é apenas
   posição, escala, rotação, espelhamento, contagem de braços e cor.
   ========================================================================== */

/** Braço original do sol. Tip a ~28.6u do centro. */
const ARM = "M32 20 Q42 14 44 6"
/** Braço curto : companheiro discreto. */
const ARM_SHORT = "M32 22 Q39 18 40 13"
/** Braço externo : começa fora do disco, para halos concêntricos. */
const ARM_RING = "M32 14 Q38 10 39 5"

/* Segunda cor: usada em 3 das 15 variantes. Amarelo âmbar = sol quente,
   cyan/magenta/aço = sol frio, o contraponto do par binário. */
const CYAN = "#24d3f5"
const MAGENTA = "#f5249c"
const COOL = "#9db4c8"

const PRIMARY = "var(--primary)"

/** Distribui `n` braços igualmente em 360°, a partir de `offset`. */
function spread(n: number, offset = 0): number[] {
  return Array.from({ length: n }, (_, i) => offset + (360 / n) * i)
}

type SolProps = {
  /** Centro no canvas final. */
  x: number
  y: number
  /** Escala relativa ao sol original (1 = sol cheio de 64u). */
  s: number
  /** Nº de braços igualmente distribuídos. Ignorado se `angles` for passado. */
  arms?: number
  /** Rotação do leque de braços, em graus. */
  armOffset?: number
  /** Ângulos explícitos : permite meio-sol (leque parcial). */
  angles?: number[]
  /**
   * Espessura do traço em unidades FINAIS do canvas.
   * Dividida pela escala, então o peso óptico não muda entre sóis de
   * tamanhos diferentes : é isso que mantém o par lendo como um só desenho.
   */
  weight?: number
  /** Raio do núcleo em unidades BASE : acompanha a escala do sol. 0 = sem núcleo. */
  core?: number
  color?: string
  opacity?: number
  /** Inverte a curvatura dos braços : o sol gêmeo gira ao contrário. */
  mirror?: boolean
  armPath?: string
}

/** Um sol. Primitivo de todas as variantes. */
function Sol({
  x,
  y,
  s,
  arms = 6,
  armOffset = 0,
  angles,
  weight = 5,
  core = 5,
  color = PRIMARY,
  opacity = 1,
  mirror = false,
  armPath = ARM,
}: SolProps) {
  const armAngles = angles ?? spread(arms, armOffset)

  return (
    <g transform={`translate(${x} ${y}) scale(${s}) translate(-32 -32)`} opacity={opacity}>
      {/* Espelha em torno de x=32 : x -> 64-x */}
      <g transform={mirror ? "translate(64 0) scale(-1 1)" : undefined}>
        <g fill="none" stroke={color} strokeWidth={weight / s} strokeLinecap="round">
          {armAngles.map((a) => (
            <path key={a} d={armPath} transform={`rotate(${a} 32 32)`} />
          ))}
        </g>
        {core > 0 && <circle cx={32} cy={32} r={core} fill={color} />}
      </g>
    </g>
  )
}

/** Props de toda variante. `uid` isola ids de <mask> quando o mark repete na página. */
export type SolDuploProps = SVGProps<SVGSVGElement> & { uid?: string }

/** Canvas comum : 96x64 mantém a escala óptica igual em toda a família. */
function Canvas({ children, ...props }: SolDuploProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 64"
      role="img"
      aria-label="Nylla : sol duplo"
      {...props}
    >
      {children}
    </svg>
  )
}

/* ---- 01 · binário -------------------------------------------------------
   Dois sóis idênticos, mesma massa, mesma órbita. O par mais neutro. */
function Binario(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={30} y={32} s={0.48} />
      <Sol x={66} y={32} s={0.48} />
    </Canvas>
  )
}

/* ---- 02 · eclipse -------------------------------------------------------
   Um sol maior, o segundo passando à frente em opacidade reduzida. */
function Eclipse(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={42} y={32} s={0.76} />
      <Sol x={68} y={22} s={0.44} opacity={0.55} />
    </Canvas>
  )
}

/* ---- 03 · órbita --------------------------------------------------------
   Hierarquia clara: sol principal e um satélite pequeno e leve. */
function Orbita(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={44} y={32} s={0.78} />
      <Sol x={80} y={12} s={0.26} weight={3.4} core={6} />
    </Canvas>
  )
}

/* ---- 04 · espelho ------------------------------------------------------
   Gêmeos com curvatura invertida : giram em sentidos opostos. */
function Espelho(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={30} y={32} s={0.48} />
      <Sol x={66} y={32} s={0.48} mirror />
    </Canvas>
  )
}

/* ---- 05 · infinito -----------------------------------------------------
   Os dois discos se tocam e os braços se intercalam a 30°. */
function Infinito(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={34} y={32} s={0.52} />
      <Sol x={62} y={32} s={0.52} armOffset={30} />
    </Canvas>
  )
}

/* ---- 06 · núcleo duplo -------------------------------------------------
   Um único leque de 12 braços, dois núcleos: um sistema, duas estrelas. */
function NucleoDuplo(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={48} y={32} s={0.8} arms={12} weight={4} core={0} />
      <Sol x={40} y={32} s={0.8} arms={0} core={4.4} />
      <Sol x={56} y={32} s={0.8} arms={0} core={4.4} />
    </Canvas>
  )
}

/* ---- 07 · entrelaçado --------------------------------------------------
   Sobreposição forte com translucidez : a interseção fica mais densa. */
function Entrelacado(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={40} y={32} s={0.56} opacity={0.72} />
      <Sol x={56} y={32} s={0.56} armOffset={30} opacity={0.72} />
    </Canvas>
  )
}

/* ---- 08 · halo ---------------------------------------------------------
   Concêntrico: o segundo sol envolve o primeiro como coroa. */
function Halo(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={48} y={32} s={0.95} arms={12} armPath={ARM_RING} weight={2.4} core={0} opacity={0.42} />
      <Sol x={48} y={32} s={0.5} />
    </Canvas>
  )
}

/* ---- 09 · vertical -----------------------------------------------------
   Empilhados : nascente e poente no mesmo eixo. */
function Vertical(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={48} y={17} s={0.42} />
      <Sol x={48} y={47} s={0.42} />
    </Canvas>
  )
}

/* ---- 10 · diagonal ----------------------------------------------------
   Eixo ascendente : dá direção e movimento ao par. */
function Diagonal(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={30} y={45} s={0.46} />
      <Sol x={66} y={19} s={0.46} />
    </Canvas>
  )
}

/* ---- 11 · recorte -----------------------------------------------------
   O segundo sol abre espaço negativo no primeiro : encaixe físico.
   A máscara vaza um raio maior que o sol menor, criando a folga de ar que
   faz o recorte ser lido como encaixe e não como sobreposição. */
function Recorte({ uid = "a", ...props }: SolDuploProps) {
  const maskId = `sol-duplo-bite-${uid}`

  return (
    <Canvas {...props}>
      <mask id={maskId} maskUnits="userSpaceOnUse">
        <rect x="0" y="0" width="96" height="64" fill="#fff" />
        <circle cx="64" cy="32" r="19" fill="#000" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <Sol x={38} y={32} s={0.82} />
      </g>
      <Sol x={64} y={32} s={0.4} />
    </Canvas>
  )
}

/* ---- 12 · meio a meio -------------------------------------------------
   Dois leques de 3 braços, cada um com seu núcleo: um sol partido em dois.
   O afastamento é o que faz ler como par : encostados, viram um sol só. */
function MeioAMeio(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={34} y={32} s={0.58} angles={[120, 180, 240]} />
      <Sol x={62} y={32} s={0.58} angles={[300, 0, 60]} />
    </Canvas>
  )
}

/* ---- 13 · binário cyan ------------------------------------------------
   Par de massas iguais, temperaturas opostas. */
function BinarioCyan(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={30} y={32} s={0.48} />
      <Sol x={66} y={32} s={0.48} color={CYAN} />
    </Canvas>
  )
}

/* ---- 14 · eclipse magenta ---------------------------------------------
   Companheiro em magenta: sobreposição vira mistura de luz. */
function EclipseMagenta(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={42} y={32} s={0.76} />
      <Sol x={68} y={22} s={0.44} color={MAGENTA} opacity={0.7} />
    </Canvas>
  )
}

/* ---- 15 · quente e frio -----------------------------------------------
   Âmbar e aço, curvaturas espelhadas. O par mais editorial. */
function QuenteFrio(props: SolDuploProps) {
  return (
    <Canvas {...props}>
      <Sol x={30} y={32} s={0.48} />
      <Sol x={66} y={32} s={0.48} color={COOL} mirror />
    </Canvas>
  )
}

export type SolDuploVariant = {
  id: string
  name: string
  note: string
  Mark: (props: SolDuploProps) => React.ReactElement
}

export const solDuploVariants: SolDuploVariant[] = [
  { id: "binario", name: "01 binário", note: "massas iguais · par neutro", Mark: Binario },
  { id: "eclipse", name: "02 eclipse", note: "o segundo passa à frente", Mark: Eclipse },
  { id: "orbita", name: "03 órbita", note: "satélite leve · hierarquia", Mark: Orbita },
  { id: "espelho", name: "04 espelho", note: "curvatura invertida", Mark: Espelho },
  { id: "infinito", name: "05 infinito", note: "discos tangentes", Mark: Infinito },
  { id: "nucleo-duplo", name: "06 núcleo duplo", note: "12 braços · dois núcleos", Mark: NucleoDuplo },
  { id: "entrelacado", name: "07 entrelaçado", note: "interseção mais densa", Mark: Entrelacado },
  { id: "halo", name: "08 halo", note: "concêntrico · coroa externa", Mark: Halo },
  { id: "vertical", name: "09 vertical", note: "nascente e poente", Mark: Vertical },
  { id: "diagonal", name: "10 diagonal", note: "eixo ascendente", Mark: Diagonal },
  { id: "recorte", name: "11 recorte", note: "espaço negativo · encaixe", Mark: Recorte },
  { id: "meio-a-meio", name: "12 meio a meio", note: "3 + 3 braços · sol partido", Mark: MeioAMeio },
  { id: "binario-cyan", name: "13 binário cyan", note: "2ª cor · temperaturas opostas", Mark: BinarioCyan },
  { id: "eclipse-magenta", name: "14 eclipse magenta", note: "2ª cor · mistura de luz", Mark: EclipseMagenta },
  { id: "quente-frio", name: "15 quente e frio", note: "2ª cor · âmbar e aço", Mark: QuenteFrio },
]

/**
 * Lockup de avaliação: mark + wordmark, no tamanho real de uso.
 * O wordmark é texto em mono (mesma receita do lockup do navbar) em vez do
 * NyllaWordmark pixel : aquele componente desenha "nycode", não "Nylla".
 */
export function SolDuploLockup({
  Mark,
  uid,
}: {
  Mark: SolDuploVariant["Mark"]
  uid: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Mark uid={uid} className="h-7 w-auto" />
      <span className="type-wordmark text-base text-foreground">Nylla</span>
    </div>
  )
}
