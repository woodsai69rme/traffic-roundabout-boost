
import React, { useEffect, useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

interface DocPageContentProps {
  filePath: string;
}

const DocPageContent = ({ filePath }: DocPageContentProps) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocContent = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to fetch documentation: ${response.statusText}`);
        }
        
        const textContent = await response.text();
        setContent(textContent);
      } catch (err) {
        console.error('Error fetching documentation:', err);
        setError('Failed to load documentation content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocContent();
  }, [filePath]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-destructive">{error}</p>
        <p className="mt-4 text-muted-foreground">Check that the documentation file exists at {filePath}</p>
      </div>
    );
  }

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <MarkdownRenderer content={content} />
    </div>
  );
};

export default DocPageContent;
