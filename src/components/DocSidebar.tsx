
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface DocItem {
  title: string;
  path: string;
}

interface DocCategory {
  name: string;
  items: DocItem[];
}

const DocSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const docCategories: DocCategory[] = [
    {
      name: 'Architecture',
      items: [
        { title: 'Technical Architecture', path: '/docs/tech-architecture' },
        { title: 'Architectural Design', path: '/docs/arch-design' },
      ]
    },
    {
      name: 'No-Code Integrations',
      items: [
        { title: 'Overview', path: '/docs/nocode' },
        { title: 'Webflow', path: '/docs/nocode/webflow' },
        { title: 'Bubble', path: '/docs/nocode/bubble' },
        { title: 'Adalo', path: '/docs/nocode/adalo' },
        { title: 'Zapier', path: '/docs/nocode/zapier' },
        { title: 'Make', path: '/docs/nocode/make' },
        { title: 'Airtable', path: '/docs/nocode/airtable' },
        { title: 'Notion', path: '/docs/nocode/notion' },
      ]
    },
    {
      name: 'VS Code Setup',
      items: [
        { title: 'Getting Started', path: '/docs/vscode' },
        { title: 'Extensions', path: '/docs/vscode/extensions' },
        { title: 'Snippets', path: '/docs/vscode/snippets' },
        { title: 'Launch Configuration', path: '/docs/vscode/launch' },
        { title: 'Tasks', path: '/docs/vscode/tasks' },
        { title: 'Keybindings', path: '/docs/vscode/keybindings' },
        { title: 'Debugging', path: '/docs/vscode/debugging' },
      ]
    },
  ];

  return (
    <div className="w-64 border-r h-full">
      <ScrollArea className="h-full py-6 px-4">
        <div className="space-y-6">
          {docCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground mb-1 px-2">
                {category.name}
              </h4>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "block px-2 py-1 text-sm rounded-md",
                      currentPath === item.path
                        ? "bg-muted font-medium"
                        : "text-muted-foreground hover:bg-muted/50 transition-colors"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DocSidebar;
