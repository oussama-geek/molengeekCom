"use client";

import { usePathname, useRouter } from "next/navigation";
// import ClientSidebar from "@/components/ui/client-sidebar"; // Component not found - removed

export default function AppShell({ children, initialHasCompany, initialCompanyValidated }: { children: React.ReactNode; initialHasCompany?: boolean; initialCompanyValidated?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  const isAdminRoute = pathname?.startsWith("/admin");
  const isLoginRoute = pathname === "/login";
  const isRegisterRoute = pathname === "/register";
  const isPublicEventsRoute = pathname?.startsWith("/public-events");
  const isPresentationRoute = pathname && ["/", "/membership", "/trainings", "/sites", "/contact"].includes(pathname);

  // Détermine la section courante à partir du pathname
  const getCurrentPage = () => {
    if (!pathname) return "dashboard";
    if (pathname.startsWith("/dashboard")) return "dashboard";
    if (pathname.startsWith("/profile")) return "profile";
    if (pathname.startsWith("/events")) return "events";
    if (pathname.startsWith("/forum")) return "forum" as any;
    if (pathname.startsWith("/calendar")) return "calendar";
    // if (pathname.startsWith("/network")) return "network";
    // if (pathname.startsWith("/messages")) return "messages";
    if (pathname.startsWith("/company")) return "become-partner";
    if (pathname.startsWith("/notifications")) return "notifications";
    if (pathname.startsWith("/billing")) return "billing";
    if (pathname.startsWith("/settings")) return "settings";
    return "dashboard";
  };

  // map simple -> routes publiques
  const onNavigate = (section: any) => {
    const map: Record<string, string> = {
      dashboard: "/dashboard",
      profile: "/profile",
      events: "/events",
      forum: "/forum",
      calendar: "/calendar",
      // network: "/network",
      // messages: "/messages",
      "become-partner": "/company",
      // notifications: "/notifications",
      billing: "/billing",
      settings: "/settings",
    };
    router.push(map[section] ?? "/");
  };

  return (
    <>
      {/* ClientSidebar component not found - removed */}
      {/* {!isAdminRoute && !isLoginRoute && !isRegisterRoute && !isPublicEventsRoute && !isPresentationRoute && (
        <ClientSidebar
          onNavigate={onNavigate}
          notificationCount={0}
          currentPage={getCurrentPage()}
          initialHasCompany={initialHasCompany}
          initialCompanyValidated={initialCompanyValidated}
        />
      )} */}
      {children}
    </>
  );
}
