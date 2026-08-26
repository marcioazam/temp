import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { GatewayFlow } from "@/components/gateway-flow"
import { Features } from "@/components/features"
import { Harnesses } from "@/components/harnesses"
import { NpmSection } from "@/components/npm-section"
import { CatalogSection } from "@/components/catalog-section"
import { Pricing } from "@/components/pricing"
import { FaqSection } from "@/components/faq-section"
import { FinalCta } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Harnesses />
        <GatewayFlow />
        <NpmSection />
        <Features />
        <CatalogSection />
        <Pricing />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
