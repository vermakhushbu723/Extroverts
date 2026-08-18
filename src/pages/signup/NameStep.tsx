import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { TextField } from "../../components/ui/TextField";
import { UserIcon } from "../../components/icons/Icons";
import { validateName } from "../../lib/validation";

const MAX_LEN = 40;

export function NameStep({
  firstName,
  lastName,
  onContinue,
}: {
  firstName: string;
  lastName: string;
  onContinue: (first: string, last: string) => void;
}) {
  const [first, setFirst] = useState(firstName);
  const [last, setLast] = useState(lastName);
  const [firstError, setFirstError] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fErr = validateName(first, "first name");
    const lErr = last.trim() ? validateName(last, "last name") : null;
    setFirstError(fErr);
    setLastError(lErr);
    if (fErr || lErr) return;

    setSubmitting(true);
    await wait(500);
    setSubmitting(false);
    onContinue(first.trim(), last.trim());
  };

  return (
    <form onSubmit={submit} noValidate>
      <h1 className="text-[22px] font-bold leading-tight text-white sm:text-[26px]">
        What should we call you?
      </h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-white/50">
        This is how you'll appear to other people on Extroverts.
      </p>

      <div className="mt-6 space-y-4">
        <TextField
          label="First name"
          placeholder="Jordan"
          icon={<UserIcon size={18} />}
          value={first}
          maxLength={MAX_LEN}
          error={firstError ?? undefined}
          charCount={{ current: first.length, max: MAX_LEN }}
          autoFocus
          onChange={(e) => {
            setFirst(e.target.value);
            if (firstError) setFirstError(null);
          }}
        />
        <TextField
          label="Last name (optional)"
          placeholder="Rivera"
          icon={<UserIcon size={18} />}
          value={last}
          maxLength={MAX_LEN}
          error={lastError ?? undefined}
          onChange={(e) => {
            setLast(e.target.value);
            if (lastError) setLastError(null);
          }}
        />
      </div>

      <Button type="submit" fullWidth loading={submitting} className="mt-6">
        Continue
      </Button>
    </form>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
