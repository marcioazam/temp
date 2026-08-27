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
      <div className="grid border-y border-border/60 py-16 md:py-24 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20 lg:py-28">
        <Reveal className="flex flex-col lg:min-h-[25rem]">
          <h2 id="contato-title" className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
            <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
            <span>contato</span>
          </h2>
          <p className="type-title mt-8 max-w-md text-balance text-foreground">Vamos conversar.</p>
          <p className="type-lead mt-6 max-w-sm text-pretty text-muted-foreground">
            Conte o que você está construindo. Resposta direta, sem camadas, até o caminho mais curto para o
            primeiro token.
          </p>
          <p className="type-micro mt-10 flex items-center gap-2 text-subtle-foreground lg:mt-auto">
            <span aria-hidden="true" className="status-pulse size-1.5 rounded-full bg-primary text-primary" />
            SOTA 2026 · resposta típica em até 24h
          </p>
        </Reveal>

        <Reveal className="mt-14 lg:mt-0">
          <ul className="border-t border-border/60">
            {channels.map((channel, index) => (
              <li key={channel.label} className="border-b border-border/60">
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group grid grid-cols-[2rem_1fr_auto] items-center gap-4 py-7 transition-colors md:grid-cols-[2.5rem_1fr_auto_auto] md:gap-7"
                >
                  <span className="type-micro self-start pt-1 text-subtle-foreground transition-colors group-hover:text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="type-subheading block text-foreground transition-colors group-hover:text-primary">
                      {channel.label}
                    </span>
                    <span className="type-caption mt-1.5 block text-muted-foreground">{channel.hint}</span>
                    <span className="type-label mt-3 block text-subtle-foreground md:hidden">{channel.value}</span>
                  </span>
                  <span className="type-label hidden shrink-0 text-subtle-foreground transition-colors group-hover:text-foreground md:block">
                    {channel.value}
                  </span>
                  <span className="grid size-8 place-items-center border border-border/60 transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
