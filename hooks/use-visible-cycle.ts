"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Advances an index on an interval, but only while the returned ref is
 * actually on screen and the tab is visible.
 *
 * Mock UIs animate continuously, so a naive setInterval keeps re-rendering
 * its whole subtree even when scrolled far out of view , burning main-thread
 * time that the visible animations need to hold a steady frame rate. This
 * parks the timer instead, so only the section the user is looking at costs
 * anything.
 */
export function useVisibleCycle<T extends HTMLElement = HTMLDivElement>(
  length: number,
  intervalMs: number,
) {
  const ref = useRef<T | null>(null)
  const [index, setIndex] = useState(0)
  const [active, setActive] = useState(false)

  // Track viewport visibility.
  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === "undefined") {
      setActive(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "128px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Run the timer only while visible, the tab is focused, and motion is allowed.
  useEffect(() => {
    if (!active || length <= 1) return
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let id: number | undefined

    const start = () => {
      if (id !== undefined) return
      id = window.setInterval(() => {
        setIndex((i) => (i + 1) % length)
      }, intervalMs)
    }

    const stop = () => {
      if (id === undefined) return
      window.clearInterval(id)
      id = undefined
    }

    const onVisibility = () => (document.hidden ? stop() : start())

    onVisibility()
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [active, length, intervalMs])

  return { ref, index, active }
}
