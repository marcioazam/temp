"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
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

function InstallCommand() {
  const command = "npm i -g nylla"
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="flex min-h-12 max-w-sm items-stretch border border-foreground bg-card/50 pl-4">
      <span className="type-code self-center text-[0.8125rem] text-primary" aria-hidden="true">$</span>
      <code className="type-code ml-3 min-w-0 flex-1 self-center truncate text-[0.8125rem] text-foreground">{command}</code>
      <button
        type="button"
        onClick={copy}
        className="flex w-12 shrink-0 items-center justify-center self-stretch bg-foreground text-background transition-colors hover:bg-foreground/90"
        aria-label={copied ? "Comando copiado" : `Copiar ${command}`}
        title={copied ? "Copiado" : "Copiar comando"}
      >
        {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      </button>
    </div>
  )
}

export function NpmSection() {
  const [visibleSteps, setVisibleSteps] = useState<TerminalStep[]>([])
  const [draft, setDraft] = useState("")
  const [stepIndex, setStepIndex] = useState(0)

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


  const currentStep = terminalSteps[stepIndex]

  return (
    <section id="instalar">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <Reveal>
          <h2 className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
            <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
            <span>plug and play</span>
          </h2>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          <Reveal className="md:order-1 md:pr-6">
          <p className="type-heading max-w-lg text-balance text-foreground">
            Um pacote para conectar qualquer harness.
          </p>
          <p className="type-lead mt-5 max-w-md text-pretty text-muted-foreground">
            O NPM do Nylla configura o harness que você já usa e aponta tudo para o Nylla Gateway. Um comando, nada de
            ajuste manual.
          </p>
          <ul className="type-label mt-7 space-y-2 text-muted-foreground">
            <li><span className="text-primary" aria-hidden="true">+ </span>detecção automática do ambiente</li>
            <li><span className="text-primary" aria-hidden="true">+ </span>uma chave, todos os modelos</li>
            <li><span className="text-primary" aria-hidden="true">+ </span>sem editar arquivos manualmente</li>
          </ul>

          <div className="mt-8">
            <InstallCommand />
          </div>
        </Reveal>

        <Reveal delay={120} className="md:order-2">
          <div className="photo-grain flex min-h-[27rem] items-center bg-[url('/images/connect-landscape.png')] bg-cover bg-center p-5 md:p-8">
            <div className="win mx-auto w-full max-w-xl">
              <div className="win-bar">
                <div className="win-dots" aria-hidden="true">
                  <span className="win-dot win-dot--close" />
                  <span className="win-dot win-dot--min" />
                  <span className="win-dot win-dot--max" />
                </div>
                <span className="win-title">bash — nylla@linux</span>
              </div>

              <div
                className="term-pane h-80 overflow-hidden p-5 font-mono text-[8px] leading-[1.65] tracking-[-0.005em] text-term-mid sm:text-[9px] md:p-6 md:text-[10px]"
                aria-live="polite"
                aria-label="Terminal Linux configurando o Nylla Gateway"
              >
                <div className="mb-5 text-term-faint">Ubuntu 24.04.1 LTS · bash 5.2.21</div>
                {visibleSteps.map((step, index) => (
                  <div key={`${step.text}-${index}`} className={step.type === "success" ? "text-term-success" : "text-term-mid"}>
                    {step.type === "command" && <span className="mr-2 text-primary">nylla@linux:~$</span>}
                    <span className={step.type === "command" ? "text-term-fg" : undefined}>{step.text}</span>
                  </div>
                ))}
                {currentStep?.type === "command" && (
                  <div className="flex items-center">
                    <span className="mr-2 shrink-0 text-primary">nylla@linux:~$</span>
                    <span className="text-term-fg">{draft}</span>
                    <span className="cursor-blink ml-0.5 inline-block h-3.5 w-1.5 bg-term-fg" aria-hidden="true" />
                  </div>
                )}
                {currentStep && currentStep.type !== "command" && (
                  <div className="flex items-center text-term-dim">
                    <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-term-success" aria-hidden="true" />
                    processando
                  </div>
                )}
                {!currentStep && (
                  <div className="mt-3 flex items-center">
                    <span className="mr-2 text-primary">nylla@linux:~$</span>
                    <span className="cursor-blink inline-block h-3.5 w-1.5 bg-term-fg" aria-hidden="true" />
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
