"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export type NavGroup = {
  label: string
  items: { id: string; label: string }[]
}

export function DocsNav({ groups }: { groups: NavGroup[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const ids = groups.flatMap((g) => g.items.map((i) => i.id))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [groups])

  return (
    <nav aria-label="Seções da documentação" className="flex flex-col gap-7">
      {groups.map((group) => (
        <div key={group.label}>
          <div className="type-eyebrow mb-3 text-subtle-foreground">{group.label}</div>
          <ul className="flex flex-col gap-2">
            {group.items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? "true" : undefined}
                  className={`type-label block border-l pl-3 transition-colors ${
                    activeId === item.id
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
