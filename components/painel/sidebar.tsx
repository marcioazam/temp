'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import {
  Activity,
  BookOpen,
  Boxes,
  KeyRound,
  LayoutDashboard,
  LogOut,
  MoreHorizontal,
  PanelLeft,
  ScrollText,
  Search,
  Settings,
  Sparkles,
} from 'lucide-react'
import { RotorMark } from '@/components/logo'
import { cn } from '@/lib/utils'
import { initials } from '@/lib/painel/format'
import { usePainel } from '@/lib/painel/store'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const groups: { title: string | null; items: NavItem[] }[] = [
  {
    title: null,
    items: [{ href: '/painel/overview', label: 'Visão geral', icon: LayoutDashboard }],
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
      { href: '/painel/logs', label: 'Usage', icon: Activity },
      { href: '/painel/activity', label: 'Logs', icon: ScrollText },
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
  const { state } = usePainel()
  const fullName = `${state.settings.firstName} ${state.settings.lastName}`.trim()
  const accountMenuRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    function closeAccountMenu(event: PointerEvent) {
      const menu = accountMenuRef.current
      if (menu?.open && !menu.contains(event.target as Node)) menu.open = false
    }

    document.addEventListener('pointerdown', closeAccountMenu)
    return () => document.removeEventListener('pointerdown', closeAccountMenu)
  }, [])

  return (
    <nav
      aria-label="Navegação do painel"
      className="flex h-full w-56 flex-col border-r border-border bg-sidebar"
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
          <Link
            href="/painel/settings"
            onClick={onNavigate}
            aria-current={pathname === '/painel/settings' ? 'page' : undefined}
            className={cn(
              'group relative flex items-center gap-2.5 px-2 py-1.5 text-[13px] transition-colors',
              pathname === '/painel/settings'
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
            )}
          >
            {pathname === '/painel/settings' && (
              <span className="absolute inset-y-0 left-0 w-px bg-primary" aria-hidden="true" />
            )}
            <Settings
              className={cn(
                'size-4 shrink-0',
                pathname === '/painel/settings'
                  ? 'text-primary'
                  : 'text-subtle-foreground group-hover:text-muted-foreground',
              )}
            />
            <span>Configurações</span>
          </Link>
          <a
            href="/docs"
            className="flex items-center gap-2.5 px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <BookOpen className="size-4 shrink-0 text-subtle-foreground" />
            <span>Documentação</span>
          </a>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="relative flex items-center gap-2.5 px-4 py-3">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-mono text-[9px] text-muted-foreground">
            {initials(fullName)}
          </span>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[12px] text-foreground">{fullName}</span>
            <span className="mt-0.5 w-fit font-mono text-[9px] font-medium uppercase tracking-wide text-subtle-foreground">
              Plano Free
            </span>
          </div>
          <details ref={accountMenuRef} className="group/profile shrink-0">
            <summary
              className="flex size-7 cursor-pointer list-none items-center justify-center text-subtle-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-1 focus-visible:outline-primary [&::-webkit-details-marker]:hidden"
              aria-label="Abrir opções da conta"
              title="Opções da conta"
            >
              <MoreHorizontal className="size-4" aria-hidden="true" />
            </summary>
            <div className="absolute bottom-full left-2 right-2 z-50 mb-1 border border-border bg-popover shadow-lg">
              <div className="flex flex-col gap-0.5 px-3 pb-3 pt-2.5">
                <span className="truncate text-[13px] text-foreground">{fullName}</span>
                <span className="truncate text-[11px] text-subtle-foreground">ana@nyllalabs.com</span>
              </div>

              <div className="px-2 pb-2">
                <Link
                  href="/painel/settings"
                  className="flex items-center justify-center gap-2 bg-primary px-2 py-2 text-[12.5px] font-medium text-sidebar transition-colors hover:bg-primary/90 focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-primary"
                >
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  <span>Assinar Plano</span>
                </Link>
              </div>

              <div className="flex flex-col border-t border-border p-1">
                <Link
                  href="/painel/settings"
                  className="flex items-center gap-2.5 px-2 py-1.5 text-[12.5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-1 focus-visible:outline-primary"
                >
                  <Settings className="size-3.5 shrink-0 text-subtle-foreground" aria-hidden="true" />
                  <span>Configurações</span>
                </Link>
                <Link
                  href="/painel/api-keys"
                  className="flex items-center gap-2.5 px-2 py-1.5 text-[12.5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-1 focus-visible:outline-primary"
                >
                  <KeyRound className="size-3.5 shrink-0 text-subtle-foreground" aria-hidden="true" />
                  <span>Chaves de API</span>
                </Link>
              </div>

              <div className="border-t border-border p-1">
                <Link
                  href="/"
                  className="flex items-center gap-2.5 px-2 py-1.5 text-[12.5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-1 focus-visible:outline-primary"
                >
                  <LogOut className="size-3.5 shrink-0 text-subtle-foreground" aria-hidden="true" />
                  <span>Sair</span>
                </Link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </nav>
  )
}

export function usePainelNav() {
  return groups
}
