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
    nylla: "Cotas previsíveis por plano",
    router: "Limites definidos pela plataforma",
    direct: "Limites por conta e por tier",
  },
]

function NyllaMark() {
  return (
    <span
      aria-hidden="true"
      className="grid size-9 place-items-center border border-ultra/50 bg-ultra font-mono text-sm font-semibold text-primary-foreground"
    >
      n.
    </span>
  )
}

function RouteMark({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-9 place-items-center border border-border bg-muted font-mono text-[10px] font-semibold text-muted-foreground"
    >
      {children}
    </span>
  )
}

export function RouteComparison() {
  return (
    <section id="rotas" className="border-y border-border bg-card/30">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <Reveal>
          <div className="h-px w-10 bg-ultra" aria-hidden="true" />
          <h2 className="mt-5 max-w-4xl text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-4xl">
            Compare a rota, não o hype.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            A mesma ferramenta pode chegar ao mesmo modelo por caminhos muito diferentes. O que muda é tudo que existe
            entre o seu prompt e a resposta.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="overflow-x-auto border border-border bg-background/60">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <caption className="sr-only">
                Comparação entre Nylla, agregadores de modelos e APIs diretas de provedores
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="w-[15%] p-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:p-5">
                    critério
                  </th>
                  <th scope="col" className="w-[28%] bg-ultra/[0.04] p-4 align-top md:p-5">
                    <div className="flex items-center gap-3">
                      <NyllaMark />
                      <div>
                        <span className="block font-mono text-sm font-semibold text-foreground">nylla.</span>
                        <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-ultra">gateway</span>
                      </div>
                    </div>
                  </th>
                  <th scope="col" className="w-[28%] p-4 align-top md:p-5">
                    <div className="flex items-center gap-3">
                      <RouteMark>↗</RouteMark>
                      <div>
                        <span className="block font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Agregador</span>
                        <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/60">multi-provider</span>
                      </div>
                    </div>
                  </th>
                  <th scope="col" className="w-[29%] p-4 align-top md:p-5">
                    <div className="flex items-center gap-3">
                      <RouteMark>API</RouteMark>
                      <div>
                        <span className="block font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">API direta</span>
                        <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/60">um provedor</span>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.criterion} className="border-b border-border last:border-b-0">
                    <th scope="row" className="p-4 font-mono text-xs font-medium text-foreground md:p-5">
                      {row.criterion}
                    </th>
                    <td className="bg-ultra/[0.04] p-4 text-sm leading-relaxed text-foreground md:p-5">
                      <span className="mr-2 inline-block size-1.5 bg-ultra" aria-hidden="true" />
                      {row.nylla}
                    </td>
                    <td className="p-4 text-sm leading-relaxed text-muted-foreground md:p-5">{row.router}</td>
                    <td className="p-4 text-sm leading-relaxed text-muted-foreground md:p-5">{row.direct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-foreground/70">
            Comparação estrutural. Disponibilidade de modelos e limites podem mudar conforme o provedor.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
