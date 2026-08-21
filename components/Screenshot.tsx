"use client";

import Image from "next/image";
import type { Tool } from "@/data/tools";
import { useT } from "@/components/LangProvider";

export function Screenshot({ tool }: { tool: Tool }) {
  const placeholderLabel = useT({
    es: "Captura próximamente",
    en: "Screenshot coming soon",
  });

  if (tool.screenshot) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-zinc-800 bg-zinc-900">
        <Image
          src={tool.screenshot}
          alt={tool.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
    );
  }

  if (tool.icon) {
    return (
      <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border-b border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900">
        <Image
          src={tool.icon}
          alt={tool.name}
          width={96}
          height={96}
          className="rounded-2xl"
        />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border-b border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900">
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-10 w-10 text-zinc-600"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-600">
          {placeholderLabel}
        </span>
      </div>
    </div>
  );
}
