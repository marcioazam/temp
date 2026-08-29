'use client'

import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Field({
  label,
  children,
  hint,
  className,
}: {
  label: string
  children: React.ReactNode
  hint?: string
  className?: string
}) {
  return (
    <label className={cn('flex flex-col gap-1.5', className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">{label}</span>
      {children}
      {hint && <span className="text-[11px] leading-relaxed text-subtle-foreground">{hint}</span>}
    </label>
  )
}

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-8 w-full border border-border bg-background px-2.5 text-[13px] text-foreground placeholder:text-subtle-foreground focus-visible:border-ring focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  )
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full resize-y border border-border bg-background px-2.5 py-2 text-[13px] leading-relaxed text-foreground placeholder:text-subtle-foreground focus-visible:border-ring focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  )
}

export function NativeSelect({
  className,
  children,
  showChevron = true,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { showChevron?: boolean }) {
  return (
    <span className="relative block w-full">
      <select
        className={cn(
          'h-8 w-full cursor-pointer appearance-none border border-border bg-background px-2.5 pr-9 text-[13px] text-foreground focus-visible:border-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {showChevron && (
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-subtle-foreground"
          aria-hidden="true"
        />
      )}
    </span>
  )
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-4.5 w-8 shrink-0 border transition-colors focus-visible:outline-1 focus-visible:outline-ring disabled:opacity-50',
        checked ? 'border-primary bg-primary/20' : 'border-border bg-muted',
      )}
    >
      <span
        className={cn(
          'absolute top-1/2 size-3 -translate-y-1/2 transition-all',
          checked ? 'left-[calc(100%-0.875rem)] bg-primary' : 'left-0.5 bg-muted-foreground',
        )}
      />
    </button>
  )
}

export function SettingRow({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-3.5">
      <div className="flex flex-col gap-0.5">
        <p className="text-[13px] text-foreground">{title}</p>
        {description && <p className="text-[11px] leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  )
}
