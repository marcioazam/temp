export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="flex flex-col gap-1">
        <h1 className="text-balance text-2xl font-medium tracking-[-0.02em] text-primary md:text-[26px]">{title}</h1>
        {description && <p className="max-w-xl text-[13px] leading-relaxed text-muted-foreground text-pretty">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}
