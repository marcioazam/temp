import { HarnessCarousel } from "@/components/harness-carousel"
import { ModelMarquee } from "@/components/model-marquee"
import { Reveal } from "@/components/reveal"

export function Harnesses() {
  return (
    <section id="harnesses">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <h2 className="font-mono text-xs text-muted-foreground">
          <span aria-hidden="true" className="text-primary">{"// "}</span>harnesses
        </h2>
        <div className="mt-4 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl lg:order-2">
            <p className="text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              Conecta em qualquer ferramenta que você já usa.
            </p>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              Conecte o Nylla às ferramentas que já fazem parte do seu fluxo. Um único gateway reúne os melhores
              modelos e mantém cada agente trabalhando no editor, no terminal ou via SDK.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <p className="font-mono text-sm text-foreground">Exemplos de conectividade:</p>
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
