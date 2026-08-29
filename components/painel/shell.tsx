'use client'

import { useEffect, useState } from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { PainelProvider } from '@/lib/painel/store'
import { CommandPalette } from './command-palette'
import { PainelSidebar } from './sidebar'
import { PainelTopbar } from './topbar'

const COLLAPSE_KEY = 'nylla-painel-sidebar'

export function PainelShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem(COLLAPSE_KEY) === '1')
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

  function toggleCollapsed() {
    setCollapsed((c) => {
      try {
        window.localStorage.setItem(COLLAPSE_KEY, c ? '0' : '1')
      } catch {
        // ignore
      }
      return !c
    })
  }

  return (
    <PainelProvider>
      <div className="flex h-dvh overflow-hidden bg-background text-foreground">
        <div className="hidden md:block">
          <PainelSidebar collapsed={collapsed} onToggle={toggleCollapsed} />
        </div>

        <BaseDialog.Root open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <BaseDialog.Portal>
            <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-black/60 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 md:hidden" />
            <BaseDialog.Popup className="fixed inset-y-0 left-0 z-50 transition-transform data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full md:hidden">
              <BaseDialog.Title className="sr-only">Menu de navegação</BaseDialog.Title>
              <PainelSidebar
                collapsed={false}
                onToggle={() => setMobileNavOpen(false)}
                onNavigate={() => setMobileNavOpen(false)}
              />
            </BaseDialog.Popup>
          </BaseDialog.Portal>
        </BaseDialog.Root>

        <div className="flex min-w-0 flex-1 flex-col">
          <PainelTopbar
            onOpenPalette={() => setPaletteOpen(true)}
            onOpenMobileNav={() => setMobileNavOpen(true)}
          />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6">
              {children}
              <footer className="mt-4 flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-subtle-foreground">
                <span>© 2026 Nylla AI</span>
                <a href="/docs" className="transition-colors hover:text-muted-foreground">Docs</a>
              </footer>
            </div>
          </main>
        </div>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </PainelProvider>
  )
}
