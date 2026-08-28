type Method = "GET" | "POST" | "DELETE" | "PATCH"

const methodColor: Record<Method, string> = {
  GET: "text-term-success border-term-success/40",
  POST: "text-primary border-primary/40",
  DELETE: "text-destructive border-destructive/40",
  PATCH: "text-foreground border-border",
}

export function Endpoint({ method, path }: { method: Method; path: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 border border-border bg-card px-4 py-3">
      <span
        className={`type-micro inline-flex shrink-0 items-center border px-2 py-1 ${methodColor[method]}`}
      >
        {method}
      </span>
      <code className="type-code break-all text-foreground">{path}</code>
    </div>
  )
}

export function EndpointRow({ method, path, desc }: { method: Method; path: string; desc: string }) {
  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-4 py-2.5">
        <span className={`type-micro inline-flex border px-1.5 py-0.5 ${methodColor[method]}`}>{method}</span>
      </td>
      <td className="px-4 py-2.5">
        <code className="type-code text-foreground">{path}</code>
      </td>
      <td className="type-label px-4 py-2.5 text-muted-foreground">{desc}</td>
    </tr>
  )
}
