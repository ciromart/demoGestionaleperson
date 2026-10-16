import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Info, PackageCheck, X } from "lucide-react";
import clsx from "clsx";
import type { ToastItem, ToastVariant } from "../types";

interface ToastContextValue {
  pushToast: (toast: Omit<ToastItem, "id" | "duration"> & { duration?: number }) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT_STYLES: Record<
  ToastVariant,
  { icon: typeof Info; iconClass: string; barClass: string }
> = {
  info: {
    icon: PackageCheck,
    iconClass: "text-primary bg-blue-50",
    barClass: "bg-primary",
  },
  success: {
    icon: CheckCircle2,
    iconClass: "text-success bg-[var(--color-success-bg)]",
    barClass: "bg-success",
  },
  warning: {
    icon: Info,
    iconClass: "text-accent bg-amber-50",
    barClass: "bg-accent",
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [leaving, setLeaving] = useState<Record<string, boolean>>({});
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>[]>>({});

  const dismissToast = useCallback((id: string) => {
    setLeaving((prev) => ({ ...prev, [id]: true }));
    const removeTimer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      setLeaving((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 220);
    timers.current[id]?.push(removeTimer);
  }, []);

  const pushToast = useCallback(
    (toast: Omit<ToastItem, "id" | "duration"> & { duration?: number }) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const duration = toast.duration ?? 4200;
      const item: ToastItem = { ...toast, id, duration };
      setToasts((prev) => [...prev, item]);
      const dismissTimer = setTimeout(() => dismissToast(id), duration);
      timers.current[id] = [dismissTimer];
      return id;
    },
    [dismissToast],
  );

  return (
    <ToastContext.Provider value={{ pushToast, dismissToast }}>
      {children}
      {createPortal(
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed top-4 right-4 z-50 flex w-[min(380px,calc(100vw-2rem))] flex-col gap-2.5 sm:top-6 sm:right-6"
        >
          {toasts.map((toast) => {
            const variant = VARIANT_STYLES[toast.variant];
            const Icon = variant.icon;
            const isLeaving = leaving[toast.id];
            return (
              <div
                key={toast.id}
                className={clsx(
                  "pointer-events-auto relative overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-toast)]",
                  isLeaving ? "animate-toast-out" : "animate-toast-in",
                )}
              >
                <div className="flex items-start gap-3 p-4 pr-10">
                  <span
                    className={clsx(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                      variant.iconClass,
                    )}
                  >
                    <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-sm font-semibold text-foreground">{toast.title}</p>
                    <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">
                      {toast.message}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  aria-label="Chiudi notifica"
                  className="absolute top-3 right-3 cursor-pointer rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                  <X size={15} />
                </button>
                <div className="h-1 w-full bg-muted">
                  <div
                    className={clsx("h-full origin-left", variant.barClass, {
                      "animate-toast-progress": !isLeaving,
                    })}
                    style={{ animationDuration: `${toast.duration}ms` }}
                  />
                </div>
              </div>
            );
          })}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast deve essere usato dentro un ToastProvider");
  }
  return ctx;
}
