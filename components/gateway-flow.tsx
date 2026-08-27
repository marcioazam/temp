const USE_CASES = [
  "SaaS com IA",
  "Copilotos internos",
  "APIs e automações",
  "Agentes autônomos",
  "Busca e RAG",
  "Atendimento inteligente",
]

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
        <div className="grid items-start gap-12 lg:grid-cols-[1.22fr_0.78fr] lg:gap-20">
          <div className="lg:order-2 lg:sticky lg:top-28">
            <h2 className="font-mono text-xs text-muted-foreground">
              <span aria-hidden="true" className="text-primary">{"// "}</span>endpoint
            </h2>
            <p className="mt-4 max-w-xl text-balance font-mono text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              A inteligência do Nylla dentro do seu produto.
            </p>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Conecte seu SaaS, software ou aplicativo a um único endpoint compatível com OpenAI. Você desenvolve a
              experiência. O Nylla cuida dos modelos, da disponibilidade e do roteamento de cada requisição.
            </p>

            <div className="mt-9 max-w-xl">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Feito para diferentes produtos
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-6" aria-label="Aplicações do endpoint Nylla">
                {USE_CASES.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 border-t border-border py-3 font-mono text-xs text-foreground/80"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="flex min-h-[30rem] items-center bg-cover bg-center p-5 sm:p-8 lg:p-10"
            style={{ backgroundImage: "url('/images/endpoint-landscape.png')" }}
          >
            <div className="mx-auto w-full max-w-[42rem] overflow-hidden rounded-[10px] border border-[#292929] bg-[#080806] shadow-[0_26px_60px_-18px_rgba(0,0,0,0.72),0_10px_24px_-12px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.4)]">
              <div className="relative flex h-7 items-center justify-between border-b border-[#292929] bg-[#171717] px-2.5 shadow-[inset_0_1px_rgba(255,255,255,0.035)] md:h-9 md:px-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="absolute left-1/2 -translate-x-1/2 font-sans text-[8px] font-medium tracking-[-0.01em] text-[#a0a0a0] md:text-[10px]">
                  api.nylla.ai
                </span>
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-muted-foreground"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2.5" y="4.5" width="7" height="7" stroke="currentColor" />
                  <path d="M6.5 4.5V2.5H13.5V9.5H9.5" stroke="currentColor" />
                </svg>
              </div>

            <div className="grid lg:grid-cols-[1fr_12rem]">
              <div className="overflow-hidden py-5">
                <div className="w-full font-mono text-[11px] leading-6 sm:text-xs">
                  {CODE_LINES.map((line) => (
                    <div key={line.number} className="flex min-w-0 px-4">
                      <span className="w-8 shrink-0 select-none text-muted-foreground/40">{line.number}</span>
                      <code
                        className={`whitespace-pre ${line.number === "02" ? "text-primary" : "text-foreground/80"}`}
                      >
                        {line.content}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="border-t border-border bg-background/50 p-5 lg:border-l lg:border-t-0">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">uma integração</p>
                <div className="mt-5 flex flex-col gap-5">
                  <div>
                    <p className="font-mono text-lg font-medium text-primary">1 endpoint</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">para todos os modelos</p>
                  </div>
                  <div>
                    <p className="font-mono text-lg font-medium text-primary">OpenAI</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">formato compatível</p>
                  </div>
                  <div>
                    <p className="font-mono text-lg font-medium text-primary">24/7</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">fallback automático</p>
                  </div>
                  <div>
                    <p className="whitespace-nowrap font-mono text-lg font-medium text-primary">Baixa latência</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">roteamento otimizado</p>
                  </div>
                </div>
              </aside>
            </div>

            <div className="flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-xs text-muted-foreground">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#28c840]" aria-hidden="true" />
                pronto para produção
              </p>
              <code className="font-mono text-[11px] font-medium text-foreground">POST /v1/chat/completions</code>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
