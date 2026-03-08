export default function CTASection() {
  return (
    <section className="w-full bg-white py-12 md:py-20 px-6 md:px-10">
      <div className="max-w-[1300px] mx-auto">
        <div className="relative bg-rellia-teal rounded-[19px] overflow-hidden flex flex-col lg:flex-row items-center min-h-[440px] md:min-h-[520px]">
          {/* Left image */}
          <div className="w-full lg:w-[45%] h-[280px] lg:h-full shrink-0 relative">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/8f739cef8f0df3b598f7661fb2212eab44955a7a?width=1158"
              alt="Man speaking at conference"
              className="w-full h-full object-cover lg:rounded-l-[19px] lg:rounded-r-none rounded-t-[19px] lg:rounded-t-[19px]"
            />
          </div>

          {/* Right content */}
          <div className="flex-1 flex flex-col items-start justify-center px-8 md:px-12 lg:px-16 py-10 lg:py-16 gap-8">
            <div className="relative">
              <h2 className="font-host-grotesk font-semibold text-white text-3xl md:text-4xl lg:text-[40px] leading-normal tracking-tight max-w-sm">
                Are you the next Rellia Health{" "}
                <span className="relative inline-block">
                  <span className="text-rellia-cream">success story</span>
                  {/* Wavy underline SVG */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 232 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 3.88028C1.86419 2.0511 7.12044 -1.05851 13.2319 1.13651C20.8713 3.88028 28.2281 6.62406 36.1673 3.88028C44.1065 1.13651 42.3422 -1.60727 57.3384 1.13651C72.3346 3.88028 81.1559 9.79218 93.5057 5.46434C105.856 1.13651 107.62 -1.60727 120.852 1.13651C134.084 3.88028 147.316 6.62406 159.665 3.88028C172.015 1.13651 175.544 -1.60727 186.129 1.13651C196.715 3.88028 202.008 4.08929 211.711 2.6129C221.414 1.13651 226.707 -0.33988 232 1.13651"
                      stroke="#F7EFE5"
                      strokeWidth="3"
                    />
                  </svg>
                </span>
                ?
              </h2>
            </div>

            <button className="border-[3px] border-rellia-mint text-rellia-mint font-host-grotesk font-semibold text-lg md:text-xl px-8 py-4 rounded-full hover:bg-rellia-mint/10 transition-all whitespace-nowrap tracking-tight">
              Apply to Join Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
