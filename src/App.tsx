
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Platforms from "./pages/Platforms";
import ContentPlanner from "./pages/ContentPlanner";
import Analytics from "./pages/Analytics";
import AudienceInsights from "./pages/AudienceInsights";
import AIContentCreator from "./pages/AIContentCreator";
import Documentation from "./pages/Documentation";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/content-planner" element={<ContentPlanner />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/audience-insights" element={<AudienceInsights />} />
            <Route path="/ai-content" element={<AIContentCreator />} />
            <Route path="/documentation" element={<Documentation />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
