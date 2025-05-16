
"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter } from "react-router-dom";

// Create a client
const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
            <TooltipProvider>
              <Sonner />
              {children}
            </TooltipProvider>
          </NextThemesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
