import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, SparkIcon } from "../icons/Icons";
import { ProgressStepper } from "../ui/ProgressStepper";
import { WIZARD_STEP_COUNT } from "../../lib/types";

export function WizardShell({
  step,
  onBack,
  children,
  showStepper = true,
}: {
  step: number;
  onBack?: () => void;
  children: ReactNode;
  showStepper?: boolean;
}) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-ink-950">
      <Backdrop />

      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10"
            aria-label="Go back"
          >
            <ArrowLeftIcon size={18} />
          </button>
        ) : (
          <span className="w-10" />
        )}
        <Link to="/" className="flex items-center gap-1.5 text-[15px] font-bold tracking-tight text-white">
          <SparkIcon size={18} className="text-accent-400" />
          Extroverts
        </Link>
        <span className="w-10" />
      </header>

      <main className="relative z-10 flex flex-1 items-start justify-center px-5 pb-10 sm:items-center">
        <div className="w-full max-w-md">
          {showStepper && (
            <div className="mb-7">
              <ProgressStepper step={step} total={WIZARD_STEP_COUNT} />
            </div>
          )}

          <div className="glass-card animate-fade-up rounded-3xl p-6 shadow-2xl sm:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-brand-600/30 blur-[100px]" />
      <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-accent-500/20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-brand-400/15 blur-[110px]" />
    </div>
  );
}
