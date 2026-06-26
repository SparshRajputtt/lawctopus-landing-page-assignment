import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Play,
  FileText,
  Shield,
  Award,
  Briefcase,
  CheckCircle2,
  Users,
  Clock,
  Star,
  FileCheck,
  PenTool,
  Globe,
  BookOpen,
  Calendar,
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
  hidden: { opacity: 0, y: 24 },
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
const stats = [
  { icon: Users, value: "20K+", label: "Students Taught" },
  { icon: Clock, value: "55", label: "Live Sessions" },
  { icon: FileText, value: "24+", label: "Contracts Mastered" },
  { icon: Award, value: "93.2", label: "Average Rating" },
  { icon: Briefcase, value: "17", label: "Practical Assignments" },
];

const trustChips = [
  { icon: BookOpen, label: "Live Cohort Learning" },
  { icon: PenTool, label: "Practical Drafting Exercises" },
  { icon: Users, label: "Expert Faculty" },
  { icon: Award, label: "Certificate of Completion" },
  { icon: Globe, label: "Freelancing Focus" },
];

const courseHighlights = [
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
      className={`inline-flex items-center gap-2 rounded-full border border-[#e8e4e0] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] ${className}`}
    >
      <Star className="h-3.5 w-3.5 fill-[#d4a574] text-[#d4a574]" />
      {children}
    </motion.div>
  );
}

function PrimaryButton({ children, icon: Icon, className = "", ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`group inline-flex items-center gap-2.5 rounded-lg bg-[#1a1a1a] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#b87333] focus:outline-none focus:ring-2 focus:ring-[#b87333] focus:ring-offset-2 ${className}`}
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
      className={`group inline-flex items-center gap-2.5 rounded-lg border border-[#e8e4e0] bg-white px-7 py-3.5 text-sm font-semibold text-[#3d3d3d] shadow-sm transition-colors hover:border-[#b87333] hover:text-[#b87333] focus:outline-none focus:ring-2 focus:ring-[#e8e4e0] focus:ring-offset-2 ${className}`}
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
      className="flex items-center gap-2 rounded-full border border-[#e8e4e0] bg-white/80 px-3.5 py-2 text-xs font-medium text-[#6b6b6b] backdrop-blur-sm"
    >
      <Icon className="h-3.5 w-3.5 text-[#b87333]" />
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
      className="absolute -left-4 top-0 z-30 w-64 rounded-xl border border-[#e8e4e0] bg-white p-5 shadow-lg shadow-black/5 sm:w-72"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#6b6b6b]" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b6b6b]">
            Non-Disclosure Agreement
          </span>
        </div>
        <span className="rounded-full bg-[#e8f5ec] px-2 py-0.5 text-[10px] font-medium text-[#2d5a3d]">
          Drafted
        </span>
      </div>
      <div className="space-y-2">
        <div className="h-1.5 w-full rounded bg-[#f5f0eb]" />
        <div className="h-1.5 w-5/6 rounded bg-[#f5f0eb]" />
        <div className="h-1.5 w-full rounded bg-[#f5f0eb]" />
        <div className="h-1.5 w-3/4 rounded bg-[#f5f0eb]" />
        <div className="h-1.5 w-full rounded bg-[#f5f0eb]" />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="h-5 w-5 rounded-full bg-[#f5f0eb]" />
        <div className="h-1.5 w-20 rounded bg-[#f5f0eb]" />
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
      className="absolute -right-2 top-24 z-20 w-52 rounded-xl border border-[#e8e4e0] bg-white p-4 shadow-lg shadow-black/5 sm:w-60"
    >
      <div className="mb-3 flex items-center gap-2">
        <Shield className="h-4 w-4 text-[#6b6b6b]" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b6b6b]">
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
            <CheckCircle2 className="h-3.5 w-3.5 text-[#d4a574]" />
            <span className="text-xs text-[#3d3d3d]">{clause}</span>
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
      className="absolute left-8 top-56 z-40 w-48 rounded-xl border border-[#e8e4e0] bg-white p-4 shadow-lg shadow-black/5"
    >
      <div className="mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4 text-[#6b6b6b]" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b6b6b]">
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
                item.done ? "bg-[#e8f5ec]" : "bg-[#f5f0eb]"
              }`}
            >
              {item.done ? (
                <CheckCircle2 className="h-3 w-3 text-[#2d5a3d]" />
              ) : (
                <div className="h-2 w-2 rounded-full bg-[#d4a574]" />
              )}
            </div>
            <span
              className={`text-xs ${
                item.done ? "text-[#3d3d3d]" : "text-[#6b6b6b]"
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
      className="absolute -right-4 top-64 z-30 w-56 rounded-xl border border-[#e8e4e0] bg-white p-4 shadow-lg shadow-black/5 sm:w-64"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5f0eb]">
          <Award className="h-5 w-5 text-[#b87333]" />
        </div>
        <div>
          <div className="text-xs font-semibold text-[#1a1a1a]">
            Certificate
          </div>
          <div className="text-[10px] text-[#6b6b6b]">Lawctopus Verified</div>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="h-2 w-3/4 rounded bg-[#f5f0eb]" />
        <div className="h-2 w-1/2 rounded bg-[#f5f0eb]" />
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <FileCheck className="h-3.5 w-3.5 text-[#2d5a3d]" />
        <span className="text-[10px] font-medium text-[#2d5a3d]">
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
      className="absolute left-0 top-96 z-20 w-56 rounded-xl border border-[#e8e4e0] bg-white p-4 shadow-lg shadow-black/5"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-[#6b6b6b]" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b6b6b]">
            Freelance Project
          </span>
        </div>
        <span className="rounded-full bg-[#faf8f5] px-2 py-0.5 text-[10px] font-medium text-[#b87333]">
          Active
        </span>
      </div>
      <div className="text-sm font-semibold text-[#1a1a1a]">
        Service Agreement
      </div>
      <div className="mt-1 text-[10px] text-[#6b6b6b]">Client: TechStart Pvt. Ltd.</div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#1a1a1a]">₹45,000</span>
        <span className="text-[10px] text-[#6b6b6b]">Due in 3 days</span>
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
      className="absolute right-8 top-[28rem] z-40 w-48 rounded-xl border border-[#e8f5ec] bg-[#e8f5ec]/80 p-4 shadow-lg shadow-black/5 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <CheckCircle2 className="h-4 w-4 text-[#2d5a3d]" />
        </div>
        <div>
          <div className="text-xs font-semibold text-[#2d5a3d]">
            Client Approved
          </div>
          <div className="text-[10px] text-[#2d5a3d]/70">Contract finalized</div>
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
      className={`absolute z-10 flex items-center gap-1.5 rounded-full border border-[#e8e4e0] bg-white/90 px-3 py-1.5 text-[11px] font-medium text-[#3d3d3d] shadow-sm backdrop-blur-sm ${className}`}
    >
      <Star className="h-3 w-3 text-[#d4a574]" />
      {label}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Main Hero
   ────────────────────────────────────────────────────────────── */

export default function Hero() {
  const sectionRef = useRef(null);
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
      className="relative overflow-hidden bg-[#faf8f5]"
      aria-label="Hero"
    >
      {/* Background layer */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-[#f5f0eb]/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#f5f0eb]/30 blur-3xl" />
      </motion.div>

      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
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
              className="mt-7 text-[2.75rem] font-semibold leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-[3.5rem]"
            >
              Master contract drafting.
              <br />
              <span className="relative inline-block">
                Build a freelance practice
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#b87333]/60 sm:-bottom-1.5" />
              </span>
              {" "}that pays.
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="mt-6 text-base leading-[1.7] text-[#6b6b6b] sm:text-lg"
            >
              A 6-month expert-level course with 55 live sessions. Draft 24+
              complex contracts including NDAs, service agreements, and
              international deals. Get personalized feedback on 17 assignments.
              Save 4 years of your legal career.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.45)}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <PrimaryButton icon={ArrowRight}>
                Enroll Now — ₹24,999
              </PrimaryButton>
              <SecondaryButton icon={Play}>
                Watch Our Story
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
              className="mt-10 flex items-center gap-4 border-t border-[#e8e4e0]/60 pt-8"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-[#faf8f5] bg-[#f5f0eb]"
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
              <div className="text-sm text-[#6b6b6b]">
                <span className="font-semibold text-[#1a1a1a]">2,400+</span> lawyers
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

        {/* Stats row */}
        <motion.div
          {...staggerContainer(0.08, 0.7)}
          className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                variants={staggerChild}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group relative overflow-hidden rounded-xl border border-[#e8e4e0] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f0eb] text-[#3d3d3d] transition-colors group-hover:bg-[#1a1a1a] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold tracking-tight text-[#1a1a1a]">{stat.value}</div>
                <div className="mt-0.5 text-xs font-medium text-[#6b6b6b]">{stat.label}</div>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#b87333] opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}