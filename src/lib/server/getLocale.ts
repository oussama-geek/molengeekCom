import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALES, dictionaries, type Locale } from "@/i18n";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieLocale = cookieStore.get("sg_locale")?.value as Locale | undefined;
  const acceptLanguage = headerStore.get("accept-language") || "";
  
  const fromHeader = (() => {
    const lower = acceptLanguage.toLowerCase();
    const found = LOCALES.find((l) => lower.includes(l));
    return found as Locale | undefined;
  })();
  
  return (cookieLocale && LOCALES.includes(cookieLocale))
    ? cookieLocale
    : (fromHeader || DEFAULT_LOCALE);
}

export function getTranslationFunction(locale: Locale) {
  const dict = dictionaries[locale] || {};
  
  return (path: string, fallback?: string, vars?: Record<string, string | number>) => {
    const parts = path.split(".");
    let cur: any = dict;
    for (const p of parts) {
      cur = cur?.[p];
      if (cur === undefined) break;
    }
    
    let result = typeof cur === "string" ? cur : (fallback ?? path);
    
    // Replace variables if provided
    if (vars) {
      Object.keys(vars).forEach((key) => {
        result = result.replace(new RegExp(`{${key}}`, "g"), String(vars[key]));
      });
    }
    
    return result;
  };
}

