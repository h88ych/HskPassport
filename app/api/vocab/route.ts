import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const level = searchParams.get('level') || '1'

  try {
    const [rows]: any = await pool.query(
      `SELECT w.hanzi, w.pinyin, w.meaning_th AS meaning, w.example_sentence AS example 
       FROM words w
       JOIN hsk_levels hl ON w.level_id = hl.id
       WHERE hl.level_number = ?`,
      [level]
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch vocab:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
