import { Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-rellia-teal text-white pt-20 pb-10 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Branding */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fc82f69c03d1a4d3a8a3c2651cae51f04%2F24a5e5f030e249c8a711be872a794c6f?format=webp&width=300"
                alt="Rellia"
                className="h-10 w-auto"
              />
            </Link>
            <p className="font-urbanist text-white/70 text-[15px] leading-relaxed max-w-[280px]">
              Rellia connects promising digital health founders with industry experts, clinicians, and engaged investors.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/relliahealth" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5 text-white/80" />
              </a>
              <a href="https://www.instagram.com/relliahealth/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Instagram className="w-5 h-5 text-white/80" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-6">
            <h4 className="font-host-grotesk font-bold text-lg text-white">Company</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="font-urbanist text-white/70 hover:text-rellia-mint transition-colors text-[15px]">About Us</Link>
              <a href="https://docs.google.com/document/d/1wiC9mW3mDsCeqXz-dqr93RBr_pehru-h/edit" target="_blank" rel="noopener noreferrer" className="font-urbanist text-white/70 hover:text-rellia-mint transition-colors text-[15px]">Terms of Use</a>
              <a href="https://docs.google.com/document/d/17ZVWt9jSSCEfHKX0Np_D01ua4NuIb_Su/edit" target="_blank" rel="noopener noreferrer" className="font-urbanist text-white/70 hover:text-rellia-mint transition-colors text-[15px]">Privacy Policy</a>
            </nav>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-6">
            <h4 className="font-host-grotesk font-bold text-lg text-white">Support</h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/faq"
                className="font-urbanist text-white/70 hover:text-rellia-mint transition-colors text-[15px]"
              >
                Frequently Asked Questions
              </Link>
              <Link
                to="/contact"
                className="font-urbanist text-white/70 hover:text-rellia-mint transition-colors text-[15px]"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="font-host-grotesk font-bold text-lg text-white">Contact us</h4>
            <div className="flex flex-col gap-5">
              <a href="mailto:hello@relliahealth.com" className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-rellia-mint shrink-0" />
                <span className="font-urbanist text-white/70 group-hover:text-rellia-mint transition-colors text-[15px]">hello@relliahealth.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-center">
          <p className="font-urbanist text-white/50 text-sm text-center">
            &copy; {new Date().getFullYear()} Rellia Health. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
