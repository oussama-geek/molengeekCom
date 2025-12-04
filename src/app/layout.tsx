import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DotBackground from "@/components/ui/dot-background";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { getServerUser } from "@/lib/api";
import Script from "next/script"; // ✅
import 'react-quill/dist/quill.snow.css';
import { I18nProvider } from "@/providers/I18nProvider";
import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n";
import AppShell from "@/components/layouts/AppShell";
import LiveAgentWrapper from "@/components/LiveAgentWrapper";
import { Toaster } from "@/components/ui/toaster";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.API_BASE_URL ??
  "http://localhost:8000"
).replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Molengeek - Launch. Grow. Scale.",
  description: "Your platform for launching, growing, and scaling your career and business",
  icons: {
    icon: "/molengeek_shortlogo.png",
    shortcut: "/molengeek_shortlogo.png",
    apple: "/molengeek_shortlogo.png",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const serverUser = await getServerUser();

  type RawUser = {
    id: number | string;
    email: string;
    name?: string;
    first_name?: string;
    last_name?: string;
  };

  const raw: RawUser | undefined =
    (serverUser as any)?.user ?? (serverUser as any) ?? undefined;



  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieLocale = cookieStore.get("sg_locale")?.value as Locale | undefined;
  const acceptLanguage = headerStore.get("accept-language") || "";
  const fromHeader = (() => {
    const lower = acceptLanguage.toLowerCase();
    const found = LOCALES.find((l) => lower.includes(l));
    return found as Locale | undefined;
  })();
  const initialLocale: Locale =
    cookieLocale && LOCALES.includes(cookieLocale)
      ? cookieLocale
      : fromHeader || DEFAULT_LOCALE;

  // SSR: Détecte si l'utilisateur a une entreprise (server-to-server)
  let hasCompany = false;
  let companyValidated = false;
  try {
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join("; ");
    const xsrfCookie = allCookies.find(c => c.name === "XSRF-TOKEN");
    const xsrfHeader = xsrfCookie ? decodeURIComponent(xsrfCookie.value) : "";
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const referer = origin + "/";

    const res = await fetch(`${API_BASE}/api/me/company`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...(xsrfHeader ? { "X-XSRF-TOKEN": xsrfHeader } : {}),
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        Origin: origin,
        Referer: referer,
      },
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json().catch(() => null);
      const cmp = json?.company;
      hasCompany = !!cmp;
      companyValidated = cmp?.is_validated === true || cmp?.is_validated === 1;
    }
  } catch { }

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <I18nProvider initialLocale={initialLocale}>

                    <DotBackground>
                      <AppShell initialHasCompany={hasCompany} initialCompanyValidated={companyValidated}>{children}</AppShell>
                    </DotBackground>
                    {/* <LiveAgentWrapper
                      name={user?.name}
                      email={user?.email}
                    /> */}
                    <Toaster />

          </I18nProvider>
        </ThemeProvider>


      </body>
    </html>
  );
}
