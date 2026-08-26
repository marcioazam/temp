const brands = [
  { name: "Aider", mark: "aider" },
  { name: "Goose", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/goose-codename/default.svg" },
  { name: "Cursor", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/cursor/mono.svg" },
  { name: "Cline", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/cline/default.svg" },
  { name: "GitHub Copilot", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/github-copilot/default.svg" },
  { name: "Windsurf", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/windsurf/default.svg" },
  { name: "Zed", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/zed/default.svg" },
  { name: "Continue", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/continue/default.svg" },
  { name: "OpenCode", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/opencode/default.svg" },
  { name: "Kilo Code", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/kilo-code/default.svg" },
  { name: "Roo Code", mark: "R" },
  { name: "Amp", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/amp/default.svg" },
  { name: "Codex", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/codex/default.svg" },
  { name: "Claude Code", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/claude-code/default.svg" },
  { name: "Vercel", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/vercel/mono.svg" },
  { name: "Gemini CLI", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/gemini-cli/default.svg" },
  { name: "Llama", src: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/meta/default.svg" },
]

function BrandCards({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 gap-2 pr-2" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <li
          key={brand.name}
          className="flex h-24 w-44 shrink-0 items-center justify-center border border-black/10 bg-[#F4F3F1] px-7"
        >
          <div className="flex items-center justify-center gap-2.5 text-[#090909]">
            {brand.src && (
              <img
                src={brand.src}
                alt=""
                className="h-6 w-6 object-contain grayscale brightness-0"
                loading="lazy"
              />
            )}
            {brand.mark && (
              <span
                aria-hidden="true"
                className={`flex h-6 min-w-6 items-center justify-center font-mono font-bold ${
                  brand.mark === "aider" ? "text-[8px] tracking-tight" : "text-lg"
                }`}
              >
                {brand.mark}
              </span>
            )}
            <span className="whitespace-nowrap font-sans text-xl font-semibold tracking-tight">
              {brand.name}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ModelMarquee() {
  return (
    <section
      aria-label="Harnesses compatíveis com a Nylla"
      className="overflow-hidden bg-background py-3"
    >
      <div className="marquee-track flex w-max">
        <BrandCards />
        <BrandCards hidden />
      </div>
    </section>
  )
}
