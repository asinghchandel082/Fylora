import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import ToolsPage from "./pages/ToolsPage";
import ToolPage from "./pages/ToolPage";
import PrivacyPage from "./pages/PrivacyPage";
import AboutPage from "./pages/AboutPage";
import CareersPage from "./pages/CareersPage";
import RoadmapPage from "./pages/RoadmapPage";
import SecurityPage from "./pages/SecurityPage";
import TermsPage from "./pages/TermsPage";
import PressPage from "./pages/PressPage";
import FaqPage from "./pages/FaqPage";
import FeatureRequestPage from "./pages/FeatureRequestPage";
import NotFound from "./pages/NotFound";

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
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tool/:toolId" element={<ToolPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/request-feature" element={<FeatureRequestPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
