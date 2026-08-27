import { Reveal } from "@/components/reveal"

const channels = [
  {
    label: "E-mail",
    value: "contato@nylla.ai",
    href: "mailto:contato@nylla.ai",
  },
  {
    label: "WhatsApp",
    value: "Falar agora",
    href: "https://wa.me/",
  },
  {
    label: "Documentação",
    value: "/docs",
    href: "/docs",
  },
]

export function ContactSection() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="mx-auto w-full max-w-screen-2xl px-4 md:px-9">
      <div className="border-t border-border/60 py-24 md:py-32">
        <Reveal className="mx-auto flex w-full max-w-2xl flex-col items-center">
          <h2 id="contato-title" className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
            <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
            <span>contato</span>
          </h2>

          <p className="type-title mt-8 text-balance text-center text-foreground">Vamos conversar.</p>

          <ul className="mt-14 w-full">
            {channels.map((channel) => (
              <li key={channel.label} className="border-b border-border/60 first:border-t">
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-baseline justify-between gap-6 py-5"
                >
                  <span className="type-label text-sm text-foreground transition-colors duration-300 group-hover:text-primary">
                    {channel.label}
                  </span>
                  <span className="type-micro truncate text-subtle-foreground transition-colors duration-300 group-hover:text-foreground">
                    {channel.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="type-micro mt-12 flex items-center gap-2 text-subtle-foreground">
            <span aria-hidden="true" className="status-pulse size-1.5 rounded-full bg-primary text-primary" />
            resposta típica em até 24h
          </p>
        </Reveal>
      </div>
    </section>
  )
}
