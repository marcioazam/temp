import type { ReactNode } from "react"

export type Param = {
  name: string
  type: string
  required?: boolean
  default?: string
  desc: ReactNode
}

/** Casca de tabela compartilhada : hairlines, header mono, scroll horizontal. */
export function TableShell({
  caption,
  head,
  minWidth = 560,
  children,
}: {
  caption: string
  head: string[]
  minWidth?: number
  children: ReactNode
}) {
  return (
    <div className="overflow-x-auto border border-border/60">
      <table className="w-full" style={{ minWidth }}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="type-micro border-b border-border/60 bg-secondary text-left text-subtle-foreground">
            {head.map((cell) => (
              <th key={cell} scope="col" className="px-4 py-2.5 font-medium">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

/** Tabela genérica de dados. `mono` marca as colunas renderizadas em código. */
export function DataTable({
  caption,
  head,
  rows,
  mono = [],
  minWidth,
}: {
  caption: string
  head: string[]
  rows: (string | ReactNode)[][]
  mono?: number[]
  minWidth?: number
}) {
  return (
    <TableShell caption={caption} head={head} minWidth={minWidth}>
      {rows.map((row, r) => (
        <tr key={r} className="border-b border-border/60 align-top last:border-b-0">
          {row.map((cell, c) => (
            <td
              key={c}
              className={
                mono.includes(c)
                  ? "type-code whitespace-nowrap px-4 py-3 text-foreground"
                  : "type-label px-4 py-3 text-muted-foreground"
              }
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </TableShell>
  )
}

export function ParamTable({ params, caption }: { params: Param[]; caption: string }) {
  return (
    <TableShell caption={caption} head={["parâmetro", "tipo", "descrição"]}>
      {params.map((p) => (
        <tr key={p.name} className="border-b border-border/60 align-top last:border-b-0">
          <td className="whitespace-nowrap px-4 py-3">
            <code className="type-code text-foreground">{p.name}</code>
            {p.required && (
              <span className="type-micro ml-2 text-primary" title="obrigatório">
                req
              </span>
            )}
          </td>
          <td className="px-4 py-3">
            <div className="type-label whitespace-nowrap text-subtle-foreground">{p.type}</div>
            {p.default && (
              <div className="type-code mt-1 whitespace-nowrap normal-case text-subtle-foreground/70">
                = {p.default}
              </div>
            )}
          </td>
          <td className="type-label px-4 py-3 text-pretty text-muted-foreground">{p.desc}</td>
        </tr>
      ))}
    </TableShell>
  )
}
