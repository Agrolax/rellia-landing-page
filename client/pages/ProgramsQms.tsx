import { useState } from "react";
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

/* ------------------------------------------------------------------ */
/*  QMS data                                                           */
/* ------------------------------------------------------------------ */

const outcomes = [
  "Obtain regulatory approvals to enter new markets",
  "Pass regulator audits and inspections",
  "Demonstrate a critical early milestone to investors",
  "Execute business operations more efficiently",
  "Gain customer trust and competitive advantage",
];

const howItWorksCards = [
  {
    icon: FileText,
    title: "Starting Frameworks",
    description:
      "You’ll receive pre-built templates, frameworks, and guidances to give you a solid starting point.",
  },
  {
    icon: Wrench,
    title: "Implementation Support",
    description:
      "You’ll also receive an instructional video to walk you through how to complete the templates and apply them to your own QMS.",
  },
  {
    icon: UserCheck,
    title: "1-on-1 Mentorship",
    description:
      "You’ll have dedicated time with a QMS mentor who will help troubleshoot challenges, refine your SOPs, and ensure you stay compliant.",
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
      "You know your company better than anyone. You’ll have our templates to get you started, but then you’ll have total control in how your systems are designed.",
  },
  {
    icon: GraduationCap,
    title: "Founder-Centered Mentorship",
    description:
      "You’ll receive personalized, one-on-one mentorship from a regulatory and quality expert. You’ll never have to guess if something is compliant or not.",
  },
  {
    icon: Timer,
    title: "Take It At Your Own Pace",
    description:
      "The program is designed to help keep you on track, but we understand that things change fast for startups. Timelines can be made flexible according to your schedule.",
  },
];

type TimelineMonth = { month: string; weeks: string[] };

const timeline: TimelineMonth[] = [
  {
    month: "Month 1",
    weeks: [
      "Week 1: Document and Record Control, Training and Qualification",
      "Week 2: Work Environment, Information Security",
      "Week 3: Product Development",
      "Week 4: Risk Management",
    ],
  },
  {
    month: "Month 2",
    weeks: [
      "Week 5: Supplier Management",
      "Week 6: Purchasing, Incoming Quality Control, Process Software Validation",
      "Week 7: Production, Operations",
      "Week 8: Validation, Change Management",
    ],
  },
  {
    month: "Month 3",
    weeks: [
      "Week 9: Marketing, Sales, Installation, and Support",
      "Week 10: Shipping, Labeling",
      "Week 11: Complaint Management",
      "Week 12: Nonconformities and CAPAs",
    ],
  },
  {
    month: "Month 4",
    weeks: [
      "Week 13: Audits",
      "Week 14: Regulatory, Legal, Adverse Events, and Recalls",
      "Week 15: Analysis, Improvements, and Management Responsibility",
      "Week 16: Quality Manual",
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
                <div className="flex-1 max-w-lg lg:max-w-xl order-1 lg:order-1">
                  <img
                    src="/images/QMS-programs.webp"
                    alt="Build Your QMS program"
                    className="w-full rounded-3xl shadow-2xl"
                  />
                </div>

                <div className="flex-1 order-2 lg:order-2">
                  <h2 className="font-host-grotesk font-bold text-black text-4xl md:text-5xl tracking-tight mb-6">
                    <span className="block">Build Your</span>
                    <span className="block">Quality Management System</span>
                  </h2>
                  <p className="font-urbanist text-black/70 text-lg md:text-xl leading-relaxed max-w-xl">
                    Build a lean, scalable QMS to comply with ISO 13485, MDSAP, FDA, and MDR requirements, with personalized guidance from quality experts every step of the way
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
                <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
                  <p className="font-urbanist text-black/60 text-base md:text-lg leading-relaxed text-center">
                    By the end of this program, you will have a complete quality management system. A well-designed QMS enables your company to:
                  </p>

                  <ul className="max-w-2xl w-full mx-auto flex flex-col gap-4">
                    {outcomes.map((item) => (
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
                How It Works
              </h3>
            </ScrollReveal>
            <div className="mb-8">
              <p className="font-urbanist text-black/60 text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto">
                Each week, you will receive the following guidance to ensure your success throughout the program.
              </p>
            </div>
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
                Program Timeline & Details
              </h3>
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
        <section className="py-16 md:py-24 bg-rellia-cream/50">
          <div className="max-w-[620px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <div className="bg-white rounded-3xl border border-black/5 shadow-lg p-8 md:p-10 text-center">
                <span className="inline-flex items-center rounded-full border border-rellia-teal/20 bg-rellia-teal/5 px-4 py-1 text-xs md:text-sm font-urbanist text-rellia-teal mb-6">
                  Monthly subscription
                </span>

                <div className="mt-6 mb-4">
                  <div className="flex items-start justify-center">
                    <span className="text-5xl md:text-6xl font-bold text-rellia-teal tracking-tight leading-none">
                      $2000
                    </span>
                    <span className="text-3xl md:text-4xl font-bold text-rellia-teal tracking-tight leading-none">
                      .00
                    </span>
                  </div>
                </div>

                <p className="font-urbanist text-black/60 text-base md:text-lg leading-relaxed max-w-md mx-auto mb-8">
                  Join the only program designed to help you implement an
                  <br />
                  audit-ready Quality Management System without the headaches.
                </p>

                <div className="h-px bg-black/10 w-full mb-6" />

                <ul className="mt-4 flex flex-col gap-3 list-none font-urbanist text-black/60 text-base md:text-lg leading-relaxed text-left w-full items-start">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-rellia-teal shrink-0 mt-0.5" />
                    <span>Pause or cancel at any time.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-rellia-teal shrink-0 mt-0.5" />
                    <span>Weekly consultations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-rellia-teal shrink-0 mt-0.5" />
                    <span>Instructional content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-rellia-teal shrink-0 mt-0.5" />
                    <span>Frameworks &amp; templates</span>
                  </li>
                </ul>

                <a
                  href={QMS_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full inline-flex items-center justify-center rounded-full bg-rellia-teal text-white font-host-grotesk font-semibold px-8 py-4 border-2 border-rellia-teal transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-rellia-teal hover:shadow-lg"
                >
                  Get Started
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
                  Let’s Build Your QMS
                </h3>
                <p className="font-urbanist text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-8">
                  Still have questions or want to learn more about the program? Reach out at any time to speak with us directly.
                </p>

                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-rellia-mint text-rellia-teal font-host-grotesk font-semibold px-8 py-4 hover:bg-white transition-colors duration-200"
                >
                  Contact
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

