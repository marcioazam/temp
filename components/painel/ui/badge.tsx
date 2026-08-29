import { cn } from '@/lib/utils'

type Tone = 'success' | 'warning' | 'danger' | 'server' | 'muted' | 'primary'

const tones: Record<Tone, string> = {
  success: 'text-term-success border-term-success/30 bg-term-success/5',
  warning: 'text-destructive border-destructive/30 bg-destructive/5',
  danger: 'text-destructive border-destructive/30 bg-destructive/5',
  server: 'text-status-server border-status-server/30 bg-status-server/5',
  muted: 'text-muted-foreground border-border bg-transparent',
  primary: 'text-primary border-primary/40 bg-primary/10',
}

export function StatusBadge({
  tone = 'muted',
  children,
  className,
  dot = true,
}: {
  tone?: Tone
  children: React.ReactNode
  className?: string
  dot?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]',
        tones[tone],
        className,
      )}
    >
      {dot && <span className="size-1 bg-current" aria-hidden="true" />}
      {children}
    </span>
  )
}
