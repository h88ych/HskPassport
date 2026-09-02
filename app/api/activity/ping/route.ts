import { auth } from '@/lib/auth'
import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST() {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const connection = await pool.getConnection()
  try {
    await connection.query(
      `INSERT IGNORE INTO user_activity_log (user_id, activity_date) VALUES (?, CURDATE())`,
      [session.user.id]
    )
    return NextResponse.json({ ok: true })
  } finally {
    connection.release()
  }
}
