import type { SVGProps } from "react"

/**
 * Minimal AI marks — série 2. Vinte derivações dos dez estudos originais
 * (cubo, nó, portal, burst, órbita, traço, gate, malha), mantendo a mesma
 * gramática: monocromático via currentColor, geometria limpa, opacidades
 * em 3 níveis no máximo.
 */

/* ---------------------------------------------------------------- cubos */

/** 11 — Pilha isométrica: dois cubos empilhados, camadas de modelo. */
export function StackMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="pilha" {...props}>
      <g fill="currentColor">
        <path d="M32 30 L48 39 L32 48 L16 39 Z" opacity="0.3" />
        <path d="M16 39 L32 48 V60 L16 51 Z" opacity="0.2" />
        <path d="M48 39 L32 48 V60 L48 51 Z" opacity="0.12" />
        <path d="M32 6 L48 15 L32 24 L16 15 Z" />
        <path d="M16 15 L32 24 V36 L16 27 Z" opacity="0.5" />
        <path d="M48 15 L32 24 V36 L48 27 Z" opacity="0.25" />
      </g>
    </svg>
  )
}

/** 12 — Cubo fatiado: face superior deslocada, um glitch volumétrico. */
export function SplitCubeMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="cubo fatiado" {...props}>
      <g fill="currentColor">
        <path d="M37 4 L59.5 17 L37 30 L14.5 17 Z" />
        <path d="M9.5 25 L32 38 V58 L9.5 45 Z" opacity="0.45" />
        <path d="M54.5 25 L32 38 V58 L54.5 45 Z" opacity="0.2" />
      </g>
    </svg>
  )
}

/** 13 — Cubo em x-ray: só vértices, o volume implícito. */
export function VertexCubeMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="vértices" {...props}>
      <g fill="currentColor">
        <circle cx="32" cy="6" r="4" />
        <circle cx="54.5" cy="19" r="4" opacity="0.7" />
        <circle cx="9.5" cy="19" r="4" opacity="0.7" />
        <circle cx="32" cy="32" r="5.5" />
        <circle cx="54.5" cy="45" r="4" opacity="0.4" />
        <circle cx="9.5" cy="45" r="4" opacity="0.4" />
        <circle cx="32" cy="58" r="4" opacity="0.55" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ nós */

/** 14 — Laço duplo: infinito vertical, dois estados entrelaçados. */
export function LoopMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="laço" {...props}>
      <g stroke="currentColor" strokeWidth="5.5" fill="none">
        <circle cx="32" cy="21" r="12" />
        <circle cx="32" cy="43" r="12" opacity="0.45" />
      </g>
    </svg>
  )
}

/** 15 — Nó quádruplo: quatro laços a 45 graus, uma flor técnica. */
export function QuadKnotMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="nó quádruplo" {...props}>
      <g stroke="currentColor" strokeWidth="4.5" fill="none">
        <rect x="14" y="26" width="36" height="12" rx="6" />
        <rect x="14" y="26" width="36" height="12" rx="6" transform="rotate(45 32 32)" opacity="0.7" />
        <rect x="14" y="26" width="36" height="12" rx="6" transform="rotate(90 32 32)" />
        <rect x="14" y="26" width="36" height="12" rx="6" transform="rotate(135 32 32)" opacity="0.7" />
      </g>
    </svg>
  )
}

/** 16 — Trança: três arcos que se cruzam num fluxo contínuo. */
export function BraidMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="trança" {...props}>
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M12 44 Q32 8 52 44" />
        <path d="M12 32 Q32 56 52 32" opacity="0.55" />
        <path d="M20 52 Q32 40 44 52" opacity="0.3" />
      </g>
    </svg>
  )
}

/* -------------------------------------------------------------- portais */

/** 17 — Portal triplo: hexágonos aninhados afunilando ao centro. */
export function TunnelMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="túnel" {...props}>
      <g stroke="currentColor" strokeLinejoin="round" fill="none">
        <path d="M32 4 L56.2 18 V46 L32 60 L7.8 46 V18 Z" strokeWidth="3.5" />
        <path d="M32 15 L46.7 23.5 V40.5 L32 49 L17.3 40.5 V23.5 Z" strokeWidth="3" opacity="0.55" />
        <path d="M32 25 L38 28.5 V35.5 L32 39 L26 35.5 V28.5 Z" strokeWidth="2.5" opacity="0.3" />
      </g>
    </svg>
  )
}

/** 18 — Portal com abertura: hexágono com fresta e token saindo. */
export function SlitPortalMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="fresta" {...props}>
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M40 8.5 L54.5 19 V45 L32 58 L9.5 45 V19 L24 8.5" />
      </g>
      <g fill="currentColor">
        <circle cx="32" cy="6" r="4.5" />
        <circle cx="32" cy="20" r="3" opacity="0.55" />
        <circle cx="32" cy="32" r="2" opacity="0.3" />
      </g>
    </svg>
  )
}

/** 19 — Diafragma: hexágono com pás convergindo, uma íris. */
export function IrisMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="íris" {...props}>
      <g stroke="currentColor" strokeWidth="4" strokeLinejoin="round" fill="none">
        <path d="M32 6 L54.5 19 V45 L32 58 L9.5 45 V19 Z" />
      </g>
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5">
        <line x1="32" y1="14" x2="32" y2="24" />
        <line x1="47.5" y1="23" x2="39" y2="28" />
        <line x1="47.5" y1="41" x2="39" y2="36" />
        <line x1="32" y1="50" x2="32" y2="40" />
        <line x1="16.5" y1="41" x2="25" y2="36" />
        <line x1="16.5" y1="23" x2="25" y2="28" />
      </g>
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </svg>
  )
}

/* --------------------------------------------------------------- bursts */

/** 20 — Meia-explosão: raios só no hemisfério superior, um amanhecer. */
export function RiseMark(props: SVGProps<SVGSVGElement>) {
  const angles = [-80, -60, -40, -20, 0, 20, 40, 60, 80]
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="amanhecer" {...props}>
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        {angles.map((a, i) => (
          <line
            key={a}
            x1="32"
            y1="44"
            x2="32"
            y2={44 - (i % 2 === 0 ? 24 : 18)}
            transform={`rotate(${a} 32 44)`}
          />
        ))}
      </g>
      <line x1="14" y1="54" x2="50" y2="54" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}

/** 21 — Burst pontilhado: raios de pontos que se dissipam. */
export function DotBurstMark(props: SVGProps<SVGSVGElement>) {
  const arms = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="burst de pontos" {...props}>
      <circle cx="32" cy="32" r="6" fill="currentColor" />
      {arms.map((a) => (
        <g key={a} transform={`rotate(${a} 32 32)`} fill="currentColor">
          <circle cx="32" cy="17" r="3" opacity="0.7" />
          <circle cx="32" cy="8" r="2" opacity="0.35" />
        </g>
      ))}
    </svg>
  )
}

/** 22 — Burst rotor: raios curvos, energia em rotação. */
export function SpinBurstMark(props: SVGProps<SVGSVGElement>) {
  const arms = [0, 60, 120, 180, 240, 300]
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="rotor" {...props}>
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none">
        {arms.map((a) => (
          <path key={a} d="M32 20 Q42 14 44 6" transform={`rotate(${a} 32 32)`} />
        ))}
      </g>
      <circle cx="32" cy="32" r="5" fill="currentColor" />
    </svg>
  )
}

/** 23 — Burst pixel diagonal: quantizado, girado 45 graus. */
export function PixelStarMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="pixel-crisp"
      role="img"
      aria-label="estrela pixel"
      {...props}
    >
      <g fill="currentColor">
        <rect x="26" y="26" width="12" height="12" />
        <rect x="26" y="10" width="12" height="6" opacity="0.7" />
        <rect x="26" y="48" width="12" height="6" opacity="0.7" />
        <rect x="10" y="26" width="6" height="12" opacity="0.7" />
        <rect x="48" y="26" width="6" height="12" opacity="0.7" />
        <rect x="20" y="20" width="6" height="6" />
        <rect x="38" y="20" width="6" height="6" />
        <rect x="20" y="38" width="6" height="6" />
        <rect x="38" y="38" width="6" height="6" />
        <rect x="26" y="2" width="12" height="4" opacity="0.3" />
        <rect x="26" y="58" width="12" height="4" opacity="0.3" />
        <rect x="2" y="26" width="4" height="12" opacity="0.3" />
        <rect x="58" y="26" width="4" height="12" opacity="0.3" />
      </g>
    </svg>
  )
}

/* -------------------------------------------------------------- órbitas */

/** 24 — Átomo: duas elipses cruzadas em torno do núcleo. */
export function AtomMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="átomo" {...props}>
      <g stroke="currentColor" strokeWidth="3.5" fill="none">
        <ellipse cx="32" cy="32" rx="26" ry="11" transform="rotate(-30 32 32)" opacity="0.6" />
        <ellipse cx="32" cy="32" rx="26" ry="11" transform="rotate(30 32 32)" opacity="0.6" />
      </g>
      <circle cx="32" cy="32" r="6.5" fill="currentColor" />
      <circle cx="52" cy="18" r="3.5" fill="currentColor" />
    </svg>
  )
}

/** 25 — Órbita dupla: dois satélites em anéis concêntricos. */
export function TwinOrbitMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="órbita dupla" {...props}>
      <circle cx="32" cy="32" r="6" fill="currentColor" />
      <circle cx="32" cy="32" r="15" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.55" />
      <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
      <circle cx="47" cy="32" r="3.5" fill="currentColor" />
      <circle cx="17" cy="14" r="3.5" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

/** 26 — Órbita pixel: o anel quantizado em células. */
export function PixelOrbitMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="pixel-crisp"
      role="img"
      aria-label="órbita pixel"
      {...props}
    >
      <g fill="currentColor">
        <rect x="26" y="26" width="12" height="12" />
        <rect x="26" y="6" width="12" height="5" opacity="0.45" />
        <rect x="26" y="53" width="12" height="5" opacity="0.45" />
        <rect x="6" y="26" width="5" height="12" opacity="0.45" />
        <rect x="53" y="26" width="5" height="12" opacity="0.45" />
        <rect x="12" y="12" width="6" height="6" opacity="0.45" />
        <rect x="46" y="12" width="6" height="6" opacity="0.45" />
        <rect x="12" y="46" width="6" height="6" opacity="0.45" />
        <rect x="46" y="46" width="6" height="6" />
      </g>
    </svg>
  )
}

/* --------------------------------------------------------------- traços */

/** 27 — Monograma "y" em traço contínuo, o irmão do "n". */
export function StrokeYMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="y" {...props}>
      <g stroke="currentColor" strokeWidth="9" strokeLinecap="round" fill="none">
        <path d="M17 12 V28 Q17 40 30 40 H47" />
        <path d="M47 12 V44 Q47 56 34 56 H26" opacity="0.6" />
      </g>
    </svg>
  )
}

/** 28 — Ligadura "ny": os dois monogramas partilhando uma haste. */
export function StrokeNYMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 64" role="img" aria-label="ny" {...props}>
      <g stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" fill="none">
        <path d="M10 50 V26 Q10 12 24 12 Q38 12 38 26 V50" />
        <path d="M56 14 V32 Q56 42 66 42 H86" opacity="0.75" />
        <path d="M86 14 V44 Q86 56 74 56 H66" opacity="0.45" />
      </g>
    </svg>
  )
}

/** 29 — Traço espiral: um caminho que converge ao centro. */
export function CoilMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="espiral" {...props}>
      <path
        d="M32 6 A26 26 0 1 1 6 32 A20 20 0 1 1 46 32 A14 14 0 1 1 32 18 A8 8 0 1 1 24 26"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/* ---------------------------------------------------------------- gates */

/** 30 — Gate duplo: brackets aninhados, escopo dentro de escopo. */
export function NestedGateMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="gate duplo" {...props}>
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M18 10 H10 V54 H18" />
        <path d="M46 10 H54 V54 H46" />
        <path d="M27 20 H23 V44 H27" opacity="0.5" />
        <path d="M37 20 H41 V44 H37" opacity="0.5" />
      </g>
      <circle cx="32" cy="32" r="4.5" fill="currentColor" />
    </svg>
  )
}

/** 31 — Gate fluxo: tokens em fila atravessando a barreira. */
export function FlowGateMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="fluxo" {...props}>
      <g fill="currentColor">
        <rect x="29" y="8" width="6" height="48" rx="3" />
        <circle cx="10" cy="32" r="3" opacity="0.3" />
        <circle cx="19" cy="32" r="3.5" opacity="0.6" />
        <circle cx="45" cy="32" r="4.5" />
        <circle cx="56" cy="32" r="3" opacity="0.6" />
      </g>
    </svg>
  )
}

/* ---------------------------------------------------------------- malhas */

/** 32 — Malha quadrada: quatro nós, todas as ligações. */
export function GridMeshMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="malha quadrada" {...props}>
      <g stroke="currentColor" strokeWidth="3" opacity="0.4">
        <line x1="16" y1="16" x2="48" y2="16" />
        <line x1="16" y1="48" x2="48" y2="48" />
        <line x1="16" y1="16" x2="16" y2="48" />
        <line x1="48" y1="16" x2="48" y2="48" />
        <line x1="16" y1="16" x2="48" y2="48" />
        <line x1="48" y1="16" x2="16" y2="48" />
      </g>
      <g fill="currentColor">
        <circle cx="16" cy="16" r="5.5" />
        <circle cx="48" cy="16" r="5.5" opacity="0.75" />
        <circle cx="16" cy="48" r="5.5" opacity="0.75" />
        <circle cx="48" cy="48" r="5.5" />
      </g>
    </svg>
  )
}

/** 33 — Anel de nós: seis pontos em círculo ligados ao centro. */
export function HubMark(props: SVGProps<SVGSVGElement>) {
  const nodes = [0, 60, 120, 180, 240, 300]
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="hub" {...props}>
      <g stroke="currentColor" strokeWidth="2.5" opacity="0.4">
        {nodes.map((a) => (
          <line key={a} x1="32" y1="32" x2="32" y2="8" transform={`rotate(${a} 32 32)`} />
        ))}
      </g>
      <g fill="currentColor">
        {nodes.map((a, i) => (
          <circle key={a} cx="32" cy="8" r="4" transform={`rotate(${a} 32 32)`} opacity={i % 2 === 0 ? 1 : 0.55} />
        ))}
        <circle cx="32" cy="32" r="6" />
      </g>
    </svg>
  )
}

/** 34 — Constelação: nós dispersos, um caminho de inferência. */
export function PathMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="caminho" {...props}>
      <g stroke="currentColor" strokeWidth="3" opacity="0.4" fill="none">
        <path d="M10 50 L24 26 L40 38 L54 12" />
      </g>
      <g fill="currentColor">
        <circle cx="10" cy="50" r="4.5" opacity="0.55" />
        <circle cx="24" cy="26" r="4.5" opacity="0.75" />
        <circle cx="40" cy="38" r="4.5" opacity="0.75" />
        <circle cx="54" cy="12" r="5.5" />
      </g>
    </svg>
  )
}

/* --------------------------------------------------------------- outros */

/** 35 — Pulso: onda quadrada, o batimento digital. */
export function PulseMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="pulso" {...props}>
      <path
        d="M6 32 H18 V16 H30 V48 H42 V26 H58"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

/** 36 — Faísca: losango de quatro pontas, o glint da geração. */
export function SparkMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="faísca" {...props}>
      <path
        d="M32 4 Q35 26 58 32 Q35 38 32 60 Q29 38 6 32 Q29 26 32 4 Z"
        fill="currentColor"
      />
      <circle cx="50" cy="12" r="3.5" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
