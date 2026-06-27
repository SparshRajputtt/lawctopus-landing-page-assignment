import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import {
  CheckCircle2,
  Users,
  PenTool,
  MessageSquare,
  Layers,
  Globe,
  TrendingUp,
  FileText,
  Award,
  Clock,
  ChevronDown,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   Animation presets
   ────────────────────────────────────────────────────────────── */
const EASE_OUT = [0.22, 1, 0.36, 1];

/* ──────────────────────────────────────────────────────────────
   Data
   ────────────────────────────────────────────────────────────── */
const timeline = [
  {
    step: "01",
    label: "Enroll",
    desc: "Secure your seat in the upcoming 6-month cohort",
    preview: {
      title: "Application Submitted",
      items: [
        { icon: CheckCircle2, text: "July Cohort Confirmed" },
        { icon: CheckCircle2, text: "Seat Reserved" },
        { icon: CheckCircle2, text: "Welcome Email Sent" },
      ],
      meta: "Cohort begins July 1, 2026",
    },
  },
  {
    step: "02",
    label: "Attend Live Classes",
    desc: "55 interactive sessions with expert faculty",
    preview: {
      title: "Live Session Active",
      items: [
        { icon: Users, text: "55 Live Classes" },
        { icon: Clock, text: "Recordings Available" },
        { icon: Award, text: "Expert Faculty" },
      ],
      meta: "2 sessions per week",
    },
  },
  {
    step: "03",
    label: "Complete Assignments",
    desc: "Real contracts, real deadlines, real feedback",
    preview: {
      title: "Service Agreement",
      items: [
        { icon: FileText, text: "Draft v1 Completed" },
        { icon: PenTool, text: "Clause 7 Added" },
        { icon: CheckCircle2, text: "Payment Terms Updated" },
      ],
      meta: "17 assignments across 6 months",
    },
  },
  {
    step: "04",
    label: "Receive Mentor Feedback",
    desc: "Line-by-line review from practicing lawyers",
    preview: {
      title: "Mentor Feedback",
      items: [
        { icon: CheckCircle2, text: "Liability Clause Reviewed" },
        { icon: CheckCircle2, text: "Confidentiality Revised" },
        { icon: MessageSquare, text: "2 Comments Added" },
      ],
      meta: "Personalized line-by-line review",
    },
  },
  {
    step: "05",
    label: "Build Portfolio",
    desc: "Curate 17 fine-tuned contracts for employers and clients",
    preview: {
      title: "Portfolio Ready",
      items: [
        { icon: Layers, text: "17 Drafted Contracts" },
        { icon: FileText, text: "CV Optimized" },
        { icon: CheckCircle2, text: "Interview Ready" },
      ],
      meta: "Client-ready portfolio",
    },
  },
  {
    step: "06",
    label: "Start Freelancing",
    desc: "Launch on Upwork, Fiverr, and LinkedIn",
    preview: {
      title: "Freelance Profile",
      items: [
        { icon: Globe, text: "Upwork Profile Live" },
        { icon: Globe, text: "LinkedIn Optimized" },
        { icon: Globe, text: "Fiverr Gig Active" },
      ],
      meta: "Direct client opportunities",
    },
  },
  {
    step: "07",
    label: "Career Growth",
    desc: "Land better roles or grow your independent practice",
    preview: {
      title: "Career Growth",
      items: [
        { icon: TrendingUp, text: "Higher Salary Negotiated" },
        { icon: CheckCircle2, text: "Independent Practice" },
        { icon: CheckCircle2, text: "Corporate Opportunities" },
      ],
      meta: "Long-term career acceleration",
    },
  },
];

/* ──────────────────────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────────────────────── */

function SectionHeader({ eyebrow, title, subtitle, delay = 0 }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay, ease: EASE_OUT }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8e4e0] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]"
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: delay + 0.1, ease: EASE_OUT }}
        className="text-3xl font-semibold leading-tight tracking-tight text-[#1a1a1a] sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: delay + 0.2, ease: EASE_OUT }}
          className="mt-4 text-base leading-relaxed text-[#6b6b6b] sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ─── Journey Preview Panel ─── */
/*
 * Positioning responsibility moved to the parent wrapper in TimelineSection.
 * This component no longer owns h-full / hidden / lg:block — those are gone.
 * Everything else (colors, texture, glow, content, animations) is untouched.
 */
function JourneyPreview({ activeStep }) {
  const step = timeline[activeStep];
  const preview = step.preview;

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-[#171514] p-8"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Warm glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b87333]/8 blur-3xl" />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="relative"
        >
          {/* Step indicator */}
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b87333]/10 text-xs font-bold text-[#b87333]">
              {step.step}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-white/40">
              Step {step.step} of 07
            </span>
          </div>

          {/* Preview title */}
          <h3 className="mb-6 text-xl font-semibold text-white">
            {preview.title}
          </h3>

          {/* Preview items */}
          <div className="space-y-4">
            {preview.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.3, ease: EASE_OUT }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <Icon className="h-4 w-4 text-[#b87333]" />
                  </div>
                  <span className="text-sm text-white/80">{item.text}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Meta */}
          <div className="mt-8 border-t border-white/8 pt-6">
            <p className="text-xs text-white/40">{preview.meta}</p>
          </div>

          {/* Document illustration */}
          <div className="mt-8 flex justify-center">
            <div className="relative h-32 w-44 rotate-[3deg] rounded-lg border border-white/8 bg-[#faf8f5] p-4 shadow-2xl">
              <div className="mb-2 text-[8px] font-bold uppercase tracking-wider text-[#b87333]">
                {step.label}
              </div>
              <div className="space-y-1.5">
                <div className="h-1 w-full rounded bg-[#e8e4e0]" />
                <div className="h-1 w-5/6 rounded bg-[#e8e4e0]" />
                <div className="h-1 w-full rounded bg-[#e8e4e0]" />
                <div className="h-1 w-3/4 rounded bg-[#e8e4e0]" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="h-1.5 w-8 rounded bg-[#e8e4e0]" />
                <CheckCircle2 className="h-3 w-3 text-[#2d5a3d]" />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Timeline Step (Desktop) ─── */
/*
 * Added `cardRef` prop and forwarded it to the root motion.div so the
 * parent can measure each card's DOM rect for floating preview positioning.
 * Everything else is unchanged.
 */
function TimelineStep({ step, index, isActive, isCompleted, onHover, cardRef }) {
  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => onHover(index)}
      className={`group relative cursor-pointer rounded-xl border p-5 transition-all duration-300 ${
        isActive
          ? "border-[#b87333]/30 bg-white shadow-md"
          : "border-[#e8e4e0] bg-white shadow-sm hover:border-[#b87333]/20 hover:shadow-md"
      }`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      {/* Copper top line on active */}
      <div
        className={`absolute inset-x-0 top-0 h-[2px] rounded-t-xl bg-[#b87333] transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="flex items-start gap-4">
        {/* Timeline circle */}
        <div className="relative flex flex-col items-center">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
              isActive || isCompleted
                ? "border-[#b87333] bg-[#b87333] text-white"
                : "border-[#e8e4e0] bg-white text-[#6b6b6b]"
            }`}
          >
            <span className="text-xs font-bold">{step.step}</span>
          </div>
          {/* Vertical line */}
          {index < timeline.length - 1 && (
            <div
              className={`mt-2 h-8 w-px transition-colors duration-300 ${
                isCompleted ? "bg-[#b87333]" : "bg-[#e8e4e0]"
              }`}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-2">
          <h3
            className={`text-base font-semibold transition-colors duration-300 ${
              isActive ? "text-[#b87333]" : "text-[#1a1a1a]"
            }`}
          >
            {step.label}
          </h3>
          <p className="mt-1 text-sm text-[#6b6b6b]">{step.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Timeline Step (Mobile Accordion) ─── */
function MobileTimelineStep({ step, index, isOpen, onToggle }) {
  return (
    <div className="rounded-xl border border-[#e8e4e0] bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => onToggle(isOpen ? -1 : index)}
        className="flex w-full items-center gap-4 p-5 text-left"
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
            isOpen
              ? "border-[#b87333] bg-[#b87333] text-white"
              : "border-[#e8e4e0] bg-white text-[#6b6b6b]"
          }`}
        >
          <span className="text-xs font-bold">{step.step}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-[#1a1a1a]">{step.label}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="h-5 w-5 text-[#6b6b6b]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#f5f0eb] px-5 pb-5 pt-4">
              <p className="mb-4 text-sm text-[#6b6b6b]">{step.desc}</p>

              {/* Preview content inline */}
              <div className="rounded-xl bg-[#171514] p-5">
                <h4 className="mb-3 text-sm font-semibold text-white">
                  {step.preview.title}
                </h4>
                <div className="space-y-2">
                  {step.preview.items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-[#b87333]" />
                        <span className="text-xs text-white/70">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-3 text-[10px] text-white/30">{step.preview.meta}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Main Timeline Section
   ────────────────────────────────────────────────────────────── */

export default function TimelineSection() {
  const [hoveredStep, setHoveredStep] = useState(0);
  const [openMobileStep, setOpenMobileStep] = useState(-1);

  /*
   * Refs
   * ─────────────────────────────────────────────────────────────
   * cardRefs      – one ref per desktop timeline card; populated via
   *                 callback refs so they're always in sync with renders.
   * rightColumnRef – the right grid cell; CSS grid stretches it to match
   *                  the left column's height, giving us the clamp bounds.
   * previewCardRef – the absolute-positioned motion.div that wraps
   *                  JourneyPreview; we measure its offsetHeight to know
   *                  how much room the card needs before clamping.
   */
  const cardRefs = useRef([]);
  const rightColumnRef = useRef(null);
  const previewCardRef = useRef(null);

  /*
   * Spring-animated Y value
   * ─────────────────────────────────────────────────────────────
   * useSpring(initialValue, config) returns a MotionValue that
   * eases toward whatever we pass to .set(). We apply it via
   * style={{ y: springY }} on the preview wrapper.
   *
   * Tuning:  stiffness ↑ = snappier  |  damping ↑ = less bounce
   */
  const springY = useSpring(0, { stiffness: 260, damping: 32 });

  /*
   * handleHover
   * ─────────────────────────────────────────────────────────────
   * 1. Update React state so the active/completed styling re-renders.
   * 2. Measure the hovered card and the right-column container using
   *    getBoundingClientRect() – scroll-offset cancels out because we
   *    subtract containerRect.top from cardRect.top.
   * 3. Target Y = centre of the hovered card  minus  half the preview
   *    card's height (centres the preview on the active step).
   * 4. Clamp so the card never goes above 0 or below
   *    (containerHeight − previewHeight).
   * 5. springY.set() triggers the spring animation.
   */
  const handleHover = useCallback(
    (index) => {
      setHoveredStep(index);

      const card = cardRefs.current[index];
      const rightColumn = rightColumnRef.current;
      const previewCard = previewCardRef.current;

      if (!card || !rightColumn || !previewCard) return;

      const cardRect = card.getBoundingClientRect();
      const containerRect = rightColumn.getBoundingClientRect();

      const containerHeight = rightColumn.offsetHeight;
      const previewHeight = previewCard.offsetHeight;

      // Vertical centre of the hovered card relative to the right column top
      const cardCenterRelative =
        cardRect.top + cardRect.height / 2 - containerRect.top;

      // Ideal Y: centre the preview on the card
      let targetY = cardCenterRelative - previewHeight / 2;

      // Clamp: never above top, never below bottom of container
      targetY = Math.max(0, Math.min(containerHeight - previewHeight, targetY));

      springY.set(targetY);
    },
    [springY]
  );

  return (
    
    <div className="border-t border-[#e8e4e0]/60 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Journey"
          title="Your learning experience"
          subtitle="From enrollment to career growth. Every step is designed for practical skill building."
          delay={0}
        />

        {/* Desktop: Timeline + Floating Preview side by side */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-2 lg:gap-8">

          {/* Left: Timeline steps */}
          <div className="space-y-3">
            {timeline.map((step, i) => (
              <TimelineStep
                key={i}
                step={step}
                index={i}
                isActive={hoveredStep === i}
                isCompleted={i <= hoveredStep}
                onHover={handleHover}
                /*
                 * Callback ref: assigns the DOM node into cardRefs.current[i].
                 * Using a callback (rather than createRef in a loop) is the
                 * correct pattern for ref arrays in functional components.
                 */
                cardRef={(el) => {
                  cardRefs.current[i] = el;
                }}
              />
            ))}
          </div>

          {/*
           * Right: Floating Preview Container
           * ────────────────────────────────────────────────────────
           * • `relative` so the absolutely-positioned motion.div inside
           *   is constrained to this cell.
           * • No explicit height — CSS grid stretches this cell to match
           *   the left column's height automatically (align-items: stretch
           *   is the grid default), giving us correct bounds for clamping.
           * • The motion.div is `absolute inset-x-0 top-0` and translates
           *   vertically via the spring. It never collapses the cell's
           *   height because absolutely positioned elements are out of flow.
           */}
          <div ref={rightColumnRef} className="relative">
            <motion.div
              ref={previewCardRef}
              style={{ y: springY }}
              className="absolute inset-x-0 top-0"
            >
              <JourneyPreview activeStep={hoveredStep} />
            </motion.div>
          </div>

        </div>

        {/* Mobile: Accordion Timeline — unchanged */}
        <div className="mt-16 space-y-3 lg:hidden">
          {timeline.map((step, i) => (
            <MobileTimelineStep
              key={i}
              step={step}
              index={i}
              isOpen={openMobileStep === i}
              onToggle={setOpenMobileStep}
            />
          ))}
        </div>
      </div>
    </div>
  );
}