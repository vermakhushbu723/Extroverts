import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WizardShell } from "../components/wizard/WizardShell";
import { ContactStep } from "./signup/ContactStep";
import { CheckCircleIcon } from "../components/icons/Icons";
import { Button } from "../components/ui/Button";

export function Login() {
  const [welcomed, setWelcomed] = useState<string | null>(null);
  const navigate = useNavigate();

  if (welcomed) {
    return (
      <WizardShell step={0} showStepper={false} onBack={() => navigate("/")}>
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 shadow-[0_8px_24px_-6px_rgba(139,61,255,0.6)]">
            <CheckCircleIcon size={30} className="text-white" />
          </div>
          <h1 className="mt-5 text-[24px] font-bold text-white sm:text-[28px]">Welcome back!</h1>
          <p className="mt-2 text-[14.5px] leading-relaxed text-white/50">
            You're signed in as{" "}
            <span className="font-semibold text-white/80">{welcomed}</span>.
          </p>
          <Button fullWidth className="mt-7" onClick={() => navigate("/")}>
            Continue
          </Button>
        </div>
      </WizardShell>
    );
  }

  return (
    <WizardShell step={0} showStepper={false} onBack={() => navigate("/")}>
      <ContactStep
        initialMethod="email"
        initialContact=""
        heading="Welcome back"
        subheading="Log in with a one-time code — no password needed."
        onVerified={(contact) => setWelcomed(contact)}
      />
    </WizardShell>
  );
}
