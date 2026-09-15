"use client";

import { useState } from "react";
import { useT, useLang } from "@/components/LangProvider";
import { siteCopy } from "@/data/tools";

export function FAQSection() {
  const { lang } = useLang();
  const t = siteCopy[lang];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-5 pb-24">
      <div className="mb-8 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
            Ayuda
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
            {t.faqTitle}
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        {t.faqItems.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition-colors hover:border-zinc-700"
          >
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="flex w-full flex-col justify-between gap-2 text-left"
              aria-expanded={open === idx}
            >
              <span className="text-sm font-medium text-zinc-100">{item.q}</span>
              <svg
                className={`h-4 w-4 shrink-0 text-zinc-600 transition-transform ${
                  open === idx ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {open === idx && (
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
