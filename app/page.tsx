import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ModelMarquee } from "@/components/model-marquee"
import { GatewayFlow } from "@/components/gateway-flow"
import { Features } from "@/components/features"
import { Harnesses } from "@/components/harnesses"
import { NpmSection } from "@/components/npm-section"
import { Pricing } from "@/components/pricing"
import { FinalCta } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ModelMarquee />
        <Harnesses />
        <GatewayFlow />
        <Features />
        <NpmSection />
        <Pricing />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
