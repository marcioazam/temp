import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ConsentedAnalytics } from '@/components/consented-analytics'
import { CookieConsent } from '@/components/cookie-consent'
import { LanguageProvider } from '@/components/language-provider'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

// Fontes variáveis: o eixo completo de peso fica disponível (400–600),
// o que permite os pesos ópticos 450/480 usados nos títulos.
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'Nylla | LLM Gateway for Code Generation & Agents',
  description:
    'Um gateway de LLM que conecta qualquer harness, incluindo Claude Code, Codex, Cursor, VS Code, Aermes Agent e mais, a todos os modelos e ferramentas. Plug and play via npm.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`bg-background ${geist.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        {/* Casca global: mesma navbar e mesmo rodapé em todas as rotas. */}
        <LanguageProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LanguageProvider>
        <CookieConsent />
        {process.env.NODE_ENV === 'production' && <ConsentedAnalytics />}
      </body>
    </html>
  )
}
