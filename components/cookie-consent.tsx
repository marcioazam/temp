'use client'

import Link from 'next/link'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  CONSENT_CATEGORIES,
  CONSENT_OPEN_EVENT,
  DEFAULT_CHOICES,
  createRecord,
  readConsent,
  writeConsent,
  type ConsentCategory,
  type ConsentChoices,
} from '@/lib/consent'

/** Distância mínima de rolagem antes do aviso aparecer. */
const SCROLL_THRESHOLD = 48

function Switch({
  checked,
  disabled,
  label,
  describedBy,
  onChange,
}: {
  checked: boolean
  disabled?: boolean
  label: string
  describedBy: string
  onChange: (next: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-describedby={describedBy}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="group relative mt-0.5 flex h-4 w-8 flex-none items-center border border-border bg-secondary transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-popover disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none aria-checked:border-primary/70 aria-checked:bg-primary/20"
    >
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 translate-x-[3px] bg-muted-foreground transition-[transform,background-color] duration-200 group-aria-checked:translate-x-[15px] group-aria-checked:bg-primary motion-reduce:transition-none"
      />
    </button>
  )
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [choices, setChoices] = useState<ConsentChoices>(DEFAULT_CHOICES)
  const panelRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const decided = useRef(false)
  const titleId = useId()
  const descriptionId = useId()

  const open = useCallback((withDetails: boolean, focus: boolean) => {
    setChoices(readConsent()?.choices ?? DEFAULT_CHOICES)
    setShowDetails(withDetails)
    setVisible(true)
    if (focus) {
      requestAnimationFrame(() => panelRef.current?.focus())
    }
  }, [])

  // Revogação/reabertura a partir de qualquer lugar do site.
  useEffect(() => {
    const onOpen = () => {
      decided.current = false
      open(true, true)
    }
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen)
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen)
  }, [open])

  // Gatilho: primeira rolagem da página.
  useEffect(() => {
    if (readConsent()) {
      decided.current = true
      return
    }

    let released = false
    const reveal = () => {
      if (released || decided.current) return
      released = true
      window.removeEventListener('scroll', onScroll)
      open(false, false)
    }
    // Qualquer primeiro gesto de rolagem revela o aviso, mesmo quando a página
    // começa abaixo do topo ou o usuário rola menos de 48 px.
    const onScroll = () => reveal()

    window.addEventListener('scroll', onScroll, { passive: true })
    if (window.scrollY > 0) reveal()

    // Página sem rolagem (ou navegação por teclado): o aviso ainda precisa
    // ficar disponível, senão a escolha nunca é oferecida.
    const scrollable =
      document.documentElement.scrollHeight > window.innerHeight + SCROLL_THRESHOLD
    const fallback = scrollable ? undefined : window.setTimeout(reveal, 1500)

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (fallback) window.clearTimeout(fallback)
    }
  }, [open])

  // Entrada suave só depois de montado, para não causar deslocamento de layout.
  useEffect(() => {
    if (!visible) {
      setEntered(false)
      return
    }
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [visible])

  useEffect(() => {
    if (showDetails) requestAnimationFrame(() => detailsRef.current?.focus())
  }, [showDetails])

  const save = (method: 'accept-all' | 'reject-all' | 'custom', next: ConsentChoices) => {
    decided.current = true
    writeConsent(createRecord(method, next))
    setEntered(false)
    window.setTimeout(() => {
      setVisible(false)
      setShowDetails(false)
    }, 220)
  }

  const toggle = (id: ConsentCategory, next: boolean) => {
    setChoices((current) => ({ ...current, [id]: next, necessary: true }))
  }

  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex"
      data-no-translate
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onKeyDown={(event) => {
          // Esc recolhe as preferências, mas nunca vale como aceite.
          if (event.key === 'Escape' && showDetails) {
            event.stopPropagation()
            setShowDetails(false)
            panelRef.current?.focus()
          }
        }}
        data-entered={entered}
        className="pointer-events-auto w-full border-t border-border bg-popover/95 backdrop-blur-xl opacity-0 transition-[opacity,transform] duration-300 ease-out outline-none translate-y-3 data-[entered=true]:translate-y-0 data-[entered=true]:opacity-100 motion-reduce:transition-none"
      >
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col px-4 py-4 md:px-9 md:py-5">
          {showDetails && (
            <div
              ref={detailsRef}
              tabIndex={-1}
              className="mb-4 grid gap-x-10 gap-y-4 border-b border-border pb-4 outline-none md:grid-cols-3"
            >
              {CONSENT_CATEGORIES.map((category) => {
                const describedBy = `${titleId}-${category.id}`
                return (
                  <div key={category.id} className="flex items-start gap-3">
                    <Switch
                      checked={category.required ? true : choices[category.id]}
                      disabled={category.required}
                      label={category.label}
                      describedBy={describedBy}
                      onChange={(next) => toggle(category.id, next)}
                    />
                    <div className="min-w-0">
                      <p className="type-label text-foreground">
                        {category.label}
                        {category.required && (
                          <span className="type-micro ml-2 text-subtle-foreground">
                            sempre ativo
                          </span>
                        )}
                      </p>
                      <p id={describedBy} className="type-caption mt-0.5 text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="min-w-0 md:max-w-2xl">
              <p className="type-micro text-primary">
                Cookies
              </p>
              <h2 id={titleId} className="type-label mt-2 text-foreground">
                Você escolhe o que guardamos
              </h2>
              <p id={descriptionId} className="type-caption mt-1 text-pretty text-muted-foreground">
                Necessários mantêm o site em pé. Análise e marketing só rodam se você
                autorizar.{' '}
                <Link
                  href="/privacidade"
                  className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
                >
                  Aviso de privacidade
                </Link>
              </p>
            </div>

            {/* Recusar e aceitar têm o mesmo peso visual: nada de dark pattern. */}
            <div className="flex flex-none items-center gap-2">
              <button
                type="button"
                aria-expanded={showDetails}
                onClick={() => setShowDetails((current) => !current)}
                className="type-micro mr-1 hidden text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/70 motion-reduce:transition-none sm:inline-flex"
              >
                {showDetails ? 'Ocultar' : 'Personalizar'}
              </button>
              <button
                type="button"
                onClick={() => save('reject-all', DEFAULT_CHOICES)}
                className="type-label h-9 flex-1 border border-border bg-transparent px-5 text-foreground transition-colors duration-200 outline-none hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring/70 motion-reduce:transition-none sm:flex-none"
              >
                Recusar
              </button>
              {showDetails ? (
                <button
                  type="button"
                  onClick={() => save('custom', choices)}
                  className="type-label h-9 flex-1 border border-primary/70 bg-primary/15 px-5 text-primary transition-colors duration-200 outline-none hover:bg-primary/25 focus-visible:ring-2 focus-visible:ring-ring/70 motion-reduce:transition-none sm:flex-none"
                >
                  Salvar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    save('accept-all', { necessary: true, analytics: true, marketing: true })
                  }
                  className="type-label h-9 flex-1 border border-primary/70 bg-primary/15 px-5 text-primary transition-colors duration-200 outline-none hover:bg-primary/25 focus-visible:ring-2 focus-visible:ring-ring/70 motion-reduce:transition-none sm:flex-none"
                >
                  Aceitar
                </button>
              )}
            </div>

            <button
              type="button"
              aria-expanded={showDetails}
              onClick={() => setShowDetails((current) => !current)}
              className="type-micro self-start text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/70 motion-reduce:transition-none sm:hidden"
            >
              {showDetails ? 'Ocultar detalhes' : 'Personalizar'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
