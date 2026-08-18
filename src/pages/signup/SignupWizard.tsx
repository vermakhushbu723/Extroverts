import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WizardShell } from "../../components/wizard/WizardShell";
import { useSignupState } from "../../hooks/useSignupState";
import { ContactStep } from "./ContactStep";
import { NameStep } from "./NameStep";
import { BirthdayStep } from "./BirthdayStep";
import { PronounsStep } from "./PronounsStep";
import { SuccessScreen } from "./SuccessScreen";
import type { PronounOption } from "../../lib/types";

const STEP = { CONTACT: 0, NAME: 1, BIRTHDAY: 2, PRONOUNS: 3 } as const;

export function SignupWizard() {
  const { data, update, reset } = useSignupState();
  const [step, setStep] = useState<number>(data.verified ? STEP.NAME : STEP.CONTACT);
  const [completedName, setCompletedName] = useState<string | null>(null);
  const navigate = useNavigate();

  if (completedName !== null) {
    return (
      <WizardShell step={STEP.PRONOUNS} showStepper={false}>
        <SuccessScreen firstName={completedName} />
      </WizardShell>
    );
  }

  const goBack = () => {
    if (step === STEP.CONTACT) {
      navigate("/");
      return;
    }
    setStep((s) => s - 1);
  };

  return (
    <WizardShell step={step} onBack={goBack}>
      {step === STEP.CONTACT && (
        <ContactStep
          initialMethod={data.contactMethod}
          initialContact={data.contact}
          onVerified={(contact, method) => {
            update({ contact, contactMethod: method, verified: true });
            setStep(STEP.NAME);
          }}
        />
      )}

      {step === STEP.NAME && (
        <NameStep
          firstName={data.firstName}
          lastName={data.lastName}
          onContinue={(first, last) => {
            update({ firstName: first, lastName: last });
            setStep(STEP.BIRTHDAY);
          }}
        />
      )}

      {step === STEP.BIRTHDAY && (
        <BirthdayStep
          dobYear={data.dobYear}
          dobMonth={data.dobMonth}
          dobDay={data.dobDay}
          onContinue={(year, month, day) => {
            update({ dobYear: year, dobMonth: month, dobDay: day });
            setStep(STEP.PRONOUNS);
          }}
        />
      )}

      {step === STEP.PRONOUNS && (
        <PronounsStep
          pronoun={data.pronoun}
          customPronoun={data.customPronoun}
          agreedToTerms={data.agreedToTerms}
          onSubmit={async (pronoun: PronounOption, customPronoun: string, agreed: boolean) => {
            update({ pronoun, customPronoun, agreedToTerms: agreed });
            await new Promise((resolve) => window.setTimeout(resolve, 1100));

            if (Math.random() < 0.12) {
              return { ok: false };
            }

            const name = data.firstName;
            reset();
            setCompletedName(name);
            return { ok: true };
          }}
        />
      )}
    </WizardShell>
  );
}
