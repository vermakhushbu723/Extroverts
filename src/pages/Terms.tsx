import { Link } from "react-router-dom";
import { ArrowLeftIcon, ShieldIcon, SparkIcon } from "../components/icons/Icons";

const SECTIONS = [
  {
    id: "eligibility",
    title: "1. Eligibility",
    body: [
      "You must be at least 18 years old to create an Extroverts account. By signing up, you confirm that the date of birth you provide is accurate and that you meet this age requirement.",
      "We may ask you to verify your age or identity at any time, and may suspend accounts we reasonably believe belong to someone under 18.",
    ],
  },
  {
    id: "account",
    title: "2. Your account",
    body: [
      "You're responsible for the accuracy of the information on your profile, including your name, birthday, and pronouns, and for keeping your login method (email or phone) secure.",
      "One person, one account. Impersonating someone else, or creating an account on behalf of someone without their consent, is not allowed.",
    ],
  },
  {
    id: "conduct",
    title: "3. Community conduct",
    body: [
      "Extroverts exists to help real people meet up safely. Harassment, hate speech, threats, and soliciting money from other members will result in immediate suspension.",
      "Meetups arranged through the app are between members. Always meet in public places and trust your judgment — Extroverts does not supervise in-person hangouts.",
    ],
  },
  {
    id: "content",
    title: "4. Content you share",
    body: [
      "You keep ownership of the photos and text you add to your profile. By posting, you grant Extroverts a limited license to display that content within the app so other members can see it.",
      "Don't post content you don't have the rights to, or anything illegal, misleading, or sexually explicit involving minors.",
    ],
  },
  {
    id: "privacy",
    title: "5. Privacy",
    body: [
      "We collect the information you provide during sign-up (contact method, name, birthday, pronouns) to create and secure your profile, and to show your age — not your birth date — to other members.",
      "We never post to your contacts or other services without your explicit permission, and we don't sell your personal data to third parties.",
      "You can request a copy of your data or delete your account at any time from account settings.",
    ],
  },
  {
    id: "termination",
    title: "6. Suspension & termination",
    body: [
      "We may suspend or remove accounts that violate these terms, misrepresent age, or put other members at risk, with or without prior notice depending on severity.",
      "You may delete your account at any time; your profile will stop being shown to others immediately, though some data may be retained as required by law.",
    ],
  },
  {
    id: "changes",
    title: "7. Changes to these terms",
    body: [
      "We may update these terms as the product evolves. If a change is material, we'll let you know in the app before it takes effect.",
    ],
  },
];

export function Terms() {
  return (
    <div className="min-h-svh bg-ink-950 text-white">
      <header className="sticky top-0 z-20 border-b border-white/8 bg-ink-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2 text-[15px] font-extrabold">
            <ArrowLeftIcon size={17} className="text-white/50" />
            <SparkIcon size={16} className="text-accent-400" />
            Extroverts
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-2 text-[13px] font-semibold"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-white/50">
          <ShieldIcon size={13} />
          Last updated August 18, 2026
        </span>
        <h1 className="mt-4 text-[32px] font-extrabold tracking-tight sm:text-[40px]">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/55">
          These terms explain what we expect from you as a member of Extroverts, and what you
          can expect from us. Please read them before creating your profile.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] font-medium text-white/50 transition hover:border-white/25 hover:text-white"
            >
              {s.title}
            </a>
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-[19px] font-bold text-white">{s.title}</h2>
              <div className="mt-2.5 space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-[14.5px] leading-relaxed text-white/55">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <p className="text-[14.5px] text-white/60">
            By creating a profile, you agree to these terms and our privacy practices.
          </p>
          <Link
            to="/signup"
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 text-[14px] font-bold shadow-lg"
          >
            Continue to sign up
          </Link>
        </div>
      </main>
    </div>
  );
}
