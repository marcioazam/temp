const brands = [
  {
    name: "Stripe",
    src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/stripe/mono.svg",
  },
  {
    name: "OpenAI",
    src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/openai/light.svg",
  },
  {
    name: "Linear",
    src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/linear/mono.svg",
  },
  {
    name: "Datadog",
    src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/datadog/mono.svg",
  },
  {
    name: "NVIDIA",
    src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/nvidia/light.svg",
    includesName: true,
  },
  {
    name: "Figma",
    src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/figma/mono.svg",
  },
  { name: "Ramp" },
  {
    name: "Adobe",
    src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/adobe/default.svg",
  },
]

export function ModelMarquee() {
  return (
    <section aria-label="Empresas que confiam em infraestrutura de IA" className="border-b border-border bg-card/40">
      <ul className="mx-auto flex w-full max-w-screen-2xl gap-2 overflow-x-auto px-4 py-3 md:px-9">
        {brands.map((brand) => (
          <li
            key={brand.name}
            className="flex h-24 min-w-36 flex-1 items-center justify-center border border-border bg-card px-7"
          >
            <div className="flex items-center justify-center gap-2.5 text-foreground/90">
              {brand.src && (
                <img
                  src={brand.src}
                  alt=""
                  className={brand.includesName ? "h-7 max-w-24 object-contain grayscale brightness-0 invert" : "h-6 w-6 object-contain grayscale brightness-0 invert"}
                  loading="lazy"
                />
              )}
              {!brand.includesName && (
                <span className="whitespace-nowrap font-sans text-xl font-semibold tracking-tight">{brand.name}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
