import { Link } from "react-router-dom";
import {
  AppleMark,
  ArrowRightIcon,
  CheckCircleIcon,
  PlayMark,
  ShieldIcon,
  SparkIcon,
  UserIcon,
} from "../components/icons/Icons";

export function Landing() {
  return (
    <div className="relative overflow-hidden bg-ink-950 text-white">
      <GlobalBackdrop />
      <Nav />
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <CtaBand />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="relative z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2 text-[17px] font-extrabold tracking-tight">
          <SparkIcon size={20} className="text-accent-400" />
          Extroverts
        </div>
        <nav className="hidden items-center gap-8 text-[14px] font-medium text-white/60 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#how-it-works" className="transition hover:text-white">How it works</a>
          <Link to="/terms" className="transition hover:text-white">Terms</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-[14px] font-semibold text-white/70 transition hover:text-white sm:block"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-5 py-2.5 text-[14px] font-semibold shadow-[0_6px_20px_-6px_rgba(139,61,255,0.7)] transition hover:brightness-110"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 pt-8 pb-20 sm:px-8 md:grid-cols-2 md:pt-16 md:pb-28">
      <div className="animate-fade-up">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[12.5px] font-semibold tracking-wide text-white/60">
          <SparkIcon size={13} className="text-accent-400" />
          Party • Hangout • Vibe
        </span>
        <h1 className="mt-5 text-[38px] font-extrabold leading-[1.08] tracking-tight sm:text-[50px]">
          Find your people for
          <span className="brand-gradient-text"> real-life hangouts</span>
        </h1>
        <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/55">
          Extroverts connects you with verified people nearby who actually want to
          go out — parties, gigs, road trips, spontaneous plans. No endless swiping,
          just real vibes.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 px-7 py-4 text-[15px] font-bold shadow-[0_10px_30px_-8px_rgba(139,61,255,0.7)] transition hover:brightness-110"
          >
            Create your profile
            <ArrowRightIcon size={18} className="transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/login"
            className="text-[14.5px] font-semibold text-white/60 transition hover:text-white"
          >
            Already have an account?
          </Link>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <StoreBadge Icon={AppleMark} eyebrow="Download on the" name="App Store" />
          <StoreBadge Icon={PlayMark} eyebrow="Get it on" name="Google Play" />
        </div>
      </div>

      <div className="relative flex justify-center md:justify-end">
        <PhonePreview />
      </div>
    </section>
  );
}

function StoreBadge({
  Icon,
  eyebrow,
  name,
}: {
  Icon: typeof AppleMark;
  eyebrow: string;
  name: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => e.preventDefault()}
      className="flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2 text-left transition hover:bg-white/[0.08]"
      aria-label={`${eyebrow} ${name} (demo — not a live link)`}
    >
      <Icon size={22} />
      <span className="leading-tight">
        <span className="block text-[9.5px] uppercase tracking-wide text-white/40">
          {eyebrow}
        </span>
        <span className="block text-[13px] font-semibold text-white/85">{name}</span>
      </span>
    </button>
  );
}

function PhonePreview() {
  return (
    <div className="relative w-full max-w-[300px] animate-fade-up [animation-delay:120ms]">
      <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-600/30 to-accent-500/20 blur-3xl" />
      <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-2.5 shadow-2xl">
        <div className="rounded-[2rem] border border-white/10 bg-ink-900 p-5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold">Nearby tonight</span>
            <SparkIcon size={14} className="text-accent-400" />
          </div>

          <div className="mt-4 space-y-3">
            {[
              { name: "Rooftop mixer", tag: "12 going · 0.8 mi", pct: "92%" },
              { name: "Live jazz night", tag: "6 going · 1.4 mi", pct: "87%" },
              { name: "Street food crawl", tag: "21 going · 2.1 mi", pct: "95%" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-brand-400 to-accent-400" />
                  <div>
                    <p className="text-[12.5px] font-semibold text-white/90">{item.name}</p>
                    <p className="text-[11px] text-white/40">{item.tag}</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-400">{item.pct}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 py-3 text-[12.5px] font-bold">
            <UserIcon size={14} />
            Join the vibe
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialProof() {
  return (
    <section className="relative z-10 border-y border-white/8 bg-white/[0.02] py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-center text-[13px] font-medium text-white/40 sm:px-8">
        <span><span className="font-bold text-white/80">250K+</span> members</span>
        <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
        <span><span className="font-bold text-white/80">4.7</span> average rating</span>
        <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
        <span><span className="font-bold text-white/80">40K+</span> hangouts hosted monthly</span>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    Icon: ShieldIcon,
    title: "Verified, real people",
    body: "Every profile goes through ID and photo verification — no bots, no catfish.",
  },
  {
    Icon: SparkIcon,
    title: "Plans, not just chats",
    body: "Match around actual hangouts happening near you, not just a swipe.",
  },
  {
    Icon: UserIcon,
    title: "Your vibe, your call",
    body: "Set your interests and pronouns, and control exactly who can reach you.",
  },
];

function Features() {
  return (
    <section id="features" className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-[28px] font-extrabold tracking-tight sm:text-[34px]">
          Built for people who actually want to
          <span className="brand-gradient-text"> go out</span>
        </h2>
        <p className="mt-3 text-[15px] text-white/50">
          Everything about Extroverts is designed to get you from "hey" to "let's go" faster.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {FEATURES.map(({ Icon, title, body }) => (
          <div
            key={title}
            className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 transition hover:bg-white/[0.05]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/25 to-accent-500/25">
              <Icon size={20} className="text-brand-200" />
            </div>
            <h3 className="mt-4 text-[16px] font-bold text-white">{title}</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/50">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  { title: "Verify in seconds", body: "Confirm your email or phone with a one-time code." },
  { title: "Build your profile", body: "Add your name, age, and pronouns — takes under a minute." },
  { title: "Start hanging out", body: "Browse plans nearby and RSVP to the ones that match your vibe." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 bg-white/[0.02] py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-center text-[28px] font-extrabold tracking-tight sm:text-[34px]">
          Up and running in three steps
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative">
              <span className="text-[13px] font-extrabold text-brand-300">
                0{i + 1}
              </span>
              <h3 className="mt-2 text-[17px] font-bold text-white">{step.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/50">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-brand-600/40 to-accent-600/30 px-6 py-14 text-center sm:px-16">
        <h2 className="text-[26px] font-extrabold tracking-tight sm:text-[32px]">
          Your next hangout is a tap away
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-white/70">
          Join in under two minutes. Cancel or edit your profile anytime.
        </p>
        <Link
          to="/signup"
          className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-[15px] font-bold text-ink-950 shadow-xl transition hover:brightness-95"
        >
          <CheckCircleIcon size={18} />
          Get Started — it's free
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-2 text-[15px] font-extrabold">
          <SparkIcon size={16} className="text-accent-400" />
          Extroverts
        </div>
        <div className="flex items-center gap-6 text-[13.5px] text-white/45">
          <Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
          <Link to="/terms#privacy" className="hover:text-white">Privacy</Link>
          <Link to="/signup" className="hover:text-white">Sign up</Link>
        </div>
        <p className="text-[12.5px] text-white/30">© 2026 Extroverts. All rights reserved.</p>
      </div>
    </footer>
  );
}

function GlobalBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-1/4 h-[30rem] w-[30rem] rounded-full bg-brand-600/25 blur-[130px]" />
      <div className="absolute top-40 -right-40 h-[26rem] w-[26rem] rounded-full bg-accent-500/20 blur-[130px]" />
    </div>
  );
}
