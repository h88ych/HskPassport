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

function PassportHeader({ name }: { name?: string }) {
  return (
    <header className="passport-header">
      <div className="avatar">🧢</div>
      <div>
        <p className="eyebrow">STICKER PASSPORT</p>
        <h1>สวัสดี, {name}!</h1>
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

  // กำหนดจำนวนคำสำรองตามระดับ HSK (1-6) หากฐานข้อมูลไม่ได้ส่งมา
  const defaultWordsMap: Record<number, number> = {
    1: 150,
    2: 150,
    3: 300,
    4: 600,
    5: 1300,
    6: 2500
  }
  const wordCount = item.words || defaultWordsMap[item.level_number] || 150

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
              <article className="vocab-row" key={word.hanzi}>
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
const categoriesByLevel: Record<number, [string, string, string][]> = {
  1: [
    ['ครอบครัว', '👪', 'pink'],
    ['อาหาร', '🍜', 'yellow'],
    ['ชีวิตประจำวัน', '☀️', 'mint']
  ],
  2: [
    ['การเดินทาง', '🗺️', 'purple'],
    ['สุขภาพ', '✚', 'coral'],
    ['งานอดิเรก', '★', 'pink']
  ],
  3: [
    ['ธรรมชาติ', '🌿', 'mint'],
    ['การเรียน', '书', 'yellow'],
    ['ความรู้สึก', '♡', 'purple']
  ],
  4: [
    ['สังคม', '◎', 'purple'],
    ['การทำงาน', '✦', 'yellow'],
    ['การสื่อสาร', '◌', 'mint']
  ],
  5: [
    ['ข่าวสาร', '▣', 'coral'],
    ['วัฒนธรรม', '◇', 'pink'],
    ['ความคิดเห็น', '✎', 'purple']
  ],
  6: [
    ['วิชาการ', '⌘', 'yellow'],
    ['โลกและสังคม', '◈', 'mint'],
    ['ภาษาขั้นสูง', '文', 'coral']
  ]
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

function QuizCard({
  exam = false,
  level,
  category,
  onBack
}: {
  exam?: boolean
  level?: number
  category?: string
  onBack: () => void
}) {
  const [question, setQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const word = quizWords[(question - 1) % quizWords.length]
  const hanziMode = question % 2 === 1
  const answer = hanziMode ? word.meaning : word.hanzi
  const choices = hanziMode
    ? [
        word.meaning,
        ...quizWords
          .filter((item) => item.meaning !== word.meaning)
          .slice(0, 3)
          .map((item) => item.meaning)
      ]
    : [
        word.hanzi,
        ...quizWords
          .filter((item) => item.hanzi !== word.hanzi)
          .slice(0, 3)
          .map((item) => item.hanzi)
      ]
  const choose = (choice: string) => {
    if (!selected) {
      setSelected(choice)
      if (choice === answer) setScore((value) => value + 1)
    }
  }
  const next = () => {
    if (question < 100) {
      setQuestion((value) => value + 1)
      setSelected(null)
    }
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
              : `ฝึกคำศัพท์ิค · HSK ${level} · ${category}`}
          </p>
          <h2>{exam ? 'ทริปคำศัพท์ 100 ข้อ' : 'ฝึกคำศัพท์กัน'}</h2>
        </div>
        <span className="counter">{question} / 100</span>
      </div>
      <div className="quiz-progress">
        <span style={{ width: `${question}%` }} />
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
          {question === 100 ? 'ดูผลลัพธ์' : 'ข้อต่อไป'}{' '}
          <ChevronRight size={17} />
        </button>
      </article>
      <p className="quiz-score">
        คะแนนตอนนี้ <strong>{score}</strong> / {question}
      </p>
      {!exam && (
        <div className="mode-picker quiz-options">
          <p className="eyebrow">ขั้นที่ 3 · วิธีฝึกเพิ่มเติม</p>
          <div className="mode-grid">
            <button className="mode-button pink" onClick={onBack}>
              <span>🃏</span>
              <strong>ทวนคำ</strong>
              <small>Flashcard</small>
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

function PracticeRoom() {
  const [level, setLevel] = useState<number | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [mode, setMode] = useState<'quiz' | 'dictation'>('quiz')
  const [revealed, setRevealed] = useState(false)
  const goBack = () => {
    if (mode === 'dictation') {
      setMode('categories')
      setRevealed(false)
    } else if (category) setCategory(null)
    else setLevel(null)
  }
  if (!level)
    return (
      <div className="room">
        <div className="room-heading">
          <div>
            <p className="eyebrow">ห้องฝึกคำศัพท์ิค · ขั้นที่ 1</p>
            <h2>เลือก HSK ที่อยากฝึก</h2>
            <p className="muted">แต่ละระดับมีหมวดคำศัพท์ของตัวเอง</p>
          </div>
        </div>
        <div className="level-picker">
          {[1, 2, 3, 4, 5, 6].map((item) => (
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
                {levels[item - 1].words.toLocaleString()} คำ{' '}
                <ChevronRight size={15} />
              </small>
            </button>
          ))}
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
            <p className="eyebrow">ห้องฝึกคำศัพท์ิค · ขั้นที่ 2</p>
            <h2>หมวดของ HSK {level}</h2>
            <p className="muted">เลือกหมวดใหญ่ก่อน แล้วค่อยเลือกวิธีฝึก</p>
          </div>
        </div>
        <div className="capsule-grid">
          {categoriesByLevel[level].map(([name, icon, color]) => (
            <button
              key={name}
              className={`capsule ${color}`}
              onClick={() => setCategory(name)}
            >
              <span>{icon}</span>
              <strong>{name}</strong>
              <small>
                12 คำ <ChevronRight size={15} />
              </small>
            </button>
          ))}
        </div>
      </div>
    )
  if (mode === 'quiz' && category)
    return (
      <QuizCard
        level={level}
        category={category}
        onBack={() => setMode('dictation')}
      />
    )
  if (mode === 'dictation')
    return (
      <div className="room">
        <button className="back-link" onClick={goBack}>
          <ArrowLeft size={16} /> เลือกโหมดอื่น
        </button>
        <div className="room-heading">
          <div>
            <p className="eyebrow">
              ฝึกคำศัพท์ิค · HSK {level} · {category}
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
            ห้องฝึกคำศัพท์ิค · HSK {level} · {category}
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
        {room === 'practice' && <PracticeRoom />}
        {room === 'exam' && <ExamRoom />}
      </div>
    </main>
  )
}
