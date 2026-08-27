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

export function RouteComparison() {
  return (
    <section
      id="comparativo"
      className="relative isolate overflow-hidden bg-[url('/images/comparativo-landscape.png')] bg-cover bg-center"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-background/75" />
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <Reveal>
          <h2 className="font-mono text-xs text-muted-foreground">
            <span aria-hidden="true" className="text-primary">{"// "}</span>comparativo
          </h2>
          <p className="mt-4 max-w-xl text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            Compare a rota, não o hype.
          </p>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            A mesma ferramenta pode chegar ao mesmo modelo por caminhos muito diferentes. O que muda é tudo que existe
            entre o seu prompt e a resposta.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="overflow-x-auto border border-border bg-background/90 backdrop-blur-sm">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <caption className="sr-only">
                Comparação entre Nylla, agregadores de modelos e APIs diretas de provedores
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th
                    scope="col"
                    className="w-[16%] p-4 font-mono text-xs font-medium text-muted-foreground md:p-5"
                  >
                    Critério
                  </th>
                  <th scope="col" className="w-[28%] bg-primary/[0.05] p-4 md:p-5">
                    <span className="font-mono text-xs font-medium text-foreground">
                      <span aria-hidden="true" className="text-primary">{"// "}</span>nylla gateway
                    </span>
                  </th>
                  <th scope="col" className="w-[28%] p-4 md:p-5">
                    <span className="font-mono text-xs font-medium text-muted-foreground">agregador</span>
                  </th>
                  <th scope="col" className="w-[28%] p-4 md:p-5">
                    <span className="font-mono text-xs font-medium text-muted-foreground">api direta</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.criterion} className="border-b border-border last:border-b-0">
                    <th scope="row" className="p-4 font-mono text-xs font-medium text-muted-foreground md:p-5">
                      {row.criterion}
                    </th>
                    <td className="bg-primary/[0.05] p-4 text-sm leading-relaxed text-foreground md:p-5">
                      {row.nylla}
                    </td>
                    <td className="p-4 text-sm leading-relaxed text-muted-foreground md:p-5">{row.router}</td>
                    <td className="p-4 text-sm leading-relaxed text-muted-foreground md:p-5">{row.direct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-xs text-muted-foreground/70">
            Comparação estrutural. Disponibilidade de modelos e limites podem mudar conforme o provedor.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
