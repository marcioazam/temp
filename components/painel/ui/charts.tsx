'use client'

import { useId, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { fmtCompact, fmtCurrency } from '@/lib/painel/format'
import type { UsagePoint } from '@/lib/painel/data'

// ── Sparkline (mini tendência para KPIs) ─────────────────────────────────────

export function Sparkline({
  data,
  tone = 'neutral',
  className,
}: {
  data: number[]
  tone?: 'up' | 'down' | 'neutral'
  className?: string
}) {
  const W = 64
  const H = 22
  const max = Math.max(...data)
  const min = Math.min(...data)
  const span = max - min || 1
  const px = (i: number) => (i / (data.length - 1)) * W
  const py = (v: number) => H - 2 - ((v - min) / span) * (H - 4)
  const d = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(' ')
  const stroke = tone === 'down' ? 'var(--destructive)' : 'var(--term-success)'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn('h-[22px] w-16', className)} aria-hidden="true">
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.25" strokeOpacity="0.7" strokeLinejoin="round" />
    </svg>
  )
}

// ── Gráfico de área (uso/custo) ─────────────────────────────────────────────

export type ChartShape = 'area' | 'line' | 'bars'

export function AreaChart({
  data,
  metric = 'requests',
  height = 180,
  shape = 'area',
  showAverage = false,
  className,
}: {
  data: UsagePoint[]
  metric?: 'requests' | 'tokens'
  height?: number
  shape?: ChartShape
  showAverage?: boolean
  className?: string
}) {
  const gradientId = useId()
  const [hover, setHover] = useState<number | null>(null)

  const W = 720
  const H = height
  const PAD = 10
  const LEFT = 64
  const values = data.map((d) => d[metric])
  const max = Math.max(...values) * 1.15 || 1
  const avg = values.reduce((a, b) => a + b, 0) / (values.length || 1)
  const peak = values.indexOf(Math.max(...values))

  const fmt = (v: number) => `${fmtCompact(v)}${metric === 'tokens' ? ' tok' : ' req'}`
  const x = (i: number) => LEFT + (i / Math.max(1, data.length - 1)) * (W - LEFT - PAD)
  const y = (v: number) => H - PAD - (v / max) * (H - PAD * 2)

  const line = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(values.length - 1).toFixed(1)},${H - PAD} L${x(0).toFixed(1)},${H - PAD} Z`
  const band = (W - LEFT - PAD) / data.length
  const barW = Math.max(2, band - Math.min(8, band * 0.35))
  // barras usam o centro da faixa; linha/área usam o ponto exato
  const cx = (i: number) => (shape === 'bars' ? LEFT + (i + 0.5) * band : x(i))

  const hoverPoint = hover !== null ? data[hover] : null
  const hoverValue = hover !== null ? values[hover] : 0
  const prevValue = hover !== null && hover > 0 ? values[hover - 1] : null
  const delta = prevValue && prevValue > 0 ? ((hoverValue - prevValue) / prevValue) * 100 : null

  function move(dir: number) {
    setHover((h) => {
      const next = (h === null ? (dir > 0 ? 0 : data.length - 1) : h + dir)
      return Math.max(0, Math.min(data.length - 1, next))
    })
  }

  return (
    <div className={cn('relative', className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full cursor-crosshair outline-none focus-visible:ring-1 focus-visible:ring-ring"
        role="img"
        tabIndex={0}
        aria-label={`${metric === 'requests' ? 'Requisições' : 'Tokens'} ao longo do tempo. Use as setas para navegar pelos pontos.`}
        onMouseLeave={() => setHover(null)}
        onBlur={() => setHover(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); move(1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1) }
          if (e.key === 'Escape') setHover(null)
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const px = ((e.clientX - rect.left) / rect.width) * W
          const i =
            shape === 'bars'
              ? Math.floor((px - LEFT) / band)
              : Math.round(((px - LEFT) / (W - LEFT - PAD)) * (data.length - 1))
          setHover(Math.max(0, Math.min(data.length - 1, i)))
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--term-success)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--term-success)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.5, 1].map((t) => {
          const gy = PAD + t * (H - PAD * 2)
          return (
            <g key={t}>
              <line
                x1={LEFT}
                x2={W - PAD}
                y1={gy}
                y2={gy}
                stroke="var(--border)"
                strokeWidth="1"
                strokeOpacity="0.5"
                strokeDasharray={t === 1 ? undefined : '2 5'}
              />
              <text
                x={LEFT - 8}
                y={gy + 3}
                textAnchor="end"
                className="fill-[var(--subtle-foreground)] font-mono"
                fontSize="9"
              >
                {fmtCompact(max * (1 - t))}
              </text>
            </g>
          )
        })}

        {showAverage && (
          <g>
            <line
              x1={LEFT}
              x2={W - PAD}
              y1={y(avg)}
              y2={y(avg)}
              stroke="var(--foreground)"
              strokeWidth="1"
              strokeOpacity="0.45"
              strokeDasharray="5 4"
            />
            <text
              x={W - PAD}
              y={y(avg) - 5}
              textAnchor="end"
              className="fill-[var(--foreground)] font-mono"
              fontSize="9"
              opacity="0.6"
            >
              média {fmt(avg)}
            </text>
          </g>
        )}

        {shape === 'bars' ? (
          values.map((v, i) => {
            const active = hover === i
            return (
              <g key={i}>
                <rect
                  x={cx(i) - barW / 2}
                  y={y(v)}
                  width={barW}
                  height={Math.max(1, H - PAD - y(v))}
                  fill={active ? 'var(--foreground)' : 'var(--term-success)'}
                  fillOpacity={active ? 0.22 : 0.14}
                />
                <rect
                  x={cx(i) - barW / 2}
                  y={y(v)}
                  width={barW}
                  height="1.5"
                  fill={active ? 'var(--foreground)' : 'var(--term-success)'}
                  fillOpacity={hover === null || active ? 0.9 : 0.45}
                />
              </g>
            )
          })
        ) : (
          <>
            {shape === 'area' && <path d={area} fill={`url(#${gradientId})`} />}
            <path
              d={line}
              fill="none"
              stroke="var(--term-success)"
              strokeOpacity="0.9"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </>
        )}

        {hover === null && shape !== 'bars' && (
          <circle cx={x(peak)} cy={y(values[peak])} r="2.5" fill="var(--foreground)" fillOpacity="0.8" />
        )}

        {hover !== null && (
          <>
            <line
              x1={cx(hover)}
              x2={cx(hover)}
              y1={PAD}
              y2={H - PAD}
              stroke="var(--foreground)"
              strokeWidth="1"
              strokeOpacity="0.7"
              strokeDasharray="2 3"
            />
            {shape !== 'bars' && (
              <>
                <circle cx={x(hover)} cy={y(hoverValue)} r="5" fill="var(--foreground)" fillOpacity="0.2" />
                <circle cx={x(hover)} cy={y(hoverValue)} r="2.5" fill="var(--foreground)" />
              </>
            )}
          </>
        )}
      </svg>

      {hoverPoint && hover !== null && (
        <div
          className={cn(
            'pointer-events-none absolute top-0 z-10 flex items-center gap-2 border border-border bg-popover px-2.5 py-1.5 font-mono text-[10px] tabular-nums text-foreground',
            hover < 2 ? '' : hover > data.length - 3 ? '-translate-x-full' : '-translate-x-1/2',
          )}
          style={{ left: `${(cx(hover) / W) * 100}%` }}
        >
          <span className="text-subtle-foreground">{hoverPoint.label}</span>
          <span>{fmt(hoverValue)}</span>
          {delta !== null && (
            <span className={delta >= 0 ? 'text-term-success' : 'text-destructive'}>
              {delta >= 0 ? '+' : ''}
              {delta.toFixed(1)}%
            </span>
          )}
        </div>
      )}

      <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.08em] text-subtle-foreground" style={{ paddingLeft: `${(LEFT / W) * 100}%` }}>
        {[0, Math.floor(data.length / 2), data.length - 1].map((i) => (
          <span key={i} className={cn('transition-colors', hover === i && 'text-foreground')}>
            {data[i]?.label}
          </span>
        ))}
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
            <div className="h-full bg-term-success/70" style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

// ── Heatmap anual estilo contribuições ──────────────────────────────────────

// Escala verde derivada de --term-success (#7cd68c) sobre a superfície escura
const heatColors = ['#161616', '#283929', '#3a593f', '#51855a', '#6db97a']
const levelRequests = [0, 420, 1180, 2640, 4310]
const weekdayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const monthNames = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

const CELL = 14
const GAP = 4
const PITCH = CELL + GAP

export function YearHeatmap({ data, className }: { data: number[][]; className?: string }) {
  const [hover, setHover] = useState<{ w: number; d: number } | null>(null)

  const { cellDate, months } = useMemo(() => {
    const weeks = data.length
    const total = weeks * 7
    const end = new Date()
    end.setHours(12, 0, 0, 0)
    const start = new Date(end)
    start.setDate(start.getDate() - (total - 1))

    const cellDate = (w: number, d: number) => {
      const date = new Date(start)
      date.setDate(date.getDate() + w * 7 + d)
      return date
    }

    const months: { w: number; label: string }[] = []
    let last = -1
    for (let w = 0; w < weeks; w++) {
      const m = cellDate(w, 0).getMonth()
      if (m !== last) {
        last = m
        const prev = months[months.length - 1]
        if (prev && w - prev.w < 2) continue
        if (w > weeks - 2) continue
        months.push({ w, label: monthNames[m] })
      }
    }
    return { cellDate, months }
  }, [data])

  const hovered = hover ? { level: data[hover.w][hover.d], date: cellDate(hover.w, hover.d) } : null

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-2" style={{ width: 'max-content' }}>
          <div className="flex shrink-0 flex-col pt-4" style={{ gap: GAP }} aria-hidden="true">
            {weekdayLabels.map((label, i) => (
              <span
                key={label}
                className="flex items-center font-mono text-[8px] uppercase tracking-[0.08em] text-subtle-foreground"
                style={{ height: CELL, width: 20 }}
              >
                {i % 2 === 0 ? label : ''}
              </span>
            ))}
          </div>

          <div className="relative" onMouseLeave={() => setHover(null)}>
            <div className="relative h-4" suppressHydrationWarning>
              {months.map((m) => (
                <span
                  key={`${m.w}-${m.label}`}
                  className="absolute top-0 font-mono text-[8px] uppercase tracking-[0.08em] text-subtle-foreground"
                  style={{ left: m.w * PITCH }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            <div
              className="flex"
              style={{ gap: GAP }}
              role="img"
              aria-label="Atividade de requisições nos últimos 12 meses"
            >
              {data.map((week, w) => (
                <div key={w} className="flex flex-col" style={{ gap: GAP }}>
                  {week.map((v, d) => {
                    const active = hover?.w === w && hover?.d === d
                    const dimmed = hover !== null && !active
                    return (
                      <div
                        key={`${w}-${d}`}
                        onMouseEnter={() => setHover({ w, d })}
                        className="rounded-[2px] transition-opacity duration-150"
                        style={{
                          width: CELL,
                          height: CELL,
                          backgroundColor: heatColors[v],
                          opacity: dimmed ? 0.45 : 1,
                          boxShadow: active ? '0 0 0 1px var(--foreground)' : undefined,
                        }}
                      />
                    )
                  })}
                </div>
              ))}
            </div>

            {hover && hovered && (
              <div
                className={cn(
                  'pointer-events-none absolute z-10 whitespace-nowrap border border-border bg-popover px-2 py-1 font-mono text-[10px] tabular-nums text-foreground',
                  hover.w < 3 ? '' : hover.w > data.length - 4 ? '-translate-x-full' : '-translate-x-1/2',
                  hover.d < 2 ? '' : '-translate-y-full',
                )}
                style={{
                  left:
                    hover.w < 3
                      ? hover.w * PITCH
                      : hover.w > data.length - 4
                        ? hover.w * PITCH + CELL
                        : hover.w * PITCH + CELL / 2,
                  top: hover.d < 2 ? 16 + (hover.d + 1) * PITCH + 4 : 16 + hover.d * PITCH - 4,
                }}
                suppressHydrationWarning
              >
                <span className="text-subtle-foreground">
                  {hovered.date.getDate()} {monthNames[hovered.date.getMonth()]}
                </span>{' '}
                {hovered.level === 0 ? 'sem tráfego' : `${fmtCompact(levelRequests[hovered.level])} req`}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-subtle-foreground">
        <span>Menos</span>
        {heatColors.map((c) => (
          <span key={c} className="size-2 rounded-[2px]" style={{ backgroundColor: c }} />
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
