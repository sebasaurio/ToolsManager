"use client";

import { useLang } from "@/components/LangProvider";
import { siteCopy } from "@/data/tools";

export function PrivacyBanner() {
  const { lang } = useLang();
  const t = siteCopy[lang];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-14">
      <div className="flex flex-col gap-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.07] via-zinc-900/60 to-zinc-900/60 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M12 2 4 5v6c0 5.25 3.4 10.2 8 11 4.6-.8 8-5.75 8-11V5l-8-3Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        <div className="flex-1">
          <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-emerald-300">
            {t.privacyTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {t.privacyNote}
          </p>
        </div>

        <ul className="flex flex-col gap-2 sm:max-w-xs">
          {t.privacyPoints.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 text-sm text-zinc-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                aria-hidden="true"
              >
                <path d="m5 13 4 4L19 7" />
              </svg>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
