import Link from "next/link"

export function FinalCta() {
  return (
    <section className="px-4 py-16 md:px-9 md:py-24" aria-labelledby="final-cta-title">
      <div
        className="mx-auto flex min-h-[420px] w-full max-w-screen-2xl flex-col items-center justify-center gap-7 overflow-hidden rounded-xl bg-cover bg-center px-6 py-20 text-center text-[#171612] md:min-h-[520px]"
        style={{ backgroundImage: "url('/images/nylla-cta-landscape.png')" }}
      >
        <h2
          id="final-cta-title"
          className="max-w-4xl text-balance font-sans text-5xl font-normal leading-none tracking-[-0.04em] md:text-7xl"
        >
          Teste Nylla Agora.
        </h2>
        <Link
          href="/#planos"
          className="inline-flex items-center justify-center rounded-full bg-[#171612] px-6 py-3 font-sans text-sm font-medium text-[#F4F3F1] transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171612]"
        >
          Começar agora
        </Link>
      </div>
    </section>
  )
}
