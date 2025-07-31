const API_BASE = import.meta.env.VITE_API_URL || '/api'

export const api = {
  // PUBLIC_INTERFACE
  async get<T = unknown>(path: string, options: Record<string, unknown> = {}): Promise<T> {
    const res = await fetch(API_BASE + path, {
      ...options,
      credentials: "include"
    })
    return await res.json() as T
  },
  // PUBLIC_INTERFACE
  async post<T = unknown>(path: string, data: unknown, options: Record<string, unknown> = {}): Promise<T> {
    const res = await fetch(API_BASE + path, {
      ...options,
      method: 'POST',
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...((options as Record<string, unknown>).headers || {})
      }
    })
    return await res.json() as T
  }
}
