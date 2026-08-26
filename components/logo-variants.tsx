"use client"

import { useState } from "react"
import { NyMark, NyllaWordmark } from "@/components/logo"

/* ------------------------------------------------------------------ */
/* Glitch ghost — the mark plus two offset ghost copies that snap in   */
/* for a few frames, like a corrupted render.                          */
/* ------------------------------------------------------------------ */
export function GlitchGhostMark({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`} aria-label="ny glitch">
      <NyMark className="relative z-10 h-full w-auto text-foreground" />
      <NyMark
        aria-hidden
        className="glitch-ghost-a absolute inset-0 h-full w-auto text-muted-foreground"
      />
      <NyMark
        aria-hidden
        className="glitch-ghost-b absolute inset-0 h-full w-auto text-muted-foreground"
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Slice glitch — the mark cut into 3 horizontal bands; each band      */
/* tears sideways on its own clock.                                    */
/* ------------------------------------------------------------------ */
const SLICES = [
  { clip: "inset(0 0 68% 0)", x: "4px", dur: "4.4s", delay: "0s" },
  { clip: "inset(32% 0 34% 0)", x: "-6px", dur: "3.8s", delay: "0.9s" },
  { clip: "inset(66% 0 0 0)", x: "5px", dur: "4.9s", delay: "1.7s" },
] as const

export function SliceGlitch({
  className,
  wordmark = false,
}: {
  className?: string
  wordmark?: boolean
}) {
  const Mark = wordmark ? NyllaWordmark : NyMark
  return (
    <div className={`relative ${className ?? ""}`} aria-label={wordmark ? "nylla glitch" : "ny glitch"}>
      {/* invisible sizer keeps layout stable */}
      <Mark className="invisible h-full w-auto" aria-hidden />
      {SLICES.map((s, i) => (
        <div key={i} aria-hidden className="absolute inset-0" style={{ clipPath: s.clip }}>
          <Mark
            className="glitch-slice h-full w-auto text-foreground"
            style={
              {
                "--slice-x": s.x,
                "--slice-dur": s.dur,
                "--slice-delay": s.delay,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tetris — the "n" decomposed into tetromino pieces that drop in and  */
/* lock into place. Hover replays the assembly.                        */
/* ------------------------------------------------------------------ */
const CELL = 6
const GAP = 1
const STEP = CELL + GAP

type Piece = { cells: [number, number][]; opacity: number; drop: number }

const PIECES: Piece[] = [
  // J piece — top bar + left shoulder
  { cells: [[1, 0], [2, 0], [3, 0], [0, 1]], opacity: 1, drop: 2 },
  // I piece — left column
  { cells: [[0, 2], [0, 3], [0, 4], [0, 5]], opacity: 0.72, drop: 4 },
  // I piece — right column (upper)
  { cells: [[4, 1], [4, 2], [4, 3]], opacity: 0.55, drop: 3 },
  // domino — right column (lower)
  { cells: [[4, 4], [4, 5]], opacity: 0.85, drop: 5 },
]

export function TetrisMark({ className }: { className?: string }) {
  const [run, setRun] = useState(0)
  return (
    <svg
      key={run}
      viewBox="0 0 34 41"
      className={`pixel-crisp ${className ?? ""}`}
      role="img"
      aria-label="n em tetrominos"
      onMouseEnter={() => setRun((r) => r + 1)}
    >
      {PIECES.map((piece, pi) => (
        <g
          key={pi}
          className="tetris-drop"
          fill="currentColor"
          opacity={piece.opacity}
          style={{ "--order": pi, "--drop": piece.drop } as React.CSSProperties}
        >
          {piece.cells.map(([c, r]) => (
            <rect key={`${c}-${r}`} x={c * STEP} y={r * STEP} width={CELL} height={CELL} />
          ))}
        </g>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Dice — a pixel die whose pips draw the "ny" diagonal; tumbles in    */
/* quantized 90° steps.                                                */
/* ------------------------------------------------------------------ */
export function DiceMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={`pixel-crisp dice-tumble ${className ?? ""}`}
      style={{ transformOrigin: "50% 50%" }}
      role="img"
      aria-label="dado pixel"
    >
      <g fill="currentColor">
        {/* stepped pixel-rounded frame */}
        <path d="M8 0h28v4h-28zM4 4h4v4h-4zM36 4h4v4h-4zM0 8h4v28h-4zM40 8h4v28h-4zM4 36h4v4h-4zM36 36h4v4h-4zM8 40h28v4h-28z" />
        {/* pips — five face */}
        <rect x="10" y="10" width="7" height="7" />
        <rect x="27" y="10" width="7" height="7" />
        <rect x="18.5" y="18.5" width="7" height="7" />
        <rect x="10" y="27" width="7" height="7" />
        <rect x="27" y="27" width="7" height="7" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Dissolve — the mark holding shape while loose pixels flicker off    */
/* its trailing edge.                                                  */
/* ------------------------------------------------------------------ */
const LOOSE: { x: number; y: number; s: number; dur: string; delay: string; o: number }[] = [
  { x: 52, y: 3, s: 3, dur: "1.6s", delay: "0s", o: 0.9 },
  { x: 58, y: 9, s: 2, dur: "2.1s", delay: "0.4s", o: 0.7 },
  { x: 54, y: 15, s: 3, dur: "1.9s", delay: "0.8s", o: 0.8 },
  { x: 61, y: 5, s: 2, dur: "2.4s", delay: "1.1s", o: 0.5 },
  { x: 57, y: 21, s: 2, dur: "1.7s", delay: "0.2s", o: 0.6 },
  { x: 63, y: 14, s: 2, dur: "2.2s", delay: "1.4s", o: 0.4 },
  { x: 66, y: 9, s: 1.5, dur: "2.6s", delay: "0.6s", o: 0.35 },
]

export function DissolveMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 70 27"
      className={`pixel-crisp ${className ?? ""}`}
      role="img"
      aria-label="ny dissolvendo em pixels"
    >
      <g fill="currentColor">
        {/* n */}
        <path d="M4 0h13v5h-13zM0 5h6v22h-6zM15 5h6v22h-6z" />
        {/* y */}
        <g transform="translate(4 0)">
          <path d="M26 0h5v11h-5zM41 0h5v11h-5zM31 9h3v7h-3zM38 9h3v7h-3zM29 11h2v5h-2zM41 11h2v5h-2zM34 13h4v10h-4zM33 16h1v11h-1zM38 16h1v7h-1zM29 23h4v4h-4z" />
        </g>
        {/* loose pixels */}
        {LOOSE.map((p, i) => (
          <rect
            key={i}
            className="px-flicker"
            x={p.x}
            y={p.y}
            width={p.s}
            height={p.s}
            opacity={p.o}
            style={{ "--fl-dur": p.dur, "--fl-delay": p.delay } as React.CSSProperties}
          />
        ))}
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Token — a block of text decomposed into pixel cells that light up   */
/* in sequence, like tokens being emitted by a model.                  */
/* ------------------------------------------------------------------ */
const TOKEN_CELLS: { x: number; y: number; w: number; delay: number }[] = [
  { x: 0, y: 0, w: 10, delay: 0 },
  { x: 12, y: 0, w: 6, delay: 0.25 },
  { x: 20, y: 0, w: 14, delay: 0.5 },
  { x: 0, y: 8, w: 8, delay: 0.75 },
  { x: 10, y: 8, w: 16, delay: 1.0 },
  { x: 28, y: 8, w: 6, delay: 1.25 },
  { x: 0, y: 16, w: 12, delay: 1.5 },
  { x: 14, y: 16, w: 6, delay: 1.75 },
  { x: 22, y: 16, w: 10, delay: 2.0 },
]

export function TokenMark({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className ?? ""}`} role="img" aria-label="tokens emitidos">
      <NyMark className="h-full w-auto shrink-0 text-foreground" />
      <svg viewBox="0 0 34 22" className="pixel-crisp h-[82%] w-auto" aria-hidden>
        <g fill="currentColor" className="text-foreground">
          {TOKEN_CELLS.map((c, i) => (
            <rect
              key={i}
              className="token-emit"
              x={c.x}
              y={c.y}
              width={c.w}
              height={5}
              style={{ "--tk-delay": `${c.delay}s`, "--tk-dur": "2.7s" } as React.CSSProperties}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Gateway — packets hop through the mark: many inputs, one gate,      */
/* one stream out. The core product diagram reduced to pixels.         */
/* ------------------------------------------------------------------ */
const GW_LANES = [
  { y: 4, delay: 0, dur: 2.6 },
  { y: 13, delay: 0.9, dur: 3.1 },
  { y: 22, delay: 1.7, dur: 2.8 },
] as const

export function GatewayMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 27"
      className={`pixel-crisp ${className ?? ""}`}
      role="img"
      aria-label="gateway roteando pacotes"
    >
      {/* input lanes */}
      <g fill="currentColor" className="text-muted-foreground" opacity={0.35}>
        {GW_LANES.map((l) => (
          <rect key={l.y} x={0} y={l.y + 1} width={26} height={1} />
        ))}
        <rect x={64} y={12.5} width={32} height={1} opacity={0.9} />
      </g>
      {/* packets in */}
      <g fill="currentColor" className="text-foreground">
        {GW_LANES.map((l) => (
          <rect
            key={l.y}
            className="gw-hop"
            x={0}
            y={l.y}
            width={4}
            height={3}
            style={
              {
                "--gw-dist": "24px",
                "--gw-dur": `${l.dur}s`,
                "--gw-delay": `${l.delay}s`,
                "--gw-steps": 8,
              } as React.CSSProperties
            }
          />
        ))}
        {/* packet out */}
        <rect
          className="gw-hop"
          x={66}
          y={11}
          width={5}
          height={4}
          style={
            { "--gw-dist": "26px", "--gw-dur": "2.2s", "--gw-delay": "0.4s", "--gw-steps": 9 } as React.CSSProperties
          }
        />
      </g>
      {/* the gate: ny monogram centered */}
      <g transform="translate(30 0)">
        <NyGlyphs />
      </g>
    </svg>
  )
}

/* Inline pixel glyphs of the ny mark, for composition inside SVGs. */
function NyGlyphs() {
  return (
    <g fill="currentColor" className="text-foreground">
      <path d="M4 0h13v5h-13zM0 5h6v22h-6zM15 5h6v22h-6z" />
      <g transform="translate(4 0)">
        <path d="M26 0h5v11h-5zM41 0h5v11h-5zM31 9h3v7h-3zM38 9h3v7h-3zM29 11h2v5h-2zM41 11h2v5h-2zM34 13h4v10h-4zM33 16h1v11h-1zM38 16h1v7h-1zM29 23h4v4h-4z" />
      </g>
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Chunk — the mark split into rectangular data chunks that shift out  */
/* of register and snap back, like chunked payloads reassembling.      */
/* ------------------------------------------------------------------ */
const CHUNKS = [
  { clip: "inset(0 50% 50% 0)", x: "3px", y: "0px", dur: "4.6s", delay: "0s" },
  { clip: "inset(0 0 50% 50%)", x: "-2px", y: "1px", dur: "5.2s", delay: "1.3s" },
  { clip: "inset(50% 50% 0 0)", x: "-3px", y: "-1px", dur: "4.9s", delay: "2.1s" },
  { clip: "inset(50% 0 0 50%)", x: "2px", y: "0px", dur: "5.5s", delay: "0.7s" },
] as const

export function ChunkMark({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`} role="img" aria-label="ny em chunks">
      <NyMark className="invisible h-full w-auto" aria-hidden />
      {CHUNKS.map((c, i) => (
        <div key={i} aria-hidden className="absolute inset-0" style={{ clipPath: c.clip }}>
          <NyMark
            className="chunk-shift h-full w-auto text-foreground"
            style={
              {
                "--ck-x": c.x,
                "--ck-y": c.y,
                "--ck-dur": c.dur,
                "--ck-delay": c.delay,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Stream — columns of bits scrolling upward beside the mark, the      */
/* token stream flowing through the gateway.                           */
/* ------------------------------------------------------------------ */
const BIT_COLS = [
  { x: 0, bits: [1, 0, 1, 1, 0, 1, 0, 0], dur: 3.6 },
  { x: 6, bits: [0, 1, 0, 1, 1, 0, 1, 0], dur: 4.4 },
  { x: 12, bits: [1, 1, 0, 0, 1, 0, 1, 1], dur: 3.1 },
] as const

export function StreamMark({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className ?? ""}`} role="img" aria-label="stream de bits">
      <svg viewBox="0 0 16 28" className="pixel-crisp h-[92%] w-auto" aria-hidden>
        <defs>
          <clipPath id="stream-clip">
            <rect x="0" y="0" width="16" height="28" />
          </clipPath>
        </defs>
        <g clipPath="url(#stream-clip)" fill="currentColor" className="text-foreground">
          {BIT_COLS.map((col) => (
            <g
              key={col.x}
              className="bit-scroll"
              style={{ "--bs-dur": `${col.dur}s`, "--bs-steps": 8 } as React.CSSProperties}
            >
              {/* two copies for a seamless wrap */}
              {[0, 1].map((rep) => (
                <g key={rep} transform={`translate(0 ${rep * 32})`}>
                  {col.bits.map((b, i) =>
                    b ? (
                      <rect key={i} x={col.x} y={i * 4} width={3} height={3} opacity={i % 3 === 0 ? 1 : 0.55} />
                    ) : null,
                  )}
                </g>
              ))}
            </g>
          ))}
        </g>
      </svg>
      <NyMark className="h-full w-auto shrink-0 text-foreground" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Dados — the mark rising out of a pixel bar field, data becoming     */
/* signal. Bars flicker at the base like sampled measurements.         */
/* ------------------------------------------------------------------ */
const BARS = [
  { x: 0, h: 5, delay: "0s", dur: "2.2s" },
  { x: 8, h: 9, delay: "0.5s", dur: "1.8s" },
  { x: 16, h: 4, delay: "1.1s", dur: "2.6s" },
  { x: 24, h: 11, delay: "0.2s", dur: "2.0s" },
  { x: 32, h: 7, delay: "0.8s", dur: "2.4s" },
  { x: 40, h: 13, delay: "1.4s", dur: "1.9s" },
  { x: 48, h: 6, delay: "0.4s", dur: "2.3s" },
  { x: 56, h: 10, delay: "1.0s", dur: "2.1s" },
  { x: 64, h: 5, delay: "1.6s", dur: "2.5s" },
] as const

export function DadosMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 70 48"
      className={`pixel-crisp ${className ?? ""}`}
      role="img"
      aria-label="ny sobre barras de dados"
    >
      <g transform="translate(1 0)">
        <NyGlyphs />
      </g>
      <g fill="currentColor" className="text-muted-foreground">
        {BARS.map((b, i) => (
          <rect
            key={i}
            className="px-flicker"
            x={b.x}
            y={48 - b.h}
            width={5}
            height={b.h}
            opacity={0.5}
            style={{ "--fl-dur": b.dur, "--fl-delay": b.delay } as React.CSSProperties}
          />
        ))}
      </g>
    </svg>
  )
}

/* ================================================================== */
/* STATIC VARIANTS — 10 fixed pixel marks, each symbolizing a          */
/* product concept. No animation; pure composition.                    */
/* ================================================================== */

/* 1. Rota — a pixel packet path stepping through corners, in one gate,
      out the other side. The routing decision frozen in time.         */
export function RouteStatic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 40" className={`pixel-crisp ${className ?? ""}`} role="img" aria-label="rota pixel">
      <g fill="currentColor">
        {/* stepped path */}
        <path
          className="text-muted-foreground"
          fill="currentColor"
          opacity={0.4}
          d="M0 34h12v3h-12zM12 26h3v11h-3zM12 26h14v3h-14zM26 14h3v15h-3zM26 14h16v3h-16zM42 14h3v-11h-3zM42 3h14v3h-14z"
        />
        {/* packet at origin, mid, destination */}
        <rect x={2} y={31} width={5} height={5} opacity={0.45} />
        <rect x={30} y={11} width={5} height={5} opacity={0.7} />
        <rect x={62} y={1} width={7} height={7} />
        {/* destination frame */}
        <path d="M58 0h2v2h-2zM70 0h2v2h-2zM58 7h2v2h-2zM70 7h2v2h-2z" opacity={0.5} />
      </g>
    </svg>
  )
}

/* 2. Latência — a pixel sparkline with the p50 marker cell filled.    */
export function LatencyStatic({ className }: { className?: string }) {
  const heights = [8, 14, 6, 18, 10, 24, 12, 16, 7, 20]
  return (
    <svg viewBox="0 0 78 30" className={`pixel-crisp ${className ?? ""}`} role="img" aria-label="latencia pixel">
      <g fill="currentColor">
        {heights.map((h, i) => (
          <rect
            key={i}
            x={i * 8}
            y={30 - h}
            width={5}
            height={h}
            opacity={i === 5 ? 1 : 0.35}
            className={i === 5 ? "text-foreground" : "text-muted-foreground"}
          />
        ))}
        {/* p50 line */}
        <rect x={0} y={16} width={78} height={1} opacity={0.25} />
      </g>
    </svg>
  )
}

/* 3. Cache — stacked pixel layers; the hot layer solid on top.        */
export function CacheStatic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 40" className={`pixel-crisp ${className ?? ""}`} role="img" aria-label="cache pixel">
      <g fill="currentColor">
        <rect x={12} y={30} width={32} height={6} opacity={0.2} />
        <rect x={8} y={20} width={40} height={6} opacity={0.4} />
        <rect x={4} y={10} width={48} height={6} opacity={0.65} />
        <rect x={0} y={0} width={56} height={6} />
        {/* hit marker on the hot layer */}
        <rect x={46} y={-3} width={3} height={3} opacity={0.6} />
      </g>
    </svg>
  )
}

/* 4. Fallback — primary lane broken mid-flight; traffic rerouted      */
export function FallbackStatic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 28" className={`pixel-crisp ${className ?? ""}`} role="img" aria-label="fallback pixel">
      <g fill="currentColor">
        {/* broken primary lane */}
        <rect x={0} y={4} width={26} height={3} opacity={0.35} />
        <rect x={30} y={4} width={4} height={3} opacity={0.15} />
        <rect x={38} y={4} width={3} height={3} opacity={0.1} />
        {/* reroute step down */}
        <rect x={24} y={4} width={3} height={14} opacity={0.5} />
        {/* fallback lane, solid to the end */}
        <rect x={24} y={18} width={48} height={3} />
        {/* packet safely on fallback */}
        <rect x={58} y={15} width={6} height={6} opacity={0.9} />
      </g>
    </svg>
  )
}

/* 5. Multiplex — many inputs merging into a single output lane.       */
export function MultiplexStatic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 32" className={`pixel-crisp ${className ?? ""}`} role="img" aria-label="multiplex pixel">
      <g fill="currentColor">
        {/* four input lanes */}
        <rect x={0} y={0} width={20} height={3} opacity={0.3} />
        <rect x={0} y={9} width={20} height={3} opacity={0.45} />
        <rect x={0} y={18} width={20} height={3} opacity={0.6} />
        <rect x={0} y={27} width={20} height={3} opacity={0.75} />
        {/* converge steps */}
        <rect x={20} y={0} width={3} height={16} opacity={0.35} />
        <rect x={20} y={16} width={3} height={14} opacity={0.55} />
        <rect x={26} y={9} width={3} height={12} opacity={0.5} />
        {/* single out lane */}
        <rect x={26} y={14} width={46} height={4} />
      </g>
    </svg>
  )
}

/* 6. Créditos — a usage meter of pixel cells, partially consumed.     */
export function CreditsStatic({ className }: { className?: string }) {
  const CELLS = 10
  const used = 6
  return (
    <svg viewBox="0 0 76 22" className={`pixel-crisp ${className ?? ""}`} role="img" aria-label="creditos pixel">
      <g fill="currentColor">
        {Array.from({ length: CELLS }).map((_, i) => (
          <rect key={i} x={i * 7.5} y={6} width={5} height={10} opacity={i < used ? 1 : 0.2} />
        ))}
        {/* frame ticks */}
        <rect x={0} y={0} width={2} height={3} opacity={0.4} />
        <rect x={72.5} y={0} width={2} height={3} opacity={0.4} />
        <rect x={0} y={19} width={2} height={3} opacity={0.4} />
        <rect x={72.5} y={19} width={2} height={3} opacity={0.4} />
      </g>
    </svg>
  )
}

/* 7. Handshake — two pixel brackets interlocking at the center.       */
export function HandshakeStatic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 32" className={`pixel-crisp ${className ?? ""}`} role="img" aria-label="handshake pixel">
      <g fill="currentColor">
        {/* left bracket */}
        <path d="M0 0h14v4h-10v24h10v4h-14z" opacity={0.85} />
        {/* right bracket */}
        <path d="M56 0h-14v4h10v24h-10v4h14z" opacity={0.85} />
        {/* interlock cells */}
        <rect x={20} y={10} width={5} height={5} />
        <rect x={26} y={14} width={5} height={5} opacity={0.7} />
        <rect x={32} y={18} width={5} height={5} />
      </g>
    </svg>
  )
}

/* 8. Checksum — a pixel grid with one verified cell standing out.     */
export function ChecksumStatic({ className }: { className?: string }) {
  const GRID = 5
  const pattern = [
    0.2, 0.35, 0.2, 0.45, 0.25,
    0.4, 0.2, 0.5, 0.3, 0.4,
    0.25, 0.45, 1, 0.35, 0.2,
    0.5, 0.3, 0.4, 0.2, 0.45,
    0.2, 0.4, 0.25, 0.5, 0.3,
  ]
  return (
    <svg viewBox="0 0 44 44" className={`pixel-crisp ${className ?? ""}`} role="img" aria-label="checksum pixel">
      <g fill="currentColor">
        {pattern.map((o, i) => {
          const c = i % GRID
          const r = Math.floor(i / GRID)
          return <rect key={i} x={c * 9} y={r * 9} width={7} height={7} opacity={o} />
        })}
      </g>
    </svg>
  )
}

  /* 8b. Checksum Y — the noisy grid resolving into a "y": the verified
        cells spell the letter out of the noise field.                   */
  const CHECKSUM_NOISE = [
    0.2, 0.35, 0.2, 0.45, 0.25,
    0.4, 0.2, 0.5, 0.3, 0.4,
    0.25, 0.45, 0.3, 0.35, 0.2,
    0.5, 0.3, 0.4, 0.2, 0.45,
    0.2, 0.4, 0.25, 0.5, 0.3,
  ]

  function ChecksumLetter({
    mask,
    label,
    className,
  }: {
    mask: number[]
    label: string
    className?: string
  }) {
    const GRID = 5
    return (
      <svg viewBox="0 0 44 44" className={`pixel-crisp ${className ?? ""}`} role="img" aria-label={label}>
        <g fill="currentColor">
          {CHECKSUM_NOISE.map((noise, i) => {
            const c = i % GRID
            const r = Math.floor(i / GRID)
            const lit = mask[i] === 1
            return (
              <rect key={i} x={c * 9} y={r * 9} width={7} height={7} opacity={lit ? 1 : noise * 0.6} />
            )
          })}
        </g>
      </svg>
    )
  }

  const Y_MASK = [
    1, 0, 0, 0, 1,
    0, 1, 0, 1, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
  ]

  const N_MASK = [
    1, 0, 0, 0, 1,
    1, 1, 0, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 0, 1, 1,
    1, 0, 0, 0, 1,
  ]

  export function ChecksumYStatic({ className }: { className?: string }) {
    return <ChecksumLetter mask={Y_MASK} label="checksum formando y" className={className} />
  }

  export function ChecksumNStatic({ className }: { className?: string }) {
    return <ChecksumLetter mask={N_MASK} label="checksum formando n" className={className} />
  }

  /* 9. Cursor — the terminal block cursor resting beside the mark.      */
export function CursorStatic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 66 27" className={`pixel-crisp ${className ?? ""}`} role="img" aria-label="ny com cursor">
      <NyGlyphs />
      {/* block cursor after the mark */}
      <rect x={57} y={16} width={8} height={11} fill="currentColor" className="text-foreground" />
    </svg>
  )
}

/* 10. Cluster — nodes orbiting the mark on a pixel constellation.     */
export function ClusterStatic({ className }: { className?: string }) {
  const NODES = [
    { x: 2, y: 2, s: 3, o: 0.5 },
    { x: 62, y: 0, s: 4, o: 0.7 },
    { x: 70, y: 20, s: 3, o: 0.45 },
    { x: 0, y: 22, s: 4, o: 0.6 },
    { x: 66, y: 38, s: 3, o: 0.5 },
    { x: 6, y: 40, s: 3, o: 0.4 },
  ]
  return (
    <svg viewBox="0 0 76 46" className={`pixel-crisp ${className ?? ""}`} role="img" aria-label="cluster pixel">
      <g transform="translate(5 9)">
        <NyGlyphs />
      </g>
      <g fill="currentColor" className="text-muted-foreground">
        {NODES.map((n, i) => (
          <rect key={i} x={n.x} y={n.y} width={n.s} height={n.s} opacity={n.o} />
        ))}
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* App icon — macOS-style rounded tile, positive and negative.         */
/* ------------------------------------------------------------------ */
export function AppIconTile({
  inverted = false,
  className,
}: {
  inverted?: boolean
  className?: string
}) {
  return (
    <div
      className={`flex aspect-square items-center justify-center rounded-[22%] border ${
        inverted
          ? "border-border bg-background text-foreground"
          : "border-transparent bg-foreground text-background"
      } ${className ?? ""}`}
      role="img"
      aria-label={inverted ? "icone ny invertido" : "icone ny"}
    >
      <NyMark className="h-[38%] w-auto" />
    </div>
  )
}
