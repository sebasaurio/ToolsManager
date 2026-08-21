"use client";

import { tools, siteCopy } from "@/data/tools";
import { useT, useLang } from "@/components/LangProvider";
import { ToolCard } from "@/components/ToolCard";
import { PrivacyBanner } from "@/components/PrivacyBanner";

export default function Home() {
  const { lang } = useLang();
  const t = siteCopy[lang];

  const tagline = useT({
    es: "Herramientas para trading algorítmico",
    en: "Algorithmic trading tools",
  });

  return (
    <main className="flex-1">
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

      <PrivacyBanner />

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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-800/70 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 sm:flex-row">
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
