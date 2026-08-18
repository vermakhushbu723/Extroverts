export function ProgressStepper({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const state = i < step ? "done" : i === step ? "active" : "upcoming";
          return (
            <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full bg-gradient-to-r from-brand-400 to-accent-400 transition-all duration-500 ease-out ${
                  state === "done" ? "w-full" : state === "active" ? "w-1/2" : "w-0"
                }`}
              />
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-[12.5px] font-medium tracking-wide text-white/40">
        Step {Math.min(step + 1, total)} of {total}
      </p>
    </div>
  );
}
