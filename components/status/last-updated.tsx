"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function LastUpdated({ className }: { className?: string }) {
  const [stamp, setStamp] = useState<string | null>(null)

  useEffect(() => {
    setStamp(
      new Date().toLocaleString("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    )
  }, [])

  return (
    <span className={cn("type-micro text-subtle-foreground", className)}>
      {stamp ? `Atualizado em ${stamp}` : "\u00A0"}
    </span>
  )
}
