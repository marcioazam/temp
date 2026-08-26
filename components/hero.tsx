"use client"

import Link from "next/link"
import { EditorMock } from "@/components/editor-mock"
import { Reveal } from "@/components/reveal"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative mx-auto w-full max-w-screen-2xl px-4 py-20 md:px-9 md:py-28">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-3xl shrink-0">
            <Reveal>
              <h1 className="font-sans text-[2.75rem] font-medium leading-[1.02] tracking-[-0.04em] text-foreground sm:text-[3.5rem] md:text-6xl">
                Um gateway.
                <br />
                Todos os LLMs.
                <br />
                <span className="text-muted-foreground">Qualquer harness.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.npmjs.com/package/nylla"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-11 items-center justify-center gap-2 border border-[#F4F3F1] bg-[#F4F3F1] px-5 font-mono text-sm text-[#090909] transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
                >
                  install
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 12"
                    className="h-3 w-3 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 9L9 3M9 3H4M9 3V8" />
                  </svg>
                </a>

                <Link
                  href="/docs"
                  className="group inline-flex h-11 items-center justify-center gap-2 border border-border px-5 font-mono text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-[0.98]"
                >
                  ler docs
                  <span
                    aria-hidden="true"
                    className="opacity-50 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={240} className="w-full lg:max-w-md">
            <figure aria-label="Papel da Nylla no fluxo entre sua ferramenta e os LLMs" className="font-mono">
              <div className="flex flex-col gap-2">
                <div className="border border-border px-4 py-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Você + ferramenta</span>
                  <p className="mt-1 text-xs text-foreground">Claude Code, Cursor, seu agent</p>
                </div>

                <div className="flex items-center gap-3 pl-4 text-[10px] text-muted-foreground">
                  <span aria-hidden="true" className="text-sm leading-none">↕</span>
                  <span>uma requisição, um formato</span>
                </div>

                <div className="border border-foreground/60 bg-foreground/5 px-4 py-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground">Nylla</span>
                  <p className="mt-1 text-xs text-muted-foreground">valida, roteia e faz fallback entre modelos</p>
                </div>

                <div className="flex items-center gap-3 pl-4 text-[10px] text-muted-foreground">
                  <span aria-hidden="true" className="text-sm leading-none">↕</span>
                  <span>melhor rota no momento</span>
                </div>

                <div className="border border-border px-4 py-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">LLMs</span>
                  <p className="mt-1 text-xs text-foreground">GPT, Claude, Gemini, e o que vier</p>
                </div>
              </div>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={240} className="mt-16 md:mt-20">
          <EditorMock />
        </Reveal>
      </div>
    </section>
  )
}
