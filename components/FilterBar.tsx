"use client";

import { useState, useMemo } from "react";
import type { Tool, ToolType, ToolStatus } from "@/data/tools";
import { useT, useLang } from "@/components/LangProvider";
import { siteCopy } from "@/data/tools";

type FilterState = {
  query: string;
  types: Set<ToolType>;
  statuses: Set<ToolStatus>;
};

export function FilterBar({ tools }: { tools: Tool[] }) {
  const { lang } = useLang();
  const t = siteCopy[lang];
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    types: new Set<ToolType>(["web", "desktop", "script"]),
    statuses: new Set<ToolStatus>(["live", "dev", "mvp", "wip"]),
  });

  const setQuery = (q: string) => setFilters((f) => ({ ...f, query: q }));

  const toggleType = (type: ToolType) => {
    setFilters((prev) => {
      const next = new Set(prev.types);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return { ...prev, types: next };
    });
  };

  const toggleStatus = (status: ToolStatus) => {
    setFilters((prev) => {
      const next = new Set(prev.statuses);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return { ...prev, statuses: next };
    });
  };

  const filtered = useMemo(() => {
    const q = filters.query.toLowerCase();
    return tools.filter((tool) => {
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.tagline[lang].toLowerCase().includes(q) ||
        tool.description[lang].toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q));
      return (
        matchesQuery &&
        filters.types.has(tool.type) &&
        filters.statuses.has(tool.status)
      );
    });
  }, [tools, filters, lang]);

  const allTypes: ToolType[] = ["web", "desktop", "script"];
  const allStatuses: ToolStatus[] = ["live", "dev", "mvp", "wip"];

  const typeCount = allTypes.filter((t) => filters.types.has(t)).length;
  const statusCount = allStatuses.filter((s) => filters.statuses.has(s)).length;

  return (
    <div className="mx-auto mb-8 max-w-6xl px-5">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={filters.query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.filterPlaceholder}
          className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900/60 py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
        />
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      {/* Filters row */}
      <div className="mt-3 flex flex-wrap gap-3">
        {/* Tipo */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-600">
            {t.typeLabel}
          </span>
          {allTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                filters.types.has(type)
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
              }`}
            >
              {type === "web" ? "Web" : type === "desktop" ? "Desktop" : "CLI"}
            </button>
          ))}
        </div>

        {/* Estado */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-600">
            {t.statusLabel}
          </span>
          {allStatuses.map((status) => (
            <button
              key={status}
              onClick={() => toggleStatus(status)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                filters.statuses.has(status)
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
              }`}
            >
              {status === "live"
                ? "Live"
                : status === "dev"
                ? "Dev"
                : status === "mvp"
                ? "MVP"
                : "WIP"}
            </button>
          ))}
        </div>

        {/* Reset */}
        {(typeCount !== allTypes.length || statusCount !== allStatuses.length || filters.query) && (
          <button
            onClick={() =>
              setFilters({
                query: "",
                types: new Set(allTypes),
                statuses: new Set(allStatuses),
              })
            }
            className="ml-auto text-xs text-zinc-600 underline hover:text-zinc-400"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="mt-2 font-mono text-xs text-zinc-600">
        {filtered.length} / {tools.length} herramientas
      </p>
    </div>
  );
}
