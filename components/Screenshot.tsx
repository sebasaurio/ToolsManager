"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import type { Tool } from "@/data/tools";
import { useT } from "@/components/LangProvider";

export function Screenshot({ tool }: { tool: Tool }) {
  const placeholderLabel = useT({
    es: "Captura próximamente",
    en: "Screenshot coming soon",
  });

  const [current, setCurrent] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const images = tool.screenshots ?? (tool.screenshot ? [tool.screenshot] : []);
  const hasMultiple = images.length > 1;

  // Icon fallback when no screenshots
  if (images.length === 0) {
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

  const go = (dir: number) => {
    setCurrent((prev) => (prev + dir + images.length) % images.length);
  };

  const slides = images.map((src) => ({ src }));

  return (
    <>
      <div className="group relative aspect-[16/10] w-full overflow-hidden border-b border-zinc-800 bg-zinc-900">
        <button
          type="button"
          className="absolute inset-0 h-full w-full cursor-zoom-in"
          onClick={() => setLightboxIndex(current)}
          aria-label={`${tool.name} — ${images[current]}`}
        >
          <Image
            src={images[current]}
            alt={tool.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity duration-300 group-hover:bg-black/30 group-hover:opacity-100">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-10 w-10 text-white/90 drop-shadow"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
              <path d="M8 11h6M11 8v6" />
            </svg>
          </span>
        </button>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-950/70 text-zinc-100 opacity-0 backdrop-blur transition-opacity hover:bg-zinc-950/90 group-hover:opacity-100"
              aria-label="Anterior"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-950/70 text-zinc-100 opacity-0 backdrop-blur transition-opacity hover:bg-zinc-950/90 group-hover:opacity-100"
              aria-label="Siguiente"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
            <div className="absolute bottom-2 left-0 right-0 z-10 flex items-center justify-center gap-1.5">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current ? "w-4 bg-emerald-400" : "w-1.5 bg-zinc-500/70"
                  }`}
                  aria-label={`Imagen ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 1.6,
        }}
      />
    </>
  );
}
