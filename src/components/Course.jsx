import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  FileText,
  Shield,
  Briefcase,
  Layers,
  PenTool,
  MessageSquare,
  Star,
  CheckCircle2,
  ArrowRight,
  Download,
  Users,
  Clock,
  Award,
  Zap,
  GraduationCap,
  Target,
  TrendingUp,
  Mail,
  Play,
  User,
  Calendar,
  Video,
  FileCheck,
  Globe,
  Lock,
  Sparkles,
  Circle,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   Animation presets — match Hero.jsx and About.jsx exactly
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

const modules = [
  {
    number: "01",
    title: "Foundations of Contract Drafting",
    icon: BookOpen,
    lessons: [
      "Understanding contract structure and anatomy",
      "Essential clauses: recitals, definitions, representations",
      "Drafting clear and enforceable language",
      "Common pitfalls and how to avoid them",
    ],
    assignments: ["Draft a basic service agreement from scratch"],
    deliverables: ["One complete draft with mentor review"],
  },
  {
    number: "02",
    title: "Commercial Contracts",
    icon: Layers,
    lessons: [
      "Supply and distribution agreements",
      "Vendor and procurement contracts",
      "Payment terms and commercial safeguards",
      "Termination and dispute resolution clauses",
    ],
    assignments: ["Draft a supply agreement with risk allocation"],
    deliverables: ["Commercial contract draft + clause analysis"],
  },
  {
    number: "03",
    title: "Employment Agreements",
    icon: Briefcase,
    lessons: [
      "Key employment terms and restrictions",
      "Non-compete and confidentiality within employment",
      "ESOP and incentive structures",
      "Termination and severance provisions",
    ],
    assignments: ["Draft an employment agreement for a tech startup"],
    deliverables: ["Employment contract + term sheet"],
  },
  {
    number: "04",
    title: "NDAs & Confidentiality",
    icon: Shield,
    lessons: [
      "Types of NDAs: mutual, unilateral, multilateral",
      "Scope of confidentiality and exclusions",
      "Return of information and survival clauses",
      "Enforcement and remedies",
    ],
    assignments: ["Draft an NDA for a client meeting"],
    deliverables: ["NDA draft suitable for immediate use"],
  },
  {
    number: "05",
    title: "Freelancing as a Lawyer",
    icon: Globe,
    lessons: [
      "Finding your first freelance clients",
      "Pricing models: fixed, hourly, retainer",
      "Scope documents and engagement letters",
      "Managing client expectations professionally",
    ],
    assignments: ["Create a pricing sheet and engagement template"],
    deliverables: ["Freelance starter kit: pricing + engagement letter"],
  },
  {
    number: "06",
    title: "Portfolio Building & Career",
    icon: PenTool,
    lessons: [
      "Curating your best work for employers",
      "Building an online presence as a contract lawyer",
      "Interview preparation with real contract scenarios",
      "Long-term career paths in contract law",
    ],
    assignments: ["Assemble a 5-piece portfolio for job applications"],
    deliverables: ["Professional portfolio ready for interviews"],
  },
];

const faculty = [
  {
    name: "Adv. Priya Sharma",
    designation: "Senior Associate, Trilegal",
    intro: "Specializes in commercial contracts and M&A documentation. Has trained over 3,000 law students in practical drafting.",
    expertise: ["Commercial Contracts", "M&A", "Due Diligence"],
    experience: "12+ years",
    badges: ["Trilegal", "Ex-JSA"],
  },
  {
    name: "Adv. Rahul Mehta",
    designation: "Independent Contract Lawyer",
    intro: "Built a six-figure freelance practice drafting contracts for startups and SMEs. Teaches what actually works in the market.",
    expertise: ["Freelance Practice", "Startup Contracts", "IP Law"],
    experience: "8+ years",
    badges: ["Freelancer", "Ex-Khaitan"],
  },
  {
    name: "Dr. Ananya Gupta",
    designation: "Professor of Law, NLU Delhi",
    intro: "Bridges the gap between academic contract theory and real-world application. Known for making complex clauses accessible.",
    expertise: ["Contract Theory", "Legal Writing", "Academic Rigor"],
    experience: "15+ years",
    badges: ["NLU Delhi", "Author"],
  },
];

const testimonials = [
  {
    name: "Aarav Patel",
    position: "3rd Year, NLSIU Bangalore",
    review: "I went from not knowing how to structure a contract to drafting an NDA for a real startup in week three. The feedback on my drafts was the game changer.",
    rating: 5,
    size: "large",
  },
  {
    name: "Sneha Reddy",
    position: "Junior Associate, AZB & Partners",
    review: "My senior noticed the improvement in my drafting within a month. The practical approach here is unlike anything I learned in law school.",
    rating: 5,
    size: "compact",
  },
  {
    name: "Vikram Joshi",
    position: "Freelance Contract Lawyer",
    review: "This course gave me the confidence to quit my desk job and freelance. I now have five regular clients and charge three times what I used to earn.",
    rating: 5,
    size: "compact",
  },
  {
    name: "Meera Iyer",
    position: "Fresh Graduate, GLC Mumbai",
    review: "The portfolio I built during this course got me three interview calls. Every interviewer asked about the contracts I had drafted.",
    rating: 5,
    size: "large",
  },
];

const timeline = [
  { step: "01", label: "Enroll", desc: "Secure your seat in the upcoming cohort" },
  { step: "02", label: "Attend Live Classes", desc: "Interactive sessions twice a week" },
  { step: "03", label: "Complete Assignments", desc: "Real contracts, real deadlines" },
  { step: "04", label: "Receive Mentor Feedback", desc: "Line-by-line review from practicing lawyers" },
  { step: "05", label: "Build Portfolio", desc: "Curate your best work for employers and clients" },
  { step: "06", label: "Start Freelancing", desc: "Use your skills to earn independently" },
  { step: "07", label: "Career Growth", desc: "Land better roles or grow your practice" },
];

const careerOutcomes = [
  "Draft professional contracts that hold up in practice",
  "Freelance with clear pricing and confident delivery",
  "Build a client-ready portfolio from day one",
  "Work with startups, SMEs, and law firms",
  "Improve interview performance with real drafting experience",
  "Handle commercial agreements independently",
];

const pricingFeatures = [
  { icon: Video, label: "24 Live Sessions", desc: "Interactive, not recorded" },
  { icon: MessageSquare, label: "1-on-1 Mentorship", desc: "Personal feedback on every draft" },
  { icon: FileCheck, label: "6 Practical Assignments", desc: "Real contracts, real review" },
  { icon: Award, label: "Verified Certificate", desc: "Blockchain-backed credential" },
  { icon: Users, label: "Private Community", desc: "Network with peers and mentors" },
  { icon: BookOpen, label: "Lifetime Resources", desc: "Templates, checklists, and guides" },
];

const faqs = [
  {
    question: "Who should join this course?",
    answer: "Law students, fresh graduates, junior associates, independent lawyers, and anyone looking to build practical contract drafting skills or start a freelance legal practice.",
  },
  {
    question: "Do I need prior experience in contract drafting?",
    answer: "No. The course starts with fundamentals and builds to advanced drafting. Complete beginners and those with some experience both benefit.",
  },
  {
    question: "Will I receive a certificate?",
    answer: "Yes. Upon completion, you receive a verified certificate backed by blockchain. It is recognized by law firms and legal employers across India.",
  },
  {
    question: "Are the sessions recorded?",
    answer: "Live attendance is strongly encouraged for the interactive experience. Recordings are available for review within 48 hours of each session.",
  },
  {
    question: "How long is the course?",
    answer: "Eight weeks. Two live sessions per week. Assignments are due weekly. Expect to dedicate 6–8 hours per week including classes and drafting.",
  },
  {
    question: "Will I get assignments?",
    answer: "Yes. Six practical assignments, each reviewed personally by mentors. This is not a video course — it is a hands-on drafting workshop.",
  },
  {
    question: "How does mentoring work?",
    answer: "Every assignment receives detailed line-by-line feedback. You also get two 1-on-1 mentoring calls during the course for personalized career guidance.",
  },
  {
    question: "Can this help with freelancing?",
    answer: "Absolutely. Module 5 is dedicated entirely to freelancing. You will learn pricing, client acquisition, and scope management from lawyers who actually freelance.",
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

/* ─── Curriculum Accordion ─── */

function CurriculumAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.div {...staggerContainer(0.08, 0.3)} className="mx-auto max-w-3xl space-y-3">
      {modules.map((module, i) => {
        const Icon = module.icon;
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            variants={staggerChild}
            className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-stone-50/50"
              aria-expanded={isOpen}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-xs font-bold text-stone-500">
                {module.number}
              </span>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-stone-900">{module.title}</h3>
              </div>
              <Icon className="h-5 w-5 text-stone-400" />
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown className="h-5 w-5 text-stone-400" />
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
                  <div className="border-t border-stone-100 px-5 pb-6 pt-4">
                    <div className="space-y-5">
                      <div>
                        <h4 className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
                          <BookOpen className="h-3.5 w-3.5" />
                          Lessons
                        </h4>
                        <ul className="space-y-2">
                          {module.lessons.map((lesson, li) => (
                            <li key={li} className="flex items-start gap-2.5 text-sm text-stone-600">
                              <Circle className="mt-1.5 h-1.5 w-1.5 shrink-0 fill-stone-300 text-stone-300" />
                              {lesson}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
                          <PenTool className="h-3.5 w-3.5" />
                          Assignment
                        </h4>
                        <p className="text-sm text-stone-600">{module.assignments[0]}</p>
                      </div>
                      <div>
                        <h4 className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
                          <FileCheck className="h-3.5 w-3.5" />
                          Deliverable
                        </h4>
                        <p className="text-sm text-stone-600">{module.deliverables[0]}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ─── Faculty Cards ─── */

function FacultyCard({ member, index }) {
  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="flex h-32 w-full shrink-0 items-center justify-center bg-stone-100 sm:h-auto sm:w-40">
          <User className="h-12 w-12 text-stone-300" />
        </div>
        <div className="flex-1 p-6">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {member.badges.map((badge, bi) => (
              <span
                key={bi}
                className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-500"
              >
                {badge}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-stone-900">{member.name}</h3>
          <p className="mt-0.5 text-sm font-medium text-stone-500">{member.designation}</p>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">{member.intro}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {member.expertise.map((exp, ei) => (
              <span
                key={ei}
                className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs text-stone-600"
              >
                {exp}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-stone-400">
            <Clock className="h-3.5 w-3.5" />
            <span>{member.experience} experience</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-stone-900 opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}

/* ─── Testimonials ─── */

function TestimonialCard({ testimonial, index }) {
  const isLarge = testimonial.size === "large";
  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
        isLarge ? "sm:col-span-2" : ""
      }`}
    >
      <div className="mb-4 flex items-center gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className={`leading-relaxed text-stone-700 ${isLarge ? "text-base" : "text-sm"}`}>
        &ldquo;{testimonial.review}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100">
          <User className="h-5 w-5 text-stone-400" />
        </div>
        <div>
          <div className="text-sm font-semibold text-stone-900">{testimonial.name}</div>
          <div className="text-xs text-stone-500">{testimonial.position}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Timeline ─── */

function Timeline() {
  return (
    <motion.div
      {...staggerContainer(0.1, 0.3)}
      className="relative mx-auto max-w-3xl"
    >
      {/* Vertical line */}
      <div className="absolute left-[19px] top-2 bottom-2 hidden w-px bg-stone-200 sm:block" />
      <div className="space-y-6">
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            variants={staggerChild}
            className="relative flex gap-5 sm:gap-6"
          >
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white shadow-sm">
              <span className="text-xs font-bold text-stone-500">{item.step}</span>
            </div>
            <div className="flex-1 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-stone-900">{item.label}</h3>
              <p className="mt-1 text-sm text-stone-500">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Outcome Item ─── */

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

/* ─── Pricing Card ─── */

function PricingCard() {
  return (
    <motion.div
      {...fadeUp(0.2)}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="relative mx-auto max-w-lg overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg"
    >
      <div className="absolute right-4 top-4">
        <span className="rounded-full bg-stone-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          Limited Seats
        </span>
      </div>
      <div className="p-8">
        <h3 className="text-lg font-semibold text-stone-900">Mastering Contract Drafting & Freelancing</h3>
        <p className="mt-1 text-sm text-stone-500">Cohort-based · 8 weeks · Live sessions</p>
        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight text-stone-900">₹24,999</span>
          <span className="text-sm text-stone-400">one-time</span>
        </div>
        <p className="mt-1 text-xs text-stone-400">EMI available starting at ₹4,167/month</p>
        <div className="mt-8 space-y-3">
          {pricingFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100">
                  <Icon className="h-4 w-4 text-stone-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-stone-800">{feature.label}</div>
                  <div className="text-xs text-stone-400">{feature.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 space-y-3">
          <PrimaryButton icon={ArrowRight} className="w-full justify-center">
            Enroll Now
          </PrimaryButton>
          <SecondaryButton icon={Download} className="w-full justify-center">
            Download Brochure
          </SecondaryButton>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── FAQ Accordion ─── */

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <motion.div {...staggerContainer(0.06, 0.3)} className="mx-auto max-w-3xl space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            variants={staggerChild}
            className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-stone-50/50"
              aria-expanded={isOpen}
            >
              <span className="flex-1 text-base font-medium text-stone-900">{faq.question}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown className="h-5 w-5 text-stone-400" />
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
                  <div className="border-t border-stone-100 px-5 pb-5 pt-4">
                    <p className="text-sm leading-relaxed text-stone-600">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Main Course
   ────────────────────────────────────────────────────────────── */

export default function Course() {
  return (
    <section className="relative bg-stone-50" aria-label="Course details">
      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #1c1917 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── 1. Curriculum ── */}
      <div id="curriculum" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Curriculum"
          title="What you'll learn, week by week"
          subtitle="Six modules. Zero filler. Every lesson chosen because it directly improves your ability to draft, negotiate, and deliver."
          delay={0}
        />
        <div className="mt-16">
          <CurriculumAccordion />
        </div>
      </div>

      {/* ── 2. Meet Your Faculty ── */}
      <div id="faculty" className="border-t border-stone-200/60 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Your Mentors"
            title="Learn from lawyers who practice what they teach"
            subtitle="Every faculty member is actively drafting contracts, handling clients, or training the next generation of lawyers."
            delay={0}
          />
          <motion.div
            {...staggerContainer(0.1, 0.3)}
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {faculty.map((member, i) => (
              <FacultyCard key={i} member={member} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── 3. Student Success ── */}
      <div id="testimonials" className="border-t border-stone-200/60 bg-stone-50">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Student Success"
            title="What our students say"
            subtitle="Real outcomes from real lawyers who took this course."
            delay={0}
          />
          <motion.div
            {...staggerContainer(0.08, 0.3)}
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── 4. Learning Experience ── */}
      <div className="border-t border-stone-200/60 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Journey"
            title="Your learning experience"
            subtitle="From enrollment to career growth. Every step is designed for practical skill building."
            delay={0}
          />
          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </div>

      {/* ── 5. Career Outcomes ── */}
      <div className="border-t border-stone-200/60 bg-stone-50">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Real Results"
            title="What you'll be able to do"
            subtitle="This course is not about watching videos. It is about building capabilities that change your career."
            delay={0}
          />
          <motion.div
            {...staggerContainer(0.06, 0.3)}
            className="mx-auto mt-16 grid max-w-3xl gap-3"
          >
            {careerOutcomes.map((text, i) => (
              <OutcomeItem key={i} text={text} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── 6. Pricing ── */}
      <div className="border-t border-stone-200/60 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Investment"
            title="One course. One price. No tiers."
            subtitle="Everything included. No hidden fees. No upsells."
            delay={0}
          />
          <div className="mt-16">
            <PricingCard />
          </div>
        </div>
      </div>

      {/* ── 7. FAQ ── */}
      <div id="faq" className="border-t border-stone-200/60 bg-stone-50">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Questions"
            title="Frequently asked questions"
            subtitle="Everything you need to know before enrolling."
            delay={0}
          />
          <div className="mt-16">
            <FAQAccordion />
          </div>
        </div>
      </div>

      {/* ── 8. Final CTA ── */}
      <div className="border-t border-stone-200/60 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-32 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
              Ready to draft contracts
              <br />
              <span className="relative inline-block">
                that professionals respect
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-stone-300/70 sm:-bottom-1.5" />
              </span>
              ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-500 sm:text-lg">
              The next cohort begins soon. Seats are limited and fill quickly. Join lawyers who are building real skills, not just collecting certificates.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <PrimaryButton icon={ArrowRight}>
                Enroll Now
              </PrimaryButton>
              <SecondaryButton icon={Download}>
                Download Brochure
              </SecondaryButton>
            </div>
            <p className="mt-6 text-xs text-stone-400">
              Questions? Write to us at courses@lawctopus.com
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}