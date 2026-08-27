import Link from "next/link"

export function FinalCta() {
  return (
    <section className="pb-8 pt-6 md:pb-10 md:pt-8" aria-labelledby="final-cta-title">
      <div
        className="mx-auto flex min-h-[520px] w-[calc(100%-2rem)] max-w-screen-2xl md:w-[calc(100%-4.5rem)] flex-col items-center justify-center gap-7 overflow-hidden rounded-xl bg-cover bg-center px-6 py-24 text-center text-[#171612] md:min-h-[680px]"
        style={{ backgroundImage: "url('/images/nylla-cta-landscape.png')" }}
      >
        <h1
          id="final-cta-title"
          className="max-w-4xl text-balance font-sans text-5xl font-normal leading-none tracking-[-0.04em] md:text-7xl"
        >
          Um gateway.
          <br />
          Todos os LLMs.
          <br />
          Qualquer harness.
        </h1>
        <Link
          href="/#planos"
          className="inline-flex items-center justify-center rounded-none bg-[#171612] px-8 py-4 font-sans text-base font-medium text-[#F4F3F1] transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171612]"
        >
          Experimente Nylla
        </Link>
      </div>
    </section>
  )
}
