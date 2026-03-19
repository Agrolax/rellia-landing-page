import RelliaButton from "@/components/RelliaButton";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-rellia-teal/65" />

      {/* Content — padded for fixed navbar */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-16 md:pt-28 md:pb-24 max-w-5xl mx-auto w-full">

        {/* Headline — rises on load */}
        <h1
          className="font-host-grotesk font-extrabold text-white text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-tight animate-fade-up"
          style={{ animationDelay: "0s" }}
        >
          You are the future of{" "}
          <span className="relative inline">
            healthcare.
            {/* Underline ONLY under "healthcare." */}
            <span className="absolute left-0 -bottom-1 md:-bottom-2 w-full h-[10px] md:h-[14px] bg-rellia-mint rounded-sm opacity-90 pointer-events-none" />
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="font-urbanist font-semibold text-white text-lg md:text-2xl mt-10 mb-10 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          The expertise you need. The support you deserve.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 items-center animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <RelliaButton>
            Get Involved Now
          </RelliaButton>

          <RelliaButton variant="secondary">
            See our Programs
          </RelliaButton>
        </div>
      </div>
    </section>
  );
}
