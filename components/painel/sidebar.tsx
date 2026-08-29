'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Boxes,
  CircleDollarSign,
  KeyRound,
  LayoutDashboard,
  PanelLeft,
  ScrollText,
  Search,
  Server,
  Settings,
  Users,
} from 'lucide-react'
import { RotorMark } from '@/components/logo'
import { cn } from '@/lib/utils'
import { usePainel } from '@/lib/painel/store'
import { initials } from '@/lib/painel/format'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const groups: { title: string | null; items: NavItem[] }[] = [
  {
    title: null,
    items: [
      { href: '/painel/overview', label: 'Visão geral', icon: LayoutDashboard },
    ],
  },
  {
    title: 'API Gateway',
    items: [{ href: '/painel/api-keys', label: 'Chaves de API', icon: KeyRound }],
  },
  {
    title: 'Infraestrutura',
    items: [{ href: '/painel/models', label: 'Modelos', icon: Boxes }],
  },
  {
    title: 'Observabilidade',
    items: [
      { href: '/painel/logs', label: 'Logs', icon: ScrollText },
      { href: '/painel/costs', label: 'Custos', icon: CircleDollarSign },
    ],
  },
  {
    title: 'Organização',
    items: [
      { href: '/painel/users', label: 'Usuários', icon: Users },
      { href: '/painel/settings', label: 'Configurações', icon: Settings },
    ],
  },
]

export function PainelSidebar({
  onHide,
  onOpenPalette,
  onNavigate,
}: {
  onHide: () => void
  onOpenPalette: () => void
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const { environment, setEnvironment } = usePainel()

  return (
    <nav
      aria-label="Navegação do painel"
      className="flex h-full w-56 flex-col border-r border-border bg-background"
    >
      <div className="flex items-center gap-2 px-4 py-4">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2.5 text-foreground"
          aria-label="Nylla — voltar ao site"
        >
          <RotorMark aria-hidden="true" className="size-7 shrink-0 text-primary" />
          <span className="type-wordmark whitespace-nowrap text-[1.1875rem]">Nylla</span>
        </Link>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onOpenPalette}
            className="flex size-6 items-center justify-center text-subtle-foreground transition-colors hover:text-foreground"
            aria-label="Buscar no painel (⌘K)"
            title="Buscar  ⌘K"
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            onClick={onHide}
            className="flex size-6 items-center justify-center text-subtle-foreground transition-colors hover:text-foreground"
            aria-label="Ocultar menu lateral"
            title="Ocultar menu lateral"
          >
            <PanelLeft className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-3">
        {groups.map((group, gi) => (
          <div key={group.title ?? gi} className={cn('flex flex-col gap-0.5 px-2', gi > 0 && 'mt-4')}>
            {group.title && (
              <p className="px-2 pb-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-subtle-foreground">
                {group.title}
              </p>
            )}
            {group.items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group relative flex items-center gap-2.5 px-2 py-1.5 text-[13px] transition-colors',
                    active
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                  )}
                >
                  {active && <span className="absolute inset-y-0 left-0 w-px bg-primary" aria-hidden="true" />}
                  <Icon
                    className={cn(
                      'size-4 shrink-0',
                      active ? 'text-primary' : 'text-subtle-foreground group-hover:text-muted-foreground',
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              )
            })}
          </div>
        ))}

        <div className="mt-4 flex flex-col gap-0.5 px-2">
          <p className="px-2 pb-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-subtle-foreground">
            Opções
          </p>
          <a
            href="/docs"
            className="flex items-center gap-2.5 px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <BookOpen className="size-4 shrink-0 text-subtle-foreground" />
            <span>Documentação</span>
          </a>
          <button
            type="button"
            onClick={() => setEnvironment(environment === 'prod' ? 'staging' : 'prod')}
            className="flex items-center gap-2.5 px-2 py-1.5 text-left text-[13px] text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            aria-label={`Ambiente atual: ${environment}. Alternar ambiente`}
          >
            <Server className="size-4 shrink-0 text-subtle-foreground" />
            <span className="flex-1">Ambiente</span>
            <span
              className={cn(
                'font-mono text-[9px] uppercase tracking-[0.1em]',
                environment === 'prod' ? 'text-primary' : 'text-subtle-foreground',
              )}
            >
              {environment}
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2.5 px-4 py-3">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-mono text-[9px] text-muted-foreground">
            {initials('Ana Ribeiro')}
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[12px] text-foreground">Ana Ribeiro</span>
            <span className="truncate text-[10px] text-subtle-foreground">ana@nyllalabs.com</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export function usePainelNav() {
  return groups
}
