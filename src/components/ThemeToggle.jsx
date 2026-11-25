import { Moon, Sun } from "./Icons";
import { useTheme } from "../context/ThemeContext";

// Switches between light and dark. "withLabel" shows text next to the icon (used in the sidebar).
export default function ThemeToggle({ withLabel = false }) {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={withLabel ? "theme-toggle theme-toggle--row" : "icon-btn"}
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      {withLabel && <span className="nav-label">{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
}
