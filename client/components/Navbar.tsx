import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-rellia-cream w-full z-50 sticky top-0">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-[80px] md:h-[100px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-[100px] h-[44px] md:w-[120px] md:h-[52px] bg-rellia-teal rounded flex items-center justify-center px-3">
            <span className="font-host-grotesk font-bold text-white text-lg md:text-xl tracking-tight">
              Rellia
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <Link
            to="/"
            className="font-host-grotesk text-lg lg:text-xl text-black hover:text-rellia-teal transition-colors"
          >
            Home
          </Link>
          <div className="relative group flex items-center gap-1 cursor-pointer">
            <span className="font-host-grotesk text-lg lg:text-xl text-black group-hover:text-rellia-teal transition-colors">
              About
            </span>
            <ChevronDown className="w-5 h-5 text-black group-hover:text-rellia-teal transition-colors" />
          </div>
          <Link
            to="/programs"
            className="font-host-grotesk text-lg lg:text-xl text-black hover:text-rellia-teal transition-colors"
          >
            Programs &amp; Events
          </Link>
          <Link
            to="/faq"
            className="font-host-grotesk text-lg lg:text-xl text-black hover:text-rellia-teal transition-colors"
          >
            FAQ
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <button className="bg-[#222221] text-white font-host-grotesk font-semibold text-base lg:text-lg px-7 py-4 rounded-full hover:bg-rellia-teal transition-colors whitespace-nowrap tracking-tight">
            Get Involved
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-rellia-teal"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-rellia-cream border-t border-black/10 px-6 pb-6 flex flex-col gap-5">
          <Link
            to="/"
            className="font-host-grotesk text-lg text-black hover:text-rellia-teal pt-4"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <div className="flex items-center gap-1">
            <span className="font-host-grotesk text-lg text-black">About</span>
            <ChevronDown className="w-5 h-5" />
          </div>
          <Link
            to="/programs"
            className="font-host-grotesk text-lg text-black hover:text-rellia-teal"
            onClick={() => setMobileOpen(false)}
          >
            Programs &amp; Events
          </Link>
          <Link
            to="/faq"
            className="font-host-grotesk text-lg text-black hover:text-rellia-teal"
            onClick={() => setMobileOpen(false)}
          >
            FAQ
          </Link>
          <button className="bg-[#222221] text-white font-host-grotesk font-semibold text-base px-7 py-4 rounded-full hover:bg-rellia-teal transition-colors w-full mt-2">
            Get Involved
          </button>
        </div>
      )}
    </nav>
  );
}
