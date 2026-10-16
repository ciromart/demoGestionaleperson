import { Menu, Search } from "lucide-react";

export function Topbar({
  title,
  subtitle,
  onMenuClick,
}: {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}) {
  return (
    <header className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3.5 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Apri menu di navigazione"
        className="cursor-pointer rounded-lg border border-border p-2 text-slate-600 transition-colors hover:bg-muted lg:hidden"
      >
        <Menu size={18} />
      </button>

      <div className="min-w-0">
        <h1 className="truncate text-[17px] font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="truncate text-[12.5px] text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="ml-auto hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground sm:flex">
        <Search size={15} aria-hidden="true" />
        <span className="text-[13px]">Cerca cliente, ordine…</span>
        <kbd className="ml-6 rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
          ⌘K
        </kbd>
      </div>

      <div
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-mono text-[13px] font-semibold text-on-primary"
      >
        CM
      </div>
    </header>
  );
}
