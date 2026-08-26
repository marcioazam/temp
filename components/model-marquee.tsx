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

function BrandCards({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 gap-2 pr-2" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <li
          key={brand.name}
          className="flex h-24 w-44 shrink-0 items-center justify-center border border-black/10 bg-[#F4F3F1] px-7"
        >
          <div className="flex items-center justify-center gap-2.5 text-[#808080]">
            {brand.src && (
              <img
                src={brand.src}
                alt=""
                className={
                  brand.includesName
                    ? "h-7 max-w-24 object-contain grayscale brightness-0 opacity-50"
                    : "h-6 w-6 object-contain grayscale brightness-0 opacity-50"
                }
                loading="lazy"
              />
            )}
            {!brand.includesName && (
              <span className="whitespace-nowrap font-sans text-xl font-semibold tracking-tight">
                {brand.name}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ModelMarquee() {
  return (
    <section
      aria-label="Empresas que confiam em infraestrutura de IA"
      className="overflow-hidden border-b border-black/10 bg-[#F4F3F1] py-3"
    >
      <div className="marquee-track flex w-max">
        <BrandCards />
        <BrandCards hidden />
      </div>
    </section>
  )
}
