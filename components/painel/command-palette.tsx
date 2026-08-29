'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import {
  Activity,
  Boxes,
  CircleDollarSign,
  KeyRound,
  LayoutDashboard,
  Search,
  Settings,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const commands = [
  { href: '/painel/overview', label: 'Visão geral', group: 'Painel', icon: LayoutDashboard, keywords: 'dashboard overview inicio' },
  { href: '/painel/models', label: 'Modelos', group: 'Infraestrutura', icon: Boxes, keywords: 'gpt claude gemini modelo' },
  { href: '/painel/api-keys', label: 'Chaves de API', group: 'API Gateway', icon: KeyRound, keywords: 'key token credencial' },
  { href: '/painel/logs', label: 'Usage', group: 'Observabilidade', icon: Activity, keywords: 'usage requisições requests historico logs' },
  { href: '/painel/costs', label: 'Custos', group: 'Observabilidade', icon: CircleDollarSign, keywords: 'gastos billing orçamento custo' },
  { href: '/painel/users', label: 'Usuários', group: 'Organização', icon: Users, keywords: 'equipe membros time convite' },
  { href: '/painel/settings', label: 'Configurações', group: 'Organização', icon: Settings, keywords: 'ajustes settings webhook retenção' },
]

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.keywords.includes(q))
  }, [query])

  const sections = useMemo(() => {
    const out: { title: string; items: typeof commands }[] = []
    for (const cmd of results) {
      const last = out[out.length - 1]
      if (last && last.title === cmd.group) last.items.push(cmd)
      else out.push({ title: cmd.group, items: [cmd] })
    }
    return out
  }, [results])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  function go(href: string) {
    onOpenChange(false)
    router.push(href)
  }

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[3px] transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <BaseDialog.Popup className="fixed left-1/2 top-1/2 z-50 w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 border border-border bg-popover shadow-[0_32px_80px_rgba(0,0,0,0.7)] outline-none transition-all data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0">
          <BaseDialog.Title className="sr-only">Buscar no painel</BaseDialog.Title>

          <div className="flex items-center gap-2.5 border-b border-border px-4">
            <Search className="size-4 shrink-0 text-subtle-foreground" aria-hidden="true" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setActive((a) => Math.min(results.length - 1, a + 1))
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  setActive((a) => Math.max(0, a - 1))
                } else if (e.key === 'Enter' && results[active]) {
                  if (e.nativeEvent.isComposing || e.keyCode === 229) return
                  e.preventDefault()
                  go(results[active].href)
                }
              }}
              placeholder="Buscar páginas do painel…"
              className="h-12 w-full bg-transparent text-sm text-foreground placeholder:text-subtle-foreground focus:outline-none"
              aria-label="Buscar páginas do painel"
            />
          </div>

          <ul className="docs-scrollbar max-h-[min(380px,50vh)] overflow-y-auto py-1.5" role="listbox">
            {results.length === 0 && (
              <li className="px-4 py-8 text-center text-[12px] text-subtle-foreground">
                Nenhum resultado para &quot;{query}&quot;
              </li>
            )}
            {sections.map((section) => (
              <li key={section.title}>
                <p className="px-4 pb-1 pt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-subtle-foreground">
                  {section.title}
                </p>
                <ul>
                  {section.items.map((cmd) => {
                    const i = results.indexOf(cmd)
                    const Icon = cmd.icon
                    const current = pathname === cmd.href
                    return (
                      <li key={cmd.href} role="option" aria-selected={i === active}>
                        <button
                          type="button"
                          onClick={() => go(cmd.href)}
                          onMouseEnter={() => setActive(i)}
                          className={cn(
                            'flex w-full items-center gap-2.5 px-4 py-2 text-left text-[13px] transition-colors',
                            i === active ? 'bg-muted text-foreground' : 'text-muted-foreground',
                          )}
                        >
                          <Icon
                            className={cn('size-4 shrink-0', i === active ? 'text-primary' : 'text-subtle-foreground')}
                          />
                          <span className="flex-1 truncate">{cmd.label}</span>
                          {current && (
                            <span className="font-mono text-[9px] uppercase tracking-wide text-subtle-foreground">
                              Atual
                            </span>
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.1em] text-subtle-foreground">
            <span>↑↓ Navegar</span>
            <span>Enter Selecionar</span>
            <span>Esc Fechar</span>
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}
