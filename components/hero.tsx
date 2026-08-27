"use client"

import { MockCarousel } from "@/components/mock-carousel"
import { Reveal } from "@/components/reveal"
import { HeroFlow } from "@/components/hero-flow"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative mx-auto w-full max-w-screen-2xl px-4 py-20 md:px-9 md:py-28">
        <Reveal delay={160} className="mx-auto w-full max-w-md">
          <HeroFlow />
        </Reveal>

        <Reveal delay={240} className="mt-14 md:mt-16">
          <MockCarousel />
        </Reveal>
      </div>
    </section>
  )
}
