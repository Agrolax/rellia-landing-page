import { useState, type KeyboardEvent } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
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
import { useQmsProgramPage } from "@/hooks/useCmsDocuments";
import { DEFAULT_QMS_PROGRAM } from "@shared/cms/defaults";

const howItWorksCards = [
  {
    icon: FileText,
    title: "Starting Frameworks",
    description:
      "Receive customized SOPs and templates that serve as your foundation - designed to be flexible enough for early-stage startups.",
  },
  {
    icon: Wrench,
    title: "Implementation Support",
    description:
      "Work through building your QMS with support and accountability at every step so nothing falls through the cracks",
  },
  {
    icon: UserCheck,
    title: "1-on-1 Mentorship",
    description:
      "Get personalized guidance from quality and regulatory experts who have built processes for medical device companies and who understand your constraints",
  },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Compliance Simplified",
    description:
      "Complex regulatory requirements are translated into clear, scalable systems appropriate for early-stage companies.",
  },
  {
    icon: Layers,
    title: "Own Your Own Processes",
    description:
      "No two companies operate the same way. We build your QMS around how your team actually works, not with one-size-fits-all templates.",
  },
  {
    icon: GraduationCap,
    title: "Expert Guidance",
    description:
      "Your mentor knows quality inside and out. Together you get it done without adding quality management to your already long list of things to master.",
  },
  {
    icon: Timer,
    title: "Take It At Your Own Pace",
    description:
      "Every startup moves differently. The program flexes to your timeline, capacity, and priorities because we know that your QMS is just one of the hundred things you are juggling right now.",
  },
];

type TimelineMonth = { month: string; weeks: string[] };

const timeline: TimelineMonth[] = [
  {
    month: "Month 1 — Core Processes",
    weeks: [
      "Week 1–2: QMS gap assessment and regulatory landscape, Document control system setup, Employee training and hiring practices, Work environment and security controls",
      "Week 3–4: Design controls, Product development lifecycle (IEC 62304), Risk management framework (ISO 14971)",
    ],
  },
  {
    month: "Month 2 — Vendors and Manufacturing Partners",
    weeks: [
      "Week 5–6: Validation of third-party tools and production processes, Configuration and change management, Supplier evaluation",
      "Week 7–8: Purchasing processes, Inspection of purchased products and services, Production and operations controls",
    ],
  },
  {
    month: "Month 3 — Market Launch",
    weeks: [
      "Week 9–10: Labeling and distribution, Marketing and sales, Installation and customer support",
      "Week 11–12: Post-market monitoring and customer complaint handling, Regulatory and legal compliance, Adverse events and recall management",
    ],
  },
  {
    month: "Month 4 — Continuous Improvements",
    weeks: [
      "Week 13–14: Handling defects, Preventing future issues from occurring, Internal and external audit preparation",
      "Week 15–16: Data analysis and improvements, Management responsibilities, Quality system summary and future objectives",
    ],
  },
];

const QMS_OUTCOMES_SECTION_ID = "qms-program-outcomes"

export default function ProgramsQms() {
  const [timelineOpen, setTimelineOpen] = useState<string | undefined>(undefined);
  const { data } = useQmsProgramPage();
  const q = data ?? DEFAULT_QMS_PROGRAM;

  const handleLearnMoreClick = () => {
    document.getElementById(QMS_OUTCOMES_SECTION_ID)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleLearnMoreKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleLearnMoreClick();
    }
  };

  return (
    <div className="min-h-screen bg-white font-host-grotesk overflow-x-hidden">
      <Navbar />

      <main>
        {/* BUILD YOUR QMS */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row lg:items-center gap-16">
                <div className="flex-1 max-w-lg lg:max-w-xl order-1 lg:order-1">
                  <img
                    src="/images/QMS-programs.webp"
                    alt="Build Your QMS program"
                    className="w-full rounded-3xl shadow-2xl"
                  />
                </div>

                <div className="flex-1 order-2 lg:order-2">
                  <h2 className="font-host-grotesk font-bold text-black text-4xl md:text-5xl tracking-tight mb-6">
                    {q.heroTitle}
                  </h2>
                  <p className="font-urbanist text-black/70 text-lg md:text-xl leading-relaxed max-w-xl">
                    {q.heroDescription}
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center">
                    <a
                      href={q.paymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-rellia-teal text-white font-host-grotesk font-semibold px-8 py-4 border-2 border-rellia-teal hover:bg-white hover:text-rellia-teal transition-all duration-200"
                    >
                      {q.heroCtaLabel}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                    <button
                      type="button"
                      onClick={handleLearnMoreClick}
                      onKeyDown={handleLearnMoreKeyDown}
                      className="inline-flex items-center justify-center rounded-full bg-white text-rellia-teal font-host-grotesk font-semibold px-8 py-4 border-2 border-rellia-teal hover:bg-rellia-teal/5 transition-all duration-200"
                      aria-label="Learn more about the program — scroll to Program Outcomes"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Program Outcomes */}
        <section
          id={QMS_OUTCOMES_SECTION_ID}
          className="scroll-mt-24 md:scroll-mt-[5.5rem] py-16 md:py-24 bg-rellia-teal/5"
        >
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal className="mb-12 text-center">
              <h3 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight">
                {q.outcomesTitle}
              </h3>
            </ScrollReveal>
            <div className="py-2">
              <ScrollReveal>
                <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
                  <p className="font-urbanist text-black/60 text-base md:text-lg leading-relaxed text-center">
                    {q.outcomesIntro}
                  </p>

                  <ul className="max-w-2xl w-full mx-auto flex flex-col gap-4">
                    {q.outcomes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-rellia-teal shrink-0 mt-0.5" />
                        <span className="font-urbanist text-black/75 text-base md:text-lg leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal className="mb-12 text-center">
              <h3 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight">
                {q.howItWorksTitle}
              </h3>
            </ScrollReveal>
            <div className="mb-8">
              <p className="font-urbanist text-black/60 text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto">
                {q.howItWorksIntro}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorksCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <ScrollReveal key={card.title} delay={i * 0.1}>
                    <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
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
        <section className="py-16 md:py-24 bg-rellia-teal/5">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal className="mb-12 text-center">
              <h3 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight">
                {q.pillarsTitle}
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <ScrollReveal key={pillar.title} delay={i * 0.1}>
                    <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
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
                {q.timelineTitle}
              </h3>
              <p className="font-urbanist text-black/60 text-base md:text-lg mt-4 max-w-xl mx-auto">
                {q.timelineSubtitle}
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
                    className="border border-black/8 rounded-2xl overflow-hidden bg-rellia-teal/5 px-6"
                  >
                    <AccordionTrigger className="font-host-grotesk font-semibold text-black text-lg md:text-xl py-5 hover:no-underline">
                      {month.month}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <ul className="flex flex-col gap-2 pl-1">
                        {month.weeks.map((weekLine) => (
                          <li key={weekLine} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-rellia-mint shrink-0 mt-0.5" />
                            <span className="font-urbanist text-black/70 text-sm leading-relaxed">
                              {weekLine}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 md:py-24 bg-rellia-teal/5">
          <div className="max-w-[620px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <div className="bg-white rounded-3xl border border-black/5 shadow-lg p-8 md:p-10 text-center">
                <span className="inline-flex items-center rounded-full border border-rellia-teal/20 bg-rellia-teal/5 px-4 py-1 text-xs md:text-sm font-urbanist text-rellia-teal mb-6">
                  {q.pricingBadge}
                </span>

                <div className="mt-6 mb-4">
                  <div className="flex items-start justify-center">
                    <span className="text-5xl md:text-6xl font-bold text-rellia-teal tracking-tight leading-none">
                      {q.pricingAmount}
                    </span>
                    <span className="text-3xl md:text-4xl font-bold text-rellia-teal tracking-tight leading-none">
                      {q.pricingSubAmount}
                    </span>
                  </div>
                </div>

                <p className="font-urbanist text-black/60 text-base md:text-lg leading-relaxed max-w-md mx-auto mb-8">
                  {q.pricingDescription}
                </p>

                <div className="h-px bg-black/10 w-full mb-6" />

                <ul className="mt-4 flex flex-col gap-3 list-none font-urbanist text-black/60 text-base md:text-lg leading-relaxed text-left w-full items-start">
                  {q.pricingBullets.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-rellia-teal shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={q.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full inline-flex items-center justify-center rounded-full bg-rellia-teal text-white font-host-grotesk font-semibold px-8 py-4 border-2 border-rellia-teal transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-rellia-teal hover:shadow-lg"
                >
                  {q.heroCtaLabel}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
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
                  {q.bottomCtaTitle}
                </h3>
                <p className="font-urbanist text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-8">
                  {q.bottomCtaBody}
                </p>

                <a
                  href={q.bottomContactHref}
                  className="inline-flex items-center justify-center rounded-full bg-rellia-mint text-rellia-teal font-host-grotesk font-semibold px-8 py-4 hover:bg-white transition-colors duration-200"
                >
                  {q.bottomCtaButtonLabel}
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
