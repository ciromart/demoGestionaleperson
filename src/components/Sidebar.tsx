import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Settings,
  Boxes,
} from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, disabled: false },
  { to: "/clienti", label: "Clienti", icon: Users, disabled: false },
  { to: "/ordini", label: "Ordini", icon: ClipboardList, disabled: true },
  { to: "/magazzino", label: "Magazzino", icon: Boxes, disabled: true },
  { to: "/impostazioni", label: "Impostazioni", icon: Settings, disabled: true },
];

export function Sidebar({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <aside
      className={clsx(
        "flex h-full w-60 shrink-0 flex-col border-r border-border bg-surface",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-on-primary shadow-card">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 18V9.4a1 1 0 0 1 .9-1l6-.67a1 1 0 0 1 1.1 1V18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 18h16M13 18v-5.3a1 1 0 0 1 .72-.96l3-.86a1 1 0 0 1 1.28.96V18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.65"
            />
          </svg>
        </span>
        <div className="leading-tight">
          <p className="font-mono text-[15px] font-semibold tracking-tight text-foreground">
            Nimbus
          </p>
          <p className="text-[11px] font-medium text-muted-foreground">Gestionale</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2" aria-label="Navigazione principale">
        {NAV_ITEMS.map(({ to, label, icon: Icon, disabled }) => {
          if (disabled) {
            return (
              <div
                key={to}
                aria-disabled="true"
                title="Prossimamente"
                className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400"
              >
                <Icon size={18} strokeWidth={2} aria-hidden="true" />
                {label}
                <span className="ml-auto rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
                  presto
                </span>
              </div>
            );
          }
          return (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onNavigate}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "bg-primary text-on-primary shadow-card"
                    : "text-slate-600 hover:bg-muted hover:text-foreground",
                )
              }
            >
              <Icon size={18} strokeWidth={2} aria-hidden="true" />
              {label}
            </NavLink>
          );
        })}
      </nav>

      <div className="m-3 rounded-xl border border-border bg-background p-3.5">
        <p className="text-xs font-semibold text-foreground">Ciro Martino</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">Amministratore</p>
      </div>
    </aside>
  );
}
