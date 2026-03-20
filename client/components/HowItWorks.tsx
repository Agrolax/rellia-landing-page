import {
  Palette,
  ClipboardList,
  ShieldCheck,
  CircleDollarSign,
  Megaphone,
  Hospital,
  LineChart,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { IconFeatureCard } from "@/components/cards";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const arrowClass = cn(
  "static translate-x-0 translate-y-0 relative",
  "h-12 w-12 rounded-full border-2 border-rellia-teal bg-white text-rellia-teal shadow-md",
  "hover:bg-rellia-teal hover:text-white",
  "disabled:opacity-40 disabled:pointer-events-none",
);

const steps = [
  {
    icon: Palette,
    title: "Product Design and Development",
    description:
      "Turn your concept into a viable health tech product. We help you work through prototype development, MVP development, architecture decisions, and interoperability requirements for a stronger technical foundation.",
  },
  {
    icon: ClipboardList,
    title: "User Feedback",
    description:
      "Gather the validation evidence that clinicians, investors, and regulators need to see. We help you design and execute usability testing, human factors research, clinical pilots, and real-world evidence collection in a way that is both rigorous and compliant.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory and Legal Compliance",
    description:
      "Understand your obligations before they become liabilities. We help you understand global privacy and security requirements, intellectual property protection, medical device classification, and governance frameworks specific to your target markets.",
  },
  {
    icon: CircleDollarSign,
    title: "Fundraising",
    description:
      "Whether you are exploring non-dilutive grants, angel investors, or venture capital we help you show up with a stronger investor narrative and a data room that holds up to scrutiny.",
  },
  {
    icon: Megaphone,
    title: "Marketing and Commercial Strategy",
    description:
      "Build a brand that resonates inside healthcare and a go-to-market strategy that moves prospects through to sales. Credibility and clarity both matter more in this industry.",
  },
  {
    icon: Hospital,
    title: "Navigating Healthcare Systems",
    description:
      "We help you understand hospital procurement processes, reimbursement pathways, and what it actually takes to drive adoption inside complex health systems.",
  },
  {
    icon: LineChart,
    title: "Operations and Scaling",
    description:
      "Getting to launch is one milestone. Building a sustainable company is another. We help put the right foundations in place for better financial modeling, growth metrics, customer success, and hiring so the momentum you built can continue on.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1300px] mx-auto">
        <ScrollReveal delay={0.1}>
          <SectionHeading
            title="Where we focus"
            description="Health tech commercialization is complex, and generic start-up advice won't help you. These are the areas where Rellia can help."
            className="mb-12 md:mb-16"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Carousel
            opts={{
              align: "start",
              loop: false,
              dragFree: false,
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <div className="flex flex-col gap-8">
              <CarouselContent className="-ml-4 md:-ml-6">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <CarouselItem
                      key={step.title}
                      className="pl-4 md:pl-6 basis-full md:basis-1/2 xl:basis-1/3"
                    >
                      <IconFeatureCard
                        variant="interactive"
                        icon={Icon}
                        title={step.title}
                        description={step.description}
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <div className="flex items-center justify-center gap-4">
                <CarouselPrevious className={arrowClass} />
                <CarouselNext className={arrowClass} />
              </div>
            </div>
          </Carousel>
        </ScrollReveal>
      </div>
    </section>
  );
}
