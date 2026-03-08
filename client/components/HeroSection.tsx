export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[520px] md:min-h-[620px] flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://api.builder.io/api/v1/image/assets/TEMP/6e815b45b696371ea621dc4b28461eadab94e966?width=2880"
      >
        <source
          src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_24fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-rellia-teal/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-24 max-w-4xl mx-auto">
        {/* Headline */}
        <h1 className="font-host-grotesk font-extrabold text-white text-4xl sm:text-5xl md:text-6xl lg:text-[82px] leading-tight mb-4">
          You are the future{" "}
          <span className="relative inline-block">
            of healthcare.
            <span
              className="absolute bottom-0 left-0 w-full h-[10px] md:h-[14px] rounded-sm"
              style={{ background: "#9DD6D0", bottom: "-4px" }}
            />
          </span>
        </h1>

        {/* Subheading */}
        <p className="font-urbanist font-semibold text-white text-lg md:text-2xl mt-8 mb-10">
          The expertise you need. The support you deserve.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button className="bg-rellia-teal text-white font-host-grotesk font-semibold text-base md:text-xl px-8 py-4 rounded-full border-2 border-transparent hover:bg-rellia-teal/80 transition-all whitespace-nowrap tracking-tight">
            Get Involved Now
          </button>
          <button className="border-2 border-rellia-mint text-rellia-mint font-host-grotesk font-semibold text-base md:text-xl px-8 py-4 rounded-full hover:bg-rellia-mint/10 transition-all whitespace-nowrap tracking-tight">
            See our Programs
          </button>
        </div>
      </div>
    </section>
  );
}
