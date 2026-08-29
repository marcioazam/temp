'use client'

import { useEffect, useState } from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { PanelLeft, Search } from 'lucide-react'
import { PainelProvider } from '@/lib/painel/store'
import { CommandPalette } from './command-palette'
import { PainelSidebar } from './sidebar'

const COLLAPSE_KEY = 'nylla-painel-sidebar'

export function PainelShell({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    try {
      setHidden(window.localStorage.getItem(COLLAPSE_KEY) === '1')
    } catch {
      // storage indisponível
    }
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function setSidebarHidden(next: boolean) {
    setHidden(next)
    try {
      window.localStorage.setItem(COLLAPSE_KEY, next ? '1' : '0')
    } catch {
      // ignore
    }
  }

  return (
    <PainelProvider>
      <div className="flex h-dvh overflow-hidden bg-background text-foreground">
        {!hidden && (
          <div className="hidden shrink-0 md:block">
            <PainelSidebar
              onHide={() => setSidebarHidden(true)}
              onOpenPalette={() => setPaletteOpen(true)}
            />
          </div>
        )}

        <BaseDialog.Root open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <BaseDialog.Portal>
            <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-black/60 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 md:hidden" />
            <BaseDialog.Popup className="fixed inset-y-0 left-0 z-50 transition-transform data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full md:hidden">
              <BaseDialog.Title className="sr-only">Menu de navegação</BaseDialog.Title>
              <PainelSidebar
                onHide={() => setMobileNavOpen(false)}
                onOpenPalette={() => {
                  setMobileNavOpen(false)
                  setPaletteOpen(true)
                }}
                onNavigate={() => setMobileNavOpen(false)}
              />
            </BaseDialog.Popup>
          </BaseDialog.Portal>
        </BaseDialog.Root>

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6">
              {children}
              <footer className="mt-auto flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-subtle-foreground">
                <span>© 2026 Nylla AI</span>
                <a href="/docs" className="transition-colors hover:text-muted-foreground">Docs</a>
              </footer>
            </div>
          </main>
        </div>
      </div>

      <div className="fixed left-3 top-3 z-40 flex items-center gap-1">
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="flex size-7 items-center justify-center border-0 bg-transparent text-subtle-foreground shadow-none outline-none transition-colors hover:text-foreground focus-visible:text-foreground md:hidden"
          aria-label="Buscar no painel"
        >
          <Search className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="flex size-7 items-center justify-center border-0 bg-transparent text-subtle-foreground shadow-none outline-none transition-colors hover:text-foreground focus-visible:text-foreground md:hidden"
          aria-label="Abrir menu de navegação"
        >
          <PanelLeft className="size-4" />
        </button>

        {hidden && (
          <>
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden size-7 items-center justify-center border-0 bg-transparent text-subtle-foreground shadow-none outline-none transition-colors hover:text-foreground focus-visible:text-foreground md:flex"
              aria-label="Buscar no painel (⌘K)"
              title="Buscar  ⌘K"
            >
              <Search className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setSidebarHidden(false)}
              className="hidden size-7 items-center justify-center border-0 bg-transparent text-subtle-foreground shadow-none outline-none transition-colors hover:text-foreground focus-visible:text-foreground md:flex"
              aria-label="Mostrar menu lateral"
              title="Mostrar menu lateral"
            >
              <PanelLeft className="size-4" />
            </button>
          </>
        )}
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </PainelProvider>
  )
}
