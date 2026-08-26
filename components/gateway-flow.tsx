const USE_CASES = ["SaaS com IA", "Copilotos internos", "APIs e automações"]

const CODE_LINES = [
  { number: "01", content: "const response = await fetch(" },
  { number: "02", content: '  "https://api.nylla.ai/v1/chat/completions",' },
  { number: "03", content: "  {" },
  { number: "04", content: '    method: "POST",' },
  { number: "05", content: "    headers: {" },
  { number: "06", content: '      Authorization: `Bearer ${NYLLA_API_KEY}`,' },
  { number: "07", content: '      "Content-Type": "application/json",' },
  { number: "08", content: "    }," },
  { number: "09", content: "    body: JSON.stringify({" },
  { number: "10", content: '      model: "auto",' },
  { number: "11", content: '      messages: [{ role: "user", content: prompt }],' },
  { number: "12", content: "    })," },
  { number: "13", content: "  }," },
  { number: "14", content: ")" },
]

export function GatewayFlow() {
  return (
    <section id="endpoint">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-mono text-xs text-muted-foreground">
              <span aria-hidden="true">{"// "}</span>endpoint
            </h2>
            <p className="mt-4 max-w-xl text-balance font-mono text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              A inteligência do Nylla dentro do seu produto.
            </p>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Conecte seu SaaS, software ou aplicativo a um único endpoint compatível com OpenAI. Você desenvolve a
              experiência. O Nylla cuida dos modelos, da disponibilidade e do roteamento de cada requisição.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Aplicações do endpoint Nylla">
              {USE_CASES.map((item) => (
                <li key={item} className="border border-border bg-card px-3 py-2 font-mono text-xs text-foreground/80">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-[10px] border border-border bg-card shadow-[0_1px_1px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.1),0_6px_12px_rgba(0,0,0,0.1),0_16px_32px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">api.nylla.ai</span>
            </div>

            <div className="grid lg:grid-cols-[1fr_12rem]">
              <div className="overflow-x-auto py-5">
                <div className="min-w-[34rem] font-mono text-xs leading-6">
                  {CODE_LINES.map((line) => (
                    <div key={line.number} className="flex px-4">
                      <span className="w-8 shrink-0 select-none text-muted-foreground/40">{line.number}</span>
                      <code className={line.number === "02" ? "text-primary" : "text-foreground/80"}>{line.content}</code>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="border-t border-border bg-background/50 p-5 lg:border-l lg:border-t-0">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">uma integração</p>
                <div className="mt-5 flex flex-col gap-5">
                  <div>
                    <p className="font-mono text-xl text-foreground">1 endpoint</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">para todos os modelos</p>
                  </div>
                  <div>
                    <p className="font-mono text-xl text-foreground">OpenAI</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">formato compatível</p>
                  </div>
                  <div>
                    <p className="font-mono text-xl text-foreground">24/7</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">fallback automático</p>
                  </div>
                </div>
              </aside>
            </div>

            <div className="flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-xs text-muted-foreground">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#7f9b76]" aria-hidden="true" />
                pronto para produção
              </p>
              <code className="font-mono text-xs text-foreground/70">POST /v1/chat/completions</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
