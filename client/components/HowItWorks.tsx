import {
  Users,
  CalendarDays,
  GraduationCap,
  MessageCircle,
  Briefcase,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: Users,
    title: "Mentorship",
    description:
      "Personalized guidance from experts with years of experience scaling health tech businesses (consulting that would cost >$300/hr anywhere else).",
  },
  {
    icon: CalendarDays,
    title: "Events",
    description:
      "Hands-on workshops and events where you'll learn from star speakers, grow your network, and get real-time feedback on your ideas.",
  },
  {
    icon: GraduationCap,
    title: "Learning",
    description:
      "Customized programs designed to specifically address the areas where your healthcare business needs guidance the most.",
  },
  {
    icon: MessageCircle,
    title: "Community",
    description:
      "Beta test your ideas, find an accountability buddy, cheer each other on, share your deepest worries. Connect with fellow founders who truly understand what it takes to break into this industry.",
  },
  {
    icon: Briefcase,
    title: "Resources",
    description:
      "Practical tools and templates you can apply to your business right away.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Left image — reveal first */}
        <ScrollReveal className="w-full lg:w-[380px] xl:w-[440px] shrink-0">
          <div className="relative overflow-hidden rounded-[13px] group">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/a5115ab15962655773f54110fd436cffbdce194a?width=960"
              alt="Woman working at desk in teal-lit office"
              className="w-full h-[380px] sm:h-[480px] lg:h-[700px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-rellia-teal/10 pointer-events-none" />
          </div>
        </ScrollReveal>

        {/* Right content */}
        <div className="flex-1 flex flex-col gap-10">
          <ScrollReveal delay={0.1}>
            <div>
              <h2 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight mb-4">
                How does it work?
              </h2>
              <p className="font-urbanist font-medium text-black/90 text-base md:text-lg leading-relaxed tracking-tight max-w-[600px]">
                We've studied effective leaders and high-impact companies to
                develop a system specifically designed to help digital health
                solutions find success.
              </p>
            </div>
          </ScrollReveal>

          {/* Steps */}
          <div className="flex flex-col gap-9">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.title} delay={0.15 + i * 0.08}>
                  <div className="flex items-start gap-5 group cursor-default">
                    {/* Icon box */}
                    <div className="w-14 h-14 bg-rellia-mint/20 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-rellia-teal group-hover:scale-110">
                      <Icon
                        className="w-7 h-7 text-rellia-teal transition-colors duration-300 group-hover:text-rellia-mint"
                        strokeWidth={1.75}
                      />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-1.5 flex-1">
                      <h3 className="font-host-grotesk font-semibold text-black text-xl md:text-2xl leading-tight tracking-tight transition-colors duration-300 group-hover:text-rellia-teal">
                        {step.title}
                      </h3>
                      <p className="font-urbanist font-medium text-black text-sm md:text-base leading-relaxed tracking-tight">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
