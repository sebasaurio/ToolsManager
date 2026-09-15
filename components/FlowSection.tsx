"use client";

import type { Tool } from "@/data/tools";
import { useT, useLang } from "@/components/LangProvider";
import { siteCopy } from "@/data/tools";

const STAGES: { key: string; labelEs: string; labelEn: string }[] = [
  { key: "flujo-completo", labelEs: "Flujo completo", labelEn: "Full flow" },
  { key: "validacion", labelEs: "Validación", labelEn: "Validation" },
  { key: "calibracion", labelEs: "Calibración", labelEn: "Calibration" },
  { key: "analisis", labelEs: "Análisis de trades", labelEn: "Trade analysis" },
  { key: "organizacion", labelEs: "Organización", labelEn: "Organization" },
  { key: "monitoreo", labelEs: "Monitoreo", labelEn: "Monitoring" },
];

export function FlowSection({ tools }: { tools: Tool[] }) {
  const { lang } = useLang();
  const t = siteCopy[lang];

  const byStage = STAGES.reduce<Record<string, Tool[]>>((acc, stage) => {
    acc[stage.key] = tools.filter((tool) => tool.flowStage === stage.key);
    return acc;
  }, {});

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <div className="mb-8 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
            Flujo
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
            {t.flowTitle}
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-zinc-500">
          {t.flowSubtitle}
        </p>
      </div>

      <div className="relative flex flex-col">
        {/* Línea vertical conecta etapas */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-zinc-800/60" />

        {STAGES.map((stage, idx) => {
          const stageTools = byStage[stage.key];
          const label = lang === "es" ? stage.labelEs : stage.labelEn;
          return (
            <div key={stage.key} className="relative flex items-start gap-4 pb-7 last:pb-0">
              {/* Número de etapa */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    stageTools.length > 0
                      ? "border-emerald-500/60 bg-emerald-500/10"
                      : "border-zinc-700 bg-zinc-800/40 text-zinc-600"
                  }`}
                >
                  {idx + 1}
                </div>
              </div>

              {/* Contenido */}
              <div className="ml-4 flex-1">
                <h3 className="text-base font-semibold text-zinc-100">{label}</h3>
                {stageTools.length > 0 ? (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {stageTools.map((tool) => (
                      <li key={tool.slug}>
                        <a
                          href={tool.repoUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-zinc-800/80 bg-zinc-800/40 px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
                        >
                          {tool.name}
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-zinc-600 italic">
                    Sin herramientas asignadas todavía.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
