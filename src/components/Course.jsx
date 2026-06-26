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
  X,
  ShieldCheck,
  Handshake,
  Landmark,
  Building2,
  Wallet,
  Phone,
} from "lucide-react";

import { SocialIcon } from "react-social-icons";

/* ──────────────────────────────────────────────────────────────
   Animation presets — match Hero.jsx and About.jsx exactly
   ────────────────────────────────────────────────────────────── */

const Instagram = (props) => <SocialIcon network="instagram" {...props} />;

const Linkedin = (props) => <SocialIcon network="linkedin" {...props} />;

const Youtube = (props) => <SocialIcon network="youtube" {...props} />;

const Twitter = (props) => <SocialIcon network="x" {...props} />;

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
   Data — Real Lawctopus Content
   ────────────────────────────────────────────────────────────── */

const modules = [
  {
    number: "01",
    title: "Foundations of Contract Drafting",
    icon: BookOpen,
    lessons: [
      "What is a contract; difference between contract and agreement",
      "Essential features of a well-drafted contract",
      "Pre-contractual instruments and components",
      "Effective date, definition clauses, recitals",
      "Representation, warranties, indemnity, confidentiality",
      "Governing law, jurisdiction, dispute resolution",
      "IP clause, termination, force majeure, boilerplate",
    ],
    assignments: ["Draft a basic service agreement from scratch"],
    deliverables: ["One complete draft with mentor review"],
  },
  {
    number: "02",
    title: "Execution Formalities & Negotiation",
    icon: FileCheck,
    lessons: [
      "Allocation of costs, role of witnesses",
      "Stamp duty, registration charges, signatures",
      "How to draft employment agreements and NDAs",
      "Introduction to negotiation: core concepts and mindset",
      "Types and techniques of negotiation",
      "Essential skills of a good negotiator",
      "Pre-negotiation and post-negotiation steps",
    ],
    assignments: ["Contract lab exercise with execution formalities"],
    deliverables: ["Execution-ready contract with negotiation notes"],
  },
  {
    number: "03",
    title: "International Agreements & Advanced Negotiation",
    icon: Globe,
    lessons: [
      "Introduction to international commercial contracts",
      "Governing law, jurisdiction, and dispute resolution in international contracts",
      "How to draft international agreements",
      "Loan agreements: structure and drafting",
      "Employment agreements and NDAs in depth",
      "Mock negotiation of service level agreements",
      "Advanced negotiation skills for commercial deals",
    ],
    assignments: ["Draft an international service agreement"],
    deliverables: ["Cross-border contract with arbitration clause"],
  },
  {
    number: "04",
    title: "IP, Tech Agreements & Website Terms",
    icon: Shield,
    lessons: [
      "Trademark licensing and assignment agreements",
      "Patent licensing agreements",
      "Copyright licensing and joint venture IP",
      "SaaS agreements and software licensing",
      "Terms and conditions for e-commerce websites",
      "Privacy policy and return/refund policy drafting",
      "Terms of use for subscription-based products",
    ],
    assignments: ["Draft a SaaS agreement and website privacy policy"],
    deliverables: ["Tech contract suite ready for client use"],
  },
  {
    number: "05",
    title: "Real Estate Agreements",
    icon: Landmark,
    lessons: [
      "Introduction to sale deeds and leave/license agreements",
      "How to draft a sale deed with risk allocation",
      "Power of attorney: types and drafting",
      "Franchisee agreements: structure and key clauses",
      "Leave and license vs. lease: practical distinctions",
      "Real estate due diligence basics",
    ],
    assignments: ["Draft a leave and license agreement"],
    deliverables: ["Real estate contract portfolio piece"],
  },
  {
    number: "06",
    title: "Business & Commercial Agreements",
    icon: Briefcase,
    lessons: [
      "Sports sponsorship agreements",
      "Shareholders agreements: rights and restrictions",
      "Share purchase and subscription agreements",
      "Partnership agreements and joint ventures",
      "Business transfer agreements",
      "M&A basics: investment documents overview",
    ],
    assignments: ["Draft a shareholders agreement"],
    deliverables: ["Business contract ready for investor review"],
  },
  {
    number: "07",
    title: "Freelancing & Career Skills",
    icon: Globe,
    lessons: [
      "Building your Upwork profile from scratch",
      "Fiverr strategies and gig optimization",
      "LinkedIn profile building for legal professionals",
      "Writing winning proposals that convert",
      "Pricing models: fixed, hourly, retainer",
      "Client communication and scope management",
    ],
    assignments: ["Create a complete Upwork profile and pricing sheet"],
    deliverables: ["Freelance starter kit: profile + proposals + pricing"],
  },
  {
    number: "08",
    title: "Portfolio, Networking & Career Growth",
    icon: Target,
    lessons: [
      "Curating your 17 contracts for maximum impact",
      "CV drafting that gets noticed by recruiters",
      "Cover letters that secure internships and jobs",
      "Networking effectively within your cohort",
      "Salary negotiation and career advancement",
      "Bi-monthly 1-on-1 coaching with founders",
    ],
    assignments: ["Assemble a 5-piece portfolio for job applications"],
    deliverables: ["Professional portfolio + optimized CV and LinkedIn"],
  },
];

const faculty = [
  {
    name: "Shashank Sardesai",
    designation: "Co-founder, EverTrust Legal",
    intro:
      "Ex-Wadia Ghandy, HSA Advocates, Khaitan Legal Associates. Independent litigator and company secretary with deep expertise in partnership deeds, NDAs, and commercial contracts.",
    expertise: ["Commercial Contracts", "Litigation", "Corporate Law"],
    experience: "6+ years",
    badges: ["Ex-Wadia Ghandy", "Ex-HSA", "Ex-Khaitan"],
  },
  {
    name: "Akanksha Mishra",
    designation: "Head of Lawctopus Law School",
    intro:
      "Independent litigator at Bombay High Court. Corporate counsel for BHEL, MyCaptain, Mastersoft ERP. Gold medalist, LLM Constitutional Law. 96.5/100 average rating from 1500+ learners.",
    expertise: ["Contract Drafting", "Real Estate", "Corporate Counsel"],
    experience: "6+ years",
    badges: ["Head LLS", "Gold Medalist", "Bombay HC"],
  },
  {
    name: "Pranjal Doshi",
    designation: "Associate, Walker Morris LLP, UK",
    intro:
      "Cambridge LLM (2019), HNLU (2018). Ex-Trilegal, ex-Khaitan & Co. Specializes in M&A, private equity, and investment documents including share purchase and shareholders agreements.",
    expertise: ["M&A", "Private Equity", "Investment Documents"],
    experience: "5+ years",
    badges: ["Cambridge", "Ex-Trilegal", "Ex-Khaitan"],
  },
  {
    name: "Arunima Jha",
    designation: "Head Legal Counsel, Omnicom Media Group",
    intro:
      "Ex-Legal Counsel at BookMyShow and K Raheja Corp. LLM in Business & Corporate Law. Expert in media law, privacy law, and data security regulations across India and international markets.",
    expertise: ["Media Law", "Privacy Law", "Data Security"],
    experience: "10+ years",
    badges: ["Omnicom", "Ex-BookMyShow", "LLM"],
  },
  {
    name: "Gourav Mohanty",
    designation: "Independent Practitioner, Bombay High Court",
    intro:
      "Ex-Senior Associate, Shardul Amarchand Mangaldas. Gold medalist, Symbiosis Law School. Ram Jethmalani Scholar. Winner, Linklaters NSLR Contract Drafting Competition.",
    expertise: ["Dispute Resolution", "Contract Drafting", "Corporate"],
    experience: "8+ years",
    badges: ["Ex-SAM", "Gold Medalist", "Ram Jethmalani Scholar"],
  },
  {
    name: "Tanuj Kalia",
    designation: "Founding CEO, Lawctopus",
    intro:
      "NUJS Kolkata (2013), MA AUD. Author of 'Law as a Career' (LexisNexis). TEDx speaker. Business World Legal 40 under 40. Currently training to be ICF-certified coach.",
    expertise: ["Legal Education", "Negotiation", "Career Building"],
    experience: "12+ years",
    badges: ["CEO Lawctopus", "TEDx", "40 Under 40"],
  },
];

const courseDevelopers = [
  {
    name: "Bhumesh Verma",
    role: "Recorded Lectures",
    cred: "25+ years experience. Ex-partner at Khaitan & Co., Paras Kuhad & Associates. Managing Partner at Corp Comm Legal. Author of 'Practical Guide to Drafting Commercial Contracts' (OakBridge).",
  },
  {
    name: "Shayonee Dasgupta",
    role: "Lead Researcher & Content Developer",
    cred: "NUJS Kolkata 2012. Ex-Trilegal (2012-15), ex-Shardul Amarchand Mangaldas (Senior Associate 2017-18). Consultant at IDIA. Freelance researcher-writer.",
  },
  {
    name: "Debanshu Khettry",
    role: "Development of Reading Modules",
    cred: "NUJS Kolkata 2013, UCL LLM 2014. Founder, Standard Indian Legal Citation (SILC). Angel Investor with Mumbai Angels and Calcutta Angels. Ex-Platinum Partners, Delhi.",
  },
];

const testimonials = [
  {
    name: "Aarav Patel",
    position: "3rd Year, NLSIU Bangalore",
    review:
      "I went from not knowing how to structure a contract to drafting an NDA for a real startup in week three. The feedback on my drafts was the game changer.",
    rating: 5,
    size: "large",
  },
  {
    name: "Sneha Reddy",
    position: "Junior Associate, AZB & Partners",
    review:
      "My senior noticed the improvement in my drafting within a month. The practical approach here is unlike anything I learned in law school.",
    rating: 5,
    size: "compact",
  },
  {
    name: "Vikram Joshi",
    position: "Freelance Contract Lawyer",
    review:
      "This course gave me the confidence to quit my desk job and freelance. I now have five regular clients and charge three times what I used to earn.",
    rating: 5,
    size: "compact",
  },
  {
    name: "Meera Iyer",
    position: "Fresh Graduate, GLC Mumbai",
    review:
      "The portfolio I built during this course got me three interview calls. Every interviewer asked about the contracts I had drafted.",
    rating: 5,
    size: "large",
  },
];

const timeline = [
  {
    step: "01",
    label: "Enroll",
    desc: "Secure your seat in the upcoming 6-month cohort",
  },
  {
    step: "02",
    label: "Attend Live Classes",
    desc: "55 interactive sessions with expert faculty",
  },
  {
    step: "03",
    label: "Complete 17 Assignments",
    desc: "Real contracts, real deadlines, real feedback",
  },
  {
    step: "04",
    label: "Receive Mentor Feedback",
    desc: "Line-by-line review from practicing lawyers",
  },
  {
    step: "05",
    label: "Build Portfolio",
    desc: "Curate 17 fine-tuned contracts for employers and clients",
  },
  {
    step: "06",
    label: "Start Freelancing",
    desc: "Launch on Upwork, Fiverr, and LinkedIn",
  },
  {
    step: "07",
    label: "Career Growth",
    desc: "Land better roles or grow your independent practice",
  },
];

const careerOutcomes = [
  "Draft 24+ professional contracts that hold up in practice",
  "Freelance on Upwork and Fiverr with clear pricing and confident delivery",
  "Build a client-ready portfolio of 17 fine-tuned contracts",
  "Work with startups, SMEs, law firms, and international clients",
  "Improve interview performance with real drafting experience",
  "Negotiate salaries, deals, and commercial agreements independently",
];

const pricingFeatures = [
  { icon: Video, label: "55 Live Sessions", desc: "Interactive, not recorded" },
  {
    icon: MessageSquare,
    label: "1-on-1 Mentorship",
    desc: "Bi-monthly coaching calls",
  },
  {
    icon: FileCheck,
    label: "17 Practical Assignments",
    desc: "Real contracts, real review",
  },
  {
    icon: Award,
    label: "Verified Certificate",
    desc: "Blockchain-backed credential",
  },
  {
    icon: Users,
    label: "Private Community",
    desc: "WhatsApp groups for opportunities",
  },
  {
    icon: BookOpen,
    label: "Lifetime Resources",
    desc: "Templates, checklists, and guides",
  },
];

const comparisonFeatures = [
  { label: "Duration", short: "2 Months", long: "6 Months" },
  { label: "Live Sessions", short: "8", long: "55" },
  { label: "Assignments", short: "2", long: "17" },
  { label: "Reading Material", short: "202 pages", long: "800 pages" },
  { label: "Recorded Lectures", short: "8.5 hours", long: "32+ hours" },
  { label: "Live Lecture Hours", short: "13 hours", long: "85 hours" },
  { label: "Freelancing Training", short: "No", long: "Yes" },
  { label: "Networking Sessions", short: "No", long: "Yes" },
  { label: "Money-Back Guarantee", short: "Yes", long: "Yes" },
  { label: "Price", short: "₹7,999", long: "₹24,999" },
];

const faqs = [
  {
    question: "Who should join this course?",
    answer:
      "Law students, fresh graduates, junior associates, independent lawyers, business professionals, and anyone looking to build practical contract drafting skills or start a freelance legal practice.",
  },
  {
    question: "Do I need prior experience in contract drafting?",
    answer:
      "No. The course starts with fundamentals and builds to advanced drafting. Complete beginners and those with some experience both benefit.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. Upon completion, you receive a verified certificate backed by blockchain. It is recognized by law firms and legal employers across India.",
  },
  {
    question: "Are the sessions recorded?",
    answer:
      "Live attendance is strongly encouraged for the interactive experience. Recordings are available for review within 48 hours of each session.",
  },
  {
    question: "How long is the course?",
    answer:
      "Six months. Two live sessions per week for the first two months, then 7-8 sessions per month for the remaining four months. Expect to dedicate 6-8 hours per week.",
  },
  {
    question: "Will I get assignments?",
    answer:
      "Yes. Seventeen practical assignments, each reviewed personally by mentors. This is not a video course — it is a hands-on drafting workshop.",
  },
  {
    question: "How does mentoring work?",
    answer:
      "Every assignment receives detailed line-by-line feedback. You also get bi-monthly 1-on-1 coaching calls with LLS founders and faculty for personalized career guidance.",
  },
  {
    question: "Can this help with freelancing?",
    answer:
      "Absolutely. Dedicated freelancing modules cover Upwork, Fiverr, LinkedIn, pricing, proposals, and client management. Direct Upwork opportunities are shared with students.",
  },
  {
    question: "What is the money-back guarantee?",
    answer:
      "Complete the course sincerely (66% attendance, all assignments submitted) and if you feel it added no value, email support@lawctopus.com within 10 days of course completion for a 100% refund. No questions asked.",
  },
];

const careerSupport = [
  {
    icon: Target,
    title: "CV & LinkedIn Building",
    desc: "Draft CVs that get noticed. Build a LinkedIn profile that attracts recruiters.",
  },
  {
    icon: MessageSquare,
    title: "Winning Proposals",
    desc: "Learn to write proposals that convert on Upwork and directly with clients.",
  },
  {
    icon: Users,
    title: "Exclusive WhatsApp Groups",
    desc: "Get internship, job, and freelancing opportunities shared only with alumni.",
  },
  {
    icon: Phone,
    title: "Bi-Monthly 1-on-1 Coaching",
    desc: "30-45 minute career coaching sessions with LLS founders and faculty.",
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

/* ─── Curriculum Accordion ─── */

function CurriculumAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.div
      {...staggerContainer(0.08, 0.3)}
      className="mx-auto max-w-3xl space-y-3"
    >
      {modules.map((module, i) => {
        const Icon = module.icon;
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            variants={staggerChild}
            className="overflow-hidden rounded-xl border border-[#e8e4e0] bg-white shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-[#faf8f5]/50"
              aria-expanded={isOpen}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f5f0eb] text-xs font-bold text-[#b87333]">
                {module.number}
              </span>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-[#1a1a1a]">
                  {module.title}
                </h3>
              </div>
              <Icon className="h-5 w-5 text-[#6b6b6b]" />
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
                  <div className="border-t border-[#f5f0eb] px-5 pb-6 pt-4">
                    <div className="space-y-5">
                      <div>
                        <h4 className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">
                          <BookOpen className="h-3.5 w-3.5" />
                          Lessons
                        </h4>
                        <ul className="space-y-2">
                          {module.lessons.map((lesson, li) => (
                            <li
                              key={li}
                              className="flex items-start gap-2.5 text-sm text-[#6b6b6b]"
                            >
                              <Circle className="mt-1.5 h-1.5 w-1.5 shrink-0 fill-[#d4a574] text-[#d4a574]" />
                              {lesson}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">
                          <PenTool className="h-3.5 w-3.5" />
                          Assignment
                        </h4>
                        <p className="text-sm text-[#6b6b6b]">
                          {module.assignments[0]}
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">
                          <FileCheck className="h-3.5 w-3.5" />
                          Deliverable
                        </h4>
                        <p className="text-sm text-[#6b6b6b]">
                          {module.deliverables[0]}
                        </p>
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
      className="group relative overflow-hidden rounded-xl border border-[#e8e4e0] bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="flex h-32 w-full shrink-0 items-center justify-center bg-[#f5f0eb] sm:h-auto sm:w-40">
          <User className="h-12 w-12 text-[#d4a574]" />
        </div>
        <div className="flex-1 p-6">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {member.badges.map((badge, bi) => (
              <span
                key={bi}
                className="rounded-full bg-[#f5f0eb] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#b87333]"
              >
                {badge}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-[#1a1a1a]">
            {member.name}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-[#6b6b6b]">
            {member.designation}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#6b6b6b]">
            {member.intro}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {member.expertise.map((exp, ei) => (
              <span
                key={ei}
                className="rounded-md border border-[#e8e4e0] bg-[#faf8f5] px-2.5 py-1 text-xs text-[#6b6b6b]"
              >
                {exp}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#6b6b6b]">
            <Clock className="h-3.5 w-3.5" />
            <span>{member.experience} experience</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#b87333] opacity-0 transition-opacity group-hover:opacity-100" />
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
      className={`rounded-xl border border-[#e8e4e0] bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
        isLarge ? "sm:col-span-2" : ""
      }`}
    >
      <div className="mb-4 flex items-center gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-[#d4a574] text-[#d4a574]" />
        ))}
      </div>
      <p
        className={`leading-relaxed text-[#3d3d3d] ${isLarge ? "text-base" : "text-sm"}`}
      >
        &ldquo;{testimonial.review}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f0eb]">
          <User className="h-5 w-5 text-[#b87333]" />
        </div>
        <div>
          <div className="text-sm font-semibold text-[#1a1a1a]">
            {testimonial.name}
          </div>
          <div className="text-xs text-[#6b6b6b]">{testimonial.position}</div>
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
      <div className="absolute left-[19px] top-2 bottom-2 hidden w-px bg-[#e8e4e0] sm:block" />
      <div className="space-y-6">
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            variants={staggerChild}
            className="relative flex gap-5 sm:gap-6"
          >
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e8e4e0] bg-white shadow-sm">
              <span className="text-xs font-bold text-[#b87333]">
                {item.step}
              </span>
            </div>
            <div className="flex-1 rounded-xl border border-[#e8e4e0] bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-[#1a1a1a]">
                {item.label}
              </h3>
              <p className="mt-1 text-sm text-[#6b6b6b]">{item.desc}</p>
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
      className="flex items-start gap-4 rounded-xl border border-[#e8e4e0] bg-white p-5 shadow-sm"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0eb]">
        <CheckCircle2 className="h-4 w-4 text-[#2d5a3d]" />
      </div>
      <p className="text-base font-medium text-[#3d3d3d]">{text}</p>
    </motion.div>
  );
}

/* ─── Pricing Card ─── */

function PricingCard() {
  return (
    <motion.div
      {...fadeUp(0.2)}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="relative mx-auto max-w-lg overflow-hidden rounded-2xl border border-[#e8e4e0] bg-white shadow-lg"
    >
      <div className="absolute right-4 top-4">
        <span className="rounded-full bg-[#1a1a1a] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          Limited Seats
        </span>
      </div>
      <div className="p-8">
        <h3 className="text-lg font-semibold text-[#1a1a1a]">
          Mastering Contract Drafting & Freelancing
        </h3>
        <p className="mt-1 text-sm text-[#6b6b6b]">
          Cohort-based · 6 months · 55 live sessions
        </p>
        <div className="mt-4 rounded-lg border border-[#b87333]/20 bg-[#b87333]/5 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium text-[#b87333]">
            <Calendar className="h-4 w-4" />
            <span>July 1 – December 31, 2026</span>
          </div>
          <div className="mt-1 text-xs text-[#b87333]/80">
            Register by June 30, 2026. Limited seats available.
          </div>
        </div>
        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight text-[#1a1a1a]">
            ₹24,999
          </span>
          <span className="text-sm text-[#6b6b6b] line-through">₹60,000</span>
        </div>
        <p className="mt-1 text-xs text-[#6b6b6b]">
          EMI available starting at ₹4,167/month
        </p>
        <div className="mt-8 space-y-3">
          {pricingFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5f0eb]">
                  <Icon className="h-4 w-4 text-[#b87333]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1a1a1a]">
                    {feature.label}
                  </div>
                  <div className="text-xs text-[#6b6b6b]">{feature.desc}</div>
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

/* ─── Comparison Table ─── */

function ComparisonTable() {
  return (
    <motion.div
      {...fadeUp(0.2)}
      className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-[#e8e4e0] bg-white shadow-sm"
    >
      <div className="grid grid-cols-3 border-b border-[#f5f0eb] bg-[#faf8f5] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">
        <div>Feature</div>
        <div className="text-center">2-Month Course</div>
        <div className="text-center text-[#b87333]">6-Month Expert Course</div>
      </div>
      {comparisonFeatures.map((feature, i) => (
        <div
          key={i}
          className={`grid grid-cols-3 px-6 py-3.5 text-sm ${
            i !== comparisonFeatures.length - 1
              ? "border-b border-[#f5f0eb]"
              : ""
          }`}
        >
          <div className="font-medium text-[#3d3d3d]">{feature.label}</div>
          <div className="text-center text-[#6b6b6b]">{feature.short}</div>
          <div
            className={`text-center font-semibold ${feature.label === "Price" ? "text-[#b87333]" : "text-[#1a1a1a]"}`}
          >
            {feature.long}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ─── Career Support Cards ─── */

function CareerSupportCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="flex gap-4 rounded-xl border border-[#e8e4e0] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f5f0eb] text-[#b87333]">
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

/* ─── FAQ Accordion ─── */

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <motion.div
      {...staggerContainer(0.06, 0.3)}
      className="mx-auto max-w-3xl space-y-3"
    >
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            variants={staggerChild}
            className="overflow-hidden rounded-xl border border-[#e8e4e0] bg-white shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-[#faf8f5]/50"
              aria-expanded={isOpen}
            >
              <span className="flex-1 text-base font-medium text-[#1a1a1a]">
                {faq.question}
              </span>
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
                    <p className="text-sm leading-relaxed text-[#6b6b6b]">
                      {faq.answer}
                    </p>
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

/* ─── Money Back Guarantee ─── */

function MoneyBackGuarantee() {
  return (
    <motion.div
      {...fadeUp(0.2)}
      className="mx-auto max-w-3xl rounded-xl border border-[#e8f5ec] bg-[#e8f5ec]/30 p-8 text-center"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white">
        <ShieldCheck className="h-6 w-6 text-[#2d5a3d]" />
      </div>
      <h3 className="text-xl font-semibold text-[#2d5a3d]">
        100% Money-Back Guarantee
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#3d3d3d]">
        Complete the course sincerely — attend 66% of live classes with video
        on, submit all 17 assignments, and pass each one. If you still feel it
        added no value to your career, email us within 10 days of course
        completion. We&apos;ll refund 100% of your fee. No questions asked.
      </p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Main Course
   ────────────────────────────────────────────────────────────── */

export default function Course() {
  return (
    <section className="relative bg-[#faf8f5]" aria-label="Course details">
      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── 1. Curriculum ── */}
      <div
        id="curriculum"
        className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8"
      >
        <SectionHeader
          eyebrow="The Curriculum"
          title="What you'll learn, month by month"
          subtitle="Eight modules across six months. Zero filler. Every lesson chosen because it directly improves your ability to draft, negotiate, and deliver."
          delay={0}
        />
        <div className="mt-16">
          <CurriculumAccordion />
        </div>
      </div>

      {/* ── 2. Meet Your Faculty ── */}
      <div id="faculty" className="border-t border-[#e8e4e0]/60 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Your Mentors"
            title="Learn from lawyers who practice what they teach"
            subtitle="Faculty from Trilegal, Khaitan, Cambridge, Bombay High Court, and top international firms. Every instructor is actively drafting contracts and handling clients."
            delay={0}
          />
          <motion.div
            {...staggerContainer(0.1, 0.3)}
            className="mt-16 grid gap-4 sm:grid-cols-2"
          >
            {faculty.map((member, i) => (
              <FacultyCard key={i} member={member} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Course Developers ── */}
      <div className="border-t border-[#e8e4e0]/60 bg-[#faf8f5]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Behind the Content"
            title="Course developers"
            subtitle="The curriculum is built by lawyers who have practiced at India's top firms and studied at world's best universities."
            delay={0}
          />
          <motion.div
            {...staggerContainer(0.1, 0.3)}
            className="mt-16 grid gap-4 sm:grid-cols-3"
          >
            {courseDevelopers.map((dev, i) => (
              <motion.div
                key={i}
                variants={staggerChild}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-xl border border-[#e8e4e0] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5f0eb]">
                  <PenTool className="h-5 w-5 text-[#b87333]" />
                </div>
                <h3 className="text-base font-semibold text-[#1a1a1a]">
                  {dev.name}
                </h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-[#b87333]">
                  {dev.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#6b6b6b]">
                  {dev.cred}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── 3. Student Success ── */}
      <div
        id="testimonials"
        className="border-t border-[#e8e4e0]/60 bg-[#faf8f5]"
      >
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
      <div className="border-t border-[#e8e4e0]/60 bg-white">
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
      <div className="border-t border-[#e8e4e0]/60 bg-[#faf8f5]">
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

      {/* ── 6. Career & Placement Support ── */}
      <div className="border-t border-[#e8e4e0]/60 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Career Support"
            title="We don't just teach. We help you build a career."
            subtitle="Four dedicated support systems to turn your skills into income and employment."
            delay={0}
          />
          <motion.div
            {...staggerContainer(0.08, 0.3)}
            className="mt-16 grid gap-4 sm:grid-cols-2"
          >
            {careerSupport.map((item, i) => (
              <CareerSupportCard key={i} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Add-on Benefits ── */}
      <div className="border-t border-[#e8e4e0]/60 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Extras"
            title="Add-on benefits"
            subtitle="What you get beyond the core curriculum."
            delay={0}
          />
          <motion.div
            {...staggerContainer(0.06, 0.3)}
            className="mx-auto mt-16 grid max-w-3xl gap-3"
          >
            {[
              "Completion certificate from Lawctopus Law School",
              "Merit certificates for best-performing learners",
              "Free access to webinars on contract drafting and CLM",
              "LLS alumni group for exclusive internship/job notifications",
              "Discounts on future courses and workshops",
            ].map((text, i) => (
              <motion.div
                key={i}
                variants={staggerChild}
                className="flex items-start gap-4 rounded-xl border border-[#e8e4e0] bg-white p-5 shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0eb]">
                  <CheckCircle2 className="h-4 w-4 text-[#b87333]" />
                </div>
                <p className="text-base font-medium text-[#3d3d3d]">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── 7. Pricing ── */}
      <div id="pricing" className="border-t border-[#e8e4e0]/60 bg-[#faf8f5]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Investment"
            title="One course. One price. No tiers."
            subtitle="Everything included. No hidden fees. No upsells. Compare our two offerings:"
            delay={0}
          />
          <div className="mt-12">
            <ComparisonTable />
          </div>
          <div className="mt-16">
            <PricingCard />
          </div>
          <div className="mt-12">
            <MoneyBackGuarantee />
          </div>
        </div>
      </div>

      {/* ── 8. FAQ ── */}
      <div id="faq" className="border-t border-[#e8e4e0]/60 bg-white">
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

      {/* ── 9. Final CTA ── */}
      <div className="border-t border-[#e8e4e0]/60 bg-[#faf8f5]">
        <div className="mx-auto max-w-4xl px-5 py-32 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#1a1a1a] sm:text-4xl lg:text-5xl">
              Ready to draft contracts
              <br />
              <span className="relative inline-block">
                that professionals respect
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#b87333]/60 sm:-bottom-1.5" />
              </span>
              ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#6b6b6b] sm:text-lg">
              The next cohort begins soon. Seats are limited and fill quickly.
              Join lawyers who are building real skills, not just collecting
              certificates.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <PrimaryButton icon={ArrowRight}>
                Enroll Now — ₹24,999
              </PrimaryButton>
              <SecondaryButton icon={Download}>
                Download Brochure
              </SecondaryButton>
            </div>
            <p className="mt-6 text-xs text-[#6b6b6b]">
              Questions? Write to us at courses@lawctopus.com
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
