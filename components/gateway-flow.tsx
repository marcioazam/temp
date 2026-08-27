"use client"

import { useEffect, useRef, useState } from "react"

import { Reveal } from "@/components/reveal"

const CODE_LINES = [
  { number: "01", content: "const response = await fetch(" },
  { number: "02", content: '  "https://api.nylla.ai/v1/chat/completions",' },
  { number: "03", content: "  {" },
  { number: "04", content: '    method: "POST",' },
  { number: "05", content: "    headers: {" },
  { number: "06", content: '      Authorization: `Bearer ${NYLLA_API_KEY}`,' },
  { number: "07", content: '      "Content-Type": "application/json",' },
  { number: "08", content: "    }," },
  { number: "09", content: "    body: JSON.stringify({" },
  { number: "10", content: '      model: "auto",' },
  { number: "11", content: '      messages: [{ role: "user", content: prompt }],' },
  { number: "12", content: "    })," },
  { number: "13", content: "  }," },
  { number: "14", content: ")" },
]

function AnimatedCode() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [characterCount, setCharacterCount] = useState(0)
  const source = CODE_LINES.map((line) => `${line.content}\n`).join("")

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    let timer: number | undefined
    let started = false

    const play = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCharacterCount(source.length)
        return
      }

      let count = 0

      const typeNextCharacter = () => {
        count += 1
        setCharacterCount(count)

        if (count < source.length) {
          const delay = source[count - 1] === "\n" ? 180 : 28
          timer = window.setTimeout(typeNextCharacter, delay)
          return
        }

        timer = window.setTimeout(() => {
          count = 0
          setCharacterCount(0)
          timer = window.setTimeout(typeNextCharacter, 700)
        }, 2400)
      }

      typeNextCharacter()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          play()
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (timer) window.clearTimeout(timer)
    }
  }, [source])

  let remainingCharacters = characterCount

  return (
    <div ref={containerRef} className="w-full font-mono text-[11px] leading-6 tracking-[-0.005em] sm:text-xs" aria-label={CODE_LINES.map((line) => line.content).join("\n")}>
      {CODE_LINES.map((line) => {
        const visibleLength = Math.max(0, Math.min(line.content.length, remainingCharacters))
        const lineStarted = remainingCharacters > 0
        remainingCharacters -= line.content.length + 1
        const isActive = lineStarted && remainingCharacters < 0

        return (
          <div key={line.number} className={`flex min-w-0 px-4 ${lineStarted ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
            <span className="w-8 shrink-0 select-none text-muted-foreground/40">{line.number}</span>
            <code className={`whitespace-pre ${line.number === "02" ? "text-primary" : "text-foreground/80"}`}>
              {line.content.slice(0, visibleLength)}
              {isActive ? <span className="ml-px inline-block h-[1.05em] w-px translate-y-[2px] animate-pulse bg-primary" /> : null}
            </code>
          </div>
        )
      })}
    </div>
  )
}

export function GatewayFlow() {
  return (
    <section id="endpoint">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <Reveal>
          <h2 className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
            <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
            <span>endpoint</span>
          </h2>
        </Reveal>

        <div className="mt-6 grid items-start gap-12 lg:grid-cols-[1.22fr_0.78fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:order-2">
            <p className="type-title max-w-xl text-balance text-foreground">
              A inteligência do Nylla dentro do seu produto.
            </p>
            <p className="type-lead mt-6 max-w-md text-pretty text-muted-foreground">
              Um endpoint compatível com OpenAI para o seu produto. Você desenvolve a experiência, o Nylla cuida dos
              modelos e do roteamento.
            </p>

            <a
              href="/nylla-postman-collection.json"
              download="nylla-postman-collection.json"
              className="type-micro group mt-8 inline-flex items-center gap-3 bg-foreground px-4 py-3 text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Baixar coleção Postman
              <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-y-0.5">↓</span>
            </a>

          </div>

          <Reveal delay={120} className="lg:order-1">
          <div
            className="flex min-h-[30rem] items-center overflow-hidden bg-cover bg-center p-5 sm:p-8 lg:p-10"
            style={{ backgroundImage: "url('/images/endpoint-landscape.png')" }}
          >
            <div className="win mx-auto w-full max-w-[42rem] bg-card [background-image:none]">
              <div className="win-bar justify-between [background-image:none]">
                <div className="win-dots" aria-hidden="true">
                  <span className="win-dot win-dot--close" />
                  <span className="win-dot win-dot--min" />
                  <span className="win-dot win-dot--max" />
                </div>
                <span className="win-title">api.nylla.ai</span>
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-muted-foreground"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2.5" y="4.5" width="7" height="7" stroke="currentColor" />
                  <path d="M6.5 4.5V2.5H13.5V9.5H9.5" stroke="currentColor" />
                </svg>
              </div>

            <div className="grid bg-card [background-image:none] lg:grid-cols-[1fr_12rem]">
              <div className="overflow-hidden bg-card py-5 [background-image:none]">
                <AnimatedCode />
              </div>

              <aside className="border-t border-border bg-card p-5 [background-image:none] lg:border-l lg:border-t-0">
                <p className="type-eyebrow text-subtle-foreground">uma integração</p>
                <div className="mt-6 flex flex-col gap-5">
                  <div>
                    <p className="type-subheading text-primary">1 endpoint</p>
                    <p className="type-caption mt-1 text-muted-foreground">para todos os modelos</p>
                  </div>
                  <div>
                    <p className="type-subheading text-primary">OpenAI</p>
                    <p className="type-caption mt-1 text-muted-foreground">formato compatível</p>
                  </div>
                  <div>
                    <p className="type-subheading text-primary">Atualizado</p>
                    <p className="type-caption mt-1 text-muted-foreground">catálogo de modelos</p>
                  </div>
                  <div>
                    <p className="type-subheading whitespace-nowrap text-primary">Baixa latência</p>
                    <p className="type-caption mt-1 text-muted-foreground">roteamento otimizado</p>
                  </div>
                </div>
              </aside>
            </div>

            <div className="flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="type-micro text-subtle-foreground">
                <span
                  className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--win-dot-max)]"
                  aria-hidden="true"
                />
                pronto para integração
              </p>
            </div>
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
