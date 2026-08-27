import { Reveal } from "@/components/reveal"

const secondary = [
  { label: "WhatsApp", href: "https://wa.me/" },
  { label: "Documentação", href: "/docs" },
]

export function ContactSection() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="mx-auto w-full max-w-screen-2xl px-4 md:px-9">
      <div className="border-t border-border/60">
        <Reveal className="flex flex-col">
          <div className="type-micro flex items-center justify-between gap-6 py-5 text-subtle-foreground">
            <h2 id="contato-title" className="flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
              <span>contato</span>
            </h2>
            <span className="hidden md:block">sota 2026</span>
            <span>gmt−3 · são paulo</span>
          </div>

          <a
            href="mailto:contato@nylla.ai"
            className="group block w-fit max-w-full py-16 md:py-24"
            aria-label="Enviar e-mail para contato@nylla.ai"
          >
            <span className="type-display block break-words text-foreground max-sm:text-[1.75rem]">
              contato@nylla.ai
            </span>
            <span
              aria-hidden="true"
              className="mt-4 block h-px origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
          </a>

          <div className="flex flex-col gap-5 border-t border-border/60 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="type-micro flex items-center gap-2 text-subtle-foreground">
              <span aria-hidden="true" className="status-pulse size-1.5 rounded-full bg-primary text-primary" />
              resposta típica em até 24h
            </p>

            <nav aria-label="Outros canais" className="flex items-center gap-7">
              {secondary.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="type-micro text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
