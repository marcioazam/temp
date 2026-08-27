"use client"

import { useEffect, useRef, useState } from "react"
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
    <div className="flex min-h-12 max-w-sm items-stretch border border-border bg-card/50 pl-4">
      <span className="self-center font-mono text-sm text-primary" aria-hidden="true">$</span>
      <code className="ml-3 min-w-0 flex-1 self-center truncate font-mono text-sm text-foreground">{command}</code>
      <button
        type="button"
        onClick={copy}
        className="flex w-12 shrink-0 items-center justify-center self-stretch bg-secondary text-foreground transition-colors hover:bg-muted hover:text-primary"
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
    <section id="instalar">
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

          <div className="mt-8">
            <InstallCommand />
          </div>
        </Reveal>

        <Reveal delay={120} className="md:order-2">
          <div className="photo-grain flex min-h-[27rem] items-center bg-[url('/images/connect-landscape.png')] bg-cover bg-center p-5 md:p-8">
            <div className="mac-window mx-auto w-full max-w-xl">
              <div className="mac-titlebar">
                <div className="mac-dots" aria-hidden="true">
                  <span className="mac-dot mac-dot-close" />
                  <span className="mac-dot mac-dot-min" />
                  <span className="mac-dot mac-dot-max" />
                </div>
                <span className="mac-titlebar-title">bash — nylla@linux</span>
              </div>

              <div
                ref={terminalRef}
                className="term-pane h-80 overflow-y-auto p-5 font-mono text-[11px] leading-6 text-[#a0a0a0] md:p-6 md:text-xs"
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
