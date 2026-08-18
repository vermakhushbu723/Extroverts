import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { TextField } from "../../components/ui/TextField";
import { CheckCircleIcon, PronounsIcon } from "../../components/icons/Icons";
import { useToast } from "../../components/ui/Toast";
import type { PronounOption } from "../../lib/types";

const OPTIONS: { value: PronounOption; label: string }[] = [
  { value: "she/her", label: "She / Her" },
  { value: "he/him", label: "He / Him" },
  { value: "they/them", label: "They / Them" },
  { value: "custom", label: "Write my own" },
];

const CUSTOM_MAX = 30;

export function PronounsStep({
  pronoun,
  customPronoun,
  agreedToTerms,
  onSubmit,
}: {
  pronoun: PronounOption | "";
  customPronoun: string;
  agreedToTerms: boolean;
  onSubmit: (
    pronoun: PronounOption,
    customPronoun: string,
    agreed: boolean,
  ) => Promise<{ ok: boolean }>;
}) {
  const [selected, setSelected] = useState<PronounOption | "">(pronoun);
  const [custom, setCustom] = useState(customPronoun);
  const [agreed, setAgreed] = useState(agreedToTerms);
  const [error, setError] = useState<string | null>(null);
  const [customError, setCustomError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    if (!selected) {
      setError("Select a pronoun option");
      hasError = true;
    } else {
      setError(null);
    }

    if (selected === "custom" && !custom.trim()) {
      setCustomError("Enter your pronouns");
      hasError = true;
    } else {
      setCustomError(null);
    }

    if (!agreed) {
      setTermsError("You must accept the Terms & Privacy Policy to continue");
      hasError = true;
    } else {
      setTermsError(null);
    }

    if (hasError) return;

    setSubmitting(true);
    const result = await onSubmit(selected as PronounOption, custom.trim(), agreed);
    setSubmitting(false);

    if (!result.ok) {
      toast.push(
        "error",
        "Couldn't create your profile",
        "Something went wrong on our end. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      <h1 className="text-[22px] font-bold leading-tight text-white sm:text-[26px]">
        Which pronouns do you use?
      </h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-white/50">
        Shown on your profile so others know how to refer to you.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Pronouns">
        {OPTIONS.map((opt) => {
          const active = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => {
                setSelected(opt.value);
                setError(null);
              }}
              className={`relative flex items-center gap-2 rounded-2xl border px-4 py-3.5 text-left text-[14px] font-semibold transition-colors ${
                active
                  ? "border-brand-400/70 bg-brand-500/15 text-white"
                  : "border-white/12 bg-white/[0.03] text-white/70 hover:border-white/25"
              }`}
            >
              <PronounsIcon size={16} className={active ? "text-brand-300" : "text-white/30"} />
              {opt.label}
              {active && (
                <CheckCircleIcon size={15} className="absolute top-2.5 right-2.5 text-brand-300" />
              )}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-[12.5px] font-medium text-accent-400 animate-fade-in">{error}</p>
      )}

      {selected === "custom" && (
        <div className="mt-4 animate-fade-in">
          <TextField
            label="Your pronouns"
            placeholder="e.g. xe/xem"
            value={custom}
            maxLength={CUSTOM_MAX}
            error={customError ?? undefined}
            charCount={{ current: custom.length, max: CUSTOM_MAX }}
            autoFocus
            onChange={(e) => {
              setCustom(e.target.value);
              if (customError) setCustomError(null);
            }}
          />
        </div>
      )}

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => {
            setAgreed(e.target.checked);
            if (e.target.checked) setTermsError(null);
          }}
          className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-brand-500"
        />
        <span className="text-[13px] leading-relaxed text-white/60">
          I agree to the{" "}
          <Link to="/terms" target="_blank" className="font-semibold text-brand-300 hover:underline">
            Terms &amp; Conditions
          </Link>{" "}
          and confirm the information I've provided is accurate.
        </span>
      </label>
      {termsError && (
        <p className="mt-2 text-[12.5px] font-medium text-accent-400 animate-fade-in">
          {termsError}
        </p>
      )}

      <Button type="submit" fullWidth loading={submitting} className="mt-6">
        Create my profile
      </Button>
    </form>
  );
}
