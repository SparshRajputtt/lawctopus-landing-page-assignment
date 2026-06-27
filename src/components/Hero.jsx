import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  PenTool,
  Globe,
  BookOpen,
  Wallet,
  Mail,
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

/* ─── Paper Clip SVG ─── */
function PaperClip() {
  return (
    <svg
      width="28"
      height="56"
      viewBox="0 0 28 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      <path
        d="M8 52V16C8 10.477 12.477 6 18 6C23.523 6 28 10.477 28 16V44C28 47.314 25.314 50 22 50C18.686 50 16 47.314 16 44V20"
        stroke="#b87333"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 52V16C8 10.477 12.477 6 18 6C23.523 6 28 10.477 28 16V44C28 47.314 25.314 50 22 50C18.686 50 16 47.314 16 44V20"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        transform="translate(1,1)"
      />
    </svg>
  );
}

/* ─── Document Stack ─── */
function DocumentStack() {
  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
      {/* Bottom document — NDA */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -6 }}
        animate={{ opacity: 0.6, y: 0, rotate: -6 }}
        transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
        className="absolute -left-8 -top-4 h-64 w-52 rounded-lg border border-white/5 bg-[#252422] p-5 shadow-xl"
      >
        <div className="mb-3 flex items-center gap-2">
          <Shield className="h-3 w-3 text-[#555]" />
          <span className="text-[10px] tracking-wider text-[#555] uppercase">
            NDA
          </span>
        </div>
        <div className="space-y-2">
          <div className="h-1.5 w-3/4 rounded bg-[#333]" />
          <div className="h-1.5 w-full rounded bg-[#333]" />
          <div className="h-1.5 w-5/6 rounded bg-[#333]" />
          <div className="h-1.5 w-full rounded bg-[#333]" />
          <div className="h-1.5 w-2/3 rounded bg-[#333]" />
        </div>
        <div className="mt-6 flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-[#333]" />
          <div className="h-1.5 w-16 rounded bg-[#333]" />
        </div>
      </motion.div>

      {/* Middle document — Employment Agreement */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        animate={{ opacity: 0.8, y: 0, rotate: -2 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
        className="absolute -left-3 -top-8 h-64 w-52 rounded-lg border border-white/8 bg-[#2a2826] p-5 shadow-xl"
      >
        <div className="mb-3 flex items-center gap-2">
          <Briefcase className="h-3 w-3 text-[#666]" />
          <span className="text-[10px] tracking-wider text-[#666] uppercase">
            Employment Agreement
          </span>
        </div>
        <div className="space-y-2">
          <div className="h-1.5 w-full rounded bg-[#3a3836]" />
          <div className="h-1.5 w-4/5 rounded bg-[#3a3836]" />
          <div className="h-1.5 w-full rounded bg-[#3a3836]" />
          <div className="h-1.5 w-3/4 rounded bg-[#3a3836]" />
          <div className="h-1.5 w-full rounded bg-[#3a3836]" />
        </div>
        <div className="mt-4 rounded border border-[#b87333]/10 bg-[#b87333]/5 px-2 py-1 text-center text-[9px] font-medium text-[#b87333]/60">
          Under Review
        </div>
      </motion.div>

      {/* Top document — Service Agreement (Hero) */}
      <motion.div
        initial={{ opacity: 0, y: 10, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
        className="relative h-64 w-52 rounded-lg border border-white/10 bg-[#faf8f5] p-5 shadow-2xl"
      >
        {/* Paper clip */}
        <div className="absolute -left-3 -top-6 z-10 rotate-12">
          <PaperClip />
        </div>

        {/* Revision note clipped behind */}
        <div className="absolute -left-2 -top-3 z-0 h-20 w-24 rotate-[-4deg] rounded-sm bg-[#f8f4ec] p-2.5 shadow-md">
          <div className="text-[8px] font-bold uppercase tracking-wider text-[#8a7a6a]">
            Legal Review
          </div>
          <div className="mt-1 space-y-0.5">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-2.5 w-2.5 text-[#2d5a3d]" />
              <span className="text-[8px] text-[#5a4a3a]">
                Liability updated
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-2.5 w-2.5 text-[#2d5a3d]" />
              <span className="text-[8px] text-[#5a4a3a]">
                Confidentiality revised
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full border border-[#b87333]" />
              <span className="text-[8px] font-medium text-[#b87333]">
                Ready for signature
              </span>
            </div>
          </div>
        </div>

        {/* Page fold */}
        <div className="absolute -right-px -top-px h-6 w-6 overflow-hidden rounded-tr-lg">
          <div className="absolute right-0 top-0 h-8 w-8 rotate-45 bg-[#e8e4e0]" />
        </div>

        {/* CONFIDENTIAL watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <span className="rotate-[-30deg] text-4xl font-bold uppercase tracking-[0.3em] text-[#1a1a1a]">
            Confidential
          </span>
        </div>

        {/* Document header */}
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#b87333]">
            Service Agreement
          </div>
        </div>

        {/* Document body */}
        <div className="space-y-3">
          <div>
            <div className="text-[8px] font-semibold uppercase tracking-wider text-[#9a8a7a]">
              Client
            </div>
            <div className="text-xs font-medium text-[#1a1a1a]">
              TechStart Pvt. Ltd.
            </div>
          </div>
          <div>
            <div className="text-[8px] font-semibold uppercase tracking-wider text-[#9a8a7a]">
              Matter
            </div>
            <div className="text-[10px] text-[#3d3d3d]">
              Software Development Agreement
            </div>
          </div>
          <div>
            <div className="text-[8px] font-semibold uppercase tracking-wider text-[#9a8a7a]">
              Jurisdiction
            </div>
            <div className="text-[10px] text-[#3d3d3d]">Delhi</div>
          </div>
          <div>
            <div className="text-[8px] font-semibold uppercase tracking-wider text-[#9a8a7a]">
              Status
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-[#2d5a3d]" />
              <span className="text-[10px] font-medium text-[#2d5a3d]">
                Draft Completed
              </span>
            </div>
          </div>
        </div>

        {/* Signature line */}
        <div className="mt-5">
          <div className="text-[8px] text-[#9a8a7a]">Signature</div>
          <div className="mt-1 border-b border-[#c8c4c0]" />
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[8px] text-[#9a8a7a]">Page 1 / 12</span>
          <span className="text-[8px] text-[#b87333]">₹45,000</span>
        </div>

        {/* Prepared by */}
        <div className="mt-1 text-[7px] text-[#aaa]">
          Prepared using Lawctopus Framework
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Status Badge ─── */
function StatusBadge({ label, icon: Icon, color, bg, position, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: EASE_OUT }}
      className={`absolute ${position} flex items-center gap-1.5 rounded-full ${bg} px-3 py-1.5 text-xs font-medium shadow-lg`}
    >
      <Icon className={`h-3.5 w-3.5 ${color}`} />
      <span className="text-[#1a1a1a]">{label}</span>
    </motion.div>
  );
}

/* ─── Timeline ─── */
function Timeline() {
  const steps = [
    { label: "Inquiry", active: true },
    { label: "Draft", active: true },
    { label: "Review", active: true },
    { label: "Approved", active: true, check: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 0.15, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: EASE_OUT }}
      className="absolute right-4 top-1/2 -translate-y-1/2"
    >
      <div className="flex flex-col items-center gap-2">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  step.active ? "bg-[#b87333]" : "bg-[#444]"
                }`}
              />
              <span className="text-[9px] font-medium uppercase tracking-wider text-white/40">
                {step.check && <span className="mr-1">✓</span>}
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && <div className="h-4 w-px bg-white/10" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Email Notification ─── */
function EmailNotification() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6, ease: EASE_OUT }}
      className="absolute left-6 top-20 flex items-center gap-2.5 rounded-lg border border-white/8 bg-[#252422] px-3 py-2 shadow-lg"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#b87333]/10">
        <Mail className="h-3.5 w-3.5 text-[#b87333]" />
      </div>
      <div>
        <div className="text-[10px] font-medium text-white/80">
          New Client Inquiry
        </div>
        <div className="text-[9px] text-[#b87333]">BrightWave Technologies</div>
      </div>
      <div className="ml-2 text-[8px] text-white/30">just now</div>
    </motion.div>
  );
}

/* ─── Live Session Indicator ─── */
function LiveSessionIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5, ease: EASE_OUT }}
      className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/8 bg-[#252422] px-3 py-1.5"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2d5a3d] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2d5a3d]" />
      </span>
      <span className="text-[10px] font-medium text-white/60">
        Live Session
      </span>
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
          backgroundImage:
            "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left column */}
          <div className="relative z-10 max-w-xl">
            <Badge>Lawctopus Premium Cohort</Badge>

            <motion.div
              {...fadeUp(0.08)}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#b87333]/20 bg-[#b87333]/5 px-4 py-2 text-sm font-medium text-[#b87333]"
            >
              <Calendar className="h-4 w-4" />
              <span>Next cohort: July 1 – December 31</span>
              <span className="mx-1 text-[#b87333]/40">|</span>
              <span className="font-semibold">Register by June 30</span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.15)}
              className="mt-7 text-[2.75rem] font-semibold leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-[3.5rem]"
            >
              Master contract drafting.
              <br />
              <span className="relative inline-block">
                Build a freelance practice
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#b87333]/60 sm:-bottom-1.5" />
              </span>{" "}
              that pays.
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
              <SecondaryButton icon={Play}>Watch Our Story</SecondaryButton>
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
                <span className="font-semibold text-[#1a1a1a]">2,400+</span>{" "}
                lawyers enrolled in the last cohort
              </div>
            </motion.div>
          </div>

           {/* ─── Right column — Dark Workspace ───  */}
          <div className="relative z-10 hidden min-h-[520px] lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-2xl bg-[#171514] p-8 shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Paper grain texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundSize: "200px 200px",
                }}
              />

              {/* Soft warm radial glow behind document */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b87333]/6 blur-3xl" />

              {/* Fountain pen — top-left, partially visible */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -left-8 -top-6 h-32 w-48 rotate-[35deg]"
              >
                {/* Pen body */}
                <div className="absolute left-0 top-1/2 h-3 w-36 -translate-y-1/2 rounded-full bg-[#0a0a0a] shadow-lg">
                  {/* Gold trim ring */}
                  <div className="absolute right-8 top-0 h-full w-1 bg-[#b87333]" />
                  <div className="absolute right-16 top-0 h-full w-0.5 bg-[#d4a574]/60" />
                </div>
                {/* Pen nib section */}
                <div className="absolute right-0 top-1/2 h-4 w-10 -translate-y-1/2">
                  <div
                    className="absolute right-0 top-1/2 h-3 w-8 -translate-y-1/2 bg-[#1a1a1a]"
                    style={{
                      clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 80%)",
                    }}
                  />
                  <div className="absolute -right-0.5 top-1/2 h-0.5 w-3 -translate-y-1/2 bg-[#b87333]" />
                </div>
                {/* Pen cap */}
                <div className="absolute left-0 top-1/2 h-4 w-14 -translate-y-1/2 rounded-l-full bg-[#0a0a0a]">
                  <div className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#b87333]" />
                </div>
              </motion.div>

              {/* Leather notebook — bottom-right, mostly cropped */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 0.4, x: 0, y: 0 }}
                transition={{
                  delay: 0.7,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -bottom-4 -right-4 h-40 w-56 rotate-[-8deg] rounded-lg bg-[#3d2b1f] shadow-xl"
                style={{ border: "1px solid rgba(184,115,51,0.15)" }}
              >
                <div className="absolute left-3 top-0 h-full w-0.5 bg-[#b87333]/20" />
                <div className="absolute right-4 top-4 h-2 w-16 rounded bg-[#2a1f18]" />
                <div className="absolute right-4 top-8 h-2 w-12 rounded bg-[#2a1f18]" />
              </motion.div>

              {/* ─── Hero Document ─── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 w-72 rotate-[2deg] rounded-lg bg-white p-6 shadow-2xl"
                style={{
                  boxShadow:
                    "0 25px 60px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.2)",
                }}
              >
                {/* Copper paper clip — top-right */}
                <div className="absolute -right-1 -top-3 z-20 rotate-[-15deg]">
                  <svg width="20" height="40" viewBox="0 0 20 40" fill="none">
                    <path
                      d="M6 36V12C6 7.58 9.58 4 14 4C18.42 4 22 7.58 22 12V28C22 30.2 20.2 32 18 32C15.8 32 14 30.2 14 28V16"
                      stroke="#b87333"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Document header */}
                <div className="mb-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b87333]">
                    Service Agreement
                  </div>
                  <div className="mt-3 h-px w-12 bg-[#b87333]/30" />
                </div>

                {/* Document metadata */}
                <div className="mb-5 space-y-2.5">
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-[#9a8a7a]">
                      Client
                    </div>
                    <div className="text-[11px] font-medium text-[#1a1a1a]">
                      TechStart Pvt. Ltd.
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-[#9a8a7a]">
                      Matter
                    </div>
                    <div className="text-[10px] text-[#3d3d3d]">
                      Software Development Agreement
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-[#9a8a7a]">
                      Jurisdiction
                    </div>
                    <div className="text-[10px] text-[#3d3d3d]">Delhi</div>
                  </div>
                </div>

                {/* Sections with realistic text */}
                <div className="space-y-3">
                  <div>
                    <div className="mb-1 text-[9px] font-bold uppercase tracking-wider text-[#1a1a1a]">
                      1. Scope of Services
                    </div>
                    <div className="space-y-1">
                      <div className="h-1 w-full rounded bg-[#e8e4e0]" />
                      <div className="h-1 w-5/6 rounded bg-[#e8e4e0]" />
                      <div className="h-1 w-4/5 rounded bg-[#e8e4e0]" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-[9px] font-bold uppercase tracking-wider text-[#1a1a1a]">
                      2. Payment Terms
                    </div>
                    <div className="space-y-1">
                      <div className="h-1 w-full rounded bg-[#e8e4e0]" />
                      <div className="h-1 w-3/4 rounded bg-[#e8e4e0]" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-[9px] font-bold uppercase tracking-wider text-[#1a1a1a]">
                      3. Confidentiality
                    </div>
                    <div className="space-y-1">
                      <div className="h-1 w-full rounded bg-[#e8e4e0]" />
                      <div className="h-1 w-5/6 rounded bg-[#e8e4e0]" />
                      <div className="h-1 w-2/3 rounded bg-[#e8e4e0]" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-[9px] font-bold uppercase tracking-wider text-[#1a1a1a]">
                      4. Intellectual Property
                    </div>
                    <div className="space-y-1">
                      <div className="h-1 w-full rounded bg-[#e8e4e0]" />
                      <div className="h-1 w-4/5 rounded bg-[#e8e4e0]" />
                    </div>
                  </div>
                </div>

                {/* Signature line */}
                <div className="mt-5">
                  <div className="text-[8px] text-[#9a8a7a]">
                    Authorized Signature
                  </div>
                  <div className="mt-2 border-b border-[#c8c4c0]" />
                  <div className="mt-1 text-[8px] text-[#aaa]">
                    Name & Title
                  </div>
                </div>

                {/* Document footer */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[8px] text-[#aaa]">Page 1 / 12</span>
                  <span className="text-[8px] text-[#aaa]">
                    Prepared using Lawctopus Framework
                  </span>
                </div>
              </motion.div>

              {/* ─── Status Badges ─── */}

              {/* Live Session — top-left */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/8 bg-[#252422] px-3 py-1.5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2d5a3d] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2d5a3d]" />
                </span>
                <span className="text-[10px] font-medium text-white/60">
                  Live Session
                </span>
              </motion.div>

              {/* Client Approved — top-right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-lg"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2d5a3d]" />
                <span className="text-[#1a1a1a]">Client Approved</span>
              </motion.div>

              {/* Revenue — bottom-right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.0,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-6 right-6 flex items-center gap-1.5 rounded-full border border-[#b87333]/20 bg-[#faf8f5] px-3 py-1.5 text-xs font-semibold shadow-lg"
              >
                <span className="text-[#b87333]">₹45,000</span>
              </motion.div>
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
                <div className="text-2xl font-bold tracking-tight text-[#1a1a1a]">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-xs font-medium text-[#6b6b6b]">
                  {stat.label}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#b87333] opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
