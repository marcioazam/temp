'use client'

import { Menu, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePainel } from '@/lib/painel/store'
import { initials } from '@/lib/painel/format'

export function PainelTopbar({
  onOpenPalette,
  onOpenMobileNav,
}: {
  onOpenPalette: () => void
  onOpenMobileNav: () => void
}) {
  const { environment, setEnvironment } = usePainel()

  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
      <button
        type="button"
        onClick={onOpenMobileNav}
        className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground md:hidden"
        aria-label="Abrir menu de navegação"
      >
        <Menu className="size-4" />
      </button>

      <button
        type="button"
        onClick={onOpenPalette}
        className="flex h-7 w-full max-w-64 items-center gap-2 border border-border bg-card px-2.5 text-[12px] text-subtle-foreground transition-colors hover:border-muted-foreground/40 hover:text-muted-foreground"
      >
        <Search className="size-3.5" aria-hidden="true" />
        <span className="flex-1 text-left">Buscar…</span>
        <kbd className="font-mono text-[9px] uppercase tracking-wide">⌘K</kbd>
      </button>

      <div className="ml-auto flex items-center gap-3">
        <div className="flex border border-border" role="group" aria-label="Ambiente">
          {(['prod', 'staging'] as const).map((env) => (
            <button
              key={env}
              type="button"
              onClick={() => setEnvironment(env)}
              aria-pressed={environment === env}
              className={cn(
                'px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors',
                environment === env
                  ? 'bg-muted text-primary'
                  : 'text-subtle-foreground hover:text-muted-foreground',
              )}
            >
              {env === 'prod' ? 'Prod' : 'Staging'}
            </button>
          ))}
        </div>
        <span
          className="flex size-7 items-center justify-center border border-border bg-muted font-mono text-[10px] text-muted-foreground"
          aria-label="Usuária: Ana Ribeiro"
        >
          {initials('Ana Ribeiro')}
        </span>
      </div>
    </header>
  )
}
