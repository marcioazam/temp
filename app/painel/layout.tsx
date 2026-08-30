import type { Metadata } from 'next'
import { PainelShell } from '@/components/painel/shell'

export const metadata: Metadata = {
  title: 'Painel · Nylla AI',
  description: 'Console do cliente Nylla : gerencie provedores, modelos, chaves de API, custos e equipe do seu gateway de LLM.',
}

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return <PainelShell>{children}</PainelShell>
}
