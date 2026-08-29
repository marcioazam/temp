import { cn } from '@/lib/utils'

export function StatCard({
  label,
  value,
  hint,
  hintTone = 'muted',
  className,
}: {
  label: string
  value: React.ReactNode
  hint?: React.ReactNode
  hintTone?: 'muted' | 'success' | 'warning' | 'danger'
  className?: string
}) {
  const hintClass = {
    muted: 'text-subtle-foreground',
    success: 'text-term-success',
    warning: 'text-primary',
    danger: 'text-destructive',
  }[hintTone]

  return (
    <div className={cn('flex flex-col gap-2 border border-border bg-card p-4', className)}>
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">{label}</p>
      <p className="font-mono text-xl tabular-nums text-foreground">{value}</p>
      {hint && <p className={cn('text-[11px] leading-relaxed', hintClass)}>{hint}</p>}
    </div>
  )
}
