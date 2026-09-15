"use client";

import { useEffect, useState } from "react";
import type { Tool } from "@/data/tools";
import { useT, useLang } from "@/components/LangProvider";
import { siteCopy } from "@/data/tools";

interface ToolsMetaEntry {
  slug: string;
  version?: string | null;
  lastUpdated?: number | null;
  updatedLabel?: string | null;
  changelogUrl: string;
  readmeUrl: string;
  repoName: string;
}

interface ToolsMeta {
  [slug: string]: ToolsMetaEntry;
}

export function ToolMeta({ tool }: { tool: Tool }) {
  const { lang } = useLang();
  const t = siteCopy[lang];
  const [meta, setMeta] = useState<ToolsMeta | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/tools-meta.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setMeta(data as ToolsMeta | null);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const entry = meta?.[tool.slug];
  const version = entry?.version || tool.version;
  const updatedLabel = entry?.updatedLabel || null;
  const repoName = entry?.repoName || "";

  if (!loaded) return null;

  if (!version && !updatedLabel) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-1">
      {version && (
        <a
          href={`https://github.com/sebasaurio/${repoName}/releases/tag/v${version}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-zinc-800/70 bg-zinc-900/40 px-2 py-0.5 font-mono text-xs text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
        >
          <svg className="h-3 w-3 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            <circle cx="12" cy="12" r="4" />
          </svg>
          v{version}
        </a>
      )}
      {updatedLabel && (
        <span className="inline-flex items-center gap-1 rounded-md border border-zinc-800/70 bg-zinc-900/40 px-2 py-0.5 font-mono text-xs text-zinc-500">
          <svg className="h-3 w-3 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {t.repo} {updatedLabel}
        </span>
      )}
    </div>
  );
}
