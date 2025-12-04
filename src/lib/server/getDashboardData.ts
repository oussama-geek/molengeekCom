// src/lib/server/getDashboardData.ts
import { cookies, headers } from "next/headers";

/** Types du payload (adapte si besoin) */
export interface ApiUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at?: string;
}
export type ApiEventType = "training" | "event" | "mentoring";
export interface ApiUpcomingEvent {
  title: string;
  slug: string;
  description: string;
  type: ApiEventType;
  starts_at: string;
  ends_at: string;
  location: string;
  price: number;
  image_url: string | null;
  thumbnail: string | null;
  organizer_name: string | null;
  instructor_name: string | null;
  tags: string[];
  rating: string | number | null;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}
export interface ApiResponseShape {
  message: string;
  user: ApiUser;
  count_events: number;
  count_sessions: number;
  count_sponsorphips: number;
  count_connections?: number;
  count_events_last_month: number;
  count_sessions_last_month: number;
  count_sponsorphips_last_month: number;
  count_connections_last_month: number;
  upcoming_events: ApiUpcomingEvent[];
  pending_sponsorships: any[];
  trainings_recommended_for_me: any[];
  short_term_trainings: any[];
  latest_updates: any[];
  latest_stories: any[];
}

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.API_BASE_URL ??
  "http://localhost:8000"
).replace(/\/+$/, "");

/**
 * Appelle l'API Laravel en mode Sanctum stateful (cookies).
 * On forward: Cookie, XSRF, Origin, Referer, X-Requested-With.
 */
export async function getDashboardData(): Promise<ApiResponseShape> {
  const jar = await cookies();
  const all = jar.getAll();

  // Construit "Cookie: a=b; c=d"
  const cookieHeader = all.map(c => `${c.name}=${c.value}`).join("; ");

  // XSRF-TOKEN (si déjà posé par /sanctum/csrf-cookie côté navigateur)
  const xsrfCookie = all.find(c => c.name === "XSRF-TOKEN");
  const xsrfHeader = xsrfCookie ? decodeURIComponent(xsrfCookie.value) : "";

  // Origin/Referer de l'app (devine automatiquement si non fourni)
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const appOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN ?? `${proto}://${host}`;

  const res = await fetch(`${API_BASE}/api/dashboard`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(xsrfHeader ? { "X-XSRF-TOKEN": xsrfHeader } : {}),
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      Origin: appOrigin,
      Referer: `${appOrigin}/`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Échec du chargement du tableau de bord (${res.status})${txt ? ` - ${txt}` : ""}`);
  }

  return (await res.json()) as ApiResponseShape;
}
