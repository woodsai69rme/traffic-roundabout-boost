
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Platforms from './pages/Platforms';
import Communities from './pages/Communities';
import Monetization from './pages/Monetization';
import Profile from './pages/Profile';
import Documentation from './pages/Documentation';
import NotFound from './pages/NotFound';
import SocialApiIntegrationPage from './components/ApiIntegrations/SocialApiIntegrationPage';
import DocPage from './components/DocPage';
import DocPageContent from './components/DocPageContent';
import ContentPlanner from './pages/ContentPlanner';
import AudienceInsights from './pages/AudienceInsights';
import AIContentCreator from './pages/AIContentCreator';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Documentation route component
const DocRoute = ({ path, title }: { path: string, title: string }) => {
  return (
    <DocPage title={title}>
      <DocPageContent filePath={path} />
    </DocPage>
  );
};

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      
      {/* Social Media Growth Routes */}
      <Route path="/platforms" element={<ProtectedRoute><Platforms /></ProtectedRoute>} />
      <Route path="/communities" element={<ProtectedRoute><Communities /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/monetization" element={<ProtectedRoute><Monetization /></ProtectedRoute>} />
      <Route path="/integrations" element={<ProtectedRoute><SocialApiIntegrationPage /></ProtectedRoute>} />
      <Route path="/content-planner" element={<ProtectedRoute><ContentPlanner /></ProtectedRoute>} />
      <Route path="/audience-insights" element={<ProtectedRoute><AudienceInsights /></ProtectedRoute>} />
      <Route path="/ai-content-creator" element={<ProtectedRoute><AIContentCreator /></ProtectedRoute>} />
      
      {/* Documentation Routes */}
      <Route path="/docs" element={<Documentation />} />
      <Route path="/docs/tech-architecture" element={
        <DocRoute path="/docs/TechnicalArchitecture.md" title="Technical Architecture" />
      } />
      <Route path="/docs/arch-design" element={
        <DocRoute path="/docs/ArchitecturalDesign.md" title="Architectural Design" />
      } />
      
      {/* No-Code Documentation Routes */}
      <Route path="/docs/nocode" element={
        <DocRoute path="/docs/nocode/README.md" title="No-Code Integrations" />
      } />
      <Route path="/docs/nocode/webflow" element={
        <DocRoute path="/docs/nocode/webflow.md" title="Webflow Integration" />
      } />
      <Route path="/docs/nocode/bubble" element={
        <DocRoute path="/docs/nocode/bubble.md" title="Bubble Integration" />
      } />
      <Route path="/docs/nocode/adalo" element={
        <DocRoute path="/docs/nocode/adalo.md" title="Adalo Integration" />
      } />
      <Route path="/docs/nocode/zapier" element={
        <DocRoute path="/docs/nocode/zapier.md" title="Zapier Integration" />
      } />
      <Route path="/docs/nocode/make" element={
        <DocRoute path="/docs/nocode/make.md" title="Make Integration" />
      } />
      <Route path="/docs/nocode/airtable" element={
        <DocRoute path="/docs/nocode/airtable.md" title="Airtable Integration" />
      } />
      <Route path="/docs/nocode/notion" element={
        <DocRoute path="/docs/nocode/notion.md" title="Notion Integration" />
      } />
      
      {/* VS Code Documentation Routes */}
      <Route path="/docs/vscode" element={
        <DocRoute path="/docs/vs-code/README.md" title="VS Code Setup" />
      } />
      <Route path="/docs/vscode/extensions" element={
        <DocRoute path="/docs/vs-code/extensions.md" title="VS Code Extensions" />
      } />
      <Route path="/docs/vscode/snippets" element={
        <DocRoute path="/docs/vs-code/snippets.md" title="VS Code Snippets" />
      } />
      <Route path="/docs/vscode/launch" element={
        <DocRoute path="/docs/vs-code/launch.md" title="VS Code Launch Configuration" />
      } />
      <Route path="/docs/vscode/tasks" element={
        <DocRoute path="/docs/vs-code/tasks.md" title="VS Code Tasks" />
      } />
      <Route path="/docs/vscode/keybindings" element={
        <DocRoute path="/docs/vs-code/keybindings.md" title="VS Code Keybindings" />
      } />
      <Route path="/docs/vscode/debugging" element={
        <DocRoute path="/docs/vs-code/debugging.md" title="VS Code Debugging" />
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Toaster />
  </>
);

export default App;
