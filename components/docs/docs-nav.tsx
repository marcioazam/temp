"use client"

import { useEffect, useMemo, useState } from "react"

export type NavGroup = {
  label: string
  items: { id: string; label: string }[]
}

/** Marca a seção visível conforme a página rola. */
function useActiveSection(groups: NavGroup[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const ids = groups.flatMap((g) => g.items.map((i) => i.id))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-15% 0px -75% 0px" },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [groups])

  return activeId
}

export function DocsNav({ groups }: { groups: NavGroup[] }) {
  const activeId = useActiveSection(groups)
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return groups
    return groups
      .map((g) => ({ ...g, items: g.items.filter((i) => i.label.includes(q) || i.id.includes(q)) }))
      .filter((g) => g.items.length > 0)
  }, [groups, query])

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-border/60 pb-2">
        <label htmlFor="docs-filter" className="sr-only">
          Filtrar seções
        </label>
        <input
          id="docs-filter"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="filtrar seções"
          className="type-label w-full bg-transparent text-foreground placeholder:text-subtle-foreground focus:outline-none"
        />
      </div>

      <nav aria-label="Seções da documentação" className="flex flex-col gap-6">
        {filtered.map((group, gi) => (
          <div key={group.label}>
            <div className="type-micro mb-2.5 flex items-center gap-2 text-subtle-foreground">
              <span>{String(gi + 1).padStart(2, "0")}</span>
              <span>{group.label}</span>
            </div>
            <ul className="flex flex-col">
              {group.items.map((item) => {
                const active = activeId === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={active ? "true" : undefined}
                      className={`type-label block border-l py-1 pl-3 transition-colors ${
                        active
                          ? "border-primary text-foreground"
                          : "border-border/40 text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="type-label text-subtle-foreground">nenhuma seção encontrada</p>
        )}
      </nav>
    </div>
  )
}

/** Índice compacto para telas pequenas, onde a barra lateral não cabe. */
export function DocsNavMobile({ groups }: { groups: NavGroup[] }) {
  return (
    <details className="border border-border/60 bg-secondary lg:hidden">
      <summary className="type-micro flex cursor-pointer items-center justify-between px-4 py-3 text-foreground">
        <span>índice da documentação</span>
        <span aria-hidden="true" className="text-subtle-foreground">
          ▾
        </span>
      </summary>
      <div className="flex flex-col gap-5 border-t border-border/60 px-4 py-4">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="type-micro mb-2 text-subtle-foreground">{group.label}</div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {group.items.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="type-label text-muted-foreground hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  )
}
