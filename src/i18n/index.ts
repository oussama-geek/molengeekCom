import en from "./dictionaries/en";
import fr from "./dictionaries/fr";
import nl from "./dictionaries/nl";
import it from "./dictionaries/it";

export const LOCALES = ["fr", "en", "nl", "it"] as const;
export type Locale = typeof LOCALES[number];
export const DEFAULT_LOCALE: Locale = "fr";

export const dictionaries: Record<Locale, any> = { en, fr, nl, it };
