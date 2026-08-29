'use client'

import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  side = 'center',
  className,
  showHeaderBorder = true,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  side?: 'center' | 'right'
  className?: string
  showHeaderBorder?: boolean
}) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <BaseDialog.Popup
          className={cn(
            'fixed z-50 flex flex-col border border-border bg-card text-foreground shadow-[0_24px_60px_rgba(0,0,0,0.6)] outline-none transition-all',
            side === 'center' &&
              'left-1/2 top-1/2 max-h-[85vh] w-[min(480px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
            side === 'right' &&
              'inset-y-0 right-0 h-full w-[min(520px,100vw)] data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full',
            className,
          )}
        >
          <div
            className={cn(
              'flex items-start justify-between gap-4 px-5 py-4',
              showHeaderBorder && 'border-b border-border',
            )}
          >
            <div className="flex flex-col gap-1">
              <BaseDialog.Title className="text-sm font-medium text-foreground">{title}</BaseDialog.Title>
              {description && (
                <BaseDialog.Description className="text-xs leading-relaxed text-muted-foreground">
                  {description}
                </BaseDialog.Description>
              )}
            </div>
            <BaseDialog.Close
              className="flex size-6 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-1 focus-visible:outline-ring"
              aria-label="Fechar"
            >
              <X className="size-4" />
            </BaseDialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}
