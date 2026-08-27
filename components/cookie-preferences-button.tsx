'use client'

import { CONSENT_OPEN_EVENT } from '@/lib/consent'

/** Acesso permanente às preferências — revogação simples exigida pela LGPD (art. 8º, §5º). */
export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT))}
      className={className}
    >
      Preferências de cookies
    </button>
  )
}
