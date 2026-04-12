import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "auto";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("auto");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : theme === "dark" ? "auto" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved = next === "auto" ? (prefersDark ? "dark" : "light") : next;

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolved);
    document.documentElement.setAttribute(
      "data-theme",
      next === "auto" ? "" : next
    );
    document.documentElement.style.colorScheme = resolved;
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-md p-1.5 text-sm hover:bg-[var(--color-surface)]"
      title={`Current: ${theme}`}
    >
      {theme === "light" && "☀️"}
      {theme === "dark" && "🌙"}
      {theme === "auto" && "🌓"}
    </button>
  );
}