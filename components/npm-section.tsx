"use client"

import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/reveal"

type TerminalStep = {
  type: "command" | "output" | "success"
  text: string
}

const terminalSteps: TerminalStep[] = [
  { type: "command", text: "npx nylla connect" },
  { type: "output", text: "◇ Detectando ambiente Linux... ubuntu 24.04 (x64)" },
  { type: "output", text: "◇ Harness encontrado: Claude Code" },
  { type: "command", text: "nylla config set gateway https://api.nylla.ai/v1" },
  { type: "output", text: "◇ Salvando configuração em ~/.config/nylla/config.json" },
  { type: "command", text: "nylla auth login --api-key nylla_••••••••••••" },
  { type: "output", text: "◇ Validando credenciais com Nylla Gateway..." },
  { type: "success", text: "✓ Claude Code conectado ao Nylla Gateway" },
  { type: "success", text: "✓ Configuração concluída. Pronto para usar." },
]

export function NpmSection() {
  const [visibleSteps, setVisibleSteps] = useState<TerminalStep[]>([])
  const [draft, setDraft] = useState("")
  const [stepIndex, setStepIndex] = useState(0)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const step = terminalSteps[stepIndex]

    if (!step) {
      const restart = window.setTimeout(() => {
        setVisibleSteps([])
        setDraft("")
        setStepIndex(0)
      }, 4200)
      return () => window.clearTimeout(restart)
    }

    if (step.type === "command" && draft.length < step.text.length) {
      const typing = window.setTimeout(() => {
        const increment = draft.length % 6 === 0 ? 2 : 1
        setDraft(step.text.slice(0, draft.length + increment))
      }, 26 + ((draft.length * 7) % 24))
      return () => window.clearTimeout(typing)
    }

    const delay = step.type === "command" ? 520 : step.type === "success" ? 620 : 780
    const advance = window.setTimeout(() => {
      setVisibleSteps((steps) => [...steps, step])
      setDraft("")
      setStepIndex((index) => index + 1)
    }, delay)
    return () => window.clearTimeout(advance)
  }, [draft, stepIndex])

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" })
  }, [draft, visibleSteps])

  const currentStep = terminalSteps[stepIndex]

  return (
    <section>
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <Reveal>
          <h2 className="font-mono text-xs text-muted-foreground">
            <span aria-hidden="true" className="text-primary">{"// "}</span>plug and play
          </h2>
        </Reveal>

        <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          <Reveal className="md:order-1 md:pr-6">
          <p className="max-w-lg text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            Um pacote para conectar qualquer harness.
          </p>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            O NPM do Nylla configura o harness que você já usa e aponta tudo para o Nylla Gateway. Execute um comando e o
            CLI detecta, autentica e configura seu ambiente automaticamente.
          </p>
          <ul className="mt-6 space-y-2 font-mono text-sm text-muted-foreground">
            <li><span className="text-primary" aria-hidden="true">+ </span>detecção automática do ambiente</li>
            <li><span className="text-primary" aria-hidden="true">+ </span>uma chave, todos os modelos</li>
            <li><span className="text-primary" aria-hidden="true">+ </span>sem editar arquivos manualmente</li>
          </ul>
        </Reveal>

        <Reveal delay={120} className="md:order-2">
          <div className="flex min-h-[31rem] items-center bg-[url('/images/connect-landscape.png')] bg-cover bg-center p-5 md:p-8">
            <div className="elev-window w-full overflow-hidden rounded-[10px] border border-[#292929] bg-[#080806] shadow-[0_26px_60px_-18px_rgba(0,0,0,0.72),0_10px_24px_-12px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.4)]">
              <div className="relative flex h-7 items-center border-b border-[#292929] bg-[#171717] px-2.5 shadow-[inset_0_1px_rgba(255,255,255,0.035)] md:h-9 md:px-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="absolute left-1/2 -translate-x-1/2 font-sans text-[8px] font-medium tracking-[-0.01em] text-[#a0a0a0] md:text-[10px]">
                  bash — nylla@linux
                </span>
              </div>

              <div
                ref={terminalRef}
                className="term-pane h-[24rem] overflow-y-auto p-5 font-mono text-[11px] leading-6 text-[#a0a0a0] md:p-6 md:text-xs"
                aria-live="polite"
                aria-label="Terminal Linux configurando o Nylla Gateway"
              >
                <div className="mb-5 text-[#666]">Ubuntu 24.04.1 LTS · bash 5.2.21</div>
                {visibleSteps.map((step, index) => (
                  <div key={`${step.text}-${index}`} className={step.type === "success" ? "text-[#67c978]" : "text-[#a0a0a0]"}>
                    {step.type === "command" && <span className="mr-2 text-primary">nylla@linux:~$</span>}
                    <span className={step.type === "command" ? "text-[#ededed]" : undefined}>{step.text}</span>
                  </div>
                ))}
                {currentStep?.type === "command" && (
                  <div className="flex items-center">
                    <span className="mr-2 shrink-0 text-primary">nylla@linux:~$</span>
                    <span className="text-[#ededed]">{draft}</span>
                    <span className="cursor-blink ml-0.5 inline-block h-3.5 w-1.5 bg-[#ededed]" aria-hidden="true" />
                  </div>
                )}
                {currentStep && currentStep.type !== "command" && (
                  <div className="flex items-center text-[#666]">
                    <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-[#67c978]" aria-hidden="true" />
                    processando
                  </div>
                )}
                {!currentStep && (
                  <div className="mt-3 flex items-center">
                    <span className="mr-2 text-primary">nylla@linux:~$</span>
                    <span className="cursor-blink inline-block h-3.5 w-1.5 bg-[#ededed]" aria-hidden="true" />
                  </div>
                )}
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
