"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LastUpdated } from "@/components/status/last-updated"

const tabs = [
  { label: "Status atual", href: "/status" },
  { label: "Histórico", href: "/status/history" },
]

/** Navegação entre a visão atual e o histórico completo de incidentes. */
export function StatusNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Seções da página de status"
      className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-border"
    >
      <ul className="flex gap-8">
        {tabs.map((tab) => {
          const active = pathname === tab.href
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`type-label -mb-px inline-block border-b pb-3 transition-colors ${
                  active
                    ? "border-foreground text-foreground"
                    : "border-transparent text-subtle-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          )
        })}
      </ul>
      <LastUpdated className="pb-3 text-right" />
    </nav>
  )
}
