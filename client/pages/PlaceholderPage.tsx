import Navbar from "@/components/Navbar";
import { Link, useLocation } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import Footer from "@/components/Footer";
import { useMarketingPage } from "@/hooks/useCmsDocuments";
import { PortableRichText } from "@/components/PortableRichText";
import { useMemo } from "react";

function pathToMarketingSlug(pathname: string): string {
  const trimmed = pathname.replace(/^\/+|\/+$/g, "");
  if (!trimmed) return "home";
  return trimmed.replace(/\//g, "-");
}

export default function PlaceholderPage({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const { pathname } = useLocation();
  const slug = useMemo(() => pathToMarketingSlug(pathname), [pathname]);
  const { data } = useMarketingPage(slug, {
    title,
    subtitle: subtitle ?? "",
  });

  return (
    <div className="min-h-screen bg-rellia-cream flex flex-col font-host-grotesk">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-2xl bg-white/50 backdrop-blur-sm p-12 md:p-20 rounded-3xl border border-black/5 shadow-xl w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-rellia-teal mb-6">{data.title}</h1>
          <p className="text-lg md:text-xl text-black/70 mb-8 leading-relaxed">{data.subtitle}</p>
          <PortableRichText value={data.body ?? undefined} className="text-left mb-10" />
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-rellia-teal text-white px-8 py-4 rounded-full font-semibold hover:bg-rellia-teal/90 transition-all hover:gap-4"
            >
              <MoveLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
