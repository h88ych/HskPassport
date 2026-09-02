import Link from 'next/link'
import { ArrowRight, Globe2, Sparkles, Stamp } from 'lucide-react'

export default function LandingPage() {
  return (
    <main className="landing-shell">
      <div className="login-orbit orbit-one" />
      <div className="login-orbit orbit-two" />
      <div className="landing-wrap">
        <section className="landing-copy-col">
          <div className="login-brand">
            <span className="brand-mark">
              <Sparkles size={19} />
            </span>
            <span>HSK Passport</span>
          </div>
          <p className="eyebrow">YOUR CHINESE JOURNEY</p>
          <h1 className="landing-title">
            เก็บทุกคำศัพท์ <br></br> <em>ให้เป็นตราประทับ</em>
            <br />
            ในสมุดเดินทางของคุณ
          </h1>
          <p className="landing-lead">
            เรียนคำศัพท์ HSK ทีละคำ สะสมตราประทับทีละดวง ผ่านบทเรียนสั้นๆ
            แบบเกม แล้วค่อยๆ เดินทางไปให้ถึงเป้าหมายที่ฝันไว้
          </p>
          <div className="landing-actions">
            <Link href="/login" className="landing-cta">
              เริ่มใช้งาน
              <ArrowRight size={18} />
            </Link>
            <p className="login-note">
              <Globe2 size={14} /> ไม่มีค่าใช้จ่าย เริ่มได้ทันทีด้วยบัญชี
              Google
            </p>
          </div>
          <ul className="landing-highlights">
            <li>
              <Stamp size={16} /> เก็บตราประทับทุกด่านที่ผ่าน
            </li>
            <li>
              <Sparkles size={16} /> แบบทดสอบท้ายบทที่กระชับ ไม่น่าเบื่อ
            </li>
            <li>
              <Globe2 size={16} /> เรียนได้ทุกที่ ทุกจังหวะของคุณ
            </li>
          </ul>
        </section>
        <section className="landing-hero-col">
          <img
            src="/landing-hero.svg"
            alt="ภาพประกอบสมุดพาสปอร์ตสะสมตราประทับคำศัพท์ HSK พร้อมธงชาตินานาชาติ"
            className="landing-hero-img"
            width={1200}
            height={630}
            fetchPriority="high"
          />
        </section>
      </div>
    </main>
  )
}
