"use client"

import { useEffect, useState } from "react"

export function LastUpdated() {
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
    <span className="type-micro text-subtle-foreground">
      {stamp ? `Atualizado em ${stamp}` : "\u00A0"}
    </span>
  )
}
