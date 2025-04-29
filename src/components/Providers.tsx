
"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}
