import { auth } from '@/lib/auth'
import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const levelNumber = Number(searchParams.get('level'))
  const requestedCount = Number(searchParams.get('count'))
  const userId = session.user.id

  const connection = await pool.getConnection()
  try {
    const [[levelRow]]: any = await connection.query(
      'SELECT id, total_questions FROM hsk_levels WHERE level_number = ?',
      [levelNumber]
    )
    if (!levelRow)
      return NextResponse.json({ error: 'Level not found' }, { status: 404 })

    if (levelNumber > 1) {
      const [[progress]]: any = await connection.query(
        `SELECT unlocked FROM user_level_progress
     WHERE user_id = ? AND level_id = ?`,
        [userId, levelRow.id]
      )
      if (!progress || !progress.unlocked) {
        return NextResponse.json({ error: 'Level locked' }, { status: 403 })
      }
    }

    const [[everPassed]]: any = await connection.query(
      `SELECT 1 FROM exam_sessions
       WHERE user_id=? AND level_id=? AND passed=TRUE
       LIMIT 1`,
      [userId, levelRow.id]
    )
    const canChooseCustomCount = !!everPassed

    const [[wordCountRow]]: any = await connection.query(
      `SELECT COUNT(*) AS cnt FROM words WHERE level_id=?`,
      [levelRow.id]
    )
    const levelWordCount = wordCountRow.cnt

    // มี pool ที่ active อยู่ไหม
    const [[activePool]]: any = await connection.query(
      `SELECT id FROM exam_word_pools WHERE user_id=? AND level_id=? AND status='active'`,
      [userId, levelRow.id]
    )

    let poolId: number
    if (activePool) {
      poolId = activePool.id
      const [[poolCountRow]]: any = await connection.query(
        `SELECT COUNT(*) AS cnt FROM exam_word_pool_items WHERE pool_id=?`,
        [poolId]
      )
      if (poolCountRow.cnt < levelWordCount) {
        const [missingWords]: any = await connection.query(
          `SELECT w.id FROM words w
           WHERE w.level_id=?
             AND w.id NOT IN (
               SELECT word_id FROM exam_word_pool_items WHERE pool_id=?
             )
           ORDER BY RAND()`,
          [levelRow.id, poolId]
        )
        if (missingWords.length > 0) {
          const values = missingWords.map((w: any, i: number) => [
            poolId,
            w.id,
            poolCountRow.cnt + i
          ])
          await connection.query(
            `INSERT INTO exam_word_pool_items (pool_id, word_id, position) VALUES ?`,
            [values]
          )
        }
      }
    } else {
      const [words]: any = await connection.query(
        `SELECT id FROM words WHERE level_id=? ORDER BY RAND()`,
        [levelRow.id]
      )
      const [poolResult]: any = await connection.query(
        `INSERT INTO exam_word_pools (user_id, level_id, status) VALUES (?, ?, 'active')`,
        [userId, levelRow.id]
      )
      poolId = poolResult.insertId
      const values = words.map((w: any, i: number) => [poolId, w.id, i])
      await connection.query(
        `INSERT INTO exam_word_pool_items (pool_id, word_id, position) VALUES ?`,
        [values]
      )
    }

    const totalQuestions = !canChooseCustomCount
      ? levelRow.total_questions
      : Number.isInteger(requestedCount) && requestedCount > 0
        ? Math.min(requestedCount, levelWordCount)
        : levelRow.total_questions

    let [[openSession]]: any = await connection.query(
      `SELECT id, score, total_questions FROM exam_sessions
       WHERE user_id=? AND pool_id=? AND total_questions=? AND completed_at IS NULL
       ORDER BY id DESC LIMIT 1`,
      [userId, poolId, totalQuestions]
    )

    if (!openSession) {
      const [sResult]: any = await connection.query(
        `INSERT INTO exam_sessions (user_id, level_id, pool_id, total_questions, score, passed)
         VALUES (?, ?, ?, ?, 0, FALSE)`,
        [userId, levelRow.id, poolId, totalQuestions]
      )
      openSession = {
        id: sResult.insertId,
        score: 0,
        total_questions: totalQuestions
      }
    }

    // จำนวนข้อที่ตอบไปแล้วใน session นี้ + คำศัพท์เต็มชุด (เรียงตาม position)
    const [answered]: any = await connection.query(
      `SELECT word_id, is_correct FROM exam_answers WHERE exam_session_id=?`,
      [openSession.id]
    )
    const [words]: any = await connection.query(
      `SELECT w.id, w.hanzi, w.pinyin, w.meaning_th AS meaning
       FROM exam_word_pool_items pwi
       JOIN words w ON w.id = pwi.word_id
       WHERE pwi.pool_id=? ORDER BY pwi.position LIMIT ?`,
      [poolId, openSession.total_questions]
    )

    return NextResponse.json({
      sessionId: openSession.id,
      words,
      answeredCount: answered.length,
      score: openSession.score,
      canChooseCustomCount
    })
  } finally {
    connection.release()
  }
}
