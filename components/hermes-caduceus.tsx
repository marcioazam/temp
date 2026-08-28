/**
 * Caduceu do Hermes Agent : bitmap traçado à mão a partir da arte ASCII
 * de referência. Cada caractere é uma célula da matriz de pontos:
 *   '#' → ponto branco
 *   '.' → ponto branco
 *   ' ' → vazio
 */
const GRID = [
  "                     .###.                   ",
  "                    ##.#.##                  ",
  "  .## #### ##### ## #.###.# ## ##### #### ##.",
  " ## ###.# ##.### #.## ### ##.# ###.## #.### #",
  "   ###. #### ##.## #. ### .# ##.## ####  ### ",
  "     ## ###.##.# ## # ### # ## #.##.### ##   ",
  "       .## ## ### .# #.#.# #. ### ## ##.     ",
  "          ## ##.  ##  ###  ##  .## ##        ",
  "             .#   ##  ###  ##   #.           ",
  "                ####. ### .####              ",
  "              ##.     ###     .##            ",
  "             ##   ..  ###  ..   ##           ",
  "            ##   ##.  ###  .##   ##          ",
  "            #.  ##    ###    ##  .#          ",
  "            ##  #     ###     #  ##          ",
  "             ## ##    ###    ## ##           ",
  "              ###.    ###    .###            ",
  "                ##.   ###   .##              ",
  "                 .## .###. ##.               ",
  "                  ##.# ### #.##              ",
  "                ##.    ###    .##            ",
  "               ##      ###      ##           ",
  "               #.      ###      .#           ",
  "               ##      ###      ##           ",
  "                ##.    ###    .##            ",
  "                  ##.#.###.#.##              ",
  "                     ##.#.##                 ",
  "                   ##.  #  .##               ",
  "                  ##    #    ##              ",
  "                  #.    #    .#              ",
  "                  ##    #   .##              ",
  "                   ##.     ##.               ",
  "                    .##  ###                 ",
  "                       ##.                   ",
] as const

const ROWS = GRID.length
const COLS = Math.max(...GRID.map((r) => r.length))

type Dot = { col: number; row: number; dim: boolean }

const DOTS: Dot[] = (() => {
  const dots: Dot[] = []
  GRID.forEach((line, row) => {
    for (let col = 0; col < line.length; col++) {
      const ch = line[col]
      if (ch === "#") dots.push({ col, row, dim: false })
      else if (ch === ".") dots.push({ col, row, dim: true })
    }
  })
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
      {DOTS.map(({ col, row }) => (
        <rect
          key={`${col}-${row}`}
          x={col + 0.15}
          y={row + 0.15}
          width={0.7}
          height={0.7}
          fill="#e8e8e8"
        />
      ))}
    </svg>
  )
}
