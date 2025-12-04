import axios, { AxiosError, AxiosHeaders } from 'axios'
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? '', 
  withCredentials: true,
  withXSRFToken: true,
})
api.defaults.xsrfCookieName = 'XSRF-TOKEN'
api.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'

// ✅ Interceptor "anti-419"
let isRefreshing = false
api.interceptors.response.use(undefined, async (error: AxiosError) => {
  const cfg = error.config
  if (!cfg) throw error

  // Rejoue une seule fois si 419
  if (error.response?.status === 419) {
    const headers = AxiosHeaders.from(cfg.headers)
    const alreadyRetried = headers.get('x-retried')
    if (!alreadyRetried) {
      try {
        if (!isRefreshing) {
          isRefreshing = true
          await api.get("/sanctum/csrf-cookie")
        }
        headers.set('x-retried', '1')
        cfg.headers = headers
        return api(cfg)
      } finally {
        isRefreshing = false
      }
    }
  }

  // Redirige logiquement selon le code
  if (error.response?.status === 401) {
    // ex: window.location.assign("/login")
    if (typeof window !== 'undefined') {
      // window.location.href = '/login'
    }
    // return Promise.reject(new Error("Unauthorized"))
  }
  throw error
})