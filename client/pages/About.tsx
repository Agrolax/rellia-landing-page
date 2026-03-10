import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Heart, Target, Users, Lightbulb, ChevronRight } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Patient-Centered",
    description: "Every decision we make is guided by its ultimate impact on patient outcomes and quality of care."
  },
  {
    icon: Target,
    title: "Clinician-Driven",
    description: "We bridge the gap between technology and practice by putting healthcare providers at the center of development."
  },
  {
    icon: Users,
    title: "Founder-First",
    description: "We are built by founders, for founders. We provide the support and empathy we wish we had."
  },
  {
    icon: Lightbulb,
    title: "Evidence-Based",
    description: "We value rigorous validation and scientific integrity in every solution we support."
  }
];

const team = [
  {
    name: "Dr. Elena Vance",
    role: "Founding Partner & Chief Medical Officer",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400",
    bio: "Former Head of Digital Health at a major health system with 15+ years of clinical experience."
  },
  {
    name: "Marcus Thorne",
    role: "Managing Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    bio: "Serial entrepreneur who scaled and exited two digital health platforms in the RPM space."
  },
  {
    name: "Sarah Jenkins",
    role: "Head of Community & Programs",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    bio: "Expert in ecosystem building with a background in healthtech accelerator management."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white font-host-grotesk overflow-x-hidden">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-rellia-teal overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rellia-mint via-transparent to-transparent blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-8">
                Empowering the <br />
                <span className="text-rellia-mint">next generation</span> <br />
                of health tech.
              </h1>
              <p className="text-white/80 text-lg md:text-2xl max-w-2xl font-urbanist leading-relaxed">
                Rellia Health is a venture studio and accelerator dedicated to accelerating the commercialization of digital health solutions that matter.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <ScrollReveal className="flex-1">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-rellia-mint/20 rounded-full blur-2xl"></div>
                <h2 className="text-black text-4xl md:text-5xl font-bold tracking-tight mb-8">
                  Our Mission
                </h2>
                <div className="space-y-6 text-black/70 text-lg md:text-xl font-urbanist leading-relaxed">
                  <p>
                    The healthcare industry is notoriously difficult to navigate. Brilliant founders often struggle not because their ideas lack merit, but because they lack the clinical pathways and regulatory frameworks needed to succeed.
                  </p>
                  <p>
                    At Rellia, our mission is to bridge the gap between innovation and implementation. we provide founders with the expertise, clinician access, and step-by-step roadmap required to build solutions that health systems actually want to buy.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal className="flex-1 w-full" delay={0.2}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dad99a01?auto=format&fit=crop&q=80&w=1200" 
                  alt="Clinicians collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-32 bg-rellia-cream/50">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-black text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Our Values
              </h2>
              <p className="text-black/60 text-lg md:text-xl font-urbanist max-w-2xl mx-auto">
                These principles guide every partnership, program, and investment we make.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <ScrollReveal key={v.title} delay={i * 0.1}>
                    <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                      <div className="w-14 h-14 bg-rellia-teal/5 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-rellia-teal" />
                      </div>
                      <h3 className="text-black text-2xl font-bold mb-4">{v.title}</h3>
                      <p className="text-black/60 font-urbanist leading-relaxed">{v.description}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-black text-4xl md:text-5xl font-bold tracking-tight mb-6">
                The Team
              </h2>
              <p className="text-black/60 text-lg md:text-xl font-urbanist max-w-2xl mx-auto">
                A collective of founders, clinicians, and operators who have been in your shoes.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
              {team.map((t, i) => (
                <ScrollReveal key={t.name} delay={i * 0.1}>
                  <div className="group cursor-default">
                    <div className="relative aspect-square rounded-3xl overflow-hidden mb-6 shadow-md grayscale group-hover:grayscale-0 transition-all duration-500">
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-rellia-teal/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <h3 className="text-black text-2xl font-bold mb-1">{t.name}</h3>
                    <p className="text-rellia-teal font-semibold text-sm uppercase tracking-wider mb-4">{t.role}</p>
                    <p className="text-black/60 font-urbanist text-lg leading-relaxed">{t.bio}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-[1300px] mx-auto">
            <ScrollReveal>
              <div className="bg-rellia-teal rounded-[40px] p-12 md:p-24 flex flex-col items-center text-center text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rellia-mint/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 max-w-3xl relative z-10">
                  Ready to transform the healthcare landscape?
                </h2>
                <p className="text-white/70 text-lg md:text-xl font-urbanist mb-12 max-w-xl relative z-10 leading-relaxed">
                  Join our upcoming cohort or partner with us to bring your innovation to clinical reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                  <button className="bg-rellia-mint text-rellia-teal font-bold px-10 py-5 rounded-full hover:bg-white hover:-translate-y-1 transition-all flex items-center gap-2">
                    Apply to Join Now <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="border-2 border-white/20 text-white font-bold px-10 py-5 rounded-full hover:bg-white/10 hover:-translate-y-1 transition-all">
                    Contact Us
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
