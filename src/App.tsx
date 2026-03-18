
import { Toaster } from "@/components/ui/toaster";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Platforms from "./pages/Platforms";
import ContentPlanner from "./pages/ContentPlanner";
import Analytics from "./pages/Analytics";
import AudienceInsights from "./pages/AudienceInsights";
import AIContentCreator from "./pages/AIContentCreator";
import Documentation from "./pages/Documentation";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Communities from "./pages/Communities";
import Monetization from "./pages/Monetization";
import NotFound from "./pages/NotFound";
import SocialApiIntegrationPage from "./components/ApiIntegrations/SocialApiIntegrationPage";
import UTMBuilder from "./pages/UTMBuilder";
import GlobalSearch from "./components/GlobalSearch";

const App = () => (
  <>
    <Toaster />
    <GlobalSearch />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/platforms" element={<ProtectedRoute><Platforms /></ProtectedRoute>} />
      <Route path="/content-planner" element={<ProtectedRoute><ContentPlanner /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/audience-insights" element={<ProtectedRoute><AudienceInsights /></ProtectedRoute>} />
      <Route path="/ai-content" element={<ProtectedRoute><AIContentCreator /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/communities" element={<ProtectedRoute><Communities /></ProtectedRoute>} />
      <Route path="/monetization" element={<ProtectedRoute><Monetization /></ProtectedRoute>} />
      <Route path="/api-integrations" element={<ProtectedRoute><SocialApiIntegrationPage /></ProtectedRoute>} />
      <Route path="/utm-builder" element={<ProtectedRoute><UTMBuilder /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;
