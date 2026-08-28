'use client'

import { CONSENT_OPEN_EVENT } from '@/lib/consent'

/** Acesso permanente às preferências — revogação simples exigida pela LGPD (art. 8º, §5º). */
export function CookiePreferencesButton({
  className,
  label = 'Preferências de cookies',
}: {
  className?: string
  /** Rótulo curto em contextos densos, como a linha legal do rodapé. */
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT))}
      className={className}
    >
      {label}
    </button>
  )
}
