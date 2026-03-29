import { Link } from "react-router-dom"
import { MoveLeft } from "lucide-react"

const LOGO_URL =
  "https://cdn.builder.io/api/v1/image/assets%2Fc82f69c03d1a4d3a8a3c2651cae51f04%2Faf0e0a18ee0243cb98fca22f296d3c0c?format=webp&width=400"

/**
 * Standalone placeholder: no shared Navbar/Footer so this route does not depend on
 * CMS hooks or heavy layout. Full site chrome can return when CMS is stable.
 */
export default function PlaceholderPage({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="min-h-screen bg-rellia-cream flex flex-col font-host-grotesk">
      <header className="shrink-0 border-b border-black/10 bg-rellia-cream/95 backdrop-blur-sm px-6 md:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="Rellia Health home">
          <img src={LOGO_URL} alt="" className="h-9 md:h-11 w-auto object-contain" />
          <span className="font-host-grotesk font-semibold text-rellia-teal text-lg md:text-xl">
            Rellia Health
          </span>
        </Link>
        <Link
          to="/programs"
          className="text-sm font-medium text-rellia-teal/80 hover:text-rellia-teal hidden sm:inline"
        >
          Programs
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-2xl bg-white/50 backdrop-blur-sm p-12 md:p-20 rounded-3xl border border-black/5 shadow-xl w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-rellia-teal mb-6">{title}</h1>
          <p className="text-lg md:text-xl text-black/70 mb-8 leading-relaxed">
            {subtitle ||
              "This page is currently under development. Stay tuned for the full Rellia Health experience!"}
          </p>
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-rellia-teal text-white px-8 py-4 rounded-full font-semibold hover:bg-rellia-teal/90 transition-all hover:gap-4"
              aria-label="Back to Home"
              tabIndex={0}
            >
              <MoveLeft className="w-5 h-5" aria-hidden />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="shrink-0 bg-rellia-teal text-white py-8 px-6 text-center">
        <p className="font-urbanist text-white/80 text-sm">
          © {new Date().getFullYear()} Rellia Health. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
