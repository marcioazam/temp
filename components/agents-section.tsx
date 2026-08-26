import { Reveal } from "@/components/reveal"
import { AgentBoardMock } from "@/components/agent-board-mock"

export function AgentsSection() {
  return (
    <section id="agents" className="border-b border-border">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <Reveal>
          <h2 className="font-mono text-xs text-muted-foreground">
            <span aria-hidden="true">{"// "}</span>agents
          </h2>
          <p className="mt-4 max-w-2xl text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            Um command center para todos os seus agents.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Despache tarefas, acompanhe sessões e revise diffs de qualquer harness conectado ao gateway. Você decide o
            que construir — os agents escrevem, testam e abrem o PR.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-10">
          <AgentBoardMock />
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
          {[
            { k: "sessões paralelas", v: "ilimitadas" },
            { k: "harnesses simultâneos", v: "12" },
            { k: "handoff entre modelos", v: "automático" },
          ].map((stat, i) => (
            <Reveal key={stat.k} delay={i * 90} className="bg-background px-5 py-4">
              <p className="font-mono text-sm text-foreground">{stat.v}</p>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">{stat.k}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
