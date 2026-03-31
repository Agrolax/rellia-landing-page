import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import ProgramsEvents from "./pages/ProgramsEvents";
import ProgramsQms from "./pages/ProgramsQms";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import Payment from "./pages/Payment";
import DiagnosticLanding from "./pages/DiagnosticLanding";
import DiagnosticSurvey from "./pages/DiagnosticSurvey";

const queryClient = new QueryClient();

/** Auto-tracked SPA views; avoid manual route/path props (can mis-track or error on some paths). */
const VercelObservability = () => (
  <>
    <Analytics />
    <SpeedInsights />
  </>
)

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

          {/* Diagnostics */}
          <Route path="/diagnostic" element={<DiagnosticLanding />} />
          <Route path="/diagnosticSurvey" element={<DiagnosticSurvey />} />

          {/* Misc */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/network" element={<PlaceholderPage title="Network" />} />
          <Route path="/blog" element={<PlaceholderPage title="Our Blog" />} />

          {/* CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
