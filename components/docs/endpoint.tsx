import type { ReactNode } from "react"

export type Method = "GET" | "POST" | "DELETE" | "PATCH"

const METHOD_CLASS: Record<Method, string> = {
  GET: "text-term-success",
  POST: "text-primary",
  DELETE: "text-destructive",
  PATCH: "text-foreground",
}

/** Caminho com segmentos dinâmicos ({id}) destacados. */
function Path({ path }: { path: string }) {
  const parts = path.split(/(\{[^}]+\})/g)
  return (
    <code className="type-code break-all text-foreground">
      {parts.map((part, i) =>
        part.startsWith("{") ? (
          <span key={i} className="text-primary">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </code>
  )
}

export function MethodBadge({ method, dense = false }: { method: Method; dense?: boolean }) {
  return (
    <span
      className={`type-micro inline-flex shrink-0 items-center ${dense ? "" : "min-w-14 justify-center"} ${
        METHOD_CLASS[method]
      }`}
    >
      {method}
    </span>
  )
}

export function Endpoint({ method, path, note }: { method: Method; path: string; note?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border border-border/60 bg-secondary px-4 py-3">
      <MethodBadge method={method} />
      <Path path={path} />
      {note && <span className="type-micro ml-auto text-subtle-foreground">{note}</span>}
    </div>
  )
}

export function EndpointRow({ method, path, desc }: { method: Method; path: string; desc: string }) {
  return (
    <tr className="border-b border-border/60 last:border-b-0">
      <td className="px-4 py-2.5">
        <MethodBadge method={method} dense />
      </td>
      <td className="whitespace-nowrap px-4 py-2.5">
        <Path path={path} />
      </td>
      <td className="type-label px-4 py-2.5 text-muted-foreground">{desc}</td>
    </tr>
  )
}
