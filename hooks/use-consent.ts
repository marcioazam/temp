'use client'

import { useEffect, useState } from 'react'
import {
  CONSENT_EVENT,
  readConsent,
  type ConsentCategory,
  type ConsentRecord,
} from '@/lib/consent'

/** Registro atual de consentimento, sincronizado entre componentes e abas. */
export function useConsent() {
  const [record, setRecord] = useState<ConsentRecord | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setRecord(readConsent())
    setReady(true)

    const onChange = (event: Event) => {
      setRecord((event as CustomEvent<ConsentRecord | null>).detail ?? null)
    }
    const onStorage = () => setRecord(readConsent())

    window.addEventListener(CONSENT_EVENT, onChange)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(CONSENT_EVENT, onChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return { record, ready }
}

/**
 * `true` somente quando existe consentimento explícito para a finalidade.
 * Use para condicionar qualquer script não essencial.
 */
export function useConsentGate(category: ConsentCategory) {
  const { record } = useConsent()
  return record?.choices[category] === true
}
