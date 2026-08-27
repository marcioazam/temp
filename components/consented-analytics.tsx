'use client'

import { Analytics } from '@vercel/analytics/next'
import { useConsentGate } from '@/hooks/use-consent'

/** Nenhuma medição é carregada antes do consentimento para a finalidade "Análise". */
export function ConsentedAnalytics() {
  const allowed = useConsentGate('analytics')
  if (!allowed) return null
  return <Analytics />
}
