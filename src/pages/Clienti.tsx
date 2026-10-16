import { useEffect, useRef, useState } from "react";
import { PlayCircle, Phone, Building2, Loader2 } from "lucide-react";
import clsx from "clsx";
import { clienti } from "../data/clienti";
import { useToast } from "../components/ToastProvider";
import { generaNotificaOrdini, pickRandomClienti } from "../lib/demoOrdini";

const STATO_STYLES: Record<string, string> = {
  attivo: "bg-[var(--color-success-bg)] text-success",
  "in attesa": "bg-amber-50 text-accent",
  sospeso: "bg-[var(--color-destructive-bg)] text-destructive",
};

const DEMO_STEPS = 3;
const DEMO_DELAY_MS = 1500;

export function Clienti() {
  const { pushToast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);
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

    const target = pickRandomClienti(clienti, DEMO_STEPS);

    target.forEach((cliente, index) => {
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
        if (index === target.length - 1) {
          const stopRunning = setTimeout(() => setIsRunning(false), 200);
          timeoutsRef.current.push(stopRunning);
        }
      }, index * DEMO_DELAY_MS);

      timeoutsRef.current.push(timer);
    });
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5 p-4 sm:p-6">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-foreground">
            Demo notifiche nuovi ordini
          </h2>
          <p className="mt-1 max-w-md text-[13px] text-muted-foreground">
            Simula l'arrivo di 3 notifiche in tempo reale, una ogni 1,5 secondi, su
            clienti scelti a caso dall'elenco qui sotto.
          </p>
        </div>

        <button
          type="button"
          onClick={startDemo}
          disabled={isRunning}
          className={clsx(
            "flex min-w-[168px] cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-card transition-all duration-150",
            isRunning
              ? "cursor-not-allowed bg-blue-100 text-primary"
              : "bg-primary text-on-primary hover:bg-primary-dark active:scale-[0.98]",
          )}
          aria-live="polite"
        >
          {isRunning ? (
            <>
              <Loader2 size={17} className="animate-spin" aria-hidden="true" />
              Demo in corso… {completedSteps}/{DEMO_STEPS}
            </>
          ) : (
            <>
              <PlayCircle size={18} aria-hidden="true" />
              Avvia Demo
            </>
          )}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
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
    </div>
  );
}
