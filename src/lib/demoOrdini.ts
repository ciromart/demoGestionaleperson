import type { Cliente } from "../types";

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
});

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomDates(count: number): Date[] {
  const today = new Date();
  const offsets = new Set<number>();
  while (offsets.size < count) {
    offsets.add(randomInt(0, 13));
  }
  return Array.from(offsets)
    .sort((a, b) => a - b)
    .map((offset) => {
      const d = new Date(today);
      d.setDate(d.getDate() + offset);
      return d;
    });
}

function formatDateList(dates: Date[]): string {
  const formatted = dates.map((d) => dateFormatter.format(d));
  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return `${formatted[0]} e ${formatted[1]}`;
  return `${formatted.slice(0, -1).join(", ")} e ${formatted[formatted.length - 1]}`;
}

export interface OrdineNotifica {
  cliente: Cliente;
  numeroOrdini: number;
  date: Date[];
  messaggio: string;
}

/** Genera un numero casuale di ordini e una o più date, componendo il messaggio in italiano. */
export function generaNotificaOrdini(cliente: Cliente): OrdineNotifica {
  const numeroOrdini = randomInt(1, 14);
  const isMultiGiorno = numeroOrdini > 1 && Math.random() < 0.5;
  const numeroGiorni = isMultiGiorno ? randomInt(2, Math.min(3, numeroOrdini)) : 1;
  const date = pickRandomDates(numeroGiorni);

  const ordiniLabel = numeroOrdini === 1 ? "1 ordine" : `${numeroOrdini} ordini`;
  const giornoLabel = date.length === 1 ? "per il giorno" : "per i giorni";

  const messaggio = `Il cliente ${cliente.ragioneSociale} ha inserito ${ordiniLabel} ${giornoLabel} ${formatDateList(
    date,
  )}.`;

  return { cliente, numeroOrdini, date, messaggio };
}

/** Sceglie `count` clienti distinti a caso dalla lista (con ripetizione solo se necessario). */
export function pickRandomClienti(clienti: Cliente[], count: number): Cliente[] {
  if (clienti.length === 0) return [];
  const pool = [...clienti];
  const result: Cliente[] = [];
  for (let i = 0; i < count; i += 1) {
    if (pool.length === 0) pool.push(...clienti);
    const index = randomInt(0, pool.length - 1);
    result.push(pool.splice(index, 1)[0]);
  }
  return result;
}
