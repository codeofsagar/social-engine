// contexts/BackgroundContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Theme = 'dark' | 'light';

interface BackgroundContextType {
  theme: Theme;
  updateTheme: (newTheme: Theme) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  // Default to 'light' (White Header) so standard sections work automatically
  const [theme, setTheme] = useState<Theme>('light');

  const updateTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  return (
    <BackgroundContext.Provider value={{ theme, updateTheme }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackgroundTheme() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackgroundTheme must be used within a BackgroundProvider');
  }
  return context;
}