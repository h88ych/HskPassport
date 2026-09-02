import { auth } from '@/lib/auth'
import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const connection = await pool.getConnection()
  try {
    const [rows]: any = await connection.query(
      `SELECT word_id FROM word_reviews WHERE user_id=?`,
      [session.user.id]
    )
    return NextResponse.json(rows.map((r: any) => r.word_id))
  } finally {
    connection.release()
  }
}
