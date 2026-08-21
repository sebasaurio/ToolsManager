"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Lang } from "@/data/tools";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

const STORAGE_KEY = "tm-lang";
const listeners = new Set<() => void>();
let cachedLang: Lang = "es";

if (typeof window !== "undefined") {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  cachedLang = stored === "es" || stored === "en" ? stored : "es";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Lang {
  return cachedLang;
}

function getServerSnapshot(): Lang {
  return "es";
}

function emit() {
  listeners.forEach((l) => l());
}

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((next: Lang) => {
    cachedLang = next;
    window.localStorage.setItem(STORAGE_KEY, next);
    emit();
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return ctx;
}

export function useT<T extends { es: string; en: string }>(value: T): string {
  const { lang } = useLang();
  return value[lang];
}
