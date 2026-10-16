import { Users, ClipboardList, TrendingUp, Clock } from "lucide-react";
import { clienti } from "../data/clienti";

const STATS = [
  {
    label: "Clienti attivi",
    value: clienti.filter((c) => c.stato === "attivo").length,
    icon: Users,
    delta: "+2 questo mese",
  },
  {
    label: "Ordini in corso",
    value: 37,
    icon: ClipboardList,
    delta: "+12% vs settimana scorsa",
  },
  {
    label: "Fatturato mensile",
    value: "€ 48.200",
    icon: TrendingUp,
    delta: "+6,4%",
  },
  {
    label: "Tempo medio evasione",
    value: "1,8 gg",
    icon: Clock,
    delta: "-0,3 gg",
  },
];

export function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon, delta }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-surface p-4 shadow-card transition-shadow duration-200 hover:shadow-card-hover"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{label}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-primary">
                <Icon size={16} aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 font-mono text-2xl font-semibold tracking-tight text-foreground">
              {value}
            </p>
            <p className="mt-1 text-[12px] font-medium text-success">{delta}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Benvenuto nel gestionale Nimbus
            </h2>
            <p className="mt-1 max-w-xl text-[13.5px] text-muted-foreground">
              Tieni sotto controllo clienti, ordini e notifiche in tempo reale. Vai alla
              sezione <span className="font-medium text-foreground">Clienti</span> per
              consultare l'anagrafica e provare la demo delle notifiche di nuovi ordini.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {clienti.slice(0, 3).map((cliente) => (
            <div
              key={cliente.id}
              className="rounded-lg border border-border bg-background p-3.5"
            >
              <p className="truncate text-sm font-semibold text-foreground">
                {cliente.ragioneSociale}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {cliente.nome} {cliente.cognome} · {cliente.citta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
