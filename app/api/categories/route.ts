import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const level = searchParams.get('level') || '1'

  try {
    const [rows]: any = await pool.query(
      `SELECT c.id, c.name, c.sort_order,
              (SELECT COUNT(*) FROM words w WHERE w.category_id = c.id) AS word_count
       FROM categories c
       JOIN hsk_levels hl ON c.level_id = hl.id
       WHERE hl.level_number = ?
       ORDER BY c.sort_order ASC`,
      [level]
    )
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
