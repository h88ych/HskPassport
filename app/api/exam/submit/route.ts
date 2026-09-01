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
    const levelNumber = Number(body.levelNumber)
    const score = Number(body.score)
    const totalQuestions = Number(body.totalQuestions)
    const examType = body.examType === 'practice' ? 'practice' : 'hsk-exam'

    if (!Number.isInteger(levelNumber) || levelNumber < 1 || levelNumber > 6) {
      return NextResponse.json({ error: 'Invalid level' }, { status: 400 })
    }
    if (
      !Number.isInteger(score) ||
      !Number.isInteger(totalQuestions) ||
      score < 0 ||
      totalQuestions < 1 ||
      score > totalQuestions
    ) {
      return NextResponse.json({ error: 'Invalid score' }, { status: 400 })
    }

    const passed =
      examType === 'hsk-exam' ? score >= 95 : score / totalQuestions >= 0.8
    const connection = await pool.getConnection()

    try {
      await connection.beginTransaction()
      const [levelRows]: any = await connection.query(
        'SELECT id FROM hsk_levels WHERE level_number = ? LIMIT 1',
        [levelNumber]
      )
      const levelId = levelRows[0]?.id
      if (!levelId) {
        await connection.rollback()
        return NextResponse.json({ error: 'Level not found' }, { status: 404 })
      }

      await connection.query(
        `INSERT INTO exam_sessions (user_id, level_id, score, total_questions, passed, badge_awarded, created_at)
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [session.user.id, levelId, score, totalQuestions, passed, passed]
      )

      if (passed) {
        await connection.query(
          `INSERT INTO user_level_progress (user_id, level_id, unlocked)
           SELECT ?, next_level.id, TRUE
           FROM hsk_levels next_level
           WHERE next_level.level_number = ?
           ON DUPLICATE KEY UPDATE unlocked = TRUE`,
          [session.user.id, levelNumber + 1]
        )
      }

      await connection.commit()
      return NextResponse.json({
        passed,
        levelNumber,
        nextLevelUnlocked: passed && levelNumber < 6
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
