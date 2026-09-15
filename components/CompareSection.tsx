"use client";

import type { Tool } from "@/data/tools";
import { useT, useLang } from "@/components/LangProvider";
import { siteCopy } from "@/data/tools";

export function CompareSection({ tools }: { tools: Tool[] }) {
  const { lang } = useLang();
  const t = siteCopy[lang];

  // organiza por necesidad
  const byNeed = new Map<string, Tool[]>();
  for (const tool of tools) {
    for (const need of tool.needs || []) {
      const key = need;
      if (!byNeed.has(key)) byNeed.set(key, []);
      byNeed.get(key)!.push(tool);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <div className="mb-8 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
            Guía
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
            {t.compareTitle}
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-zinc-500">
          {t.compareSubtitle}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Array.from(byNeed.entries()).map(([need, toolsForNeed]) => (
          <div key={need} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h3 className="mb-3 text-sm font-semibold text-zinc-100">{need}</h3>
            <div className="flex flex-wrap gap-2">
              {toolsForNeed.map((tool) => (
                <a
                  key={tool.slug}
                  href={tool.repoUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800/80 bg-zinc-800/30 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
                >
                  <svg className="h-3.5 w-3.5 text-emerald-500/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3 17l6-6 4 4 8-8" />
                    <path d="M14 7h7v7" />
                  </svg>
                  {tool.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
