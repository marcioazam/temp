export type Param = {
  name: string
  type: string
  required?: boolean
  desc: string
}

export function ParamTable({ params, caption }: { params: Param[]; caption: string }) {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[560px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="type-eyebrow border-b border-border bg-card text-left text-subtle-foreground">
            <th className="px-4 py-3 font-medium">parâmetro</th>
            <th className="px-4 py-3 font-medium">tipo</th>
            <th className="px-4 py-3 font-medium">descrição</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} className="border-b border-border align-top last:border-b-0">
              <td className="whitespace-nowrap px-4 py-3">
                <code className="type-code text-foreground">{p.name}</code>
                {p.required && (
                  <span className="type-micro ml-2 text-primary" aria-label="obrigatório">
                    req
                  </span>
                )}
              </td>
              <td className="type-label whitespace-nowrap px-4 py-3 text-subtle-foreground">{p.type}</td>
              <td className="type-label px-4 py-3 text-muted-foreground">{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
