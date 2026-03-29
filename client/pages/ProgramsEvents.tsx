import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { CalendarDays, ArrowRight, User } from "lucide-react";
import { useProgramsLandingPage } from "@/hooks/useCmsDocuments";
import { DEFAULT_PROGRAMS_LANDING } from "@shared/cms/defaults";

const carouselArrowClass = cn(
  "static translate-x-0 translate-y-0 relative",
  "h-12 w-12 rounded-full border-2 border-rellia-teal bg-white text-rellia-teal shadow-md",
  "hover:bg-rellia-teal hover:text-white",
  "disabled:opacity-40 disabled:pointer-events-none",
);

export default function ProgramsEvents() {
  const { data } = useProgramsLandingPage();
  const pl = data ?? DEFAULT_PROGRAMS_LANDING;

  const handleScrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-host-grotesk overflow-x-hidden">
      <Navbar />

      <main>
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-24 bg-rellia-teal overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rellia-mint via-transparent to-transparent blur-3xl" />
          </div>
          <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-6">
                {pl.heroTitleLine1}{" "}
                <span className="text-rellia-mint">{pl.heroTitleMint}</span>
              </h1>
              <p className="text-white/80 text-lg md:text-2xl max-w-3xl font-urbanist leading-relaxed">
                {pl.heroSubtitle}
              </p>
            </ScrollReveal>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <ScrollReveal delay={0.1}>
                <a
                  href="#view-programs"
                  className="inline-flex items-center justify-center rounded-full bg-white text-rellia-teal font-host-grotesk font-semibold px-8 py-4 border-2 border-white hover:bg-rellia-mint hover:border-rellia-mint transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToId("view-programs");
                  }}
                >
                  {pl.heroPrimaryCtaLabel}
                </a>
              </ScrollReveal>
              <ScrollReveal delay={0.18}>
                <a
                  href="#view-events"
                  className="inline-flex items-center justify-center rounded-full bg-transparent text-white font-host-grotesk font-semibold px-8 py-4 border-2 border-white/30 hover:bg-white hover:text-rellia-teal transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToId("view-events");
                  }}
                >
                  {pl.heroSecondaryCtaLabel}
                </a>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="view-programs" className="py-16 md:py-24 bg-white">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal className="mb-12 text-center">
              <h2 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight">
                {pl.programsSectionTitle}
              </h2>
              <p className="font-urbanist text-black/60 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                {pl.programsSectionSubtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pl.programs.map((p) => (
                  <div
                    key={p.href}
                    className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
                  >
                    <div className="rounded-xl overflow-hidden mb-5 aspect-video bg-rellia-teal/5">
                      <img src={p.imageSrc} alt={p.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex flex-col flex-1 text-left">
                      <h3 className="font-host-grotesk font-bold text-black text-lg mb-3 leading-tight">
                        {p.title}
                      </h3>
                      <p className="font-urbanist text-black/60 text-sm leading-relaxed mb-6">
                        {p.description}
                      </p>

                      <div className="mt-auto">
                        <a
                          href={p.href}
                          className="w-full inline-flex items-center justify-center rounded-full bg-rellia-teal text-white text-sm font-semibold py-2.5 border-2 border-rellia-teal hover:bg-white hover:text-rellia-teal transition-all"
                        >
                          {p.buttonText}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="view-events" className="py-20 md:py-32 bg-rellia-cream/50">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal className="mb-12 flex flex-col items-center text-center">
              <h2 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight">
                Upcoming Events
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pl.upcomingEvents.map((event) => (
                  <div
                    key={event.title}
                    className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
                  >
                    <div className="rounded-xl overflow-hidden mb-5 aspect-video bg-rellia-teal/5">
                      <img
                        src={event.imageSrc}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col flex-1 text-left">
                      <h4 className="font-host-grotesk font-bold text-black text-lg mb-3 leading-tight">
                        {event.title}
                      </h4>

                      <div className="flex flex-col gap-2 text-sm font-urbanist text-black/60 mb-6">
                        <p className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-rellia-mint shrink-0" />
                          {event.dateTime}
                        </p>
                        <p className="flex items-center gap-2">
                          <User className="w-4 h-4 text-rellia-mint shrink-0" />
                          {event.person}
                        </p>
                      </div>

                      <div className="mt-auto">
                        {event.comingSoon ? (
                          <div className="w-full text-center py-2.5 bg-black/5 text-black/30 rounded-full text-sm font-semibold">
                            Coming Soon
                          </div>
                        ) : (
                          <a
                            href={event.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center rounded-full bg-rellia-teal text-white text-sm font-semibold py-2.5 border-2 border-rellia-teal hover:bg-white hover:text-rellia-teal transition-all"
                          >
                            Register Now
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white overflow-x-hidden">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal className="mb-12 text-center">
              <h3 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight">
                Past Events
              </h3>
            </ScrollReveal>

            <ScrollReveal>
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
                    {pl.pastEvents.map((event) => (
                      <CarouselItem
                        key={event.dateTime + event.person}
                        className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                      >
                        <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                          <div className="rounded-xl overflow-hidden mb-5">
                            <img
                              src={event.imageSrc}
                              alt={event.person}
                              className="h-40 w-full object-cover"
                            />
                          </div>
                          <h4 className="font-host-grotesk font-bold text-black text-lg mb-4">
                            {event.title}
                          </h4>

                          <div className="flex flex-col gap-2 text-sm font-urbanist text-black/60 mb-6">
                            <p className="text-black/60 flex items-center gap-2">
                              <CalendarDays className="w-4 h-4 text-rellia-mint shrink-0" />
                              {event.dateTime}
                            </p>
                            <p className="text-black/60 flex items-center gap-2">
                              <User className="w-4 h-4 text-rellia-mint shrink-0" />
                              {event.person}
                            </p>
                          </div>
                          <div className="mt-auto">
                            <a
                              href={event.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center rounded-full bg-rellia-teal text-white text-sm font-semibold py-2.5 border-2 border-rellia-teal hover:bg-white hover:text-rellia-teal transition-all"
                            >
                              {event.buttonText}
                            </a>
                          </div>
                        </div>
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

        <section className="py-16 md:py-24 px-6">
          <div className="max-w-[1300px] mx-auto">
            <ScrollReveal>
              <div className="bg-rellia-teal rounded-3xl px-8 py-14 md:px-16 md:py-20 text-center">
                <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {pl.ctaTitle}
                </h3>
                <p className="font-urbanist text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-8">
                  {pl.ctaBody}
                </p>
                <a
                  href={pl.ctaButtonHref}
                  className="inline-flex items-center gap-2 bg-rellia-mint text-rellia-teal font-host-grotesk font-semibold px-8 py-4 rounded-full hover:bg-white transition-colors duration-200"
                >
                  {pl.ctaButtonLabel}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
