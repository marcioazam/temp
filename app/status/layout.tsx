export default function StatusLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-status-background">{children}</div>
}
