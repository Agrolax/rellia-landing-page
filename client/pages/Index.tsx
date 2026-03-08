import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoMarquee from "@/components/LogoMarquee";
import WhyRellia from "@/components/WhyRellia";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";

export default function Index() {
  return (
    <div className="min-h-screen bg-white font-host-grotesk">
      <Navbar />
      <main>
        <HeroSection />
        <LogoMarquee />
        <WhyRellia />
        <HowItWorks />
        <CTASection />
      </main>

      {/* Footer */}
      <footer className="bg-rellia-teal text-white py-10 px-6 md:px-10 mt-0">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-white/10 rounded px-4 py-2">
              <span className="font-host-grotesk font-bold text-white text-xl tracking-tight">
                Rellia
              </span>
            </div>
          </div>
          <p className="font-urbanist text-white/60 text-sm text-center">
            © {new Date().getFullYear()} Rellia Health. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-urbanist text-white/70 text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-urbanist text-white/70 text-sm hover:text-white transition-colors"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
