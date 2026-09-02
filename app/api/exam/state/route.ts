import { auth } from '@/lib/auth'
import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const levelNumber = Number(searchParams.get('level'))
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

    // มี pool ที่ active อยู่ไหม
    const [[activePool]]: any = await connection.query(
      `SELECT id FROM exam_word_pools WHERE user_id=? AND level_id=? AND status='active'`,
      [userId, levelRow.id]
    )

    let poolId: number
    if (activePool) {
      poolId = activePool.id
    } else {
      // สร้าง pool ใหม่ + สุ่มคำ (ตัวอย่าง weighted-random แบบง่าย)
      const [words]: any = await connection.query(
        `SELECT id FROM words WHERE level_id=? ORDER BY RAND() LIMIT ?`,
        [levelRow.id, levelRow.total_questions]
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

    // มี session ที่ยังไม่จบ (completed_at IS NULL) สำหรับ pool นี้ไหม
    let [[openSession]]: any = await connection.query(
      `SELECT id, score, total_questions FROM exam_sessions
       WHERE user_id=? AND pool_id=? AND completed_at IS NULL
       ORDER BY id DESC LIMIT 1`,
      [userId, poolId]
    )
    if (!openSession) {
      const [sResult]: any = await connection.query(
        `INSERT INTO exam_sessions (user_id, level_id, pool_id, total_questions, score, passed)
         VALUES (?, ?, ?, ?, 0, FALSE)`,
        [userId, levelRow.id, poolId, levelRow.total_questions]
      )
      openSession = {
        id: sResult.insertId,
        score: 0,
        total_questions: levelRow.total_questions
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
       WHERE pwi.pool_id=? ORDER BY pwi.position`,
      [poolId]
    )

    return NextResponse.json({
      sessionId: openSession.id,
      words,
      answeredCount: answered.length,
      score: openSession.score
    })
  } finally {
    connection.release()
  }
}
