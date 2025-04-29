
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  enableSystem?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  enableSystem = true,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      defaultTheme={defaultTheme} 
      enableSystem={enableSystem} 
      attribute="class"
    >
      {children}
    </NextThemesProvider>
  );
}
