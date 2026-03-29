import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { Link } from "react-router-dom";

type CTASectionProps = {
  title: string;
  buttonLabel: string;
  buttonPath: string;
  imageUrl: string;
  imageAlt: string;
};

export default function CTASection({
  title,
  buttonLabel,
  buttonPath,
  imageUrl,
  imageAlt,
}: CTASectionProps) {
  return (
    <section className="w-full bg-white py-12 md:py-24 px-6 md:px-10 overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        <ScrollReveal>
          <div className="relative bg-rellia-teal rounded-[24px] overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[440px] md:min-h-[520px] shadow-2xl">
            
            {/* Left/Top Content — Text first for mobile flow */}
            <div className="flex-1 flex flex-col items-start justify-center px-8 md:px-12 lg:px-20 py-12 lg:py-20 gap-10 order-2 lg:order-1">
              <div className="relative">
                <SectionHeading tone="light" title={title} className="max-w-lg" />
              </div>

              <Link
                to={buttonPath}
                className="font-host-grotesk font-semibold rounded-full whitespace-nowrap tracking-tight transition-all duration-200 hover:-translate-y-1 hover:shadow-xl border-2 bg-transparent text-rellia-mint border-rellia-mint hover:bg-rellia-mint hover:text-rellia-teal text-base md:text-lg px-10 py-5 border-[3px]"
              >
                {buttonLabel}
              </Link>
            </div>

            <div className="w-full lg:w-[48%] min-h-[320px] relative order-1 lg:order-2">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Image overlay */}
              <div className="absolute inset-0 bg-rellia-teal/20" />
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
