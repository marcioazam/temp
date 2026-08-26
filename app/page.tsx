import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ModelMarquee } from "@/components/model-marquee"
import { AgentsSection } from "@/components/agents-section"
import { GatewayFlow } from "@/components/gateway-flow"
import { Features } from "@/components/features"
import { Harnesses } from "@/components/harnesses"
import { NpmSection } from "@/components/npm-section"
import { Pricing } from "@/components/pricing"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ModelMarquee />
        <AgentsSection />
        <Harnesses />
        <GatewayFlow />
        <Features />
        <NpmSection />
        <Pricing />
      </main>
      <SiteFooter />
    </>
  )
}
