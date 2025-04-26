
import React from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import DocSidebar from '@/components/DocSidebar';
import { useLocation } from 'react-router-dom';

interface DocPageProps {
  children: React.ReactNode;
  title?: string;
}

const DocPage = ({ children, title }: DocPageProps) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Create breadcrumbs based on path
  const breadcrumbs = pathSegments.map((segment, index) => {
    // Format the segment for display (capitalize, replace hyphens with spaces)
    const formattedSegment = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
      
    return {
      name: formattedSegment,
      path: '/' + pathSegments.slice(0, index + 1).join('/'),
      isCurrent: index === pathSegments.length - 1
    };
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <div className="flex-grow flex">
        <DocSidebar />
        <main className="flex-grow p-6 md:p-8 max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">Home</a>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.path}>
                <span className="mx-2">/</span>
                {crumb.isCurrent ? (
                  <span className="font-medium text-foreground">{crumb.name}</span>
                ) : (
                  <a href={crumb.path} className="hover:text-foreground">{crumb.name}</a>
                )}
              </React.Fragment>
            ))}
          </nav>
          
          {/* Title */}
          {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
          
          {/* Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DocPage;
