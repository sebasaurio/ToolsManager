"use client";

import type { Tool } from "@/data/tools";
import { useLang, useT } from "@/components/LangProvider";
import { Screenshot } from "@/components/Screenshot";

const typeStyles: Record<Tool["type"], string> = {
  web: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  desktop: "bg-violet-500/10 text-violet-300 border-violet-500/30",
};

const statusStyles: Record<Tool["status"], string> = {
  live: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  dev: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  mvp: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
};

export function ToolCard({ tool }: { tool: Tool }) {
  const { lang } = useLang();
  const typeLabel = useT(tool.typeLabel);
  const statusLabel = useT(tool.statusLabel);
  const tagline = useT(tool.tagline);
  const description = useT(tool.description);
  const highlights = tool.highlights.map((h) => h[lang]);
  const highlightsTitle = useT({ es: "Destacados", en: "Highlights" });
  const stackTitle = useT({ es: "Stack", en: "Stack" });
  const openTool = useT({ es: "Abrir herramienta", en: "Open tool" });
  const viewCode = useT({ es: "Ver código", en: "View code" });

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_0_40px_-12px_rgba(16,185,129,0.4)]">
      <Screenshot tool={tool} />

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${typeStyles[tool.type]}`}
          >
            {typeLabel}
          </span>
          <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${statusStyles[tool.status]}`}
          >
            {statusLabel}
          </span>
          {tool.version && (
            <span className="inline-flex items-center rounded-md border border-zinc-700 px-2 py-0.5 font-mono text-xs text-zinc-400">
              v{tool.version}
            </span>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-100">
            {tool.name}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-zinc-400">{tagline}</p>
        </div>

        <p className="text-sm leading-relaxed text-zinc-500">{description}</p>

        <div className="flex flex-col gap-3">
          <div>
            <h3 className="mb-1.5 font-mono text-xs uppercase tracking-widest text-zinc-500">
              {highlightsTitle}
            </h3>
            <ul className="space-y-1.5">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-1.5 font-mono text-xs uppercase tracking-widest text-zinc-500">
              {stackTitle}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {tool.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-zinc-700/80 bg-zinc-800/60 px-2 py-0.5 font-mono text-[11px] text-cyan-300/90"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {tool.url && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500/90 px-3 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-400"
            >
              {openTool}
            </a>
          )}
          {tool.repoUrl && (
            <a
              href={tool.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-zinc-700 px-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              {viewCode}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
