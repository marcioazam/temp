import type { CSSProperties, ReactNode } from "react"

const ARMS = [0, 60, 120, 180, 240, 300]
const ARM_PATH = "M32 20 Q42 14 44 6"
const CENTER: CSSProperties = { transformOrigin: "32px 32px" }
const ARM_BASE: CSSProperties = { transformOrigin: "32px 20px" }

type SunProps = {
  /** Animation applied to the whole mark (arms + core). */
  bodyClass?: string
  /** Animation applied to every arm individually. */
  armClass?: string
  /** Animation applied to the core dot. */
  coreClass?: string
  /** Seconds added per arm index, producing sequential motion. */
  stagger?: number
  /** Per-arm inline vars, receives the arm index. */
  armStyle?: (index: number) => CSSProperties
  /** Arms hinge around their own base instead of the mark center. */
  hinge?: boolean
  /** Enables pathLength so dash animations use a 0–100 scale. */
  measured?: boolean
  /** Extra geometry drawn on top, e.g. an orbiting satellite. */
  extra?: ReactNode
}

/** The Nylla sun mark, wired for animation. Inherits currentColor. */
export function AnimatedSun({
  bodyClass,
  armClass,
  coreClass,
  stagger = 0,
  armStyle,
  hinge = false,
  measured = false,
  extra,
}: SunProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="h-16 w-16 text-primary"
      role="img"
      aria-label="Nylla"
    >
      <g className={bodyClass} style={CENTER}>
        <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none">
          {ARMS.map((angle, index) => (
            <g key={angle} transform={`rotate(${angle} 32 32)`}>
              <path
                d={ARM_PATH}
                pathLength={measured ? 100 : undefined}
                className={armClass}
                style={{
                  ...(hinge ? ARM_BASE : CENTER),
                  animationDelay: stagger ? `${(index * stagger).toFixed(3)}s` : undefined,
                  ...armStyle?.(index),
                }}
              />
            </g>
          ))}
        </g>
        <circle cx="32" cy="32" r="5" fill="currentColor" className={coreClass} style={CENTER} />
      </g>
      {extra}
    </svg>
  )
}

export type SunVariant = {
  id: string
  name: string
  note: string
  render: () => ReactNode
}

/** Satellite packet used by the orbit variant. */
function Satellite() {
  return (
    <g className="lg-orbit" style={CENTER}>
      <circle cx="32" cy="4" r="3" fill="currentColor" />
    </g>
  )
}

export const SUN_VARIANTS: SunVariant[] = [
  {
    id: "spin",
    name: "Spin",
    note: "Rotação contínua e linear",
    render: () => <AnimatedSun bodyClass="lg-spin" />,
  },
  {
    id: "step",
    name: "Step",
    note: "Rotação em seis passos quantizados",
    render: () => <AnimatedSun bodyClass="lg-step" />,
  },
  {
    id: "reverse",
    name: "Reverse",
    note: "Contra-rotação lenta",
    render: () => <AnimatedSun bodyClass="lg-reverse" />,
  },
  {
    id: "core",
    name: "Core",
    note: "Núcleo pulsando, braços fixos",
    render: () => <AnimatedSun coreClass="lg-core" />,
  },
  {
    id: "breathe",
    name: "Breathe",
    note: "Escala e deriva respirando",
    render: () => <AnimatedSun bodyClass="lg-breathe" />,
  },
  {
    id: "bloom",
    name: "Bloom",
    note: "Braços crescem do núcleo em cascata",
    render: () => <AnimatedSun armClass="lg-bloom" stagger={0.09} />,
  },
  {
    id: "converge",
    name: "Converge",
    note: "Braços chegam de fora e assentam",
    render: () => <AnimatedSun armClass="lg-converge" stagger={0.07} />,
  },
  {
    id: "draw",
    name: "Draw",
    note: "Cada braço se desenha pelo traço",
    render: () => <AnimatedSun armClass="lg-draw" stagger={0.12} measured />,
  },
  {
    id: "dash",
    name: "Dash",
    note: "Tracejado marchando pelos braços",
    render: () => <AnimatedSun armClass="lg-dash" measured />,
  },
  {
    id: "sequence",
    name: "Sequence",
    note: "Um braço aceso por vez",
    render: () => <AnimatedSun armClass="lg-sequence" stagger={0.3} />,
  },
  {
    id: "trail",
    name: "Trail",
    note: "Cabeça de cometa com rastro",
    render: () => <AnimatedSun armClass="lg-trail" stagger={0.266} />,
  },
  {
    id: "wobble",
    name: "Wobble",
    note: "Oscilação pendular",
    render: () => <AnimatedSun bodyClass="lg-wobble" />,
  },
  {
    id: "tumble",
    name: "Tumble",
    note: "Giro 3D no eixo vertical",
    render: () => <AnimatedSun bodyClass="lg-tumble" />,
  },
  {
    id: "flip",
    name: "Flip",
    note: "Giro 3D no eixo horizontal com pausa",
    render: () => <AnimatedSun bodyClass="lg-flip" />,
  },
  {
    id: "orbit",
    name: "Orbit",
    note: "Pacote satélite em órbita",
    render: () => <AnimatedSun bodyClass="lg-orbit-body" extra={<Satellite />} />,
  },
  {
    id: "glitch",
    name: "Glitch",
    note: "Perda de registro em passos secos",
    render: () => <AnimatedSun bodyClass="lg-glitch" />,
  },
  {
    id: "flicker",
    name: "Flicker",
    note: "Braços piscando em relógios próprios",
    render: () => (
      <AnimatedSun
        armClass="lg-flicker"
        armStyle={(index) => ({ ["--lg-dur" as string]: `${0.9 + index * 0.17}s` })}
      />
    ),
  },
  {
    id: "shimmer",
    name: "Shimmer",
    note: "Onda de brilho sobre giro lento",
    render: () => <AnimatedSun bodyClass="lg-reverse" armClass="lg-shimmer" stagger={0.18} />,
  },
  {
    id: "unfold",
    name: "Unfold",
    note: "Cada braço dobra na própria base",
    render: () => <AnimatedSun armClass="lg-unfold" stagger={0.08} hinge />,
  },
  {
    id: "lock",
    name: "Lock",
    note: "Giro rápido que trava alinhado",
    render: () => <AnimatedSun bodyClass="lg-lock" />,
  },
]
