# Nimbus Gestionale

Web app gestionale (clienti, ordini) con palette blu/bianco, costruita con React + TypeScript + Vite + Tailwind CSS v4.

## Funzionalità

- **Dashboard** — panoramica KPI (clienti attivi, ordini, fatturato, tempi di evasione).
- **Clienti** — anagrafica clienti (ragione sociale, nome, cognome, cellulare, stato) con pulsante **"Avvia Demo"**: simula l'arrivo di 3 notifiche toast in tempo reale, scaglionate ogni 1,5 secondi, con il testo
  `Il cliente <ragione sociale> ha inserito <N> ordini per il/i giorno/i <data/e>.`
- Sidebar responsive, toast accessibili (`aria-live`), focus states, `prefers-reduced-motion` rispettato.

## Sviluppo

```bash
npm install
npm run dev       # avvia il dev server (http://localhost:5173)
npm run build     # build di produzione
```

## Video anteprima (Remotion)

La cartella `preview-video/` contiene un progetto Remotion separato che genera un breve video promozionale dell'app (logo, mockup pagina Clienti, notifiche toast). Vedi `preview-video/README.md`.
