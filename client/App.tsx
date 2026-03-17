import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Main Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Programs Subroutes */}
          <Route path="/programs/investment" element={<PlaceholderPage title="Investment Programs" />} />
          <Route path="/programs/qms" element={<PlaceholderPage title="Quality Management System" />} />
          <Route path="/programs/industry-partners" element={<PlaceholderPage title="Industry Partners" />} />
          <Route path="/programs/future" element={<PlaceholderPage title="Future Programs" />} />
          <Route path="/programs/events" element={<PlaceholderPage title="Upcoming Events" />} />
          
          {/* Footer Subroutes */}
          <Route path="/careers" element={<PlaceholderPage title="Careers" />} />
          <Route path="/culture" element={<PlaceholderPage title="Our Culture" />} />
          <Route path="/blog" element={<PlaceholderPage title="Our Blog" />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms of Use" />} />
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />

          {/* CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
