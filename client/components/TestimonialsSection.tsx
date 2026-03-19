import { Quote, Info } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "CEO",
    company: "MedVantage",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200",
    quote: "Rellia's clinical roadmap was the missing piece in our commercialization strategy. Their network of practitioners provided invaluable feedback that transformed our product into a clinician-favorite.",
    companyInfo: "MedVantage is a leading AI diagnostic platform specializing in early detection of oncology cases through radiologic imaging analysis and automated screening workflows.",
  },
  {
    name: "James Miller",
    role: "Founder",
    company: "VitalLink",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    quote: "The mentorship we received saved us months of regulatory headaches. Having a dedicated accountability partner kept us focused on our critical path to market during a high-stakes funding round.",
    companyInfo: "VitalLink develops low-latency remote patient monitoring systems for high-acuity cardiovascular patients, specifically bridging the gap for rural healthcare clinics.",
  },
  {
    name: "Elena Rodriguez",
    role: "VP Product",
    company: "CareSync",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    quote: "The community at Rellia is unmatched. Connecting with fellow healthtech founders who truly understand the industry hurdles has been a game-changer for my personal growth as a leader.",
    companyInfo: "CareSync is a decentralized patient registry platform using secure infrastructure to ensure data interoperability across disparate hospital health systems.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-rellia-cream/30 py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <div className="flex justify-center mb-4">
            <div className="bg-rellia-mint/20 p-3 rounded-full">
              <Quote className="w-8 h-8 text-rellia-teal" />
            </div>
          </div>
          <SectionHeading
            align="center"
            title="Trusted by the next generation of healthcare leaders."
            className="max-w-3xl mx-auto"
          />
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/5 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                {/* Quote */}
                <div className="flex-1">
                  <p className="font-urbanist text-lg md:text-xl text-black/80 leading-relaxed italic mb-8">
                    "{t.quote}"
                  </p>
                </div>

                {/* Info Footer */}
                <div className="flex items-center gap-4 pt-6 border-t border-black/5">
                  <Avatar className="h-14 w-14 border-2 border-rellia-mint/30 shadow-sm">
                    <AvatarImage src={t.image} alt={t.name} className="object-cover" />
                    <AvatarFallback className="bg-rellia-teal text-white">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h4 className="font-host-grotesk font-bold text-black text-lg">
                      {t.name}
                    </h4>
                    <div className="flex items-center gap-2 group">
                      <p className="font-urbanist text-black/60 text-sm">
                        {t.role}, <span className="text-rellia-teal font-semibold">{t.company}</span>
                      </p>
                      
                      {/* Company Info Hover Card */}
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <button className="text-black/30 hover:text-rellia-teal transition-colors cursor-help">
                            <Info className="w-4 h-4" />
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 bg-rellia-teal text-white border-rellia-teal p-5 rounded-2xl shadow-2xl">
                          <div className="flex flex-col gap-2">
                            <h5 className="font-host-grotesk font-bold text-rellia-mint border-b border-white/10 pb-2 mb-1">
                              About {t.company}
                            </h5>
                            <p className="font-urbanist text-sm leading-relaxed text-white/90">
                              {t.companyInfo}
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
