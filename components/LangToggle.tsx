"use client";

import { useLang } from "@/components/LangProvider";
import type { Lang } from "@/data/tools";

export function LangToggle() {
  const { lang, setLang } = useLang();

  const next: Lang = lang === "es" ? "en" : "es";

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/20"
      aria-label="Cambiar idioma"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
      {lang === "es" ? "EN" : "ES"}
    </button>
  );
}
