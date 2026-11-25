import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ThemeContext = createContext(null);

// Owns the light/dark setting. Components read it with useTheme().
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // The CSS reads [data-theme] on <html>, so the one attribute restyles every page.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>");
  return context;
}
