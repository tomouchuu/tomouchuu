import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme);
  }, [activeTheme]);

  return (
    <button 
      aria-label={`Change to ${inactiveTheme} mode`}
      className="relative flex items-center justify-around bg-blue-100 rounded-xl border-2 border-blue-300 dark:border-yellow-500 dark:bg-stone-800 transition-colors duration-300 w-20 h-8"
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      <span className="absolute top-0 bg-white rounded-full w-7 h-7 left-2 dark:translate-x-8 transition-all duration-300" activetheme={activeTheme} />
      <span>🌙</span>
      <span>☀️</span>
    </button>
  );
};

export default ThemeToggle;