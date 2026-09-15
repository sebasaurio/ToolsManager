"use client";

import { tools, siteCopy } from "@/data/tools";
import { useT, useLang } from "@/components/LangProvider";
import { ToolCard } from "@/components/ToolCard";
import { FilterBar } from "@/components/FilterBar";
import { FlowSection } from "@/components/FlowSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { CompareSection } from "@/components/CompareSection";
import { FAQSection } from "@/components/FAQSection";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const { lang } = useLang();
  const t = siteCopy[lang];

  const tagline = useT({
    es: "Herramientas para trading algorítmico",
    en: "Algorithmic trading tools",
  });

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(16,185,129,0.15),transparent)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {t.heroBadge}
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-6xl">
            {t.heroTitle1}{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {t.heroTitleAccent}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {t.heroSubtitle}
          </p>
          <p className="mt-4 font-mono text-sm text-zinc-600">
            &gt; {tagline} — {tools.length} {t.count.toLowerCase()}
          </p>
        </div>
      </section>

      {/* Privacy banner */}
      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="flex flex-col gap-4 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.07] via-zinc-900/60 to-zinc-900/60 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M12 2 4 5v6c0 5.25 3.4 10.2 8 11 4.6-.8 8-5.75 8-11V5l-8-3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="flex items-center gap-2 text-base font-bold tracking-tight text-emerald-300">
              {t.privacyTitle}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">
              {t.privacyNote}
            </p>
          </div>
          <ul className="flex flex-col gap-1.5 sm:max-w-xs">
            {t.privacyPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-zinc-300">
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

      {/* Tool grid con filtros */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="mb-8 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
              {t.sectionLabel}
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
              {t.sectionTitle}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-500">
            {t.sectionSubtitle}
          </p>
        </div>

        <FilterBar tools={tools} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        {tools.length === 0 && (
          <p className="py-12 text-center text-sm text-zinc-600">
            No se encontró ninguna herramienta con esos filtros.
          </p>
        )}
      </section>

      {/* Flujo completo */}
      <FlowSection tools={tools} />

      {/* Roadmap */}
      <RoadmapSection tools={tools} />

      {/* Comparativa */}
      <CompareSection tools={tools} />

      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <footer className="border-t border-zinc-800/70 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
          <p className="font-mono text-xs text-zinc-600">
            {t.footer}
          </p>
          <p className="font-mono text-xs text-zinc-700">
            {new Date().getFullYear()} · sebasaurio
          </p>
        </div>
      </footer>
    </main>
  );
}
