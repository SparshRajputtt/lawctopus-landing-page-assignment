import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  User,
  Briefcase,
  Scale,
  Globe,
  Users,
  PenTool,
  MessageSquare,
  FileCheck,
  Target,
  Layers,
  BookOpen,
  Clock,
  Award,
  Star,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ChevronDown,
  FileText,
  Shield,
  Handshake,
  Mail,
  TrendingUp,
  Zap,
  Sparkles,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   Animation presets — match Hero exactly
   ────────────────────────────────────────────────────────────── */
const EASE_OUT = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: EASE_OUT },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: EASE_OUT },
});

const staggerContainer = (stagger = 0.08, delay = 0) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  },
});

const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/* ──────────────────────────────────────────────────────────────
   Data
   ────────────────────────────────────────────────────────────── */

const audienceCards = [
  {
    icon: GraduationCap,
    title: "Law Students",
    desc: "Still in law school, unsure how real contracts are drafted beyond textbooks.",
    outcome: "Graduate with practical skills your peers don't have.",
  },
  {
    icon: User,
    title: "Fresh Graduates",
    desc: "Newly called to the bar. Need employable skills that law school didn't teach.",
    outcome: "Walk into interviews with a portfolio of drafted contracts.",
  },
  {
    icon: Briefcase,
    title: "Junior Associates",
    desc: "Working at a firm but struggling with independent drafting and client work.",
    outcome: "Handle contract matters with minimal supervision.",
  },
  {
    icon: Scale,
    title: "Independent Lawyers",
    desc: "Practicing alone and need to offer contract services to grow your practice.",
    outcome: "Expand your practice into commercial contract drafting.",
  },
  {
    icon: Globe,
    title: "Aspiring Freelancers",
    desc: "Want to freelance in legal work but don't know where to begin or how to price.",
    outcome: "Land your first freelance contract drafting project.",
  },
];

const differentiators = [
  {
    icon: Users,
    title: "Live Cohort Learning",
    desc: "Join live sessions with a small group. Ask questions in real time. Learn together.",
  },
  {
    icon: PenTool,
    title: "Real Contract Drafting",
    desc: "You will draft actual contracts — NDAs, service agreements, employment contracts — not watch someone else do it.",
  },
  {
    icon: FileCheck,
    title: "Practical Assignments",
    desc: "Every module ends with an assignment reviewed by mentors. Not multiple-choice quizzes.",
  },
  {
    icon: MessageSquare,
    title: "Personal Feedback",
    desc: "Get line-by-line feedback on your drafts from lawyers who have done this for years.",
  },
  {
    icon: Layers,
    title: "Portfolio Creation",
    desc: "By the end, you have a body of work you can show employers and clients.",
  },
  {
    icon: Target,
    title: "Freelancing Guidance",
    desc: "Learn how to find clients, price your work, and build a freelance legal practice.",
  },
];

const beforeAfter = {
  before: [
    "Unsure how contracts actually work in practice",
    "No hands-on drafting experience",
    "No confidence to take on freelance work",
    "Empty portfolio with nothing to show employers",
    "Limited career options beyond generic roles",
  ],
  after: [
    "Draft commercial contracts with professional confidence",
    "Build a client-ready portfolio of real agreements",
    "Freelance independently and price your work fairly",
    "Understand commercial drafting better than most juniors",
    "Handle real client work from day one",
  ],
};

const journeySteps = [
  { week: "Week 1–2", label: "Fundamentals", desc: "Contract structure, key clauses, and legal language." },
  { week: "Week 3–4", label: "Core Drafting", desc: "NDAs, service agreements, and employment contracts." },
  { week: "Week 5–6", label: "Advanced Work", desc: "Commercial leases, IP assignments, and complex clauses." },
  { week: "Week 7–8", label: "Portfolio & Freelance", desc: "Build your portfolio. Learn client acquisition and pricing." },
];

const curriculum = [
  { icon: FileText, title: "Contract Drafting Fundamentals", desc: "Structure, language, and essential clauses that every contract needs." },
  { icon: Shield, title: "NDAs & Confidentiality", desc: "Draft ironclad non-disclosure agreements for any industry." },
  { icon: Handshake, title: "Service Agreements", desc: "Master the most common contract in freelance legal work." },
  { icon: Briefcase, title: "Employment Contracts", desc: "Understand terms, restrictions, and employer obligations." },
  { icon: Layers, title: "Commercial Contracts", desc: "Supply, distribution, and vendor agreements made practical." },
  { icon: Globe, title: "Freelancing Workflow", desc: "How to find clients, scope work, and deliver professionally." },
  { icon: Mail, title: "Client Communication", desc: "Write emails and proposals that win trust and close deals." },
  { icon: TrendingUp, title: "Negotiation Basics", desc: "Protect your client's interests without killing the deal." },
];

const outcomes = [
  "Draft contracts that lawyers and clients take seriously",
  "Build a portfolio you can show in any interview",
  "Freelance with confidence and clear pricing",
  "Improve your employability in law firms and companies",
  "Understand commercial agreements from a business perspective",
  "Develop practical skills that textbooks never teach",
];

/* ──────────────────────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────────────────────── */

function SectionHeader({ eyebrow, title, subtitle, delay = 0 }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <motion.div
          {...fadeUp(delay)}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500"
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        {...fadeUp(delay + 0.1)}
        className="text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          {...fadeUp(delay + 0.2)}
          className="mt-4 text-base leading-relaxed text-stone-500 sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

function AudienceCard({ card, index }) {
  const Icon = card.icon;
  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group relative overflow-hidden rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100 text-stone-600 transition-colors group-hover:bg-stone-900 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-stone-900">{card.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone-500">{card.desc}</p>
      <div className="mt-4 border-t border-stone-100 pt-4">
        <p className="text-sm font-medium text-stone-700">{card.outcome}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-stone-900 opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}

function DifferentiatorCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600 transition-colors group-hover:bg-stone-900 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-stone-900">{item.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-stone-500">{item.desc}</p>
      </div>
    </motion.div>
  );
}

function BeforeAfterSection() {
  return (
    <motion.div
      {...staggerContainer(0.1, 0.3)}
      className="grid gap-8 lg:grid-cols-3 lg:gap-6"
    >
      {/* Before */}
      <motion.div variants={staggerChild} className="rounded-xl border border-red-100 bg-red-50/40 p-6">
        <div className="mb-5 flex items-center gap-2">
          <XCircle className="h-5 w-5 text-red-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-red-800">Before Joining</h3>
        </div>
        <ul className="space-y-3">
          {beforeAfter.before.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Journey */}
      <motion.div variants={staggerChild} className="relative rounded-xl border border-stone-200 bg-white p-6">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-700">Course Journey</h3>
        </div>
        <div className="relative space-y-0">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-stone-200" />
          {journeySteps.map((step, i) => (
            <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-stone-200 bg-white">
                <div className="h-2 w-2 rounded-full bg-stone-400" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">{step.week}</div>
                <div className="mt-0.5 text-sm font-semibold text-stone-900">{step.label}</div>
                <div className="mt-1 text-sm text-stone-500">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* After */}
      <motion.div variants={staggerChild} className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-6">
        <div className="mb-5 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-800">After Completing</h3>
        </div>
        <ul className="space-y-3">
          {beforeAfter.after.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-stone-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

function CurriculumCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100 text-stone-600 transition-colors group-hover:bg-stone-900 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-stone-900">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone-500">{item.desc}</p>
    </motion.div>
  );
}

function OutcomeItem({ text, index }) {
  return (
    <motion.div
      variants={staggerChild}
      className="flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100">
        <CheckCircle2 className="h-4 w-4 text-stone-600" />
      </div>
      <p className="text-base font-medium text-stone-800">{text}</p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Main About
   ────────────────────────────────────────────────────────────── */

export default function About() {
  return (
    <section className="relative bg-stone-50" aria-label="About the course">
      {/* ── 1. Who This Course Is For ── */}
      <div id="overview" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Designed For You"
          title="Who this course is for"
          subtitle="Whether you are still in law school or already practicing, this course meets you where you are and takes you where you want to be."
          delay={0}
        />
        <motion.div
          {...staggerContainer(0.08, 0.3)}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {audienceCards.map((card, i) => (
            <AudienceCard key={i} card={card} index={i} />
          ))}
        </motion.div>
      </div>

      {/* ── 2. Why This Course Is Different ── */}
      <div className="border-t border-stone-200/60 bg-white">
        <div id="why" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Not Another Video Course"
            title="Why this course is different"
            subtitle="Every element is designed for practical learning. You will not passively watch. You will actively draft, receive feedback, and build real skills."
            delay={0}
          />
          <motion.div
            {...staggerContainer(0.08, 0.3)}
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {differentiators.map((item, i) => (
              <DifferentiatorCard key={i} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── 3. Before vs After Transformation ── */}
      <div className="border-t border-stone-200/60 bg-stone-50">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Transformation"
            title="Where you are vs. where you'll be"
            subtitle="Eight weeks of focused, practical training changes everything."
            delay={0}
          />
          <div className="mt-16">
            <BeforeAfterSection />
          </div>
        </div>
      </div>

      {/* ── 4. What You'll Actually Learn ── */}
      <div className="border-t border-stone-200/60 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Curriculum"
            title="What you'll actually learn"
            subtitle="Eight modules. Zero filler. Every topic chosen because it directly improves your ability to draft, negotiate, and deliver."
            delay={0}
          />
          <motion.div
            {...staggerContainer(0.08, 0.3)}
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {curriculum.map((item, i) => (
              <CurriculumCard key={i} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── 5. Outcomes ── */}
      <div className="border-t border-stone-200/60 bg-stone-50">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Real Results"
            title="What you'll walk away with"
            subtitle="This course is not about certificates. It is about capabilities."
            delay={0}
          />
          <motion.div
            {...staggerContainer(0.06, 0.3)}
            className="mx-auto mt-16 grid max-w-3xl gap-3"
          >
            {outcomes.map((text, i) => (
              <OutcomeItem key={i} text={text} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}