import Link from "next/link"

import { CommandPaletteMock } from "@/components/command-palette-mock"
import { Reveal } from "@/components/reveal"

export function Harnesses() {
  return (
    <section id="harnesses">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <h2 className="font-mono text-xs text-muted-foreground">
          <span aria-hidden="true">{"// "}</span>harnesses
        </h2>
        <div className="mt-4 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <p className="text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              Conecta em qualquer ferramenta que você já usa.
            </p>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              Conecte o Nylla às ferramentas que já fazem parte do seu fluxo. Um único gateway reúne os melhores
              modelos, aplica fallback automático e mantém cada agente trabalhando sem interrupções no editor, no
              terminal ou via SDK.
            </p>
            <Link
              href="#planos"
              className="mt-8 inline-flex items-center justify-center bg-[#F4F3F1] px-5 py-2.5 font-mono text-sm font-medium text-[#090909] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F3F1] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Assinar
            </Link>
          </div>

          <Reveal delay={80}>
            <div className="bg-[url('/images/vscode-landscape.png')] bg-cover bg-center p-5 sm:p-7 lg:p-8">
              <CommandPaletteMock />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
