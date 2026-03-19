import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type ThemeName = 'default' | 'pink' | 'dark' | 'ocean' | 'forest' | 'sunset';

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  availableThemes: { name: ThemeName; label: string; description: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'divineGifts3d-theme';

export const themes = [
  {
    name: 'default' as ThemeName,
    label: 'Default',
    description: 'Modern professional design with clean typography and balanced spacing'
  },
  {
    name: 'pink' as ThemeName,
    label: 'Pink',
    description: 'Playful theme with rounded edges, soft shadows, and warm typography'
  },
  {
    name: 'dark' as ThemeName,
    label: 'Dark',
    description: 'Sleek modern dark mode with sharp edges, glowing effects, and tech-focused design'
  },
  {
    name: 'ocean' as ThemeName,
    label: 'Ocean',
    description: 'Clean calming design with flowing shapes, airy typography, and watery shadows'
  },
  {
    name: 'forest' as ThemeName,
    label: 'Forest',
    description: 'Natural organic theme with earthy serif fonts, subtle shadows, and organic shapes'
  },
  {
    name: 'sunset' as ThemeName,
    label: 'Sunset',
    description: 'Warm vibrant design with bold typography, energetic spacing, and glowing effects'
  }
];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return (saved as ThemeName) || 'default';
    } catch {
      return 'default';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Use requestAnimationFrame to batch DOM updates
    requestAnimationFrame(() => {
      // Remove all theme classes first
      themes.forEach(theme => {
        root.classList.remove(`theme-${theme.name}`);
      });
      
      // Add the current theme class
      root.classList.add(`theme-${currentTheme}`);
    });
    
    // Save to localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    } catch {
      // Ignore localStorage errors
    }
  }, [currentTheme]);

  const setTheme = useCallback((theme: ThemeName) => {
    setCurrentTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        availableThemes: themes
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}