"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"

export function FinalCta() {
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const background = backgroundRef.current
    if (!container || !background || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    const updateParallax = () => {
      const rect = container.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const sectionCenter = rect.top + rect.height / 2
      const offset = Math.max(-48, Math.min(48, (viewportCenter - sectionCenter) * 0.1))
      background.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`
      frame = 0
    }
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax)
    }

    updateParallax()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)
    return () => {
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="pb-8 pt-6 md:pb-10 md:pt-8" aria-labelledby="final-cta-title">
      <div
        ref={containerRef}
        className="photo-grain relative mx-auto flex min-h-[520px] w-[calc(100%-2rem)] max-w-[1464px] flex-col items-center justify-center gap-10 overflow-hidden rounded-xl px-6 py-24 text-center text-canvas-ink md:h-[calc(100svh-8.5rem)] md:min-h-[560px] md:max-h-[720px] md:w-[calc(100%-4.5rem)]"
      >
        <div
          ref={backgroundRef}
          aria-hidden="true"
          className="absolute -inset-12 z-0 bg-[url('/images/nylla-cta-landscape.png')] bg-cover bg-center will-change-transform motion-reduce:transform-none"
          style={{ transform: "translate3d(0, 0, 0) scale(1.12)" }}
        />
        <h1 id="final-cta-title" className="type-display relative z-[2] max-w-4xl text-balance">
          Um gateway.
          <br />
          Todos os LLMs.
          <br />
          Qualquer harness.
        </h1>
        <Link
          href="/#planos"
          className="type-micro relative z-[2] inline-flex items-center justify-center rounded-none bg-canvas-ink px-8 py-4 text-canvas-paper transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-canvas-ink"
        >
          Experimente Nylla
        </Link>
      </div>
    </section>
  )
}
