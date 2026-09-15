"use client";

import type { Tool } from "@/data/tools";
import { useT, useLang } from "@/components/LangProvider";
import { siteCopy } from "@/data/tools";

const MATURITY_ORDER = ["core", "growing", "experimental"] as const;

const MATURITY_LABEL = {
  core: { es: "Núcleo", en: "Core" },
  growing: { es: "En crecimiento", en: "Growing" },
  experimental: { es: "Experimental", en: "Experimental" },
} as const;

const MATURITY_DESC = {
  core: { es: "Herramientas estables en producción.", en: "Stable tools in production." },
  growing: { es: "Activas en desarrollo; nuevas features periódicas.", en: "Actively developed; periodic new features." },
  experimental: { es: "Ideas en progreso; funcionalidad limitada.", en: "Ideas in progress; limited functionality." },
} as const;

export function RoadmapSection({ tools }: { tools: Tool[] }) {
  const { lang } = useLang();
  const t = siteCopy[lang];

  const grouped = MATURITY_ORDER.map((level) => ({
    level,
    label: MATURITY_LABEL[level][lang],
    desc: MATURITY_DESC[level][lang],
    items: tools.filter((tool) => tool.maturity === level),
  }));

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <div className="mb-8 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
            Estado
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
            {t.roadmapTitle}
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-zinc-500">
          {t.roadmapSubtitle}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {grouped.map((group) => (
          <div key={group.level} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700/80 bg-zinc-800/40 px-2 py-0.5 text-xs font-semibold text-zinc-300">
                {group.label}
              </span>
              <span className="font-mono text-xs text-zinc-600">{group.items.length} tools</span>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-zinc-500">{group.desc}</p>
            <ul className="space-y-2">
              {group.items.map((tool) => (
                <li key={tool.slug} className="flex items-start gap-2 text-sm text-zinc-300">
                  <span className="mt-0.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{tool.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
