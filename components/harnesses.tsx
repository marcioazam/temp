import { HarnessCarousel } from "@/components/harness-carousel"
import { ModelMarquee } from "@/components/model-marquee"
import { Reveal } from "@/components/reveal"

export function Harnesses() {
  return (
    <section id="harnesses">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <h2 className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
          <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
          <span>harnesses</span>
        </h2>
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl lg:order-2">
            <p className="type-heading max-w-lg text-balance text-foreground">
              Conecte a Nylla às ferramentas que você já usa.
            </p>
            <p className="type-lead mt-6 text-pretty text-muted-foreground">
              Um único gateway reúne os melhores modelos e mantém cada agente trabalhando no editor, no terminal ou via
              SDK.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <p className="type-micro text-subtle-foreground">Exemplos de conectividade</p>
              <ModelMarquee />
            </div>
          </div>

          <Reveal delay={80} className="lg:order-1">
            <div className="photo-grain bg-[url('/images/vscode-landscape.png')] bg-cover bg-center p-5 sm:p-7 lg:p-8">
              <HarnessCarousel />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
