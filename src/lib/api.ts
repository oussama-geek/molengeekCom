// src/lib/api.ts
import { cookies } from "next/headers"

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.API_BASE_URL ??
  "http://localhost:8000"
).replace(/\/+$/, "")

export type AuthUser = {
  id: number
  first_name: string
  last_name: string
  email: string
} | null

export async function getServerUser(): Promise<AuthUser> {
  const jar = await cookies()
  const all = jar.getAll()

  // Construit l’en-tête Cookie
  const cookieHeader = all.map(c => `${c.name}=${c.value}`).join("; ")

  // Extrait le XSRF-TOKEN (si posé par /sanctum/csrf-cookie via le navigateur)
  const xsrfCookie = all.find(c => c.name === "XSRF-TOKEN")
  const xsrfHeader = xsrfCookie ? decodeURIComponent(xsrfCookie.value) : ""

  try {
    const res = await fetch(`${API_BASE}/api/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        // ✅ Indique à Sanctum que c’est une requête SPA stateful
        ...(xsrfHeader ? { "X-XSRF-TOKEN": xsrfHeader } : {}),
        // ✅ Très important : cookies du visiteur (laravel_session, XSRF-TOKEN, ...)
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        // ✅ Aide Sanctum à reconnaître un domaine stateful
        Origin: "http://localhost:3000",
        Referer: "http://localhost:3000/",
      },
      cache: "no-store",
      // credentials: "include" n’a pas d’effet côté Node, on passe déjà Cookie
    })

    if (!res.ok) {
      const txt = await res.text().catch(() => "")
      return null
    }

    const data = await res.json()
    return {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    }
  } catch (e) {
    return null
  }
}
