# ✦ HSK Passport

A gamified HSK (Chinese proficiency) vocabulary **web app** built with **Next.js**. Learners "travel" through HSK levels 1–6 like a passport journey — studying words, drilling them, then sitting an exam to earn a country stamp and unlock the next destination. 🇨🇳🛂

## 🏠 The 4 spaces in the web app

The app is organized into a dashboard plus three practice "rooms," switchable from the top nav.

### 🏡 Dashboard (`หน้าหลัก`)
Your home base. Shows overall progress, HSK level cards, and lets you jump straight into an exam for any unlocked level.

### 📚 Vocab Room — `ห้องจำศัพท์` (Memory Room)
Where you meet the words for the first time.
- Browse the full word list for a level, or flip through **flashcards** one at a time
- Search by hanzi, pinyin, or meaning
- Mark words as "reviewed" and filter to see only what you've studied
- Shuffle the deck to mix up the order

### 🏋️ Practice Room — `ห้องฝึกคำศัพท์` (Drill Room)
Where you actually train, in three modes:
- **Quiz** — multiple-choice practice by category
- **Matching** — match hanzi to their meanings
- **Dictation** — listen and write the character by hand on a canvas pad ✍️

### 🎯 Exam Room — `ภารกิจสอบ` (Mission Room)
Where you prove it.
- Pick an HSK level (1–6) and how many questions to answer
- Score a pass mark (default 95%) to unlock the next level and earn a **country stamp** 🏅
- Higher levels stay locked until you pass the one before

## 🛠️ Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Auth | NextAuth (Google sign-in) |
| Database | MySQL |
| Icons | lucide-react |
| Analytics | Vercel Analytics |

## 🚀 Getting started

```bash
# install dependencies
npm install   # or pnpm install

# set up environment variables (create .env.local)
DB_HOST=...
DB_PORT=...
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
AUTH_SECRET=...

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the web app in action.

## 📁 Key folders

```
app/
  AppUI.tsx          # main app shell — Dashboard, VocabRoom, PracticeRoom, ExamRoom
  api/                # route handlers (vocab, quiz, exam, dashboard, auth)
  login/, welcome/    # onboarding pages
components/           # shared UI pieces (exam results, profile menu, tutorial modal)
lib/
  auth.ts             # NextAuth + Google + MySQL user upsert
  db.ts               # MySQL connection pool
public/trips/         # country illustrations & stamps used in the exam theme
```

## 🎮 How the "trip" theme works

Each HSK level maps to a country (China, Japan, Korea, Italy, France, Thailand). Passing an exam awards that country's stamp — so climbing HSK 1 → 6 doubles as a mini world tour, right from the browser. ✈️
