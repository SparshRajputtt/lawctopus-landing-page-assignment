import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  Globe,
  CheckCircle2,
  Layers,
  Award,
  PenTool,
  MessageSquare,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";

import { SocialIcon } from "react-social-icons";

/* ──────────────────────────────────────────────────────────────
   Animation presets — match Hero, About, Course, Navbar exactly
   ────────────────────────────────────────────────────────────── */

const Instagram = (props) => <SocialIcon network="instagram" {...props} />;

const Linkedin = (props) => <SocialIcon network="linkedin" {...props} />;

const Youtube = (props) => <SocialIcon network="youtube" {...props} />;

const Twitter = (props) => <SocialIcon network="x" {...props} />;

const EASE_OUT = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: EASE_OUT },
});

const staggerContainer = (stagger = 0.06, delay = 0) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-60px" },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  },
});

const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

/* ──────────────────────────────────────────────────────────────
   Data
   ────────────────────────────────────────────────────────────── */

const quickLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Faculty", href: "#faculty" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const courseInfo = [
  { icon: Layers, label: "Live Online Cohort" },
  { icon: Award, label: "Certificate of Completion" },
  { icon: PenTool, label: "Practical Assignments" },
  { icon: MessageSquare, label: "Mentor Support" },
  { icon: Briefcase, label: "Career & Freelancing Focus" },
];

const contact = [
  {
    icon: Mail,
    label: "courses@lawctopus.com",
    href: "mailto:courses@lawctopus.com",
  },
  { icon: Phone, label: "+91 98765 43210", href: "tel:+919876543210" },
  {
    icon: Globe,
    label: "www.lawctopus.com",
    href: "https://www.lawctopus.com",
  },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/lawctopus" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/lawctopus.official/" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@LawctopusOfficial" },
  { icon: Twitter, label: "X", href: "https://x.com/Lawctopus" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Disclaimer", href: "#" },
];

/* ──────────────────────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────────────────────── */

function handleNavClick(href) {
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ──────────────────────────────────────────────────────────────
   Main Footer
   ────────────────────────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer
      className="relative border-t border-[#e8e4e0]/60 bg-white"
      aria-label="Footer"
    >
      {/* Subtle dot pattern — matches Hero, About, Course */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Area */}
          <motion.div {...fadeUp(0)} className="lg:col-span-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-[#1a1a1a]"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1a1a1a] text-white">
                <span className="text-xs font-bold">L</span>
              </div>
              <span>Lawctopus</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#6b6b6b]">
              India&apos;s largest legal education platform. We build practical
              skills for law students and young lawyers through live mentorship
              and real-world training.
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#6b6b6b]/70">
              No theory. No filler. Just skills that advance your career.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            {...staggerContainer(0.04, 0.1)}
            className="lg:col-span-2 lg:col-start-6"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">
              Navigate
            </h3>
            <ul className="mt-5 space-y-2.5">
              {quickLinks.map((link, i) => (
                <motion.li key={i} variants={staggerChild}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="group flex items-center gap-1.5 text-sm text-[#6b6b6b] transition-colors hover:text-[#1a1a1a]"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Course Information */}
          <motion.div
            {...staggerContainer(0.04, 0.15)}
            className="lg:col-span-3"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">
              Course
            </h3>
            <ul className="mt-5 space-y-2.5">
              {courseInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={i}
                    variants={staggerChild}
                    className="flex items-center gap-2 text-sm text-[#6b6b6b]"
                  >
                    <Icon className="h-3.5 w-3.5 text-[#b87333]" />
                    {item.label}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            {...staggerContainer(0.04, 0.2)}
            className="lg:col-span-3"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">
              Contact
            </h3>
            <ul className="mt-5 space-y-2.5">
              {contact.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.li key={i} variants={staggerChild}>
                    <a
                      href={item.href}
                      className="group flex items-center gap-2 text-sm text-[#6b6b6b] transition-colors hover:text-[#1a1a1a]"
                    >
                      <Icon className="h-3.5 w-3.5 text-[#b87333]" />
                      {item.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((social, i) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="text-[#6b6b6b] transition-colors hover:text-[#b87333]"
                    aria-label={social.label}
                  >
                    <Icon
                      style={{ width: 32, height: 32 }}
                      bgColor="transparent"
                      fgColor="currentColor"
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#f5f0eb] pt-8 sm:flex-row"
        >
          <p className="text-xs text-[#6b6b6b]/60">
            &copy; {new Date().getFullYear()} Lawctopus. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-xs text-[#6b6b6b]/60 transition-colors hover:text-[#6b6b6b]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
