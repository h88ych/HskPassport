'use client'

import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const originalFetch = window.fetch

      window.fetch = async (...args) => {
        const response = await originalFetch(...args)

        if (response.status === 401) {
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
        }

        return response
      }
    }
  }, [])

  return <SessionProvider>{children}</SessionProvider>
}