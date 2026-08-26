import { ArrowUp, GitBranch, LoaderCircle, LockKeyhole, Play, RotateCw } from "lucide-react"

const thisWeek = [
  { label: "Acme Research Dashboard", active: true, type: "dot" },
  { label: "Live Telemetry Pipeline", type: "loading" },
  { label: "Zero-Downtime Deploys", type: "branch" },
]

const thisMonth = [
  { label: "Binary Protocol Parser", type: "branch" },
  { label: "Edge Cache Invalidation", type: "dot" },
  { label: "Auth Token Rotation", type: "branch" },
]

function CursorMark() {
  return (
    <span className="relative block size-4 rotate-30 bg-[#f0f0ee]" aria-hidden="true">
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#181713]" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#181713]" />
    </span>
  )
}

function TaskIcon({ type }: { type: string }) {
  if (type === "loading") return <LoaderCircle className="size-3.5 text-[#66645f]" />
  if (type === "branch") return <GitBranch className="size-3.5 text-[#55534f]" />
  return <span className="size-1.5 rounded-full bg-[#55534f]" />
}

function TaskGroup({ title, tasks }: { title: string; tasks: typeof thisWeek }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[10px] text-[#85827c]">{title}</p>
      <ul className="flex flex-col gap-0.5">
        {tasks.map((task) => (
          <li
            key={task.label}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] text-[#d6d4cf] ${task.active ? "bg-[#282621]" : ""}`}
          >
            <span className="flex size-3.5 shrink-0 items-center justify-center"><TaskIcon type={task.type} /></span>
            <span className="truncate">{task.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CommandPaletteMock() {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#34322f] bg-[#181713] shadow-[0_24px_55px_rgba(0,0,0,0.42),0_8px_22px_rgba(0,0,0,0.3)]">
      <div className="flex h-10 items-center border-b border-[#34322f] bg-[#1f1e1b] px-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-[#5b5a56]" />
          <span className="size-2 rounded-full bg-[#5b5a56]" />
          <span className="size-2 rounded-full bg-[#5b5a56]" />
        </div>
        <div className="mx-auto flex h-6 w-64 items-center justify-between rounded-md border border-[#373530] bg-[#24231f] px-2.5 text-[9px] text-[#8e8b85]">
          <LockKeyhole className="size-3" />
          <span>cursor.com/agent</span>
          <RotateCw className="size-3" />
        </div>
        <div className="w-[34px]" />
      </div>

      <div className="grid h-[330px] grid-cols-[174px_1fr] bg-[#181713] sm:h-[360px] sm:grid-cols-[190px_1fr]">
        <aside className="flex min-w-0 flex-col gap-4 border-r border-[#302e29] p-3">
          <CursorMark />
          <TaskGroup title="This Week" tasks={thisWeek} />
          <TaskGroup title="This Month" tasks={thisMonth} />
        </aside>

        <div className="flex min-w-0 flex-col gap-2 overflow-hidden p-3 text-[10px] leading-[1.35] text-[#efede8] sm:p-4 sm:text-[11px]">
          <h3 className="font-medium">Acme Research Dashboard</h3>
          <div className="rounded-md border border-[#3a3833] bg-[#24231f] px-2.5 py-2 text-white">
            Let&apos;s build a dashboard to make our research findings interactive
          </div>
          <p className="text-[#77746e]">Explored 12 files, 4 searches</p>
          <p>On it. I&apos;ll build the dashboard using your theme config, wire up the research data, and add interactive charts with public access controls.</p>
          <p className="text-[#8e8b85]">Worked for <span className="text-[#b98145]">14m 22s</span></p>
          <p className="text-[#77746e]">Processed screen recording</p>
          <p>Done! Here&apos;s a walkthrough of the dashboard.</p>

          <div className="relative h-24 w-48 overflow-hidden rounded-md bg-[#aaa18d] sm:h-28 sm:w-56">
            <div className="absolute inset-2 flex overflow-hidden rounded-sm bg-[#191814] shadow-lg">
              <div className="w-12 border-r border-[#34322f] p-1.5">
                {[26, 18, 22, 16].map((width, index) => <div key={index} className="mb-1 h-1 bg-[#45423b]" style={{ width }} />)}
              </div>
              <div className="flex-1 p-2">
                {[70, 42, 58, 50, 65, 44].map((width, index) => <div key={index} className="mb-1.5 h-1 bg-[#35332d]" style={{ width: `${width}%` }} />)}
              </div>
            </div>
            <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70">
              <Play className="size-4 fill-white text-white" />
            </span>
          </div>

          <div>
            <p className="font-medium">Summary</p>
            <p className="mt-1">Built the interactive dashboard with realtime charts, data from Snowflake, and shadcn components. Deployed to staging via Vercel.</p>
          </div>

          <div className="mt-auto rounded-md border border-[#3a3833] bg-[#201f1b] p-2">
            <p className="text-[#9a9790]">Add a follow up...</p>
            <div className="mt-2 flex items-center justify-between text-[9px] text-[#99968f]">
              <span>∞ Agent⌄ &nbsp; Opus 5⌄</span>
              <span className="flex size-5 items-center justify-center rounded-full bg-[#36342f]"><ArrowUp className="size-3" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
