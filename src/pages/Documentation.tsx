
import React from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import DocSidebar from '@/components/DocSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookOpen, Code, Layers, Box, Zap, Database, Puzzle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DocCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const DocCard = ({ title, description, icon, href }: DocCardProps) => (
  <Link to={href}>
    <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </Link>
);

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <div className="flex-grow flex">
        <DocSidebar />
        <main className="flex-grow p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Documentation</h1>
            <p className="text-muted-foreground mb-8">
              Comprehensive guides and references for Roundabout platform integration and development
            </p>

            {/* Architecture Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Architecture</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <DocCard 
                  title="Technical Architecture"
                  description="Overview of system components, services, and infrastructure"
                  icon={<Layers className="h-5 w-5 text-primary" />}
                  href="/docs/tech-architecture"
                />
                <DocCard 
                  title="Architectural Design"
                  description="Application structure, component organization, and data flow patterns"
                  icon={<Box className="h-5 w-5 text-primary" />}
                  href="/docs/arch-design"
                />
              </div>
            </section>

            {/* No-Code Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">No-Code Integrations</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <DocCard 
                  title="Webflow"
                  description="Connect your Webflow site with Roundabout for enhanced design and content management"
                  icon={<FileText className="h-5 w-5 text-primary" />}
                  href="/docs/nocode/webflow"
                />
                <DocCard 
                  title="Bubble"
                  description="Integrate Roundabout with Bubble for powerful no-code application development"
                  icon={<Database className="h-5 w-5 text-primary" />}
                  href="/docs/nocode/bubble"
                />
                <DocCard 
                  title="Zapier"
                  description="Automate workflows between Roundabout and other applications"
                  icon={<Zap className="h-5 w-5 text-primary" />}
                  href="/docs/nocode/zapier"
                />
                <DocCard 
                  title="Make (Integromat)"
                  description="Create complex automation scenarios with Roundabout and Make"
                  icon={<Puzzle className="h-5 w-5 text-primary" />}
                  href="/docs/nocode/make"
                />
                <DocCard 
                  title="Airtable"
                  description="Sync Roundabout data with Airtable for enhanced data management"
                  icon={<Database className="h-5 w-5 text-primary" />}
                  href="/docs/nocode/airtable"
                />
                <DocCard 
                  title="Notion"
                  description="Integrate Roundabout with Notion for documentation and planning"
                  icon={<BookOpen className="h-5 w-5 text-primary" />}
                  href="/docs/nocode/notion"
                />
              </div>
            </section>

            {/* VS Code Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">VS Code Setup</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <DocCard 
                  title="Extensions"
                  description="Recommended VS Code extensions for Roundabout development"
                  icon={<Code className="h-5 w-5 text-primary" />}
                  href="/docs/vscode/extensions"
                />
                <DocCard 
                  title="Snippets"
                  description="Code snippets to accelerate Roundabout development"
                  icon={<Code className="h-5 w-5 text-primary" />}
                  href="/docs/vscode/snippets"
                />
                <DocCard 
                  title="Debugging"
                  description="Configure VS Code for effective debugging of Roundabout applications"
                  icon={<Code className="h-5 w-5 text-primary" />}
                  href="/docs/vscode/debugging"
                />
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Documentation;
