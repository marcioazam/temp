'use client'

import { useEffect, useRef, useState } from 'react'
import { CornerDownLeft, Square } from 'lucide-react'
import { PageHeader } from '@/components/painel/page-header'
import { Field, NativeSelect } from '@/components/painel/ui/controls'
import { fmtLatency } from '@/lib/painel/format'
import { usePainel } from '@/lib/painel/store'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  meta?: { model: string; latencyMs: number; tokensIn: number; tokensOut: number }
}

const cannedResponses = [
  'Aqui está um resumo do que você pediu: o gateway da Nylla roteia cada requisição pelo provedor mais saudável no momento, aplicando fallback automático quando a latência ou a taxa de erro ultrapassa os limites configurados.\n\nEm produção, isso significa que seu app continua respondendo mesmo durante incidentes de um provedor específico.',
  'Boa pergunta. Em linhas gerais:\n\n1. A requisição chega ao endpoint unificado /v1/chat/completions.\n2. O roteador avalia custo, latência e disponibilidade dos modelos ativos.\n3. A resposta volta normalizada no formato OpenAI-compatível, independentemente do provedor.\n\nVocê pode fixar um modelo específico passando o campo "model" no corpo da requisição.',
  'Claro. Um exemplo mínimo em TypeScript:\n\nconst res = await fetch("https://api.nylla.ai/v1/chat/completions", {\n  method: "POST",\n  headers: { Authorization: `Bearer ${key}` },\n  body: JSON.stringify({ model: "gpt-4.1", messages }),\n})\n\nO mesmo código funciona para qualquer modelo ativo no seu workspace — basta trocar o identificador.',
]

export default function PlaygroundPage() {
  const { state } = usePainel()
  const activeModels = state.models.filter((m) => m.status === 'active' && m.type === 'Chat')

  const [model, setModel] = useState(activeModels[0]?.name ?? 'gpt-4.1')
  const [temperature, setTemperature] = useState('0.7')
  const [maxTokens, setMaxTokens] = useState('1024')
  const [system, setSystem] = useState('Você é um assistente técnico conciso e direto.')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [streaming, setStreaming] = useState(false)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const responseIndex = useRef(0)

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

  function send() {
    const text = input.trim()
    if (!text || streaming) return
    const userMsg: Message = { id: `m_${Date.now()}`, role: 'user', content: text }
    const full = cannedResponses[responseIndex.current % cannedResponses.length]
    responseIndex.current += 1
    const assistantId = `m_${Date.now() + 1}`
    const latencyMs = Math.floor(Math.random() * 900) + 300

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
                meta: done
                  ? {
                      model,
                      latencyMs,
                      tokensIn: Math.ceil(text.length / 4) + 24,
                      tokensOut: Math.ceil(full.length / 4),
                    }
                  : undefined,
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

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <aside className="flex h-fit flex-col gap-4 border border-border bg-card p-4 lg:sticky lg:top-20">
          <Field label="Modelo">
            <NativeSelect value={model} onChange={(e) => setModel(e.target.value)}>
              {activeModels.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="Temperatura">
            <NativeSelect value={temperature} onChange={(e) => setTemperature(e.target.value)}>
              <option value="0">0 — determinístico</option>
              <option value="0.3">0.3</option>
              <option value="0.7">0.7</option>
              <option value="1">1 — criativo</option>
            </NativeSelect>
          </Field>
          <Field label="Máx. tokens">
            <NativeSelect value={maxTokens} onChange={(e) => setMaxTokens(e.target.value)}>
              <option value="256">256</option>
              <option value="1024">1.024</option>
              <option value="4096">4.096</option>
            </NativeSelect>
          </Field>
          <Field label="Instrução de sistema">
            <textarea
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              rows={4}
              className="w-full resize-y border border-border bg-background px-2.5 py-2 text-[12px] leading-relaxed text-foreground placeholder:text-subtle-foreground focus-visible:border-ring focus-visible:outline-none"
            />
          </Field>
        </aside>

        <section className="flex min-h-[520px] flex-col border border-border bg-card">
          <div
            ref={scrollRef}
            className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-5"
            aria-live="polite"
          >
            {messages.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                  {model}
                </p>
                <p className="max-w-sm text-[13px] leading-relaxed text-muted-foreground text-pretty">
                  Envie uma mensagem para testar o modelo selecionado. As respostas são simuladas
                  localmente para demonstração.
                </p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                  {m.role === 'user' ? 'Você' : model}
                </span>
                <div
                  className={
                    m.role === 'user'
                      ? 'max-w-[85%] self-start border border-border bg-muted px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground whitespace-pre-wrap'
                      : 'max-w-[85%] text-[13px] leading-relaxed text-foreground whitespace-pre-wrap'
                  }
                >
                  {m.content}
                  {m.role === 'assistant' && !m.meta && streaming && (
                    <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-primary align-middle" aria-hidden />
                  )}
                </div>
                {m.meta && (
                  <p className="font-mono text-[10px] text-subtle-foreground">
                    {fmtLatency(m.meta.latencyMs)} · {m.meta.tokensIn} tokens in · {m.meta.tokensOut} tokens out
                  </p>
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
                className="min-h-[3rem] flex-1 resize-none border border-border bg-background px-3 py-2 text-[13px] leading-relaxed text-foreground placeholder:text-subtle-foreground focus-visible:border-ring focus-visible:outline-none"
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
                  className="flex h-8 items-center gap-2 border border-primary bg-primary px-3 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
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
