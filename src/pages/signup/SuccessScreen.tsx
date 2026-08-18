import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { CheckCircleIcon, SparkIcon } from "../../components/icons/Icons";
import { useToast } from "../../components/ui/Toast";

export function SuccessScreen({ firstName }: { firstName: string }) {
  const toast = useToast();
  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 shadow-[0_8px_24px_-6px_rgba(139,61,255,0.6)]">
        <CheckCircleIcon size={30} className="text-white" />
      </div>
      <h1 className="mt-5 text-[24px] font-bold leading-tight text-white sm:text-[28px]">
        You're in, {firstName || "there"}!
      </h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-white/50">
        Your profile is live. Time to find your people and start the fun.
      </p>

      <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-white/70">
          <SparkIcon size={14} className="text-accent-400" />
          What's next
        </p>
        <ul className="mt-3 space-y-2.5 text-[13.5px] text-white/50">
          <li>• Add a few photos so people can recognize the real you</li>
          <li>• Tell us what kind of hangouts you're into</li>
          <li>• Turn on notifications so you never miss an invite</li>
        </ul>
      </div>

      <Button
        fullWidth
        className="mt-6"
        onClick={() =>
          toast.push(
            "info",
            "Demo complete",
            "This exercise ends at signup — the home feed isn't part of this build.",
          )
        }
      >
        Explore Extroverts
      </Button>
      <Link
        to="/"
        className="mt-4 inline-block text-[13px] font-medium text-white/40 hover:text-white/70"
      >
        Back to home
      </Link>
    </div>
  );
}
