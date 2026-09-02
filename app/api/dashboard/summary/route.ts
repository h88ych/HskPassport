import { auth } from '@/lib/auth'
import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = session.user.id
  const connection = await pool.getConnection()
  try {
    const [activityRows]: any = await connection.query(
      `SELECT activity_date FROM user_activity_log WHERE user_id=? ORDER BY activity_date DESC LIMIT 60`,
      [userId]
    )
    const dateSet = new Set(
      activityRows.map((r: any) => new Date(r.activity_date).toDateString())
    )
    let streak = 0
    const cursor = new Date()
    cursor.setHours(0, 0, 0, 0)
    if (!dateSet.has(cursor.toDateString()))
      cursor.setDate(cursor.getDate() - 1)
    while (dateSet.has(cursor.toDateString())) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    }

    // --- คำที่ทบทวนใน 7 วันล่าสุด ---
    const [[weeklyCountRow]]: any = await connection.query(
      `SELECT COUNT(DISTINCT word_id) AS cnt FROM word_reviews
       WHERE user_id=? AND reviewed_at >= (CURDATE() - INTERVAL 6 DAY)`,
      [userId]
    )

    const [dailyRows]: any = await connection.query(
      `SELECT DATE(reviewed_at) AS d, COUNT(DISTINCT word_id) AS cnt
       FROM word_reviews
       WHERE user_id=? AND reviewed_at >= (CURDATE() - INTERVAL 6 DAY)
       GROUP BY DATE(reviewed_at)`,
      [userId]
    )
    const dailyMap: Record<string, number> = {}
    dailyRows.forEach((r: any) => {
      dailyMap[new Date(r.d).toDateString()] = r.cnt
    })
    const maxCount = Math.max(1, ...dailyRows.map((r: any) => r.cnt))
    const weekBars: number[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const cnt = dailyMap[d.toDateString()] || 0
      weekBars.push(Math.round((cnt / maxCount) * 100))
    }

    return NextResponse.json({
      streak,
      weeklyWordsCount: weeklyCountRow?.cnt || 0,
      weekBars // index สุดท้าย (6) = วันนี้เสมอ
    })
  } finally {
    connection.release()
  }
}
