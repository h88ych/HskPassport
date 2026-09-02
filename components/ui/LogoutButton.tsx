'use client'
import { signOut } from 'next-auth/react'

function LogoutButton() {
  return (
    <button
      className="icon-button"
      aria-label="ออกจากระบบ"
      onClick={() => signOut({ callbackUrl: '/login' })}
    >
      ออกจากระบบ
    </button>
  )
}