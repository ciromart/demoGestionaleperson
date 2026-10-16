# Nimbus — Video anteprima (Remotion)

Progetto Remotion indipendente che genera un breve video promozionale (1920×1080, 30fps, ~18s) dell'app Nimbus Gestionale: logo, mockup della pagina Clienti con il pulsante "Avvia Demo", le 3 notifiche toast scaglionate di 1,5s e una scena finale.

## Sviluppo

```bash
npm install
npx remotion studio src/index.ts   # editor interattivo
```

## Render

```bash
npm run render
```

Se il download automatico di Chromium non è disponibile nell'ambiente, specificare un binario esistente, ad esempio quello installato da Playwright:

```bash
npx remotion render src/index.ts NimbusPreview out/nimbus-preview.mp4 \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell \
  --ignore-certificate-errors
```

Il file renderizzato va in `out/` (non versionato).
