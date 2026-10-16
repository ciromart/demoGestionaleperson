export interface Cliente {
  id: string;
  ragioneSociale: string;
  nome: string;
  cognome: string;
  cellulare: string;
  citta: string;
  stato: "attivo" | "in attesa" | "sospeso";
}

export type ToastVariant = "info" | "success" | "warning";

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}
