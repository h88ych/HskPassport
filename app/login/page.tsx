import { auth, signIn } from '@/lib/auth'
import { ArrowRight, Globe2, Sparkles } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await auth()

  if (session) {
    redirect('/')
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
        <form
          action={async () => {
            'use server'
            await signIn('google', { redirectTo: '/' })
          }}
        >
          <button type="submit" className="google-login">
            <span className="google-icon">G</span>
            เข้าสู่ระบบด้วย Google
            <ArrowRight size={18} />
          </button>
        </form>
        <p className="login-note">
          <Globe2 size={14} /> เรียนได้ทุกที่ ทุกจังหวะของคุณ
        </p>
      </section>
      <p className="login-footer">HSK Passport · เรียนจีนแบบค่อยเป็นค่อยไป</p>
    </main>
  )
}
