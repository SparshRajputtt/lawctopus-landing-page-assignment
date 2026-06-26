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
  Building2,
  Landmark,
  Wallet,
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
    outcome: "Walk into interviews with a portfolio of 17 drafted contracts.",
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
  {
    icon: Building2,
    title: "Business Professionals",
    desc: "Need to understand contracts for your business or advisory role.",
    outcome: "Negotiate and review contracts with confidence.",
  },
];

const differentiators = [
  {
    icon: Users,
    title: "55 Live Sessions",
    desc: "Join 55 interactive live sessions across 6 months. Ask questions in real time. Learn together with a dedicated cohort.",
  },
  {
    icon: PenTool,
    title: "Draft 24+ Real Contracts",
    desc: "You will draft actual contracts — NDAs, service agreements, employment contracts, shareholders agreements — not watch someone else do it.",
  },
  {
    icon: FileCheck,
    title: "17 Practical Assignments",
    desc: "Every module ends with an assignment reviewed by mentors. Not multiple-choice quizzes. Real drafts, real feedback.",
  },
  {
    icon: MessageSquare,
    title: "Personalized Feedback",
    desc: "Get line-by-line feedback on your drafts from lawyers who have practiced at Trilegal, Khaitan, and top international firms.",
  },
  {
    icon: Layers,
    title: "Portfolio Creation",
    desc: "By the end, you have 17 fine-tuned contracts in your portfolio. Show employers and clients exactly what you can do.",
  },
  {
    icon: Target,
    title: "Freelancing Mastery",
    desc: "Learn how to build your Upwork and Fiverr profiles, find clients, price your work, and build a freelance legal practice.",
  },
];

const howItHelps = [
  {
    icon: Briefcase,
    title: "Ace Law Firm Internships",
    desc: "Walk into internships with drafting skills that seniors notice immediately.",
  },
  {
    icon: Wallet,
    title: "Earn as a Freelancer",
    desc: "Learn to price, propose, and deliver contract work on Upwork, Fiverr, and LinkedIn.",
  },
  {
    icon: Globe,
    title: "Handle International Contracts",
    desc: "Understand arbitration, governing law, and cross-border agreements.",
  },
  {
    icon: TrendingUp,
    title: "Save 4 Years of Career",
    desc: "What a lawyer learns in 4-5 years of practice, you'll master in 6 months.",
  },
  {
    icon: MessageSquare,
    title: "Negotiate Everything",
    desc: "From salaries to M&A deals to apartment hunting — negotiate with confidence.",
  },
  {
    icon: Award,
    title: "Build a Standout Portfolio",
    desc: "17 fine-tuned contracts + optimized CV + LinkedIn profile that gets interview calls.",
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
    "Draft 24+ commercial contracts with professional confidence",
    "Build a client-ready portfolio of real agreements",
    "Freelance independently on Upwork and Fiverr",
    "Understand international contracts and arbitration",
    "Handle real client work from day one",
  ],
};

const journeySteps = [
  {
    month: "Month 1",
    label: "Essential Clauses",
    desc: "Contract structure, key clauses, and legal language foundations.",
  },
  {
    month: "Month 2",
    label: "Execution & Negotiation",
    desc: "Execution formalities, stamp duty, and basic negotiation skills.",
  },
  {
    month: "Month 3",
    label: "International Agreements",
    desc: "Cross-border contracts, governing law, and advanced negotiation.",
  },
  {
    month: "Month 4",
    label: "IP & Tech Contracts",
    desc: "Trademark, patent, copyright licensing, SaaS, and website terms.",
  },
  {
    month: "Month 5",
    label: "Real Estate",
    desc: "Sale deeds, leave and license, power of attorney, franchisee agreements.",
  },
  {
    month: "Month 6",
    label: "Business & Commercial",
    desc: "Shareholders agreements, joint ventures, partnership deeds, M&A basics.",
  },
];

const curriculum = [
  {
    icon: FileText,
    title: "NDAs & Confidentiality",
    desc: "Draft ironclad non-disclosure agreements for any industry.",
  },
  {
    icon: Handshake,
    title: "Service Agreements",
    desc: "Master the most common contract in freelance legal work.",
  },
  {
    icon: Briefcase,
    title: "Employment Contracts",
    desc: "Understand terms, restrictions, ESOPs, and employer obligations.",
  },
  {
    icon: Layers,
    title: "Commercial Contracts",
    desc: "Supply, distribution, vendor, and business transfer agreements.",
  },
  {
    icon: Shield,
    title: "IP Licensing",
    desc: "Trademark, patent, and copyright licensing and assignment.",
  },
  {
    icon: Globe,
    title: "International Contracts",
    desc: "Cross-border agreements, arbitration clauses, and governing law.",
  },
  {
    icon: Mail,
    title: "Website Terms & Policies",
    desc: "Terms of use, privacy policy, return and refund policies.",
  },
  {
    icon: Landmark,
    title: "Real Estate Agreements",
    desc: "Sale deeds, leave and license, power of attorney, franchisee.",
  },
];

const outcomes = [
  "Draft 24+ contracts that lawyers and clients take seriously",
  "Build a portfolio of 17 fine-tuned contracts for interviews",
  "Freelance on Upwork and Fiverr with clear pricing",
  "Improve your employability in law firms and companies",
  "Negotiate salaries, deals, and contracts with confidence",
  "Handle international agreements and cross-border deals",
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
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8e4e0] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]"
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        {...fadeUp(delay + 0.1)}
        className="text-3xl font-semibold leading-tight tracking-tight text-[#1a1a1a] sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          {...fadeUp(delay + 0.2)}
          className="mt-4 text-base leading-relaxed text-[#6b6b6b] sm:text-lg"
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
      className="group relative overflow-hidden rounded-xl border border-[#e8e4e0] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5f0eb] text-[#3d3d3d] transition-colors group-hover:bg-[#1a1a1a] group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-[#1a1a1a]">{card.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">{card.desc}</p>
      <div className="mt-4 border-t border-[#f5f0eb] pt-4">
        <p className="text-sm font-medium text-[#3d3d3d]">{card.outcome}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#b87333] opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}

function DifferentiatorCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group flex gap-4 rounded-xl border border-[#e8e4e0] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f5f0eb] text-[#3d3d3d] transition-colors group-hover:bg-[#1a1a1a] group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#1a1a1a]">{item.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-[#6b6b6b]">
          {item.desc}
        </p>
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
      <motion.div
        variants={staggerChild}
        className="rounded-xl border border-red-100 bg-red-50/30 p-6"
      >
        <div className="mb-5 flex items-center gap-2">
          <XCircle className="h-5 w-5 text-red-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-red-800">
            Before Joining
          </h3>
        </div>
        <ul className="space-y-3">
          {beforeAfter.before.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-[#6b6b6b]"
            >
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Journey */}
      <motion.div
        variants={staggerChild}
        className="relative rounded-xl border border-[#e8e4e0] bg-white p-6"
      >
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#b87333]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#3d3d3d]">
            6-Month Journey
          </h3>
        </div>
        <div className="relative space-y-0">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#e8e4e0]" />
          {journeySteps.map((step, i) => (
            <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#e8e4e0] bg-white">
                <div className="h-2 w-2 rounded-full bg-[#b87333]" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#b87333]">
                  {step.month}
                </div>
                <div className="mt-0.5 text-sm font-semibold text-[#1a1a1a]">
                  {step.label}
                </div>
                <div className="mt-1 text-sm text-[#6b6b6b]">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* After */}
      <motion.div
        variants={staggerChild}
        className="rounded-xl border border-[#e8f5ec] bg-[#e8f5ec]/30 p-6"
      >
        <div className="mb-5 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-[#2d5a3d]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#2d5a3d]">
            After Completing
          </h3>
        </div>
        <ul className="space-y-3">
          {beforeAfter.after.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-[#3d3d3d]"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2d5a3d]" />
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
      className="group rounded-xl border border-[#e8e4e0] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5f0eb] text-[#3d3d3d] transition-colors group-hover:bg-[#1a1a1a] group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-[#1a1a1a]">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">{item.desc}</p>
    </motion.div>
  );
}

function OutcomeItem({ text, index }) {
  return (
    <motion.div
      variants={staggerChild}
      className="flex items-start gap-4 rounded-xl border border-[#e8e4e0] bg-white p-5 shadow-sm"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0eb]">
        <CheckCircle2 className="h-4 w-4 text-[#2d5a3d]" />
      </div>
      <p className="text-base font-medium text-[#3d3d3d]">{text}</p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Main About
   ────────────────────────────────────────────────────────────── */

export default function About() {
  return (
    <section className="relative bg-[#faf8f5]" aria-label="About the course">
      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── 1. Who This Course Is For ── */}
      <div id="why" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
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

      {/* ── How This Course Helps You ── */}
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Career Impact"
          title="How this course will help you"
          subtitle="Specific outcomes for every stage of your legal career."
          delay={0}
        />
        <motion.div
          {...staggerContainer(0.08, 0.3)}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {howItHelps.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={staggerChild}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex gap-4 rounded-xl border border-[#e8e4e0] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f5f0eb] text-[#b87333]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1a1a1a]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6b6b6b]">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── 2. Why This Course Is Different ── */}
      <div className="border-t border-[#e8e4e0]/60 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
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
      <div id="overview" className="border-t border-[#e8e4e0]/60 bg-[#faf8f5]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Transformation"
            title="Where you are vs. where you'll be"
            subtitle="Six months of focused, practical training changes everything."
            delay={0}
          />
          <div className="mt-16">
            <BeforeAfterSection />
          </div>
        </div>
      </div>

      {/* ── 4. What You'll Actually Learn ── */}
      <div className="border-t border-[#e8e4e0]/60 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Curriculum"
            title="What you'll actually learn"
            subtitle="Eight core areas. Zero filler. Every topic chosen because it directly improves your ability to draft, negotiate, and deliver."
            delay={0}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.3 },
              },
            }}
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {curriculum.map((item, i) => (
              <CurriculumCard key={i} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── 5. Outcomes ── */}
      <div className="border-t border-[#e8e4e0]/60 bg-[#faf8f5]">
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
