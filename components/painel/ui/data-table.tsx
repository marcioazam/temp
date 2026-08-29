import { cn } from '@/lib/utils'

export function Table({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('overflow-x-auto border border-border bg-card', className)}>
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  )
}

export function THead({ children }: { children: React.ReactNode }) {
  return <thead className="border-b border-border">{children}</thead>
}

export function TH({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <th
      className={cn(
        'px-4 py-2.5 text-left font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-subtle-foreground',
        className,
      )}
    >
      {children}
    </th>
  )
}

export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-border">{children}</tbody>
}

export function TR({
  className,
  children,
  onClick,
}: {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <tr
      onClick={onClick}
      className={cn('transition-colors hover:bg-muted/50', onClick && 'cursor-pointer', className)}
    >
      {children}
    </tr>
  )
}

export function TD({
  className,
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('px-4 py-3 text-[13px] text-foreground', className)} {...props}>
      {children}
    </td>
  )
}
