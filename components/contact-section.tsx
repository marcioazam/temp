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
      <div className="grid w-full lg:grid-cols-[minmax(15rem,0.6fr)_minmax(0,1.4fr)]">
        <div
          className="relative z-[1] px-4 py-16 md:px-9 md:py-24 lg:pr-12"
          style={{
            backgroundColor: "var(--background)",
            backgroundImage: "none",
            backgroundBlendMode: "normal",
            animation: "none",
          }}
        >
          <Reveal className="flex h-full flex-col lg:sticky lg:top-24">
            <h2 id="contato-title" className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
              <span>contato</span>
            </h2>
            <p className="type-title mt-6 max-w-xl text-balance text-foreground">Vamos conversar.</p>
            <p className="type-lead mt-5 max-w-sm text-pretty text-muted-foreground">
              Conte o que você está construindo. Resposta direta até o primeiro token.
            </p>
            <p className="type-micro mt-8 flex items-center gap-2 text-subtle-foreground">
              <span aria-hidden="true" className="status-pulse size-1.5 rounded-full bg-primary text-primary" />
              resposta típica em até 24h
            </p>
          </Reveal>
        </div>

        <div className="bg-[url('/images/mist-lake.png')] bg-cover bg-center px-4 py-16 md:px-9 md:py-24">
          <Reveal>
            <ul className="divide-y divide-border/60 border border-border/60 bg-background/85 backdrop-blur-md">
              {channels.map((channel, index) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group grid grid-cols-[2rem_1fr_auto] items-center gap-4 px-4 py-6 md:grid-cols-[2.5rem_1fr_auto_auto] md:gap-7 md:px-6"
                  >
                    <span className="type-micro self-start pt-1 text-subtle-foreground transition-colors group-hover:text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="type-label block text-sm text-foreground transition-colors duration-300 group-hover:text-primary">
                        {channel.label}
                      </span>
                      <span className="type-caption mt-1 block text-muted-foreground">{channel.hint}</span>
                      <span className="type-micro mt-2.5 block text-subtle-foreground md:hidden">
                        {channel.value}
                      </span>
                    </span>
                    <span className="type-micro hidden shrink-0 text-subtle-foreground transition-colors group-hover:text-foreground md:block">
                      {channel.value}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-subtle-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      strokeWidth={1.5}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
