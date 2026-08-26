const icon = (slug: string, variant = "default") =>
  `https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/${variant}.svg`

const brands = [
  { name: "Claude Code", src: icon("claude-code") },
  { name: "Codex", src: icon("codex") },
  { name: "Cursor", src: icon("cursor", "mono") },
  { name: "GitHub Copilot", src: icon("github-copilot") },
  { name: "VS Code", src: icon("visual-studio-code") },
  { name: "Windsurf", src: icon("windsurf") },
  { name: "Antigravity AI", src: "/images/antigravity-ai.png" },
  { name: "Cline", src: icon("cline") },
  { name: "OpenCode", src: icon("opencode") },
  { name: "Qwen Code", src: icon("qwen") },
  { name: "Kimi Code", src: "/images/kimi-cli.svg" },
  { name: "Hermes Agent", mark: "H" },
  { name: "OpenClaw", src: "/images/openclaw.svg" },
  { name: "Kilo Code", src: "/images/kilo-code.svg" },
  { name: "Goose", src: icon("goose") },
]

export function ModelMarquee() {
  return (
    <ul
      aria-label="Ferramentas compatíveis com a Nylla"
      className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
    >
      {brands.map((brand) => (
        <li
          key={brand.name}
          className="group flex min-h-[76px] flex-col items-center justify-center gap-2 border border-transparent bg-[#F4F3F1] px-3 py-3 transition-colors hover:border-[#F4F3F1] hover:bg-[#ebe9e5]"
        >
          <div className="flex h-7 w-10 items-center justify-center text-foreground transition-transform group-hover:scale-110">
            {brand.src && (
              <img
                src={brand.src}
                alt={`${brand.name} logo`}
                className="h-6 w-6 object-contain grayscale brightness-0 invert"
                loading="lazy"
              />
            )}
            {brand.mark && (
              <span
                aria-hidden="true"
                className={`flex h-6 min-w-6 items-center justify-center font-mono font-bold ${
                  brand.mark === "aider" ? "text-[8px] tracking-tight" : "text-sm"
                }`}
              >
                {brand.mark}
              </span>
            )}
          </div>
          <span className="max-w-full truncate text-center font-sans text-[11px] font-medium leading-4 tracking-tight text-[#090909]">
            {brand.name}
          </span>
        </li>
      ))}
    </ul>
  )
}
