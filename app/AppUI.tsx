'use client'

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Flame,
  Layers3,
  LockKeyhole,
  Medal,
  RotateCcw,
  Search,
  Star,
  Volume2,
  X
} from 'lucide-react'
import { useEffect, useState } from 'react'

const levels = [
  {
    level: 1,
    title: 'เริ่มต้นทริป',
    words: 150,
    progress: 100,
    state: 'passed',
    color: 'mint'
  },
  {
    level: 2,
    title: 'ก้าวแรก',
    words: 150,
    progress: 68,
    state: 'open',
    color: 'pink'
  },
  {
    level: 3,
    title: 'นักสำรวจ',
    words: 300,
    progress: 24,
    state: 'open',
    color: 'yellow'
  },
  {
    level: 4,
    title: 'เมืองใหม่',
    words: 600,
    progress: 0,
    state: 'locked',
    color: 'purple'
  },
  {
    level: 5,
    title: 'นักเดินทาง',
    words: 1300,
    progress: 0,
    state: 'locked',
    color: 'coral'
  },
  {
    level: 6,
    title: 'ทั่วโลก',
    words: 2500,
    progress: 0,
    state: 'locked',
    color: 'mint'
  }
]
const vocabByLevel: Record<
  number,
  { hanzi: string; pinyin: string; meaning: string; example: string }[]
> = {
  1: [
    {
      hanzi: '你好',
      pinyin: 'nǐ hǎo',
      meaning: 'สวัสดี',
      example: '你好，很高兴认识你。'
    },
    {
      hanzi: '朋友',
      pinyin: 'péngyou',
      meaning: 'เพื่อน',
      example: '我有很多朋友。'
    },
    {
      hanzi: '学习',
      pinyin: 'xuéxí',
      meaning: 'เรียน / ศึกษา',
      example: '我喜欢学习中文。'
    }
  ],
  2: [
    {
      hanzi: '旅行',
      pinyin: 'lǚxíng',
      meaning: 'ท่องเที่ยว',
      example: '我喜欢旅行。'
    },
    {
      hanzi: '健康',
      pinyin: 'jiànkāng',
      meaning: 'สุขภาพ',
      example: '身体健康很重要。'
    },
    {
      hanzi: '爱好',
      pinyin: 'àihào',
      meaning: 'งานอดิเรก',
      example: '你的爱好是什么？'
    }
  ],
  3: [
    {
      hanzi: '环境',
      pinyin: 'huánjìng',
      meaning: 'สิ่งแวดล้อม',
      example: '我们要保护环境。'
    },
    {
      hanzi: '经验',
      pinyin: 'jīngyàn',
      meaning: 'ประสบการณ์',
      example: '他有丰富的经验。'
    },
    {
      hanzi: '感觉',
      pinyin: 'gǎnjué',
      meaning: 'ความรู้สึก',
      example: '我感觉很好。'
    }
  ],
  4: [
    {
      hanzi: '社会',
      pinyin: 'shèhuì',
      meaning: 'สังคม',
      example: '社会正在改变。'
    },
    {
      hanzi: '交流',
      pinyin: 'jiāoliú',
      meaning: 'สื่อสาร / แลกเปลี่ยน',
      example: '我们需要多交流。'
    },
    {
      hanzi: '工作',
      pinyin: 'gōngzuò',
      meaning: 'ทำงาน',
      example: '我每天努力工作。'
    }
  ],
  5: [
    {
      hanzi: '文化',
      pinyin: 'wénhuà',
      meaning: 'วัฒนธรรม',
      example: '中国文化很有意思。'
    },
    {
      hanzi: '观点',
      pinyin: 'guāndiǎn',
      meaning: 'ความคิดเห็น',
      example: '我同意你的观点。'
    },
    {
      hanzi: '新闻',
      pinyin: 'xīnwén',
      meaning: 'ข่าวสาร',
      example: '我每天看新闻。'
    }
  ],
  6: [
    {
      hanzi: '学术',
      pinyin: 'xuéshù',
      meaning: 'วิชาการ',
      example: '这是学术问题。'
    },
    {
      hanzi: '全球',
      pinyin: 'quánqiú',
      meaning: 'ทั่วโลก',
      example: '这是全球性的挑战。'
    },
    {
      hanzi: '现象',
      pinyin: 'xiànxiàng',
      meaning: 'ปรากฏการณ์',
      example: '这种现象很常见。'
    }
  ]
}
const categories = [
  ['ครอบครัว', '👪', 'pink'],
  ['อาหาร', '🍜', 'yellow'],
  ['ชีวิตประจำวัน', '☀️', 'mint'],
  ['สถานที่', '🗺️', 'purple'],
  ['ตัวเลข', '🔢', 'coral'],
  ['ธรรมชาติ', '🌿', 'mint']
]

function Mascot({
  text = 'วันนี้เก่งมากเลย แวะมาเรียนอีกนิดกันไหม?'
}: {
  text?: string
}) {
  return (
    <div className="mascot-row">
      <div className="mascot" aria-hidden="true">
        🐼
      </div>
      <div className="bubble">
        {text}
        <span className="bubble-tail" />
      </div>
    </div>
  )
}

function PassportHeader({
  name,
  avatar
}: {
  name?: string
  avatar?: string | null
}) {
  return (
    <header className="passport-header">
      <div className="avatar">🧢</div>
      <div>
        <p className="eyebrow">STICKER PASSPORT</p>
        <h1>สวัสดี, {name || 'นักเดินทาง'}!</h1>
        <p className="muted">พร้อมออกเดินทางต่อหรือยัง?</p>
      </div>
      <div className="passport-meta">
        <div className="stamp-count">
          <Medal size={17} /> <b>2</b>
          <span>ตราประทับ</span>
        </div>
        <button className="icon-button" aria-label="ช่วยเหลือ">
          <CircleHelp size={21} />
        </button>
      </div>
    </header>
  )
}

function LevelCard({ item }: { item: any }) {
  const isUnlocked = item.unlocked === 1 || item.unlocked === true
  const maxScore = item.max_score || 0
  const isPassed = maxScore >= 95

  let state = 'locked'
  if (isPassed) {
    state = 'passed'
  } else if (isUnlocked) {
    state = 'open'
  }

  const progressPercent = isPassed
    ? 100
    : Math.min(Math.round((maxScore / 100) * 100), 99)

  const colors = ['mint', 'pink', 'yellow', 'purple', 'coral', 'mint']
  const colorClass = colors[(item.level_number - 1) % colors.length]

  const wordCount = item.total_words || 150

  const defaultTitleMap: Record<number, string> = {
    1: 'เริ่มต้นทริป',
    2: 'ก้าวแรก',
    3: 'นักสำรวจ',
    4: 'เมืองใหม่',
    5: 'นักเดินทาง',
    6: 'ทั่วโลก'
  }
  const cardTitle = defaultTitleMap[item.level_number]

  return (
    <button
      className={`level-card ${state} ${colorClass}`}
      disabled={state === 'locked'}
    >
      <div className="level-top">
        <span className="level-number">HSK {item.level_number}</span>
        {state === 'locked' ? (
          <LockKeyhole size={18} />
        ) : state === 'passed' ? (
          <span className="passed-dot">
            <Check size={13} />
          </span>
        ) : (
          <span className="level-percent">{progressPercent}%</span>
        )}
      </div>
      <div className="level-copy">
        <strong>{cardTitle}</strong>
        <span>{wordCount.toLocaleString()} คำ</span>
      </div>
      {state !== 'locked' && (
        <div className="progress-line">
          <span style={{ width: `${progressPercent}%` }} />
        </div>
      )}
      {state === 'passed' && (
        <div className="stamp">
          PASSED
          <br />
          <small>ผ่านแล้ว</small>
        </div>
      )}
    </button>
  )
}

function Dashboard({
  onNavigate,
  displayName,
  levelsData
}: {
  onNavigate: (room: string) => void
  displayName?: string
  levelsData?: any[]
}) {
  const passedCount =
    levelsData?.filter((item) => (item.max_score || 0) >= 95).length || 0
  return (
    <>
      <PassportHeader name={displayName} />
      <section className="hero-summary">
        <div>
          <p className="eyebrow">เส้นทางของเรา</p>
          <h2>
            ค่อยๆ เก็บคำ <span>ทีละสติกเกอร์</span>
          </h2>
          <p className="muted">ปลดล็อกด่านใหม่ด้วยจังหวะของตัวเอง</p>
        </div>
        <div className="streak">
          <Flame size={23} fill="currentColor" />
          <b>7</b>
          <span>วันติดกัน</span>
        </div>
      </section>
      <div className="dash-grid">
        <section className="card path-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR JOURNEY</p>
              <h3>แผนที่พาสปอร์ต</h3>
            </div>
            <span className="mini-badge">
              <Star size={14} fill="currentColor" /> {passedCount} / 6
            </span>
          </div>
          <div className="level-path">
            {levelsData && levelsData.length > 0 ? (
              levelsData.map((levelItem) => (
                <LevelCard item={levelItem} key={levelItem.id} />
              ))
            ) : (
              <p className="muted">กำลังโหลดข้อมูลด่าน...</p>
            )}
          </div>
        </section>
        <aside className="side-column">
          <Mascot />
          <div className="card continue-card">
            <div className="continue-icon">
              <BookOpen size={22} />
            </div>
            <p className="eyebrow">เรียนต่อจากครั้งที่แล้ว</p>
            <h3>คำทักทาย</h3>
            <p className="muted">เหลืออีก 8 คำในชุดนี้</p>
            <button
              className="primary-button"
              onClick={() => onNavigate('vocab')}
            >
              ไปต่อเลย <ChevronRight size={17} />
            </button>
          </div>
          <div className="card quick-card">
            <div>
              <p className="eyebrow">สรุปสัปดาห์นี้</p>
              <h3>กำลังไปได้สวย!</h3>
            </div>
            <div className="week-bars">
              {[40, 78, 55, 90, 63, 28, 74].map((height, i) => (
                <span
                  key={i}
                  style={{ height: `${height}%` }}
                  className={i === 4 ? 'today' : ''}
                />
              ))}
            </div>
            <p className="muted">
              เรียนไปแล้ว <b className="ink">42 คำ</b> ในสัปดาห์นี้
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}

const speak = (hanzi: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(hanzi)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.78
    window.speechSynthesis.speak(utterance)
  }
}

function VocabRoom() {
  const [level, setLevel] = useState(1)
  const [filter, setFilter] = useState<'all' | 'review'>('all')
  const [view, setView] = useState<'list' | 'flashcard'>('list')
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reviewed, setReviewed] = useState<string[]>([])

  // เพิ่ม state สำหรับเก็บคำศัพท์จากฐานข้อมูล และสถานะกำลังโหลด
  const [words, setWords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // ดึงข้อมูลจาก API ทุกครั้งที่เปลี่ยนระดับ HSK
  useEffect(() => {
    async function fetchVocab() {
      setLoading(true)
      try {
        const res = await fetch(`/api/vocab?level=${level}`)
        const data = await res.json()
        setWords(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Failed to load vocab', err)
      } finally {
        setLoading(false)
      }
    }
    fetchVocab()
  }, [level])

  const visibleWords = words.filter(
    (word) => filter === 'all' || reviewed.includes(word.hanzi)
  )
  const card = visibleWords[cardIndex]

  const toggleReview = (hanzi: string) =>
    setReviewed((current) =>
      current.includes(hanzi)
        ? current.filter((item) => item !== hanzi)
        : [...current, hanzi]
    )

  const changeLevel = (item: number) => {
    setLevel(item)
    setFilter('all')
    setCardIndex(0)
    setFlipped(false)
  }
  const changeCard = (step: number) => {
    setCardIndex(
      (current) => (current + step + visibleWords.length) % visibleWords.length
    )
    setFlipped(false)
  }

  return (
    <div className="room">
      <div className="room-heading">
        <div>
          <p className="eyebrow">ห้องจำศัพท์ · คลังคำศัพท์</p>
          <h2>{view === 'list' ? 'อ่านคำศัพท์กันยาวๆ' : 'ทวนคำทีละแผ่น'}</h2>
          <p className="muted">
            {view === 'list'
              ? 'เลื่อนอ่านได้ตามจังหวะ ไม่ต้องกดผ่านทีละคำ'
              : 'แตะการ์ดเพื่อดูคำแปล แล้วค่อยๆ จำไปด้วยกัน'}
          </p>
        </div>
        <span className="counter">
          HSK {level} · {words.length} คำ
        </span>
      </div>
      <div
        className="vocab-level-picker"
        role="group"
        aria-label="เลือกระดับ HSK"
      >
        <span className="vocab-level-label">เลือกชุดคำ</span>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <button
            key={item}
            className={level === item ? 'selected' : ''}
            aria-pressed={level === item}
            onClick={() => changeLevel(item)}
          >
            HSK {item}
          </button>
        ))}
      </div>
      <div className="vocab-toolbar">
        <div className="list-filter" role="group" aria-label="กรองคำศัพท์">
          <button
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => setFilter('all')}
          >
            ทั้งหมด <span>{words.length}</span>
          </button>
          <button
            className={filter === 'review' ? 'selected' : ''}
            onClick={() => setFilter('review')}
          >
            ทบทวนแล้ว{' '}
            <span>
              {words.filter((word) => reviewed.includes(word.hanzi)).length}
            </span>
          </button>
        </div>
        <button
          className="view-toggle"
          aria-pressed={view === 'flashcard'}
          onClick={() => {
            setView(view === 'list' ? 'flashcard' : 'list')
            setCardIndex(0)
            setFlipped(false)
          }}
        >
          <Layers3 size={17} />{' '}
          {view === 'list' ? 'มุมมอง Flashcard' : 'มุมมองรายการ'}
        </button>
      </div>
      {view === 'list' ? (
        <div className="vocab-list">
          {visibleWords.length ? (
            visibleWords.map((word, index) => (
              <article className="vocab-row" key={`${word.hanzi}-${index}`}>
                <div className="vocab-index">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="vocab-hanzi">{word.hanzi}</div>
                <div className="vocab-detail">
                  <p className="pinyin">{word.pinyin}</p>
                  <strong>{word.meaning}</strong>
                  <span>{word.example}</span>
                </div>
                <button
                  className="sound-button"
                  aria-label={`ฟังเสียง ${word.hanzi}`}
                  onClick={() => speak(word.hanzi)}
                >
                  <Volume2 size={18} />
                </button>
                <button
                  className={`review-button ${reviewed.includes(word.hanzi) ? 'done' : ''}`}
                  onClick={() => toggleReview(word.hanzi)}
                >
                  {reviewed.includes(word.hanzi) ? (
                    <Check size={17} />
                  ) : (
                    <RotateCcw size={17} />
                  )}
                  <span>
                    {reviewed.includes(word.hanzi) ? 'ทบทวนแล้ว' : 'ไว้ทบทวน'}
                  </span>
                </button>
              </article>
            ))
          ) : (
            <div className="empty-list">
              ยังไม่มีคำที่ทำเครื่องหมายไว้ ลองอ่านคำศัพท์แล้วกด “ไว้ทบทวน”
              ได้เลย
            </div>
          )}
        </div>
      ) : (
        <div className="flashcard-stage">
          {card ? (
            <>
              <button
                className={`flashcard ${flipped ? 'is-flipped' : ''}`}
                onClick={() => setFlipped((value) => !value)}
                aria-label={flipped ? 'แสดงคำจีน' : 'แสดงคำแปล'}
              >
                <span className="flashcard-hint">
                  {flipped ? 'คำแปล' : 'แตะเพื่อหงายคำแปล'}
                </span>
                {flipped ? (
                  <>
                    <strong className="flashcard-meaning">
                      {card.meaning}
                    </strong>
                    <span className="flashcard-example">{card.example}</span>
                  </>
                ) : (
                  <>
                    <strong className="flashcard-hanzi">{card.hanzi}</strong>
                    <span className="flashcard-pinyin">{card.pinyin}</span>
                  </>
                )}
              </button>
              <button
                className="sound-button flashcard-sound"
                aria-label={`ฟังเสียง ${card.hanzi}`}
                onClick={(event) => {
                  event.stopPropagation()
                  speak(card.hanzi)
                }}
              >
                <Volume2 size={19} />
              </button>
              <div className="flashcard-controls">
                <button
                  className="round-arrow"
                  aria-label="คำก่อนหน้า"
                  onClick={() => changeCard(-1)}
                >
                  <ArrowLeft size={18} />
                </button>
                <span>
                  {cardIndex + 1} / {visibleWords.length}
                </span>
                <button
                  className="round-arrow"
                  aria-label="คำถัดไป"
                  onClick={() => changeCard(1)}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
              <button
                className={`review-button ${reviewed.includes(card.hanzi) ? 'done' : ''}`}
                onClick={() => toggleReview(card.hanzi)}
              >
                {reviewed.includes(card.hanzi) ? (
                  <Check size={17} />
                ) : (
                  <RotateCcw size={17} />
                )}{' '}
                {reviewed.includes(card.hanzi) ? 'ทบทวนแล้ว' : 'ไว้ทบทวน'}
              </button>
            </>
          ) : (
            <div className="empty-list">ไม่มีคำในตัวกรองนี้</div>
          )}
        </div>
      )}
      <Mascot text="ค่อยๆ อ่าน ไม่ต้องรีบ จำได้มากน้อยแค่ไหนก็ดีแล้ว!" />
    </div>
  )
}

function QuizCard({
  exam = false,
  level,
  category,
  onBack,
  onMatching
}: {
  exam?: boolean
  level?: number
  category?: string
  onBack: () => void
  onMatching?: () => void
}) {
  const [question, setQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [words, setWords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [finished, setFinished] = useState(false)

  // เพิ่ม state สำหรับล็อกช้อยส์ของข้อปัจจุบัน
  const [choices, setChoices] = useState<string[]>([])

  useEffect(() => {
    async function fetchQuizWords() {
      setLoading(true)
      try {
        const url = exam
          ? `/api/quiz?exam=true`
          : `/api/quiz?level=${level}&category=${encodeURIComponent(category || '')}`
        const res = await fetch(url)
        const data = await res.json()
        setWords(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Failed to load quiz words', err)
      } finally {
        setLoading(false)
      }
    }
    fetchQuizWords()
  }, [exam, level, category])

  const totalQuestions = exam ? 100 : words.length
  const word = words.length > 0 ? words[(question - 1) % words.length] : null
  const hanziMode = question % 2 === 1
  const answer = word ? (hanziMode ? word.meaning : word.hanzi) : ''

  // ใช้ useEffect คำนวณและล็อกตัวเลือกเฉพาะตอนเปลี่ยนข้อใหม่หรือเปลี่ยนโหมด
  useEffect(() => {
    if (!word) return

    const generatedChoices = hanziMode
      ? [
          word.meaning,
          ...words
            .filter((item) => item.meaning !== word.meaning)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map((item) => item.meaning)
        ].sort(() => 0.5 - Math.random())
      : [
          word.hanzi,
          ...words
            .filter((item) => item.hanzi !== word.hanzi)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map((item) => item.hanzi)
        ].sort(() => 0.5 - Math.random())

    setChoices(generatedChoices)
  }, [question, word, hanziMode, words])

  if (loading) {
    return (
      <div className="room quiz-room">
        <p className="muted" style={{ textAlign: 'center', marginTop: '50px' }}>
          กำลังเตรียมข้อสอบและคำศัพท์...
        </p>
      </div>
    )
  }

  if (words.length === 0 || !word) {
    return (
      <div className="room quiz-room">
        <button className="back-link" onClick={onBack}>
          <ArrowLeft size={16} /> กลับ
        </button>
        <p className="muted" style={{ textAlign: 'center', marginTop: '50px' }}>
          ยังไม่มีคำศัพท์ในหมวดนี้ หรือฐานข้อมูลยังว่างอยู่ค่ะ
        </p>
      </div>
    )
  }

  const choose = (choice: string) => {
    if (!selected) {
      setSelected(choice)
      if (choice === answer) setScore((value) => value + 1)
    }
  }

  const next = () => {
    if (question < totalQuestions) {
      setQuestion((value) => value + 1)
      setSelected(null) // รีเซ็ตสถานะการเลือกสำหรับข้อถัดไป
    } else {
      setFinished(true)
    }
  }

  // หน้าจอแสดงผลเมื่อทำครบทุกข้อ
  if (finished) {
    const passed = exam ? score >= 95 : true
    return (
      <div
        className={`room result-room ${passed ? 'result-pass' : 'result-retry'}`}
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
        <h2>
          {exam
            ? passed
              ? 'ด่านนี้ผ่านแล้ว!'
              : 'อีกนิดเดียวก็ผ่าน'
            : 'ฝึกครบแล้ว'}
        </h2>
        <p className="result-score">
          <strong>{score}</strong>
          <span>/ {totalQuestions}</span>
        </p>
        <p className="muted">
          {exam
            ? passed
              ? 'ตราประทับใหม่พร้อมเข้าพาสปอร์ตของคุณแล้ว'
              : 'ลองทบทวนคำที่พลาด แล้วกลับมาลุยใหม่อีกครั้งนะ'
            : 'คุณสร้างความคุ้นเคยกับคำศัพท์เพิ่มขึ้นอีกหนึ่งก้าว'}
        </p>
        {/* <div
          className="result-stats"
        >
          <div>
            <strong>{score}</strong>
            <span>ตอบถูก</span>
          </div>
          <div>
            <strong>{100 - score}</strong>
            <span>คำที่ทบทวน</span>
          </div>
          <div>
            <strong>{exam ? (passed ? 'ผ่าน' : 'ลองใหม่') : 'ดีมาก'}</strong>
            <span>สถานะวันนี้</span>
          </div>
        </div> */}
        <div className="result-actions mt-10">
          <button
            className="primary-button"
            onClick={() => {
              setQuestion(1)
              setScore(0)
              setSelected(null)
              setFinished(false)
            }}
          >
            {exam ? 'ลองทำอีกครั้ง' : 'ฝึกชุดใหม่'} <RotateCcw size={17} />
          </button>
          <button className="secondary-button" onClick={onBack}>
            กลับไปเลือกห้อง <ArrowLeft size={17} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="room quiz-room">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={16} /> ออกจากแบบฝึก
      </button>
      <div className="quiz-top">
        <div>
          <p className="eyebrow">
            {exam
              ? 'ภารกิจสอบ · 100 ข้อ'
              : `ฝึกคำศัพท์ · HSK ${level} · ${category}`}
          </p>
          <h2>{exam ? 'ทริปคำศัพท์ 100 ข้อ' : 'ฝึกคำศัพท์กัน'}</h2>
        </div>
        <span className="counter">
          {question} / {totalQuestions}
        </span>
      </div>
      <div className="quiz-progress">
        <span style={{ width: `${(question / totalQuestions) * 100}%` }} />
      </div>
      <article className="question-card">
        <p className="question-label">
          {hanziMode
            ? 'เลือกความหมายไทยที่ถูกต้อง'
            : 'เลือกคำจีนที่ตรงกับคำแปล'}
        </p>
        {hanziMode ? (
          <>
            <div className="quiz-hanzi">{word.hanzi}</div>
            <p className="quiz-pinyin">{word.pinyin}</p>
          </>
        ) : (
          <>
            <div className="quiz-pinyin large">{word.pinyin}</div>
            <p className="quiz-meaning">{word.meaning}</p>
          </>
        )}
        <div className="choice-grid">
          {choices.map((choice, index) => (
            <button
              key={choice}
              className={`choice-button ${selected === choice ? (choice === answer ? 'correct' : 'wrong') : ''}`}
              onClick={() => choose(choice)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {choice}
            </button>
          ))}
        </div>
        {selected && (
          <p className={selected === answer ? 'correct-text' : 'wrong-text'}>
            {selected === answer
              ? 'ถูกต้อง เก่งมาก!'
              : `คำตอบที่ถูกคือ ${answer}`}
          </p>
        )}
        <button
          className="primary-button quiz-next"
          disabled={!selected}
          onClick={next}
        >
          {question === totalQuestions ? 'ดูผลลัพธ์' : 'ข้อต่อไป'}{' '}
          <ChevronRight size={17} />
        </button>
      </article>
      <p className="quiz-score">
        คะแนนตอนนี้ <strong>{score}</strong> / {totalQuestions}
      </p>
      {!exam && (
        <div className="mode-picker quiz-options">
          <p className="eyebrow">วิธีฝึกเพิ่มเติม</p>
          <div className="mode-grid">
            <button className="mode-button pink" onClick={onMatching ?? onBack}>
              <span>🧩</span>
              <strong>จับคู่คำ</strong>
              <small>Matching Game</small>
            </button>
            <button className="mode-button purple" onClick={onBack}>
              <span>✍️</span>
              <strong>เขียนตามคำบอก</strong>
              <small>Dictation</small>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function PracticeRoom({ levelsData }: { levelsData?: any[] }) {
  const [level, setLevel] = useState<number | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [mode, setMode] = useState<'quiz' | 'dictation' | 'matching'>('quiz')
  const [revealed, setRevealed] = useState(false)
  const [loadingCategories, setLoadingCategories] = useState(false)

  useEffect(() => {
    if (!level) return
    async function fetchCategories() {
      setLoadingCategories(true)
      try {
        const res = await fetch(`/api/categories?level=${level}`)
        const data = await res.json()
        setCategories(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Failed to load categories', err)
      } finally {
        setLoadingCategories(false)
      }
    }
    fetchCategories()
  }, [level])

  const goBack = () => {
    if (mode === 'dictation' || mode === 'matching') {
      setMode('quiz')
      setRevealed(false)
    } else if (category) {
      setCategory(null)
    } else {
      setLevel(null)
    }
  }

  if (!level)
    return (
      <div className="room">
        <div className="room-heading">
          <div>
            <p className="eyebrow">ห้องฝึกคำศัพท์ · ขั้นที่ 1</p>
            <h2>เลือก HSK ที่อยากฝึก</h2>
            <p className="muted">แต่ละระดับมีหมวดคำศัพท์ของตัวเอง</p>
          </div>
        </div>
        <div className="level-picker">
          {[1, 2, 3, 4, 5, 6].map((item) => {
            const levelData = levelsData?.find(
              (lvl) => lvl.level_number === item
            )
            const wordCount = levelData?.total_words || 0

            return (
              <button
                key={item}
                className={`practice-level level-${item}`}
                onClick={() => setLevel(item)}
              >
                <span>HSK {item}</span>
                <strong>
                  {
                    [
                      'เริ่มต้น',
                      'ก้าวแรก',
                      'นักสำรวจ',
                      'เมืองใหม่',
                      'นักเดินทาง',
                      'ทั่วโลก'
                    ][item - 1]
                  }
                </strong>
                <small>
                  {wordCount} คำ <ChevronRight size={15} />
                </small>
              </button>
            )
          })}
        </div>
      </div>
    )
  if (!category)
    return (
      <div className="room">
        <button className="back-link" onClick={goBack}>
          <ArrowLeft size={16} /> เลือก HSK ใหม่
        </button>
        <div className="room-heading">
          <div>
            <p className="eyebrow">ห้องฝึกคำศัพท์ · ขั้นที่ 2</p>
            <h2>หมวดของ HSK {level}</h2>
            <p className="muted">เลือกหมวดใหญ่ก่อน แล้วค่อยเลือกวิธีฝึก</p>
          </div>
        </div>
        <div className="capsule-grid">
          {loadingCategories ? (
            <p className="muted">กำลังโหลดหมวดหมู่...</p>
          ) : categories.length > 0 ? (
            categories.map((cat, index) => {
              const colors = ['pink', 'yellow', 'mint', 'purple', 'coral']
              const colorClass = colors[index % colors.length]

              // ฟังก์ชันเลือกไอคอนอีโมจิให้เข้ากับชื่อหมวดหมู่
              const getCategoryIcon = (name: string) => {
                if (name.includes('ตัวเลข')) return '🔢'
                if (name.includes('เวลา') || name.includes('วัน')) return '⏰'
                if (name.includes('ครอบครัว') || name.includes('คน'))
                  return '👪'
                if (name.includes('อาหาร') || name.includes('เครื่องดื่ม'))
                  return '🍜'
                if (name.includes('เดินทาง') || name.includes('สถานที่'))
                  return '🗺️'
                if (name.includes('เรียน') || name.includes('โรงเรียน'))
                  return '📚'
                if (name.includes('งาน') || name.includes('ชีวิต')) return '💼'
                if (name.includes('สื่อสาร')) return '💬'
                if (name.includes('กระทำ')) return '🏃'
                if (name.includes('ความรู้สึก') || name.includes('ความคิด'))
                  return '💖'
                if (
                  name.includes('ลักษณะ') ||
                  name.includes('คุณสมบัติ') ||
                  name.includes('สี') ||
                  name.includes('รูปร่าง')
                )
                  return '✨'
                if (
                  name.includes('สิ่งของ') ||
                  name.includes('อุปกรณ์') ||
                  name.includes('เครื่องใช้')
                )
                  return '🎒'
                if (name.includes('สัตว์') || name.includes('ธรรมชาติ'))
                  return '🌿'
                if (name.includes('ตำแหน่ง') || name.includes('ทิศทาง'))
                  return '📍'
                if (name.includes('กีฬา') || name.includes('กิจกรรม'))
                  return '⚽'
                if (name.includes('ร่างกาย') || name.includes('สุขภาพ'))
                  return '💪'
                if (name.includes('ไวยากรณ์') || name.includes('คำช่วย'))
                  return '🧩'
                return '📚' // ค่าสำรอง
              }

              return (
                <button
                  key={cat.id}
                  className={`capsule ${colorClass}`}
                  onClick={() => setCategory(cat.name)}
                >
                  <span>{getCategoryIcon(cat.name)}</span>
                  <strong>{cat.name}</strong>
                  <small>
                    {cat.word_count || 0} คำ <ChevronRight size={15} />
                  </small>
                </button>
              )
            })
          ) : (
            <p className="muted">ยังไม่มีหมวดหมู่ในระดับนี้</p>
          )}
        </div>
      </div>
    )
  if (mode === 'quiz' && category)
    return (
      <>
        <QuizCard
          level={level}
          category={category}
          onBack={() => setCategory(null)}
          onMatching={() => setMode('matching')}
        />
        {/* <div className="card practice-more">
          <p className="eyebrow">ขั้นที่ 3 · วิธีฝึกเพิ่มเติม</p>
          <div className="mode-grid">
            <button
              className="mode-button pink"
              onClick={() => setMode('dictation')}
            >
              <span>🃏</span>
              <strong>ทวนคำ</strong>
              <small>Flashcard</small>
            </button>
            <button
              className="mode-button purple"
              onClick={() => setMode('dictation')}
            >
              <span>✍️</span>
              <strong>เขียนตามคำบอก</strong>
              <small>Dictation</small>
            </button>
          </div>
        </div> */}
      </>
    )

  if (mode === 'matching')
    return <MatchingGame onBack={() => setMode('quiz')} />

  if (mode === 'dictation')
    return (
      <div className="room">
        <button className="back-link" onClick={goBack}>
          <ArrowLeft size={16} /> เลือกโหมดอื่น
        </button>
        <div className="room-heading">
          <div>
            <p className="eyebrow">
              ฝึกคำศัพท์ · HSK {level} · {category}
            </p>
            <h2>เขียนตามคำบอก</h2>
          </div>
          <span className="counter">คำที่ 2 / 10</span>
        </div>
        <div className={`dictation-card ${revealed ? 'revealed' : ''}`}>
          <p className="dictation-label">ฟังเสียงในหัว แล้วเขียนลงกระดาษ</p>
          <p className="pinyin big">shíwù</p>
          <p className="meaning">อาหาร</p>
          <div className="paper-space">
            {revealed ? <strong>食物</strong> : <span>พื้นที่สำหรับเขียน</span>}
          </div>
          {!revealed ? (
            <button
              className="primary-button reveal-button"
              onClick={() => setRevealed(true)}
            >
              <Search size={18} /> หงายเฉลย
            </button>
          ) : (
            <div className="rating-row">
              <button
                className="mint-button"
                onClick={() => setRevealed(false)}
              >
                <Check size={18} /> เขียนถูก
              </button>
              <button
                className="coral-button"
                onClick={() => setRevealed(false)}
              >
                <X size={18} /> พลาดนิดนึง
              </button>
            </div>
          )}
        </div>
      </div>
    )
  return (
    <div className="room">
      <button className="back-link" onClick={goBack}>
        <ArrowLeft size={16} /> เลือกหมวดอื่น
      </button>
      <div className="room-heading">
        <div>
          <p className="eyebrow">
            ห้องฝึกคำศัพท์ · HSK {level} · {category}
          </p>
          <h2>เลือกวิธีฝึก</h2>
          <p className="muted">หมวดนี้มี 12 คำให้ฝึก</p>
        </div>
      </div>
      <Mascot text="เลือกโหมดที่เข้ากับวันนี้ได้เลย" />
      <div className="mode-picker">
        <p className="eyebrow">ขั้นที่ 3 · วิธีฝึก</p>
        <div className="mode-grid">
          <button
            className="mode-button pink"
            onClick={() => setMode('dictation')}
          >
            <span>🃏</span>
            <strong>ทวนคำ</strong>
            <small>Flashcard</small>
          </button>
          <button
            className="mode-button purple"
            onClick={() => setMode('dictation')}
          >
            <span>✍️</span>
            <strong>เขียนตามคำบอก</strong>
            <small>Dictation</small>
          </button>
        </div>
      </div>
    </div>
  )
}

function ExamRoom() {
  const [started, setStarted] = useState(false)
  if (started) return <QuizCard exam onBack={() => setStarted(false)} />
  return (
    <div className="room exam-room">
      <div className="room-heading">
        <div>
          <p className="eyebrow">ภารกิจ 100 ด่าน</p>
          <h2>พร้อมลุยด่านนี้ไหม?</h2>
        </div>
        <span className="target-badge">ผ่านที่ 95 / 100</span>
      </div>
      <div className="trail-card">
        <div className="trail-label">
          <span>ความคืบหน้า</span>
          <b>42 / 100</b>
        </div>
        <div className="candy-trail">
          {Array.from({ length: 25 }).map((_, i) => (
            <span className={i < 10 ? 'filled' : ''} key={i}>
              {i === 9 && '🐼'}
            </span>
          ))}
        </div>
        <p className="muted">ทำไปเรื่อยๆ ไม่ต้องรีบ ค่อยๆ ไปด้วยกัน</p>
      </div>
      <div className="exam-start">
        <div className="large-medal">🏅</div>
        <h3>HSK 2 · ทริปเมืองจีน</h3>
        <p className="muted">
          คำศัพท์ 100 คำจากทุกหมวด สลับ reading และ recognition
        </p>
        <button className="primary-button" onClick={() => setStarted(true)}>
          เริ่มภารกิจ <ChevronRight size={17} />
        </button>
      </div>
    </div>
  )
}

const quizWords = [
  { hanzi: '爸爸', pinyin: 'bàba', meaning: 'พ่อ' },
  { hanzi: '妈妈', pinyin: 'māma', meaning: 'แม่' },
  { hanzi: '朋友', pinyin: 'péngyou', meaning: 'เพื่อน' },
  { hanzi: '家', pinyin: 'jiā', meaning: 'บ้าน' },
  { hanzi: '吃饭', pinyin: 'chīfàn', meaning: 'กินข้าว' },
  { hanzi: '水', pinyin: 'shuǐ', meaning: 'น้ำ' },
  { hanzi: '学习', pinyin: 'xuéxí', meaning: 'เรียน' },
  { hanzi: '老师', pinyin: 'lǎoshī', meaning: 'ครู' }
]

function MatchingGame({ onBack }: { onBack: () => void }) {
  const createCards = () =>
    quizWords
      .slice(0, 6)
      .flatMap((word) => [
        {
          id: `${word.hanzi}-hanzi`,
          pair: word.hanzi,
          label: word.hanzi,
          type: 'hanzi'
        },
        {
          id: `${word.hanzi}-meaning`,
          pair: word.hanzi,
          label: word.meaning,
          type: 'meaning'
        }
      ])
      .sort(() => Math.random() - 0.5)
  const [cards, setCards] = useState(createCards)
  const [selected, setSelected] = useState<string[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [wrong, setWrong] = useState<string[]>([])
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    if (matched.length === 6) return
    const timer = window.setInterval(
      () => setSeconds((value) => value + 1),
      1000
    )
    return () => window.clearInterval(timer)
  }, [matched.length])
  useEffect(() => {
    if (selected.length !== 2) return
    const [first, second] = selected.map(
      (id) => cards.find((card) => card.id === id)!
    )
    if (first.pair === second.pair) {
      window.setTimeout(() => {
        setMatched((value) => [...value, first.pair])
        setSelected([])
      }, 350)
    } else {
      setWrong(selected)
      window.setTimeout(() => {
        setWrong([])
        setSelected([])
      }, 550)
    }
  }, [selected, cards])
  const choose = (id: string) => {
    if (
      selected.length >= 2 ||
      matched.some(
        (pair) => cards.find((card) => card.id === id)?.pair === pair
      ) ||
      selected.includes(id)
    )
      return
    setSelected((value) => [...value, id])
  }
  const reset = () => {
    setCards(createCards())
    setSelected([])
    setMatched([])
    setWrong([])
    setSeconds(0)
  }
  if (matched.length === 6)
    return (
      <div className="room result-room result-pass">
        <div className="result-icon">
          <Check size={32} strokeWidth={3} />
        </div>
        <p className="eyebrow">Matching Game · จบเกม</p>
        <h2>จับคู่ครบแล้ว!</h2>
        <p className="result-score">
          <strong>{seconds}</strong>
          <span>วินาที</span>
        </p>
        <p className="muted" style={{marginBottom:"10px"}}>ยิ่งเร็วยิ่งคล่อง รอบนี้ทำได้ดีมาก</p>
        <div className="result-actions">
          <button className="primary-button" onClick={reset}>
            เล่นอีกรอบ <RotateCcw size={17} />
          </button>
          <button className="secondary-button" onClick={onBack}>
            กลับไปแบบฝึก <ArrowLeft size={17} />
          </button>
        </div>
      </div>
    )
  return (
    <div className="room matching-room">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={16} /> กลับไปแบบฝึก
      </button>
      <div className="quiz-top">
        <div>
          <p className="eyebrow">Matching Game · รีวิวเร็ว</p>
          <h2>จับคู่คำให้ตรงกัน</h2>
          <p className="muted" style={{ marginTop: '10px' }}>
            คำจีน 6 คำ กับคำแปลไทย 6 คำ
          </p>
        </div>
        <div className="match-timer">
          <strong style={{ marginRight: '5px' }}>
            {String(Math.floor(seconds / 60)).padStart(2, '0')}:
            {String(seconds % 60).padStart(2, '0')}
          </strong>
          <span>{matched.length} / 6 คู่</span>
        </div>
      </div>
      <div className="matching-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            className={`matching-card ${card.type} ${selected.includes(card.id) ? 'selected' : ''} ${matched.includes(card.pair) ? 'matched' : ''} ${wrong.includes(card.id) ? 'wrong' : ''}`}
            onClick={() => choose(card.id)}
            disabled={matched.includes(card.pair)}
          >
            {card.label}
          </button>
        ))}
      </div>
      <Mascot text="จับคู่ให้ครบ 6 คู่ แล้วดูว่ารอบนี้ใช้เวลากี่วินาที" />
    </div>
  )
}

export default function AppUI({
  user,
  dbNickname,
  avatarUrl,
  levelsData
}: {
  user: { name?: string | null; image?: string | null }
  dbNickname?: string | null
  avatarUrl?: string | null
  levelsData?: any[]
}) {
  const [room, setRoom] = useState('dashboard')
  const displayName = dbNickname || user?.name?.split(' ')[0] || 'นักเดินทาง'
  const displayAvatar = avatarUrl || user?.image || '/placeholder-user.jpg'
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])
  return (
    <main className="app-shell">
      <nav className="top-nav">
        <button className="brand" onClick={() => setRoom('dashboard')}>
          <span>✦</span> HSK Passport
        </button>
        <div className="nav-links">
          <button
            className={room === 'dashboard' ? 'active' : ''}
            onClick={() => setRoom('dashboard')}
          >
            หน้าหลัก
          </button>
          <button
            className={room === 'vocab' ? 'active' : ''}
            onClick={() => setRoom('vocab')}
          >
            จำศัพท์
          </button>
          <button
            className={room === 'practice' ? 'active' : ''}
            onClick={() => setRoom('practice')}
          >
            ฝึกคำศัพท์
          </button>
          <button
            className={room === 'exam' ? 'active' : ''}
            onClick={() => setRoom('exam')}
          >
            ภารกิจสอบ
          </button>
          <button
            className="theme-toggle"
            aria-label={darkMode ? 'เปลี่ยนเป็นธีมสว่าง' : 'เปลี่ยนเป็นธีมมืด'}
            aria-pressed={darkMode}
            onClick={() => setDarkMode((value) => !value)}
          >
            {darkMode ? '☼' : '◐'}
            <span className="desktop-only">{darkMode ? 'สว่าง' : 'มืด'}</span>
          </button>
        </div>
        <a className="profile-button" href="/login">
          <span>
            <img
              src={displayAvatar}
              alt="Profile"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full"
            />
          </span>
          <span className="desktop-only">{displayName}</span>
        </a>
      </nav>
      <div className="content">
        {room === 'dashboard' && (
          <Dashboard
            onNavigate={setRoom}
            displayName={displayName}
            levelsData={levelsData}
          />
        )}
        {room === 'vocab' && <VocabRoom />}
        {room === 'practice' && <PracticeRoom levelsData={levelsData} />}
        {room === 'exam' && <ExamRoom />}
      </div>
    </main>
  )
}
