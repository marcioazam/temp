import type { SVGProps } from "react"

/**
 * Minimal AI marks : estudos inspirados em cursor.com, openai.com e claude.ai.
 * Todas monocromáticas via currentColor, geometria limpa, sem pixel-crisp:
 * são a contraparte "moderna e suave" do sistema pixel do Nylla.
 */

/** 01 : Cubo isométrico com faces em três tons (estudo cursor). */
export function CubeMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="cubo" {...props}>
      <g fill="currentColor">
        {/* face superior */}
        <path d="M32 6 L54.5 19 L32 32 L9.5 19 Z" />
        {/* face esquerda */}
        <path d="M9.5 19 L32 32 V58 L9.5 45 Z" opacity="0.45" />
        {/* face direita */}
        <path d="M54.5 19 L32 32 V58 L54.5 45 Z" opacity="0.2" />
      </g>
    </svg>
  )
}

/** 02 : Cubo aberto: arestas com vértice em falta, como um gate (estudo cursor). */
export function CubeWireMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="cubo aberto" {...props}>
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M32 6 L54.5 19 V45 L32 58 L9.5 45 V19 Z" />
        <path d="M9.5 19 L32 32 L54.5 19" />
        <path d="M32 32 V58" opacity="0.45" />
      </g>
      <circle cx="32" cy="32" r="4.5" fill="currentColor" />
    </svg>
  )
}

/** 03 : Nó de três laços entrelaçados (estudo openai). */
export function KnotMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="nó" {...props}>
      <g stroke="currentColor" strokeWidth="5" fill="none">
        <rect x="12" y="25" width="40" height="14" rx="7" />
        <rect x="12" y="25" width="40" height="14" rx="7" transform="rotate(60 32 32)" />
        <rect x="12" y="25" width="40" height="14" rx="7" transform="rotate(120 32 32)" />
      </g>
    </svg>
  )
}

/** 04 : Hexágono duplo em contra-rotação, um portal (estudo openai). */
export function PortalMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="portal" {...props}>
      <g stroke="currentColor" strokeWidth="4" strokeLinejoin="round" fill="none">
        <path d="M32 6 L54.5 19 V45 L32 58 L9.5 45 V19 Z" />
        <path d="M47 32 L39.5 45 H24.5 L17 32 L24.5 19 H39.5 Z" opacity="0.45" />
      </g>
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </svg>
  )
}

/** 05 : Starburst radial com raios de comprimentos variados (estudo claude). */
export function SunburstMark(props: SVGProps<SVGSVGElement>) {
  const spokes = [26, 21, 25, 20, 27, 22, 24, 20, 26, 21, 25, 22]
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="starburst" {...props}>
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        {spokes.map((len, i) => (
          <line key={i} x1="32" y1={32 - 11} x2="32" y2={32 - len} transform={`rotate(${i * 30} 32 32)`} />
        ))}
      </g>
    </svg>
  )
}

/** 06 : Starburst quantizado em pixels: a ponte entre claude e o DNA Nylla. */
export function PixelBurstMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="pixel-crisp" role="img" aria-label="burst pixel" {...props}>
      <g fill="currentColor">
        {/* núcleo */}
        <rect x="27" y="27" width="10" height="10" />
        {/* braços ortogonais */}
        <rect x="29" y="12" width="6" height="9" />
        <rect x="29" y="43" width="6" height="9" />
        <rect x="12" y="29" width="9" height="6" />
        <rect x="43" y="29" width="9" height="6" />
        {/* braços diagonais */}
        <rect x="16" y="16" width="6" height="6" opacity="0.55" />
        <rect x="42" y="16" width="6" height="6" opacity="0.55" />
        <rect x="16" y="42" width="6" height="6" opacity="0.55" />
        <rect x="42" y="42" width="6" height="6" opacity="0.55" />
        {/* pontas soltas */}
        <rect x="30" y="4" width="4" height="4" opacity="0.3" />
        <rect x="30" y="56" width="4" height="4" opacity="0.3" />
        <rect x="4" y="30" width="4" height="4" opacity="0.3" />
        <rect x="56" y="30" width="4" height="4" opacity="0.3" />
      </g>
    </svg>
  )
}

/** 07 : Núcleo com anel orbital: o modelo e seu contexto. */
export function OrbitMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="órbita" {...props}>
      <circle cx="32" cy="32" r="7" fill="currentColor" />
      <g transform="rotate(-24 32 32)">
        <ellipse cx="32" cy="32" rx="25" ry="11" stroke="currentColor" strokeWidth="3.5" fill="none" opacity="0.6" />
        <circle cx="57" cy="32" r="4" fill="currentColor" />
      </g>
    </svg>
  )
}

/** 08 : Monograma "n" em traço contínuo, terminais arredondados. */
export function StrokeNMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="n" {...props}>
      <path
        d="M17 52 V28 Q17 13 32 13 Q47 13 47 28 V52"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/** 09 : Gate: um token atravessando duas barras verticais. */
export function GateDotMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="gate" {...props}>
      <g fill="currentColor">
        <rect x="12" y="13" width="7" height="38" rx="3.5" />
        <rect x="45" y="13" width="7" height="38" rx="3.5" />
        <circle cx="32" cy="32" r="6" />
        <circle cx="24" cy="32" r="2.5" opacity="0.4" />
        <circle cx="40" cy="32" r="2.5" opacity="0.4" />
      </g>
    </svg>
  )
}

/** 10 : Malha: três nós conectados, inferência distribuída. */
export function MeshMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="malha" {...props}>
      <g stroke="currentColor" strokeWidth="3" opacity="0.45">
        <line x1="32" y1="13" x2="13" y2="48" />
        <line x1="32" y1="13" x2="51" y2="48" />
        <line x1="13" y1="48" x2="51" y2="48" />
      </g>
      <g fill="currentColor">
        <circle cx="32" cy="13" r="5.5" />
        <circle cx="13" cy="48" r="5.5" />
        <circle cx="51" cy="48" r="5.5" />
        <circle cx="32" cy="36" r="3" opacity="0.6" />
      </g>
    </svg>
  )
}
