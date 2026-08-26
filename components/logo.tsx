import type { SVGProps } from "react"

/**
 * "nycode" wordmark in the nylla geometric sans.
 * The `n` and `y` are the exact filled glyphs from the supplied nylla SVG;
 * `c`, `o`, `d`, `e` are drawn as centerline strokes at the same weight
 * (16.8) and x-height (66.48) so the whole word reads as one typeface.
 */
export function NycodeWordmark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 152"
      role="img"
      aria-label="nycode"
      {...props}
    >
      <g transform="translate(24,117.6)">
        {/* n and y — exact glyphs from the nylla wordmark */}
        <path
          fill="currentColor"
          d="M71.64 -39.0V0.0H54.84V-36.72Q54.84 -44.64 50.88 -48.9Q46.92 -53.16 40.08 -53.16Q33.12 -53.16 29.1 -48.9Q25.08 -44.64 25.08 -36.72V0.0H8.28V-66.48H25.08V-58.2Q28.44 -62.52 33.66 -64.98Q38.88 -67.44 45.12 -67.44Q57.0 -67.44 64.32 -59.94Q71.64 -52.44 71.64 -39.0Z"
        />
        <path
          fill="currentColor"
          d="M149.7 -66.48 108.54 31.44H90.66L105.06 -1.68L78.42 -66.48H97.26L114.42 -20.04L131.82 -66.48Z"
        />
        {/* c, o, d, e — matching geometric strokes */}
        <g fill="none" stroke="currentColor" strokeWidth={16.8} strokeLinecap="butt" strokeLinejoin="round">
          {/* c */}
          <path d="M209.97 -49.21 A24.84 24.84 0 1 0 209.97 -17.27" />
          {/* o */}
          <circle cx="265.42" cy="-33.24" r="24.84" />
          {/* d */}
          <circle cx="339.9" cy="-33.24" r="24.84" />
          <path d="M364.74 -88.8 V0" />
          {/* e */}
          <path d="M389.54 -33.24 H439.22" />
          <path d="M439.22 -33.24 A24.84 24.84 0 1 0 433.41 -17.27" />
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
