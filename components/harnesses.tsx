import { CommandPaletteMock } from "@/components/command-palette-mock"
import { ModelMarquee } from "@/components/model-marquee"
import { Reveal } from "@/components/reveal"

export function Harnesses() {
  return (
    <section id="harnesses">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <h2 className="font-mono text-xs text-muted-foreground">
          <span aria-hidden="true" className="text-primary">{"// "}</span>harnesses
        </h2>
        <div className="relative isolate mt-4 grid items-start gap-10 overflow-hidden bg-[url('/images/vscode-landscape.png')] bg-cover bg-center p-5 sm:p-7 lg:grid-cols-2 lg:gap-16 lg:p-8">
          <div className="max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-5 shadow-[0_26px_60px_-18px_rgba(0,0,0,0.72),0_10px_24px_-12px_rgba(0,0,0,0.5),inset_0_1px_rgba(255,255,255,0.22),inset_0_-1px_rgba(255,255,255,0.05)] backdrop-blur-2xl backdrop-saturate-150 sm:p-6">
            <p className="text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              Conecta em qualquer ferramenta que você já usa.
            </p>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              Conecte o Nylla às ferramentas que já fazem parte do seu fluxo. Um único gateway reúne os melhores
              modelos, aplica fallback automático e mantém cada agente trabalhando sem interrupções no editor, no
              terminal ou via SDK.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <ModelMarquee />
            </div>
          </div>

          <Reveal delay={80}>
            <CommandPaletteMock />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
