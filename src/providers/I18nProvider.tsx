"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, dictionaries, LOCALES, Locale } from "@/i18n";
import Cookies from "js-cookie";

type TranslateFn = {
  (key: string): string;
  (key: string, fallback: string): string;
  (key: string, vars: Record<string, string | number>): string;
  (
    key: string,
    fallback: string,
    vars: Record<string, string | number>
  ): string;
};

type I18nContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: TranslateFn;
};

const I18nContext = createContext<I18nContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => { },
  t: (k) => k,
});

function getNested(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}
function formatVars(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return Object.keys(vars).reduce(
    (acc, k) => acc.replace(new RegExp(`{${k}}`, "g"), String(vars[k])),
    template
  );
}

export function I18nProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || DEFAULT_LOCALE);

  // Charger depuis cookie/localStorage au premier rendu client
  useEffect(() => {
    const fromCookie = Cookies.get("sg_locale") as Locale | undefined;
    const fromStorage = (typeof window !== "undefined" && (window.localStorage.getItem("sg_locale") as Locale | null)) || null;
    // Priorité à la locale décidée côté serveur
    const resolved = (initialLocale && LOCALES.includes(initialLocale))
      ? initialLocale
      : (fromCookie && LOCALES.includes(fromCookie))
        ? fromCookie
        : (fromStorage && LOCALES.includes(fromStorage))
          ? fromStorage
          : DEFAULT_LOCALE;
    if (LOCALES.includes(resolved)) {
      setLocaleState(resolved);
      Cookies.set("sg_locale", resolved, { expires: 365 });
      try { if (typeof window !== "undefined") window.localStorage.setItem("sg_locale", resolved); } catch { }
    }
  }, [initialLocale]);

  const setLocale = useCallback((l: Locale) => {
    if (!LOCALES.includes(l)) return;
    setLocaleState(l);
    Cookies.set("sg_locale", l, { expires: 365 });
    if (typeof window !== "undefined") {
      window.localStorage.setItem("sg_locale", l);
    }
  }, []);

  const messages = dictionaries[locale];

  const t = useCallback(
    ((key: string, arg2?: any, arg3?: Record<string, string | number>) => {
      const fallback: string | undefined = typeof arg2 === "string" ? arg2 : undefined;
      const vars: Record<string, string | number> | undefined =
        arg3 ?? (typeof arg2 === "object" && arg2 !== null ? arg2 : undefined);
      const raw = getNested(messages, key);
      if (typeof raw === "string") return formatVars(raw, vars);
      return fallback ?? key; // clé non trouvée => retourne le fallback ou la clé
    }) as TranslateFn,
    [messages]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
