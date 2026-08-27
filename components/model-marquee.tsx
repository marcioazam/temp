const icon = (slug: string, variant = "default") =>
  `https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/${variant}.svg`

const brands = [
  { name: "Claude Code", src: icon("claude-code") },
  { name: "Codex", src: icon("codex") },
  { name: "Cursor", src: icon("cursor", "mono") },
  { name: "GitHub Copilot", src: icon("github-copilot") },
  { name: "VS Code", src: icon("visual-studio-code") },
  { name: "Windsurf", src: icon("windsurf") },
  { name: "Antigravity AI", src: icon("antigravity-google", "mono") },
  { name: "Cline", src: icon("cline") },
  { name: "OpenCode", src: icon("opencode") },
  { name: "Qwen Code", src: icon("qwen") },
  { name: "Kimi Code", src: "/images/kimi-cli.svg" },
  { name: "Hermes Agent", src: icon("nousresearch-hermes", "mono") },
  { name: "OpenClaw", src: icon("openclaw-moltbot-clawdbot", "mono") },
  { name: "Kilo Code", src: icon("kilo-code", "light") },
  { name: "Goose", src: icon("goose-codename", "mono") },
]

export function ModelMarquee() {
  return (
    <ul
      aria-label="Ferramentas compatíveis com a Nylla"
      className="grid grid-cols-1 gap-px border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3"
    >
      {brands.map((brand) => (
        <li key={brand.name} className="group relative bg-background">
          <div className="flex items-center gap-3 px-4 py-4 transition-colors group-hover:bg-primary/5">
            <img
              src={brand.src || "/placeholder.svg"}
              alt=""
              className="h-5 w-5 shrink-0 object-contain grayscale brightness-0 invert transition-transform group-hover:scale-110"
              loading="lazy"
            />
            <span className="min-w-0 truncate font-mono text-[11px] font-medium tracking-tight text-foreground/85 transition-colors group-hover:text-foreground">
              {brand.name}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
