
"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class" enableSystem>
      {children}
    </ThemeProvider>
  );
}
