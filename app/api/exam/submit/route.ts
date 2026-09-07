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

      // ดึง session ที่มีอยู่ ต้องเป็นของ user คนนี้เท่านั้น
      const [[examSession]]: any = await connection.query(
        `SELECT es.id, es.user_id, es.level_id, es.pool_id, es.score,
                es.total_questions, hl.pass_score, hl.level_number
         FROM exam_sessions es
         JOIN hsk_levels hl ON hl.id = es.level_id
         WHERE es.id = ? AND es.user_id = ?`,
        [sessionId, session.user.id]
      )

      if (!examSession) {
        await connection.rollback()
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        )
      }

      const passThreshold = Math.ceil(
        (examSession.total_questions * examSession.pass_score) / 100
      )
      const passed = examSession.score >= passThreshold

      await connection.query(
        `UPDATE exam_sessions SET passed = ?, completed_at = NOW() WHERE id = ?`,
        [passed, sessionId]
      )

      if (passed) {
        // ปิด pool เดิม (trigger trg_after_exam_pass จะปลดล็อกเลเวลถัดไปให้อัตโนมัติ)
        await connection.query(
          `UPDATE exam_word_pools SET status='passed', passed_at=NOW() WHERE id=?`,
          [examSession.pool_id]
        )
      }

      await connection.commit()
      return NextResponse.json({
        passed,
        score: examSession.score,
        totalQuestions: examSession.total_questions,
        levelNumber: examSession.level_number,
        nextLevelUnlocked: passed && examSession.level_number < 6
      })
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error('Failed to submit exam:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
