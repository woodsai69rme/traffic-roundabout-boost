
import { Toaster } from "@/components/ui/toaster";
import { Routes, Route } from "react-router-dom";
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
import Communities from "./pages/Communities";
import Monetization from "./pages/Monetization";
import NotFound from "./pages/NotFound";
import SocialApiIntegrationPage from "./components/ApiIntegrations/SocialApiIntegrationPage";

const App = () => (
  <>
    <Toaster />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/platforms" element={<Platforms />} />
      <Route path="/content-planner" element={<ContentPlanner />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/audience-insights" element={<AudienceInsights />} />
      <Route path="/ai-content" element={<AIContentCreator />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/communities" element={<Communities />} />
      <Route path="/monetization" element={<Monetization />} />
      <Route path="/api-integrations" element={<SocialApiIntegrationPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;
