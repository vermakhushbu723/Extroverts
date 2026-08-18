import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
  icon?: ReactNode;
};

export function Button({
  loading,
  variant = "primary",
  fullWidth,
  icon,
  className = "",
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-2xl font-semibold text-[15px] px-6 py-3.5 transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300";

  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-[0_8px_24px_-8px_rgba(139,61,255,0.65)] hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100",
    secondary:
      "bg-white/8 text-white border border-white/15 hover:bg-white/12 disabled:opacity-40",
    ghost: "text-white/70 hover:text-white hover:bg-white/5 disabled:opacity-40",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      <span className={`inline-flex items-center gap-2 ${loading ? "invisible" : ""}`}>
        {icon}
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      )}
    </button>
  );
}

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-5 w-5 animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
