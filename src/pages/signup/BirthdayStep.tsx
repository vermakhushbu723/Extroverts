import { useMemo, useRef, useState } from "react";
import { Button } from "../../components/ui/Button";
import { AlertIcon, CakeIcon, ShieldIcon } from "../../components/icons/Icons";
import { MIN_SIGNUP_AGE, validateDob } from "../../lib/validation";

export function BirthdayStep({
  dobYear,
  dobMonth,
  dobDay,
  onContinue,
}: {
  dobYear: string;
  dobMonth: string;
  dobDay: string;
  onContinue: (year: string, month: string, day: string) => void;
}) {
  const [day, setDay] = useState(dobDay);
  const [month, setMonth] = useState(dobMonth);
  const [year, setYear] = useState(dobYear);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  // Recomputed on every keystroke once touched, so the underage block and
  // its error clear themselves the moment the user corrects the date —
  // no separate state to fall out of sync with what's on screen.
  const preview = useMemo(() => {
    if (!touched) return null;
    return validateDob(year, month, day);
  }, [year, month, day, touched]);

  const error = preview?.error ?? null;
  const underage = preview?.age !== null && preview?.age !== undefined && preview.age < MIN_SIGNUP_AGE;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const result = validateDob(year, month, day);
    if (result.error) return;

    setSubmitting(true);
    await wait(500);
    setSubmitting(false);
    onContinue(year, month, day);
  };

  return (
    <form onSubmit={submit} noValidate>
      <h1 className="text-[22px] font-bold leading-tight text-white sm:text-[26px]">
        When's your birthday?
      </h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-white/50">
        Your age will be shown on your profile, not your birth date.
      </p>

      <div className="mt-6">
        <label className="mb-1.5 block text-[13px] font-medium text-white/70">
          Date of birth
        </label>
        <div className="grid grid-cols-3 gap-3">
          <DobBox
            placeholder="DD"
            value={day}
            maxLength={2}
            hasError={!!error}
            onChange={(v) => {
              setDay(v);
              if (v.length === 2) monthRef.current?.focus();
            }}
          />
          <DobBox
            inputRef={monthRef}
            placeholder="MM"
            value={month}
            maxLength={2}
            hasError={!!error}
            onChange={(v) => {
              setMonth(v);
              if (v.length === 2) yearRef.current?.focus();
            }}
          />
          <DobBox
            inputRef={yearRef}
            placeholder="YYYY"
            value={year}
            maxLength={4}
            hasError={!!error}
            onChange={setYear}
          />
        </div>

        <div className="mt-2 min-h-[20px]">
          {error && !underage ? (
            <p className="flex items-center gap-1 text-[12.5px] font-medium text-accent-400 animate-fade-in">
              <AlertIcon size={13} />
              {error}
            </p>
          ) : !error && preview?.age !== null && preview?.age !== undefined ? (
            <p className="flex items-center gap-1 text-[12.5px] text-white/40 animate-fade-in">
              <CakeIcon size={13} />
              You'll turn up as {preview.age} years old
            </p>
          ) : null}
        </div>
      </div>

      {underage && (
        <div className="mt-2 rounded-2xl border border-accent-500/25 bg-accent-500/10 p-4 animate-fade-in">
          <p className="text-[13.5px] font-semibold text-accent-100">
            You need to be {MIN_SIGNUP_AGE}+ to use Extroverts
          </p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-accent-200/70">
            This keeps our community safe for everyone. You're welcome to come back once
            you meet the age requirement — thanks for understanding.
          </p>
        </div>
      )}

      <p className="mt-4 flex items-start gap-1.5 text-[12px] leading-relaxed text-white/35">
        <ShieldIcon size={13} className="mt-0.5 shrink-0" />
        We verify age to keep the community safe. This won't be visible to other members.
      </p>

      <Button
        type="submit"
        fullWidth
        loading={submitting}
        disabled={underage}
        className="mt-6"
      >
        Continue
      </Button>
    </form>
  );
}

function DobBox({
  value,
  placeholder,
  maxLength,
  hasError,
  onChange,
  inputRef,
}: {
  value: string;
  placeholder: string;
  maxLength: number;
  hasError: boolean;
  onChange: (v: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, maxLength))}
      inputMode="numeric"
      placeholder={placeholder}
      maxLength={maxLength}
      aria-label={placeholder === "YYYY" ? "Year" : placeholder === "MM" ? "Month" : "Day"}
      className={`w-full rounded-2xl border bg-white/[0.04] px-3 py-3.5 text-center text-[16px] font-semibold text-white outline-none placeholder:text-white/25 transition-colors ${
        hasError ? "border-accent-500/70" : "border-white/12 focus:border-brand-400/70"
      }`}
    />
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
