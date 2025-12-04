"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/providers/I18nProvider";
import Link from "next/link";
import logo from "../../public/assets/images/molengeek_logo.png";
import { Globe, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES, type Locale } from "@/i18n";

const languageNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  nl: "Nederlands",
  it: "Italiano",
};

export default function PresentationNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isPresentationPage = (path: string) => {
    return ["/", "/membership", "/trainings", "/sites", "/contact"].includes(
      path
    );
  };

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    // Redirect to the same page with lang parameter which middleware handles
    router.push(`${pathname}?lang=${newLocale}`);
    setMobileOpen(false);
  };

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={() => setMobileOpen(false)}
          >
            <img src={logo.src} alt="Molengeek Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("presentation.nav.home")}
            </Link>
            <Link
              href="/membership"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("presentation.nav.membership")}
            </Link>
            <Link
              href="/trainings"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("presentation.nav.trainings")}
            </Link>
            <Link
              href="/sites"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("presentation.nav.sites")}
            </Link>
            <a
              href="https://molengeek-events.on-forge.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("presentation.nav.impact")}
            </a>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("presentation.nav.contact")}
            </Link>
          </div>

          {/* Right side: language + login + mobile menu button */}
          <div className="flex items-center space-x-2">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {languageNames[locale]}
                  </span>
                  <span className="sm:hidden">{locale.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LOCALES.map((loc) => (
                  <DropdownMenuItem
                    key={loc}
                    onClick={() => handleLanguageChange(loc)}
                    className={locale === loc ? "bg-muted font-semibold" : ""}
                  >
                    <span>{languageNames[loc]}</span>
                    {locale === loc && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        ✓
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden sm:block">
              <Button
                asChild
                className="bg-[#811abd] hover:bg-[#811abd]/90 text-white"
              >
                <a
                  href="https://sidegeek.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("presentation.nav.login")}
                </a>
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="flex md:hidden items-center justify-center rounded-md p-2 text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top-2 duration-150">
            <div className="space-y-2 border-t border-border pt-3 mt-2">
              <Link
                href="/"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground px-1"
                onClick={() => setMobileOpen(false)}
              >
                {t("presentation.nav.home")}
              </Link>
              <Link
                href="/membership"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground px-1"
                onClick={() => setMobileOpen(false)}
              >
                {t("presentation.nav.membership")}
              </Link>
              <Link
                href="/trainings"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground px-1"
                onClick={() => setMobileOpen(false)}
              >
                {t("presentation.nav.trainings")}
              </Link>
              <Link
                href="/sites"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground px-1"
                onClick={() => setMobileOpen(false)}
              >
                {t("presentation.nav.sites")}
              </Link>
              <a
                href="https://molengeek-events.on-forge.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground px-1"
                onClick={() => setMobileOpen(false)}
              >
                {t("presentation.nav.impact")}
              </a>
              <Link
                href="/contact"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground px-1"
                onClick={() => setMobileOpen(false)}
              >
                {t("presentation.nav.contact")}
              </Link>

              {/* Mobile login button */}
              <div className="pt-2">
                <Button
                  asChild
                  className="w-full bg-[#811abd] hover:bg-[#811abd]/90 text-white"
                  size="sm"
                >
                  <a
                    href="https://sidegeek.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("presentation.nav.login")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
