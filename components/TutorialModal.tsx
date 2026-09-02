'use client'

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Layers3,
  Medal,
  X
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Slide = {
  eyebrow: string
  title: string
  desc: string
  icon?: React.ReactNode
  color: 'purple' | 'mint' | 'coral' | 'pink'
}

const slides: Slide[] = [
  {
    eyebrow: 'ยินดีต้อนรับ',
    title: 'พาสปอร์ตของคุณเริ่มต้นที่นี่',
    desc: 'ทุกครั้งที่เรียน คุณจะได้เดินทางผ่าน 3 ห้อง: จำศัพท์ → ฝึกซ้อม → สอบเก็บตราประทับ',
    icon: <img src="/icon-svg.svg" alt="" width={50} height={50} />,
    color: 'purple'
  },
  {
    eyebrow: 'ห้องที่ 1',
    title: 'ห้องจำศัพท์',
    desc: 'เลือกระดับ HSK 1-6 แล้วอ่านคำศัพท์ทีละคำ พลิกดูคำแปล ฟังเสียงอ่าน และกดทำเครื่องหมายคำที่ทบทวนแล้ว',
    icon: <BookOpen size={34} />,
    color: 'purple'
  },
  {
    eyebrow: 'ห้องที่ 2',
    title: 'ห้องฝึกซ้อม',
    desc: 'ลองทำแบบฝึกหัดสั้นๆ อุ่นเครื่องก่อนสอบจริง ช่วยให้จำคำศัพท์ได้แม่นขึ้น',
    icon: <Layers3 size={34} />,
    color: 'mint'
  },
  {
    eyebrow: 'ห้องที่ 3',
    title: 'ภารกิจสอบ',
    desc: 'สอบผ่านแต่ละด่านเพื่อสะสมตราประทับ ปลดล็อกประเทศใหม่ในพาสปอร์ตของคุณทีละใบ',
    icon: <Medal size={34} />,
    color: 'coral'
  }
]

export default function TutorialModal({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const isProgrammaticScroll = useRef(false)
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  useEffect(() => {
    if (open) setIndex(0)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const goTo = (nextIndex: number) => {
    setIndex(nextIndex)
    const el = trackRef.current
    if (!el) return
    isProgrammaticScroll.current = true
    const slideWidth = el.clientWidth
    el.scrollTo({ left: nextIndex * slideWidth, behavior: 'smooth' })
    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)
    scrollEndTimer.current = setTimeout(() => {
      isProgrammaticScroll.current = false
    }, 500)
  }

  if (!open) return null

  const isLast = index === slides.length - 1

  const handleScroll = () => {
    if (isProgrammaticScroll.current) return
    const el = trackRef.current
    if (!el) return
    const slideWidth = el.clientWidth || 1
    const next = Math.round(el.scrollLeft / slideWidth)
    if (next !== index) setIndex(next)
  }

  return (
    <div
      className="tut-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="วิธีใช้งานแอป"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="tut-modal">
        <button
          className="tut-close"
          onClick={onClose}
          aria-label="ปิดหน้าสอนใช้งาน"
        >
          <X size={18} />
        </button>
        <div className="tut-track" ref={trackRef} onScroll={handleScroll}>
          {slides.map((slide, i) => (
            <div className="tut-slide" key={i}>
              {slide.icon && (
                <span className={`tut-icon-badge ${slide.color}`}>
                  {slide.icon}
                </span>
              )}
              <p className="eyebrow tut-eyebrow">{slide.eyebrow}</p>
              <h3 className="tut-title">{slide.title}</h3>
              <p className="muted tut-desc">{slide.desc}</p>
            </div>
          ))}
        </div>
        <div className="tut-dots" role="tablist" aria-label="ลำดับหน้าสอน">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`ไปหน้าที่ ${i + 1}`}
              className={i === index ? 'active' : ''}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <div className="tut-nav">
          <button
            className="tut-nav-back"
            onClick={() => goTo(Math.max(0, index - 1))}
            disabled={index === 0}
            aria-label="ก่อนหน้า"
          >
            <ChevronLeft size={18} />
          </button>
          {isLast ? (
            <button className="primary-button tut-start" onClick={onClose}>
              เริ่มออกเดินทาง <ChevronRight size={17} />
            </button>
          ) : (
            <button
              className="primary-button tut-start"
              onClick={() => goTo(Math.min(slides.length - 1, index + 1))}
            >
              ต่อไป <ChevronRight size={17} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
