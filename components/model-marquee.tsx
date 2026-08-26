const icon = (slug: string, variant = "default") =>
  `https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/${variant}.svg`

const brands = [
  { name: "Claude Code", src: icon("claude-code") },
  { name: "Codex", src: icon("codex") },
  { name: "Cursor", src: icon("cursor", "mono") },
  { name: "GitHub Copilot", src: icon("github-copilot") },
  { name: "VS Code", src: icon("visual-studio-code") },
  { name: "Gemini CLI", src: icon("gemini-cli") },
  { name: "Windsurf", src: icon("windsurf") },
  { name: "Zed", src: icon("zed") },
  { name: "Cline", src: icon("cline") },
  { name: "Roo Code", mark: "R" },
  { name: "Kilo Code", src: icon("kilo-code") },
  { name: "OpenCode", src: icon("opencode") },
  { name: "Continue", src: icon("continue") },
  { name: "Aider", mark: "aider" },
  { name: "Goose", src: icon("goose-codename") },
  { name: "Qwen Code", src: icon("qwen") },
  { name: "OpenHands", src: icon("openhands", "mono") },
  { name: "Cody", src: icon("cody") },
  { name: "Void", src: icon("void") },
]

function BrandCards({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 gap-2 pr-2" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <li
          key={brand.name}
          className="flex h-28 w-36 shrink-0 flex-col items-center justify-center gap-3 border border-black/10 bg-[#F4F3F1] px-4"
        >
          <div className="flex h-7 items-center justify-center text-[#090909]">
            {brand.src && (
              <img
                src={brand.src || "/placeholder.svg"}
                alt=""
                className="h-7 w-7 object-contain grayscale brightness-0"
                loading="lazy"
              />
            )}
            {brand.mark && (
              <span
                aria-hidden="true"
                className={`flex h-7 min-w-7 items-center justify-center font-mono font-bold ${
                  brand.mark === "aider" ? "text-[10px] tracking-tight" : "text-xl"
                }`}
              >
                {brand.mark}
              </span>
            )}
          </div>
          <span className="whitespace-nowrap text-center font-sans text-sm font-medium tracking-tight text-[#090909]">
            {brand.name}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function ModelMarquee() {
  return (
    <section aria-label="Harnesses compatíveis com a Nylla" className="overflow-hidden bg-background py-3">
      <div className="marquee-track flex w-max">
        <BrandCards />
        <BrandCards hidden />
      </div>
    </section>
  )
}
