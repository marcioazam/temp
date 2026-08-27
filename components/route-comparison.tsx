"use client"

import { useEffect, useState } from "react"
import { RotorMark } from "@/components/logo"
import { Reveal } from "@/components/reveal"

const rows = [
  {
    criterion: "Configuração",
    nylla: "Harness configurado automaticamente",
    router: "Configuração manual com uma chave extra",
    direct: "Autenticação separada em cada provedor",
  },
  {
    criterion: "Catálogo",
    nylla: "Catálogo completo, sempre atualizado",
    router: "Modelos distribuídos entre múltiplas fontes",
    direct: "Somente os modelos daquele provedor",
  },
  {
    criterion: "Sua ferramenta",
    nylla: "Qualquer CLI ou IDE compatível",
    router: "A compatibilidade varia por gateway",
    direct: "SDK e ferramentas do próprio provedor",
  },
  {
    criterion: "Preço",
    nylla: "Planos fixos para código",
    router: "Créditos consumidos por token",
    direct: "Cobrança medida por token",
  },
  {
    criterion: "Limites",
    nylla: "LLMs ilimitadas + cobrança por uso",
    router: "Limites definidos pela plataforma",
    direct: "Limites por conta e por tier",
  },
]

export function RouteComparison() {
  const [activeRow, setActiveRow] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const interval = window.setInterval(() => {
      setActiveRow((current) => (current + 1) % rows.length)
    }, 2600)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section id="comparativo">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <Reveal>
          <h2 className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
            <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
            <span>comparativo</span>
          </h2>
          <p className="type-title mt-6 max-w-xl text-balance text-foreground">Compare a rota, não o hype.</p>
          <p className="type-lead mt-5 max-w-2xl text-pretty text-muted-foreground">
            A mesma ferramenta pode chegar ao mesmo modelo por caminhos muito diferentes. O que muda é tudo que existe
            entre o seu prompt e a resposta.
          </p>
        </Reveal>

        <div className="photo-grain mt-6 w-full bg-[url('/images/comparativo-landscape.png')] bg-cover bg-center py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-9">
            <Reveal>
              <div className="overflow-hidden border border-border bg-background/90 shadow-lg backdrop-blur-md">
                <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse text-left">
              <caption className="sr-only">
                Comparação entre Nylla, agregadores de modelos e APIs diretas de provedores
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th
                    scope="col"
                    className="type-eyebrow w-[16%] p-4 text-left text-subtle-foreground md:p-5"
                  >
                    Critério
                  </th>
                  <th scope="col" className="w-[28%] bg-primary/[0.05] p-4 md:p-5">
                    <span className="type-eyebrow flex items-center gap-2 text-primary">
                      <RotorMark aria-hidden="true" className="size-4 shrink-0 text-primary" />
                      <span>Nylla Gateway</span>
                    </span>
                  </th>
                  <th scope="col" className="w-[28%] p-4 md:p-5">
                    <span className="type-eyebrow text-subtle-foreground">Open Router</span>
                  </th>
                  <th scope="col" className="w-[28%] p-4 md:p-5">
                    <span className="type-eyebrow text-subtle-foreground">API Direta no LLM</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  const isActive = index === activeRow

                  return (
                    <tr key={row.criterion} className="border-b border-border last:border-b-0">
                      <th
                        scope="row"
                        className={`type-label relative p-4 text-left transition-colors duration-500 md:p-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                      >
                        <span
                          key={isActive ? `scan-${activeRow}` : undefined}
                          aria-hidden="true"
                          className={`absolute left-0 top-0 h-full w-px origin-top bg-primary/80 ${isActive ? "animate-row-scan" : "scale-y-0"}`}
                        />
                        {row.criterion}
                      </th>
                      <td
                        className={`type-body p-4 text-foreground transition-colors duration-500 md:p-5 ${isActive ? "bg-primary/[0.11]" : "bg-primary/[0.05]"}`}
                      >
                        {row.nylla}
                      </td>
                      <td className="type-body p-4 text-muted-foreground md:p-5">{row.router}</td>
                      <td className="type-body p-4 text-muted-foreground md:p-5">{row.direct}</td>
                    </tr>
                  )
                })}
                  </tbody>
                  </table>
                </div>
                <p className="type-caption border-t border-border px-4 py-3.5 text-subtle-foreground md:px-5">
                  <span aria-hidden="true" className="mr-2 text-primary">*</span>
                  Comparação estrutural. Disponibilidade de modelos e limites podem mudar conforme o provedor.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
