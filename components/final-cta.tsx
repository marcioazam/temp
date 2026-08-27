import Link from "next/link"

export function FinalCta() {
  return (
    <section className="pb-8 pt-6 md:pb-10 md:pt-8" aria-labelledby="final-cta-title">
      <div
        className="photo-grain mx-auto flex min-h-[520px] w-[calc(100%-2rem)] max-w-[1464px] flex-col items-center justify-center gap-10 overflow-hidden rounded-xl bg-cover bg-center px-6 py-24 text-center text-canvas-ink md:h-[calc(100svh-8.5rem)] md:min-h-[560px] md:max-h-[720px] md:w-[calc(100%-4.5rem)]"
        style={{ backgroundImage: "url('/images/nylla-cta-landscape.png')" }}
      >
        <h1 id="final-cta-title" className="type-display max-w-4xl text-balance">
          Um gateway.
          <br />
          Todos os LLMs.
          <br />
          Qualquer harness.
        </h1>
        <Link
          href="/#planos"
          className="type-micro inline-flex items-center justify-center rounded-none bg-canvas-ink px-8 py-4 text-canvas-paper transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-canvas-ink"
        >
          Experimente Nylla
        </Link>
      </div>
    </section>
  )
}
