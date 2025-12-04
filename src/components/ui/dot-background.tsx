"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export default function DotBackground({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't apply dot background for login and register pages
  const isAuthPage = pathname === "/" || pathname === "/register";

  if (isAuthPage) {
    return <>{children}</>;
  }

  // Use resolvedTheme which handles system preference automatically
  const isDark = resolvedTheme === "dark";

  // Show a consistent background during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative min-h-screen w-full bg-white">
        <div className="absolute inset-0 [background-size:20px_20px] [background-image:radial-gradient(#d1d5db_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.1)_0%,rgba(156,163,175,0.2)_50%,rgba(255,255,255,0.9)_100%)]"></div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "relative min-h-screen w-full",
      isDark ? "bg-black" : "bg-white"
    )}>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          isDark
            ? "[background-image:radial-gradient(#6b7280_1px,transparent_1px)]" // Grey dots for dark mode
            : "[background-image:radial-gradient(#d1d5db_1px,transparent_1px)]" // Light grey dots for light mode
        )}
      />
      {/* Radial gradient that adapts to theme */}
      <div className={cn(
        "pointer-events-none absolute inset-0",
        isDark
          ? "bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.3)_0%,rgba(30,41,59,0.5)_50%,rgba(0,0,0,0.8)_100%)]"
          : "bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.1)_0%,rgba(156,163,175,0.2)_50%,rgba(255,255,255,0.9)_100%)]"
      )}></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
