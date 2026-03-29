import {
  Target,
  UserRound,
  BookOpen,
  Users,
  CircleDollarSign,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { IconFeatureCard } from "@/components/cards";
import type { HomeWhyFeature } from "@shared/cms/types";

const ICON_MAP: Record<string, LucideIcon> = {
  target: Target,
  userRound: UserRound,
  bookOpen: BookOpen,
  users: Users,
  circleDollarSign: CircleDollarSign,
  stethoscope: Stethoscope,
};

const resolveIcon = (key: string): LucideIcon => ICON_MAP[key] ?? Target;

type WhyRelliaProps = {
  sectionTitle: string;
  features: HomeWhyFeature[];
};

export default function WhyRellia({ sectionTitle, features }: WhyRelliaProps) {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1300px] mx-auto">
        <SectionHeading align="center" title={sectionTitle} className="mb-12 md:mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = resolveIcon(feature.iconKey);
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
