import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  FileText,
  Wrench,
  UserCheck,
  ShieldCheck,
  Layers,
  GraduationCap,
  Timer,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  QMS data                                                           */
/* ------------------------------------------------------------------ */

const outcomes = [
  "A regulatory-ready Quality Management System tailored to your product classification",
  "SOPs, templates, and records you own and can maintain independently",
  "A clear understanding of regulatory expectations for your target markets (FDA, Health Canada, EU MDR)",
  "Confidence to face audits, investor diligence, and partner evaluations",
  "Practical experience applying quality processes in a real startup context",
];

const howItWorksCards = [
  {
    icon: FileText,
    title: "Starting Frameworks",
    description:
      "Receive carefully curated templates and SOPs that serve as your foundation — designed specifically for digital health startups, not copied from big pharma.",
  },
  {
    icon: Wrench,
    title: "Implementation Support",
    description:
      "Work through building your QMS step by step with direct support, feedback loops, and peer accountability so nothing falls through the cracks.",
  },
  {
    icon: UserCheck,
    title: "1-on-1 Mentorship",
    description:
      "Get personalized guidance from regulatory and quality experts who have built QMS for SaMD and digital health companies — and who understand your constraints.",
  },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Compliance Simplified",
    description:
      "We translate complex regulatory requirements into clear, actionable steps so you can focus on building rather than deciphering standards.",
  },
  {
    icon: Layers,
    title: "Own Your Own Processes",
    description:
      "Everything we build together stays with you. No vendor lock-in, no black boxes — just a QMS your team can understand, maintain, and evolve.",
  },
  {
    icon: GraduationCap,
    title: "Founder-Centered Mentorship",
    description:
      "This isn't a course — it's hands-on support. Your mentor meets you where you are and guides you through the decisions that matter most.",
  },
  {
    icon: Timer,
    title: "Take It At Your Own Pace",
    description:
      "Every startup moves differently. The program flexes to your timeline, capacity, and priorities so quality work actually gets done.",
  },
];

type TimelineMonth = {
  month: string;
  weeks: { week: string; topics: string[] }[];
};

const timeline: TimelineMonth[] = [
  {
    month: "Month 1 — Foundations",
    weeks: [
      {
        week: "Week 1–2",
        topics: [
          "QMS overview & regulatory landscape",
          "Quality policy & objectives",
          "Document control system setup",
        ],
      },
      {
        week: "Week 3–4",
        topics: [
          "Risk management framework (ISO 14971)",
          "Design controls introduction",
          "Record-keeping best practices",
        ],
      },
    ],
  },
  {
    month: "Month 2 — Core Processes",
    weeks: [
      {
        week: "Week 5–6",
        topics: [
          "Software development lifecycle (IEC 62304)",
          "SOUP management",
          "Configuration & change management",
        ],
      },
      {
        week: "Week 7–8",
        topics: [
          "Complaint handling & CAPA",
          "Supplier management",
          "Internal audit preparation",
        ],
      },
    ],
  },
  {
    month: "Month 3 — Maturity & Readiness",
    weeks: [
      {
        week: "Week 9–10",
        topics: [
          "Cybersecurity & privacy requirements",
          "Clinical evaluation planning",
          "Labeling & post-market surveillance",
        ],
      },
      {
        week: "Week 11–12",
        topics: [
          "Mock audit exercise",
          "QMS gap analysis & remediation",
          "Regulatory submission readiness review",
        ],
      },
    ],
  },
];

export default function ProgramsQms() {
  const QMS_FORM_URL = "https://forms.fillout.com/t/1GPWpbBbWcus";
  const [timelineOpen, setTimelineOpen] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-white font-host-grotesk overflow-x-hidden">
      <Navbar />

      <main>
        {/* BUILD YOUR QMS */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row lg:items-center gap-16">
                <div className="flex-1">
                  <h2 className="font-host-grotesk font-bold text-black text-4xl md:text-5xl tracking-tight mb-6">
                    Build Your QMS
                  </h2>
                  <p className="font-urbanist text-black/70 text-lg md:text-xl leading-relaxed max-w-xl">
                    A structured, mentor-led program that helps digital health founders build a regulatory-ready Quality Management System from scratch — without needing a background in regulatory affairs.
                  </p>

                  <div className="mt-8">
                    <a
                      href={QMS_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-rellia-teal text-white font-host-grotesk font-semibold px-8 py-4 border-2 border-rellia-teal hover:bg-white hover:text-rellia-teal transition-all duration-200"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
                <div className="flex-1 max-w-lg lg:max-w-xl">
                  <img
                    src="/images/QMS-programs.webp"
                    alt="Build Your QMS program"
                    className="w-full rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Program Outcomes */}
        <section className="py-16 md:py-24 bg-rellia-cream/50">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal className="mb-12 text-center">
              <h3 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight">
                Program Outcomes
              </h3>
            </ScrollReveal>
            <div className="py-2">
              <ScrollReveal>
                <ul className="max-w-2xl mx-auto flex flex-col gap-4">
                  {outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-rellia-teal shrink-0 mt-0.5" />
                      <span className="font-urbanist text-black/75 text-base md:text-lg leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal className="mb-12 text-center">
              <h3 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight">
                How It Works
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorksCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <ScrollReveal key={card.title} delay={i * 0.1}>
                    <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-sm hover:shadow-lg transition-shadow h-full">
                      <div className="w-12 h-12 rounded-2xl bg-rellia-mint/20 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-rellia-teal" />
                      </div>
                      <h4 className="font-host-grotesk font-bold text-black text-xl mb-3">
                        {card.title}
                      </h4>
                      <p className="font-urbanist text-black/65 text-base leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Program Pillars */}
        <section className="py-16 md:py-24 bg-rellia-cream/50">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal className="mb-12 text-center">
              <h3 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight">
                Program Pillars
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <ScrollReveal key={pillar.title} delay={i * 0.1}>
                    <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-sm hover:shadow-md transition-shadow h-full">
                      <div className="w-12 h-12 rounded-2xl bg-rellia-mint/20 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-rellia-teal" />
                      </div>
                      <h4 className="font-host-grotesk font-bold text-black text-lg mb-3">
                        {pillar.title}
                      </h4>
                      <p className="font-urbanist text-black/65 text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Program Timeline */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[900px] mx-auto px-6 md:px-10">
            <ScrollReveal className="mb-12 text-center">
              <h3 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight">
                Program Timeline
              </h3>
              <p className="font-urbanist text-black/60 text-base md:text-lg mt-4 max-w-xl mx-auto">
                A 12-week structured journey through the key pillars of a health-tech QMS.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <Accordion
                type="single"
                collapsible
                value={timelineOpen}
                onValueChange={setTimelineOpen}
                className="flex flex-col gap-4"
              >
                {timeline.map((month) => (
                  <AccordionItem
                    key={month.month}
                    value={month.month}
                    className="border border-black/8 rounded-2xl overflow-hidden bg-rellia-cream/30 px-6"
                  >
                    <AccordionTrigger className="font-host-grotesk font-semibold text-black text-lg md:text-xl py-5 hover:no-underline">
                      {month.month}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="flex flex-col gap-5">
                        {month.weeks.map((w) => (
                          <div key={w.week}>
                            <h5 className="font-host-grotesk font-semibold text-rellia-teal text-base mb-2">
                              {w.week}
                            </h5>
                            <ul className="flex flex-col gap-1.5 pl-1">
                              {w.topics.map((topic) => (
                                <li key={topic} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-rellia-mint shrink-0 mt-0.5" />
                                  <span className="font-urbanist text-black/70 text-sm leading-relaxed">
                                    {topic}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 md:py-24 bg-rellia-cream/50">
          <div className="max-w-[700px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <div className="bg-white rounded-3xl border border-black/5 shadow-lg p-8 md:p-10 text-center">
                <span className="inline-flex items-center rounded-full border border-rellia-teal/20 bg-rellia-teal/5 px-4 py-1 text-xs md:text-sm font-urbanist text-rellia-teal mb-6">
                  Pricing
                </span>
                <div className="mb-6">
                  <span className="text-5xl md:text-6xl font-bold text-black tracking-tight">
                    $2,000
                  </span>
                  <span className="text-black/50 text-lg font-urbanist ml-2">/month</span>
                </div>
                <p className="font-urbanist text-black/60 text-base md:text-lg leading-relaxed max-w-md mx-auto mb-8">
                  Subscription-based. Includes 1-on-1 mentorship, all templates and SOPs, weekly check-ins, and peer cohort access.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* QMS CTA */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <div className="bg-rellia-teal rounded-3xl px-8 py-14 md:px-16 md:py-20 text-center">
                <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Ready to build your QMS?
                </h3>
                <p className="font-urbanist text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-8">
                  Reach out and we&apos;ll help you figure out if the program is the right fit for where you are today.
                </p>
                <a
                  href={QMS_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-rellia-mint text-rellia-teal font-host-grotesk font-semibold px-8 py-4 rounded-full hover:bg-white transition-colors duration-200 inline-flex"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

