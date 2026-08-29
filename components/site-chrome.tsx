'use client'

import { usePathname } from 'next/navigation'
import { CookieConsent } from '@/components/cookie-consent'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStatusPage = pathname === '/status' || pathname.startsWith('/status/')
  const isPainelPage = pathname === '/painel' || pathname.startsWith('/painel/')

  if (isStatusPage || isPainelPage) {
    return children
  }

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <CookieConsent />
    </>
  )
}
