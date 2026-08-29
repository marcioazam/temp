'use client'

import { useId, useState } from 'react'
import { cn } from '@/lib/utils'
import { fmtCompact, fmtCurrency } from '@/lib/painel/format'
import type { UsagePoint } from '@/lib/painel/data'

// ── Gráfico de área (uso/custo) ─────────────────────────────────────────────

export function AreaChart({
  data,
  metric = 'requests',
  height = 180,
  className,
}: {
  data: UsagePoint[]
  metric?: 'requests' | 'cost'
  height?: number
  className?: string
}) {
  const gradientId = useId()
  const [hover, setHover] = useState<number | null>(null)

  const W = 720
  const H = height
  const PAD = 8
  const values = data.map((d) => d[metric])
  const max = Math.max(...values) * 1.15
  const min = 0

  const x = (i: number) => PAD + (i / (data.length - 1)) * (W - PAD * 2)
  const y = (v: number) => H - PAD - ((v - min) / (max - min)) * (H - PAD * 2)

  const line = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(values.length - 1).toFixed(1)},${H - PAD} L${x(0).toFixed(1)},${H - PAD} Z`

  const hoverPoint = hover !== null ? data[hover] : null

  return (
    <div className={cn('relative', className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={metric === 'requests' ? 'Gráfico de requisições ao longo do tempo' : 'Gráfico de custo ao longo do tempo'}
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const px = ((e.clientX - rect.left) / rect.width) * W
          const i = Math.round(((px - PAD) / (W - PAD * 2)) * (data.length - 1))
          setHover(Math.max(0, Math.min(data.length - 1, i)))
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={PAD}
            x2={W - PAD}
            y1={PAD + t * (H - PAD * 2)}
            y2={PAD + t * (H - PAD * 2)}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        ))}
        <path d={area} fill={`url(#${gradientId})`} />
        <path d={line} fill="none" stroke="var(--primary)" strokeWidth="1.5" />
        {hover !== null && (
          <>
            <line x1={x(hover)} x2={x(hover)} y1={PAD} y2={H - PAD} stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="2 3" />
            <circle cx={x(hover)} cy={y(values[hover])} r="3" fill="var(--primary)" />
          </>
        )}
      </svg>
      {hoverPoint && hover !== null && (
        <div
          className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 border border-border bg-popover px-2.5 py-1.5 font-mono text-[10px] tabular-nums text-foreground"
          style={{ left: `${((PAD + (hover / (data.length - 1)) * (W - PAD * 2)) / W) * 100}%` }}
        >
          <span className="text-subtle-foreground">{hoverPoint.label}</span>{' '}
          {metric === 'requests' ? `${fmtCompact(hoverPoint.requests)} req` : fmtCurrency(hoverPoint.cost)}
        </div>
      )}
      <div className="mt-1 flex justify-between font-mono text-[9px] uppercase tracking-wide text-subtle-foreground">
        <span>{data[0]?.label}</span>
        <span>{data[Math.floor(data.length / 2)]?.label}</span>
        <span>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  )
}

// ── Barras horizontais (segmentação) ────────────────────────────────────────

export function HBarList({
  items,
  format = fmtCurrency,
  className,
}: {
  items: { name: string; value: number }[]
  format?: (v: number) => string
  className?: string
}) {
  const max = Math.max(...items.map((i) => i.value), 1)
  return (
    <ul className={cn('flex flex-col gap-3', className)}>
      {items.map((item) => (
        <li key={item.name} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-4">
            <span className="truncate text-[12px] text-foreground">{item.name}</span>
            <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{format(item.value)}</span>
          </div>
          <div className="h-1 w-full bg-muted">
            <div className="h-full bg-primary/70" style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

// ── Heatmap anual estilo contribuições ──────────────────────────────────────

const heatColors = ['#161616', '#3d2f12', '#6b4e14', '#a87717', '#f5a524']

export function YearHeatmap({ data, className }: { data: number[][]; className?: string }) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <svg
        viewBox={`0 0 ${52 * 11} ${7 * 11}`}
        className="block h-auto w-full min-w-[560px]"
        role="img"
        aria-label="Atividade de requisições nos últimos 12 meses"
      >
        {data.map((week, w) =>
          week.map((v, d) => (
            <rect
              key={`${w}-${d}`}
              x={w * 11}
              y={d * 11}
              width="9"
              height="9"
              fill={heatColors[v]}
            />
          )),
        )}
      </svg>
      <div className="mt-2 flex items-center justify-end gap-1.5 font-mono text-[9px] uppercase tracking-wide text-subtle-foreground">
        <span>Menos</span>
        {heatColors.map((c) => (
          <span key={c} className="size-2" style={{ backgroundColor: c }} />
        ))}
        <span>Mais</span>
      </div>
    </div>
  )
}

// ── Barra de progresso ──────────────────────────────────────────────────────

export function ProgressBar({
  value,
  tone = 'primary',
  className,
}: {
  value: number
  tone?: 'primary' | 'danger'
  className?: string
}) {
  return (
    <div
      className={cn('h-1.5 w-full bg-muted', className)}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn('h-full transition-all', tone === 'danger' ? 'bg-destructive' : 'bg-primary')}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  )
}
