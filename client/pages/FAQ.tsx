import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    id: "founders-eligible",
    question: "Lorem ipsum dolor sit amet?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "program-structure",
    question: "Consectetur adipiscing elit sed do?",
    answer:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "stage-required",
    question: "Quis nostrud exercitation ullamco?",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: "time-commitment",
    question: "Duis aute irure dolor in reprehenderit?",
    answer:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "equity",
    question: "Excepteur sint occaecat cupidatat non?",
    answer:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: "remote",
    question: "Sed ut perspiciatis unde omnis iste?",
    answer:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white font-host-grotesk overflow-x-hidden">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 bg-rellia-cream/80 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-10 w-64 h-64 bg-rellia-mint/40 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-10 w-80 h-80 bg-rellia-teal/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-4 py-1 text-xs md:text-sm font-urbanist text-black/60 mb-6 backdrop-blur">
                Frequently Asked Questions
              </span>
              <h1 className="text-black text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-5">
                Everything you need to{" "}
                <span className="text-rellia-teal">know about Rellia.</span>
              </h1>
              <p className="text-black/70 text-base md:text-xl font-urbanist max-w-2xl leading-relaxed">
                From eligibility and program structure to time commitment and support, we’ve
                pulled the most common questions founders and clinicians ask before joining.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] gap-12 md:gap-20 items-start">
            {/* Left column summary */}
            <ScrollReveal className="space-y-6">
              <h2 className="text-black text-2xl md:text-3xl font-bold tracking-tight">
                Clear answers for busy founders.
              </h2>
              <p className="text-black/70 font-urbanist text-base md:text-lg leading-relaxed">
                We built Rellia to remove guesswork from building in healthcare. If you
                don’t see your question here, reach out and we’ll help you understand if
                this is the right fit for your company and stage.
              </p>
              <div className="rounded-2xl border border-black/5 bg-rellia-cream/70 px-5 py-4 text-sm md:text-base text-black/80 font-urbanist">
                Still unsure?{" "}
                <span className="font-semibold text-rellia-teal">
                  Share a few details about your company
                </span>{" "}
                and we’ll send a short, honest recommendation within 48 hours.
              </div>
            </ScrollReveal>

            {/* Right column accordion */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-3xl border border-black/5 bg-white/80 shadow-sm">
                <Accordion type="single" collapsible defaultValue={faqs[0].id}>
                  {faqs.map((item, index) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className={index === faqs.length - 1 ? "border-b-0" : undefined}
                    >
                      <AccordionTrigger className="text-left text-base md:text-lg font-medium text-black py-5 px-5 md:px-6">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-5 md:px-6 pb-5 text-black/70 font-urbanist text-sm md:text-base leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="pb-20 md:pb-28 px-6">
          <div className="max-w-[1100px] mx-auto">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-rellia-teal text-white px-8 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <div className="absolute -top-20 right-0 w-64 h-64 bg-rellia-mint/40 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 flex-1 space-y-3 md:space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Ready to get specific about your company?
                  </h3>
                  <p className="text-white/80 font-urbanist text-sm md:text-base leading-relaxed max-w-xl">
                    Share where you are today and where you want to be in the next 12–18 months.
                    We’ll map how Rellia can help accelerate that path—or recommend a better fit
                    if we’re not it.
                  </p>
                </div>
                <div className="relative z-10">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-white text-rellia-teal font-semibold text-sm md:text-base px-7 py-3 md:px-8 md:py-3.5 shadow-sm hover:bg-rellia-mint transition-colors"
                  >
                    Talk to the team
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

