import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/Button";
import { TextField } from "../../components/ui/TextField";
import { MailIcon, PhoneIcon, ShieldIcon } from "../../components/icons/Icons";
import { validateEmail, validateOtp, validatePhone } from "../../lib/validation";
import { useToast } from "../../components/ui/Toast";
import type { ContactMethod } from "../../lib/types";

const DEMO_CODE = "123456";
const RESEND_COOLDOWN = 30;

export function ContactStep({
  initialMethod,
  initialContact,
  onVerified,
  heading = "Let's get you in",
  subheading = "We'll text or email you a one-time code — no password to remember.",
}: {
  initialMethod: ContactMethod;
  initialContact: string;
  onVerified: (contact: string, method: ContactMethod) => void;
  heading?: string;
  subheading?: string;
}) {
  const [phase, setPhase] = useState<"enter" | "otp">("enter");
  const [method, setMethod] = useState<ContactMethod>(initialMethod);
  const [contact, setContact] = useState(initialContact);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const toast = useToast();

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = method === "email" ? validateEmail(contact) : validatePhone(contact);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setSending(true);
    await wait(900);
    setSending(false);
    setPhase("otp");
    toast.push(
      "success",
      "Code sent",
      `We sent a 6-digit code to ${maskContact(contact, method)}.`,
    );
  };

  if (phase === "otp") {
    return (
      <OtpStep
        method={method}
        contact={contact}
        onBack={() => setPhase("enter")}
        onVerified={() => onVerified(contact, method)}
      />
    );
  }

  return (
    <div>
      <h1 className="text-[22px] font-bold leading-tight text-white sm:text-[26px]">
        {heading}
      </h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-white/50">{subheading}</p>

      <div className="mt-6 mb-5 flex rounded-2xl border border-white/10 bg-white/[0.03] p-1">
        {(["email", "phone"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMethod(m);
              setContact("");
              setError(null);
            }}
            className={`flex-1 rounded-xl py-2.5 text-[13.5px] font-semibold capitalize transition-colors ${
              method === m ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <form onSubmit={submitContact} noValidate>
        {method === "email" ? (
          <TextField
            label="Email address"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            icon={<MailIcon size={18} />}
            value={contact}
            maxLength={254}
            error={error ?? undefined}
            onChange={(e) => {
              setContact(e.target.value);
              if (error) setError(null);
            }}
          />
        ) : (
          <TextField
            label="Phone number"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="98765 43210"
            icon={<PhoneIcon size={18} />}
            value={contact}
            maxLength={17}
            error={error ?? undefined}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/[^\d+\s-]/g, "");
              setContact(cleaned);
              if (error) setError(null);
            }}
          />
        )}

        <Button type="submit" fullWidth loading={sending} className="mt-5">
          Send code
        </Button>
      </form>

      <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[12px] text-white/35">
        <ShieldIcon size={13} />
        We never post without your permission.
      </p>
    </div>
  );
}

function OtpStep({
  method,
  contact,
  onBack,
  onVerified,
}: {
  method: ContactMethod;
  contact: string;
  onBack: () => void;
  onVerified: () => void;
}) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [shake, setShake] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const [resending, setResending] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const toast = useToast();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = window.setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearInterval(t);
  }, [cooldown]);

  const code = digits.join("");

  const handleChange = (index: number, raw: string) => {
    const value = raw.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError(null);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = Array(6).fill("");
    text.split("").forEach((d, i) => (next[i] = d));
    setDigits(next);
    const lastIndex = Math.min(text.length, 5);
    inputsRef.current[lastIndex]?.focus();
  };

  const verify = async () => {
    const err = validateOtp(code);
    if (err) {
      setError(err);
      triggerShake();
      return;
    }
    setVerifying(true);
    setError(null);
    await wait(1000);
    setVerifying(false);
    if (code !== DEMO_CODE) {
      setError("That code isn't right. Check the code and try again.");
      triggerShake();
      setDigits(Array(6).fill(""));
      inputsRef.current[0]?.focus();
      return;
    }
    onVerified();
  };

  const resend = async () => {
    setResending(true);
    await wait(700);
    setResending(false);
    setCooldown(RESEND_COOLDOWN);
    setDigits(Array(6).fill(""));
    inputsRef.current[0]?.focus();
    toast.push("success", "Code resent", `A new code was sent to ${maskContact(contact, method)}.`);
  };

  function triggerShake() {
    setShake(true);
    window.setTimeout(() => setShake(false), 400);
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-1 text-[13px] font-medium text-white/40 hover:text-white/70"
      >
        ← Edit {method}
      </button>
      <h1 className="text-[22px] font-bold leading-tight text-white sm:text-[26px]">
        Enter your code
      </h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-white/50">
        We sent a 6-digit code to{" "}
        <span className="font-semibold text-white/80">{maskContact(contact, method)}</span>.
      </p>

      <div
        className={`mt-6 flex justify-between gap-2 ${shake ? "animate-shake" : ""}`}
        onPaste={handlePaste}
      >
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Digit ${i + 1} of 6`}
            className={`h-13 w-full min-w-0 rounded-2xl border bg-white/[0.04] text-center text-xl font-bold text-white outline-none transition-colors ${
              error
                ? "border-accent-500/70"
                : d
                  ? "border-brand-400/70"
                  : "border-white/12 focus:border-brand-400/70"
            }`}
            style={{ height: "3.25rem" }}
          />
        ))}
      </div>

      {error && (
        <p className="mt-3 text-center text-[12.5px] font-medium text-accent-400">{error}</p>
      )}

      <p className="mt-4 rounded-xl border border-brand-400/20 bg-brand-500/10 px-3 py-2 text-center text-[12px] text-brand-200">
        Demo mode — enter <span className="font-mono font-semibold">123456</span> to continue
      </p>

      <Button
        fullWidth
        className="mt-5"
        loading={verifying}
        disabled={code.length !== 6}
        onClick={verify}
      >
        Verify &amp; continue
      </Button>

      <div className="mt-4 text-center text-[13px] text-white/40">
        {cooldown > 0 ? (
          <span>Resend code in {cooldown}s</span>
        ) : (
          <button
            onClick={resend}
            disabled={resending}
            className="font-semibold text-brand-300 hover:text-brand-200 disabled:opacity-50"
          >
            {resending ? "Resending…" : "Resend code"}
          </button>
        )}
      </div>
    </div>
  );
}

function maskContact(contact: string, method: ContactMethod) {
  if (method === "email") {
    const [user, domain] = contact.split("@");
    if (!domain) return contact;
    const visible = user.slice(0, Math.min(2, user.length));
    return `${visible}${"•".repeat(Math.max(user.length - 2, 1))}@${domain}`;
  }
  const digits = contact.replace(/\D/g, "");
  return `••• ••• ${digits.slice(-4)}`;
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
