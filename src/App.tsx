import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { Loader2 } from "lucide-react";

// Lazy-loaded components
const Index = React.lazy(() => import("./pages/Index"));
const ToolsPage = React.lazy(() => import("./pages/ToolsPage"));
const ToolPage = React.lazy(() => import("./pages/ToolPage"));
const PrivacyPage = React.lazy(() => import("./pages/PrivacyPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const CareersPage = React.lazy(() => import("./pages/CareersPage"));
const RoadmapPage = React.lazy(() => import("./pages/RoadmapPage"));
const SecurityPage = React.lazy(() => import("./pages/SecurityPage"));
const TermsPage = React.lazy(() => import("./pages/TermsPage"));
const PressPage = React.lazy(() => import("./pages/PressPage"));
const FaqPage = React.lazy(() => import("./pages/FaqPage"));
const FeatureRequestPage = React.lazy(() => import("./pages/FeatureRequestPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
