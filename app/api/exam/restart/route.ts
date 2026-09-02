import { auth } from '@/lib/auth'
import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const sessionId = Number(body.sessionId)
    if (!Number.isInteger(sessionId) || sessionId < 1) {
      return NextResponse.json({ error: 'Invalid sessionId' }, { status: 400 })
    }

    const connection = await pool.getConnection()
    try {
      await connection.beginTransaction()

      // session เดิมต้องเป็นของ user คนนี้ ยังไม่จบ (จะได้ไม่ไปสร้าง session ใหม่ทับของที่ submit ไปแล้ว)
      const [[oldSession]]: any = await connection.query(
        `SELECT id, user_id, level_id, pool_id, total_questions
         FROM exam_sessions
         WHERE id = ? AND user_id = ? AND completed_at IS NULL`,
        [sessionId, session.user.id]
      )

      if (!oldSession) {
        await connection.rollback()
        return NextResponse.json({ error: 'Session not found' }, { status: 404 })
      }

      const [insertResult]: any = await connection.query(
        `INSERT INTO exam_sessions (user_id, level_id, pool_id, total_questions, score, passed)
         VALUES (?, ?, ?, ?, 0, FALSE)`,
        [session.user.id, oldSession.level_id, oldSession.pool_id, oldSession.total_questions]
      )

      await connection.commit()
      return NextResponse.json({ sessionId: insertResult.insertId })
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error('Failed to restart exam:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}