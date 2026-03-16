import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  CalendarDays,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  UserPlus,
  TrendingUp,
  ClipboardCheck,
  Building2,
  Rocket,
  CalendarRange,
  Users,
} from "lucide-react";

const programsItems = [
  { label: "QMS", icon: ClipboardCheck, href: "/programs/qms" },
  { label: "Industry Partners", icon: Building2, href: "/programs/industry-partners" },
  { label: "Future Programs", icon: Rocket, href: "/programs/future" },
  { label: "Events", icon: CalendarRange, href: "/programs/events" },
];

const networkItems = [
  { label: "Investors", icon: TrendingUp, href: "/programs/investment" },
  { label: "Founders", icon: Users, href: "/programs/future" },
];

// Logos
const LOGO_OUTLINE =
  "https://cdn.builder.io/api/v1/image/assets%2Fc82f69c03d1a4d3a8a3c2651cae51f04%2F24a5e5f030e249c8a711be872a794c6f?format=webp&width=400";
const LOGO_FILLED =
  "https://cdn.builder.io/api/v1/image/assets%2Fc82f69c03d1a4d3a8a3c2651cae51f04%2Faf0e0a18ee0243cb98fca22f296d3c0c?format=webp&width=400";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isProgramsActive = location.pathname.startsWith("/programs");
  const isNetworkActive = location.pathname === "/programs/investment" || location.pathname === "/programs/future";

  // Always use dark teal text and mint underline; scroll only controls dropdown visibility
  const textCls = "text-rellia-teal hover:text-rellia-teal/70";
  const underlineCls = "bg-rellia-mint";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-rellia-cream border-b border-black/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-[72px] md:h-[86px]">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={LOGO_FILLED}
            alt="Rellia"
            className="h-9 md:h-11 w-auto object-contain transition-all duration-300"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {/* Home */}
          <Link
            to="/"
            className={`relative flex items-center gap-1.5 font-host-grotesk text-[15px] lg:text-[16px] font-medium transition-colors pb-1 ${textCls}`}
          >
            <Home className="w-4 h-4 shrink-0" />
            Home
            {isActive("/") && (
              <span
                className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${underlineCls} transition-colors`}
              />
            )}
          </Link>

          {/* About — no chevron */}
          <Link
            to="/about"
            className={`relative flex items-center gap-1.5 font-host-grotesk text-[15px] lg:text-[16px] font-medium transition-colors pb-1 ${textCls}`}
          >
            <Info className="w-4 h-4 shrink-0" />
            About
            {isActive("/about") && (
              <span
                className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${underlineCls} transition-colors`}
              />
            )}
          </Link>

          {/* Programs & Events — with dropdown chevron */}
          <div className="relative group">
            <button
              className={`relative flex items-center gap-1.5 font-host-grotesk text-[15px] lg:text-[16px] font-medium transition-colors pb-1 ${textCls}`}
            >
              <CalendarDays className="w-4 h-4 shrink-0" />
              Programs &amp; Events
              <ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:rotate-180" />
              {isProgramsActive && (
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${underlineCls} transition-colors`}
                />
              )}
            </button>

            {/* Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white rounded-xl shadow-2xl border border-black/5 overflow-hidden min-w-[220px]">
                {programsItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center gap-3 px-5 py-3.5 text-rellia-teal hover:bg-rellia-cream transition-colors font-host-grotesk text-sm font-medium border-b border-black/5 last:border-0"
                    >
                      <Icon className="w-4 h-4 text-rellia-mint shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Network — new dropdown for investors & founders */}
          <div className="relative group">
            <button
              className={`relative flex items-center gap-1.5 font-host-grotesk text-[15px] lg:text-[16px] font-medium transition-colors pb-1 ${textCls}`}
            >
              <Users className="w-4 h-4 shrink-0" />
              Network
              <ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:rotate-180" />
              {isNetworkActive && (
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${underlineCls} transition-colors`}
                />
              )}
            </button>

            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white rounded-xl shadow-2xl border border-black/5 overflow-hidden min-w-[220px]">
                {networkItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center gap-3 px-5 py-3.5 text-rellia-teal hover:bg-rellia-cream transition-colors font-host-grotesk text-sm font-medium border-b border-black/5 last:border-0"
                    >
                      <Icon className="w-4 h-4 text-rellia-mint shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <Link
            to="/faq"
            className={`relative flex items-center gap-1.5 font-host-grotesk text-[15px] lg:text-[16px] font-medium transition-colors pb-1 ${textCls}`}
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            FAQ
            {isActive("/faq") && (
              <span
                className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${underlineCls} transition-colors`}
              />
            )}
          </Link>
        </div>

        {/* Get Involved CTA */}
        <div className="hidden md:flex shrink-0">
          <button
            className={`flex items-center gap-2 font-host-grotesk font-semibold text-[14px] lg:text-[15px] px-6 py-3 rounded-full border-2 transition-all duration-200 whitespace-nowrap tracking-tight
              hover:-translate-y-0.5 hover:shadow-lg
              bg-rellia-teal text-white border-rellia-teal hover:bg-transparent hover:text-rellia-teal`}
          >
            <UserPlus className="w-4 h-4" />
            Get Involved
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 transition-colors text-rellia-teal"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-rellia-cream border-t border-black/10 px-6 pb-6 flex flex-col">
          <Link
            to="/"
            className="flex items-center gap-3 py-4 border-b border-black/5 font-host-grotesk text-base font-medium text-rellia-teal"
            onClick={() => setMobileOpen(false)}
          >
            <Home className="w-5 h-5 text-rellia-mint" />
            Home
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-3 py-4 border-b border-black/5 font-host-grotesk text-base font-medium text-rellia-teal"
            onClick={() => setMobileOpen(false)}
          >
            <Info className="w-5 h-5 text-rellia-mint" />
            About
          </Link>

          {/* Programs accordion */}
          <div className="border-b border-black/5">
            <button
              className="flex items-center justify-between w-full py-4 font-host-grotesk text-base font-medium text-rellia-teal"
              onClick={() => setProgramsOpen(!programsOpen)}
            >
              <span className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-rellia-mint" />
                Programs &amp; Events
              </span>
              <ChevronDown
                className={`w-5 h-5 text-rellia-teal transition-transform duration-200 ${
                  programsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {programsOpen && (
              <div className="pl-8 pb-3 flex flex-col gap-1">
                {programsItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center gap-3 py-2.5 font-host-grotesk text-sm font-medium text-rellia-teal/80 hover:text-rellia-teal"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon className="w-4 h-4 text-rellia-mint" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Network accordion */}
          <div className="border-b border-black/5">
            <button
              className="flex items-center justify-between w-full py-4 font-host-grotesk text-base font-medium text-rellia-teal"
              onClick={() => setProgramsOpen(!programsOpen)}
            >
              <span className="flex items-center gap-3">
                <Users className="w-5 h-5 text-rellia-mint" />
                Network
              </span>
              <ChevronDown
                className={`w-5 h-5 text-rellia-teal transition-transform duration-200 ${
                  programsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {programsOpen && (
              <div className="pl-8 pb-3 flex flex-col gap-1">
                {networkItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center gap-3 py-2.5 font-host-grotesk text-sm font-medium text-rellia-teal/80 hover:text-rellia-teal"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon className="w-4 h-4 text-rellia-mint" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            to="/faq"
            className="flex items-center gap-3 py-4 border-b border-black/5 font-host-grotesk text-base font-medium text-rellia-teal"
            onClick={() => setMobileOpen(false)}
          >
            <HelpCircle className="w-5 h-5 text-rellia-mint" />
            FAQ
          </Link>

          <button className="mt-5 flex items-center justify-center gap-2 bg-rellia-teal text-white font-host-grotesk font-semibold text-base px-7 py-3.5 rounded-full border-2 border-rellia-teal hover:bg-transparent hover:text-rellia-teal transition-all duration-200 w-full">
            <UserPlus className="w-5 h-5" />
            Get Involved
          </button>
        </div>
      )}
    </nav>
  );
}
