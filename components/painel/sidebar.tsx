'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Boxes,
  ChartColumn,
  CircleDollarSign,
  KeyRound,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  ScrollText,
  Server,
  Settings,
  SquareTerminal,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
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
      { href: '/painel/playground', label: 'Playground', icon: SquareTerminal },
    ],
  },
  {
    title: 'Infraestrutura',
    items: [
      { href: '/painel/providers', label: 'Provedores', icon: Server },
      { href: '/painel/models', label: 'Modelos', icon: Boxes },
    ],
  },
  {
    title: 'API Gateway',
    items: [{ href: '/painel/api-keys', label: 'Chaves de API', icon: KeyRound }],
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
  collapsed,
  onToggle,
  onNavigate,
}: {
  collapsed: boolean
  onToggle: () => void
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Navegação do painel"
      className={cn(
        'flex h-full flex-col border-r border-border bg-background transition-[width] duration-200',
        collapsed ? 'w-14' : 'w-56',
      )}
    >
      <div className="flex items-center justify-center border-b border-border py-4">
        <Link href="/" className="flex size-6 shrink-0 items-center justify-center bg-primary" aria-label="Nylla — voltar ao site">
          <span className="font-mono text-[13px] font-semibold text-primary-foreground">N</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-3">
        {groups.map((group, gi) => (
          <div key={group.title ?? gi} className={cn('flex flex-col gap-0.5 px-2', gi > 0 && 'mt-4')}>
            {group.title && !collapsed && (
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
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    'group relative flex items-center gap-2.5 px-2 py-1.5 text-[13px] transition-colors',
                    collapsed && 'justify-center px-0 py-2',
                    active
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                  )}
                >
                  {active && <span className="absolute inset-y-0 left-0 w-px bg-primary" aria-hidden="true" />}
                  <Icon className={cn('size-4 shrink-0', active ? 'text-primary' : 'text-subtle-foreground group-hover:text-muted-foreground')} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex flex-col border-t border-border">
        <a
          href="/docs"
          className={cn(
            'flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-muted-foreground transition-colors hover:text-foreground',
            collapsed && 'justify-center px-0',
          )}
          title={collapsed ? 'Documentação' : undefined}
        >
          <BookOpen className="size-4 shrink-0 text-subtle-foreground" />
          {!collapsed && <span>Documentação</span>}
        </a>
        <div className={cn('flex items-center gap-2.5 border-t border-border px-4 py-3', collapsed && 'justify-center px-0')}>
          <span className="flex size-6 shrink-0 items-center justify-center border border-border bg-muted font-mono text-[9px] text-muted-foreground">
            {initials('Ana Ribeiro')}
          </span>
          {!collapsed && (
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[12px] text-foreground">Ana Ribeiro</span>
              <span className="truncate text-[10px] text-subtle-foreground">ana@nyllalabs.com</span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            'flex items-center gap-2.5 border-t border-border px-4 py-2.5 text-[12px] text-subtle-foreground transition-colors hover:text-foreground',
            collapsed && 'justify-center px-0',
          )}
          aria-label={collapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
        >
          {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          {!collapsed && <span>Recolher</span>}
        </button>
      </div>
    </nav>
  )
}

export function usePainelNav() {
  return groups
}
