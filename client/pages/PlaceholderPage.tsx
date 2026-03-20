import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-rellia-cream flex flex-col font-host-grotesk">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-2xl bg-white/50 backdrop-blur-sm p-12 md:p-20 rounded-3xl border border-black/5 shadow-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-rellia-teal mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-black/70 mb-10 leading-relaxed">
            This page is currently under development. <br />
            Stay tuned for the full Rellia Health experience!
          </p>
          {title.toLowerCase() === "contact us" ? (
            <p className="text-base md:text-lg text-black/70 leading-relaxed">
              For urgent messages, email{" "}
              <a
                href="mailto:hello@relliahealth.com"
                className="font-semibold text-rellia-teal hover:underline"
              >
                hello@relliahealth.com
              </a>
              .
            </p>
          ) : null}
          <div className={title.toLowerCase() === "contact us" ? "mt-8" : undefined}>
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
      
      {/* Mini Footer */}
      <footer className="py-10 text-center text-black/40 text-sm">
        © {new Date().getFullYear()} Rellia Health.
      </footer>
    </div>
  );
}
