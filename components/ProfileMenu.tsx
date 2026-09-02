'use client'

import { ChevronDown, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'

export default function ProfileMenu({
  displayName,
  displayAvatar,
  email,
  room
}: {
  displayName: string
  displayAvatar: string
  email?: string | null
  /** ห้องปัจจุบันของแอป — เมื่อเปลี่ยนห้อง เมนูจะปิดอัตโนมัติ */
  room: string
}) {
  const [open, setOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const pathname = usePathname()

  // ปิดเมนูอัตโนมัติเมื่อเปลี่ยนห้อง / เปลี่ยน route
  useEffect(() => {
    setOpen(false)
  }, [room, pathname])

  // ปิดเมื่อคลิกข้างนอก หรือกด Escape
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const handleLogout = () => {
    if (signingOut) return
    setSigningOut(true)
    signOut({ callbackUrl: '/login' })
  }

  return (
    <div className="profile-menu" ref={wrapperRef}>
      <button
        type="button"
        className={`profile-button ${open ? 'is-open' : ''}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>
          <img
            src={displayAvatar}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full"
          />
        </span>
        <span className="desktop-only">{displayName}</span>
        <ChevronDown size={15} className="profile-chevron" aria-hidden="true" />
        <span className="sr-only">{open ? 'ปิดเมนูโปรไฟล์' : 'เปิดเมนูโปรไฟล์'}</span>
      </button>

      {open && (
        <div id={menuId} role="menu" className="profile-dropdown">
          <div className="profile-dropdown-head">
            <img
              src={displayAvatar}
              alt=""
              referrerPolicy="no-referrer"
              className="profile-dropdown-avatar"
            />
            <div>
              <strong>{displayName}</strong>
              {email ? <small>{email}</small> : <small>นักเดินทาง HSK</small>}
            </div>
          </div>
          <div className="profile-dropdown-divider" />
          <button
            type="button"
            role="menuitem"
            className="profile-dropdown-item danger"
            onClick={handleLogout}
            disabled={signingOut}
          >
            <LogOut size={16} aria-hidden="true" />
            {signingOut ? 'กำลังออกจากระบบ...' : 'ออกจากระบบ'}
          </button>
        </div>
      )}
    </div>
  )
}
