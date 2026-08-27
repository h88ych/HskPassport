'use client'

import { ArrowRight, Globe2, Sparkles } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  async function handleGoogle() {
    setLoading(true)
    setError('')

    try {
      await signIn('google', {
        redirectTo: '/'
      })
    } catch {
      setError('เข้าสู่ระบบไม่สำเร็จ ลองใหม่อีกครั้งนะ')
      setLoading(false)
    }
  }
  return (
    <main className="login-shell">
      <div className="login-orbit orbit-one" />
      <div className="login-orbit orbit-two" />
      <section className="login-card">
        <div className="login-brand">
          <span className="brand-mark">
            <Sparkles size={19} />
          </span>
          <span>HSK Passport</span>
        </div>
        <div className="login-illustration" aria-hidden="true">
          <div className="passport-emoji">🧳</div>
          <span className="floating-stamp">你好</span>
          <span className="floating-star">
            <Sparkles size={17} />
          </span>
        </div>
        <p className="eyebrow">YOUR CHINESE JOURNEY</p>
        <h1>
          พร้อมออกเดินทาง
          <br />
          <em>ไปด้วยกันไหม?</em>
        </h1>
        <p className="login-copy">
          สะสมคำศัพท์ทีละคำ เก็บตราประทับทีละดวง แล้วค่อยๆ ไปถึง HSK ที่ฝันไว้
        </p>
        <button
          className="google-login"
          onClick={handleGoogle}
          disabled={loading}
        >
          <span className="google-icon">G</span>
          {loading ? 'กำลังพาไป...' : 'เข้าสู่ระบบด้วย Google'}
          <ArrowRight size={18} />
        </button>
        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}
        <p className="login-note">
          <Globe2 size={14} /> เรียนได้ทุกที่ ทุกจังหวะของคุณ
        </p>
      </section>
      <p className="login-footer">HSK Passport · เรียนจีนแบบค่อยเป็นค่อยไป</p>
    </main>
  )
}
