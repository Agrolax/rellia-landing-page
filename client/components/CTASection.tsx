import SectionHeading from "@/components/SectionHeading";
import RelliaButton from "@/components/RelliaButton";
import ScrollReveal from "./ScrollReveal";

export default function CTASection() {
  return (
    <section className="w-full bg-white py-12 md:py-24 px-6 md:px-10 overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        <ScrollReveal>
          <div className="relative bg-rellia-teal rounded-[24px] overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[440px] md:min-h-[520px] shadow-2xl">
            
            {/* Left/Top Content — Text first for mobile flow */}
            <div className="flex-1 flex flex-col items-start justify-center px-8 md:px-12 lg:px-20 py-12 lg:py-20 gap-10 order-2 lg:order-1">
              <div className="relative">
                <SectionHeading
                  tone="light"
                  title="Are you the next Rellia Health success story?"
                  className="max-w-lg"
                />
              </div>

              {/* Inverting button hover */}
              <RelliaButton variant="secondary" size="lg" className="border-[3px]">
                Apply to Join Now
              </RelliaButton>
            </div>

            {/* Right/Bottom Image */}
            <div className="w-full lg:w-[48%] min-h-[320px] relative order-1 lg:order-2">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/8f739cef8f0df3b598f7661fb2212eab44955a7a?width=1200"
                alt="Man speaking at conference"
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
