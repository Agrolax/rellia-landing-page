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
                <h2 className="font-host-grotesk font-semibold text-white text-3xl md:text-5xl lg:text-[52px] leading-[1.15] tracking-tight max-w-lg">
                  Are you the next Rellia Health{" "}
                  <span className="relative inline-block">
                    <span className="text-rellia-mint">success story</span>
                    {/* Fixed underline position */}
                    <svg
                      className="absolute -bottom-3 left-0 w-full"
                      viewBox="0 0 232 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 3.88028C1.86419 2.0511 7.12044 -1.05851 13.2319 1.13651C20.8713 3.88028 28.2281 6.62406 36.1673 3.88028C44.1065 1.13651 42.3422 -1.60727 57.3384 1.13651C72.3346 3.88028 81.1559 9.79218 93.5057 5.46434C105.856 1.13651 107.62 -1.60727 120.852 1.13651C134.084 3.88028 147.316 6.62406 159.665 3.88028C172.015 1.13651 175.544 -1.60727 186.129 1.13651C196.715 3.88028 202.008 4.08929 211.711 2.6129C221.414 1.13651 226.707 -0.33988 232 1.13651"
                        stroke="#9DD6D0"
                        strokeWidth="4"
                      />
                    </svg>
                  </span>
                  ?
                </h2>
              </div>

              {/* Inverting button hover */}
              <button className="bg-transparent text-rellia-mint font-host-grotesk font-semibold text-lg md:text-2xl px-10 py-5 rounded-full border-[3px] border-rellia-mint whitespace-nowrap tracking-tight transition-all duration-200 hover:-translate-y-1.5 hover:shadow-2xl hover:bg-rellia-mint hover:text-rellia-teal">
                Apply to Join Now
              </button>
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
