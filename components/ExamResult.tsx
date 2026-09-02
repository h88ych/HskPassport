'use client'

import { ArrowLeft, Check, Heart, RotateCcw, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

type Destination = {
  flag: string
  name: string
  thai: string
  trip: string
  stamp: string
}

type Props = {
  exam: boolean
  passed: boolean
  score: number
  totalQuestions: number
  /** คะแนนที่ต้องได้ถึงจึงจะผ่าน (ใช้บอกว่า "ขาดอีกกี่ข้อ") */
  passScore?: number
  submitState: 'idle' | 'saving' | 'saved' | 'error'
  destination?: Destination | null
  levelNumber?: number
  onRetry: () => void
  onBack: () => void
  onHome?: () => void
}

const PALETTE = ['#ff8fb1', '#7fe7c4', '#ffb199', '#ffd166', '#b49cff', '#ffffff']

type Burst = {
  id: number
  x: number
  y: number
  delay: number
  size: number
  color: string
  particles: { id: number; angle: number; distance: number; color: string }[]
}
type Confetti = {
  id: number
  x: number
  delay: number
  duration: number
  rotate: number
  drift: number
  width: number
  height: number
  color: string
  round: boolean
}

/** สุ่มพิกัดพลุ / กระดาษโปรย หลัง mount เท่านั้น เพื่อไม่ให้ SSR/CSR ไม่ตรงกัน */
function useCelebrationParticles(enabled: boolean) {
  const [particles, setParticles] = useState<{
    bursts: Burst[]
    confetti: Confetti[]
  }>({ bursts: [], confetti: [] })

  useEffect(() => {
    if (!enabled) return
    const bursts: Burst[] = Array.from({ length: 7 }, (_, index) => ({
      id: index,
      x: 10 + Math.random() * 80,
      y: 12 + Math.random() * 45,
      delay: 0.55 + index * 0.32 + Math.random() * 0.15,
      size: 120 + Math.random() * 110,
      color: PALETTE[index % PALETTE.length],
      particles: Array.from({ length: 14 }, (_, p) => ({
        id: p,
        angle: (360 / 14) * p + Math.random() * 12,
        distance: 0.7 + Math.random() * 0.5,
        color: PALETTE[(index + p) % PALETTE.length]
      }))
    }))
    const confetti: Confetti[] = Array.from({ length: 42 }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      delay: 0.8 + Math.random() * 2.4,
      duration: 2.6 + Math.random() * 2,
      rotate: Math.random() * 360,
      drift: -40 + Math.random() * 80,
      width: 7 + Math.random() * 6,
      height: 12 + Math.random() * 12,
      color: PALETTE[index % (PALETTE.length - 1)],
      round: Math.random() > 0.65
    }))
    setParticles({ bursts, confetti })
  }, [enabled])

  return particles
}

/** นับคะแนนขึ้นทีละนิด ให้รู้สึกว่า "ได้มา" จริงๆ */
function useCountUp(target: number, enabled: boolean, delayMs = 900) {
  const [value, setValue] = useState(enabled ? 0 : target)
  useEffect(() => {
    if (!enabled) {
      setValue(target)
      return
    }
    let frame = 0
    let start = 0
    const duration = 1400
    const timeout = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now
        const progress = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(target * eased))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delayMs)
    return () => {
      window.clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [target, enabled, delayMs])
  return value
}

export default function ExamResult({
  exam,
  passed,
  score,
  totalQuestions,
  passScore,
  submitState,
  destination,
  levelNumber,
  onRetry,
  onBack,
  onHome
}: Props) {
  const grand = exam && passed
  const { bursts, confetti } = useCelebrationParticles(grand)
  const shownScore = useCountUp(score, grand)
  const percent =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0

  // ---------- โหมดยิ่งใหญ่: สอบผ่าน ได้ตราประทับ ----------
  if (grand) {
    return (
      <div className="room result-room result-grand" aria-live="polite">
        <div className="grand-sky" aria-hidden="true">
          <div className="grand-glow" />
          {bursts.map((burst) => (
            <div
              key={burst.id}
              className="firework"
              style={
                {
                  left: `${burst.x}%`,
                  top: `${burst.y}%`,
                  '--fw-delay': `${burst.delay}s`,
                  '--fw-size': `${burst.size}px`,
                  '--fw-color': burst.color
                } as React.CSSProperties
              }
            >
              <span className="firework-trail" />
              <span className="firework-flash" />
              {burst.particles.map((particle) => (
                <i
                  key={particle.id}
                  style={
                    {
                      '--angle': `${particle.angle}deg`,
                      '--dist': particle.distance,
                      '--p-color': particle.color
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          ))}
          <div className="grand-confetti">
            {confetti.map((piece) => (
              <span
                key={piece.id}
                className={piece.round ? 'round' : ''}
                style={
                  {
                    left: `${piece.x}%`,
                    width: piece.width,
                    height: piece.round ? piece.width : piece.height,
                    background: piece.color,
                    '--c-delay': `${piece.delay}s`,
                    '--c-duration': `${piece.duration}s`,
                    '--c-rotate': `${piece.rotate}deg`,
                    '--c-drift': `${piece.drift}px`
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>

        <div className="grand-body">
          <p className="eyebrow grand-eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            {destination
              ? `${destination.trip} · ${destination.flag} ${destination.thai}`
              : `ภารกิจสอบ · ด่านที่ ${levelNumber ?? ''}`}
          </p>

          <div className="stamp-stage" aria-hidden="true">
            <div className="stamp-shadow" />
            <div className="stamp-ink-ring" />
            <div className="stamp-ink-ring second" />
            <div className="stamp-slam">
              {destination ? (
                <img src={destination.stamp} alt="" />
              ) : (
                <div className="stamp-fallback">
                  <Check size={54} strokeWidth={3} />
                </div>
              )}
              <span className="stamp-approved">
                PASSED
                <small>HSK {levelNumber ?? ''}</small>
              </span>
            </div>
            <div className="stamp-sparkles">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>

          <h2 className="grand-title">
            <span className="grand-title-line">ได้ตราแล้ว!</span>
            <span className="grand-title-sub">
              {destination
                ? `ปิดทริป ${destination.name} สำเร็จ ประทับตราลงพาสปอร์ตเรียบร้อย`
                : 'ด่านนี้ผ่านแล้ว ประทับตราลงพาสปอร์ตเรียบร้อย'}
            </span>
          </h2>

          <div className="grand-score">
            <p className="grand-score-label">คะแนนสอบ · ตอบถูก</p>
            <div className="grand-score-main">
              <strong>{shownScore}</strong>
              <span>/ {totalQuestions} ข้อ</span>
            </div>
            <p className="grand-score-detail">
              ตอบถูก <b>{score}</b> ข้อ จากทั้งหมด <b>{totalQuestions}</b> ข้อ
              {totalQuestions - score > 0
                ? ` · พลาดไป ${totalQuestions - score} ข้อ`
                : ' · ไม่พลาดเลยสักข้อ!'}
            </p>
            <div className="grand-score-badge">
              <Check size={14} strokeWidth={3} aria-hidden="true" />
              {percent}% ความแม่นยำ
            </div>
          </div>

          <p
            className={`grand-status ${submitState === 'error' ? 'is-error' : ''}`}
          >
            {submitState === 'saving' && 'กำลังประทับตราลงพาสปอร์ตของคุณ...'}
            {submitState === 'saved' &&
              'ตราประทับถูกบันทึกในพาสปอร์ตแล้ว เตรียมตัวสู่ทริปถัดไปได้เลย'}
            {submitState === 'error' &&
              'บันทึกตราไม่สำเร็จ ลองรีเฟรชหน้าเพื่อดูสถานะอีกครั้ง'}
            {submitState === 'idle' && 'พร้อมเดินทางสู่ด่านถัดไป'}
          </p>

          <div className="result-actions grand-actions">
            <button className="primary-button" onClick={onHome ?? onBack}>
              ไปดูพาสปอร์ต <ArrowLeft size={17} />
            </button>
            <button className="secondary-button" onClick={onRetry}>
              ทำอีกครั้งเพื่อทำสถิติ <RotateCcw size={17} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ---------- โหมดปลอบใจ: สอบไม่ผ่าน ----------
  if (exam && !passed) {
    const target = passScore ?? Math.ceil(totalQuestions * 0.95)
    const gap = Math.max(0, target - score)
    const missed = totalQuestions - score
    const fillPercent = Math.min(100, percent)
    const markerPercent =
      totalQuestions > 0 ? Math.min(100, (target / totalQuestions) * 100) : 95

    const headline =
      gap <= 3
        ? 'เฉียดสุดๆ แล้วน้า'
        : gap <= 10
          ? 'ใกล้มากแล้วนะ'
          : 'วันนี้ยังไม่ผ่าน แต่ไม่เป็นไรเลย'
    const subline =
      gap <= 3
        ? `ขาดอีกแค่ ${gap} ข้อเอง รอบหน้าได้ตราแน่นอน`
        : gap <= 10
          ? `อีก ${gap} ข้อก็ถึงเส้นผ่านแล้ว ทบทวนคำที่พลาดนิดเดียวพอ`
          : `เก็บคำใหม่ไปได้ ${score} คำแล้ว ค่อยๆ สะสมไปด้วยกันนะ`
    const bubble =
      gap <= 3
        ? 'อีกนิดเดียวเอง ลูบหลังให้ก่อน'
        : gap <= 10
          ? 'ไม่เป็นไรน้า เอาใหม่ได้เสมอ'
          : 'พักก่อนก็ได้ เดี๋ยวค่อยลุยใหม่'

    return (
      <div className="room result-room result-comfort" aria-live="polite">
        <div className="comfort-hearts" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <Heart
              key={index}
              size={14}
              fill="currentColor"
              strokeWidth={0}
              style={{ '--i': index } as React.CSSProperties}
            />
          ))}
        </div>

        <p className="eyebrow comfort-eyebrow">
          {destination
            ? `${destination.trip} · ${destination.flag} ${destination.thai}`
            : `ภารกิจสอบ · ด่านที่ ${levelNumber ?? ''}`}
        </p>

        <div className="comfort-scene" aria-hidden="true">
          <div className="comfort-bubble">
            {bubble}
            <span className="comfort-bubble-tail" />
          </div>

          {/* ตัวเล็ก: นักเดินทางที่กำลังเศร้านิดๆ */}
          <div className="buddy">
            <span className="buddy-cap">
              <i />
            </span>
            <div className="buddy-body">
              <span className="buddy-eye left" />
              <span className="buddy-eye right" />
              <span className="buddy-blush left" />
              <span className="buddy-blush right" />
              <span className="buddy-mouth" />
            </div>
            <span className="buddy-tear" />
            <span className="buddy-foot left" />
            <span className="buddy-foot right" />
          </div>

          {/* แพนด้า: นั่งลูบหลังปลอบ */}
          <div className="panda">
            <span className="panda-ear left" />
            <span className="panda-ear right" />
            <div className="panda-head">
              <span className="panda-patch left">
                <i />
              </span>
              <span className="panda-patch right">
                <i />
              </span>
              <span className="panda-nose" />
              <span className="panda-smile" />
              <span className="panda-blush left" />
              <span className="panda-blush right" />
            </div>
            <div className="panda-body">
              <span className="panda-belly" />
            </div>
            <span className="panda-arm rest" />
            <span className="panda-arm pat" />
            <span className="panda-foot left" />
            <span className="panda-foot right" />
          </div>

          <div className="comfort-ground" />
        </div>

        <h2 className="comfort-title">
          <span className="comfort-title-line">{headline}</span>
          <span className="comfort-title-sub">{subline}</span>
        </h2>

        <div className="comfort-score">
          <div className="comfort-score-main">
            <strong>{score}</strong>
            <span>/ {totalQuestions} ข้อ</span>
          </div>
          <div
            className="comfort-track"
            role="img"
            aria-label={`ตอบถูก ${score} จาก ${totalQuestions} ข้อ ต้องได้ ${target} ข้อจึงจะผ่าน`}
          >
            <span className="comfort-track-fill" style={{ width: `${fillPercent}%` }} />
            <span className="comfort-track-goal" style={{ left: `${markerPercent}%` }}>
              <i>ผ่านที่ {target}</i>
            </span>
          </div>
          <div className="comfort-chips">
            <span className="comfort-chip good">
              <Check size={13} strokeWidth={3} aria-hidden="true" />
              ถูก {score} ข้อ
            </span>
            <span className="comfort-chip soft">พลาด {missed} ข้อ</span>
            <span className="comfort-chip goal">ขาดอีก {gap} ข้อ</span>
          </div>
        </div>

        <div className="result-actions comfort-actions">
          <button className="primary-button" onClick={onRetry}>
            ลุยใหม่อีกรอบ <RotateCcw size={17} />
          </button>
          <button className="secondary-button" onClick={onBack}>
            พักก่อน กลับไปเลือกห้อง <ArrowLeft size={17} />
          </button>
        </div>
      </div>
    )
  }

  // ---------- โหมดปกติ: ฝึกจบ ----------
  return (
    <div
      className={`room result-room ${passed ? 'result-pass' : 'result-retry'}`}
      aria-live="polite"
    >
      <div className="result-confetti" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="result-icon" aria-hidden="true">
        {passed ? (
          <Check size={32} strokeWidth={3} />
        ) : (
          <RotateCcw size={32} strokeWidth={3} />
        )}
      </div>
      <p className="eyebrow">
        {exam ? 'ภารกิจสอบ · สรุปผล' : 'ห้องฝึกศัพท์ · จบเซสชัน'}
      </p>
      <h2>{exam ? 'อีกนิดเดียวก็ผ่าน' : 'ฝึกครบแล้ว'}</h2>
      <p className="result-score">
        <strong>{score}</strong>
        <span>/ {totalQuestions}</span>
      </p>
      <p className="muted">
        {exam
          ? 'ลองทบทวนคำที่พลาด แล้วกลับมาลุยใหม่อีกครั้งนะ'
          : 'คุณสร้างความคุ้นเคยกับคำศัพท์เพิ่มขึ้นอีกหนึ่งก้าว'}
      </p>
      <div className="result-actions mt-10">
        <button className="primary-button" onClick={onRetry}>
          {exam ? 'ลองทำอีกครั้ง' : 'ฝึกชุดใหม่'} <RotateCcw size={17} />
        </button>
        <button
          className="secondary-button"
          onClick={passed && onHome ? onHome : onBack}
        >
          {passed ? 'กลับหน้าหลัก ดูตราประทับ' : 'กลับไปเลือกห้อง'}{' '}
          <ArrowLeft size={17} />
        </button>
      </div>
    </div>
  )
}
