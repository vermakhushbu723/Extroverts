import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { AlertIcon, CheckCircleIcon, CloseIcon, SparkIcon } from "../icons/Icons";

type ToastKind = "error" | "success" | "info";
type ToastItem = { id: number; kind: ToastKind; title: string; description?: string };

type ToastContextValue = {
  push: (kind: ToastKind, title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const push = useCallback((kind: ToastKind, title: string, description?: string) => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, kind, title, description }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4600);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex flex-col items-center gap-2.5 px-4 pt-4 sm:top-5">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={`animate-fade-up pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border px-4 py-3.5 shadow-2xl backdrop-blur-xl ${
              t.kind === "error"
                ? "border-accent-500/30 bg-[#2a0f1e]/95 text-accent-100"
                : t.kind === "success"
                  ? "border-emerald-400/30 bg-[#0e2420]/95 text-emerald-100"
                  : "border-brand-400/30 bg-[#180f2c]/95 text-brand-100"
            }`}
          >
            <span className="mt-0.5 shrink-0">
              {t.kind === "error" ? (
                <AlertIcon size={18} className="text-accent-400" />
              ) : t.kind === "success" ? (
                <CheckCircleIcon size={18} className="text-emerald-400" />
              ) : (
                <SparkIcon size={18} className="text-brand-300" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-white">{t.title}</p>
              {t.description && (
                <p className="mt-0.5 text-[13px] leading-snug text-white/60">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white"
              aria-label="Dismiss notification"
            >
              <CloseIcon size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
