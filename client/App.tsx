import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import ProgramsEvents from "./pages/ProgramsEvents";
import ProgramsQms from "./pages/ProgramsQms";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import DiagnosticLanding from "./pages/DiagnosticLanding";
import DiagnosticSurvey from "./pages/DiagnosticSurvey";
import Contact from "./pages/Contact";
import Payment from "./pages/Payment";

const queryClient = new QueryClient();

/**
 * Web Analytics + Speed Insights under React Router.
 * Analytics needs both `route` and `path` when `route` is set (see @vercel/analytics/react).
 */
function VercelObservability() {
  const { pathname, search } = useLocation();
  const path = `${pathname}${search}`;
  return (
    <>
      <Analytics route={pathname} path={path} />
      <SpeedInsights route={pathname} />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <VercelObservability />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Main Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/programs" element={<ProgramsEvents />} />
          <Route path="/programs/qms" element={<ProgramsQms />} />

          {/* Network Subroutes */}
          <Route path="/programs/investment" element={<PlaceholderPage title="Investment Programs" />} />
          <Route path="/programs/industry-partners" element={<PlaceholderPage title="Industry Partners" />} />
          <Route path="/programs/future" element={<PlaceholderPage title="Founders Network" />} />
          <Route path="/programs/advisors" element={<PlaceholderPage title="Advisors" />} />

          {/* Misc */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/network" element={<PlaceholderPage title="Network" />} />
          <Route path="/blog" element={<PlaceholderPage title="Our Blog" />} />

          {/* Diagnostic — Additions branch only (not on main) */}
          <Route path="/diagnostic" element={<DiagnosticLanding />} />
          <Route path="/diagnostic/survey" element={<DiagnosticSurvey />} />

          {/* CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
