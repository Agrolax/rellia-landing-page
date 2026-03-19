import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoMarquee from "@/components/LogoMarquee";
import NetworkMetricsSection from "@/components/NetworkMetricsSection";
import WhyRellia from "@/components/WhyRellia";
import HowItWorks from "@/components/HowItWorks";
import StartupDiagnostics from "@/components/StartupDiagnostics";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-white font-host-grotesk overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <LogoMarquee />
        <NetworkMetricsSection />
        <WhyRellia />
        <HowItWorks />
        <StartupDiagnostics />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
