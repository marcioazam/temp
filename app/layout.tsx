import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fira_Code, Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' })

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
      className={`bg-background ${geist.variable} ${geistMono.variable} ${inter.variable} ${firaCode.variable}`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
