import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/reveal"

const channels = [
  {
    label: "E-mail",
    value: "contato@nylla.ai",
    hint: "Comercial, suporte e parcerias",
    href: "mailto:contato@nylla.ai",
  },
  {
    label: "WhatsApp",
    value: "Falar agora",
    hint: "Resposta em horário comercial",
    href: "https://wa.me/",
  },
  {
    label: "Documentação",
    value: "/docs",
    hint: "Guias, referência e exemplos",
    href: "/docs",
  },
]

export function ContactSection() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="mx-auto w-full max-w-screen-2xl px-4 md:px-9"
    >
      <div className="grid border-t border-border/60 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <Reveal>
          <h2 id="contato-title" className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
            <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
            <span>contato</span>
          </h2>
          <p className="type-title mt-6 max-w-md text-balance text-foreground">Vamos conversar.</p>
          <p className="type-lead mt-5 max-w-sm text-pretty text-muted-foreground">
            Time enxuto, resposta direta. Conte o que você está construindo e escolhemos juntos o caminho mais
            curto até o primeiro token.
          </p>
          <p className="type-micro mt-8 flex items-center gap-2 text-subtle-foreground">
            <span aria-hidden="true" className="status-pulse size-1.5 rounded-full bg-primary text-primary" />
            Sota 2026 — resposta típica em até 24h
          </p>
        </Reveal>

        <Reveal className="mt-12 lg:mt-1.5">
          <ul className="border-y border-border/60">
            {channels.map((channel, index) => (
              <li key={channel.label} className="border-b border-border/60 last:border-b-0">
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-baseline gap-4 py-6 transition-colors md:gap-8"
                >
                  <span className="type-micro w-6 shrink-0 text-subtle-foreground transition-colors group-hover:text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="type-subheading block text-foreground transition-colors group-hover:text-primary">
                      {channel.label}
                    </span>
                    <span className="type-caption mt-1 block text-muted-foreground">{channel.hint}</span>
                  </span>
                  <span className="type-label hidden shrink-0 text-subtle-foreground transition-colors group-hover:text-foreground md:block">
                    {channel.value}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 self-center text-subtle-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    strokeWidth={1.5}
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
