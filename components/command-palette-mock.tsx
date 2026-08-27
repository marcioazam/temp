"use client"

import { useEffect, useState } from "react"
import { ArrowUp, GitBranch, LoaderCircle, PanelLeft, PanelRight, PanelsTopLeft, Search } from "lucide-react"

const models = [
  "Opus 5",
  "GPT 5.6 Sol",
  "GLM 5.2",
  "Kimi K3",
  "Gemini Flash 3.7",
  "Qwen 3.8",
  "Deepseek V4",
  "Grok 4.6",
]

function ModelSelector({ isRunning }: { isRunning: boolean }) {
  const [activeModel, setActiveModel] = useState(0)

  useEffect(() => {
    if (!isRunning) return
    const interval = window.setInterval(() => {
      setActiveModel((current) => (current + 1) % models.length)
    }, 500)

    return () => window.clearInterval(interval)
  }, [isRunning])

  return (
    <span className="relative inline-flex min-w-[74px] items-center text-code-dim" aria-label={`Modelo selecionado: ${models[activeModel]}`}>
      <span
        className="absolute bottom-full left-0 z-20 mb-1 w-32 overflow-hidden rounded-md border border-[#333333] bg-[#171717] p-1 shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
        role="listbox"
        aria-label="Modelos disponíveis"
      >
        {models.map((model, index) => (
          <span
            key={model}
            role="option"
            aria-selected={index === activeModel}
            className={`flex rounded px-2 py-1.5 transition-colors duration-300 hover:text-primary ${
              index === activeModel ? "bg-[#303030] text-primary" : "text-code-dim"
            }`}
          >
            {model}
          </span>
        ))}
      </span>
      <span>{models[activeModel]}⌃</span>
    </span>
  )
}

const thisWeek = [
  { label: "Nylla Gateway no VS Code", active: true, type: "dot" },
  { label: "Roteamento Claude Code", type: "loading" },
  { label: "Terminal Hermes Agent", type: "branch" },
]

const thisMonth = [
  { label: "Catálogo de modelos", type: "branch" },
  { label: "Métricas de uso e custo", type: "dot" },
  { label: "Políticas por workspace", type: "branch" },
]

function VSCodeBrand() {
  return (
    <div className="flex items-center gap-2 text-code-mid">
      <img
        src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/visual-studio-code/default.svg"
        alt=""
        className="size-5 brightness-0 invert"
      />
      <span className="text-[11px] font-medium">VS Code</span>
    </div>
  )
}

function TaskIcon({ type, active }: { type: string; active?: boolean }) {
  const iconColor = active ? "text-primary" : "text-code-faint"
  const dotColor = active ? "bg-primary" : "bg-[#555555]"

  if (type === "loading") return <LoaderCircle className={`size-3.5 ${iconColor}`} />
  if (type === "branch") return <GitBranch className={`size-3.5 ${iconColor}`} />
  return <span className={`size-1.5 rounded-full ${dotColor}`} />
}

function TaskGroup({ title, tasks }: { title: string; tasks: typeof thisWeek }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] text-code-dim">{title}</p>
      <ul className="flex flex-col gap-1">
        {tasks.map((task) => (
          <li
            key={task.label}
            className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[11px] text-code-mid ${task.active ? "bg-[#252525]" : ""}`}
          >
            <span className="flex size-3.5 shrink-0 items-center justify-center"><TaskIcon type={task.type} active={task.active} /></span>
            <span className={`truncate ${task.active ? "text-primary" : ""}`}>{task.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CommandPaletteMock({ isRunning = true }: { isRunning?: boolean }) {
  return (
    <div className="win bg-[#111111]">
      <div className="win-bar">
        <div className="win-dots" aria-label="Controles da janela do macOS">
          <span className="win-dot win-dot--close" />
          <span className="win-dot win-dot--min" />
          <span className="win-dot win-dot--max" />
        </div>
        <div className="absolute left-1/2 flex h-6 w-full max-w-64 -translate-x-1/2 items-center justify-center gap-1.5 rounded-md border border-[#333333] bg-[#202020] px-2.5 font-sans text-[9px] font-medium tracking-[-0.005em] text-chrome-fg shadow-[inset_0_1px_rgba(255,255,255,0.025)]">
          <Search className="size-3" aria-hidden="true" />
          <span>Search</span>
        </div>
        <div className="ml-auto flex items-center justify-end gap-2 text-code-dim" aria-hidden="true">
          <PanelLeft className="size-3" />
          <PanelsTopLeft className="size-3" />
          <PanelRight className="size-3" />
        </div>
      </div>

      <div className="grid h-[350px] grid-cols-[205px_1fr] bg-[#111111] sm:h-[380px] sm:grid-cols-[230px_1fr]">
        <aside className="flex min-w-0 flex-col gap-5 border-r border-[var(--win-border)] bg-[#121212] p-4">
          <VSCodeBrand />
          <TaskGroup title="This Week" tasks={thisWeek} />
          <TaskGroup title="This Month" tasks={thisMonth} />
        </aside>

        <div className="flex min-w-0 flex-col gap-2 overflow-hidden bg-[#111111] p-3 text-[10px] leading-[1.5] tracking-[-0.004em] text-code-fg sm:p-4 sm:text-[11px]">
          <h3 className="font-medium tracking-[-0.012em]">Nylla Gateway no VS Code</h3>
          <div className="rounded-md border border-[#303030] bg-[#171717] px-2.5 py-2 text-code-fg">
            Configure o VS Code para rotear Claude Code, Codex e Gemini CLI pelo Nylla Gateway
          </div>
          <p className="text-code-dim">Explorou 18 arquivos, 6 configurações</p>
          <p>Vou conectar os harnesses ao endpoint compatível com OpenAI, configurar os modelos e validar o streaming dentro do workspace.</p>
          <p className="text-code-dim">Trabalhou por <span className="tabular-nums text-term-success">40s</span></p>
          <p className="text-code-dim">Validou credenciais e roteamento</p>
          <p>Pronto. O workspace agora alterna modelos pelo Nylla sem alterar o fluxo do agente.</p>

          <div className="mt-auto rounded-md border border-[#303030] bg-[#151515] p-2">
            <p className="text-code-dim">Enviar uma continuação...</p>
            <div className="mt-2 flex items-center justify-between text-[9px] text-code-dim">
              <span className="flex items-center gap-2"><span>∞ Agent⌄</span><ModelSelector isRunning={isRunning} /></span>
              <span className="flex size-5 items-center justify-center rounded-full bg-[#36342f]"><ArrowUp className="size-3" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
