import { Info } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const carouselArrowClass = cn(
  "static translate-x-0 translate-y-0 relative",
  "h-12 w-12 rounded-full border-2 border-rellia-teal bg-white text-rellia-teal shadow-md",
  "hover:bg-rellia-teal hover:text-white",
  "disabled:opacity-40 disabled:pointer-events-none",
);

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  companyInfo: string;
  imageSrc: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Dr. Sahil Khan",
    role: "Founder",
    company: "NovusTex Corp",
    quote:
      "Rellia has been nothing short of exceptional—a truly dynamic incubator where early ventures are not only given space to grow, but are actively empowered to connect, refine, pitch, and evolve. The ecosystem is deeply professional, energizing, and genuinely supportive of innovation. Rellia is not just an incubator—it's a launchpad for ambitious founders.",
    companyInfo:
      "A rehabilitation-focused company bringing novel performance textiles and assistive solutions to support mobility, reduce injury risk, and enhance comfort during recovery for patients with musculoskeletal and neurological conditions.",
    imageSrc: "/images/sahilkhan-testimonials.jpeg",
  },
  {
    name: "Dhandre Weekes",
    role: "CEO",
    company: "CareLog",
    quote:
      "Rellia is full of driven founders and healthcare innovators, which is actually where I connected with my advisory council members. I'm really grateful for the experience and look forward to what's ahead.",
    companyInfo:
      "An elder care platform to help assisted living, memory care, and specialized residential homes manage daily care, reporting, and family communication.",
    imageSrc: "/images/dhandreW-testimonials.jpeg",
  },
  {
    name: "Melissa Williams",
    role: "Founder & Chief Orchestrator",
    company: "HorminaCare",
    quote:
      "Being part of this group has been a great experience. Rellia has created a supportive space for health tech founders, with valuable resources and opportunities to connect. I especially appreciate how available and supportive they are—their feedback on my website around marketing and compliance was incredibly helpful. They genuinely care about supporting founders in this space.",
    companyInfo:
      "HorminaCare provides virtual access to expert medical professionals for science-backed treatment for hormone-related conditions such as PCOS, adult acne, PMDD, and beyond.",
    imageSrc: "/images/melissaW-testimonials.jpeg",
  },
  {
    name: "Irene Saliandra",
    role: "CEO",
    company: "Digital Flow",
    quote:
      "I've thoroughly enjoyed being part of the Rellia community—not only has it opened doors to expand my network, but also given me opportunities to test my ideas with like minded folks who want to see innovation in health and wellness accelerate!",
    companyInfo:
      "Digital Flow empowers entrepreneurs and small business owners through their digital transformation journey. Leveraging extensive expertise in business development, entrepreneurship, and technology integration, Digital Flow provides end-to-end strategy services designed to guide clients through every stage of their digital evolution.",
    imageSrc: "/images/ireneS-testimonials.jpeg",
  },
  {
    name: "Michelle Risinger",
    role: "CEO",
    company: "Restore Enterprises Corporation",
    quote:
      "I've found the Rellia community full of smart, inclusive and generous members eager to provide support, connections and ideas.",
    companyInfo:
      "Restore is an API that optimizes daily performance using chronobiology. We help platforms like productivity tools, wellness apps, calendars, and employee experience systems unlock personalized peak hours, low-energy slumps, and break recommendations—all grounded in our patent-pending, science-backed algorithm.",
    imageSrc: "/images/michelleR-testimonials.png",
  },
];

function CompanyInfoPopover({ t }: { t: Testimonial }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex size-6 shrink-0 items-center justify-center rounded-full",
            "text-black/35 transition-colors hover:text-rellia-teal",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rellia-teal focus-visible:ring-offset-2",
          )}
          aria-label={`About ${t.company}`}
        >
          <Info className="h-3.5 w-3.5" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="top"
        className={cn(
          "border-rellia-teal bg-rellia-teal p-5 text-white shadow-2xl",
          "w-[min(calc(100vw-2rem),20rem)] sm:w-80 rounded-2xl z-50",
        )}
      >
        <div className="flex flex-col gap-2">
          <h5 className="font-host-grotesk font-bold text-rellia-mint border-b border-white/10 pb-2 mb-1">
            About {t.company}
          </h5>
          <p className="font-urbanist text-sm leading-relaxed text-white/90">{t.companyInfo}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const imgSrc = t.imageSrc;

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 h-full min-h-[420px] sm:min-h-[440px] flex flex-col min-w-0 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/5 hover:shadow-xl transition-shadow duration-300">
      <div className="flex-1 min-h-[8rem]">
        <p className="font-urbanist text-lg md:text-xl text-black/80 leading-relaxed italic">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      {/* Avatar vertically centered with name + role block (reference layout) */}
      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-black/5">
        <Avatar className="h-14 w-14 border-2 border-rellia-mint/30 shadow-sm shrink-0">
          <AvatarImage src={imgSrc} alt={t.name} className="object-cover" />
          <AvatarFallback className="bg-rellia-teal text-white text-sm font-semibold">
            {t.name
              .replace(/^(dr|mr|mrs|ms|prof)\.?\s+/i, "")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 3)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h4 className="font-host-grotesk font-bold text-black text-lg leading-snug">{t.name}</h4>
          {/* Keep company + info popover on their own line under the name */}
          <div className="mt-2 flex items-start justify-between gap-3">
            <p className="font-urbanist text-black/60 text-sm leading-snug">
              {t.role}, <span className="text-rellia-teal font-semibold">{t.company}</span>
            </p>
            <CompanyInfoPopover t={t} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-rellia-cream/30 py-20 md:py-32 px-6 md:px-10 overflow-x-hidden">
      <div className="max-w-[1300px] mx-auto w-full min-w-0">
        {/* Chip + title: centered, same scale as SectionHeading on other homepage sections */}
        <ScrollReveal className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-4 py-1 text-xs md:text-sm font-urbanist text-black/60 mb-6 backdrop-blur">
            Testimonials
          </span>
          <h2 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight max-w-3xl">
            Trusted by the next generation of{" "}
            <span className="text-rellia-teal">healthcare leaders</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <Carousel
            opts={{
              align: "start",
              loop: true,
              containScroll: "trimSnaps",
            }}
            className="w-full max-w-full min-w-0"
          >
            <div className="flex flex-col gap-8">
              {/*
                Viewport clips horizontally; each slide min-w-0 prevents flex overflow.
                1 / 2 / 3 cards visible — same proportional width as the old 3-col grid.
              */}
              <CarouselContent className="-ml-4 md:-ml-6">
                {testimonials.map((t) => (
                  <CarouselItem
                    key={t.name}
                    className={cn(
                      "pl-4 md:pl-6 min-w-0",
                      "basis-full md:basis-1/2 xl:basis-1/3",
                    )}
                  >
                    <TestimonialCard t={t} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="flex items-center justify-center gap-4">
                <CarouselPrevious className={carouselArrowClass} />
                <CarouselNext className={carouselArrowClass} />
              </div>
            </div>
          </Carousel>
        </ScrollReveal>
      </div>
    </section>
  );
}
