import type { SVGProps } from "react"

/** Rotor mark — AI energy in continuous motion. Inherits currentColor. */
export function RotorMark(props: SVGProps<SVGSVGElement>) {
  const arms = [0, 60, 120, 180, 240, 300]

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      role="img"
      aria-label="Nycode"
      {...props}
    >
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none">
        {arms.map((angle) => (
          <path key={angle} d="M32 20 Q42 14 44 6" transform={`rotate(${angle} 32 32)`} />
        ))}
      </g>
      <circle cx="32" cy="32" r="5" fill="currentColor" />
    </svg>
  )
}

/**
 * Flat "nycode" pixel wordmark — inherits currentColor.
 * Glyphs are grouped so each letter can be shifted right, producing
 * optical letter-spacing that raw pixel paths can't express.
 */
export function NycodeWordmark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 163 36"
      className="pixel-crisp"
      role="img"
      aria-label="nycode"
      {...props}
    >
      <g fill="currentColor">
        {/* n */}
        <path d="M4 9h13v5h-13zM0 14h6v22h-6zM15 14h6v22h-6z" />
        {/* y */}
        <g transform="translate(2.5 0)">
          <path d="M26 9h5v11h-5zM41 9h5v11h-5zM31 18h3v7h-3zM38 18h3v7h-3zM29 20h2v5h-2zM41 20h2v5h-2zM34 22h4v10h-4zM33 25h1v11h-1zM38 25h1v7h-1zM29 32h4v4h-4z" />
        </g>
        {/* c */}
        <g transform="translate(5 0)">
          <path d="M55 9h13v5h-13zM51 14h6v17h-6zM66 14h6v5h-6zM66 26h6v5h-6zM55 31h13v5h-13z" />
        </g>
        {/* o */}
        <g transform="translate(7.5 0)">
          <path d="M81 9h13v5h-13zM77 14h6v17h-6zM92 14h6v17h-6zM81 31h13v5h-13z" />
        </g>
        {/* d */}
        <g transform="translate(10 0)">
          <path d="M118 0h6v36h-6zM107 9h11v5h-11zM103 14h6v17h-6zM107 31h11v5h-11z" />
        </g>
        {/* e */}
        <g transform="translate(12.5 0)">
          <path d="M133 9h13v5h-13zM129 14h6v17h-6zM144 14h6v11h-6zM135 20h9v5h-9zM133 31h13v5h-13z" />
        </g>
      </g>
    </svg>
  )
}

/** Flat "ny" pixel monogram — inherits currentColor. */
export function NyMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 27"
      className="pixel-crisp"
      role="img"
      aria-label="ny"
      {...props}
    >
      <g fill="currentColor">
        {/* n */}
        <path d="M4 0h13v5h-13zM0 5h6v22h-6zM15 5h6v22h-6z" />
        {/* y */}
        <g transform="translate(4 0)">
          <path d="M26 0h5v11h-5zM41 0h5v11h-5zM31 9h3v7h-3zM38 9h3v7h-3zM29 11h2v5h-2zM41 11h2v5h-2zM34 13h4v10h-4zM33 16h1v11h-1zM38 16h1v7h-1zM29 23h4v4h-4z" />
        </g>
      </g>
    </svg>
  )
}
