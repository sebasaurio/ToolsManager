import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import { LangToggle } from "@/components/LangToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trading Tools — Algo Trading Toolkit",
  description:
    "Directorio de herramientas de trading algorítmico: calibración de bloques SQX, análisis de trades de MetaTrader y organizador de estrategias.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0e14] text-zinc-200">
        <LangProvider>
          <header className="sticky top-0 z-40 border-b border-zinc-800/70 bg-[#0a0e14]/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
              <Link href="/" className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4.5 w-4.5"
                    aria-hidden="true"
                  >
                    <path d="M3 17l6-6 4 4 8-8" />
                    <path d="M14 7h7v7" />
                  </svg>
                </span>
                <span className="font-mono text-sm font-semibold tracking-tight text-zinc-100">
                  tools<span className="text-emerald-400">/</span>algo
                </span>
              </Link>
              <LangToggle />
            </div>
          </header>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
