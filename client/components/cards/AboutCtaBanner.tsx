import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export type AboutCtaBannerProps = {
  founderApplyHref: string;
  teamCareersPath?: string;
};

export function AboutCtaBanner({
  founderApplyHref,
  teamCareersPath = "/careers",
}: AboutCtaBannerProps) {
  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-[40px] bg-rellia-teal p-12 text-center text-white md:p-24">
      <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-rellia-mint/10 blur-3xl" />

      <h2 className="relative z-10 mb-6 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
        You&apos;re in the right place.
      </h2>
      <p className="relative z-10 mb-12 max-w-xl text-lg font-urbanist leading-relaxed text-white/75 md:text-xl">
        If you&apos;re a founder who wants to do this right, we have the network and expertise to make it
        happen.
      </p>
      <div className="relative z-10 flex w-full max-w-lg flex-col justify-center gap-4 sm:max-w-none sm:flex-row">
        <a
          href={founderApplyHref}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-rellia-mint px-10 py-5 font-bold text-rellia-teal transition-all hover:-translate-y-1 hover:bg-white"
        >
          Apply to join as a founder
          <ChevronRight className="h-5 w-5" />
        </a>
        <Link
          to={teamCareersPath}
          className="inline-flex items-center justify-center rounded-full border-2 border-white/25 px-10 py-5 font-bold text-white transition-all hover:-translate-y-1 hover:bg-white/10"
        >
          Contact us to join the Rellia team
        </Link>
      </div>
    </div>
  );
}
