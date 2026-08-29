"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const COMPONENTS = [
  "Gateway API",
  "Roteamento de modelos",
  "Streaming",
  "Dashboard",
  "Autenticação",
]

const LEVELS = [
  { id: "all", label: "Todos os eventos", hint: "Incidentes, manutenções e avisos" },
  { id: "incidents", label: "Somente incidentes", hint: "Interrupções e degradações" },
  { id: "outages", label: "Somente interrupções", hint: "Apenas indisponibilidade total" },
] as const

type Channel = "email" | "rss" | "webhook" | "slack"

const CHANNELS: Array<{ id: Channel; label: string }> = [
  { id: "email", label: "E-mail" },
  { id: "rss", label: "RSS / Atom" },
  { id: "webhook", label: "Webhook" },
  { id: "slack", label: "Slack" },
]

const WEBHOOK_PAYLOAD = `{
  "event": "incident.updated",
  "incident": {
    "id": "inc_8f2c1a",
    "title": "Latência elevada no Gateway",
    "severity": "degraded",
    "status": "monitoring",
    "components": ["Gateway API"],
    "created_at": "2026-08-29T10:12:00Z",
    "updated_at": "2026-08-29T10:47:00Z"
  }
}`

/** Modal de assinatura de atualizações de status com canais múltiplos. */
export function SubscribeDialog() {
  const [open, setOpen] = useState(false)
  const [channel, setChannel] = useState<Channel>("email")
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  // ESC fecha; foco preso dentro do painel.
  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close()
        return
      }
      if (event.key !== "Tab") return
      const panel = dialogRef.current
      if (!panel) return
      const focusable = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    dialogRef.current?.querySelector<HTMLElement>("button, input")?.focus()

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, close])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="type-micro inline-flex w-44 items-center justify-center whitespace-nowrap bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span>Obter Atualizações</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-sm sm:items-center"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="animate-in fade-in slide-in-from-bottom-2 my-8 w-full max-w-lg border border-border bg-card duration-200 sm:my-0"
          >
            <header className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
              <div>
                <h2 id={titleId} className="type-label text-foreground">
                  Obter atualizações
                </h2>
                <p className="type-micro mt-1.5 text-subtle-foreground/70">
                  Receba notificações de incidentes e manutenções nos canais que preferir.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Fechar"
                className="type-micro -mr-1 -mt-1 p-1 text-subtle-foreground transition-colors hover:text-foreground"
              >
                ✕
              </button>
            </header>

            <div
              role="tablist"
              aria-label="Canal de notificação"
              className="flex gap-6 border-b border-border px-6"
            >
              {CHANNELS.map((option) => {
                const active = channel === option.id
                return (
                  <button
                    key={option.id}
                    role="tab"
                    aria-selected={active}
                    type="button"
                    onClick={() => setChannel(option.id)}
                    className={cn(
                      "type-micro border-b py-3 transition-colors",
                      active
                        ? "border-foreground text-foreground"
                        : "border-transparent text-subtle-foreground/60 hover:text-foreground",
                    )}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>

            <div className="px-6 py-6">
              {channel === "email" && <EmailPanel />}
              {channel === "rss" && <RssPanel />}
              {channel === "webhook" && <WebhookPanel />}
              {channel === "slack" && <SlackPanel />}
            </div>

            <footer className="border-t border-border px-6 py-4">
              <Link
                href="/status/history"
                onClick={close}
                className="type-micro text-subtle-foreground transition-colors hover:text-foreground"
              >
                {"Ver histórico de incidentes →"}
              </Link>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}

function EmailPanel() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [allComponents, setAllComponents] = useState(true)
  const [selected, setSelected] = useState<string[]>([])
  const [level, setLevel] = useState<(typeof LEVELS)[number]["id"]>("all")

  function toggleComponent(name: string) {
    setAllComponents(false)
    setSelected((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    )
  }

  function submit(event: React.FormEvent) {
    event.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) {
      setError("Informe um endereço de e-mail válido.")
      return
    }
    if (!allComponents && selected.length === 0) {
      setError("Selecione ao menos um componente.")
      return
    }
    setError("")
    setSubscribed(true)
  }

  if (subscribed) {
    return (
      <div className="flex flex-col gap-3">
        <p className="type-label text-foreground">Verifique sua caixa de entrada</p>
        <p className="type-micro leading-relaxed text-subtle-foreground">
          Enviamos um link de confirmação para <span className="text-foreground">{email}</span>.
          Sua assinatura só é ativada após a confirmação (double opt-in) — isso garante que
          ninguém cadastre seu endereço sem permissão.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubscribed(false)
            setEmail("")
          }}
          className="type-micro self-start border-b border-muted-foreground pb-0.5 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          Usar outro e-mail
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="subscribe-email" className="type-micro text-subtle-foreground/70">
          Endereço de e-mail
        </label>
        <input
          id="subscribe-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setError("")
          }}
          placeholder="voce@empresa.com"
          aria-invalid={Boolean(error)}
          className="type-micro w-full border border-border bg-transparent px-3 py-2.5 text-foreground placeholder:text-subtle-foreground/40 focus:border-muted-foreground focus:outline-none"
        />
        {error && (
          <p role="alert" className="type-micro text-destructive">
            {error}
          </p>
        )}
      </div>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="type-micro pb-2.5 text-subtle-foreground/70">Componentes</legend>
        <CheckRow
          label="Todos os componentes"
          checked={allComponents}
          onChange={() => {
            setAllComponents(true)
            setSelected([])
          }}
        />
        {COMPONENTS.map((name) => (
          <CheckRow
            key={name}
            label={name}
            checked={!allComponents && selected.includes(name)}
            onChange={() => toggleComponent(name)}
          />
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="type-micro pb-2.5 text-subtle-foreground/70">
          Nível de notificação
        </legend>
        {LEVELS.map((option) => (
          <label key={option.id} className="group flex cursor-pointer items-baseline gap-3">
            <input
              type="radio"
              name="level"
              checked={level === option.id}
              onChange={() => setLevel(option.id)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                "type-micro",
                level === option.id ? "text-foreground" : "text-subtle-foreground/40",
              )}
            >
              {level === option.id ? "●" : "○"}
            </span>
            <span className="flex flex-col gap-0.5">
              <span
                className={cn(
                  "type-micro transition-colors",
                  level === option.id
                    ? "text-foreground"
                    : "text-subtle-foreground group-hover:text-foreground",
                )}
              >
                {option.label}
              </span>
              <span className="type-micro text-subtle-foreground/50 normal-case tracking-normal">
                {option.hint}
              </span>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="type-micro w-full bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90"
        >
          Assinar
        </button>
        <p className="type-micro text-subtle-foreground/50 normal-case tracking-normal">
          Cancele quando quiser — todo e-mail inclui link de descadastro em um clique.
        </p>
      </div>
    </form>
  )
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden="true"
        className={cn(
          "flex size-3.5 items-center justify-center border text-[9px] leading-none transition-colors",
          checked
            ? "border-foreground bg-foreground text-background"
            : "border-border text-transparent group-hover:border-muted-foreground",
        )}
      >
        ✓
      </span>
      <span
        className={cn(
          "type-micro transition-colors",
          checked ? "text-foreground" : "text-subtle-foreground group-hover:text-foreground",
        )}
      >
        {label}
      </span>
    </label>
  )
}

function CopyRow({ label, url }: { label: string; url: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard indisponível — sem ação
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 border border-border px-3 py-2.5">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="type-micro text-subtle-foreground/50">{label}</span>
        <span className="type-micro truncate text-foreground normal-case tracking-normal">
          {url}
        </span>
      </div>
      <button
        type="button"
        onClick={copy}
        className="type-micro shrink-0 text-subtle-foreground transition-colors hover:text-foreground"
      >
        {copied ? "Copiado" : "Copiar"}
      </button>
    </div>
  )
}

function RssPanel() {
  return (
    <div className="flex flex-col gap-4">
      <p className="type-micro leading-relaxed text-subtle-foreground">
        Acompanhe incidentes no seu leitor de feeds. Cada atualização de incidente gera uma nova
        entrada com severidade, componentes afetados e histórico completo.
      </p>
      <CopyRow label="RSS" url="https://verbo.ai/status/feed.rss" />
      <CopyRow label="Atom" url="https://verbo.ai/status/feed.atom" />
    </div>
  )
}

function WebhookPanel() {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [registered, setRegistered] = useState(false)

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!/^https:\/\/.+\..+/.test(url)) {
      setError("Informe uma URL HTTPS válida.")
      return
    }
    setError("")
    setRegistered(true)
  }

  if (registered) {
    return (
      <div className="flex flex-col gap-3">
        <p className="type-label text-foreground">Webhook registrado</p>
        <p className="type-micro leading-relaxed text-subtle-foreground">
          Enviamos um evento de teste para{" "}
          <span className="break-all text-foreground">{url}</span>. Eventos reais serão entregues
          com retries e backoff exponencial em caso de falha.
        </p>
        <button
          type="button"
          onClick={() => {
            setRegistered(false)
            setUrl("")
          }}
          className="type-micro self-start border-b border-muted-foreground pb-0.5 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          Registrar outro endpoint
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="webhook-url" className="type-micro text-subtle-foreground/70">
          URL do endpoint
        </label>
        <div className="flex gap-2">
          <input
            id="webhook-url"
            type="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value)
              setError("")
            }}
            placeholder="https://api.suaempresa.com/hooks/status"
            aria-invalid={Boolean(error)}
            className="type-micro min-w-0 flex-1 border border-border bg-transparent px-3 py-2.5 text-foreground placeholder:text-subtle-foreground/40 focus:border-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="type-micro shrink-0 bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90"
          >
            Registrar
          </button>
        </div>
        {error && (
          <p role="alert" className="type-micro text-destructive">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="type-micro text-subtle-foreground/70">Exemplo de payload</p>
        <pre className="type-micro overflow-x-auto border border-border bg-secondary/50 p-3 leading-relaxed text-subtle-foreground normal-case tracking-normal">
          {WEBHOOK_PAYLOAD}
        </pre>
      </div>

      <p className="type-micro leading-relaxed text-subtle-foreground/50 normal-case tracking-normal">
        Cada requisição inclui o header X-Status-Signature (HMAC SHA-256) para verificação de
        autenticidade. Entregas com falha são repetidas com backoff exponencial por até 24h.
      </p>
    </form>
  )
}

function SlackPanel() {
  const [connected, setConnected] = useState(false)

  if (connected) {
    return (
      <div className="flex flex-col gap-3">
        <p className="type-label text-foreground">Solicitação enviada</p>
        <p className="type-micro leading-relaxed text-subtle-foreground">
          Você será redirecionado ao Slack para autorizar e escolher o canal que receberá os
          incidentes e manutenções em tempo real.
        </p>
        <button
          type="button"
          onClick={() => setConnected(false)}
          className="type-micro self-start border-b border-muted-foreground pb-0.5 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          Voltar
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="type-micro leading-relaxed text-subtle-foreground">
        Receba incidentes e manutenções diretamente em um canal do seu workspace. As mensagens
        são atualizadas conforme o incidente evolui — sem ruído de threads duplicadas.
      </p>
      <button
        type="button"
        onClick={() => setConnected(true)}
        className="type-micro self-start border border-border bg-transparent px-4 py-2.5 text-foreground transition-colors hover:border-muted-foreground hover:bg-secondary"
      >
        Adicionar ao Slack
      </button>
      <p className="type-micro text-subtle-foreground/50 normal-case tracking-normal">
        Suporte a Microsoft Teams e Discord em breve.
      </p>
    </div>
  )
}
