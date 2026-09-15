"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/LangProvider";
import { siteCopy } from "@/data/tools";

const STORAGE_KEY = "tm-theme";

export function ThemeToggle() {
  const { lang } = useLang();
  const t = siteCopy[lang];
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial: "dark" | "light" =
      stored === "dark" || stored === "light"
        ? stored
        : prefersLight
        ? "light"
        : "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const applyTheme = (t: "dark" | "light") => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    if (t === "light") {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    } else {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    }
    window.localStorage.setItem(STORAGE_KEY, t);
  };

  const toggle = () => {
    if (theme === null) return;
    setTheme((prev) => {
      const next: "dark" | "light" = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  };

  if (theme === null) return null;

  const label = theme === "dark" ? t.darkToggle : t.lightToggle;

  return (
    <button
      onClick={toggle}
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-800/80 bg-zinc-800/40 px-2.5 py-1 text-xs font-mono text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
      aria-label={label}
    >
      <svg
        className={`h-3.5 w-3.5 ${theme === "dark" ? "text-amber-400" : "text-zinc-600"}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </>
        ) : (
          <>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </>
        )}
      </svg>
      {label}
    </button>
  );
}
