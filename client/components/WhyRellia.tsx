import {
  Users,
  Map,
  Stethoscope,
  Award,
  BookOpen,
  HandshakeIcon,
} from "lucide-react";

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
        <h2 className="font-host-grotesk font-semibold text-black text-center text-3xl md:text-[40px] leading-tight tracking-tight mb-12 md:mb-16">
          Why should you be a part of Rellia?
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white border-2 border-[#D1D1D1] rounded-[10px] shadow-[0_11px_28.7px_0_rgba(0,0,0,0.07)] p-7 md:p-8 flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className="w-11 h-11 bg-rellia-mint/20 rounded-md flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-rellia-teal" strokeWidth={1.75} />
                </div>

                {/* Title */}
                <h3 className="font-host-grotesk font-semibold text-black text-2xl md:text-[28px] leading-tight tracking-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-urbanist text-black text-base md:text-lg leading-relaxed tracking-tight">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
