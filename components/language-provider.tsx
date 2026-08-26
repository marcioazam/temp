"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { enToPt, ptToEn, type Locale } from "@/lib/translations"

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  enabled: boolean
}

const STORAGE_KEY = "nylla-language"
const LanguageContext = createContext<LanguageContextValue>({
  locale: "pt",
  setLocale: () => undefined,
  enabled: false,
})

function translateText(value: string, locale: Locale) {
  const dictionary = locale === "en" ? ptToEn : enToPt
  const leading = value.match(/^\s*/)?.[0] ?? ""
  const trailing = value.match(/\s*$/)?.[0] ?? ""
  const content = value.trim()
  const translated = dictionary[content]
  return translated ? `${leading}${translated}${trailing}` : value
}

function translateElement(root: HTMLElement, locale: Locale) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode()

  while (node) {
    const parent = node.parentElement
    if (parent && !parent.closest("script, style, code, [data-no-translate]")) {
      const next = translateText(node.nodeValue ?? "", locale)
      if (next !== node.nodeValue) node.nodeValue = next
    }
    node = walker.nextNode()
  }

  root.querySelectorAll<HTMLElement>("[aria-label], [title]").forEach((element) => {
    for (const attribute of ["aria-label", "title"] as const) {
      const value = element.getAttribute(attribute)
      if (!value) continue
      const translated = translateText(value, locale)
      if (translated !== value) element.setAttribute(attribute, translated)
    }
  })
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, updateLocale] = useState<Locale>("pt")

  const setLocale = useCallback((nextLocale: Locale) => {
    updateLocale(nextLocale)
    window.localStorage.setItem(STORAGE_KEY, nextLocale)
  }, [])

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === "en" || saved === "pt") updateLocale(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en"
    translateElement(document.body, locale)

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          const node = mutation.target
          if (!node.parentElement?.closest("script, style, code, [data-no-translate]")) {
            const next = translateText(node.nodeValue ?? "", locale)
            if (next !== node.nodeValue) node.nodeValue = next
          }
          continue
        }

        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) translateElement(node, locale)
          else if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
            const next = translateText(node.nodeValue ?? "", locale)
            if (next !== node.nodeValue) node.nodeValue = next
          }
        })
      }
    })

    observer.observe(document.body, { childList: true, characterData: true, subtree: true })
    return () => observer.disconnect()
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale, enabled: true }), [locale, setLocale])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
