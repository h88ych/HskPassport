import { auth } from '@/lib/auth'
import pool from '@/lib/db'
import { redirect } from 'next/navigation'
import AppUI from './AppUI'

export default async function HomePage() {
  const session = await auth()

  if (!session || !session.user) {
    redirect('/login')
  }

  const [userRows]: any = await pool.query(
    'SELECT nickname, avatar_url FROM users WHERE id = ?',
    [session.user.id]
  )

  const nickname = userRows[0]?.nickname
  const avatarUrl = userRows[0]?.avatar_url

  if (!nickname) {
    redirect('/welcome')
  }

  const [levelsRows]: any = await pool.query(
    `SELECT 
       hl.id, 
       hl.level_number, 
       hl.name, 
       COALESCE(ulp.unlocked, FALSE) AS unlocked,
       (
         SELECT COUNT(*) 
         FROM words w 
         WHERE w.level_id = hl.id
       ) AS total_words,
       (
         SELECT MAX(es.score) 
         FROM exam_sessions es 
         WHERE es.user_id = ? AND es.level_id = hl.id AND es.passed = TRUE
       ) AS max_score
     FROM hsk_levels hl
     LEFT JOIN user_level_progress ulp ON ulp.level_id = hl.id AND ulp.user_id = ?
     ORDER BY hl.level_number ASC`,
    [session.user.id, session.user.id]
  )

  return (
    <AppUI
      user={session.user}
      dbNickname={nickname}
      avatarUrl={avatarUrl}
      levelsData={levelsRows}
    />
  )
}
