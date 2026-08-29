"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/** Paginação minimalista com navegação anterior e próxima. */
export function StatusPagination({
  page,
  totalPages,
  onPageChange,
  label = "Paginação",
}: {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  label?: string
}) {
  if (totalPages <= 1) return null

  return (
    <nav
      aria-label={label}
      aria-description={`Página ${page} de ${totalPages}`}
      className="mt-10 flex items-center justify-between border-t border-border pt-5"
    >
      <PageArrow
        direction="prev"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      />

      <PageArrow
        direction="next"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      />
    </nav>
  )
}

function PageArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next"
  disabled: boolean
  onClick: () => void
}) {
  const isPrev = direction === "prev"
  const Icon = isPrev ? ChevronLeft : ChevronRight

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={isPrev ? "Página anterior" : "Próxima página"}
      className={cn(
        "type-micro group flex items-center gap-2 py-1.5 transition-colors",
        disabled
          ? "cursor-not-allowed text-subtle-foreground/30"
          : "text-subtle-foreground hover:text-foreground",
      )}
    >
      {isPrev && (
        <Icon
          aria-hidden="true"
          className="size-3.5 transition-transform duration-300 ease-out group-enabled:group-hover:-translate-x-0.5"
          strokeWidth={1.5}
        />
      )}
      <span className="hidden sm:inline">{isPrev ? "Anterior" : "Próximo"}</span>
      {!isPrev && (
        <Icon
          aria-hidden="true"
          className="size-3.5 transition-transform duration-300 ease-out group-enabled:group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      )}
    </button>
  )
}
