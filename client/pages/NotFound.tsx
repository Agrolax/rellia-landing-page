import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNotFoundPage } from "@/hooks/useCmsDocuments";
import { DEFAULT_NOT_FOUND } from "@shared/cms/defaults";

const NotFound = () => {
  const location = useLocation();
  const { data } = useNotFoundPage();
  const copy = data ?? DEFAULT_NOT_FOUND;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-rellia-cream font-host-grotesk">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-lg">
          <p className="text-rellia-teal font-host-grotesk font-bold text-6xl md:text-7xl mb-4">404</p>
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">{copy.title}</h1>
          <p className="font-urbanist text-black/65 text-lg mb-10 leading-relaxed">{copy.message}</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-rellia-teal text-white font-semibold px-8 py-4 border-2 border-rellia-teal hover:bg-white hover:text-rellia-teal transition-colors"
          >
            {copy.ctaLabel}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
