# Nimbus Gestionale

Web app gestionale (clienti, ordini) con palette blu/bianco, costruita con React + TypeScript + Vite + Tailwind CSS v4.

## Funzionalità

- **Dashboard** — panoramica KPI (clienti attivi, ordini, fatturato, tempi di evasione).
- **Clienti** — anagrafica clienti (ragione sociale, nome, cognome, cellulare, stato) con pulsante **"Avvia Demo"**: simula per 30 secondi l'arrivo di notifiche toast in tempo reale a gruppi di 3 (2s tra una notifica e l'altra, 2s tra un gruppo e il successivo), su clienti sempre diversi, con il testo
  `Il cliente <ragione sociale> ha inserito <N> ordini per il/i giorno/i <data/e>.`
- Sidebar responsive, toast accessibili (`aria-live`), focus states, `prefers-reduced-motion` rispettato.
- **PWA installabile**: manifest + service worker (via `vite-plugin-pwa`), icone per Android/iOS/desktop, funziona offline e supporta "Aggiungi a schermata Home" da browser mobile.

## Sviluppo

```bash
npm install
npm run dev       # avvia il dev server (http://localhost:5173)
npm run build     # build di produzione
```

## Video anteprima (Remotion)

La cartella `preview-video/` contiene un progetto Remotion separato che genera un breve video promozionale dell'app (logo, mockup pagina Clienti, notifiche toast). Vedi `preview-video/README.md`.
