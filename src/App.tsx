
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ContentPlanner from "./pages/ContentPlanner";
import Analytics from "./pages/Analytics";
import AudienceInsights from "./pages/AudienceInsights";
import AIContentCreator from "./pages/AIContentCreator";
import Platforms from "./pages/Platforms";
import Profile from "./pages/Profile";
import Communities from "./pages/Communities";
import Monetization from "./pages/Monetization";
import Documentation from "./pages/Documentation";
import NotFound from "./pages/NotFound";
import SocialApiIntegrationPage from "./components/ApiIntegrations/SocialApiIntegrationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/documentation/*" element={<Documentation />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/content-planner" element={
              <ProtectedRoute>
                <ContentPlanner />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="/audience-insights" element={
              <ProtectedRoute>
                <AudienceInsights />
              </ProtectedRoute>
            } />
            <Route path="/ai-content-creator" element={
              <ProtectedRoute>
                <AIContentCreator />
              </ProtectedRoute>
            } />
            <Route path="/platforms" element={
              <ProtectedRoute>
                <Platforms />
              </ProtectedRoute>
            } />
            <Route path="/api-integrations" element={
              <ProtectedRoute>
                <SocialApiIntegrationPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/communities" element={
              <ProtectedRoute>
                <Communities />
              </ProtectedRoute>
            } />
            <Route path="/monetization" element={
              <ProtectedRoute>
                <Monetization />
              </ProtectedRoute>
            } />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
