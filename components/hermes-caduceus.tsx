const COLS = 44
const ROWS = 34
const CX = 21.5

/** deterministic 0..1 noise so server and client render the same dither */
function noise(col: number, row: number) {
  const n = Math.sin(col * 12.9898 + row * 78.233) * 43758.5453
  return n - Math.floor(n)
}

/** wing fan: widest at the top leading edge, narrowing down toward the staff */
const WING_SPAN: Array<[inner: number, outer: number]> = [
  [2.5, 20.5],
  [1.5, 21.5],
  [2.5, 19.5],
  [2.5, 16.5],
  [2.5, 13.5],
  [2.5, 10.5],
  [2.5, 7.5],
]

/** three coils of decreasing size wrapped around the staff */
const COILS = [
  { cy: 12.2, rx: 6.6, ry: 3.7 },
  { cy: 19.2, rx: 5.0, ry: 3.2 },
  { cy: 26.0, rx: 3.9, ry: 2.8 },
]

type Dot = { col: number; row: number; dim: boolean }

const DOTS: Dot[] = (() => {
  const dots: Dot[] = []

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const d = Math.abs(col - CX)
      let hit = false

      // wings
      const span = WING_SPAN[row]
      if (span && d >= span[0] && d <= span[1]) hit = true

      // central staff, from the knob down through the coils
      if (!hit && d < 1.1 && row <= 29) hit = true

      // knob crowning the staff between the wings
      if (!hit && d < 2.2 && row <= 1) hit = true

      // coils
      if (!hit) {
        for (const { cy, rx, ry } of COILS) {
          const e = (d / rx) ** 2 + ((row - cy) / ry) ** 2
          if (Math.abs(e - 1) < 0.42) {
            hit = true
            break
          }
        }
      }

      // sparse tail under the last coil
      if (!hit && d < 2.4 && row >= 30 && row <= 31) hit = true

      if (!hit) continue

      const n = noise(col, row)
      if (n < 0.3) continue // dither gaps so it reads as character cells
      dots.push({ col, row, dim: n > 0.66 })
    }
  }

  return dots
})()

export function HermesCaduceus({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${COLS} ${ROWS}`}
      className={className}
      role="img"
      aria-label="Caduceu do Hermes Agent em arte de pontos"
      shapeRendering="crispEdges"
    >
      {DOTS.map(({ col, row, dim }) => (
        <rect
          key={`${col}-${row}`}
          x={col + 0.15}
          y={row + 0.15}
          width={0.7}
          height={0.7}
          fill={dim ? "#8a7420" : "#e8c547"}
        />
      ))}
    </svg>
  )
}
