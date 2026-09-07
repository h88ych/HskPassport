import { auth } from '@/lib/auth'
import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { wordId, reviewed } = await request.json()

  if (!Number.isInteger(Number(wordId))) {
    return NextResponse.json(
      { error: 'Invalid wordId' },
      { status: 400 }
    )
  }

  const connection = await pool.getConnection()

  try {
    await connection.beginTransaction()

    if (reviewed) {
      await connection.query(
        `INSERT INTO word_reviews
          (user_id, word_id, reviewed_at)
         VALUES (?, ?, NOW())
         ON DUPLICATE KEY UPDATE reviewed_at = NOW()`,
        [session.user.id, wordId]
      )

      await connection.query(
        `INSERT INTO word_review_history
          (user_id, word_id, reviewed_at)
         VALUES (?, ?, NOW())`,
        [session.user.id, wordId]
      )
    } else {
      await connection.query(
        `DELETE FROM word_reviews
         WHERE user_id=? AND word_id=?`,
        [session.user.id, wordId]
      )
    }

    await connection.commit()

    return NextResponse.json({ ok: true })
  } catch (error) {
    await connection.rollback()
    console.error('Failed to save review state:', error)

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  } finally {
    connection.release()
  }
}