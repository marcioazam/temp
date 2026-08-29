'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, Copy, CornerDownLeft, Eraser, Square } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/painel/page-header'
import { fmtLatency } from '@/lib/painel/format'
import { usePainel } from '@/lib/painel/store'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  meta?: { model: string; latencyMs: number; tokensIn: number; tokensOut: number; cost: number }
}

const cannedResponses = [
  'Aqui está um resumo do que você pediu: o gateway da Nylla roteia cada requisição pelo provedor mais saudável no momento, aplicando fallback automático quando a latência ou a taxa de erro ultrapassa os limites configurados.\n\nEm produção, isso significa que seu app continua respondendo mesmo durante incidentes de um provedor específico.',
  'Boa pergunta. Em linhas gerais:\n\n1. A requisição chega ao endpoint unificado /v1/chat/completions.\n2. O roteador avalia custo, latência e disponibilidade dos modelos ativos.\n3. A resposta volta normalizada no formato OpenAI-compatível, independentemente do provedor.\n\nVocê pode fixar um modelo específico passando o campo "model" no corpo da requisição.',
  'Claro. Um exemplo mínimo em TypeScript:\n\nconst res = await fetch("https://api.nylla.ai/v1/chat/completions", {\n  method: "POST",\n  headers: { Authorization: `Bearer ${key}` },\n  body: JSON.stringify({ model: "gpt-4.1", messages }),\n})\n\nO mesmo código funciona para qualquer modelo ativo no seu workspace — basta trocar o identificador.',
]

const systemPresets = [
  { id: 'concise', label: 'Conciso', prompt: 'Você é um assistente técnico conciso e direto.' },
  { id: 'detailed', label: 'Detalhado', prompt: 'Você é um assistente técnico que explica com profundidade, exemplos e trade-offs.' },
  { id: 'code', label: 'Código', prompt: 'Você responde prioritariamente com código funcional e comentários mínimos.' },
] as const

const maxTokenOptions = ['256', '1024', '4096', '8192'] as const

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div
      className="flex h-[30px] items-center border border-foreground/25 bg-background p-0.5 font-mono text-[10px] uppercase tracking-[0.1em]"
      role="group"
      aria-label={label}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={cn(
            'grid h-6 min-w-7 place-items-center px-1.5 transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-foreground',
            value === o.value
              ? 'bg-foreground text-background'
              : 'bg-background text-muted-foreground hover:text-foreground',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function ParamSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">{label}</span>
        <span className="font-mono text-[11px] tabular-nums text-foreground">{value.toFixed(step < 1 ? 1 : 0)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-1 w-full cursor-pointer appearance-none bg-muted accent-foreground"
      />
    </div>
  )
}

export default function PlaygroundPage() {
  const { state } = usePainel()
  const chatModels = useMemo(
    () => state.models.filter((m) => m.status === 'active' && m.type === 'Chat'),
    [state.models],
  )
  const providerName = (id: string) => state.providers.find((p) => p.id === id)?.name ?? id

  const [modelId, setModelId] = useState(chatModels[0]?.id ?? 'gpt-4.1')
  const [temperature, setTemperature] = useState(0.7)
  const [topP, setTopP] = useState(1)
  const [maxTokens, setMaxTokens] = useState<(typeof maxTokenOptions)[number]>('1024')
  const [system, setSystem] = useState(systemPresets[0].prompt)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [streaming, setStreaming] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const responseIndex = useRef(0)

  const model = chatModels.find((m) => m.id === modelId) ?? chatModels[0]

  const session = useMemo(() => {
    const replies = messages.filter((m) => m.meta)
    return {
      turns: replies.length,
      tokens: replies.reduce((acc, m) => acc + (m.meta!.tokensIn + m.meta!.tokensOut), 0),
      cost: replies.reduce((acc, m) => acc + m.meta!.cost, 0),
    }
  }, [messages])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages])

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  function stop() {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
    setStreaming(false)
  }

  function clearChat() {
    stop()
    setMessages([])
  }

  async function copyMessage(id: string, content: string) {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedId(id)
      window.setTimeout(() => setCopiedId(null), 1600)
    } catch {
      // clipboard indisponível — ignora silenciosamente
    }
  }

  function send() {
    const text = input.trim()
    if (!text || streaming || !model) return
    const userMsg: Message = { id: `m_${Date.now()}`, role: 'user', content: text }
    const full = cannedResponses[responseIndex.current % cannedResponses.length]
    responseIndex.current += 1
    const assistantId = `m_${Date.now() + 1}`
    const latencyMs = Math.floor(Math.random() * 900) + 300
    const tokensIn = Math.ceil(text.length / 4) + 24
    const tokensOut = Math.ceil(full.length / 4)
    const cost = (tokensIn * model.inputPrice + tokensOut * model.outputPrice) / 1_000_000

    setMessages((prev) => [...prev, userMsg, { id: assistantId, role: 'assistant', content: '' }])
    setInput('')
    setStreaming(true)

    let i = 0
    timerRef.current = setInterval(() => {
      i += Math.floor(Math.random() * 6) + 3
      const done = i >= full.length
      const chunk = full.slice(0, i)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: chunk,
                meta: done ? { model: model.name, latencyMs, tokensIn, tokensOut, cost } : undefined,
              }
            : m,
        ),
      )
      if (done) stop()
    }, 24)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (e.nativeEvent.isComposing || e.keyCode === 229) return
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Playground"
        description="Teste modelos ativos do workspace com respostas simuladas — nenhuma requisição real é enviada."
      />

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <aside className="flex h-fit flex-col gap-4 lg:sticky lg:top-20">
          <section className="border border-border/35 bg-muted/20" aria-label="Modelo">
            <div className="px-4 pb-1 pt-3.5">
              <h2 className="text-[15px] font-medium tracking-tight text-foreground">Modelo</h2>
            </div>
            <div className="flex flex-col px-2 pb-2 pt-1" role="radiogroup" aria-label="Modelo ativo">
              {chatModels.map((m) => {
                const selected = m.id === modelId
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setModelId(m.id)}
                    className={cn(
                      'flex flex-col gap-1 px-2 py-2 text-left transition-colors',
                      selected ? 'bg-muted/60' : 'hover:bg-muted/35',
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn('truncate font-mono text-[12px]', selected ? 'text-foreground' : 'text-muted-foreground')}>
                        {m.name}
                      </span>
                      {selected && <span className="size-1 shrink-0 rounded-full bg-foreground" aria-hidden="true" />}
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[10px] tabular-nums text-subtle-foreground">
                      <span>{providerName(m.providerId)}</span>
                      <span>{m.contextWindow} ctx</span>
                      <span>{fmtLatency(m.latencyMs)}</span>
                    </div>
                  </button>
                )
              })}
            </div>
            {model && (
              <div className="flex items-center gap-3 px-4 pb-3 font-mono text-[10px] tabular-nums text-subtle-foreground">
                <span>IN US$ {model.inputPrice.toFixed(2)}/1M</span>
                <span>OUT US$ {model.outputPrice.toFixed(2)}/1M</span>
              </div>
            )}
          </section>

          <section className="border border-border/35 bg-muted/20" aria-label="Parâmetros">
            <div className="px-4 pb-1 pt-3.5">
              <h2 className="text-[15px] font-medium tracking-tight text-foreground">Parâmetros</h2>
            </div>
            <div className="flex flex-col gap-4 px-4 pb-4 pt-2">
              <ParamSlider label="Temperatura" value={temperature} min={0} max={2} step={0.1} onChange={setTemperature} />
              <ParamSlider label="Top-P" value={topP} min={0} max={1} step={0.1} onChange={setTopP} />
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">Máx. tokens</span>
                <Segmented
                  label="Máximo de tokens"
                  value={maxTokens}
                  onChange={setMaxTokens}
                  options={maxTokenOptions.map((v) => ({ value: v, label: Number(v) >= 1000 ? `${Number(v) / 1024}k` : v }))}
                />
              </div>
            </div>
          </section>

          <section className="border border-border/35 bg-muted/20" aria-label="Instrução de sistema">
            <div className="flex items-center justify-between gap-2 px-4 pb-1 pt-3.5">
              <h2 className="text-[15px] font-medium tracking-tight text-foreground">Sistema</h2>
              <div className="flex items-center gap-1">
                {systemPresets.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSystem(p.prompt)}
                    aria-pressed={system === p.prompt}
                    className={cn(
                      'px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors',
                      system === p.prompt ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="px-4 pb-4 pt-2">
              <textarea
                value={system}
                onChange={(e) => setSystem(e.target.value)}
                rows={4}
                aria-label="Instrução de sistema"
                className="w-full resize-y border border-border/50 bg-background px-2.5 py-2 text-[12px] leading-relaxed text-foreground placeholder:text-subtle-foreground focus-visible:border-ring focus-visible:outline-none"
              />
            </div>
          </section>
        </aside>

        <section className="flex min-h-[560px] flex-col border border-border/35 bg-muted/20" aria-label="Conversa">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[15px] font-medium tracking-tight text-foreground">Conversa</h2>
              <div className="flex items-center gap-2.5 font-mono text-[10px] leading-none tabular-nums">
                <span className="uppercase tracking-[0.12em] text-subtle-foreground">{model?.name ?? '—'}</span>
                <span className="text-muted-foreground">temp {temperature.toFixed(1)}</span>
                <span className="text-muted-foreground">top-p {topP.toFixed(1)}</span>
                <span className="text-muted-foreground">{Number(maxTokens).toLocaleString('pt-BR')} tok</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {session.turns > 0 && (
                <span className="hidden font-mono text-[10px] tabular-nums text-subtle-foreground sm:block">
                  {session.turns} {session.turns === 1 ? 'resposta' : 'respostas'} · {session.tokens.toLocaleString('pt-BR')} tok · US$ {session.cost.toFixed(4)}
                </span>
              )}
              <button
                type="button"
                onClick={clearChat}
                disabled={messages.length === 0}
                className="flex h-7 items-center gap-1.5 border border-border/50 px-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
              >
                <Eraser className="size-3" />
                Limpar
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-5"
            aria-live="polite"
          >
            {messages.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                  {model?.name ?? '—'}
                </p>
                <p className="max-w-sm text-[13px] leading-relaxed text-muted-foreground text-pretty">
                  Envie uma mensagem para testar o modelo selecionado. As respostas são simuladas
                  localmente para demonstração.
                </p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className="group flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                  {m.role === 'user' ? 'Você' : (m.meta?.model ?? model?.name ?? 'assistente')}
                </span>
                <div
                  className={
                    m.role === 'user'
                      ? 'max-w-[85%] self-start border border-border/50 bg-muted px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground whitespace-pre-wrap'
                      : 'max-w-[85%] text-[13px] leading-relaxed text-foreground whitespace-pre-wrap'
                  }
                >
                  {m.content}
                  {m.role === 'assistant' && !m.meta && streaming && (
                    <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-primary align-middle" aria-hidden />
                  )}
                </div>
                {m.meta && (
                  <div className="flex items-center gap-2.5">
                    <p className="font-mono text-[10px] tabular-nums text-subtle-foreground">
                      {fmtLatency(m.meta.latencyMs)} · {m.meta.tokensIn} in · {m.meta.tokensOut} out · US$ {m.meta.cost.toFixed(4)}
                    </p>
                    <button
                      type="button"
                      onClick={() => copyMessage(m.id, m.content)}
                      aria-label="Copiar resposta"
                      className="text-subtle-foreground opacity-0 transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
                    >
                      {copiedId === m.id ? <Check className="size-3 text-term-success" /> : <Copy className="size-3" />}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={2}
                placeholder="Envie uma mensagem — Enter para enviar, Shift+Enter para quebrar linha"
                aria-label="Mensagem"
                className="min-h-[3rem] flex-1 resize-none border border-border/50 bg-background px-3 py-2 text-[13px] leading-relaxed text-foreground placeholder:text-subtle-foreground focus-visible:border-ring focus-visible:outline-none"
              />
              {streaming ? (
                <button
                  type="button"
                  onClick={stop}
                  aria-label="Parar geração"
                  className="flex h-8 items-center gap-2 border border-border px-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Square className="size-3" />
                  Parar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={send}
                  disabled={!input.trim()}
                  className="flex h-8 items-center gap-2 border border-foreground bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  Enviar
                  <CornerDownLeft className="size-3" />
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
