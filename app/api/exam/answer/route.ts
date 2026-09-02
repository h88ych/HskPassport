import { auth } from '@/lib/auth'
import pool from '@/lib/db'
import { NextResponse } from 'next/server'

// /api/exam/answer  (POST { sessionId, wordId, isCorrect })
export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { sessionId, wordId, isCorrect } = await request.json()

  const connection = await pool.getConnection()
  try {
    await connection.query(
      `INSERT INTO exam_answers (exam_session_id, word_id, is_correct) VALUES (?, ?, ?)`,
      [sessionId, wordId, isCorrect]
    )
    if (isCorrect) {
      await connection.query(
        `UPDATE exam_sessions SET score = score + 1 WHERE id=?`,
        [sessionId]
      )
    }
    return NextResponse.json({ ok: true })
  } finally {
    connection.release()
  }
}
