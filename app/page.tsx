import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { GatewayFlow } from "@/components/gateway-flow"
import { RouteComparison } from "@/components/route-comparison"
import { Features } from "@/components/features"
import { Harnesses } from "@/components/harnesses"
import { NpmSection } from "@/components/npm-section"
import { Pricing } from "@/components/pricing"
import { FaqSection } from "@/components/faq-section"
import { FinalCta } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"
import { LanguageProvider } from "@/components/language-provider"

export default function Page() {
  return (
    <LanguageProvider>
      <SiteHeader />
      <main>
        <FinalCta />
        <Hero />
        <Harnesses />
        <NpmSection />
        <GatewayFlow />
        <Features />
        <RouteComparison />
        <Pricing />
        <FaqSection />
      </main>
      <SiteFooter />
    </LanguageProvider>
  )
}
