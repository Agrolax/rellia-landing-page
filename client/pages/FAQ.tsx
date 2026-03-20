import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const faqs = [
  {
    id: "products",
    question: "What kind of products does Rellia work with?",
    answer:
      "We specialize in healthcare-focused innovations with a software component - digital health, health tech, medtech, whatever you call it. Whether it's a connected medical device, a diagnostic platform, a digital therapeutic, or a general wellness app, our programs are built to help you succeed specifically in the complex healthcare technology market.",
  },
  {
    id: "funding",
    question: "Does my company need funding or revenue to join?",
    answer:
      "We work with companies at every stage of development, from pre-seed to Series A, with customized programs to meet you where you are. As long as you have a clear idea of the problem you're solving and a vision for the solution, we can help.",
  },
  {
    id: "cost",
    question: "What is the cost to join?",
    answer:
      "Rellia operates on a monthly membership model that gives you full access to our advisors, community, and a core set of included programs. Some specialized programs carry an additional cost, and we are always transparent about what is included before you commit to anything.",
  },
  {
    id: "equity",
    question: "Do founders need to give up equity to join?",
    answer:
      "No. We believe founders should keep control of their companies. Once you're a member, you'll have access to the expertise and resources you need without giving up a stake in your business.",
  },
  {
    id: "country",
    question: "Do I need to be based in a specific country to join?",
    answer:
      "No, Relia Health is a global network with members across the world. We work with the best of the best, regardless of where they happen to live.",
  },
  {
    id: "after-join",
    question: "What happens once I join?",
    answer:
      "Once your application is approved, you will receive an invitation to join our community. From there, you can reach out to our team directly and we will connect you with the specific advisors, programs, clinicians, or fellow founders that match what you are working on. There is no generic onboarding path. We start by understanding where you are and what you need most.",
  },
  {
    id: "programs-without-membership",
    question: "Can I join a program without becoming a member?",
    answer:
      "Yes, most Rellia programs are available to non-members as well. If you decide to become a member, you will get discounted access to programs alongside everything else membership includes: the experts, the community, and the additional resources that come with it. Starting with a program first can be a good way to get a feel for what Rellia is about before committing.",
  },
  {
    id: "advisor-time",
    question: "How much time do advisors commit to?",
    answer:
      "We know your time is valuable. Advisors typically volunteer a few hours a month to high-impact conversations with founders who are building in areas they're passionate about. We handle all the logistics - you simply show up, share your thoughts, and help guide the next generation of healthcare companies.",
  },
  {
    id: "investors",
    question: "What does Rellia Health offer to investors?",
    answer:
      "Investors get curated access to high-potential startups, due diligence support, and the opportunity to invest alongside a network of experienced partners in healthcare and technology.",
  },
  {
    id: "industry-partner",
    question: "I'm an industry partner - how can I collaborate with Rellia Health?",
    answer:
      "Industry partners can engage with our founder community through sponsored programs or events, mentorship, and founder referrals. Rellia is a trusted resource for early-stage health tech startups, and a recommendation from us is meaningfully different from a cold channel.",
  },
  {
    id: "apply",
    question: "How do I apply or express interest in joining?",
    answer:
      "You can apply through our website by completing the short interest form. Our team will follow up with next steps.",
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
                Everything you need to know about Rellia
              </h1>
              <p className="font-urbanist text-black/60 text-base md:text-lg leading-relaxed max-w-2xl">
                We&apos;ve collected the most common questions our members ask before joining.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ Content — 2 column layout */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              {/* Left column — info panel */}
              <div className="lg:w-[340px] lg:shrink-0">
                <ScrollReveal>
                  <div className="lg:sticky lg:top-28">
                    <h3 className="font-host-grotesk font-bold text-black text-2xl md:text-3xl tracking-tight mb-4">
                      Still have questions?
                    </h3>
                    <p className="font-urbanist text-black/60 text-base leading-relaxed mb-6">
                      Learn more about how Rellia works and explore the different pathways available for founders, advisors, investors, and industry partners.
                    </p>
                    <Link
                      to="/network"
                      className="inline-flex items-center justify-center rounded-full bg-rellia-teal text-white font-host-grotesk font-semibold px-7 py-3 border-2 border-rellia-teal hover:bg-white hover:text-rellia-teal transition-all duration-200 text-sm"
                    >
                      Explore the Network
                    </Link>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right column — accordion */}
              <div className="flex-1 min-w-0">
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
            </div>
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
                    Every startup is different
                  </h3>
                  <p className="text-white/80 font-urbanist text-sm md:text-base leading-relaxed max-w-xl">
                    Tell us more about where you are today and where you want to be in the next 12–18 months. We'll share how Rellia can help accelerate that path, or recommend a better fit if we're not it.
                  </p>
                </div>
                <div className="relative z-10">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-white text-rellia-teal font-semibold text-sm md:text-base px-7 py-3 md:px-8 md:py-3.5 shadow-sm hover:bg-rellia-mint transition-colors"
                  >
                    Get in Touch
                  </Link>
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
