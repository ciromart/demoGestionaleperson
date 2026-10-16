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

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = randomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Genera una sequenza di `count` clienti "sempre diversi": cicla la lista
 * rimescolata, evitando ripetizioni consecutive quando un ciclo finisce e
 * il successivo ricomincia.
 */
function buildClientSequence(clienti: Cliente[], count: number): Cliente[] {
  if (clienti.length === 0) return [];
  const sequence: Cliente[] = [];
  while (sequence.length < count) {
    const batch = shuffle(clienti);
    const previous = sequence[sequence.length - 1];
    if (previous && batch[0]?.id === previous.id && batch.length > 1) {
      [batch[0], batch[1]] = [batch[1], batch[0]];
    }
    sequence.push(...batch);
  }
  return sequence.slice(0, count);
}

export interface DemoScheduleItem {
  cliente: Cliente;
  delayMs: number;
}

export interface DemoScheduleOptions {
  /** Durata totale della demo, in millisecondi. */
  totalDurationMs: number;
  /** Numero di notifiche per gruppo. */
  groupSize: number;
  /** Intervallo tra una notifica e la successiva, all'interno di un gruppo. */
  itemDelayMs: number;
  /** Pausa aggiuntiva tra la fine di un gruppo e l'inizio del successivo. */
  groupDelayMs: number;
}

/**
 * Pianifica le notifiche della demo a gruppi: entro ogni gruppo le notifiche
 * sono scaglionate di `itemDelayMs`, e tra un gruppo e il successivo c'è una
 * pausa di `groupDelayMs`, per l'intera finestra `totalDurationMs`.
 */
export function buildDemoSchedule(
  clienti: Cliente[],
  { totalDurationMs, groupSize, itemDelayMs, groupDelayMs }: DemoScheduleOptions,
): DemoScheduleItem[] {
  const delays: number[] = [];
  let groupStart = 0;
  while (groupStart < totalDurationMs) {
    for (let j = 0; j < groupSize; j += 1) {
      const delay = groupStart + j * itemDelayMs;
      if (delay >= totalDurationMs) break;
      delays.push(delay);
    }
    groupStart += (groupSize - 1) * itemDelayMs + groupDelayMs;
  }

  const sequence = buildClientSequence(clienti, delays.length);
  return delays.map((delayMs, i) => ({ delayMs, cliente: sequence[i] }));
}
