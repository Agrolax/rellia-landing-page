import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoMarquee from "@/components/LogoMarquee";
import NetworkMetricsSection from "@/components/NetworkMetricsSection";
import WhyRellia from "@/components/WhyRellia";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-white font-host-grotesk overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <NetworkMetricsSection />
        <WhyRellia />
        <HowItWorks />
        <TestimonialsSection />
        <LogoMarquee />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
