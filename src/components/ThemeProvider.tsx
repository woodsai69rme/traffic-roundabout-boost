
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider defaultTheme="system" enableSystem attribute="class">
      {children}
    </NextThemesProvider>
  );
}
