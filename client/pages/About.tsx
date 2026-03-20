import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Heart, Stethoscope, Globe, Zap } from "lucide-react";
import { IconFeatureCard, TeamMemberCard, AboutCtaBanner } from "@/components/cards";

const values = [
  {
    icon: Heart,
    title: "Generous",
    description:
      "Building in health tech is hard enough. Everyone here genuinely wants to see you succeed, and that makes all the difference.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare-Specific",
    description:
      "Generic startup guidance does not work in healthcare. Everything we offer is built around the specific realities of health tech commercialization.",
  },
  {
    icon: Globe,
    title: "Globally Connected",
    description:
      "Great ideas and great mentors are not concentrated in one city. Rellia is a virtual community, and that breadth makes it stronger.",
  },
  {
    icon: Zap,
    title: "Radically Practical",
    description:
      "You don't need more learning, you need more things accomplished. We focus on helping you achieve the outcomes that actually move your business forward.",
  },
];

const team: {
  name: string;
  role?: string;
  bio?: string;
  imageSrc?: string;
}[] = [
  {
    name: "Megan Kane",
    role: "Executive Director, Co-Founder",
    bio: "Regulatory and Quality Management executive specializing in global market entry strategy and FDA/Health Canada submissions for SaMD and digital health companies.",
    imageSrc: "/images/megankane-team.jpeg",
  },
  {
    name: "Deena Al-Sammak",
    role: "Program Manager",
    imageSrc: "/images/deenasammak-team.jpeg",
  },
  { name: "Priyanka", imageSrc: "/images/nopicture-female.jpg" },
  { name: "Khali", imageSrc: "/images/nopicture-male.jpg" },
  { name: "Kelly", imageSrc: "/images/nopicture-female.jpg" },
];

const FOUNDER_APPLY_MAIL = "/network";

export default function About() {
  return (
    <div className="min-h-screen bg-white font-host-grotesk overflow-x-hidden">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-rellia-teal overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rellia-mint via-transparent to-transparent blur-3xl" />
          </div>

          <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-8">
                Empowering the <br />
                <span className="text-rellia-mint">next generation</span> <br />
                of health tech.
              </h1>
              <p className="text-white/80 text-lg md:text-2xl max-w-3xl font-urbanist leading-relaxed">
                Rellia Health is a virtual incubator dedicated to accelerating the commercialization of
                digital health solutions that matter.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Mission + image — single ScrollReveal so copy + image reveal together */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row lg:items-start gap-16 md:gap-24">
                <div className="relative min-h-0 flex-1 w-full">
                  <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-rellia-mint/20 blur-2xl pointer-events-none" />
                  <h2 className="relative text-black text-4xl md:text-5xl font-bold tracking-tight mb-8">
                    Our Mission
                  </h2>
                  <div className="relative space-y-6 text-black/70 text-lg md:text-xl font-urbanist leading-relaxed">
                    <p>
                      The healthcare industry is notoriously difficult to navigate. Brilliant founders often
                      struggle not because their ideas lack merit, but because they are trying to figure it
                      out without the right people around them.
                    </p>
                    <p>
                      At Rellia, we meet health tech founders where they are, surrounding them with deep
                      industry expertise and individualized support so that the complexities of healthcare
                      innovation feel less overwhelming. Because when founders have the right people in
                      their corner, meaningful innovation actually reaches the patients who need it.
                    </p>
                  </div>
                </div>

                <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-3xl shadow-2xl lg:max-w-[min(100%,520px)] lg:shrink-0">
                  <img
                    src="/images/TabletMeeting.png"
                    alt="Team collaborating over a tablet in a meeting"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Values — reference layout: 4-across on large screens, light icon tiles */}
        <section className="py-20 md:py-32 bg-rellia-cream/50">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-black text-4xl md:text-5xl font-bold tracking-tight mb-6">Values</h2>
              <p className="text-black/60 text-lg md:text-xl font-urbanist max-w-2xl mx-auto leading-relaxed">
                These principles guide every partnership, program, and decision we make.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <ScrollReveal key={v.title} delay={i * 0.1}>
                    <IconFeatureCard
                      variant="static"
                      icon={Icon}
                      title={v.title}
                      description={v.description}
                    />
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Meet the team */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-black text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Meet The Team
              </h2>
              <p className="text-black/60 text-lg md:text-xl font-urbanist max-w-2xl mx-auto leading-relaxed">
                Health tech insiders who saw a better way, so they built it. Just like you did.
              </p>
            </ScrollReveal>

            <div className="overflow-x-auto pb-2">
              <div className="flex gap-6 min-w-max">
                {team.map((t) => (
                  <div key={t.name} className="w-[280px] sm:w-[300px]">
                    <TeamMemberCard name={t.name} role={t.role} bio={t.bio} imageSrc={t.imageSrc} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-[1300px] mx-auto">
            <ScrollReveal>
              <AboutCtaBanner founderApplyHref={FOUNDER_APPLY_MAIL} teamCareersPath="/contact" />
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
