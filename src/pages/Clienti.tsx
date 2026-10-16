import { useEffect, useRef, useState } from "react";
import { PlayCircle, Phone, Building2, Loader2 } from "lucide-react";
import clsx from "clsx";
import { clienti } from "../data/clienti";
import { useToast } from "../components/ToastProvider";
import { buildDemoSchedule, generaNotificaOrdini } from "../lib/demoOrdini";

const STATO_STYLES: Record<string, string> = {
  attivo: "bg-[var(--color-success-bg)] text-success",
  "in attesa": "bg-amber-50 text-accent",
  sospeso: "bg-[var(--color-destructive-bg)] text-destructive",
};

// La demo invia notifiche per 30s, a gruppi di 3: 2s di distanza tra una
// notifica e l'altra dello stesso gruppo, 2s di pausa tra un gruppo e il
// successivo (per i valori scelti la cadenza risulta di fatto costante).
const DEMO_SCHEDULE_OPTIONS = {
  totalDurationMs: 30_000,
  groupSize: 3,
  itemDelayMs: 2_000,
  groupDelayMs: 2_000,
} as const;

export function Clienti() {
  const { pushToast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [highlighted, setHighlighted] = useState<Record<string, boolean>>({});
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  function startDemo() {
    if (isRunning) return;
    setIsRunning(true);
    setCompletedSteps(0);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    const schedule = buildDemoSchedule(clienti, DEMO_SCHEDULE_OPTIONS);
    setTotalSteps(schedule.length);

    schedule.forEach(({ cliente, delayMs }, index) => {
      const timer = setTimeout(() => {
        const notifica = generaNotificaOrdini(cliente);

        pushToast({
          title: "Nuovi ordini ricevuti",
          message: notifica.messaggio,
          variant: "info",
        });

        setHighlighted((prev) => ({ ...prev, [cliente.id]: true }));
        const clearHighlight = setTimeout(() => {
          setHighlighted((prev) => {
            const next = { ...prev };
            delete next[cliente.id];
            return next;
          });
        }, 1400);
        timeoutsRef.current.push(clearHighlight);

        setCompletedSteps(index + 1);
        if (index === schedule.length - 1) {
          const stopRunning = setTimeout(() => setIsRunning(false), 200);
          timeoutsRef.current.push(stopRunning);
        }
      }, delayMs);

      timeoutsRef.current.push(timer);
    });
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-3 sm:space-y-5 sm:p-6">
      {/* Demo card: si nasconde durante la demo per lasciare spazio alle notifiche */}
      <div
        className={clsx(
          "grid transition-all duration-300 ease-out",
          isRunning ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-card sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
            <div>
              <h2 className="text-[15px] font-semibold text-foreground">
                Demo notifiche nuovi ordini
              </h2>
              <p className="mt-1 max-w-md text-[13px] text-muted-foreground">
                Simula per 30 secondi l'arrivo di notifiche in tempo reale, a gruppi di
                3 ogni 2 secondi, su clienti sempre diversi scelti dall'elenco qui
                sotto.
              </p>
            </div>

            <button
              type="button"
              onClick={startDemo}
              disabled={isRunning}
              className="flex w-full min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary shadow-card transition-all duration-150 hover:bg-primary-dark active:scale-[0.98] disabled:cursor-not-allowed sm:w-auto sm:min-w-[168px]"
            >
              <PlayCircle size={18} aria-hidden="true" />
              Avvia Demo
            </button>
          </div>
        </div>
      </div>

      {/* Stato compatto mostrato al posto della card durante la demo */}
      <div
        className={clsx(
          "grid transition-all duration-300 ease-out",
          isRunning ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
        aria-live="polite"
      >
        <div className="overflow-hidden">
          <div className="flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-primary shadow-card">
            <Loader2 size={17} className="shrink-0 animate-spin" aria-hidden="true" />
            Demo in corso… ricezione notifica {completedSteps}/{totalSteps}
          </div>
        </div>
      </div>

      {/* Tabella — da sm in su */}
      <div className="hidden overflow-hidden rounded-xl border border-border bg-surface shadow-card sm:block">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-5 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Ragione sociale
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Nome
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Cognome
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Cellulare
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Stato
                </th>
              </tr>
            </thead>
            <tbody>
              {clienti.map((cliente) => (
                <tr
                  key={cliente.id}
                  className={clsx(
                    "border-b border-border text-sm transition-colors duration-300 last:border-b-0",
                    highlighted[cliente.id] ? "bg-blue-50" : "hover:bg-background",
                  )}
                >
                  <td className="px-5 py-3.5 font-medium text-foreground">
                    <span className="flex items-center gap-2">
                      <Building2
                        size={15}
                        className="shrink-0 text-slate-400"
                        aria-hidden="true"
                      />
                      {cliente.ragioneSociale}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-700">{cliente.nome}</td>
                  <td className="px-5 py-3.5 text-slate-700">{cliente.cognome}</td>
                  <td className="px-5 py-3.5 text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Phone size={14} className="text-slate-400" aria-hidden="true" />
                      {cliente.cellulare}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={clsx(
                        "rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
                        STATO_STYLES[cliente.stato],
                      )}
                    >
                      {cliente.stato}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Elenco a card — sotto sm, nessuno scroll orizzontale */}
      <div className="space-y-2.5 sm:hidden">
        {clienti.map((cliente) => (
          <div
            key={cliente.id}
            className={clsx(
              "rounded-xl border border-border bg-surface p-4 shadow-card transition-colors duration-300",
              highlighted[cliente.id] && "bg-blue-50",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex items-start gap-2 text-[15px] font-semibold text-foreground">
                <Building2
                  size={16}
                  className="mt-0.5 shrink-0 text-slate-400"
                  aria-hidden="true"
                />
                {cliente.ragioneSociale}
              </span>
              <span
                className={clsx(
                  "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
                  STATO_STYLES[cliente.stato],
                )}
              >
                {cliente.stato}
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 pl-6 text-[13.5px] text-slate-600">
              <span>
                {cliente.nome} {cliente.cognome}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={13} className="text-slate-400" aria-hidden="true" />
                {cliente.cellulare}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
