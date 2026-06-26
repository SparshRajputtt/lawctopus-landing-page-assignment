import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Download,
  FileText,
  ShieldCheck,
  Users,
  PenTool,
  Award,
  CheckCircle2,
  Clock,
  Briefcase,
  Star,
  ChevronRight,
  Layers,
  BookOpen,
  Zap,
  MessageSquare,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   Animation presets
   ────────────────────────────────────────────────────────────── */
const EASE_OUT = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE_OUT },
});

const staggerContainer = (stagger = 0.08, delay = 0) => ({
  initial: "hidden",
  animate: "visible",
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  },
});

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const floatSlow = {
  animate: { y: [0, -8, 0] },
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
};

const floatMedium = {
  animate: { y: [0, -6, 0] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
};

const floatFast = {
  animate: { y: [0, -5, 0] },
  transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
};

/* ──────────────────────────────────────────────────────────────
   Data
   ────────────────────────────────────────────────────────────── */
const trustChips = [
  { icon: Users, label: "Live Cohort Learning" },
  { icon: PenTool, label: "Practical Drafting Exercises" },
  { icon: BookOpen, label: "Expert Faculty" },
  { icon: Award, label: "Certificate of Completion" },
  { icon: Briefcase, label: "Freelancing Focus" },
];

const courseModules = [
  "NDAs & Confidentiality",
  "Employment Contracts",
  "Service Agreements",
  "Freelance Contracts",
  "Commercial Leases",
  "IP Assignments",
];

/* ──────────────────────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────────────────────── */

function Badge({ children, className = "" }) {
  return (
    <motion.div
      {...fadeUp(0)}
      className={`inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600 ${className}`}
    >
      <Layers className="h-3.5 w-3.5 text-stone-400" />
      {children}
    </motion.div>
  );
}

function PrimaryButton({ children, icon: Icon, className = "", ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`group inline-flex items-center gap-2.5 rounded-lg bg-stone-900 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
      <Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </motion.button>
  );
}

function SecondaryButton({ children, icon: Icon, className = "", ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`group inline-flex items-center gap-2.5 rounded-lg border border-stone-200 bg-white px-7 py-3.5 text-sm font-semibold text-stone-700 shadow-sm transition-colors hover:border-stone-300 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-200 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
      <Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </motion.button>
  );
}

function TrustChip({ chip, index }) {
  const Icon = chip.icon;
  return (
    <motion.div
      variants={staggerChild}
      className="flex items-center gap-2 rounded-full border border-stone-100 bg-stone-50/80 px-3.5 py-2 text-xs font-medium text-stone-600 backdrop-blur-sm"
    >
      <Icon className="h-3.5 w-3.5 text-stone-400" />
      {chip.label}
    </motion.div>
  );
}

/* ─── Right column: Legal Desk Composition ─── */

function ContractPreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: EASE_OUT }}
      {...floatSlow}
      className="absolute -left-4 top-0 z-30 w-64 rounded-xl border border-stone-200 bg-white p-5 shadow-lg shadow-stone-900/5 sm:w-72"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-stone-400" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
            Non-Disclosure Agreement
          </span>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
          Drafted
        </span>
      </div>
      <div className="space-y-2">
        <div className="h-1.5 w-full rounded bg-stone-100" />
        <div className="h-1.5 w-5/6 rounded bg-stone-100" />
        <div className="h-1.5 w-full rounded bg-stone-100" />
        <div className="h-1.5 w-3/4 rounded bg-stone-100" />
        <div className="h-1.5 w-full rounded bg-stone-100" />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="h-5 w-5 rounded-full bg-stone-200" />
        <div className="h-1.5 w-20 rounded bg-stone-100" />
      </div>
    </motion.div>
  );
}

function ClauseCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, y: 40 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.7, ease: EASE_OUT }}
      {...floatMedium}
      className="absolute -right-2 top-24 z-20 w-52 rounded-xl border border-stone-200 bg-white p-4 shadow-lg shadow-stone-900/5 sm:w-60"
    >
      <div className="mb-3 flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-stone-400" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
          Key Clauses
        </span>
      </div>
      <div className="space-y-2.5">
        {[
          "Indemnification",
          "Termination",
          "Governing Law",
          "Force Majeure",
        ].map((clause, i) => (
          <div key={i} className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-stone-300" />
            <span className="text-xs text-stone-600">{clause}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ChecklistCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, y: 60 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.9, ease: EASE_OUT }}
      {...floatFast}
      className="absolute left-8 top-56 z-40 w-48 rounded-xl border border-stone-200 bg-white p-4 shadow-lg shadow-stone-900/5"
    >
      <div className="mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4 text-stone-400" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
          Review Checklist
        </span>
      </div>
      <div className="space-y-2">
        {[
          { label: "Party details", done: true },
          { label: "Scope defined", done: true },
          { label: "Payment terms", done: true },
          { label: "Dispute clause", done: false },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`flex h-4 w-4 items-center justify-center rounded-full ${
                item.done ? "bg-emerald-50" : "bg-stone-50"
              }`}
            >
              {item.done ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              ) : (
                <div className="h-2 w-2 rounded-full bg-stone-300" />
              )}
            </div>
            <span
              className={`text-xs ${
                item.done ? "text-stone-700" : "text-stone-400"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CertificateCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 1.1, ease: EASE_OUT }}
      {...floatSlow}
      className="absolute -right-4 top-64 z-30 w-56 rounded-xl border border-stone-200 bg-white p-4 shadow-lg shadow-stone-900/5 sm:w-64"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100">
          <Award className="h-5 w-5 text-stone-600" />
        </div>
        <div>
          <div className="text-xs font-semibold text-stone-900">
            Certificate
          </div>
          <div className="text-[10px] text-stone-400">Lawctopus Verified</div>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="h-2 w-3/4 rounded bg-stone-100" />
        <div className="h-2 w-1/2 rounded bg-stone-100" />
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
        <span className="text-[10px] font-medium text-emerald-600">
          Blockchain Verified
        </span>
      </div>
    </motion.div>
  );
}

function FreelanceProjectCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x: -10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.9, delay: 1.3, ease: EASE_OUT }}
      {...floatMedium}
      className="absolute left-0 top-96 z-20 w-56 rounded-xl border border-stone-200 bg-white p-4 shadow-lg shadow-stone-900/5"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-stone-400" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
            Freelance Project
          </span>
        </div>
        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
          Active
        </span>
      </div>
      <div className="text-sm font-semibold text-stone-900">
        Service Agreement
      </div>
      <div className="mt-1 text-[10px] text-stone-500">Client: TechStart Pvt. Ltd.</div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-stone-900">₹45,000</span>
        <span className="text-[10px] text-stone-400">Due in 3 days</span>
      </div>
    </motion.div>
  );
}

function ClientApprovalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 1.5, ease: EASE_OUT }}
      {...floatFast}
      className="absolute right-8 top-[28rem] z-40 w-48 rounded-xl border border-emerald-100 bg-emerald-50/80 p-4 shadow-lg shadow-emerald-900/5 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        </div>
        <div>
          <div className="text-xs font-semibold text-emerald-900">
            Client Approved
          </div>
          <div className="text-[10px] text-emerald-600">Contract finalized</div>
        </div>
      </div>
    </motion.div>
  );
}

function ModuleTag({ label, className, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
      className={`absolute z-10 flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/90 px-3 py-1.5 text-[11px] font-medium text-stone-600 shadow-sm backdrop-blur-sm ${className}`}
    >
      <Zap className="h-3 w-3 text-stone-400" />
      {label}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Main Hero
   ────────────────────────────────────────────────────────────── */

export default function Hero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 16,
        y: (e.clientY / window.innerHeight - 0.5) * 16,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-stone-50"
      aria-label="Hero"
    >
      {/* Background layer */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-stone-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-stone-200/20 blur-3xl" />
      </motion.div>

      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #1c1917 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left column */}
          <div className="relative z-10 max-w-xl">
            <Badge>Lawctopus Premium Cohort</Badge>

            <motion.h1
              {...fadeUp(0.15)}
              className="mt-7 text-[2.75rem] font-semibold leading-[1.1] tracking-tight text-stone-900 sm:text-5xl lg:text-[3.5rem]"
            >
              Master contract drafting.
              <br />
              <span className="relative inline-block">
                Build a freelance practice
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-stone-300/70 sm:-bottom-1.5" />
              </span>
              {" "}that pays.
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="mt-6 text-base leading-[1.7] text-stone-500 sm:text-lg"
            >
              Learn to draft commercial contracts that hold up in court and
              impress clients. Work through real agreements with expert mentors.
              Graduate with a portfolio, a verified certificate, and the
              confidence to freelance or land better roles.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.45)}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <PrimaryButton icon={ArrowRight}>
                Enroll Now
              </PrimaryButton>
              <SecondaryButton icon={Download}>
                Download Brochure
              </SecondaryButton>
            </motion.div>

            {/* Trust chips */}
            <motion.div
              {...staggerContainer(0.06, 0.6)}
              className="mt-8 flex flex-wrap gap-2"
            >
              {trustChips.map((chip, i) => (
                <TrustChip key={i} chip={chip} index={i} />
              ))}
            </motion.div>

            {/* Mini social proof */}
            <motion.div
              {...fadeUp(0.7)}
              className="mt-10 flex items-center gap-4 border-t border-stone-200/60 pt-8"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-stone-50 bg-stone-200"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url("https://i.pravatar.cc/100?img=${i + 20}")`,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-stone-500">
                <span className="font-semibold text-stone-900">2,400+</span> lawyers
                enrolled in the last cohort
              </div>
            </motion.div>
          </div>

          {/* Right column — Legal Desk Composition */}
          <div className="relative z-10 hidden min-h-[520px] lg:block">
            <motion.div
              animate={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
              transition={{ type: "spring", stiffness: 60, damping: 30 }}
              className="relative h-full w-full"
            >
              <ContractPreviewCard />
              <ClauseCard />
              <ChecklistCard />
              <CertificateCard />
              <FreelanceProjectCard />
              <ClientApprovalCard />

              {/* Module tags floating around */}
              <ModuleTag
                label="NDAs"
                className="right-0 top-0"
                delay={1.6}
              />
              <ModuleTag
                label="Employment Contracts"
                className="left-20 top-40"
                delay={1.7}
              />
              <ModuleTag
                label="Service Agreements"
                className="right-4 top-48"
                delay={1.8}
              />
              <ModuleTag
                label="Commercial Leases"
                className="left-4 bottom-32"
                delay={1.9}
              />
              <ModuleTag
                label="IP Assignments"
                className="right-12 bottom-16"
                delay={2.0}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}