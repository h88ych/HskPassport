import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const exam = searchParams.get('exam') === 'true'
  const level = searchParams.get('level') || '1'
  const category = searchParams.get('category')

  try {
    let rows: any = []

    if (exam) {
      // โหมดสอบ: ดึง 100 ข้อ
      ;[rows] = await pool.query(
        `SELECT w.id, w.hanzi, w.pinyin, w.meaning_th AS meaning 
         FROM words w
         JOIN hsk_levels hl ON w.level_id = hl.id
         WHERE hl.level_number = ?
         ORDER BY RAND() 
         LIMIT 5`,
        [level]
      )
    } else {
      // โหมดฝึกตามหมวดหมู่และเลเวล
      ;[rows] = await pool.query(
        `SELECT w.id, w.hanzi, w.pinyin, w.meaning_th AS meaning 
         FROM words w
         JOIN categories c ON w.category_id = c.id
         JOIN hsk_levels hl ON w.level_id = hl.id
         WHERE hl.level_number = ? AND c.name = ?`,
        [level, category]
      )
    }

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch quiz words:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
