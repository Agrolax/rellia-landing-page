import {
  Target,
  UserRound,
  BookOpen,
  Users,
  CircleDollarSign,
  Stethoscope,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { IconFeatureCard } from "@/components/cards";

const features = [
  {
    icon: Target,
    title: "The Outcomes",
    description:
      "Avoid mistakes on your path to market and easily achieve your milestones through our customized programs",
  },
  {
    icon: UserRound,
    title: "The Advisors",
    description:
      "Access 1:1 guidance from experts with years of experience scaling health tech businesses (consulting that would cost >$300/hr anywhere else).",
  },
  {
    icon: BookOpen,
    title: "The Resources",
    description:
      "Apply tangible tools, hands-on workshops, and proven templates to move your business forward right now",
  },
  {
    icon: Users,
    title: "The Community",
    description:
      "Beta test your ideas, find an accountability buddy, cheer each other on, share your deepest worries. Connect with fellow health tech founders who have been through it before.",
  },
  {
    icon: CircleDollarSign,
    title: "The Investors",
    description:
      "Strengthen your pitch and access health tech investors through a network that vouches for you.",
  },
  {
    icon: Stethoscope,
    title: "The Clinicians",
    description:
      "Design the right product from the start by developing alongside healthcare practitioners",
  },
];

export default function WhyRellia() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1300px] mx-auto">
        {/* Section heading */}
        <SectionHeading
          align="center"
          title="How does it work?"
          className="mb-12 md:mb-16"
        />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={0.08 * i}>
                <IconFeatureCard
                  variant="interactive"
                  icon={Icon}
                  title={feature.title}
                  description={feature.description}
                />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
