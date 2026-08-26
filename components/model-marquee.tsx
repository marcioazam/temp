const icon = (slug: string, variant = "default") =>
  `https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/${variant}.svg`

const brands = [
  { name: "Claude Code", src: icon("claude-code") },
  { name: "Codex", src: icon("codex") },
  { name: "Cursor", src: icon("cursor", "mono") },
  { name: "GitHub Copilot", src: icon("github-copilot") },
  { name: "VS Code", src: icon("visual-studio-code") },
  { name: "Windsurf", src: icon("windsurf") },
  { name: "Zed", src: icon("zed") },
  { name: "Antigravity AI", mark: "A" },
  { name: "Cline", src: icon("cline") },
  { name: "Kilo Code", src: icon("kilo-code") },
  { name: "OpenCode", src: icon("opencode") },
  { name: "Aider", mark: "aider" },
  { name: "Goose", src: icon("goose-codename") },
  { name: "Qwen Code", src: icon("qwen") },
  { name: "Kimi CLI", src: icon("kimi") },
  { name: "Void", src: icon("void") },
]

export function ModelMarquee() {
  return (
    <ul
      aria-label="Ferramentas compatíveis com a Nylla"
      className="grid grid-cols-3 gap-2 sm:grid-cols-4"
    >
      {brands.map((brand) => (
        <li
          key={brand.name}
          className="flex min-h-16 flex-col items-center justify-center gap-2 border border-border bg-[#F4F3F1] px-2 py-3"
        >
          <div className="flex h-5 items-center justify-center text-[#090909]">
            {brand.src && (
              <img
                src={brand.src}
                alt=""
                className="h-5 w-5 object-contain grayscale brightness-0"
                loading="lazy"
              />
            )}
            {brand.mark && (
              <span
                aria-hidden="true"
                className={`flex h-5 min-w-5 items-center justify-center font-mono font-bold ${
                  brand.mark === "aider" ? "text-[8px] tracking-tight" : "text-sm"
                }`}
              >
                {brand.mark}
              </span>
            )}
          </div>
          <span className="max-w-full truncate text-center font-sans text-[11px] font-medium tracking-tight text-[#090909]">
            {brand.name}
          </span>
        </li>
      ))}
    </ul>
  )
}
