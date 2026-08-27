"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { AgentBoardMock } from "@/components/agent-board-mock"
import { CommandPaletteMock } from "@/components/command-palette-mock"
import { ClaudeCodeMock } from "@/components/editor-mock"

const SLIDE_DURATION = 12000

const slides = [
  { id: "claude", label: "Claude Code", component: ClaudeCodeMock },
  { id: "vscode", label: "VS Code", component: CommandPaletteMock },
  { id: "agents", label: "Agents", component: AgentBoardMock },
]

export function MockCarousel() {
  const [active, setActive] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [cycle, setCycle] = useState(0)
  const timeoutRef = useRef<number | null>(null)
  const exitTimeoutRef = useRef<number | null>(null)

  const selectSlide = useCallback((next: number) => {
    setActive((current) => {
      if (current === next) return current
      const forwardDistance = (next - current + slides.length) % slides.length
      setDirection(forwardDistance <= slides.length / 2 ? 1 : -1)
      setPrevious(current)
      return next
    })
    setCycle((value) => value + 1)
  }, [])

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      selectSlide((active + 1) % slides.length)
    }, SLIDE_DURATION)

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [active, cycle, selectSlide])

  useEffect(() => {
    if (previous === null) return
    exitTimeoutRef.current = window.setTimeout(() => setPrevious(null), 800)
    return () => {
      if (exitTimeoutRef.current) window.clearTimeout(exitTimeoutRef.current)
    }
  }, [active, previous])

  const ActiveSlide = slides[active].component
  const PreviousSlide = previous === null ? null : slides[previous].component

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card">
      <img
        src="/images/nylla-cta-landscape.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-background/25" aria-hidden="true" />

      <div
        className="relative flex min-h-[440px] items-center justify-center overflow-hidden px-5 pb-16 pt-10 sm:min-h-[520px] sm:px-10 md:min-h-[620px] md:px-16"
        aria-roledescription="carrossel"
        aria-label="Demonstrações do Nylla Gateway"
      >
        {PreviousSlide ? (
          <div
            className={`absolute w-[min(88%,1080px)] animate-out duration-700 ease-in motion-reduce:animate-none ${
              direction === 1 ? "slide-out-to-left-full" : "slide-out-to-right-full"
            }`}
            aria-hidden="true"
          >
            <PreviousSlide />
          </div>
        ) : null}

        <div
          key={`${slides[active].id}-${cycle}`}
          className={`w-[min(88%,1080px)] animate-in duration-700 ease-out motion-reduce:animate-none ${
            direction === 1 ? "slide-in-from-right-full" : "slide-in-from-left-full"
          }`}
          role="group"
          aria-roledescription="slide"
          aria-label={`${active + 1} de ${slides.length}: ${slides[active].label}`}
        >
          <ActiveSlide />
        </div>

        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => selectSlide(index)}
              className="group relative grid size-5 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              aria-label={`Exibir ${slide.label}`}
              aria-current={index === active ? "true" : undefined}
            >
              <span className={`block size-2 rounded-full transition-colors ${index === active ? "bg-foreground" : "bg-foreground/35 group-hover:bg-foreground/65"}`} />
              {index === active ? (
                <span
                  key={cycle}
                  className="absolute inset-0 rounded-full border border-foreground/70 [animation:carousel-progress_12s_linear_forwards] motion-reduce:animate-none"
                  aria-hidden="true"
                />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
