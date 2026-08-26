import Link from "next/link"
import { EditorMock } from "@/components/editor-mock"
import { Reveal } from "@/components/reveal"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="relative mx-auto w-full max-w-screen-2xl px-4 py-20 md:px-9 md:py-28">
        <div className="max-w-3xl">
          <Reveal>
            <h1 className="font-sans text-[2.75rem] font-medium leading-[1.02] tracking-[-0.04em] text-foreground sm:text-[3.5rem] md:text-6xl">
              Um gateway.
              <br />
              Todos os LLMs.
              <br />
              <span className="text-muted-foreground">Qualquer harness.</span>
            </h1>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 max-w-xl text-pretty font-mono text-base leading-relaxed text-muted-foreground md:text-[1.0625rem]">
              Conecte <span className="text-foreground">Claude Code, Codex, Cursor, VS Code</span> ou seu próprio agent a
              qualquer modelo com <span className="text-foreground">uma linha de comando</span>. Sem lock-in, sem
              reescrever integração. Feito para código e agents em produção.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="https://www.npmjs.com/package/nycode"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-11 items-center justify-center gap-2 border border-foreground bg-foreground px-5 font-mono text-sm text-background transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                install
                <svg
                  aria-hidden="true"
                  viewBox="0 0 12 12"
                  className="h-3 w-3 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 9L9 3M9 3H4M9 3V8" />
                </svg>
              </a>

              <Link
                href="/docs"
                className="group inline-flex h-11 items-center justify-center gap-2 border border-border px-5 font-mono text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-[0.98]"
              >
                ler docs
                <span
                  aria-hidden="true"
                  className="opacity-50 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={240} className="mt-16 md:mt-20">
          <EditorMock />
        </Reveal>
      </div>
    </section>
  )
}
