import { useCallback, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import RelliaButton from "@/components/RelliaButton";
import { useNavigate } from "react-router-dom";
import type { HomePageContent } from "@shared/cms/types";

const HERO_VIDEO_POSTER = "/images/heroPoster-home.png";

type HeroSectionProps = {
  content: Pick<
    HomePageContent,
    | "headlinePrefix"
    | "headlineAccent"
    | "subheadline"
    | "primaryCtaLabel"
    | "primaryCtaPath"
    | "secondaryCtaLabel"
    | "secondaryCtaPath"
  >;
};

export default function HeroSection({ content }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const togglePlayback = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background — ref lets us pause/play from the control button */}
      <video
        ref={videoRef}
        poster={HERO_VIDEO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
      >
        <source src="/videos/homehero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-rellia-teal/65" />

      {/* Pause / play — sits above overlay so it stays visible & clickable */}
      <div className="absolute bottom-6 right-6 z-20 md:bottom-10 md:right-10">
        <button
          type="button"
          onClick={togglePlayback}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            "border border-white/40 bg-white/15 text-white backdrop-blur-sm",
            "transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
          )}
          aria-label={isPaused ? "Play background video" : "Pause background video"}
        >
          {isPaused ? <Play className="h-5 w-5" fill="currentColor" /> : <Pause className="h-5 w-5" />}
        </button>
      </div>

      {/* Content — padded for fixed navbar */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-16 md:pt-28 md:pb-24 max-w-5xl mx-auto w-full">

        {/* Headline — rises on load */}
        <h1
          className="font-host-grotesk font-extrabold text-white text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-tight animate-fade-up"
          style={{ animationDelay: "0s" }}
        >
          {content.headlinePrefix}{" "}
          <span className="relative inline-block align-bottom">
            <span className="text-white font-extrabold">{content.headlineAccent}</span>
            <span
              className="absolute left-0 top-0 whitespace-nowrap font-extrabold text-rellia-mint motion-safe:animate-healthcare-fill motion-reduce:clip-path-none"
              aria-hidden
            >
              {content.headlineAccent}
            </span>
          </span>
        </h1>

        <p
          className="font-urbanist font-semibold text-white text-lg md:text-2xl mt-10 mb-10 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          {content.subheadline}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 items-center animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <RelliaButton
            className="bg-rellia-mint text-rellia-teal border-rellia-mint hover:bg-white hover:text-rellia-teal hover:border-white hover:shadow-xl"
            onClick={() => navigate(content.primaryCtaPath)}
          >
            {content.primaryCtaLabel}
          </RelliaButton>

          <RelliaButton variant="secondary" onClick={() => navigate(content.secondaryCtaPath)}>
            {content.secondaryCtaLabel}
          </RelliaButton>
        </div>
      </div>
    </section>
  );
}
