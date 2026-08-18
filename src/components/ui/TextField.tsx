import { forwardRef, useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { AlertIcon, CheckCircleIcon } from "../icons/Icons";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  success?: boolean;
  hint?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
  charCount?: { current: number; max: number };
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { label, error, success, hint, icon, trailing, charCount, className = "", id, ...rest },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const [focused, setFocused] = useState(false);

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-[13px] font-medium text-white/70"
        >
          {label}
        </label>
        <div
          className={`flex items-center gap-2.5 rounded-2xl border bg-white/[0.04] px-4 py-3.5 transition-colors ${
            error
              ? "border-accent-500/70"
              : success
                ? "border-emerald-400/60"
                : focused
                  ? "border-brand-400/80 shadow-[0_0_0_3px_rgba(139,61,255,0.18)]"
                  : "border-white/12 hover:border-white/20"
          }`}
        >
          {icon && <span className="shrink-0 text-white/40">{icon}</span>}
          <input
            id={inputId}
            ref={ref}
            className={`w-full min-w-0 bg-transparent text-[15px] text-white placeholder:text-white/30 outline-none ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            onFocus={(e) => {
              setFocused(true);
              rest.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              rest.onBlur?.(e);
            }}
            {...rest}
          />
          {success && !trailing && (
            <CheckCircleIcon size={18} className="shrink-0 text-emerald-400" />
          )}
          {trailing}
        </div>
        <div className="mt-1.5 flex items-start justify-between gap-2 min-h-[18px]">
          {error ? (
            <p
              id={`${inputId}-error`}
              className="flex items-center gap-1 text-[12.5px] font-medium text-accent-400 animate-fade-in"
            >
              <AlertIcon size={13} />
              {error}
            </p>
          ) : hint ? (
            <p id={`${inputId}-hint`} className="text-[12.5px] text-white/35">
              {hint}
            </p>
          ) : (
            <span />
          )}
          {charCount && (
            <span
              className={`shrink-0 text-[12px] tabular-nums ${
                charCount.current > charCount.max ? "text-accent-400" : "text-white/30"
              }`}
            >
              {charCount.current}/{charCount.max}
            </span>
          )}
        </div>
      </div>
    );
  },
);
TextField.displayName = "TextField";
