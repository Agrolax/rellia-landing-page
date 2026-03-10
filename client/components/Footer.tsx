import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-rellia-teal text-white pt-20 pb-10 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1300px] mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Branding Column */}
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
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Facebook className="w-5 h-5 text-white/80" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Twitter className="w-5 h-5 text-white/80" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Instagram className="w-5 h-5 text-white/80" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Linkedin className="w-5 h-5 text-white/80" /></a>
            </div>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-6">
            <h4 className="font-host-grotesk font-bold text-lg text-white">Company</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="font-urbanist text-white/70 hover:text-rellia-mint transition-colors text-[15px]">About Us</Link>
              <Link to="/careers" className="font-urbanist text-white/70 hover:text-rellia-mint transition-colors text-[15px]">Careers</Link>
              <Link to="/culture" className="font-urbanist text-white/70 hover:text-rellia-mint transition-colors text-[15px]">Culture</Link>
              <Link to="/blog" className="font-urbanist text-white/70 hover:text-rellia-mint transition-colors text-[15px]">Blog</Link>
            </nav>
          </div>

          {/* Support Column */}
          <div className="flex flex-col gap-6">
            <h4 className="font-host-grotesk font-bold text-lg text-white">Support</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/faq" className="font-urbanist text-white/70 hover:text-rellia-mint transition-colors text-[15px]">Help Center</Link>
              <Link to="/programs/events" className="font-urbanist text-white/70 hover:text-rellia-mint transition-colors text-[15px]">Getting Started</Link>
              <button className="text-left font-urbanist text-white/70 hover:text-rellia-mint transition-colors text-[15px]">Report a Bug</button>
              <button className="text-left font-urbanist text-white/70 hover:text-rellia-mint transition-colors text-[15px]">Chat Support</button>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-6">
            <h4 className="font-host-grotesk font-bold text-lg text-white">Contacts us</h4>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                 <Mail className="w-5 h-5 text-rellia-mint shrink-0" />
                 <span className="font-urbanist text-white/70 text-[15px]">contact@company.com</span>
              </div>
              <div className="flex items-center gap-3">
                 <Phone className="w-5 h-5 text-rellia-mint shrink-0" />
                 <span className="font-urbanist text-white/70 text-[15px]">(414) 687 - 5892</span>
              </div>
              <div className="flex items-start gap-3">
                 <MapPin className="w-5 h-5 text-rellia-mint shrink-0 mt-1" />
                 <span className="font-urbanist text-white/70 text-[15px] leading-relaxed">
                    123 Digital Health Way, Suite 400<br />San Francisco, CA 94103
                 </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-urbanist text-white/50 text-sm">
            © {new Date().getFullYear()} Rellia Health. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/terms" className="font-urbanist text-white/50 text-sm hover:text-rellia-mint transition-colors">Terms of Use</Link>
            <Link to="/privacy" className="font-urbanist text-white/50 text-sm hover:text-rellia-mint transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
