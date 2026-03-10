import {
  Users,
  Map,
  Stethoscope,
  Award,
  BookOpen,
  HandshakeIcon,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: Users,
    title: "The Experts",
    description:
      "A network of healthcare partners to solve any challenge you're facing, without consulting fees.",
  },
  {
    icon: Map,
    title: "The Roadmap",
    description:
      "Avoid mistakes on your path to market by following our proven step-by-step framework.",
  },
  {
    icon: Stethoscope,
    title: "The Clinicians",
    description:
      "Build the right product from the start by co-developing alongside healthcare practitioners.",
  },
  {
    icon: Award,
    title: "The Veterans",
    description:
      "Learn from fellow health tech founders who have been through it before and found success.",
  },
  {
    icon: BookOpen,
    title: "The Resources",
    description:
      "Access a library of tangible tools you can apply to your business right now.",
  },
  {
    icon: HandshakeIcon,
    title: "The Mentorship",
    description:
      "An accountability partner to keep you focused and committed to your business goals.",
  },
];

export default function WhyRellia() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1300px] mx-auto">
        {/* Section heading */}
        <ScrollReveal>
          <h2 className="font-host-grotesk font-semibold text-black text-center text-3xl md:text-[40px] leading-tight tracking-tight mb-12 md:mb-16">
            Why should you be a part of Rellia?
          </h2>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={0.08 * i}>
                {/* 
                  - White background initially
                  - Soft outline (border-black/5)
                  - Hover invert: bg-rellia-teal
                  - Scale-105 and -translate-y-2
                */}
                <div
                  className="group relative bg-white border border-black/10 rounded-[20px] p-8 md:p-10 flex flex-col gap-6 transition-all duration-300 hover:bg-rellia-teal hover:scale-[1.05] hover:-translate-y-2 hover:shadow-2xl cursor-default h-full shadow-sm"
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 bg-rellia-mint/20 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-white/10"
                  >
                    <Icon
                      className="w-7 h-7 text-rellia-teal transition-colors duration-300 group-hover:text-rellia-mint"
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-host-grotesk font-bold text-black text-2xl md:text-[28px] leading-tight tracking-tight transition-colors duration-300 group-hover:text-white"
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-urbanist font-medium text-black/70 text-base md:text-[18px] leading-relaxed tracking-tight transition-colors duration-300 group-hover:text-white/85"
                  >
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
