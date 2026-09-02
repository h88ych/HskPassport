'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function WelcomeClientUI({
  userName
}: {
  userName?: string | null
}) {
  const router = useRouter()

  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim()) {
      setError('ขอชื่อสักนิดนะ')
      return
    }

    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: name.trim() })
      })

      if (!res.ok) {
        throw new Error('Failed to save')
      }

      router.push('/')
      router.refresh()
    } catch (err) {
      setError('บันทึกชื่อไม่สำเร็จ ลองใหม่อีกครั้งนะ')
      setSaving(false)
    }
  }

  return (
    <main className="welcome-shell">
      <section className="welcome-card">
        <div className="login-brand">
          <span className="brand-mark">
            <Sparkles size={19} />
          </span>
          <span>HSK Passport</span>
        </div>
        <div className="welcome-mascot" aria-hidden="true">
          🐼
        </div>
        <p className="eyebrow">เริ่มต้นการเดินทาง</p>
        <h1>อยากให้เราเรียกคุณว่าอะไรดี?</h1>
        <p className="login-copy">
          ชื่อนี้จะปรากฏบนพาสปอร์ตของคุณ
          เพื่อให้ทุกครั้งที่กลับมาเรียนรู้สึกเป็นพื้นที่ของคุณเอง
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="display-name">ชื่อที่อยากให้เราเรียก</label>
          <input
            id="display-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="เช่น อัครเดช หรือชื่อเล่นของคุณ"
            autoFocus
            maxLength={40}
          />
          <button className="google-login" type="submit" disabled={saving}>
            <span>{saving ? 'กำลังบันทึก...' : 'เริ่มออกเดินทาง'}</span>
            <ArrowRight size={18} />
          </button>
          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}
        </form>
        <p className="login-note">
          สวัสดี{' '}
          {userName ? `${userName} — เปลี่ยนชื่อได้เลย` : 'นักเรียนคนใหม่'}{' '}
        </p>
      </section>
    </main>
  )
}
